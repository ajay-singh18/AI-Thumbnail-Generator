import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
// Using NVIDIA API only — no Gemini/HuggingFace/Cloudflare fallbacks
import path from "node:path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { Buffer } from "node:buffer";

const stylePrompts = {
  "Bold & Graphic":
    "striking YouTube thumbnail, bold typography, vibrant colors, highly engaging composition, dynamic lighting, high contrast, click-worthy composition, professional style",
  "Tech/Futuristic":
    "futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, beautiful lighting, high-tech atmosphere",
  Minimalist:
    "minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point",
  Photorealistic:
    "photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field",
  Illustrated:
    "illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style",
};

const colorSchemeDescriptions = {
  vibrant:
    "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette",
  sunset:
    "warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow",
  forest:
    "natural green tones, earthy colors, calm and organic palette, fresh atmosphere",
  neon: "neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow",
  purple:
    "purple-dominant color palette, magenta and violet tones, modern and stylish mood",
  monochrome:
    "black and white color scheme, high contrast, dramatic lighting, timeless aesthetic",
  ocean:
    "cool blue and teal tones, aquatic color palette, fresh and clean atmosphere",
  pastel:
    "soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic", //
};

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      is_Generating: true,
    });

    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;
    if (color_scheme) {
      prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`;
    }
    if (user_prompt) {
      prompt += `Additional details: ${user_prompt}.`;
    }
    prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Include large, highly readable, bold 3D typography prominently displaying the exact text: "${title}". Make the text visually popping, professional, and impossible to ignore.`;

    console.log("Prompt:", prompt);
    let uploadResult: any = null;

    // ===== NVIDIA API ONLY =====
    let base64Image: string | null = null;
    let filename = "";

    try {
      console.log("Attempt 1: Generating image using NVIDIA FLUX.1-dev...");

      const nvidiaResponse = await fetch(
        "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
            seed: 0,
            steps: 28,
          }),
        },
      );

      if (!nvidiaResponse.ok) {
        throw new Error(`FLUX API returned ${nvidiaResponse.status}`);
      }

      const nvidiaData: any = await nvidiaResponse.json();
      if (nvidiaData.artifacts?.[0]?.base64) {
        const fb64 = nvidiaData.artifacts[0].base64;
        if (fb64.length >= 25000) {
          base64Image = fb64;
          filename = `final-output-${Date.now()}.jpg`;
          console.log("SUCCESS with FLUX.1-dev!");
        } else {
          console.log(
            "FLUX.1-dev Safety Filter triggered (black image). Fallback required.",
          );
        }
      }
    } catch (e: any) {
      console.log(`FLUX.1-dev failed: ${e.message}. Fallback required.`);
    }

    if (!base64Image) {
      console.log("Attempt 2: Falling back to NVIDIA Stable Diffusion XL...");
      const sdlResponse = await fetch(
        "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            text_prompts: [{ text: prompt, weight: 1 }],
            cfg_scale: 7,
            sampler: "K_DPM_2_ANCESTRAL",
            steps: 50,
            seed: 0,
            height: 1024,
            width: 1024,
            samples: 1,
          }),
        },
      );

      if (!sdlResponse.ok) {
        const errorData = await sdlResponse.text();
        throw new Error(
          `NVIDIA API error: ${sdlResponse.status} - ${errorData}`,
        );
      }

      const sdlData: any = await sdlResponse.json();
      if (!sdlData.artifacts?.[0]?.base64) {
        throw new Error("No image data in NVIDIA fallback response");
      }

      base64Image = sdlData.artifacts[0].base64;
      filename = `final-output-${Date.now()}.png`;
      console.log("SUCCESS with Stable Diffusion XL!");
    }

    if (!base64Image) {
      throw new Error("All NVIDIA image generation attempts failed.");
    }

    const buffer = Buffer.from(base64Image, "base64");

    const filePath = path.join("images", filename);

    fs.mkdirSync("images", { recursive: true });
    fs.writeFileSync(filePath, buffer);

    uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    fs.unlinkSync(filePath);

    console.log(
      "Successfully generated and uploaded via NVIDIA API (FLUX.1-dev).",
    );

    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    return res.json({ message: "Thumbnail Generated", thumbnail });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// control for thumbnail Deletion
export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;
    await Thumbnail.findByIdAndDelete({ _id: id, userId });

    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message }); //
  }
};

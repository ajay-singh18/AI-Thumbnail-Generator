import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import { GenerateContentConfig } from "@google/genai";
import ai from "../configs/ai.js";
import path from "node:path";
import fs from 'fs'
import { v2 as cloudinary } from "cloudinary";
import { Buffer } from "node:buffer";

const stylePrompts = {
    'Bold & Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',
    'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',
    'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',
    'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',
    'Illustrated': 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
}

const colorSchemeDescriptions = {
    vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    sunset: 'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',
    forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
    neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
    purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
    monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
    pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',  //
}

export const generateThumbnail = async (req:Request,res:Response)=>{
    try {
        const {userId} = req.session
        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay
        } = req.body;
        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used:user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            is_Generating:true
        })
        

        // gemini part

        // const model = 'gemini-3-pro-image-preview';
        // // const model = 'gemini-1.5-flash';
        // const generationConfig: GenerateContentConfig={
        //     maxOutputTokens:32768,
        //     temperature:1,
        //     topP:0.95,
        //     responseModalities: ['IMAGE'],
        //     imageConfig: {
        //         aspectRatio: aspect_ratio || '16:9',
        //         imageSize:'1K'
        //     },
        // }
        // let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;
        // if(color_scheme){
        //     prompt+= `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`
        // }
        // if(user_prompt){
        //     prompt += `Additional details: ${user_prompt}.`
        // }
        // prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximiza click-through rate. Make it bold, professional, and impossible to ignore.`
        // // Generate the image using the ai model
        // const response: any = await ai.models.generateContent({
        //     model,
        //     contents: [prompt],
        //     config: generationConfig
        // })

        // // Check if the response is valid
        // if(!response?.candidates?.[0]?.contents?.parts){
        //     throw new Error('Unexpected response')
        // }

        // const parts = response.candidates[0].content.parts;
        // let finalBuffer : Buffer | null = null;
        // for(const part of parts){
        //     if(part.inlineData){
        //         finalBuffer = Buffer.from(part.inlineData.data,'base64')
        //     }
        // }
        // const filename = `final-output-${Date.now()}.png`
        // const filePath = path.join('images',filename);

        // // create the image directory if it doesn't exist
        // fs.mkdirSync('images',{recursive:true})

        // // write the final image to the fiel
        // fs.writeFileSync(filePath,finalBuffer!)

        // const uploadResult = await cloudinary.uploader.upload(filePath,{resource_type:'image'})

        // thumbnail.image_url = uploadResult.url;
        // thumbnail.isGenerating = false;
        // await thumbnail.save()
        // res.json({messagge: 'Thumbnail Generated',thumbnail})
        // fs.unlinkSync(filePath)
    

    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;
        if(color_scheme){
            prompt+= `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`
        }
        if(user_prompt){
            prompt += `Additional details: ${user_prompt}.`
        }
        prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximiza click-through rate. Make it bold, professional, and impossible to ignore.`
        
        console.log("Prompt:", prompt);
        let uploadResult: any = null;

        try {
            console.log("Attempting to generate image using Hugging Face Inference API...");
            
            const hfResponse = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ inputs: prompt }),
                }
            );

            if (!hfResponse.ok) {
                throw new Error(`Hugging Face API error: ${hfResponse.statusText}`);
            }

            const arrayBuffer = await hfResponse.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const filename = `final-output-${Date.now()}.png`
            const filePath = path.join('images', filename);

            fs.mkdirSync('images', { recursive: true });
            fs.writeFileSync(filePath, buffer);

            uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: 'image' });
            fs.unlinkSync(filePath);
            
            console.log("Successfully generated and uploaded via Hugging Face.");

        } catch (hfError) {
            console.log("Hugging Face API failed, falling back to Cloudflare Workers AI...");
            console.log(hfError);
            
            try {
                const cloudflareResponse = await fetch(
                    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ prompt: prompt }),
                    }
                );

                if (!cloudflareResponse.ok) {
                    throw new Error(`Cloudflare API error: ${cloudflareResponse.statusText}`);
                }

                const arrayBuffer = await cloudflareResponse.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const filename = `final-output-${Date.now()}.png`
                const filePath = path.join('images', filename);

                // create the image directory if it doesn't exist
                fs.mkdirSync('images', { recursive: true });

                // write the final image to the file
                fs.writeFileSync(filePath, buffer);

                uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: 'image' });
                fs.unlinkSync(filePath); // clean up
                
                console.log("Successfully generated and uploaded via Cloudflare Workers AI.");
            } catch (cloudflareError) {
                console.log("Cloudflare AI failed, falling back to AI Horde...");
                console.log(cloudflareError);
                
                try {
                    const hordeRequest = await fetch('https://stablehorde.net/api/v2/generate/async', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': '0000000000'
                        },
                        body: JSON.stringify({
                            prompt: prompt,
                            params: {
                                n: 1,
                                width: 1024,
                                height: 576,
                                karras: true,
                            },
                            censor_nsfw: false
                        })
                    });

                    if (!hordeRequest.ok) {
                        throw new Error("Failed to start AI Horde generation");
                    }

                    const { id } = await hordeRequest.json();
                    
                    let hordeResult: any = null;
                    for (let i = 0; i < 12; i++) {
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        
                        const statusReq = await fetch(`https://stablehorde.net/api/v2/generate/status/${id}`);
                        const status = await statusReq.json();
                        
                        if (status.done && status.generations && status.generations.length > 0) {
                            hordeResult = status.generations[0].img;
                            break;
                        }
                    }

                    if (!hordeResult) {
                        throw new Error("AI Horde timed out after 60 seconds.");
                    }

                    console.log("AI Horde generation complete. Uploading to Cloudinary...");
                    
                    uploadResult = await cloudinary.uploader.upload(hordeResult, {
                        resource_type: "image",
                    });
                    
                    console.log("Successfully generated and uploaded via AI Horde.");
                } catch (hordeError) {
                    console.log("AI Horde failed, all fallbacks exhausted.");
                    console.log(hordeError);
                    throw new Error("All image generation APIs failed.");
                }
            }
        }

        thumbnail.image_url = uploadResult.secure_url;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        return res.json({ message: "Thumbnail Generated", thumbnail });

        
    } catch (error:any) {
        console.log(error);
        res.status(500).json({message:error.message})
        
    }
}

// control for thumbnail Deletion
export const deleteThumbnail = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const {userId} = req.session
        await Thumbnail.findByIdAndDelete({_id:id,userId})

        res.json({ message: 'Thumbnail deleted successfully'})
    } catch (error:any) {
        console.log(error);
        res.status(500).json({message:error.message}) //
    }

}
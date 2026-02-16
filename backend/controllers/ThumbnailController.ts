import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import { GenerateContentConfig } from "@google/genai";
import ai from "../configs/ai.js";
import path from "node:path";
import fs from 'fs'
import { v2 as cloudinary } from "cloudinary";

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
    pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic', //
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
    

    // Generate image using FREE Pollinations API
    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;
        if(color_scheme){
            prompt+= `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`
        }
        if(user_prompt){
            prompt += `Additional details: ${user_prompt}.`
        }
        prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximiza click-through rate. Make it bold, professional, and impossible to ignore.`
        // Generate the image using the ai model
        console.log(prompt);
        



    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(String(prompt))}`;
    // const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&seed=${Date.now()}`;



     // Upload directly to Cloudinary from URL
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
     resource_type: "image",
    });

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
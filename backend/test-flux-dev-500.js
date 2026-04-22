import fs from 'fs';

async function testFluxDev500() {
    const envFile = fs.readFileSync('.env', 'utf8');
    let apiKey = '';
    for (const line of envFile.split('\n')) {
        if (line.startsWith('NVIDIA_API_KEY=')) {
            apiKey = line.split('=')[1].replace(/"/g, '').trim();
        }
    }
    
    console.log("Testing NVIDIA with FLUX.1-dev to reproduce 500 error...");
    const prompt = `Create a eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style for: "React in 10 days"Use a purple-dominant color palette, magenta and violet tones, modern and stylish mood color scheme.Additional details: a tutor with a laptop teaching react.The thumbnail should be 16:9, visually stunning, and designed to maximize click-through rate. Include large, highly readable, bold 3D typography prominently displaying the exact text: "React in 10 days". Make the text visually popping, professional, and impossible to ignore.`;
    
    try {
        const payload = {
            prompt: prompt,
            seed: 0,
            steps: 28
        };
        console.log("Payload:", JSON.stringify(payload, null, 2));
        
        const nvidiaResponse = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const textResult = await nvidiaResponse.text();
        console.log("Status:", nvidiaResponse.status);
        if (nvidiaResponse.ok) {
            const data = JSON.parse(textResult);
            if (data.artifacts && data.artifacts[0]) {
                console.log("SUCCESS. Base64 length:", data.artifacts[0].base64.length);
            } else {
                console.log("FAILED (no artifacts). Data:", data);
            }
        } else {
            console.log("FAILED with status:", nvidiaResponse.status, "Body:", textResult);
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}
testFluxDev500();

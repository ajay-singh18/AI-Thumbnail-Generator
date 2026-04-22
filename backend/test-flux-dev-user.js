import fs from 'fs';

async function testFluxDevPrompt() {
    const envFile = fs.readFileSync('.env', 'utf8');
    let apiKey = '';
    for (const line of envFile.split('\n')) {
        if (line.startsWith('NVIDIA_API_KEY=')) {
            apiKey = line.split('=')[1].replace(/"/g, '').trim();
        }
    }
    
    console.log("Testing NVIDIA with FLUX.1-dev on user prompt...");
    const prompt = `Create a eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style for: "Reach in 10 days"Use a purple-dominant color palette, magenta and violet tones, modern and stylish mood color scheme.Additional details: A highly engaging, vibrant YouTube thumbnail. On the right, a young, expressive developer looking incredibly shocked and pointing towards the left side of the frame. On the left, a massive, glowing neon-blue React JS atom logo. Large, bold, 3D typography that reads "REACT IN 10 DAYS" floating in the air. Dark background with dramatic cyberpunk blue and purple edge lighting. 8k resolution, high contrast, visually popping..The thumbnail should be 16:9, visually stunning, and designed to maximiza click-through rate. Make it bold, professional, and impossible to ignore.`;
    
    try {
        const nvidiaResponse = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                seed: 0,
                steps: 28
            })
        });

        const data = await nvidiaResponse.json();
        if (nvidiaResponse.ok && data.artifacts && data.artifacts[0]) {
            console.log("SUCCESS. Base64 length:", data.artifacts[0].base64.length);
        } else {
            console.log("FAILED.", data);
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}
testFluxDevPrompt();

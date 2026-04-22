import fs from 'fs';

async function testFilter() {
    const envFile = fs.readFileSync('.env', 'utf8');
    let apiKey = '';
    for (const line of envFile.split('\n')) {
        if (line.startsWith('NVIDIA_API_KEY=')) {
            apiKey = line.split('=')[1].replace(/"/g, '').trim();
        }
    }
    
    // Testing different parts to see what triggers the 8KB black box...
    const prompts = [
        `a tutor with a laptop teaching coding`,
        `a tutor with a laptop teaching coding, bold typography "Learn react in 10 days"`,
        `Create a eye-catching thumbnail, bold typography, vibrant colors, for: "Learn react in 10 days"`,
        `Include large, highly readable, bold 3D typography prominently displaying the exact text: "Learn react in 10 days".`,
        `highly engaging composition, dynamic lighting, high contrast, click-worthy composition, professional style`,
        `Create a eye-catching thumbnail, bold typography, vibrant colors, highly engaging composition, dynamic lighting, high contrast, click-worthy composition, professional style for: "Learn react in 10 days"Use a purple-dominant color palette, magenta and violet tones, modern and stylish mood color scheme.Additional details: a tutor with a laptop teaching coding.The thumbnail should be 16:9, visually stunning, and designed to maximize click-through rate. Include large, highly readable, bold 3D typography prominently displaying the exact text: "Learn react in 10 days". Make the text visually popping, professional, and impossible to ignore.`
    ];

    for (let i = 0; i < prompts.length; i++) {
        console.log(`\nTesting Prompt ${i + 1}...`);
        try {
            const payload = { prompt: prompts[i], seed: 0, steps: 28 };
            const nvidiaResponse = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (nvidiaResponse.ok) {
                const data = await nvidiaResponse.json();
                const len = data.artifacts[0].base64.length;
                console.log(`Result: ${len < 25000 ? 'BLOCKED ❌' : 'SUCCESS ✅'} (${len} bytes)`);
            } else {
                console.log(`Error: ${nvidiaResponse.status}`);
            }
        } catch (e) {
            console.error("Error:", e.message);
        }
    }
}
testFilter();

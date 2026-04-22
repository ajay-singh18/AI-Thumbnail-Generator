import fs from 'fs';

async function testFluxDev() {
    const envFile = fs.readFileSync('.env', 'utf8');
    let apiKey = '';
    for (const line of envFile.split('\n')) {
        if (line.startsWith('NVIDIA_API_KEY=')) {
            apiKey = line.split('=')[1].replace(/"/g, '').trim();
        }
    }
    
    console.log("Testing NVIDIA with FLUX.1-dev...");
    try {
        const nvidiaResponse = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                prompt: "A test thumbnail with bold text",
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
testFluxDev();

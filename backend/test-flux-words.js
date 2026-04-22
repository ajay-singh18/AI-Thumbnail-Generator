import fs from 'fs';

async function testFluxWords() {
    const envFile = fs.readFileSync('.env', 'utf8');
    let apiKey = '';
    for (const line of envFile.split('\n')) {
        if (line.startsWith('NVIDIA_API_KEY=')) {
            apiKey = line.split('=')[1].replace(/"/g, '').trim();
        }
    }
    
    const parts = [
        `"Learn react in 10 days" with a tutor`,
        `eye-catching thumbnail`,
        `bold typography`,
        `vibrant colors`,
        `highly engaging composition`,
        `dynamic lighting`,
        `click-worthy composition`,
        `professional style`,
        `purple-dominant color palette`,
        `magenta and violet tones`,
        `modern and stylish mood color scheme`,
        `maximize click-through rate`,
        `visually popping`,
        `impossible to ignore`
    ];

    console.log("Testing which word triggers the NVIDIA filter...");

    for (let part of parts) {
        try {
            const nvidiaResponse = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: part, seed: 0, steps: 28 })
            });

            if (nvidiaResponse.ok) {
                const data = await nvidiaResponse.json();
                const len = data.artifacts[0].base64.length;
                console.log(`[${part}] -> ${len < 25000 ? 'BLOCKED ❌' : 'Clean ✅'} (${len})`);
            } else {
                console.log(`[${part}] -> API ERROR ${nvidiaResponse.status}`);
            }
        } catch (e) {
             console.log(`[${part}] -> Exception`);
        }
    }
}
testFluxWords();

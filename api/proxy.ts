
export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { messages } = await req.json();

        const NVIDIA_API_KEY = "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";
        const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

        const response = await fetch(NVIDIA_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NVIDIA_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "mistralai/mamba-codestral-7b-v0.1",
                messages: messages,
                temperature: 0.5,
                top_p: 1,
                max_tokens: 1024,
                stream: true,
            }),
        });

        return new Response(response.body, {
            status: response.status,
            headers: response.headers,
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// NVIDIA API Integration for Career Advisor
// Note: In production, move API key to environment variables

const NVIDIA_API_KEY = "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";
const NVIDIA_BASE_URL = "/api/nvidia";

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export async function askCareerQuestion(
    messages: Message[],
    onChunk: (text: string) => void
): Promise<void> {
    try {
        const isDev = import.meta.env.DEV;

        // In development, use the Vite proxy to avoid CORS and directly hit the API
        // In production, use the /api/proxy serverless function to hide the API key
        const url = isDev ? '/api/nvidia/chat/completions' : '/api/proxy';


        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (isDev) {
            // Development: Send full payload and key from client
            fetchOptions.headers = {
                ...fetchOptions.headers,
                'Authorization': `Bearer ${NVIDIA_API_KEY}`,
            };
            fetchOptions.body = JSON.stringify({
                model: "mistralai/mamba-codestral-7b-v0.1",
                messages: messages,
                temperature: 0.5,
                top_p: 1,
                max_tokens: 1024,
                stream: true,
            });
        } else {
            // Production: Send only messages, proxy handles key and config
            fetchOptions.body = JSON.stringify({
                messages: messages,
            });
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Details:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
            throw new Error('No response body');
        }

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) {
                            onChunk(content);
                        }
                    } catch (e) {
                        // Skip malformed JSON
                    }
                }
            }
        }
    } catch (error) {
        console.error('NVIDIA API Error:', error);
        throw error;
    }
}

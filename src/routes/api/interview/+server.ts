import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const SYSTEM_PROMPT = `You are a friendly, highly professional, and experienced HR & Technical Job Interviewer.
Your goal is to conduct a realistic job interview in English.

Guidelines:
1. Conduct the interview step-by-step, asking ONE concise, thoughtful question at a time.
2. Listen carefully to the candidate's previous response, acknowledge their answer briefly (1 sentence), and follow up with a relevant interview question.
3. Keep your answers concise (2 to 3 sentences maximum) because your response will be read aloud as speech via Text-to-Speech audio. Avoid markdown formatting like bullet points, asterisks, or long lists.
4. Always speak naturally, professionally, and encouragingly in English.`;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { messages } = await request.json();

		const apiKey = env.ROUTER_API_KEY || 'sk-ba95bd0e3b261017-ek25st-f510b898';
		const baseUrl = env.ROUTER_BASE_URL || 'http://127.0.0.1:20128/v1';
		const model = env.ROUTER_MODEL || 'FreeTier';

		const chatMessages = [
			{ role: 'system', content: SYSTEM_PROMPT },
			...(messages || []).map((m: { sender: string; text: string }) => ({
				role: m.sender === 'ai' ? 'assistant' : 'user',
				content: m.text
			}))
		];

		const response = await fetch(`${baseUrl}/chat/completions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model,
				messages: chatMessages,
				stream: false
			})
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('9Router API error:', response.status, errorText);
			return json({ error: 'Failed to communicate with AI service' }, { status: 500 });
		}

		const data = await response.json();
		const reply = data.choices?.[0]?.message?.content || "Thank you for your response. Could you tell me more about your recent projects?";

		return json({ reply });
	} catch (error: any) {
		console.error('API Handler Error:', error);
		return json({ error: error.message || 'Internal Server Error' }, { status: 500 });
	}
};

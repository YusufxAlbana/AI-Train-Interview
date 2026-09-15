import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const SYSTEM_PROMPT = `You are a professional HR & Technical Job Interviewer conducting a realistic job interview.
Your goal is to evaluate the candidate's skills, experience, and fit for the position through a structured interview process.

Guidelines:
1. Start by asking the candidate to introduce themselves and describe the position they're applying for.
2. Ask ONE relevant, thoughtful interview question at a time based on their previous responses.
3. Listen carefully to their answers and ask follow-up questions to dig deeper into their experience.
4. Keep your responses concise (2-3 sentences) because they will be read aloud via Text-to-Speech.
5. Ask about: technical skills, work experience, problem-solving, strengths/weaknesses, and behavioral questions.
6. Be professional, encouraging, and realistic like a real interviewer.
7. Avoid markdown formatting, bullet points, or long lists - speak naturally.
8. Always speak in English and maintain a professional interview tone.`;

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
		const reply = data.choices?.[0]?.message?.content || "I understand. How can I help you further?";

		return json({ reply });
	} catch (error: any) {
		console.error('API Handler Error:', error);
		return json({ error: error.message || 'Internal Server Error' }, { status: 500 });
	}
};

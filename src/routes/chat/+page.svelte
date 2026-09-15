<script lang="ts">
	import { onMount } from 'svelte';

	let isLoading = $state(false);
	let isSpeaking = $state(false);
	let isListening = $state(false);
	let currentTranscript = $state('');
	let lastAiMessage = $state('');
	let silenceTimer: number | null = null;

	interface Message {
		sender: 'ai' | 'user';
		text: string;
	}

	let messages = $state<Message[]>([
		{
			sender: 'ai',
			text: 'Welcome to your interview practice session. Please introduce yourself and tell me about the position you are applying for.'
		}
	]);

	// Web Speech API references
	let synth: SpeechSynthesis | null = null;
	let recognition: any = null;

	onMount(() => {
		if (typeof window !== 'undefined') {
			if ('speechSynthesis' in window) {
				synth = window.speechSynthesis;
			}

			const SpeechRecognition =
				(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

			if (SpeechRecognition) {
				recognition = new SpeechRecognition();
				recognition.lang = 'en-US';
				recognition.continuous = false;
				recognition.interimResults = true;

				recognition.onresult = (event: any) => {
					let transcript = '';
					for (let i = event.resultIndex; i < event.results.length; i++) {
						transcript += event.results[i][0].transcript;
					}
					currentTranscript = transcript;

					// Reset silence timer when user speaks
					if (silenceTimer) {
						clearTimeout(silenceTimer);
					}
					silenceTimer = window.setTimeout(() => {
						handleSilenceTimeout();
					}, 10000);
				};

				recognition.onend = () => {
					isListening = false;

					// Auto-send when user stops speaking
					if (currentTranscript.trim()) {
						// Clear timer only if we have a response to send
						if (silenceTimer) {
							clearTimeout(silenceTimer);
							silenceTimer = null;
						}
						sendMessage(currentTranscript.trim());
					} else {
						// If no transcript and timer is still running, restart recognition
						// Browser speech recognition often times out automatically
						if (silenceTimer && !isLoading && !isSpeaking) {
							try {
								recognition.start();
								isListening = true;
							} catch (e) {
								console.error('Failed to restart recognition:', e);
							}
						}
					}
				};

				recognition.onerror = (err: any) => {
					console.error('Speech Recognition Error:', err);
					isListening = false;
				};
			}
		}

		// Start with AI speaking the welcome message
		setTimeout(() => {
			speakText(messages[0].text);
		}, 500);
	});

	// Speak Text-to-Speech
	function speakText(text: string) {
		if (!synth) {
			alert('Your browser does not support Text-to-Speech.');
			return;
		}

		synth.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'en-US';
		utterance.rate = 0.95;

		utterance.onstart = () => {
			isSpeaking = true;
			lastAiMessage = text;
		};

		utterance.onend = () => {
			isSpeaking = false;
			// Auto-start listening after AI finishes speaking
			setTimeout(() => {
				startListening();
			}, 500);
		};

		utterance.onerror = () => {
			isSpeaking = false;
		};

		synth.speak(utterance);
	}

	// Start listening automatically
	function startListening() {
		if (!recognition) {
			alert('Your browser does not support Speech Recognition. Please use Google Chrome or Microsoft Edge.');
			return;
		}

		try {
			recognition.start();
			isListening = true;
			currentTranscript = '';

			// Start silence timer
			if (silenceTimer) {
				clearTimeout(silenceTimer);
			}
			silenceTimer = window.setTimeout(() => {
				handleSilenceTimeout();
			}, 10000);
		} catch (e) {
			console.error(e);
		}
	}

	// Handle 10-second silence timeout
	async function handleSilenceTimeout() {
		console.log('Silence timeout triggered');
		if (silenceTimer) {
			clearTimeout(silenceTimer);
			silenceTimer = null;
		}

		if (isListening && recognition) {
			recognition.stop();
			isListening = false;
		}

		// AI generates a natural follow-up question
		const confusedResponses = [
			"Hello? Are you still there? I didn't hear your response.",
			"I'm not sure if you're still with me. Could you please respond?",
			"It seems quiet on your end. Are you having trouble with the microphone?",
			"I'm waiting for your answer. Is everything okay?",
			"Hello? I'd love to hear your thoughts on this question."
		];

		const randomResponse = confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
		console.log('AI asking:', randomResponse);
		messages = [...messages, { sender: 'ai' as const, text: randomResponse }];
		speakText(randomResponse);
	}

	// Send message to AI automatically
	async function sendMessage(userText: string) {
		if (!userText.trim() || isLoading) return;

		const updatedMessages = [...messages, { sender: 'user' as const, text: userText }];
		messages = updatedMessages;
		currentTranscript = '';
		isLoading = true;

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: updatedMessages })
			});

			const data = await res.json();
			if (data.reply) {
				messages = [...messages, { sender: 'ai' as const, text: data.reply }];
				speakText(data.reply);
			} else {
				const fallback = "I understand. Could you elaborate on that?";
				messages = [...messages, { sender: 'ai' as const, text: fallback }];
				speakText(fallback);
			}
		} catch (err) {
			console.error('Chat API error:', err);
			const fallback = "I apologize, but I encountered an error. Could you please repeat that?";
			messages = [...messages, { sender: 'ai' as const, text: fallback }];
			speakText(fallback);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Interview Practice - AI Interviewer</title>
	<meta name="description" content="Practice job interviews with AI interviewer using voice" />
</svelte:head>

<div class="voice-container">
	<div class="header">
		<h2>Voice Interview Practice</h2>
		<div class="interview-badge">Auto Mode</div>
	</div>

	<div class="voice-visualizer">
		<div class="orb-container">
			<div class="orb" class:speaking={isSpeaking} class:listening={isListening} class:thinking={isLoading}>
				{#if isSpeaking}
					<div class="wave wave-1"></div>
					<div class="wave wave-2"></div>
					<div class="wave wave-3"></div>
				{:else if isListening}
					<div class="pulse pulse-1"></div>
					<div class="pulse pulse-2"></div>
					<div class="pulse pulse-3"></div>
				{:else if isLoading}
					<div class="dots">
						<div class="dot"></div>
						<div class="dot"></div>
						<div class="dot"></div>
					</div>
				{/if}
			</div>
		</div>

		<div class="status-text">
			{#if isSpeaking}
				<p>Interviewer is asking a question...</p>
			{:else if isListening}
				<p>Listening to your answer...</p>
			{:else if isLoading}
				<p>Thinking...</p>
			{:else}
				<p>Ready</p>
			{/if}
		</div>

		{#if currentTranscript}
			<div class="transcript-preview">
				<p>{currentTranscript}</p>
			</div>
		{/if}
	</div>

	<div class="controls">
		<button class="stop-btn" onclick={() => {
			if (synth) synth.cancel();
			if (recognition && isListening) recognition.stop();
			isListening = false;
			isSpeaking = false;
		}}>
			Stop
		</button>
		<button class="restart-btn" onclick={() => {
			messages = [{ sender: 'ai', text: 'Welcome to your interview practice session. Please introduce yourself and tell me about the position you are applying for.' }];
			speakText(messages[0].text);
		}}>
			Restart
		</button>
	</div>
</div>

<style>
	.voice-container {
		max-width: 800px;
		margin: 2rem auto;
		background: rgba(30, 41, 59, 0.95);
		border: 1px solid var(--surface-border);
		border-radius: 24px;
		min-height: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 3rem;
	}

	.header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: var(--text-primary);
	}

	.interview-badge {
		background: linear-gradient(135deg, var(--primary), var(--secondary));
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.voice-visualizer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		flex: 1;
		justify-content: center;
	}

	.orb-container {
		position: relative;
		width: 200px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.orb {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary), var(--secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: all 0.3s ease;
	}

	.orb.speaking {
		animation: speaking-pulse 1s ease-in-out infinite;
	}

	.orb.listening {
		animation: listening-pulse 2s ease-in-out infinite;
	}

	.orb.thinking {
		animation: thinking-rotate 2s linear infinite;
	}

	@keyframes speaking-pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.1); }
	}

	@keyframes listening-pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(1.05); opacity: 0.8; }
	}

	@keyframes thinking-rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.wave {
		position: absolute;
		border-radius: 50%;
		border: 2px solid var(--primary);
		opacity: 0;
	}

	.orb.speaking .wave {
		animation: wave-expand 1.5s ease-out infinite;
	}

	.wave-1 {
		width: 120px;
		height: 120px;
		animation-delay: 0s;
	}

	.wave-2 {
		width: 120px;
		height: 120px;
		animation-delay: 0.5s;
	}

	.wave-3 {
		width: 120px;
		height: 120px;
		animation-delay: 1s;
	}

	@keyframes wave-expand {
		0% { transform: scale(1); opacity: 0.8; }
		100% { transform: scale(2); opacity: 0; }
	}

	.pulse {
		position: absolute;
		border-radius: 50%;
		background: rgba(79, 70, 229, 0.3);
	}

	.orb.listening .pulse {
		animation: pulse-expand 2s ease-out infinite;
	}

	.pulse-1 {
		width: 120px;
		height: 120px;
		animation-delay: 0s;
	}

	.pulse-2 {
		width: 120px;
		height: 120px;
		animation-delay: 0.7s;
	}

	.pulse-3 {
		width: 120px;
		height: 120px;
		animation-delay: 1.4s;
	}

	@keyframes pulse-expand {
		0% { transform: scale(1); opacity: 0.6; }
		100% { transform: scale(1.8); opacity: 0; }
	}

	.dots {
		display: flex;
		gap: 8px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: white;
		animation: dot-bounce 1.4s ease-in-out infinite;
	}

	.dot:nth-child(1) { animation-delay: 0s; }
	.dot:nth-child(2) { animation-delay: 0.2s; }
	.dot:nth-child(3) { animation-delay: 0.4s; }

	@keyframes dot-bounce {
		0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
		40% { transform: scale(1.2); opacity: 1; }
	}

	.status-text {
		text-align: center;
		min-height: 60px;
	}

	.status-text p {
		margin: 0;
		font-size: 1.2rem;
		color: var(--text-primary);
		font-weight: 500;
	}

	.transcript-preview {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--surface-border);
		border-radius: 12px;
		padding: 1rem 1.5rem;
		max-width: 400px;
		text-align: center;
	}

	.transcript-preview p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.95rem;
		font-style: italic;
	}

	.controls {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}

	.stop-btn, .restart-btn {
		padding: 0.75rem 1.5rem;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
	}

	.stop-btn {
		background: #ef4444;
		color: white;
	}

	.stop-btn:hover {
		background: #dc2626;
		transform: translateY(-2px);
	}

	.restart-btn {
		background: var(--primary);
		color: white;
	}

	.restart-btn:hover {
		background: var(--primary-hover);
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.voice-container {
			margin: 0;
			min-height: 100vh;
			border-radius: 0;
			padding: 2rem;
		}

		.orb-container {
			width: 150px;
			height: 150px;
		}

		.orb {
			width: 90px;
			height: 90px;
		}
	}
</style>

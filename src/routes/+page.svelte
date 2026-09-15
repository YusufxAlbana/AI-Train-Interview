<script lang="ts">
	import { onMount } from 'svelte';

	// Modal & Interview State
	let isModalOpen = $state(false);
	let isSpeaking = $state(false);
	let isListening = $state(false);
	let userInput = $state('');

	interface Message {
		sender: 'ai' | 'user';
		text: string;
	}

	let messages = $state<Message[]>([
		{
			sender: 'ai',
			text: 'Halo! Selamat datang di sesi wawancara AI. Bisakah Anda menceritakan sedikit tentang diri Anda dan posisi yang ingin Anda lamar?'
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
				recognition.lang = 'id-ID';
				recognition.continuous = false;
				recognition.interimResults = true;

				recognition.onresult = (event: any) => {
					let transcript = '';
					for (let i = event.resultIndex; i < event.results.length; i++) {
						transcript += event.results[i][0].transcript;
					}
					userInput = transcript;
				};

				recognition.onend = () => {
					isListening = false;
				};

				recognition.onerror = (err: any) => {
					console.error('Speech Recognition Error:', err);
					isListening = false;
				};
			}
		}
	});

	// Speak Text-to-Speech
	function speakText(text: string) {
		if (!synth) {
			alert('Browser Anda tidak mendukung Text-to-Speech.');
			return;
		}

		synth.cancel(); // Stop any ongoing speech
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'id-ID';
		utterance.rate = 0.95; // Slightly natural pace

		utterance.onstart = () => {
			isSpeaking = true;
		};

		utterance.onend = () => {
			isSpeaking = false;
		};

		utterance.onerror = () => {
			isSpeaking = false;
		};

		synth.speak(utterance);
	}

	// Toggle Microphone Speech-to-Text
	function toggleListening() {
		if (!recognition) {
			alert('Browser Anda tidak mendukung Speech Recognition (Pengenal Suara). Gunakan Chrome atau Edge.');
			return;
		}

		if (isListening) {
			recognition.stop();
			isListening = false;
		} else {
			try {
				recognition.start();
				isListening = true;
			} catch (e) {
				console.error(e);
			}
		}
	}

	// Open Interview Simulation
	function startSimulation() {
		isModalOpen = true;
		// Auto speak the initial AI question after a slight delay
		setTimeout(() => {
			speakText(messages[0].text);
		}, 400);
	}

	function closeModal() {
		isModalOpen = false;
		if (synth) synth.cancel();
		if (recognition && isListening) {
			recognition.stop();
			isListening = false;
		}
	}

	// Handle Sending Answer
	function sendMessage() {
		if (!userInput.trim()) return;

		const userText = userInput.trim();
		messages = [...messages, { sender: 'user', text: userText }];
		userInput = '';

		// Stop listening if active
		if (isListening && recognition) {
			recognition.stop();
			isListening = false;
		}

		// Simulated AI Follow-up
		setTimeout(() => {
			const aiReplies = [
				'Terima kasih atas penjelasannya! Apa tantangan terbesar yang pernah Anda hadapi dalam pekerjaan sebelumnya dan bagaimana Anda mengatasinya?',
				'Menarik sekali! Menurut Anda, apa kelebihan utama yang membuat Anda cocok untuk posisi ini?',
				'Bagus sekali. Bisakah Anda memberikan contoh proyek sukses yang pernah Anda selesaikan?'
			];
			const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];

			messages = [...messages, { sender: 'ai', text: randomReply }];
			speakText(randomReply);
		}, 1000);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			sendMessage();
		}
	}
</script>

<svelte:head>
	<title>AI Interview Trainer - Latihan Wawancara Tanpa Grogi</title>
	<meta name="description" content="Latih kemampuan interview Anda langsung dengan AI canggih tanpa perlu berhadapan dengan orang asli." />
</svelte:head>

<main class="landing">
	<div class="background-effects">
		<div class="glow-orb primary-orb"></div>
		<div class="glow-orb secondary-orb"></div>
	</div>

	<section class="hero">
		<div class="hero-content">
			<div class="badge">🚀 Versi Beta Tersedia</div>
			<h1>Kuasai Wawancara Anda<br/><span class="gradient-text">Tanpa Rasa Gugup</span></h1>
			<p class="subtitle">
				Latih kemampuan komunikasi dan interview Anda langsung dengan AI. Dapatkan feedback real-time tanpa harus berbicara dengan orang asli. Persiapkan karir Anda dengan percaya diri!
			</p>
			<div class="cta-group">
				<button class="btn-primary" onclick={startSimulation}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
					Mulai Simulasi Suara
				</button>
				<button class="btn-outline" onclick={() => speakText("Halo, ini adalah contoh suara AI menggunakan Web Speech API bawaan browser.")}>
					<span class="play-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
					</span> Tes Suara AI
				</button>
			</div>
		</div>
		<div class="hero-visual">
			<div class="glass-card chat-preview">
				<div class="chat-header">
					<div class="ai-avatar">AI</div>
					<div class="ai-info">
						<strong>Interviewer Bot</strong>
						<span>{isSpeaking ? '🔊 Sedang Berbicara...' : 'Online (Siap Bicara)'}</span>
					</div>
				</div>
				<div class="chat-body">
					<div class="message ai">
						Ceritakan tentang diri Anda dan pengalaman kerja terakhir Anda.
						<button class="speak-btn" title="Dengarkan Suara" onclick={() => speakText("Ceritakan tentang diri Anda dan pengalaman kerja terakhir Anda.")}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
						</button>
					</div>
					<div class="message user">
						Halo! Nama saya Budi, saya memiliki 3 tahun pengalaman sebagai Software Engineer di...
					</div>
					{#if isSpeaking}
						<div class="message ai typing">
							<span class="speaking-wave">🔊 AI sedang berbicara...</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section id="features" class="features">
		<h2>Mengapa Memilih AInterview?</h2>
		<div class="feature-grid">
			<div class="feature-card">
				<div class="icon-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
				</div>
				<h3>AI Interaktif & Suara</h3>
				<p>Berinteraksi dengan asisten AI menggunakan percakapan suara langsung bawaan browser tanpa latency.</p>
			</div>
			<div class="feature-card">
				<div class="icon-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
				</div>
				<h3>Bebas Tekanan</h3>
				<p>Lakukan kesalahan sebanyak yang Anda mau tanpa takut dihakimi. Ruang aman untuk belajar.</p>
			</div>
			<div class="feature-card">
				<div class="icon-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
				</div>
				<h3>Feedback Real-Time</h3>
				<p>Dapatkan analisis komprehensif mengenai tata bahasa, kelancaran bicara, dan jawaban Anda.</p>
			</div>
		</div>
	</section>

	<section id="how-it-works" class="how-it-works">
		<h2>Bagaimana Cara Kerjanya?</h2>
		<div class="steps-container">
			<div class="step">
				<div class="step-number">1</div>
				<div class="step-content">
					<h3>Pilih Posisi Pekerjaan</h3>
					<p>Tentukan posisi yang ingin Anda lamar (misal: Software Engineer, Marketing, dll). AI akan menyesuaikan konteks pertanyaannya.</p>
				</div>
			</div>
			<div class="step-line"></div>
			<div class="step">
				<div class="step-number">2</div>
				<div class="step-content">
					<h3>Bicara / Ketik Jawaban</h3>
					<p>Gunakan mikrofon Anda untuk menjawab secara lisan. AI akan mendengarkan dan mengubah suara Anda menjadi teks secara gratis.</p>
				</div>
			</div>
			<div class="step-line"></div>
			<div class="step">
				<div class="step-number">3</div>
				<div class="step-content">
					<h3>Dapatkan Feedback</h3>
					<p>Selesai interview, AI akan memberikan skor dan ulasan komprehensif tentang performa dan hal yang perlu ditingkatkan.</p>
				</div>
			</div>
		</div>
	</section>
</main>

{#if isModalOpen}
	<div class="modal-overlay" onclick={closeModal}>
		<div class="modal-card" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<div class="ai-profile">
					<div class="ai-avatar-large">AI</div>
					<div>
						<h3>Simulasi Wawancara AI</h3>
						<span class="status-badge" class:active={isSpeaking || isListening}>
							{#if isSpeaking}
								🔊 AI Sedang Berbicara...
							{:else if isListening}
								🎙️ Mendengarkan Suara Anda...
							{:else}
								🟢 Menunggu Jawaban Anda
							{/if}
						</span>
					</div>
				</div>
				<button class="close-btn" onclick={closeModal}>✕</button>
			</div>

			<div class="modal-chat-body">
				{#each messages as msg}
					<div class="chat-row" class:user-row={msg.sender === 'user'}>
						<div class="chat-bubble" class:ai-bubble={msg.sender === 'ai'} class:user-bubble={msg.sender === 'user'}>
							<p>{msg.text}</p>
							{#if msg.sender === 'ai'}
								<button class="replay-btn" onclick={() => speakText(msg.text)} title="Putar Ulang Suara">
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<div class="modal-input-area">
				<input
					type="text"
					placeholder={isListening ? "Sedang mendengarkan ucapan Anda..." : "Ketik jawaban Anda atau klik ikon mikrofon..."}
					bind:value={userInput}
					onkeydown={handleKeydown}
				/>
				<button
					class="mic-btn"
					class:listening={isListening}
					onclick={toggleListening}
					title={isListening ? "Hentikan Rekaman" : "Mulai Bicara (Mikrofon)"}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
				</button>
				<button class="send-btn" onclick={sendMessage} disabled={!userInput.trim()}>
					Kirim
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.landing {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 5%;
		overflow: hidden;
	}

	.background-effects {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		overflow: hidden;
	}

	.glow-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		opacity: 0.4;
		animation: float 10s infinite ease-in-out alternate;
	}

	.primary-orb {
		top: -10%;
		right: -10%;
		width: 600px;
		height: 600px;
		background: var(--primary);
	}

	.secondary-orb {
		bottom: -10%;
		left: -10%;
		width: 500px;
		height: 500px;
		background: var(--secondary);
		animation-delay: -5s;
	}

	@keyframes float {
		0% { transform: translate(0, 0) scale(1); }
		100% { transform: translate(-30px, 50px) scale(1.1); }
	}

	.hero {
		width: 100%;
		max-width: 1200px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4rem;
		margin-top: 4rem;
		z-index: 10;
	}

	.hero-content {
		flex: 1;
		max-width: 600px;
	}

	.badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: rgba(79, 70, 229, 0.1);
		color: #818cf8;
		border: 1px solid rgba(79, 70, 229, 0.2);
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 3.5rem;
		font-weight: 800;
		letter-spacing: -1px;
		margin-bottom: 1.5rem;
	}

	.gradient-text {
		background: linear-gradient(135deg, #818cf8 0%, #38bdf8 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-size: 1.15rem;
		color: var(--text-secondary);
		margin-bottom: 2.5rem;
		max-width: 500px;
	}

	.cta-group {
		display: flex;
		gap: 1rem;
	}

	button {
		border: none;
		border-radius: 12px;
		padding: 0.875rem 1.75rem;
		font-size: 1rem;
		font-weight: 600;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.btn-primary {
		background: var(--primary);
		color: white;
		box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.39);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-primary:hover {
		background: var(--primary-hover);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(79, 70, 229, 0.23);
	}

	.btn-outline {
		background: transparent;
		color: var(--text-primary);
		border: 1px solid var(--surface-border);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-outline:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.hero-visual {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		position: relative;
	}

	.glass-card {
		background: rgba(30, 41, 59, 0.7);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid var(--surface-border);
		border-radius: 24px;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.chat-preview {
		width: 100%;
		max-width: 460px;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}

	.chat-preview:hover {
		transform: translateY(-6px);
		box-shadow: 0 30px 60px -15px rgba(79, 70, 229, 0.3);
		border-color: rgba(79, 70, 229, 0.4);
	}

	.chat-header {
		padding: 1.5rem;
		border-bottom: 1px solid var(--surface-border);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.ai-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary), var(--secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		color: white;
	}

	.ai-info {
		display: flex;
		flex-direction: column;
	}

	.ai-info span {
		font-size: 0.85rem;
		color: var(--success);
	}

	.chat-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.message {
		padding: 1rem 1.25rem;
		border-radius: 18px;
		font-size: 0.95rem;
		line-height: 1.5;
		max-width: 85%;
		position: relative;
	}

	.message.ai {
		background: rgba(255, 255, 255, 0.05);
		align-self: flex-start;
		border-bottom-left-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.message.user {
		background: var(--primary);
		align-self: flex-end;
		border-bottom-right-radius: 4px;
	}

	.speak-btn {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 50%;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		color: var(--text-primary);
	}

	.speak-btn:hover {
		background: var(--primary);
	}

	.speaking-wave {
		font-size: 0.85rem;
		color: #818cf8;
	}

	.features {
		width: 100%;
		max-width: 1200px;
		margin-top: 8rem;
		margin-bottom: 4rem;
		text-align: center;
		z-index: 10;
	}

	.features h2 {
		font-size: 2.5rem;
		margin-bottom: 3rem;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.feature-card {
		background: rgba(30, 41, 59, 0.4);
		border: 1px solid var(--surface-border);
		border-radius: 20px;
		padding: 2.5rem 2rem;
		text-align: left;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.feature-card:hover {
		background: rgba(30, 41, 59, 0.8);
		transform: translateY(-5px);
		border-color: rgba(79, 70, 229, 0.4);
	}

	.icon-wrapper {
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
		display: inline-block;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 16px;
		width: fit-content;
	}

	.feature-card h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.feature-card p {
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	.how-it-works {
		width: 100%;
		max-width: 1000px;
		margin-bottom: 8rem;
		text-align: center;
		z-index: 10;
	}

	.how-it-works h2 {
		font-size: 2.5rem;
		margin-bottom: 4rem;
	}

	.steps-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		position: relative;
	}

	.step {
		display: flex;
		align-items: center;
		gap: 2rem;
		background: rgba(30, 41, 59, 0.4);
		border: 1px solid var(--surface-border);
		border-radius: 20px;
		padding: 2rem;
		text-align: left;
		transition: transform 0.3s, box-shadow 0.3s;
	}

	.step:hover {
		transform: scale(1.02);
		box-shadow: 0 10px 30px -10px rgba(79, 70, 229, 0.3);
		border-color: rgba(79, 70, 229, 0.4);
	}

	.step-number {
		width: 60px;
		height: 60px;
		flex-shrink: 0;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary), var(--secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 800;
		color: white;
		box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
	}

	.step-content h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.step-content p {
		color: var(--text-secondary);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(15, 23, 42, 0.8);
		backdrop-filter: blur(12px);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.modal-card {
		background: rgba(30, 41, 59, 0.95);
		border: 1px solid var(--surface-border);
		border-radius: 24px;
		width: 100%;
		max-width: 650px;
		height: 600px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
	}

	.modal-header {
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid var(--surface-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.ai-profile {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.ai-avatar-large {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary), var(--secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		color: white;
	}

	.status-badge {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.status-badge.active {
		color: #38bdf8;
	}

	.close-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		font-size: 1.25rem;
		padding: 0.5rem;
	}

	.close-btn:hover {
		color: white;
	}

	.modal-chat-body {
		flex: 1;
		padding: 1.5rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.chat-row {
		display: flex;
		width: 100%;
	}

	.chat-row.user-row {
		justify-content: flex-end;
	}

	.chat-bubble {
		max-width: 80%;
		padding: 1rem 1.25rem;
		border-radius: 18px;
		font-size: 0.95rem;
		position: relative;
	}

	.ai-bubble {
		background: rgba(255, 255, 255, 0.06);
		border-bottom-left-radius: 4px;
	}

	.user-bubble {
		background: var(--primary);
		color: white;
		border-bottom-right-radius: 4px;
	}

	.replay-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		margin-top: 0.5rem;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8rem;
	}

	.replay-btn:hover {
		color: white;
	}

	.modal-input-area {
		padding: 1.25rem;
		border-top: 1px solid var(--surface-border);
		display: flex;
		gap: 0.75rem;
		background: rgba(15, 23, 42, 0.4);
	}

	.modal-input-area input {
		flex: 1;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--surface-border);
		border-radius: 12px;
		padding: 0.875rem 1.25rem;
		color: white;
		font-size: 0.95rem;
		outline: none;
	}

	.modal-input-area input:focus {
		border-color: var(--primary);
	}

	.mic-btn {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--surface-border);
		border-radius: 12px;
		color: var(--text-primary);
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.mic-btn.listening {
		background: #ef4444;
		border-color: #ef4444;
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
		70% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
		100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
	}

	.send-btn {
		background: var(--primary);
		color: white;
		border: none;
		border-radius: 12px;
		padding: 0 1.5rem;
		font-weight: 600;
	}

	.send-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (min-width: 768px) {
		.steps-container {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}

		.step {
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 2.5rem 1.5rem;
			flex: 1;
			height: 100%;
		}
	}

	@media (max-width: 968px) {
		.hero {
			flex-direction: column;
			text-align: center;
			gap: 3rem;
		}

		.hero-content {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		h1 {
			font-size: 2.75rem;
		}
	}
</style>

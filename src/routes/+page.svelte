<script lang="ts">
	// Landing Page for AI Train Interview
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
				<button class="btn-primary">Mulai Simulasi Gratis</button>
				<button class="btn-outline">
					<span class="play-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
					</span> Lihat Demo
				</button>
			</div>
		</div>
		<div class="hero-visual">
			<div class="glass-card chat-preview">
				<div class="chat-header">
					<div class="ai-avatar">AI</div>
					<div class="ai-info">
						<strong>Interviewer Bot</strong>
						<span>Sedang online...</span>
					</div>
				</div>
				<div class="chat-body">
					<div class="message ai">
						Ceritakan tentang diri Anda dan pengalaman kerja terakhir Anda.
					</div>
					<div class="message user">
						Halo! Nama saya Budi, saya memiliki 3 tahun pengalaman sebagai Software Engineer di...
					</div>
					<div class="message ai typing">
						<span class="dot"></span><span class="dot"></span><span class="dot"></span>
					</div>
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
				<h3>AI yang Realistis</h3>
				<p>Berinteraksi dengan asisten AI yang dapat menyesuaikan tingkat kesulitan pertanyaan seperti HR profesional.</p>
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
				<h3>Feedback Mendalam</h3>
				<p>Dapatkan analisis komprehensif mengenai tata bahasa, relevansi jawaban, dan rasa percaya diri Anda.</p>
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
					<h3>Mulai Simulasi Chat/Suara</h3>
					<p>Jawab pertanyaan layaknya wawancara sungguhan. AI akan merespon dan menanyakan pertanyaan lanjutan berdasarkan jawaban Anda.</p>
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
		font-size: 4rem;
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
		font-size: 1.25rem;
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
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.btn-primary {
		background: var(--primary);
		color: white;
		box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.39);
	}

	.btn-primary:hover {
		background: var(--primary-hover);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(79, 70, 229, 0.23);
	}

	.btn-secondary {
		background: transparent;
		color: var(--text-primary);
		padding: 0.5rem 1.5rem;
	}
	
	.btn-secondary:hover {
		background: var(--surface);
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
	}

	.message.ai {
		background: rgba(255, 255, 255, 0.05);
		align-self: flex-start;
		border-bottom-left-radius: 4px;
	}

	.message.user {
		background: var(--primary);
		align-self: flex-end;
		border-bottom-right-radius: 4px;
	}

	.typing .dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--text-secondary);
		margin: 0 2px;
		animation: jump 1.4s infinite ease-in-out both;
	}

	.typing .dot:nth-child(1) { animation-delay: -0.32s; }
	.typing .dot:nth-child(2) { animation-delay: -0.16s; }

	@keyframes jump {
		0%, 80%, 100% { transform: scale(0); }
		40% { transform: scale(1); }
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
	}

	.feature-card h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.feature-card p {
		color: var(--text-secondary);
		font-size: 0.95rem;
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
			font-size: 3rem;
		}

		.chat-preview {
			transform: none;
		}

		.chat-preview:hover {
			transform: translateY(-10px);
		}
	}

	@media (max-width: 640px) {
		.nav-links {
			display: none;
		}

		h1 {
			font-size: 2.5rem;
		}

		.cta-group {
			flex-direction: column;
			width: 100%;
		}
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

		.step-line {
			display: none; /* Hide for now, can implement dashed line later */
		}
	}
</style>

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
	<aside class="sidebar">
		<div class="logo">
			<span class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
			</span>
			<span class="text">AInterview</span>
		</div>
		<nav class="nav-links">
			<a href="/" class="active">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
				Beranda
			</a>
			<a href="#features">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
				Fitur
			</a>
			<a href="#how-it-works">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
				Cara Kerja
			</a>
		</nav>
		<div class="sidebar-footer">
			<button class="btn-login">Masuk / Daftar</button>
		</div>
	</aside>
	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.app-layout {
		display: flex;
		min-height: 100vh;
		background-color: var(--background);
	}

	.sidebar {
		width: 280px;
		background: rgba(30, 41, 59, 0.5);
		border-right: 1px solid var(--surface-border);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		display: flex;
		flex-direction: column;
		padding: 2rem 1.5rem;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: 50;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.5px;
		color: var(--text-primary);
		margin-bottom: 3rem;
		padding: 0 0.5rem;
	}

	.icon {
		color: var(--primary);
	}

	.nav-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.nav-links a {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 12px;
		color: var(--text-secondary);
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.nav-links a:hover {
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.nav-links a.active {
		color: var(--primary);
		background: rgba(79, 70, 229, 0.1);
	}

	.sidebar-footer {
		margin-top: auto;
	}

	.btn-login {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--surface-border);
		border-radius: 12px;
		color: var(--text-primary);
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.btn-login:hover {
		background: var(--primary);
		border-color: var(--primary);
	}

	.content {
		flex: 1;
		margin-left: 280px; /* Same as sidebar width */
		position: relative;
		overflow-x: hidden;
	}

	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
			transition: transform 0.3s ease;
		}
		
		.content {
			margin-left: 0;
		}
	}
</style>

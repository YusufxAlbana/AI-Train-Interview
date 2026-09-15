<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let isCollapsed = $state(false);

	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout" class:collapsed={isCollapsed}>
	<aside class="sidebar">
		<div class="sidebar-header">
			<div class="logo">
				<img src="/logo_3d.png" alt="AInterview Logo" class="logo-img" />
				{#if !isCollapsed}
					<span class="text">AInterview</span>
				{/if}
			</div>
			<button class="toggle-btn" onclick={toggleSidebar} aria-label="Toggle Sidebar">
				<svg class="chevron-icon" class:rotated={isCollapsed} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
			</button>
		</div>

		<nav class="nav-links">
			<a href="/" class="active" title="Home">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
				{#if !isCollapsed}
					<span class="link-text">Home</span>
				{/if}
			</a>
			<a href="#features" title="Features">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
				{#if !isCollapsed}
					<span class="link-text">Features</span>
				{/if}
			</a>
			<a href="#how-it-works" title="How it Works">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
				{#if !isCollapsed}
					<span class="link-text">How it Works</span>
				{/if}
			</a>
		</nav>
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
		background: rgba(30, 41, 59, 0.6);
		border-right: 1px solid var(--surface-border);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1rem;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: 50;
		transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), padding 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		overflow-x: hidden;
	}

	.app-layout.collapsed .sidebar {
		width: 80px;
		padding: 1.5rem 0.5rem;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2.5rem;
		padding: 0 0.5rem;
		transition: all 0.35s ease;
	}

	.app-layout.collapsed .sidebar-header {
		flex-direction: column;
		gap: 1.25rem;
		padding: 0;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.4rem;
		font-weight: 700;
		letter-spacing: -0.5px;
		color: var(--text-primary);
		white-space: nowrap;
	}

	.logo-img {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		object-fit: cover;
		filter: drop-shadow(0 0 10px rgba(79, 70, 229, 0.5));
	}

	.toggle-btn {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--surface-border);
		border-radius: 8px;
		color: var(--text-secondary);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.toggle-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--text-primary);
	}

	.chevron-icon {
		transition: transform 0.35s ease;
	}

	.chevron-icon.rotated {
		transform: rotate(180deg);
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
		padding: 0.875rem 1rem;
		border-radius: 12px;
		color: var(--text-secondary);
		font-weight: 500;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.app-layout.collapsed .nav-links a {
		justify-content: center;
		padding: 0.875rem 0;
	}

	.nav-links a:hover {
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.nav-links a.active {
		color: var(--primary);
		background: rgba(79, 70, 229, 0.15);
	}

	.content {
		flex: 1;
		margin-left: 280px;
		position: relative;
		overflow-x: hidden;
		transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.app-layout.collapsed .content {
		margin-left: 80px;
	}

	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
		}
		
		.content {
			margin-left: 0 !important;
		}
	}
</style>

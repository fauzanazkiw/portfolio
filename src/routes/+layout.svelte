<script lang="ts">
	import './layout.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import { SiteHeader, Footer } from '$lib/components/layout';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<ModeWatcher
	defaultMode="light"
	lightClassNames={['light']}
	track={false}
	modeStorageKey="imlargo-mode-v2"
	themeColors={{ dark: '#09090b', light: '#f9f7f3' }}
/>
<Toaster />

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
>
	Skip to main content
</a>

{#if page.data.bare}
	{@render children()}
{:else}
	<SiteHeader />

	<main id="main-content" class="relative flex w-full flex-col items-center">
		{@render children()}
	</main>

	<Footer />
{/if}

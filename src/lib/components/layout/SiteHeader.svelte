<script lang="ts">
	import { FileText, Mail } from '@lucide/svelte';
	import { page } from '$app/state';
	import ThemeToggle from '$lib/components/common/ThemeToggle.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { ArrowUpRight } from '@lucide/svelte';
	import { siteContent } from '$lib/content/site-content';
	import { useHyperText } from '$lib/attachments/text-encrypt';

	const { navigation, name, email } = siteContent;

	let isOpen = $state(false);

	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		const desktop = window.matchMedia('(min-width: 1024px)');
		const closeOnDesktop = () => {
			if (desktop.matches) isOpen = false;
		};
		desktop.addEventListener('change', closeOnDesktop);
		return () => {
			window.removeEventListener('scroll', onScroll);
			desktop.removeEventListener('change', closeOnDesktop);
		};
	});
</script>

<div
	class="px-layout sticky top-0 z-50 flex w-full flex-col items-center transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo {scrolled
		? 'bg-background/95 backdrop-blur-md'
		: 'bg-transparent'}"
>
	<header
		class="max-w-wx w-full transition-[padding] duration-500 ease-out-expo {scrolled
			? 'pt-4 pb-4 md:pt-5 md:pb-5'
			: 'pt-5 pb-5'}"
	>
		<nav class="grid w-full grid-cols-[auto_1fr] gap-x-2 lg:grid-cols-[1fr_auto_1fr]">
			<div class="flex items-center">
				<a href="/" class="brand" data-value={name} {@attach useHyperText}>
					{name}
				</a>
			</div>

			<ul class="hidden items-center gap-1 lg:flex xl:gap-2">
				{#each navigation.links as link (link.href)}
					<li>
						<a
							href={link.href}
							aria-current={page.url.pathname === link.href ? 'page' : undefined}
							class="nav-link">{link.label}</a
						>
					</li>
				{/each}
			</ul>

			<div class="flex items-center justify-end gap-x-2 md:gap-x-4">
				<div class="header-controls">
					<a
						class="round-control"
						href="/files/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Resume"
						title="Resume"><FileText size={20} /></a
					>
					<a
						class="round-control"
						href={`mailto:${email}`}
						aria-label={navigation.contactCta}
						title={navigation.contactCta}><Mail size={20} /></a
					>
					<ThemeToggle />
				</div>

				<Popover.Root bind:open={isOpen}>
					<Popover.Trigger
						class="menu-trigger inline-flex lg:hidden"
						aria-label="Open navigation menu"
					>
						<span class="menu-label">Menu</span>
						<div class="hamburger" class:open={isOpen}>
							<span class="line l1"></span>
							<span class="line l2"></span>
						</div>
					</Popover.Trigger>
					<Popover.Content
						sideOffset={24}
						align="end"
						class="z-50 max-h-[calc(100dvh-6rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border bg-background p-6 lg:hidden"
						preventScroll={true}
					>
						<div class="flex flex-col gap-y-8">
							<div class="flex flex-col gap-y-5">
								<span class="text-sm font-medium text-muted-foreground">Navigation</span>
								<ul class="flex flex-col gap-y-3 text-2xl font-medium">
									{#each navigation.links as link (link.href)}
										<li>
											<a
												href={link.href}
												onclick={() => (isOpen = false)}
												aria-current={page.url.pathname === link.href ? 'page' : undefined}
												>{link.label}</a
											>
										</li>
									{/each}
								</ul>
							</div>
							<div class="flex flex-col gap-y-5">
								<span class="text-sm font-medium text-muted-foreground">Elsewhere</span>
								<ul class="flex flex-col gap-y-3 text-2xl font-medium">
									{#each navigation.socials as social (social.href)}
										<li>
											<a
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												data-sveltekit-reload
												class="flex items-center gap-x-2"
											>
												<span>{social.label}</span>
												<ArrowUpRight />
											</a>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</Popover.Content>
				</Popover.Root>
			</div>
		</nav>
	</header>
</div>

<style>
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		width: fit-content;
		font-size: 1.2rem;
		font-weight: 800;
		letter-spacing: -0.04em;
	}
	.nav-link {
		display: block;
		padding: 0.6rem 1rem;
		border-radius: 999px;
		color: var(--muted-foreground);
		font-size: 1rem;
		transition:
			background-color 200ms,
			color 200ms;
		white-space: nowrap;
	}
	.nav-link:hover {
		color: var(--foreground);
		background: var(--muted);
	}
	.nav-link[aria-current='page'] {
		background: var(--primary);
		color: var(--primary-foreground);
	}
	.header-controls {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
	.round-control {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border: 1px solid var(--border);
		border-radius: 50%;
		color: var(--foreground);
		transition: background-color 200ms;
	}
	.round-control:hover {
		background: var(--muted);
	}
	.round-control:focus-visible,
	.nav-link:focus-visible,
	.brand:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 4px;
	}
	@media (max-width: 400px) {
		.brand {
			font-size: 1rem;
		}
		.round-control {
			width: 2.25rem;
			height: 2.25rem;
		}
		.header-controls {
			gap: 0.2rem;
		}
		.menu-label {
			display: none;
		}
	}

	:global(.menu-trigger) {
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
	}
	.menu-label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}
	.hamburger {
		width: 16px;
		height: 12px;
		position: relative;
	}
	.line {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 2px;
		border-radius: 1px;
		background: var(--foreground);
		transform-origin: center;
		transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	.l1 {
		transform: translateY(-4px) rotate(0);
	}
	.l2 {
		transform: translateY(4px) rotate(0);
	}

	.hamburger.open .l1 {
		transform: translateY(0) rotate(45deg);
	}
	.hamburger.open .l2 {
		transform: translateY(0) rotate(-45deg);
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type Props = {
		children: Snippet;
		class?: string;
	};

	const { children, class: className }: Props = $props();
</script>

<span
	class={cn(
		'relative inline-flex w-fit items-center overflow-hidden rounded-full bg-foreground/12 p-px text-xs font-medium shadow-xl shadow-muted/60',
		className
	)}
>
	<span class="arc absolute inset-[-1000%]" aria-hidden="true"></span>

	<span
		class="relative flex items-center gap-x-2 rounded-full bg-background p-1.5 backdrop-blur-3xl"
	>
		<span
			class="ml-1 flex size-1.5 shrink-0 rounded-full bg-brand ring-2 ring-brand/40 outline-2 outline-offset-2 outline-brand/20"
			aria-hidden="true"
		></span>
		<span class="shine pr-2 font-mono">{@render children()}</span>
	</span>
</span>

<style>
	.arc {
		background: conic-gradient(
			from 90deg at 50% 50%,
			transparent 0%,
			color-mix(in oklab, var(--color-foreground) 55%, transparent) 50%,
			transparent 100%
		);
		animation: arc 3s linear infinite;
	}

	@keyframes arc {
		to {
			transform: rotate(360deg);
		}
	}
	.shine {
		background-image: linear-gradient(
			120deg,
			var(--color-muted-foreground) 40%,
			var(--color-foreground) 50%,
			var(--color-muted-foreground) 60%
		);
		background-size: 200% 100%;
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
		animation: shine 3s linear infinite;
	}

	@keyframes shine {
		from {
			background-position: 200% 0;
		}
		to {
			background-position: -100% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.arc {
			animation: none;
		}

		.shine {
			background-image: none;
			animation: none;
			color: var(--color-muted-foreground);
			-webkit-text-fill-color: var(--color-muted-foreground);
		}
	}
</style>

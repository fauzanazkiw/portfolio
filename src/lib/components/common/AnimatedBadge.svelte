<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		text?: string;
		children?: Snippet;
	};

	const { children, class: className = '', text = '' }: Props = $props();
</script>

<div
	class={cn(
		'relative flex max-w-max items-center justify-center gap-2 overflow-hidden rounded-full p-px text-xs font-medium shadow-xl shadow-muted/60 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none',
		className
	)}
>
	<span class="badge-orbit absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"></span>

	<div
		class="flex h-full w-full items-center justify-center rounded-full bg-background text-center backdrop-blur-3xl"
	>
		<div
			class="flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5"
		>
			{@render children?.()}
			<span class="shine-text bg-clip-text text-muted-foreground">{text}</span>
		</div>
	</div>
</div>

<style>
	.badge-orbit {
		background: conic-gradient(from 90deg, var(--border), var(--brand), var(--border));
	}
	@keyframes shine {
		0% {
			background-position: 100%;
		}
		100% {
			background-position: -100%;
		}
	}

	.shine-text {
		--animation-duration: 2s;
		background-image: linear-gradient(
			120deg,
			transparent 40%,
			var(--foreground) 50%,
			transparent 60%
		);
		background-size: 200% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		animation-duration: var(--animation-duration);
		animation: shine var(--animation-duration) linear infinite;
	}
</style>

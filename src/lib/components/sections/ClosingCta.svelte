<script lang="ts">
	import type { Snippet } from 'svelte';
	import MonoPlasma from '$lib/components/effects/iridescence/MonoPlasma.svelte';
	import PanelCtas from './PanelCtas.svelte';
	import { useReveal } from '$lib/attachments/reveal';

	type Cta = { label: string; href: string };

	let {
		title,
		description,
		primaryCta,
		secondaryCta,
		backdrop
	}: {
		title: string;
		description: string;
		primaryCta: Cta;
		secondaryCta: Cta;
		backdrop?: Snippet;
	} = $props();
</script>

<section class="px-layout py-section-lg flex w-full flex-col items-center">
	<div
		class="max-w-wx relative flex w-full flex-col items-start gap-10 overflow-hidden rounded-4xl border border-panel-border bg-panel px-6 py-20 text-panel-foreground md:px-12 md:py-28 lg:px-16 lg:py-32"
		{@attach useReveal({ scale: 0.94, y: 0, duration: 1.1 })}
	>
		{#if backdrop}
			{@render backdrop()}
		{:else}
			<MonoPlasma />
		{/if}

		<div class="relative flex flex-col gap-y-5">
			<h2 class="max-w-2xl text-4xl text-balance md:text-5xl lg:text-6xl">
				{title}
			</h2>
			<p class="max-w-prose text-lg text-pretty text-panel-muted">
				{description}
			</p>
		</div>

		<PanelCtas class="relative" {primaryCta} {secondaryCta} />
	</div>
</section>

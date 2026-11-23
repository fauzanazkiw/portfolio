<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import Iridescence from './Iridescence.svelte';
	import Noise from '$lib/components/effects/noise/Noise.svelte';

	let {
		grain = 16,
		grainInterval = 4,
		vignette = true
	}: {
		/** Opacidad del grano, 0-255. */
		grain?: number;
		/** Cada cuántos frames se redibuja el grano. */
		grainInterval?: number;
		vignette?: boolean;
	} = $props();

	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	const speed = $derived(reducedMotion.current ? 0 : 0.25);
</script>

-->
<div class="iridescence-mono absolute inset-0" aria-hidden="true">
	<Iridescence color={[1, 1, 1]} {speed} amplitude={0.08} />
</div>

<div class="pointer-events-none absolute inset-0 bg-black/30" aria-hidden="true"></div>

{#if vignette}
	<div class="vignette pointer-events-none absolute inset-0" aria-hidden="true"></div>
{/if}

<Noise patternAlpha={grain} patternRefreshInterval={grainInterval} />

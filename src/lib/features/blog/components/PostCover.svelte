<script lang="ts">
	import Grainient from '$lib/components/effects/grainient/Grainient.svelte';
	import { cn } from '$lib/utils';

	type Props = {
		slug: string;
		accent: string;
		class?: string;
	};

	const { slug, accent, class: className }: Props = $props();

	function mix(hex: string, target: [number, number, number], amount: number): string {
		const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!m) return hex;
		const channels = [1, 2, 3].map((i) => parseInt(m[i], 16));
		return (
			'#' +
			channels
				.map((c, i) => Math.round(c + (target[i] - c) * amount))
				.map((c) => c.toString(16).padStart(2, '0'))
				.join('')
		);
	}

	const light = $derived(mix(accent, [255, 255, 255], 0.55));
	const deep = $derived(mix(accent, [9, 9, 11], 0.72));

	function hash(value: string): number {
		let h = 2166136261;
		for (let i = 0; i < value.length; i++) {
			h ^= value.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		return Math.abs(h);
	}

	const shape = $derived.by(() => {
		const seed = hash(slug);
		const pick = (bits: number, span: number, min: number) =>
			min + (((seed >> bits) & 0xff) / 255) * span;

		return {
			blendAngle: pick(0, 360, 0),
			rotationAmount: pick(8, 400, 250),
			warpFrequency: pick(16, 5, 3),
			warpAmplitude: pick(24, 40, 30),
			centerX: pick(32, 0.3, -0.15),
			centerY: pick(40, 0.3, -0.15),
			zoom: pick(48, 0.2, 0.75)
		};
	});
</script>

<div class={cn('relative overflow-hidden rounded-2xl border bg-neutral-950', className)}>
	<Grainient
		color1={light}
		color2={accent}
		color3={deep}
		timeSpeed={0.12}
		grainAmount={0.14}
		contrast={1.25}
		saturation={0.9}
		blendAngle={shape.blendAngle}
		rotationAmount={shape.rotationAmount}
		warpFrequency={shape.warpFrequency}
		warpAmplitude={shape.warpAmplitude}
		centerX={shape.centerX}
		centerY={shape.centerY}
		zoom={shape.zoom}
		class="absolute inset-0"
	/>
</div>

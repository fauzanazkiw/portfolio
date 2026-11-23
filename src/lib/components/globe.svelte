<script lang="ts">
	import { onMount } from 'svelte';
	import { reducedMotion } from '$lib/components/stores/motion';
	let {
		iconSlugs = [],
		imageArray = [],
		labels = {},
		theme = 'light',
		selectedSlug = null,
		onIconClick = () => {}
	}: {
		iconSlugs?: string[];
		imageArray?: { src: string; id: string; alt?: string }[];
		/** Human names for the slugs, so the buttons announce `HTML5`, not `html5`. */
		labels?: Record<string, string>;
		theme?: string;
		selectedSlug?: string | null;
		onIconClick?: (slug: string) => void;
	} = $props();
	let yaw = $state(0.4);
	let pitch = $state(-0.15);
	let pointer: { x: number; y: number; start: number } | null = null;
	let dragging = $state(false);
	let visible = false;
	let host: HTMLDivElement;
	let targetYaw: number | null = null;
	const icons = $derived([
		...iconSlugs.map((id) => ({
			id,
			src: `https://cdn.simpleicons.org/${id}`,
			alt: labels[id] ?? id
		})),
		...imageArray
	]);
	const positions = $derived(
		icons.map((icon, i) => {
			const y = 1 - (2 * (i + 0.5)) / icons.length;
			const r = Math.sqrt(1 - y * y);
			const theta = i * 2.399963;
			const x = Math.cos(theta) * r;
			const z = Math.sin(theta) * r;
			const rx = x * Math.cos(yaw) + z * Math.sin(yaw);
			const rz = z * Math.cos(yaw) - x * Math.sin(yaw);
			const ry = y * Math.cos(pitch) - rz * Math.sin(pitch);
			const depth = y * Math.sin(pitch) + rz * Math.cos(pitch);
			return { ...icon, x: 50 + rx * 43, y: 50 + ry * 43, depth, scale: 0.65 + (depth + 1) * 0.3 };
		})
	);
	$effect(() => {
		const index = icons.findIndex((icon) => icon.id === selectedSlug);
		if (index < 0) return;
		targetYaw = -index * 2.399963;
		if ($reducedMotion) {
			yaw = targetYaw;
			targetYaw = null;
		}
	});
	onMount(() => {
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		});
		observer.observe(host);
		let frame = 0;
		let last = 0;
		function tick(time: number) {
			const dt = Math.min(time - last, 40);
			last = time;
			if (visible && !$reducedMotion && !dragging) {
				if (targetYaw !== null) {
					const delta = Math.atan2(Math.sin(targetYaw - yaw), Math.cos(targetYaw - yaw));
					yaw += delta * 0.06;
					if (Math.abs(delta) < 0.005) targetYaw = null;
				} else yaw += dt * 0.000035;
			}
			frame = requestAnimationFrame(tick);
		}
		frame = requestAnimationFrame(tick);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	});
</script>

<div
	bind:this={host}
	class="cloud"
	class:dark={theme === 'dark'}
	role="group"
	aria-label="Interactive technology globe"
	onpointerdown={(event) => {
		pointer = { x: event.clientX, y: event.clientY, start: event.clientX };
		dragging = true;
		targetYaw = null;
	}}
	onpointermove={(event) => {
		if (!pointer) return;
		if (Math.abs(event.clientX - pointer.start) > 5)
			event.currentTarget.setPointerCapture(event.pointerId);
		yaw += (event.clientX - pointer.x) * 0.008;
		pitch = Math.max(-0.7, Math.min(0.7, pitch + (event.clientY - pointer.y) * 0.004));
		pointer.x = event.clientX;
		pointer.y = event.clientY;
	}}
	onpointerup={() => {
		pointer = null;
		dragging = false;
	}}
	onpointercancel={() => {
		pointer = null;
		dragging = false;
	}}
>
	{#each positions as icon (icon.id)}
		<button
			style:left={`${icon.x}%`}
			style:top={`${icon.y}%`}
			style:--scale={icon.scale}
			style:opacity={0.55 + (icon.depth + 1) * 0.225}
			style:z-index={Math.round((icon.depth + 1) * 100)}
			aria-label={icon.alt ?? icon.id}
			aria-pressed={selectedSlug === icon.id}
			onclick={() => onIconClick(icon.id)}
		>
			<img src={icon.src} alt="" width="56" height="56" loading="lazy" draggable="false" />
		</button>
	{/each}
</div>

<style>
	.cloud {
		position: relative;
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		touch-action: pan-y;
		cursor: grab;
		user-select: none;
	}
	.cloud:active {
		cursor: grabbing;
	}
	button {
		position: absolute;
		transform: translate(-50%, -50%) scale(var(--scale));
		background: transparent;
		border: 0;
		padding: 0.4rem;
		cursor: pointer;
		transition: filter 250ms;
	}
	button:hover,
	button[aria-pressed='true'] {
		filter: drop-shadow(0 5px 10px var(--accent-glow));
	}
	button:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 4px;
		border-radius: 8px;
	}
	img {
		width: clamp(2rem, 3.2vw, 3.5rem);
		height: clamp(2rem, 3.2vw, 3.5rem);
		object-fit: contain;
		pointer-events: none;
	}
	.dark img {
		/* Brand colours are drawn for a light page. On the dark one every logo is
		   lifted to a single light ink, so none of them — GitHub's near-black,
		   Vercel's black — sink into the background. */
		filter: brightness(0) invert(1);
		opacity: 0.86;
	}
</style>

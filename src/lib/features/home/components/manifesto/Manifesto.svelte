<script lang="ts">
	import { onMount } from 'svelte';
	import { progress, startScroll } from '$lib/components/motion/scroll';
	import { inview } from '$lib/components/actions/inview';

	onMount(startScroll);

	type Tone = 'serif' | 'azure' | 'ember';

	/**
	 * The whole "about" in four sentences. Everything the old page spread over
	 * a hero lead, a stat row and four biography paragraphs, cut down to what
	 * nothing else on the page says: the work is the system as well as the
	 * screen, and which tool goes where.
	 */
	const copy: { text: string; tone?: Tone }[] = [
		{ text: 'I build the' },
		{ text: 'system', tone: 'serif' },
		{
			text: 'behind the screen:'
		},
		{
			text: 'the data model, the APIs, and the services that make everything work. I write backends in'
		},
		{ text: 'Go', tone: 'azure' },
		{ text: 'and' },
		{ text: 'Laravel', tone: 'ember' },
		{ text: 'for the web.' },
		{ text: 'store data in' },
		{ text: 'PostgreSQL and MySQL', tone: 'serif' },
		{ text: 'and ship with' },
		{ text: 'Docker and GitHub Actions', tone: 'serif' }
		// { text: 'Architecture first, implementation after' }
	];

	const words = copy.flatMap((part) =>
		part.text.split(' ').map((word) => ({ word, tone: part.tone }))
	);

	/** Drawn from the published project list — no rounded-up claims. */
	const stats = [
		{ value: '5+', label: 'Projects' },
		{ value: '3', label: 'Backend systems' },
		{ value: '2023', label: 'Building since' }
	];
</script>

<section class="track" id="about" use:progress use:inview data-section="about" data-mood="quiet">
	<div class="stage">
		<svg class="schema" viewBox="0 0 440 548" fill="none" aria-hidden="true">
			<g class="part" style="--at: 0.2">
				<path
					class="ink"
					pathLength="1"
					d="M150 428c0-9 31-16 70-16s70 7 70 16v52c0 9-31 16-70 16s-70-7-70-16z"
				/>
				<path class="ink" pathLength="1" d="M150 428c0 9 31 16 70 16s70-7 70-16" />
				<path class="ink faint" pathLength="1" d="M150 454c0 9 31 16 70 16s70-7 70-16" />
				<text x="220" y="524" text-anchor="middle">Data model</text>
			</g>

			<g class="part" style="--at: 0.26">
				<path class="ink" pathLength="1" d="M220 412v-52" />
				<path class="flow" d="M220 412v-52" />
				<rect class="ink" pathLength="1" x="120" y="296" width="200" height="64" rx="12" />
				<path class="ink faint" pathLength="1" d="M144 318h46M144 338h28M250 318h46M268 338h28" />
				<text x="220" y="332" text-anchor="middle">Backend</text>
			</g>

			<g class="part" style="--at: 0.32">
				<path class="ink" pathLength="1" d="M220 296v-54" />
				<path class="flow" d="M220 296v-54" />
			</g>

			<g class="part azure" style="--at: 0.35">
				<path class="ink wire" pathLength="1" d="M220 242H72v-54" />
				<path class="flow" d="M220 242H72v-54" />
				<rect class="ink" pathLength="1" x="30" y="38" width="84" height="150" rx="15" />
				<path class="ink faint" pathLength="1" d="M48 72h48M48 90h30M48 150h48" />
				<circle class="ink" pathLength="1" cx="72" cy="118" r="11" />
				<text x="72" y="22" text-anchor="middle">WEB APP</text>
			</g>

			<g class="part azure" style="--at: 0.42">
				<path class="ink wire" pathLength="1" d="M192 242v-54" />
				<path class="flow" d="M192 242v-54" />
				<rect class="ink" pathLength="1" x="150" y="38" width="84" height="150" rx="15" />
				<path class="ink faint" pathLength="1" d="M168 72h48M168 132h48M168 150h30" />
				<rect class="ink" pathLength="1" x="168" y="88" width="48" height="30" rx="5" />
				<text x="192" y="22" text-anchor="middle">REST API</text>
			</g>

			<g class="part ember" style="--at: 0.5">
				<path class="ink wire" pathLength="1" d="M220 242h125v-54" />
				<path class="flow" d="M220 242h125v-54" />
				<rect class="ink" pathLength="1" x="270" y="68" width="150" height="120" rx="10" />
				<path class="ink" pathLength="1" d="M270 90h150" />
				<path class="ink faint" pathLength="1" d="M286 110h44M286 126h30M286 168h22" />
				<rect class="ink" pathLength="1" x="348" y="106" width="56" height="64" rx="5" />
				<circle class="dot" cx="283" cy="79" r="2.4" /><circle
					class="dot"
					cx="292"
					cy="79"
					r="2.4"
				/><circle class="dot" cx="301" cy="79" r="2.4" />
				<text x="345" y="52" text-anchor="middle">INTEGRATION</text>
			</g>
		</svg>

		<div class="head">
			<span class="u-label"></span>
			<span class="u-label note">Off the keyboard: drawing, painting, reading.</span>
		</div>

		<p class="text" style="--n: {words.length}">
			{#each words as item, i (i)}
				<span class="w {item.tone ?? ''}" style="--i: {i}">{`${item.word} `}</span>
			{/each}
		</p>

		<dl class="stats">
			{#each stats as stat, i (stat.label)}
				<div class="stat" style="--s: {i}">
					<dd>{stat.value}</dd>
					<dt class="u-label">{stat.label}</dt>
				</div>
			{/each}
		</dl>
	</div>
</section>

<style>
	.track {
		--p: 0;
		/* The header is 5.25rem tall until it shrinks on the first scroll. */
		--header-h: 5.25rem;
		position: relative;
		width: 100%;
		isolation: isolate;
		height: 260vh;
		background: var(--section-background);
	}

	.stage {
		position: sticky;
		top: 0;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: var(--sp-5);
		height: 100vh;
		height: 100svh;
		max-width: calc(var(--maxw) + var(--gutter) * 2);
		margin-inline: auto;
		padding: calc(var(--header-h) + 1rem) var(--gutter) clamp(1.5rem, 4vw, 3rem);
	}

	.head {
		display: flex;
		justify-content: space-between;
		gap: var(--sp-4);
	}

	/* ---- Schematic -------------------------------------------------------- */

	/* Only where there is a margin beside the sentence for it to stand in. */
	.schema {
		position: absolute;
		right: calc(var(--gutter) + 4.5rem);
		top: 48%;
		height: min(60svh, 35rem);
		width: auto;
		max-width: none;
		aspect-ratio: 440 / 548;
		transform: translateY(-50%);
		overflow: visible;
		color: var(--text);
		display: none;
		pointer-events: none;
	}

	.part {
		--d: clamp(0, calc((var(--p) - var(--at)) * 13), 1);
		--tint: currentColor;
	}

	.part.azure {
		--tint: var(--azure);
	}

	.part.ember {
		--tint: var(--ember);
	}

	.ink {
		stroke: var(--tint);
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 1;
		stroke-dashoffset: calc(1 - var(--d));
		opacity: 0.85;
	}

	.ink.faint {
		opacity: 0.4;
	}

	.ink.wire {
		stroke: currentColor;
		opacity: 0.45;
	}

	/* Requests running up from the data to the apps, once the line is drawn. */
	.flow {
		stroke: var(--tint);
		stroke-width: 2.4;
		stroke-linecap: round;
		stroke-dasharray: 1 15;
		opacity: calc(var(--d) * 0.95);
		animation: flow 1.5s linear infinite paused;
	}

	/* `use:inview` — the dashes only run while the section is on screen. */
	.track:global([data-inview]) .flow {
		animation-play-state: running;
	}

	@keyframes flow {
		to {
			stroke-dashoffset: -16;
		}
	}

	.dot {
		fill: var(--tint);
		opacity: calc(var(--d) * 0.7);
	}

	.schema text {
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		fill: var(--text-muted);
		opacity: var(--d);
	}

	.head,
	.text,
	.stats {
		position: relative;
	}

	.note {
		display: none;
		text-align: right;
	}

	.text {
		margin: 0;
		min-width: 0;
		white-space: normal;
		overflow-wrap: break-word;
		align-self: center;
		max-width: 25ch;
		font-family: var(--font-display);
		/* The stage is exactly 100svh: head, sentence and stats all have to fit
		   inside it. At 7svh the paragraph ran ~90px past the box on a laptop
		   and pushed the stat labels below the fold, so it is capped where the
		   three rows still fit. */
		font-size: clamp(1.8rem, min(4.4vw, 5.6svh), 4.8rem);
		font-weight: 350;
		font-stretch: 88%;
		line-height: 1.02;
		letter-spacing: -0.03em;
		text-wrap: balance;
	}

	/* The reveal finishes at ~80% of the pin, leaving the last stretch for the
	   reader to take in the finished sentence before it lets go. */
	.w {
		opacity: clamp(0.16, calc(var(--p) * 1.25 * var(--n) - var(--i) + 0.16), 1);
	}

	.w.serif {
		font-family: var(--font-serif);
		font-style: italic;
		font-stretch: 100%;
		letter-spacing: -0.02em;
		font-size: 1.06em;
	}

	.w.azure {
		color: var(--azure);
	}

	.w.ember {
		color: var(--ember);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--sp-4);
		padding-top: var(--sp-4);
		border-top: 1px solid var(--line);
	}

	/* The numbers only arrive once the sentence is nearly done. */
	.stat {
		--local: clamp(0, calc((var(--p) - 0.62 - var(--s) * 0.05) * 7), 1);
		opacity: var(--local);
		transform: translate3d(0, calc((1 - var(--local)) * 24px), 0);
	}

	.stat dd {
		font-family: var(--font-display);
		font-size: clamp(2.2rem, min(5vw, 8svh), 4.6rem);
		font-weight: 300;
		font-stretch: 75%;
		line-height: 0.9;
		letter-spacing: var(--tracking-display);
		font-variant-numeric: tabular-nums;
	}

	.stat dt {
		margin-top: 0.5rem;
	}

	@media (min-width: 900px) {
		.note {
			display: block;
		}

		.text {
			max-width: 24ch;
		}
	}

	@media (min-width: 1100px) and (min-height: 600px) {
		.text {
			max-width: 52%;
		}

		.schema {
			display: block;
			right: var(--gutter);
			max-width: 30%;
		}
	}

	/* Without the scrub there is nothing to scroll for: show it all, unpinned. */
	@media (prefers-reduced-motion: reduce) {
		.track {
			height: auto;
		}

		.stage {
			position: static;
			height: auto;
			min-height: 100svh;
		}

		.w,
		.stat {
			opacity: 1;
			transform: none;
		}

		.part {
			--d: 1;
		}

		.flow {
			animation: none;
		}
	}
</style>

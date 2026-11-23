<script lang="ts">
	import { siteContent } from '$lib/content/site-content';
	import { getColor, getLabel } from '$lib/content/technology';

	const iconSlug = (label: string) =>
		({
			'Node.js': 'nodedotjs',
			'Vue.js': 'vuedotjs',
			PostgreSQL: 'postgresql',
			HTML: 'html5',
			CSS: 'css',
			Go: 'go',
			'GitHub Actions': 'githubactions',
			'Tailwind CSS': 'tailwindcss'
		})[label] ?? label.toLowerCase().replace(/[^a-z0-9]/g, '');
	const groups = Object.entries(siteContent.skills.groups);
	const technologies = [...new Set(groups.flatMap(([, items]) => items))];
	let selected = $state(technologies[0]);
	let rotation = $state(0);
	let dragX: number | null = null;

	function turnTo(tech: (typeof technologies)[number]) {
		selected = tech;
		rotation = -technologies.indexOf(tech) * (360 / technologies.length);
	}
</script>

<section class="stack" id="stack" aria-labelledby="stack-title">
	<h2 id="stack-title">I <em>ship</em> with.</h2>
	<div class="stack-layout">
		<div class="globe-area">
			<div
				class="globe"
				role="group"
				aria-label="Technology globe; select a technology or drag to rotate"
				onpointerdown={(event) => {
					dragX = event.clientX;
					event.currentTarget.setPointerCapture(event.pointerId);
				}}
				onpointermove={(event) => {
					if (dragX !== null) {
						rotation += (event.clientX - dragX) * 0.5;
						dragX = event.clientX;
					}
				}}
				onpointerup={() => {
					dragX = null;
				}}
				onpointercancel={() => {
					dragX = null;
				}}
			>
				<div class="orbit orbit-one"></div>
				<div class="orbit orbit-two"></div>
				{#each technologies as tech, i (tech)}
					{@const angle = i * 2.39996 + (rotation * Math.PI) / 180}
					{@const radius = Math.sqrt((i + 0.5) / technologies.length)}
					<button
						class="technology"
						class:selected={selected === tech}
						style:left={`${50 + Math.cos(angle) * radius * 42}%`}
						style:top={`${50 + Math.sin(angle) * radius * 40}%`}
						style:--tech={getColor(tech)}
						aria-label={getLabel(tech)}
						aria-pressed={selected === tech}
						onclick={() => turnTo(tech)}
						><img
							src={`https://cdn.simpleicons.org/${iconSlug(getLabel(tech))}`}
							alt=""
							width="42"
							height="42"
							loading="lazy"
						/><small>{getLabel(tech)}</small></button
					>
				{/each}
			</div>
			<p class="hint">
				<span aria-hidden="true">↗</span> Click any logo <small>or drag to spin</small>
			</p>
		</div>
		<div class="layers">
			<div class="legend">
				<span>How it stacks</span><span>Pick a name, the globe turns to it</span>
			</div>
			{#each groups as [category, items], i (category)}
				<div
					class="layer"
					style:--layer-color={[
						'var(--poster-neutral)',
						'var(--poster-azure)',
						'var(--poster-lilac)',
						'var(--poster-mint)',
						'var(--poster-ember)',
						'var(--poster-azure)'
					][i % 6]}
				>
					<div class="slab" aria-hidden="true"></div>
					<div class="layer-content">
						<h3>{category}</h3>
						<div class="names">
							{#each items as tech (tech)}
								<button
									class:active={selected === tech}
									aria-pressed={selected === tech}
									onclick={() => turnTo(tech)}>{getLabel(tech)}</button
								>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.stack {
		width: 100%;
		padding: 6rem clamp(1.5rem, 7.8vw, 9.5rem);
		background: var(--section-background);
	}
	h2 {
		margin: 0 0 4rem;
		font-family: 'Arial Narrow', 'Liberation Sans Narrow', sans-serif;
		font-size: clamp(4rem, 8vw, 8rem);
		font-weight: 400;
		line-height: 1;
		letter-spacing: -0.07em;
	}
	h2 em {
		color: var(--brand);
		font-family: Georgia, serif;
		font-weight: 400;
	}
	.stack-layout {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 4rem;
		align-items: center;
	}
	.globe-area {
		min-width: 0;
	}
	.globe {
		position: relative;
		height: clamp(25rem, 38vw, 42rem);
		touch-action: pan-y;
		cursor: grab;
	}
	.globe:active {
		cursor: grabbing;
	}
	.orbit {
		position: absolute;
		inset: 25% 0;
		border: 1px dashed var(--brand);
		border-radius: 50%;
		transform: rotate(-24deg);
		pointer-events: none;
	}
	.orbit-two {
		border-color: var(--brand);
		transform: rotate(31deg);
		inset: 28% 8%;
	}
	.technology {
		position: absolute;
		transform: translate(-50%, -50%);
		color: var(--tech);
		cursor: pointer;
		display: grid;
		justify-items: center;
		background: transparent;
		border: 0;
		padding: 0.4rem;
		transition:
			left 600ms ease,
			top 600ms ease,
			scale 200ms;
	}
	.technology img {
		font-size: clamp(1.5rem, 2.6vw, 2.8rem);
		font-weight: 800;
		letter-spacing: -0.08em;
		line-height: 1;
	}
	.technology small {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.6rem;
		color: var(--foreground);
	}
	.technology:hover,
	.technology.selected {
		scale: 1.15;
	}
	button:focus-visible {
		outline: 2px solid var(--brand);
		outline-offset: 5px;
		border-radius: 4px;
	}
	.hint {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		width: fit-content;
		margin: 2rem auto 0;
		padding: 0.8rem 1.1rem;
		border: 1px solid var(--brand);
		border-radius: 3rem;
	}
	.hint > span {
		background: var(--brand);
		color: white;
		border-radius: 50%;
		padding: 0.2rem 0.6rem;
	}
	.hint small,
	.legend,
	h3 {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
	}
	.legend {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 2rem;
		color: var(--muted-foreground);
	}
	.layer {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: 1.5rem;
		align-items: center;
		min-height: 7.5rem;
	}
	.slab {
		width: 7.5rem;
		height: 4rem;
		background: var(--layer-color);
		transform: rotate(-30deg) skewX(30deg) scaleY(0.86);
		box-shadow: -8px 9px 0 color-mix(in srgb, var(--layer-color), black 30%);
	}
	.layer-content {
		align-self: stretch;
		border-top: 1px solid var(--border);
		padding: 1rem 0;
	}
	h3 {
		color: var(--muted-foreground);
		margin: 0 0 0.65rem;
	}
	h3::before {
		content: '◆';
		color: var(--layer-color);
		margin-right: 0.5rem;
	}
	.names {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
	}
	.names button {
		color: var(--muted-foreground);
		cursor: pointer;
		font-size: 0.95rem;
		background: transparent;
		border: 0;
		padding: 0;
	}
	.names button:hover,
	.names button.active {
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	@media (max-width: 1000px) {
		.stack-layout {
			grid-template-columns: 1fr;
		}
		.globe {
			max-width: 42rem;
			margin-inline: auto;
		}
		.layers {
			max-width: 42rem;
			width: 100%;
			margin-inline: auto;
		}
	}
	@media (max-width: 500px) {
		.layer {
			grid-template-columns: 4rem 1fr;
			gap: 1rem;
		}
		.slab {
			width: 3.5rem;
			height: 2rem;
		}
		.hint {
			flex-wrap: wrap;
			font-size: 0.85rem;
		}
		.legend {
			flex-wrap: wrap;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.technology {
			transition: none;
		}
	}
</style>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		spacing = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		spacing?: 'default' | 'continued' | 'hero' | 'none';
	} = $props();

	const spacingClass = {
		default: 'py-section',
		continued: 'pb-section',
		hero: 'py-hero',
		none: ''
	};
</script>

<section
	bind:this={ref}
	data-slot="section"
	class={cn('px-layout flex w-full flex-col items-center', spacingClass[spacing], className)}
	{...restProps}
>
	<div class="max-w-wx flex w-full flex-col gap-12">
		{@render children?.()}
	</div>
</section>

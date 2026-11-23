<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	type Cta = { label: string; href: string };

	let {
		primaryCta,
		secondaryCta,
		class: className
	}: {
		primaryCta: Cta;
		secondaryCta: Cta;
		class?: string;
	} = $props();
</script>

<!-- Shared panel actions use the same primary accent as the rest of the site. -->
<div class={cn('flex flex-wrap gap-4', className)}>
	<Button href={primaryCta.href}>
		{primaryCta.label}
	</Button>
	<Button
		href={secondaryCta.href}
		variant="outline"
		class="border-panel-border bg-transparent text-panel-foreground hover:border-brand hover:bg-brand/10 hover:text-panel-foreground"
	>
		{secondaryCta.label}
	</Button>
</div>

<script lang="ts">
	import { getColor, getLabel, Technology } from '$lib/content/technology';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils';

	type Props = {
		tech: Technology;
		class?: string;
	};

	const { tech, class: className }: Props = $props();
</script>

<Badge
	variant="outline"
	class={cn('group/skill flex items-center justify-center gap-x-2 py-1', className)}
>
	<span
		class="flex size-2.5 shrink-0 rounded-full border transition-colors duration-300 group-hover/skill:bg-(--tech)"
		style:border-color={getColor(tech)}
		style:--tech={getColor(tech)}
		aria-hidden="true"
	></span>
	<span
		class="text-center font-mono font-medium text-muted-foreground transition-colors duration-300 group-hover/skill:text-foreground"
		>{getLabel(tech)}</span
	>
</Badge>

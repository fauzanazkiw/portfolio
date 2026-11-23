<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { RecordRow } from '$lib/components/cards';
	import { useReveal } from '$lib/attachments/reveal';
	import type { WorkGroup } from '$lib/content/types';

	const { group, spacing = 'default' }: { group: WorkGroup; spacing?: 'default' | 'continued' } =
		$props();
</script>

<Section.Root {spacing}>
	<Section.Header>
		<Section.Title>{group.title}</Section.Title>
		<Section.Description>{group.description}</Section.Description>
	</Section.Header>

	<div
		class="flex flex-col divide-y border-b"
		{@attach useReveal({ targets: '.record-row', stagger: 0.08 })}
	>
		{#each group.items as item (item.title)}
			<RecordRow
				period={item.period}
				title={item.title}
				context={item.context}
				description={item.description}
				technologies={item.technologies}
				url={item.url}
			/>
		{/each}
	</div>
</Section.Root>

<script lang="ts">
	import ClosingCta from './ClosingCta.svelte';
	import { siteContent } from '$lib/content/site-content';

	const { cta } = siteContent;
</script>

<ClosingCta
	title={cta.title}
	description={cta.description}
	primaryCta={cta.primaryCta}
	secondaryCta={cta.secondaryCta}
/>

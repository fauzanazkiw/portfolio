<script lang="ts">
	import { HomeLanding } from '$lib/features/home/components';
	import { Seo, homeSchema } from '$lib/components/seo';
</script>

<Seo schema={homeSchema()} />

<HomeLanding />

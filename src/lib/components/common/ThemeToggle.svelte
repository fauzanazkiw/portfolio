<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<!-- Both labels are rendered identically in SSR; the root class selects the visible action. -->
<button
	type="button"
	aria-label="Toggle color theme"
	onclick={toggleMode}
	class="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring max-[400px]:size-9"
>
	<span class="inline-flex items-center dark:hidden">
		<Sun class="size-5" aria-hidden="true" />
		<span class="sr-only">NIGHT</span>
	</span>
	<span class="hidden items-center dark:inline-flex">
		<Moon class="size-5" aria-hidden="true" />
		<span class="sr-only">DAY</span>
	</span>
</button>

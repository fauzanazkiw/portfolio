import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},

	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		alias: {
			$lib: './src/lib',
			$components: './src/lib/components',
			$content: './src/lib/content',
			$features: './src/lib/features',
			$ui: './src/lib/components/ui'
		}
	}
};

export default config;

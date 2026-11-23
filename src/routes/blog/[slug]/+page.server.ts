import { getPost, getSiblings, posts, readingTime, wordCount } from '$lib/content/blog';
import { error } from '@sveltejs/kit';
import { codeToHtml } from 'shiki';
import type { PostBlock } from '$lib/content/types';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

async function highlight(content: PostBlock[]): Promise<PostBlock[]> {
	return Promise.all(
		content.map(async (block) => {
			if (block.type !== 'code') return block;
			const html = await codeToHtml(block.code, {
				lang: block.language,
				themes: { dark: 'catppuccin-mocha', light: 'catppuccin-latte' },
				defaultColor: 'dark'
			});
			return { ...block, html };
		})
	);
}

export const load: PageServerLoad = async ({ params }) => {
	const post = getPost(params.slug);

	if (!post) {
		error(404, `No post found for "${params.slug}"`);
	}

	return {
		post: { ...post, content: await highlight(post.content) },
		readingTime: readingTime(post),
		words: wordCount(post),
		...getSiblings(post.slug)
	};
};

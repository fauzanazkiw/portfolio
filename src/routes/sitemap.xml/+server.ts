import { getPosts } from '$lib/content/blog';
import { absolute } from '$lib/components/seo/structured-data';
import type { RequestHandler } from './$types';

export const prerender = true;

const STATIC_PATHS = ['/', '/work', '/blog', '/about'];

function entry(path: string, lastmod?: string): string {
	const loc = `<loc>${absolute(path)}</loc>`;
	return `<url>${loc}${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}

export const GET: RequestHandler = () => {
	const posts = getPosts();

	const latest = posts[0] && (posts[0].updated ?? posts[0].date);

	const urls = [
		...STATIC_PATHS.map((path) => entry(path, path === '/blog' ? latest : undefined)),
		...posts.map((post) => entry(`/blog/${post.slug}`, post.updated ?? post.date))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=0, s-maxage=3600'
		}
	});
};

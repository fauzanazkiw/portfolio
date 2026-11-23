import { siteContent } from '$lib/content/site-content';
import { plainText } from '$lib/content/inline-markdown';
import { getLabel } from '$lib/content/technology';
import type { Post, PostSummary } from '$lib/content/types';

const { seo, socials, skills } = siteContent;
const SITE = seo.siteUrl;
const LANG = 'en';

const PERSON = `${SITE}/#person`;
const WEBSITE = `${SITE}/#website`;
const BLOG = `${SITE}/blog#blog`;

type Node = Record<string, unknown>;

const ref = (id: string) => ({ '@id': id });

export function absolute(path: string): string {
	return new URL(path, SITE).href;
}

export function postImage(slug: string): string {
	return `/assets/og/${slug}.jpg`;
}

const isoDate = (date: string) => new Date(`${date}T00:00:00Z`).toISOString();

const person = (): Node => ({
	'@type': 'Person',
	'@id': PERSON,
	name: siteContent.fullName,
	alternateName: siteContent.name,
	url: SITE,
	image: absolute(seo.defaultImage),
	jobTitle: siteContent.jobTitle,
	description: seo.defaultDescription,
	email: `mailto:${siteContent.email}`,
	knowsAbout: [...new Set(Object.values(skills.groups).flat().map(getLabel))],
	worksFor: { '@type': 'Organization', name: 'PT Pilihanmu Indonesia Jaya' },
	address: {
		'@type': 'PostalAddress',
		addressLocality: seo.locality,
		addressRegion: seo.region,
		addressCountry: seo.country
	},
	sameAs: Object.values(socials)
});

const website = (): Node => ({
	'@type': 'WebSite',
	'@id': WEBSITE,
	url: SITE,
	name: seo.siteName,
	description: seo.defaultDescription,
	inLanguage: LANG,
	publisher: ref(PERSON),
	copyrightHolder: ref(PERSON)
});

type Crumb = { name: string; path: string };

const breadcrumb = (trail: Crumb[]): Node => ({
	'@type': 'BreadcrumbList',
	itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, position) => ({
		'@type': 'ListItem',
		position: position + 1,
		name: crumb.name,
		item: absolute(crumb.path)
	}))
});

type PageSpec = {
	type: string;
	path: string;
	name: string;
	description: string;
	fragment?: string;
	trail?: Crumb[];
	extra?: Node;
	nodes?: Node[];
};

function graph({ type, path, name, description, fragment, trail, extra, nodes }: PageSpec): string {
	const url = absolute(path);

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			person(),
			...(nodes ?? []),
			{
				'@type': type,
				'@id': `${url}#${fragment ?? 'webpage'}`,
				url,
				name: plainText(name),
				description: plainText(description),
				isPartOf: ref(WEBSITE),
				inLanguage: LANG,
				...(trail && { breadcrumb: breadcrumb(trail) }),
				...extra
			}
		]
	});
}

export const homeSchema = (): string =>
	graph({
		type: 'ProfilePage',
		path: '/',
		name: seo.defaultTitle,
		description: seo.defaultDescription,
		nodes: [website()],
		extra: { about: ref(PERSON), mainEntity: ref(PERSON) }
	});

export const aboutSchema = (): string =>
	graph({
		type: 'AboutPage',
		path: '/about',
		name: siteContent.about.title,
		description: siteContent.about.description,
		trail: [{ name: 'About', path: '/about' }],
		extra: { about: ref(PERSON), mainEntity: ref(PERSON) }
	});

export const workSchema = (): string => {
	const { workPage } = siteContent;
	const projects = [...workPage.groups.flatMap((group) => group.items), ...workPage.side.projects];

	return graph({
		type: 'CollectionPage',
		path: '/work',
		name: workPage.title,
		description: workPage.description,
		trail: [{ name: 'Work', path: '/work' }],
		extra: {
			about: ref(PERSON),
			mainEntity: {
				'@type': 'ItemList',
				numberOfItems: projects.length,
				itemListElement: projects.map((project, position) => ({
					'@type': 'ListItem',
					position: position + 1,
					item: {
						'@type': 'CreativeWork',
						name: plainText(project.title),
						description: plainText(project.description),
						creator: ref(PERSON),
						...(project.url && { url: project.url })
					}
				}))
			}
		}
	});
};

export const blogSchema = (posts: PostSummary[]): string =>
	graph({
		type: 'Blog',
		path: '/blog',
		fragment: 'blog',
		name: siteContent.blog.metaTitle,
		description: siteContent.blog.description,
		trail: [{ name: 'Writing', path: '/blog' }],
		extra: {
			author: ref(PERSON),
			publisher: ref(PERSON),
			blogPost: posts.map((post) => ({
				'@type': 'BlogPosting',
				'@id': `${absolute(`/blog/${post.slug}`)}#article`,
				url: absolute(`/blog/${post.slug}`),
				headline: plainText(post.title),
				datePublished: isoDate(post.date)
			}))
		}
	});

export const postSchema = (post: Post, words: number, readingTime: number): string =>
	graph({
		type: 'BlogPosting',
		path: `/blog/${post.slug}`,
		fragment: 'article',
		name: post.title,
		description: post.description,
		trail: [
			{ name: 'Writing', path: '/blog' },
			{ name: plainText(post.title), path: `/blog/${post.slug}` }
		],
		extra: {
			mainEntityOfPage: ref(absolute(`/blog/${post.slug}`)),
			headline: plainText(post.title),
			image: absolute(postImage(post.slug)),
			datePublished: isoDate(post.date),
			dateModified: isoDate(post.updated ?? post.date),
			author: ref(PERSON),
			publisher: ref(PERSON),
			isPartOf: ref(BLOG),
			keywords: post.tags,
			articleSection: post.tags[0],
			wordCount: words,
			timeRequired: `PT${readingTime}M`
		}
	});

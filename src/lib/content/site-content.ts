import { Technology } from './technology';
import { experience } from './experience';
import { projects, sideProjects, workGroups } from './projects';
import type { Experience, Project, Stat, WorkGroup } from './types';

type Cta = { label: string; href: string };

export type SiteContent = {
	name: string;
	fullName: string;
	jobTitle: string;
	email: string;

	seo: {
		siteName: string;
		siteUrl: string;
		defaultTitle: string;
		titleTemplate: string;
		defaultDescription: string;
		defaultImage: string;
		defaultImageAlt: string;
		imageWidth: number;
		imageHeight: number;
		locale: string;
		twitterHandle?: string;
		locality: string;
		region: string;
		country: string;
	};

	navigation: {
		links: { href: string; label: string }[];
		contactCta: string;
		socials: { label: string; href: string }[];
	};

	cta: { title: string; description: string; primaryCta: Cta; secondaryCta: Cta };

	home: {
		hero: {
			badge: string;
			title: string;
			description: string;
			primaryCta: Cta;
			secondaryCta: Cta;
		};
		experience: { title: string; description: string; cta: Cta };
		work: { title: string; description: string; cta: Cta };
	};

	workPage: {
		title: string;
		description: string;
		stats: Stat[];
		groups: WorkGroup[];
		side: { title: string; description: string; projects: Project[] };
	};

	about: {
		title: string;
		description: string;
	};

	blog: {
		eyebrow: string;
		title: string;
		titleAccent: string;
		metaTitle: string;
		description: string;
	};

	skills: { title: string; description: string; groups: Record<string, Technology[]> };

	socials: { github: string; linkedin: string; instagram: string };

	footer: { subtitle: string; credits: string; linkGroups: LinkGroup[] };
};

export type LinkGroup = {
	title: string;
	links: { label: string; href: string; external?: boolean }[];
};

const SITE_URL = 'https://uus.dev';
const RESUME = '/files/resume.pdf';
const EMAIL = 'azkiff23@gmail.com';

/** El llamado principal, tanto en el hero como en el cierre. */
const contactCta: Cta = { label: 'Contact me', href: `mailto:${EMAIL}` };
const resumeCta: Cta = { label: 'Resume', href: RESUME };
const githubCta: Cta = { label: 'GitHub', href: 'https://github.com/fauzanazkiw' };

export const siteContent: SiteContent = {
	name: 'uus.dev',
	fullName: 'Azki Fauzan Firdaus',
	jobTitle: 'Backend Engineer',
	email: EMAIL,

	seo: {
		siteName: 'uus.dev',
		siteUrl: SITE_URL,
		defaultTitle: 'uus · Backend Engineer',
		titleTemplate: '%s · uus',
		defaultDescription:
			"Azki Fauzan Firdaus (@uus). Backend Engineer in Kebumen, Indonesia. Build backends with Laravel and Go. I'm comfortable with REST APIs, MySQL, PostgreSQL, Docker, and Git, and I've helped build and maintain web applications as part of a team.",
		defaultImage: '/assets/og.jpg',
		defaultImageAlt: 'uus — Azki Fauzan Firdaus, Backend Engineer based in Kebumen, Indonesia.',
		imageWidth: 1200,
		imageHeight: 630,
		locale: 'en_US',
		locality: 'Kebumen',
		region: 'Central Java',
		country: 'ID'
	},

	navigation: {
		links: [
			{ href: '/', label: 'Home' },
			{ href: '/work', label: 'Work' },
			{ href: '/blog', label: 'Writing' },
			{ href: '/about', label: 'About' }
		],
		contactCta: 'Contact me',
		socials: [
			{ label: 'GitHub', href: 'https://github.com/fauzanazkiw' },
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/azkifuzan/' },
			{ label: 'Instagram', href: 'https://instagram.com/fauzanazkiw' }
		]
	},

	cta: {
		title: "Tell me what you're building.",
		description: 'Open to work roles.',
		primaryCta: contactCta,
		secondaryCta: githubCta
	},

	home: {
		hero: {
			badge: 'Open to work',
			title: "Hi, I'm Azki",
			description:
				'Backend Engineer who loves turning complex problems into clean, reliable code. During my 4-month internship, I built web applications and REST APIs with Laravel, worked with MySQL and PostgreSQL, and helped ship features through Docker and CI/CD pipelines. I’m also exploring Go to keep growing my toolkit.',
			primaryCta: contactCta,
			secondaryCta: resumeCta
		},

		experience: {
			title: 'My experience',
			description: 'Full technical ownership across several industries and team sizes.',
			cta: resumeCta
		},

		work: {
			title: 'Selected projects',
			description:
				'Open source and side projects. Most exist because I needed the same thing three times first.',
			cta: { label: 'See all my work', href: '/work' }
		}
	},

	workPage: {
		title: 'Work',
		description:
			'Built and contributed to web applications and backend systems through internships and personal projects, focusing on Laravel, Golang, RESTful APIs, databases, and DevOps practices. Most of the projects are private or developed for specific use cases, so this is what I can share publicly.',
		stats: [
			{ value: '5+', label: 'Systems shipped to production' },
			{ value: '2', label: 'Industries' },
			{ value: '100%', label: 'Still running' }
		],
		groups: workGroups,
		side: {
			title: 'Open source & side projects',
			description:
				'Libraries, templates and experiments, most of them patterns pulled out of the systems above.',
			projects: sideProjects
		}
	},

	about: {
		title: 'About me',
		description:
			'Azki Fauzan Firdaus (@uus), backend engineer in Kebumen, Central Java, Indonesia. Builds REST APIs with Laravel and Go, backed by PostgreSQL, Docker and GitHub Actions, and cares about code that stays testable and easy to maintain.'
	},

	blog: {
		eyebrow: 'Blog',
		title: 'Systems I have built, the trade-offs behind them,',
		titleAccent: 'and the mistakes that taught me the most.',
		metaTitle: 'Writing',
		description: 'Systems I have built, the trade-offs behind them,'
	},

	skills: {
		title: 'Skills & Technologies',
		description:
			'Svelte, React and TypeScript on the frontend, with design systems and real-time interfaces on top; Go and Gin on the backend, all the way through to production monitoring.',
		groups: {
			Frontend: [
				Technology.Svelte,
				Technology.React,
				Technology.Vue,
				Technology.Typescript,
				Technology.Astro,
				Technology.Tailwind,
				Technology.Html,
				Technology.Css,
				Technology.Scss
			],
			Backend: [Technology.Go, Technology.Gin, Technology.NodeJs, Technology.Python],
			Data: [Technology.Postgres, Technology.Redis, Technology.MongoDB],
			'Infrastructure & Observability': [
				Technology.Docker,
				Technology.Aws,
				Technology.Githubactions,
				Technology.CiCd,
				Technology.Grafana,
				Technology.Prometheus
			],
			Testing: [Technology.Vitest, Technology.Playwright],
			'Design & Tooling': [Technology.Figma, Technology.Git, Technology.Github]
		}
	},

	socials: {
		github: 'https://github.com/fauzanazkiw',
		linkedin: 'https://www.linkedin.com/in/azkifauzan/',
		instagram: 'https://instagram.com/fauzanazkiw'
	},

	footer: {
		subtitle: 'Backend Engineer · Kebumen, Indonesia',
		credits: 'Designed & built by uus',
		linkGroups: [
			{
				title: 'Navigation',
				links: [
					{ label: 'Home', href: '/' },
					{ label: 'Work', href: '/work' },
					{ label: 'Writing', href: '/blog' },
					{ label: 'About', href: '/about' }
				]
			},
			{
				title: 'Elsewhere',
				links: [
					{ label: 'GitHub', href: 'https://github.com/fauzanazkiw', external: true },
					{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/azkifauzan/', external: true },
					{ label: 'Instagram', href: 'https://instagram.com/fauzanazkiw', external: true },
					{ label: 'Resume', href: RESUME, external: true }
				]
			}
		]
	}
};

export { experience, projects, sideProjects, workGroups };
export type { Experience, Project, Stat, WorkGroup };

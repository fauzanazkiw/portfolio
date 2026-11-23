import { Technology } from './technology';
import type { Experience } from './types';

/**
 * Ordenado por fecha de inicio descendente, igual que el CV. Kora aparece
 * cerrada (Jan 2026) porque fue una práctica independiente en paralelo a los
 * roles de tiempo completo, no un empleo actual.
 */
export const experience: Experience[] = [
	{
		role: 'Web Developer',
		date: 'Agu 2025 - Sept 2025',
		stack: [Technology.Svelte, Technology.Tailwind],
		company: 'PT Pojok Herbal',
		description:
			'Built a website for an SME using Svelte to showcase business information and a product catalog, including photos, descriptions, and prices. The website strengthens business credibility, expands online marketing reach, and makes it easier for customers to browse products without visiting the store.'
	},
	{
		role: 'Backend Web Developer',
		date: 'Sept 2024 - Dec 2024',
		stack: [
			Technology.Laravel,
			Technology.Postgres,
			Technology.Docker,
			Technology.Git,
			Technology.Redis
		],
		company: 'PT Pilihanmu Indonesia Jaya',
		description:
			'Developed and maintained more than 8 RESTful API endpoints using Laravel to support the Pilih Jurusan web application. Containerized the development environment using Docker, Dockerfile, and Nginx. Designed a database schema (ERD) covering more than 6 entities and implemented it using PostgreSQL, Laravel Eloquent ORM, and migrations. Automated testing and deployment pipelines with GitHub Actions (CI/CD), reducing manual deployment steps by up to 80%. Managed project dependencies using Composer.'
	},
	{
		role: 'Founding Engineer',
		date: 'Jan 2025 - Jan 2026',
		stack: [
			Technology.Go,
			Technology.Svelte,
			Technology.Postgres,
			Technology.Redis,
			Technology.Docker,
			Technology.Aws,
			Technology.Grafana
		],
		company: 'Butter',
		description:
			'Sole technical owner of a US-founded content-generation SaaS, from idea to 1,500 active users, and technical lead for 3 full-stack engineers as the team grew. Built the AI pipeline that differentiated it (multi-model LLM selection, FFmpeg, GPU scheduling) running 2,000+ jobs/day at ~2.4 min median, plus Stripe billing, a multi-vendor marketplace and the observability behind 99.9% uptime.'
	}
];

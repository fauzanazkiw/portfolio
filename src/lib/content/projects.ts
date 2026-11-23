import { Technology } from './technology';
import { experience } from './experience';
import type { Project, WorkGroup } from './types';

export const projects: Project[] = [
	{
		url: 'https://github.com/fauzanazkiw/finance-golang',
		github: 'https://github.com/fauzanazkiw',
		title: 'Finance API',
		description:
			'Built a REST API for a personal finance management application using Go (Gin) and PostgreSQL. Designed the backend using Clean Architecture to improve scalability, testability, and maintainability. Implemented JWT authentication with refresh tokens and middleware to secure sensitive endpoints.',
		technologies: [Technology.Go, Technology.Postgres]
	},
	{
		url: 'https://github.com/fauzanazkiw/Bookself-API',
		github: 'https://github.com/fauzanazkiw',
		title: 'Bookself API',
		description:
			'Completed the final submission project, Bookshelf-API, by developing a web service using native Node.js and the Hapi framework to provide a simple RESTful API. Tested the RESTful API and created automated testing scenarios using Postman.',
		technologies: [Technology.Javascript, Technology.NodeJs]
	},
	{
		url: 'https://github.com/fauzanazkiw/minisoccer_fast',
		github: 'https://github.com/fauzanazkiw',
		title: 'Minisoccer-Fast',
		description:
			'Built a web-based mini soccer field rental system to manage field bookings and rental schedules. Implemented booking management and integrated Midtrans Sandbox for payment processing, with a responsive interface designed to simplify the rental process for customers.',
		technologies: [Technology.Laravel, Technology.Tailwind]
	},
	{
		url: 'https://github.com/fauzanazkiw/populist-store',
		github: 'https://github.com/fauzanazkiw',
		title: 'Populist Store',
		description:
			'Built a web-based store management system for Populist Official Merchandise to manage product information and support customer service operations. Developed a Laravel-based CMS with PostgreSQL and integrated it with a WhatsApp customer service chatbot using n8n, RAG, and vector search to provide automated responses to customer inquiries.',
		technologies: [Technology.Laravel, Technology.Tailwind]
	}
];

/**
 * The Work page renders `workPage.groups` as archive sections and
 * `workPage.side.projects` as the side-project grid, so both collections are
 * derived here from the same records used elsewhere on the site.
 */
export const workGroups: WorkGroup[] = [
	{
		title: 'Professional experience',
		description:
			'Roles where I shipped production systems, from client websites to backend APIs and the infrastructure behind them.',
		items: experience.map(({ role, company, date, description, stack }) => ({
			title: role,
			context: company,
			period: date,
			description,
			technologies: stack
		}))
	}
];

export const sideProjects: Project[] = projects;

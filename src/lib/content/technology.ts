export enum Technology {
	Svelte,
	Go,
	Html,
	Css,
	Tailwind,
	NodeJs,
	Git,
	Github,
	Githubactions,
	MongoDB,
	Postgres,
	Redis,
	Docker,
	Aws,
	CiCd,
	Gin,
	Nginx,
	Grafana,
	Prometheus,
	Vitest,
	Playwright,
	Kubernetes,
	Terraform,
	Laravel,
	AppsScript,
	Astro,
	Figma,
	Firebase,
	Gleam,
	Javascript,
	Leaflet,
	Python,
	React,
	Scss,
	Typescript,
	Vue
}

export function getLabel(technology: Technology): string {
	switch (technology) {
		case Technology.Svelte:
			return 'Svelte';
		case Technology.Html:
			return 'HTML';
		case Technology.Css:
			return 'CSS';
		case Technology.Tailwind:
			return 'Tailwind';
		case Technology.NodeJs:
			return 'Node.js';
		case Technology.MongoDB:
			return 'MongoDB';
		case Technology.Go:
			return 'Go';
		case Technology.Git:
			return 'Git';
		case Technology.Github:
			return 'GitHub';
		case Technology.Githubactions:
			return 'GitHub Actions';
		case Technology.Postgres:
			return 'PostgreSQL';
		case Technology.Redis:
			return 'Redis';
		case Technology.Docker:
			return 'Docker';
		case Technology.Aws:
			return 'AWS';
		case Technology.CiCd:
			return 'CI/CD';
		case Technology.Gin:
			return 'Gin';
		case Technology.Nginx:
			return 'Nginx';
		case Technology.Grafana:
			return 'Grafana';
		case Technology.Prometheus:
			return 'Prometheus';
		case Technology.Vitest:
			return 'Vitest';
		case Technology.Playwright:
			return 'Playwright';
		case Technology.Kubernetes:
			return 'Kubernetes';
		case Technology.Terraform:
			return 'Terraform';
		case Technology.Laravel:
			return 'Laravel';
		case Technology.AppsScript:
			return 'Apps Script';
		case Technology.Astro:
			return 'Astro';
		case Technology.Figma:
			return 'Figma';
		case Technology.Firebase:
			return 'Firebase';
		case Technology.Gleam:
			return 'Gleam';
		case Technology.Javascript:
			return 'JavaScript';
		case Technology.Leaflet:
			return 'Leaflet';
		case Technology.Python:
			return 'Python';
		case Technology.React:
			return 'React';
		case Technology.Scss:
			return 'SCSS';
		case Technology.Typescript:
			return 'TypeScript';
		case Technology.Vue:
			return 'Vue';
		default:
			return 'Unknown';
	}
}

export function getColor(technology: Technology) {
	switch (technology) {
		case Technology.Go:
			return '#00b4e0';
		case Technology.NodeJs:
			return '#81cd39';
		case Technology.Svelte:
			return '#ff3e00';
		case Technology.Html:
			return '#e14e1d';
		case Technology.Css:
			return '#0277bd';
		case Technology.Tailwind:
			return '#0277bd';
		case Technology.Git:
			return '#f03c2e';
		case Technology.Github:
			return '#242938';
		case Technology.Githubactions:
			return '#2084f5';
		case Technology.MongoDB:
			return '#10aa50';
		case Technology.Postgres:
			return '#336791';
		case Technology.Redis:
			return '#dc382d';
		case Technology.Docker:
			return '#2496ed';
		case Technology.Aws:
			return '#ff9900';
		case Technology.Gin:
			return '#008ecf';
		case Technology.Nginx:
			return '#009639';
		case Technology.Grafana:
			return '#f46800';
		case Technology.Prometheus:
			return '#e6522c';
		case Technology.Vitest:
			return '#fcc72b';
		case Technology.Playwright:
			return '#2ead33';
		case Technology.Kubernetes:
			return '#326ce5';
		case Technology.Terraform:
			return '#7b42bc';
		case Technology.Laravel:
			return '#ff3e00';
		case Technology.AppsScript:
			return '#4285f4';
		case Technology.Astro:
			return '#bc52ee';
		case Technology.Figma:
			return '#737373';
		case Technology.Firebase:
			return '#ffca28';
		case Technology.Gleam:
			return '#ffaff3';
		case Technology.Javascript:
			return '#f7df1e';
		case Technology.Leaflet:
			return '#199900';
		case Technology.Python:
			return '#3776ab';
		case Technology.React:
			return '#61dafb';
		case Technology.Scss:
			return '#cc6699';
		case Technology.Typescript:
			return '#3178c6';
		case Technology.Vue:
			return '#42b883';
		default:
			return '#4b4b4b';
	}
}

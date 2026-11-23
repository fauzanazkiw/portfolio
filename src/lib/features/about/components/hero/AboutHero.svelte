<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { Technology } from '$lib/content/technology';
	import { SkillBadge } from '$lib/components/cards';
	import { Button } from '$lib/components/ui/button';
	import SocialIcon from '$lib/components/common/SocialIcon.svelte';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { ArrowUpRight } from '@lucide/svelte';

	const { about, socials, email } = siteContent;
	const inlineBadge = 'inline-flex rounded-md bg-muted/50 py-0.5';
</script>

<Section.Root spacing="hero">
	<div class="grid gap-x-24 gap-y-12 lg:grid-cols-2">
		<div class="flex flex-col gap-y-8">
			<h1 class="ty-h1 font-mono">{about.title}</h1>

			<div class="flex flex-col gap-y-4" {@attach useReveal({ targets: 'p', stagger: 0.08 })}>
				<p class="max-w-prose text-pretty text-muted-foreground">
					Hi, I'm <span class="text-foreground">Azki Fauzan Firdaus</span> (<span
						class="ty-inlinecode">@fauzanazkiw</span
					>). Backend engineer, based in Kebumen, Jawa Tengah.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					I build backend systems and web applications that are clean, maintainable, and reliable.
					My main stack is
					<SkillBadge class={inlineBadge} tech={Technology.Go} /> and
					<SkillBadge class={inlineBadge} tech={Technology.Laravel} />, and I'm comfortable
					designing REST APIs and databases, as well as working with
					<SkillBadge class={inlineBadge} tech={Technology.Docker} />, <SkillBadge
						class={inlineBadge}
						tech={Technology.Git}
					/> and <SkillBadge class={inlineBadge} tech={Technology.CiCd} /> I also have experience with
					Node.js and Hapi for backend development.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					Most recently, I spent four months as a Back-end Web Developer Intern at <span
						class="text-foreground">PT Pilihanmu Indoensia Jaya</span
					>, There, I developed and maintained 8+ RESTful API endpoints in <SkillBadge
						class={inlineBadge}
						tech={Technology.Laravel}
					/> designed a <SkillBadge class={inlineBadge} tech={Technology.Postgres} />
					schema with 6+ entities, and handled development and deployment using
					<SkillBadge class={inlineBadge} tech={Technology.Docker} />,
					<SkillBadge class={inlineBadge} tech={Technology.Nginx} />, <SkillBadge
						class={inlineBadge}
						tech={Technology.Git}
					/>, <SkillBadge class={inlineBadge} tech={Technology.Githubactions} />
					zero regressions so far.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					Outside of work, I built a Finance Backend API with <SkillBadge
						class={inlineBadge}
						tech={Technology.Go}
					/>, Gin, and <SkillBadge class={inlineBadge} tech={Technology.Postgres} />. It follows
					Clean Architecture and includes JWT authentication, refresh tokens, and 6+ REST endpoints.
					I also created a WhatsApp customer service chatbot using n8n and RAG, which connects the
					WhatsApp Business API, a vector database, and the OpenAI API.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					Before moving deeper into backend work, I built web applications with PHP, JavaScript, and
					MySQL.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					I care about writing code that is well-structured, testable, and easy to maintain. Right
					now, I'm sharpening my backend skills, especially in <SkillBadge
						class={inlineBadge}
						tech={Technology.Go}
					/>, and continuing to build software that solves real problems.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-2">
				<Button href="mailto:{email}">Contact me</Button>
				<Button
					variant="outline"
					href="/files/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>Resume</span>
					<ArrowUpRight class="size-4" />
				</Button>
			</div>
		</div>

		<div class="flex flex-col gap-y-4">
			<div class="relative aspect-square w-full max-w-sm overflow-hidden rounded-4xl border">
				<img
					src="/assets/pfp.png"
					alt=""
					class="aspect-square h-full w-full object-cover grayscale"
				/>
			</div>

			<div class="flex flex-wrap gap-2">
				<Button
					variant="outline"
					size="icon"
					href={socials.github}
					target="_blank"
					aria-label="GitHub"
				>
					<SocialIcon platform="github" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					href={socials.instagram}
					target="_blank"
					aria-label="Instagram"
				>
					<SocialIcon platform="instagram" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					href={socials.linkedin}
					target="_blank"
					aria-label="LinkedIn"
				>
					<SocialIcon platform="linkedin" />
				</Button>
			</div>
		</div>
	</div>
</Section.Root>

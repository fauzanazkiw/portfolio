# uus.dev

Personal site and writing of **Azki Fauzan Firdaus** (`@uus`), a backend engineer
based in Kebumen, Central Java, Indonesia. Backends built with Laravel and Go:
REST APIs, MySQL and PostgreSQL, Docker, and CI/CD.

The site is a portfolio, not a product page. It has to load fast, read well on a
phone, and stay easy to update when a project or a job changes.

## Pages

| Route          | What it is                                             |
| -------------- | ------------------------------------------------------ |
| `/`            | Hero, experience, selected projects, skills            |
| `/work`        | Full archive of projects and side projects, with stats |
| `/blog`        | Writing index                                          |
| `/blog/[slug]` | A post, with table of contents, code blocks and cover  |
| `/about`       | Long-form bio                                          |
| `/rss.xml`     | Generated feed                                         |
| `/sitemap.xml` | Generated sitemap                                      |
| `/robots.txt`  | Generated robots file                                  |

Every page mounts exactly one `<Seo />` component from
`src/lib/components/seo/`, which also emits the structured data.

## Stack

| Layer     | Tool                                      |
| --------- | ----------------------------------------- |
| Framework | SvelteKit 2 + Svelte 5 (runes)            |
| Language  | TypeScript (strict)                       |
| Styling   | Tailwind CSS v4 + shadcn-svelte (`maia`)  |
| Motion    | GSAP (ScrollTrigger, SplitText) + Lenis   |
| Graphics  | three.js, postprocessing, ogl             |
| Icons     | Lucide                                    |
| Testing   | Vitest (browser mode) + Playwright        |
| Hosting   | Cloudflare Workers (`adapter-cloudflare`) |

## Getting started

Requires Node 22 and pnpm.

```sh
pnpm install
pnpm dev          # Vite dev server
```

The pnpm build approvals for `esbuild` and `workerd` are committed in
`pnpm-workspace.yaml`, so a fresh install does not stall on postinstall scripts.

## Scripts

| Command          | Does                                                         |
| ---------------- | ------------------------------------------------------------ |
| `pnpm dev`       | Dev server                                                   |
| `pnpm build`     | Verifies the OG images, then `vite build` for Cloudflare     |
| `pnpm preview`   | Runs the built worker locally with `wrangler dev` on :4173   |
| `pnpm og`        | Regenerates the Open Graph images                            |
| `pnpm check`     | `svelte-check` against `tsconfig.json`                       |
| `pnpm lint`      | `prettier --check` + ESLint                                  |
| `pnpm format`    | Applies Prettier                                             |
| `pnpm types`     | Regenerates `worker-configuration.d.ts` via `wrangler types` |
| `pnpm test:unit` | Vitest in browser mode (Playwright Chromium)                 |
| `pnpm test:e2e`  | Playwright flows in `e2e/`                                   |
| `pnpm test`      | Unit + e2e                                                   |

## Project structure

```
src/
├── lib/
│   ├── attachments/          # Motion attachments: reveal, split-title, counter, scramble…
│   ├── components/
│   │   ├── actions/          # use: actions (inview, reveal)
│   │   ├── cards/            # ProjectCard, RecordRow, SkillBadge, StatGrid
│   │   ├── common/           # Small shared pieces
│   │   ├── effects/          # Canvas/WebGL: pixel, iridescence, grainient, noise, cursor
│   │   ├── layout/           # SiteHeader, Footer, Section primitives
│   │   ├── motion/           # Scroll helpers
│   │   ├── sections/         # Cross-page bands: SiteCta, ClosingCta, PanelCtas
│   │   ├── seo/              # <Seo /> + structured data
│   │   ├── stores/           # theme, motion
│   │   └── ui/               # shadcn-svelte, style `maia`. Generated
│   ├── content/              # Every string and every record on the site
│   ├── features/             # Vertical slices: home, work, blog, about
│   ├── gsap.ts               # Plugin registration + reduced-motion helpers
│   └── utils.ts
└── routes/                   # Thin: <Seo /> + the feature's landing component
```

Imports use the aliases from `svelte.config.js`:

- `$lib` → `src/lib`
- `$components` → `src/lib/components`
- `$content` → `src/lib/content`
- `$features` → `src/lib/features`
- `$ui` → `src/lib/components/ui`

Three rules keep the project from drifting:

- **A route file mounts a landing component and nothing else.** Markup lives in
  `features/<name>/components/`. If a page grows a section, the section is a file.
- **Content is not markup.** Every string and every record lives in
  `src/lib/content/`. Changing a word means changing `site-content.ts`, not a
  component.
- **Motion goes through `src/lib/attachments/`, never inline GSAP.** All of them
  no-op under `prefers-reduced-motion: reduce`.

## Design system

Tokens, rhythm and typography live in `src/routes/layout.css`, commented in
place. The parts worth knowing before writing a component:

| Utility                       | What it is                                                              |
| ----------------------------- | ----------------------------------------------------------------------- |
| `.px-layout`                  | The one horizontal margin. Sections apply it to themselves.             |
| `.max-w-wx`                   | The content column. Backgrounds bleed past it; content does not.        |
| `.py-section` / `.pb-section` | One unit of vertical rhythm. `pb-` for a block that continues the last. |
| `.py-hero` / `.py-section-lg` | First block (the header already leaves air) / closing block.            |
| `.p-card` / `.py-item`        | Card padding / list-row padding.                                        |
| `.ty-h1` … `.ty-h4`           | The type scale. Hierarchy comes from size, never from weight.           |
| `--color-brand`               | The accent. Never a loose hex.                                          |
| `--ease-out-expo`             | The one hover curve, so micro-interactions match.                       |

Type is two families, no more: **Manrope** for everything (body and headings)
and **Geist Mono** for the wordmark, dates, stack labels and inline code.

Use `<Section.Root>` from `$lib/components/layout/section` instead of writing
`<section class="px-layout py-section">` by hand: it carries the margin, the
rhythm and the content column together.

### Updating shadcn components

`src/lib/components/ui/` is generated. Run `./update-components.sh` to pull the
current versions of the configured style, then review the diff. Hand edits there
get overwritten, so anything site-specific belongs in a wrapper.

## Open Graph images

`pnpm build` runs `node scripts/generate-og.mjs --check` first. The generated
images are committed, because CI only verifies them:

- `static/assets/og.jpg` — the site card
- `static/assets/og/<post-slug>.jpg` — one per published post

If content changes, regenerate them:

```sh
pnpm exec playwright install chromium   # once, needs a real Chromium
pnpm og
```

The checker fails the build with the list of missing files rather than shipping a
stale social preview.

## Testing

`pnpm test:unit` runs Vitest in browser mode, so it needs Playwright's Chromium
(`pnpm exec playwright install chromium`). The WebGL effects instantiate a real
`THREE.WebGLRenderer`, which requires a working WebGL context — headless CI
containers without GPU support need software rendering for those specs.

`pnpm test:e2e` starts `pnpm build && pnpm preview` on port 4173, so the build
has to be green before the flows run.

## Deployment

The app ships as a Cloudflare Worker with static assets, configured in
`wrangler.jsonc` (`workers_dev` and `preview_urls` are on).

### Recommended: GitHub → Cloudflare Workers Builds

1. Push the repository to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Connect to Git**.
3. Settings:
   - Build command: `pnpm build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/`
   - Environment variables: `NODE_VERSION=22`, and pin `PNPM_VERSION` if you
     need a specific pnpm release
4. Add the custom domain once the first build is live.

Pick **Workers**, not Pages: this project uses `adapter-cloudflare` v7 and the
`_worker.js` + assets layout that `wrangler.jsonc` describes.

### Manual

```sh
pnpm build
pnpm exec wrangler login     # or set CLOUDFLARE_API_TOKEN
pnpm exec wrangler deploy
```

Useful as a hotfix path, but it has no build log, no per-PR preview and no
one-click rollback.

### Custom domain

`SITE_URL` in `src/lib/content/site-content.ts` is `https://uus.dev`, so the
canonical metadata already points there. To serve the worker on that hostname the
`uus.dev` zone has to be on the same Cloudflare account; then either add the
route in the dashboard or declare it:

```jsonc
"routes": [{ "pattern": "uus.dev", "custom_domain": true }]
```

Until then the site answers on `portfolio.<subdomain>.workers.dev`.

## Content checklist

Everything user-visible lives in `src/lib/content/`:

| File              | Holds                                                |
| ----------------- | ---------------------------------------------------- |
| `site-content.ts` | Identity, SEO, navigation, page copy, skills, footer |
| `experience.ts`   | Roles and dates                                      |
| `projects.ts`     | Archive groups and side projects                     |
| `blog.ts`         | Posts, slugs, reading time, metadata                 |
| `technology.ts`   | Technology labels and logos                          |
| `types.ts`        | Shared record types                                  |

After editing copy, run `pnpm og` and commit the regenerated images.

## License

Content is personal and not licensed for reuse. The code is available to read.

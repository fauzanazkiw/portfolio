# Repository Guidelines

## Project Structure & Module Organization

This is a SvelteKit 2 application using Svelte 5, TypeScript, Tailwind CSS v4, and the Cloudflare adapter.

- `src/routes/` contains thin route entry points, page-specific server code, and global styles.
- `src/lib/components/` contains reusable UI, cards, sections, layout primitives, and visual effects.
- `src/lib/attachments/` contains motion and interaction attachments; route components should use these rather than inline GSAP.
- `src/lib/content/` holds site copy and records when present; keep content separate from markup.
- `static/` contains public images, downloadable files, and other assets.
- `e2e/` contains Playwright tests; colocated `*.spec.ts` files contain Vitest component tests.
- `scripts/` contains maintenance and asset-generation scripts.

Generated shadcn components under `src/lib/components/ui/` should be updated with `./update-components.sh`; place custom behavior in wrappers.

## Build, Test, and Development Commands

Use pnpm (the repository includes `pnpm-lock.yaml`):

```sh
pnpm dev          # Start the Vite development server
pnpm check        # Run Svelte and TypeScript diagnostics
pnpm lint         # Check Prettier formatting and ESLint rules
pnpm test         # Run Vitest and Playwright suites
pnpm build        # Generate/check OG assets and build for Cloudflare
pnpm preview      # Serve the built worker locally
pnpm format       # Apply Prettier formatting
```

Run `pnpm test:unit` or `pnpm test:e2e` when iterating on one test layer.

## Coding Style & Naming Conventions

Use tabs and let Prettier format Svelte, TypeScript, CSS, and Markdown. Follow ESLint and strict TypeScript checks. Use PascalCase for Svelte component filenames, camelCase for functions and variables, and kebab-case for route directories and URL slugs. Prefer `$lib` imports. Keep route files thin, use shared design tokens from `src/routes/layout.css`, and honor reduced-motion behavior in animations.

## Testing Guidelines

Vitest browser tests cover component rendering and use `*.spec.ts`; Playwright tests cover browser flows in `e2e/` and use `*.test.ts`. Add or update a focused test for changed behavior, then run `pnpm test` before submitting.

## Commit & Pull Request Guidelines

Write concise, imperative commit subjects (for example, `Add talks index page`) and keep unrelated changes separate. Pull requests should explain the user-visible change, mention validation commands, link related issues when applicable, and include screenshots or recordings for visual changes. Call out content, asset, or deployment configuration changes explicitly.

## Security & Configuration Tips

Do not commit secrets or local environment files. Review `wrangler.jsonc` and generated Cloudflare types when changing deployment behavior; use environment bindings rather than hardcoded credentials.

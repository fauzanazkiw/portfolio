import { createServer } from 'vite';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const OUT = path.join(root, 'static/assets/og');
const FONTS = path.join(root, 'node_modules/@fontsource-variable');
const PFP = path.join(root, 'static/assets/pfp.jpg');

const BG = 'oklch(0.141 0.005 285.823)';
const FG = 'oklch(0.985 0 0)';
const MUTED = 'oklch(0.705 0.015 286.067)';
const BORDER = 'oklch(1 0 0 / 10%)';
const BRAND = 'oklch(0.76 0.12 295)';

const escape = (s) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const mono = (parts) => parts.filter(Boolean).map(escape).join('<span class="sep">·</span>');

const card = ({ accent = BRAND, eyebrow, body, left, right, css = '' }) => `<!doctype html>
<html><head><meta charset="utf-8" /><style>
  @font-face { font-family: 'Manrope'; font-weight: 200 800;
    src: url('file://${FONTS}/manrope/files/manrope-latin-wght-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Geist Mono'; font-weight: 100 900;
    src: url('file://${FONTS}/geist-mono/files/geist-mono-latin-wght-normal.woff2') format('woff2'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: ${BG}; color: ${FG};
    font-family: 'Manrope', sans-serif; font-weight: 400; overflow: hidden;
    padding: 80px; display: flex; flex-direction: column; justify-content: space-between;
    -webkit-font-smoothing: antialiased; }
  .mono { font-family: 'Geist Mono', monospace; font-size: 19px; color: ${MUTED};
    letter-spacing: 0.01em; }
  .eyebrow { display: flex; align-items: center; gap: 13px; text-transform: uppercase;
    letter-spacing: 0.14em; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: ${accent};
    box-shadow: 0 0 0 4px color-mix(in oklab, ${accent} 22%, transparent); flex: none; }
  .foot { display: flex; align-items: baseline; justify-content: space-between; gap: 40px;
    border-top: 1px solid ${BORDER}; padding-top: 26px; }
  .sep { color: ${FG.replace(')', ' / 0.28)')}; margin: 0 10px; }
  ${css}
</style></head><body>
  <div class="mono eyebrow"><span class="dot"></span>${eyebrow}</div>
  ${body}
  <div class="foot"><span class="mono">${left}</span><span class="mono">${right}</span></div>
</body></html>`;

function siteCard({ content, host, stack }) {
	return card({
		eyebrow: escape(content.home.hero.badge),
		css: `
  .body { display: flex; align-items: center; gap: 34px; }
  .avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; flex: none;
    box-shadow: 0 0 0 1px ${BORDER}; }
  h1 { font-family: 'Geist Mono', monospace; font-size: 84px; font-weight: 400;
    letter-spacing: -0.04em; line-height: 1; }
  .lead { font-size: 30px; color: ${MUTED}; margin-top: 16px; letter-spacing: -0.01em; }`,
		body: `<div class="body">
    <img class="avatar" src="file://${PFP}" />
    <div>
      <h1>${escape(content.name)}</h1>
      <div class="lead">${escape(content.footer.subtitle)}</div>
    </div>
  </div>`,
		left: escape(host),
		right: mono(stack)
	});
}

function postCard({ post, title, readingTime, host }) {
	const size = title.length > 76 ? 58 : title.length > 50 ? 68 : 78;

	return card({
		accent: post.accent,
		eyebrow: mono(post.tags.slice(0, 3)),
		css: `
  h1 { font-size: ${size}px; font-weight: 400; line-height: 1.12; letter-spacing: -0.025em;
    max-width: 19ch; text-wrap: balance; }`,
		body: `<h1>${escape(title)}</h1>`,
		left: escape(host),
		right: mono([post.date.replaceAll('-', '.'), `${readingTime} min read`])
	});
}

const CHECK = process.argv.includes('--check');

const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' });

const [{ siteContent }, blog, { plainText }, { getLabel }] = await Promise.all(
	[
		'/src/lib/content/site-content.ts',
		'/src/lib/content/blog.ts',
		'/src/lib/content/inline-markdown.ts',
		'/src/lib/content/technology.ts'
	].map((id) => vite.ssrLoadModule(id))
);

const host = new URL(siteContent.seo.siteUrl).host;

const stack = Object.values(siteContent.skills.groups).map((group) => getLabel(group[0]));

const cards = [
	{
		file: path.join(root, 'static/assets', 'og.jpg'),
		html: () => siteCard({ content: siteContent, host, stack })
	},
	...blog.getPosts().map((post) => ({
		file: path.join(OUT, `${post.slug}.jpg`),
		html: () =>
			postCard({ post, title: plainText(post.title), readingTime: blog.readingTime(post), host })
	}))
];

await vite.close();

if (CHECK) {
	const missing = cards.filter((card) => !existsSync(card.file));

	if (missing.length > 0) {
		const list = missing.map((card) => `    ${path.relative(root, card.file)}`).join('\n');
		console.error(`\n  ✗ Faltan ${missing.length} berhasil Open Graph:\n${list}`);
		console.error('\n    Coba: pnpm og\n');
		process.exit(1);
	}

	console.log(`Open Graph: ${cards.length} good`);
	process.exit(0);
}

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: siteContent.seo.imageWidth, height: siteContent.seo.imageHeight }
});

await mkdir(OUT, { recursive: true });

console.log('Open Graph:');

for (const card of cards) {
	const tmp = path.join(OUT, '.render.html');
	await writeFile(tmp, card.html());
	await page.goto(`file://${tmp}`);
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: card.file, type: 'jpeg', quality: 92 });
	await rm(tmp);
	console.log('  ✓', path.relative(root, card.file));
}

await browser.close();

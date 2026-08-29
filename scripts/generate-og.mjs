/**
 * Generates every Open Graph social card from the brand mark plus the resource
 * collection.
 *
 *   node scripts/generate-og.mjs        (or: npm run og)
 *
 * Cards are 1200×630 and land in `public/images/og/`. Page cards are the three
 * write() calls near the bottom; one card per resource is derived from the frontmatter in
 * `src/content/resources/`, so a new resource gets its card by re-running this
 * rather than by anyone opening a design tool.
 *
 * Text is laid out as SVG and rasterised by sharp. Font names below resolve
 * against *system* fonts, so run this on a machine that has them — the output is
 * committed, so it never needs to work on CI.
 */
import sharp from 'sharp';
import { readdir, readFile, mkdir } from 'node:fs/promises';

const MARK = 'src/assets/brand/logo-mark.png';
const OUT = 'public/images/og';
const W = 1200;
const H = 630;

const INK = '#04070e';
const INK_800 = '#0c1322';
const ARC = '#1e85ff';
const ARC_300 = '#7fbcff';
const BONE = '#eef3fb';
const BONE_400 = '#8494b0';

const DISPLAY = 'Space Grotesk, Segoe UI, Inter, sans-serif';
const MONO = 'IBM Plex Mono, Consolas, monospace';

await mkdir(OUT, { recursive: true });

const escape = (s) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Greedy wrap. Width is estimated from the font size rather than measured —
 * there is no text metrics API here, and 0.55em average advance is close enough
 * for a display face at these sizes that nothing overflows the safe area.
 */
function wrap(text, fontSize, maxWidth) {
	const perChar = fontSize * 0.55;
	const max = Math.floor(maxWidth / perChar);
	const lines = [];
	let line = '';

	for (const word of text.split(/\s+/)) {
		const candidate = line ? `${line} ${word}` : word;
		if (candidate.length > max && line) {
			lines.push(line);
			line = word;
		} else {
			line = candidate;
		}
	}
	if (line) lines.push(line);
	return lines;
}

function card({ eyebrow, title, footer }) {
	const size = title.length > 46 ? 52 : title.length > 30 ? 60 : 68;
	const lines = wrap(title, size, 600);
	const lineHeight = size * 1.18;

	/*
		Centre the block between the eyebrow and the rule, then clamp the first
		baseline so a tall title cannot ride up into the eyebrow — SVG has no
		layout engine to push it back down, so the collision has to be prevented
		here rather than discovered on Twitter.
	*/
	const blockHeight = (lines.length - 1) * lineHeight;
	const top = Math.max(268, 352 - blockHeight / 2);

	return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
	<defs>
		<linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="${INK_800}"/>
			<stop offset="100%" stop-color="${INK}"/>
		</linearGradient>
		<radialGradient id="glow" cx="0.82" cy="0.5" r="0.5">
			<stop offset="0%" stop-color="${ARC}" stop-opacity="0.30"/>
			<stop offset="100%" stop-color="${ARC}" stop-opacity="0"/>
		</radialGradient>
		<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
			<path d="M40 0H0V40" fill="none" stroke="#7aa2d8" stroke-opacity="0.05" stroke-width="1"/>
		</pattern>
	</defs>

	<rect width="${W}" height="${H}" fill="url(#ground)"/>
	<rect width="${W}" height="${H}" fill="url(#grid)"/>
	<rect width="${W}" height="${H}" fill="url(#glow)"/>

	<text x="72" y="207" font-family="${MONO}" font-size="20" letter-spacing="3"
		fill="${ARC_300}">${escape(eyebrow.toUpperCase())}</text>

	${lines
		.map(
			(line, i) =>
				`<text x="72" y="${Math.round(top + i * lineHeight)}" font-family="${DISPLAY}" font-size="${size}" font-weight="600" letter-spacing="-1.5" fill="${BONE}">${escape(line)}</text>`,
		)
		.join('\n\t')}

	<line x1="72" y1="512" x2="1128" y2="512" stroke="#7aa2d8" stroke-opacity="0.22" stroke-width="1"/>
	<text x="72" y="546" font-family="${MONO}" font-size="21" letter-spacing="1"
		fill="${BONE_400}">${escape(footer)}</text>
</svg>`);
}

/** Wordmark, drawn beside the mark in the top-left. */
const wordmark = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="60">
	<text x="0" y="40" font-family="${DISPLAY}" font-size="30" font-weight="700"
		letter-spacing="0.5" fill="${BONE}">MOLAR <tspan fill="#4da2ff">AI</tspan></text>
</svg>`);

/**
 * Multiplies the alpha channel. sharp has no opacity option on composite, and
 * the large mark has to sit behind the headline as atmosphere rather than
 * competing with it for attention.
 */
const fade = (input, opacity) =>
	sharp(input)
		.ensureAlpha()
		.composite([
			{
				input: Buffer.from([255, 255, 255, Math.round(255 * opacity)]),
				raw: { width: 1, height: 1, channels: 4 },
				tile: true,
				blend: 'dest-in',
			},
		])
		.png()
		.toBuffer();

const markSmall = await sharp(MARK).resize({ height: 52 }).png().toBuffer();
const markLarge = await fade(await sharp(MARK).resize({ height: 360 }).png().toBuffer(), 0.5);

async function write(name, spec) {
	await sharp(card(spec))
		.composite([
			// The mark, large and low-opacity, anchors the right side.
			{ input: markLarge, top: 140, left: 905 },
			{ input: markSmall, top: 58, left: 72 },
			{ input: wordmark, top: 56, left: 138 },
		])
		.png({ compressionLevel: 9, effort: 10, palette: true, quality: 92 })
		.toFile(`${OUT}/${name}.png`);
	console.log(`  ${name}.png`);
}

console.log('Page cards:');
await write('home', {
	eyebrow: 'Patient education, automated',
	title: 'The easiest way to educate patients online.',
	footer: 'molarai.studio  ·  The content engine for dentistry',
});
await write('resources', {
	eyebrow: 'Free resource library',
	title: 'Guides, checklists and scripts for dental practices.',
	footer: 'molarai.studio  ·  The content engine for dentistry',
});
await write('404', {
	eyebrow: 'Page not found',
	title: 'That page has moved.',
	footer: 'molarai.studio  ·  The content engine for dentistry',
});

console.log('\nResource cards:');
const dir = 'src/content/resources';
for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
	const raw = await readFile(`${dir}/${file}`, 'utf8');
	const field = (key) => raw.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))?.[1] ?? '';

	await write(`resource-${file.replace(/\.md$/, '')}`, {
		eyebrow: 'Free resource',
		title: field('title'),
		footer: `${field('category')}  ·  PDF  ·  ${field('pages')} pages`,
	});
}

console.log('\nDone.');

/**
 * Turns the delivered client logos into marks the trust band can wear.
 *
 *   node scripts/generate-client-logos.mjs
 *
 * Masters: `logos-master/*.png` — as supplied by the practices, 2380px squares.
 *
 * ── Not in public/, on purpose ─────────────────────────────────────────────
 * They used to live in `public/ClientsLogos/`, which meant Astro copied all
 * 16 MB of them into `dist/` and Netlify served masters nobody requests. They
 * are build inputs, not web assets. `logos-master/superseded/` holds the
 * previous set — screenshots on opaque white — kept for reference and read by
 * nothing.
 *
 * ── Colour, and why this script keeps getting shorter ──────────────────────
 * Three generations of this file:
 *
 *   1. The masters were screenshots on opaque white with no alpha. This
 *      greyscaled, negated and rebuilt the artwork as an alpha channel, giving
 *      a flat white silhouette — the only way to get a usable mark off a logo
 *      floating in a white rectangle.
 *   2. The brand wanted real colours, so the reconstruction went and the white
 *      field came with it: flatten, trim, resize. The band grew white plates so
 *      dark-on-white marks stayed legible.
 *   3. The masters are now delivered with the background already cut. So there
 *      is nothing to reconstruct and nothing to flatten — just trim and resize.
 *
 * `flatten` is specifically NOT called any more. It would composite the
 * transparency back onto a white rectangle and undo the work the new masters
 * came with.
 *
 * Output lands in `src/assets/clients/` — inside src/, because the band renders
 * them through Astro's <Image>, which needs the source there to emit a
 * responsive WebP. Filenames are slugged so the glob in TrustBand can key on
 * them.
 *
 * ⚠️ Four masters still arrive OPAQUE — see the console output, which flags
 * them. Their background is baked in and `trim` can only crop it back to the
 * artwork's bounding box, not remove it. They sit on the band's white plate,
 * where a near-white rectangle is close to invisible, but a master with a
 * coloured or textured ground would show as a plate-within-a-plate. Get those
 * four re-cut with alpha when you can.
 */
import sharp from 'sharp';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const IN = 'logos-master';
const OUT = 'src/assets/clients';
const ROSTER = 'src/data/clients.ts';
/** Which marks need a dark plate. Read by `~/components/sections/TrustBand`. */
const TONE_OUT = 'src/data/client-logo-tone.json';

/** Twice the 56px the band draws them at, for 2× displays. */
const HEIGHT = 112;

/**
 * How near the corner colour counts as background for the trim.
 *
 * On an RGBA master `trim` works off the alpha channel and this barely matters.
 * On the four opaque ones it works off the top-left pixel, and those are
 * scans — the margin carries JPEG noise and the odd gradient, so it needs
 * slack. Too low and nothing trims; too high and it eats into light artwork.
 */
const TRIM_THRESHOLD = 22;

/**
 * Four of these practices also publish a grid in `~/data/work`, and the hero and
 * the work pages look their mark up by THAT slug. Writing them under the slug of
 * the delivered filename instead would leave two copies of the same logo and
 * break the lookup, so those four are renamed to match.
 */
const ALIASES = {
	physimed: 'physimed-dentaire',
	zahnzauber: 'zahnzauber-zahnspangen',
	gmu: 'gmu-dental',
	'walnut-street-smiles': 'walnut-street-dental',
};

const slug = (name) => {
	const base = name
		.replace(/\.[^.]+$/, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
	return ALIASES[base] ?? base;
};

/**
 * The roster, as slugs, read out of `~/data/clients`.
 *
 * A master that is not on it does not get a mark. The delivered folder is not a
 * client list — the September drop carried ten files that are MOLAR's own logo
 * in various treatments plus duplicates of three practices already in the set,
 * and generating those produced ten orphan images that the eager glob in
 * TrustBand would still import.
 *
 * Parsed with a regex rather than imported, because this is a .mjs script and
 * the roster is TypeScript. Fragile in one specific way — it depends on the
 * `slug: '...'` shape — so it throws rather than silently matching nothing,
 * which would skip every logo and empty the band.
 */
async function rosterSlugs() {
	const source = await readFile(ROSTER, 'utf8');
	const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
	if (!slugs.length) {
		throw new Error(
			`No "slug: '...'" entries found in ${ROSTER}. The roster's shape changed — ` +
				`fix the pattern in this script rather than letting it skip every logo.`,
		);
	}
	return new Set(slugs);
}

/**
 * Colour distance, plain Euclidean in RGB. 0 for identical, ~441 for black to
 * white. Good enough to tell a logo's ink from the flat field behind it, which
 * is all this needs — perceptual accuracy would not change a single decision.
 */
const distance = (a, b, i, j) =>
	Math.hypot(a[i] - b[j], a[i + 1] - b[j + 1], a[i + 2] - b[j + 2]);

/**
 * How close to the seed colour still counts as background. Beyond 2× this a
 * pixel is kept whole; between the two its alpha is ramped, which is what gives
 * the cut edge its antialiasing back instead of a hard 1px stair.
 */
const KEY_TOLERANCE = 42;

/**
 * Cuts a baked-in background out to transparency.
 *
 * Five of the September masters — DCD, gmü, Gustafson, Physimed and PURE Dental
 * — arrive with the logo sitting on its own solid rectangle inside the alpha
 * rather than on transparency. On the band that renders as a box inside the
 * plate, in a slightly different white (or, for PURE Dental, in black), which is
 * the "inconsistent backgrounds" this exists to fix. Every plate is the same
 * colour; it was the artwork bringing its own.
 *
 * A flood fill from the edges, NOT a global "remove everything near white".
 * That distinction is the whole reason this is safe: white inside the artwork —
 * the knockout letters in PURE Dental, the highlights in the Dutchess crest — is
 * not reachable from the border, so it survives. Only the field the logo floats
 * on is removed.
 *
 * Returns the buffer unchanged when the border is not a solid field, so the
 * eleven masters that were delivered correctly are never touched.
 */
async function keyBackground(buffer) {
	const { data, info } = await sharp(buffer)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const { width: w, height: h } = info;

	/*
		The seed, sampled from a ring inset 3% rather than from the outermost
		pixels. `trim` routinely leaves a transparent hairline at the edge, and
		seeding off that reads "the background is transparent" on an image whose
		background is emphatically not.
	*/
	const ix = Math.max(1, Math.round(w * 0.03));
	const iy = Math.max(1, Math.round(h * 0.03));
	const ring = [];
	for (let x = ix; x < w - ix; x++) ring.push((iy * w + x) * 4, ((h - 1 - iy) * w + x) * 4);
	for (let y = iy; y < h - iy; y++) ring.push((y * w + ix) * 4, (y * w + (w - 1 - ix)) * 4);

	const solid = ring.filter((i) => data[i + 3] >= 250);
	if (solid.length / ring.length < 0.6) return buffer;

	const seed = [0, 0, 0];
	for (const i of solid) {
		seed[0] += data[i];
		seed[1] += data[i + 1];
		seed[2] += data[i + 2];
	}
	const bg = seed.map((v) => Math.round(v / solid.length));

	/*
		A saturated ring is artwork, not a background — bail out.

		Court Street is why this exists. Its logo IS a gold-ruled rectangle that
		fills the frame, so the ring sampled rgb(167,144,66) and the fill happily
		ate the logo's own border, leaving a ghost. Real backgrounds here are
		near-neutral: white, off-white, the sage DCD sits on, PURE Dental's black.
		All measure under 0.15; the gold measures 0.60.

		Skipping is also the right answer if a practice ever does supply a genuinely
		brand-coloured ground — that ground is part of the mark and removing it
		would be vandalism rather than a fix.
	*/
	const max = Math.max(...bg);
	const saturation = max === 0 ? 0 : (max - Math.min(...bg)) / max;
	if (saturation > 0.25) return buffer;

	/*
		Iterative stack, not recursion: these are up to a couple of million pixels
		and a recursive fill would blow the stack on the first wide master.
	*/
	const seen = new Uint8Array(w * h);
	const stack = [];
	for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
	for (let y = 0; y < h; y++) stack.push(y * w, y * w + (w - 1));

	while (stack.length) {
		const p = stack.pop();
		if (seen[p]) continue;
		seen[p] = 1;

		const i = p * 4;
		/* Already transparent: not background to remove, but the fill has to pass
		   through it to reach the field beyond a trimmed hairline. */
		if (data[i + 3] !== 0) {
			const d = distance(data, bg, i, 0);
			if (d >= KEY_TOLERANCE * 2) continue;
			/* Inside the tolerance it goes entirely; in the ramp above it the pixel
			   is a blend of ink and field, so it keeps the ink's share. */
			data[i + 3] = d <= KEY_TOLERANCE ? 0 : Math.round(data[i + 3] * ((d - KEY_TOLERANCE) / KEY_TOLERANCE));
		}

		const x = p % w;
		const y = (p - x) / w;
		if (x > 0) stack.push(p - 1);
		if (x < w - 1) stack.push(p + 1);
		if (y > 0) stack.push(p - w);
		if (y < h - 1) stack.push(p + w);
	}

	return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
}

/**
 * Whether a mark is light artwork that needs a dark plate behind it.
 *
 * The band draws every logo on an off-white plate, which is right for the
 * fifteen that are dark ink on a light ground. Two are not: APAC DSM and
 * Dr Yolanda Cruz are delivered as near-white artwork on transparency, drawn
 * for a dark background — on a white plate they are invisible.
 *
 * Two measurements, and both are needed:
 *
 *   luma      mean luminance over pixels that are actually opaque. Transparent
 *             pixels have undefined colour and would drag any average toward
 *             whatever the encoder left in the RGB channels.
 *   coverage  what fraction of the box is opaque. A safety net rather than the
 *             main test now that `keyBackground` cuts the grounds out: an
 *             all-over-opaque mark is one the keyer could not read, and its
 *             light half is its own ground rather than its ink.
 */
async function needsDarkPlate(file) {
	const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

	let sum = 0;
	let opaquePixels = 0;
	for (let i = 0; i < data.length; i += 4) {
		if (data[i + 3] < 128) continue;
		sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
		opaquePixels++;
	}
	if (!opaquePixels) return false;

	const luma = sum / opaquePixels / 255;
	const coverage = opaquePixels / (info.width * info.height);
	return luma > 0.72 && coverage < 0.6;
}

await mkdir(OUT, { recursive: true });

const roster = await rosterSlugs();

const files = (await readdir(IN, { withFileTypes: true }))
	.filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
	.map((entry) => entry.name);

/** Masters that arrived with a baked-in ground, which `keyBackground` removed. */
const keyedOut = [];
const skipped = [];
const tone = {};

for (const file of files) {
	const name = slug(file);

	if (!roster.has(name)) {
		skipped.push(`${file} → ${name}`);
		continue;
	}

	const out = `${OUT}/${name}.png`;

	/*
		Trim, then key, then resize — and the order is load-bearing.

		Trim first so the keyer's ring is sampled against the artwork's own edge
		rather than against whatever margin the export left. Key at full
		resolution, because a flood fill on a 112px-tall thumbnail has no
		intermediate pixels to ramp and cuts a hard stair. Resize last, so the
		antialiasing on the new edge comes from the downscale.
	*/
	const trimmed = await sharp(path.join(IN, file))
		.ensureAlpha()
		.trim({ threshold: TRIM_THRESHOLD })
		.png()
		.toBuffer();

	const keyed = await keyBackground(trimmed);
	if (keyed !== trimmed) keyedOut.push(name);

	const info = await sharp(keyed)
		.resize({ height: HEIGHT, fit: 'inside', withoutEnlargement: true })
		/*
			Truecolour, not palette-quantised.

			The previous set was flat wordmarks — a handful of inks on one field —
			where 256 colours were lossless to the eye. These carry gradients, soft
			shadows and antialiased edges against transparency, and quantising those
			bands the gradients and speckles the edges. They are a few KiB each
			either way at this size.
		*/
		.png({ compressionLevel: 9, effort: 10 })
		.toFile(out);

	/* Measured off the OUTPUT, after keying and resizing: what matters is the
	   mark as the band will actually draw it. */
	if (await needsDarkPlate(out)) tone[name] = 'light';

	console.log(
		`  ${(info.width + 'x' + info.height).padEnd(9)} ${String(Math.round(info.size / 1024)).padStart(3)} KiB  ${name}.png` +
			`${keyed !== trimmed ? '   ✂ keyed' : ''}${tone[name] ? '   ◐ dark plate' : ''}`,
	);
}

await writeFile(TONE_OUT, `${JSON.stringify(tone, null, '\t')}\n`, 'utf8');

console.log(`\n${files.length - skipped.length} marks written to ${OUT}/`);
console.log(`Tone map (${Object.keys(tone).length} needing a dark plate) → ${TONE_OUT}`);

if (skipped.length) {
	console.log(
		`\n${skipped.length} master(s) skipped — not in ${ROSTER}:\n   ${skipped.join('\n   ')}\n` +
			`   Add a line to the roster to include one; the slug is what is shown after the arrow.`,
	);
}

if (keyedOut.length) {
	console.log(
		`\n✂  ${keyedOut.length} master(s) arrived with a solid background and had it keyed out:\n   ${keyedOut.join(', ')}\n` +
			`   The flood fill is safe but it is still a guess at where the field ends.\n` +
			`   Check these on the band before shipping, and ask for them re-cut with\n   transparency so the guess is not needed.`,
	);
}

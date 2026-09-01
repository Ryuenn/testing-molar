/**
 * Turns the delivered client logos into marks the trust band can wear.
 *
 *   node scripts/generate-client-logos.mjs
 *
 * Masters: `public/ClientsLogos/*.png` — as supplied by the practices. They are
 * screenshots rather than brand assets: ~2400px squares, several megabytes each,
 * the artwork floating in a wide white margin, and no alpha channel.
 *
 * The band renders every mark as one flat bone silhouette, which it used to do
 * with `filter: brightness(0) invert(1)`. That filter cannot work on these — a
 * logo on an opaque white field inverts to a solid white BLOCK, not a
 * silhouette. The shape has to be carried by the alpha channel instead, so this
 * builds it:
 *
 *   trim       drop the white margin, so a 36px-tall mark spends its pixels on
 *              the artwork rather than on the padding around it
 *   greyscale  colour is irrelevant to a silhouette and only complicates the
 *              next step
 *   negate     dark-artwork-on-white becomes light-artwork-on-black, which IS
 *              the coverage map — bright where the logo is, black where it is not
 *   as alpha   joined onto a solid white plane, giving white artwork on
 *              transparent: exactly what the band wants, and no CSS filter
 *
 * Output lands in `src/assets/clients/` — inside src/, because the band renders
 * them through Astro's <Image>, which needs the source there to emit a
 * responsive WebP. Filenames are slugged so the glob in TrustBand can key on
 * them.
 *
 * Anything that arrives as a real asset — light artwork on transparent, or an
 * SVG — should NOT go through this. Drop it straight into src/assets/clients/;
 * `negate` would turn it inside out.
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const IN = 'public/ClientsLogos';
const OUT = 'src/assets/clients';

/** Twice the 36px the band draws them at, for 2× displays. */
const HEIGHT = 72;

/**
 * How near white counts as background for the trim.
 *
 * These are screenshots, so the margin is never a clean #fff — it carries JPEG
 * noise and the odd gradient. Too low and nothing trims; too high and it eats
 * into light artwork.
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

await mkdir(OUT, { recursive: true });

const files = (await readdir(IN)).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
	const name = slug(file);

	/*
		Resolved to pixels before the alpha is built, because the ramp has to match
		the trimmed and resized dimensions exactly — and `metadata()` on a pending
		pipeline still reports the master's.
	*/
	const { data, info } = await sharp(path.join(IN, file))
		.flatten({ background: '#ffffff' })
		.trim({ threshold: TRIM_THRESHOLD })
		.resize({ height: HEIGHT, fit: 'inside', withoutEnlargement: true })
		.raw()
		.toBuffer({ resolveWithObject: true });

	const { width, height, channels } = info;

	const grey = sharp(data, { raw: { width, height, channels } }).greyscale();

	/*
		Polarity, per logo. Most arrive dark-on-white, where the coverage map is the
		NEGATIVE of the luminance. A few arrive light-on-dark — PURE Dental is one —
		and negating those turns the mark inside out: a white box with the wordmark
		punched out of it.

		The mean tells them apart. A light field means dark artwork and wants the
		negative; a dark field means light artwork and the luminance already IS the
		coverage.
	*/
	const { channels: [luma] } = await grey.clone().stats();
	const darkOnLight = luma.mean > 128;

	const alpha = await grey
		.clone()
		[darkOnLight ? 'negate' : 'toColourspace']('b-w')
		/*
			Levels, and they are not cosmetic. Several of these sit on a pale tint
			rather than on white — Physimed's is a blue-grey gradient — which `trim`
			cannot see and which survives as a faintly opaque rectangle behind the
			mark. Crushing everything under about 12% to nothing removes the field
			and leaves the artwork, and the gain puts back the contrast that costs.
		*/
		.linear(1.35, -34)
		.toColourspace('b-w')
		.raw()
		.toBuffer();

	const { size } = await sharp({
		create: { width, height, channels: 3, background: '#ffffff' },
	})
		.joinChannel(alpha, { raw: { width, height, channels: 1 } })
		.png({ compressionLevel: 9 })
		.toFile(`${OUT}/${name}.png`);

	console.log(`  ${(width + 'x' + height).padEnd(9)} ${String(Math.round(size / 1024)).padStart(3)} KiB  ${name}.png`);
}

console.log(`\n${files.length} marks written to ${OUT}/`);

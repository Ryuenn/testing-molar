/**
 * Generates every brand derivative from one master file.
 *
 *   node scripts/generate-icons.mjs
 *
 * Master: `src/assets/brand/logo-molar.png` — the crystalline tooth on
 * transparency. Replace that file and re-run; nothing else needs editing.
 *
 * Uses the `sharp` that Astro already depends on, so there is no extra
 * devDependency for a script that runs a handful of times a year.
 */
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

const MASTER = 'src/assets/brand/logo-molar.png';
const PUBLIC = 'public';

/** Page ground. Icons that cannot be transparent sit on this. */
const INK = { r: 4, g: 7, b: 14, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

await mkdir(`${PUBLIC}/images`, { recursive: true });

/**
 * The master carries ~8% empty margin. Trimming it first means every derivative
 * is framed from the artwork itself rather than from whatever padding the export
 * happened to include — otherwise a 32px favicon spends four of its pixels on
 * nothing.
 */
const artwork = await sharp(MASTER).trim({ threshold: 10 }).toBuffer();

/**
 * @param {object} opts
 * @param {number} opts.size      Output square, in px.
 * @param {string} opts.out       Path under public/.
 * @param {object} opts.bg        Background fill.
 * @param {number} [opts.padding] Fraction of the canvas left as breathing room.
 */
async function icon({ size, out, bg, padding = 0.08 }) {
	const inner = Math.round(size * (1 - padding * 2));

	let pipeline = sharp(artwork).resize(inner, inner, {
		fit: 'contain',
		background: TRANSPARENT,
		// Lanczos softens edges; at tab sizes the tooth silhouette IS the icon and
		// it needs to survive the downscale.
		kernel: 'lanczos3',
	});

	// Below ~64px the roots start blurring into one another and the circuit trace
	// disappears. A little sharpening and saturation buys back the silhouette.
	if (size <= 64) {
		pipeline = pipeline
			.sharpen({ sigma: 0.6, m1: 1, m2: 2 })
			.modulate({ saturation: 1.15 });
	}

	const scaled = await pipeline.toBuffer();

	await sharp({
		create: { width: size, height: size, channels: 4, background: bg },
	})
		.composite([{ input: scaled, gravity: 'center' }])
		/*
			Palette-quantised. The mark is a narrow blue ramp over black, so 256
			colours hold it without visible banding, and it takes the 512px icon from
			roughly 330 KiB to under 100. These are manifest and structured-data
			assets — nothing on the page renders them, so they should not cost the
			deploy a third of a megabyte each.
		*/
		.png({ compressionLevel: 9, effort: 10, palette: true, quality: 92, dither: 1 })
		.toFile(`${PUBLIC}/${out}`);

	const { size: bytes } = await stat(`${PUBLIC}/${out}`);
	console.log(`  ${String(size).padStart(4)}px  ${out.padEnd(34)} ${String(Math.round(bytes / 1024)).padStart(4)} KiB`);
}

/*
	The trimmed mark, written back into src/assets for in-page use. Nav and footer
	render it through Astro's <Image>, which needs the source inside src/ to emit
	a responsive WebP — and it needs the margin already gone, or the lockup ends up
	with invisible padding that no amount of CSS can see.
*/
await mkdir('src/assets/brand', { recursive: true });
await sharp(artwork).png({ compressionLevel: 9, effort: 10 }).toFile('src/assets/brand/logo-mark.png');
const mark = await stat('src/assets/brand/logo-mark.png');
console.log(`In-page mark:\n  src/assets/brand/logo-mark.png${' '.repeat(12)} ${String(Math.round(mark.size / 1024)).padStart(4)} KiB\n`);

console.log('Brand derivatives:');

// Organization structured data + webmanifest. Transparent, so it composites on
// whatever ground a consumer puts behind it.
await icon({ size: 512, out: 'images/logo-molar.png', bg: TRANSPARENT, padding: 0.04 });

// Maskable manifest icon: safe-zone padding, opaque, because a maskable icon is
// cropped to whatever shape the launcher wants.
await icon({ size: 512, out: 'images/logo-molar-maskable.png', bg: INK, padding: 0.16 });

// iOS home screen. Never transparent — iOS composites it on black.
await icon({ size: 180, out: 'apple-touch-icon.png', bg: INK, padding: 0.1 });

// Browser tabs. Small sizes get less padding so the mark stays legible.
await icon({ size: 16, out: 'favicon-16.png', bg: TRANSPARENT, padding: 0.02 });
await icon({ size: 32, out: 'favicon-32.png', bg: TRANSPARENT, padding: 0.02 });
await icon({ size: 48, out: 'favicon-48.png', bg: TRANSPARENT, padding: 0.03 });
await icon({ size: 96, out: 'favicon-96.png', bg: TRANSPARENT, padding: 0.04 });
await icon({ size: 192, out: 'images/logo-molar-192.png', bg: TRANSPARENT, padding: 0.04 });

console.log('\nDone. favicon.ico is assembled separately — see scripts/build-ico.mjs');

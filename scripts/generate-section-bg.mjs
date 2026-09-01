/**
 * Bakes the plans-section ground from its master.
 *
 *   node scripts/generate-section-bg.mjs
 *
 * Master: `public/images/section_bg.png` — hex lattice with a blue bloom along
 * the top and bottom edges. Delivered art, and near-black: it measures a mean
 * of roughly RGB (5,16,40), all but the same value as the page ground it sits
 * on, so it has to be lifted before it renders as anything at all.
 *
 * That lift used to be `filter: brightness(3.4)` on a full-width layer, and the
 * feather that keeps its edges off a hard line used to be a `mask-image` on the
 * same layer. Both are baked in here instead:
 *
 *   linear(3.4, 0)   the same per-channel multiply CSS `brightness()` does
 *   saturation       matches the old `saturate(1.15)`
 *   alpha ramp       transparent → opaque over the first and last 5%, so the
 *                    band feathers into the page's own wash rather than ending
 *                    on a seam. Shallow on purpose: the blooms sit ON the top
 *                    and bottom edges, and a deep fade erases the part of the
 *                    picture worth showing
 *
 * What that buys, beyond the CSS being one `background` line: the section stops
 * carrying a filtered, masked compositing layer, and the download drops from a
 * 1.1MB PNG to a WebP a tenth of that.
 *
 * Uses the `sharp` that Astro already depends on, same as the icon scripts.
 */
import sharp from 'sharp';

const MASTER = process.env.SECTION_BG_MASTER || 'public/images/section_bg.png';
const OUT = 'public/images/section-bg.webp';

/** Wide enough for a 1440pt band on a 2× display, once it is stretched. */
const WIDTH = 1600;

/** The lift. Tuned by eye against the cards that sit on top: enough to read the
 * lattice and both blooms, not so much that the field competes with them. */
const BRIGHTNESS = 1.5;
const SATURATION = 1;

/*
	The fade to transparent, top and bottom.

	Only the bottom one now. The top of this band sits under the nav and is meant
	to read as the section starting at full strength — a fade there just puts a
	dark stripe across the heading, which is exactly the thing that made the
	picture look like it began at the cards. The bottom still feathers, because
	that edge runs into whatever section follows and the still's lower bloom is
	bright enough to draw a line if it stops dead.
*/
const FEATHER_TOP = 0;
const FEATHER_BOTTOM = 0.05;

/*
	Resolved to pixels first, rather than piped straight into the join below:
	`metadata()` on a pending pipeline reports the master's dimensions, not the
	resized ones, and the alpha ramp has to match what it is joined to exactly.
*/
const { data: lit, info } = await sharp(MASTER)
	.resize({ width: WIDTH, withoutEnlargement: true })
	.removeAlpha()
	.linear(BRIGHTNESS, 0)
	.modulate({ saturation: SATURATION })
	.raw()
	.toBuffer({ resolveWithObject: true });

const { width, height } = info;

/**
 * The alpha channel, as a vertical ramp. Rendered from SVG and flattened to one
 * greyscale plane so it can be joined onto the RGB above as its alpha.
 */
const ramp = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
		<defs>
			<linearGradient id="feather" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0" stop-color="${FEATHER_TOP ? '#000' : '#fff'}"/>
				<stop offset="${FEATHER_TOP}" stop-color="#fff"/>
				<stop offset="${1 - FEATHER_BOTTOM}" stop-color="#fff"/>
				<stop offset="1" stop-color="${FEATHER_BOTTOM ? '#000' : '#fff'}"/>
			</linearGradient>
		</defs>
		<rect width="100%" height="100%" fill="url(#feather)"/>
	</svg>`,
);

const alpha = await sharp(ramp).greyscale().toColourspace('b-w').raw().toBuffer();

const { size } = await sharp(lit, { raw: { width, height, channels: info.channels } })
	.joinChannel(alpha, { raw: { width, height, channels: 1 } })
	.webp({ quality: 82, effort: 6 })
	.toFile(OUT);

console.log(`${OUT}  ${width}×${height}  ${(size / 1024).toFixed(0)}KB`);

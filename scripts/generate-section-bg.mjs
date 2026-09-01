/**
 * Bakes the plans-section ground from its master.
 *
 *   node scripts/generate-section-bg.mjs
 *
 * Master: `public/images/section_bg_2.png` — a lit floor running back to a
 * horizon, hexagon walls either side. Delivered art, and near-black: it measures
 * a mean of roughly RGB (2,13,34), all but the same value as the page ground it
 * sits on, so it has to be lifted before it renders as anything at all.
 *
 * That lift used to be a `filter` on a full-width layer, and the feather that
 * keeps its edges off a hard line used to be a `mask-image` on the same layer.
 * Both are baked in here instead:
 *
 *   linear(b, 0)     the same per-channel multiply CSS `brightness()` does
 *   saturation       the companion to CSS `saturate()`
 *   alpha ramp       opaque to transparent over the last few percent, so the
 *                    band runs out into the section below rather than ending on
 *                    a seam. Bottom only — see FEATHER_TOP
 *
 * What that buys, beyond the CSS being one `background` line: the section stops
 * carrying a filtered, masked compositing layer, and the download drops from a
 * 1.4MB PNG to a WebP a fraction of that.
 *
 * The output keeps the name `section-bg.webp` whichever master it is built from,
 * so swapping the art is this one constant and no CSS at all.
 *
 * Uses the `sharp` that Astro already depends on, same as the icon scripts.
 */
import sharp from 'sharp';

const MASTER = process.env.SECTION_BG_MASTER || 'public/images/section_bg_2_new.png';
const OUT = 'public/images/section-bg.png';

/**
 * A ceiling, not a target — `withoutEnlargement` means a smaller master comes
 * through at its own size rather than being blown up to meet this.
 *
 * It used to be 1600, which threw away pixels the master had: `section_bg_2.png`
 * is 1734 wide, and this band is full-bleed, so every one of them is wanted.
 * Upscaling past the master is pointless, but downscaling below it is a straight
 * loss.
 */
const WIDTH = 3200;

/** The lift. Tuned by eye against the cards that sit on top: enough to read the
 * lattice and both blooms, not so much that the field competes with them. */
const BRIGHTNESS = 1.7;
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
	/*
		PNG, by preference — the same format the master arrives in, and lossless, so
		nothing the encoder does can be blamed for how the band looks.

		It costs weight: a lossy WebP of the same frame is a fraction of the size at
		a measured 0.6% mean difference. If this file ever needs to come down, that
		is the lever — `.webp({ quality: 95 })` here and the four `background`
		rules that name it.

		`palette: false` on purpose. A palette would quantise to 256 colours, and
		this is a smooth blue gradient across its whole width; that is the one kind
		of image quantisation visibly bands.
	*/
	.png({ compressionLevel: 9, palette: false })
	.toFile(OUT);

console.log(`${OUT}  ${width}×${height}  ${(size / 1024).toFixed(0)}KB`);

/**
 * Cuts the showcase grid's artwork from work MOLAR actually delivered.
 *
 *   node scripts/generate-showcase.mjs
 *
 * The section shows seven kinds of thing MOLAR makes. It used to say what each
 * one was in a sentence; it shows one now, which needs a picture per category —
 * and the rule for this site is that a picture of the work has to BE the work.
 * Nothing here is stock or a mockup.
 *
 * Two sources, chosen per category rather than uniformly:
 *
 *   frames   `public/videos/MolarExampleVideos/*.mp4`, for the categories that
 *            ARE video — reels, animations, explainers, education. Pulled at a
 *            timestamp chosen per clip, because the first second of most of them
 *            is a title card rather than the thing being described.
 *
 *   grids    `src/assets/work/*.png`, the nine-post feed grids, for the
 *            categories that are stills — carousels, graphics, branding. Cropped
 *            to the region of the grid that shows that kind of post rather than
 *            scaled whole, so a "carousels" tile is carousels and not a thumbnail
 *            of a whole profile.
 *
 * Output is WebP in `src/assets/showcase/`, one per category at the shape of the
 * cell it fills, rendered through Astro's <Image> — which is why it lands inside
 * src/ rather than public/.
 *
 * ⚠️ The three grid-sourced tiles are the weakest part of this. A crop of a feed
 * is a fair likeness of a carousel and a poor one of practice branding, which is
 * a palette and a type system rather than a post. If real artwork for those three
 * ever arrives, drop it in `src/assets/showcase/` under the same name and delete
 * the entry here.
 */
import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { promisify } from 'node:util';

const run = promisify(execFile);

const CLIPS = 'public/videos/MolarExampleVideos';
const GRIDS = 'src/assets/work';
const OUT = 'src/assets/showcase';
const TMP = 'node_modules/.cache/showcase';

/**
 * One shape per cell, because the bento does not use one.
 *
 * Cutting everything to 16:9 and letting the CSS crop it was the
 * previous approach and it threw the work away: these clips are 1080x1920, so a
 * 16:9 crop of one keeps about a third of the frame — and then the tall Reels
 * cell cropped that again. Each still is now cut to the shape of the cell it
 * lands in, so the crop happens once, here, where it can be aimed.
 *
 * Sized for a 2× display at the width each cell actually occupies.
 */
const SHAPES = {
	/* Two rows tall, one column wide — and the clips are already this shape. */
	tall: { width: 720, height: 1280 },
	/* Two columns wide, one row tall. */
	wide: { width: 1400, height: 700 },
	/* The rest. */
	square: { width: 800, height: 800 },
};

/**
 * `at` is seconds into the clip. Picked per file: most open on a title card, and
 * a tile showing three words of caption over black is not a picture of the work.
 */
const FROM_VIDEO = [
	{ name: 'reels', file: 'veneers_commercial.mp4', at: 3, shape: 'tall' },
	{ name: 'animations', file: 'implant whats happening inside your jaw master.mp4', at: 5, shape: 'square' },
	{ name: 'explainers', file: 'what are lingual braces master.mp4', at: 4, shape: 'square' },
	{ name: 'education', file: 'baby_teeth_de.mp4', at: 3, shape: 'square' },
];

/**
 * `crop` is a fraction of the grid: [left, top, width, height]. The grids are
 * 3×3, so a third is one post and two thirds is a 2×2 block.
 */
const FROM_GRID = [
	{ name: 'carousels', file: 'physimed-dentaire.png', crop: [0, 0, 1, 0.36], shape: 'wide' },
	{ name: 'graphics', file: 'zahnzauber-zahnspangen.png', crop: [0, 0.33, 0.67, 0.34], shape: 'square' },
	{ name: 'branding', file: 'gmu-dental.png', crop: [0.33, 0.6, 0.67, 0.34], shape: 'square' },
];

await mkdir(OUT, { recursive: true });
await mkdir(TMP, { recursive: true });

/** Fills the cell's box and crops the overflow. */
const finish = (pipeline, name, shape) =>
	pipeline
		.resize(SHAPES[shape].width, SHAPES[shape].height, { fit: 'cover', position: 'attention' })
		.webp({ quality: 82, effort: 6 })
		.toFile(`${OUT}/${name}.webp`);

for (const { name, file, at, shape } of FROM_VIDEO) {
	const still = `${TMP}/${name}.png`;
	await run('ffmpeg', ['-y', '-v', 'error', '-ss', String(at), '-i', `${CLIPS}/${file}`, '-frames:v', '1', still]);
	const { size } = await finish(sharp(still), name, shape);
	console.log(`  ${name.padEnd(12)} ${String(Math.round(size / 1024)).padStart(3)} KiB  ← ${file}`);
}

for (const { name, file, crop, shape } of FROM_GRID) {
	const src = sharp(`${GRIDS}/${file}`);
	const { width, height } = await src.metadata();
	const [l, t, w, h] = crop;
	const { size } = await finish(
		sharp(`${GRIDS}/${file}`).extract({
			left: Math.round(width * l),
			top: Math.round(height * t),
			width: Math.round(width * w),
			height: Math.round(height * h),
		}),
		name,
		shape,
	);
	console.log(`  ${name.padEnd(12)} ${String(Math.round(size / 1024)).padStart(3)} KiB  ← ${file}`);
}

await rm(TMP, { recursive: true, force: true });
console.log(`\n${FROM_VIDEO.length + FROM_GRID.length} tiles written to ${OUT}/`);

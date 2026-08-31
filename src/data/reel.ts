/**
 * The example-reel clips, read from public/ at build time.
 *
 * The folder is the source of truth. Drop an `.mp4` into
 * `public/videos/MolarExampleVideos/` and it joins the reel on the next build;
 * delete one and it leaves. There is no list here to keep in sync, which is the
 * point — several of the filenames carry spaces and a hand-maintained list of
 * them is a 404 waiting to happen.
 *
 * The reel renders every clip in one portrait card and covers it, rather than
 * measuring each file and giving it a card its own shape. That is a deliberate
 * choice and not just the simpler one: `ai_animation_new.mp4` is a 9:16 clip
 * exported inside a 720x408 landscape frame, so 69% of every frame it holds is
 * pillarbox. Sizing cards from the file would hand that export a card nearly
 * three times the width of its neighbours, two thirds of it black. A fixed
 * portrait card centre-crops it straight back to its picture.
 *
 * All of this runs in Node during `astro build`. Only the returned array ships.
 */

import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Resolved against this module, not the cwd, so the build is location-proof. */
const DIR = fileURLToPath(new URL('../../public/videos/MolarExampleVideos/', import.meta.url));

/** What the browser asks for. Must mirror the path above. */
const HREF = '/videos/MolarExampleVideos/';

/**
 * Every clip in the folder, alphabetical so the strip is identical on every
 * build. Root-relative and percent-encoded — several filenames contain spaces.
 */
export function reelClips(): string[] {
	return readdirSync(DIR)
		.filter((name) => name.toLowerCase().endsWith('.mp4'))
		.sort((a, b) => a.localeCompare(b))
		.map((name) => HREF + encodeURIComponent(name));
}

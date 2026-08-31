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
 * What each clip actually did, keyed by filename.
 *
 * Keyed rather than positional on purpose. These are real performance numbers
 * attached to real videos, and an ordered list silently re-assigns every one of
 * them the moment a file is added, renamed or removed from the folder — which
 * is a thing this module is built to let you do. A filename that no longer
 * exists simply drops out; a clip with no entry renders without a badge.
 *
 * ⚠️ The numbers below came from an unordered list (`VIEW_COUNTS` in
 * ~/data/proof) with no mapping to filenames anywhere in the repo. They are
 * assigned here in the folder's own alphabetical order, which is a guess.
 * Check every line before this page is public: a view count on the wrong video
 * is a false claim about that video, not a cosmetic bug.
 */
const VIEWS: Record<string, string> = {
	'ai_animation_new.mp4': '182K',
	'baby_teeth_de.mp4': '98K',
	'does-enamel-grow-back-after-ipr-master_6qzw8ujs.mp4': '2.6M',
	'implant whats happening inside your jaw master.mp4': '74K',
	'invisalign - first day hebrew master.mp4': '200K',
	'invisalign- your first day wearing your retainer.mp4': '89K',
	'veneer_fake.mp4': '127K',
	/* veneers_commercial.mp4 and what are lingual braces master.mp4 have no
	   number yet — there were seven counts for nine clips. They render with no
	   badge, which is the correct thing for an unknown rather than a zero. */
};

export interface ReelClip {
	/** Root-relative and percent-encoded — several filenames contain spaces. */
	src: string;
	/** Unencoded, for keying and for debugging a missing badge. */
	file: string;
	/** Absent where the number is not known. */
	views?: string;
}

/**
 * Every clip in the folder, alphabetical so the strip is identical on every
 * build.
 */
export function reelClips(): ReelClip[] {
	return readdirSync(DIR)
		.filter((name) => name.toLowerCase().endsWith('.mp4'))
		.sort((a, b) => a.localeCompare(b))
		.map((file) => ({
			src: HREF + encodeURIComponent(file),
			file,
			views: VIEWS[file],
		}));
}

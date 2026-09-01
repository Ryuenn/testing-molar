/**
 * MOLAR TV — the waiting-room channel (strategy §11).
 *
 * A section of its own rather than a bullet under the library, which is the
 * whole point the strategy makes about it: a screen already on the wall,
 * already switched on, currently playing daytime television.
 *
 * No price. The offer is quoted rather than bought and there is no checkout
 * for it, so the page asks for a conversation instead — see `CTA.sales` in
 * `~/data/site`. Putting a number here that nobody can pay would be the one
 * unrecoverable mistake on this page.
 *
 * Copy lives in `~/i18n/ui` under `tv.*`.
 */
import type { GlyphName } from './glyphs';

/** What plays on the loop. Suffixes into `tv.play*`. */
export const TV_PLAYLIST = ['education', 'tips', 'practice', 'branded', 'animation'] as const;

export interface TvFeature {
	/** Suffix into `tv.feat*`. */
	key: 'logo' | 'colors' | 'branding' | 'content' | 'loops' | 'playback';
	icon: GlyphName;
}

/**
 * The six the strategy lists, in its order. The first three are the practice's
 * own brand and the last three are what MOLAR brings — which is the argument,
 * so the order is not decoration.
 */
export const TV_FEATURES: readonly TvFeature[] = [
	{ key: 'logo', icon: 'tooth' },
	{ key: 'colors', icon: 'palette' },
	{ key: 'branding', icon: 'layers' },
	{ key: 'content', icon: 'book' },
	{ key: 'loops', icon: 'film' },
	{ key: 'playback', icon: 'monitor' },
] as const;

/**
 * What plays on the screen in the visual. Muted and looping, because a
 * waiting-room TV is muted and looping.
 *
 * One file, and it is cut for this — landscape, which is the shape of the frame
 * it plays in. It replaced three clips from `public/videos/library/`, and those
 * were wrong twice over: 67MB between them, and vertical reels cut for Instagram
 * being cropped by `object-fit: cover` into a 16:9 slot, so you saw a narrow
 * horizontal band of each one.
 *
 * Still an array. The markup renders one `<source>` per entry, which is a
 * fallback chain rather than a playlist — the browser takes the first it can
 * play and never reaches the rest — so a second entry here would be a format
 * alternative (a WebM beside the MP4), never a second clip. A real rotation
 * needs a script advancing on `ended`.
 */
export const TV_LOOP = ['/videos/watch_tv_molar.mp4'] as const;

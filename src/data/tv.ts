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
 * The clips shown playing on the screen in the visual.
 *
 * Real files from `public/videos/library/`, muted and looping, because a
 * waiting-room TV is muted and looping. Three is enough to read as a channel
 * and few enough to stay under a megabyte on the wire.
 */
export const TV_LOOP = [
	'/videos/library/prophylaxis.mp4',
	'/videos/library/tooth-flossing.mp4',
	'/videos/library/why-an-athlete.mp4',
] as const;

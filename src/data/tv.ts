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

/**
 * What is on the channel.
 *
 * Six entries, each with its own glyph. They used to share one animated bars
 * mark, which made the column read as six instances of the same thing rather
 * than as six things — and what is on it is the argument.
 *
 * The list is written from the practice's side of the table: "Your treatments",
 * not "Case videos". Every one of these is something they recognise as theirs,
 * which is the difference between a channel and a screensaver.
 *
 * `key` suffixes into `tv.play*` for the label.
 */
export const TV_PLAYLIST = [
	{ key: 'treatments', icon: 'tooth' },
	{ key: 'doctors', icon: 'people' },
	{ key: 'education', icon: 'book' },
	{ key: 'branding', icon: 'palette' },
	{ key: 'videos', icon: 'film' },
	{ key: 'qr', icon: 'share' },
] as const satisfies readonly { key: string; icon: GlyphName }[];

export interface TvFeature {
	/** Suffix into `tv.feat*`. */
	key: 'brand' | 'treatments' | 'doctors' | 'channel';
	icon: GlyphName;
}

/**
 * Four tiles, and every one of them starts with "Your".
 *
 * It was six: logo, colours, branding, MOLAR educational content, custom loops,
 * waiting-room playback. The first three were one claim written out three
 * times, and the last three described the mechanism — what MOLAR does — on a
 * row whose whole job is to say what the practice ends up owning.
 *
 * Each of these carries a line under it. The six did not; their `featSub`
 * strings existed in the dictionary and nothing rendered them, which made a
 * row of bare nouns. Four tiles leave room for the sentence that makes each
 * one mean something.
 */
export const TV_FEATURES: readonly TvFeature[] = [
	{ key: 'brand', icon: 'palette' },
	{ key: 'treatments', icon: 'tooth' },
	{ key: 'doctors', icon: 'people' },
	{ key: 'channel', icon: 'monitor' },
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

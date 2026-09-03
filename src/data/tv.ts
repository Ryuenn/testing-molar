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
 * `Drpatricia_updated_video-web.mp4` — the delivered file with its index moved,
 * NOT a re-encode. The delivery is 1920x1080 at 4.7 Mbps and its `moov` atom sat
 * at the tail, 4.8MB into a 4.8MB file, so a browser had to range-request the
 * end before it could paint a single frame. That is what a black panel on load
 * looks like.
 *
 * The remux is a stream copy — every video byte is identical to the master, the
 * file is the same size to the byte, and only the atom order changed:
 *
 *   ffmpeg -i Drpatricia_updated_video.mp4 -c copy  *     -movflags +faststart Drpatricia_updated_video-web.mp4
 *
 * ⚠️ Run that on ANY replacement before pointing this at it, and check with
 * `moov` before `mdat` in the first few kilobytes. Two of the three clips
 * delivered for this site have arrived mastered for editing, with the index at
 * the end; it costs nothing to fix and it is invisible until someone loads the
 * page on a real connection.
 *
 * No quality pass beyond that. An earlier cut of this section re-encoded at
 * CRF 23 to save weight; it was indistinguishable at the size this panel renders
 * but it is not what was asked for, and 4.8MB is a reasonable price for the
 * master's own picture.
 *
 * Still an array. The markup renders one `<source>` per entry, which is a
 * fallback chain rather than a playlist — the browser takes the first it can
 * play and never reaches the rest — so a second entry here would be a format
 * alternative (a WebM beside the MP4), never a second clip. A real rotation
 * needs a script advancing on `ended`.
 */
export const TV_LOOP = ['/videos/Drpatricia_updated_video-web.mp4'] as const;

/**
 * The still behind the loop — frame 0 of `TV_LOOP[0]`, at 1280x720.
 *
 * Required, not decoration. A <video> with no poster paints its own background
 * until enough of the file has arrived to decode a frame, and that is long
 * enough to be seen: the panel showed as a black rectangle on load, which is
 * exactly what it looks like when the screen is broken.
 *
 * Re-cut it whenever `TV_LOOP` changes, or the panel shows one clip's first
 * frame and then jumps to another's:
 *
 *   ffmpeg -ss 0 -i <clip>.mp4 -frames:v 1 -vf scale=1280:720 tv-poster.png
 *   ffmpeg -i tv-poster.png -c:v libwebp -quality 78 tv-poster.webp
 */
export const TV_POSTER = '/images/tv-poster.webp';

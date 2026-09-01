/**
 * The content showcase (strategy §5): "do not over-explain MOLAR — show it."
 *
 * The showing is done by two things that already exist and are already real:
 * the reel strip under the hero (`~/components/sections/VideoReel`, nine actual
 * delivered clips) and the feed grids on /our-work/ (nine consecutive posts
 * from seven live accounts). This file is only the index over them — the seven
 * kinds of thing MOLAR makes, each pointing at the place on the site where real
 * examples of it can be seen.
 *
 * Every `href` goes somewhere the visitor can watch or scroll the actual
 * output. A category that could only link back to a description of itself does
 * not belong in a gallery whose entire argument is "look".
 *
 * Copy is in `~/i18n/ui` under `showcase.*`, keyed off `key`.
 */
import type { GlyphName } from './glyphs';

export interface ShowcaseCategory {
	/** Prefix into `showcase.*`: `<key>Name`, `<key>Body`. */
	key: 'reels' | 'carousels' | 'animations' | 'graphics' | 'explainers' | 'branding' | 'education';
	icon: GlyphName;
	/** Root-relative. Localised at the point of use. */
	href: string;
}

export const SHOWCASE: readonly ShowcaseCategory[] = [
	{ key: 'reels', icon: 'film', href: '/resources/video-library/' },
	{ key: 'carousels', icon: 'docs', href: '/our-work/' },
	{ key: 'animations', icon: 'spark', href: '/resources/video-library/' },
	{ key: 'graphics', icon: 'palette', href: '/our-work/' },
	{ key: 'explainers', icon: 'tooth', href: '/resources/video-library/' },
	{ key: 'branding', icon: 'layers', href: '/our-work/' },
	{ key: 'education', icon: 'book', href: '/patient-education/' },
] as const;

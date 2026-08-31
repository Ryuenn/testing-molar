/**
 * The video library — the grid behind /resources/video-library/.
 *
 * This is the swap point, and the only one. Everything downstream (the cards,
 * the four filters, the modal) derives from the shape below, so pointing the
 * page at the live catalogue means replacing `LIBRARY_ITEMS` with a fetch and
 * changing nothing else.
 *
 * Videos only. The Canva carousels are deliberately not here: their links open
 * an editable template, which is a subscriber tool rather than something a
 * public page can show, and a catalogue that mixes "watch this" with "here is
 * your editor" is two products in one grid.
 *
 * Two sources, both local. `public/videos/library/` holds the masters pulled
 * from Drive and re-encoded for the web — H.264, CRF 23, capped at 1080x1920,
 * faststart so playback begins before the file finishes downloading.
 *
 * Two of the homepage reel's clips in `public/videos/MolarExampleVideos/` are
 * reused here, for the German and Hebrew entries the new set does not have.
 * The other seven are not: they were cut for the muted strip under the hero and
 * carry no audio track at all, and a silent card in a library whose whole
 * affordance is "Watch video" reads as broken rather than as quiet.
 *
 * The rest of the catalogue lives in whatever Softr reads from; see `code`.
 *
 * On fetching rather than committing: an Astro data module runs in Node during
 * `astro build`, so a `fetch` here pulls the catalogue at build time and ships
 * only the rendered HTML. Nothing is downloaded into the repo — no media, no
 * export, no credentials in the client bundle. That is the shape this file is
 * written to accept.
 */

/** Mirrors Softr's Type filter, minus the carousels — see the header. */
export const LIBRARY_TYPES = ['Reel'] as const;
export type LibraryType = (typeof LIBRARY_TYPES)[number];

/**
 * Topics, in the order the filter offers them. A closed list rather than
 * free text: the filter bar is generated from it, so a typo in an item would
 * otherwise silently mint a new topic nobody can find anything under.
 */
export const LIBRARY_TOPICS = [
	'Orthodontics',
	'Implants',
	'Restorative',
	'Cosmetic',
	'Preventive',
	'Practice',
] as const;
export type LibraryTopic = (typeof LIBRARY_TOPICS)[number];

export interface LibraryItem {
	/** Stable, used as the DOM id the modal is opened by. */
	id: string;
	title: string;
	type: LibraryType;
	topic: LibraryTopic;
	/** Spelled out, not a code — it is shown on the card as-is. */
	language: string;
	/**
	 * Softr's catalogue code (C327, R209). Optional and unset on everything
	 * below: nothing here has a code in that system yet, and inventing one
	 * would collide with a real entry the day the catalogues are joined.
	 */
	code?: string;
	/** Content-calendar month, e.g. "January". Absent here — see MONTHS below. */
	month?: string;
	/** Root-relative, percent-encoded — several filenames carry spaces. */
	video: string;
	/** The post's caption, as it would go out on the feed. */
	caption?: string;
	/**
	 * The spoken script, blank-line separated. Kept as one string rather than an
	 * array of paragraphs so it can be pasted straight out of Softr's Script
	 * field without being reshaped by hand — the modal splits it.
	 */
	script?: string;
}

const DIR = '/videos/MolarExampleVideos/';

/** Percent-encodes the filename only, the way `reelClips()` does. */
const clip = (file: string) => DIR + encodeURIComponent(file);

/** The re-encoded masters. Plain filenames, so no encoding needed. */
const HD = '/videos/library/';

export const LIBRARY_ITEMS: LibraryItem[] = [
	{
		id: 'new-tooth-today',
		title: 'Your new tooth could be ready today',
		type: 'Reel',
		topic: 'Restorative',
		language: 'English',
		video: HD + 'new-tooth-ready-today.mp4',
	},
	{
		id: 'saliva-diagnostics',
		title: 'Your saliva may reveal more than your blood',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'saliva-reveals-more.mp4',
	},
	{
		id: 'lingual-braces',
		title: 'What are lingual braces?',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		video: HD + 'lingual-braces.mp4',
	},
	{
		id: 'athlete-mouthguard',
		title: 'Why athletes need a mouthguard',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'why-an-athlete.mp4',
	},
	{
		id: 'prophylaxis',
		title: 'What a professional cleaning actually removes',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'prophylaxis.mp4',
	},
	{
		id: 'flossing',
		title: 'What flossing reaches that brushing misses',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'tooth-flossing.mp4',
	},
	{
		id: 'invisalign-first-day-he',
		title: 'Invisalign: your first day',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'Hebrew',
		video: clip('invisalign - first day hebrew master.mp4'),
	},
	{
		id: 'baby-teeth-de',
		title: 'Milchzähne: warum sie zählen',
		type: 'Reel',
		topic: 'Preventive',
		language: 'German',
		video: clip('baby_teeth_de.mp4'),
	},
];

/**
 * The values a facet actually has something under, in the catalogue's own
 * order. The filter bar is built from these rather than from the constants
 * above, so a facet nothing uses — Month, until the live catalogue lands —
 * renders no control at all instead of a row of dead chips.
 */
export type LibraryFacet = 'type' | 'topic' | 'language' | 'month';

export function facet(
	items: readonly LibraryItem[],
	key: LibraryFacet,
	order?: readonly string[],
): string[] {
	const present = new Set(
		items.map((item) => item[key]).filter((value): value is string => Boolean(value)),
	);
	if (order) return order.filter((value) => present.has(value));
	return [...present].sort((a, b) => a.localeCompare(b));
}

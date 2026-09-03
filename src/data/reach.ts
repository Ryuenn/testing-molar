/**
 * Real geographic coordinates, projected equirectangularly at build time by
 * `WorldMap.astro`. Cheap on weight: no tiles, no map library, no images —
 * a graticule and seven nodes rendered as inline SVG.
 */
export interface Region {
	name: string;
	/** Degrees north. */
	lat: number;
	/** Degrees east. */
	lon: number;
	/** Anchor for the label relative to the node. */
	align: 'start' | 'middle' | 'end';
	/** Vertical nudge for the label, in projected units. */
	dy?: number;
}

export const REGIONS: Region[] = [
	{ name: 'North America', lat: 44, lon: -100, align: 'middle', dy: -14 },
	{ name: 'South America', lat: -14, lon: -58, align: 'middle', dy: 22 },
	{ name: 'Europe', lat: 52, lon: 12, align: 'middle', dy: -14 },
	{ name: 'Africa', lat: 3, lon: 20, align: 'middle', dy: 22 },
	{ name: 'Asia', lat: 38, lon: 96, align: 'middle', dy: -14 },
	{ name: 'Australia', lat: -25, lon: 134, align: 'middle', dy: 22 },
];

/**
 * The headline, split at the colour change rather than written twice. The
 * second half carries the accent, the same way the hero's does.
 */
export const REACH_TITLE = [
	{ text: 'One platform.', accent: false },
	{ text: 'Six continents.', accent: true },
] as const;

/** The same line as one string, for anything that reads rather than looks. */
export const REACH_TITLE_TEXT = REACH_TITLE.map((part) => part.text).join(' ');

/** Trails the grid. The six are what is served today, not the ceiling. */
export const REACH_NOTE = 'and growing';

/**
 * `44°N 100°W` from the coordinates already on each region — the labels are the
 * real projection input, not decoration typed in beside it.
 */
export const formatCoords = ({ lat, lon }: Pick<Region, 'lat' | 'lon'>): string =>
	`${Math.abs(lat)}°${lat >= 0 ? 'N' : 'S'} ${Math.abs(lon)}°${lon >= 0 ? 'E' : 'W'}`;

/* ─────────────────────────────────────────────────────────────────────────────
   Countries and languages (strategy §7)

   The map above is drawn at continent resolution because that is the claim the
   site has always made. The strategy asks for the next level down — flags,
   countries, languages — and is explicit that only countries MOLAR actually
   serves may appear.

   So this list is EVIDENCED, not aspirational, and each entry names its
   evidence. Two sources, both already in the repo:

     · `~/data/work`   — a practice's own grid states its market. Only Physimed
                         (Montréal) does; the rest establish a language and no
                         place, and a language is not a country.
     · `~/data/results`— the inbound wall carries messages from practices who
                         named where they were writing from.

   Adding a country here means adding the evidence for it first. A flag on this
   rail is a claim that MOLAR serves that market, and it is exactly the kind of
   claim a prospective client checks.
   ──────────────────────────────────────────────────────────────────────────── */

export interface Country {
	/** ISO 3166-1 alpha-2, lowercased. Both the emoji and the file in
	    `public/flags/` are derived from it, so the two can never disagree. */
	code: string;
	/** English name. */
	name: string;
	/** German name — the site's other locale. */
	de: string;
}

/**
 * The eighteen markets MOLAR publishes in, read off the practice's own
 * customer roster (September 2026) rather than the earlier September 2025
 * list — the two do not fully overlap; nine of the eighteen changed. Order
 * follows the roster as given: the anchors (US, Canada, Germany, Israel,
 * Austria) carried over, and the rest is a wider spread than before —
 * Lebanon, India, Türkiye, Japan, Ghana, Panama and Singapore joined; several
 * Western European markets with no evidenced customer dropped off.
 *
 * Adding one means adding its flag at `public/flags/<code>.svg` from
 * HatScripts/circle-flags — the rail reads the file straight off the code.
 */
export const COUNTRIES: readonly Country[] = [
	{ code: 'pt', name: 'Portugal', de: 'Portugal' },
	{ code: 'de', name: 'Germany', de: 'Deutschland' },
	{ code: 'nl', name: 'Netherlands', de: 'Niederlande' },
	{ code: 'fr', name: 'France', de: 'Frankreich' },
	{ code: 'gr', name: 'Greece', de: 'Griechenland' },
	{ code: 'gb', name: 'United Kingdom', de: 'Vereinigtes Königreich' },
	{ code: 'lb', name: 'Lebanon', de: 'Libanon' },
	{ code: 'us', name: 'United States', de: 'Vereinigte Staaten' },
	{ code: 'in', name: 'India', de: 'Indien' },
	{ code: 'tr', name: 'Türkiye', de: 'Türkei' },
	{ code: 'ro', name: 'Romania', de: 'Rumänien' },
	{ code: 'jp', name: 'Japan', de: 'Japan' },
	{ code: 'ca', name: 'Canada', de: 'Kanada' },
	{ code: 'gh', name: 'Ghana', de: 'Ghana' },
	{ code: 'il', name: 'Israel', de: 'Israel' },
	{ code: 'pa', name: 'Panama', de: 'Panama' },
	{ code: 'at', name: 'Austria', de: 'Österreich' },
	{ code: 'sg', name: 'Singapore', de: 'Singapur' },
] as const;

/** The country's name in the locale being rendered. */
export const countryName = (country: Country, locale: string): string =>
	locale === 'de' ? country.de : country.name;

/**
 * Languages the work is published in, counted off the grids themselves rather
 * than typed out — `~/data/work` records the language of every account, and
 * each one is legible in its own screenshot.
 */
export const LANGUAGES_SERVED = ['English', 'German', 'Spanish', 'Hebrew'] as const;

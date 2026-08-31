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

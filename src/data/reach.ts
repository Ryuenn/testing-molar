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

export const REACH_HEADLINE = 'One platform, six continents.';
export const REACH_SUB =
	'North America, South America, Europe, Africa, Asia, Australia — and growing.';

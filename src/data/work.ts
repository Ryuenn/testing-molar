/**
 * The work: a sample of the accounts we run, one nine-post grid each.
 *
 * A SAMPLE, and the page says so. This list is a selection picked to show the
 * range, not a register of every account — so no copy anywhere renders its
 * length. `LANGUAGE_COUNT` below is the one derived figure, and it describes
 * what is on screen rather than what exists. Add entries freely; just never put
 * a count of them in front of a reader as though it were the total.
 *
 * Each entry pairs with an image of the same `slug` in `src/assets/work/`. The
 * images are feed grids — nine consecutive posts as they appeared on the
 * account — so the page is showing output, not mockups.
 *
 * What the page is actually arguing: every one of these came off the same
 * engine, and no two of them look like each other. Different palette, different
 * typography, different language, different specialty. That claim only lands if
 * the differences are named rather than left for the eye to infer, which is what
 * `palette`, `language` and `note` are for.
 *
 * Practice names, languages and specialties are read off the grids themselves —
 * the logos and set copy are legible in each. `palette` is hand-picked from the
 * same images: three swatches is enough to identify a brand world and few enough
 * to stay a detail rather than becoming a chart.
 */

export interface Swatch {
	hex: string;
	/** Announced instead of the hex, which no screen reader should have to spell. */
	name: string;
}

export interface WorkAccount {
	/** Also the image filename: `src/assets/work/<slug>.png`. */
	slug: string;
	practice: string;
	specialty: string;
	/** Market. Left undefined where the grid does not establish one. */
	place?: string;
	language: string;
	/** BCP 47 tag for `lang` on the language chip. */
	languageCode: string;
	/** One line on the look — what makes this grid unmistakably this practice. */
	note: string;
	palette: readonly Swatch[];
	/** Set where a full case study exists. Renders a link through to it. */
	caseStudy?: { href: string; label: string };
}

/*
	Order is a rhythm, not a ranking: the featured account first, then the rest
	arranged so no two neighbouring grids share a ground. Two warm grids side by
	side read as one long swatch and the "no two alike" claim goes quiet.
*/
export const WORK: readonly WorkAccount[] = [
	{
		slug: 'physimed-dentaire',
		practice: 'Physimed Dentaire',
		specialty: 'General and cosmetic dentistry',
		place: 'Montréal',
		language: 'English',
		languageCode: 'en',
		note: 'Powder blue against warm sand, set in a high-contrast serif. Quiet, clinical and unhurried — the grid a patient scrolls when they are deciding whether to book.',
		palette: [
			{ hex: '#A9C3DC', name: 'Powder blue' },
			{ hex: '#EDE3D6', name: 'Warm sand' },
			{ hex: '#2B4160', name: 'Deep navy' },
		],
		caseStudy: { href: '/results/', label: 'Read the case: 159 to 10.7K followers' },
	},

	{
		slug: 'zahnzauber-zahnspangen',
		practice: 'Zahnzauber Zahnspangen',
		specialty: 'Orthodontics',
		language: 'German',
		languageCode: 'de',
		note: 'Terracotta and sage over cream, with a soft-focus daylight look. Warm enough to read as a family practice, which is exactly who walks in.',
		palette: [
			{ hex: '#C97B5A', name: 'Terracotta' },
			{ hex: '#7D8B6A', name: 'Sage' },
			{ hex: '#F2E7DC', name: 'Cream' },
		],
	},
	{
		slug: 'gmu-dental',
		practice: 'gmü dental',
		specialty: 'General dentistry and implants',
		language: 'English',
		languageCode: 'en',
		note: 'Lilac acrylic and white marble, lit like product photography. The most minimal grid of the seven and the only one built around a still-life set.',
		palette: [
			{ hex: '#B9A8DC', name: 'Lilac' },
			{ hex: '#FBFAFD', name: 'Chalk white' },
			{ hex: '#4A6FA5', name: 'Ink blue' },
		],
	},
	{
		slug: 'champsaur-ortodoncia',
		practice: 'Dra. Desirée Champsaur',
		specialty: 'Orthodontics',
		language: 'Spanish',
		languageCode: 'es',
		note: 'Navy and cream with a gold italic doing the emphasis. The typographic system is the brand here — the same italic marks the key phrase in every headline.',
		palette: [
			{ hex: '#1E3050', name: 'Navy' },
			{ hex: '#F2EDE4', name: 'Cream' },
			{ hex: '#B99B6B', name: 'Old gold' },
		],
	},
	{
		slug: 'walnut-street-dental',
		practice: 'Walnut Street Dental',
		specialty: 'Sleep dentistry and airway',
		language: 'English',
		languageCode: 'en',
		note: 'Teal on oat, shot almost entirely in bedrooms rather than surgeries. A sleep practice sells rest, so the grid is staged where the problem actually happens.',
		palette: [
			{ hex: '#7FCFC4', name: 'Teal' },
			{ hex: '#F3EDE3', name: 'Oat' },
			{ hex: '#2E6B63', name: 'Deep teal' },
		],
	},

];

/** The one that runs large at the top of the page. */
export const FEATURED = WORK[0];
export const REST = WORK.slice(1);

/**
 * Distinct languages across the work, counted rather than typed out, so the
 * headline figure cannot fall out of step with the list under it.
 */
export const LANGUAGE_COUNT = new Set(WORK.map((account) => account.language)).size;

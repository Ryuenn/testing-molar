/**
 * The practices whose marks the trust band shows.
 *
 * This is the roster of LOGOS, which is a different and longer list than
 * `~/data/work` — that one is the practices whose grids the site publishes, and
 * it carries nine posts and a palette for each. Four practices appear in both,
 * under the same slug, so a mark looked up by either list resolves to one file.
 *
 * The marks themselves are built from `public/ClientsLogos/` by
 * `scripts/generate-client-logos.mjs` and land in `src/assets/clients/<slug>.png`.
 * To add a practice: drop its logo in that folder, run `npm run client-logos`,
 * and add a line here. The slug is the filename slugged; the script prints it.
 *
 * `name` is what a screen reader hears, so it is the practice as it writes
 * itself rather than as the file happened to be saved — several arrived in block
 * capitals, which a screen reader spells out letter by letter.
 */
export interface ClientLogo {
	/** Matches `src/assets/clients/<slug>.png`, and `~/data/work` where both. */
	slug: string;
	name: string;
}

export const CLIENT_LOGOS: readonly ClientLogo[] = [
	{ slug: 'physimed-dentaire', name: 'Clinique Dentaire Physimed' },
	{ slug: 'boca-mission-bay-dentistry', name: 'Boca Mission Bay Dentistry' },
	{ slug: 'dentistry-on-the-path', name: 'Dentistry on the Path' },
	{ slug: 'walnut-street-dental', name: 'Walnut Street Smiles' },
	{ slug: 'gustafson-morningstar-dentistry', name: 'Gustafson Morningstar Dentistry' },
	{ slug: 'boynton-dental-studio', name: 'Boynton Dental Studio' },
	{ slug: 'zahnzauber-zahnspangen', name: 'Zahnzauber Zahnspangen' },
	{ slug: 'dutchess-dental-care', name: 'Dutchess Dental Care' },
	{ slug: 'dr-yolanda-cruz', name: 'Dr Yolanda Cruz' },
	{ slug: 'pure-dental', name: 'Pure Dental' },
	{ slug: 'gmu-dental', name: 'gmü dental' },
	{ slug: 'court-street', name: 'Court Street Dental' },
	{ slug: 'dennis-sierra-dmd-pa', name: 'Dennis Sierra DMD PA' },
	{ slug: 'adom', name: 'Adom Dental' },
	{ slug: 'apacdsm', name: 'Apac DSM' },
	{ slug: 'dcd', name: 'DCD Dental' },
];

/** Counted rather than typed, so a headline figure cannot fall out of step. */
export const CLIENT_LOGO_COUNT = CLIENT_LOGOS.length;

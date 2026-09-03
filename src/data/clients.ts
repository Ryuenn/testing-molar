/**
 * The practices whose marks the trust band shows.
 *
 * This is the roster of LOGOS, which is a different and longer list than
 * `~/data/work` — that one is the practices whose grids the site publishes, and
 * it carries nine posts and a palette for each. Four practices appear in both,
 * under the same slug, so a mark looked up by either list resolves to one file.
 *
 * The marks themselves are built from `logos-master/` by
 * `scripts/generate-client-logos.mjs` and land in `src/assets/clients/<slug>.png`.
 *
 * THIS LIST IS THE FILTER. The script generates a mark only for a master whose
 * slug appears below, and prints the rest as skipped — the delivered folder is
 * not a client list, and the September drop carried ten files that were MOLAR's
 * own logo and duplicates. So the order is: add the line here first, then run
 * `npm run client-logos`. The script prints the slug it derived from each
 * filename, which is what to paste.
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
	/* Both read off the September artwork, which spells out what the previous
	   screenshots only abbreviated. "Adom Dental" was a guess and wrong. */
	{ slug: 'adom', name: 'ADOM — Association of Dental Office Managers' },
	{ slug: 'apacdsm', name: 'APAC DSM' },
	{ slug: 'dcd', name: 'DCD Dental' },
];

/** Counted rather than typed, so a headline figure cannot fall out of step. */
export const CLIENT_LOGO_COUNT = CLIENT_LOGOS.length;

/**
 * The rows of the agency comparison, as keys rather than as copy.
 *
 * Every visible string moved into `~/i18n/ui` when the site became bilingual —
 * including the values, because "6+ months" and "1–2 editors" are sentences, not
 * data. What stays here is the structure: which rows exist, in what order, and
 * which of the agency values is a genuine cost rather than merely the weaker of
 * two options.
 */
export interface ComparisonRow {
	/** Suffix into `compare.*` in the dictionary: label, `molar<Key>`, `agency<Key>`. */
	key: 'cost' | 'speed' | 'ownership' | 'filming' | 'contracts' | 'languages' | 'team';
	/** `true` renders the MOLAR cell with an affirmative mark. */
	molarWins: boolean;
	/**
	 * `true` marks the agency value as a genuine drawback rather than merely the
	 * weaker of two options, and tints it accordingly.
	 *
	 * The distinction is worth keeping. "6+ months" is a commitment a practice is
	 * locked into and "No" to owning your own content is a right signed away —
	 * those are costs. "2–4 weeks" and "1–2 editors" are just slower and smaller.
	 * Tinting all seven would make the column read as a smear; tinting four makes
	 * the other three land as fact.
	 */
	agencyPenalty?: boolean;
}

export const COMPARISON: ComparisonRow[] = [
	{ key: 'cost', molarWins: true, agencyPenalty: true },
	{ key: 'speed', molarWins: true },
	{ key: 'ownership', molarWins: true, agencyPenalty: true },
	{ key: 'filming', molarWins: true, agencyPenalty: true },
	{ key: 'contracts', molarWins: true, agencyPenalty: true },
	{ key: 'languages', molarWins: true },
	{ key: 'team', molarWins: true },
];

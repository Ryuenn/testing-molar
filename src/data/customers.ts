/**
 * Customer stories (strategy §13) — and what is deliberately NOT in them.
 *
 * The strategy asks each story to carry a client logo, a practice name, a
 * country flag, the MOLAR products in use, a testimonial and an optional
 * measurable result. It also says, twice: only authentic testimonials and real
 * results.
 *
 * Those two instructions collide with what this repo actually holds. Every
 * practice below is real and every grid is a real feed — `~/data/work` is the
 * source for all of it — and exactly one of them has a measurable result we can
 * stand behind, read off two dated screenshots of a public profile. What we do
 * NOT have is a single client testimonial. The quotes on /results/ are
 * unsolicited messages from OTHER practices who saw the work in their feed;
 * presenting one of those as a client saying it would be a fabrication, so
 * there is no `quote` field on this type at all. Add one when a real one has
 * been collected and signed off, not before.
 *
 * `country` is set only where the practice's own grid establishes a market.
 * Hebrew is not Israel, German is not Germany and Spanish is not Spain — a
 * language is what the content is in, not where the practice is, and a flag
 * guessed from a language is a false claim with a picture attached.
 */
import { WORK, type WorkAccount } from './work';
import { GROWTH } from './results';
import type { ProductId } from './products';

export interface CustomerStory {
	/** The account in `~/data/work`. Its grid is the story's image. */
	account: WorkAccount;
	/** ISO 3166-1 alpha-2, lowercased. Absent where the market is unknown. */
	country?: string;
	/** Emoji flag for `country`. Derived, never typed — see `flagOf`. */
	flag?: string;
	/** What MOLAR runs for them today. */
	products: readonly ProductId[];
	/**
	 * The one number we can prove, as a key into `customers.result*`. Only
	 * Physimed has one; everyone else renders without a result line rather than
	 * with an approximation of one.
	 */
	resultKey?: 'physimed';
}

/**
 * Regional-indicator pair for an alpha-2 code. `'ca'` → 🇨🇦.
 *
 * Derived rather than pasted so a flag can never disagree with the code beside
 * it, and so a typo'd code renders as two letter-boxes instead of the wrong
 * country's flag.
 */
export const flagOf = (code: string): string =>
	[...code.toUpperCase()].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join('');

/** Markets we can evidence, keyed by the account slug. Nothing is inferred. */
const MARKETS: Record<string, string> = {
	/* "Montréal" is written on the account in `~/data/work`. */
	'physimed-dentaire': 'ca',
};

const byId = (slug: string): WorkAccount => {
	const found = WORK.find((account) => account.slug === slug);
	if (!found) throw new Error(`No work account with slug "${slug}".`);
	return found;
};

const story = (slug: string, products: readonly ProductId[], resultKey?: 'physimed'): CustomerStory => {
	const country = MARKETS[slug];
	return {
		account: byId(slug),
		country,
		flag: country ? flagOf(country) : undefined,
		products,
		resultKey,
	};
};

/**
 * Three, not seven. /our-work/ carries the full sample; this section is the
 * three that between them show the widest spread — a measured result, a
 * right-to-left market, and a practice whose whole brand is editorial.
 */
export const CUSTOMER_STORIES: readonly CustomerStory[] = [
	story('physimed-dentaire', ['social', 'education'], 'physimed'),
	story('zeidman-orthodontics', ['social']),
	story('carewell-dental', ['social']),
];

/** The proven figure, so the copy and the exhibit on /results/ cannot drift. */
export const PHYSIMED_RESULT = {
	value: GROWTH.metrics[0].after,
	from: GROWTH.metrics[0].before,
	handle: GROWTH.handle,
} as const;

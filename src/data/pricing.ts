import { SALES_CALL } from './site';

/**
 * The plans, matching molarai.studio exactly — names, prices, feature copy and
 * checkout destinations.
 *
 * **The `href` on Starter and Premium are live Stripe Payment Links.** They
 * take real money from real cards. Change one only against the Stripe
 * dashboard, never by guessing at the id; a link that 404s and a link that
 * charges the wrong amount look identical from here.
 */
export interface Plan {
	id: 'starter' | 'premium' | 'enterprise';
	/** Prefix into `pricing.*`: name, summary, blurb, cta, note. */
	key: 'starter' | 'premium' | 'enterprise';
	/** Feature key prefix, numbered from 1 — 's1'…'s8', 'p1'…'p9', 'e1'…'e9'. */
	featureKey: 's' | 'p' | 'e';
	featureCount: number;
	/** Not translated: billed in USD wherever the buyer is. */
	/**
	 * The displayed price, currency symbol included.
	 *
	 * Both of these were once written through a String.replace() whose
	 * replacement string held the price itself, and `$4` and `$1` were consumed
	 * as capture-group references — "$497" shipped as "97" and "$1,497" as
	 * ",497". Starter advertised a price 400 dollars under the real one.
	 *
	 * If you ever rewrite these programmatically, pass a function as the
	 * replacement. A function's return value is used verbatim; a string is
	 * scanned for $-patterns first. `amount` below is the number to check
	 * against.
	 */
	price: string;
	/** `true` renders the per-month cadence beside the price. */
	perMonth: boolean;
	cta: { href: string };
	badge?: boolean;
	featured: boolean;
	amount: number | null;
}

export const CURRENCY = 'USD';

export const PLANS: Plan[] = [
	{
		id: 'starter',
		key: 'starter',
		featureKey: 's',
		featureCount: 8,
		price: '$497',
		perMonth: true,
		amount: 497,
		cta: { href: 'https://buy.stripe.com/cNicN5aUb9le1G470EeAg01' },
		featured: false,
	},
	{
		id: 'premium',
		key: 'premium',
		featureKey: 'p',
		featureCount: 9,
		price: '$1,497',
		perMonth: true,
		amount: 1497,
		cta: { href: 'https://buy.stripe.com/9B65kD7HZdBuckI5WAeAg02' },
		badge: true,
		featured: true,
	},
	{
		id: 'enterprise',
		key: 'enterprise',
		featureKey: 'e',
		featureCount: 9,
		price: '',
		perMonth: false,
		amount: null,
		cta: { href: SALES_CALL },
		featured: false,
	},
];


/** True for the two plans that open a checkout rather than a calendar. */
export const isCheckout = (plan: Plan): boolean => plan.cta.href.includes('buy.stripe.com');

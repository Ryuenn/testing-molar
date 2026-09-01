/**
 * The MOLAR ecosystem, as four products.
 *
 * This file is the spine of the new site: the mega menu, the "choose how MOLAR
 * works for you" band, the product selector at the foot of the home page and
 * every product page all read from it, so a product exists in one place or it
 * does not exist at all.
 *
 * Copy lives in `~/i18n/ui` under `products.*`, keyed off `key` — the same
 * pattern `pricing.ts` and `comparison.ts` already use. What is here is
 * structure: which products exist, in what order, where each one goes, what it
 * costs and which mark it wears.
 *
 * ⚠️ On prices. `$497` and `$1,497` are the live Stripe amounts and are read
 * from `~/data/pricing`. `$97` is the Patient Education Library, and its
 * checkout does not exist yet — see `EDUCATION_CHECKOUT` in `~/data/site`.
 * MOLAR TV and MOLAR Complete are quoted rather than bought, so neither
 * carries a price at all; inventing one would be a claim we cannot honour.
 */
import type { GlyphName } from './glyphs';

export type ProductId = 'social' | 'education' | 'tv' | 'complete';

export interface Product {
	id: ProductId;
	/**
	 * Prefix into `products.*`: `<key>Name`, `<key>Blurb`, `<key>Line`,
	 * `<key>Cta`, and on the three that have one, `<key>Price`.
	 */
	key: ProductId;
	/** Root-relative. Localised at the point of use, never here. */
	href: string;
	/**
	 * The displayed price, currency symbol included, or `null` where the
	 * product is quoted. Not translated: billed in USD wherever the buyer is.
	 */
	price: string | null;
	/** `true` renders the per-month cadence beside the price. */
	perMonth: boolean;
	icon: GlyphName;
	/** Feature key prefix into `products.*` — `soc1`…, `edu1`…, `tv1`…, `cmp1`… */
	featureKey: 'soc' | 'edu' | 'tv' | 'cmp';
	featureCount: number;
}

export const PRODUCTS: readonly Product[] = [
	{
		id: 'social',
		key: 'social',
		href: '/social-media/',
		price: '$497',
		perMonth: true,
		icon: 'share',
		featureKey: 'soc',
		featureCount: 5,
	},
	{
		id: 'education',
		key: 'education',
		href: '/patient-education/',
		price: '$97',
		perMonth: true,
		icon: 'book',
		featureKey: 'edu',
		featureCount: 5,
	},
	{
		id: 'tv',
		key: 'tv',
		href: '/molar-tv/',
		price: null,
		perMonth: false,
		icon: 'monitor',
		featureKey: 'tv',
		featureCount: 5,
	},
	{
		id: 'complete',
		key: 'complete',
		href: '/molar-complete/',
		price: null,
		perMonth: false,
		icon: 'layers',
		featureKey: 'cmp',
		featureCount: 5,
	},
] as const;

export const productById = (id: ProductId): Product => {
	const found = PRODUCTS.find((product) => product.id === id);
	/* Build-time and loud. A missing product would otherwise render as a card
	   with no name, no price and a link to nowhere. */
	if (!found) throw new Error(`No product with id "${id}".`);
	return found;
};

/** The three paths the home page offers. Complete is the fourth, and the roof. */
export const PRODUCT_PATHS = PRODUCTS.filter((product) => product.id !== 'complete');

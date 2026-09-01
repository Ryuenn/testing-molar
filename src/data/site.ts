import type { GlyphName } from './glyphs';

/**
 * Site-wide constants. Single source of truth for anything that appears in more
 * than one place — origin, contact, positioning lines, promo code.
 *
 * `origin` must stay identical to `ORIGIN` in astro.config.mjs.
 */
export const SITE = {
	origin: 'https://molarai.studio',
	name: 'MOLAR AI',
	legalName: 'MOLAR AI',
	tagline: 'The content engine for dentistry.',
	positioning: "The world's first automated patient education platform for dental practices.",
	description:
		'MOLAR AI creates, customizes, schedules and publishes patient education content for dental practices. No filming. No contracts. No agencies. Live in 24 hours.',
	email: 'team@molarai.studio',
	locale: 'en_US',
	lang: 'en',
	founded: '2025',
	/*
		The live accounts. Order here is the order the footer shows them in.

		These are consumed twice — by the footer, and by `sameAs` on the
		Organization JSON-LD in `~/data/schema` — so a handle that is wrong here is
		wrong in the structured data Google reads as well as in the link a visitor
		clicks. Verify against the real profile before editing; the handles are not
		guessable (Instagram and TikTok both carry a dot, YouTube does not).
	*/
	social: {
		instagram: 'https://www.instagram.com/molar.ai/',
		tiktok: 'https://www.tiktok.com/@molar.ai?lang=en',
		youtube: 'https://www.youtube.com/@Molarai.studio',
	},
} as const;

/**
 * Promotional code shown on the Premium tier. Content variable, not a hardcoded
 * string — change it here (or blank `code` out) and every surface follows.
 */
export const PROMO = {
	code: 'MOLAR',
	discount: '$500 off',
	appliesTo: 'the first month',
	/** Plan id the promo is attached to. */
	tier: 'premium',
} as const;

/**
 * Where Enterprise enquiries go. External and outside our control — if the
 * booking link ever changes, it changes here and on the pricing page at once.
 */
export const SALES_CALL = 'https://calendly.com/alleviatemedia/client-onboarding';

export const CTA = {
	/*
		Root-relative page links, not `#pricing` fragments. The plans live on
		/pricing/ now rather than in a section of the home page, and a fragment
		that no longer has a target scrolls nowhere at all.
	*/
	primary: { label: 'Start now', href: '/pricing/' },
	secondary: { label: 'See plans and pricing', href: '/pricing/' },
	/*
		Enterprise is quoted, not bought, so it books a call rather than opening a
		checkout. Same destination the live site uses.
	*/
	sales: { label: 'Talk with sales', href: SALES_CALL },
} as const;

/**
 * Primary navigation — the ecosystem, not a list of pages.
 *
 * Five stops. Two of them open a mega panel rather than going anywhere on
 * their own, because MOLAR is now four products and a resource engine and a
 * flat row of eleven links would say nothing about how any of them relate.
 *
 * Every `href` is a real route. A parent with a `menu` is still a link — the
 * panel is an expansion of it, not a replacement for it — so a keyboard user
 * or a crawler that never opens the panel still reaches the page underneath.
 *
 * Copy is in `~/i18n/ui` under `nav.*`, keyed off `key`. What is here is which
 * stops exist, in what order, and what hangs off each.
 */
export interface NavMenuItem {
	/** Key into `nav.*` for the label, and `nav.<key>Sub` for the line under it. */
	key: string;
	href: string;
	/** Mark, from `~/data/glyphs`. */
	icon: GlyphName;
}

export interface NavEntry {
	/** Key into `nav.*`. */
	key: string;
	/**
	 * Omit on a stop that only opens a panel.
	 *
	 * Without it the label renders as plain text rather than a link, and the
	 * chevron beside it is the only control — which is right when every
	 * destination worth having is already in the panel and the parent would only
	 * duplicate one of them.
	 */
	href?: string;
	/** Present on a stop that opens a panel. */
	menu?: readonly NavMenuItem[];
	/** Optional link along the foot of the panel. */
	menuFoot?: { key: string; href: string };
}

export const NAV_LINKS: readonly NavEntry[] = [
	{ key: 'home', href: '/' },
	{
		key: 'products',
		/*
			No `href` on purpose. It used to point at /molar-complete/, which is also
			the fourth item in its own panel — so the parent was a second way to the
			same page, and clicking the word that opens a menu took you off the page
			instead. The panel is the whole of what Products means.
		*/
		menu: [
			{ key: 'menuSocial', href: '/social-media/', icon: 'share' },
			{ key: 'menuEducation', href: '/patient-education/', icon: 'book' },
			{ key: 'menuTv', href: '/molar-tv/', icon: 'monitor' },
			{ key: 'menuComplete', href: '/molar-complete/', icon: 'layers' },
		],
		menuFoot: { key: 'menuHow', href: '/how-it-works/' },
	},
	{ key: 'customers', href: '/customers/' },
	{
		key: 'resources',
		href: '/resources/',
		menu: [
			{ key: 'menuHub', href: '/resources/', icon: 'docs' },
			{ key: 'menuLibrary', href: '/resources/video-library/', icon: 'film' },
			/*
				Deep links into the hub's own category filter, which reads
				`?category=` off the URL on load — see src/pages/resources/index.astro.
				The values have to match `RESOURCE_CATEGORIES` in ~/data/resources
				exactly or the chip lights nothing.
			*/
			{ key: 'menuPatientGuides', href: '/resources/?category=Patient+Education', icon: 'tooth' },
			{ key: 'menuMarketing', href: '/resources/?category=Social+Media', icon: 'palette' },
			{ key: 'menuTemplates', href: '/resources/?category=Operations', icon: 'layers' },
			{ key: 'menuFaq', href: '/#faq', icon: 'chat' },
		],
		menuFoot: { key: 'menuAllResources', href: '/resources/' },
	},
	{ key: 'pricing', href: '/pricing/' },
] as const;

/**
 * The client portal, for the Login link in the nav.
 *
 * EMPTY ON PURPOSE, and the nav renders no Login link while it is. The
 * subscriber portal is a real thing — Premium lists "Client Portal access" as
 * a feature — but its URL is not in this repo and nobody should guess at it.
 * Paste the real one in and the link appears in the header and the footer at
 * once; leave it blank and neither shows a link to a page that does not load.
 */
export const PORTAL_LOGIN = '';

/**
 * Checkout for the $97 Patient Education Library.
 *
 * **A LIVE STRIPE PAYMENT LINK.** It takes real money from real cards, and it
 * is the same one every CTA on molarai.studio/educate points at — read off that
 * page rather than guessed at. Change it only against the Stripe dashboard: a
 * link that 404s and a link that charges the wrong amount look identical from
 * here.
 *
 * It opens the 30-day free month and bills $97 at the start of month two; see
 * `EDUCATION_TRIAL_DAYS` in `~/data/education` and the FAQ entry "What happens
 * after my free month?".
 *
 * There is no annual equivalent. The live page advertises $849/year in its FAQ
 * but carries no button for it, so neither does this site — every annual
 * mention on these pages states the price rather than offering to take it.
 */
export const EDUCATION_CHECKOUT = 'https://buy.stripe.com/28E14ne6ngNGfwU0CgeAg0a';

/**
 * The nav's language switcher.
 *
 * DISPLAY ONLY. Nothing is translated and nothing routes off `code` — the
 * control changes which chip is lit and stops there. Wiring it up means adding
 * real locale routing; until then adding an entry here adds a chip that does
 * nothing, so don't.
 *
 * `code` is the ISO 639-1 tag (German is `de`, from *Deutsch* — there is no
 * "ge"), `label` the two-letter form in the chip, `name` what a screen reader
 * announces instead of a two-letter fragment.
 */
export const LANGUAGES = [
	{ code: 'en', label: 'En', name: 'English' },
	{ code: 'de', label: 'De', name: 'Deutsch' },
] as const;

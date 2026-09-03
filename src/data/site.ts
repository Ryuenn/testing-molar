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
		clicks. Verify against the real profile before editing; not one of these is
		guessable (Instagram and TikTok both carry a dot, YouTube does not, and
		Facebook is a numeric profile id rather than a vanity name).

		`facebook` is the supplied profile URL, verbatim. It is the `profile.php?
		id=…` form because the page has no vanity username yet — that is a real,
		permanent URL and it will keep working after one is set, so it does not
		need revisiting. If a vanity name is ever claimed, swapping this for
		`facebook.com/<name>` is the tidier link but not a fix.

		⚠️ Do not "clean up" the query string. The id IS the address; strip it and
		the link goes to a login wall.

		TikTok is still here and nothing renders it any more. The plans advertise
		Instagram and Facebook, so the marks on the page are the channels the
		product posts to. `sameAs` in `~/data/schema` reads this object rather than
		the rail, and a real account is worth declaring to Google whether or not
		the page links it.
	*/
	social: {
		instagram: 'https://www.instagram.com/molar.ai/',
		facebook: 'https://www.facebook.com/profile.php?id=61575745104908',
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
		/*
			Two products, in the order the site sells them.

			It listed four. Patient Education is not a product a practice can buy —
			it is what a MOLAR TV subscription contains, and the footer said so while
			the nav sold it separately. MOLAR Complete was a name with no page worth
			pointing at behind it. Both are gone, and MOLAR TV leads because it is
			the $97 entry point the whole home page now argues for.
		*/
		menu: [
			{ key: 'menuTv', href: '/molar-tv/', icon: 'monitor' },
			{ key: 'menuSocial', href: '/social-media/', icon: 'share' },
		],
		menuFoot: { key: 'menuHow', href: '/how-it-works/' },
	},
	/*
		No Customers stop. The page it opened is a wall of practice profiles that
		says the same thing the case study and the testimonials say, in more
		words — its content belongs on /social-media/, which is where MOLAR Social
		now points.
	*/
	{
		key: 'resources',
		href: '/resources/',
		/*
			No panel. This stop is a plain link to the hub.

			It used to open a mega panel of six rows, four of which landed on
			/resources/ — the hub itself plus three deep links into its own category
			filter — while the parent link and the panel's own foot both went there
			too. Trimming it to the two destinations that differed left a two-row
			panel, which is a panel not worth opening.

			Both of those still have a home: the video library is promoted at the top
			of the hub with its own access controls, and the FAQ is a section of the
			home page reachable from the footer and from /#faq.
		*/
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
 * ⚠️ It is still configured in Stripe for a THIRTY-day trial. The site now
 * advertises fourteen, per the repositioning brief — see `EDUCATION_TRIAL_DAYS`
 * in `~/data/education` and the FAQ entry "What happens after my free trial?".
 * Reconcile the two in the Stripe dashboard before launch.
 *
 * There is no annual equivalent. The live page advertises $849/year in its FAQ
 * but carries no button for it, so neither does this site — every annual
 * mention on these pages states the price rather than offering to take it.
 */
export const EDUCATION_CHECKOUT = 'https://buy.stripe.com/28E14ne6ngNGfwU0CgeAg0a';

/*
	`LANGUAGES` was here — a display-only En/De pair for a nav switcher that was
	later replaced by real locale routing in `~/i18n/config`, and is now replaced
	again by Google's translation widget. Nothing read it by the end. The site's
	one locale lives in `LOCALES`; the widget is
	`~/components/ui/GoogleTranslate`.
*/

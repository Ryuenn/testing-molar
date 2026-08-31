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
 * Primary nav — the six destinations that sit in the centred pill. Work and
 * results are separate stops: one is the case studies, the other the numbers
 * across every account, and they answer different questions.
 *
 * Every href is a real route. Pricing and Resources are built; Our work,
 * Results and How it works are deliberately empty for now — nav and footer,
 * nothing between. Anything the nav leaves out is reachable from the footer.
 */
export const NAV_LINKS = [
	{ label: 'Home', href: '/' },
	{ label: 'Our work', href: '/our-work/' },
	{ label: 'Results', href: '/results/' },
	{ label: 'How it works', href: '/how-it-works/' },
	{ label: 'Pricing', href: '/pricing/' },
	{ label: 'Resources', href: '/resources/' },
] as const;

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

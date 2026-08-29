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
	social: {
		instagram: 'https://www.instagram.com/molarai',
		linkedin: 'https://www.linkedin.com/company/molarai',
		youtube: 'https://www.youtube.com/@molarai',
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

export const CTA = {
	primary: { label: 'Start now', href: '#pricing' },
	secondary: { label: 'See plans and pricing', href: '#pricing' },
	sales: { label: 'Talk with sales', href: 'mailto:team@molarai.studio?subject=MOLAR%20Enterprise' },
} as const;

/** Nav is designed separately — this is the shape the placeholder expects. */
export const NAV_LINKS = [
	{ label: 'How it works', href: '/#how-it-works' },
	{ label: 'Case studies', href: '/#case-studies' },
	{ label: 'Pricing', href: '/#pricing' },
	{ label: 'Resources', href: '/resources/' },
	{ label: 'FAQ', href: '/#faq' },
] as const;

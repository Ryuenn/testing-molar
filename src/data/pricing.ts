export interface Plan {
	id: string;
	name: string;
	price: string;
	cadence: string | null;
	summary: string;
	blurb: string;
	features: string[];
	cta: { label: string; href: string };
	featured: boolean;
	/** Numeric price in USD, for Product/Offer structured data. Null = quote. */
	amount: number | null;
}

export const CURRENCY = 'USD';

export const PLANS: Plan[] = [
	{
		id: 'starter',
		name: 'MOLAR Starter',
		price: '$497',
		cadence: '/month',
		amount: 497,
		summary: 'Consistent content, zero effort.',
		blurb: 'For practices that want reliable content without adding work to the team.',
		features: [
			'3 posts per week — 1 educational reel, 1 carousel, 1 social proof post',
			'Customized to branding, treatments, and practice',
			'Reviews and before & afters incorporated when provided',
			'Powered by the MOLAR content library',
			'Captions, scheduling, and publishing included',
			'Instagram & Facebook',
			'Live within 24 hours',
		],
		cta: { label: 'Start with Starter', href: '#start' },
		featured: false,
	},
	{
		id: 'premium',
		name: 'MOLAR Premium',
		price: '$1,497',
		cadence: '/month',
		amount: 1497,
		summary: 'Their patient acquisition system.',
		blurb: 'Daily content across every channel, built around the treatments that matter most.',
		features: [
			'Daily content for Instagram & Facebook',
			'Fully custom reels, carousels, stories, and still image posts',
			"Focused on the practice's highest-value treatments",
			'Reviews, before & afters, and patient cases turned into content',
			"Multilingual content in patients' own language",
			'Voice cloning — narrated by the dentist',
			'YouTube Shorts included',
			'Client Portal access',
			'Priority production & support',
		],
		cta: { label: 'Start with Premium', href: '#start' },
		featured: true,
	},
	{
		id: 'enterprise',
		name: 'MOLAR Enterprise',
		price: 'Custom',
		cadence: null,
		amount: null,
		summary: 'One content strategy, every location.',
		blurb: 'For groups, DSOs, and multi-location practices.',
		features: [
			'Everything in Premium',
			'AI avatars of doctors and leadership teams',
			'Multi-location content distribution',
			'Per-location branding & localization',
			'Centralized content management across every practice',
			'Enterprise onboarding & deployment',
			'Dedicated strategist & priority support',
			'Volume pricing',
			'Exclusive content rights available',
		],
		cta: { label: 'Talk with sales', href: 'mailto:team@molarai.studio?subject=MOLAR%20Enterprise' },
		featured: false,
	},
];

export const PRICING_FOOTNOTE = 'Prices in USD. No long-term contracts. Cancel anytime.';

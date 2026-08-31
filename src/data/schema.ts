import { SITE } from './site';
import { DEFAULT_LOCALE, type Locale } from '~/i18n/config';
import { useTranslations } from '~/i18n/utils';
import { PLANS, CURRENCY } from './pricing';
import { FAQ } from './faq';

const abs = (path: string) => new URL(path, SITE.origin).href;

/** Sitewide. Rendered on every page. */
export const organizationSchema = (): Record<string, unknown> => ({
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': `${SITE.origin}/#organization`,
	name: SITE.name,
	legalName: SITE.legalName,
	url: `${SITE.origin}/`,
	logo: {
		'@type': 'ImageObject',
		url: abs('/images/logo-molar.png'),
		width: 512,
		height: 512,
	},
	image: abs('/images/og/home.png'),
	description: SITE.description,
	slogan: SITE.tagline,
	foundingDate: SITE.founded,
	email: SITE.email,
	sameAs: [SITE.social.instagram, SITE.social.tiktok, SITE.social.youtube],
	contactPoint: [
		{
			'@type': 'ContactPoint',
			contactType: 'sales',
			email: SITE.email,
			availableLanguage: ['en'],
		},
	],
});

export const websiteSchema = (): Record<string, unknown> => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${SITE.origin}/#website`,
	url: `${SITE.origin}/`,
	name: SITE.name,
	description: SITE.description,
	publisher: { '@id': `${SITE.origin}/#organization` },
	inLanguage: SITE.lang,
});

/** Pricing section — one Product with an AggregateOffer over the three tiers. */
export const productSchema = (locale: Locale = DEFAULT_LOCALE): Record<string, unknown> => {
	const t = useTranslations(locale);
	const priced = PLANS.filter((p) => p.amount !== null);

	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		'@id': `${SITE.origin}/#product`,
		name: SITE.name,
		description: SITE.description,
		brand: { '@id': `${SITE.origin}/#organization` },
		image: abs('/images/og/home.png'),
		category: 'Dental practice marketing software',
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: CURRENCY,
			lowPrice: Math.min(...priced.map((p) => p.amount as number)),
			highPrice: Math.max(...priced.map((p) => p.amount as number)),
			// Counts every tier, including the quote-only one.
			offerCount: PLANS.length,
			// Only the tiers with a real number get an Offer node — an Offer without
			// a `price` is invalid, and Enterprise is priced on application.
			offers: priced.map((plan) => ({
				'@type': 'Offer',
				'@id': `${SITE.origin}/#offer-${plan.id}`,
				name: t(`pricing.${plan.key}Name` as never),
				description: t(`pricing.${plan.key}Blurb` as never),
				url: `${SITE.origin}/#pricing`,
				price: plan.amount,
				priceCurrency: CURRENCY,
				availability: 'https://schema.org/InStock',
				priceSpecification: {
					'@type': 'UnitPriceSpecification',
					price: plan.amount,
					priceCurrency: CURRENCY,
					billingDuration: 1,
					billingIncrement: 1,
					unitCode: 'MON',
					referenceQuantity: {
						'@type': 'QuantitativeValue',
						value: 1,
						unitCode: 'MON',
					},
				},
				seller: { '@id': `${SITE.origin}/#organization` },
			})),
		},
	};
};

/** FAQ section. Answers are the same strings the accordion renders. */
export const faqSchema = (): Record<string, unknown> => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	'@id': `${SITE.origin}/#faq`,
	mainEntity: FAQ.map((item) => ({
		'@type': 'Question',
		name: item.q,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.a,
		},
	})),
});

export interface Crumb {
	name: string;
	/** Root-relative, with trailing slash. */
	path: string;
}

/** Inner pages only. Home is not a breadcrumb of itself. */
export const breadcrumbSchema = (crumbs: Crumb[]): Record<string, unknown> => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: crumbs.map((crumb, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name: crumb.name,
		item: abs(crumb.path),
	})),
});

export const resourceSchema = (input: {
	title: string;
	description: string;
	path: string;
	updated: Date;
	category: string;
}): Record<string, unknown> => ({
	'@context': 'https://schema.org',
	'@type': 'DigitalDocument',
	name: input.title,
	description: input.description,
	url: abs(input.path),
	dateModified: input.updated.toISOString().slice(0, 10),
	genre: input.category,
	inLanguage: SITE.lang,
	isAccessibleForFree: true,
	publisher: { '@id': `${SITE.origin}/#organization` },
});

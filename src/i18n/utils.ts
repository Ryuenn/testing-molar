import { DEFAULT_LOCALE, isLocale, type Locale } from './config';
import { UI, type Dict } from './ui';

/**
 * The locale of the page currently rendering.
 *
 * `Astro.currentLocale` is derived from the URL by Astro's i18n routing, which
 * means a component never has to be told what language it is in — no locale prop
 * threaded through thirty components, and no way for a parent to pass the wrong
 * one. It is `undefined` outside a routed page (and narrowed here anyway,
 * because it is typed as a plain string).
 */
export function getLocale(astro: { currentLocale?: string }): Locale {
	return isLocale(astro.currentLocale) ? astro.currentLocale : DEFAULT_LOCALE;
}

/**
 * The dictionary for a locale, plus interpolation.
 *
 *   const t = useTranslations(getLocale(Astro));
 *   t('footer.allGuides', { n: 12 })   → 'All 12 guides'
 *
 * Placeholders are `{name}`. Interpolating rather than concatenating is what
 * keeps word order translatable: German routinely puts the number, the verb or
 * the object somewhere English does not, and a sentence assembled from three
 * concatenated fragments can only ever be in English order.
 */
export function useTranslations(locale: Locale) {
	const dict = UI[locale];

	return function t(key: Path<Dict>, vars?: Record<string, string | number>): string {
		const value = key
			.split('.')
			.reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], dict);

		if (typeof value !== 'string') {
			/* Loud, and at build time. A key that resolves to nothing would otherwise
			   render as the key itself or as "undefined" on a live page. */
			throw new Error(`Missing translation for "${key}" in locale "${locale}".`);
		}

		if (!vars) return value;
		return value.replace(/\{(\w+)\}/g, (whole, name: string) =>
			name in vars ? String(vars[name]) : whole,
		);
	};
}

/** Dotted paths into the dictionary, so a typo in a key fails to compile. */
type Path<T> = {
	[K in keyof T & string]: T[K] extends string ? K : `${K}.${Path<T[K]>}`;
}[keyof T & string];

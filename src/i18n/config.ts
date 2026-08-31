/**
 * Locales the site is published in.
 *
 * English is the default and is NOT prefixed — it stays at `/`, `/pricing/` and
 * so on, which is what every existing link, the sitemap and anything already
 * indexed depends on. German is served from `/de/…`.
 *
 * `label` is the two-letter form in the nav chip; `name` is what a screen reader
 * announces instead of a two-letter fragment; `htmlLang` goes on `<html lang>`
 * and into `hreflang`.
 *
 * Adding a locale here is not enough on its own — it also needs a mirrored set
 * of routes under `src/pages/<code>/` and a full block in `~/i18n/ui`. The
 * `UI` dictionary is typed against this list, so a missing translation is a
 * build error rather than an English string appearing on a German page.
 */
export const LOCALES = [
	{ code: 'en', label: 'En', name: 'English', htmlLang: 'en' },
	{ code: 'de', label: 'De', name: 'Deutsch', htmlLang: 'de' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: unknown): value is Locale =>
	typeof value === 'string' && LOCALES.some((l) => l.code === value);

/**
 * Rewrites a root-relative path into another locale.
 *
 *   localizePath('/pricing/', 'de') → '/de/pricing/'
 *   localizePath('/de/pricing/', 'en') → '/pricing/'
 *
 * Anything that is not a root-relative path — an external URL, a `mailto:`, a
 * bare `#fragment` — is returned untouched, because those do not have a locale
 * to change. A fragment on a real path is preserved.
 */
export function localizePath(path: string, locale: Locale): string {
	if (!path.startsWith('/')) return path;

	/* Strip whatever locale prefix is already there, so this is idempotent and
	   can be called on a path that has already been localised. */
	let rest = path;
	for (const { code } of LOCALES) {
		if (code === DEFAULT_LOCALE) continue;
		if (rest === `/${code}` || rest.startsWith(`/${code}/`)) {
			rest = rest.slice(code.length + 1) || '/';
			break;
		}
	}

	if (locale === DEFAULT_LOCALE) return rest;
	return rest === '/' ? `/${locale}/` : `/${locale}${rest}`;
}

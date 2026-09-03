/**
 * Locales the site is published in.
 *
 * ENGLISH ONLY. The site used to ship a second, hand-mirrored route tree under
 * `/de/…` with a full German dictionary behind it. Both are gone: the nav
 * offers Google's own translation widget instead, which covers every language
 * rather than one and leaves a single set of copy to keep true.
 *
 * `label` is the two-letter form; `name` is what a screen reader announces
 * instead of a two-letter fragment; `htmlLang` goes on `<html lang>`.
 *
 * Adding a locale here is not enough on its own — it also needs a mirrored set
 * of routes under `src/pages/<code>/` and a full block in `~/i18n/ui`. The
 * `UI` dictionary is typed against this list, so a missing translation is a
 * build error rather than an English string appearing on a translated page.
 */
export const LOCALES = [{ code: 'en', label: 'En', name: 'English', htmlLang: 'en' }] as const;

export type Locale = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: unknown): value is Locale =>
	typeof value === 'string' && LOCALES.some((l) => l.code === value);

/**
 * Rewrites a root-relative path into another locale.
 *
 *   localizePath('/pricing/', 'en') → '/pricing/'
 *
 * With English the only locale this is the identity on every real path, and
 * every call site keeps it deliberately: the day a second locale comes back,
 * the prefixing is already threaded through the components.
 *
 * Anything that is not a root-relative path — an external URL, a `mailto:`, a
 * bare `#fragment` — is returned untouched, because those do not have a locale
 * to change. A fragment on a real path is preserved.
 */
export function localizePath(path: string, locale: Locale): string {
	if (!path.startsWith('/')) return path;

	/*
		The prefixes that can appear at the front of a path: every locale except
		the default, which is served unprefixed.

		Widened to `string[]` deliberately. With English the only entry in
		`LOCALES`, `code === DEFAULT_LOCALE` narrows the loop variable to `never`
		for the rest of the body and `code.length` stops compiling — a type error
		about the shape of the list rather than about this function, which is
		correct code today and correct code again the moment a locale is added.
	*/
	const prefixes: string[] = LOCALES.map(({ code }) => code).filter(
		(code) => code !== DEFAULT_LOCALE,
	);

	/* Strip whatever locale prefix is already there, so this is idempotent and
	   can be called on a path that has already been localised. */
	let rest = path;
	for (const code of prefixes) {
		if (rest === `/${code}` || rest.startsWith(`/${code}/`)) {
			rest = rest.slice(code.length + 1) || '/';
			break;
		}
	}

	if (locale === DEFAULT_LOCALE) return rest;
	return rest === '/' ? `/${locale}/` : `/${locale}${rest}`;
}

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Canonical origin. Must stay identical to `SITE.origin` in `src/data/site.ts`
 * — canonical tags, OG URLs and sitemap entries are all derived from these two
 * and are only correct while they agree (protocol, subdomain, no trailing slash).
 */
const ORIGIN = 'https://molarai.studio';

/**
 * Pages that exist as routes but have no content yet.
 *
 * Each entry is also marked `noindex` in its own frontmatter, and the two have
 * to stay in step: when a page gets real content, delete it from this list and
 * drop `noindex` from the page. An empty page in the index is worse than a page
 * that is not there at all.
 *
 * Empty now that every route is written. Kept, with the sitemap filter that
 * reads it, because the next scaffold route added to the nav needs somewhere to
 * be listed before it has anything to say.
 */
const STUB_ROUTES = [];

// https://astro.build/config
export default defineConfig({
	site: ORIGIN,
	output: 'static',

	/*
		English keeps the bare routes it already has — "/", "/pricing/" — because
		everything already linked, indexed and sitemapped points at them. German is
		served from "/de/…", mirrored by hand under "src/pages/de/": Astro does not
		generate translated routes, it only makes the locale readable from the URL
		via "Astro.currentLocale".
	*/
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de'],
		routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
	},

	/*
		Prose in the resource library. `github-dark-default` rather than Astro's
		stock theme because the site is dark: the default pairs a light background
		with the ink behind it and every fenced block came out as a white slab in
		the middle of the page.

		`wrap` matters more than the theme here. These blocks are prompts, not
		code — they are meant to be read and copied whole, and a horizontal
		scrollbar under a paragraph of English is how you lose the second half of a
		sentence.
	*/
	markdown: {
		shikiConfig: {
			theme: 'github-dark-default',
			wrap: true,
		},
	},

	// One trailing-slash form for every route, so sitemap URLs match canonicals exactly.
	trailingSlash: 'always',
	build: {
		format: 'directory',
		inlineStylesheets: 'auto',
	},

	// No `prefetch`: it would add a client script to every page for the sake of one
	// inner route. Zero JS by default means zero, and `motion.ts` is the only
	// script the brief actually calls for.

	integrations: [
		sitemap({
			/*
				Tells the sitemap which URLs are translations of each other, so each
				<url> carries xhtml:link alternates. The <head> hreflang tags say the
				same thing; search engines accept either, and having both is the
				belt-and-braces Google's own i18n guidance recommends.
			*/
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', de: 'de' },
			},
			// Neither the 404 nor the post-gate download pages are canonical URLs;
			// both are noindex, so they must not appear here either. Same for the
			// scaffolded routes above, until they have something to say.
			filter: (page) =>
				!page.includes('/404') &&
				!page.endsWith('/download/') &&
				!STUB_ROUTES.some((route) => page.endsWith(route)),
			changefreq: 'weekly',
			lastmod: new Date(),
			serialize(item) {
				if (item.url === `${ORIGIN}/`) item.priority = 1.0;
				else if (item.url.includes('/resources/')) item.priority = 0.6;
				else item.priority = 0.8;
				return item;
			},
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});

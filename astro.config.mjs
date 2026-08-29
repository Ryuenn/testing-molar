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

// https://astro.build/config
export default defineConfig({
	site: ORIGIN,
	output: 'static',

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
			// Neither the 404 nor the post-gate download pages are canonical URLs;
			// both are noindex, so they must not appear here either.
			filter: (page) => !page.includes('/404') && !page.endsWith('/download/'),
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

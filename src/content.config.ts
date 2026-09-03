import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

import { RESOURCE_CATEGORIES } from './data/resources';

/**
 * Resource hub. Adding a new PDF means adding one markdown file here and
 * dropping the PDF in `public/pdfs/` — no code changes. The grid, the filters
 * and the sitemap all derive from this collection, which is what lets it scale
 * past twenty entries without touching a component.
 */

const resources = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
	schema: z.object({
		title: z.string(),
		/** One line on what's inside. Shown on the card and used as the meta description. */
		blurb: z.string().max(180),
		category: z.enum(RESOURCE_CATEGORIES),
		/** Path under `public/pdfs/`, root-relative. */
		file: z.string().startsWith('/pdfs/'),
		pages: z.number().int().positive(),
		format: z.string().default('PDF'),
		updated: z.coerce.date(),
		featured: z.boolean().default(false),
		/** Lower sorts first within a category. */
		order: z.number().default(100),
		/** Optional per-page social card; falls back to the hub card. */
		ogImage: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

/**
 * Case studies. The section renders whatever is in here, so "more case studies
 * are coming" is a matter of adding files.
 */
const caseStudies = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
	schema: ({ image }) =>
		z.object({
			/** Short descriptor, e.g. "Quebec smile makeover expert". */
			practice: z.string(),
			location: z.string(),
			specialty: z.string(),
			/** The contrast the section is built on. */
			before: z.array(z.string()).min(2),
			after: z.array(z.string()).min(2),
			headline: z.string(),
			stat: z.object({
				value: z.string(),
				label: z.string(),
			}),
			image: image().optional(),
			imageAlt: z.string().optional(),
			/**
			 * A film for the rail, instead of the still.
			 *
			 * Root-relative paths into `public/`, not `image()` — a <video> cannot
			 * take a build-processed asset, and the poster is loaded by the same
			 * element so it lives beside it rather than in `src/assets`.
			 *
			 * Takes precedence over `image` where set, and both are required
			 * together: a <video> with no poster is a black rectangle until the
			 * first frame decodes, which on a marketing page is a hole in the card.
			 * `image` stays as the fallback for a study with no film.
			 */
			video: z.string().optional(),
			poster: z.string().optional(),
			order: z.number().default(100),
			draft: z.boolean().default(false),
		})
		/* Both or neither — see the note on `video`. Caught at build time, because
		   a poster missed on one study is invisible until someone scrolls to it. */
		.refine((d) => Boolean(d.video) === Boolean(d.poster), {
			message: 'A case study with `video` must also carry `poster`, and vice versa.',
			path: ['poster'],
		}),
});

export const collections = { resources, caseStudies };

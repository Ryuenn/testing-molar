/**
 * Shared SEO types. Kept in a plain module rather than exported from
 * `Seo.astro` so pages and layouts can import them without depending on a
 * component's frontmatter exports.
 */
export interface OgImage {
	/** Absolute path from the site root, e.g. `/images/og/home.png`. */
	src: string;
	alt: string;
	width?: number;
	height?: number;
}

export type PageType = 'website' | 'article' | 'product';

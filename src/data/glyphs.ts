/**
 * The names `~/components/ui/Glyph.astro` will draw.
 *
 * In a .ts module rather than exported from the component itself so the data
 * files can name a glyph without importing an Astro component — `products.ts`
 * and friends are plain modules, and a type that lives inside a `.astro` file
 * drags the component's compilation into everything that reads it.
 *
 * Adding a name here without adding the matching path in Glyph.astro compiles
 * cleanly and renders an empty <svg>. Add both.
 */
export type GlyphName =
	| 'share'
	| 'book'
	| 'monitor'
	| 'layers'
	| 'tooth'
	| 'chat'
	| 'docs'
	| 'search'
	| 'globe'
	| 'spark'
	| 'screens'
	| 'palette'
	| 'film'
	| 'play'
	| 'check'
	| 'arrow'
	/* The figure band under the hero. */
	| 'people'
	| 'play-circle'
	| 'chart'
	| 'clock'
	| 'shield'
	| 'map';

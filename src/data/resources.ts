/**
 * Categories the resource hub filters by. Kept out of `content.config.ts` so
 * pages can import the list without pulling the collection definitions in with
 * it — the config module is loaded specially by Astro and is not a general
 * import target.
 */
export const RESOURCE_CATEGORIES = [
	'Patient Education',
	'Practice Growth',
	'Social Media',
	'Treatment Guides',
	'Operations',
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

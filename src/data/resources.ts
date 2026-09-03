/**
 * Categories the resource hub filters by. Kept out of `content.config.ts` so
 * pages can import the list without pulling the collection definitions in with
 * it — the config module is loaded specially by Astro and is not a general
 * import target.
 */
/*
	The eight the 09/01 brief names, in its order — see "Resource Library →
	Categories" in `web changes 09_01 new site build.md`.

	They replaced six of our own: AI Workflows, Patient Education, Practice
	Growth, Social Media, Treatment Guides, Operations. Three survive under a new
	name (Operations → Practice Operations, AI Workflows split across ChatGPT &
	AI Tools and Automation & Workflows), and Treatment Guides folded into
	Patient Education, which is what it always was.

	Every document was re-filed by the OUTCOME a dentist gets from it rather than
	the tool it happens to use — a ChatGPT playbook whose output is an SOP manual
	is Practice Operations, not ChatGPT & AI Tools. That rule is the only thing
	keeping two of these categories apart, so keep to it when filing the next one.

	`z.enum(RESOURCE_CATEGORIES)` in `content.config.ts` validates every document
	against this list at build time, so a category removed here fails the build
	rather than silently emptying a filter.

	⚠️ `Tool Stack` is EMPTY. The brief asks for it and nothing is filed there
	yet; /resources/ only renders chips for categories that have content, so it
	is invisible rather than a dead filter. It appears the moment a document
	claims it.
*/
export const RESOURCE_CATEGORIES = [
	'ChatGPT & AI Tools',
	'Sales & Case Acceptance',
	'CRM & Follow-Up',
	'Social Media',
	'Patient Education',
	'Automation & Workflows',
	'Practice Operations',
	'Tool Stack',
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

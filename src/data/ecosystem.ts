/**
 * The two diagrams the strategy hangs on, as data.
 *
 * `TOUCHPOINTS` is section 02 — one content system feeding five places a
 * patient meets the practice. `JOURNEY` is section 10 — the same five places
 * put in the order a patient actually walks through them.
 *
 * They are deliberately the same five things twice. The first says "one system,
 * many surfaces"; the second says "and here is the order it happens in", and a
 * reader who bounced off the abstraction gets a second, concrete run at it.
 *
 * Copy lives in `~/i18n/ui` under `eco.*` and `journey.*`, keyed off `key`.
 */
import type { GlyphName } from './glyphs';
import type { ProductId } from './products';

export interface Touchpoint {
	/** Prefix into `eco.*`: `<key>Name`, `<key>A`, `<key>B`. */
	key: 'social' | 'chairside' | 'consult' | 'waiting' | 'hub';
	icon: GlyphName;
	/** Which product feeds this surface. Drives the link out of the diagram. */
	product: ProductId;
}

export const TOUCHPOINTS: readonly Touchpoint[] = [
	{ key: 'social', icon: 'share', product: 'social' },
	{ key: 'chairside', icon: 'tooth', product: 'education' },
	{ key: 'consult', icon: 'chat', product: 'education' },
	{ key: 'waiting', icon: 'monitor', product: 'tv' },
	{ key: 'hub', icon: 'docs', product: 'complete' },
] as const;

export interface JourneyStep {
	/** Prefix into `journey.*`: `<key>Title`, `<key>Where`, `<key>Body`. */
	key: 'discover' | 'arrive' | 'ask' | 'explain' | 'continue';
	icon: GlyphName;
	product: ProductId;
}

export const JOURNEY: readonly JourneyStep[] = [
	{ key: 'discover', icon: 'share', product: 'social' },
	{ key: 'arrive', icon: 'monitor', product: 'tv' },
	{ key: 'ask', icon: 'search', product: 'education' },
	{ key: 'explain', icon: 'tooth', product: 'education' },
	{ key: 'continue', icon: 'docs', product: 'complete' },
] as const;

/**
 * Section 13 — why MOLAR, in six blocks.
 *
 * Six rather than the four or eight a grid would prefer, because six is what
 * the strategy specifies and each one answers a different objection. Dropping
 * two to make the rows even would drop two objections.
 */
export interface WhyBlock {
	/** Prefix into `why.*`: `<key>Title`, `<key>Body`. */
	key: 'dental' | 'educate' | 'screens' | 'growing' | 'global' | 'one';
	icon: GlyphName;
}

export const WHY: readonly WhyBlock[] = [
	{ key: 'dental', icon: 'tooth' },
	{ key: 'educate', icon: 'book' },
	{ key: 'screens', icon: 'screens' },
	{ key: 'growing', icon: 'spark' },
	{ key: 'global', icon: 'globe' },
	{ key: 'one', icon: 'layers' },
] as const;

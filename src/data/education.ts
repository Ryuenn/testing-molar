/**
 * The Patient Education Library — the $97 offer (strategy §10).
 *
 * ── Provenance ─────────────────────────────────────────────────────────────
 * Everything in this file is transcribed from the live funnel at
 * molarai.studio/educate, which is the page this site is merging in. The
 * figures are therefore the offer as it is currently sold, not estimates: 300+
 * videos, 40+ treatments, 5+ added daily, unlimited devices on one location,
 * $97/month after a 14-day free trial, or $849/year.
 *
 * That page is the source of truth for all of it. When the offer changes there,
 * it changes here — and every surface that renders it follows, because nothing
 * downstream types a price or a count of its own.
 *
 * ⚠️ Two numbers below are derived rather than transcribed: the monthly
 * equivalent of the annual plan and the saving. Both are checked by
 * `ANNUAL_MATH` at the foot of this file, which fails the build if the three
 * figures ever stop agreeing. Do not "fix" a mismatch by editing the derived
 * number — one of the two prices is wrong.
 */

/* ── The headline figures ─────────────────────────────────────────────────── */

export interface EducationStat {
	/** Suffix into `edu.stat*Label`. */
	key: 'videos' | 'daily' | 'devices';
	/** Rendered as-is. `null` where the answer is a word rather than a number. */
	value: string | null;
}

/**
 * Three, matching the live funnel's own stat row.
 *
 * "40+ treatments" is deliberately not a fourth tile. The live page does not
 * run it as a headline figure — it appears inside the plan's feature list and
 * in the comparison table, where it qualifies the video count rather than
 * standing beside it. Promoting it here would state the same fact twice in one
 * screen and make the row read as padded.
 */
export const EDUCATION_STATS: readonly EducationStat[] = [
	{ key: 'videos', value: '300+' },
	{ key: 'daily', value: '5+' },
	/* "Unlimited" is a word, not a figure, so it is translated with its label
	   rather than printed here — see `edu.statDevicesValue`. */
	{ key: 'devices', value: null },
] as const;

/* ── Price and offer ──────────────────────────────────────────────────────── */

/**
 * Not translated: billed in USD wherever the buyer is, exactly like the three
 * social plans in `~/data/pricing`.
 */
export const EDUCATION_PRICE = '$97';
export const EDUCATION_PRICE_ANNUAL = '$849';
/** What the annual plan works out to per month. Checked below. */
export const EDUCATION_ANNUAL_MONTHLY = '$70.75';
/** Annual against twelve months of monthly. Checked below. */
export const EDUCATION_ANNUAL_SAVING = '$315';
/**
 * Days of free trial on the monthly plan. Annual has no trial.
 *
 * ⚠️ 14 per the repositioning brief, down from 30. **The Stripe Payment Link in
 * `~/data/site` has not been changed yet** — it is still configured for a
 * 30-day trial, so until that is updated in the Stripe dashboard this page
 * advertises fourteen days and the checkout grants thirty. Advertising less
 * than is given is the safe direction of the two, but they must be reconciled
 * before launch.
 */
export const EDUCATION_TRIAL_DAYS = 14;

/**
 * The monthly plan's feature list, as keys into `edu.plan1`…`edu.plan6`.
 *
 * SIX, not the seven the live page's own bullet list appears to show, and
 * emphatically not eight. The live monthly card leads with a highlighted
 * "Full access today — $0 for your first 14 days" line, which is the offer
 * rather than a feature and is rendered separately here; and the branded
 * waiting-room loop is NOT a monthly feature at all. The live FAQ is explicit:
 * "On the monthly plan, the library plays as-is. Choose annual billing and your
 * waiting room TV loop is branded with your logo, colors, and practice name."
 *
 * Listing the branded loop under $97/month would promise something the monthly
 * subscription does not include. It belongs where it is now — in the annual
 * note under the card, and in `edu.annualNote`.
 */
export const EDUCATION_PLAN_FEATURE_COUNT = 6;

/* ── What is inside ───────────────────────────────────────────────────────── */

/**
 * The treatment categories the live page browses by, in its order.
 *
 * NOT translated, and deliberately: these are the library's own category names,
 * the same strings a subscriber types into the real search. A German practice
 * searching this library still searches "Invisalign".
 */
export const EDUCATION_TOPICS = [
	'Invisalign',
	'Implants',
	'Root Canal',
	'Gums',
	'Whitening',
	'Oral Health',
	'TMJ',
	'Veneers',
] as const;

/**
 * The questions the live page shows being typed into the search, verbatim.
 *
 * These ARE translated — see `edu.q1`…`edu.q4`. They are a patient's own words,
 * and a German patient does not ask "Does whitening damage my teeth?".
 */
export const EDUCATION_QUESTION_COUNT = 4;

/* ── The argument ─────────────────────────────────────────────────────────── */

/**
 * The without/with contrast, four rows each side, paired.
 *
 * Paired rather than two independent lists: row `n` on the left is the problem
 * that row `n` on the right answers, and rendering them as a matched pair is
 * what turns a pair of bullet lists into an argument.
 */
export const EDUCATION_CONTRAST_ROWS = 4;

/** "Live in your practice today" — four steps, keyed into `edu.step*`. */
export const EDUCATION_STEPS = ['start', 'search', 'play', 'grow'] as const;

/**
 * "Skip the production budget" — the library against commissioning video.
 *
 * Keys only; both cells of every row are copy and live in the dictionary. Same
 * shape as `~/data/comparison`, and for the same reason: "$500–$2,000+ per
 * video" is a sentence, not a datum.
 */
export interface EducationCompareRow {
	/** Suffix into `edu.cmp*`: label, `edu.cmpLib<Key>`, `edu.cmpDiy<Key>`. */
	key: 'cost' | 'launch' | 'coverage' | 'filming' | 'languages' | 'contract';
	/** `true` marks the DIY value as a genuine cost rather than merely weaker. */
	diyPenalty?: boolean;
}

export const EDUCATION_COMPARE: readonly EducationCompareRow[] = [
	{ key: 'cost', diyPenalty: true },
	{ key: 'launch', diyPenalty: true },
	{ key: 'coverage' },
	{ key: 'filming', diyPenalty: true },
	{ key: 'languages' },
	{ key: 'contract' },
] as const;

/* ── The demo panel ───────────────────────────────────────────────────────── */

/**
 * The search built into the page: a query, a result, and two related videos.
 *
 * Every id below is a real entry in `~/data/library`, so the thumbnail, the
 * title and the write-up on the page are the actual product rather than a
 * mockup of it. The strategy asks for "real product UI"; this is the only way
 * to give it one without drawing a picture of a screen that does not exist.
 */
export const EDUCATION_DEMO = {
	/** Suffix into `edu.demoQuery` — translated, because a German practice
	    searching this library searches it in German. */
	queryKey: 'demoQuery',
	/**
	 * The hit.
	 *
	 * ⚠️ THE QUERY MUST MATCH IT. `edu.demoQuery` in `~/i18n/ui` is the text in
	 * the search field, and the whole point of this panel is that the field, the
	 * result and the related list are one coherent search. Change one and check
	 * the other two.
	 *
	 * This entry is Vimeo-hosted, so the panel renders it in a Vimeo player with
	 * the title, byline and portrait switched off — the video and nothing else.
	 * Drop a `teeth-whitening.mp4` in `public/videos/library/`, add `video:` to
	 * the record in `library.ts`, and the same slot becomes a bare local
	 * `<video>` with no change here: the panel prefers the file where there is
	 * one.
	 *
	 * It briefly played an Instagram reel embedded from @molar.ai. That is gone.
	 * Their embed is a whole Instagram card — avatar, "View profile", a like and
	 * comment bar — and there is no parameter that removes any of it, so a panel
	 * meant to show the product was showing Instagram's product instead.
	 */
	resultId: 'how-does-teeth-whitening-work',
	/**
	 * What the panel offers next. Same topic or same treatment stage.
	 *
	 * These were `new-tooth-today` (Restorative) and `prophylaxis` (Preventive)
	 * against an Orthodontics hit — two videos that shared neither the topic nor
	 * the stage, which is the rule directly above. A related list that is not
	 * related is the one thing this panel cannot show: it is here to prove the
	 * library answers the next question, and it was answering a different
	 * patient's.
	 *
	 * Four now, all Cosmetic and all English, running in the order the questions
	 * actually arrive: how does it work (the hit), what does it change, how long
	 * does it last, and — for the patient whitening will not fix — what veneers
	 * cost them and how long those last instead.
	 *
	 * The catalogue holds exactly three whitening videos and one of them is the
	 * hit, which is why the last two are the alternative treatment rather than
	 * more of the same one.
	 */
	relatedIds: [
		'how-whitening-changes-the-color-of-your-teeth',
		'how-long-do-whitening-results-last',
		'do-veneers-ruin-your-teeth',
		'how-long-do-veneers-last',
	],
} as const;

/**
 * Where the library is used, as four rooms. Drives the strip under the demo.
 * Copy is in `~/i18n/ui` under `edu.use*`.
 */
export const EDUCATION_USES = ['chairside', 'consult', 'waiting', 'follow'] as const;

/* ── Arithmetic guard ─────────────────────────────────────────────────────── */

/**
 * The three price figures have to agree, and they are typed as display strings
 * rather than numbers, so nothing checks them at compile time. This does, at
 * build time, because an annual price that does not match its own advertised
 * saving is the kind of error a customer finds before we do.
 *
 * Runs in Node during `astro build`. Nothing here ships.
 */
const money = (s: string) => Number(s.replace(/[^0-9.]/g, ''));

const monthly = money(EDUCATION_PRICE);
const annual = money(EDUCATION_PRICE_ANNUAL);
const saving = money(EDUCATION_ANNUAL_SAVING);
const perMonth = money(EDUCATION_ANNUAL_MONTHLY);

if (monthly * 12 - annual !== saving) {
	throw new Error(
		`Education pricing does not add up: ${EDUCATION_PRICE}×12 − ${EDUCATION_PRICE_ANNUAL} = ${
			monthly * 12 - annual
		}, but the page advertises a saving of ${EDUCATION_ANNUAL_SAVING}.`,
	);
}

/* Rounded to the cent, so a half-cent of float drift is not an error. */
if (Math.abs(annual / 12 - perMonth) > 0.01) {
	throw new Error(
		`Education pricing does not add up: ${EDUCATION_PRICE_ANNUAL}/12 = ${(annual / 12).toFixed(
			2,
		)}, but the page advertises ${EDUCATION_ANNUAL_MONTHLY}/month.`,
	);
}

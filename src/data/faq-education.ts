/**
 * The Patient Education Library's own FAQ, transcribed from the live funnel at
 * molarai.studio/educate.
 *
 * Separate from `~/data/faq`, which answers questions about the social
 * subscription. They are different products at different prices with different
 * contracts, and merging the two lists would put "Do I need to create content
 * myself?" next to "Is there a limit on how many devices I can use?" — which
 * reads as one confusing product rather than two clear ones.
 *
 * ENGLISH ONLY, like `~/data/faq`. Neither list is in the dictionary; the
 * accordion that renders them is not translated either. That is a gap the whole
 * site shares rather than one this file introduces — noted here so that whoever
 * closes it closes both at once.
 *
 * Answers are reused verbatim inside FAQPage structured data, so they must stay
 * plain text and must stay identical to what the page renders. Two of them
 * quote prices; those are the same figures as `~/data/education`, and if that
 * file's arithmetic guard ever fires, these strings are part of what has to
 * change with it.
 */
import type { FaqItem } from './faq';

export const EDUCATION_FAQ: FaqItem[] = [
	{
		q: 'What exactly is the Patient Education Library?',
		a: "It's an on-demand, searchable collection of 300+ short videos covering the treatments you offer most — implants, aligners, veneers, root canals, and more. Search the question, hit play — chairside, in the consult room, or looping on the waiting room TV — with 5+ new videos added every day.",
	},
	{
		q: 'Is this different from a MOLAR content subscription?',
		a: 'Yes. MOLAR Starter and Premium create and post custom social content for your practice. The Patient Education Library is a separate, lower-cost tool built for one job: giving you a clear video answer to pull up chairside, in the consult room, or in the waiting room. You can run either one on its own, or both together.',
	},
	{
		q: 'How do patients actually see the videos?',
		a: "Pulled up chairside during the exam, shown in the consult room while you talk through options, or looping automatically on the waiting room TV — whatever fits the moment. One location, unlimited devices, so you're never counting screens.",
	},
	{
		q: 'Can I run this on our waiting room TV?',
		a: 'Yes — the waiting room loop is included with every subscription. Set it up once and it cycles through education videos automatically, no one needs to supervise it. Just know that chairside is where this really earns its keep — the waiting room is a nice bonus, not the main event.',
	},
	{
		q: 'Is there a limit on how many devices I can use?',
		a: "No device limit. Your subscription covers one practice location — run it on as many TVs, tablets, and computers as you want throughout that location. Multi-location practices and DSOs need a multi-location license instead — reach out and we'll set that up.",
	},
	{
		q: 'Do I need any special equipment or software?',
		a: 'No. The library works in any browser on any device — desktop, tablet, TV, or phone. Nothing to install.',
	},
	{
		q: 'Can I add my own branding to the videos?',
		a: "On the monthly plan, the library plays as-is. Choose annual billing and your waiting room TV loop is branded with your logo, colors, and practice name at no extra cost. If you want videos custom-filmed for your practice specifically, that's what MOLAR Premium is built for — ask us about combining the two.",
	},
	{
		q: 'What happens after my free month?',
		a: "This applies to the monthly plan only. You'll be billed $97 automatically at the start of month two unless you cancel first. We'll notify you a few days before your free month ends.",
	},
	{
		q: 'Does the free trial apply to annual billing too?',
		a: "No. The 30-day free trial is only available on the monthly plan. Choosing annual bills you $849 in full today, with no free trial period — it's a good fit once you already know you want in, not for trying it out first.",
	},
	{
		q: "What's the difference between monthly and annual billing?",
		a: 'Monthly is $97/mo with a 30-day free trial, cancel anytime. Annual is $849/yr — equivalent to about $70.75/mo, a savings of $315 over paying monthly — billed in full today with no free trial, and it includes a waiting room TV loop branded with your logo, colors, and practice name.',
	},
	{
		q: 'Is there a contract or cancellation fee?',
		a: "No contract, no cancellation fee. Cancel anytime from your account and you won't be billed again.",
	},
	{
		q: 'How is this different from other patient education tools?',
		a: "Most patient education tools were built for the consult room only, with dated animations and per-seat software pricing. MOLAR's library is video-first and searchable, works chairside as well as in every op room and the waiting room, and is priced as one flat monthly fee for the whole practice — not per provider or per seat.",
	},
	{
		q: 'Can my whole team use it, or is it per-provider?',
		a: 'One subscription covers your entire practice location — unlimited devices, every provider and team member — no per-seat charges.',
	},
	{
		q: 'We have multiple locations — does one subscription cover all of them?',
		a: "Licensing is per practice location — each location carries its own subscription with unlimited devices. For multi-location groups or DSOs, reach out and we'll set up group pricing across all your locations instead of billing each one separately.",
	},
	{
		q: 'What languages are the videos available in?',
		a: 'We currently have content in English, Spanish, German, and Hebrew. For custom requests, contact team@molarai.studio.',
	},
];

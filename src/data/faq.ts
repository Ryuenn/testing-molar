export interface FaqItem {
	q: string;
	/** Plain text — reused verbatim inside FAQPage structured data. */
	a: string;
}

/**
 * The questions practices actually ask, rewritten to the 09/01 brief.
 *
 * Twelve became eight, and the subject changed. Every one of the twelve was
 * about social media management — what gets posted, whether you approve it,
 * whether you can upload photos — which was right when the home page led with
 * an agency replacement. The site sells a $97 waiting-room channel now, so the
 * first six answer questions about that: what it is, whether it is branded,
 * how many devices, what happens when a video is missing, what hardware it
 * needs, how fast it goes live. Social is one question near the end, where it
 * sits in the funnel.
 *
 * ⚠️ These strings are rendered TWICE — once by `~/components/sections/Faq` and
 * once, verbatim, inside the FAQPage JSON-LD built in `~/data/schema`. Google
 * treats a mismatch between the markup and the visible page as a reason to drop
 * the rich result, so answers must stay plain text: no markup, no links, and
 * nothing that reads as a placeholder.
 */
export const FAQ: FaqItem[] = [
	{
		q: 'What exactly is MOLAR?',
		a: 'MOLAR is a patient education platform for dental practices. You get a custom MOLAR TV channel plus access to 300+ treatment videos your team can use across unlimited devices.',
	},
	{
		q: 'Is MOLAR TV customized to my practice?',
		a: 'Yes. We customize it with your branding, doctors, treatments, and practice identity.',
	},
	{
		q: 'Can we use MOLAR on multiple TVs, iPads, and computers?',
		a: 'Yes. Your membership includes unlimited devices at your location.',
	},
	{
		q: 'What if MOLAR doesn’t have the treatment video we need?',
		a: 'Request it. We’ll create it and add it to the library.',
	},
	{
		q: 'Do we need special hardware or complicated integrations?',
		a: 'No. MOLAR works on the devices you already use. No PMS or CRM migration required.',
	},
	{
		q: 'How quickly can we get started?',
		a: 'You can access the library immediately. We then customize your MOLAR TV for your practice.',
	},
	{
		q: 'Does MOLAR also handle social media?',
		a: 'Yes. MOLAR Social can handle your content creation, copy, scheduling, and posting so your practice stays visible without managing social internally.',
	},
	{
		q: 'Is there a contract?',
		a: 'No. Cancel anytime. Payments are non-refundable.',
	},
];

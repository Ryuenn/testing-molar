/**
 * What clients have actually said about the Patient Education Library.
 *
 * Transcribed verbatim from the live funnel at molarai.studio/educate. These
 * are the first real client testimonials in this repo — before them the only
 * quotes on the site were the unsolicited DMs on /results/, which are from
 * OTHER practices rather than from customers, and which nothing may present as
 * customer testimonials.
 *
 * NOT TRANSLATED, on purpose and for the same reason the work grids and the DM
 * captures are not: these are things a named person said, in their own words.
 * A translated quotation is a paraphrase with quotation marks around it, and
 * `~/i18n/ui` already draws that line for every other real artefact on the site.
 *
 * `name` is set only where the live page attributes the quote. Three of the
 * four run unattributed there, and inventing an attribution for one of those —
 * even a plausible one — would be the single most damaging thing anyone could
 * do to this file. Leave them anonymous until a name has been cleared, and say
 * so on the page: see `testimonials.anonymous` in the dictionary.
 */
export interface Testimonial {
	quote: string;
	/**
	 * A filmed version of this testimonial, root-relative.
	 *
	 * Only Dr Harrosch has one. It is a person speaking on camera, so it never
	 * autoplays and never plays muted: it carries `controls` and `preload="none"`
	 * behind a poster, and downloads nothing until somebody asks for it.
	 */
	video?: string;
	/** Still for `video`. Required wherever `video` is set — see above. */
	poster?: string;
	/** Attributed on the live page. Absent where it is not. */
	name?: string;
	/** The descriptor the live page uses, verbatim. */
	role?: string;
	/**
	 * Links the quote to an account in `~/data/work`, where one matches. Used to
	 * put the testimonial beside that practice's own grid rather than in a
	 * separate wall of praise.
	 */
	accountSlug?: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
	{
		quote:
			"Sometimes my 10-minute speech didn't give the impact your one-minute video gave them.",
		name: 'Dr. Patricia Harrosch',
		role: "Quebec's Smile Makeover Expert",
		/*
			Re-encoded from the master in `src/assets/film/` — the delivered file was
			HEVC with its moov atom at the tail, which Firefox cannot play at all and
			which no browser can start before the whole 25 MB has arrived. See
			public/videos/README.md for the command.
		*/
		video: '/videos/harrosch-testimonial.mp4',
		poster: '/images/harrosch-poster.webp',
		/* The same practice the growth exhibit on /results/ is built from. */
		accountSlug: 'physimed-dentaire',
	},
	{
		quote:
			"We were repeating the same treatment explanations all day. Now we pull up MOLAR, show the patient the video, and continue the conversation from there. It's made patient education much easier for the entire team.",
	},
	{
		quote:
			"The biggest difference is the quality of the conversation afterward. Patients ask better questions, understand why we're recommending treatment, and feel much more confident about their options.",
	},
	/*
		A fourth line runs on the live page — "Your one-minute video had more
		impact than my 10-minute explanation." It is not here because it is the
		first quote said again in shorter form, and running both would present one
		person's sentence as two practices agreeing. If it turns out to be a
		different speaker, it belongs here with that attribution.
	*/
];

/** The one with a name on it. Runs beside its own practice in the story cards. */
export const testimonialFor = (slug: string): Testimonial | undefined =>
	TESTIMONIALS.find((entry) => entry.accountSlug === slug);

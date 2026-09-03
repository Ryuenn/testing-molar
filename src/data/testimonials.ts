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
	 * Vimeo id for the filmed version — digits only, not a URL.
	 *
	 * Takes precedence over `video`. The section renders it as a `player.vimeo.com`
	 * iframe; `frame-src https://player.vimeo.com` is already in the CSP in
	 * netlify.toml, so nothing needs opening up to add one.
	 *
	 * ⚠️ EMPTY ON EVERY ENTRY, ON PURPOSE. The links are coming. Until an id is
	 * pasted in, the card renders a placeholder frame at the right size and
	 * aspect — the layout is real, the video is the only thing missing. Paste the
	 * id between the quotes and it goes live with no other change.
	 *
	 * From a share URL — https://vimeo.com/1222921798 — the id is the last path
	 * segment. Private/unlisted links carry a hash after it (`/1222921798/ab12cd`);
	 * that hash is part of the embed and belongs here too, as `1222921798?h=ab12cd`.
	 */
	vimeo?: string;
	/**
	 * A self-hosted version, root-relative. The fallback where there is no `vimeo`.
	 *
	 * It is a person speaking on camera, so it never autoplays and never plays
	 * muted: it carries `controls` and downloads nothing until asked.
	 */
	video?: string;
	/** Still for `video`. Ignored when `vimeo` is set — Vimeo brings its own. */
	poster?: string;
	/**
	 * The one that leads the section, rendered large above the others.
	 *
	 * Exactly one entry should carry it. If none does the section falls back to
	 * the first entry, so the layout cannot end up headless.
	 */
	featured?: boolean;
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
		/*
			The highlight. Rendered large, above the other two.

			⚠️ `vimeo` is the slot for the Vimeo id — see the field's note. Until it
			is filled this card plays the self-hosted cut below, which is a real
			video, so this one is not a placeholder. Pasting an id here switches it
			to the hosted player and `video`/`poster` become the fallback.
		*/
		featured: true,
		vimeo: '',
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
		/* ⚠️ PLACEHOLDER — no video of any kind behind this one yet. Paste the
		   Vimeo id and the frame becomes a player. */
		vimeo: '',
		quote:
			"We were repeating the same treatment explanations all day. Now we pull up MOLAR, show the patient the video, and continue the conversation from there. It's made patient education much easier for the entire team.",
	},
	{
		/* ⚠️ PLACEHOLDER — as above. */
		vimeo: '',
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

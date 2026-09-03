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
	 * Set on all three entries. Until an id is pasted in, a card renders a
	 * placeholder frame at the right size and aspect — the layout is real, the
	 * video is the only thing missing — so a fourth testimonial can be written
	 * here before its film exists. Paste the id between the quotes and it goes
	 * live with no other change, except an `aspect` if it is not 16 / 9.
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
	 * The frame's shape, as a CSS `aspect-ratio` pair. Defaults to `16 / 9`.
	 *
	 * An <iframe> has no intrinsic size, so the card declares the shape and the
	 * player fills it — get this wrong and Vimeo letterboxes its own video inside
	 * a box of the other orientation. Vimeo's own embed snippet states it as the
	 * wrapper's `padding-top`: 177.78% is 9 / 16, 56.25% is 16 / 9.
	 */
	aspect?: string;
	/**
	 * Overrides the wall's `--film-shift` for this card alone, in the films-only
	 * mode.
	 *
	 * That variable is one number shared by every card, tuned for a phone
	 * selfie with the face above centre — right for most of these clips, wrong
	 * for one whose framing differs enough that the shared value crops the
	 * wrong end of the face. Set only where the shared value is visibly wrong
	 * for this specific clip.
	 */
	filmShift?: string;
	/**
	 * The one that leads the section, rendered large above the others.
	 *
	 * Exactly one entry should carry it. If none does the section falls back to
	 * the first entry, so the layout cannot end up headless.
	 */
	featured?: boolean;
	/** Attributed on the live page. Absent where it is not. */
	name?: string;
	/**
	 * Who is ON CAMERA, where that is not the person the quote belongs to.
	 *
	 * `name` attributes the QUOTATION and nothing else — see the note at the top
	 * of this file. The two came apart when the filmed testimonials arrived: the
	 * highlight's film and the highlight's quote are two different dentists, and
	 * printing `name` under the film would put one of them behind the other's
	 * words.
	 *
	 * So this is read only where the quotation is not drawn — the home page's
	 * films-only wall, and nowhere else. Wherever the quote is on the page, the
	 * caption is `name`, unchanged.
	 */
	speaker?: string;
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

			Hosted on Vimeo as "ZZ TESTIMONIAL.mp4". The self-hosted cut below is
			now the fallback — `vimeo` takes precedence — and stays because it is a
			real re-encode of the master, not a placeholder: clear the id and the
			card still plays.

			Shot portrait, hence `aspect`. The default 16 / 9 would letterbox a
			9 / 16 film into a landscape box and leave her a stamp in the middle of
			it, which is what the frontmatter's `--quote-aspect` exists to prevent.
		*/
		featured: true,
		vimeo: '1223345869',
		aspect: '9 / 16',
		/*
			Framed lower than the other two clips — the shared 16% shift leaves a
			band of empty backdrop above her head and crops her chin. 7% keeps
			enough lift to clear the top-of-head crop the shared value exists to
			avoid, without pushing the mouth out of frame.
		*/
		filmShift: '7%',
		quote:
			"Sometimes my 10-minute speech didn't give the impact your one-minute video gave them.",
		name: 'Dr. Patricia Harrosch',
		/*
			The film is a different dentist from the quotation, so the two names sit
			in two fields — see the note on `speaker`. The Vimeo master is delivered
			as "ZZ TESTIMONIAL.mp4"; `name` stays with the sentence, which the live
			funnel attributes to Dr. Harrosch, and is untouched by this.
		*/
		speaker: 'Dr. Andrea Borbely',
		role: "Quebec's Smile Makeover Expert",
		/*
			`video` / `poster` are gone from this entry, and this is the one removal
			here that is a fix rather than a tidy.

			They were `/videos/harrosch-testimonial.mp4` and its still — Dr Harrosch
			on camera — which was right while this entry was hers throughout. It is
			not any more: the film is Dr Borbely's. `video` is the fallback for a
			missing `vimeo`, so clearing the id above would have quietly played one
			dentist's film under the other's name. A fallback that is wrong is worse
			than none.

			The files are still in `public/`, and Dr Harrosch's film is now the third
			entry below, hosted.
		*/
		/* The same practice the growth exhibit on /results/ is built from. */
		accountSlug: 'physimed-dentaire',
	},
	{
		/*
			Filmed. Delivered as "Dra Desiree Client Testimonial English 2.mp4", so
			the dentist on camera is Dra. Desiree — and, as with the highlight, she
			is not who this quotation belongs to. It runs unattributed either way:
			the live funnel does not name it, and the home page draws no caption on
			the two small cards at all. No `speaker` field, because nothing reads
			one here — this note is the record of who is in the film.

			`aspect` off Vimeo's own snippet: 215% padding is 43 / 20 tall, taller
			even than a phone's 9 / 16, which is why the frame is capped by width in
			`Testimonials`.
		*/
		vimeo: '1223345916',
		aspect: '20 / 43',
		quote:
			"We were repeating the same treatment explanations all day. Now we pull up MOLAR, show the patient the video, and continue the conversation from there. It's made patient education much easier for the entire team.",
	},
	{
		/*
			Filmed. Delivered as "Dr Patricia Harrosch - testimonial 2.mp4", which
			means the dentist on camera here is the one the HIGHLIGHT's quotation
			belongs to — see `name` on the first entry. The two crossed when the
			films arrived: her sentence leads the section, her film runs third.

			Nothing on the page states either as the other, so nothing is wrong on
			it: this card is captionless on the home page and unattributed on
			/patient-education/, and the highlight names whoever the mode calls for.
			Worth knowing before anyone tidies these entries — the obvious tidy is
			to move this id up to the first one, which is only right if she also
			said the sentence in it.
		*/
		vimeo: '1223345861',
		aspect: '9 / 16',
		/*
			Framed much higher in this clip than the shared 16% assumes — the
			side card's crop window is narrow enough (see `--wall-side-ar`) that
			the shared value leaves nothing but hair and backdrop visible. 32%
			pulls the window up far enough to bring her face into it.
		*/
		filmShift: '32%',
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

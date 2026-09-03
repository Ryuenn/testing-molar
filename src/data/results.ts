/**
 * Proof. Two kinds of it, and they answer different questions.
 *
 *   GROWTH   what one account did once MOLAR AI was running it. Numbers read
 *            off two dated screenshots of the same public profile.
 *   INBOUND  what other practices said, unprompted, in the DMs. Every one of
 *            them is a dentist or an orthodontist asking who makes the videos —
 *            which is a different claim from "the content performs", and a
 *            stronger one.
 *
 * The inbound wall publishes the screenshots themselves, from
 * `src/assets/results/inbound/`. Each `quote` is still a verbatim transcription
 * of its shot — typos included, because that is what somebody actually typed and
 * tidying it up would make it read as copy rather than as evidence — but it is
 * now the image's `alt` rather than rendered text. It has to stay exact for that
 * reason: it is the only version of the message a screen reader will ever get.
 *
 * Senders stay anonymous. The captures are redacted, and a role plus a city is
 * all we are prepared to stand behind.
 */

export interface GrowthMetric {
	label: string;
	/** Displayed as-is. The screenshot's own wording, not a rounded rewrite. */
	before: string;
	after: string;
	/** Numeric twin of the above, for the count-up and the multiplier. */
	beforeValue: number;
	afterValue: number;
	/** Short summary of the delta, e.g. "64×". Rendered in the ledger's margin. */
	delta: string;
}

export interface GrowthStory {
	/** Public handle. Shown as provenance under the exhibit. */
	handle: string;
	name: string;
	role: string;
	place: string;
	/**
	 * Elapsed time between the two screenshots.
	 *
	 * UNSET ON PURPOSE. Neither screenshot carries a date, so any period here
	 * would be invented — and an invented period is the one part of a growth
	 * claim a sceptical reader will check. Fill it in ("11 months") when the real
	 * figure is known and the exhibit will show it between the two frames;
	 * leave it undefined and that marker simply does not render.
	 */
	period?: string;
	metrics: readonly GrowthMetric[];
	/**
	 * What the account was, and what it became — the qualitative half of the
	 * exhibit, listed under the screenshot each side describes.
	 *
	 * These are claims rather than readings, which is the difference between them
	 * and `metrics`: nobody can check "no authority at scale" against a
	 * screenshot. Keep them to things the rest of the page actually supports —
	 * "recognized by dental professionals worldwide" is carried by the inbound
	 * wall further down, which is messages from five countries. Anything that
	 * nothing on the page backs up does not belong in this list.
	 */
	was: readonly string[];
	became: readonly string[];
}

export const GROWTH: GrowthStory = {
	handle: '@drpatriciaharrosch',
	/* "Dr." with the point, matching `~/data/testimonials`. The two files carry
	   the same person and were spelling her two ways. */
	name: 'Dr. Patricia Harrosch',
	role: 'Cosmetic dentist',
	place: 'Physimed Dentaire, Montréal',
	metrics: [
		/*
			⚠️ 10.2K, NOT the 10.7K the 09/01 brief asks for — and this is the one
			figure on the site that cannot be updated from a document.
			`src/assets/results/patricia-after.webp` is a screenshot of the live
			profile and it reads "10.2K followers" in the picture; the string beside
			it is a transcription of that picture, and the whole section is built on
			saying so in its own figcaption.
			Re-capture the profile at the current count, replace the webp, then
			update `after`, `afterValue`, `growth.afterRead` and `growth.altAfter`
			together. Changing the number alone puts a figure on the page that the
			evidence beside it contradicts.
		*/
		{
			label: 'Followers',
			before: '159',
			after: '10.2K',
			beforeValue: 159,
			afterValue: 10200,
			delta: '64×',
		},
		{
			label: 'Posts published',
			before: '1',
			after: '152',
			beforeValue: 1,
			afterValue: 152,
			delta: '+151',
		},
	],
	was: [
		'Easy to overlook',
		'Inconsistent online presence',
		'Limited patient awareness',
		'No authority at scale',
	],
	became: [
		'Recognized by dental professionals worldwide',
		'Patients regularly mention the content',
		'Premium branding that builds trust',
	],
} as const;

export interface Inbound {
	/**
	 * The message, transcribed verbatim.
	 *
	 * The wall shows the screenshot rather than this text — but the text is still
	 * what carries it to anyone who cannot see the image, so it is the `alt` on
	 * the shot. That is the whole reason for keeping a transcription of something
	 * already legible in the picture: an image of a sentence says nothing to a
	 * screen reader, and a wall of ten of them would be ten dead rectangles.
	 */
	quote: string;
	/** Filename in `src/assets/results/inbound/`, without the extension. */
	shot: string;
	/**
	 * Role and place — as KEYS into `inbound.*` in the dictionary, not as display
	 * strings. "Practice owner" is a label, and labels get translated; the union
	 * means a key with no entry in the dictionary fails to compile rather than
	 * throwing at render.
	 */
	who: 'orthodontist' | 'owner' | 'dentist' | 'group';
	where?: 'austria' | 'usa' | 'texas' | 'la' | 'detroit';
	/** Where it arrived. All of these are Instagram, but say so rather than imply it. */
	channel: 'dm' | 'story';
	/**
	 * Marks the ones that ask, in so many words, who is making the videos. The
	 * wall leads with these — they are the argument.
	 */
	asking?: boolean;
}

export const INBOUND: readonly Inbound[] = [
	{
		quote:
			'Hello I am an orthodontist from Austria and I love your AI content. Who is responsible for your content on instagram? We are located on the other side of the word, so I would be very happy to get the contact from you, cause I need someone professional who helps with my account.',
		shot: 'austria-orthodontist',
		who: 'orthodontist',
		where: 'austria',
		channel: 'dm',
		asking: true,
	},
	{
		quote:
			'I love your Education videos on Instagram page, do you mind sharing which app do you use to create those videos or are you using a professional service? Thank you so much I appreciate your help.',
		shot: 'lakefront-smiles',
		who: 'owner',
		where: 'usa',
		channel: 'dm',
		asking: true,
	},
	{
		quote:
			"I absolutely love your videos. I'm actually surprised there isn't more views for these!!! Can I ask how you are making them please?? Is someone else making them for you at all and how are they doing it?",
		shot: 'surprised-not-more-views',
		who: 'dentist',
		channel: 'dm',
		asking: true,
	},
	{
		quote:
			'Where do u get your videos? We are a small practice in Texas and I love them to show patients.',
		shot: 'texas-practice',
		who: 'owner',
		where: 'texas',
		channel: 'dm',
		asking: true,
	},
	{
		quote:
			'I am an orthodontist in LA and like your video post on wearing retainers and relapse. I would like to add that to my website. Where can I get that from. Thanks sincerely',
		shot: 'la-orthodontist',
		who: 'orthodontist',
		where: 'la',
		channel: 'dm',
		asking: true,
	},
	{
		quote: 'How can I create this video',
		shot: 'how-can-i-create',
		who: 'dentist',
		channel: 'dm',
		asking: true,
	},
	{
		quote:
			'Love seeing this — patient education on flossing is genuinely thin online right now, especially in Detroit. Posts like this are exactly what new patients are searching for.',
		shot: 'detroit-group',
		who: 'group',
		where: 'detroit',
		channel: 'dm',
	},
	{
		quote: 'Thank you for letting me amazing. You guys are rock stars of Instagram. Love you videos, you guys make them??',
		shot: 'rock-stars',
		who: 'dentist',
		channel: 'dm',
	},
	{
		quote:
			'Thank you for post such a nice informative video in the first place. It is our duty to keep educating our patients',
		shot: 'duty-to-educate',
		who: 'dentist',
		channel: 'dm',
	},
	{
		quote: 'Really like your videos, so educative!',
		shot: 'so-educative',
		who: 'dentist',
		channel: 'dm',
	},
];

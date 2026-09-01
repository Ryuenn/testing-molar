/**
 * The video library — the grid behind /resources/video-library/.
 *
 * This is the swap point, and the only one. Everything downstream (the cards,
 * the four filters, the modal) derives from the shape below, so pointing the
 * page at the live catalogue means replacing `LIBRARY_ITEMS` with a fetch and
 * changing nothing else.
 *
 * Videos only. The Canva carousels are deliberately not here: their links open
 * an editable template, which is a subscriber tool rather than something a
 * public page can show, and a catalogue that mixes "watch this" with "here is
 * your editor" is two products in one grid.
 *
 * Two sources, both local. `public/videos/library/` holds the masters pulled
 * from Drive and re-encoded for the web — H.264, CRF 23, capped at 1080x1920,
 * faststart so playback begins before the file finishes downloading.
 *
 * Two of the homepage reel's clips in `public/videos/MolarExampleVideos/` are
 * reused here, for the German and Hebrew entries the new set does not have.
 * The other seven are not: they were cut for the muted strip under the hero and
 * carry no audio track at all, and a silent card in a library whose whole
 * affordance is "Watch video" reads as broken rather than as quiet.
 *
 * The rest of the catalogue lives in whatever Softr reads from; see `code`.
 *
 * On fetching rather than committing: an Astro data module runs in Node during
 * `astro build`, so a `fetch` here pulls the catalogue at build time and ships
 * only the rendered HTML. Nothing is downloaded into the repo — no media, no
 * export, no credentials in the client bundle. That is the shape this file is
 * written to accept.
 */

/** Mirrors Softr's Type filter, minus the carousels — see the header. */
export const LIBRARY_TYPES = ['Reel'] as const;
export type LibraryType = (typeof LIBRARY_TYPES)[number];

/**
 * Topics, in the order the filter offers them. A closed list rather than
 * free text: the filter bar is generated from it, so a typo in an item would
 * otherwise silently mint a new topic nobody can find anything under.
 */
export const LIBRARY_TOPICS = [
	'Orthodontics',
	'Implants',
	'Restorative',
	'Cosmetic',
	'Preventive',
	'Practice',
] as const;
export type LibraryTopic = (typeof LIBRARY_TOPICS)[number];

export interface LibraryItem {
	/** Stable, used as the DOM id the modal is opened by. */
	id: string;
	title: string;
	type: LibraryType;
	topic: LibraryTopic;
	/** Spelled out, not a code — it is shown on the card as-is. */
	language: string;
	/**
	 * Softr's catalogue code (C327, R209). Optional and unset on everything
	 * below: nothing here has a code in that system yet, and inventing one
	 * would collide with a real entry the day the catalogues are joined.
	 */
	code?: string;
	/** Content-calendar month, e.g. "January". Absent here — see MONTHS below. */
	month?: string;
	/**
	 * Root-relative, percent-encoded — several filenames carry spaces.
	 *
	 * One of `video` or `vimeo`, never both. The eight originals below are files
	 * in `public/`; everything after them is hosted.
	 */
	video?: string;
	/**
	 * Vimeo id, for the hosted catalogue.
	 *
	 * Those videos are set to **Embed only** with embedding restricted to this
	 * site's domains, so the id is not a way in for anyone who copies it — the
	 * player refuses to load anywhere else. Which also means they will not play
	 * from `astro dev` on localhost unless that host is whitelisted too; a blank
	 * frame in local development is the domain list, not a broken id.
	 */
	vimeo?: string;
	/**
	 * Poster frame, served from Vimeo's CDN.
	 *
	 * Hosted items need one because there is no local file to seek a frame out
	 * of — see the card markup, which paints `<video>` for local clips and this
	 * for hosted ones. `i.vimeocdn.com` is in the `img-src` allowlist in
	 * netlify.toml; a card that renders empty in production is usually that
	 * header rather than the URL.
	 */
	poster?: string;
	/** One line on what the clip covers. Sits above the explainer. */
	summary?: string;
	/**
	 * The patient-education context, blank-line separated.
	 *
	 * Deliberately not the spoken script. The script is a production asset — it
	 * is what the voiceover says, which the visitor has just heard — whereas a
	 * public library page is worth reading only if the panel beside the video
	 * adds something the video did not have room for.
	 *
	 * One string rather than an array of paragraphs so it can be pasted in and
	 * out without being reshaped by hand; the modal splits it on blank lines.
	 */
	explainer?: string;
}

const DIR = '/videos/MolarExampleVideos/';

/** Percent-encodes the filename only, the way `reelClips()` does. */
const clip = (file: string) => DIR + encodeURIComponent(file);

/** The re-encoded masters. Plain filenames, so no encoding needed. */
const HD = '/videos/library/';

export const LIBRARY_ITEMS: LibraryItem[] = [
	{
		id: 'new-tooth-today',
		title: 'Your new tooth could be ready today',
		type: 'Reel',
		topic: 'Restorative',
		language: 'English',
		video: HD + 'new-tooth-ready-today.mp4',
		summary: "How a crown that used to take two visits and a temporary can be finished in one.",
		explainer: "A conventional crown takes two appointments. The tooth is prepared, an impression is taken, a temporary crown is fitted, and the case goes to a dental laboratory for a week or two while the permanent crown is made.\n\nChairside CAD/CAM collapses that into a single visit. A digital scanner replaces the impression tray, software designs the restoration against the scan of the opposing bite, and a milling unit in the practice cuts it from a ceramic block while the patient waits. The crown is then fired, glazed and bonded the same day.\n\nIt is not right for every case. Heavily broken-down teeth, some aesthetic cases in the front of the mouth, and anything needing a specialist ceramist still benefit from laboratory work. Ask which applies before assuming one visit or two.",
	},
	{
		id: 'saliva-diagnostics',
		title: 'Your saliva may reveal more than your blood',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'saliva-reveals-more.mp4',
		summary: "Why a sample that takes seconds to collect is being studied as a diagnostic tool.",
		explainer: "Saliva is not just water. It carries bacteria, enzymes, antibodies, hormones and fragments of DNA, and unlike blood it can be collected in seconds, without a needle, by someone with no clinical training.\n\nIn dentistry the established uses are narrow and specific: identifying the bacterial species associated with periodontal disease, and assessing caries risk by measuring buffering capacity and bacterial load. Both inform how aggressively a practice treats and how often it recalls a patient.\n\nThe wider research interest is real but earlier-stage. Salivary markers are being studied for a range of systemic conditions, and results vary in how well they have been validated. Treat a salivary test as one input alongside examination and history, not as a replacement for either.",
	},
	{
		id: 'lingual-braces',
		title: 'What are lingual braces?',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		video: HD + 'lingual-braces.mp4',
		summary: "Fixed braces bonded behind the teeth, and the trade-offs that come with them.",
		explainer: "Lingual braces are conventional fixed appliances placed on the tongue side of the teeth rather than the lip side. Mechanically they do the same job — brackets, an archwire, and controlled force moving teeth through bone over months.\n\nThe appeal is that they are invisible from the front, which matters to adults who want treatment without visible hardware. Because the inner surface of every tooth is a different shape, the brackets are usually custom-made for the individual from a digital scan.\n\nThe trade-offs are real. Speech is affected for the first few weeks while the tongue adapts. Cleaning is harder, because the brackets sit where the tongue rests and where a toothbrush reaches least well. They typically cost more than labial braces, and not every practice offers them.",
	},
	{
		id: 'athlete-mouthguard',
		title: 'Why athletes need a mouthguard',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'why-an-athlete.mp4',
		summary: "What a mouthguard actually protects, and what the evidence does not support.",
		explainer: "A blow to the face transmits force through the teeth and jaw. Front teeth can fracture or be knocked out entirely, and the lower jaw can be driven into the upper with enough force to damage teeth that were never touched directly.\n\nA mouthguard sits between the arches and absorbs and distributes some of that force. The evidence for reduced dental and soft-tissue injury in contact sport is strong, and custom-fitted guards made from a model of the mouth fit better, stay in place better and are worn more consistently than boil-and-bite versions.\n\nOne caution worth stating plainly: mouthguards are sometimes marketed as reducing concussion risk. That claim is not well supported by current evidence. Wear one to protect your teeth and jaw, which it demonstrably does.",
	},
	{
		id: 'prophylaxis',
		title: 'What a professional cleaning actually removes',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'prophylaxis.mp4',
		summary: "The difference between what a toothbrush removes and what an instrument has to.",
		explainer: "Plaque is a soft bacterial film. It forms constantly, and brushing and interdental cleaning remove it — which is why they work when done consistently.\n\nPlaque that is left in place mineralises. Within days it hardens into calculus, and calculus cannot be brushed off. It is bonded to the tooth surface and has to be removed mechanically, with hand instruments or an ultrasonic scaler. That is the part of a professional cleaning that a patient cannot do at home, at any level of diligence.\n\nThe part that matters most is below the gumline, where calculus holds bacteria against the root surface and drives the inflammation that becomes periodontal disease. Recall intervals are set from gum health and risk, not from habit — some patients genuinely need three months, others do fine at twelve.",
	},
	{
		id: 'flossing',
		title: 'What flossing reaches that brushing misses',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		video: HD + 'tooth-flossing.mp4',
		summary: "Why brushing alone leaves two of every five tooth surfaces untouched.",
		explainer: "Every tooth has five surfaces. A toothbrush reaches the outer, inner and biting surfaces well. It does not reach the two surfaces where the tooth contacts its neighbours, because the bristles cannot get into a contact point that is closed.\n\nThose contact surfaces are where interdental decay starts and where gum inflammation most often begins, for the simple reason that they are the least disturbed part of the mouth.\n\nFloss is one way to clean them. Where the gaps are large enough, interdental brushes are generally more effective and easier to use well — several studies favour them over floss for plaque removal between teeth. The right tool depends on the size of the spaces, which is worth asking about rather than guessing.",
	},
	{
		id: 'invisalign-first-day-he',
		title: 'Invisalign: your first day',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'Hebrew',
		video: clip('invisalign - first day hebrew master.mp4'),
		summary: "What the first day in a new set of aligners is supposed to feel like.",
		explainer: "A new aligner feels tight. That pressure is the appliance doing its job — each set is made slightly out of line with where the teeth currently sit, and the difference is the force that moves them.\n\nSoreness in the first day or two is normal and usually settles. Speech is often slightly altered at first and adapts within days. A lisp that persists for weeks is worth mentioning at the next appointment.\n\nWear time is the part patients control and the part that determines whether treatment finishes on schedule: typically 20 to 22 hours a day, out only for eating and drinking anything other than water. Aligners left out for hours mean teeth drift back, the next set no longer fits, and the plan slips.",
	},
	{
		id: 'baby-teeth-de',
		title: 'Milchzähne: warum sie zählen',
		type: 'Reel',
		topic: 'Preventive',
		language: 'German',
		video: clip('baby_teeth_de.mp4'),
		summary: "Warum Milchzähne mehr sind als Platzhalter.",
		explainer: "Milchzähne fallen aus — daraus wird oft geschlossen, dass Karies an ihnen nicht behandelt werden muss. Das ist ein Irrtum mit Folgen.\n\nMilchzähne halten den Platz für die bleibenden Zähne und führen sie beim Durchbruch an die richtige Stelle. Geht ein Milchzahn zu früh verloren, wandern die Nachbarzähne in die Lücke, und der bleibende Zahn findet keinen Platz mehr. Kieferorthopädischer Aufwand später ist häufig die direkte Folge.\n\nHinzu kommt: Eine tiefe Karies am Milchzahn kann den darunter liegenden Zahnkeim schädigen, und Schmerzen beim Kauen beeinflussen Ernährung und Sprachentwicklung. Deshalb werden Milchzähne behandelt und nicht einfach abgewartet.",
	},

	/* ── The hosted catalogue ──────────────────────────────────────────────────
	   Vimeo, folder VideoContents(English). Generated from the folder rather than
	   typed: titles are the source filenames tidied up, and topic and language are
	   inferred from them, so both are a starting point for editorial rather than a
	   finished catalogue. Nothing here has a summary or an explainer yet — the
	   dialog shows its empty-state copy until someone writes them.
	   ──────────────────────────────────────────────────────────────────────── */
	{
		id: 'if-i-don-t-brush-before-bed-german',
		title: 'If I don\'t brush before bed',
		type: 'Reel',
		topic: 'Preventive',
		language: 'German',
		vimeo: '1222921798',
		poster: 'https://i.vimeocdn.com/video/2196007928-1d90d7089b9c69749dfd3c84419fc2f8ece9837334422d5a45f0c7ba93ca3e4a-d_360?region=us',
	},
	{
		id: 'how-whitening-changes-the-color-of-your-teeth',
		title: 'How whitening changes the color of your teeth',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921799',
		poster: 'https://i.vimeocdn.com/video/2196007936-459cf0c73b7a50f93eabfbf5f655ebb578385d6e1dee0b21eefe4e9004b939cb-d_360?region=us',
	},
	{
		id: 'if-i-don-t-wear-my-retainer-german',
		title: 'If I don\'t wear my retainer',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'German',
		vimeo: '1222921800',
		poster: 'https://i.vimeocdn.com/video/2196007945-b241e06fbde223316b3b60fde7c06c360892a5821a69b64d241f77a425e16c7e-d_360?region=us',
	},
	{
		id: 'how-to-check-for-hidden-dental-problems',
		title: 'How to check for Hidden dental problems',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921785',
		poster: 'https://i.vimeocdn.com/video/2196007919-561b401a2f6595a2e19341f99676514113df8d92b02534f0ee5c744d0b666d2a-d_360?region=us',
	},
	{
		id: 'how-long-will-i-need-braces',
		title: 'How Long Will I Need Braces',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921777',
		poster: 'https://i.vimeocdn.com/video/2196007908-2bf355525c83a395bfd433c30d441a5bf044e48ae290ee4c5c02209610869a61-d_360?region=us',
	},
	{
		id: 'how-medication-affects-your-oral-health',
		title: 'How medication affects your oral health',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921778',
		poster: 'https://i.vimeocdn.com/video/2196007925-57daa4743e23f89f1227ab1f72ba044b363a22d5508dad8eca097601d8c6e2e6-d_360?region=us',
	},
	{
		id: 'how-many-aligners-will-i-need',
		title: 'How Many Aligners Will I Need',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921775',
		poster: 'https://i.vimeocdn.com/video/2196007922-24eaae67b15b31841bf996c0f4eb4e1efd153d81f235b8aacf63facc4749fba8-d_360?region=us',
	},
	{
		id: 'how-long-do-whitening-results-last',
		title: 'How long do whitening results last',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921765',
		poster: 'https://i.vimeocdn.com/video/2196007905-0bef08120f8c003ece9a8476db71484724d3304493a8a158ac794e47e6576bcf-d_360?region=us',
	},
	{
		id: 'how-long-do-veneers-last',
		title: 'How Long Do Veneers Last',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921764',
		poster: 'https://i.vimeocdn.com/video/2196007900-abfacc46746723ebcb90b055cea900b6859f3b01612054b9a858a2f7376b3a51-d_360?region=us',
	},
	{
		id: 'how-long-do-dental-implants-last',
		title: 'How long do dental implants last?',
		type: 'Reel',
		topic: 'Implants',
		language: 'English',
		vimeo: '1222921762',
		poster: 'https://i.vimeocdn.com/video/2196007897-a211e77a945514af4aa850d08d003c65cb2bb1f259a0c4875f2193eb2e2afbb9-d_360?region=us',
	},
	{
		id: 'how-does-invisalign-actually-move-my-teeth',
		title: 'How does Invisalign actually move my teeth',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921755',
		poster: 'https://i.vimeocdn.com/video/2196007903-cd89ac937cbbcedad6c5bb63483c32fa8ec9d8de8d463145d1ca9bc4a9ae5bae-d_360?region=us',
	},
	{
		id: 'how-does-teeth-whitening-work',
		title: 'How does teeth whitening work',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921759',
		poster: 'https://i.vimeocdn.com/video/2196007892-1a9cf6068ffcabdefbe20ccebb43c85d9bdf4b5482d0ccc42855524edece5230-d_360?region=us',
	},
	{
		id: 'how-does-a-bone-accept-and-implant',
		title: 'How does a bone accept and implant',
		type: 'Reel',
		topic: 'Implants',
		language: 'English',
		vimeo: '1222921751',
		poster: 'https://i.vimeocdn.com/video/2196007887-36a32065aadf7bc3a680554a537da9b237d0632735b9de5be1e584a9b66f299b-d_360?region=us',
	},
	{
		id: 'how-do-i-know-if-i-have-sleep-apnea',
		title: 'How Do I Know If I Have Sleep Apnea',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921744',
		poster: 'https://i.vimeocdn.com/video/2196007866-df2ba8ac38722f31f78aceeb18f1b4d1c34d64443d86928d160f0a931f799415-d_360?region=us',
	},
	{
		id: 'gum-disease-explained-spanish',
		title: 'Gum disease explained',
		type: 'Reel',
		topic: 'Preventive',
		language: 'Spanish',
		vimeo: '1222921739',
		poster: 'https://i.vimeocdn.com/video/2196008071-89522ca41d637358f5a9b7e12ae1f6bcdef30f9cf1ebd162354bc3960cff58e8-d_360?region=us',
	},
	{
		id: 'how-do-i-clean-my-aligners',
		title: 'How do I clean my aligners',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921734',
		poster: 'https://i.vimeocdn.com/video/2196007872-235cc04ccab367706675f62ad4dca2bc30d39732b71c055a34fa8ac7bbc2eb1c-d_360?region=us',
	},
	{
		id: 'gum-disease-explained',
		title: 'Gum disease explained',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921735',
		poster: 'https://i.vimeocdn.com/video/2196007886-bc5927733f6b1a7de27a21ac8ab046fa3b09fdbc6437aa2fef9668f2a3861716-d_360?region=us',
	},
	{
		id: 'gum-recession',
		title: 'Gum recession',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921725',
		poster: 'https://i.vimeocdn.com/video/2196008022-87bad1a7323cc56933c4149dcd5eceb8f1799e4f5820967bb99ce3a337db4f0e-d_360?region=us',
	},
	{
		id: 'gum-disease-explained-german',
		title: 'Gum disease explained',
		type: 'Reel',
		topic: 'Preventive',
		language: 'German',
		vimeo: '1222921716',
		poster: 'https://i.vimeocdn.com/video/2196007891-9d4ea0c7709249901a78a419fc2fe0eb4a36a0ce069d12759c78a07460259948-d_360?region=us',
	},
	{
		id: 'does-getting-veneers-hurt',
		title: 'Does getting veneers hurt?',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921701',
		poster: 'https://i.vimeocdn.com/video/2196007854-27b155904fcbbe87bdb1dd44744f44f9341cbf3eab4106f6783144153b4ca063-d_360?region=us',
	},
	{
		id: 'foods-that-ruin-your-braces-and-why',
		title: 'Foods that ruin your braces (and why)',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921703',
		poster: 'https://i.vimeocdn.com/video/2196007860-178113018a3e14c28e431ba3ce15eab3a940e459166615a6490a793b11ce760e-d_360?region=us',
	},
	{
		id: 'eccovision-acoustic-imaging-system',
		title: 'Eccovision Acoustic Imaging System',
		type: 'Reel',
		topic: 'Practice',
		language: 'English',
		vimeo: '1222921705',
		poster: 'https://i.vimeocdn.com/video/2196007951-dbbe53f4c3f69dcf22ed81f9bbb11d10ba417da33fb1935d6068fed4e1d30baa-d_360?region=us',
	},
	{
		id: 'does-enamel-grow-back-after-ipr',
		title: 'Does enamel grow back after IPR',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921695',
		poster: 'https://i.vimeocdn.com/video/2196007850-0315ceeca25e9189a261d4856ac17fdd7be19f29e755d5ab88fd6e1cec0681b9-d_360?region=us',
	},
	{
		id: 'does-a-broken-tooth-need-extraction',
		title: 'Does a Broken Tooth Need Extraction',
		type: 'Reel',
		topic: 'Restorative',
		language: 'English',
		vimeo: '1222921691',
		poster: 'https://i.vimeocdn.com/video/2196007832-560bf6a87d521582bb455e2cdabc975b8f9ad3b016e276e55fbfd9370408aced-d_360?region=us',
	},
	{
		id: 'do-veneers-ruin-your-teeth',
		title: 'Do veneers ruin your teeth',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921692',
		poster: 'https://i.vimeocdn.com/video/2196007836-94bbb8638fea8c06a90c908f3112afcaf6205a0377d011781d6e7015f3a4b703-d_360?region=us',
	},
	{
		id: 'does-getting-a-dental-implant-hurt',
		title: 'Does getting a dental implant hurt',
		type: 'Reel',
		topic: 'Implants',
		language: 'English',
		vimeo: '1222921694',
		poster: 'https://i.vimeocdn.com/video/2196007837-7c00d08dc72d584e907cf9142e0861ecf2c890a5eec28465f523ee573ee3d837-d_360?region=us',
	},
	{
		id: 'do-tongue-scrapers-actually-work',
		title: 'Do tongue scrapers actually work',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921689',
		poster: 'https://i.vimeocdn.com/video/2196007941-ec5c13009de9b86bc11e1eb89e952a786ad3df65bc9bccdbc4975cdd9394e8cf-d_360?region=us',
	},
	{
		id: 'do-i-have-to-wear-rubber-bands-spanish',
		title: 'Do I have to wear rubber bands',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'Spanish',
		vimeo: '1222921684',
		poster: 'https://i.vimeocdn.com/video/2196007825-75a854830bf3bbe164e797585433bf0adea9330022fa03bebf06ba28afd34f89-d_360?region=us',
	},
	{
		id: 'diastema-the-middle-gap-explained-spanish',
		title: 'Diastema — the middle gap explained',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'Spanish',
		vimeo: '1222921682',
		poster: 'https://i.vimeocdn.com/video/2196007830-33c505e45672c7c88488d6342db4656c396b6f34dc0dc5c7568f0c9c16618464-d_360?region=us',
	},
	{
		id: 'diastema-the-middle-gap-explained-german',
		title: 'Diastema — the middle gap explained',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'German',
		vimeo: '1222921683',
		poster: 'https://i.vimeocdn.com/video/2196007840-4e27c1c5445f3624658005ca75c5e550f8548d5ddb7c6d5ef2b7220349dc8a37-d_360?region=us',
	},
	{
		id: 'diastema-the-middle-gap-explained',
		title: 'Diastema — the middle gap explained',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921673',
		poster: 'https://i.vimeocdn.com/video/2196007831-32388714ca030ce41463237421fb02001a33c9dd30df9da924e80c80b8ce2713-d_360?region=us',
	},
	{
		id: 'crowded-teeth',
		title: 'Crowded teeth',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921674',
		poster: 'https://i.vimeocdn.com/video/2196007806-f2960fe197590a77ccea2676b7124caab1d91dccdf37ee238acb8bec3b60ebd7-d_360?region=us',
	},
	{
		id: 'dental-anxiety-isn-t-just-fear',
		title: 'Dental anxiety isn\'t just fear',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921668',
		poster: 'https://i.vimeocdn.com/video/2196007821-106ffc2d1de5958e55392847ced612e31dffc8a225a37f66661cef83df001733-d_360?region=us',
	},
	{
		id: 'dental-implants-silent-illustration',
		title: 'Dental Implants Silent illustration',
		type: 'Reel',
		topic: 'Implants',
		language: 'English',
		vimeo: '1222921670',
		poster: 'https://i.vimeocdn.com/video/2196007797-21bfce726459c89ffe6f20b6038668d2465d84832d9df4a9c37890c9e07dcbca-d_360?region=us',
	},
	{
		id: 'clicking-jaw-here-s-why',
		title: 'Clicking jaw — here\'s why',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921661',
		poster: 'https://i.vimeocdn.com/video/2196007802-5b327540efdc9b98c5926999c363fcf4bcddba5b6126795cf58fdf827dba25f5-d_360?region=us',
	},
	{
		id: 'clear-intention-for-your-future-smile',
		title: 'Clear intention for your future smile',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921658',
		poster: 'https://i.vimeocdn.com/video/2196007843-68ec9273299d6800ed908c0373ef72f0b525dae1659d8eb7e8dd4b9b6dd891b5-d_360?region=us',
	},
	{
		id: 'crowded-teeth-german',
		title: 'Crowded teeth',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'German',
		vimeo: '1222921659',
		poster: 'https://i.vimeocdn.com/video/2196007823-f3e85ccbe6d02d47c9484d0556eb6d0fd8c120f7a5fdaa394dbd535e2daf2738-d_360?region=us',
	},
	{
		id: 'cracked-tooth',
		title: 'Cracked Tooth',
		type: 'Reel',
		topic: 'Restorative',
		language: 'English',
		vimeo: '1222921649',
		poster: 'https://i.vimeocdn.com/video/2196007798-2db12397cd9465007d834c00c64ac4807cea7db61132114f9839817cac6d7b5e-d_360?region=us',
	},
	{
		id: 'causes-of-tmj',
		title: 'Causes of TMJ',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921641',
		poster: 'https://i.vimeocdn.com/video/2196007807-ec758dd8dd4ef84e66a7b9329c798e4601c0f42c8efe99bd8e2a72d9e6aec657-d_360?region=us',
	},
	{
		id: 'can-you-get-braces-if-you-have-cavities',
		title: 'Can You Get Braces If You Have Cavities',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921634',
		poster: 'https://i.vimeocdn.com/video/2196007775-29f4a4d3b42a0e620d3da69ae7a2dbbf0f45fcb216c7810cc42fad1d2b7891f3-d_360?region=us',
	},
	{
		id: 'can-you-get-veneers-with-crooked-teeth',
		title: 'Can You Get Veneers With Crooked Teeth',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921635',
		poster: 'https://i.vimeocdn.com/video/2196007776-b068392a61bba2b1093c36c0f64115dc261f14f0844cbd1e63b12af7bfefcd24-d_360?region=us',
	},
	{
		id: 'can-you-drink-coffee-while-wearing-invisalign',
		title: 'Can you drink coffee while wearing Invisalign',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921633',
		poster: 'https://i.vimeocdn.com/video/2196007781-da6542ccd23b4d6b5dd7d2d4e178a9b686cb929f2a0a690accc92f60179b9fa0-d_360?region=us',
	},
	{
		id: 'can-taking-out-your-invisalign-slow-down-treatme',
		title: 'Can taking out your Invisalign slow down treatment',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921625',
		poster: 'https://i.vimeocdn.com/video/2196007777-bad04e0499b3e5a95b1f0139071deac4489d429502520d708bb290e0e5940a30-d_360?region=us',
	},
	{
		id: 'can-i-eat-with-invisalign',
		title: 'Can I eat with Invisalign',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921620',
		poster: 'https://i.vimeocdn.com/video/2196007771-649394896a6bdc3e5f1862ef16ada725c5b880894082ecfe7ac138cfb5face1d-d_360?region=us',
	},
	{
		id: 'can-mouth-breathing-affect-your-teeth-and-gum',
		title: 'Can Mouth Breathing Affect Your Teeth And Gum',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921623',
		poster: 'https://i.vimeocdn.com/video/2196007768-c581330858f67f8065a2ecc2190865af7b7b9fb65edc42cba1ddba4cd9fe9a7f-d_360?region=us',
	},
	{
		id: 'can-gum-inflammation-affect-the-brain',
		title: 'Can gum inflammation affect the brain',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921624',
		poster: 'https://i.vimeocdn.com/video/2196007780-99d3915e7c4bb69af9e245f3a13aea1178f065ebaf16ce35adbf3a103bbcb68f-d_360?region=us',
	},
	{
		id: 'can-dentures-restore-facial-structure',
		title: 'Can dentures restore facial structure',
		type: 'Reel',
		topic: 'Implants',
		language: 'English',
		vimeo: '1222921614',
		poster: 'https://i.vimeocdn.com/video/2196007764-7d90f38ca67f6b29d984ad1b04a0f2655db60fd0b1c244302850b61cbf2d040a-d_360?region=us',
	},
	{
		id: 'can-chewing-gum-make-tmj-worse',
		title: 'Can Chewing Gum Make TMJ Worse',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921607',
		poster: 'https://i.vimeocdn.com/video/2196007750-11e38d1558f51076e068c7ee95d4b878ecfcfc86fcb8ccb70538db23d450687b-d_360?region=us',
	},
	{
		id: 'can-bacteria-get-between-a-veneer-and-your-tooth',
		title: 'Can Bacteria Get Between A Veneer And Your Tooth',
		type: 'Reel',
		topic: 'Cosmetic',
		language: 'English',
		vimeo: '1222921603',
		poster: 'https://i.vimeocdn.com/video/2196007787-2b4c965096bbb135273a9a918050a7ca021521b38a4f4ad664b6cd7be341f16b-d_360?region=us',
	},
	{
		id: 'can-an-infected-tooth-heal-on-its-own',
		title: 'Can an infected tooth heal on its own?',
		type: 'Reel',
		topic: 'Restorative',
		language: 'English',
		vimeo: '1222921593',
		poster: 'https://i.vimeocdn.com/video/2196007751-f18ba5c7346433c4c8dfbc83c66c8c6131cf1f9521f8e4d0167dee1a099113a7-d_360?region=us',
	},
	{
		id: 'can-aligners-collect-bacteria',
		title: 'Can aligners collect bacteria',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921592',
		poster: 'https://i.vimeocdn.com/video/2196007736-19af83510723207e363b3a977814d164e60d781c61effe2b16b39dfc1ad2c4ef-d_360?region=us',
	},
	{
		id: 'bruxism',
		title: 'Bruxism',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921586',
		poster: 'https://i.vimeocdn.com/video/2196007744-b8c9d670f848a5527c4564da8e2deb4cdfda6782f08345a9ecd8a937f69b521f-d_360?region=us',
	},
	{
		id: 'can-a-root-canal-tooth-get-another-infection',
		title: 'Can A Root Canal Tooth Get Another Infection?',
		type: 'Reel',
		topic: 'Restorative',
		language: 'English',
		vimeo: '1222921584',
		poster: 'https://i.vimeocdn.com/video/2196007745-3ad23fcf35f7625d79efb6757421547e93b71bf6b9b8d72f8d51dcdeb8287696-d_360?region=us',
	},
	{
		id: 'bumps-on-invisalign-german',
		title: 'Bumps on invisalign',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'German',
		vimeo: '1222921581',
		poster: 'https://i.vimeocdn.com/video/2196007720-f1a6f962d647079b744be751da4bb195372c53f5fa88f1b199c0131b85720e0f-d_360?region=us',
	},
	{
		id: 'bruxism-2',
		title: 'Bruxism',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921582',
		poster: 'https://i.vimeocdn.com/video/2196007741-684ecb85738169f8ce8f09529d89ee18a72c63724f0d02fd1fb2f9bfdba43021-d_360?region=us',
	},
	{
		id: 'braces-vs-aligners',
		title: 'Braces vs Aligners',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222921571',
		poster: 'https://i.vimeocdn.com/video/2196007714-a97bd9bb74c8584ab894e61bf0aa45a86adfe8b59410727a3ccbd3ff2503da57-d_360?region=us',
	},
	{
		id: 'brushing-hard-is-ruining-your-gums',
		title: 'Brushing hard is ruining your gums',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921572',
		poster: 'https://i.vimeocdn.com/video/2196007716-c9803a21b9e09504f961316fbee44960ac554f84712d7b9ac59deb57af0d29e0-d_360?region=us',
	},
	{
		id: 'brushing-do-s-and-don-t-s',
		title: 'Brushing do\'s and don\'t\'s',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921573',
		poster: 'https://i.vimeocdn.com/video/2196007717-190e10c4848b971d5558b43a18441e423bdec523d11299da9526bd58339f2361-d_360?region=us',
	},
	{
		id: 'bleeding-gums',
		title: 'Bleeding gums',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222921561',
		poster: 'https://i.vimeocdn.com/video/2196007721-62fa4e9ef710f249f0afdb28260b625e1a0291accf35b03d54aa9e91b0c2bbe6-d_360?region=us',
	},
	{
		id: 'braces-vs-aligners-hebrew',
		title: 'Braces Vs Aligners',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'Hebrew',
		vimeo: '1222921562',
		poster: 'https://i.vimeocdn.com/video/2196007710-2a3078fa8c009ee9db795739941803cd3595e2ce1d68441d4586a6ef598193ef-d_360?region=us',
	},
	{
		id: 'braces-vs-aligners-german',
		title: 'Braces Vs Aligners',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'German',
		vimeo: '1222921563',
		poster: 'https://i.vimeocdn.com/video/2196007706-62b3622ce1132cd30d99b19e7a53e76fc45370274edcc5da5d2a798a875cdc4a-d_360?region=us',
	},
	{
		id: 'baby-teeth-your-mouths-blueprint',
		title: 'Baby teeth — Your mouths blueprint',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222919110',
		poster: 'https://i.vimeocdn.com/video/2196005083-591859b478ed9002f1a3dd60c036acb6cd25231e6860da2d8adc0efc14ac24dd-d_360?region=us',
	},
	{
		id: 'bleeding-gums-2',
		title: 'Bleeding gums',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222919109',
		poster: 'https://i.vimeocdn.com/video/2196005270-c67c65a5ac5e621060782a271149e4b5f2efa60330dd4ada8db1fea609efc993-d_360?region=us',
	},
	{
		id: 'better-sleep-better-recovery',
		title: 'Better sleep — better recovery',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222919092',
		poster: 'https://i.vimeocdn.com/video/2196005267-5a6ce142c4df72548d8df07f8b9e8bc2fdb5f283d63d9561755fed6d54856485-d_360?region=us',
	},
	{
		id: 'are-my-gums-affecting-my-brain',
		title: 'Are my gums affecting my brain',
		type: 'Reel',
		topic: 'Preventive',
		language: 'English',
		vimeo: '1222919088',
		poster: 'https://i.vimeocdn.com/video/2196004900-ad16342378a4e1fa6c715091f6e300d48ab0b158260ad45f1e7179564ae6973a-d_360?region=us',
	},
	{
		id: 'am-i-a-candidate-for-invisalign',
		title: 'Am I a candidate for Invisalign',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'English',
		vimeo: '1222919082',
		poster: 'https://i.vimeocdn.com/video/2196005268-9bb49f9909fb57e29778ef826e0441e883bfc949a4864f85ec916d0f0a56a39a-d_360?region=us',
	},
	{
		id: 'invisalign-first-day-of-wearing-trays-german',
		title: 'Invisalign first day of wearing trays',
		type: 'Reel',
		topic: 'Orthodontics',
		language: 'German',
		vimeo: '1222919083',
		poster: 'https://i.vimeocdn.com/video/2196005269-d6c158783117b0792957a791c41b5eb5b995ad893c1e7e8fe7b17d4c008e00d5-d_360?region=us',
	},
];

/**
 * The values a facet actually has something under, in the catalogue's own
 * order. The filter bar is built from these rather than from the constants
 * above, so a facet nothing uses — Month, until the live catalogue lands —
 * renders no control at all instead of a row of dead chips.
 */
export type LibraryFacet = 'type' | 'topic' | 'language' | 'month';

export function facet(
	items: readonly LibraryItem[],
	key: LibraryFacet,
	order?: readonly string[],
): string[] {
	const present = new Set(
		items.map((item) => item[key]).filter((value): value is string => Boolean(value)),
	);
	if (order) return order.filter((value) => present.has(value));
	return [...present].sort((a, b) => a.localeCompare(b));
}

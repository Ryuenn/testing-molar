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
	/** Root-relative, percent-encoded — several filenames carry spaces. */
	video: string;
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

import type { Locale } from './config';

/**
 * Every string the site renders, in every locale it renders in.
 *
 * `en` is the source of truth and its shape is the contract: `de` is typed
 * against it, so a forgotten key fails the build rather than quietly leaving an
 * English sentence on a German page. That is the whole reason this is one file
 * instead of strings scattered through the components — a translation you can
 * forget is a translation that will be forgotten.
 *
 * Register: German is formal throughout (Sie, Ihre). The audience is practice
 * owners and clinicians being asked to spend money; du would read as a
 * consumer app talking to a dentist.
 *
 * NOT translated, deliberately:
 *   - the resource library's document titles and blurbs. The twelve PDFs behind
 *     them are written in English, so a German title on an English download
 *     would misrepresent what the visitor is about to get. The library's own
 *     chrome — search, sort, filters, headings — is translated, and the German
 *     page says the documents are in English.
 *   - the work grids, the profile screenshots and the DM captures. They are
 *     photographs of real accounts and real messages; their text is baked in.
 */
const en = {
	nav: {
		label: 'Primary',
		home: 'Home',
		work: 'Our work',
		results: 'Results',
		how: 'How it works',
		pricing: 'Pricing',
		resources: 'Resources',
		menu: 'Menu',
		/* `nav.language` is gone with the control it labelled — first the En/De
		   chips, then the Google Translate widget. `work.language` and
		   `library.language` are different strings on different surfaces and stay. */
		toHome: 'home',
		products: 'Products',
		login: 'Sign in',
		openMenu: 'Open the {name} menu',
		/*
			The Products panel is two stops now, in the order the site sells them.
			`menuEducation` and `menuComplete` are still here because
			/patient-education/ and /molar-complete/ are still routes with
			breadcrumbs that read these — they are simply not advertised as separate
			purchases any more. See the note on `NAV_LINKS` in `~/data/site`.
		*/
		menuSocial: 'MOLAR Social',
		menuSocialSub: 'Done-for-you dental content and social media management.',
		menuEducation: 'Patient Education',
		menuEducationSub: 'A searchable library of treatment and patient education videos.',
		menuTv: 'MOLAR TV',
		menuTvSub: 'Your branded waiting-room channel, plus 300+ patient videos.',
		menuComplete: 'MOLAR Complete',
		menuCompleteSub: 'The full MOLAR content ecosystem.',
		menuHow: 'How MOLAR works',
		menuHub: 'Resource hub',
		menuHubSub: 'Every free guide, script and checklist in one place.',
		menuLibrary: 'Video library',
		menuLibrarySub: 'Watch a sample of the patient education videos.',
		menuPatientGuides: 'Patient guides',
		menuPatientGuidesSub: 'Handouts written to give straight to a patient.',
		menuMarketing: 'Marketing guides',
		menuMarketingSub: 'Content and social strategy for dental practices.',
		menuTemplates: 'Templates',
		menuTemplatesSub: 'Ready-to-use documents for the practice.',
		menuFaq: 'FAQ',
		menuFaqSub: 'The questions practices actually ask.',
		menuAllResources: 'Browse all resources',
	},
	cta: {
		start: 'Start now',
		plans: 'See plans and pricing',
		sales: 'Talk with sales',
		heroPlans: 'See Plans & Pricing',
		heroResources: 'Free Resources',
		/* The hero's one button. */
		explore: 'Start 14-Day Free Trial',
		talk: 'Talk to MOLAR',
		exploreResources: 'Explore Resources',
	},
	site: {
		tagline: 'The content engine for dentistry.',
		positioning: 'The content infrastructure for modern dental practices.',
		description:
			'MOLAR is the content engine for modern dental practices: managed social media, a patient education video library, and branded waiting-room TV in one connected ecosystem.',
	},
	/*
		Section 01 — the hero.

		THREE strings, and that is the whole fold. It held eyebrow, headline, lede,
		offer, trust line, two card labels and five figure-band captions. The cards
		and the figure band went with the markup that rendered them; the eyebrow
		badge and the offer pill went because a fold that presents one button
		should not draw three things in the shape of one; and the trust line moved
		to `trust.heading`, over the logos that evidence it. See the block comment
		at the top of `~/components/sections/Hero`.

		`titleLead` and `titleAccent` are the two halves of one sentence, split so
		the second can be lit — not two sentences. The split falls after "Build
		Trust." so the accent lands on the promise rather than on the setup.
	*/
	hero: {
		titleLead: 'Educate Patients. Build Trust.',
		titleAccent: 'Help More Say Yes.',
		lede: 'MOLAR TV positions your practice as the trusted source for treatment education, with custom in-office TV playlists and 300+ patient videos on unlimited devices.',
	},
	/*
		Section 02 — the logo wall.

		One string, and it used to live under `hero.trust` because the hero said it
		too. The hero does not any more, so it belongs to the section that renders
		it above the sixteen marks that back it up.
	*/
	trust: {
		heading: 'Trusted by dental practices around the world',
	},
	/*
		The beat between MOLAR TV and the surfaces it runs on — why any of this
		matters. Four links in a chain; the order is the argument.
	*/
	understand: {
		heading: 'Patients Don’t Say Yes To What They Don’t Understand.',
		see: 'See it',
		understand: 'Understand it',
		trust: 'Trust the recommendation',
		confident: 'Feel more confident moving forward',
	},
	/* Where the education runs: the practice, the consultation, and afterwards. */
	everywhere: {
		eyebrow: 'Everywhere it matters',
		heading: 'Patient Education, Everywhere It Matters.',
		practiceWhen: 'Throughout the practice',
		practiceWhat: 'MOLAR TV on any screen, plus iPads carrying the full library.',
		consultWhen: 'During treatment conversations',
		consultWhat: 'Search 300+ videos and show the right explanation instantly.',
		afterWhen: 'After they leave',
		afterWhat:
			'Turn patients into followers, stay top of mind with MOLAR Social, and bring more unscheduled treatment back.',
	},
	reach: {
		titleLead: 'One platform.',
		titleAccent: 'Six continents.',
		note: 'and growing',
		eyebrow: 'Global reach',
		northAmerica: 'North America',
		southAmerica: 'South America',
		europe: 'Europe',
		africa: 'Africa',
		asia: 'Asia',
		australia: 'Australia',
	},
	film: {
		title: 'Turn every post into a patient education asset.',
		body: 'Your team can replay MOLAR videos during consultations, send them after appointments, or let patients discover them organically—creating consistent education before, during, and after every visit.',
		watch: 'Watch the film',
	},
	compare: {
		eyebrow: 'MOLAR vs. agencies',
		heading: 'The same output, without the retainer.',
		lede: 'What a practice actually gets for the money, side by side.',
		molar: 'MOLAR AI',
		agencies: 'Agencies',
		criteria: 'Comparison criteria',
		caption:
			'MOLAR AI compared with a traditional dental marketing agency across cost, speed, ownership, filming, contracts, languages and team.',
		cost: 'Cost',
		speed: 'Content speed',
		ownership: 'You own the content',
		filming: 'Filming required',
		contracts: 'Contracts',
		languages: 'Languages',
		team: 'Team',
		agencyCost: '$3,000–5,000/mo',
		agencySpeed: '2–4 weeks',
		agencyOwnership: 'No',
		agencyFilming: 'Yes',
		agencyContracts: '6+ months',
		agencyLanguages: 'Limited',
		agencyTeam: '1–2 editors',
		molarCost: '$497/mo',
		molarSpeed: '24 hours',
		molarOwnership: 'Yes',
		molarFilming: 'No',
		molarContracts: 'None',
		molarLanguages: 'All',
		molarTeam: 'Full-stack AI',
	},
	close: {
		heading: 'Own the feed in your city.',
		lede: 'Go live in 24 hours. No filming, no contracts, no agencies — just daily content patients actually want to watch.',
		note: 'Cancel anytime · Prices in USD',
	},
	footer: {
		product: 'Product',
		resources: 'Resources',
		follow: 'Follow us',
		getStarted: 'Get started',
		/* The brand column. `site.positioning` was the old line and is still what
		   the meta description uses; this one names the category in six words. */
		pitch: 'Patient education built for modern dental practices.',
		reachLine: '{practices} practices · {countries} countries · {regions} continents',
		startOffer: 'MOLAR TV — {price}/month',
		startNote: '{n} days free. Cancel anytime.',
		needMore: 'Need Social or Enterprise?',
		allGuides: 'View all {n} resources',
		newTab: '(opens in a new tab)',
		products: 'Products',
		company: 'Company',
		legal: 'Legal',
	},
	crumbs: {
		home: 'Home',
	},
	pages: {
		libraryTitle: 'Video library — patient education, ready to post',
		libraryDesc:
			'A sample of the patient-education videos MOLAR produces: filter by topic and language, and watch them without leaving the page.',
		homeTitle: 'MOLAR TV — patient education for dental practices, $97/month',
		workTitle: 'Our work — no two feeds alike',
		workDesc:
			'A sample of the accounts MOLAR AI runs: nine consecutive posts from each, across {n} languages. Same engine, and no two feeds alike.',
		workIntro: 'The same engine. No two feeds alike.',
		workLede:
			'A sample of the accounts we run — nine consecutive posts from each, in {n} languages. Nothing here is a mockup: every grid is what a patient saw when they opened the profile.',
		resultsTitle: 'Results — what the content did',
		resultsDesc:
			'One dental practice went from a single post and 159 followers to 152 posts and 10.2K. The profile screenshots, the numbers, and the messages other practices sent afterwards.',
		resultsIntro: 'What the content actually did.',
		resultsLede:
			'One account we run, screenshotted before and after — and the messages other practices sent once they saw the work in their feed. No composites, no reconstructions, no rounded-up figures.',
		howTitle: 'How it works — live the same day',
		howDesc:
			'Four steps between subscribing and the first post going out: choose a plan, connect your accounts, set your branding, go live. No filming, no contracts, no agencies.',
		howIntro: 'Subscribe today. Posting tomorrow.',
		howLede:
			'There is no onboarding project, no content workshop and no filming day. You pick a plan, connect your accounts, tell us what the practice looks like — and the publishing starts.',
		pricingTitle: 'Pricing',
		pricingDesc:
			'MOLAR plans and pricing — MOLAR TV at $97/month, Lite at $497/month, Premium at $1,497/month, Enterprise on quote. No long-term contracts. Cancel anytime.',
		homeDesc:
			'MOLAR TV positions your practice as the trusted source for treatment education: custom in-office TV playlists and 300+ patient videos on unlimited devices. $97/month, 14 days free.',
		socialTitle: 'MOLAR Social — social media for dental practices',
		socialDesc:
			'Done-for-you dental content and social media management. Reels, carousels and patient education branded to your practice, published on schedule. From $497/month, live in 24 hours.',
		socialIntro: 'Your social media. Without becoming a content creator.',
		socialLede:
			'Custom dental content created, branded and managed for your practice. No filming day, no content calendar, no agency meetings.',
		educationTitle: 'Patient Education Library — $97/month',
		educationDesc:
			'A searchable library of patient education videos for chairside use, consultation rooms and waiting-room screens. $97/month per practice, unlimited devices.',
		educationIntro: 'Answer treatment questions visually. In seconds.',
		educationLede:
			"Search the patient's question. Hit play. Help them understand treatment — chairside, in the consult room, or looping in the waiting room.",
		tvTitle: 'MOLAR TV — patient education for your waiting room',
		tvDesc:
			'Branded waiting-room TV content and loops for dental practices. Your logo, your colours, MOLAR educational content — on the screen you already own.',
		tvIntro: 'Turn your waiting room TV into a patient education channel.',
		tvLede:
			'The screen is already on the wall and already switched on. MOLAR TV is what it should be playing.',
		completeTitle: 'MOLAR Complete — the whole content ecosystem',
		completeDesc:
			'Social media, patient education and in-practice content as one system: one content plan across the entire patient journey, built for practices, groups and DSOs.',
		completeIntro: 'One practice. One content ecosystem.',
		completeLede:
			'Social, Education and MOLAR TV from one system — so the reel that found a patient, the loop in reception and the video at the chair are all saying the same thing.',
		/* The /customers/ page is gone — see the note at the top of
		   `~/pages/social-media`, which absorbed its four evidence sections. Its
		   title, description, intro and lede went with it. */
		resourcesTitle: 'AI for dentists — free guides, tools and workflows',
		resourcesDesc:
			'Practical guides, prompts and workflows to help dental practices use AI across sales, marketing, CRM, patient education and operations. Free, and nothing to buy.',
	},
	work: {
		eyebrow: 'The work',
		heading: 'A sample of the feeds we run.',
		lede: 'Nine consecutive posts from each, in {n} languages. They came off the same pipeline in the same week, and not one of them looks like another — because a practice that publishes content indistinguishable from the practice down the road has not been marketed, it has been wallpapered.',
		featured: 'Featured',
		specialty: 'Specialty',
		market: 'Market',
		language: 'Language',
		palette: 'Palette',
		alt: "Nine consecutive posts from {practice}'s feed: {specialty} in {language}, in {a} and {b}.",
	},
	growth: {
		/*
			The eyebrow used to be "Case 01" with the handle appended — and `.eyebrow`
			uppercases, so it rendered as CASE 01 — @DRPATRICIAHARROSCH: a real
			person's name set in caps with no spaces, which is a way of getting
			somebody's name wrong. It names the product and the kind of proof
			instead, and the handle appears where it belongs — in the figcaption
			under the screenshots, where it is provenance rather than a label.
		*/
		eyebrow: 'MOLAR Social — case study',
		heading: 'Build The Online Brand Your Dentistry Deserves.',
		lede: 'Turn patient education into a premium digital presence that builds authority, keeps your practice top of mind, and reflects the level of care you provide.',
		/* The figure, as the sub-heading over the exhibit. */
		delta: '{before} → {after} followers',
		body: '{name} used consistent patient education to build a global audience of both patients and dental professionals.',
		bodyTwo:
			'Today, her content does more than generate views — it positions her as a recognized voice in dentistry, keeps her expertise visible beyond the practice, and builds trust before patients ever sit in the chair.',
		/* The line above the CTA. Short, and it is the point of the whole section. */
		punch: 'Patient education builds more than understanding. It builds authority.',
		cta: 'Explore MOLAR Social',
		before: 'Before — {n} followers',
		after: 'After — {n} followers',
		beforeRead: '1 post · 159 followers',
		afterRead: '152 posts · 10.2K followers',
		source:
			'Unretouched screenshots of the public profile at {handle}. The figures beside them are transcribed from the screenshots; the lines underneath are our reading of what changed.',
		filmLabel: 'In her words',
		filmPlay: 'Play the testimonial from {name}',
		wasLabel: 'What the account was',
		becameLabel: 'What it became',
		followers: 'followers',
		altBefore:
			'Instagram profile for {handle} showing 1 post, 159 followers and a single post in the grid.',
		altAfter:
			'The same Instagram profile showing 152 posts, 10.2K followers and a full grid of patient education posts.',
		was1: 'Easy to overlook',
		was2: 'Inconsistent online presence',
		was3: 'Limited patient awareness',
		was4: 'No authority at scale',
		became1: 'Recognized by dental professionals worldwide',
		became2: 'Patients regularly mention the content',
		became3: 'Premium branding that builds trust',
	},
	inbound: {
		eyebrow: 'Inbound',
		heading: 'Then other dentists started asking who makes them.',
		lede: 'None of these were solicited, and none of them are from patients. They are messages from other practices — orthodontists, practice owners, dental groups — who found the work in their feed and wrote in to ask where it came from. {asking} of the {total} below ask that question outright.',
		source:
			"Screenshots as received, cropped only to the message. The redactions are the senders' privacy, not ours — names, handles and profile details are covered because a practice writing in for advice did not write in to be quoted by name. Roles and cities are as far as we are prepared to identify anyone.",
		alt: 'Instagram message: “{quote}”',
		dm: 'Instagram DM',
		story: 'Instagram story',
		orthodontist: 'Orthodontist',
		owner: 'Practice owner',
		dentist: 'Dentist',
		group: 'Dental group',
		austria: 'Austria',
		usa: 'United States',
		texas: 'Texas',
		la: 'Los Angeles',
		detroit: 'Detroit',
	},
	how: {
		eyebrow: 'How it works',
		heading: 'One setup. Fully automated.',
		lede: 'Four steps between subscribing and the first post going out — and all four happen the same day.',
		step1: 'Subscribe',
		step1body:
			'Choose the plan that fits the practice. No sales call, no onboarding fee, no minimum term.',
		step2: 'Connect your accounts',
		step2body:
			'Securely link Instagram, Facebook and YouTube through the official APIs. Two minutes, once.',
		step3: 'Customize your brand',
		step3body:
			'Logo, colors, treatments, tone, the cases worth leading with. Everything MOLAR produces inherits it.',
		step4: 'Go live',
		step4body:
			'Branded patient education starts posting automatically, on schedule, without another meeting.',
	},
	/*
		The plans, rewritten to the 09/01 brief.

		Two of the four were renamed and all four were re-pitched. MOLAR Starter is
		MOLAR Lite, because "starter" describes where a buyer is rather than what
		they get; the "Patient Education Library" tier is MOLAR TV, because that is
		what the whole site now calls the $97 product and a price list is the last
		place a product should acquire a second name.

		Every feature line reads as a thing that happens rather than a capability
		the platform has — "No filming required", "Live within 24 hours" — which is
		the difference between a spec sheet and an offer.
	*/
	pricing: {
		eyebrow: 'Plans',
		/*
			The same line the home page's plans band uses as its eyebrow — see
			`social.eyebrow`. Deliberate: it is the question the grid answers, and a
			visitor who arrives here from that band should land on the sentence they
			clicked.

			It replaced "Pick your level. Go live in 24 hours." — two claims, one of
			which ("24 hours") is a delivery promise that only holds for the two
			social tiers. MOLAR TV is live the day you sign up and Enterprise is
			quoted, so the headline was making a guarantee three of the four cards
			underneath it do not make.
		*/
		headline: 'Choose How Much You Want MOLAR To Handle.',
		lede: 'No long-term contracts. Cancel anytime.',
		footnote: 'Prices in USD. No long-term contracts. Cancel anytime.',
		badge: 'Most Popular',
		perMonth: '/mo',
		perYear: '/yr',
		custom: 'Custom',
		code: 'Code',
		/* The MOLAR TV billing switch. */
		billingLabel: 'Billing period for MOLAR TV',
		monthly: 'Monthly',
		annual: 'Annual',
		annualSaving: 'About {monthly}/month — a saving of {saving}.',
		annualNote: 'Billed in full today · No free trial on annual · Cancel anytime',
		/*
			Not "Start free trial": annual has no trial, and there is no annual
			Payment Link in this repo. See the ⚠️ in `~/components/sections/Pricing`.
		*/
		annualCta: 'Talk to MOLAR about annual',
		/* Across both social cards, under the plan grid. */
		socialNote:
			'No agency meetings. No content calendar headaches. No filming days. Just social media handled.',
		educationName: 'MOLAR TV',
		educationSummary: 'Educate patients. Build trust. Help more say yes.',
		educationBlurb:
			'Your own waiting-room channel, plus the whole library to play chairside and in the consult room.',
		educationCta: 'Start Free Trial',
		educationNote: '14 days free, then billed monthly · Cancel anytime',
		l1: 'Custom MOLAR TV',
		l2: '300+ patient education videos',
		l3: 'Unlimited devices',
		l4: 'If we don’t have the treatment video you need, we’ll create it and add it to the library',
		l5: '14-day free trial',
		starterName: 'MOLAR Lite',
		starterSummary: 'Your social media, handled.',
		starterBlurb:
			'Subscribe, connect your accounts, and MOLAR takes over the content creation, copy, scheduling and posting. Live within 24 hours.',
		starterCta: 'Take Social Off My Plate',
		starterNote: 'Cancel anytime · Live within 24 hours',
		premiumName: 'MOLAR Premium',
		premiumSummary: 'Your entire social presence. On autopilot.',
		premiumBlurb:
			'MOLAR builds and runs the brand your dentistry deserves — without an agency, production team, or hours spent managing content. Connect once. Go live within 24 hours.',
		premiumCta: 'Put My Social On Autopilot',
		premiumNote: 'Cancel anytime · Client Portal access included',
		enterpriseName: 'MOLAR Enterprise',
		enterpriseSummary: 'One content system. Every brand. Every location.',
		enterpriseBlurb: 'For DSOs · Multi-location groups · Medical device companies · Dental educators',
		enterpriseCta: 'Talk to MOLAR',
		enterpriseNote: 'Built for groups, DSOs, and multi-location practices.',
		s1: 'Everything in MOLAR TV',
		s2: '3 posts per week across all major platforms',
		s3: 'English content',
		s4: 'Upload portal access',
		s5: 'No filming required',
		s6: 'No writing, editing, scheduling, or posting',
		p1: 'Everything in MOLAR TV',
		p2: 'Daily content across all major platforms',
		p3: 'Any language',
		p4: 'Priority upload fulfillment',
		p5: 'Custom video requests',
		p6: 'AI transformation before & afters',
		p7: 'No filming, copywriting, editing, scheduling, or posting',
		e1: 'Everything in Premium',
		e2: 'MOLAR TV customized by location',
		e3: 'Multi-location branding and localization',
		e4: 'Custom content and licensing',
		e5: 'Centralized deployment at scale',
	},
	/*
		The resource hub, repositioned by the 09/01 brief.

		It was "the MOLAR resource library" — a shelf of branded handouts. It is an
		AI-for-dentists hub now: the guides are the same twelve documents, but the
		page argues for understanding AI rather than listing PDFs.

		The brief also said "no selling here". The video library's $97 panel came
		off the top of the page for that once, went back by request, and is off
		again — so the `brief*` strings below head that slot as the brief lays it
		out, and there are two lead captures on the page: `brief*` above the grid
		and `ahead*` under it.

		Nothing on this page asks for money now. The library's own doorway is the
		quiet link under the grid.
	*/
	resources: {
		eyebrow: 'AI for dentists',
		heading: 'AI Is Changing Dentistry. Make Sure Your Practice Benefits From It.',
		lede: 'Practical guides, tools, workflows, and training to help dentists use AI across sales, marketing, patient communication, CRM, operations, automation, and growth.',
		lede2: 'Built for dental teams who want to understand AI and actually use it in their practice.',
		/*
			The lead capture above the grid — the brief's "Lead Capture" block,
			verbatim. `briefTopics` is its own line rather than part of the lede
			because the brief sets it as one: six words with separators, which reads
			as a list of what arrives and not as a sentence.
		*/
		briefEyebrow: 'The Dental AI Brief',
		briefHeading: 'Get The AI Strategies Dentists Can Actually Use.',
		briefLede: 'Tools, prompts, workflows, and ideas to help you run a smarter practice.',
		briefTopics: 'Sales · Marketing · CRM · Patient Education · Operations · Automation',
		briefCta: 'Join Free',
		briefNote: 'Free. Practical. Built for dental practices. Unsubscribe anytime.',
		/* The grid itself. */
		libraryTitle: 'Resource Library',
		libraryHeading: 'Learn It. Use It. Share It With Your Team.',
		libraryLede:
			'Free resources designed to help dental practices put AI to work without wasting hours figuring everything out themselves.',
		/* The community band between the grid and the closing capture. */
		communityHeading: 'Built For Dentists Figuring Out What’s Next.',
		communityBody:
			'AI is moving fast. MOLAR is building a growing community of dental professionals learning how to use it practically — not just talking about it.',
		communityKicker: 'Better systems. Better tools. Smarter practices.',
		/* The lead capture at the foot. */
		aheadHeading: 'Stay Ahead Of What’s Changing.',
		aheadLede:
			'Get the newest AI tools, workflows, prompts, and practical ideas for dental practices.',
		aheadCta: 'Get The Dental AI Brief',
		aheadNote: 'No fluff. Just useful AI for dentistry.',
		englishNote: 'The documents themselves are written in English.',
		all: 'All',
		allResources: 'All resources',
		filterBy: 'Filter resources by category',
		search: 'Search resources',
		searchPlaceholder: 'Search by title, topic or category…',
		clearSearch: 'Clear search',
		sort: 'Sort',
		sortFeatured: 'Featured',
		sortNewest: 'Newest first',
		sortTitle: 'A–Z',
		sortShortest: 'Quickest read',
		showingAll: 'Showing all {n} resources',
		showingIn: 'Showing {n} resources in {category}',
		nothingYet: 'Nothing matches that yet.',
		clearFilters: 'Clear filters',
		back: 'Back to resources',
		share: 'Share',
		linkCopied: 'Link copied',
		downloadPdf: 'Download PDF',
		offerTitle: 'Get the full guide as a PDF',
		offerLede: 'Save it, print it, hand it to the team. No email required.',
		download: 'Download',
		pages: '{n} pages',
	},
	library: {
		crumb: 'Video library',
		eyebrow: 'Video library',
		heading: 'Patient education, already made.',
		lede: 'A sample of the videos we produce for MOLAR practices. Narrow it to what you need and watch it right here.',
		/* The `hub*` five are the promo panel at the head of /resources/ — the
		   library's doorway. `hubCta` is also the quiet link under the grid on the
		   same page, so the panel and the fallback say the same thing. */
		hubTitle: 'Video Library',
		hubBlurb: 'Over 300 patient education videos across 40+ treatments, with new ones added every day. Play them chairside, in the consult room, or on the waiting room screen.',
		hubCta: 'Access the library',
		hubAccess: 'Paid access',
		hubUnlock: 'Unlock the library',
		all: 'All',
		filterBy: 'Filter the library',
		search: 'Search the content library',
		searchPlaceholder: 'Search by title or topic…',
		clearSearch: 'Clear search',
		topic: 'Topic',
		type: 'Type',
		month: 'Month',
		language: 'Language',
		showing: 'Showing {n} of {total}',
		loadMore: 'Load {n} more',
		nothing: 'Nothing matches those filters yet.',
		clearFilters: 'Clear filters',
		watch: 'Watch video',
		openTab: 'Open in a new tab',
		about: 'About this topic',
				noScript: 'No write-up for this one yet.',
		videoFailed: 'This one will not play here.',
		close: 'Close',
		preview: 'Preview',
	},
	/*
		Section 02 — the ecosystem diagram. Five surfaces fed by one system.
		`<key>A` and `<key>B` are the two examples under each surface's name.
	*/
	eco: {
		eyebrow: 'The big idea',
		heading: 'One content system. Everywhere your patients look.',
		lede: 'Social media, chairside education and the screen in the waiting room are usually three separate jobs bought from three separate suppliers. MOLAR makes them one.',
		core: 'MOLAR',
		coreSub: 'One content system',
		socialName: 'Social',
		socialA: 'Instagram and Facebook',
		socialB: 'Reels and carousels',
		chairsideName: 'Chairside',
		chairsideA: 'Patient education',
		chairsideB: 'Treatment explanations',
		consultName: 'Consult room',
		consultA: 'Treatment presentations',
		consultB: 'Patient conversations',
		waitingName: 'Waiting room',
		waitingA: 'MOLAR TV',
		waitingB: 'Educational loops',
		hubName: 'Resource hub',
		hubA: 'Guides and documents',
		hubB: 'Templates and scripts',
		key: 'MOLAR turns one content ecosystem into multiple patient touchpoints — before, during, and after the appointment.',
	},
	/* Section 03 — the three ways in. The merger point between the two funnels. */
	choose: {
		eyebrow: 'Choose your MOLAR',
		heading: 'Choose how MOLAR works for you.',
		lede: 'Three ways into the same content ecosystem. Start at any one of them.',
		opt1: 'We create it for you.',
		opt2: 'Your team uses it.',
		opt3: 'Everything.',
	},
	/*
		The four products. `<key>Line` is the one-phrase position, `<key>Blurb` the
		sentence under the name, and `<featureKey><n>` the bullets — see
		`~/data/products` for which prefix belongs to which product.
	*/
	products: {
		eyebrow: 'Products',
		from: 'From',
		quoted: 'Custom pricing',
		perMonth: '/month',
		included: 'What you get',
		socialName: 'Managed Social Media',
		socialLine: 'We create it for you.',
		socialBlurb:
			'Custom dental content created, branded, and managed for your practice — published on schedule without a filming day.',
		socialCta: 'View Social Plans',
		soc1: 'Reels, carousels and stills built around your treatments',
		soc2: 'Your logo, your colours, your tone of voice',
		soc3: 'Captions, scheduling and publishing included',
		soc4: 'Instagram, Facebook and YouTube Shorts',
		soc5: 'Live within 24 hours of subscribing',
		educationName: 'Patient Education Library',
		educationLine: 'Your team uses it.',
		educationBlurb:
			'Instant access to a library of patient education videos for chairside use, consultation rooms and waiting-room screens.',
		educationCta: 'Explore the Library',
		edu1: 'Search by treatment and play it in seconds',
		edu2: 'Built for chairside, consult room and waiting room',
		edu3: 'New videos added continuously',
		edu4: 'Unlimited devices in the practice',
		edu5: 'No filming, no editing, no production time',
		tvName: 'MOLAR TV',
		tvLine: 'Your screen plays it.',
		tvBlurb:
			'Branded waiting-room content and loops, so the screen already on your wall is teaching instead of filling time.',
		tvCta: 'See MOLAR TV',
		tv1: 'Your logo and your colours on every frame',
		tv2: 'Educational loops built for a muted screen',
		tv3: 'Practice messaging between the education',
		tv4: 'Playlists you can leave running all day',
		tv5: 'Works on the screen you already own',
		completeName: 'MOLAR Complete',
		completeLine: 'Everything.',
		completeBlurb:
			'Social, Education and in-practice content as one system, with one team behind it and one place to manage it.',
		completeCta: 'Build Your MOLAR System',
		cmp1: 'Everything in Managed Social Media',
		cmp2: 'Everything in the Patient Education Library',
		cmp3: 'MOLAR TV on every screen in the practice',
		cmp4: 'One content plan across the whole patient journey',
		cmp5: 'Built for multi-location practices, groups and DSOs',
	},
	/*
		Section 04 — the social plans. The three tiers themselves come from
		`pricing.*`; this is only the band they sit in.
	*/
	social: {
		/*
			The eyebrow names the choice rather than the category. "Social media
			management" described three of the four cards under it and not the one
			the page is actually selling; this band is where a visitor decides how
			much of the job to hand over, from a $97 screen to a full presence.
		*/
		eyebrow: 'Choose how much you want MOLAR to handle',
		heading: 'Your social media. Without becoming a content creator.',
		lede: 'Four plans, one engine. Every one of them publishes branded patient education to your practice on schedule.',
		notSure: 'Not sure which plan fits your practice?',
		findPlan: 'Find My Plan',
	},
	/* Section 05 — show it, do not explain it. */
	showcase: {
		eyebrow: 'The work',
		heading: 'Dental content patients actually want to watch.',
		lede: 'Nothing below is a mockup. Every clip was delivered to a practice and every grid is what a patient saw when they opened the profile.',
		cta: 'See more of the work',
		reelsName: 'Reels',
		reelsBody: 'Short-form treatment explainers, narrated and captioned.',
		carouselsName: 'Carousels',
		carouselsBody: 'Multi-slide breakdowns patients swipe through and save.',
		animationsName: 'Animations',
		animationsBody: 'What is happening under the gum, drawn rather than described.',
		graphicsName: 'Educational graphics',
		graphicsBody: 'Stills that answer one question and stay on the grid.',
		explainersName: 'Treatment explainers',
		explainersBody: 'The consultation conversation, filmed once and reusable.',
		brandingName: 'Practice branding',
		brandingBody: 'Palette, type and layout built per practice, not per template.',
		educationName: 'Patient education videos',
		educationBody: 'The library your team searches during an appointment.',
	},
	/* Section 06 — client proof. Only figures the rest of the site evidences. */
	proofwall: {
		eyebrow: 'Client proof',
		heading: 'Built for practices like yours.',
		lede: 'Real accounts, real grids, real messages. The practices below are a sample of the feeds MOLAR runs — pick one and read nine consecutive posts exactly as they went out.',
		specialty: 'Specialty',
		cta: 'See all the work',
	},
	/* Section 07 — countries and languages, under the world map. */
	geo: {
		eyebrow: 'Global reach',
		heading: 'Dental is global. So is MOLAR.',
		lede: 'Content adapted for practices, audiences and languages around the world.',
		countriesLabel: 'Markets on record',
		languagesLabel: 'Languages published',
		note: 'The markets listed here are the ones evidenced elsewhere on this site — a practice whose feed states its city, or a message that named where it was sent from. The map above is the wider picture.',
	},
	/* Section 08 — the Patient Education Library. The $97 offer. */
	edu: {
		eyebrow: 'Patient education',
		heading: 'Stop explaining the same treatment 20 times a day.',
		lede: 'Search it. Show it. Continue the conversation.',
		/* Must match `EDUCATION_DEMO.resultId` — see the ⚠️ on that field. */
		demoQuery: 'teeth whitening',
		searchLabel: 'Search the library',
		searchPlaceholder: 'What is a bone graft?',
		demoNote: 'A real entry from the library, shown exactly as the page renders it.',
		topResult: 'Top result',
		related: 'Related videos',
		play: 'Play',
		statVideosLabel: 'Patient education videos',
		statDailyLabel: 'New videos added daily',
		statDevicesValue: 'Unlimited',
		statDevicesLabel: 'Devices per location',
		perMonth: '/month',
		priceNote: 'Per practice. Cancel anytime.',
		useChairside: 'Chairside',
		useChairsideSub: 'Play it on the operatory screen mid-appointment.',
		useConsult: 'Consult room',
		useConsultSub: 'Walk through a treatment plan without drawing it twice.',
		useWaiting: 'Waiting room',
		useWaitingSub: 'Leave a loop running on the screen in reception.',
		useFollow: 'After the visit',
		useFollowSub: 'Send the link home so the answer survives the car park.',
		cta: 'Explore Patient Education',

		/* The offer, as it is actually sold. See ~/data/education. */
		trial: '14-day free trial',
		trialLong: 'Free for {n} days. Then {price}/month. Cancel anytime.',
		trialCta: 'Start the free trial',
		browseCta: 'Browse the library',
		billedFrom: 'billed monthly, from month two',
		annual: 'Or {price} a year — about {monthly}/month, a saving of {saving}.',
		annualNote: 'Annual is billed in full today and has no free trial. It adds a waiting-room loop branded with your logo, colours and practice name.',
		startFree: 'Start your free trial',
		startFreeThen: 'Start free — then {price}/month',
		cancelBefore: 'Cancel any time before the trial ends and you are not charged.',
		cancelBeforeLong: 'Cancel any time before the trial ends and you are not charged. Multi-location practice or DSO? See the FAQ below.',
		planName: 'Patient Education Library',
		planLede: 'One plan. Everything included.',
		/* The offer, rendered above the list and given its own weight. */
		planLead: 'Full access today — nothing to pay for {n} days',
		plan1: 'The full library — 300+ videos across 40+ treatments',
		plan2: '5+ new videos added every day',
		plan3: 'Chairside player, consult-room screens and waiting-room loop',
		plan4: 'One practice location, unlimited devices',
		plan5: 'No app required — works in any browser',
		plan6: 'Cancel anytime, no contract',

		/* What's inside. */
		insideEyebrow: "What's inside",
		insideHeading: 'A video for nearly every conversation you have.',
		insideLede: 'Search what your patient just asked, or browse by treatment.',
		insidePrompt: 'What is your patient asking?',
		q1: 'Does whitening damage my teeth?',
		q2: 'Why do I need a bone graft?',
		q3: 'What actually happens during a root canal?',
		q4: 'Braces or Invisalign?',
		topicsLabel: 'Browse by treatment',

		/* The without/with argument. */
		contrastHeading: 'The more they understand, the easier the conversation becomes.',
		contrastLede: 'Patients hesitate when treatment feels confusing. MOLAR gives them a clear visual explanation so they can understand what you are recommending, ask better questions, and make a more confident decision.',
		withoutLabel: 'Without a library',
		withLabel: 'With the MOLAR library',
		without1: 'A patient asks a question you have answered a hundred times, and you explain it again from scratch.',
		with1: 'Pull up the exact answer chairside, in plain language, on video.',
		without2: 'Consult-room time gets eaten up by basic explanations.',
		with2: 'Walk through the options together, video alongside the conversation.',
		without3: 'Patients leave unsure and go and Google their symptoms later.',
		with3: 'Loop it in the waiting room so patients arrive with context already.',
		without4: 'Treatment gets put off simply because it was not understood.',
		with4: 'Patients ask better questions and leave with a clearer decision.',

		/* Four steps. */
		stepsEyebrow: 'How it works',
		stepsHeading: 'Live in your practice today.',
		stepStart: 'Start free',
		stepStartSub: 'Full access for {n} days.',
		stepSearch: 'Search',
		stepSearchSub: 'Type the patient\u2019s question, or browse by treatment.',
		stepPlay: 'Hit play',
		stepPlaySub: 'Use it chairside, in the consult room, or on your screens.',
		stepGrow: 'Keep growing',
		stepGrowSub: 'New videos added every day.',

		/* Against commissioning video. */
		cmpEyebrow: 'Versus filming it',
		cmpHeading: 'Skip the production budget.',
		cmpLede: 'What a library costs against having the same explanations filmed one at a time.',
		cmpCaption: 'The MOLAR Patient Education Library compared with commissioning video, across cost, time to launch, treatments covered, filming, languages and contract.',
		cmpCriteria: 'Comparison criteria',
		cmpLibrary: 'Library access',
		cmpDiy: 'DIY or freelance video',
		cmpCost: 'Cost',
		cmpLibCost: '{price}/month',
		cmpDiyCost: '$500–$2,000+ per video',
		cmpLaunch: 'Time to launch',
		cmpLibLaunch: 'Instant access',
		cmpDiyLaunch: 'Weeks per video',
		cmpCoverage: 'Treatments covered',
		cmpLibCoverage: '40+, growing daily',
		cmpDiyCoverage: 'Whatever you can budget for',
		cmpFilming: 'Filming required',
		cmpLibFilming: 'None',
		cmpDiyFilming: 'Yes',
		cmpLanguages: 'Languages',
		cmpLibLanguages: 'English, Spanish, German, Hebrew',
		cmpDiyLanguages: 'Usually English only',
		cmpContract: 'Contract',
		cmpLibContract: 'None',
		cmpDiyContract: 'Varies',

		/* The library's own FAQ and close. */
		faqHeading: 'Everything you are wondering.',
		closeHeading: 'Never explain the same treatment from scratch again.',
		closeLede: 'Patient asks. Search MOLAR. Hit play. Continue the conversation.',
	},
	/* Real client quotes. The quotes themselves are never translated — see
	   ~/data/testimonials — but the chrome around them is. */
	testimonials: {
		eyebrow: 'In their words',
		fromPractice: 'From a practice actually using MOLAR',
		watch: 'Watch {name}',
		heading: 'What Practices Are Saying',
		anonymous: 'Verified MOLAR practice',
		nameWithheld: 'Name withheld at the practice\u2019s request',
		/* The one ask under the wall. Same label as the MOLAR TV section's. */
		cta: 'Start Your 14-Day Free Trial',
	},
	/* Section 09 — MOLAR TV. */
	tv: {
		eyebrow: 'MOLAR TV',
		heading: 'Educate Patients Before The Conversation Starts.',
		lede: 'MOLAR TV turns waiting time into branded treatment education that helps patients understand your recommendations before they sit down with you.',
		nowPlaying: 'Now playing',
		screenAlt: 'A wall-mounted screen in a dental waiting room playing MOLAR TV patient education loops.',
		/*
			What is on the screen, said as what the practice gets rather than as
			content genres. It listed "Trusted content / Case videos / Testimonials /
			Animations / Practice info / Promotions", which is a description of a
			playlist; this is a description of a channel that belongs to them.
		*/
		playTreatments: 'Your treatments',
		playDoctors: 'Your doctors',
		playEducation: 'Patient education',
		playBranding: 'Custom practice branding',
		playVideos: 'Treatment-focused videos',
		playQr: 'Instagram QR',
		/*
			Four tiles, down from six.

			The six were three brand attributes (logo, colours, branding) that said
			the same thing three times, and three MOLAR attributes (educational
			content, custom loops, waiting-room playback) that described the
			mechanism rather than the offer. These four each carry a different
			claim, and each keeps the practice — not MOLAR — as the subject.
		*/
		featBrand: 'Your Brand',
		featBrandSub: 'Logo, colours, practice identity.',
		featTreatments: 'Your Treatments',
		featTreatmentsSub: 'Content focused on the care you provide.',
		featDoctors: 'Your Doctors',
		featDoctorsSub: 'Keep your practice at the centre of the education.',
		featChannel: 'Your Channel',
		featChannelSub: 'A custom loop built for your waiting room.',
		ctaTrial: 'Start 14-Day Free Trial',
	},
	/* Section 10 — the patient journey. The same five surfaces, in order. */
	journey: {
		eyebrow: 'The patient journey',
		heading: 'One practice. One content ecosystem.',
		lede: 'MOLAR connects content across the entire patient journey — from the scroll that finds you to the link they open at home.',
		step: 'Step',
		discoverTitle: 'Patient discovers your practice',
		discoverWhere: 'Instagram Reel',
		discoverBody: 'They find you mid-scroll, months before they are ready to book, and by the time they call they already know the work.',
		arriveTitle: 'Patient enters your practice',
		arriveWhere: 'Waiting room TV',
		arriveBody: 'The screen in reception is running education about the treatment they came in to ask about.',
		askTitle: 'Patient asks about treatment',
		askWhere: 'MOLAR Education Library',
		askBody: 'Your team searches the library by treatment and plays the answer in seconds.',
		explainTitle: 'Dentist explains treatment',
		explainWhere: 'Chairside video',
		explainBody: 'The same explainer runs on the operatory screen, so consent conversations get shorter and clearer.',
		continueTitle: 'Patient continues learning',
		continueWhere: 'Practice resources',
		continueBody: 'They leave with a link and a guide, and the explanation survives the drive home.',
		close: 'One system carried it the whole way.',
	},
	/* Section 11 — customer stories. */
	customers: {
		eyebrow: 'Customer stories',
		heading: 'What happens when patients understand more?',
		lede: 'Three of the accounts MOLAR runs, and what each practice is running with. Every grid is nine consecutive posts as they went out.',
		using: 'Running',
		resultLabel: 'Read off the public profile',
		resultPhysimed: '{from} → {value} followers',
		readStory: 'Read the full story',
		allCta: 'See all the work',
		languageLabel: 'Published in',
	},
	/* Section 13 — why MOLAR. Six blocks, six objections. */
	why: {
		eyebrow: 'Why MOLAR',
		heading: 'Built exclusively for dentistry.',
		lede: 'Not a marketing agency that took a dental client. Every part of this was built for one industry.',
		dentalTitle: 'Dental-first content',
		dentalBody: 'No generic agency templates. Every asset starts from a treatment, not from a content calendar.',
		educateTitle: 'Made to educate',
		educateBody: 'Content designed around the questions patients actually ask, in the words they ask them in.',
		screensTitle: 'Built for every screen',
		screensBody: 'Phone, chairside, consultation room, waiting room. The same asset works on all four.',
		growingTitle: 'Always growing',
		growingBody: 'New education content is added continuously, so the library is bigger next month than it is today.',
		globalTitle: 'Globally usable',
		globalBody: 'Content designed for multiple markets and languages, including right-to-left.',
		oneTitle: 'One ecosystem',
		oneBody: 'Social, education and in-practice media from one system, not three suppliers who have never spoken.',
	},
	/* Section 14 — the product selector. */
	selector: {
		eyebrow: 'Product selector',
		heading: 'How do you want to use MOLAR?',
		lede: 'Pick the sentence that sounds like your practice.',
		socialSay: 'Run my social media.',
		educationSay: 'Give my team the Patient Education Library.',
		completeSay: 'I want the entire content ecosystem.',
		exploreSocial: 'Explore Social',
		exploreEducation: 'Explore Education',
		buildSystem: 'Build My MOLAR System',
		notSure: 'Not sure which one is right for you?',
		talk: 'Talk to MOLAR',
	},
	/* Section 15 — the closing band. */
	/*
		The close. The same promise the fold opened on, said once more with the
		price attached — by this point a visitor has seen the product, the proof
		and the plans, and the last thing the page should do is add a new claim.

		`second` used to be the turn in a two-line argument ("your patients are
		already consuming content" → "make sure it helps your practice"). It is
		the offer now: what you get, in one line, under the headline.
	*/
	final: {
		heading: 'Educate Patients. Build Trust. Help More Say Yes.',
		second: 'Custom MOLAR TV plus 300+ patient education videos, across unlimited devices.',
		/*
			The offer, in the brief's shorthand. It lived under `hero.offer` while
			the fold quoted a price too; the fold does not any more, and this is the
			only place that says it this way.

			`edu.trialLong` is the same offer as a full sentence, which is what the
			product pages run. Both interpolate the figure and the day count from the
			two constants in `~/data/education`, so no surface can disagree with the
			checkout about what is being charged.
		*/
		offer: '{price}/month · {n} days free',
		cta: 'Start Free Trial',
		note: 'Trusted across {countries} countries · {regions} continents',
	},
	notFound: {
		title: 'Page not found',
		lede: 'That link points at something that is not here. It may have moved, or never existed.',
		home: 'Back to home',
	},
} as const;

/**
 * The shape every other locale has to fill.
 *
 * `en` is `as const`, so its values are literal types — without widening them,
 * `de` would be required to contain the *English sentences*, which is exactly
 * backwards. This keeps the key structure mandatory (a missing key still fails
 * the build) while letting each value be any string.
 */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

export type Dict = Widen<typeof en>;


/**
 * Every locale the site renders in.
 *
 * English only. The hand-mirrored German routes under `src/pages/de/` and the
 * `de` dictionary that fed them are gone — the site is published in English and
 * offers Google's own translation widget in the nav for everything else, which
 * is one set of copy to keep true instead of two.
 *
 * The machinery around this is intact: `Dict` is still the contract, `UI` is
 * still keyed by locale, and `localizePath` still normalises prefixes. Adding a
 * locale back means a full block here and a mirrored route tree, nothing more.
 */
export const UI: Record<Locale, Dict> = { en };

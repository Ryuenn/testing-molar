export interface ComparisonRow {
	label: string;
	molar: string;
	agency: string;
	/** `true` renders the MOLAR cell as an affirmative mark rather than plain text. */
	molarWins: boolean;
}

export const COMPARISON: ComparisonRow[] = [
	{ label: 'Cost', molar: '$497/mo', agency: '$3,000–5,000/mo', molarWins: true },
	{ label: 'Content speed', molar: '24 hours', agency: '2–4 weeks', molarWins: true },
	{ label: 'You own the content', molar: 'Yes', agency: 'No', molarWins: true },
	{ label: 'Filming required', molar: 'No', agency: 'Yes', molarWins: true },
	{ label: 'Contracts', molar: 'None', agency: '6+ months', molarWins: true },
	{ label: 'Languages', molar: 'All', agency: 'Limited', molarWins: true },
	{ label: 'Team', molar: 'Full-stack AI', agency: '1–2 editors', molarWins: true },
];

import type { Mat } from '#lib/math/mat.js';

export interface LessonMeta {
	/** URL slug within the chapter, e.g. "span" */
	slug: string;
	title: string;
	/** one-line promise shown on the map */
	blurb: string;
	minutes: number;
	/** where this lives in the PDF notes, e.g. "ch-01 §2.3" */
	notesRef: string;
	advanced?: boolean;
}

export interface Chapter {
	/** "ch01" ... matches the note file numbering */
	id: string;
	n: number;
	title: string;
	blurb: string;
	/** accent hue (0-360) for the chapter node */
	hue: number;
	lessons: LessonMeta[];
}

interface QBase {
	/** globally unique, stable across edits: "ch01.span.3" */
	id: string;
	/** text with optional inline $math$ */
	prompt: string;
	/** worked solution, shown once the question is solved or revealed */
	explain: string;
	/**
	 * Progressive hints, gentlest first. Each one should move the student a concrete step
	 * (what to compute, which fact to use) without stating the final answer.
	 * Using any hint means the answer no longer counts as first try.
	 */
	hints?: string[];
	/** where it comes from, e.g. "Notes, Exercise 2.19" */
	source?: string;
}

/** Feedback for a specific wrong answer a student is likely to give. */
export interface Slip {
	value: number | number[];
	note: string;
}

/** Extra teaching material merged onto a question by id (see content/enrich). */
export interface Enrich {
	hints?: string[];
	/** mcq only: one explanation per choice, in the same order as `choices` */
	notes?: string[];
	slips?: Slip[];
}

export type Question = QBase &
	(
		| {
				type: 'mcq';
				choices: string[];
				answer: number;
				/** why each choice is right or wrong, same order as `choices` */
				notes?: string[];
		  }
		| { type: 'numeric'; answer: number; tol?: number; slips?: Slip[] }
		| { type: 'vector'; answer: number[]; tol?: number; slips?: Slip[] }
		/**
		 * A proof, explanation or construction that cannot be auto-graded: the student works it out,
		 * reveals the model solution, and marks themselves.
		 */
		| { type: 'open'; solution: string }
		/** drag the arrow tip onto the target */
		| {
				type: 'goal-vector';
				target: [number, number];
				start?: [number, number];
				tol?: number;
				/** do not draw the target dot (the answer must be computed) */
				hideTarget?: boolean;
		  }
		/** drag both basis arrows so the matrix equals `target` (columns = images of i-hat, j-hat) */
		| { type: 'goal-basis'; target: Mat; tol?: number }
	);

export type QuizBank = Record<string, Question[]>;

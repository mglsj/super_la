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
	/** shown after answering */
	explain: string;
	/** nudge revealed on request; a hint means the answer no longer counts as clean */
	hint?: string;
}

export type Question = QBase &
	(
		| { type: 'mcq'; choices: string[]; answer: number }
		| { type: 'numeric'; answer: number; tol?: number }
		| { type: 'vector'; answer: number[]; tol?: number }
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

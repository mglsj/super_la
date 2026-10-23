import type { Question, Slip } from './types';

/** "2.19" -> "2-19", so ids stay dot-separated: ch01.exercises.2-19 */
const idOf = (chapter: string, num: string) => `${chapter}.exercises.${num.replace('.', '-')}`;
const base = (chapter: string, num: string, prompt: string, hints: string[], explain: string) => ({
	id: idOf(chapter, num),
	source: `Notes, Exercise ${num}`,
	prompt,
	hints,
	explain
});

/** A proof, construction or multi-part exercise: work it out, reveal the model solution, self-grade. */
export const open = (chapter: string, num: string, prompt: string, hints: string[], solution: string): Question => ({
	...base(chapter, num, prompt, hints, solution),
	type: 'open',
	solution
});

export const numeric = (
	chapter: string,
	num: string,
	prompt: string,
	answer: number,
	hints: string[],
	explain: string,
	opts: { tol?: number; slips?: Slip[] } = {}
): Question => ({ ...base(chapter, num, prompt, hints, explain), type: 'numeric', answer, ...opts });

export const vector = (
	chapter: string,
	num: string,
	prompt: string,
	answer: number[],
	hints: string[],
	explain: string,
	opts: { tol?: number; slips?: Slip[] } = {}
): Question => ({ ...base(chapter, num, prompt, hints, explain), type: 'vector', answer, ...opts });

export const mcq = (
	chapter: string,
	num: string,
	prompt: string,
	choices: string[],
	answer: number,
	notes: string[],
	hints: string[],
	explain: string
): Question => ({ ...base(chapter, num, prompt, hints, explain), type: 'mcq', choices, answer, notes });

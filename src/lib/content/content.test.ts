import { describe, expect, it } from 'vitest';
import { allLessons, chapters } from './chapters';
import { exercisesFor, isReady, questionIndex, quizFor } from './registry';
import { mpow } from '../math/mat';

describe('content registry', () => {
	it('every lesson has a component and a quiz of at least 3 questions', () => {
		for (const l of allLessons) {
			expect(isReady(l.id), `${l.id} has no lesson file`).toBe(true);
			expect(quizFor(l.id).length, `${l.id} quiz size`).toBeGreaterThanOrEqual(3);
		}
	});

	it('question ids are unique and belong to their lesson', () => {
		const seen = new Set<string>();
		for (const l of allLessons) {
			for (const q of quizFor(l.id)) {
				expect(q.id.startsWith(l.id + '.'), q.id).toBe(true);
				expect(seen.has(q.id), `duplicate ${q.id}`).toBe(false);
				seen.add(q.id);
			}
		}
		const exerciseCount = chapters.reduce((n, c) => n + exercisesFor(c.id).length, 0);
		expect(Object.keys(questionIndex).length).toBe(seen.size + exerciseCount);
	});

	it('multiple-choice answers are in range', () => {
		for (const l of allLessons) {
			for (const q of quizFor(l.id)) {
				if (q.type === 'mcq') {
					expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
					expect(q.answer, q.id).toBeLessThan(q.choices.length);
				}
			}
		}
	});
});

describe('teaching material', () => {
	const lessonQuestions = allLessons.flatMap((l) => quizFor(l.id));
	const exerciseQuestions = chapters.flatMap((c) => exercisesFor(c.id));

	it('every question has at least two concrete hints', () => {
		for (const q of [...lessonQuestions, ...exerciseQuestions]) {
			expect(q.hints?.length ?? 0, `${q.id} hints`).toBeGreaterThanOrEqual(2);
			// the first hint explains the idea; later ones may shrink to the bare set-up of the calculation
			expect(q.hints?.[0].length ?? 0, `${q.id} first hint too short`).toBeGreaterThan(24);
			for (const h of q.hints ?? []) {
				expect(h.length, `${q.id} hint too short`).toBeGreaterThan(6);
				// "Re-read X" is only a hint if it says what to look for
				expect(/^re-?read/i.test(h) && h.length < 60, `${q.id} vague hint`).toBe(false);
			}
		}
	});

	it('every multiple-choice question explains every choice', () => {
		for (const q of [...lessonQuestions, ...exerciseQuestions]) {
			if (q.type !== 'mcq') continue;
			expect(q.notes?.length, `${q.id} notes`).toBe(q.choices.length);
			for (const n of q.notes ?? []) expect(n.length, `${q.id} empty note`).toBeGreaterThan(8);
		}
	});

	it('every enrich entry belongs to a real question', () => {
		const modules = import.meta.glob<{ enrich: Record<string, unknown> }>('./enrich/*.ts', { eager: true });
		for (const m of Object.values(modules)) {
			for (const id of Object.keys(m.enrich)) expect(questionIndex[id], `orphan enrich ${id}`).toBeDefined();
		}
	});

	it('each chapter carries the nine exercises from the notes, numbered consecutively', () => {
		for (const c of chapters) {
			const ex = exercisesFor(c.id);
			expect(ex.length, `${c.id} exercise count`).toBe(9);
			const nums = ex.map((q) => Number((q.source ?? '').replace('Notes, Exercise ', '').split('.')[1]));
			for (let i = 1; i < nums.length; i++) expect(nums[i], `${c.id} numbering`).toBe(nums[i - 1] + 1);
			const ids = new Set(ex.map((q) => q.id));
			expect(ids.size, `${c.id} duplicate exercise ids`).toBe(ex.length);
		}
	});
});

describe('mpow', () => {
	it('powers of the Fibonacci matrix are Fibonacci numbers', () => {
		const A = [
			[1, 1],
			[1, 0]
		];
		expect(mpow(A, 5)[0][1]).toBe(5);
		expect(mpow(A, 0)).toEqual([
			[1, 0],
			[0, 1]
		]);
	});
});

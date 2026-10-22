import { describe, expect, it } from 'vitest';
import { allLessons } from './chapters';
import { isReady, questionIndex, quizFor } from './registry';
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
		expect(Object.keys(questionIndex).length).toBe(seen.size);
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

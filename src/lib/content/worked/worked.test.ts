import { describe, expect, it } from 'vitest';
import { det, inverse, mpow, mul, mulVec, transpose } from '../../math/mat';
import { rank, rref } from '../../math/gauss';

const close = (a: number[][], b: number[][]) => a.forEach((r, i) => r.forEach((x, j) => expect(x).toBeCloseTo(b[i][j], 9)));

/** The numbers quoted in the worked examples, recomputed independently. */
describe('worked example arithmetic', () => {
	it('independence and bases (ch05)', () => {
		const A = transpose([
			[1, 0, 2, 1],
			[2, 1, 3, 1],
			[0, 1, -1, -1]
		]);
		expect(rank(A)).toBe(2);
		expect(mulVec(A, [2, -1, 1])).toEqual([0, 0, 0, 0]);
		for (const a of [3, -2, 0.5]) expect(det(transpose([[1, 0, a], [0, 1, 1], [a, 1, 2]]))).toBeCloseTo(1 - a * a, 9);
		expect(det(transpose([[1, -1, 0], [0, 1, -1], [1, 0, -1]]))).toBeCloseTo(0, 9);
		const P = transpose([[1, 2, 0], [0, 1, 1], [1, 0, 1]]);
		expect(det(P)).toBeCloseTo(3, 9);
		expect(mulVec(P, [2, -1, 0])).toEqual([2, 3, -1]);
		expect(mulVec(P, [1, 2, -1])).toEqual([0, 4, 1]);
		const J = [[1, 2], [0, 1]];
		const X = [[3, 5], [0, 3]];
		expect(mul(X, J)).toEqual(mul(J, X));
	});

	it('four subspaces (ch04)', () => {
		const A = [[1, 3, 1, 2], [2, 6, 3, 5], [1, 3, 0, 1]];
		const r = rref(A);
		expect(r.pivots).toEqual([0, 2]);
		close(r.result, [[1, 3, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0]]);
		expect(mulVec(A, [-3, 1, 0, 0])).toEqual([0, 0, 0]);
		expect(mulVec(A, [-1, 0, -1, 1])).toEqual([0, 0, 0]);
		expect(mulVec(transpose(A), [-3, 1, 1])).toEqual([0, 0, 0, 0]);
	});

	it('linear maps (ch06)', () => {
		const B = [[2, 1], [1, 1]];
		const M = [[1, 0], [3, 2]];
		const T = mul(M, inverse(B)!);
		close(T, [[1, -1], [1, 1]]);
		const S = [[1, 0], [0, -1]];
		close(mul(S, T), [[1, -1], [-1, -1]]);
		close(mul(T, S), [[1, 1], [1, -1]]);
		close(inverse(T)!, [[0.5, 0.5], [-0.5, 0.5]]);
		const A = [[5, -6], [3, -4]];
		close(mul(inverse(B)!, mul(A, B)), [[2, 0], [0, -1]]);
		expect(mpow(A, 3)).toEqual([[17, -18], [9, -10]]);
		expect(rank([[1, -1, 1], [1, 1, 1]])).toBe(2);
	});

	it('determinants (ch07)', () => {
		expect(det([[0, 2, 2, 0], [1, 2, -1, 1], [-1, 0, 4, 2], [1, 2, 1, 5]])).toBeCloseTo(4, 9);
		const A = [[1, 2, 0], [0, 1, 1], [1, 0, 1]];
		const adj = [[1, -2, 2], [1, 1, -1], [-1, 2, 1]];
		expect(det(A)).toBeCloseTo(3, 9);
		close(mul(A, adj), [[3, 0, 0], [0, 3, 0], [0, 0, 3]]);
		expect(mulVec(A, [2, -1, 1])).toEqual([0, 0, 3]);
		expect(det([[1, 2, 3], [0, 1, 4], [5, 6, 0]])).toBeCloseTo(1, 9); // sanity on the cofactor question's matrix
	});
});

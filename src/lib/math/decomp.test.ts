import { describe, expect, it } from 'vitest';
import { cholesky, cond, eigSym, expm, frob, kron, lowRank, pinv, svd, vec } from './decomp';
import { mul, mulVec, transpose, type Mat } from './mat';
import { gaussMatrix } from './rng';

const close = (A: Mat, B: Mat, eps = 1e-7) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < eps));

describe('eigSym', () => {
	it('diagonalises a symmetric matrix', () => {
		const A = [[2, 1, 0], [1, 3, 1], [0, 1, 4]];
		const { values, vectors } = eigSym(A);
		for (let k = 0; k < 3; k++) {
			const v = vectors.map((r) => r[k]);
			const av = mulVec(A, v);
			av.forEach((x, i) => expect(x).toBeCloseTo(values[k] * v[i], 7));
		}
		expect(values[0]).toBeGreaterThanOrEqual(values[1]);
		expect(values.reduce((s, x) => s + x, 0)).toBeCloseTo(9);
	});
	it('2x2 example', () => {
		expect(eigSym([[2, 1], [1, 2]]).values.map((x) => Math.round(x * 1e6) / 1e6)).toEqual([3, 1]);
	});
});

describe('svd', () => {
	it('reconstructs A and orders singular values', () => {
		const A = [[3, 1], [1, 2], [0, 1]];
		const { U, S, V } = svd(A);
		const D = S.map((s, i) => S.map((_, j) => (i === j ? s : 0)));
		expect(close(mul(mul(U, D), transpose(V)), A)).toBe(true);
		expect(S[0]).toBeGreaterThanOrEqual(S[1]);
	});
	it('handles wide matrices', () => {
		const A = [[1, 2, 3], [4, 5, 6]];
		const { U, S, V } = svd(A);
		const D = S.map((s, i) => S.map((_, j) => (i === j ? s : 0)));
		expect(close(mul(mul(U, D), transpose(V)), A)).toBe(true);
	});
	it('singular values of [[1,1],[0,1]]', () => {
		const { S } = svd([[1, 1], [0, 1]]);
		expect(S[0] * S[1]).toBeCloseTo(1);
		expect(S[0]).toBeCloseTo((1 + Math.sqrt(5)) / 2);
	});
	it('condition number and pseudoinverse', () => {
		expect(cond([[2, 0], [0, 1]])).toBeCloseTo(2);
		expect(cond([[1, 2], [2, 4]])).toBe(Infinity);
		const A = [[1, 0], [0, 1], [1, 1]];
		const P = pinv(A);
		expect(close(mul(P, A), [[1, 0], [0, 1]])).toBe(true);
	});
	it('rank-one truncation is exact for a rank-one matrix', () => {
		const A = [[1, 2], [2, 4]];
		expect(close(lowRank(A, 1), A)).toBe(true);
		expect(frob(lowRank([[3, 0], [0, 1]], 1))).toBeCloseTo(3);
	});
});

describe('cholesky', () => {
	it('factors SPD and rejects indefinite', () => {
		const A = [[4, 2], [2, 3]];
		const L = cholesky(A)!;
		expect(close(mul(L, transpose(L)), A)).toBe(true);
		expect(cholesky([[1, 2], [2, 1]])).toBeNull();
	});
});

describe('expm, kron, vec', () => {
	it('exp of a rotation generator is a rotation', () => {
		const t = 0.7;
		const R = expm([[0, -t], [t, 0]]);
		expect(close(R, [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]], 1e-9)).toBe(true);
	});
	it('exp of a diagonal matrix', () => {
		const E = expm([[1, 0], [0, 2]]);
		expect(E[0][0]).toBeCloseTo(Math.E, 8);
		expect(E[1][1]).toBeCloseTo(Math.E ** 2, 8);
	});
	it('vec(AXB) = (B^T kron A) vec(X)', () => {
		const A = [[1, 2], [0, 1]];
		const B = [[2, 0], [1, 3]];
		const X = [[1, 2], [3, 4]];
		const lhs = vec(mul(mul(A, X), B));
		const rhs = mulVec(kron(transpose(B), A), vec(X));
		lhs.forEach((x, i) => expect(x).toBeCloseTo(rhs[i]));
	});
	it('kron has the expected block structure', () => {
		expect(kron([[1, 2]], [[0, 1], [1, 0]])).toEqual([[0, 1, 0, 2], [1, 0, 2, 0]]);
	});
});

describe('rng', () => {
	it('is reproducible', () => {
		expect(gaussMatrix(2, 2, 7)).toEqual(gaussMatrix(2, 2, 7));
	});
});

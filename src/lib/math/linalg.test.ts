import { describe, expect, it } from 'vitest';
import { angle, approxVec, cross, dot, gramSchmidt, projectOnto } from './vec';
import { det, inverse, mul, mulVec, rotation } from './mat';
import { classify, nullSpace, rank, rref } from './gauss';
import { eigen2 } from './eigen';
import { fitLine, projectionMatrix } from './proj';

describe('vec', () => {
	it('dot, angle, cross', () => {
		expect(dot([1, 2, 3], [4, 5, 6])).toBe(32);
		expect(angle([1, 0], [0, 1])).toBeCloseTo(Math.PI / 2);
		expect(cross([1, 2, 3], [4, 5, 6])).toEqual([-3, 6, -3]);
	});
	it('projects (3,2.5) onto (4,0)', () => {
		expect(approxVec(projectOnto([3, 2.5], [4, 0]), [3, 0])).toBe(true);
	});
	it('gram-schmidt is orthonormal', () => {
		const q = gramSchmidt([
			[1, 1, 0],
			[1, 0, 1],
			[0, 1, 1]
		]);
		expect(q).toHaveLength(3);
		expect(dot(q[0], q[1])).toBeCloseTo(0);
		expect(dot(q[1], q[2])).toBeCloseTo(0);
	});
});

describe('mat', () => {
	it('det and inverse', () => {
		expect(det([[1, 2], [3, 4]])).toBe(-2);
		expect(det([[2, 0, 0], [0, 3, 0], [0, 0, 4]])).toBe(24);
		const inv = inverse([[1, 2], [3, 4]])!;
		expect(mul([[1, 2], [3, 4]], inv)[0][0]).toBeCloseTo(1);
		expect(inverse([[1, 2], [2, 4]])).toBeNull();
	});
	it('rotation by 90 degrees sends i to j', () => {
		expect(approxVec(mulVec(rotation(Math.PI / 2), [1, 0]), [0, 1])).toBe(true);
	});
});

describe('gauss', () => {
	it('solves a 2x2 system', () => {
		const { result } = rref([[1, 1, 3], [1, -1, 1]]);
		expect(result[0][2]).toBeCloseTo(2);
		expect(result[1][2]).toBeCloseTo(1);
	});
	it('classifies systems', () => {
		expect(classify([[1, 1, 3], [1, -1, 1]])).toBe('unique');
		expect(classify([[1, 1, 3], [2, 2, 7]])).toBe('none');
		expect(classify([[1, 1, 3], [2, 2, 6]])).toBe('infinite');
	});
	it('rank and null space', () => {
		const a = [[1, 2, 3], [2, 4, 6]];
		expect(rank(a)).toBe(1);
		const ns = nullSpace(a);
		expect(ns).toHaveLength(2);
		for (const v of ns) expect(approxVec(mulVec(a, v), [0, 0])).toBe(true);
	});
});

describe('eigen2', () => {
	it('symmetric matrix', () => {
		const e = eigen2([[2, 1], [1, 2]]);
		expect([...e.values].sort()).toEqual([1, 3]);
	});
	it('rotation has complex eigenvalues', () => {
		expect(eigen2(rotation(1)).complex).not.toBeNull();
	});
	it('eigenvectors satisfy Av = lambda v', () => {
		const A = [[4, 1], [2, 3]];
		const e = eigen2(A);
		e.values.forEach((l, i) => {
			const av = mulVec(A, e.vectors[i]);
			expect(approxVec(av, e.vectors[i].map((x) => x * l), 1e-8)).toBe(true);
		});
	});
});

describe('proj', () => {
	it('projection matrix sends (1,2,3) to (1,2,0)', () => {
		const P = projectionMatrix([[1, 0], [0, 1], [0, 0]])!;
		expect(approxVec(mulVec(P, [1, 2, 3]), [1, 2, 0])).toBe(true);
	});
	it('fits y = 2x + 1 exactly', () => {
		const f = fitLine([[0, 1], [1, 3], [2, 5]])!;
		expect(f.m).toBeCloseTo(2);
		expect(f.c).toBeCloseTo(1);
	});
});

import { lu } from './gauss';
import { fmtNum, texMatrix } from './tex';

describe('lu', () => {
	it('factors and multiplies back', () => {
		const A = [[2, 1, 1], [4, 3, 3], [8, 7, 9]];
		const f = lu(A)!;
		const P = mul(f.L, f.U);
		A.forEach((r, i) => r.forEach((x, j) => expect(P[i][j]).toBeCloseTo(x)));
		expect(f.L[1][0]).toBeCloseTo(2);
		expect(f.L[2][0]).toBeCloseTo(4);
		expect(f.U[2][2]).toBeCloseTo(2);
	});
	it('needs a swap when the pivot is zero', () => {
		expect(lu([[0, 1], [1, 0]])).toBeNull();
	});
});

describe('tex', () => {
	it('formats numbers and matrices', () => {
		expect(fmtNum(0.5)).toBe('\\frac{1}{2}');
		expect(texMatrix([[1, 2]])).toContain('\\begin{bmatrix}');
		expect(fmtNum(-3)).toBe('-3');
		expect(texMatrix([[1, 2], [3, 4]])).toContain('bmatrix');
		expect(texMatrix([[1, 2, 3]], 1)).toContain('c|c');
	});
});

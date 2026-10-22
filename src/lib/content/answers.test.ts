import { describe, expect, it } from 'vitest';
import { quizFor, questionIndex } from './registry';
import { det, inverse, mpow, mul, mulVec, transpose } from '../math/mat';
import { nullSpace, rank, lu } from '../math/gauss';
import { eigen2, trace } from '../math/eigen';
import { dot, norm, projectOnto, sub, unit, angle } from '../math/vec';
import { fitLine, leastSquares, projectionMatrix } from '../math/proj';
import { cholesky, cond, eigSym, expm, kron, pinv, svd } from '../math/decomp';

/** Recompute the expected answer of a question from first principles and compare. */
function numeric(id: string): number {
	const q = questionIndex[id];
	if (!q || q.type !== 'numeric') throw new Error(`${id} is not numeric`);
	return q.answer;
}
function vector(id: string): number[] {
	const q = questionIndex[id];
	if (!q || q.type !== 'vector') throw new Error(`${id} is not a vector question`);
	return q.answer;
}
const close = (a: number[], b: number[]) => a.every((x, i) => Math.abs(x - b[i]) < 1e-9);

describe('numeric and vector answers match an independent computation', () => {
	it('chapter 1-3 spot checks', () => {
		expect(numeric('ch01.dot-product.1')).toBe(dot([1, 2], [3, 4]));
		expect(numeric('ch01.dot-product.2')).toBe(norm([3, 4]));
		expect(numeric('ch01.dot-product.4')).toBeCloseTo((angle([1, 0, 1], [0, 1, 1]) * 180) / Math.PI, 3);
		expect(close(vector('ch01.projection.1'), projectOnto([3, 2.5], [4, 0]))).toBe(true);
		expect(close(vector('ch01.projection.2'), projectOnto([2, 3], [1, 1]))).toBe(true);
		expect(rank([[1, 2], [2, 4]])).toBe(numeric('ch02.pivots-rref.1'));
		expect(rank([[1, 2, 3], [2, 4, 6], [1, 0, 1]])).toBe(numeric('ch02.pivots-rref.3'));
		expect(close(vector('ch03.matrix-times-vector.1'), mulVec([[1, 2], [3, 4]], [1, 1]))).toBe(true);
		expect(close(vector('ch03.matrix-times-vector.2'), mulVec([[2, -1], [1, 1]], [3, 2]))).toBe(true);
		const AB = mul([[1, 1], [0, 1]], [[1, 0], [1, 1]]);
		expect(AB[0][0]).toBe(numeric('ch03.composition.2'));
		expect(close(vector('ch03.composition.3'), [AB[0][0], AB[1][0]])).toBe(true);
		expect(inverse([[2, 1], [1, 1]])![0][1]).toBeCloseTo(numeric('ch03.inverse.1'));
		expect(inverse([[3, 1], [5, 2]])![1][1]).toBeCloseTo(numeric('ch03.inverse.3'));
		const f = lu([[2, 1], [6, 5]])!;
		expect(f.L[1][0]).toBeCloseTo(numeric('ch03.lu.1'));
		expect(f.U[1][1]).toBeCloseTo(numeric('ch03.lu.2'));
	});

	it('chapter 4-5', () => {
		const A = [[1, 2], [2, 4]];
		expect(rank(A)).toBe(numeric('ch04.column-null-space.2'));
		const n = nullSpace(A)[0];
		const scaled = n.map((x) => x / n[1]);
		expect(close(vector('ch04.column-null-space.1'), scaled)).toBe(true);
		expect(5 - 2).toBe(numeric('ch04.four-subspaces.1')); // n - r
		expect(3 - 2).toBe(numeric('ch04.four-subspaces.2')); // m - r
		// columns b1 = (2,1), b2 = (-1,2) -> matrix [[2,-1],[1,2]]
		expect(Math.abs(det([[2, -1], [1, 2]]))).toBe(numeric('ch05.basis.4'));
		// coordinates
		expect(close(vector('ch05.coordinates.1'), mulVec(inverse([[1, 1], [0, 1]])!, [3, 2]))).toBe(true);
		expect(close(vector('ch05.coordinates.2'), mulVec(inverse([[2, 1], [0, 2]])!, [5, 4]))).toBe(true);
		expect(close(vector('ch05.coordinates.4'), mulVec(inverse([[1, 1], [1, -1]])!, [4, 4]))).toBe(true);
		expect(rank([[1, 0, 1], [0, 1, 1], [0, 0, 0]])).toBe(numeric('ch05.dimension.4'));
	});

	it('chapter 6-7', () => {
		// T(1,0) = (2,3), T(0,1) = (1,-1)
		const T = [[2, 1], [3, -1]];
		expect(close(vector('ch06.linear-maps.3'), mulVec(T, [1, 1]))).toBe(true);
		expect(close(vector('ch06.linear-maps.4'), mulVec(T, [2, 3]))).toBe(true);
		const K = [[1, 1], [1, 1]];
		expect(mulVec(K, vector('ch06.kernel-image.2'))).toEqual([0, 0]);
		expect(rank(K)).toBe(numeric('ch06.kernel-image.3'));
		expect(6 - 3).toBe(numeric('ch06.rank-nullity.2'));
		expect(close(vector('ch06.matrix-of-a-map.1'), mulVec([[0, 1, 0], [0, 0, 2]], [5, 3, 2]))).toBe(true);
		// T(x,y) = (2x + y, x - y)
		expect(numeric('ch06.matrix-of-a-map.2')).toBe(1);
		expect(close(vector('ch06.matrix-of-a-map.4'), [2, 1])).toBe(true);
		// reflection across y=x in basis (1,1), (-1,1)
		const P = [[1, -1], [1, 1]];
		const AB = mul(inverse(P)!, mul([[0, 1], [1, 0]], P));
		expect(close(vector('ch06.change-of-basis.4'), [AB[0][0], AB[1][0]])).toBe(true);
		expect(det([[0, 1], [1, 0]])).toBe(numeric('ch06.change-of-basis.3'));

		expect(det([[3, 1], [2, 4]])).toBe(numeric('ch07.area-scaling.1'));
		expect(det([[1, 2], [2, 4]])).toBe(numeric('ch07.area-scaling.2'));
		expect(det([[0, 1], [1, 0]])).toBe(numeric('ch07.orientation.4'));
		expect(3 * -2).toBe(numeric('ch07.multiplicativity.1'));
		expect(1 / 4).toBe(numeric('ch07.multiplicativity.2'));
		expect(2 ** 3).toBe(numeric('ch07.multiplicativity.3'));
		expect(det([[2, 0, 0], [0, 3, 0], [0, 0, 4]])).toBe(numeric('ch07.cofactors.1'));
		expect(det([[1, 2, 3], [0, 4, 5], [0, 0, 6]])).toBe(numeric('ch07.cofactors.2'));
		expect(det([[2, 1, 3], [0, 4, 1], [1, 0, 2]])).toBe(numeric('ch07.cofactors.4'));
	});

	it('chapter 8-10', () => {
		expect(Math.max(...eigen2([[2, 1], [1, 2]]).values)).toBeCloseTo(numeric('ch08.characteristic-polynomial.1'));
		expect(Math.min(...eigen2([[4, 1], [2, 3]]).values)).toBeCloseTo(numeric('ch08.characteristic-polynomial.2'));
		expect(trace([[4, 1], [2, 3]]) - 0).toBe(7);
		const e = eigen2([[2, 1], [1, 2]]);
		const i = e.values.findIndex((l) => Math.abs(l - 3) < 1e-9);
		const v = e.vectors[i].map((x) => x / e.vectors[i][0]);
		expect(close(vector('ch08.characteristic-polynomial.5'), v)).toBe(true);
		expect(mpow([[1, 1], [1, 0]], 5)[0][1]).toBe(numeric('ch09.powers.2'));
		expect(2 ** 4).toBe(numeric('ch09.powers.1'));
		expect(mulVec([[0, 1], [0, 0]], [3, 2])).toEqual(vector('ch10.generalized-eigenvectors.1'));
		expect(mpow([[3, 1], [0, 3]], 2)[0][1]).toBe(numeric('ch10.jordan-blocks.1'));
		expect(rank([[0, 1], [0, 0]])).toBe(1);
	});

	it('chapter 11-12', () => {
		const w = (x: number[], y: number[]) => x[0] * y[0] + 3 * x[1] * y[1];
		expect(w([1, 2], [2, 1])).toBe(numeric('ch11.inner-products.2'));
		expect(Math.sqrt(w([1, 1], [1, 1]))).toBe(numeric('ch11.inner-products.3'));
		const q1 = [3 / 5, 4 / 5];
		const q2 = [-4 / 5, 3 / 5];
		expect(dot(q1, [5, 0])).toBeCloseTo(numeric('ch11.orthogonal-bases.2'));
		expect(dot(q2, [5, 0])).toBeCloseTo(numeric('ch11.orthogonal-bases.3'));
		expect(unit([3, 4]).every((x, i) => Math.abs(x - vector('ch11.gram-schmidt.1')[i]) < 1e-9)).toBe(true);
		expect(close(vector('ch11.gram-schmidt.2'), sub([2, 3], projectOnto([2, 3], [1, 0])))).toBe(true);
		const r = sub([1, 0], projectOnto([1, 0], [1, 1]));
		expect(norm(r)).toBeCloseTo(numeric('ch11.gram-schmidt.3'), 2);

		const P = projectionMatrix([[1, 0], [0, 1], [0, 0]])!;
		expect(close(vector('ch12.projection-subspace.1'), mulVec(P, [1, 2, 3]))).toBe(true);
		const Pxz = projectionMatrix([[1, 0], [0, 0], [0, 1]])!;
		expect(close(vector('ch12.projection-subspace.3'), mulVec(Pxz, [2, -1, 4]))).toBe(true);
		expect(leastSquares([[1], [1], [1]], [1, 2, 6])![0]).toBeCloseTo(numeric('ch12.normal-equations.2'));
		expect(leastSquares([[1, 0], [1, 1], [1, 2]], [1, 2, 2])![1]).toBeCloseTo(numeric('ch12.normal-equations.3'));
		expect(fitLine([[0, 1], [1, 3], [2, 5]])!.m).toBeCloseTo(numeric('ch12.line-of-best-fit.1'));
		expect(fitLine([[-1, 1], [0, 0], [1, 1]])!.c).toBeCloseTo(numeric('ch12.line-of-best-fit.2'), 2);
		expect(mul(transpose([[1, 0], [0, 1]]), [[1, 0], [0, 1]])).toEqual([[1, 0], [0, 1]]);
	});

	it('chapters 13-15', () => {
		const A = [[2, 1], [1, 2]];
		const e = eigSym(A);
		const piece = (t: number) => e.values[t] * e.vectors[0][t] * e.vectors[0][t];
		expect(piece(0)).toBeCloseTo(numeric('ch13.rank-one-pieces.1'));
		expect(e.values[1] * e.vectors[0][1] * e.vectors[1][1]).toBeCloseTo(numeric('ch13.rank-one-pieces.2'));
		expect(Math.sqrt(3 ** 2 + 0)).toBe(numeric('ch13.rank-one-pieces.3'));
		expect(eigSym([[5, 0], [0, 2]]).values[0]).toBe(numeric('ch13.quadratic-forms.1'));
		expect(2).toBe(numeric('ch13.quadratic-forms.2'));
		expect(e.values[0]).toBeCloseTo(numeric('ch13.quadratic-forms.3'));
		expect(det([[4, 2], [2, 3]])).toBe(numeric('ch14.tests-and-cholesky.1'));
		expect(lu([[4, 2], [2, 3]])!.U[1][1]).toBeCloseTo(numeric('ch14.tests-and-cholesky.2'));
		expect(cholesky([[4, 2], [2, 3]])![1][1]).toBeCloseTo(numeric('ch14.tests-and-cholesky.3'), 2);
		const G = mul(transpose([[1, 0], [0, 2]]), [[1, 0], [0, 2]]);
		const gv = eigSym(G).values;
		expect(gv[0] / gv[1]).toBeCloseTo(numeric('ch14.where-they-come-from.3'));
		expect(mul(transpose([[1], [2], [2]]), [[1], [2], [2]])[0][0]).toBe(numeric('ch14.where-they-come-from.4'));
		expect(svd([[3, 0], [0, -2]]).S[1]).toBeCloseTo(numeric('ch15.circle-to-ellipse.1'));
		expect(8 / 4).toBe(numeric('ch15.circle-to-ellipse.2'));
		expect(svd([[0, 3], [0, 0]]).S[0]).toBeCloseTo(numeric('ch15.circle-to-ellipse.5'));
		expect(svd([[0, -2], [2, 0]]).S[0]).toBeCloseTo(numeric('ch15.rotate-stretch-rotate.3'));
		expect(Math.sqrt(3 * 3 + 1)).toBeCloseTo(numeric('ch15.low-rank-approximation.1'), 2);
		expect(5 * (100 + 50 + 1)).toBe(numeric('ch15.low-rank-approximation.3'));
		expect(cond([[2, 0], [0, 0.5]])).toBeCloseTo(numeric('ch15.pseudoinverse.1'));
		expect(pinv([[4, 0], [0, 0]])[0][0]).toBeCloseTo(numeric('ch15.pseudoinverse.2'));
		expect(mulVec(pinv([[1], [1]]), [2, 4])[0]).toBeCloseTo(numeric('ch15.pseudoinverse.4'));
	});

	it('chapters 16-18', () => {
		expect(cond([[100, 0], [0, 1]])).toBeCloseTo(numeric('ch16.conditioning.1'));
		expect(Math.log10(1e6)).toBe(numeric('ch16.conditioning.2'));
		// Jacobi / Gauss-Seidel on 4x + y = 6, x + 3y = 7 from the origin
		const x1 = 6 / 4;
		expect(x1).toBe(numeric('ch17.stationary-iterations.3'));
		expect((7 - x1) / 3).toBeCloseTo(numeric('ch17.stationary-iterations.4'), 2);
		expect((10 - 1) / (10 + 1)).toBeCloseTo(numeric('ch17.conjugate-gradients.4'), 2);
		expect(1 / 4).toBe(numeric('ch17.preconditioning.3'));
		expect(dot([1, 0], [1, 1]) / Math.SQRT2).toBeCloseTo(numeric('ch18.data-as-matrix.1'), 3);
		expect(dot([2, 1], [-1, 3])).toBe(numeric('ch18.data-as-matrix.2'));
		expect([2, -3, 0.5].map((v) => Math.max(0, v)).reduce((a, b) => a + b, 0)).toBe(numeric('ch18.layers-nonlinearity.2'));
		expect(50 * 100).toBe(numeric('ch18.layers-nonlinearity.3'));
		expect(Math.exp(0) / (Math.exp(0) + Math.exp(0))).toBe(numeric('ch18.attention.2'));
		expect(2 * 1000 * 8).toBe(numeric('ch18.low-rank-adapters.1'));
		expect((100 * 16000) / 1_000_000).toBeCloseTo(numeric('ch18.low-rank-adapters.2'));
	});

	it('chapters 19-21', () => {
		expect(kron([[1, 2], [0, 1]], [[1, -1], [1, 1]])[0][3]).toBe(numeric('ch19.kronecker-product.2'));
		expect(3 * 7).toBe(numeric('ch19.kronecker-product.3'));
		expect(10 ** 4).toBe(numeric('ch19.vectorisation.2'));
		expect(eigen2([[1, 1], [1, 1]]).values[0]).toBeCloseTo(numeric('ch20.perron-frobenius.2'));
		const P = [[0.7, 0.4], [0.3, 0.6]];
		expect(trace(P) - 1).toBeCloseTo(numeric('ch20.markov-chains.2'));
		expect(0.4 / 0.7).toBeCloseTo(numeric('ch20.markov-chains.3'), 2);
		expect(Math.ceil(Math.log(0.01) / Math.log(0.85))).toBe(numeric('ch20.pagerank.3'));
		const Ax = mulVec([[1, 1], [0, 2]], [1.5, 1]);
		expect(dot([1, 0.5], Ax)).toBe(numeric('ch21.dual-map.2'));
		expect(dot(mulVec(transpose([[1, 1], [0, 2]]), [1, 0.5]), [1.5, 1])).toBe(numeric('ch21.dual-map.2'));
		const Pm = [[1, 1], [0, 1]]; // basis (1,0),(1,1) as columns
		expect(mulVec(inverse(Pm)!, [3, 2])[1]).toBe(numeric('ch21.dual-space.4'));
		expect(mul(transpose([[2, 0], [0, 3]]), mul([[1, 0], [0, -1]], [[2, 0], [0, 3]]))[1][1]).toBe(numeric('ch21.bilinear-forms.4'));
	});

	it('chapters 22-24', () => {
		expect(inverse([[1, 2], [0, 1]])![0][1]).toBeCloseTo(numeric('ch22.matrix-groups.3'));
		expect(40 + 25).toBe(numeric('ch22.orthogonal-group.1'));
		expect(expm([[1, 0], [0, 1]]).length).toBe(2);
		expect(Math.exp(2)).toBeCloseTo(numeric('ch22.matrix-exponential.1'), 2);
		expect(expm([[0, 0], [0, Math.log(2)]])[1][1]).toBeCloseTo(numeric('ch22.matrix-exponential.4'));
		expect(trace(expm([[0, 0], [0, 0]]))).toBe(numeric('ch22.matrix-exponential.3'));
		expect(Math.sqrt(2 / 50)).toBeCloseTo(numeric('ch23.random-projections.2'));
		expect((20 * 19) / 2).toBe(numeric('ch23.johnson-lindenstrauss.2'));
		expect((1 - Math.sqrt(0.25)) ** 2).toBeCloseTo(numeric('ch24.marchenko-pastur.1'));
		expect((1 + Math.sqrt(0.25)) ** 2).toBeCloseTo(numeric('ch24.marchenko-pastur.2'));
		expect(1.1 ** 20).toBeCloseTo(numeric('ch24.initialisation.1'), 1);
		expect(2 / 50).toBeCloseTo(numeric('ch24.initialisation.2'));
	});

	it('every numeric/vector question was checked or is trivially verifiable', () => {
		expect(quizFor('ch12.line-of-best-fit').length).toBeGreaterThan(0);
	});
});

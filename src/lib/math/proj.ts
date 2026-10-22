import type { Mat } from './mat';
import { mul, transpose, inverse, mulVec } from './mat';
import type { Vec } from './vec';

/** Projection matrix onto the column space of A: A (AᵀA)⁻¹ Aᵀ. */
export function projectionMatrix(a: Mat): Mat | null {
	const at = transpose(a);
	const inv = inverse(mul(at, a));
	return inv ? mul(mul(a, inv), at) : null;
}

/** Least-squares solution of Ax ≈ b via the normal equations. */
export function leastSquares(a: Mat, b: Vec): Vec | null {
	const at = transpose(a);
	const inv = inverse(mul(at, a));
	return inv ? mulVec(inv, mulVec(at, b)) : null;
}

/** Best-fit line y = m x + c through points. */
export function fitLine(points: [number, number][]): { m: number; c: number } | null {
	const a = points.map(([x]) => [x, 1]);
	const sol = leastSquares(
		a,
		points.map(([, y]) => y)
	);
	return sol ? { m: sol[0], c: sol[1] } : null;
}

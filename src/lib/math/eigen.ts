import type { Mat } from './mat';
import { det } from './mat';

export interface Eigen2 {
	/** real eigenvalues (empty when complex) */
	values: number[];
	/** complex eigenvalue pair as [re, im] when the discriminant is negative */
	complex: [number, number] | null;
	/** unit eigenvectors matching `values` */
	vectors: number[][];
}

export const trace = (m: Mat) => m.reduce((s, r, i) => s + r[i], 0);

export function eigen2(m: Mat): Eigen2 {
	const t = trace(m);
	const d = det(m);
	const disc = t * t - 4 * d;
	if (disc < -1e-12) return { values: [], complex: [t / 2, Math.sqrt(-disc) / 2], vectors: [] };
	const s = Math.sqrt(Math.max(0, disc));
	const raw = disc < 1e-12 ? [t / 2] : [(t + s) / 2, (t - s) / 2];
	const [a, b] = m[0];
	const [c, e] = m[1];
	const vectors = raw.map((l) => {
		let v: number[];
		if (Math.abs(b) > 1e-12) v = [b, l - a];
		else if (Math.abs(c) > 1e-12) v = [l - e, c];
		else v = Math.abs(a - l) < 1e-12 ? [1, 0] : [0, 1];
		const n = Math.hypot(v[0], v[1]) || 1;
		return [v[0] / n, v[1] / n];
	});
	return { values: raw, complex: null, vectors };
}

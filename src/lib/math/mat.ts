import type { Vec } from './vec';

/** Row-major matrix: m[i][j] is row i, column j. */
export type Mat = number[][];

export const rows = (m: Mat) => m.length;
export const cols = (m: Mat) => (m.length ? m[0].length : 0);
export const identity = (n: number): Mat =>
	Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
export const transpose = (m: Mat): Mat =>
	Array.from({ length: cols(m) }, (_, j) => m.map((r) => r[j]));
export const column = (m: Mat, j: number): Vec => m.map((r) => r[j]);

export function mulVec(m: Mat, v: Vec): Vec {
	return m.map((r) => r.reduce((s, x, j) => s + x * v[j], 0));
}

export function mul(a: Mat, b: Mat): Mat {
	const bt = transpose(b);
	return a.map((r) => bt.map((c) => r.reduce((s, x, k) => s + x * c[k], 0)));
}

export function det(m: Mat): number {
	const n = m.length;
	if (n === 1) return m[0][0];
	if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
	let s = 0;
	for (let j = 0; j < n; j++) {
		const minor = m.slice(1).map((r) => r.filter((_, k) => k !== j));
		s += (j % 2 === 0 ? 1 : -1) * m[0][j] * det(minor);
	}
	return s;
}

export function inverse(m: Mat): Mat | null {
	const n = m.length;
	const a = m.map((r, i) => [...r, ...identity(n)[i]]);
	for (let c = 0; c < n; c++) {
		let p = c;
		for (let r = c + 1; r < n; r++) if (Math.abs(a[r][c]) > Math.abs(a[p][c])) p = r;
		if (Math.abs(a[p][c]) < 1e-12) return null;
		[a[c], a[p]] = [a[p], a[c]];
		const d = a[c][c];
		a[c] = a[c].map((x) => x / d);
		for (let r = 0; r < n; r++) {
			if (r === c) continue;
			const f = a[r][c];
			a[r] = a[r].map((x, k) => x - f * a[c][k]);
		}
	}
	return a.map((r) => r.slice(n));
}

/** Matrix power A^k for integer k >= 0. */
export function mpow(m: Mat, k: number): Mat {
	let out = identity(m.length);
	for (let i = 0; i < k; i++) out = mul(out, m);
	return out;
}

/** 2D rotation by theta radians (counter-clockwise). */
export const rotation = (theta: number): Mat => [
	[Math.cos(theta), -Math.sin(theta)],
	[Math.sin(theta), Math.cos(theta)]
];

/** Matrix whose columns are the given vectors. */
export const fromColumns = (cs: Vec[]): Mat => transpose(cs);

import type { Mat } from './mat';

export type RowOp =
	| { kind: 'swap'; i: number; j: number }
	| { kind: 'scale'; i: number; k: number }
	| { kind: 'add'; target: number; source: number; k: number };

export interface Step {
	op: RowOp | null;
	matrix: Mat;
	description: string;
}

const EPS = 1e-10;
const fmt = (x: number) => {
	const r = Math.round(x * 1000) / 1000;
	return Object.is(r, -0) ? '0' : String(r);
};

/**
 * Gauss-Jordan elimination on an augmented (or plain) matrix, recording every
 * row operation so a lesson can step through it.
 */
export function rref(input: Mat): { steps: Step[]; result: Mat; pivots: number[] } {
	const m = input.map((r) => [...r]);
	const steps: Step[] = [{ op: null, matrix: m.map((r) => [...r]), description: 'Start' }];
	const push = (op: RowOp, description: string) =>
		steps.push({ op, matrix: m.map((r) => [...r]), description });
	const pivots: number[] = [];
	const nr = m.length;
	const nc = m[0].length;
	let row = 0;
	for (let c = 0; c < nc && row < nr; c++) {
		let p = row;
		for (let r = row + 1; r < nr; r++) if (Math.abs(m[r][c]) > Math.abs(m[p][c])) p = r;
		if (Math.abs(m[p][c]) < EPS) continue;
		if (p !== row) {
			[m[row], m[p]] = [m[p], m[row]];
			push({ kind: 'swap', i: row, j: p }, `Swap R${row + 1} and R${p + 1}`);
		}
		const d = m[row][c];
		if (Math.abs(d - 1) > EPS) {
			m[row] = m[row].map((x) => x / d);
			push({ kind: 'scale', i: row, k: 1 / d }, `Scale R${row + 1} by ${fmt(1 / d)}`);
		}
		for (let r = 0; r < nr; r++) {
			if (r === row || Math.abs(m[r][c]) < EPS) continue;
			const f = m[r][c];
			m[r] = m[r].map((x, k) => x - f * m[row][k]);
			push(
				{ kind: 'add', target: r, source: row, k: -f },
				`R${r + 1} ← R${r + 1} ${f >= 0 ? '−' : '+'} ${fmt(Math.abs(f))}·R${row + 1}`
			);
		}
		pivots.push(c);
		row++;
	}
	return { steps, result: m, pivots };
}

export const rank = (m: Mat): number => rref(m).pivots.length;

/** Basis of the null space {x : Ax = 0}, from the RREF free columns. */
export function nullSpace(a: Mat): number[][] {
	const n = a[0].length;
	const { result, pivots } = rref(a);
	const free = Array.from({ length: n }, (_, j) => j).filter((j) => !pivots.includes(j));
	return free.map((f) => {
		const x = new Array(n).fill(0);
		x[f] = 1;
		pivots.forEach((pc, r) => (x[pc] = -result[r][f]));
		return x.map((v) => (Object.is(v, -0) ? 0 : v));
	});
}

export type SolutionKind = 'none' | 'unique' | 'infinite';
/** Classify the system [A | b] given as one augmented matrix. */
export function classify(aug: Mat): SolutionKind {
	const n = aug[0].length - 1;
	const { pivots } = rref(aug);
	if (pivots.includes(n)) return 'none';
	return pivots.length === n ? 'unique' : 'infinite';
}

/** LU factorisation without row swaps (A = LU). Returns null if a zero pivot appears. */
export function lu(a: Mat): { L: Mat; U: Mat } | null {
	const n = a.length;
	const U = a.map((r) => [...r]);
	const L: Mat = Array.from({ length: n }, (_, i) =>
		Array.from({ length: n }, (_, j): number => (i === j ? 1 : 0))
	);
	for (let c = 0; c < n; c++) {
		if (Math.abs(U[c][c]) < EPS) return null;
		for (let r = c + 1; r < n; r++) {
			const f = U[r][c] / U[c][c];
			L[r][c] = f;
			for (let k = c; k < n; k++) U[r][k] -= f * U[c][k];
			U[r][c] = 0;
		}
	}
	return { L, U };
}

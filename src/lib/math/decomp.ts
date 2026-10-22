import { identity, mul, transpose, type Mat } from './mat';

/** Eigen-decomposition of a symmetric matrix by cyclic Jacobi rotations. Values sorted descending. */
export function eigSym(A: Mat, maxSweeps = 80): { values: number[]; vectors: Mat } {
	const n = A.length;
	const a = A.map((r) => [...r]);
	const V = identity(n);
	for (let sweep = 0; sweep < maxSweeps; sweep++) {
		let off = 0;
		for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p][q] * a[p][q];
		if (off < 1e-24) break;
		for (let p = 0; p < n - 1; p++) {
			for (let q = p + 1; q < n; q++) {
				if (Math.abs(a[p][q]) < 1e-300) continue;
				const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
				const t = (theta >= 0 ? 1 : -1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
				const c = 1 / Math.sqrt(t * t + 1);
				const s = t * c;
				for (let k = 0; k < n; k++) {
					const akp = a[k][p];
					const akq = a[k][q];
					a[k][p] = c * akp - s * akq;
					a[k][q] = s * akp + c * akq;
				}
				for (let k = 0; k < n; k++) {
					const apk = a[p][k];
					const aqk = a[q][k];
					a[p][k] = c * apk - s * aqk;
					a[q][k] = s * apk + c * aqk;
				}
				for (let k = 0; k < n; k++) {
					const vkp = V[k][p];
					const vkq = V[k][q];
					V[k][p] = c * vkp - s * vkq;
					V[k][q] = s * vkp + c * vkq;
				}
			}
		}
	}
	const order = Array.from({ length: n }, (_, i) => i).sort((i, j) => a[j][j] - a[i][i]);
	return {
		values: order.map((i) => a[i][i]),
		// columns of `vectors` are the eigenvectors
		vectors: V.map((row) => order.map((j) => row[j]))
	};
}

/**
 * Thin singular value decomposition A = U diag(S) V^T (A is m x n, k = min(m, n)).
 * Computed from the eigen-decomposition of A^T A, which is accurate enough for the small,
 * moderately conditioned matrices used in the lessons. Columns of U for zero singular values are zero.
 */
export function svd(A: Mat): { U: Mat; S: number[]; V: Mat } {
	const m = A.length;
	const n = A[0].length;
	if (m < n) {
		const t = svd(transpose(A));
		return { U: t.V, S: t.S, V: t.U };
	}
	const { values, vectors } = eigSym(mul(transpose(A), A));
	const raw = values.map((x) => Math.sqrt(Math.max(0, x)));
	// singular values below this are rounding noise from forming A^T A, so call them zero
	const tol = 1e-7 * Math.max(raw[0], 1e-300);
	const S = raw.map((s) => (s < tol ? 0 : s));
	const AV = mul(A, vectors);
	const U = AV.map((row) => row.map((x, j) => (S[j] > 0 ? x / S[j] : 0)));
	return { U, S, V: vectors };
}

/** Largest over smallest singular value (Infinity if singular). */
export function cond(A: Mat): number {
	const { S } = svd(A);
	const smin = S[S.length - 1];
	return smin === 0 ? Infinity : S[0] / smin;
}

/** Rank-k truncation of the SVD: the best rank-k approximation (Eckart-Young). */
export function lowRank(A: Mat, k: number): Mat {
	const { U, S, V } = svd(A);
	const m = A.length;
	const n = A[0].length;
	const out = Array.from({ length: m }, () => new Array(n).fill(0));
	for (let r = 0; r < Math.min(k, S.length); r++) {
		for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) out[i][j] += S[r] * U[i][r] * V[j][r];
	}
	return out;
}

/** Moore-Penrose pseudoinverse from the SVD. */
export function pinv(A: Mat): Mat {
	const { U, S, V } = svd(A);
	const m = A.length;
	const n = A[0].length;
	const out = Array.from({ length: n }, () => new Array(m).fill(0));
	for (let r = 0; r < S.length; r++) {
		if (S[r] === 0) continue;
		for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) out[i][j] += (V[i][r] * U[j][r]) / S[r];
	}
	return out;
}

/** Cholesky factor L with A = L L^T, or null if A is not symmetric positive definite. */
export function cholesky(A: Mat): Mat | null {
	const n = A.length;
	const L = Array.from({ length: n }, () => new Array(n).fill(0));
	for (let i = 0; i < n; i++) {
		for (let j = 0; j <= i; j++) {
			let s = A[i][j];
			for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
			if (i === j) {
				if (s <= 1e-12) return null;
				L[i][i] = Math.sqrt(s);
			} else L[i][j] = s / L[j][j];
		}
	}
	return L;
}

/** Matrix exponential by scaling and squaring with a Taylor series. */
export function expm(A: Mat, terms = 24): Mat {
	const n = A.length;
	const norm = Math.max(...A.map((r) => r.reduce((s, x) => s + Math.abs(x), 0)));
	const squarings = Math.max(0, Math.ceil(Math.log2(Math.max(norm, 1e-12))) + 1);
	const scale = 2 ** squarings;
	const B = A.map((r) => r.map((x) => x / scale));
	let term = identity(n);
	let sum = identity(n);
	for (let k = 1; k <= terms; k++) {
		term = mul(term, B).map((r) => r.map((x) => x / k));
		sum = sum.map((r, i) => r.map((x, j) => x + term[i][j]));
	}
	for (let i = 0; i < squarings; i++) sum = mul(sum, sum);
	return sum;
}

/** Kronecker product A (x) B. */
export function kron(A: Mat, B: Mat): Mat {
	const out: Mat = [];
	for (const ra of A) for (const rb of B) out.push(ra.flatMap((a) => rb.map((b) => a * b)));
	return out;
}

/** Stack the columns of X into one long vector. */
export function vec(X: Mat): number[] {
	return X[0].flatMap((_, j) => X.map((r) => r[j]));
}

/** Frobenius norm. */
export const frob = (A: Mat): number => Math.sqrt(A.reduce((s, r) => s + r.reduce((t, x) => t + x * x, 0), 0));

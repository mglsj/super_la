export type Vec = number[];

export const add = (a: Vec, b: Vec): Vec => a.map((x, i) => x + b[i]);
export const sub = (a: Vec, b: Vec): Vec => a.map((x, i) => x - b[i]);
export const scale = (a: Vec, k: number): Vec => a.map((x) => x * k);
export const dot = (a: Vec, b: Vec): number => a.reduce((s, x, i) => s + x * b[i], 0);
export const norm = (a: Vec): number => Math.sqrt(dot(a, a));
export const unit = (a: Vec): Vec => {
	const n = norm(a);
	return n === 0 ? a.map(() => 0) : scale(a, 1 / n);
};

/** Angle in radians between two nonzero vectors. */
export function angle(a: Vec, b: Vec): number {
	const c = dot(a, b) / (norm(a) * norm(b));
	return Math.acos(Math.max(-1, Math.min(1, c)));
}

export function cross(a: Vec, b: Vec): Vec {
	return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

/** Orthogonal projection of b onto the line spanned by a. */
export function projectOnto(b: Vec, a: Vec): Vec {
	const d = dot(a, a);
	return d === 0 ? a.map(() => 0) : scale(a, dot(a, b) / d);
}

export const approx = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps;
export const approxVec = (a: Vec, b: Vec, eps = 1e-9): boolean =>
	a.length === b.length && a.every((x, i) => approx(x, b[i], eps));

/** Gram-Schmidt on a list of vectors; drops (near-)dependent vectors. */
export function gramSchmidt(vs: Vec[]): Vec[] {
	const out: Vec[] = [];
	for (const v of vs) {
		let w = v;
		for (const q of out) w = sub(w, projectOnto(w, q));
		if (norm(w) > 1e-10) out.push(unit(w));
	}
	return out;
}

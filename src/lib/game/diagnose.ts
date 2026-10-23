import type { Question } from '#lib/content/types.js';

export interface Attempt {
	choice: number | null;
	value: number | null;
	parts: number[] | null;
}

const near = (a: number, b: number, tol = 0.011) => Math.abs(a - b) <= tol;

/**
 * Feedback for a wrong answer. Authored `slips` win; otherwise we look for the usual
 * mistakes (sign, factor of two, swapped entries, one entry right). Never states the answer.
 */
export function diagnose(q: Question, a: Attempt): string | null {
	if (q.type === 'mcq') {
		if (a.choice === null) return null;
		return q.notes?.[a.choice] ?? null;
	}

	if (q.type === 'numeric' && a.value !== null && !Number.isNaN(a.value)) {
		const slip = q.slips?.find((s) => typeof s.value === 'number' && near(s.value, a.value!, q.tol ?? 0.011));
		if (slip) return slip.note;
		const t = q.answer;
		const v = a.value;
		if (t !== 0 && near(v, -t)) return 'Right size, wrong sign. Recheck which way each term points.';
		if (t !== 0 && near(v, 2 * t)) return 'That is twice the answer. Did you add something once too often, or skip a division?';
		if (t !== 0 && near(v, t / 2)) return 'That is half the answer. Check for a missing factor of 2.';
		if (t !== 0 && v !== 0 && near(v, 1 / t, 0.02)) return 'That looks like the reciprocal. Check which quantity goes on top.';
		if (t !== 0 && near(v, t * t, 0.02)) return 'That looks like the square of the answer. Check whether a square or square root is needed.';
		if (t !== 0 && Math.abs(v - t) <= 0.1 * Math.abs(t)) return 'Close, but not quite. Recompute, and watch for rounding that is too early.';
		return null;
	}

	if (q.type === 'vector' && a.parts) {
		const slip = q.slips?.find(
			(s) => Array.isArray(s.value) && s.value.length === a.parts!.length && s.value.every((x, i) => near(x, a.parts![i], q.tol ?? 0.011))
		);
		if (slip) return slip.note;
		const t = q.answer;
		const p = a.parts.slice(0, t.length);
		if (p.some((x) => Number.isNaN(x))) return null;
		if (p.every((x, i) => near(x, -t[i]))) return 'Every entry has the wrong sign. Recheck the direction.';
		if (t.length === 2 && near(p[0], t[1]) && near(p[1], t[0]) && !(near(t[0], t[1]))) return 'You have the right numbers in the wrong order.';
		const ok = p.map((x, i) => near(x, t[i], q.tol ?? 0.011));
		const good = ok.filter(Boolean).length;
		if (good > 0 && good < t.length) {
			const bad = ok.map((b, i) => (b ? null : i + 1)).filter((x) => x !== null);
			return `Entry ${good === 1 ? ok.indexOf(true) + 1 : ok.map((b, i) => (b ? i + 1 : null)).filter((x) => x !== null).join(' and ')} ${good === 1 ? 'is' : 'are'} correct. Recheck entry ${bad.join(' and ')}.`;
		}
		return null;
	}

	return null;
}

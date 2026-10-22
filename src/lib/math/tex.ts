import type { Mat } from './mat';

/** Format a number for display: small fractions as \frac, otherwise up to 3 decimals. */
export function fmtNum(x: number): string {
	if (Math.abs(x) < 1e-9) return '0';
	const r = Math.round(x);
	if (Math.abs(x - r) < 1e-9) return String(r);
	for (let d = 2; d <= 12; d++) {
		const n = Math.round(x * d);
		if (Math.abs(x - n / d) < 1e-9) return n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`;
	}
	return String(Math.round(x * 1000) / 1000);
}

/** LaTeX for a matrix; `aug` puts a vertical bar before the last `aug` columns. */
export function texMatrix(m: Mat, aug = 0): string {
	const body = m.map((r) => r.map(fmtNum).join(' & ')).join(' \\\\ ');
	if (aug > 0) {
		const nc = m[0].length;
		const spec = 'c'.repeat(nc - aug) + '|' + 'c'.repeat(aug);
		return `\\left[\\begin{array}{${spec}} ${body} \\end{array}\\right]`;
	}
	return `\\begin{bmatrix} ${body} \\end{bmatrix}`;
}

import type { Enrich } from '../types';

/** Teaching material for the exam-style questions added after Quiz 1 (lines, parameters, LU, polynomial spaces). */
export const enrich: Record<string, Enrich> = {
	'ch01.lines-planes.4': {
		hints: [
			'The closest point makes the error $\\mathbf b - \\mathbf r(t)$ perpendicular to the direction $\\mathbf d = (1,0,1)$.',
			'$\\mathbf b - \\mathbf r(t) = (3 - t,\\ 1,\\ 1 - t)$. Dot it with $(1,0,1)$ and set the result to $0$.'
		],
		slips: [{ value: 4, note: 'That is $(\\mathbf b - P)\\cdot\\mathbf d$. You still need to divide by $\\mathbf d\\cdot\\mathbf d = 2$.' }]
	},
	'ch01.lines-planes.5': {
		hints: [
			'First find the closest point $\\mathbf p = \\mathbf r(2)$, then the length of $\\mathbf b - \\mathbf p$.',
			'$\\mathbf p = (3,1,2)$, so $\\mathbf b - \\mathbf p = (1,1,-1)$. Its length is $\\sqrt{1 + 1 + 1}$.'
		],
		slips: [{ value: 3.317, note: 'That is $\\lVert\\mathbf b - P\\rVert = \\sqrt{11}$, the distance to the base point, not to the line. Use the closest point $\\mathbf r(2)$.' }]
	},
	'ch01.lines-planes.6': {
		hints: [
			'A line is a subspace exactly when it passes through $\\mathbf 0$. For each option, try to solve "point $= (0,0,0)$" for $t$.',
			'Look for a line whose base point is a multiple of its direction. Write $(2 + 2t, 1 + t, 0)$ as $(2,1,0) + t(2,1,0)$.'
		],
		notes: [
			'Right. $(2,1,0) + t(2,1,0)$ hits $\\mathbf 0$ at $t = -1$: the line is $\\operatorname{span}\\{(2,1,0)\\}$, a subspace, even though it was written with a shifted base point.',
			'No. The third coordinate is always $1$, so $\\mathbf 0$ is never on it.',
			'No. $\\mathbf 0$ would need $1 + t = 0$ and $t = 0$ at the same time.',
			'No. The first coordinate is always $1$.'
		]
	},
	'ch01.lines-planes.7': {
		hints: [
			'Read the normal off the coefficients: $\\mathbf n = (2,-1,2)$, with $\\lVert\\mathbf n\\rVert = 3$.',
			'Use $\\dfrac{|\\mathbf n\\cdot\\mathbf b - d|}{\\lVert\\mathbf n\\rVert}$: compute $\\mathbf n\\cdot\\mathbf b = 2 - 2 + 6$ first.'
		],
		slips: [{ value: 3, note: 'That is $|\\mathbf n\\cdot\\mathbf b - d|$. Divide by the length of the normal, $\\lVert(2,-1,2)\\rVert = 3$.' }]
	},
	'ch02.solution-sets.9': {
		hints: [
			'Two of the equations already pin down $x$ and $y$. Solve $x + y = 1$, $x - y = 3$ first.',
			'With $x = 2$, $y = -1$, the third equation becomes $2 - k = 0$.'
		]
	},
	'ch02.solution-sets.10': {
		hints: [
			'Each pivot sits in a different row, so there are at most 3 pivots. How many of the 5 unknowns are then free?',
			'Consistent plus at least one free variable means infinitely many solutions.'
		],
		notes: [
			'Right. At most 3 pivots leaves at least 2 free variables, and the system is consistent.',
			'No. A unique solution needs a pivot in every one of the 5 columns, but there are only 3 rows.',
			'No. The entries cannot change the count of pivots beyond 3; it is always infinitely many.',
			'No. Solution sets of linear systems never have exactly two elements.'
		]
	},
	'ch03.lu.9': {
		hints: [
			'The factorisation is of $PA$, not $A$. Multiply both sides of $A\\mathbf x = \\mathbf b$ by $P$.',
			'$PA\\mathbf x = P\\mathbf b$ becomes $L(U\\mathbf x) = P\\mathbf b$. Name $\\mathbf y = U\\mathbf x$.'
		],
		notes: [
			'Right. Permute $\\mathbf b$ the same way as the rows of $A$, then solve $L\\mathbf y = P\\mathbf b$.',
			'This forgets the row exchange: $LU$ equals $PA$, so the right-hand side must be permuted too.',
			'$U$ is solved second, by back substitution.',
			'The factorisation is $PA = LU$, not $A = PLU$ in that form; just permute $\\mathbf b$.'
		]
	},
	'ch06.rank-nullity.5': {
		hints: [
			"Package both conditions as $T(p) = (p(1),\\ p'(1))$, a linear map $P_3\\to\\mathbb R^2$. The set is $\\ker T$.",
			'Find $\\operatorname{rank}T$ from $T(1)$ and $T(t)$, then use $\\dim\\ker T = 4 - \\operatorname{rank}T$.'
		],
		slips: [{ value: 3, note: 'There are two independent conditions, not one, so the dimension drops by 2.' }]
	},
	'ch02.solution-sets.6': {
		hints: [
			'Eliminate below the first pivot: $R_3 - 2R_1$. Keep $k$ as a letter and do not divide by it.',
			'You get pivots $1$, $k$, $1$ (rows $[1\\ 2\\ 0]$, $[0\\ k\\ 1]$, $[0\\ 0\\ 1]$). Which value makes one of them vanish?'
		]
	},
	'ch02.solution-sets.7': {
		hints: [
			'Put $k = 0$: rows 2 and 3 become $[0\\ 0\\ 1\\mid1]$ and $[0\\ 0\\ 1\\mid\\beta - 2]$.',
			'Subtract them: $[0\\ 0\\ 0\\mid\\beta - 3]$. The system is consistent only if the right-hand side is $0$.'
		],
		slips: [{ value: 2, note: 'Row 3 after $R_3 - 2R_1$ has right-hand side $\\beta - 2$, but you still have to compare it with row 2, whose right-hand side is $1$.' }]
	},
	'ch02.solution-sets.8': {
		hints: [
			'Null-space vectors solve the same system with right-hand side $\\mathbf 0$: $x_1 + 2x_2 = 0$ and $x_3 = 0$.',
			'Set the free variable $x_2 = 1$ and read off $x_1$ and $x_3$.'
		]
	},
	'ch03.lu.6': {
		hints: [
			'Write $A\\mathbf x = L(U\\mathbf x)$ and give the bracket a name, $\\mathbf y = U\\mathbf x$.',
			'Which triangular matrix touches $\\mathbf b$ directly? $L$ is lower triangular, so its system is solved from the top.'
		],
		notes: [
			'Right. $L\\mathbf y = \\mathbf b$ first (top down), then $U\\mathbf x = \\mathbf y$ (bottom up).',
			'No. $U\\mathbf x$ equals $\\mathbf y$, not $\\mathbf b$; you must first undo $L$.',
			'No. $U$ is upper triangular, so it is solved bottom up, and it comes second.',
			'Correct formula, but forming inverses is slower and is exactly what such questions forbid.'
		]
	},
	'ch03.lu.7': {
		hints: [
			'Forward substitution: the first row of $L$ involves only $y_1$, so $y_1 = 2$.',
			'Row 2: $2y_1 + y_2 = 5$. Row 3: $-y_2 + y_3 = 1$.'
		]
	},
	'ch03.lu.8': {
		hints: [
			'Back substitution starts at the bottom row: $2x_3 = 2$.',
			'Then row 2: $x_2 + x_3 = 1$; then row 1: $x_1 + x_2 = 2$.'
		]
	},
	'ch04.subspaces.5': {
		hints: [
			'Write $p = a + bt + ct^2$ and turn $p(2) = 0$ into one equation on $a, b, c$.',
			'$a + 2b + 4c = 0$: one equation in three unknowns. How many free parameters are left?'
		],
		slips: [{ value: 3, note: 'That is $\\dim P_2$. The condition $p(2) = 0$ is one independent linear equation, which cuts the dimension by one.' }]
	},
	'ch04.subspaces.6': {
		hints: [
			'With $p = a + bt + ct^2 + dt^3$: $p(0) = a$ and $p(1) = a + b + c + d$.',
			'The condition is $b + c + d = 0$: one equation in four unknowns.'
		]
	},
	'ch04.subspaces.7': {
		hints: [
			'Linear conditions ("some linear expression in $p$ equals $0$") give subspaces. Which option is of that form?',
			'For the others, look for a failure: try adding $t$ and $1 - t$, or scaling by $-1$, or checking whether $0$ is included.'
		],
		notes: [
			'Right. It is the kernel of the linear map $p\\mapsto p(0) - p(1)$.',
			'No. $t$ and $1 - t$ are in it, but their sum $1$ is not.',
			'No. The zero polynomial has $p(0) = 0\\ne1$.',
			'No. $p = 1$ is in it, but $-1\\cdot p$ has $p(1) = -1<0$.'
		]
	},
	'ch05.coordinates.5': {
		hints: [
			'Expand $\\alpha(1 + t) + \\beta t$ and collect the constant term and the $t$ term.',
			'Constant: $\\alpha = 3$. Coefficient of $t$: $\\alpha + \\beta = 5$.'
		],
		slips: [{ value: [3, 5], note: 'Those are the coordinates in the standard basis $(1, t)$. In this basis the second vector is $t$ but the first is $1 + t$, which also contributes a $t$.' }]
	},
	'ch05.coordinates.6': {
		hints: [
			'Write $t = (t - 1) + 1$ and square it.',
			'$t^2 = (t - 1)^2 + 2(t - 1) + 1$. List the weights in the order of the basis $(1,\\ t - 1,\\ (t - 1)^2)$.'
		],
		slips: [{ value: [0, 0, 1], note: 'Those are the coordinates in the standard basis. $(t - 1)^2$ alone is $t^2 - 2t + 1$, so you need more terms to cancel the $-2t + 1$.' }]
	}
};

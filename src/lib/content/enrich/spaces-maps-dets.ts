import type { Enrich } from '../types';

/** Teaching material for the practice questions on bases, linear maps and determinants added with the matching worked examples. */
export const enrich: Record<string, Enrich> = {
	'ch05.independence.5': {
		hints: [
			'Three vectors in $\\mathbb R^3$ form a basis exactly when the matrix with them as columns has nonzero determinant.',
			'Expand $\\det\\begin{bmatrix}1&0&1\\\\1&1&0\\\\0&1&k\\end{bmatrix}$ along the first row; you get a linear expression in $k$.'
		],
		slips: [{ value: 1, note: 'Check the sign: the determinant is $k + 1$, which vanishes at $k = -1$.' }]
	},
	'ch05.independence.6': {
		hints: [
			'Look for a quick relation first: compare $\\mathbf v_1 + \\mathbf v_2$ with $\\mathbf v_3$.',
			'If $\\mathbf v_3 = a\\mathbf v_1 + b\\mathbf v_2$, then $a\\mathbf v_1 + b\\mathbf v_2 - \\mathbf v_3 = \\mathbf 0$.'
		],
		slips: [{ value: [-1, -1, 1], note: 'That relation is correct but the question asks for the one with $c_3 = -1$: multiply yours by $-1$.' }]
	},
	'ch05.dimension.5': {
		hints: [
			'Use $\\dim(U + W) = \\dim U + \\dim W - \\dim(U\\cap W)$ together with $\\dim(U + W)\\le4$.',
			'So $\\dim(U\\cap W)\\ge3 + 3 - 4$. Then check that this value can actually happen.'
		],
		slips: [{ value: 0, note: 'Two 3-dimensional subspaces do not fit side by side in a 4-dimensional space: the sum would need dimension 6.' }]
	},
	'ch05.dimension.6': {
		hints: [
			'Write $X = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ and compute $XD$ (scales the columns) and $DX$ (scales the rows).',
			'Compare the off-diagonal entries: $2b = b$ and $c = 2c$. What is left free?'
		]
	},
	'ch04.four-subspaces.5': {
		hints: [
			'$A\\mathbf x = \\mathbf b$ is solvable iff $\\mathbf b\\in C(A)$, iff $\\mathbf b$ is orthogonal to every $\\mathbf y$ with $A^{\\mathsf T}\\mathbf y = \\mathbf 0$.',
			'Solve $\\mathbf y\\cdot(1,2,0) = 0$ and $\\mathbf y\\cdot(2,4,1) = 0$, with $y_2 = 1$.'
		]
	},
	'ch06.linear-maps.5': {
		hints: [
			'Test each map on $X = I$ and $2X = 2I$: does the output double?',
			'Products of the input with itself are the usual culprit.'
		],
		notes: [
			'Right, this is not linear: $(2I)^2 = 4I$ but $2\\cdot I^2 = 2I$.',
			'This is linear: $(X + cY)^{\\mathsf T} = X^{\\mathsf T} + cY^{\\mathsf T}$.',
			'This is linear: the trace is a sum of entries, so $\\operatorname{tr}(X + cY) = \\operatorname{tr}X + c\\operatorname{tr}Y$.',
			'This is linear: $A(X + cY) = AX + cAY$ by the distributive law.'
		]
	},
	'ch06.kernel-image.5': {
		hints: [
			'Find the rank first: compute $T(1)$ and $T(t)$. Are they independent?',
			'Then rank–nullity: $\\dim\\ker T = \\dim P_3 - \\operatorname{rank}T = 4 - \\operatorname{rank}T$.'
		],
		slips: [{ value: 3, note: 'That would mean rank 1, but $T(1) = (1,1)$ and $T(t) = (0,1)$ are already independent.' }]
	},
	'ch06.matrix-of-a-map.5': {
		hints: [
			'Write $(1,0)$ as a combination of $(1,1)$ and $(1,-1)$.',
			'$(1,0) = \\tfrac12(1,1) + \\tfrac12(1,-1)$. Apply $T$ and use linearity.'
		]
	},
	'ch06.change-of-basis.5': {
		hints: [
			'$A = PDP^{-1}$ with $D = \\operatorname{diag}(2,3)$, so $A^2 = PD^2P^{-1}$.',
			'Similar matrices have the same trace, so $\\operatorname{tr}A^2 = \\operatorname{tr}D^2$.'
		],
		slips: [{ value: 25, note: 'That is $(\\operatorname{tr}A)^2$. Square the eigenvalues first, then add: $4 + 9$.' }]
	},
	'ch07.multiplicativity.5': {
		hints: [
			'$2A$ doubles every one of the 4 rows, and each row contributes one factor of $2$.',
			'$\\det(cA) = c^n\\det A$ with $n = 4$.'
		],
		slips: [{ value: 10, note: 'That multiplies by $2$ only once. All four rows are doubled, so the factor is $2^4$.' }]
	},
	'ch07.multiplicativity.6': {
		hints: [
			'Take determinants of both sides of $A\\,\\operatorname{adj}A = (\\det A)I_3$.',
			'$\\det((\\det A)I_3) = (\\det A)^3$. Divide by $\\det A$.'
		],
		slips: [
			{ value: 4, note: 'The adjugate is not similar to $A$. Use $\\det(\\operatorname{adj}A) = (\\det A)^{n-1}$.' },
			{ value: 64, note: 'That is $(\\det A)^3$; you still have to divide by one factor of $\\det A$.' }
		]
	},
	'ch07.cofactors.5': {
		hints: [
			'Follow $1\\to\\sigma(1)\\to\\cdots$ to find the cycles. A cycle of length $k$ is $k - 1$ transpositions.',
			'Or count inversions in the list $(2,3,1,4)$: pairs that appear in the wrong order.'
		],
		slips: [{ value: -1, note: 'A 3-cycle is two transpositions, not one: $(1\\,2\\,3) = (1\\,3)(1\\,2)$.' }]
	},
	'ch07.cofactors.6': {
		hints: [
			'Delete row 2 and column 3 and take the determinant of what remains.',
			'Then attach the chessboard sign $(-1)^{2+3} = -1$.'
		],
		slips: [{ value: -4, note: 'That is the minor $M_{23}$. The cofactor carries the sign $(-1)^{2+3}$.' }]
	},
	'ch07.cofactors.7': {
		hints: [
			'Cramer: $y = \\det A_2/\\det A$, where $A_2$ is $A$ with its **second** column replaced by $(8,9)$.',
			'$\\det A = 2\\cdot4 - 3\\cdot1$ and $\\det A_2 = 2\\cdot9 - 8\\cdot1$.'
		],
		slips: [{ value: 1, note: 'That is $x$. For $y$ replace the second column, not the first.' }]
	}
};

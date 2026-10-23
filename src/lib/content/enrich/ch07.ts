import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch07.area-scaling.1': {
		hints: ['For $\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ the determinant is $ad - bc$.', '$3\\cdot4 - 1\\cdot2$.']
	},
	'ch07.area-scaling.2': {
		hints: [
			'Use $ad - bc$: $1\\cdot4 - 2\\cdot2$.',
			'Notice the second column is twice the first, so the unit square is flattened to a segment.'
		]
	},
	'ch07.area-scaling.3': {
		hints: [
			'Scaling both axes by $3$ turns a $1\\times1$ square into a $3\\times3$ square.',
			'Area is length times width, so each factor of 3 contributes.'
		],
		notes: [
			'Right. A $1\\times1$ square becomes $3\\times3$, area $9$. The matrix is $3I$ with $\\det = 9$.',
			'No. Lengths are multiplied by $3$, but area depends on two lengths.',
			'No. $3 + 3$ is not how areas combine; they multiply: $3\\cdot3$.',
			'No. The map enlarges, so areas grow.'
		]
	},
	'ch07.area-scaling.4': {
		hints: [
			'$\\det A$ is the signed area of the image of the unit square. What does area $0$ mean for the two columns?',
			'The parallelogram collapses onto a line: the columns lie along one direction.'
		],
		notes: [
			'Right. Area $0$ means the columns are parallel (dependent), so the map squashes the plane and cannot be undone.',
			'No. Many nonzero matrices, like $\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$, have determinant $0$.',
			'No. Preserving areas means $|\\det A| = 1$.',
			'No. A rotation has determinant $1$.'
		]
	},
	'ch07.orientation.1': {
		hints: [
			'A reflection keeps lengths but flips left and right.',
			'Try the swap matrix $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ and compute its determinant.'
		],
		notes: [
			'Right. Area is preserved but orientation reverses, so $\\det = -1$.',
			'No. $+1$ is a rotation: it preserves orientation too.',
			'No. A reflection loses no information; $\\det = 0$ would flatten the plane.',
			'No. A determinant of $2$ would double areas, but a reflection preserves them.'
		]
	},
	'ch07.orientation.2': {
		hints: [
			'$\\det = \\cos\\theta\\cdot\\cos\\theta - (-\\sin\\theta)\\sin\\theta$.',
			'Use $\\cos^2\\theta + \\sin^2\\theta = 1$.'
		]
	},
	'ch07.orientation.3': {
		hints: [
			'The sign of the determinant tells you whether the map keeps the order of $\\hat\\imath,\\hat\\jmath$ (counter-clockwise) or flips it.',
			'Think of a mirror: it keeps size but flips handedness.'
		],
		notes: [
			'Right. The sign records orientation: $-$ means a flip, like a mirror image.',
			'No. Shrinking to zero would mean $\\det = 0$.',
			'No. A rotation has $\\det = +1$.',
			'No. A reflection preserves lengths and still has $\\det = -1$, so the sign is not about lengths.'
		]
	},
	'ch07.orientation.4': {
		hints: ['$ad - bc = 0\\cdot0 - 1\\cdot1$.', 'This is a reflection across $y = x$, so expect a negative sign.']
	},
	'ch07.multiplicativity.1': {
		hints: ['Use $\\det(AB) = \\det A\\cdot\\det B$.', '$3\\cdot(-2)$.']
	},
	'ch07.multiplicativity.2': {
		hints: [
			'From $AA^{-1} = I$ and multiplicativity: $\\det A\\cdot\\det(A^{-1}) = 1$.',
			'So $\\det(A^{-1}) = 1/\\det A$.'
		]
	},
	'ch07.multiplicativity.3': {
		hints: ['$\\det(A^3) = \\det(A)^3$ by multiplicativity.', '$2\\cdot2\\cdot2$.']
	},
	'ch07.multiplicativity.4': {
		hints: [
			'Test with $A = B = I_2$: compare $\\det(2I)$ with $\\det I + \\det I$.',
			'$\\det(2I_2) = 4$, but $1 + 1 = 2$.'
		],
		notes: [
			'Right. The determinant is multiplicative, not additive: $\\det(I + I) = 4\\ne2$.',
			'No. Counter-example: $A = B = I_2$ gives $4\\ne2$.',
			'No. The counter-example $A = B = I_2$ is a $2\\times2$ case.',
			'No. Invertibility does not help; the counter-example $A = B = I$ is invertible.'
		]
	},
	'ch07.cofactors.1': {
		hints: ['The matrix is diagonal, so the determinant is the product of the diagonal entries.', '$2\\cdot3\\cdot4$.']
	},
	'ch07.cofactors.2': {
		hints: [
			'The matrix is upper triangular, so the determinant is the product of the diagonal entries.',
			'$1\\cdot4\\cdot6$.'
		]
	},
	'ch07.cofactors.3': {
		hints: [
			'Compute for a $2\\times2$ example: swap the rows of $\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$ and take the determinant.',
			'A row swap reverses orientation.'
		],
		notes: [
			'Right. A row swap reverses orientation, so the determinant changes sign.',
			'No. Doubling would need a row scaled by $2$.',
			'No. Unchanged would be adding a multiple of one row to another.',
			'No. The determinant becomes $-\\det$, which is zero only if it already was.'
		]
	},
	'ch07.cofactors.4': {
		hints: [
			'Expand along the first column: it has a zero in row 2, making it cheaper.',
			'$2\\,(4\\cdot2 - 1\\cdot0) - 0 + 1\\,(1\\cdot1 - 3\\cdot4)$.'
		]
	}
};

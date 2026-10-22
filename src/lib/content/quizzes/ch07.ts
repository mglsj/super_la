import type { QuizBank } from '../types';

export const ch07: QuizBank = {
	'ch07.area-scaling': [
		{
			id: 'ch07.area-scaling.1',
			type: 'numeric',
			prompt: 'Compute $\\det\\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$.',
			answer: 10,
			explain: '$3\\cdot4 - 1\\cdot2 = 10$.'
		},
		{
			id: 'ch07.area-scaling.2',
			type: 'numeric',
			prompt: 'Compute $\\det\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$.',
			answer: 0,
			explain: '$1\\cdot4 - 2\\cdot2 = 0$. The columns are parallel, so the unit square is flattened.'
		},
		{
			id: 'ch07.area-scaling.3',
			type: 'mcq',
			prompt: 'A map scales both axes by $3$. By what factor are areas multiplied?',
			choices: ['9', '3', '6', '1/3'],
			answer: 0,
			explain: '$\\det\\begin{bmatrix}3&0\\\\0&3\\end{bmatrix} = 9$. Lengths triple in both directions.'
		},
		{
			id: 'ch07.area-scaling.4',
			type: 'mcq',
			prompt: '$\\det A = 0$ means…',
			choices: [
				'the columns are dependent and $A$ is not invertible',
				'$A$ is the zero matrix',
				'$A$ preserves areas',
				'$A$ is a rotation'
			],
			answer: 0,
			explain: 'Zero determinant means the map flattens space, so it cannot be undone.'
		}
	],
	'ch07.orientation': [
		{
			id: 'ch07.orientation.1',
			type: 'mcq',
			prompt: 'What is the determinant of a reflection?',
			choices: ['$-1$', '$+1$', '$0$', '$2$'],
			answer: 0,
			explain: 'A reflection preserves area but flips orientation.'
		},
		{
			id: 'ch07.orientation.2',
			type: 'numeric',
			prompt: 'What is the determinant of a rotation matrix $\\begin{bmatrix}\\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta\\end{bmatrix}$?',
			answer: 1,
			explain: '$\\cos^2\\theta + \\sin^2\\theta = 1$: no change in area, no flip.'
		},
		{
			id: 'ch07.orientation.3',
			type: 'mcq',
			prompt: 'A negative determinant means the map…',
			choices: ['reverses orientation', 'shrinks everything to zero', 'is a rotation', 'preserves lengths'],
			answer: 0,
			explain: 'The sign records whether space is flipped like a mirror image.'
		},
		{
			id: 'ch07.orientation.4',
			type: 'numeric',
			prompt: 'Compute $\\det\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$.',
			answer: -1,
			explain: '$0\\cdot0 - 1\\cdot1 = -1$. This matrix swaps $x$ and $y$, a reflection.'
		}
	],
	'ch07.multiplicativity': [
		{
			id: 'ch07.multiplicativity.1',
			type: 'numeric',
			prompt: '$\\det A = 3$ and $\\det B = -2$. What is $\\det(AB)$?',
			answer: -6,
			explain: '$\\det(AB) = \\det A \\cdot \\det B = 3\\cdot(-2) = -6$.'
		},
		{
			id: 'ch07.multiplicativity.2',
			type: 'numeric',
			prompt: '$\\det A = 4$. What is $\\det(A^{-1})$?',
			answer: 0.25,
			explain: '$\\det(A)\\det(A^{-1}) = \\det I = 1$, so $\\det(A^{-1}) = 1/4$.'
		},
		{
			id: 'ch07.multiplicativity.3',
			type: 'numeric',
			prompt: '$\\det A = 2$. What is $\\det(A^3)$?',
			answer: 8,
			explain: '$\\det(A^3) = (\\det A)^3 = 8$.'
		},
		{
			id: 'ch07.multiplicativity.4',
			type: 'mcq',
			prompt: 'Is $\\det(A + B) = \\det A + \\det B$ in general?',
			choices: ['No', 'Yes, always', 'Only for $2\\times2$ matrices', 'Only for invertible matrices'],
			answer: 0,
			explain: 'Determinants respect products, not sums. For $A = B = I_2$: $\\det(2I) = 4$, but $1 + 1 = 2$.'
		}
	],
	'ch07.cofactors': [
		{
			id: 'ch07.cofactors.1',
			type: 'numeric',
			prompt: 'Compute $\\det\\begin{bmatrix} 2 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 4 \\end{bmatrix}$.',
			answer: 24,
			explain: 'For a diagonal matrix the determinant is the product of the diagonal: $2\\cdot3\\cdot4$.'
		},
		{
			id: 'ch07.cofactors.2',
			type: 'numeric',
			prompt: 'Compute $\\det\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 0 & 0 & 6 \\end{bmatrix}$.',
			answer: 24,
			explain: 'Triangular: multiply the diagonal, $1\\cdot4\\cdot6 = 24$.'
		},
		{
			id: 'ch07.cofactors.3',
			type: 'mcq',
			prompt: 'Swapping two rows of a matrix does what to its determinant?',
			choices: ['Flips its sign', 'Doubles it', 'Leaves it unchanged', 'Makes it zero'],
			answer: 0,
			explain: 'A row swap reverses orientation, so the sign flips.'
		},
		{
			id: 'ch07.cofactors.4',
			type: 'numeric',
			prompt: 'Compute $\\det\\begin{bmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 1 \\\\ 1 & 0 & 2 \\end{bmatrix}$.',
			answer: 5,
			explain: 'Expand along row 1: $2(8 - 0) - 1(0 - 1) + 3(0 - 4) = 16 + 1 - 12 = 5$.'
		}
	]
};

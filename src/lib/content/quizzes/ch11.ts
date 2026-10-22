import type { QuizBank } from '../types';

export const ch11: QuizBank = {
	'ch11.inner-products': [
		{
			id: 'ch11.inner-products.1',
			type: 'mcq',
			prompt: 'Which of these is NOT one of the defining properties of an inner product?',
			choices: [
				'$\\langle\\mathbf u,\\mathbf v\\rangle \\ge \\|\\mathbf u\\|\\|\\mathbf v\\|$',
				'Symmetry: $\\langle\\mathbf u,\\mathbf v\\rangle = \\langle\\mathbf v,\\mathbf u\\rangle$',
				'Linearity in each slot',
				'Positive definiteness: $\\langle\\mathbf v,\\mathbf v\\rangle > 0$ for $\\mathbf v\\ne\\mathbf 0$'
			],
			answer: 0,
			explain: 'The first is not even true: Cauchy–Schwarz says $|\\langle\\mathbf u,\\mathbf v\\rangle| \\le \\|\\mathbf u\\|\\|\\mathbf v\\|$, the opposite direction.'
		},
		{
			id: 'ch11.inner-products.2',
			type: 'numeric',
			prompt: 'With $\\langle\\mathbf x,\\mathbf y\\rangle = x_1y_1 + 3x_2y_2$, compute $\\langle(1,2),(2,1)\\rangle$.',
			answer: 8,
			explain: '$1\\cdot2 + 3\\cdot2\\cdot1 = 2 + 6 = 8$.'
		},
		{
			id: 'ch11.inner-products.3',
			type: 'numeric',
			prompt: 'With the same inner product, what is the length $\\|(1,1)\\|$?',
			answer: 2,
			explain: '$\\langle(1,1),(1,1)\\rangle = 1 + 3 = 4$, so the length is $\\sqrt4 = 2$.'
		},
		{
			id: 'ch11.inner-products.4',
			type: 'mcq',
			prompt: 'The Cauchy–Schwarz inequality states…',
			choices: [
				'$|\\langle\\mathbf u,\\mathbf v\\rangle| \\le \\|\\mathbf u\\|\\,\\|\\mathbf v\\|$',
				'$\\|\\mathbf u + \\mathbf v\\| = \\|\\mathbf u\\| + \\|\\mathbf v\\|$',
				'$\\langle\\mathbf u,\\mathbf v\\rangle \\ge 0$',
				'$\\|\\mathbf u\\| \\le 1$'
			],
			answer: 0,
			explain: 'It is what guarantees that $\\cos\\theta = \\langle\\mathbf u,\\mathbf v\\rangle/(\\|\\mathbf u\\|\\|\\mathbf v\\|)$ lies in $[-1, 1]$.'
		}
	],
	'ch11.orthogonal-bases': [
		{
			id: 'ch11.orthogonal-bases.1',
			type: 'mcq',
			prompt: 'A basis is orthonormal when…',
			choices: [
				'its vectors have length 1 and are pairwise perpendicular',
				'its vectors have length 1',
				'its vectors are pairwise perpendicular',
				'its vectors are parallel'
			],
			answer: 0,
			explain: 'Ortho = perpendicular, normal = unit length. You need both.'
		},
		{
			id: 'ch11.orthogonal-bases.2',
			type: 'numeric',
			prompt: '$\\mathbf q_1 = (3/5, 4/5)$ and $\\mathbf q_2 = (-4/5, 3/5)$ are orthonormal. For $\\mathbf v = (5, 0)$ find the first coordinate $c_1 = \\mathbf q_1\\cdot\\mathbf v$.',
			answer: 3,
			explain: '$c_1 = \\frac35\\cdot5 + \\frac45\\cdot0 = 3$.'
		},
		{
			id: 'ch11.orthogonal-bases.3',
			type: 'numeric',
			prompt: 'With the same basis, find the second coordinate $c_2 = \\mathbf q_2\\cdot\\mathbf v$.',
			answer: -4,
			explain: '$c_2 = -\\frac45\\cdot5 + \\frac35\\cdot0 = -4$.'
		},
		{
			id: 'ch11.orthogonal-bases.4',
			type: 'numeric',
			prompt: 'A vector has coordinates $(3, -4)$ in an orthonormal basis. What is $\\|\\mathbf v\\|^2$?',
			answer: 25,
			explain: 'Lengths are preserved: $\\|\\mathbf v\\|^2 = 3^2 + (-4)^2 = 25$.'
		}
	],
	'ch11.gram-schmidt': [
		{
			id: 'ch11.gram-schmidt.1',
			type: 'vector',
			prompt: 'The first Gram–Schmidt step normalises $\\mathbf a = (3, 4)$. Give $\\mathbf q_1$.',
			answer: [0.6, 0.8],
			explain: '$\\|\\mathbf a\\| = 5$, so $\\mathbf q_1 = (3/5, 4/5) = (0.6, 0.8)$.'
		},
		{
			id: 'ch11.gram-schmidt.2',
			type: 'vector',
			prompt: 'With $\\mathbf a = (1, 0)$ and $\\mathbf b = (2, 3)$, compute the remainder $\\mathbf r = \\mathbf b - \\operatorname{proj}_{\\mathbf a}\\mathbf b$.',
			answer: [0, 3],
			explain: 'The projection of $\\mathbf b$ on the $x$-axis is $(2, 0)$, so $\\mathbf r = (0, 3)$.'
		},
		{
			id: 'ch11.gram-schmidt.3',
			type: 'numeric',
			prompt: 'With $\\mathbf a = (1,1)$ and $\\mathbf b = (1, 0)$, the remainder $\\mathbf r = (\\tfrac12, -\\tfrac12)$. What is $\\|\\mathbf r\\|$? (Give a decimal.)',
			answer: 0.7071,
			tol: 0.01,
			explain: '$\\|\\mathbf r\\| = \\sqrt{\\tfrac14 + \\tfrac14} = \\tfrac{\\sqrt2}{2} \\approx 0.7071$.'
		},
		{
			id: 'ch11.gram-schmidt.4',
			type: 'mcq',
			prompt: 'In the factorisation $A = QR$ from Gram–Schmidt, what is $R$?',
			choices: [
				'Upper triangular',
				'Orthogonal',
				'Lower triangular',
				'The identity'
			],
			answer: 0,
			explain: 'Each original column is a combination of only the first $k$ orthonormal vectors, which makes $R$ upper triangular.'
		}
	],
	'ch11.orthogonal-matrices': [
		{
			id: 'ch11.orthogonal-matrices.1',
			type: 'mcq',
			prompt: 'For an orthogonal matrix $Q$, the inverse is…',
			choices: ['$Q^{\\mathsf T}$', '$-Q$', '$Q^2$', '$\\det Q \\cdot Q$'],
			answer: 0,
			explain: '$Q^{\\mathsf T}Q = I$ is the definition, so $Q^{-1} = Q^{\\mathsf T}$.'
		},
		{
			id: 'ch11.orthogonal-matrices.2',
			type: 'numeric',
			prompt: 'An orthogonal $2\\times2$ matrix reflects the plane across a line. What is its determinant?',
			answer: -1,
			explain: 'Reflections reverse orientation; rotations have $\\det = +1$.'
		},
		{
			id: 'ch11.orthogonal-matrices.3',
			type: 'numeric',
			prompt: '$Q$ is orthogonal and $\\mathbf x = (3, 4)$. What is $\\|Q\\mathbf x\\|$?',
			answer: 5,
			explain: 'Orthogonal matrices preserve lengths: $\\|Q\\mathbf x\\| = \\|\\mathbf x\\| = 5$.'
		},
		{
			id: 'ch11.orthogonal-matrices.4',
			type: 'mcq',
			prompt: 'Is $\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$ an orthogonal matrix?',
			choices: [
				'No, its columns have length $\\sqrt2$, not 1',
				'Yes, its columns are perpendicular',
				'Yes, its determinant is $-2$',
				'No, it is not square'
			],
			answer: 0,
			explain: 'The columns are perpendicular but not unit length. Dividing by $\\sqrt2$ would make it orthogonal.'
		}
	]
};

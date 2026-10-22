import type { QuizBank } from '../types';

export const ch13: QuizBank = {
	'ch13.symmetric-matrices': [
		{
			id: 'ch13.symmetric-matrices.1',
			type: 'mcq',
			prompt: 'The eigenvalues of a real symmetric matrix are always…',
			choices: ['real', 'complex and non-real', 'positive', 'integers'],
			answer: 0,
			explain: 'This is the first half of the spectral theorem. (They need not be positive: $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has eigenvalues $\\pm1$.)'
		},
		{
			id: 'ch13.symmetric-matrices.2',
			type: 'mcq',
			prompt: 'Eigenvectors of a symmetric matrix belonging to different eigenvalues are…',
			choices: ['orthogonal', 'parallel', 'equal', 'always the zero vector'],
			answer: 0,
			explain: '$(\\lambda - \\mu)\\,\\mathbf u\\cdot\\mathbf v = 0$ with $\\lambda\\ne\\mu$ forces $\\mathbf u\\cdot\\mathbf v = 0$.'
		},
		{
			id: 'ch13.symmetric-matrices.3',
			type: 'vector',
			prompt: '$\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ has the eigenvector $(1,1)$ for $\\lambda = 3$. Give the eigenvector for $\\lambda = 1$ with first entry $1$.',
			answer: [1, -1],
			explain: 'It must be perpendicular to $(1,1)$. Check: $A(1,-1) = (2-1,\\ 1-2) = (1,-1)$.'
		},
		{
			id: 'ch13.symmetric-matrices.4',
			type: 'mcq',
			prompt: 'In $A = Q\\Lambda Q^{\\mathsf T}$ the matrix $Q$ is…',
			choices: ['orthogonal, with eigenvectors as columns', 'diagonal', 'the identity', 'upper triangular'],
			answer: 0,
			explain: 'The eigenvectors can be chosen orthonormal, so $Q^{-1} = Q^{\\mathsf T}$.'
		}
	],
	'ch13.rank-one-pieces': [
		{
			id: 'ch13.rank-one-pieces.1',
			type: 'numeric',
			prompt: '$A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ has $\\lambda_1 = 3$, $\\mathbf q_1 = (1,1)/\\sqrt2$. What is the top-left entry of $\\lambda_1\\mathbf q_1\\mathbf q_1^{\\mathsf T}$?',
			answer: 1.5,
			explain: '$\\mathbf q_1\\mathbf q_1^{\\mathsf T} = \\tfrac12\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$, so the entry is $3\\cdot\\tfrac12 = 1.5$.'
		},
		{
			id: 'ch13.rank-one-pieces.2',
			type: 'numeric',
			prompt: 'For the same $A$, $\\lambda_2 = 1$ and $\\mathbf q_2 = (1,-1)/\\sqrt2$. What is the top-right entry of $\\lambda_2\\mathbf q_2\\mathbf q_2^{\\mathsf T}$?',
			answer: -0.5,
			explain: '$\\mathbf q_2\\mathbf q_2^{\\mathsf T} = \\tfrac12\\begin{bmatrix}1&-1\\\\-1&1\\end{bmatrix}$. Adding it to the first piece gives top-right $1.5 - 0.5 = 1$, as in $A$.'
		},
		{
			id: 'ch13.rank-one-pieces.3',
			type: 'numeric',
			prompt: 'A symmetric matrix has eigenvalues $4,\\ 3,\\ 0$. What is the Frobenius error of the rank-1 approximation that keeps only the $\\lambda = 4$ piece?',
			answer: 3,
			explain: 'The error is $\\sqrt{3^2 + 0^2} = 3$, the size of what was left out.'
		},
		{
			id: 'ch13.rank-one-pieces.4',
			type: 'mcq',
			prompt: 'For symmetric $A$, the power $A^k$ equals…',
			choices: [
				'$\\sum_i \\lambda_i^k\\,\\mathbf q_i\\mathbf q_i^{\\mathsf T}$',
				'$\\sum_i k\\lambda_i\\,\\mathbf q_i\\mathbf q_i^{\\mathsf T}$',
				'$k\\sum_i \\mathbf q_i\\mathbf q_i^{\\mathsf T}$',
				'$\\lambda_1^k I$'
			],
			answer: 0,
			explain: 'Because the $\\mathbf q_i$ are orthonormal, the cross terms vanish and each piece is raised to the $k$-th power separately.'
		}
	],
	'ch13.quadratic-forms': [
		{
			id: 'ch13.quadratic-forms.1',
			type: 'numeric',
			prompt: 'What is the largest value of $\\mathbf x^{\\mathsf T}A\\mathbf x$ over unit vectors, for $A = \\begin{bmatrix}5&0\\\\0&2\\end{bmatrix}$?',
			answer: 5,
			explain: 'The maximum on the unit circle is the largest eigenvalue, $5$, attained at $(1,0)$.'
		},
		{
			id: 'ch13.quadratic-forms.2',
			type: 'numeric',
			prompt: 'For $A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ and $\\mathbf x = (1,0)$, compute $\\mathbf x^{\\mathsf T}A\\mathbf x$.',
			answer: 2,
			explain: '$A\\mathbf x = (2, 1)$ and $\\mathbf x\\cdot A\\mathbf x = 2$.'
		},
		{
			id: 'ch13.quadratic-forms.3',
			type: 'numeric',
			prompt: 'For the same $A$ and $\\mathbf x = (1,1)/\\sqrt2$, compute $\\mathbf x^{\\mathsf T}A\\mathbf x$.',
			answer: 3,
			explain: '$\\mathbf x$ is the eigenvector for $\\lambda = 3$, so the quotient equals $3$, the maximum.'
		},
		{
			id: 'ch13.quadratic-forms.4',
			type: 'mcq',
			prompt: 'The Rayleigh quotient $\\mathbf x^{\\mathsf T}A\\mathbf x/\\mathbf x^{\\mathsf T}\\mathbf x$ of a symmetric $A$ always lies…',
			choices: [
				'between $\\lambda_{\\min}$ and $\\lambda_{\\max}$',
				'above $\\lambda_{\\max}$',
				'below $\\lambda_{\\min}$',
				'at $\\operatorname{tr}A$'
			],
			answer: 0,
			explain: 'It is a weighted average $\\sum\\lambda_ic_i^2$ of the eigenvalues, with weights $c_i^2$ summing to $1$.'
		}
	]
};

import type { QuizBank } from '../types';

export const ch14: QuizBank = {
	'ch14.positive-definite': [
		{
			id: 'ch14.positive-definite.1',
			type: 'mcq',
			prompt: 'A symmetric matrix is positive definite exactly when…',
			choices: ['all its eigenvalues are positive', 'all its entries are positive', 'its determinant is positive', 'it is invertible'],
			answer: 0,
			explain: 'In the eigenbasis $\\mathbf x^{\\mathsf T}A\\mathbf x = \\sum\\lambda_ic_i^2$, positive for all nonzero $\\mathbf x$ iff every $\\lambda_i>0$. A positive determinant alone is not enough (two negative eigenvalues also give $\\det>0$).'
		},
		{
			id: 'ch14.positive-definite.2',
			type: 'mcq',
			prompt: 'Is $\\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$ positive definite?',
			choices: ['No, $ac - b^2 = -3 < 0$', 'Yes, all entries are positive', 'Yes, the trace is positive', 'Cannot tell'],
			answer: 0,
			explain: 'The eigenvalues are $3$ and $-1$: a saddle, not a bowl.'
		},
		{
			id: 'ch14.positive-definite.3',
			type: 'numeric',
			prompt: '$\\begin{bmatrix}2&b\\\\b&2\\end{bmatrix}$ is positive definite exactly when $|b| <$ what?',
			answer: 2,
			explain: 'We need $a = 2 > 0$ and $ac - b^2 = 4 - b^2 > 0$, so $|b| < 2$.'
		},
		{
			id: 'ch14.positive-definite.4',
			type: 'mcq',
			prompt: 'The form $\\mathbf x^{\\mathsf T}A\\mathbf x$ for $A = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ is…',
			choices: ['indefinite (a saddle)', 'positive definite', 'negative definite', 'zero'],
			answer: 0,
			explain: '$x^2 - y^2$ is positive along the $x$-axis and negative along the $y$-axis.'
		}
	],
	'ch14.tests-and-cholesky': [
		{
			id: 'ch14.tests-and-cholesky.1',
			type: 'numeric',
			prompt: 'What is the second leading principal minor of $\\begin{bmatrix}4&2\\\\2&3\\end{bmatrix}$?',
			answer: 8,
			explain: 'It is the whole determinant: $4\\cdot3 - 2\\cdot2 = 8$.'
		},
		{
			id: 'ch14.tests-and-cholesky.2',
			type: 'numeric',
			prompt: 'What is the second pivot when eliminating $\\begin{bmatrix}4&2\\\\2&3\\end{bmatrix}$?',
			answer: 2,
			explain: 'Subtract $\\tfrac12$ of row 1 from row 2: $3 - \\tfrac12\\cdot2 = 2$. It also equals the ratio of minors $8/4$.'
		},
		{
			id: 'ch14.tests-and-cholesky.3',
			type: 'numeric',
			prompt: 'The Cholesky factor of $\\begin{bmatrix}4&2\\\\2&3\\end{bmatrix}$ is $L = \\begin{bmatrix}2&0\\\\1&\\ell\\end{bmatrix}$. Find $\\ell$ (decimal).',
			answer: 1.414,
			tol: 0.01,
			explain: '$LL^{\\mathsf T}$ has bottom-right entry $1 + \\ell^2 = 3$, so $\\ell = \\sqrt2 \\approx 1.414$.'
		},
		{
			id: 'ch14.tests-and-cholesky.4',
			type: 'mcq',
			prompt: 'The Cholesky algorithm fails (needs the square root of a non-positive number) exactly when…',
			choices: ['the matrix is not positive definite', 'the matrix is large', 'the matrix is diagonal', 'the matrix has integer entries'],
			answer: 0,
			explain: 'It takes square roots of the pivots, so every pivot must be positive.'
		}
	],
	'ch14.where-they-come-from': [
		{
			id: 'ch14.where-they-come-from.1',
			type: 'mcq',
			prompt: '$A^{\\mathsf T}A$ is always…',
			choices: ['positive semidefinite', 'positive definite', 'invertible', 'diagonal'],
			answer: 0,
			explain: '$\\mathbf x^{\\mathsf T}A^{\\mathsf T}A\\mathbf x = \\|A\\mathbf x\\|^2 \\ge 0$.'
		},
		{
			id: 'ch14.where-they-come-from.2',
			type: 'mcq',
			prompt: '$A^{\\mathsf T}A$ is positive definite exactly when…',
			choices: ['$A$ has independent columns', '$A$ is square', '$A$ is symmetric', '$A$ has positive entries'],
			answer: 0,
			explain: '$\\|A\\mathbf x\\|^2 = 0$ only for $\\mathbf x = \\mathbf 0$ iff the null space is trivial iff the columns are independent.'
		},
		{
			id: 'ch14.where-they-come-from.3',
			type: 'numeric',
			prompt: '$A = \\begin{bmatrix}1&0\\\\0&2\\end{bmatrix}$. What is the condition number $\\lambda_{\\max}/\\lambda_{\\min}$ of $A^{\\mathsf T}A$?',
			answer: 4,
			explain: '$A^{\\mathsf T}A = \\operatorname{diag}(1, 4)$, so the ratio is $4$. Note it is the square of $\\kappa(A) = 2$.'
		},
		{
			id: 'ch14.where-they-come-from.4',
			type: 'numeric',
			prompt: 'For the $3\\times1$ matrix $A = (1, 2, 2)^{\\mathsf T}$, what is the $1\\times1$ matrix $A^{\\mathsf T}A$?',
			answer: 9,
			explain: '$1^2 + 2^2 + 2^2 = 9$, the squared length of the column.'
		}
	]
};

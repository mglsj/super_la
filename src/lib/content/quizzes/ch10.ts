import type { QuizBank } from '../types';

export const ch10: QuizBank = {
	'ch10.generalized-eigenvectors': [
		{
			id: 'ch10.generalized-eigenvectors.1',
			type: 'vector',
			prompt: 'Let $N = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$. Compute $N\\begin{pmatrix}3\\\\2\\end{pmatrix}$.',
			answer: [2, 0],
			explain: 'The matrix picks the second entry and moves it to the first slot: $(2, 0)$.'
		},
		{
			id: 'ch10.generalized-eigenvectors.2',
			type: 'numeric',
			prompt: 'For the same $N$, what is the smallest $k \\ge 1$ with $N^k = 0$?',
			answer: 2,
			explain: '$N^2 = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix} = 0$.'
		},
		{
			id: 'ch10.generalized-eigenvectors.3',
			type: 'mcq',
			prompt: '$\\mathbf v$ is a generalised eigenvector of $A$ for $\\lambda$ if…',
			choices: [
				'$(A - \\lambda I)^k\\mathbf v = \\mathbf 0$ for some $k$',
				'$A\\mathbf v = \\lambda\\mathbf v$ only',
				'$\\mathbf v$ is orthogonal to the eigenvectors',
				'$A^k = \\lambda^k I$'
			],
			answer: 0,
			explain: 'Repeatedly applying $A - \\lambda I$ eventually kills $\\mathbf v$. With $k = 1$ you recover ordinary eigenvectors.'
		}
	],
	'ch10.jordan-blocks': [
		{
			id: 'ch10.jordan-blocks.1',
			type: 'numeric',
			prompt: 'For $J = \\begin{bmatrix}3&1\\\\0&3\\end{bmatrix}$, what is the top-right entry of $J^2$?',
			answer: 6,
			explain: '$J^2 = \\begin{bmatrix}9 & 6\\\\0&9\\end{bmatrix}$; the entry is $k\\lambda^{k-1} = 2\\cdot3 = 6$.'
		},
		{
			id: 'ch10.jordan-blocks.2',
			type: 'mcq',
			prompt: 'A matrix is diagonalisable exactly when its Jordan form has…',
			choices: ['only blocks of size 1', 'only one block', 'no zero eigenvalues', 'distinct blocks'],
			answer: 0,
			explain: 'Blocks of size 1 are just diagonal entries.'
		},
		{
			id: 'ch10.jordan-blocks.3',
			type: 'mcq',
			prompt: 'The number of Jordan blocks for an eigenvalue $\\lambda$ equals…',
			choices: [
				'its geometric multiplicity',
				'its algebraic multiplicity',
				'the size of the matrix',
				'its absolute value'
			],
			answer: 0,
			explain: 'Each block contributes exactly one independent eigenvector, the end of its chain.'
		}
	]
};

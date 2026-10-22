import type { QuizBank } from '../types';

export const ch08: QuizBank = {
	'ch08.stay-on-the-line': [
		{
			id: 'ch08.stay-on-the-line.1',
			type: 'mcq',
			prompt: 'If $A\\mathbf v = \\lambda\\mathbf v$ with $\\mathbf v \\ne \\mathbf 0$, then $\\mathbf v$ is called…',
			choices: ['an eigenvector of $A$', 'a kernel vector', 'a pivot', 'an orthogonal vector'],
			answer: 0,
			explain: '$A$ only stretches or flips $\\mathbf v$; it does not turn it. $\\lambda$ is the eigenvalue.'
		},
		{
			id: 'ch08.stay-on-the-line.2',
			type: 'numeric',
			prompt: 'For $A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 5 \\end{bmatrix}$, what is the eigenvalue of the eigenvector $(0, 1)$?',
			answer: 5,
			explain: '$A(0,1) = (0, 5) = 5\\cdot(0,1)$.'
		},
		{
			id: 'ch08.stay-on-the-line.3',
			type: 'mcq',
			prompt: '$\\mathbf v$ is an eigenvector of $A$. Is $3\\mathbf v$ also an eigenvector?',
			choices: ['Yes, with the same eigenvalue', 'No', 'Yes, with eigenvalue tripled', 'Only if $\\lambda = 1$'],
			answer: 0,
			explain: '$A(3\\mathbf v) = 3A\\mathbf v = 3\\lambda\\mathbf v = \\lambda(3\\mathbf v)$.'
		},
		{
			id: 'ch08.stay-on-the-line.4',
			type: 'numeric',
			prompt: 'For $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ the vector $(1, 0)$ is an eigenvector. What is its eigenvalue?',
			answer: 3,
			explain: '$A(1,0) = (3, 0) = 3\\cdot(1,0)$.'
		}
	],
	'ch08.characteristic-polynomial': [
		{
			id: 'ch08.characteristic-polynomial.1',
			type: 'numeric',
			prompt: 'Find the larger eigenvalue of $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$.',
			answer: 3,
			explain: '$\\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3)$, so the eigenvalues are $1$ and $3$.'
		},
		{
			id: 'ch08.characteristic-polynomial.2',
			type: 'numeric',
			prompt: 'Find the smaller eigenvalue of $\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$.',
			answer: 2,
			explain: 'Trace $7$, determinant $10$: $\\lambda^2 - 7\\lambda + 10 = (\\lambda - 2)(\\lambda - 5)$.'
		},
		{
			id: 'ch08.characteristic-polynomial.3',
			type: 'numeric',
			prompt: 'A $2\\times2$ matrix has eigenvalues $2$ and $5$. What is its trace?',
			answer: 7,
			explain: 'The trace equals the sum of the eigenvalues.'
		},
		{
			id: 'ch08.characteristic-polynomial.4',
			type: 'mcq',
			prompt: 'A square matrix is singular exactly when…',
			choices: ['$0$ is an eigenvalue', '$1$ is an eigenvalue', 'it has complex eigenvalues', 'it is symmetric'],
			answer: 0,
			explain: '$\\det A$ is the product of the eigenvalues, so it is $0$ iff some eigenvalue is $0$.'
		},
		{
			id: 'ch08.characteristic-polynomial.5',
			type: 'vector',
			prompt: 'Find the eigenvector of $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ for $\\lambda = 3$ whose first entry is $1$.',
			answer: [1, 1],
			explain: '$(A - 3I)\\mathbf v = \\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix}\\mathbf v = \\mathbf 0$ gives $v_2 = v_1$.'
		}
	],
	'ch08.complex-eigenvalues': [
		{
			id: 'ch08.complex-eigenvalues.1',
			type: 'mcq',
			prompt: 'Does a $90^\\circ$ rotation of the plane have a real eigenvector?',
			choices: ['No, every direction is turned', 'Yes, the $x$-axis', 'Yes, every vector', 'Only the zero vector'],
			answer: 0,
			explain: 'Every nonzero vector is rotated off its line. The eigenvalues are $\\pm i$, which are not real.'
		},
		{
			id: 'ch08.complex-eigenvalues.2',
			type: 'numeric',
			prompt: 'The matrix $2\\begin{bmatrix}\\cos\\varphi & -\\sin\\varphi \\\\ \\sin\\varphi & \\cos\\varphi\\end{bmatrix}$ has eigenvalues $2e^{\\pm i\\varphi}$. What is their modulus $|\\lambda|$?',
			answer: 2,
			explain: '$|2e^{i\\varphi}| = 2$: the scaling factor per step.'
		},
		{
			id: 'ch08.complex-eigenvalues.3',
			type: 'mcq',
			prompt: 'All eigenvalues of $A$ have $|\\lambda| < 1$. What happens to $A^k\\mathbf x$ as $k$ grows?',
			choices: ['It shrinks towards $\\mathbf 0$', 'It blows up', 'It stays constant', 'It oscillates forever'],
			answer: 0,
			explain: 'Each eigen-component is multiplied by $\\lambda^k \\to 0$.'
		},
		{
			id: 'ch08.complex-eigenvalues.4',
			type: 'mcq',
			prompt: 'A real matrix has the complex eigenvalue $1 + 2i$. Which other eigenvalue must it have?',
			choices: ['$1 - 2i$', '$-1 + 2i$', '$2 + i$', 'None'],
			answer: 0,
			explain: 'Non-real eigenvalues of a real matrix come in conjugate pairs.'
		}
	]
};

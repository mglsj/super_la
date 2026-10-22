import type { QuizBank } from '../types';

export const ch21: QuizBank = {
	'ch21.dual-space': [
		{
			id: 'ch21.dual-space.1',
			type: 'mcq',
			prompt: 'A linear functional on $V$ is…',
			choices: ['a linear map $V\\to\\mathbb{R}$', 'a vector in $V$', 'a matrix with $\\det = 1$', 'a basis of $V$'],
			answer: 0,
			explain: 'It eats a vector and returns a number, linearly.'
		},
		{
			id: 'ch21.dual-space.2',
			type: 'numeric',
			prompt: 'What is the dimension of the dual space of $\\mathbb{R}^5$?',
			answer: 5,
			explain: '$\\dim V^* = \\dim V$.'
		},
		{
			id: 'ch21.dual-space.3',
			type: 'mcq',
			prompt: 'If the columns of $P$ form a basis, the dual basis functionals are…',
			choices: ['the rows of $P^{-1}$', 'the rows of $P$', 'the columns of $P^{\\mathsf T}$', 'the columns of $P^{-1}$'],
			answer: 0,
			explain: '$P^{-1}P = I$ says that row $i$ of $P^{-1}$ gives $1$ on $\\mathbf b_i$ and $0$ on the other $\\mathbf b_j$.'
		},
		{
			id: 'ch21.dual-space.4',
			type: 'numeric',
			prompt: 'Basis $\\mathbf b_1 = (1,0),\\ \\mathbf b_2 = (1,1)$. Evaluate the dual basis functional $\\varphi_2$ at $\\mathbf v = (3, 2)$ (that is, the second coordinate of $\\mathbf v$).',
			answer: 2,
			explain: '$\\mathbf v = 1\\cdot\\mathbf b_1 + 2\\cdot\\mathbf b_2$, so $\\varphi_2(\\mathbf v) = 2$.'
		}
	],
	'ch21.dual-map': [
		{
			id: 'ch21.dual-map.1',
			type: 'mcq',
			prompt: 'The dual map $T^*$ of $T$ is defined by…',
			choices: ['$(T^*\\varphi)(\\mathbf v) = \\varphi(T\\mathbf v)$', '$T^*\\varphi = T\\varphi$', '$T^* = T^{-1}$', '$T^*\\varphi = \\varphi + T$'],
			answer: 0,
			explain: 'Pull the measurement back through $T$: first apply $T$, then measure.'
		},
		{
			id: 'ch21.dual-map.2',
			type: 'numeric',
			prompt: '$A = \\begin{bmatrix}1&1\\\\0&2\\end{bmatrix}$, $\\mathbf w = (1, 0.5)$, $\\mathbf x = (1.5, 1)$. Compute $\\mathbf w\\cdot(A\\mathbf x)$.',
			answer: 3.5,
			explain: '$A\\mathbf x = (2.5, 2)$, so $\\mathbf w\\cdot A\\mathbf x = 1\\cdot2.5 + 0.5\\cdot2 = 3.5$. The same number comes from $(A^{\\mathsf T}\\mathbf w)\\cdot\\mathbf x$.'
		},
		{
			id: 'ch21.dual-map.3',
			type: 'mcq',
			prompt: 'The matrix of the dual map, in dual bases, is…',
			choices: ['$A^{\\mathsf T}$', '$A^{-1}$', '$A$', '$A^2$'],
			answer: 0,
			explain: 'This is the conceptual meaning of the transpose.'
		},
		{
			id: 'ch21.dual-map.4',
			type: 'mcq',
			prompt: 'Why do $A$ and $A^{\\mathsf T}$ have the same rank?',
			choices: [
				'The image of $T^*$ is the annihilator of $\\ker T$, which has dimension $\\dim V - \\dim\\ker T$',
				'Because they have the same entries',
				'Because $A$ is symmetric',
				'It is a coincidence'
			],
			answer: 0,
			explain: 'So $\\operatorname{rank}T^* = \\dim V - \\dim\\ker T = \\operatorname{rank}T$.'
		}
	],
	'ch21.bilinear-forms': [
		{
			id: 'ch21.bilinear-forms.1',
			type: 'mcq',
			prompt: 'Under a change of basis $P$, the matrix of a bilinear form transforms as…',
			choices: ['$P^{\\mathsf T}MP$', '$P^{-1}MP$', '$PMP^{-1}$', '$M + P$'],
			answer: 0,
			explain: '$B(P\\mathbf x, P\\mathbf y) = \\mathbf x^{\\mathsf T}(P^{\\mathsf T}MP)\\mathbf y$. A linear map instead transforms as $P^{-1}MP$.'
		},
		{
			id: 'ch21.bilinear-forms.2',
			type: 'mcq',
			prompt: 'When do $P^{\\mathsf T}MP$ and $P^{-1}MP$ coincide?',
			choices: ['When $P$ is orthogonal', 'Never', 'When $M$ is the identity', 'When $P$ is symmetric'],
			answer: 0,
			explain: 'They agree if $P^{\\mathsf T} = P^{-1}$, i.e. $P$ is orthogonal.'
		},
		{
			id: 'ch21.bilinear-forms.3',
			type: 'mcq',
			prompt: 'Sylvester\'s law of inertia says congruence preserves…',
			choices: [
				'the numbers of positive, negative and zero eigenvalues',
				'the eigenvalues themselves',
				'the determinant',
				'the trace'
			],
			answer: 0,
			explain: 'The signature is invariant. The sizes of the eigenvalues are not.'
		},
		{
			id: 'ch21.bilinear-forms.4',
			type: 'numeric',
			prompt: '$M = \\operatorname{diag}(1, -1)$ and $P = \\operatorname{diag}(2, 3)$. What is the bottom-right entry of $P^{\\mathsf T}MP$?',
			answer: -9,
			explain: '$P^{\\mathsf T}MP = \\operatorname{diag}(4, -9)$. The sign is preserved, but the size changed.'
		}
	]
};

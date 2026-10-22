import type { QuizBank } from '../types';

export const ch19: QuizBank = {
	'ch19.kronecker-product': [
		{
			id: 'ch19.kronecker-product.1',
			type: 'numeric',
			prompt: '$A$ is $2\\times3$ and $B$ is $4\\times5$. How many rows does $A\\otimes B$ have?',
			answer: 8,
			explain: 'Row counts multiply: $2\\cdot4 = 8$ (and it has $3\\cdot5 = 15$ columns).'
		},
		{
			id: 'ch19.kronecker-product.2',
			type: 'numeric',
			prompt: '$A = \\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$ and $B = \\begin{bmatrix}1&-1\\\\1&1\\end{bmatrix}$. What is the top-right entry of $A\\otimes B$ (row 1, column 4)?',
			answer: -2,
			explain: 'The top-right block is $a_{12}B = 2B$, and its top-right entry is $2\\cdot(-1) = -2$.'
		},
		{
			id: 'ch19.kronecker-product.3',
			type: 'numeric',
			prompt: '$A$ has eigenvalues $2, 3$ and $B$ has eigenvalues $5, 7$. What is the largest eigenvalue of $A\\otimes B$?',
			answer: 21,
			explain: 'The eigenvalues of $A\\otimes B$ are all products $\\lambda_i\\mu_j$; the largest is $3\\cdot7 = 21$.'
		},
		{
			id: 'ch19.kronecker-product.4',
			type: 'mcq',
			prompt: 'The mixed-product rule states…',
			choices: [
				'$(A\\otimes B)(C\\otimes D) = AC\\otimes BD$',
				'$(A\\otimes B)(C\\otimes D) = AD\\otimes BC$',
				'$A\\otimes B = B\\otimes A$',
				'$(A\\otimes B)^{-1} = A\\otimes B^{-1}$'
			],
			answer: 0,
			explain: 'Multiplication happens factor by factor.'
		}
	],
	'ch19.vectorisation': [
		{
			id: 'ch19.vectorisation.1',
			type: 'mcq',
			prompt: 'The identity $\\operatorname{vec}(AXB) = (\\ ?\\ )\\operatorname{vec}(X)$ has which matrix in the brackets?',
			choices: ['$B^{\\mathsf T}\\otimes A$', '$A\\otimes B$', '$A^{\\mathsf T}\\otimes B$', '$B\\otimes A^{\\mathsf T}$'],
			answer: 0,
			explain: 'Stacking columns makes $B$ act on the right through its transpose.'
		},
		{
			id: 'ch19.vectorisation.2',
			type: 'numeric',
			prompt: '$X$ is $10\\times10$. How many entries does the Kronecker matrix $B^{\\mathsf T}\\otimes A$ have (both $10\\times10$)?',
			answer: 10000,
			explain: 'It is $100\\times100$: $10^4 = 10{,}000$ entries.'
		},
		{
			id: 'ch19.vectorisation.3',
			type: 'mcq',
			prompt: 'To compute $AXB$ for $n\\times n$ matrices, what is the sensible approach?',
			choices: [
				'Two ordinary matrix products',
				'Build the Kronecker matrix and multiply',
				'Invert $A$ first',
				'Use Cramer\'s rule'
			],
			answer: 0,
			explain: 'Two products cost about $2n^3$; the Kronecker route costs about $n^4$ and needs far more memory.'
		},
		{
			id: 'ch19.vectorisation.4',
			type: 'numeric',
			prompt: 'Applying the Kronecker matrix costs $n^4$ and two small products cost $2n^3$. For $n = 1000$, roughly how many times cheaper is the shortcut? ($n/2$)',
			answer: 500,
			explain: '$n^4 / (2n^3) = n/2 = 500$.'
		}
	],
	'ch19.tensors': [
		{
			id: 'ch19.tensors.1',
			type: 'numeric',
			prompt: 'A colour image is height $\\times$ width $\\times$ 3 channels. How many indices (the order) does this tensor have?',
			answer: 3,
			explain: 'Three indices: row, column and channel.'
		},
		{
			id: 'ch19.tensors.2',
			type: 'mcq',
			prompt: 'A rank-one 3-way tensor has entries…',
			choices: ['$a_ib_jc_k$', '$a_i + b_j + c_k$', '$a_ib_i c_i$', '$\\max(a_i,b_j,c_k)$'],
			answer: 0,
			explain: 'It is the outer product $\\mathbf a\\circ\\mathbf b\\circ\\mathbf c$.'
		},
		{
			id: 'ch19.tensors.3',
			type: 'mcq',
			prompt: 'Which statement about tensor rank is true?',
			choices: [
				'Computing it is NP-hard in general',
				'It is computed by Gaussian elimination',
				'It never depends on the field',
				'Best low-rank approximations always exist'
			],
			answer: 0,
			explain: 'Unlike matrices, tensors have no Eckart–Young theorem, and rank is hard to compute and can depend on the field.'
		},
		{
			id: 'ch19.tensors.4',
			type: 'numeric',
			prompt: 'Unfolding a $2\\times2\\times2$ tensor along one index gives a $2\\times4$ matrix. How many entries does it have?',
			answer: 8,
			explain: 'Unfolding only rearranges the entries: $2\\cdot2\\cdot2 = 8$.'
		}
	]
};

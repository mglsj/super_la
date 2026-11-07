import type { QuizBank } from '../types';

export const ch05: QuizBank = {
	'ch05.independence': [
		{
			id: 'ch05.independence.1',
			type: 'mcq',
			prompt: 'Are $(1,2)$ and $(2,4)$ independent?',
			choices: ['No, the second is twice the first', 'Yes', 'Only in $\\mathbb{R}^3$', 'Cannot tell'],
			answer: 0,
			explain: '$2\\cdot(1,2) - (2,4) = \\mathbf 0$ is a nontrivial combination giving zero.'
		},
		{
			id: 'ch05.independence.2',
			type: 'mcq',
			prompt: 'Three vectors in $\\mathbb{R}^2$ are always…',
			choices: ['dependent', 'independent', 'a basis', 'parallel'],
			answer: 0,
			explain: 'The matrix of columns has more columns than rows, so there must be a free column.'
		},
		{
			id: 'ch05.independence.3',
			type: 'numeric',
			prompt: 'For which value of $c$ are $(1, 2)$ and $(3, c)$ dependent?',
			answer: 6,
			explain: '$(3, c) = 3(1, 2)$ forces $c = 6$.'
		},
		{
			id: 'ch05.independence.4',
			type: 'mcq',
			prompt: 'A list of vectors that contains the zero vector is…',
			choices: ['always dependent', 'always independent', 'a basis', 'empty'],
			answer: 0,
			explain: '$1\\cdot\\mathbf 0 + 0\\cdot\\mathbf v_2 + \\dots = \\mathbf 0$ is a nontrivial combination.'
		},
		{
			id: 'ch05.independence.5',
			type: 'numeric',
			prompt: 'For which value of $k$ do $(1,1,0)$, $(0,1,1)$, $(1,0,k)$ fail to form a basis of $\\mathbb R^3$?',
			answer: -1,
			explain: 'With the vectors as columns, $\\det = 1(1\\cdot k - 0\\cdot1) - 0 + 1(1\\cdot1 - 1\\cdot0) = k + 1$. It vanishes only for $k = -1$; then $(1,1,0) - (0,1,1) = (1,0,-1)$, the third vector.'
		},
		{
			id: 'ch05.independence.6',
			type: 'vector',
			prompt: 'The vectors $\\mathbf v_1 = (1,1,0)$, $\\mathbf v_2 = (0,1,1)$, $\\mathbf v_3 = (1,2,1)$ are dependent. Give coefficients $(c_1,c_2,c_3)$ with $c_1\\mathbf v_1 + c_2\\mathbf v_2 + c_3\\mathbf v_3 = \\mathbf 0$ and $c_3 = -1$.',
			answer: [1, 1, -1],
			explain: '$\\mathbf v_1 + \\mathbf v_2 = (1,2,1) = \\mathbf v_3$, so $\\mathbf v_1 + \\mathbf v_2 - \\mathbf v_3 = \\mathbf 0$: $(c_1,c_2,c_3) = (1,1,-1)$.'
		}
	],
	'ch05.basis': [
		{
			id: 'ch05.basis.1',
			type: 'mcq',
			prompt: 'A basis of a space is a list that is…',
			choices: [
				'independent and spans the space',
				'independent but need not span',
				'spanning but may be dependent',
				'orthogonal'
			],
			answer: 0,
			explain: 'Spanning means enough vectors, independent means no wasted ones.'
		},
		{
			id: 'ch05.basis.2',
			type: 'mcq',
			prompt: 'Do $(1,1)$ and $(1,-1)$ form a basis of $\\mathbb{R}^2$?',
			choices: ['Yes', 'No, they are parallel', 'No, they are too short', 'Only after normalising'],
			answer: 0,
			explain: 'The determinant of the matrix with these columns is $-1 - 1 = -2 \\ne 0$, so they are independent, and two independent vectors span $\\mathbb{R}^2$.'
		},
		{
			id: 'ch05.basis.3',
			type: 'mcq',
			prompt: 'Is $\\{(1,0), (2,0)\\}$ a basis of $\\mathbb{R}^2$?',
			choices: ['No, they are dependent and do not span', 'Yes', 'Only for the $x$-axis', 'Yes, if scaled'],
			answer: 0,
			explain: 'Both lie on the $x$-axis, so they span only that line.'
		},
		{
			id: 'ch05.basis.4',
			type: 'numeric',
			prompt: 'What is the area of the grid tile spanned by $\\mathbf b_1 = (2, 1)$ and $\\mathbf b_2 = (-1, 2)$?',
			answer: 5,
			explain: '$|\\det| = |2\\cdot2 - (-1)\\cdot1| = 5$.'
		}
	],
	'ch05.coordinates': [
		{
			id: 'ch05.coordinates.1',
			type: 'vector',
			prompt: 'In the basis $\\mathbf b_1 = (1, 0),\\ \\mathbf b_2 = (1, 1)$, find the coordinates of $\\mathbf v = (3, 2)$.',
			answer: [1, 2],
			explain: '$c_2 = 2$ from the second entry, then $c_1 + c_2 = 3$ gives $c_1 = 1$. Check: $(1,0) + 2(1,1) = (3,2)$.'
		},
		{
			id: 'ch05.coordinates.2',
			type: 'vector',
			prompt: 'In the basis $(2, 0),\\ (1, 2)$, find the coordinates of $(5, 4)$.',
			answer: [1.5, 2],
			explain: '$2c_2 = 4$ gives $c_2 = 2$. Then $2c_1 + 2 = 5$ gives $c_1 = 1.5$.'
		},
		{
			id: 'ch05.coordinates.3',
			type: 'mcq',
			prompt: 'If $P$ has the basis vectors as columns, then $[\\mathbf v]_B$ equals…',
			choices: ['$P^{-1}\\mathbf v$', '$P\\mathbf v$', '$P^{\\mathsf T}\\mathbf v$', '$\\mathbf v / P$'],
			answer: 0,
			explain: '$\\mathbf v = P[\\mathbf v]_B$, so multiply both sides by $P^{-1}$.'
		},
		{
			id: 'ch05.coordinates.4',
			type: 'vector',
			prompt: 'Find the coordinates of $(4, 4)$ in the basis $(1, 1),\\ (1, -1)$.',
			answer: [4, 0],
			explain: '$(4,4) = 4\\cdot(1,1) + 0\\cdot(1,-1)$.'
		},
		{
			id: 'ch05.coordinates.5',
			type: 'vector',
			prompt: 'In the ordered basis $B = (1 + t,\\ t)$ of $P_1$, find $[q]_B$ for $q(t) = 3 + 5t$.',
			answer: [3, 2],
			explain: '$\\alpha(1 + t) + \\beta t = \\alpha + (\\alpha + \\beta)t$. Constant: $\\alpha = 3$; $t$: $\\alpha + \\beta = 5$, so $\\beta = 2$.'
		},
		{
			id: 'ch05.coordinates.6',
			type: 'vector',
			prompt: 'In the ordered basis $B = (1,\\ t - 1,\\ (t - 1)^2)$ of $P_2$, find $[t^2]_B$.',
			answer: [1, 2, 1],
			explain: '$t^2 = ((t - 1) + 1)^2 = 1 + 2(t - 1) + (t - 1)^2$, so $[t^2]_B = (1, 2, 1)$. (Check by expanding: $1 + 2t - 2 + t^2 - 2t + 1 = t^2$ ✓.)'
		}
	],
	'ch05.dimension': [
		{
			id: 'ch05.dimension.1',
			type: 'numeric',
			prompt: 'What is the dimension of the space of polynomials of degree at most 3?',
			answer: 4,
			explain: 'A basis is $1, x, x^2, x^3$: four vectors.'
		},
		{
			id: 'ch05.dimension.2',
			type: 'numeric',
			prompt: 'What is the dimension of the space of $2\\times3$ matrices?',
			answer: 6,
			explain: 'There are $2\\cdot3 = 6$ entries, one basis matrix for each.'
		},
		{
			id: 'ch05.dimension.3',
			type: 'mcq',
			prompt: 'In $\\mathbb{R}^4$, four independent vectors…',
			choices: ['automatically form a basis', 'never span', 'are always orthogonal', 'must include the zero vector'],
			answer: 0,
			explain: 'Four independent vectors in a 4-dimensional space span it, since all bases have exactly 4 vectors.'
		},
		{
			id: 'ch05.dimension.4',
			type: 'numeric',
			prompt: 'What is the dimension of the span of $(1,0,0),\\ (0,1,0),\\ (1,1,0)$?',
			answer: 2,
			explain: 'The third vector is the sum of the first two, so the span is the $xy$-plane.'
		},
		{
			id: 'ch05.dimension.5',
			type: 'numeric',
			prompt: '$U$ and $W$ are 3-dimensional subspaces of $\\mathbb R^4$. What is the smallest possible dimension of $U\\cap W$?',
			answer: 2,
			explain: '$\\dim(U\\cap W) = \\dim U + \\dim W - \\dim(U + W)\\ge3 + 3 - 4 = 2$, and $U = \\{x_4 = 0\\}$, $W = \\{x_1 = 0\\}$ attain it.'
		},
		{
			id: 'ch05.dimension.6',
			type: 'numeric',
			prompt: 'What is the dimension of the space of $2\\times2$ matrices $X$ with $XD = DX$, where $D = \\operatorname{diag}(1,2)$?',
			answer: 2,
			explain: 'With $X = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$: $XD = \\begin{bmatrix}a&2b\\\\c&2d\\end{bmatrix}$ and $DX = \\begin{bmatrix}a&b\\\\2c&2d\\end{bmatrix}$. So $2b = b$ and $c = 2c$, giving $b = c = 0$: the diagonal matrices, dimension $2$.'
		}
	]
};

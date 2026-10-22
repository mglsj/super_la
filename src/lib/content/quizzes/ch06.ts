import type { QuizBank } from '../types';

export const ch06: QuizBank = {
	'ch06.linear-maps': [
		{
			id: 'ch06.linear-maps.1',
			type: 'mcq',
			prompt: 'Which of these maps $\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear?',
			choices: ['$T(x,y) = (x + y,\\ 2x)$', '$T(x,y) = (x + 1,\\ y)$', '$T(x,y) = (x^2,\\ y)$', '$T(x,y) = (xy,\\ x)$'],
			answer: 0,
			explain: 'Each output is a sum of constants times $x$ and $y$. The others have a constant shift or a nonlinear term.'
		},
		{
			id: 'ch06.linear-maps.2',
			type: 'mcq',
			prompt: 'If $T$ is linear, what is $T(\\mathbf 0)$?',
			choices: ['$\\mathbf 0$', '$\\mathbf 1$', 'It depends on $T$', 'Undefined'],
			answer: 0,
			explain: '$T(\\mathbf 0) = T(0\\cdot\\mathbf v) = 0\\cdot T(\\mathbf v) = \\mathbf 0$.'
		},
		{
			id: 'ch06.linear-maps.3',
			type: 'vector',
			prompt: 'A linear $T$ has $T(1,0) = (2,3)$ and $T(0,1) = (1,-1)$. Find $T(1,1)$.',
			answer: [3, 2],
			explain: '$T(1,1) = T(1,0) + T(0,1) = (2,3) + (1,-1) = (3, 2)$.'
		},
		{
			id: 'ch06.linear-maps.4',
			type: 'vector',
			prompt: 'For the same $T$, find $T(2,3)$.',
			answer: [7, 3],
			explain: '$T(2,3) = 2(2,3) + 3(1,-1) = (4,6) + (3,-3) = (7, 3)$.'
		}
	],
	'ch06.kernel-image': [
		{
			id: 'ch06.kernel-image.1',
			type: 'mcq',
			prompt: 'A linear map $T$ is one-to-one exactly when…',
			choices: ['$\\ker T = \\{\\mathbf 0\\}$', '$\\operatorname{Im} T = \\{\\mathbf 0\\}$', '$T$ is the zero map', '$T$ is a square matrix'],
			answer: 0,
			explain: 'If $T\\mathbf u = T\\mathbf v$ then $\\mathbf u - \\mathbf v\\in\\ker T$. A trivial kernel forces $\\mathbf u = \\mathbf v$.'
		},
		{
			id: 'ch06.kernel-image.2',
			type: 'vector',
			prompt: 'Find the vector in the kernel of $\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$ whose first entry is $1$.',
			answer: [1, -1],
			explain: '$x + y = 0$ with $x = 1$ gives $y = -1$.'
		},
		{
			id: 'ch06.kernel-image.3',
			type: 'numeric',
			prompt: 'What is the dimension of the image of $\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$?',
			answer: 1,
			explain: 'Both columns equal $(1,1)$, so every output is a multiple of $(1,1)$: a line.'
		},
		{
			id: 'ch06.kernel-image.4',
			type: 'mcq',
			prompt: 'If $T\\mathbf u = T\\mathbf v$ for a linear $T$, then…',
			choices: ['$\\mathbf u - \\mathbf v \\in \\ker T$', '$\\mathbf u = \\mathbf v$', '$\\mathbf u + \\mathbf v = \\mathbf 0$', '$T = 0$'],
			answer: 0,
			explain: '$T(\\mathbf u - \\mathbf v) = T\\mathbf u - T\\mathbf v = \\mathbf 0$.'
		}
	],
	'ch06.rank-nullity': [
		{
			id: 'ch06.rank-nullity.1',
			type: 'numeric',
			prompt: 'A linear map $T: \\mathbb{R}^5 \\to \\mathbb{R}^3$ is onto. What is $\\dim\\ker T$?',
			answer: 2,
			explain: 'Onto means rank $= 3$, so nullity $= 5 - 3 = 2$.'
		},
		{
			id: 'ch06.rank-nullity.2',
			type: 'numeric',
			prompt: 'A $4\\times6$ matrix has rank $3$. What is the dimension of its null space?',
			answer: 3,
			explain: 'The matrix has $n = 6$ columns, so nullity $= 6 - 3 = 3$.'
		},
		{
			id: 'ch06.rank-nullity.3',
			type: 'mcq',
			prompt: 'Can a linear map $\\mathbb{R}^4 \\to \\mathbb{R}^2$ be one-to-one?',
			choices: ['No, its kernel has dimension at least 2', 'Yes', 'Only if it is onto', 'Only for positive entries'],
			answer: 0,
			explain: 'The rank is at most $2$, so nullity $\\ge 4 - 2 = 2$. A nonzero kernel means it is not one-to-one.'
		},
		{
			id: 'ch06.rank-nullity.4',
			type: 'numeric',
			prompt: 'Differentiation maps polynomials of degree at most $3$ to polynomials. What is the dimension of its kernel?',
			answer: 1,
			explain: 'Only the constant polynomials have derivative $0$, a one-dimensional space.'
		}
	],
	'ch06.matrix-of-a-map': [
		{
			id: 'ch06.matrix-of-a-map.1',
			type: 'vector',
			prompt: 'The derivative map $D: P_2 \\to P_1$ has matrix $\\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}$. Apply it to the coordinates $(5, 3, 2)$ of $5 + 3x + 2x^2$.',
			answer: [3, 4],
			explain: 'Row 1: $3$. Row 2: $2\\cdot2 = 4$. Indeed $(5 + 3x + 2x^2)\' = 3 + 4x$.'
		},
		{
			id: 'ch06.matrix-of-a-map.2',
			type: 'numeric',
			prompt: '$T(x, y) = (2x + y,\\ x - y)$. What is the top-right entry of its matrix?',
			answer: 1,
			explain: 'The second column is $T(0,1) = (1, -1)$, so the top-right entry is $1$.'
		},
		{
			id: 'ch06.matrix-of-a-map.3',
			type: 'mcq',
			prompt: 'The $j$-th column of the matrix of $T$ is…',
			choices: [
				'the coordinates of $T(\\mathbf b_j)$',
				'the coordinates of $\\mathbf b_j$',
				'the $j$-th row of the inverse',
				'$T(\\mathbf b_1) + \\dots + T(\\mathbf b_j)$'
			],
			answer: 0,
			explain: 'Apply the map to each input basis vector and write the result in the output basis.'
		},
		{
			id: 'ch06.matrix-of-a-map.4',
			type: 'vector',
			prompt: 'For $T(x,y) = (2x + y,\\ x - y)$, give the first column of its matrix.',
			answer: [2, 1],
			explain: 'The first column is $T(1,0) = (2, 1)$.'
		}
	],
	'ch06.change-of-basis': [
		{
			id: 'ch06.change-of-basis.1',
			type: 'mcq',
			prompt: 'If $P$ has the new basis vectors as columns, the matrix of $A$ in the new basis is…',
			choices: ['$P^{-1}AP$', '$PAP^{-1}$', '$PAP$', '$A^{-1}$'],
			answer: 0,
			explain: 'Convert to standard coordinates ($P$), apply $A$, convert back ($P^{-1}$). Read right to left.'
		},
		{
			id: 'ch06.change-of-basis.2',
			type: 'mcq',
			prompt: 'Which of these do similar matrices always share?',
			choices: ['Determinant and eigenvalues', 'All entries', 'The first column', 'Nothing'],
			answer: 0,
			explain: 'They represent the same map in different coordinates, so coordinate-free quantities agree.'
		},
		{
			id: 'ch06.change-of-basis.3',
			type: 'numeric',
			prompt: 'The reflection across $y = x$ has matrix $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ in the standard basis. What is its determinant in any basis?',
			answer: -1,
			explain: '$\\det = 0\\cdot0 - 1\\cdot1 = -1$, and similar matrices have equal determinants.'
		},
		{
			id: 'ch06.change-of-basis.4',
			type: 'vector',
			prompt: 'Reflect across $y=x$. In the basis $\\mathbf b_1 = (1,1),\\ \\mathbf b_2 = (-1,1)$, give the first column of $[A]_B$.',
			answer: [1, 0],
			explain: '$\\mathbf b_1$ lies on the mirror, so $A\\mathbf b_1 = \\mathbf b_1 = 1\\cdot\\mathbf b_1 + 0\\cdot\\mathbf b_2$.'
		}
	]
};

import type { QuizBank } from '../types';

export const ch04: QuizBank = {
	'ch04.vector-spaces': [
		{
			id: 'ch04.vector-spaces.1',
			type: 'mcq',
			prompt: 'Which of these is NOT a vector space (with the usual addition and scaling)?',
			choices: [
				'Polynomials of degree exactly 2',
				'Polynomials of degree at most 2',
				'All $2\\times2$ matrices',
				'$\\mathbb{R}^3$'
			],
			answer: 0,
			explain: '$x^2 + (-x^2) = 0$ has degree 0, so adding two members can leave the set. Closure fails.'
		},
		{
			id: 'ch04.vector-spaces.2',
			type: 'mcq',
			prompt: 'What is the zero vector in the space of $2\\times2$ matrices?',
			choices: ['The zero matrix', 'The identity matrix', 'The matrix of all ones', 'There is none'],
			answer: 0,
			explain: 'Adding the zero matrix to any matrix changes nothing, which is what a zero vector must do.'
		},
		{
			id: 'ch04.vector-spaces.3',
			type: 'mcq',
			prompt: 'Why are the positive real numbers (with usual $+$ and $\\times$) not a vector space?',
			choices: [
				'Scaling by $-1$ leaves the set',
				'They are not real numbers',
				'You cannot add them',
				'There are too many of them'
			],
			answer: 0,
			explain: 'Closure under scalar multiplication fails: $(-1)\\cdot 3 = -3$ is not positive. There is also no zero vector.'
		},
		{
			id: 'ch04.vector-spaces.4',
			type: 'mcq',
			prompt: 'Which of these is a vector space?',
			choices: [
				'All continuous functions on $[0,1]$',
				'Functions with $f(0) = 1$',
				'Integers only',
				'Vectors of length exactly 1'
			],
			answer: 0,
			explain: 'Sums and scalar multiples of continuous functions are continuous. The other sets are not closed.'
		}
	],
	'ch04.subspaces': [
		{
			id: 'ch04.subspaces.1',
			type: 'mcq',
			prompt: 'Which of these is a subspace of $\\mathbb{R}^2$?',
			choices: ['The line $y = 3x$', 'The line $y = 3x + 1$', 'The first quadrant', 'The unit circle'],
			answer: 0,
			explain: '$y = 3x$ passes through the origin and is closed under adding and scaling. The others fail one of the tests.'
		},
		{
			id: 'ch04.subspaces.2',
			type: 'mcq',
			prompt: 'Every subspace must contain…',
			choices: ['the zero vector', 'a vector of length 1', 'the vector $(1,1,\\dots,1)$', 'infinitely many bases'],
			answer: 0,
			explain: 'Scaling any member by $0$ gives $\\mathbf 0$, so it must be in there.'
		},
		{
			id: 'ch04.subspaces.3',
			type: 'mcq',
			prompt: 'Which is a subspace of $\\mathbb{R}^3$?',
			choices: ['$\\{x + y + z = 0\\}$', '$\\{x + y + z = 1\\}$', '$\\{x \\ge 0\\}$', '$\\{xyz = 0\\}$'],
			answer: 0,
			explain: '$x+y+z=0$ is a plane through the origin. $x+y+z=1$ misses the origin, $x\\ge0$ fails under negative scaling, and $xyz=0$ is a union of three planes, which is not closed under addition.'
		},
		{
			id: 'ch04.subspaces.4',
			type: 'mcq',
			prompt: 'Which list is the complete set of subspaces of $\\mathbb{R}^2$?',
			choices: [
				'The origin, lines through the origin, and the whole plane',
				'Only lines through the origin',
				'Only the whole plane',
				'Every line and every circle'
			],
			answer: 0,
			explain: 'Dimension 0, 1 or 2: a point, a line through the origin, or everything.'
		}
	],
	'ch04.column-null-space': [
		{
			id: 'ch04.column-null-space.1',
			type: 'vector',
			prompt: 'Find the vector in the null space of $\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$ whose second entry is $1$.',
			answer: [-2, 1],
			explain: '$x_1 + 2x_2 = 0$ with $x_2 = 1$ gives $x_1 = -2$. Check: $(1)(-2) + 2(1) = 0$.'
		},
		{
			id: 'ch04.column-null-space.2',
			type: 'numeric',
			prompt: 'What is the dimension of the column space of $\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$?',
			answer: 1,
			explain: 'Column 2 is twice column 1, so the columns span only a line.'
		},
		{
			id: 'ch04.column-null-space.3',
			type: 'mcq',
			prompt: '$A\\mathbf x = \\mathbf b$ has a solution exactly when…',
			choices: [
				'$\\mathbf b$ is in the column space of $A$',
				'$\\mathbf b$ is in the null space of $A$',
				'$A$ is square',
				'$\\mathbf b$ is the zero vector'
			],
			answer: 0,
			explain: '$A\\mathbf x$ is a combination of the columns, so it can only produce vectors in their span.'
		},
		{
			id: 'ch04.column-null-space.4',
			type: 'vector',
			prompt: 'Give the pivot column of $\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$ as a vector. It spans the column space.',
			answer: [1, 2],
			explain: 'Only column 1 has a pivot. The column space is the line through $(1, 2)$.'
		}
	],
	'ch04.four-subspaces': [
		{
			id: 'ch04.four-subspaces.1',
			type: 'numeric',
			prompt: 'A $3\\times5$ matrix has rank $2$. What is the dimension of its null space?',
			answer: 3,
			explain: '$n - r = 5 - 2 = 3$.'
		},
		{
			id: 'ch04.four-subspaces.2',
			type: 'numeric',
			prompt: 'For the same $3\\times5$ matrix of rank $2$, what is the dimension of the left null space?',
			answer: 1,
			explain: '$m - r = 3 - 2 = 1$.'
		},
		{
			id: 'ch04.four-subspaces.3',
			type: 'mcq',
			prompt: 'The null space of $A$ is perpendicular to…',
			choices: ['the row space of $A$', 'the column space of $A$', 'the left null space', 'nothing in particular'],
			answer: 0,
			explain: '$A\\mathbf x = \\mathbf 0$ says each row has dot product zero with $\\mathbf x$.'
		},
		{
			id: 'ch04.four-subspaces.4',
			type: 'numeric',
			prompt: 'A matrix has column rank $3$. What is the dimension of its row space?',
			answer: 3,
			explain: 'Row rank equals column rank.'
		}
	]
};

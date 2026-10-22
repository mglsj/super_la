import type { QuizBank } from '../types';

export const ch03: QuizBank = {
	'ch03.matrix-times-vector': [
		{
			id: 'ch03.matrix-times-vector.1',
			type: 'vector',
			prompt: 'Compute $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$.',
			answer: [3, 7],
			explain: 'Add the two columns: $(1,3) + (2,4) = (3, 7)$.'
		},
		{
			id: 'ch03.matrix-times-vector.2',
			type: 'vector',
			prompt: 'Compute $\\begin{bmatrix} 2 & -1 \\\\ 1 & 1 \\end{bmatrix}\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$.',
			answer: [4, 5],
			explain: '$3(2,1) + 2(-1,1) = (6,3) + (-2,2) = (4, 5)$.'
		},
		{
			id: 'ch03.matrix-times-vector.3',
			type: 'mcq',
			prompt: 'What does the first column of a $2\\times2$ matrix $A$ tell you?',
			choices: [
				'Where $\\hat\\imath = (1,0)$ lands',
				'Where $\\hat\\jmath = (0,1)$ lands',
				'The determinant',
				'The length of $A$'
			],
			answer: 0,
			explain: '$A\\hat\\imath$ picks out the first column of $A$.'
		},
		{
			id: 'ch03.matrix-times-vector.4',
			type: 'goal-basis',
			prompt: 'Drag $\\hat\\imath$ and $\\hat\\jmath$ to build the matrix that rotates the plane $90^\\circ$ counter-clockwise.',
			target: [
				[0, -1],
				[1, 0]
			],
			tol: 0.3,
			explain: 'A $90^\\circ$ rotation sends $\\hat\\imath \\to (0,1)$ and $\\hat\\jmath \\to (-1, 0)$. Those are the two columns.'
		},
		{
			id: 'ch03.matrix-times-vector.5',
			type: 'mcq',
			prompt: '$A\\mathbf x = \\mathbf b$ has a solution exactly when…',
			choices: [
				'$\\mathbf b$ is in the span of the columns of $A$',
				'$\\mathbf b$ is zero',
				'$A$ is the identity',
				'$\\mathbf x$ is a unit vector'
			],
			answer: 0,
			explain: '$A\\mathbf x$ is a combination of the columns, so it can only produce vectors in their span.'
		}
	],
	'ch03.composition': [
		{
			id: 'ch03.composition.1',
			type: 'mcq',
			prompt: 'The product $BA$ means…',
			choices: ['apply $A$ first, then $B$', 'apply $B$ first, then $A$', 'apply them at the same time', 'add the transformations'],
			answer: 0,
			explain: '$BA\\mathbf x = B(A\\mathbf x)$: $A$ acts first, so you read right to left.'
		},
		{
			id: 'ch03.composition.2',
			type: 'numeric',
			prompt: 'Let $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix}$. What is the top-left entry of $AB$?',
			answer: 2,
			explain: 'Row 1 of $A$ times column 1 of $B$: $1\\cdot1 + 1\\cdot1 = 2$.'
		},
		{
			id: 'ch03.composition.3',
			type: 'vector',
			prompt: 'With the same $A$ and $B$, give the first column of $AB$.',
			answer: [2, 1],
			explain: 'The first column of $B$ is $(1,1)$. Applying $A$: $(1 + 1,\\ 0 + 1) = (2, 1)$.'
		},
		{
			id: 'ch03.composition.4',
			type: 'mcq',
			prompt: 'Is $AB = BA$ for all square matrices?',
			choices: ['No, in general it is false', 'Yes, always', 'Only for $2\\times2$', 'Only if the entries are positive'],
			answer: 0,
			explain: '"Do $B$ then $A$" and "do $A$ then $B$" are different journeys. Rotate-then-shear is not shear-then-rotate.'
		},
		{
			id: 'ch03.composition.5',
			type: 'mcq',
			prompt: '$(AB)C$ is always equal to…',
			choices: ['$A(BC)$', '$C(BA)$', '$(BA)C$', '$ABC$ only when $A = C$'],
			answer: 0,
			explain: 'Both mean "do $C$, then $B$, then $A$". Multiplication is associative.'
		}
	],
	'ch03.inverse': [
		{
			id: 'ch03.inverse.1',
			type: 'numeric',
			prompt: 'The inverse of $\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$ is $\\begin{bmatrix} 1 & ? \\\\ -1 & 2 \\end{bmatrix}$. Find the top-right entry.',
			answer: -1,
			explain: 'Here $\\det = 2 - 1 = 1$, and the formula puts $-b = -1$ in the top-right corner.'
		},
		{
			id: 'ch03.inverse.2',
			type: 'mcq',
			prompt: 'Is $\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$ invertible?',
			choices: ['No, its determinant is $0$', 'Yes, its determinant is $4$', 'Yes, its determinant is $-1$', 'Only over the complex numbers'],
			answer: 0,
			explain: '$\\det = 1\\cdot4 - 2\\cdot2 = 0$. The columns are parallel, so the matrix squashes the plane onto a line.'
		},
		{
			id: 'ch03.inverse.3',
			type: 'numeric',
			prompt: 'For $A = \\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}$, what is the bottom-right entry of $A^{-1}$?',
			answer: 3,
			explain: '$\\det A = 6 - 5 = 1$ and the bottom-right entry of the inverse is $a/\\det = 3$.'
		},
		{
			id: 'ch03.inverse.4',
			type: 'mcq',
			prompt: '$(AB)^{-1}$ equals…',
			choices: ['$B^{-1}A^{-1}$', '$A^{-1}B^{-1}$', '$A^{-1} + B^{-1}$', '$(BA)^{-1}$ always'],
			answer: 0,
			explain: 'To undo "$A$ then $B$" you undo $B$ first, then $A$.'
		},
		{
			id: 'ch03.inverse.5',
			type: 'mcq',
			prompt: 'Why can a matrix that squashes the plane onto a line have no inverse?',
			choices: [
				'Different vectors land on the same point, so there is no way to know which to send back',
				'Its entries are too large',
				'Lines have no length',
				'It has too many columns'
			],
			answer: 0,
			explain: 'An inverse would have to be a function, and a function cannot send one input to two different outputs.'
		}
	],
	'ch03.lu': [
		{
			id: 'ch03.lu.1',
			type: 'numeric',
			prompt: 'Eliminate the $6$ in $\\begin{bmatrix} 2 & 1 \\\\ 6 & 5 \\end{bmatrix}$ by $R_2 - \\ell R_1$. What is the multiplier $\\ell$?',
			answer: 3,
			explain: '$\\ell = 6/2 = 3$. This is the entry that goes into $L$.'
		},
		{
			id: 'ch03.lu.2',
			type: 'numeric',
			prompt: 'After that step, what is the bottom-right entry of $U$?',
			answer: 2,
			explain: '$5 - 3\\cdot1 = 2$, so $U = \\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}$.'
		},
		{
			id: 'ch03.lu.3',
			type: 'mcq',
			prompt: 'What shape does $L$ in $A = LU$ have?',
			choices: [
				'Lower triangular with $1$s on the diagonal',
				'Upper triangular',
				'Diagonal',
				'Any shape'
			],
			answer: 0,
			explain: 'Its entries below the diagonal are the elimination multipliers, and it has $1$s on the diagonal.'
		},
		{
			id: 'ch03.lu.4',
			type: 'mcq',
			prompt: 'Once you have $A = LU$, how do you solve $A\\mathbf x = \\mathbf b$?',
			choices: [
				'Forward substitution for $L\\mathbf y = \\mathbf b$, then back substitution for $U\\mathbf x = \\mathbf y$',
				'Invert $A$ and multiply',
				'Guess and check',
				'Multiply $L$ and $U$ together first'
			],
			answer: 0,
			explain: 'Both triangular solves are cheap, and you can reuse $L$ and $U$ for any new $\\mathbf b$.'
		},
		{
			id: 'ch03.lu.5',
			type: 'mcq',
			prompt: 'When does plain $A = LU$ (no row swaps) break down?',
			choices: ['When a zero pivot appears', 'When $A$ is symmetric', 'When $A$ has integer entries', 'Never'],
			answer: 0,
			explain: 'You cannot divide by a zero pivot; swap rows first, which gives $PA = LU$.'
		}
	]
};

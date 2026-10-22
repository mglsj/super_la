import type { QuizBank } from '../types';

export const ch09: QuizBank = {
	'ch09.eigenbasis': [
		{
			id: 'ch09.eigenbasis.1',
			type: 'mcq',
			prompt: 'In $A = PDP^{-1}$, the columns of $P$ are…',
			choices: ['eigenvectors of $A$', 'the rows of $A$', 'the eigenvalues', 'pivot columns'],
			answer: 0,
			explain: '$P$ is the change-of-basis matrix to the eigenbasis, and $D$ holds the eigenvalues in the same order.'
		},
		{
			id: 'ch09.eigenbasis.2',
			type: 'numeric',
			prompt: '$A = PDP^{-1}$ with $D = \\operatorname{diag}(2, 5)$. What is $\\det A$?',
			answer: 10,
			explain: 'Similar matrices have equal determinants: $\\det A = \\det D = 2\\cdot5$.'
		},
		{
			id: 'ch09.eigenbasis.3',
			type: 'mcq',
			prompt: 'An $n\\times n$ matrix with $n$ distinct eigenvalues is…',
			choices: ['always diagonalisable', 'never diagonalisable', 'singular', 'symmetric'],
			answer: 0,
			explain: 'Eigenvectors of distinct eigenvalues are independent, so there are $n$ of them: a basis.'
		},
		{
			id: 'ch09.eigenbasis.3b',
			type: 'numeric',
			prompt: '$A$ is diagonalisable with $D = \\operatorname{diag}(3, -1)$. What is the trace of $A$?',
			answer: 2,
			explain: 'Trace is unchanged under similarity: $3 + (-1) = 2$.'
		}
	],
	'ch09.powers': [
		{
			id: 'ch09.powers.1',
			type: 'numeric',
			prompt: '$A$ has eigenvalues $2$ and $3$. What is the smaller eigenvalue of $A^4$?',
			answer: 16,
			explain: 'The eigenvalues of $A^4$ are $2^4 = 16$ and $3^4 = 81$.'
		},
		{
			id: 'ch09.powers.2',
			type: 'numeric',
			prompt: 'The matrix $\\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}^5$ has Fibonacci numbers as entries. What is its top-right entry?',
			answer: 5,
			explain: '$A^k = \\begin{bmatrix}F_{k+1}&F_k\\\\F_k&F_{k-1}\\end{bmatrix}$, so the top-right entry is $F_5 = 5$.'
		},
		{
			id: 'ch09.powers.3',
			type: 'mcq',
			prompt: 'A matrix has eigenvalues $0.5$ and $0.9$. What happens to $A^k$ as $k\\to\\infty$?',
			choices: ['It tends to the zero matrix', 'It grows without bound', 'It tends to the identity', 'It oscillates'],
			answer: 0,
			explain: '$0.5^k$ and $0.9^k$ both tend to $0$.'
		},
		{
			id: 'ch09.powers.4',
			type: 'mcq',
			prompt: 'The largest eigenvalue of $A$ has $|\\lambda| = 1.1$. What happens to typical vectors under repeated application of $A$?',
			choices: ['They grow like $1.1^k$', 'They shrink to zero', 'They stay the same size', 'They rotate only'],
			answer: 0,
			explain: 'The component along that eigenvector is multiplied by $1.1$ each time and dominates in the long run.'
		}
	],
	'ch09.when-it-fails': [
		{
			id: 'ch09.when-it-fails.1',
			type: 'mcq',
			prompt: 'Is $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ diagonalisable?',
			choices: ['No, it has only one eigen-direction', 'Yes, its eigenvalues are 1 and 1', 'Yes, it is triangular', 'Only over the complex numbers'],
			answer: 0,
			explain: 'Solving $(S - I)\\mathbf v = \\mathbf 0$ gives only multiples of $(1, 0)$. We need two independent eigenvectors.'
		},
		{
			id: 'ch09.when-it-fails.2',
			type: 'numeric',
			prompt: 'How many independent eigenvectors does $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ have?',
			answer: 1,
			explain: 'The eigenspace for $\\lambda = 1$ is the line spanned by $(1,0)$.'
		},
		{
			id: 'ch09.when-it-fails.3',
			type: 'mcq',
			prompt: 'For any eigenvalue, how do its geometric and algebraic multiplicities compare?',
			choices: ['geometric ≤ algebraic', 'geometric ≥ algebraic', 'they are always equal', 'unrelated'],
			answer: 0,
			explain: 'The number of independent eigenvectors can never exceed the number of times $\\lambda$ is a root.'
		},
		{
			id: 'ch09.when-it-fails.4',
			type: 'mcq',
			prompt: 'Is $\\begin{bmatrix}2&0\\\\0&2\\end{bmatrix}$ diagonalisable?',
			choices: ['Yes, it is already diagonal', 'No, its eigenvalue is repeated', 'No, it is singular', 'Only after a row swap'],
			answer: 0,
			explain: 'Repeated eigenvalues do not prevent diagonalisation: here the eigenspace is all of $\\mathbb{R}^2$, so multiplicities match.'
		}
	]
};

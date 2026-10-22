import type { QuizBank } from '../types';

export const ch22: QuizBank = {
	'ch22.matrix-groups': [
		{
			id: 'ch22.matrix-groups.1',
			type: 'mcq',
			prompt: 'Which of these sets of $2\\times2$ matrices is closed under multiplication and inverses (a group)?',
			choices: ['The invertible matrices', 'The symmetric matrices', 'The matrices with positive entries', 'The singular matrices'],
			answer: 0,
			explain: 'Products and inverses of invertible matrices are invertible. The other sets fail closure under products or inverses.'
		},
		{
			id: 'ch22.matrix-groups.2',
			type: 'mcq',
			prompt: 'Why is the set of matrices with determinant $1$ closed under multiplication?',
			choices: ['$\\det(AB) = \\det A\\,\\det B = 1\\cdot1$', '$\\det(AB) = \\det A + \\det B$', 'Because they are symmetric', 'It is not closed'],
			answer: 0,
			explain: 'Multiplicativity of the determinant.'
		},
		{
			id: 'ch22.matrix-groups.3',
			type: 'numeric',
			prompt: 'The shear $\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$ has an inverse $\\begin{bmatrix}1&x\\\\0&1\\end{bmatrix}$. Find $x$.',
			answer: -2,
			explain: 'Shearing by $2$ and then by $-2$ undoes it: the inverse has $-2$ in the corner.'
		},
		{
			id: 'ch22.matrix-groups.4',
			type: 'mcq',
			prompt: 'Why are the symmetric matrices not a group under multiplication?',
			choices: [
				'The product of symmetric matrices need not be symmetric',
				'They are not invertible',
				'They have no identity',
				'They are too many'
			],
			answer: 0,
			explain: '$\\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&0\\\\0&2\\end{bmatrix} = \\begin{bmatrix}1&2\\\\1&0\\end{bmatrix}$ is not symmetric.'
		}
	],
	'ch22.orthogonal-group': [
		{
			id: 'ch22.orthogonal-group.1',
			type: 'numeric',
			prompt: '$R(\\theta)$ is the rotation by $\\theta$ degrees. $R(40^\\circ)R(25^\\circ)$ is a rotation by how many degrees?',
			answer: 65,
			explain: 'Rotations compose by adding angles.'
		},
		{
			id: 'ch22.orthogonal-group.2',
			type: 'numeric',
			prompt: 'What is the determinant of the product of two reflections?',
			answer: 1,
			explain: '$(-1)(-1) = +1$. The product is a rotation.'
		},
		{
			id: 'ch22.orthogonal-group.3',
			type: 'mcq',
			prompt: 'The product of two reflections in the plane is…',
			choices: ['a rotation', 'a reflection', 'a shear', 'the zero matrix'],
			answer: 0,
			explain: 'It has determinant $+1$ and is orthogonal, so it lies in $SO(2)$. The angle is twice the angle between the mirrors.'
		},
		{
			id: 'ch22.orthogonal-group.4',
			type: 'numeric',
			prompt: 'The inverse of the rotation $R(30^\\circ)$ is a rotation by how many degrees?',
			answer: -30,
			explain: '$R(\\theta)^{-1} = R(\\theta)^{\\mathsf T} = R(-\\theta)$.'
		}
	],
	'ch22.matrix-exponential': [
		{
			id: 'ch22.matrix-exponential.1',
			type: 'numeric',
			prompt: '$A$ is a matrix with trace $2$. What is $\\det e^{A}$? (Decimal.)',
			answer: 7.389,
			tol: 0.01,
			explain: '$\\det e^{A} = e^{\\operatorname{tr}A} = e^2 \\approx 7.389$.'
		},
		{
			id: 'ch22.matrix-exponential.2',
			type: 'mcq',
			prompt: 'If $A^{\\mathsf T} = -A$ (skew-symmetric), then $e^{A}$ is…',
			choices: ['orthogonal', 'symmetric', 'singular', 'the identity'],
			answer: 0,
			explain: '$(e^{A})^{\\mathsf T} = e^{A^{\\mathsf T}} = e^{-A} = (e^{A})^{-1}$.'
		},
		{
			id: 'ch22.matrix-exponential.3',
			type: 'numeric',
			prompt: 'What is the trace of $e^{0}$, where $0$ is the $2\\times2$ zero matrix?',
			answer: 2,
			explain: '$e^{0} = I$, whose trace is $2$.'
		},
		{
			id: 'ch22.matrix-exponential.4',
			type: 'numeric',
			prompt: 'For $A = \\operatorname{diag}(0, \\ln 2)$, what is the bottom-right entry of $e^{A}$?',
			answer: 2,
			explain: 'For a diagonal matrix, $e^{A}$ exponentiates each diagonal entry: $e^{\\ln2} = 2$.'
		},
		{
			id: 'ch22.matrix-exponential.5',
			type: 'mcq',
			prompt: 'When does $e^{A+B} = e^{A}e^{B}$ hold?',
			choices: ['When $A$ and $B$ commute', 'Always', 'Never', 'Only when $A = B$'],
			answer: 0,
			explain: 'The exponential law needs commuting arguments, which is why 3D rotations compose non-trivially.'
		}
	]
};

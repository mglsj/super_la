import type { QuizBank } from '../types';

export const ch12: QuizBank = {
	'ch12.projection-subspace': [
		{
			id: 'ch12.projection-subspace.1',
			type: 'vector',
			prompt: 'Project $\\mathbf b = (1, 2, 3)$ onto the $xy$-plane.',
			answer: [1, 2, 0],
			explain: 'The closest point of the $xy$-plane drops the $z$ component.'
		},
		{
			id: 'ch12.projection-subspace.2',
			type: 'mcq',
			prompt: 'For a projection matrix $P$, projecting twice gives…',
			choices: ['$P^2 = P$', '$P^2 = 2P$', '$P^2 = I$', '$P^2 = 0$'],
			answer: 0,
			explain: 'Once a vector is in the subspace, projecting again does nothing.'
		},
		{
			id: 'ch12.projection-subspace.3',
			type: 'vector',
			prompt: 'Project $(2, -1, 4)$ onto the $xz$-plane.',
			answer: [2, 0, 4],
			explain: 'The $xz$-plane keeps the $x$ and $z$ components and discards $y$.'
		},
		{
			id: 'ch12.projection-subspace.4',
			type: 'mcq',
			prompt: 'The error $\\mathbf b - \\mathbf p$ of a projection onto $W$ is…',
			choices: [
				'orthogonal to every vector in $W$',
				'parallel to $W$',
				'always zero',
				'inside $W$'
			],
			answer: 0,
			explain: 'That is exactly what makes $\\mathbf p$ the closest point of $W$ to $\\mathbf b$.'
		}
	],
	'ch12.normal-equations': [
		{
			id: 'ch12.normal-equations.1',
			type: 'mcq',
			prompt: 'The normal equations for $A\\mathbf x\\approx\\mathbf b$ are…',
			choices: [
				'$A^{\\mathsf T}A\\hat{\\mathbf x} = A^{\\mathsf T}\\mathbf b$',
				'$AA^{\\mathsf T}\\hat{\\mathbf x} = \\mathbf b$',
				'$A\\hat{\\mathbf x} = \\mathbf b$',
				'$A^{\\mathsf T}\\hat{\\mathbf x} = \\mathbf b$'
			],
			answer: 0,
			explain: 'They say the error $\\mathbf b - A\\hat{\\mathbf x}$ is perpendicular to every column of $A$.'
		},
		{
			id: 'ch12.normal-equations.2',
			type: 'numeric',
			prompt: '$A = \\begin{bmatrix}1\\\\1\\\\1\\end{bmatrix}$ and $\\mathbf b = (1, 2, 6)$. What is the least-squares solution $\\hat x$?',
			answer: 3,
			explain: '$A^{\\mathsf T}A = 3$ and $A^{\\mathsf T}\\mathbf b = 9$, so $\\hat x = 3$: the mean of the data.'
		},
		{
			id: 'ch12.normal-equations.3',
			type: 'numeric',
			prompt: 'Fit $y = x_0 + x_1 t$ to $(0,1),\\ (1,2),\\ (2,2)$. What is the slope $x_1$?',
			answer: 0.5,
			explain: '$A^{\\mathsf T}A = \\begin{bmatrix}3&3\\\\3&5\\end{bmatrix}$, $A^{\\mathsf T}\\mathbf b = (5, 6)$. Subtracting the equations gives $2x_1 = 1$.'
		},
		{
			id: 'ch12.normal-equations.4',
			type: 'mcq',
			prompt: 'At the least-squares solution, $A^{\\mathsf T}\\mathbf e$ equals…',
			choices: ['$\\mathbf 0$', '$\\mathbf b$', '$\\hat{\\mathbf x}$', '$A\\hat{\\mathbf x}$'],
			answer: 0,
			explain: 'The error is orthogonal to the columns of $A$, which is what $A^{\\mathsf T}\\mathbf e = \\mathbf 0$ says.'
		}
	],
	'ch12.line-of-best-fit': [
		{
			id: 'ch12.line-of-best-fit.1',
			type: 'numeric',
			prompt: 'The points $(0,1),\\ (1,3),\\ (2,5)$ lie on a line. What is the slope of the least-squares line?',
			answer: 2,
			explain: 'When the points are exactly collinear, the best fit is that line: $y = 2t + 1$.'
		},
		{
			id: 'ch12.line-of-best-fit.2',
			type: 'numeric',
			prompt: 'Fit a line to $(-1, 1),\\ (0, 0),\\ (1, 1)$. What is the intercept? (Give a decimal.)',
			answer: 0.667,
			tol: 0.01,
			explain: 'The slope is $0$ (the data is symmetric), so the line is $y = \\bar y = \\tfrac23$.'
		},
		{
			id: 'ch12.line-of-best-fit.3',
			type: 'mcq',
			prompt: 'What does the least-squares line minimise?',
			choices: [
				'The sum of squared vertical errors',
				'The largest single error',
				'The sum of unsquared errors',
				'The number of points off the line'
			],
			answer: 0,
			explain: 'That is the meaning of "least squares": minimise $\\|\\mathbf e\\|^2 = \\sum e_i^2$.'
		},
		{
			id: 'ch12.line-of-best-fit.4',
			type: 'mcq',
			prompt: 'The least-squares line (with an intercept) always passes through…',
			choices: [
				'the point of averages $(\\bar t, \\bar y)$',
				'the origin',
				'the first data point',
				'the point with the largest $y$'
			],
			answer: 0,
			explain: 'From the formula $c = \\bar y - m\\bar t$, we get $\\bar y = c + m\\bar t$.'
		}
	]
};

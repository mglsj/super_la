import type { QuizBank } from '../types';

export const ch01: QuizBank = {
	'ch01.what-is-a-vector': [
		{
			id: 'ch01.what-is-a-vector.1',
			type: 'mcq',
			prompt: 'Which of these is a vector?',
			choices: [
				'The list $(3, -1)$',
				'The polynomial $2 + x$',
				'An arrow from the origin to a point',
				'All of them, depending on the viewpoint'
			],
			answer: 3,
			explain:
				'A vector is anything you can add and scale sensibly. Lists, arrows and polynomials all qualify, which is why the idea is so powerful.'
		},
		{
			id: 'ch01.what-is-a-vector.2',
			type: 'vector',
			prompt: 'A displacement goes 3 units right and 2 units down. Write it as a vector.',
			answer: [3, -2],
			explain: 'Right is positive $x$ and down is negative $y$, so the vector is $(3, -2)$.'
		},
		{
			id: 'ch01.what-is-a-vector.3',
			type: 'mcq',
			prompt: 'Why can polynomials of degree at most 2 be treated as vectors?',
			choices: [
				'Adding two of them, or scaling one, gives another polynomial of degree at most 2',
				'Each one is secretly an arrow in the plane',
				'They have a length and a direction',
				'They are all multiples of $x$'
			],
			answer: 0,
			explain:
				'Vector-ness is about closure under adding and scaling, not about looking like an arrow. Here the triple of coefficients $(a, b, c)$ in $a + bx + cx^2$ plays the role of coordinates.'
		},
		{
			id: 'ch01.what-is-a-vector.4',
			type: 'goal-vector',
			prompt: 'Drag the tip of the arrow to the point $(3, 2)$.',
			target: [3, 2],
			start: [-2, 1],
			tol: 0.3,
			explain: 'The coordinates $(3, 2)$ mean "3 along $x$, then 2 along $y$".'
		}
	],
	'ch01.add-and-scale': [
		{
			id: 'ch01.add-and-scale.1',
			type: 'vector',
			prompt: 'Compute $(2, 1) + (-1, 3)$.',
			answer: [1, 4],
			explain: 'Add component by component: $(2-1,\\ 1+3) = (1, 4)$.'
		},
		{
			id: 'ch01.add-and-scale.2',
			type: 'vector',
			prompt: 'Compute $3 \\cdot (1, -2)$.',
			answer: [3, -6],
			explain: 'Scaling multiplies every component: $(3, -6)$.'
		},
		{
			id: 'ch01.add-and-scale.3',
			type: 'vector',
			prompt: 'Let $\\mathbf v = (1, 2)$ and $\\mathbf w = (3, -1)$. Compute $2\\mathbf v - \\mathbf w$.',
			answer: [-1, 5],
			explain: '$2\\mathbf v = (2, 4)$, then subtract $(3, -1)$: $(2-3,\\ 4+1) = (-1, 5)$.'
		},
		{
			id: 'ch01.add-and-scale.4',
			type: 'mcq',
			prompt: 'What does multiplying a vector by $-1$ do?',
			choices: [
				'Reverses its direction and keeps its length',
				'Makes it shorter',
				'Rotates it by 90°',
				'Nothing'
			],
			answer: 0,
			explain: 'Scaling by a negative number flips the arrow through the origin; the length is multiplied by $|-1| = 1$.'
		},
		{
			id: 'ch01.add-and-scale.5',
			type: 'goal-vector',
			prompt: 'Let $\\mathbf v = (2, 1)$ and $\\mathbf w = (1, 3)$. Drag the tip to $\\mathbf v + \\mathbf w$.',
			target: [3, 4],
			start: [0, 0],
			hideTarget: true,
			tol: 0.3,
			explain: '$\\mathbf v + \\mathbf w = (2+1,\\ 1+3) = (3, 4)$: walk along $\\mathbf v$, then along $\\mathbf w$.'
		}
	],
	'ch01.span': [
		{
			id: 'ch01.span.1',
			type: 'mcq',
			prompt: 'In the plane, what is the span of one nonzero vector?',
			choices: ['A line through the origin', 'The whole plane', 'A single point', 'A line not through the origin'],
			answer: 0,
			explain: 'All scalings $c\\mathbf v$ lie along one line, and $c = 0$ puts the origin on it.'
		},
		{
			id: 'ch01.span.2',
			type: 'mcq',
			prompt: 'What is the span of $(1, 2)$ and $(2, 4)$?',
			choices: ['The whole plane', 'The line $y = 2x$', 'Only the origin', 'The line $y = x$'],
			answer: 1,
			explain: '$(2, 4) = 2(1, 2)$, so the second vector adds nothing new. The span collapses to the line through $(1, 2)$.'
		},
		{
			id: 'ch01.span.3',
			type: 'mcq',
			prompt: 'Is $(7, 0)$ in the span of $(3, 1)$ and $(1, 2)$?',
			choices: [
				'Yes. The two vectors are not parallel, so they span the whole plane',
				'No. It is not a multiple of either vector',
				'Only if we are allowed negative scalars',
				'Impossible to say'
			],
			answer: 0,
			explain:
				'Two non-parallel vectors in the plane reach every point. Solving $3a + b = 7,\\ a + 2b = 0$ gives $a = 14/5,\\ b = -7/5$, using one negative scalar.'
		},
		{
			id: 'ch01.span.4',
			type: 'numeric',
			prompt: 'Write $(5, 5) = a(1, 2) + b(3, 1)$. What is $a$?',
			answer: 2,
			explain: 'The equations $a + 3b = 5$ and $2a + b = 5$ give $b = 1,\\ a = 2$. Check: $2(1,2) + (3,1) = (5,5)$.'
		},
		{
			id: 'ch01.span.5',
			type: 'numeric',
			prompt: 'For which value of $c$ do $(1, 3)$ and $(2, c)$ fail to span the whole plane?',
			answer: 6,
			explain: 'They fail exactly when they are parallel: $(2, c) = 2(1, 3)$ forces $c = 6$.'
		}
	],
	'ch01.dot-product': [
		{
			id: 'ch01.dot-product.1',
			type: 'numeric',
			prompt: 'Compute $(1, 2) \\cdot (3, 4)$.',
			answer: 11,
			explain: '$1\\cdot 3 + 2 \\cdot 4 = 3 + 8 = 11$.'
		},
		{
			id: 'ch01.dot-product.2',
			type: 'numeric',
			prompt: 'What is the length of $(3, 4)$?',
			answer: 5,
			explain: '$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.'
		},
		{
			id: 'ch01.dot-product.3',
			type: 'mcq',
			prompt: 'Two nonzero vectors have dot product $0$. What can you conclude?',
			choices: ['They are perpendicular', 'They are parallel', 'One is the zero vector', 'They have equal length'],
			answer: 0,
			explain: '$\\mathbf a \\cdot \\mathbf b = \\|\\mathbf a\\|\\|\\mathbf b\\|\\cos\\theta$. With both lengths nonzero, $\\cos\\theta = 0$, so $\\theta = 90°$.'
		},
		{
			id: 'ch01.dot-product.4',
			type: 'numeric',
			prompt: 'Find the angle in degrees between $(1, 0, 1)$ and $(0, 1, 1)$.',
			answer: 60,
			tol: 0.5,
			explain: 'The dot product is $1$ and both lengths are $\\sqrt2$, so $\\cos\\theta = 1/2$ and $\\theta = 60°$.'
		}
	],
	'ch01.projection': [
		{
			id: 'ch01.projection.1',
			type: 'vector',
			prompt: 'Project $\\mathbf b = (3, 2.5)$ onto the line spanned by $\\mathbf a = (4, 0)$.',
			answer: [3, 0],
			explain: '$\\dfrac{\\mathbf a\\cdot\\mathbf b}{\\mathbf a\\cdot\\mathbf a}\\mathbf a = \\dfrac{12}{16}(4, 0) = (3, 0)$. The shadow keeps only the $x$ part.'
		},
		{
			id: 'ch01.projection.2',
			type: 'vector',
			prompt: 'Project $(2, 3)$ onto the line spanned by $(1, 1)$.',
			answer: [2.5, 2.5],
			explain: '$\\dfrac{5}{2}(1, 1) = (2.5, 2.5)$.'
		},
		{
			id: 'ch01.projection.3',
			type: 'mcq',
			prompt: 'After projecting $\\mathbf b$ onto $\\mathbf a$, the leftover $\\mathbf b - \\text{proj}$ is…',
			choices: ['perpendicular to $\\mathbf a$', 'parallel to $\\mathbf a$', 'equal to $\\mathbf b$', 'always zero'],
			answer: 0,
			explain: 'That is the defining property: the error left over is at a right angle to the line, which is why the shadow is the closest point.'
		},
		{
			id: 'ch01.projection.4',
			type: 'goal-vector',
			prompt: 'Drag the tip to the projection of $\\mathbf b = (3, 4)$ onto the direction $(1, 0)$.',
			target: [3, 0],
			start: [3, 4],
			hideTarget: true,
			tol: 0.3,
			explain: 'Projecting onto the $x$-axis drops the $y$ part: $(3, 0)$.'
		}
	],
	'ch01.lines-planes': [
		{
			id: 'ch01.lines-planes.1',
			type: 'vector',
			prompt: 'Give a normal vector to the plane $x + 2y + 2z = 0$.',
			answer: [1, 2, 2],
			explain: 'The coefficients of $x, y, z$ are the normal: the equation says $(1,2,2)\\cdot(x,y,z) = 0$.'
		},
		{
			id: 'ch01.lines-planes.2',
			type: 'numeric',
			prompt: 'The plane through $(2, 0, 1)$ with normal $(3, 1, 2)$ is $3x + y + 2z = d$. Find $d$.',
			answer: 8,
			explain: 'Plug in the point: $d = 3\\cdot 2 + 0 + 2 \\cdot 1 = 8$.'
		},
		{
			id: 'ch01.lines-planes.3',
			type: 'vector',
			prompt: 'Find a direction vector of the line through $(1, 1)$ and $(4, 5)$.',
			answer: [3, 4],
			explain: 'Subtract the endpoints: $(4-1,\\ 5-1) = (3, 4)$. Any nonzero multiple also works.'
		}
	],
	'ch01.cross-product': [
		{
			id: 'ch01.cross-product.1',
			type: 'vector',
			prompt: 'Compute $(1, 2, 3) \\times (4, 5, 6)$.',
			answer: [-3, 6, -3],
			explain: '$(2\\cdot6 - 3\\cdot5,\\ 3\\cdot4 - 1\\cdot6,\\ 1\\cdot5 - 2\\cdot4) = (-3, 6, -3)$.'
		},
		{
			id: 'ch01.cross-product.2',
			type: 'mcq',
			prompt: 'How does $\\mathbf w \\times \\mathbf v$ compare with $\\mathbf v \\times \\mathbf w$?',
			choices: ['It is the negative', 'It is the same', 'It is perpendicular to it', 'It is twice as long'],
			answer: 0,
			explain: 'The cross product is anticommutative: swapping the inputs flips the right-hand-rule direction.'
		},
		{
			id: 'ch01.cross-product.3',
			type: 'numeric',
			prompt: 'What is the area of the parallelogram spanned by $(3, 0, 0)$ and $(0, 2, 0)$?',
			answer: 6,
			explain: 'It is a $3 \\times 2$ rectangle, and $\\|\\mathbf v\\times\\mathbf w\\| = \\|(0,0,6)\\| = 6$.'
		}
	]
};

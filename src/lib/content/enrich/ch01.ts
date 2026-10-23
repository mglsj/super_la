import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch01.what-is-a-vector.1': {
		hints: [
			'Ask what a vector actually needs: something you can add to another one and stretch by a number.',
			'Check each option: does a list of numbers, a polynomial and an arrow all allow adding and scaling?'
		],
		notes: [
			'True, but not the whole story: a list of numbers is one way to write a vector.',
			'True, but not the whole story: polynomials can be added and scaled, so they are vectors too.',
			'True, but not the whole story: arrows add tip-to-tail and can be stretched.',
			'Right. A vector is anything that can be added and scaled; lists, polynomials and arrows are three viewpoints on the same idea.'
		]
	},
	'ch01.what-is-a-vector.2': {
		hints: [
			'Right and up are positive; left and down are negative.',
			'The first entry is the horizontal move, the second entry is the vertical move.',
			'Moving 2 units down means the second entry is $-2$.'
		]
	},
	'ch01.what-is-a-vector.3': {
		hints: [
			'To be a vector space, the set must stay inside itself when you add two members or scale one.',
			'Add $(1 + x)$ and $(x^2)$: is the sum still a polynomial of degree at most 2?'
		],
		notes: [
			'Right. Sums and scalar multiples stay in the set, which is exactly what vectors must allow.',
			'No. They are not arrows; what matters is that they can be added and scaled.',
			'No. Length and direction belong to arrows, and they are not the defining property.',
			'No. $1$, $x$ and $x^2$ are not multiples of each other.'
		]
	},
	'ch01.what-is-a-vector.4': {
		hints: [
			'The target is $(3,2)$: go 3 to the right and 2 up from the origin.',
			'Drag the tip until the readout shows $x = 3$ and $y = 2$.'
		]
	},
	'ch01.add-and-scale.1': {
		hints: [
			'Add the first entries together, then the second entries together.',
			'First entry: $2 + (-1)$. Second entry: $1 + 3$.'
		]
	},
	'ch01.add-and-scale.2': {
		hints: ['Multiply every entry by the scalar.', 'Compute $3\\cdot1$ and $3\\cdot(-2)$.']
	},
	'ch01.add-and-scale.3': {
		hints: [
			'Scale $\\mathbf v$ first: $2\\mathbf v = (2,4)$.',
			'Then subtract $\\mathbf w = (3,-1)$ entry by entry. Careful: subtracting $-1$ adds $1$.'
		]
	},
	'ch01.add-and-scale.4': {
		hints: [
			'Multiply $(2,1)$ by $-1$ and compare it with the original.',
			'Look at what happens to the length (the numbers keep their size) and to the direction.'
		],
		notes: [
			'Right. $-\\mathbf v$ is the same length but points the opposite way.',
			'No. Multiplying by $-1$ does not change the size of the entries, so the length is unchanged.',
			'No. A rotation by 90 degrees would swap and negate entries, not just negate them.',
			'No. $-\\mathbf v\\ne\\mathbf v$ unless $\\mathbf v = \\mathbf 0$.'
		]
	},
	'ch01.add-and-scale.5': {
		hints: [
			'Add the entries: first with first, second with second.',
			'$\\mathbf v + \\mathbf w = (2 + 1,\\ 1 + 3)$.'
		]
	},
	'ch01.span.1': {
		hints: [
			'The span is every scalar multiple of the vector, $c\\mathbf v$ for all numbers $c$.',
			'Picture stretching, shrinking and flipping one arrow: where do the tips land?'
		],
		notes: [
			'Right. All multiples $c\\mathbf v$ lie on one line, and $c = 0$ gives the origin, so it passes through the origin.',
			'No. One vector only reaches along its own line; you need two non-parallel vectors for the whole plane.',
			'No. That would be only $c = 0$. Other values of $c$ reach other points on the line.',
			'No. The span always contains $\\mathbf 0$ (take $c = 0$), so the line must pass through the origin.'
		]
	},
	'ch01.span.2': {
		hints: ['Is $(2,4)$ a multiple of $(1,2)$?', 'If so, the second vector adds no new direction.'],
		notes: [
			'No. Both vectors point along the same line, so they cannot reach the whole plane.',
			'Right. $(2,4) = 2(1,2)$, so everything in the span is a multiple of $(1,2)$, which lies on $y = 2x$.',
			'No. Multiples of $(1,2)$ other than $0$ are in the span.',
			'No. $(1,2)$ is not on $y = x$; the slope is $2$, not $1$.'
		]
	},
	'ch01.span.3': {
		hints: [
			'Two non-parallel vectors in the plane span the whole plane. Are $(3,1)$ and $(1,2)$ parallel?',
			'Check: is $(1,2)$ a multiple of $(3,1)$? You would need $3c = 1$ and $c = 2$ at the same time.'
		],
		notes: [
			'Right. They are not parallel, so any point of the plane, including $(7,0)$, is a combination of them.',
			'No. Being in a span does not require being a multiple of one of the vectors; you can combine both.',
			'No. You are allowed any real scalars, and in fact $(7,0)$ can be reached.',
			'No. It can be decided: two independent vectors in the plane always span it.'
		]
	},
	'ch01.span.4': {
		hints: [
			'Write the two equations $a + 3b = 5$ and $2a + b = 5$.',
			'Multiply the second equation by $3$ and subtract the first to eliminate $b$.',
			'You get $5a = 10$.'
		],
		slips: [
			{ value: 1, note: 'That is the value of $b$ (the coefficient of $(3,1)$), not of $a$.' },
			{ value: 5, note: 'Recheck: with $a = 5$ the first entry would already be $5 + 3b$, so $b$ would have to be $0$, but then the second entry is $10$, not $5$.' }
		]
	},
	'ch01.span.5': {
		hints: [
			'They fail to span the plane exactly when one is a multiple of the other.',
			'$(2,c)$ is a multiple of $(1,3)$ when it is $2\\cdot(1,3)$.'
		],
		slips: [{ value: 3, note: 'That would make $(2,3)$, which is not parallel to $(1,3)$. Scale both entries of $(1,3)$ by $2$.' }]
	},
	'ch01.dot-product.1': {
		hints: ['Multiply matching entries, then add the products.', '$1\\cdot3 + 2\\cdot4$.']
	},
	'ch01.dot-product.2': {
		hints: ['Use $\\sqrt{x^2 + y^2}$ (Pythagoras).', '$3^2 + 4^2 = 25$.']
	},
	'ch01.dot-product.3': {
		hints: [
			'Recall $\\mathbf a\\cdot\\mathbf b = \\lVert\\mathbf a\\rVert\\lVert\\mathbf b\\rVert\\cos\\theta$.',
			'If the dot product is $0$ and neither vector is $\\mathbf 0$, what must $\\cos\\theta$ be?'
		],
		notes: [
			'Right. $\\cos\\theta = 0$ means $\\theta = 90^\\circ$: the vectors are perpendicular.',
			'No. Parallel vectors have $\\cos\\theta = \\pm1$, so their dot product is $\\pm\\lVert\\mathbf a\\rVert\\lVert\\mathbf b\\rVert$, not $0$.',
			'No. The question says both are nonzero.',
			'No. The dot product says nothing about lengths being equal.'
		]
	},
	'ch01.dot-product.4': {
		hints: [
			'Compute $\\cos\\theta = \\dfrac{\\mathbf a\\cdot\\mathbf b}{\\lVert\\mathbf a\\rVert\\lVert\\mathbf b\\rVert}$ first.',
			'$\\mathbf a\\cdot\\mathbf b = 1$ and both lengths are $\\sqrt2$, so $\\cos\\theta = \\tfrac12$.'
		],
		slips: [{ value: 30, note: '$\\cos30^\\circ\\approx0.87$, not $0.5$. Which angle has cosine $\\tfrac12$?' }]
	},
	'ch01.projection.1': {
		hints: [
			'Use $\\dfrac{\\mathbf a\\cdot\\mathbf b}{\\mathbf a\\cdot\\mathbf a}\\mathbf a$.',
			'$\\mathbf a\\cdot\\mathbf b = 12$, $\\mathbf a\\cdot\\mathbf a = 16$.'
		]
	},
	'ch01.projection.2': {
		hints: [
			'First find $\\mathbf a\\cdot\\mathbf b$ and $\\mathbf a\\cdot\\mathbf a$ with $\\mathbf a = (1,1)$.',
			'The scale factor is $\\tfrac52$; multiply it by $(1,1)$.'
		]
	},
	'ch01.projection.3': {
		hints: [
			'The projection is the part of $\\mathbf b$ along $\\mathbf a$. What remains must be the part not along $\\mathbf a$.',
			'Think of the shadow of $\\mathbf b$ on the line, and the dashed segment joining $\\mathbf b$ to its shadow.'
		],
		notes: [
			'Right. The leftover is the segment from the shadow to the tip of $\\mathbf b$, and it meets the line at a right angle.',
			'No. If it were parallel to $\\mathbf a$ it would have been counted in the projection.',
			'No. That would happen only if the projection were $\\mathbf 0$.',
			'No. It is zero only when $\\mathbf b$ already lies on the line.'
		]
	},
	'ch01.projection.4': {
		hints: [
			'Projecting onto the $x$-direction keeps only the horizontal part.',
			'Which part of $(3,4)$ lies along the $x$-axis? Drop the vertical part.'
		]
	},
	'ch01.lines-planes.1': {
		hints: [
			'The normal is made of the coefficients of $x$, $y$ and $z$.',
			'Read them off from $1x + 2y + 2z = 0$.'
		]
	},
	'ch01.lines-planes.2': {
		hints: [
			'Substitute the point into $3x + y + 2z$.',
			'$3\\cdot2 + 0 + 2\\cdot1$.'
		]
	},
	'ch01.lines-planes.3': {
		hints: ['Subtract the first point from the second.', '$(4 - 1,\\ 5 - 1)$.']
	},
	'ch01.cross-product.1': {
		hints: [
			'First entry: $a_2b_3 - a_3b_2$.',
			'Second entry: $a_3b_1 - a_1b_3$. Third entry: $a_1b_2 - a_2b_1$.',
			'Plug in $a = (1,2,3)$ and $b = (4,5,6)$ one entry at a time.'
		]
	},
	'ch01.cross-product.2': {
		hints: [
			'Swap the two vectors in the formula and see what happens to each entry, e.g. $a_2b_3 - a_3b_2$ becomes $b_2a_3 - b_3a_2$.',
			'Use the right-hand rule: swapping the order flips the direction.'
		],
		notes: [
			'Right. Every entry changes sign, so $\\mathbf w\\times\\mathbf v = -(\\mathbf v\\times\\mathbf w)$.',
			'No. The order matters; the cross product is not commutative.',
			'No. It is parallel to $\\mathbf v\\times\\mathbf w$ (it is minus it), not perpendicular to it.',
			'No. The length is unchanged: it is the area of the same parallelogram.'
		]
	},
	'ch01.cross-product.3': {
		hints: [
			'The parallelogram here is a rectangle with sides $3$ and $2$.',
			'Area equals the length of the cross product: base times height.'
		]
	}
};

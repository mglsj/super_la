import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch05.independence.1': {
		hints: [
			'Independent means no vector is a combination of the others.',
			'Is $(2,4)$ a multiple of $(1,2)$?'
		],
		notes: [
			'Right. $(2,4) = 2(1,2)$, so one is redundant: dependent.',
			'No. $2\\cdot(1,2) - (2,4) = \\mathbf 0$ is a nontrivial relation.',
			'No. Dependence is a property of the vectors, not of the ambient space.',
			'No. You can tell: $(2,4)$ is visibly $2(1,2)$.'
		]
	},
	'ch05.independence.2': {
		hints: [
			'The plane has dimension $2$, so it has room for at most $2$ independent vectors.',
			'Any third vector must be a combination of two independent ones.'
		],
		notes: [
			'Right. At most 2 vectors can be independent in $\\mathbb{R}^2$.',
			'No. Three independent vectors need a space of dimension at least 3.',
			'No. A basis of $\\mathbb{R}^2$ has exactly 2 vectors.',
			'No. They need not be parallel; they are only dependent.'
		]
	},
	'ch05.independence.3': {
		hints: [
			'Dependent means one is a multiple of the other: $(3,c) = 3\\cdot(1,2)$.',
			'Equivalently the determinant $1\\cdot c - 2\\cdot3$ is $0$.'
		]
	},
	'ch05.independence.4': {
		hints: [
			'Write a relation: $1\\cdot\\mathbf 0 + 0\\cdot\\mathbf v_2 + \\dots = \\mathbf 0$.',
			'Is that a nontrivial relation? What if you use $5$ instead of $1$ for the zero vector?'
		],
		notes: [
			'Right. $5\\cdot\\mathbf 0 + 0\\cdot\\mathbf v_2 + \\dots = \\mathbf 0$ is a nontrivial combination giving $\\mathbf 0$.',
			'No. Independence needs all coefficients forced to zero, which fails here.',
			'No. A basis must be independent.',
			'No. The list has at least the zero vector in it.'
		]
	},
	'ch05.basis.1': {
		hints: [
			'A basis has two jobs: no redundancy, and nothing missing.',
			'Redundancy is controlled by independence; "nothing missing" means spanning.'
		],
		notes: [
			'Right. Independent (no waste) and spanning (reaches everything) together make a basis.',
			'Not enough. An independent list can still miss part of the space.',
			'Not enough. A spanning list may contain redundant vectors.',
			'No. Basis vectors need not be perpendicular.'
		]
	},
	'ch05.basis.2': {
		hints: [
			'Two vectors form a basis of $\\mathbb{R}^2$ if they are independent (not parallel).',
			'Are $(1,1)$ and $(1,-1)$ multiples of each other?'
		],
		notes: [
			'Right. They are not parallel, so they are independent, and two independent vectors span $\\mathbb{R}^2$.',
			'No. $(1,1)$ and $(1,-1)$ point in different directions.',
			'No. Length plays no role in being a basis.',
			'No. Normalising is not required.'
		]
	},
	'ch05.basis.3': {
		hints: [
			'$(2,0) = 2(1,0)$, so check independence.',
			'Both vectors lie on the $x$-axis: can they reach $(0,1)$?'
		],
		notes: [
			'Right. They are multiples of each other (dependent) and only reach the $x$-axis.',
			'No. Both lie on one line.',
			'Not a basis of $\\mathbb{R}^2$; for the $x$-axis alone one of them would suffice.',
			'No. Rescaling a vector on the $x$-axis keeps it on the $x$-axis.'
		]
	},
	'ch05.basis.4': {
		hints: [
			'The tile area is $|\\det[\\mathbf b_1\\ \\mathbf b_2]|$.',
			'$\\det\\begin{bmatrix}2&-1\\\\1&2\\end{bmatrix} = 2\\cdot2 - (-1)\\cdot1$.'
		]
	},
	'ch05.coordinates.1': {
		hints: [
			'Solve $a(1,0) + b(1,1) = (3,2)$.',
			'The second entry gives $b = 2$. Then the first entry: $a + b = 3$.'
		]
	},
	'ch05.coordinates.2': {
		hints: [
			'Solve $a(2,0) + b(1,2) = (5,4)$.',
			'Second entry: $2b = 4$. First entry: $2a + b = 5$.'
		]
	},
	'ch05.coordinates.3': {
		hints: [
			'$\\mathbf v = P[\\mathbf v]_B$: $P$ builds $\\mathbf v$ from its coordinates.',
			'To get the coordinates, undo $P$ by multiplying by $P^{-1}$.'
		],
		notes: [
			'Right. $\\mathbf v = P[\\mathbf v]_B$, so $[\\mathbf v]_B = P^{-1}\\mathbf v$.',
			'No. $P\\mathbf v$ goes the other way (from coordinates to standard).',
			'No. The transpose only inverts $P$ if the basis is orthonormal.',
			'No. Division by a matrix is not defined; use $P^{-1}$ on the left.'
		]
	},
	'ch05.coordinates.4': {
		hints: [
			'Solve $a(1,1) + b(1,-1) = (4,4)$.',
			'Add the two entries: $2a = 8$. Subtract them: $2b = 0$.'
		]
	},
	'ch05.dimension.1': {
		hints: [
			'A basis of this space is $1, x, x^2, x^3$.',
			'Count the basis vectors.'
		]
	},
	'ch05.dimension.2': {
		hints: [
			'A $2\\times3$ matrix has $6$ free entries.',
			'A basis is the six matrix units $E_{ij}$.'
		]
	},
	'ch05.dimension.3': {
		hints: [
			'$\\mathbb{R}^4$ has dimension $4$. A basis has exactly $4$ vectors.',
			'If you already have $4$ independent vectors, nothing is missing.'
		],
		notes: [
			'Right. In an $n$-dimensional space, $n$ independent vectors are automatically a basis.',
			'No. Four independent vectors span a 4-dimensional space, which is all of $\\mathbb{R}^4$.',
			'No. Independence does not mean perpendicular.',
			'No. A list containing $\\mathbf 0$ is dependent.'
		]
	},
	'ch05.dimension.4': {
		hints: [
			'Is $(1,1,0)$ a combination of the other two?',
			'$(1,1,0) = (1,0,0) + (0,1,0)$, so it adds nothing.'
		]
	}
};

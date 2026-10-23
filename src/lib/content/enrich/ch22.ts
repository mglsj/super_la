import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch22.matrix-groups.1': {
		hints: [
			'A group needs closure, an identity, and inverses. Test each option against the three.',
			'Product of invertible matrices is invertible, and the inverse of an invertible matrix is invertible.'
		],
		notes: [
			'Right. $GL_2$ is closed under products and inverses and contains $I$.',
			'No. A product of symmetric matrices is generally not symmetric.',
			'No. The inverse of a positive-entry matrix typically has negative entries; also not closed under inverses.',
			'No. A product of singular matrices is singular, but they have no inverses at all.'
		]
	},
	'ch22.matrix-groups.2': {
		hints: [
			'Use $\\det(AB) = \\det A\\cdot\\det B$.',
			'If both determinants are $1$, so is the product.'
		],
		notes: [
			'Right. Determinants multiply, and $1\\cdot1 = 1$.',
			'No. Determinants multiply; they do not add.',
			'No. Determinant 1 does not make a matrix symmetric.',
			'No. It is closed: this is the special linear group $SL_n$.'
		]
	},
	'ch22.matrix-groups.3': {
		hints: [
			'Multiply $\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&x\\\\0&1\\end{bmatrix}$ and set it equal to $I$.',
			'The top-right entry is $x + 2$; set it to $0$.'
		]
	},
	'ch22.matrix-groups.4': {
		hints: [
			'Take two symmetric matrices that do not commute and multiply them.',
			'$(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T} = BA$, which is not $AB$ unless they commute.'
		],
		notes: [
			'Right. $(AB)^{\\mathsf T} = BA\\ne AB$ in general, so closure fails.',
			'No. Invertible symmetric matrices exist, and the inverse of a symmetric matrix is symmetric.',
			'No. $I$ is symmetric and serves as the identity.',
			'No. Size does not matter for being a group.'
		]
	},
	'ch22.orthogonal-group.1': {
		hints: [
			'Rotations add their angles: $R(\\alpha)R(\\beta) = R(\\alpha + \\beta)$.',
			'$40 + 25$.'
		]
	},
	'ch22.orthogonal-group.2': {
		hints: [
			'Each reflection has $\\det = -1$ and determinants multiply.',
			'$(-1)\\cdot(-1)$.'
		]
	},
	'ch22.orthogonal-group.3': {
		hints: [
			'Two reflections each flip orientation. What does flipping twice do?',
			'The product preserves orientation and lengths. Which type of orthogonal map is that?'
		],
		notes: [
			'Right. The determinant is $(-1)^2 = +1$, and orthogonal $2\\times2$ matrices with $\\det = +1$ are rotations (by twice the angle between the mirrors).',
			'No. A reflection has determinant $-1$, and the product has $+1$.',
			'No. A shear is not orthogonal (it does not preserve lengths).',
			'No. Both factors are invertible, so the product is too.'
		]
	},
	'ch22.orthogonal-group.4': {
		hints: [
			'Rotating by $30^\\circ$ and then by the opposite angle returns every vector to where it started.',
			'$R(30^\\circ)R(\\alpha) = R(0)$.'
		]
	},
	'ch22.matrix-exponential.1': {
		hints: [
			'Use $\\det(e^A) = e^{\\operatorname{tr}A}$.',
			'$e^2\\approx7.389$.'
		]
	},
	'ch22.matrix-exponential.2': {
		hints: [
			'Compute $(e^A)^{\\mathsf T}e^A = e^{A^{\\mathsf T}}e^A = e^{-A}e^A$.',
			'Because $A$ and $-A$ commute, $e^{-A}e^A = e^0 = I$.'
		],
		notes: [
			'Right. $(e^A)^{\\mathsf T} = e^{A^{\\mathsf T}} = e^{-A} = (e^A)^{-1}$, so $e^A$ is orthogonal (a rotation).',
			'No. A rotation, e.g. $e^{\\theta J}$, is generally not symmetric.',
			'No. $e^A$ is always invertible, with inverse $e^{-A}$.',
			'No. $e^A = I$ only for special $A$.'
		]
	},
	'ch22.matrix-exponential.3': {
		hints: [
			'$e^0 = I$, since the series $I + 0 + 0 + \\cdots$ stops after the first term.',
			'The trace of $I_2$ is the sum of its diagonal entries.'
		]
	},
	'ch22.matrix-exponential.4': {
		hints: [
			'For a diagonal matrix, $e^A$ exponentiates each diagonal entry.',
			'$e^{\\ln2} = 2$.'
		]
	},
	'ch22.matrix-exponential.5': {
		hints: [
			'Expand both sides to second order: $e^{A+B}$ contains $\\tfrac12(A+B)^2$, which has both $AB$ and $BA$, while $e^Ae^B$ contains $AB$ twice.',
			'The two second-order terms agree only if $AB = BA$.'
		],
		notes: [
			'Right. When $A$ and $B$ commute the usual exponent law holds.',
			'No. The terms $AB$ and $BA$ differ in general.',
			'No. It holds for commuting matrices, for example when $B = A$ or $B = 0$.',
			'No. $A = B$ is just one special case of commuting.'
		]
	}
};

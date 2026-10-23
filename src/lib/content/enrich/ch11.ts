import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch11.inner-products.1': {
		hints: [
			'The axioms are symmetry, linearity in each slot, and positive definiteness. Which option is none of those?',
			'Cauchy–Schwarz says the inner product is at most $\\lVert\\mathbf u\\rVert\\lVert\\mathbf v\\rVert$ in absolute value; here the inequality points the wrong way.'
		],
		notes: [
			'Right, this is NOT an axiom, and it is false. In fact $|\\langle\\mathbf u,\\mathbf v\\rangle|\\le\\lVert\\mathbf u\\rVert\\lVert\\mathbf v\\rVert$ (Cauchy–Schwarz).',
			'This is an axiom: the order of the two vectors does not matter (for real spaces).',
			'This is an axiom: the inner product is linear when the other slot is held fixed.',
			'This is an axiom: only the zero vector has zero self-inner-product, and it is never negative.'
		]
	},
	'ch11.inner-products.2': {
		hints: [
			'Plug into $x_1y_1 + 3x_2y_2$ with $\\mathbf x = (1,2)$ and $\\mathbf y = (2,1)$.',
			'$1\\cdot2 + 3\\cdot2\\cdot1$.'
		],
		slips: [{ value: 4, note: 'That is the ordinary dot product $1\\cdot2 + 2\\cdot1$. This inner product weights the second coordinate by $3$.' }]
	},
	'ch11.inner-products.3': {
		hints: [
			'$\\lVert\\mathbf v\\rVert = \\sqrt{\\langle\\mathbf v,\\mathbf v\\rangle}$.',
			'$\\langle(1,1),(1,1)\\rangle = 1\\cdot1 + 3\\cdot1\\cdot1 = 4$.'
		],
		slips: [{ value: 1.4142, note: 'That is the length under the ordinary dot product, $\\sqrt2$. Here the inner product is weighted: use $\\sqrt{1 + 3}$.' }]
	},
	'ch11.inner-products.4': {
		hints: [
			'It bounds the inner product by the product of lengths: think of $\\cos\\theta\\le1$.',
			'$\\langle\\mathbf u,\\mathbf v\\rangle = \\lVert\\mathbf u\\rVert\\lVert\\mathbf v\\rVert\\cos\\theta$ in the dot-product case.'
		],
		notes: [
			'Right. The inner product cannot exceed the product of the lengths in size (with equality for parallel vectors).',
			'No. That is the equality case of the triangle inequality, valid only for parallel vectors in the same direction.',
			'No. The inner product can be negative.',
			'No. Vectors can be longer than $1$.'
		]
	},
	'ch11.orthogonal-bases.1': {
		hints: [
			'"Ortho" means perpendicular and "normal" means unit length.',
			'An orthonormal basis needs both properties at once.'
		],
		notes: [
			'Right. Unit length and pairwise perpendicular, so $\\mathbf q_i\\cdot\\mathbf q_j = \\delta_{ij}$.',
			'Incomplete. Unit length is "normal"; the vectors also need to be perpendicular.',
			'Incomplete. That is "orthogonal"; the vectors also need unit length for orthonormal.',
			'No. Parallel vectors cannot form a basis.'
		]
	},
	'ch11.orthogonal-bases.2': {
		hints: [
			'In an orthonormal basis, coordinates are dot products: $c_1 = \\mathbf q_1\\cdot\\mathbf v$.',
			'$\\tfrac35\\cdot5 + \\tfrac45\\cdot0$.'
		]
	},
	'ch11.orthogonal-bases.3': {
		hints: [
			'Same recipe: $c_2 = \\mathbf q_2\\cdot\\mathbf v$.',
			'$-\\tfrac45\\cdot5 + \\tfrac35\\cdot0$. Watch the sign.'
		],
		slips: [{ value: 4, note: 'Check the sign: the first entry of $\\mathbf q_2$ is $-\\tfrac45$.' }]
	},
	'ch11.orthogonal-bases.4': {
		hints: [
			'In an orthonormal basis, length-squared is the sum of squared coordinates (Pythagoras).',
			'$3^2 + (-4)^2$.'
		]
	},
	'ch11.gram-schmidt.1': {
		hints: [
			'Normalise by dividing by the length: $\\lVert(3,4)\\rVert = 5$.',
			'$\\mathbf q_1 = (3,4)/5$.'
		]
	},
	'ch11.gram-schmidt.2': {
		hints: [
			'$\\operatorname{proj}_{\\mathbf a}\\mathbf b = \\dfrac{\\mathbf a\\cdot\\mathbf b}{\\mathbf a\\cdot\\mathbf a}\\mathbf a = \\dfrac22(1,0)$.',
			'Subtract it from $\\mathbf b = (2,3)$.'
		]
	},
	'ch11.gram-schmidt.3': {
		hints: [
			'$\\lVert\\mathbf r\\rVert = \\sqrt{(\\tfrac12)^2 + (-\\tfrac12)^2}$.',
			'$\\sqrt{\\tfrac14 + \\tfrac14} = \\sqrt{\\tfrac12}$.'
		],
		slips: [{ value: 0.5, note: 'That is one entry of $\\mathbf r$, not its length. Use Pythagoras with both entries.' }]
	},
	'ch11.gram-schmidt.4': {
		hints: [
			'$R$ records the coefficients: column $j$ of $A$ is a combination of $\\mathbf q_1,\\dots,\\mathbf q_j$ only.',
			'Because $\\mathbf a_j$ uses only the first $j$ orthonormal vectors, $R$ has zeros below the diagonal.'
		],
		notes: [
			'Right. Each new $\\mathbf q_j$ is built from $\\mathbf a_1,\\dots,\\mathbf a_j$, so $R$ is upper triangular.',
			'No. $Q$ is the orthogonal factor; $R$ holds the coefficients.',
			'No. The zeros are below the diagonal, so $R$ is upper triangular.',
			'No. $R$ equals the identity only if $A$ already has orthonormal columns.'
		]
	},
	'ch11.orthogonal-matrices.1': {
		hints: [
			'$Q^{\\mathsf T}Q$ takes dot products of the columns of $Q$.',
			'For orthonormal columns that gives $I$, so $Q^{\\mathsf T}$ is a left inverse, and for a square matrix an inverse.'
		],
		notes: [
			'Right. $Q^{\\mathsf T}Q = I$, so the transpose undoes $Q$.',
			'No. $-Q$ times $Q$ is $-Q^2$, not $I$.',
			'No. $Q^2\\cdot Q = Q^3\\ne I$ in general.',
			'No. Scaling $Q$ by its determinant does not give an inverse.'
		]
	},
	'ch11.orthogonal-matrices.2': {
		hints: [
			'A reflection reverses orientation.',
			'A reflection preserves lengths (so $|\\det| = 1$) but flips orientation (negative sign).'
		]
	},
	'ch11.orthogonal-matrices.3': {
		hints: [
			'Orthogonal matrices preserve lengths: $\\lVert Q\\mathbf x\\rVert^2 = \\mathbf x^{\\mathsf T}Q^{\\mathsf T}Q\\mathbf x = \\mathbf x^{\\mathsf T}\\mathbf x$.',
			'$\\lVert(3,4)\\rVert = 5$.'
		]
	},
	'ch11.orthogonal-matrices.4': {
		hints: [
			'Orthogonal requires $Q^{\\mathsf T}Q = I$, so each column must have length exactly $1$.',
			'The first column $(1,1)$ has length $\\sqrt2$.'
		],
		notes: [
			'Right. Perpendicular columns are not enough; they must also be unit length. (Dividing by $\\sqrt2$ would fix it.)',
			'Not enough. The columns are perpendicular, but orthogonal matrices need unit-length columns too.',
			'No. The determinant of an orthogonal matrix is $\\pm1$, not $-2$.',
			'No. It is square.'
		]
	}
};

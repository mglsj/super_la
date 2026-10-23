import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch14.positive-definite.1': {
		hints: [
			'Write $\\mathbf x$ in the eigenbasis: $\\mathbf x^{\\mathsf T}A\\mathbf x = \\sum\\lambda_ic_i^2$.',
			'That is positive for every nonzero $\\mathbf x$ exactly when every $\\lambda_i>0$.'
		],
		notes: [
			'Right. Positive definite means $\\mathbf x^{\\mathsf T}A\\mathbf x>0$ for $\\mathbf x\\ne0$, equivalent to all eigenvalues $>0$.',
			'No. $\\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$ has all positive entries but eigenvalue $-1$.',
			'No. A positive determinant could come from two negative eigenvalues.',
			'No. Invertible only says no zero eigenvalue; they could still be negative.'
		]
	},
	'ch14.positive-definite.2': {
		hints: [
			'Test the $2\\times2$ conditions: $a>0$ and $ac - b^2>0$.',
			'$1\\cdot1 - 2\\cdot2 = -3$.'
		],
		notes: [
			'Right. A negative determinant means one negative and one positive eigenvalue, so the form takes negative values (e.g. at $(1,-1)$).',
			'No. Positive entries do not make a matrix positive definite.',
			'No. The trace is $2$, but eigenvalues are $3$ and $-1$.',
			'No. The determinant test settles it.'
		]
	},
	'ch14.positive-definite.3': {
		hints: [
			'Require $ac - b^2>0$ with $a = c = 2$.',
			'$4 - b^2>0$ means $b^2<4$.'
		]
	},
	'ch14.positive-definite.4': {
		hints: [
			'Compute the form: $\\mathbf x^{\\mathsf T}A\\mathbf x = x_1^2 - x_2^2$.',
			'Try $\\mathbf x = (1,0)$ and $\\mathbf x = (0,1)$ and compare the signs.'
		],
		notes: [
			'Right. It is positive along $x_1$ and negative along $x_2$: a saddle.',
			'No. At $(0,1)$ the value is $-1$.',
			'No. At $(1,0)$ the value is $+1$.',
			'No. The form is not identically zero.'
		]
	},
	'ch14.tests-and-cholesky.1': {
		hints: [
			'The second leading principal minor of a $2\\times2$ matrix is its determinant.',
			'$4\\cdot3 - 2\\cdot2$.'
		]
	},
	'ch14.tests-and-cholesky.2': {
		hints: [
			'Eliminate: $R_2\\to R_2 - \\tfrac24R_1$.',
			'The second pivot is $3 - \\tfrac12\\cdot2$.'
		]
	},
	'ch14.tests-and-cholesky.3': {
		hints: [
			'Match $LL^{\\mathsf T}$ with the matrix: the $(2,2)$ entry gives $1^2 + \\ell^2 = 3$.',
			'$\\ell = \\sqrt{3 - 1}$.'
		]
	},
	'ch14.tests-and-cholesky.4': {
		hints: [
			'Cholesky takes $\\sqrt{\\text{pivot}}$ at each step. For which matrices are all pivots positive?',
			'Positive pivots are equivalent to positive definite.'
		],
		notes: [
			'Right. All pivots are positive exactly when the matrix is positive definite, so a non-positive pivot signals failure.',
			'No. Size does not matter.',
			'No. A diagonal matrix with a negative entry fails; one with positive entries succeeds.',
			'No. Integer entries are irrelevant.'
		]
	},
	'ch14.where-they-come-from.1': {
		hints: [
			'Compute $\\mathbf x^{\\mathsf T}A^{\\mathsf T}A\\mathbf x = \\lVert A\\mathbf x\\rVert^2$.',
			'A squared length is never negative, but it can be zero.'
		],
		notes: [
			'Right. $\\mathbf x^{\\mathsf T}A^{\\mathsf T}A\\mathbf x = \\lVert A\\mathbf x\\rVert^2\\ge0$.',
			'Too strong. It is $0$ when $A\\mathbf x = \\mathbf 0$, which can happen for nonzero $\\mathbf x$.',
			'No. If $A$ has dependent columns, $A^{\\mathsf T}A$ is singular.',
			'No. It is symmetric but not diagonal in general.'
		]
	},
	'ch14.where-they-come-from.2': {
		hints: [
			'$\\lVert A\\mathbf x\\rVert^2 = 0$ exactly when $A\\mathbf x = \\mathbf 0$.',
			'For strict positivity we need $A\\mathbf x\\ne0$ for all $\\mathbf x\\ne0$: no nontrivial null space.'
		],
		notes: [
			'Right. Independent columns mean $\\ker A = \\{\\mathbf 0\\}$, so $\\lVert A\\mathbf x\\rVert>0$ for $\\mathbf x\\ne0$.',
			'No. A square matrix can have dependent columns.',
			'No. $A$ need not be symmetric; $A^{\\mathsf T}A$ is always symmetric anyway.',
			'No. Positive entries can still give dependent columns.'
		]
	},
	'ch14.where-they-come-from.3': {
		hints: [
			'$A^{\\mathsf T}A = \\operatorname{diag}(1,4)$.',
			'The condition number is the largest over the smallest eigenvalue.'
		]
	},
	'ch14.where-they-come-from.4': {
		hints: [
			'$A^{\\mathsf T}A$ for a column is the dot product of the column with itself.',
			'$1^2 + 2^2 + 2^2$.'
		]
	}
};

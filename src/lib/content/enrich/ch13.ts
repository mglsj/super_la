import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch13.symmetric-matrices.1': {
		hints: [
			'If $A\\mathbf v = \\lambda\\mathbf v$ over $\\mathbb{C}$, compute $\\bar{\\mathbf v}^{\\mathsf T}A\\mathbf v$ two ways.',
			'For symmetric $A$ it equals its own conjugate, forcing $\\lambda = \\bar\\lambda$.'
		],
		notes: [
			'Right. A symmetric matrix cannot have non-real eigenvalues (the spectral theorem).',
			'No. Rotations have non-real eigenvalues but are not symmetric.',
			'No. $\\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$ has eigenvalue $-1$. Real does not mean positive.',
			'No. Eigenvalues are generally irrational, e.g. $\\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}$.'
		]
	},
	'ch13.symmetric-matrices.2': {
		hints: [
			'Compute $\\lambda\\mathbf u\\cdot\\mathbf v = (A\\mathbf u)\\cdot\\mathbf v$ and compare with $\\mathbf u\\cdot A\\mathbf v = \\mu\\,\\mathbf u\\cdot\\mathbf v$.',
			'Since $A = A^{\\mathsf T}$ the two are equal, so $(\\lambda - \\mu)\\mathbf u\\cdot\\mathbf v = 0$.'
		],
		notes: [
			'Right. $(\\lambda - \\mu)\\,\\mathbf u\\cdot\\mathbf v = 0$ with $\\lambda\\ne\\mu$ forces $\\mathbf u\\cdot\\mathbf v = 0$.',
			'No. They point in different directions, since they have different eigenvalues.',
			'No. Different eigenvalues give different eigenvectors.',
			'No. Eigenvectors are nonzero by definition.'
		]
	},
	'ch13.symmetric-matrices.3': {
		hints: [
			'Eigenvectors of different eigenvalues of a symmetric matrix are orthogonal.',
			'Find a vector with first entry $1$ perpendicular to $(1,1)$.'
		]
	},
	'ch13.symmetric-matrices.4': {
		hints: [
			'The spectral theorem: $A = Q\\Lambda Q^{\\mathsf T}$ with orthonormal eigenvectors as the columns of $Q$.',
			'What property of $Q$ lets you write $Q^{\\mathsf T}$ instead of $Q^{-1}$?'
		],
		notes: [
			'Right. $Q$ is orthogonal (so $Q^{-1} = Q^{\\mathsf T}$), with the orthonormal eigenvectors as columns.',
			'No. The diagonal matrix is $\\Lambda$, which holds the eigenvalues.',
			'No. $Q = I$ would make $A$ diagonal already.',
			'No. $Q$ is orthogonal, which is not triangular in general.'
		]
	},
	'ch13.rank-one-pieces.1': {
		hints: [
			'$\\mathbf q_1\\mathbf q_1^{\\mathsf T} = \\tfrac12\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$.',
			'Multiply by $\\lambda_1 = 3$ and read the top-left entry.'
		]
	},
	'ch13.rank-one-pieces.2': {
		hints: [
			'$\\mathbf q_2\\mathbf q_2^{\\mathsf T} = \\tfrac12\\begin{bmatrix}1&-1\\\\-1&1\\end{bmatrix}$.',
			'Multiply by $\\lambda_2 = 1$; the top-right entry is $-\\tfrac12$.'
		]
	},
	'ch13.rank-one-pieces.3': {
		hints: [
			'$A = 4P_1 + 3P_2 + 0P_3$. Dropping everything except the first piece leaves $3P_2 + 0P_3$ as the error.',
			'The Frobenius norm of $3P_2$ is $3\\lVert P_2\\rVert_F$, and $P_2 = \\mathbf q_2\\mathbf q_2^{\\mathsf T}$ has Frobenius norm $1$.'
		]
	},
	'ch13.rank-one-pieces.4': {
		hints: [
			'Square the decomposition: $A^2 = \\sum_i\\lambda_i\\mathbf q_i\\mathbf q_i^{\\mathsf T}\\sum_j\\lambda_j\\mathbf q_j\\mathbf q_j^{\\mathsf T}$.',
			'The cross terms vanish because $\\mathbf q_i^{\\mathsf T}\\mathbf q_j = 0$ for $i\\ne j$, leaving $\\sum\\lambda_i^2\\mathbf q_i\\mathbf q_i^{\\mathsf T}$.'
		],
		notes: [
			'Right. Each rank-one piece is raised to the power $k$ separately: $\\lambda_i\\to\\lambda_i^k$.',
			'No. That would be the derivative-like formula $k\\lambda_i$, not the $k$-th power.',
			'No. That would scale the identity decomposition, ignoring the eigenvalues.',
			'No. Only the dominant eigenvalue is used, and a multiple of $I$ loses the eigen-directions.'
		]
	},
	'ch13.quadratic-forms.1': {
		hints: [
			'For a diagonal matrix, $\\mathbf x^{\\mathsf T}A\\mathbf x = 5x_1^2 + 2x_2^2$ with $x_1^2 + x_2^2 = 1$.',
			'Put all the weight on the larger eigenvalue.'
		]
	},
	'ch13.quadratic-forms.2': {
		hints: [
			'$\\mathbf x^{\\mathsf T}A\\mathbf x = 2x_1^2 + 2x_1x_2 + 2x_2^2$.',
			'With $\\mathbf x = (1,0)$ the cross term vanishes.'
		]
	},
	'ch13.quadratic-forms.3': {
		hints: [
			'$\\mathbf x = (1,1)/\\sqrt2$ is the eigenvector for $\\lambda = 3$.',
			'For a unit eigenvector, $\\mathbf x^{\\mathsf T}A\\mathbf x = \\lambda$.'
		]
	},
	'ch13.quadratic-forms.4': {
		hints: [
			'Write $\\mathbf x$ in the eigenbasis: the quotient becomes a weighted average of the eigenvalues.',
			'A weighted average can never leave the interval between the smallest and the largest eigenvalue.'
		],
		notes: [
			'Right. $R(\\mathbf x) = \\sum\\lambda_ic_i^2/\\sum c_i^2$ is a weighted average of the eigenvalues.',
			'No. The largest eigenvalue is the maximum, attained at its eigenvector.',
			'No. The smallest eigenvalue is the minimum.',
			'No. The trace is the sum of the eigenvalues, which is generally outside the range.'
		]
	}
};

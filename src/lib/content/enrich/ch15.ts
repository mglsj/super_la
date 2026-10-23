import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch15.circle-to-ellipse.1': {
		hints: [
			'For a diagonal matrix the singular values are the absolute values of the diagonal entries.',
			'Compare $|3|$ and $|-2|$ and pick the smaller.'
		],
		slips: [{ value: -2, note: 'Singular values are never negative; the sign just flips orientation. Take the absolute value.' }]
	},
	'ch15.circle-to-ellipse.2': {
		hints: [
			'$|\\det A| = \\sigma_1\\sigma_2$ because the determinant measures the area scaling.',
			'$|\\!-\\!8| = 4\\sigma_2$.'
		]
	},
	'ch15.circle-to-ellipse.3': {
		hints: [
			'Squared lengths of images: $\\lVert A\\mathbf x\\rVert^2 = \\mathbf x^{\\mathsf T}A^{\\mathsf T}A\\mathbf x$.',
			'The extreme values of this quadratic form are the eigenvalues of $A^{\\mathsf T}A$.'
		],
		notes: [
			'Right. $\\sigma_i^2$ are the eigenvalues of $A^{\\mathsf T}A$ (which is symmetric and positive semidefinite).',
			'No. $A + A^{\\mathsf T}$ is the symmetric part, which is unrelated to stretching factors.',
			'No. The eigenvalues of $A^2$ are the squares of the eigenvalues of $A$, not of the singular values (unless $A$ is symmetric).',
			'No. $A^{-1}$ has singular values $1/\\sigma_i$.'
		]
	},
	'ch15.circle-to-ellipse.4': {
		hints: [
			'Rank = the number of nonzero singular values.',
			'Count the nonzero entries in $5, 2, 0$.'
		]
	},
	'ch15.circle-to-ellipse.5': {
		hints: [
			'The maximum of $\\lVert A\\mathbf x\\rVert$ over unit $\\mathbf x$ is the largest singular value.',
			'$A\\mathbf e_2 = (3,0)$, which has length $3$, and $A\\mathbf e_1 = \\mathbf 0$.'
		]
	},
	'ch15.rotate-stretch-rotate.1': {
		hints: [
			'$U\\Sigma V^{\\mathsf T}\\mathbf x$ is read from right to left: the factor nearest to $\\mathbf x$ acts first.',
			'Which factor is nearest to $\\mathbf x$?'
		],
		notes: [
			'Right. $V^{\\mathsf T}$ first rotates/reflects, then $\\Sigma$ stretches along the axes, then $U$ rotates/reflects.',
			'No. $\\Sigma$ acts second, after $V^{\\mathsf T}$ has aligned the input with the axes.',
			'No. $U$ acts last, placing the stretched result in the output directions.',
			'No. They act in sequence, like any matrix product.'
		]
	},
	'ch15.rotate-stretch-rotate.2': {
		hints: [
			'$A^{\\mathsf T}A = V\\Sigma^{\\mathsf T}U^{\\mathsf T}U\\Sigma V^{\\mathsf T}$, and $U^{\\mathsf T}U = I$.',
			'So $A^{\\mathsf T}A = V\\Sigma^2V^{\\mathsf T}$, an eigendecomposition with eigenvectors in the columns of $V$.'
		],
		notes: [
			'Right. $A^{\\mathsf T}A = V\\Sigma^2V^{\\mathsf T}$.',
			'No. The columns of $U$ are the eigenvectors of $AA^{\\mathsf T}$.',
			'No. $A$ itself need not even be square or symmetric.',
			'No. $\\Sigma$ is diagonal; its eigenvectors would just be the standard basis.'
		]
	},
	'ch15.rotate-stretch-rotate.3': {
		hints: [
			'A rotation does not change lengths; scaling by $2$ doubles all lengths.',
			'So every unit vector is sent to a vector of length $2$.'
		]
	},
	'ch15.rotate-stretch-rotate.4': {
		hints: [
			'$A\\mathbf v_i = U\\Sigma V^{\\mathsf T}\\mathbf v_i$ and $V^{\\mathsf T}\\mathbf v_i = \\mathbf e_i$.',
			'Then $\\Sigma\\mathbf e_i = \\sigma_i\\mathbf e_i$ and $U\\mathbf e_i = \\mathbf u_i$.'
		],
		notes: [
			'Right. $A\\mathbf v_i = \\sigma_i\\mathbf u_i$: $\\mathbf v_i$ is stretched by $\\sigma_i$ and rotated to $\\mathbf u_i$.',
			'No. That would be an eigenvector equation, but the output lives in the $U$ basis, not the $V$ basis.',
			'No. The stretching factor multiplies, not divides.',
			'No. $A\\mathbf v_i = \\mathbf 0$ only for the vectors with $\\sigma_i = 0$.'
		]
	},
	'ch15.low-rank-approximation.1': {
		hints: [
			'Eckart–Young: the Frobenius error of the best rank-$k$ approximation is $\\sqrt{\\sigma_{k+1}^2 + \\sigma_{k+2}^2 + \\cdots}$.',
			'$\\sqrt{3^2 + 1^2}$.'
		],
		slips: [{ value: 4, note: 'That adds the discarded singular values; the Frobenius norm adds their squares and then takes the root.' }]
	},
	'ch15.low-rank-approximation.2': {
		hints: [
			'The spectral-norm error of the best rank-$k$ approximation is the next singular value $\\sigma_{k+1}$.',
			'For $k = 2$ it is $\\sigma_3$.'
		]
	},
	'ch15.low-rank-approximation.3': {
		hints: [
			'Here $k = 5$, $m = 100$, $n = 50$.',
			'$5\\cdot(100 + 50 + 1)$.'
		]
	},
	'ch15.low-rank-approximation.4': {
		hints: [
			'Eckart–Young says no other rank-$k$ matrix gets closer to $A$ than the truncated SVD (in spectral and Frobenius norm).',
			'It keeps the biggest stretches and throws away the smallest.'
		],
		notes: [
			'Right. Among all matrices of rank at most $k$, $A_k$ minimises the distance to $A$.',
			'No. $A_k = A$ only if $A$ already has rank $k$.',
			'No. It is the nearest, not the farthest.',
			'No. The SVD and truncation exist for every rectangular matrix.'
		]
	},
	'ch15.pseudoinverse.1': {
		hints: [
			'$\\kappa = \\sigma_{\\max}/\\sigma_{\\min}$ and the singular values are the diagonal entries.',
			'$2/0.5$.'
		]
	},
	'ch15.pseudoinverse.2': {
		hints: [
			'Invert each nonzero singular value and leave the zeros as zeros.',
			'$1/4$ in the position of the $4$.'
		]
	},
	'ch15.pseudoinverse.3': {
		hints: [
			'Among all vectors $\\mathbf x$ minimising $\\lVert A\\mathbf x - \\mathbf b\\rVert$, $A^+\\mathbf b$ is the shortest.',
			'It exists for every matrix, including rectangular ones.'
		],
		notes: [
			'Right. It minimises the residual and, among those minimisers, has the smallest norm.',
			'No. When $\\mathbf b\\notin\\operatorname{col}(A)$, no exact solution exists.',
			'No. It is the smallest, not the largest.',
			'No. The pseudoinverse is defined for every matrix.'
		]
	},
	'ch15.pseudoinverse.4': {
		hints: [
			'Multiply the $1\\times2$ matrix $A^+$ by $(2,4)$.',
			'$\\tfrac12\\cdot2 + \\tfrac12\\cdot4$. It is the average of the entries.'
		]
	}
};

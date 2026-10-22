import type { QuizBank } from '../types';

export const ch15: QuizBank = {
	'ch15.circle-to-ellipse': [
		{
			id: 'ch15.circle-to-ellipse.1',
			type: 'numeric',
			prompt: 'What is the smaller singular value of $\\begin{bmatrix}3&0\\\\0&-2\\end{bmatrix}$?',
			answer: 2,
			explain: '$A^{\\mathsf T}A = \\operatorname{diag}(9, 4)$, so $\\sigma = 3, 2$. Signs do not matter for singular values.'
		},
		{
			id: 'ch15.circle-to-ellipse.2',
			type: 'numeric',
			prompt: 'A $2\\times2$ matrix has $\\sigma_1 = 4$ and $\\det A = -8$. What is $\\sigma_2$?',
			answer: 2,
			explain: '$|\\det A| = \\sigma_1\\sigma_2$, so $\\sigma_2 = 8/4 = 2$.'
		},
		{
			id: 'ch15.circle-to-ellipse.3',
			type: 'mcq',
			prompt: 'The singular values of $A$ are the square roots of the eigenvalues of…',
			choices: ['$A^{\\mathsf T}A$', '$A + A^{\\mathsf T}$', '$A^2$', '$A^{-1}$'],
			answer: 0,
			explain: '$A^{\\mathsf T}A$ is symmetric PSD, so its eigenvalues are real and $\\ge 0$.'
		},
		{
			id: 'ch15.circle-to-ellipse.4',
			type: 'numeric',
			prompt: 'A matrix has singular values $5, 2, 0$. What is its rank?',
			answer: 2,
			explain: 'Rank equals the number of nonzero singular values.'
		},
		{
			id: 'ch15.circle-to-ellipse.5',
			type: 'numeric',
			prompt: 'What is the largest value of $\\|A\\mathbf x\\|$ over unit vectors $\\mathbf x$, for $A = \\begin{bmatrix}0&3\\\\0&0\\end{bmatrix}$?',
			answer: 3,
			explain: '$A^{\\mathsf T}A = \\operatorname{diag}(0, 9)$, so $\\sigma_1 = 3$, the maximum stretch.'
		}
	],
	'ch15.rotate-stretch-rotate': [
		{
			id: 'ch15.rotate-stretch-rotate.1',
			type: 'mcq',
			prompt: 'Applying $A = U\\Sigma V^{\\mathsf T}$ to a vector, which factor acts first?',
			choices: ['$V^{\\mathsf T}$', '$\\Sigma$', '$U$', 'All at once'],
			answer: 0,
			explain: 'Matrix products act right to left: $V^{\\mathsf T}$ first, then $\\Sigma$, then $U$.'
		},
		{
			id: 'ch15.rotate-stretch-rotate.2',
			type: 'mcq',
			prompt: 'The columns of $V$ in the SVD are the orthonormal eigenvectors of…',
			choices: ['$A^{\\mathsf T}A$', '$AA^{\\mathsf T}$', '$A$', '$\\Sigma$'],
			answer: 0,
			explain: '$A^{\\mathsf T}A = V\\Sigma^2V^{\\mathsf T}$. The columns of $U$ diagonalise $AA^{\\mathsf T}$.'
		},
		{
			id: 'ch15.rotate-stretch-rotate.3',
			type: 'numeric',
			prompt: '$A = \\begin{bmatrix}0&-2\\\\2&0\\end{bmatrix}$ is a $90^\\circ$ rotation scaled by $2$. What is $\\sigma_1$?',
			answer: 2,
			explain: '$A^{\\mathsf T}A = 4I$, so both singular values are $2$.'
		},
		{
			id: 'ch15.rotate-stretch-rotate.4',
			type: 'mcq',
			prompt: 'For each right singular vector $\\mathbf v_i$, $A\\mathbf v_i$ equals…',
			choices: ['$\\sigma_i\\mathbf u_i$', '$\\sigma_i\\mathbf v_i$', '$\\mathbf u_i/\\sigma_i$', '$\\mathbf 0$ always'],
			answer: 0,
			explain: 'Each $\\mathbf v_i$ is mapped to the matching semi-axis of the ellipse.'
		}
	],
	'ch15.low-rank-approximation': [
		{
			id: 'ch15.low-rank-approximation.1',
			type: 'numeric',
			prompt: 'A matrix has singular values $5, 3, 1$. What is the Frobenius error of its best rank-1 approximation? (Decimal.)',
			answer: 3.162,
			tol: 0.01,
			explain: '$\\sqrt{3^2 + 1^2} = \\sqrt{10} \\approx 3.162$.'
		},
		{
			id: 'ch15.low-rank-approximation.2',
			type: 'numeric',
			prompt: 'With the same singular values, what is the spectral-norm error of the best rank-2 approximation?',
			answer: 1,
			explain: 'It equals the first discarded singular value, $\\sigma_3 = 1$.'
		},
		{
			id: 'ch15.low-rank-approximation.3',
			type: 'numeric',
			prompt: 'A rank-5 approximation of a $100\\times50$ matrix stores $k(m + n + 1)$ numbers. How many?',
			answer: 755,
			explain: '$5\\cdot(100 + 50 + 1) = 755$, compared with $5000$ for the full matrix.'
		},
		{
			id: 'ch15.low-rank-approximation.4',
			type: 'mcq',
			prompt: 'The Eckart–Young theorem says the truncated SVD $A_k$ is…',
			choices: [
				'the closest rank-$k$ matrix to $A$',
				'always equal to $A$',
				'the farthest rank-$k$ matrix from $A$',
				'only defined for square $A$'
			],
			answer: 0,
			explain: 'No other matrix of rank at most $k$ is closer to $A$, in either the Frobenius or spectral norm.'
		}
	],
	'ch15.pseudoinverse': [
		{
			id: 'ch15.pseudoinverse.1',
			type: 'numeric',
			prompt: 'What is the condition number of $\\begin{bmatrix}2&0\\\\0&0.5\\end{bmatrix}$?',
			answer: 4,
			explain: '$\\kappa = \\sigma_{\\max}/\\sigma_{\\min} = 2/0.5 = 4$.'
		},
		{
			id: 'ch15.pseudoinverse.2',
			type: 'numeric',
			prompt: 'What is the top-left entry of the pseudoinverse of $\\begin{bmatrix}4&0\\\\0&0\\end{bmatrix}$?',
			answer: 0.25,
			explain: '$\\Sigma^+$ inverts the nonzero singular value $4$ and leaves the $0$ alone, so $A^+ = \\operatorname{diag}(\\tfrac14, 0)$.'
		},
		{
			id: 'ch15.pseudoinverse.3',
			type: 'mcq',
			prompt: '$A^+\\mathbf b$ is…',
			choices: [
				'the minimum-norm least-squares solution of $A\\mathbf x\\approx\\mathbf b$',
				'always an exact solution',
				'the largest solution',
				'undefined for rectangular $A$'
			],
			answer: 0,
			explain: 'Among all least-squares minimisers it picks the shortest.'
		},
		{
			id: 'ch15.pseudoinverse.4',
			type: 'numeric',
			prompt: '$A = \\begin{bmatrix}1\\\\1\\end{bmatrix}$ has pseudoinverse $A^+ = \\begin{bmatrix}\\tfrac12&\\tfrac12\\end{bmatrix}$. Compute $A^+\\mathbf b$ for $\\mathbf b = (2, 4)$.',
			answer: 3,
			explain: '$\\tfrac12\\cdot2 + \\tfrac12\\cdot4 = 3$: the average, which is the least-squares fit of one constant to the data.'
		}
	]
};

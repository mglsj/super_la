import type { QuizBank } from '../types';

export const ch17: QuizBank = {
	'ch17.stationary-iterations': [
		{
			id: 'ch17.stationary-iterations.1',
			type: 'mcq',
			prompt: 'How does Gauss–Seidel differ from Jacobi?',
			choices: [
				'It uses each newly computed value immediately',
				'It uses only the diagonal of $A$',
				'It needs a factorisation',
				'It always diverges'
			],
			answer: 0,
			explain: 'Jacobi uses only values from the previous sweep; Gauss–Seidel updates in place.'
		},
		{
			id: 'ch17.stationary-iterations.2',
			type: 'mcq',
			prompt: 'A stationary iteration $\\mathbf x_{k+1} = G\\mathbf x_k + \\mathbf c$ converges for every start iff…',
			choices: ['$\\rho(G) < 1$', '$\\det G = 0$', '$G$ is symmetric', '$\\mathbf c = \\mathbf 0$'],
			answer: 0,
			explain: 'The error is multiplied by $G$ each step, so it shrinks iff all eigenvalues of $G$ have magnitude below 1.'
		},
		{
			id: 'ch17.stationary-iterations.3',
			type: 'numeric',
			prompt: 'Solve $4x + y = 6,\\ x + 3y = 7$ by Jacobi from $(0, 0)$. What is $x$ after one step?',
			answer: 1.5,
			explain: '$x_1 = (6 - y_0)/4 = 6/4 = 1.5$.'
		},
		{
			id: 'ch17.stationary-iterations.4',
			type: 'numeric',
			prompt: 'Same system by Gauss–Seidel from $(0,0)$: what is $y$ after one step? (Decimal.)',
			answer: 1.833,
			tol: 0.01,
			explain: 'Use the new $x_1 = 1.5$ immediately: $y_1 = (7 - 1.5)/3 = 5.5/3 \\approx 1.833$. Jacobi would have given $7/3 \\approx 2.333$.'
		},
		{
			id: 'ch17.stationary-iterations.5',
			type: 'mcq',
			prompt: 'Which condition guarantees that Jacobi converges?',
			choices: [
				'$A$ is strictly diagonally dominant',
				'$A$ has a zero diagonal',
				'$A$ is singular',
				'$A$ has negative entries'
			],
			answer: 0,
			explain: 'If each diagonal entry beats the sum of the other entries in its row, the iteration matrix has $\\rho < 1$.'
		}
	],
	'ch17.conjugate-gradients': [
		{
			id: 'ch17.conjugate-gradients.1',
			type: 'numeric',
			prompt: 'In exact arithmetic, conjugate gradients solves an SPD system with $n = 3$ unknowns in at most how many steps?',
			answer: 3,
			explain: 'CG minimises over a Krylov subspace that grows by one dimension per step, so it is exact after at most $n$ steps.'
		},
		{
			id: 'ch17.conjugate-gradients.2',
			type: 'mcq',
			prompt: 'The convergence rate of CG depends on the condition number through…',
			choices: ['$\\sqrt{\\kappa}$', '$\\kappa^2$', '$\\log\\kappa$', 'nothing'],
			answer: 0,
			explain: 'The factor is $(\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)$, much better than the $(\\kappa - 1)/(\\kappa + 1)$ of steepest descent.'
		},
		{
			id: 'ch17.conjugate-gradients.3',
			type: 'mcq',
			prompt: 'Search directions $\\mathbf p_i,\\mathbf p_j$ are $A$-conjugate when…',
			choices: [
				'$\\mathbf p_i^{\\mathsf T}A\\mathbf p_j = 0$',
				'$\\mathbf p_i\\cdot\\mathbf p_j = 1$',
				'$\\mathbf p_i = A\\mathbf p_j$',
				'$\\mathbf p_i = \\mathbf p_j$'
			],
			answer: 0,
			explain: 'They are orthogonal in the inner product $\\langle\\mathbf u,\\mathbf v\\rangle_A = \\mathbf u^{\\mathsf T}A\\mathbf v$.'
		},
		{
			id: 'ch17.conjugate-gradients.4',
			type: 'numeric',
			prompt: 'With $\\kappa = 100$, the CG contraction factor is $(\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)$. Compute it (decimal).',
			answer: 0.818,
			tol: 0.005,
			explain: '$\\sqrt{100} = 10$, so the factor is $9/11 \\approx 0.818$. Steepest descent would give $99/101 \\approx 0.980$.'
		}
	],
	'ch17.preconditioning': [
		{
			id: 'ch17.preconditioning.1',
			type: 'mcq',
			prompt: 'A good preconditioner $M$ makes $M^{-1}A$…',
			choices: [
				'close to the identity, with a much smaller condition number',
				'singular',
				'upper triangular',
				'exactly equal to $A$'
			],
			answer: 0,
			explain: 'If $M\\approx A$ then $M^{-1}A\\approx I$, whose eigenvalues cluster near 1.'
		},
		{
			id: 'ch17.preconditioning.2',
			type: 'mcq',
			prompt: 'For a very large sparse symmetric positive definite system, a standard method is…',
			choices: ['preconditioned conjugate gradients', 'computing $A^{-1}$ explicitly', 'Cramer\'s rule', 'full Gaussian elimination'],
			answer: 0,
			explain: 'It needs only matrix–vector products and keeps the sparsity that factorisations would destroy.'
		},
		{
			id: 'ch17.preconditioning.3',
			type: 'numeric',
			prompt: 'Use the diagonal (Jacobi) preconditioner $M = \\operatorname{diag}(A)$ for $A = \\begin{bmatrix}4&1\\\\1&2\\end{bmatrix}$. What is the top-right entry of $M^{-1}A$?',
			answer: 0.25,
			explain: '$M^{-1} = \\operatorname{diag}(\\tfrac14, \\tfrac12)$ scales row 1 by $\\tfrac14$, turning $[4\\ 1]$ into $[1\\ 0.25]$.'
		},
		{
			id: 'ch17.preconditioning.4',
			type: 'mcq',
			prompt: 'For a small dense system, which is usually best?',
			choices: ['A direct factorisation (LU or Cholesky)', 'Conjugate gradients', 'Jacobi iteration', 'Random guessing'],
			answer: 0,
			explain: 'Direct methods are robust and fast at that size; iteration pays off when $n$ is huge and $A$ is sparse.'
		}
	]
};

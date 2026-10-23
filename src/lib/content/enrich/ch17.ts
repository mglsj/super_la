import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch17.stationary-iterations.1': {
		hints: [
			'In Jacobi every new entry is computed from the old vector. What could you do instead?',
			'Gauss–Seidel overwrites each unknown as soon as it is computed.'
		],
		notes: [
			'Right. Gauss–Seidel uses new values immediately, often converging about twice as fast.',
			'No. Both methods use the whole matrix; Jacobi just uses old values everywhere.',
			'No. Neither method needs a factorisation.',
			'No. It converges for many matrices (e.g. symmetric positive definite and diagonally dominant ones).'
		]
	},
	'ch17.stationary-iterations.2': {
		hints: [
			'The error evolves as $\\mathbf e_{k+1} = G\\mathbf e_k$, so $\\mathbf e_k = G^k\\mathbf e_0$.',
			'$G^k\\to0$ exactly when all eigenvalues of $G$ have modulus below 1.'
		],
		notes: [
			'Right. Convergence for every start means $G^k\\to0$, i.e. the spectral radius is below $1$.',
			'No. A singular $G$ does not control the other eigenvalues.',
			'No. Symmetry does not guarantee convergence.',
			'No. The constant $\\mathbf c$ does not affect the convergence of the error.'
		]
	},
	'ch17.stationary-iterations.3': {
		hints: [
			'Solve the first equation for $x$: $x = (6 - y)/4$, using the old $y = 0$.',
			'$x = 6/4$.'
		]
	},
	'ch17.stationary-iterations.4': {
		hints: [
			'First update $x = (6 - 0)/4 = 1.5$. Then use this new $x$ in $y = (7 - x)/3$.',
			'$y = (7 - 1.5)/3$.'
		],
		slips: [{ value: 2.333, note: 'That is the Jacobi value $7/3$, which uses the old $x = 0$. Gauss–Seidel uses the new $x = 1.5$.' }]
	},
	'ch17.stationary-iterations.5': {
		hints: [
			'Strictly diagonally dominant: each diagonal entry is larger than the sum of the other entries in its row.',
			'Then the Jacobi iteration matrix has all row sums below $1$ in absolute value, so $\\rho<1$.'
		],
		notes: [
			'Right. Strict diagonal dominance makes $\\lVert G\\rVert_\\infty<1$, so Jacobi converges.',
			'No. A zero diagonal makes Jacobi undefined (division by zero).',
			'No. A singular system has no unique solution to converge to.',
			'No. Signs of entries are irrelevant to convergence.'
		]
	},
	'ch17.conjugate-gradients.1': {
		hints: [
			'CG builds up the Krylov space one dimension per step.',
			'In dimension $n$ the Krylov space cannot grow beyond $n$.'
		]
	},
	'ch17.conjugate-gradients.2': {
		hints: [
			'The error shrinks by about $\\dfrac{\\sqrt\\kappa - 1}{\\sqrt\\kappa + 1}$ per step.',
			'So the number of iterations scales with the square root of $\\kappa$, not $\\kappa$.'
		],
		notes: [
			'Right. The rate is $(\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)$, so iterations grow like $\\sqrt\\kappa$.',
			'No. That would be much worse; stationary methods scale with $\\kappa$, and CG improves on that.',
			'No. The dependence is not logarithmic.',
			'No. The conditioning matters a great deal.'
		]
	},
	'ch17.conjugate-gradients.3': {
		hints: [
			'Ordinary orthogonality is $\\mathbf p_i^{\\mathsf T}\\mathbf p_j = 0$. For $A$-conjugacy put $A$ in the middle.',
			'It is orthogonality in the $A$-inner product.'
		],
		notes: [
			'Right. Conjugate means orthogonal in the inner product $\\langle\\mathbf u,\\mathbf v\\rangle_A = \\mathbf u^{\\mathsf T}A\\mathbf v$.',
			'No. That is a normalisation, not a conjugacy condition.',
			'No. That relates the directions through $A$, but does not make them conjugate.',
			'No. Identical directions are not conjugate (unless zero).'
		]
	},
	'ch17.conjugate-gradients.4': {
		hints: [
			'First find $\\sqrt\\kappa$ for $\\kappa = 100$, then substitute into the factor.',
			'$(10 - 1)/(10 + 1) = 9/11$.'
		]
	},
	'ch17.preconditioning.1': {
		hints: [
			'CG converges in about $\\sqrt{\\kappa}$ steps. How would you reduce $\\kappa$?',
			'If $M^{-1}A\\approx I$ then its eigenvalues cluster near $1$, so $\\kappa\\approx1$.'
		],
		notes: [
			'Right. A good preconditioner approximates $A$ so that $M^{-1}A\\approx I$, which makes CG converge fast.',
			'No. That would defeat the purpose; the preconditioned system must stay solvable.',
			'No. Triangular form is not the goal.',
			'No. $M = A$ would be perfect for convergence, but applying $M^{-1}$ would cost as much as solving the original system.'
		]
	},
	'ch17.preconditioning.2': {
		hints: [
			'For huge sparse systems we want a method that only needs matrix–vector products.',
			'Which method needs only products with $A$ and converges quickly when the system is SPD?'
		],
		notes: [
			'Right. PCG needs only products with $A$ and applications of the preconditioner.',
			'No. The inverse of a sparse matrix is typically dense and impossible to store.',
			'No. Cramer rule costs factorially many operations.',
			'No. Elimination fills in the sparse matrix and can be too expensive.'
		]
	},
	'ch17.preconditioning.3': {
		hints: [
			'$M = \\operatorname{diag}(4,2)$, so $M^{-1}$ divides row $i$ by $a_{ii}$.',
			'Row 1 of $A$ is $(4,1)$, so row 1 of $M^{-1}A$ is $(1,\\tfrac14)$.'
		]
	},
	'ch17.preconditioning.4': {
		hints: [
			'For a small dense system the cost of an $O(n^3)$ factorisation is trivial.',
			'A direct method gives the answer in a fixed number of steps with no convergence worry.'
		],
		notes: [
			'Right. Direct methods are cheap and reliable for small dense systems.',
			'Not best here. CG shines for large sparse SPD systems, but is unnecessary overhead for a small system.',
			'No. Jacobi converges slowly and only for suitable matrices.',
			'No. Guessing does not solve linear systems.'
		]
	}
};

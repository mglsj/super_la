import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch14';

export const exercises: QuizBank = {
	'ch14.exercises': [
		open(
			C,
			'15.15',
			'Decide which are positive definite, using Sylvester criterion (all leading principal minors positive), and check your answers against the eigenvalues.\n(a) $\\begin{bmatrix}2&-1\\\\-1&2\\end{bmatrix}$  (b) $\\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$  (c) $\\begin{bmatrix}2&-1&0\\\\-1&2&-1\\\\0&-1&2\\end{bmatrix}$',
			[
				'Leading principal minors are the determinants of the top-left $1\\times1$, $2\\times2$, ... blocks.',
				'For the eigenvalue check: (a) and (b) are $2\\times2$ (trace and determinant), (c) has eigenvalues $2$ and $2\\pm\\sqrt2$.'
			],
			'(a) Minors $2$, $3$: both positive, so **positive definite**. Eigenvalues $3, 1$ ✓.\n\n(b) Minors $1$, $1 - 4 = -3<0$: **not** positive definite. Eigenvalues $3, -1$ ✓ (one negative).\n\n(c) Minors $2$, $4 - 1 = 3$, $\\det = 2(4-1) + 1(-2) = 4$: all positive, so **positive definite**. Eigenvalues $2 - \\sqrt2,\\ 2,\\ 2 + \\sqrt2$, all positive ✓ (product $= 2(4 - 2) = 4$ ✓).'
		),
		open(
			C,
			'15.16',
			'Compute the Cholesky factor of $A = \\begin{bmatrix}9&3&-6\\\\3&5&-4\\\\-6&-4&9\\end{bmatrix}$ by hand, and verify $LL^{\\mathsf T} = A$. Then obtain $\\det A$ from $L$ without expanding a determinant.',
			[
				'Find lower-triangular $L$ with $A = LL^{\\mathsf T}$ one column at a time: $l_{11} = \\sqrt{a_{11}}$, then $l_{i1} = a_{i1}/l_{11}$.',
				'Next $l_{22} = \\sqrt{a_{22} - l_{21}^2}$, $l_{32} = (a_{32} - l_{31}l_{21})/l_{22}$, and finally $l_{33} = \\sqrt{a_{33} - l_{31}^2 - l_{32}^2}$.',
				'$\\det A = \\det L\\cdot\\det L^{\\mathsf T} = (\\prod l_{ii})^2$.'
			],
			'$l_{11} = 3$; $l_{21} = 3/3 = 1$; $l_{31} = -6/3 = -2$.\n$l_{22} = \\sqrt{5 - 1} = 2$; $l_{32} = (-4 - (-2)(1))/2 = -1$.\n$l_{33} = \\sqrt{9 - 4 - 1} = 2$.\n\n$L = \\begin{bmatrix}3&0&0\\\\1&2&0\\\\-2&-1&2\\end{bmatrix}$.\n\n**Check:** $(LL^{\\mathsf T})_{11} = 9$, $_{12} = 3$, $_{13} = -6$, $_{22} = 1 + 4 = 5$, $_{23} = -2 - 2 = -4$, $_{33} = 4 + 1 + 4 = 9$ ✓.\n\n$\\det A = (3\\cdot2\\cdot2)^2 = 144$.'
		),
		open(
			C,
			'15.17',
			'Find the inertia of $q(x) = x_1^2 + 2x_1x_2 + 2x_2x_3$ by completing squares. Then confirm your answer by computing the signs of the eigenvalues of the associated symmetric matrix.',
			[
				'Group the terms with $x_1$: $x_1^2 + 2x_1x_2 = (x_1 + x_2)^2 - x_2^2$. Then deal with what remains in $x_2,x_3$.',
				'The associated matrix is $\\begin{bmatrix}1&1&0\\\\1&0&1\\\\0&1&0\\end{bmatrix}$. Its determinant and trace constrain the signs.'
			],
			'$q = (x_1 + x_2)^2 - x_2^2 + 2x_2x_3 = (x_1 + x_2)^2 - (x_2 - x_3)^2 + x_3^2$.\n\nThree independent squares with signs $+,-,+$: inertia $(p,n,z) = (2,1,0)$.\n\n**Check.** $A = \\begin{bmatrix}1&1&0\\\\1&0&1\\\\0&1&0\\end{bmatrix}$ has $\\det A = 1(0 - 1) - 1(0 - 0) = -1<0$, so an odd number of eigenvalues are negative, and the trace is $1$, which rules out three negatives. With $\\det\\neq0$ (no zeros): one negative and two positive eigenvalues ✓ (Sylvester law of inertia).'
		),
		open(
			C,
			'15.18',
			'Let $A\\succ0$. Show that $A$ has a unique positive definite square root, and that it is a polynomial in $A$. Hint: the spectral theorem for existence and the earlier square-root exercise for uniqueness; for the last part interpolate the function $\\sqrt{\\cdot}$ at the eigenvalues.',
			[
				'$A = QDQ^{\\mathsf T}$ with $D = \\operatorname{diag}(\\lambda_i)$, $\\lambda_i>0$. The root is $B = Q\\operatorname{diag}(\\sqrt{\\lambda_i})Q^{\\mathsf T}$.',
				'Choose a polynomial $p$ with $p(\\lambda_i) = \\sqrt{\\lambda_i}$ for each distinct eigenvalue (Lagrange interpolation, degree at most the number of distinct eigenvalues minus $1$). Then $p(A) = Qp(D)Q^{\\mathsf T}$.'
			],
			'**Existence and uniqueness** follow from the earlier exercise: $B = Q\\operatorname{diag}(\\sqrt{\\lambda_i})Q^{\\mathsf T}$ is symmetric positive definite with $B^2 = A$, and any other positive semidefinite root must equal $\\sqrt\\lambda$ on each eigenspace.\n\n**Polynomial.** Let $\\mu_1,\\dots,\\mu_k$ be the distinct eigenvalues of $A$ and let $p$ be the Lagrange interpolation polynomial with $p(\\mu_j) = \\sqrt{\\mu_j}$. Then $p(A) = Q\\,p(D)\\,Q^{\\mathsf T}$ and $p(D) = \\operatorname{diag}(p(\\lambda_i)) = \\operatorname{diag}(\\sqrt{\\lambda_i})$. Hence $B = p(A)$ is a polynomial in $A$ (so it commutes with everything that commutes with $A$).'
		),
		open(
			C,
			'15.19',
			'Show that if $A\\succ0$ then every diagonal entry is positive, and that $|a_{ij}|<\\sqrt{a_{ii}a_{jj}}$ for $i\\ne j$. Hint: apply the definition to vectors supported on two coordinates, and recall Cauchy–Schwarz. Give a symmetric matrix with all diagonal entries positive that is not positive definite.',
			[
				'Take $\\mathbf x = \\mathbf e_i$: then $\\mathbf x^{\\mathsf T}A\\mathbf x = a_{ii}$.',
				'Take $\\mathbf x = s\\mathbf e_i + t\\mathbf e_j$: the form is $a_{ii}s^2 + 2a_{ij}st + a_{jj}t^2>0$ for all $(s,t)\\ne0$, so the $2\\times2$ submatrix is positive definite.',
				'A $2\\times2$ positive definite matrix has positive determinant: $a_{ii}a_{jj} - a_{ij}^2>0$.'
			],
			'$a_{ii} = \\mathbf e_i^{\\mathsf T}A\\mathbf e_i>0$.\n\nFor $i\\ne j$ the submatrix $\\begin{bmatrix}a_{ii}&a_{ij}\\\\a_{ij}&a_{jj}\\end{bmatrix}$ is positive definite (it is the form restricted to vectors supported on coordinates $i,j$), so its determinant is positive: $a_{ii}a_{jj} - a_{ij}^2>0$, i.e. $|a_{ij}|<\\sqrt{a_{ii}a_{jj}}$.\n\n**Counterexample.** $\\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$ has positive diagonal but $\\det = -3<0$ (eigenvalues $3,-1$), so it is not positive definite. Positive diagonal is necessary, not sufficient.'
		),
		open(
			C,
			'15.20',
			'Show that congruence ($B = P^{\\mathsf T}AP$ with $P$ invertible) is an equivalence relation, and that $\\begin{bmatrix}1&0\\\\0&4\\end{bmatrix}$ and $\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$ are congruent but not similar. What does that say about which of the two relations quadratic forms care about?',
			[
				'Reflexive: $P = I$. Symmetric: $A = (P^{-1})^{\\mathsf T}BP^{-1}$. Transitive: compose.',
				'To go from $\\operatorname{diag}(1,4)$ to $I$, rescale the second coordinate by $\\tfrac12$.',
				'Similar matrices have the same eigenvalues. Compare the eigenvalues.'
			],
			'**Equivalence.** Reflexive: $A = I^{\\mathsf T}AI$. Symmetric: if $B = P^{\\mathsf T}AP$ then $A = (P^{-1})^{\\mathsf T}BP^{-1}$. Transitive: $C = Q^{\\mathsf T}BQ = (PQ)^{\\mathsf T}A(PQ)$.\n\n**Congruent.** With $P = \\operatorname{diag}(1,\\tfrac12)$: $P^{\\mathsf T}\\operatorname{diag}(1,4)P = \\operatorname{diag}(1,1)$ ✓.\n\n**Not similar.** Their eigenvalues are $\\{1,4\\}$ and $\\{1,1\\}$; similar matrices share eigenvalues.\n\n**Moral.** A quadratic form $\\mathbf x^{\\mathsf T}A\\mathbf x$ changes to $\\mathbf y^{\\mathsf T}P^{\\mathsf T}AP\\mathbf y$ when we change coordinates $\\mathbf x = P\\mathbf y$, so forms are the same up to **congruence**, not similarity. Only the inertia (signs) is a congruence invariant; eigenvalue sizes are not.'
		),
		open(
			C,
			'15.21',
			'For $A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$, verify that $\\langle\\mathbf x,\\mathbf y\\rangle_A = \\mathbf x^{\\mathsf T}A\\mathbf y$ is an inner product and compute the $A$-norm of $(1,0)$ and the $A$-angle between $(1,0)$ and $(0,1)$. Are they orthogonal in this inner product?',
			[
				'Symmetric because $A = A^{\\mathsf T}$; positive definite because the eigenvalues are $3$ and $1$ (or minors $2$ and $3$).',
				'$\\lVert\\mathbf e_1\\rVert_A^2 = \\mathbf e_1^{\\mathsf T}A\\mathbf e_1 = a_{11}$. $\\langle\\mathbf e_1,\\mathbf e_2\\rangle_A = a_{12}$.',
				'$\\cos\\theta = \\dfrac{\\langle\\mathbf x,\\mathbf y\\rangle_A}{\\lVert\\mathbf x\\rVert_A\\lVert\\mathbf y\\rVert_A}$.'
			],
			'Bilinear (matrix product), symmetric ($A^{\\mathsf T} = A$) and positive definite (minors $2,3>0$), so it is an inner product.\n\n$\\lVert(1,0)\\rVert_A = \\sqrt{2}$, $\\lVert(0,1)\\rVert_A = \\sqrt2$, $\\langle(1,0),(0,1)\\rangle_A = 1$. So $\\cos\\theta = \\dfrac1{\\sqrt2\\sqrt2} = \\tfrac12$ and $\\theta = 60^\\circ$.\n\nThe standard basis vectors are **not** orthogonal in this inner product ($\\langle\\mathbf e_1,\\mathbf e_2\\rangle_A = 1\\ne0$), even though they are orthogonal for the dot product.'
		),
		open(
			C,
			'15.22',
			'Let $A = \\begin{bmatrix}a&\\mathbf z^{\\mathsf T}\\\\\\mathbf z&A_1\\end{bmatrix}$ with $a>0$. Show that $A\\succ0$ if and only if the Schur complement $A_1 - \\mathbf z\\mathbf z^{\\mathsf T}/a$ is positive definite.',
			[
				'Use a congruence: $E = \\begin{bmatrix}1&-\\mathbf z^{\\mathsf T}/a\\\\0&I\\end{bmatrix}$. Compute $E^{\\mathsf T}AE$.',
				'Congruence by an invertible matrix preserves positive definiteness. When is a block diagonal matrix $\\operatorname{diag}(a, S)$ positive definite?'
			],
			'Compute $E^{\\mathsf T}AE$ with $E = \\begin{bmatrix}1&-\\mathbf z^{\\mathsf T}/a\\\\0&I\\end{bmatrix}$:\n$AE = \\begin{bmatrix}a&\\mathbf z^{\\mathsf T} - \\mathbf z^{\\mathsf T}\\\\\\mathbf z&A_1 - \\mathbf z\\mathbf z^{\\mathsf T}/a\\end{bmatrix} = \\begin{bmatrix}a&0\\\\\\mathbf z&S\\end{bmatrix}$ with $S = A_1 - \\mathbf z\\mathbf z^{\\mathsf T}/a$, and $E^{\\mathsf T}AE = \\begin{bmatrix}a&0\\\\0&S\\end{bmatrix}$.\n\nSince $E$ is invertible, $A\\succ0\\iff E^{\\mathsf T}AE\\succ0$. A block diagonal matrix is positive definite iff each block is: $a>0$ (given) and $S\\succ0$. Hence $A\\succ0\\iff S\\succ0$. (This is one step of Gaussian elimination: $S$ is what is left after eliminating the first column.)'
		),
		open(
			C,
			'15.23',
			'Give a symmetric $2\\times2$ matrix whose leading principal minors are both nonnegative but which is not positive semidefinite, and explain why this does not contradict the semidefinite version of Sylvester criterion.',
			[
				'You need $a_{11}\\ge0$ and $\\det\\ge0$, yet some vector with $q(\\mathbf x)<0$. Try $a_{11} = 0$.',
				'The semidefinite criterion must check **all** principal minors, not only the leading ones.'
			],
			'Take $A = \\begin{bmatrix}0&0\\\\0&-1\\end{bmatrix}$. Leading minors: $a_{11} = 0\\ge0$ and $\\det A = 0\\ge0$. But $q(0,1) = -1<0$, so $A$ is not positive semidefinite.\n\nNo contradiction: the criterion for **semidefinite** matrices requires **all** principal minors (any choice of rows and columns, with the same index set) to be $\\ge0$. Here the principal minor $a_{22} = -1<0$ fails. Leading minors alone suffice only for strict positivity (positive definite).'
		)
	]
};

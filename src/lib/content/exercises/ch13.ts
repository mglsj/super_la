import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch13';

export const exercises: QuizBank = {
	'ch13.exercises': [
		open(
			C,
			'14.17',
			'Diagonalise each symmetric matrix orthogonally, that is, find a real orthogonal $Q$ and diagonal $D$ with $A = QDQ^{\\mathsf T}$.\n(a) $\\begin{bmatrix}5&2\\\\2&2\\end{bmatrix}$  (b) $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$  (c) $\\begin{bmatrix}2&1&1\\\\1&2&1\\\\1&1&2\\end{bmatrix}$',
			[
				'Find the eigenvalues, then eigenvectors, then **normalise** them to unit length. For a symmetric matrix, eigenvectors of different eigenvalues are automatically orthogonal.',
				'In (c) write the matrix as $I + J$ with $J$ the all-ones matrix. $J$ has eigenvalue $3$ on $(1,1,1)$ and $0$ on everything orthogonal to it.',
				'For a repeated eigenvalue you must choose an orthonormal basis of the eigenspace yourself (Gram–Schmidt if needed).'
			],
			'(a) $\\lambda^2 - 7\\lambda + 6 = 0$ gives $\\lambda = 6, 1$. Eigenvectors $(2,1)$ and $(1,-2)$ (perpendicular ✓). $Q = \\tfrac1{\\sqrt5}\\begin{bmatrix}2&1\\\\1&-2\\end{bmatrix}$, $D = \\operatorname{diag}(6,1)$.\n\n(b) $\\lambda = 1$ with $\\tfrac1{\\sqrt2}(1,1)$ and $\\lambda = -1$ with $\\tfrac1{\\sqrt2}(1,-1)$. $Q = \\tfrac1{\\sqrt2}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$, $D = \\operatorname{diag}(1,-1)$.\n\n(c) $A = I + J$. Eigenvalue $4$ on $(1,1,1)$; eigenvalue $1$ on the plane $x + y + z = 0$ (twice). An orthonormal basis: $\\tfrac1{\\sqrt3}(1,1,1)$, $\\tfrac1{\\sqrt2}(1,-1,0)$, $\\tfrac1{\\sqrt6}(1,1,-2)$. So $Q$ has these columns and $D = \\operatorname{diag}(4,1,1)$. (Check: trace $6 = 4 + 1 + 1$ ✓.)'
		),
		open(
			C,
			'14.18',
			'Verify $\\langle A\\mathbf x,\\mathbf y\\rangle = \\langle\\mathbf x,A^*\\mathbf y\\rangle$ directly for $A = \\begin{bmatrix}1&a\\\\0&2\\end{bmatrix}$, $\\mathbf x = (1,a)$ and $\\mathbf y = (a,1)$ in $\\mathbb{C}^2$. Is $A$ normal?',
			[
				'Use $\\langle\\mathbf u,\\mathbf v\\rangle = \\sum u_i\\overline{v_i}$. $A^*$ is the conjugate transpose: $A^* = \\begin{bmatrix}1&0\\\\\\bar a&2\\end{bmatrix}$.',
				'Compute $A\\mathbf x = (1 + a^2,\\ 2a)$ and $A^*\\mathbf y = (a,\\ |a|^2 + 2)$.',
				'Normal means $AA^* = A^*A$. Compute both products and compare the (1,2) entries.'
			],
			'$A\\mathbf x = (1 + a^2, 2a)$, so $\\langle A\\mathbf x,\\mathbf y\\rangle = (1 + a^2)\\bar a + 2a = \\bar a + a|a|^2 + 2a$.\n\n$A^*\\mathbf y = (a,\\ \\bar a a + 2) = (a, |a|^2 + 2)$, so $\\langle\\mathbf x,A^*\\mathbf y\\rangle = 1\\cdot\\bar a + a\\,(|a|^2 + 2) = \\bar a + a|a|^2 + 2a$ ✓ equal.\n\n**Normal?** $AA^* = \\begin{bmatrix}1 + |a|^2&2a\\\\2\\bar a&4\\end{bmatrix}$ and $A^*A = \\begin{bmatrix}1&a\\\\\\bar a&|a|^2 + 4\\end{bmatrix}$. These agree only if $|a|^2 = 0$, i.e. $a = 0$. So $A$ is normal **only when $a = 0$** (when it is diagonal).'
		),
		open(
			C,
			'14.19',
			'Classify each form as positive definite, positive semidefinite, negative definite or indefinite, by computing eigenvalues.\n(a) $q(x) = 2x_1^2 + 2x_1x_2 + 2x_2^2$\n(b) $q(x) = x_1^2 + 4x_1x_2 + x_2^2$\n(c) $q(x) = x_1^2 + 2x_1x_2 + x_2^2$',
			[
				'Write $q(x) = \\mathbf x^{\\mathsf T}A\\mathbf x$ with $A$ symmetric: the cross term $2bx_1x_2$ means off-diagonal entries $b$ (so $4x_1x_2$ gives $2$, not $4$).',
				'Eigenvalues all $>0$: positive definite; all $\\ge0$ with a $0$: semidefinite; mixed signs: indefinite.'
			],
			'(a) $A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$, eigenvalues $3, 1$: **positive definite**.\n\n(b) $A = \\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$, eigenvalues $3, -1$: **indefinite** (e.g. $q(1,-1) = 1 - 4 + 1 = -2<0$).\n\n(c) $A = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$, eigenvalues $2, 0$: **positive semidefinite** ($q = (x_1 + x_2)^2$, zero along $(1,-1)$).'
		),
		open(
			C,
			'14.20',
			'Show that $A^{\\mathsf T}A$ is symmetric and positive semidefinite for every real $A$, and that it is positive definite exactly when the columns of $A$ are independent. Compare the earlier lemma on $A^{\\mathsf T}A$ being invertible.',
			[
				'Symmetric: $(A^{\\mathsf T}A)^{\\mathsf T} = A^{\\mathsf T}(A^{\\mathsf T})^{\\mathsf T} = A^{\\mathsf T}A$.',
				'Compute $\\mathbf x^{\\mathsf T}A^{\\mathsf T}A\\mathbf x = (A\\mathbf x)^{\\mathsf T}(A\\mathbf x) = \\lVert A\\mathbf x\\rVert^2$.',
				'When is $\\lVert A\\mathbf x\\rVert^2 = 0$ for a nonzero $\\mathbf x$?'
			],
			'Symmetric: $(A^{\\mathsf T}A)^{\\mathsf T} = A^{\\mathsf T}A$.\n\n$\\mathbf x^{\\mathsf T}A^{\\mathsf T}A\\mathbf x = \\lVert A\\mathbf x\\rVert^2\\ge0$: positive semidefinite.\n\nIt is $>0$ for every $\\mathbf x\\ne\\mathbf 0$ exactly when $A\\mathbf x\\ne\\mathbf 0$ for every $\\mathbf x\\ne\\mathbf 0$, i.e. $\\ker A = \\{\\mathbf 0\\}$, i.e. the columns of $A$ are independent. That is the same condition under which $A^{\\mathsf T}A$ is invertible: positive definite $\\iff$ all eigenvalues $>0$ $\\iff$ invertible (given semidefinite). It is why the normal equations have a unique solution precisely for independent columns.'
		),
		open(
			C,
			'14.21',
			'Let $A$ be symmetric positive semidefinite. Show that there is a symmetric positive semidefinite $B$ with $B^2 = A$, and that it is unique. Hint: use the spectral theorem and take square roots on the diagonal; for uniqueness, note that $B$ must act on each eigenspace of $A$ by a scalar.',
			[
				'$A = QDQ^{\\mathsf T}$ with $D = \\operatorname{diag}(\\lambda_i)$, $\\lambda_i\\ge0$. Define $B = Q\\operatorname{diag}(\\sqrt{\\lambda_i})Q^{\\mathsf T}$.',
				'Uniqueness: if $B^2 = A$ then $BA = B^3 = AB$, so $B$ maps each eigenspace of $A$ to itself. Inside $E_\\lambda$, what can the eigenvalues of $B$ be?'
			],
			'**Existence.** $B = Q\\operatorname{diag}(\\sqrt{\\lambda_i})Q^{\\mathsf T}$ is symmetric, has eigenvalues $\\sqrt{\\lambda_i}\\ge0$ (so positive semidefinite), and $B^2 = Q\\operatorname{diag}(\\lambda_i)Q^{\\mathsf T} = A$.\n\n**Uniqueness.** Suppose $C$ is symmetric positive semidefinite with $C^2 = A$. Then $CA = C^3 = AC$, so $C$ maps each eigenspace $E_\\lambda$ of $A$ into itself, and (being symmetric) it is diagonalisable there. If $C\\mathbf v = \\mu\\mathbf v$ with $\\mathbf v\\in E_\\lambda$ then $\\lambda\\mathbf v = A\\mathbf v = C^2\\mathbf v = \\mu^2\\mathbf v$, so $\\mu^2 = \\lambda$, and $\\mu\\ge0$ forces $\\mu = \\sqrt\\lambda$. So $C = \\sqrt\\lambda$ on all of $E_\\lambda$, for every $\\lambda$; hence $C = B$. (Only positivity of the root rules out the other sign choices.)'
		),
		open(
			C,
			'14.22',
			'Compute a Schur factorisation of $A = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$, and explain why no unitary $U$ can make $U^*AU$ diagonal for this $A$. Which hypothesis of the complex spectral theorem fails?',
			[
				'A Schur factorisation is $A = UTU^*$ with $U$ unitary and $T$ upper triangular. Is $A$ already upper triangular?',
				'If $U^*AU = D$ were diagonal then $A$ would be unitarily diagonalisable; check whether $A$ commutes with $A^*$.'
			],
			'$A$ is already upper triangular, so a Schur factorisation is $A = I\\,A\\,I^*$ with $U = I$ and $T = A$.\n\nIf some unitary $U$ gave $U^*AU = D$ diagonal, then $A$ would be diagonalisable. But $A - I = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ has a 1-dimensional kernel, so the eigenvalue $1$ (algebraic multiplicity $2$) has only one independent eigenvector: $A$ is not diagonalisable at all.\n\nThe failing hypothesis is **normality**: $AA^* = \\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}\\ne\\begin{bmatrix}1&1\\\\1&2\\end{bmatrix} = A^*A$.'
		),
		open(
			C,
			'14.23',
			'For $A = \\begin{bmatrix}5&2\\\\2&2\\end{bmatrix}$ compute the Rayleigh quotient $R(\\mathbf x) = \\dfrac{\\mathbf x^{\\mathsf T}A\\mathbf x}{\\mathbf x^{\\mathsf T}\\mathbf x}$ at $\\mathbf x = (1,0)$, $(0,1)$ and $(1,1)$, and check that all three values lie between the eigenvalues you found in Exercise 14.17(a). Which unit vectors attain the extremes?',
			[
				'$\\mathbf x^{\\mathsf T}A\\mathbf x = 5x_1^2 + 4x_1x_2 + 2x_2^2$. Divide by $x_1^2 + x_2^2$.',
				'The maximum of $R$ is the largest eigenvalue, attained at its eigenvector; the minimum is the smallest eigenvalue.'
			],
			'$R(1,0) = 5$. $R(0,1) = 2$. $R(1,1) = \\dfrac{5 + 4 + 2}{2} = 5.5$. All lie in $[1, 6]$, between the eigenvalues $1$ and $6$ ✓.\n\nThe maximum $6$ is attained at the unit eigenvector $\\pm\\tfrac1{\\sqrt5}(2,1)$ and the minimum $1$ at $\\pm\\tfrac1{\\sqrt5}(1,-2)$. (So the largest eigenvalue is the biggest stretch the form can produce, and the Rayleigh quotient never leaves $[\\lambda_{\\min},\\lambda_{\\max}]$.)'
		),
		open(
			C,
			'14.24',
			'Let $A$ and $B$ be real symmetric with $AB = BA$. Show that they have a common orthonormal eigenbasis. Hint: combine the commuting-diagonalisable exercise with the fact that eigenspaces of a symmetric matrix are orthogonal, applying the spectral theorem to $B$ restricted to each eigenspace of $A$.',
			[
				'$B$ preserves each eigenspace $E_\\lambda$ of $A$ (since they commute).',
				'The restriction of $B$ to $E_\\lambda$ is still symmetric, so by the spectral theorem it has an orthonormal eigenbasis of $E_\\lambda$.',
				'Eigenspaces of $A$ for different eigenvalues are orthogonal, so gluing the bases gives an orthonormal basis of the whole space.'
			],
			'For each eigenvalue $\\lambda$ of $A$, $B(E_\\lambda)\\subseteq E_\\lambda$, and $B|_{E_\\lambda}$ is symmetric with respect to the same inner product. By the spectral theorem, $E_\\lambda$ has an orthonormal basis of eigenvectors of $B$; each of them is also an eigenvector of $A$ (with eigenvalue $\\lambda$).\n\nEigenspaces of a symmetric matrix for distinct eigenvalues are mutually orthogonal, and $\\mathbb{R}^n = \\bigoplus E_\\lambda$. So concatenating the orthonormal bases of the different $E_\\lambda$ gives an orthonormal basis of $\\mathbb{R}^n$ of common eigenvectors. With these as the columns of $Q$, both $Q^{\\mathsf T}AQ$ and $Q^{\\mathsf T}BQ$ are diagonal.'
		),
		open(
			C,
			'14.25',
			'Let $A$ be real with $A^{\\mathsf T} = -A$. Show that $\\langle A\\mathbf x,\\mathbf x\\rangle = 0$ for every $\\mathbf x$, that every eigenvalue of $A$ is purely imaginary, and that $A$ is normal. What does the complex spectral theorem then say, and why does it not contradict the fact that a real skew matrix of odd size is singular?',
			[
				'$\\mathbf x^{\\mathsf T}A\\mathbf x$ is a number, so it equals its own transpose: $\\mathbf x^{\\mathsf T}A^{\\mathsf T}\\mathbf x$.',
				'For $A\\mathbf v = \\lambda\\mathbf v$ over $\\mathbb{C}$: $A^* = -A$ (real), so $\\lambda\\lVert\\mathbf v\\rVert^2 = \\langle A\\mathbf v,\\mathbf v\\rangle = \\langle\\mathbf v,A^*\\mathbf v\\rangle = -\\bar\\lambda\\lVert\\mathbf v\\rVert^2$.',
				'Odd size: $\\det A = \\det A^{\\mathsf T} = \\det(-A) = (-1)^n\\det A$.'
			],
			'$\\mathbf x^{\\mathsf T}A\\mathbf x = (\\mathbf x^{\\mathsf T}A\\mathbf x)^{\\mathsf T} = \\mathbf x^{\\mathsf T}A^{\\mathsf T}\\mathbf x = -\\mathbf x^{\\mathsf T}A\\mathbf x$, so it is $0$.\n\nFor a real skew $A$, $A^* = A^{\\mathsf T} = -A$. If $A\\mathbf v = \\lambda\\mathbf v$ then $\\lambda\\lVert\\mathbf v\\rVert^2 = \\langle A\\mathbf v,\\mathbf v\\rangle = \\langle\\mathbf v,A^*\\mathbf v\\rangle = -\\langle\\mathbf v,A\\mathbf v\\rangle = -\\bar\\lambda\\lVert\\mathbf v\\rVert^2$, so $\\lambda = -\\bar\\lambda$: $\\operatorname{Re}\\lambda = 0$.\n\n$AA^* = -A^2 = A^*A$, so $A$ is normal.\n\n**Spectral theorem.** $A$ is unitarily diagonalisable over $\\mathbb{C}$ with purely imaginary eigenvalues; for a real matrix they come in conjugate pairs $\\pm i\\beta$.\n\n**Odd size.** $\\det A = (-1)^n\\det A = -\\det A$ gives $\\det A = 0$. No contradiction: nonreal eigenvalues pair up as $\\pm i\\beta$, so an odd number of eigenvalues forces at least one real one, and a real purely imaginary number is $0$. So $0$ is an eigenvalue and $A$ is singular.'
		)
	]
};

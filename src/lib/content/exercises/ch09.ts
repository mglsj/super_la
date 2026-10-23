import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch09';

export const exercises: QuizBank = {
	'ch09.exercises': [
		open(
			C,
			'10.14',
			'For each matrix, decide whether it is diagonalisable, and if so exhibit $P$ and $D$ with $A = PDP^{-1}$.\n(a) $\\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$  (b) $\\begin{bmatrix}3&1\\\\0&3\\end{bmatrix}$  (c) $\\begin{bmatrix}2&0&0\\\\0&1&1\\\\0&0&1\\end{bmatrix}$  (d) $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$',
			[
				'Find the eigenvalues, then the dimension of each eigenspace. The matrix is diagonalisable exactly when the eigenspace dimensions add up to $n$.',
				'In (b) and (c) there is a repeated eigenvalue: count how many independent eigenvectors it really has.',
				'When it works, the columns of $P$ are eigenvectors and the diagonal of $D$ lists the matching eigenvalues, in the same order.'
			],
			'(a) $\\lambda = 3$ with $(1,1)$, $\\lambda = -1$ with $(1,-1)$. Diagonalisable: $P = \\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$, $D = \\operatorname{diag}(3,-1)$.\n\n(b) $\\lambda = 3$ twice, but $A - 3I = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ has a 1-dimensional kernel. **Not diagonalisable.**\n\n(c) $\\lambda = 2$ (eigenvector $(1,0,0)$) and $\\lambda = 1$ twice. $A - I = \\begin{bmatrix}1&0&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$ has kernel $\\operatorname{span}\\{(0,1,0)\\}$ only: $1 + 1 = 2 < 3$. **Not diagonalisable.**\n\n(d) $\\lambda = 1$ with $(1,1)$, $\\lambda = -1$ with $(1,-1)$. Diagonalisable: $P = \\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$, $D = \\operatorname{diag}(1,-1)$.'
		),
		open(
			C,
			'10.15',
			'Using your answer to Exercise 10.14(a), compute $A^{10}$ without multiplying ten matrices together. Then find $\\lim_{k\\to\\infty}(A/3)^k$ and identify the limit geometrically.',
			[
				'$A^{10} = PD^{10}P^{-1}$ with $D = \\operatorname{diag}(3,-1)$. Here $P^{-1} = \\tfrac12\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$.',
				'$(A/3)^k = P\\operatorname{diag}(1, (-1/3)^k)P^{-1}$. What happens to $(-1/3)^k$?'
			],
			'$A^{10} = \\tfrac12\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}\\begin{bmatrix}3^{10}&0\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix} = \\tfrac12\\begin{bmatrix}3^{10} + 1&3^{10} - 1\\\\3^{10} - 1&3^{10} + 1\\end{bmatrix} = \\begin{bmatrix}29525&29524\\\\29524&29525\\end{bmatrix}$.\n\n$(A/3)^k = P\\operatorname{diag}(1,(-\\tfrac13)^k)P^{-1}\\to P\\operatorname{diag}(1,0)P^{-1} = \\tfrac12\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$.\n\nThis is the **orthogonal projection onto the line $y = x$**, the eigenspace of the dominant eigenvalue: repeated application of $A$ squashes everything onto that line (and the other eigendirection decays).'
		),
		open(
			C,
			'10.16',
			'Give a $3\\times3$ matrix that is diagonalisable and has only two distinct eigenvalues, and one that has only two distinct eigenvalues and is not diagonalisable. What is the difference between them, in the language of the diagonalisability theorem?',
			[
				'A diagonal matrix such as $\\operatorname{diag}(1,1,2)$ works for the first.',
				'For the second put a $1$ above the diagonal in one of the repeated eigenvalue positions.'
			],
			'Diagonalisable: $\\operatorname{diag}(1,1,2)$. Not diagonalisable: $\\begin{bmatrix}1&1&0\\\\0&1&0\\\\0&0&2\\end{bmatrix}$.\n\nBoth have eigenvalues $1$ (algebraic multiplicity $2$) and $2$ (multiplicity $1$). In the first, $E_1$ has dimension $2$, so the eigenspace dimensions add up to $2 + 1 = 3 = n$ and there is a basis of eigenvectors. In the second, $A - I$ has rank $2$ so $E_1$ is only 1-dimensional and the dimensions sum to $1 + 1 = 2 < 3$: the geometric multiplicity of $1$ is strictly smaller than its algebraic multiplicity.'
		),
		open(
			C,
			'10.17',
			'Let $A$ be diagonalisable with all eigenvalues positive. Show that there is a matrix $B$ with $B^2 = A$, and that if all eigenvalues are distinct there are exactly $2^n$ such $B$ built this way. Hint: what is a square root of a diagonal matrix?',
			[
				'Write $A = PDP^{-1}$. A diagonal matrix $D = \\operatorname{diag}(\\lambda_i)$ has square roots $\\operatorname{diag}(\\pm\\sqrt{\\lambda_i})$.',
				'Set $B = PD^{1/2}P^{-1}$ and compute $B^2$.',
				'Count: each of the $n$ diagonal entries independently has a $+$ or $-$ choice.'
			],
			'With $A = PDP^{-1}$, $D = \\operatorname{diag}(\\lambda_1,\\dots,\\lambda_n)$, $\\lambda_i>0$: define $S = \\operatorname{diag}(\\varepsilon_1\\sqrt{\\lambda_1},\\dots,\\varepsilon_n\\sqrt{\\lambda_n})$ with $\\varepsilon_i = \\pm1$ and $B = PSP^{-1}$. Then $B^2 = PS^2P^{-1} = PDP^{-1} = A$.\n\nThere are $2$ choices of sign for each of the $n$ eigenvalues, so $2^n$ choices. If the eigenvalues are distinct (so $\\sqrt{\\lambda_i}$ are distinct and different signs give different matrices), these $2^n$ matrices $B$ are all different. (Exactly one, the one with all $+$, has positive eigenvalues: the principal square root.)'
		),
		open(
			C,
			'10.18',
			'Suppose $A$ and $B$ are both diagonalisable and $AB = BA$. Show that they can be diagonalised by the same $P$. Hint: by Exercise 9.26, $B$ preserves each eigenspace of $A$; now diagonalise $B$ inside each one.',
			[
				'Fix an eigenvalue $\\lambda$ of $A$. By the earlier exercise, $B$ maps $E_\\lambda(A)$ into itself.',
				'The restriction of $B$ to $E_\\lambda$ is still diagonalisable (a diagonalisable operator restricted to an invariant subspace stays diagonalisable, since its minimal polynomial has distinct roots). Choose a basis of $E_\\lambda$ of eigenvectors of $B$.',
				'Collect these bases over all $\\lambda$. They form a basis of the whole space because $A$ is diagonalisable.'
			],
			'For each eigenvalue $\\lambda$ of $A$, $B$ maps $E_\\lambda$ to itself (if $A\\mathbf w = \\lambda\\mathbf w$ then $A(B\\mathbf w) = BA\\mathbf w = \\lambda B\\mathbf w$). $B$ is diagonalisable, so its minimal polynomial has distinct roots; the restriction $B|_{E_\\lambda}$ has a minimal polynomial dividing that one, so it is diagonalisable too. Pick a basis of $E_\\lambda$ consisting of eigenvectors of $B$; these are also eigenvectors of $A$ (they lie in $E_\\lambda$).\n\nSince $A$ is diagonalisable, $V = \\bigoplus_\\lambda E_\\lambda$, so concatenating these bases gives a basis of $V$ of common eigenvectors. Putting them in the columns of $P$ diagonalises both $A$ and $B$.'
		),
		open(
			C,
			'10.19',
			'Let $L_0 = 2$, $L_1 = 1$ and $L_{n+1} = L_n + L_{n-1}$ (the Lucas numbers). Using the same matrix as the Fibonacci example, show that $L_n = \\varphi^n + \\psi^n$ where $\\varphi,\\psi = \\tfrac{1\\pm\\sqrt5}2$, and verify it for $n = 0,1,2,3$.',
			[
				'$\\begin{bmatrix}L_{n+1}\\\\L_n\\end{bmatrix} = \\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}^n\\begin{bmatrix}L_1\\\\L_0\\end{bmatrix}$. The matrix has eigenvalues $\\varphi,\\psi$ with eigenvectors $(\\varphi,1)$ and $(\\psi,1)$.',
				'Write the start vector $(1,2) = a(\\varphi,1) + b(\\psi,1)$. Solve $a + b = 2$ and $a\\varphi + b\\psi = 1$; use $\\varphi - \\psi = \\sqrt5$.',
				'Verify with $\\varphi + \\psi = 1$ and $\\varphi\\psi = -1$.'
			],
			'Solve $a + b = 2$, $a\\varphi + b\\psi = 1$: substituting $b = 2 - a$ gives $a(\\varphi - \\psi) = 1 - 2\\psi = \\sqrt5$, so $a = 1$ and $b = 1$. Then the second component of $M^n(1,2)^{\\mathsf T}$ is $L_n = \\varphi^n + \\psi^n$.\n\n**Check.** $n = 0$: $1 + 1 = 2$ ✓. $n = 1$: $\\varphi + \\psi = 1$ ✓. $n = 2$: $(\\varphi + \\psi)^2 - 2\\varphi\\psi = 1 + 2 = 3$ ✓ ($L_2 = 1 + 2 = 3$). $n = 3$: $(\\varphi + \\psi)^3 - 3\\varphi\\psi(\\varphi + \\psi) = 1 + 3 = 4$ ✓ ($L_3 = 3 + 1 = 4$).'
		),
		open(
			C,
			'10.20',
			'Solve $\\mathbf y\' = A\\mathbf y$ with $A = \\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$ and $\\mathbf y(0) = (1,0)$, using the diagonalisation example. Describe the behaviour as $t\\to\\infty$, and say which eigenvalue is responsible.',
			[
				'Use eigenpairs $3, (1,1)$ and $-1, (1,-1)$ from Exercise 10.14(a). The solution is a combination of $e^{3t}(1,1)$ and $e^{-t}(1,-1)$.',
				'Choose the coefficients so that $\\mathbf y(0) = (1,0)$.'
			],
			'$(1,0) = \\tfrac12(1,1) + \\tfrac12(1,-1)$, so\n$\\mathbf y(t) = \\tfrac12e^{3t}(1,1) + \\tfrac12e^{-t}(1,-1) = \\tfrac12\\big(e^{3t} + e^{-t},\\ e^{3t} - e^{-t}\\big)$.\n\nAs $t\\to\\infty$ the $e^{-t}$ part decays and the solution blows up along the line $y = x$, growing like $\\tfrac12e^{3t}$. The responsible eigenvalue is the largest, $\\lambda = 3$ (positive, so growth; the eigenvalue $-1$ gives decay).'
		),
		open(
			C,
			'10.21',
			'Let $A$ be diagonalisable with eigenvalues $\\lambda_1,\\dots,\\lambda_n$. Prove that $\\operatorname{tr}(A^k) = \\sum_i\\lambda_i^k$ for every $k\\ge1$. Then explain why this is still true when $A$ is defective. Hint for the second part: use the triangular form from the section on defective matrices.',
			[
				'Write $A = PDP^{-1}$ so $A^k = PD^kP^{-1}$, then use $\\operatorname{tr}(XY) = \\operatorname{tr}(YX)$.',
				'If $A$ is not diagonalisable, over $\\mathbb{C}$ it is still similar to an upper triangular $T$. Powers of triangular matrices are triangular, with the diagonal entries raised to the same power.'
			],
			'**Diagonalisable.** $\\operatorname{tr}(A^k) = \\operatorname{tr}(PD^kP^{-1}) = \\operatorname{tr}(D^kP^{-1}P) = \\operatorname{tr}(D^k) = \\sum\\lambda_i^k$.\n\n**Defective.** Over $\\mathbb{C}$, $A = PTP^{-1}$ with $T$ upper triangular and diagonal entries $\\lambda_1,\\dots,\\lambda_n$ (the eigenvalues, repeated by algebraic multiplicity). $T^k$ is upper triangular with diagonal entries $\\lambda_i^k$ (the diagonal of a product of triangular matrices is the product of the diagonals). So $\\operatorname{tr}(A^k) = \\operatorname{tr}(T^k) = \\sum\\lambda_i^k$ again.'
		),
		open(
			C,
			'10.22',
			'Take $A_\\varepsilon = \\begin{bmatrix}1&1\\\\0&1+\\varepsilon\\end{bmatrix}$ from the caution above. Compute $P$ and $P^{-1}$ explicitly as functions of $\\varepsilon$, and confirm that the entries of $P^{-1}$ blow up like $1/\\varepsilon$. What does that say about computing $A_\\varepsilon^{100}$ through the diagonalisation when $\\varepsilon = 10^{-8}$?',
			[
				'The eigenvalues are $1$ and $1+\\varepsilon$. Find the eigenvectors: for $1$ it is $(1,0)$; for $1 + \\varepsilon$ solve $(A - (1+\\varepsilon)I)\\mathbf x = 0$.',
				'Invert $P = \\begin{bmatrix}1&1\\\\0&\\varepsilon\\end{bmatrix}$ with the $2\\times2$ formula.',
				'Floating-point numbers carry about $16$ digits. How many are lost when you multiply by $10^8$?'
			],
			'Eigenvector for $1+\\varepsilon$: $(A - (1+\\varepsilon)I) = \\begin{bmatrix}-\\varepsilon&1\\\\0&0\\end{bmatrix}$ gives $(1,\\varepsilon)$. So\n$P = \\begin{bmatrix}1&1\\\\0&\\varepsilon\\end{bmatrix}$, $P^{-1} = \\begin{bmatrix}1&-1/\\varepsilon\\\\0&1/\\varepsilon\\end{bmatrix}$.\n\nThe entries of $P^{-1}$ are of size $1/\\varepsilon = 10^8$: the two eigenvectors are almost parallel, so $P$ is nearly singular. Exact answer: $A_\\varepsilon^{100} = P\\operatorname{diag}(1,(1+\\varepsilon)^{100})P^{-1} = \\begin{bmatrix}1&\\tfrac{(1+\\varepsilon)^{100} - 1}{\\varepsilon}\\\\0&(1+\\varepsilon)^{100}\\end{bmatrix}\\approx\\begin{bmatrix}1&100\\\\0&1\\end{bmatrix}$.\n\nBut computing it this way subtracts nearly equal numbers $(1+\\varepsilon)^{100} - 1\\approx10^{-6}$ and then divides by $10^{-8}$: the rounding error of about $10^{-16}$ is amplified by $10^8$, so only about half of the digits are trustworthy. Diagonalisation is ill-conditioned when the eigenvector matrix is nearly singular; it is the wrong tool for nearly defective matrices.'
		)
	]
};

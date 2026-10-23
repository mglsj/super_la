import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch17';

export const exercises: QuizBank = {
	'ch17.exercises': [
		open(
			C,
			'18.12',
			'For $A = \\begin{bmatrix}2&-1\\\\-1&2\\end{bmatrix}$ and $\\mathbf b = (1,1)$, carry out three Jacobi steps and three Gauss–Seidel steps from $\\mathbf x_0 = (0,0)$. Compute the spectral radius $\\rho$ of each iteration matrix and check that the observed decrease matches.',
			[
				'The exact solution is $\\mathbf x = (1,1)$. Jacobi: $x_1\\leftarrow(1 + x_2)/2$, $x_2\\leftarrow(1 + x_1)/2$ using the old values. Gauss–Seidel uses the new $x_1$ immediately when updating $x_2$.',
				'Iteration matrices: Jacobi $B_J = \\begin{bmatrix}0&\\tfrac12\\\\\\tfrac12&0\\end{bmatrix}$ (eigenvalues $\\pm\\tfrac12$); Gauss–Seidel $B_{GS} = \\begin{bmatrix}0&\\tfrac12\\\\0&\\tfrac14\\end{bmatrix}$ (eigenvalues $0,\\tfrac14$).'
			],
			'**Jacobi:** $\\mathbf x_1 = (\\tfrac12,\\tfrac12)$, $\\mathbf x_2 = (\\tfrac34,\\tfrac34)$, $\\mathbf x_3 = (\\tfrac78,\\tfrac78)$. The error $1 - x_k$ is $\\tfrac12,\\tfrac14,\\tfrac18$: it halves each step, matching $\\rho(B_J) = \\tfrac12$.\n\n**Gauss–Seidel:** $\\mathbf x_1 = (\\tfrac12,\\tfrac34)$ (since $x_2 = (1 + \\tfrac12)/2$), $\\mathbf x_2 = (\\tfrac78,\\tfrac{15}{16})$, $\\mathbf x_3 = (\\tfrac{31}{32},\\tfrac{63}{64})$. The error of $x_2$ is $\\tfrac14,\\tfrac1{16},\\tfrac1{64}$: it falls by a factor $4$ per step, matching $\\rho(B_{GS}) = \\tfrac14 = \\rho(B_J)^2$.\n\nSo Gauss–Seidel converges twice as fast (the same accuracy in half as many steps) for this matrix.'
		),
		open(
			C,
			'18.13',
			'Call $A$ strictly diagonally dominant if $|a_{ii}|>\\sum_{j\\ne i}|a_{ij}|$ for every $i$. Show that Jacobi converges for such a matrix. Hint: bound the entries of $B = I - D^{-1}A$ row by row and use the fact that $\\rho(B)\\le\\max_i\\sum_j|b_{ij}|$.',
			[
				'The Jacobi iteration matrix is $B = I - D^{-1}A$: its diagonal is $0$ and $b_{ij} = -a_{ij}/a_{ii}$ for $j\\ne i$.',
				'Sum the absolute values in row $i$ and use the dominance inequality to show the sum is less than $1$.',
				'Any induced norm bounds the spectral radius; the max-row-sum norm is $\\max_i\\sum_j|b_{ij}|$.'
			],
			'$B = I - D^{-1}A$ has $b_{ii} = 0$ and $b_{ij} = -a_{ij}/a_{ii}$. Row $i$ has absolute sum $\\sum_{j\\ne i}\\dfrac{|a_{ij}|}{|a_{ii}|}<1$ by strict dominance. So $\\lVert B\\rVert_\\infty = \\max_i\\sum_j|b_{ij}|<1$.\n\nSince $\\rho(B)\\le\\lVert B\\rVert_\\infty<1$, the error $\\mathbf e_k = B^k\\mathbf e_0\\to0$ for every starting vector: Jacobi converges.'
		),
		open(
			C,
			'18.14',
			'For $A = \\begin{bmatrix}3&1\\\\1&3\\end{bmatrix}$ and $\\mathbf b = (1,0)$, compute $\\mathbf b$, $A\\mathbf b$ and $A^2\\mathbf b$. Why does the sequence of Krylov spaces stop growing, and what does that say about how many conjugate gradient steps are needed?',
			[
				'Compute $A\\mathbf b$ and then $A(A\\mathbf b)$.',
				'The Krylov space $\\mathcal K_k = \\operatorname{span}\\{\\mathbf b,A\\mathbf b,\\dots,A^{k-1}\\mathbf b\\}$ lives inside $\\mathbb{R}^2$. How many independent vectors can it contain?'
			],
			'$\\mathbf b = (1,0)$, $A\\mathbf b = (3,1)$, $A^2\\mathbf b = (10,6)$.\n\n$\\mathcal K_1 = \\operatorname{span}\\{(1,0)\\}$ has dimension $1$; $\\mathcal K_2 = \\operatorname{span}\\{(1,0),(3,1)\\} = \\mathbb{R}^2$. The third vector $(10,6)$ is already in $\\mathbb{R}^2$, so $\\mathcal K_3 = \\mathcal K_2$: the spaces stop growing at the dimension $n = 2$ (more generally at the degree of the minimal polynomial of $A$ relative to $\\mathbf b$).\n\nConjugate gradient finds the best approximation in $\\mathcal K_k$ at step $k$, so once $\\mathcal K_k$ contains the solution, it is found exactly: **at most $n = 2$ steps** in exact arithmetic.'
		),
		open(
			C,
			'18.15',
			'Run two conjugate gradient steps on the matrix of Exercise 18.12 with $\\mathbf b = (1,0)$, from $\\mathbf x_0 = (0,0)$, and verify that $\\mathbf x_2$ is exact. Check also that $\\langle A\\mathbf p_0,\\mathbf p_1\\rangle = 0$, which is the property the method is named for. Then explain why the original right-hand side $\\mathbf b = (1,1)$ finishes in a single step, so that $\\mathbf p_1$ never exists at all.',
			[
				'Start: $\\mathbf r_0 = \\mathbf b$, $\\mathbf p_0 = \\mathbf r_0$. Then $\\alpha_k = \\dfrac{\\mathbf r_k\\cdot\\mathbf r_k}{\\mathbf p_k\\cdot A\\mathbf p_k}$, $\\mathbf x_{k+1} = \\mathbf x_k + \\alpha_k\\mathbf p_k$, $\\mathbf r_{k+1} = \\mathbf r_k - \\alpha_kA\\mathbf p_k$, $\\beta_k = \\dfrac{\\mathbf r_{k+1}\\cdot\\mathbf r_{k+1}}{\\mathbf r_k\\cdot\\mathbf r_k}$, $\\mathbf p_{k+1} = \\mathbf r_{k+1} + \\beta_k\\mathbf p_k$.',
				'For $\\mathbf b = (1,1)$ compute $A\\mathbf b$. Is $\\mathbf b$ an eigenvector?'
			],
			'**Step 1.** $\\mathbf r_0 = \\mathbf p_0 = (1,0)$, $A\\mathbf p_0 = (2,-1)$, $\\alpha_0 = \\tfrac{1}{2}$, so $\\mathbf x_1 = (\\tfrac12,0)$, $\\mathbf r_1 = (1,0) - \\tfrac12(2,-1) = (0,\\tfrac12)$.\n**Step 2.** $\\beta_0 = \\tfrac{1/4}{1} = \\tfrac14$, $\\mathbf p_1 = (0,\\tfrac12) + \\tfrac14(1,0) = (\\tfrac14,\\tfrac12)$. $A\\mathbf p_1 = (0,\\tfrac34)$, $\\alpha_1 = \\dfrac{1/4}{(1/2)(3/4)} = \\tfrac23$, $\\mathbf x_2 = (\\tfrac12,0) + \\tfrac23(\\tfrac14,\\tfrac12) = (\\tfrac23,\\tfrac13)$.\n\n**Exact:** $A\\mathbf x_2 = (\\tfrac43 - \\tfrac13,\\ -\\tfrac23 + \\tfrac23) = (1,0)$ ✓.\n\n**Conjugate directions:** $\\langle A\\mathbf p_0,\\mathbf p_1\\rangle = (2,-1)\\cdot(\\tfrac14,\\tfrac12) = \\tfrac12 - \\tfrac12 = 0$ ✓.\n\n**For $\\mathbf b = (1,1)$:** $A\\mathbf b = (1,1) = \\mathbf b$, so $\\mathbf b$ is an eigenvector (eigenvalue $1$) and $\\mathcal K_1$ is already invariant. Then $\\alpha_0 = \\tfrac{2}{2} = 1$, $\\mathbf x_1 = (1,1)$, which is the exact solution, so $\\mathbf r_1 = \\mathbf 0$ and there is no $\\mathbf p_1$. The number of steps is at most the number of distinct eigenvalues "seen" by $\\mathbf b$.'
		),
		open(
			C,
			'18.16',
			'A system has $\\kappa = 10^4$. Using the convergence theorem for conjugate gradients, roughly how many iterations are needed to reduce the error by $10^{-6}$? How many Jacobi iterations would be needed if $\\rho(B) = 1 - 2/\\kappa$? Compare.',
			[
				'CG: the error shrinks by about $\\dfrac{\\sqrt\\kappa - 1}{\\sqrt\\kappa + 1}\\approx1 - \\dfrac2{\\sqrt\\kappa}$ per iteration.',
				'Jacobi: error shrinks by $\\rho = 1 - 2/\\kappa$ per iteration.',
				'Number of iterations $k\\approx\\ln(10^6)/(\\text{rate per step})$, with $\\ln10^6\\approx13.8$.'
			],
			'**CG:** rate $1 - 2/100 = 0.98$ per step, so $k\\approx13.8/0.02\\approx690$ iterations (about $700$ when the factor $2$ in the bound is included).\n\n**Jacobi:** rate $1 - 2/10^4$, so $k\\approx13.8/(2\\times10^{-4})\\approx69{,}000$ iterations.\n\nCG needs about $100 = \\sqrt\\kappa$ times fewer iterations: its cost scales with $\\sqrt\\kappa$, Jacobi with $\\kappa$. This is why Krylov methods win for ill-conditioned problems.'
		),
		open(
			C,
			'18.17',
			'Let $A$ be $n\\times n$ with nonzeros only on the diagonal, in the first row and in the first column (an "arrowhead" matrix). Count its nonzeros, then count the nonzeros of its $L$ and $U$ factors. Now reverse the ordering of the rows and columns and count again. What does the comparison show about the importance of ordering?',
			[
				'Nonzeros of $A$: the diagonal $n$, the rest of row 1 ($n-1$), the rest of column 1 ($n-1$).',
				'With the dense row/column first, the first elimination step changes every entry of the trailing $(n-1)\\times(n-1)$ block. With the dense row/column last, what does the first elimination step touch?'
			],
			'$A$ has $n + 2(n-1) = 3n - 2$ nonzeros.\n\n**Original order (arrow first).** Eliminating with the dense first row and column adds a multiple of row 1 to every other row, so the whole trailing block fills in. $L$ and $U$ are both essentially full triangles: about $n^2$ nonzeros in total and $O(n^3)$ flops.\n\n**Reversed order (arrow last).** Now the matrix has a diagonal in the leading block plus a dense last row and column. Eliminating the diagonal entries touches only the last row and column, so there is **no fill-in**: $L$ has the diagonal and the last row, $U$ has the diagonal and the last column, about $3n$ nonzeros, and $O(n)$ flops.\n\nThe same matrix, just renumbered, costs $O(n^3)$ or $O(n)$: for sparse matrices the ordering (fill-reducing permutation) is as important as the algorithm.'
		),
		open(
			C,
			'18.18',
			'Suppose an unpreconditioned solve takes $400$ iterations at $1$ unit of work each, and a preconditioner reduces this to $30$ iterations but costs $6$ units per iteration to apply on top of the matrix-vector product. Is it worth it? At what per-iteration cost does it stop being worth it?',
			[
				'Compare total work: $400\\times1$ against $30\\times(1 + 6)$.',
				'Break-even: $30(1 + c) = 400$.'
			],
			'Unpreconditioned: $400\\times1 = 400$ units. Preconditioned: $30\\times(1 + 6) = 210$ units. **Worth it**, about $1.9\\times$ cheaper overall.\n\nBreak-even: $30(1 + c) = 400$ gives $c = \\tfrac{400}{30} - 1\\approx12.3$ units per application. A preconditioner costing more than about $12$ units per iteration (with only $30$ iterations left) would not pay for itself.'
		),
		open(
			C,
			'18.19',
			'Verify directly that the vector with entries $v_j^{(k)} = \\sin\\!\\big(jk\\pi/(n+1)\\big)$ is an eigenvector of the tridiagonal matrix $T$ ($2$ on the diagonal, $-1$ on the off-diagonals) with eigenvalue $2 - 2\\cos\\!\\big(k\\pi/(n+1)\\big)$. Hint: use the identity $\\sin(\\alpha - \\beta) + \\sin(\\alpha + \\beta) = 2\\sin\\alpha\\cos\\beta$.',
			[
				'Let $\\theta = k\\pi/(n+1)$. Row $j$ of $T\\mathbf v$ is $-v_{j-1} + 2v_j - v_{j+1}$.',
				'Use the identity with $\\alpha = j\\theta$ and $\\beta = \\theta$.',
				'Check the boundary rows $j = 1$ and $j = n$: define $v_0 = 0$ and note $v_{n+1} = \\sin(k\\pi) = 0$.'
			],
			'With $\\theta = \\tfrac{k\\pi}{n+1}$ and $v_j = \\sin(j\\theta)$:\n$(T\\mathbf v)_j = 2\\sin(j\\theta) - \\sin((j-1)\\theta) - \\sin((j+1)\\theta) = 2\\sin(j\\theta) - 2\\sin(j\\theta)\\cos\\theta = (2 - 2\\cos\\theta)\\,v_j$.\n\nFor $j = 1$ the missing term would be $v_0 = \\sin0 = 0$, and for $j = n$ the missing term would be $v_{n+1} = \\sin(k\\pi) = 0$, so the same formula holds in the boundary rows. Hence $T\\mathbf v = (2 - 2\\cos\\theta)\\mathbf v$ with $\\lambda_k = 2 - 2\\cos\\frac{k\\pi}{n+1}$, for $k = 1,\\dots,n$. The smallest is about $(\\pi/(n+1))^2$ and the largest is below $4$, so $\\kappa(T)\\sim n^2$.'
		),
		open(
			C,
			'18.20',
			'Let $A$ be the $n^2\\times n^2$ matrix of the five-point Laplacian on an $n\\times n$ grid: each row has a $4$ on the diagonal and $-1$ for each of the up-to-four grid neighbours. How many operations does one product $A\\mathbf x$ cost, and how much storage does $A$ need if the entries are never stored at all? Compare with $\\tfrac23(n^2)^3$ for a dense factorisation at $n = 1000$.',
			[
				'Each of the $n^2$ rows has at most $5$ nonzeros, so a product costs about $5n^2$ multiplications. The entries follow a fixed pattern, so they can be generated on the fly.',
				'Evaluate $\\tfrac23(10^6)^3$ and divide by a speed of $10^{11}$ operations per second.'
			],
			'A product $A\\mathbf x$ costs about $5n^2$ multiplications and $4n^2$ additions (about $10^7$ flops for $n = 1000$, i.e. microseconds to milliseconds). **No storage for $A$** is needed (matrix-free): each output entry is $4x_{i,j} - x_{i\\pm1,j} - x_{i,j\\pm1}$ computed from the vector; you store only the vectors of length $n^2 = 10^6$ (8 MB each).\n\nDense LU would cost $\\tfrac23(10^6)^3\\approx6.7\\times10^{17}$ flops ($\\approx78$ days at $10^{11}$/s) and $8n^4 = 8\\times10^{12}$ bytes (8 TB) of storage. Even exploiting the banded structure is far more expensive than a few hundred matrix-free products. This is why iterative methods are the tool of choice for PDE-sized problems.'
		)
	]
};

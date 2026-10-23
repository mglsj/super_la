import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch19';

export const exercises: QuizBank = {
	'ch19.exercises': [
		open(
			C,
			'20.17',
			'For $A = \\begin{bmatrix}1&2\\\\0&3\\end{bmatrix}$ and $B = \\begin{bmatrix}0&1\\\\1&1\\end{bmatrix}$ write out $A\\otimes B$ and $B\\otimes A$ in full. Verify that they are different, that they have the same trace and determinant, and that both determinants agree with the determinant formula $\\det(A\\otimes B) = (\\det A)^m(\\det B)^n$.',
			[
				'$A\\otimes B$ is the block matrix whose $(i,j)$ block is $a_{ij}B$. $B\\otimes A$ has blocks $b_{ij}A$.',
				'Trace: $\\operatorname{tr}(A\\otimes B) = \\operatorname{tr}A\\cdot\\operatorname{tr}B$. Here $\\det A = 3$ and $\\det B = -1$.'
			],
			'$A\\otimes B = \\begin{bmatrix}0&1&0&2\\\\1&1&2&2\\\\0&0&0&3\\\\0&0&3&3\\end{bmatrix}$ and $B\\otimes A = \\begin{bmatrix}0&0&1&2\\\\0&0&0&3\\\\1&2&1&2\\\\0&3&0&3\\end{bmatrix}$. They differ (e.g. entry $(1,2)$: $1$ versus $0$).\n\nTraces: diagonals $0 + 1 + 0 + 3 = 4$ and $0 + 0 + 1 + 3 = 4$, equal to $\\operatorname{tr}A\\cdot\\operatorname{tr}B = 4\\cdot1$ ✓.\n\nDeterminants: $(\\det A)^2(\\det B)^2 = 3^2\\cdot(-1)^2 = 9$ for both (direct expansion of either $4\\times4$ matrix also gives $9$). So $A\\otimes B$ and $B\\otimes A$ are permutation-similar, not equal.'
		),
		open(
			C,
			'20.18',
			'Use the mixed-product property $(A\\otimes B)(C\\otimes D) = AC\\otimes BD$ to prove that $(A\\otimes B)^k = A^k\\otimes B^k$ for every $k\\ge1$, and that $A\\otimes B$ is symmetric whenever $A$ and $B$ are. Is the converse of the second statement true?',
			[
				'Induct on $k$ using the mixed-product property with $C = A^{k-1}$ and $D = B^{k-1}$.',
				'$(A\\otimes B)^{\\mathsf T} = A^{\\mathsf T}\\otimes B^{\\mathsf T}$.',
				'For the converse try matrices with $A^{\\mathsf T} = -A$ and $B^{\\mathsf T} = -B$.'
			],
			'$(A\\otimes B)^1 = A\\otimes B$. If $(A\\otimes B)^{k-1} = A^{k-1}\\otimes B^{k-1}$ then $(A\\otimes B)^k = (A\\otimes B)(A^{k-1}\\otimes B^{k-1}) = A^k\\otimes B^k$.\n\n$(A\\otimes B)^{\\mathsf T} = A^{\\mathsf T}\\otimes B^{\\mathsf T} = A\\otimes B$ if both are symmetric.\n\n**Converse is false.** Take $A = B = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ (skew, not symmetric). Then $(A\\otimes B)^{\\mathsf T} = (-A)\\otimes(-B) = A\\otimes B$, so $A\\otimes B$ is symmetric although neither factor is.'
		),
		open(
			C,
			'20.19',
			'Let $A$ have eigenvalues $2, -1$ and $B$ have eigenvalues $3, 3, 0$. Write down the six eigenvalues of $A\\otimes B$, the trace and the determinant, and check the last two against the Kronecker identities. Now write down the eigenvalues of $I_3\\otimes A + B^{\\mathsf T}\\otimes I_2$.',
			[
				'Eigenvalues of $A\\otimes B$ are all products $\\lambda_i\\mu_j$.',
				'Eigenvalues of the Kronecker sum $I\\otimes A + B^{\\mathsf T}\\otimes I$ are all sums $\\lambda_i + \\mu_j$.',
				'$\\operatorname{tr}(A\\otimes B) = \\operatorname{tr}A\\operatorname{tr}B$ and $\\det(A\\otimes B) = (\\det A)^3(\\det B)^2$.'
			],
			'Eigenvalues of $A\\otimes B$: $2\\cdot3, 2\\cdot3, 2\\cdot0, (-1)3, (-1)3, (-1)0 = 6, 6, 0, -3, -3, 0$.\n\nTrace: $6 + 6 + 0 - 3 - 3 + 0 = 6 = (2 - 1)(3 + 3 + 0)$ ✓. Determinant: $0$ (because of the zero eigenvalue); the formula gives $(-2)^3\\cdot0^2 = 0$ ✓.\n\nEigenvalues of $I_3\\otimes A + B^{\\mathsf T}\\otimes I_2$: $\\lambda_i + \\mu_j$ gives $2 + 3, 2 + 3, 2 + 0, -1 + 3, -1 + 3, -1 + 0 = 5, 5, 2, 2, 2, -1$.'
		),
		open(
			C,
			'20.20',
			'Prove that $\\operatorname{vec}(\\mathbf a\\mathbf b^{\\mathsf T}) = \\mathbf b\\otimes\\mathbf a$ directly from the definition of vec (stack the columns), and deduce the identity $\\operatorname{vec}(AXB) = (B^{\\mathsf T}\\otimes A)\\operatorname{vec}(X)$ in the special case where $X$ has rank one. Why does the general case follow?',
			[
				'The $j$-th column of $\\mathbf a\\mathbf b^{\\mathsf T}$ is $b_j\\mathbf a$. Stack these columns.',
				'For $X = \\mathbf x\\mathbf y^{\\mathsf T}$ we have $AXB = (A\\mathbf x)(B^{\\mathsf T}\\mathbf y)^{\\mathsf T}$.',
				'Every matrix is a sum of rank-one matrices and both sides are linear in $X$.'
			],
			'Columns of $\\mathbf a\\mathbf b^{\\mathsf T}$ are $b_1\\mathbf a, b_2\\mathbf a,\\dots$; stacking gives $(b_1\\mathbf a; b_2\\mathbf a;\\dots) = \\mathbf b\\otimes\\mathbf a$.\n\nFor $X = \\mathbf x\\mathbf y^{\\mathsf T}$: $AXB = (A\\mathbf x)(B^{\\mathsf T}\\mathbf y)^{\\mathsf T}$, so $\\operatorname{vec}(AXB) = (B^{\\mathsf T}\\mathbf y)\\otimes(A\\mathbf x) = (B^{\\mathsf T}\\otimes A)(\\mathbf y\\otimes\\mathbf x) = (B^{\\mathsf T}\\otimes A)\\operatorname{vec}(X)$ by the mixed-product property.\n\n**General case.** Any $X$ is a sum of rank-one matrices (e.g. $X = \\sum_j\\mathbf x_j\\mathbf e_j^{\\mathsf T}$), and both $X\\mapsto\\operatorname{vec}(AXB)$ and $X\\mapsto(B^{\\mathsf T}\\otimes A)\\operatorname{vec}X$ are linear, so equality on rank-one matrices gives equality everywhere.'
		),
		open(
			C,
			'20.21',
			'Solve $AX + XB = C$ for $A = \\begin{bmatrix}1&0\\\\0&2\\end{bmatrix}$, $B = \\begin{bmatrix}3&1\\\\0&3\\end{bmatrix}$ and $C = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ by vectorising. Then find a $B$ for which the equation is not solvable for every $C$, and say which eigenvalues collide.',
			[
				'Vectorising: $(I\\otimes A + B^{\\mathsf T}\\otimes I)\\operatorname{vec}X = \\operatorname{vec}C$. Equivalently write $X = \\begin{bmatrix}p&q\\\\r&s\\end{bmatrix}$ and compute $AX + XB$ entry by entry.',
				'$AX = \\begin{bmatrix}p&q\\\\2r&2s\\end{bmatrix}$ and $XB = \\begin{bmatrix}3p&p + 3q\\\\3r&r + 3s\\end{bmatrix}$.',
				'The Kronecker sum is singular exactly when some eigenvalue of $A$ plus some eigenvalue of $B$ is $0$.'
			],
			'$AX + XB = \\begin{bmatrix}4p&p + 4q\\\\5r&r + 5s\\end{bmatrix} = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ gives $p = \\tfrac14$, $q = \\tfrac{3}{16}$, $r = \\tfrac15$, $s = \\tfrac4{25}$:\n$X = \\begin{bmatrix}\\tfrac14&\\tfrac3{16}\\\\\\tfrac15&\\tfrac4{25}\\end{bmatrix}$.\n\nThe operator $X\\mapsto AX + XB$ has eigenvalues $\\lambda_i + \\mu_j$ ($\\lambda = 1,2$; $\\mu = 3,3$): $4, 5$, all nonzero, so it is invertible and the equation is always solvable.\n\nIt fails to be solvable for every $C$ exactly when some $\\lambda_i + \\mu_j = 0$. For instance $B = \\operatorname{diag}(-1,3)$: then $\\lambda = 1$ (from $A$) and $\\mu = -1$ (from $B$) collide, $1 + (-1) = 0$, the operator has a kernel and so its range is not everything. (Eigenvalues of $A$ collide with eigenvalues of $-B$.)'
		),
		open(
			C,
			'20.22',
			'Take $A, B, X$ all $n\\times n$ with $n = 512$. Count the multiplications needed to compute $AXB$ by the two routes (multiply $(AX)B$ directly, or form $B^{\\mathsf T}\\otimes A$ and multiply it by $\\operatorname{vec}X$), and compute how many gigabytes $B^{\\mathsf T}\\otimes A$ would occupy in double precision. Repeat for $n = 4096$ and comment.',
			[
				'Direct: two $n\\times n$ matrix products, each $n^3$ multiplications.',
				'Kronecker route: $B^{\\mathsf T}\\otimes A$ is $n^2\\times n^2$, so a matrix-vector product costs $n^4$ multiplications and storage is $n^4$ entries of $8$ bytes.'
			],
			'**$n = 512$:** direct $2n^3 = 2\\cdot512^3\\approx2.7\\times10^8$ multiplications. Kronecker: $n^4 = 512^4\\approx6.9\\times10^{10}$ multiplications and $8n^4\\approx5.5\\times10^{11}$ bytes $\\approx550$ GB.\n\n**$n = 4096$:** direct $2\\cdot4096^3\\approx1.4\\times10^{11}$. Kronecker: $n^4\\approx2.8\\times10^{14}$ multiplications and $8n^4\\approx2.3\\times10^{15}$ bytes $\\approx2.3$ petabytes.\n\nThe Kronecker route costs $n/2$ times more work and is impossible in memory. The Kronecker identity is a tool for **reasoning** (eigenvalues, solvability); in computation you should always use the factored form $(AX)B$ and never assemble $B^{\\mathsf T}\\otimes A$.'
		),
		open(
			C,
			'20.23',
			'Let $A$ and $B$ both be $2\\times2$. Find explicitly a permutation matrix $S$ with $S(A\\otimes B)S^{\\mathsf T} = B\\otimes A$, by writing down what $S$ must do to the index pairs. Explain why such an $S$ exists in general, and why this gives a second proof that the two products have the same eigenvalues.',
			[
				'The basis of $\\mathbb{R}^2\\otimes\\mathbb{R}^2$ is ordered $\\mathbf e_1\\otimes\\mathbf e_1,\\ \\mathbf e_1\\otimes\\mathbf e_2,\\ \\mathbf e_2\\otimes\\mathbf e_1,\\ \\mathbf e_2\\otimes\\mathbf e_2$. $S$ should send $\\mathbf x\\otimes\\mathbf y\\mapsto\\mathbf y\\otimes\\mathbf x$.',
				'Which two basis vectors get swapped?'
			],
			'$S(\\mathbf x\\otimes\\mathbf y) = \\mathbf y\\otimes\\mathbf x$ fixes $\\mathbf e_1\\otimes\\mathbf e_1$ and $\\mathbf e_2\\otimes\\mathbf e_2$ and swaps $\\mathbf e_1\\otimes\\mathbf e_2\\leftrightarrow\\mathbf e_2\\otimes\\mathbf e_1$ (index pair $(i,k)\\mapsto(k,i)$):\n$S = \\begin{bmatrix}1&0&0&0\\\\0&0&1&0\\\\0&1&0&0\\\\0&0&0&1\\end{bmatrix}$.\n\nThen $S(A\\otimes B)S^{\\mathsf T}(\\mathbf x\\otimes\\mathbf y) = S(A\\otimes B)(\\mathbf y\\otimes\\mathbf x) = S(A\\mathbf y\\otimes B\\mathbf x) = B\\mathbf x\\otimes A\\mathbf y = (B\\otimes A)(\\mathbf x\\otimes\\mathbf y)$, and these span, so $S(A\\otimes B)S^{\\mathsf T} = B\\otimes A$.\n\n**In general** the swap $\\mathbf x\\otimes\\mathbf y\\mapsto\\mathbf y\\otimes\\mathbf x$ is a permutation of the $mn$ basis vectors $\\mathbf e_i\\otimes\\mathbf e_k$ (the "perfect shuffle"), hence a permutation matrix, hence orthogonal ($S^{\\mathsf T} = S^{-1}$). So $A\\otimes B$ and $B\\otimes A$ are similar, and similar matrices have the same eigenvalues (and trace and determinant).'
		),
		open(
			C,
			'20.24',
			'Let $T$ be the $2\\times2\\times2$ tensor with $T_{ijk} = i + j + k$ ($i,j,k\\in\\{1,2\\}$). Write down its three unfoldings and check that the multilinear rank is $(2,2,2)$. Then verify that $T = \\mathbf a\\otimes\\mathbf c\\otimes\\mathbf c + \\mathbf c\\otimes\\mathbf a\\otimes\\mathbf c + \\mathbf c\\otimes\\mathbf c\\otimes\\mathbf a$ with $\\mathbf a = (1,2)$, $\\mathbf c = (1,1)$, so the rank is at most $3$. It is in fact exactly $3$, so the rank exceeds every one of the multilinear ranks. Explain why nothing like that can happen for a matrix.',
			[
				'Mode-1 unfolding: rows indexed by $i$, columns by $(j,k)$. Row 1: entries $1 + j + k$ for $(j,k) = (1,1),(1,2),(2,1),(2,2)$.',
				'By symmetry all three unfoldings are the same matrix.',
				'Check the decomposition entry by entry: $(\\mathbf a\\otimes\\mathbf c\\otimes\\mathbf c)_{ijk} = a_ic_jc_k = i$.'
			],
			'Mode-1 unfolding: $\\begin{bmatrix}3&4&4&5\\\\4&5&5&6\\end{bmatrix}$. The rows are not proportional (their difference is $(1,1,1,1)$ and the first row is not constant), so the rank is $2$. The mode-2 and mode-3 unfoldings are identical by the symmetry of $i + j + k$. Multilinear rank $= (2,2,2)$.\n\n**Decomposition.** $a_ic_jc_k = i$, $c_ia_jc_k = j$, $c_ic_ja_k = k$; the sum is $i + j + k$ ✓. So $\\operatorname{rank}T\\le3$ (and a longer argument shows it is exactly $3$).\n\n**Why not for matrices.** For a matrix, the row rank, column rank and rank all coincide: the only unfoldings are the matrix and its transpose, and the rank is the number of nonzero pivots (or singular values). For order $3$, the three unfoldings capture only the "flattened" structure and can all have rank $2$ while the tensor needs $3$ rank-one terms.'
		),
		open(
			C,
			'20.25',
			'Expand $T_\\varepsilon = \\tfrac1\\varepsilon\\big[(\\mathbf a + \\varepsilon\\mathbf a\')\\otimes(\\mathbf b + \\varepsilon\\mathbf b\')\\otimes(\\mathbf c + \\varepsilon\\mathbf c\') - \\mathbf a\\otimes\\mathbf b\\otimes\\mathbf c\\big]$ in powers of $\\varepsilon$ and confirm that the limit as $\\varepsilon\\to0$ is the stated tensor. Explain in one sentence why this makes the phrase "the best rank-two approximation" meaningless for some tensors, and contrast with what the Eckart–Young theorem guarantees for matrices.',
			[
				'Expand the product of three binomials: terms of order $\\varepsilon^0,\\varepsilon^1,\\varepsilon^2,\\varepsilon^3$. The order-$\\varepsilon^0$ term cancels with the subtracted term.',
				'Divide by $\\varepsilon$ and let $\\varepsilon\\to0$.'
			],
			'The expansion is $\\mathbf a\\otimes\\mathbf b\\otimes\\mathbf c + \\varepsilon(\\mathbf a\'\\otimes\\mathbf b\\otimes\\mathbf c + \\mathbf a\\otimes\\mathbf b\'\\otimes\\mathbf c + \\mathbf a\\otimes\\mathbf b\\otimes\\mathbf c\') + \\varepsilon^2(\\cdots) + \\varepsilon^3\\mathbf a\'\\otimes\\mathbf b\'\\otimes\\mathbf c\'$. Subtracting $\\mathbf a\\otimes\\mathbf b\\otimes\\mathbf c$ and dividing by $\\varepsilon$:\n$T_\\varepsilon = \\big(\\mathbf a\'\\otimes\\mathbf b\\otimes\\mathbf c + \\mathbf a\\otimes\\mathbf b\'\\otimes\\mathbf c + \\mathbf a\\otimes\\mathbf b\\otimes\\mathbf c\'\\big) + O(\\varepsilon)\\longrightarrow\\mathbf a\'\\otimes\\mathbf b\\otimes\\mathbf c + \\mathbf a\\otimes\\mathbf b\'\\otimes\\mathbf c + \\mathbf a\\otimes\\mathbf b\\otimes\\mathbf c\'$ (rank $3$).\n\n**One sentence.** Each $T_\\varepsilon$ has rank $\\le2$ yet the limit has rank $3$, so a sequence of rank-two tensors can get arbitrarily close to a tensor that is not rank two, meaning the infimum of the distance over rank-$\\le2$ tensors is not attained and there is no "best" rank-two approximation; whereas for matrices Eckart–Young guarantees that the truncated SVD attains the minimum distance over all matrices of rank at most $k$.'
		)
	]
};

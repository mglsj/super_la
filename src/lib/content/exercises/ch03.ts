import type { QuizBank } from '../types';
import { open, vector } from '../exerciseHelpers';

const C = 'ch03';

export const exercises: QuizBank = {
	'ch03.exercises': [
		open(
			C,
			'4.25',
			'With $A = \\begin{bmatrix}2&-1\\\\0&3\\end{bmatrix}$ and $B = \\begin{bmatrix}1&4\\\\5&-2\\end{bmatrix}$, compute $AB$ and $BA$ and confirm that they differ. Then compute $(AB)^{\\mathsf T}$ and $B^{\\mathsf T}A^{\\mathsf T}$ and confirm that they agree.',
			[
				'Entry $(i,j)$ of a product is (row $i$ of the left matrix) $\\cdot$ (column $j$ of the right matrix). Do $AB$ first, entry by entry.',
				'For $BA$ swap the order: now rows come from $B$ and columns from $A$. You only need one differing entry to confirm $AB\\ne BA$.',
				'For the transposes, swap rows and columns first ($A^{\\mathsf T}$, $B^{\\mathsf T}$), then multiply in the reversed order $B^{\\mathsf T}A^{\\mathsf T}$.'
			],
			'$AB = \\begin{bmatrix}2\\cdot1 + (-1)\\cdot5 & 2\\cdot4 + (-1)(-2)\\\\ 0\\cdot1 + 3\\cdot5 & 0\\cdot4 + 3(-2)\\end{bmatrix} = \\begin{bmatrix}-3&10\\\\15&-6\\end{bmatrix}$.\n$BA = \\begin{bmatrix}1\\cdot2 + 4\\cdot0 & 1(-1) + 4\\cdot3\\\\ 5\\cdot2 + (-2)\\cdot0 & 5(-1) + (-2)\\cdot3\\end{bmatrix} = \\begin{bmatrix}2&11\\\\10&-11\\end{bmatrix}$. Different, so $AB\\ne BA$.\n\n$(AB)^{\\mathsf T} = \\begin{bmatrix}-3&15\\\\10&-6\\end{bmatrix}$. With $B^{\\mathsf T} = \\begin{bmatrix}1&5\\\\4&-2\\end{bmatrix}$ and $A^{\\mathsf T} = \\begin{bmatrix}2&0\\\\-1&3\\end{bmatrix}$:\n$B^{\\mathsf T}A^{\\mathsf T} = \\begin{bmatrix}1\\cdot2 + 5(-1) & 1\\cdot0 + 5\\cdot3\\\\ 4\\cdot2 + (-2)(-1) & 4\\cdot0 + (-2)\\cdot3\\end{bmatrix} = \\begin{bmatrix}-3&15\\\\10&-6\\end{bmatrix}$. They agree: $(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T}$ (the order reverses).'
		),
		open(
			C,
			'4.26',
			'Find a $3\\times3$ matrix $N$ with $N\\neq0$, $N^2\\neq0$ and $N^3 = 0$.',
			[
				'Think of what $N$ does to the standard basis vectors: you want a chain $\\mathbf e_3\\to\\mathbf e_2\\to\\mathbf e_1\\to\\mathbf 0$, each application of $N$ shifting one step down the chain.',
				'The column $j$ of $N$ is $N\\mathbf e_j$. So put a $1$ in column 2, row 1 (so $N\\mathbf e_2 = \\mathbf e_1$) and in column 3, row 2 (so $N\\mathbf e_3 = \\mathbf e_2$), and zeros elsewhere.'
			],
			'Take $N = \\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$, so $N\\mathbf e_1 = \\mathbf 0$, $N\\mathbf e_2 = \\mathbf e_1$, $N\\mathbf e_3 = \\mathbf e_2$.\n$N^2 = \\begin{bmatrix}0&0&1\\\\0&0&0\\\\0&0&0\\end{bmatrix}\\ne0$ (it sends $\\mathbf e_3\\to\\mathbf e_1$), and $N^3 = N\\cdot N^2 = 0$ since $N\\mathbf e_1 = \\mathbf 0$. This is a *nilpotent* matrix, and it is exactly the Jordan block of chapter 10.'
		),
		open(
			C,
			'4.27',
			'Write down the $3\\times3$ elementary matrices for the operations $R_1\\leftrightarrow R_3$, $R_2\\leftarrow 4R_2$ and $R_3\\leftarrow R_3 - 2R_1$, and verify in each case that the inverse is the elementary matrix of the reversed operation.',
			[
				'An elementary matrix is the identity with that one row operation applied to it. Start from $I_3$ and perform each operation.',
				'The reversed operations are: swap again; $R_2\\leftarrow\\tfrac14R_2$; $R_3\\leftarrow R_3 + 2R_1$. Multiply each elementary matrix by its proposed inverse and check that you get $I$.'
			],
			'Apply each operation to $I_3$:\n$E_1 = \\begin{bmatrix}0&0&1\\\\0&1&0\\\\1&0&0\\end{bmatrix}$, $E_2 = \\begin{bmatrix}1&0&0\\\\0&4&0\\\\0&0&1\\end{bmatrix}$, $E_3 = \\begin{bmatrix}1&0&0\\\\0&1&0\\\\-2&0&1\\end{bmatrix}$.\n\nInverses (reversed operations):\n- $E_1^{-1} = E_1$ (swapping twice does nothing): $E_1E_1 = I$ ✓.\n- $E_2^{-1} = \\begin{bmatrix}1&0&0\\\\0&\\tfrac14&0\\\\0&0&1\\end{bmatrix}$ (the operation $R_2\\leftarrow\\tfrac14R_2$): the product is $\\operatorname{diag}(1, 4\\cdot\\tfrac14, 1) = I$ ✓.\n- $E_3^{-1} = \\begin{bmatrix}1&0&0\\\\0&1&0\\\\2&0&1\\end{bmatrix}$ ($R_3\\leftarrow R_3 + 2R_1$): in the product the $(3,1)$ entry is $-2\\cdot1 + 1\\cdot2 = 0$, and the rest is $I$ ✓.'
		),
		vector(
			C,
			'4.28',
			'Use Gauss–Jordan elimination on $[A\\mid I]$ to invert $A = \\begin{bmatrix}1&0&2\\\\2&-1&3\\\\4&1&8\\end{bmatrix}$. Enter the **first row** of $A^{-1}$. (Then check by computing one row of $AA^{-1}$.)',
			[-11, 2, 2],
			[
				'Form $\\left[\\begin{array}{ccc|ccc}1&0&2&1&0&0\\\\2&-1&3&0&1&0\\\\4&1&8&0&0&1\\end{array}\\right]$. Clear column 1 with $R_2 - 2R_1$ and $R_3 - 4R_1$.',
				'After that the rows are $[0\\ -1\\ -1\\mid -2\\ 1\\ 0]$ and $[0\\ 1\\ 0\\mid -4\\ 0\\ 1]$. Use the second to clear column 2, then scale the last pivot to $1$.',
				'Finish by clearing column 3 above its pivot. The right half is $A^{-1}$; its first row is what you want.'
			],
			'$R_2 - 2R_1$: $[0\\ -1\\ -1\\mid -2\\ 1\\ 0]$. $R_3 - 4R_1$: $[0\\ 1\\ 0\\mid -4\\ 0\\ 1]$. Add $R_3$ to $R_2$: $[0\\ 0\\ -1\\mid -6\\ 1\\ 1]$, so scale to $[0\\ 0\\ 1\\mid 6\\ -1\\ -1]$. Clear above the last pivot: $R_1 - 2R_3$ gives $[1\\ 0\\ 0\\mid -11\\ 2\\ 2]$ and the middle row gives $[0\\ 1\\ 0\\mid -4\\ 0\\ 1]$.\n$A^{-1} = \\begin{bmatrix}-11&2&2\\\\-4&0&1\\\\6&-1&-1\\end{bmatrix}$.\nCheck: row 1 of $A$ times $A^{-1}$ is $(-11 + 2\\cdot6,\\ 2 + 2(-1),\\ 2 + 2(-1)) = (1, 0, 0)$ ✓.'
		),
		open(
			C,
			'4.29',
			'Show that $A^{\\mathsf T}A$ is symmetric for every $m\\times n$ matrix $A$, of whatever shape. Then show that $A + A^{\\mathsf T}$ is symmetric and $A - A^{\\mathsf T}$ is antisymmetric for square $A$, and deduce that every square matrix is the sum of a symmetric and an antisymmetric matrix in exactly one way.',
			[
				'A matrix $S$ is symmetric when $S^{\\mathsf T} = S$. Take the transpose of $A^{\\mathsf T}A$ using $(XY)^{\\mathsf T} = Y^{\\mathsf T}X^{\\mathsf T}$ and $(X^{\\mathsf T})^{\\mathsf T} = X$.',
				'For the decomposition, try $S = \\tfrac12(A + A^{\\mathsf T})$ and $K = \\tfrac12(A - A^{\\mathsf T})$ and check that $S + K = A$.',
				'For uniqueness suppose $A = S_1 + K_1 = S_2 + K_2$ with $S_1, S_2$ symmetric and $K_1, K_2$ antisymmetric. Then $S_1 - S_2 = K_2 - K_1$ is both symmetric and antisymmetric. What matrix is that?'
			],
			'**$A^{\\mathsf T}A$ is symmetric.** $(A^{\\mathsf T}A)^{\\mathsf T} = A^{\\mathsf T}(A^{\\mathsf T})^{\\mathsf T} = A^{\\mathsf T}A$. (It is square, $n\\times n$, even if $A$ is not.)\n\n**Sum and difference.** $(A + A^{\\mathsf T})^{\\mathsf T} = A^{\\mathsf T} + A$, the same matrix, so it is symmetric. $(A - A^{\\mathsf T})^{\\mathsf T} = A^{\\mathsf T} - A = -(A - A^{\\mathsf T})$, so it is antisymmetric.\n\n**Existence.** $A = \\underbrace{\\tfrac12(A + A^{\\mathsf T})}_{S} + \\underbrace{\\tfrac12(A - A^{\\mathsf T})}_{K}$ with $S$ symmetric and $K$ antisymmetric.\n\n**Uniqueness.** If also $A = S_2 + K_2$ with $S_2$ symmetric and $K_2$ antisymmetric, then $S - S_2 = K_2 - K =: M$. The left side is symmetric and the right side antisymmetric, so $M^{\\mathsf T} = M$ and $M^{\\mathsf T} = -M$. Hence $M = -M$, so $M = 0$, giving $S_2 = S$ and $K_2 = K$.'
		),
		open(
			C,
			'4.30',
			'Find the LU factorisation of $A = \\begin{bmatrix}1&2&1\\\\2&5&4\\\\3&8&8\\end{bmatrix}$ and use it to solve $A\\mathbf x = (4, 11, 19)$. Then solve $A\\mathbf x = (1,1,1)$ reusing the same factorisation, and count how many arithmetic operations the second solve required compared with the first.',
			[
				'Eliminate column 1: the multipliers are $\\ell_{21} = 2$ and $\\ell_{31} = 3$. Record them, then eliminate column 2 (find $\\ell_{32}$ from the new second and third rows).',
				'Solve in two steps: first $L\\mathbf y = \\mathbf b$ going top to bottom (forward substitution), then $U\\mathbf x = \\mathbf y$ going bottom to top (back substitution).',
				'For the count: each triangular solve of size $n$ costs about $n^2$ multiply–adds, whereas producing $L$ and $U$ costs about $\\tfrac23 n^3$ operations. For $n = 3$ compare these.'
			],
			'Multipliers: $\\ell_{21} = 2$, $\\ell_{31} = 3$. After eliminating column 1 the lower-right block is $\\begin{bmatrix}1&2\\\\2&5\\end{bmatrix}$, so $\\ell_{32} = 2$ and the last pivot is $5 - 2\\cdot2 = 1$.\n$L = \\begin{bmatrix}1&0&0\\\\2&1&0\\\\3&2&1\\end{bmatrix},\\quad U = \\begin{bmatrix}1&2&1\\\\0&1&2\\\\0&0&1\\end{bmatrix}$ (check $LU = A$).\n\n**First system, $\\mathbf b = (4, 11, 19)$.** $L\\mathbf y = \\mathbf b$: $y_1 = 4$, $y_2 = 11 - 8 = 3$, $y_3 = 19 - 12 - 6 = 1$. $U\\mathbf x = \\mathbf y$: $x_3 = 1$, $x_2 = 3 - 2 = 1$, $x_1 = 4 - 2 - 1 = 1$. So $\\mathbf x = (1,1,1)$.\n\n**Second system, $\\mathbf b = (1,1,1)$.** $y_1 = 1$, $y_2 = 1 - 2 = -1$, $y_3 = 1 - 3 + 2 = 0$. Then $x_3 = 0$, $x_2 = -1$, $x_1 = 1 + 2 = 3$. So $\\mathbf x = (3, -1, 0)$. Check: $A\\mathbf x = (3 - 2,\\ 6 - 5,\\ 9 - 8) = (1,1,1)$ ✓.\n\n**Cost.** The first solve includes the factorisation, about $\\tfrac23\\cdot 27 = 18$ operations, plus the two triangular solves at roughly $9$ multiply–adds each (about $2n^2 = 18$ operations), around 36 in all. The second solve needs only the two triangular solves, about $18$ operations: roughly half here, and a factor of about $n$ cheaper for large $n$.'
		),
		open(
			C,
			'4.31',
			'Prove that an upper triangular matrix is invertible if and only if every diagonal entry is nonzero, and that its inverse is then upper triangular as well.',
			[
				'Gauss–Jordan elimination on an upper triangular matrix needs no row swaps if every diagonal entry is nonzero: each diagonal entry is already a pivot. What if one diagonal entry is $0$? Look at the columns.',
				'For the second part, find the inverse by reducing $[U\\mid I]$. Which row operations do you use, and do any of them put nonzero entries below the diagonal of the right-hand block?',
				'Alternatively use rank: $U$ is invertible iff it has $n$ pivots iff $U\\mathbf x = \\mathbf 0$ has only $\\mathbf x = \\mathbf 0$. Try back substitution from the bottom row.'
			],
			'**($\\Leftarrow$)** Suppose all diagonal entries $u_{ii}\\ne0$. Then every column has a pivot (the diagonal entries), so the rank is $n$ and $U$ is invertible. Concretely: $U\\mathbf x = \\mathbf 0$ gives $u_{nn}x_n = 0 \\Rightarrow x_n = 0$, then $u_{n-1,n-1}x_{n-1} + u_{n-1,n}x_n = 0\\Rightarrow x_{n-1} = 0$, and so on: only $\\mathbf x = \\mathbf 0$.\n\n**($\\Rightarrow$)** Suppose some $u_{kk} = 0$ and take the first such $k$. Columns $1,\\dots,k$ of an upper triangular matrix have nonzero entries only in rows $1,\\dots,k$, and column $k$ has $u_{kk} = 0$ in row $k$, so all of them have nonzero entries only in rows $1,\\dots,k-1$. That puts $k$ columns inside a $(k-1)$-dimensional space, so they are dependent: there is a nonzero null vector and $U$ is not invertible.\n\n**Inverse is upper triangular.** Reduce $[U\\mid I]$: scale each row by $1/u_{ii}$ (a diagonal operation) and clear the entries *above* the diagonal by subtracting multiples of lower rows from higher rows. These operations only add multiples of lower rows to higher rows, which preserves upper triangularity of the right-hand block, which starts as $I$. When the left block is $I$ the right block is $U^{-1}$, upper triangular.'
		),
		open(
			C,
			'4.32',
			'Give a $2\\times3$ matrix $A$ and a $3\\times2$ matrix $B$ with $AB = I_2$, and compute $BA$. Explain why no choice of $A$ and $B$ of these shapes can also give $BA = I_3$.',
			[
				'Try to make $AB$ the identity by letting $A$ pick out the first two coordinates of a vector in $\\mathbb{R}^3$ and $B$ embed $\\mathbb{R}^2$ into $\\mathbb{R}^3$.',
				'If $BA = I_3$ then $A\\mathbf x = \\mathbf 0$ would force $\\mathbf x = BA\\mathbf x = \\mathbf 0$. But $A$ is $2\\times3$: how many free variables does $A\\mathbf x = \\mathbf 0$ have?'
			],
			'Take $A = \\begin{bmatrix}1&0&0\\\\0&1&0\\end{bmatrix}$ and $B = \\begin{bmatrix}1&0\\\\0&1\\\\0&0\\end{bmatrix}$. Then $AB = I_2$ and\n$BA = \\begin{bmatrix}1&0&0\\\\0&1&0\\\\0&0&0\\end{bmatrix}\\ne I_3$.\n\n**Why $BA = I_3$ is impossible.** Suppose $BA = I_3$. If $A\\mathbf x = \\mathbf 0$ then $\\mathbf x = I_3\\mathbf x = B(A\\mathbf x) = B\\mathbf 0 = \\mathbf 0$. So $A\\mathbf x = \\mathbf 0$ would have only the zero solution. But $A$ is $2\\times3$ (wide): it has at most $2$ pivots for $3$ unknowns, so there is a free variable and a nonzero solution (Proposition 3.13), a contradiction. (Rank form: $\\operatorname{rank}(BA)\\le\\operatorname{rank}A\\le2<3$.)'
		),
		open(
			C,
			'4.33',
			'Where exactly does the proof in Section 4.7 use the word *reduced*? Exhibit two different row echelon forms, not reduced, of the same matrix, and confirm that they nonetheless have their pivots in the same columns.',
			[
				'Re-read Lemma 4.20. Its proof starts: "In reduced form the pivot column $j_k$ is the standard basis vector $\\mathbf e_k$". Which two requirements of "reduced" make that true?',
				'For the example reuse the matrix from Exercise 3.26: $\\begin{bmatrix}1&2&1\\\\2&4&3\\\\1&2&2\\end{bmatrix}$. Two echelon forms differ in the pivot sizes and in the entries above the pivots.'
			],
			'**Where "reduced" is used.** In Lemma 4.20, which says (i) a free column is a combination of the pivot columns to its left *with coefficients equal to its own entries* and (ii) a pivot column is a standard basis vector $\\mathbf e_k$. Both rely on reduction: the pivot must be $1$ **and** every other entry in its column must be $0$. In an unreduced echelon form a pivot column can contain other nonzero entries above the pivot (or a pivot not equal to $1$), so the entries of a free column are no longer the coefficients, and different echelon forms can disagree entry by entry. Part of the argument, that pivot columns are exactly the columns that are *not* combinations of earlier ones, only needs independence and survives, which is the next part of this exercise.\n\n**Two echelon forms of $A = \\begin{bmatrix}1&2&1\\\\2&4&3\\\\1&2&2\\end{bmatrix}$.**\n$E_1 = \\begin{bmatrix}1&2&1\\\\0&0&1\\\\0&0&0\\end{bmatrix}$ and $E_2 = \\begin{bmatrix}1&2&4\\\\0&0&3\\\\0&0&0\\end{bmatrix}$ (scale row 2 by $3$ and add it to row 1).\nThey are different matrices, but both have pivots in columns $1$ and $3$: column $2$ is twice column $1$ in both, and column $3$ is not a multiple of the columns to its left in either. The pivot *positions* are an invariant of $A$ (they are the independent columns), even though the entries of an echelon form are not.'
		)
	]
};

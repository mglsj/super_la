import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch12';

export const exercises: QuizBank = {
	'ch12.exercises': [
		open(
			C,
			'13.15',
			'In $\\mathbb{R}^4$, let $U = \\operatorname{span}\\{(1,1,0,0),(0,1,1,0)\\}$. Find a basis of $U^\\perp$ and check that the dimensions add to $4$.',
			[
				'$\\mathbf x\\in U^\\perp$ exactly when it is orthogonal to both spanning vectors: two linear equations in $x_1,\\dots,x_4$.',
				'Solve $x_1 + x_2 = 0$ and $x_2 + x_3 = 0$; $x_4$ is free.'
			],
			'The conditions are $x_1 + x_2 = 0$ and $x_2 + x_3 = 0$, so $\\mathbf x = (a,-a,a,b) = a(1,-1,1,0) + b(0,0,0,1)$. A basis of $U^\\perp$ is $\\{(1,-1,1,0),(0,0,0,1)\\}$, dimension $2$. Since $\\dim U = 2$, $\\dim U + \\dim U^\\perp = 4 = \\dim\\mathbb{R}^4$ ✓.'
		),
		open(
			C,
			'13.16',
			'Let $U = \\operatorname{span}\\{(1,1,0),(0,1,1)\\}\\subseteq\\mathbb{R}^3$ and $\\mathbf v = (1,0,0)$. Compute $P_U\\mathbf v$ two ways: by orthonormalising a basis of $U$ and using the definition, and by the formula $A(A^{\\mathsf T}A)^{-1}A^{\\mathsf T}\\mathbf v$. Check that $\\mathbf v - P_U\\mathbf v$ is orthogonal to both spanning vectors.',
			[
				'Method 1: Gram–Schmidt gives $\\mathbf e_1 = (1,1,0)/\\sqrt2$ and $\\mathbf e_2 = (-1,1,2)/\\sqrt6$. Then $P\\mathbf v = \\langle\\mathbf v,\\mathbf e_1\\rangle\\mathbf e_1 + \\langle\\mathbf v,\\mathbf e_2\\rangle\\mathbf e_2$.',
				'Method 2: $A = \\begin{bmatrix}1&0\\\\1&1\\\\0&1\\end{bmatrix}$, $A^{\\mathsf T}A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$, $A^{\\mathsf T}\\mathbf v = (1,0)$. Solve for the coefficient vector $\\hat{\\mathbf x}$, then $P\\mathbf v = A\\hat{\\mathbf x}$.'
			],
			'**Method 1.** $\\langle\\mathbf v,\\mathbf e_1\\rangle\\mathbf e_1 = \\tfrac1{\\sqrt2}\\cdot\\tfrac1{\\sqrt2}(1,1,0) = (\\tfrac12,\\tfrac12,0)$ and $\\langle\\mathbf v,\\mathbf e_2\\rangle\\mathbf e_2 = -\\tfrac1{\\sqrt6}\\cdot\\tfrac1{\\sqrt6}(-1,1,2)\\cdot(-1)$... computing carefully: $\\langle\\mathbf v,\\mathbf e_2\\rangle = -\\tfrac1{\\sqrt6}$, so the term is $-\\tfrac16(-1,1,2) = (\\tfrac16,-\\tfrac16,-\\tfrac13)$. Sum: $P\\mathbf v = (\\tfrac23,\\tfrac13,-\\tfrac13)$.\n\n**Method 2.** Solving $\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}\\hat{\\mathbf x} = (1,0)$ gives $\\hat{\\mathbf x} = (\\tfrac23,-\\tfrac13)$, and $A\\hat{\\mathbf x} = \\tfrac23(1,1,0) - \\tfrac13(0,1,1) = (\\tfrac23,\\tfrac13,-\\tfrac13)$ ✓ same.\n\n**Check.** $\\mathbf v - P\\mathbf v = (\\tfrac13,-\\tfrac13,\\tfrac13)$. Dot with $(1,1,0)$: $\\tfrac13 - \\tfrac13 = 0$ ✓. Dot with $(0,1,1)$: $-\\tfrac13 + \\tfrac13 = 0$ ✓.'
		),
		open(
			C,
			'13.17',
			'Fit a line by least squares to the points $(1,2),(2,2),(3,4),(4,5)$, and compute the residuals. Verify that they sum to zero and that their inner product with $(1,2,3,4)$ is zero.',
			[
				'Solve the normal equations for $y = a + bx$, or use the shortcut: $b = S_{xy}/S_{xx}$ with centred data and $a = \\bar y - b\\bar x$. The means are $\\bar x = 2.5$, $\\bar y = 3.25$.',
				'The residuals are $y_i - (a + bx_i)$. They are orthogonal to both columns of the design matrix: the column of ones and the column $(1,2,3,4)$.'
			],
			'$S_{xy} = (-1.5)(-1.25) + (-0.5)(-1.25) + (0.5)(0.75) + (1.5)(1.75) = 5.5$, $S_{xx} = 5$. So $b = 1.1$ and $a = 3.25 - 1.1\\cdot2.5 = 0.5$: **$y = 0.5 + 1.1x$**.\n\nFitted values: $1.6, 2.7, 3.8, 4.9$. Residuals: $0.4,\\ -0.7,\\ 0.2,\\ 0.1$.\n\nSum: $0.4 - 0.7 + 0.2 + 0.1 = 0$ ✓. Inner product with $(1,2,3,4)$: $0.4 - 1.4 + 0.6 + 0.4 = 0$ ✓. This is exactly the statement that the residual lies in $\\operatorname{col}(A)^\\perp$.'
		),
		open(
			C,
			'13.18',
			'Fit $y = a + bx + cx^2$ to the three points $(-1,1),(0,0),(1,1)$ by least squares. Why is the answer exact here, and what does that say about $\\operatorname{col}(A)$?',
			[
				'Write the three equations $a - b + c = 1$, $a = 0$, $a + b + c = 1$ and solve.',
				'The design matrix is $3\\times3$ with distinct $x$-values (a Vandermonde matrix). Is it invertible?'
			],
			'From $x = 0$: $a = 0$. Then $-b + c = 1$ and $b + c = 1$ give $b = 0$, $c = 1$. The fit is **$y = x^2$**, passing through all three points, so the residual is $\\mathbf 0$.\n\nIt is exact because the $3\\times3$ matrix $A = \\begin{bmatrix}1&-1&1\\\\1&0&0\\\\1&1&1\\end{bmatrix}$ has determinant $(0 - (-1))(1 - (-1))(1 - 0)\\ne0$ (Vandermonde), so it is invertible and $\\operatorname{col}(A) = \\mathbb{R}^3$. Every right-hand side lies in the column space, so the projection of $\\mathbf y$ is $\\mathbf y$ itself.'
		),
		open(
			C,
			'13.19',
			'Show that if $P^{\\mathsf T} = P$ and $P^2 = P$ then $P$ is the orthogonal projection onto $\\operatorname{col}(P)$. Hint: show $\\mathbf v - P\\mathbf v$ is orthogonal to every $P\\mathbf w$. Then give a $2\\times2$ matrix with $P^2 = P$ that is not an orthogonal projection, and describe what it does.',
			[
				'Compute $\\langle\\mathbf v - P\\mathbf v,\\ P\\mathbf w\\rangle$ by moving $P$ across with $P^{\\mathsf T} = P$.',
				'For the counterexample drop symmetry: try an upper triangular matrix with a $1$ in the top row.'
			],
			'$\\langle\\mathbf v - P\\mathbf v,P\\mathbf w\\rangle = \\langle P^{\\mathsf T}(\\mathbf v - P\\mathbf v),\\mathbf w\\rangle = \\langle P\\mathbf v - P^2\\mathbf v,\\mathbf w\\rangle = 0$. So $\\mathbf v = P\\mathbf v + (\\mathbf v - P\\mathbf v)$ with $P\\mathbf v\\in\\operatorname{col}(P)$ and the remainder orthogonal to $\\operatorname{col}(P)$: exactly the definition of the orthogonal projection onto $\\operatorname{col}(P)$.\n\n**Counterexample.** $P = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ has $P^2 = P$ but $P^{\\mathsf T}\\ne P$. It sends $(x,y)\\mapsto(x + y,0)$: it projects onto the $x$-axis **along the direction $(1,-1)$** (its kernel), a slanted projection. Since $(1,-1)$ is not perpendicular to the $x$-axis, it is not orthogonal.'
		),
		open(
			C,
			'13.20',
			'Take $A = \\begin{bmatrix}1&1\\\\1&0\\\\0&1\\end{bmatrix}$ and $\\mathbf b = (1,2,3)$. Solve the least squares problem twice, once through the normal equations and once through $R\\hat{\\mathbf x} = Q^{\\mathsf T}\\mathbf b$ using the factorisation from Exercise 12.21, and confirm the answers agree.',
			[
				'Normal equations: $A^{\\mathsf T}A\\hat{\\mathbf x} = A^{\\mathsf T}\\mathbf b$ with $A^{\\mathsf T}A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ and $A^{\\mathsf T}\\mathbf b = (3,4)$.',
				'QR: $Q^{\\mathsf T}\\mathbf b = (3/\\sqrt2,\\ 5/\\sqrt6)$. Then back-substitute through the triangular $R = \\begin{bmatrix}\\sqrt2&1/\\sqrt2\\\\0&\\sqrt6/2\\end{bmatrix}$.'
			],
			'**Normal equations:** $\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}\\hat{\\mathbf x} = (3,4)$, so $\\hat{\\mathbf x} = \\tfrac13\\begin{bmatrix}2&-1\\\\-1&2\\end{bmatrix}(3,4) = (\\tfrac23,\\tfrac53)$.\n\n**QR:** second row: $\\tfrac{\\sqrt6}2\\hat x_2 = \\tfrac5{\\sqrt6}$ gives $\\hat x_2 = \\tfrac{10}6 = \\tfrac53$. First row: $\\sqrt2\\hat x_1 + \\tfrac1{\\sqrt2}\\cdot\\tfrac53 = \\tfrac3{\\sqrt2}$, so $\\hat x_1 = \\tfrac1{\\sqrt2}\\left(\\tfrac3{\\sqrt2} - \\tfrac5{3\\sqrt2}\\right) = \\tfrac12\\left(3 - \\tfrac53\\right) = \\tfrac23$.\n\nBoth give $\\hat{\\mathbf x} = (\\tfrac23,\\tfrac53)$ ✓. QR avoids forming $A^{\\mathsf T}A$, which squares the condition number, so it is numerically safer.'
		),
		open(
			C,
			'13.21',
			'Find the distance from the point $(1,2,3)$ to the plane $x + y + z = 0$ in $\\mathbb{R}^3$, using the projection theorem rather than a formula from coordinate geometry.',
			[
				'The plane is $U = \\mathbf n^\\perp$ with $\\mathbf n = (1,1,1)$. The closest point of $U$ to $\\mathbf p$ is $\\mathbf p - P_{\\mathbf n}\\mathbf p$.',
				'So the distance is $\\lVert P_{\\mathbf n}\\mathbf p\\rVert$, the length of the projection of $\\mathbf p$ onto the line spanned by $\\mathbf n$.'
			],
			'$P_{\\mathbf n}\\mathbf p = \\dfrac{\\langle\\mathbf p,\\mathbf n\\rangle}{\\langle\\mathbf n,\\mathbf n\\rangle}\\mathbf n = \\dfrac63(1,1,1) = (2,2,2)$. The closest point on the plane is $\\mathbf p - (2,2,2) = (-1,0,1)$ (indeed $-1 + 0 + 1 = 0$ ✓). The distance is $\\lVert(2,2,2)\\rVert = 2\\sqrt3\\approx3.46$.'
		),
		open(
			C,
			'13.22',
			'Let $A = \\begin{bmatrix}1&2\\\\1&2\\\\1&2\\end{bmatrix}$ and $\\mathbf b = (1,2,4)$. Show that the normal equations are consistent but have infinitely many solutions, find them all, and identify which one has the smallest norm. This one is the pseudoinverse solution.',
			[
				'Compute $A^{\\mathsf T}A = \\begin{bmatrix}3&6\\\\6&12\\end{bmatrix}$ and $A^{\\mathsf T}\\mathbf b = (7,14)$. The second equation is twice the first.',
				'The solutions form a line $x + 2y = \\tfrac73$. The shortest vector on it is perpendicular to the line, i.e. a multiple of $(1,2)$.'
			],
			'The normal equations are $3x + 6y = 7$ and $6x + 12y = 14$: the same equation, so consistent with infinitely many solutions $x + 2y = \\tfrac73$, i.e. $(x,y) = (\\tfrac73 - 2s,\\ s)$. (The columns of $A$ are dependent, so the minimiser is not unique; the projection $A\\hat{\\mathbf x} = \\tfrac73(1,1,1)$, the mean of $\\mathbf b$, is.)\n\nThe smallest norm: take $(x,y) = t(1,2)$ (perpendicular to the solution line): $t + 4t = \\tfrac73$, $t = \\tfrac7{15}$. So the pseudoinverse solution is $\\left(\\tfrac7{15},\\ \\tfrac{14}{15}\\right)$, lying in the row space of $A$.'
		),
		open(
			C,
			'13.23',
			'For $A = \\begin{bmatrix}1&2&3\\\\2&4&6\\end{bmatrix}$, find bases for all four fundamental subspaces, verify the two dimension counts of the fundamental theorem, and check that each pair is orthogonal.',
			[
				'The rows are dependent, so $\\operatorname{rank}A = 1$. The column space is spanned by one column; the row space by one row.',
				'$N(A)$: solve $x + 2y + 3z = 0$ (two free variables). $N(A^{\\mathsf T})$: solve $y_1 + 2y_2 = 0$.',
				'Dimension counts: $\\dim\\operatorname{row} + \\dim N(A) = n = 3$ and $\\dim\\operatorname{col} + \\dim N(A^{\\mathsf T}) = m = 2$.'
			],
			'Rank $1$.\n- $\\operatorname{col}(A) = \\operatorname{span}\\{(1,2)\\}\\subseteq\\mathbb{R}^2$.\n- $N(A^{\\mathsf T}) = \\operatorname{span}\\{(-2,1)\\}\\subseteq\\mathbb{R}^2$.\n- $\\operatorname{row}(A) = \\operatorname{span}\\{(1,2,3)\\}\\subseteq\\mathbb{R}^3$.\n- $N(A) = \\operatorname{span}\\{(-2,1,0),(-3,0,1)\\}\\subseteq\\mathbb{R}^3$.\n\n**Counts.** $1 + 2 = 3 = n$ ✓ and $1 + 1 = 2 = m$ ✓.\n\n**Orthogonality.** $(1,2)\\cdot(-2,1) = 0$ ✓. $(1,2,3)\\cdot(-2,1,0) = 0$ ✓ and $(1,2,3)\\cdot(-3,0,1) = 0$ ✓.'
		)
	]
};

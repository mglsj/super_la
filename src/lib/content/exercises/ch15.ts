import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch15';

export const exercises: QuizBank = {
	'ch15.exercises': [
		open(
			C,
			'16.17',
			'Find the singular values and a full SVD of each matrix.\n(a) $\\begin{bmatrix}3&0\\\\0&-2\\end{bmatrix}$  (b) $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$  (c) $\\begin{bmatrix}1&0\\\\1&1\\\\0&1\\end{bmatrix}$',
			[
				'Singular values are the square roots of the eigenvalues of $A^{\\mathsf T}A$. The columns of $V$ are its orthonormal eigenvectors.',
				'Then $\\mathbf u_i = A\\mathbf v_i/\\sigma_i$ for nonzero $\\sigma_i$. If $A$ is not square, complete $U$ to a full orthonormal basis.',
				'(a) is diagonal: absorb the minus sign into $V$.'
			],
			'(a) $\\sigma = 3, 2$. $A = I\\cdot\\operatorname{diag}(3,2)\\cdot\\operatorname{diag}(1,-1)^{\\mathsf T}$: $U = I$, $\\Sigma = \\operatorname{diag}(3,2)$, $V = \\operatorname{diag}(1,-1)$.\n\n(b) $A^{\\mathsf T}A = \\begin{bmatrix}2&2\\\\2&2\\end{bmatrix}$ has eigenvalues $4, 0$, so $\\sigma = 2, 0$. $\\mathbf v_1 = \\mathbf u_1 = \\tfrac1{\\sqrt2}(1,1)$, $\\mathbf v_2 = \\mathbf u_2 = \\tfrac1{\\sqrt2}(1,-1)$, $\\Sigma = \\operatorname{diag}(2,0)$. (Rank $1$: $A = 2\\mathbf u_1\\mathbf v_1^{\\mathsf T}$.)\n\n(c) $A^{\\mathsf T}A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ with eigenvalues $3, 1$: $\\sigma = \\sqrt3, 1$. $\\mathbf v_1 = \\tfrac1{\\sqrt2}(1,1)$, $\\mathbf v_2 = \\tfrac1{\\sqrt2}(1,-1)$. $\\mathbf u_1 = A\\mathbf v_1/\\sqrt3 = \\tfrac1{\\sqrt6}(1,2,1)$, $\\mathbf u_2 = A\\mathbf v_2 = \\tfrac1{\\sqrt2}(1,0,-1)$, and complete with $\\mathbf u_3 = \\tfrac1{\\sqrt3}(1,-1,1)$ (orthogonal to both). $\\Sigma = \\begin{bmatrix}\\sqrt3&0\\\\0&1\\\\0&0\\end{bmatrix}$.'
		),
		open(
			C,
			'16.18',
			'Let $A$ be real symmetric with eigenvalues $\\lambda_i$. Show that the singular values of $A$ are the $|\\lambda_i|$, and that the SVD may be taken with $U = V$ exactly when $A$ is positive semidefinite. What is the SVD of the negative identity $-I_n$?',
			[
				'$A = Q\\Lambda Q^{\\mathsf T}$, so $A^{\\mathsf T}A = A^2 = Q\\Lambda^2Q^{\\mathsf T}$. What are its eigenvalues?',
				'If $A = U\\Sigma U^{\\mathsf T}$ with $\\Sigma\\ge0$, then that is also an eigendecomposition. What does that say about the eigenvalues?'
			],
			'$A^{\\mathsf T}A = A^2 = Q\\Lambda^2Q^{\\mathsf T}$ has eigenvalues $\\lambda_i^2$, so the singular values are $\\sqrt{\\lambda_i^2} = |\\lambda_i|$.\n\nIf $U = V$ then $A = U\\Sigma U^{\\mathsf T}$ is an orthogonal diagonalisation with eigenvalues $\\sigma_i\\ge0$, so $A$ is positive semidefinite. Conversely if $A\\succeq0$ its spectral decomposition $Q\\Lambda Q^{\\mathsf T}$ already has $\\Lambda\\ge0$, so it is an SVD with $U = V = Q$. For a negative eigenvalue $\\lambda<0$ the SVD must put the sign in one factor: $\\mathbf u = -\\mathbf v$ for that column, so $U\\ne V$.\n\n**$-I_n$:** singular values all $1$, e.g. $-I = (-I)\\cdot I\\cdot I^{\\mathsf T}$, with $U = -I$, $\\Sigma = I$, $V = I$.'
		),
		open(
			C,
			'16.19',
			'Prove that for square $A$, $|\\det A| = \\sigma_1\\sigma_2\\cdots\\sigma_n$. Interpret this using the volume theorem and the picture of the unit sphere mapped to an ellipsoid.',
			[
				'Take the determinant of $A = U\\Sigma V^{\\mathsf T}$ and use $|\\det U| = |\\det V| = 1$ for orthogonal matrices.',
				'Think of $V^{\\mathsf T}$ as a rotation/reflection, $\\Sigma$ as stretching along axes, $U$ as another rotation/reflection.'
			],
			'$|\\det A| = |\\det U|\\,|\\det\\Sigma|\\,|\\det V^{\\mathsf T}| = 1\\cdot\\sigma_1\\cdots\\sigma_n\\cdot1$ since orthogonal matrices have determinant $\\pm1$.\n\n**Geometry.** $|\\det A|$ is the factor by which $A$ scales volume. $A$ maps the unit sphere to an ellipsoid with semi-axes $\\sigma_1,\\dots,\\sigma_n$. Rotations preserve volume and the stretch along the $i$-th axis multiplies lengths by $\\sigma_i$, so the unit cube-volume gets multiplied by $\\prod\\sigma_i$. A zero singular value means the ellipsoid is flattened and the volume (determinant) is $0$.'
		),
		open(
			C,
			'16.20',
			'For $A = \\begin{bmatrix}2&2\\\\1&-1\\end{bmatrix}$, compute $\\lVert A\\rVert_2$, $\\lVert A\\rVert_F$ and the condition number $\\kappa(A)$. Then verify by hand that $\\lVert A\\rVert_2\\le\\lVert A\\rVert_F\\le\\sqrt r\\,\\lVert A\\rVert_2$ (with $r = \\operatorname{rank}A$), and say when each inequality is an equality.',
			[
				'$A^{\\mathsf T}A = \\begin{bmatrix}5&3\\\\3&5\\end{bmatrix}$ has eigenvalues $8$ and $2$. The spectral norm is $\\sigma_1$, the Frobenius norm is $\\sqrt{\\sigma_1^2 + \\sigma_2^2}$, and $\\kappa = \\sigma_1/\\sigma_2$.',
				'Check $\\lVert A\\rVert_F$ also equals $\\sqrt{\\sum a_{ij}^2}$.'
			],
			'$\\sigma_1 = \\sqrt8 = 2\\sqrt2\\approx2.83$, $\\sigma_2 = \\sqrt2\\approx1.41$.\n\n$\\lVert A\\rVert_2 = 2\\sqrt2$. $\\lVert A\\rVert_F = \\sqrt{8 + 2} = \\sqrt{10}\\approx3.16$ (check: $\\sqrt{4 + 4 + 1 + 1} = \\sqrt{10}$ ✓). $\\kappa(A) = \\sigma_1/\\sigma_2 = 2$.\n\n**Inequalities.** $2.83\\le3.16\\le\\sqrt2\\cdot2.83 = 4$ ✓.\n- First is an equality iff $\\sigma_2 = \\dots = 0$, i.e. $\\operatorname{rank}A = 1$.\n- Second is an equality iff all nonzero singular values are equal, i.e. $\\sigma_1 = \\dots = \\sigma_r$ (e.g. orthogonal matrices times a constant).'
		),
		open(
			C,
			'16.21',
			'Let $A = \\mathbf u\\mathbf v^{\\mathsf T}$ with $\\mathbf u,\\mathbf v$ nonzero. Show that $\\operatorname{rank}A = 1$, that $\\sigma_1 = \\lVert\\mathbf u\\rVert\\lVert\\mathbf v\\rVert$ and that all other singular values are zero. Write down the SVD explicitly.',
			[
				'Every column of $\\mathbf u\\mathbf v^{\\mathsf T}$ is a multiple of $\\mathbf u$.',
				'$A^{\\mathsf T}A = \\mathbf v\\mathbf u^{\\mathsf T}\\mathbf u\\mathbf v^{\\mathsf T} = \\lVert\\mathbf u\\rVert^2\\mathbf v\\mathbf v^{\\mathsf T}$. Find its eigenvalues.'
			],
			'Column $j$ of $A$ is $v_j\\mathbf u$, so $\\operatorname{col}(A) = \\operatorname{span}\\{\\mathbf u\\}$ and the rank is $1$.\n\n$A^{\\mathsf T}A = \\lVert\\mathbf u\\rVert^2\\mathbf v\\mathbf v^{\\mathsf T}$: it sends $\\mathbf v\\mapsto\\lVert\\mathbf u\\rVert^2\\lVert\\mathbf v\\rVert^2\\cdot\\tfrac{\\mathbf v}{\\lVert\\mathbf v\\rVert}$..., i.e. eigenvalue $\\lVert\\mathbf u\\rVert^2\\lVert\\mathbf v\\rVert^2$ on $\\mathbf v$, and $0$ on $\\mathbf v^\\perp$. So $\\sigma_1 = \\lVert\\mathbf u\\rVert\\lVert\\mathbf v\\rVert$ and the others are $0$.\n\n**SVD.** $A = \\sigma_1\\,\\hat{\\mathbf u}\\,\\hat{\\mathbf v}^{\\mathsf T}$ with $\\hat{\\mathbf u} = \\mathbf u/\\lVert\\mathbf u\\rVert$ and $\\hat{\\mathbf v} = \\mathbf v/\\lVert\\mathbf v\\rVert$; complete $\\hat{\\mathbf u}$ and $\\hat{\\mathbf v}$ to orthonormal bases to get $U$ and $V$, and $\\Sigma = \\operatorname{diag}(\\sigma_1,0,\\dots,0)$ (padded to the right shape).'
		),
		open(
			C,
			'16.22',
			'For $A = \\begin{bmatrix}1&2\\\\1&2\\\\1&2\\end{bmatrix}$ and $\\mathbf b = (1,2,4)$, compute $A^+$ from the SVD and check that $A^+\\mathbf b$ agrees with the minimum-norm solution you found in Exercise 13.22.',
			[
				'$A = (1,1,1)^{\\mathsf T}(1,2)$ is rank one: use the previous exercise. $\\sigma_1 = \\sqrt3\\cdot\\sqrt5 = \\sqrt{15}$, $\\hat{\\mathbf u} = \\tfrac1{\\sqrt3}(1,1,1)$, $\\hat{\\mathbf v} = \\tfrac1{\\sqrt5}(1,2)$.',
				'$A^+ = V\\Sigma^+U^{\\mathsf T}$, which here is $\\dfrac1{\\sigma_1}\\hat{\\mathbf v}\\hat{\\mathbf u}^{\\mathsf T}$.'
			],
			'$A^+ = \\dfrac1{\\sqrt{15}}\\cdot\\dfrac1{\\sqrt5}\\begin{bmatrix}1\\\\2\\end{bmatrix}\\cdot\\dfrac1{\\sqrt3}\\begin{bmatrix}1&1&1\\end{bmatrix} = \\dfrac1{15}\\begin{bmatrix}1&1&1\\\\2&2&2\\end{bmatrix}$.\n\n$A^+\\mathbf b = \\dfrac1{15}(1 + 2 + 4)\\begin{bmatrix}1\\\\2\\end{bmatrix} = \\left(\\tfrac7{15},\\tfrac{14}{15}\\right)$, exactly the minimum-norm least-squares solution of Exercise 13.22 ✓.'
		),
		open(
			C,
			'16.23',
			'Show that $AA^+$ is the orthogonal projection onto $\\operatorname{col}(A)$ and $A^+A$ the orthogonal projection onto $\\operatorname{row}(A)$. Deduce that $A^+AA^+ = A^+$ and $AA^+A = A$.',
			[
				'Use the reduced SVD $A = U_r\\Sigma_rV_r^{\\mathsf T}$, $A^+ = V_r\\Sigma_r^{-1}U_r^{\\mathsf T}$, where $U_r$, $V_r$ have orthonormal columns.',
				'Multiply out $AA^+$ and $A^+A$; the $\\Sigma$ factors cancel.'
			],
			'$AA^+ = U_r\\Sigma_rV_r^{\\mathsf T}V_r\\Sigma_r^{-1}U_r^{\\mathsf T} = U_rU_r^{\\mathsf T}$, which is the orthogonal projection onto the span of the columns of $U_r$, i.e. $\\operatorname{col}(A)$.\n$A^+A = V_r\\Sigma_r^{-1}U_r^{\\mathsf T}U_r\\Sigma_rV_r^{\\mathsf T} = V_rV_r^{\\mathsf T}$: the orthogonal projection onto $\\operatorname{col}(V_r) = \\operatorname{row}(A)$.\n\nThen $AA^+A = (U_rU_r^{\\mathsf T})A = A$ because $A$ already lies in $\\operatorname{col}(A)$, and $A^+AA^+ = (V_rV_r^{\\mathsf T})A^+ = A^+$ since the columns of $A^+$ lie in $\\operatorname{row}(A)$.'
		),
		open(
			C,
			'16.24',
			'Let $A$ have singular values $10, 6, 3, 1, 1, 1, 1$. What is the smallest $k$ for which the rank-$k$ truncation satisfies $\\lVert A - A_k\\rVert_F\\le\\tfrac1{10}\\lVert A\\rVert_F$? Answer the same question for the spectral norm and explain why the two answers differ.',
			[
				'Eckart–Young: $\\lVert A - A_k\\rVert_2 = \\sigma_{k+1}$ and $\\lVert A - A_k\\rVert_F = \\sqrt{\\sigma_{k+1}^2 + \\dots}$.',
				'$\\lVert A\\rVert_F^2 = 100 + 36 + 9 + 4 = 149$. You need the discarded tail to satisfy $\\text{tail}^2\\le1.49$.',
				'For the spectral norm the condition is $\\sigma_{k+1}\\le1$ (that is $\\tfrac1{10}\\cdot10$).'
			],
			'**Frobenius.** $\\lVert A\\rVert_F^2 = 149$, so we need $\\sum_{i>k}\\sigma_i^2\\le1.49$. Tails: $k = 3$: $4$ ✗; $k = 4$: $3$ ✗; $k = 5$: $2$ ✗; $k = 6$: $1$ ✓. So $k = 6$.\n\n**Spectral.** Need $\\sigma_{k+1}\\le\\tfrac1{10}\\sigma_1 = 1$: $k = 2$ gives $\\sigma_3 = 3$ ✗, $k = 3$ gives $\\sigma_4 = 1$ ✓. So $k = 3$.\n\nThey differ because the spectral norm sees only the **largest** discarded singular value, while the Frobenius norm adds up the squares of **all** of them. Four singular values equal to $1$ are individually small but together contribute $\\sqrt4 = 2$ to the Frobenius error.'
		),
		open(
			C,
			'16.25',
			'Give a $2\\times2$ matrix with $\\kappa(A) = 10^6$ whose entries are all of size about $1$. Then compute $\\kappa(A^{\\mathsf T}A)$ and say, in terms of double precision arithmetic, why forming $A^{\\mathsf T}A$ would be a mistake.',
			[
				'Build $A = R\\operatorname{diag}(1,10^{-6})R^{\\mathsf T}$ with $R$ a rotation by $45^\\circ$. This gives entries around $\\tfrac12$.',
				'$\\kappa(A^{\\mathsf T}A) = \\kappa(A)^2$ because the singular values are squared.',
				'Double precision carries about $16$ significant digits.'
			],
			'With $\\varepsilon = 10^{-6}$ take $A = \\tfrac12\\begin{bmatrix}1 + \\varepsilon&1 - \\varepsilon\\\\1 - \\varepsilon&1 + \\varepsilon\\end{bmatrix}$ (all entries $\\approx0.5$). Its eigenvalues are $1$ and $\\varepsilon$, so $\\sigma = 1, 10^{-6}$ and $\\kappa(A) = 10^6$.\n\n$A^{\\mathsf T}A$ has singular values $1$ and $10^{-12}$, so $\\kappa(A^{\\mathsf T}A) = 10^{12} = \\kappa(A)^2$.\n\n**Why it is a mistake.** Double precision has relative accuracy about $10^{-16}$. The small eigenvalue $10^{-12}$ of $A^{\\mathsf T}A$ sits only four orders of magnitude above the rounding noise, so the computed $A^{\\mathsf T}A$ keeps only about $4$ correct digits of it, whereas working with $A$ directly (QR or SVD) would retain about $10$ digits. For a worse $\\kappa$ (say $10^8$) the small eigenvalue would vanish entirely. This is why least squares is solved by QR or the SVD instead of the normal equations.'
		)
	]
};

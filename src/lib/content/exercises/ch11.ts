import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch11';

export const exercises: QuizBank = {
	'ch11.exercises': [
		open(
			C,
			'12.18',
			'Which of these are inner products on the given space? For those that are not, say which axiom fails.\n(a) $\\langle x, y\\rangle = 2x_1y_1 + 3x_2y_2$ on $\\mathbb{R}^2$.\n(b) $\\langle x, y\\rangle = x_1y_1 - x_2y_2$ on $\\mathbb{R}^2$.\n(c) $\\langle x, y\\rangle = x_1y_2 + x_2y_1$ on $\\mathbb{R}^2$.\n(d) $\\langle A, B\\rangle = \\operatorname{tr}(AB)$ on $M_2(\\mathbb{R})$.',
			[
				'The axioms: symmetric, linear in each slot, and positive definite ($\\langle x,x\\rangle>0$ for $x\\ne0$).',
				'Positivity is the usual culprit. Test $\\langle x,x\\rangle$ on simple vectors such as $(0,1)$, $(1,0)$, $(1,-1)$ for (b) and (c).',
				'For (d), find a nonzero matrix with $\\operatorname{tr}(A^2)\\le0$: try a rotation by $90^\\circ$.'
			],
			'(a) **Yes.** Symmetric and bilinear, and $\\langle x,x\\rangle = 2x_1^2 + 3x_2^2>0$ unless $x = 0$.\n\n(b) **No.** Positivity fails: $\\langle(0,1),(0,1)\\rangle = -1<0$.\n\n(c) **No.** Positive definiteness fails: $\\langle(1,0),(1,0)\\rangle = 0$ for a nonzero vector (and $\\langle(1,-1),(1,-1)\\rangle = -2<0$).\n\n(d) **No.** It is symmetric and bilinear, but not positive: for $A = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$, $A^2 = -I$ and $\\operatorname{tr}(A^2) = -2<0$. (Also $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}\\ne0$ has $\\operatorname{tr}(A^2) = 0$.)'
		),
		open(
			C,
			'12.19',
			'Apply Gram–Schmidt to $(1,1,1),\\ (1,1,0),\\ (1,0,0)$ in $\\mathbb{R}^3$, and verify that the result is orthonormal.',
			[
				'$\\mathbf e_1 = \\mathbf v_1/\\lVert\\mathbf v_1\\rVert$. Then $\\mathbf w_2 = \\mathbf v_2 - \\langle\\mathbf v_2,\\mathbf e_1\\rangle\\mathbf e_1$ and normalise.',
				'$\\mathbf w_3 = \\mathbf v_3 - \\langle\\mathbf v_3,\\mathbf e_1\\rangle\\mathbf e_1 - \\langle\\mathbf v_3,\\mathbf e_2\\rangle\\mathbf e_2$.',
				'Expect $\\mathbf w_2\\propto(1,1,-2)$ and $\\mathbf w_3\\propto(1,-1,0)$.'
			],
			'$\\mathbf e_1 = \\tfrac1{\\sqrt3}(1,1,1)$.\n\n$\\langle\\mathbf v_2,\\mathbf e_1\\rangle = \\tfrac2{\\sqrt3}$, so $\\mathbf w_2 = (1,1,0) - \\tfrac23(1,1,1) = (\\tfrac13,\\tfrac13,-\\tfrac23)$, $\\lVert\\mathbf w_2\\rVert = \\tfrac{\\sqrt6}3$, and $\\mathbf e_2 = \\tfrac1{\\sqrt6}(1,1,-2)$.\n\n$\\langle\\mathbf v_3,\\mathbf e_1\\rangle = \\tfrac1{\\sqrt3}$, $\\langle\\mathbf v_3,\\mathbf e_2\\rangle = \\tfrac1{\\sqrt6}$: $\\mathbf w_3 = (1,0,0) - \\tfrac13(1,1,1) - \\tfrac16(1,1,-2) = (\\tfrac12,-\\tfrac12,0)$, so $\\mathbf e_3 = \\tfrac1{\\sqrt2}(1,-1,0)$.\n\n**Check:** $\\mathbf e_1\\cdot\\mathbf e_2\\propto1 + 1 - 2 = 0$; $\\mathbf e_1\\cdot\\mathbf e_3\\propto1 - 1 = 0$; $\\mathbf e_2\\cdot\\mathbf e_3\\propto1 - 1 + 0 = 0$; and each has length $1$ ✓.'
		),
		open(
			C,
			'12.20',
			'In $C[-1,1]$ with $\\langle f,g\\rangle = \\int_{-1}^1fg\\,dx$, apply Gram–Schmidt to $1, x, x^2$. The answers, up to scaling, are the first three Legendre polynomials.',
			[
				'$\\langle1,1\\rangle = 2$. Is $x$ already orthogonal to $1$? (odd times even integrates to $0$ over a symmetric interval.)',
				'For $x^2$ subtract its projections onto $1$ and $x$. $\\langle x^2,x\\rangle = 0$ by symmetry, so only $\\langle x^2,1\\rangle = \\tfrac23$ matters.'
			],
			'$\\mathbf e_1 = 1/\\sqrt2$. $\\langle x,1\\rangle = \\int_{-1}^1x\\,dx = 0$, so the second vector is just $x$, with $\\lVert x\\rVert^2 = \\tfrac23$, giving $\\mathbf e_2 = \\sqrt{\\tfrac32}\\,x$.\n\nFor $x^2$: $\\langle x^2,1\\rangle = \\tfrac23$, so the component along $1$ is $\\tfrac{2/3}{2}\\cdot1 = \\tfrac13$; $\\langle x^2,x\\rangle = 0$. Hence $w_3 = x^2 - \\tfrac13$, i.e. proportional to $\\tfrac12(3x^2 - 1)$. Its norm squared is $\\int_{-1}^1(x^2 - \\tfrac13)^2dx = \\tfrac25 - \\tfrac49 + \\tfrac29 = \\tfrac8{45}$.\n\nUp to scaling: $1,\\ x,\\ \\tfrac12(3x^2 - 1)$ = $P_0, P_1, P_2$, the Legendre polynomials.'
		),
		open(
			C,
			'12.21',
			'Find the QR factorisation of $A = \\begin{bmatrix}1&1\\\\1&0\\\\0&1\\end{bmatrix}$, and check that $Q^{\\mathsf T}Q = I_2$ and $QR = A$.',
			[
				'The columns of $Q$ come from Gram–Schmidt on the columns $\\mathbf a_1 = (1,1,0)$ and $\\mathbf a_2 = (1,0,1)$.',
				'The entries of $R$ are $r_{11} = \\lVert\\mathbf a_1\\rVert$, $r_{12} = \\langle\\mathbf a_2,\\mathbf q_1\\rangle$, $r_{22} = \\lVert\\mathbf a_2 - r_{12}\\mathbf q_1\\rVert$.'
			],
			'$\\mathbf q_1 = \\tfrac1{\\sqrt2}(1,1,0)$, $r_{11} = \\sqrt2$. $r_{12} = \\langle\\mathbf a_2,\\mathbf q_1\\rangle = \\tfrac1{\\sqrt2}$. $\\mathbf a_2 - \\tfrac1{\\sqrt2}\\mathbf q_1 = (1,0,1) - (\\tfrac12,\\tfrac12,0) = (\\tfrac12,-\\tfrac12,1)$, of length $\\sqrt{\\tfrac32} = \\tfrac{\\sqrt6}2$, so $r_{22} = \\tfrac{\\sqrt6}2$ and $\\mathbf q_2 = \\tfrac1{\\sqrt6}(1,-1,2)$.\n\n$Q = \\begin{bmatrix}\\tfrac1{\\sqrt2}&\\tfrac1{\\sqrt6}\\\\\\tfrac1{\\sqrt2}&-\\tfrac1{\\sqrt6}\\\\0&\\tfrac2{\\sqrt6}\\end{bmatrix}$, $R = \\begin{bmatrix}\\sqrt2&\\tfrac1{\\sqrt2}\\\\0&\\tfrac{\\sqrt6}2\\end{bmatrix}$.\n\n**Check:** $\\mathbf q_1\\cdot\\mathbf q_2 = \\tfrac1{\\sqrt{12}}(1 - 1) = 0$, both are unit, so $Q^{\\mathsf T}Q = I_2$. First column of $QR$: $\\sqrt2\\,\\mathbf q_1 = (1,1,0)$ ✓. Second: $\\tfrac1{\\sqrt2}\\mathbf q_1 + \\tfrac{\\sqrt6}2\\mathbf q_2 = (\\tfrac12,\\tfrac12,0) + (\\tfrac12,-\\tfrac12,1) = (1,0,1)$ ✓.'
		),
		open(
			C,
			'12.22',
			'Let $(\\mathbf e_1,\\mathbf e_2,\\mathbf e_3)$ be an orthonormal basis of $\\mathbb{R}^3$ and suppose $\\langle\\mathbf v,\\mathbf e_1\\rangle = 2$, $\\langle\\mathbf v,\\mathbf e_2\\rangle = -1$ and $\\lVert\\mathbf v\\rVert = 3$. Find $|\\langle\\mathbf v,\\mathbf e_3\\rangle|$, and explain why its sign is not determined.',
			[
				'Parseval: in an orthonormal basis $\\lVert\\mathbf v\\rVert^2$ is the sum of the squared coordinates.',
				'What happens to the basis if you replace $\\mathbf e_3$ by $-\\mathbf e_3$?'
			],
			'$9 = \\lVert\\mathbf v\\rVert^2 = 2^2 + (-1)^2 + \\langle\\mathbf v,\\mathbf e_3\\rangle^2 = 5 + \\langle\\mathbf v,\\mathbf e_3\\rangle^2$, so $|\\langle\\mathbf v,\\mathbf e_3\\rangle| = 2$.\n\nThe sign is not determined because $(\\mathbf e_1,\\mathbf e_2,-\\mathbf e_3)$ is also an orthonormal basis with the same $\\mathbf e_1,\\mathbf e_2$ coordinates, but flips the third coordinate. The given data cannot tell the two bases apart.'
		),
		open(
			C,
			'12.23',
			'For a subset $S$ of an inner product space, define $S^\\perp = \\{\\mathbf x:\\langle\\mathbf x,\\mathbf s\\rangle = 0\\text{ for all }\\mathbf s\\in S\\}$. Show that $S^\\perp$ is a subspace even when $S$ is not, that $S^\\perp = (\\operatorname{span}S)^\\perp$, and that $S\\cap S^\\perp\\subseteq\\{\\mathbf 0\\}$.',
			[
				'Check closure under sums and scalars using linearity of $\\langle\\cdot,\\mathbf s\\rangle$.',
				'For the second: a vector orthogonal to each $\\mathbf s_i$ is orthogonal to every linear combination of them.',
				'For the third: if $\\mathbf x\\in S\\cap S^\\perp$ then $\\mathbf x$ is orthogonal to itself.'
			],
			'**Subspace.** $\\mathbf 0\\in S^\\perp$. If $\\mathbf x,\\mathbf y\\in S^\\perp$ and $c$ is a scalar then $\\langle\\mathbf x + c\\mathbf y,\\mathbf s\\rangle = \\langle\\mathbf x,\\mathbf s\\rangle + c\\langle\\mathbf y,\\mathbf s\\rangle = 0$ for every $\\mathbf s\\in S$. No assumption on $S$ was used.\n\n**$S^\\perp = (\\operatorname{span}S)^\\perp$.** ($\\supseteq$) $S\\subseteq\\operatorname{span}S$. ($\\subseteq$) If $\\mathbf x\\perp S$ and $\\mathbf w = \\sum c_i\\mathbf s_i$ then $\\langle\\mathbf x,\\mathbf w\\rangle = \\sum \\bar c_i\\langle\\mathbf x,\\mathbf s_i\\rangle = 0$.\n\n**$S\\cap S^\\perp$.** If $\\mathbf x\\in S$ and $\\mathbf x\\in S^\\perp$ then $\\langle\\mathbf x,\\mathbf x\\rangle = 0$, so $\\mathbf x = \\mathbf 0$ by positive definiteness. (So the intersection is $\\{\\mathbf 0\\}$ if $\\mathbf 0\\in S$ and empty otherwise.)'
		),
		open(
			C,
			'12.24',
			'Show that the product of two orthogonal matrices is orthogonal and that the inverse of an orthogonal matrix is orthogonal. Then show that every $2\\times2$ orthogonal matrix is either a rotation or a reflection, according to the sign of its determinant.',
			[
				'$Q$ is orthogonal when $Q^{\\mathsf T}Q = I$. Compute $(PQ)^{\\mathsf T}(PQ)$ and note $Q^{-1} = Q^{\\mathsf T}$.',
				'A $2\\times2$ orthogonal matrix has orthonormal columns. The first is $(\\cos\\theta,\\sin\\theta)$; the second is a unit vector perpendicular to it: $\\pm(-\\sin\\theta,\\cos\\theta)$.'
			],
			'**Product.** $(PQ)^{\\mathsf T}(PQ) = Q^{\\mathsf T}P^{\\mathsf T}PQ = Q^{\\mathsf T}Q = I$.\n\n**Inverse.** $Q^{-1} = Q^{\\mathsf T}$, and $(Q^{\\mathsf T})^{\\mathsf T}Q^{\\mathsf T} = QQ^{\\mathsf T} = I$ (since $Q^{\\mathsf T}Q = I$ for square $Q$ implies $QQ^{\\mathsf T} = I$).\n\n**$2\\times2$.** The first column is a unit vector $(\\cos\\theta,\\sin\\theta)$; the second must be a unit vector orthogonal to it, i.e. $\\pm(-\\sin\\theta,\\cos\\theta)$. With $+$: $Q = \\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$, $\\det = 1$, a rotation by $\\theta$. With $-$: $Q = \\begin{bmatrix}\\cos\\theta&\\sin\\theta\\\\\\sin\\theta&-\\cos\\theta\\end{bmatrix}$, $\\det = -1$, a reflection across the line at angle $\\theta/2$.'
		),
		open(
			C,
			'12.25',
			'Use the Cauchy–Schwarz inequality in $\\mathbb{R}^n$ with the vector $(1,1,\\dots,1)$ to prove that $\\left(\\sum_{i=1}^nx_i\\right)^2\\le n\\sum_{i=1}^nx_i^2$ for all real $x_i$, and say when equality holds.',
			[
				'Apply $|\\langle\\mathbf x,\\mathbf 1\\rangle|\\le\\lVert\\mathbf x\\rVert\\lVert\\mathbf 1\\rVert$.',
				'Equality in Cauchy–Schwarz happens exactly when the two vectors are parallel.'
			],
			'$\\langle\\mathbf x,\\mathbf 1\\rangle = \\sum x_i$, $\\lVert\\mathbf 1\\rVert = \\sqrt n$, $\\lVert\\mathbf x\\rVert = \\sqrt{\\sum x_i^2}$. Cauchy–Schwarz gives $|\\sum x_i|\\le\\sqrt n\\sqrt{\\sum x_i^2}$; squaring: $(\\sum x_i)^2\\le n\\sum x_i^2$.\n\nEquality holds exactly when $\\mathbf x$ is a multiple of $\\mathbf 1$, i.e. $x_1 = x_2 = \\dots = x_n$. (This says the mean squared is at most the mean of squares.)'
		),
		open(
			C,
			'12.26',
			'Verify that $\\langle A, B\\rangle = \\operatorname{tr}(A^{\\mathsf T}B)$ satisfies all three axioms on $M_{m\\times n}(\\mathbb{R})$. What is $\\lVert A\\rVert$ in this inner product, written in terms of the entries, and why is $\\operatorname{tr}(AB)$ from Exercise 12.18(d) not a substitute?',
			[
				'Write $\\operatorname{tr}(A^{\\mathsf T}B) = \\sum_{i,j}a_{ij}b_{ij}$: it is the ordinary dot product of the matrices flattened into vectors.',
				'Compare with $\\operatorname{tr}(A^2)$ for $A = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$.'
			],
			'$\\operatorname{tr}(A^{\\mathsf T}B) = \\sum_{i,j}a_{ij}b_{ij}$.\n- **Symmetric:** $\\sum a_{ij}b_{ij} = \\sum b_{ij}a_{ij}$.\n- **Bilinear:** clear from the sum.\n- **Positive definite:** $\\langle A,A\\rangle = \\sum a_{ij}^2\\ge0$, and $=0$ only if every entry is $0$.\n\nSo $\\lVert A\\rVert = \\sqrt{\\sum_{i,j}a_{ij}^2}$ (the Frobenius norm).\n\n$\\operatorname{tr}(AB)$ is not a substitute because it is not positive: for $A = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$, $\\operatorname{tr}(A\\cdot A) = -2<0$. The transpose is what turns each diagonal entry into a sum of squares.'
		)
	]
};

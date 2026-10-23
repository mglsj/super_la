import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch22';

export const exercises: QuizBank = {
	'ch22.exercises': [
		open(
			C,
			'23.15',
			'Verify from the definition of a group that $GL_n(\\mathbb{R})$ and the invertible upper triangular matrices are groups, and that the symmetric invertible matrices are not. Which axiom fails in the last case, and give a $2\\times2$ counterexample.',
			[
				'The four group axioms: closure, associativity, identity, inverses. Matrix multiplication is already associative.',
				'For upper triangular: multiply two and look at the entries below the diagonal. What does the inverse look like?',
				'For symmetric matrices, use $(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T}$. Try two symmetric matrices that do not commute.'
			],
			'**$GL_n(\\mathbb{R})$:** product of invertibles is invertible ($(AB)^{-1} = B^{-1}A^{-1}$), $I$ is the identity, $A^{-1}$ is the inverse, associativity is inherited. ✓\n\n**Invertible upper triangular:** the product of two upper triangular matrices is upper triangular (entry $(i,j)$ with $i>j$ is $\\sum_kA_{ik}B_{kj}$ and every term has $k\\ge i>j\\ge k$, impossible, so it is $0$); the diagonal of the product is the product of diagonals, nonzero, so it is invertible. $I$ is upper triangular. The inverse of an upper triangular invertible matrix is upper triangular (back substitution, or via the adjugate). ✓\n\n**Symmetric invertible:** the identity and inverses exist ($(A^{-1})^{\\mathsf T} = (A^{\\mathsf T})^{-1} = A^{-1}$), but **closure fails**. $A = \\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}$ and $B = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ are symmetric and invertible, yet $AB = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ is not symmetric. ($AB$ is symmetric only when $AB = BA$.)'
		),
		open(
			C,
			'23.16',
			'Let $S = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ and $G = \\{A\\in GL_2(\\mathbb{R}): A^{\\mathsf T}SA = S\\}$. Show that the connected piece containing $I$ consists of the matrices $\\begin{bmatrix}\\cosh t&\\sinh t\\\\\\sinh t&\\cosh t\\end{bmatrix}$, and say which quantity these preserve in place of length.',
			[
				'Write $A = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ and expand $A^{\\mathsf T}SA = S$: three equations $a^2 - c^2 = 1$, $b^2 - d^2 = -1$, $ab - cd = 0$.',
				'$a^2 - c^2 = 1$ suggests $a = \\pm\\cosh t$, $c = \\sinh t$. Use $\\cosh^2 - \\sinh^2 = 1$.',
				'The piece containing $I$ has $a>0$ and $\\det A = +1$.'
			],
			'$A^{\\mathsf T}SA = \\begin{bmatrix}a^2 - c^2&ab - cd\\\\ab - cd&b^2 - d^2\\end{bmatrix} = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$.\n\nSo $a^2 - c^2 = 1$, $d^2 - b^2 = 1$, $ab = cd$. Taking $a = \\cosh t>0$, $c = \\sinh t$ (the branch containing $I$ at $t = 0$) and similarly $d = \\cosh s$, $b = \\sinh s$; the condition $ab = cd$ gives $\\cosh t\\sinh s = \\sinh t\\cosh s$, i.e. $\\sinh(s - t) = 0$, so $s = t$. Hence\n$A = \\begin{bmatrix}\\cosh t&\\sinh t\\\\\\sinh t&\\cosh t\\end{bmatrix}$ (these have $\\det = \\cosh^2 - \\sinh^2 = 1$ and form a one-parameter group, $t\\mapsto t + s$).\n\nThey preserve not $x^2 + y^2$ but the **indefinite quadratic form $x^2 - y^2$** (the Lorentz/Minkowski "length"): $\\mathbf x^{\\mathsf T}S\\mathbf x$. They are the hyperbolic rotations (Lorentz boosts) of special relativity.'
		),
		open(
			C,
			'23.17',
			'Write down the reflection in the line at angle $\\phi$ to the $x$-axis as a $2\\times2$ matrix, check that it is orthogonal with determinant $-1$, and verify by direct multiplication that the composition of the reflections in the lines at angles $\\phi$ and $\\psi$ is the rotation through $2(\\phi - \\psi)$.',
			[
				'Reflecting the vector $(1,0)$ across the line at angle $\\phi$ gives the unit vector at angle $2\\phi$; $(0,1)$ goes to the unit vector at angle $2\\phi - 90^\\circ$.',
				'Multiply $F_\\phi F_\\psi$ using the angle subtraction formulas.'
			],
			'$F_\\phi = \\begin{bmatrix}\\cos2\\phi&\\sin2\\phi\\\\\\sin2\\phi&-\\cos2\\phi\\end{bmatrix}$. Columns are unit and orthogonal ($\\cos2\\phi\\sin2\\phi - \\sin2\\phi\\cos2\\phi = 0$), so it is orthogonal, and $\\det = -\\cos^22\\phi - \\sin^22\\phi = -1$.\n\n$F_\\phi F_\\psi = \\begin{bmatrix}\\cos2\\phi\\cos2\\psi + \\sin2\\phi\\sin2\\psi&\\cos2\\phi\\sin2\\psi - \\sin2\\phi\\cos2\\psi\\\\\\sin2\\phi\\cos2\\psi - \\cos2\\phi\\sin2\\psi&\\sin2\\phi\\sin2\\psi + \\cos2\\phi\\cos2\\psi\\end{bmatrix} = \\begin{bmatrix}\\cos\\gamma&-\\sin\\gamma\\\\\\sin\\gamma&\\cos\\gamma\\end{bmatrix}$ with $\\gamma = 2(\\phi - \\psi)$,\nwhich is the rotation through $2(\\phi - \\psi)$ ✓. (Two reflections make a rotation by twice the angle between the mirror lines.)'
		),
		open(
			C,
			'23.18',
			'Let $R$ be the rotation taking $\\mathbf e_1\\mapsto\\mathbf e_2\\mapsto\\mathbf e_3\\mapsto\\mathbf e_1$. Confirm that $R\\in SO(3)$, find its axis by solving $R\\mathbf x = \\mathbf x$, and find its angle from $\\operatorname{tr}R = 1 + 2\\cos\\theta$. Why is that trace formula true?',
			[
				'The columns of $R$ are $R\\mathbf e_1 = \\mathbf e_2$, $R\\mathbf e_2 = \\mathbf e_3$, $R\\mathbf e_3 = \\mathbf e_1$.',
				'Orthogonal: columns are orthonormal. Determinant: it is a cyclic (even) permutation matrix.',
				'In an orthonormal basis (axis, plane perpendicular to it) the matrix of a rotation is $\\operatorname{diag}(1, R_\\theta)$.'
			],
			'$R = \\begin{bmatrix}0&0&1\\\\1&0&0\\\\0&1&0\\end{bmatrix}$. Its columns are the standard basis vectors, so it is orthogonal, and a 3-cycle is an even permutation, so $\\det R = +1$: $R\\in SO(3)$.\n\n**Axis.** $R(a,b,c) = (c,a,b) = (a,b,c)$ forces $a = b = c$: the axis is the line through $(1,1,1)$.\n\n**Angle.** $\\operatorname{tr}R = 0 = 1 + 2\\cos\\theta$, so $\\cos\\theta = -\\tfrac12$ and $\\theta = 120^\\circ = 2\\pi/3$.\n\n**Why the formula holds.** Choose an orthonormal basis with first vector along the axis. In it $R$ becomes $\\begin{bmatrix}1&0\\\\0&R_\\theta\\end{bmatrix}$ with $R_\\theta$ the $2\\times2$ rotation. Trace is invariant under change of basis, and $\\operatorname{tr} = 1 + \\cos\\theta + \\cos\\theta$.'
		),
		open(
			C,
			'23.19',
			'Verify the identity $\\det(e^A) = e^{\\operatorname{tr}A}$ by hand for $A = \\begin{bmatrix}0&-\\theta\\\\\\theta&0\\end{bmatrix}$, by computing $e^A$ in closed form and taking its determinant. Which element of $SO(2)$ is it?',
			[
				'$A = \\theta J$ with $J^2 = -I$. Sum the exponential series: even powers give $\\cos$, odd powers give $\\sin$.',
				'Take the determinant of the result.'
			],
			'Since $A^2 = -\\theta^2I$, $e^A = I\\cos\\theta + J\\sin\\theta$ where $J = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$:\n$e^A = \\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$.\n\n$\\det e^A = \\cos^2\\theta + \\sin^2\\theta = 1 = e^0 = e^{\\operatorname{tr}A}$ ✓ (the trace of $A$ is $0$).\n\nIt is the **rotation through angle $\\theta$** in $SO(2)$. So exponentiating the skew-symmetric matrix $\\theta J$ gives the rotation by $\\theta$.'
		),
		open(
			C,
			'23.20',
			'Show that the skew-symmetric $n\\times n$ matrices form a vector space of dimension $n(n-1)/2$ by exhibiting a basis. Confirm that the bracket $[A,B] = AB - BA$ of two skew-symmetric matrices is skew-symmetric, and that the ordinary product need not be.',
			[
				'A skew-symmetric matrix has zero diagonal and is determined by its entries above the diagonal. Which matrices $E_{ij} - E_{ji}$ ($i<j$) do you get?',
				'Transpose the bracket: $(AB - BA)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T} - A^{\\mathsf T}B^{\\mathsf T}$.',
				'For the product try $A = B = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$.'
			],
			'**Basis.** $K_{ij} = E_{ij} - E_{ji}$ for $i<j$. A skew-symmetric $A$ has $A_{ii} = 0$ and $A_{ji} = -A_{ij}$, so $A = \\sum_{i<j}A_{ij}K_{ij}$ uniquely. There are $\\binom n2 = n(n-1)/2$ of them.\n\n**Bracket.** With $A^{\\mathsf T} = -A$, $B^{\\mathsf T} = -B$: $[A,B]^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T} - A^{\\mathsf T}B^{\\mathsf T} = BA - AB = -[A,B]$. ✓ Closed under the bracket.\n\n**Product.** $(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T} = BA$, which equals $-AB$ only if $AB = -BA$. For $A = B = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$: $AB = A^2 = -I$, which is symmetric, not skew. So skew-symmetric matrices form a Lie algebra under the bracket but are not closed under the ordinary product.'
		),
		open(
			C,
			'23.21',
			'Check that $[\\mathbf a]_\\times\\mathbf b = \\mathbf a\\times\\mathbf b$ for $\\mathbf a = (1,2,3)$ and $\\mathbf b = (0,1,-1)$, and verify $K^3 = -K$ for $K = [\\mathbf u]_\\times$ with $\\mathbf u$ a unit vector. Then use the Rodrigues formula $e^{\\theta K} = I + \\sin\\theta\\,K + (1-\\cos\\theta)K^2$ to write the rotation through $\\pi/2$ about $(0,0,1)$ and check it against the matrix you would have written down directly.',
			[
				'$[\\mathbf a]_\\times = \\begin{bmatrix}0&-a_3&a_2\\\\a_3&0&-a_1\\\\-a_2&a_1&0\\end{bmatrix}$.',
				'$K^2 = \\mathbf u\\mathbf u^{\\mathsf T} - I$ for a unit vector, and $K\\mathbf u = \\mathbf 0$.',
				'For $\\mathbf u = (0,0,1)$: $K = \\begin{bmatrix}0&-1&0\\\\1&0&0\\\\0&0&0\\end{bmatrix}$.'
			],
			'$[\\mathbf a]_\\times = \\begin{bmatrix}0&-3&2\\\\3&0&-1\\\\-2&1&0\\end{bmatrix}$, so $[\\mathbf a]_\\times\\mathbf b = (-3 - 2,\\ 1,\\ 1) = (-5,1,1)$. Cross product: $\\mathbf a\\times\\mathbf b = (2(-1) - 3\\cdot1,\\ 3\\cdot0 - 1(-1),\\ 1\\cdot1 - 2\\cdot0) = (-5,1,1)$ ✓.\n\n$K^2 = \\mathbf u\\mathbf u^{\\mathsf T} - I$ for a unit vector, and $K\\mathbf u = \\mathbf u\\times\\mathbf u = \\mathbf 0$, so $K^3 = K(\\mathbf u\\mathbf u^{\\mathsf T} - I) = (K\\mathbf u)\\mathbf u^{\\mathsf T} - K = -K$ ✓.\n\nFor $\\mathbf u = (0,0,1)$, $\\theta = \\pi/2$: $K^2 = \\operatorname{diag}(-1,-1,0)$ and $e^{\\theta K} = I + K + K^2 = \\begin{bmatrix}1 - 1&-1&0\\\\1&1 - 1&0\\\\0&0&1\\end{bmatrix} = \\begin{bmatrix}0&-1&0\\\\1&0&0\\\\0&0&1\\end{bmatrix}$, which is exactly the rotation by $90^\\circ$ about the $z$-axis written down directly ($\\mathbf e_1\\mapsto\\mathbf e_2$, $\\mathbf e_2\\mapsto-\\mathbf e_1$, $\\mathbf e_3$ fixed) ✓.'
		),
		open(
			C,
			'23.22',
			'Let $G$ be the cyclic group generated by the cyclic shift $S$ on $\\mathbb{R}^3$. Find every $A\\in M_3(\\mathbb{R})$ with $AS = SA$, check that the answer is a subspace, and give its dimension. What are such matrices called, and what does the dimension say about the parameter count of a convolution against that of a general layer?',
			[
				'$S\\mathbf e_1 = \\mathbf e_2$, $S\\mathbf e_2 = \\mathbf e_3$, $S\\mathbf e_3 = \\mathbf e_1$. If $AS = SA$ then $A\\mathbf e_{k+1} = AS\\mathbf e_k = SA\\mathbf e_k$.',
				'So $A$ is determined by its first column $A\\mathbf e_1 = (a,b,c)$.'
			],
			'Since $A\\mathbf e_2 = SA\\mathbf e_1$ and $A\\mathbf e_3 = S^2A\\mathbf e_1$, the matrix is determined by its first column $(a,b,c)$:\n$A = \\begin{bmatrix}a&c&b\\\\b&a&c\\\\c&b&a\\end{bmatrix} = aI + bS + cS^2$.\nConversely every such matrix commutes with $S$. The set is closed under sums and scalar multiples (if $AS = SA$ and $BS = SB$ then $(A + tB)S = S(A + tB)$): a subspace, of dimension **3** (spanned by $I, S, S^2$), versus $9$ for a general $3\\times3$ matrix.\n\nThey are **circulant matrices**: multiplication by one is cyclic convolution. A convolution layer on $n$ inputs has $n$ parameters, compared with $n^2$ for a general (dense) layer: the symmetry (commuting with the shift) is exactly what forces **weight sharing** and the parameter saving.'
		),
		open(
			C,
			'23.23',
			'Take $A = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ and compute $R = e^{tA}$ for $t = \\pi/4$. Confirm $\\kappa(R) = 1$ using the singular values. Then explain in two sentences why a method that parametrises orthogonal matrices must skew-symmetrise a general stored matrix rather than exponentiating it as it stands, and check on $P = \\begin{bmatrix}1&0\\\\0&2\\end{bmatrix}$ that $e^P$ need not be orthogonal.',
			[
				'$A^2 = -I$, so $e^{tA} = \\cos t\\,I + \\sin t\\,A$.',
				'An orthogonal matrix has all singular values equal to $1$.',
				'For a general $W$, use $K = \\tfrac12(W - W^{\\mathsf T})$. Why is $e^K$ orthogonal? Compute $(e^K)^{\\mathsf T}$.'
			],
			'$e^{tA} = \\begin{bmatrix}\\cos t&\\sin t\\\\-\\sin t&\\cos t\\end{bmatrix}$, at $t = \\pi/4$: $R = \\tfrac1{\\sqrt2}\\begin{bmatrix}1&1\\\\-1&1\\end{bmatrix}$. $R^{\\mathsf T}R = \\tfrac12\\begin{bmatrix}2&0\\\\0&2\\end{bmatrix} = I$, so both singular values are $1$ and $\\kappa(R) = 1$ ✓.\n\n**Why skew-symmetrise.** For skew-symmetric $K$, $(e^K)^{\\mathsf T} = e^{K^{\\mathsf T}} = e^{-K} = (e^K)^{-1}$, so $e^K$ is orthogonal; for a general matrix $W$ this identity fails, so the stored $W$ is first replaced by $K = \\tfrac12(W - W^{\\mathsf T})$ to guarantee an orthogonal result whatever the optimiser does to the stored entries.\n\n**Counterexample:** $e^P = \\operatorname{diag}(e,e^2)$ has singular values $e\\ne e^2$, not both $1$, so it is not orthogonal ($\\kappa = e\\approx2.72$).'
		)
	]
};

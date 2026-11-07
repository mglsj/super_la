/** Worked exam problems for chapter 6 lessons (linear maps). */
import type { Worked } from './types';

export const whichLinear: Worked = {
	title: 'prove linear, or find a counterexample',
	problem:
		'For each map, prove it is linear or show by a specific example that it is not.\n(a) $T:\\mathbb R^3\\to\\mathbb R^2$, $T(x,y,z) = (2x + y,\\ y - 3z)$.\n(b) $T:\\mathbb R^2\\to\\mathbb R^2$, $T(x,y) = (x^2,\\ y)$.\n(c) $T:P_2\\to\\mathbb R$, $T(p) = p\'(1)$.\n(d) $T:M_2(\\mathbb R)\\to\\mathbb R$, $T(X) = x_{11}x_{22}$ (the product of the two diagonal entries).',
	method: [
		'**To prove linear**: take general inputs $\\mathbf u,\\mathbf v$ and a scalar $c$, and show $T(\\mathbf u + c\\mathbf v) = T\\mathbf u + cT\\mathbf v$ (this one line covers both rules). A formula that is a matrix times the input is automatically linear.',
		'**To disprove**: one concrete failure is enough. Quick tests, in order: is $T(\\mathbf 0) = \\mathbf 0$? Does $T(2\\mathbf v) = 2T(\\mathbf v)$ for a simple $\\mathbf v$? Does $T(\\mathbf u + \\mathbf v) = T\\mathbf u + T\\mathbf v$?',
		'Products, squares and other powers of the inputs are the usual culprits; derivatives, integrals, evaluation at a point, transpose and trace are linear.',
		'Write the counterexample with **actual numbers**: "$T(\\ldots) = \\ldots$ but $2T(\\ldots) = \\ldots$".'
	],
	steps: [
		{
			label: '(a) Linear',
			text: '$T(x,y,z) = \\begin{bmatrix}2&1&0\\\\0&1&-3\\end{bmatrix}\\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix}$, a matrix times a vector, so it is linear. (Or directly: each output is a combination of $x, y, z$ with fixed coefficients, so it respects sums and scalings.)'
		},
		{
			label: '(b) Not linear',
			text: '$T(2,0) = (4,0)$ but $2\\,T(1,0) = 2(1,0) = (2,0)$. Scaling fails. (Note $T(\\mathbf 0) = \\mathbf 0$ here, so the zero test alone would not have caught it.)'
		},
		{
			label: '(c) Linear',
			text: "$T(p + cq) = (p + cq)'(1) = p'(1) + c\\,q'(1) = T(p) + c\\,T(q)$, because differentiation is linear and evaluating at $1$ is linear."
		},
		{
			label: '(d) Not linear',
			text: 'Take $X = I$: $T(I) = 1\\cdot1 = 1$, but $T(2I) = 2\\cdot2 = 4\\ne2\\,T(I) = 2$. Scaling fails because each diagonal entry is scaled, and their product picks up $c^2$.'
		}
	],
	credit: 'Linearity checks after Axler, Chapter 3.'
};

export const evaluationMap: Worked = {
	title: 'an evaluation map on polynomials',
	problem:
		'Define $T:P_2\\to\\mathbb R^2$ by $T(p) = (p(-1),\\ p(1))$.\n(a) Show $T$ is linear and find its matrix with respect to $(1,t,t^2)$ and the standard basis of $\\mathbb R^2$.\n(b) Find a basis of $\\ker T$.\n(c) Find $\\operatorname{Im}T$ and verify rank–nullity.\n(d) Is $T$ injective? Surjective?',
	method: [
		'Linear: evaluation at a point is linear, $(p + cq)(a) = p(a) + c\\,q(a)$, entry by entry.',
		'Matrix: column $j$ = $T$(basis vector $j$) written in the target basis. Apply $T$ to $1, t, t^2$ in turn.',
		'Kernel: write $p = a + bt + ct^2$ and solve $T(p) = \\mathbf 0$, i.e. the null space of the matrix. (A polynomial vanishing at given points is a multiple of $\\prod(t - x_i)$.)',
		'Image: the column space of the matrix. Rank–nullity: $\\dim\\ker + \\operatorname{rank} = \\dim P_2 = 3$.',
		'Injective $\\iff\\ker T = \\{0\\}$. Surjective $\\iff\\operatorname{rank} = \\dim$ of the target.'
	],
	steps: [
		{
			label: 'Linear and its matrix',
			text: '$T(p + cq) = ((p + cq)(-1),\\ (p + cq)(1)) = T(p) + c\\,T(q)$.\n$T(1) = (1,1)$, $T(t) = (-1,1)$, $T(t^2) = (1,1)$, so\n$$[T] = \\begin{bmatrix}1&-1&1\\\\1&1&1\\end{bmatrix}.$$'
		},
		{
			label: 'Kernel',
			text: '$T(a + bt + ct^2) = (a - b + c,\\ a + b + c) = (0,0)$. Subtracting: $2b = 0$, so $b = 0$ and $a = -c$. So $p = c(t^2 - 1)$: basis of $\\ker T$ is $\\{t^2 - 1\\}$. (Indeed $t^2 - 1 = (t - 1)(t + 1)$ vanishes at $\\pm1$.)'
		},
		{
			label: 'Image and rank–nullity',
			text: 'The columns $(1,1)$ and $(-1,1)$ are independent, so $\\operatorname{rank}T = 2$ and $\\operatorname{Im}T = \\mathbb R^2$. Rank–nullity: $1 + 2 = 3 = \\dim P_2$ ✓.'
		},
		{
			label: 'Injective? Surjective?',
			text: '**Not injective**: $\\ker T\\ne\\{0\\}$ (for example $T(t^2 - 1) = T(0)$). **Surjective**: the image is all of $\\mathbb R^2$. (A map from a 3-dimensional space to a 2-dimensional one can never be injective.)'
		}
	],
	credit: 'Evaluation maps and rank–nullity, after Axler, Chapter 3.'
};

export const mapFromBasis: Worked = {
	title: 'a map fixed by its values on a basis',
	problem:
		'Let $T:\\mathbb R^2\\to\\mathbb R^2$ be linear with $T(2,1) = (1,3)$ and $T(1,1) = (0,2)$, and let $S$ be the reflection in the $x$-axis.\n(a) Why does $T$ exist and why is it unique? Find $[T]$.\n(b) Find the matrices of $ST$ and $TS$. Is $ST = TS$?\n(c) Show $T$ is an isomorphism and find $[T^{-1}]$.',
	method: [
		'Existence and uniqueness: if the inputs form a **basis**, any choice of outputs defines exactly one linear map (Axler\'s "linear maps and bases" theorem): every $\\mathbf v$ is a unique combination of the basis, and linearity forces $T\\mathbf v$.',
		'Standard matrix: with $B = [\\mathbf b_1\\ \\mathbf b_2]$ and $M = [T\\mathbf b_1\\ T\\mathbf b_2]$ we have $[T]B = M$, so $[T] = MB^{-1}$. (Alternatively, write $\\mathbf e_1, \\mathbf e_2$ in terms of $\\mathbf b_1,\\mathbf b_2$.)',
		'Composition: $[ST] = [S][T]$ (apply $T$ first). Compare with $[T][S]$.',
		'Isomorphism $\\iff\\det[T]\\ne0$; then use the $2\\times2$ inverse formula.'
	],
	steps: [
		{
			label: 'Existence and uniqueness',
			text: '$(2,1)$ and $(1,1)$ are not parallel ($\\det\\begin{bmatrix}2&1\\\\1&1\\end{bmatrix} = 1\\ne0$), so they form a basis of $\\mathbb R^2$. A linear map can be prescribed freely on a basis, and is then determined everywhere: $T$ exists and is unique.'
		},
		{
			label: 'Standard matrix',
			text: '$B = \\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}$, $B^{-1} = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}$, $M = \\begin{bmatrix}1&0\\\\3&2\\end{bmatrix}$.\n$$[T] = MB^{-1} = \\begin{bmatrix}1&-1\\\\1&1\\end{bmatrix}.$$\nCheck: $[T](2,1) = (1,3)$ ✓ and $[T](1,1) = (0,2)$ ✓.'
		},
		{
			label: 'Compositions',
			text: '$[S] = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$.\n$[ST] = [S][T] = \\begin{bmatrix}1&-1\\\\-1&-1\\end{bmatrix}$ (negate the second row of $[T]$).\n$[TS] = [T][S] = \\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$ (negate the second column of $[T]$).\nThey differ, so **$ST\\ne TS$**.'
		},
		{
			label: 'Inverse',
			text: '$\\det[T] = 1\\cdot1 - (-1)\\cdot1 = 2\\ne0$, so $T$ is invertible: a linear bijection, an isomorphism.\n$$[T^{-1}] = \\frac12\\begin{bmatrix}1&1\\\\-1&1\\end{bmatrix}.$$\nCheck: $[T^{-1}](1,3) = \\tfrac12(4, 2) = (2,1)$ ✓.'
		}
	],
	credit: 'Linear maps determined by a basis, after Axler, Chapter 3; matrices of compositions after Strang.'
};

export const similarityPowers: Worked = {
	title: 'change of basis and powers',
	problem:
		'Let $A = \\begin{bmatrix}5&-6\\\\3&-4\\end{bmatrix}$ be the standard matrix of $T$, and $B\' = \\big((2,1),\\ (1,1)\\big)$.\n(a) Write the change-of-basis matrix $P$ from $B\'$ to the standard basis, and $P^{-1}$.\n(b) Compute $[T]_{B\'} = P^{-1}AP$. Check that the trace and determinant agree with those of $A$, and explain why.\n(c) Use (b) to compute $A^3$.',
	method: [
		'$P$ has the vectors of $B\'$ as its **columns** (it converts $B\'$-coordinates into standard coordinates).',
		'Compute $AP$ first (that is $A$ applied to each new basis vector), then multiply by $P^{-1}$ on the left.',
		'Trace and determinant are similarity invariants: $\\det(P^{-1}AP) = \\det A$ and $\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr}(APP^{-1}) = \\operatorname{tr}A$. They describe $T$, not the coordinates.',
		'Powers: $A = PDP^{-1}$ gives $A^k = PD^kP^{-1}$, because the inner $P^{-1}P$ cancel. If $D$ is diagonal, $D^k$ just powers the diagonal.'
	],
	steps: [
		{
			label: 'P and its inverse',
			text: '$P = \\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}$, $\\det P = 1$, $P^{-1} = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}$.'
		},
		{
			label: 'Compute AP',
			text: '$A(2,1) = (10 - 6,\\ 6 - 4) = (4,2)$ and $A(1,1) = (-1,-1)$, so $AP = \\begin{bmatrix}4&-1\\\\2&-1\\end{bmatrix}$. (Already visible: $A(2,1) = 2(2,1)$ and $A(1,1) = -1\\cdot(1,1)$.)'
		},
		{
			label: 'The matrix in the new basis',
			text: '$P^{-1}AP = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}\\begin{bmatrix}4&-1\\\\2&-1\\end{bmatrix} = \\begin{bmatrix}2&0\\\\0&-1\\end{bmatrix} = D$.\nTrace: $5 + (-4) = 1 = 2 + (-1)$ ✓. Determinant: $-20 + 18 = -2 = 2\\cdot(-1)$ ✓. They must agree because $A$ and $D$ represent the same map $T$; $\\det(P^{-1}AP) = \\det P^{-1}\\det A\\det P = \\det A$.'
		},
		{
			label: 'Powers',
			text: '$A^3 = PD^3P^{-1} = \\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}\\begin{bmatrix}8&0\\\\0&-1\\end{bmatrix}\\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix} = \\begin{bmatrix}16&-1\\\\8&-1\\end{bmatrix}\\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix} = \\begin{bmatrix}17&-18\\\\9&-10\\end{bmatrix}$.\nCheck: $A^2 = \\begin{bmatrix}7&-6\\\\3&-2\\end{bmatrix}$ and $A^2A = \\begin{bmatrix}35 - 18&-42 + 24\\\\15 - 6&-18 + 8\\end{bmatrix} = \\begin{bmatrix}17&-18\\\\9&-10\\end{bmatrix}$ ✓.'
		}
	],
	credit: 'Similarity and powers via a good basis, after Strang.'
};

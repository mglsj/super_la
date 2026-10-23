import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch21';

export const exercises: QuizBank = {
	'ch21.exercises': [
		open(
			C,
			'22.17',
			'Let $V = \\mathbb{R}^2$ with basis $\\mathbf u_1 = (1,1)$, $\\mathbf u_2 = (1,-1)$. Write the dual basis $\\varphi_1,\\varphi_2$ explicitly as functions of $(x,y)$, and check $\\varphi_i(\\mathbf u_j) = \\delta_{ij}$. Then verify $\\mathbf v = \\varphi_1(\\mathbf v)\\mathbf u_1 + \\varphi_2(\\mathbf v)\\mathbf u_2$ for $\\mathbf v = (3,5)$.',
			[
				'The dual basis functional $\\varphi_i$ reads off the $i$-th coordinate of $\\mathbf v$ in the basis $(\\mathbf u_1,\\mathbf u_2)$. Solve $(x,y) = a(1,1) + b(1,-1)$ for $a,b$.',
				'Then $\\varphi_1(x,y) = a$ and $\\varphi_2(x,y) = b$.'
			],
			'$a + b = x$ and $a - b = y$ give $a = \\tfrac{x+y}2$, $b = \\tfrac{x-y}2$. So\n$\\varphi_1(x,y) = \\tfrac12(x + y)$ and $\\varphi_2(x,y) = \\tfrac12(x - y)$.\n\nCheck: $\\varphi_1(\\mathbf u_1) = \\tfrac12(1 + 1) = 1$, $\\varphi_1(\\mathbf u_2) = \\tfrac12(1 - 1) = 0$, $\\varphi_2(\\mathbf u_1) = 0$, $\\varphi_2(\\mathbf u_2) = \\tfrac12(1 + 1) = 1$ ✓.\n\nFor $\\mathbf v = (3,5)$: $\\varphi_1 = 4$, $\\varphi_2 = -1$, and $4(1,1) - 1\\cdot(1,-1) = (3,5)$ ✓.'
		),
		open(
			C,
			'22.18',
			'Show that the isomorphism $V\\to V^*$ determined by a basis (sending each basis vector to its dual basis functional) really does depend on the basis, by computing where $\\mathbf e_1 = (1,0)$ goes under the standard basis of $\\mathbb{R}^2$ and under the basis $\\mathbf b_1 = (1,0)$, $\\mathbf b_2 = (1,1)$, and observing that the two functionals differ.',
			[
				'Standard basis: the dual basis is $x$ and $y$ (the coordinate functions). So $(1,0)\\mapsto x$.',
				'Second basis: find the dual basis $\\psi_1,\\psi_2$ with $\\psi_i(\\mathbf b_j) = \\delta_{ij}$, then $\\mathbf b_1 = (1,0)\\mapsto\\psi_1$.'
			],
			'Standard basis: $(1,0) = \\mathbf e_1\\mapsto\\mathbf e_1^*$, the functional $(x,y)\\mapsto x$.\n\nBasis $\\mathbf b_1 = (1,0)$, $\\mathbf b_2 = (1,1)$: write $(x,y) = a\\mathbf b_1 + b\\mathbf b_2$, so $b = y$ and $a = x - y$. Dual basis $\\psi_1(x,y) = x - y$, $\\psi_2(x,y) = y$. The same vector $(1,0) = \\mathbf b_1$ is sent to $\\psi_1: (x,y)\\mapsto x - y$.\n\n$x\\ne x - y$ (e.g. at $(0,1)$: $0$ versus $-1$). So the same vector gets different functionals: the identification $V\\cong V^*$ is not canonical, it needs a choice of basis (or an inner product).'
		),
		open(
			C,
			'22.19',
			'Show that $X\\mapsto\\operatorname{tr}(AX)$ is a linear functional on $M_n(\\mathbb{R})$ for each fixed $A$, and that every functional on $M_n(\\mathbb{R})$ arises this way from exactly one $A$. Which inner product does this exhibit as the Riesz identification?',
			[
				'Linearity: trace is linear and matrix multiplication is linear in $X$.',
				'Given a functional $f$, define $A$ by $A_{ji} = f(E_{ij})$, where $E_{ij}$ is the matrix unit. Note $\\operatorname{tr}(AE_{ij}) = A_{ji}$.',
				'Compare $\\operatorname{tr}(AX)$ with $\\langle A^{\\mathsf T},X\\rangle = \\operatorname{tr}(AX)$ for the Frobenius inner product $\\langle B,X\\rangle = \\operatorname{tr}(B^{\\mathsf T}X)$.'
			],
			'**Linear:** $\\operatorname{tr}(A(X + cY)) = \\operatorname{tr}(AX) + c\\operatorname{tr}(AY)$.\n\n**Every functional:** $M_n(\\mathbb{R})$ has the basis $E_{ij}$ and $\\operatorname{tr}(AE_{ij}) = A_{ji}$. A functional $f$ is determined by its values $f(E_{ij})$, and $f(X) = \\operatorname{tr}(AX)$ for all $X$ exactly when $A_{ji} = f(E_{ij})$ for all $i,j$. So $A$ exists and is unique: the map $A\\mapsto\\operatorname{tr}(A\\,\\cdot)$ is an isomorphism $M_n\\to M_n^*$.\n\n**Riesz.** $\\operatorname{tr}(AX) = \\langle A^{\\mathsf T},X\\rangle$ where $\\langle B,X\\rangle = \\operatorname{tr}(B^{\\mathsf T}X) = \\sum b_{ij}x_{ij}$ is the **Frobenius (trace) inner product**. The Riesz representative of the functional $\\operatorname{tr}(A\\cdot)$ is $A^{\\mathsf T}$; for symmetric matrices the representative is $A$ itself.'
		),
		open(
			C,
			'22.20',
			'Let $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ be $T(x,y,z) = (x + y,\\ y - z)$ and let $\\varphi\\in(\\mathbb{R}^2)^*$ be $\\varphi(s,t) = 2s - t$. Compute $T^*\\varphi$ directly from the definition ($T^*\\varphi = \\varphi\\circ T$), then again from the matrix-transpose theorem, and check that the answers agree.',
			[
				'Definition: $(T^*\\varphi)(\\mathbf v) = \\varphi(T\\mathbf v)$.',
				'Matrix of $T$: $\\begin{bmatrix}1&1&0\\\\0&1&-1\\end{bmatrix}$. The functional $\\varphi$ is the row vector $(2,-1)$ in the dual basis, and $T^*$ has matrix $M^{\\mathsf T}$ acting on coordinates: $\\varphi\\circ T$ has row vector $(2,-1)M$.'
			],
			'**Directly:** $(T^*\\varphi)(x,y,z) = \\varphi(x + y, y - z) = 2(x + y) - (y - z) = 2x + y + z$.\n\n**Via the matrix:** the coordinate vector of $T^*\\varphi$ is $M^{\\mathsf T}(2,-1)^{\\mathsf T}$ with $M = \\begin{bmatrix}1&1&0\\\\0&1&-1\\end{bmatrix}$: $M^{\\mathsf T}\\begin{bmatrix}2\\\\-1\\end{bmatrix} = \\begin{bmatrix}1&0\\\\1&1\\\\0&-1\\end{bmatrix}\\begin{bmatrix}2\\\\-1\\end{bmatrix} = \\begin{bmatrix}2\\\\1\\\\1\\end{bmatrix}$, i.e. the functional $2x + y + z$ ✓. Both agree.'
		),
		open(
			C,
			'22.21',
			'Let $W\\subseteq\\mathbb{R}^4$ be spanned by $(1,0,1,0)$ and $(0,1,0,1)$. Find a basis of the annihilator $W^\\circ$ and check the dimension formula. Then find $(W^\\circ)^\\circ$ under the identification $V^{**}\\cong V$ and say what you notice.',
			[
				'$W^\\circ$ consists of the functionals $\\varphi = (a,b,c,d)$ with $\\varphi(\\mathbf w) = 0$ for both spanning vectors: $a + c = 0$ and $b + d = 0$.',
				'The double annihilator: which vectors are killed by every functional in $W^\\circ$?'
			],
			'$a + c = 0$ and $b + d = 0$ give $\\varphi = a(1,0,-1,0) + b(0,1,0,-1)$. A basis of $W^\\circ$: $\\varphi_1 = x_1 - x_3$ and $\\varphi_2 = x_2 - x_4$. So $\\dim W + \\dim W^\\circ = 2 + 2 = 4 = \\dim V$ ✓.\n\n$(W^\\circ)^\\circ$ is the set of vectors $\\mathbf v$ with $\\varphi_1(\\mathbf v) = \\varphi_2(\\mathbf v) = 0$, i.e. $x_1 = x_3$ and $x_2 = x_4$: spanned by $(1,0,1,0)$ and $(0,1,0,1)$. That is $W$ itself: **$(W^\\circ)^\\circ = W$**, in finite dimensions annihilating twice returns the original subspace.'
		),
		open(
			C,
			'22.22',
			'Let $A = \\begin{bmatrix}1&0\\\\0&4\\end{bmatrix}$ and $P = \\begin{bmatrix}1&0\\\\0&\\tfrac12\\end{bmatrix}$. Compute $P^{-1}AP$ and $P^{\\mathsf T}AP$ and compare their eigenvalues. Which quantities survive each operation, and which of the two is the right one if $A$ is the matrix of a quadratic form?',
			[
				'$P$ is diagonal, so everything is entrywise. $P^{-1} = \\operatorname{diag}(1,2)$.',
				'A quadratic form $q(\\mathbf x) = \\mathbf x^{\\mathsf T}A\\mathbf x$ in new coordinates $\\mathbf x = P\\mathbf y$ becomes $\\mathbf y^{\\mathsf T}(P^{\\mathsf T}AP)\\mathbf y$.'
			],
			'$P^{-1}AP = \\operatorname{diag}(1,4)$ (diagonal matrices commute), eigenvalues $1,4$. $P^{\\mathsf T}AP = \\operatorname{diag}(1,4\\cdot\\tfrac14) = \\operatorname{diag}(1,1)$, eigenvalues $1,1$.\n\n**Similarity** $P^{-1}AP$ (change of basis for an operator) preserves eigenvalues, trace, determinant. **Congruence** $P^{\\mathsf T}AP$ (change of basis for a bilinear form) preserves only rank and the signs of the eigenvalues (inertia); the actual eigenvalues change.\n\nFor the matrix of a quadratic form (a bilinear form) the right operation is **congruence**: the form transforms contravariantly, $A\\mapsto P^{\\mathsf T}AP$. Treating it as an operator and using $P^{-1}AP$ would be wrong unless $P$ is orthogonal, when the two coincide.'
		),
		open(
			C,
			'22.23',
			'Write down the matrix of the form $\\beta(\\mathbf x,\\mathbf y) = x_1y_2 - x_2y_1 + x_3y_4 - x_4y_3$ on $\\mathbb{R}^4$, verify that it is alternating, and identify $n$ in the normal form theorem (an alternating form has a basis in which it is $n$ blocks $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ plus zeros). Then show that a skew-symmetric matrix of odd size is singular, with two proofs, one using the normal form and one using $\\det A^{\\mathsf T} = \\det A$.',
			[
				'The matrix has entries $\\beta(\\mathbf e_i,\\mathbf e_j)$. Alternating means $\\beta(\\mathbf x,\\mathbf x) = 0$ for all $\\mathbf x$.',
				'Normal form: the rank of an alternating form is $2n$, always even.',
				'For the determinant proof use $\\det(-A) = (-1)^m\\det A$ for $m\\times m$.'
			],
			'$\\beta(\\mathbf e_1,\\mathbf e_2) = 1$, $\\beta(\\mathbf e_2,\\mathbf e_1) = -1$, $\\beta(\\mathbf e_3,\\mathbf e_4) = 1$, $\\beta(\\mathbf e_4,\\mathbf e_3) = -1$: \n$J = \\begin{bmatrix}0&1&0&0\\\\-1&0&0&0\\\\0&0&0&1\\\\0&0&-1&0\\end{bmatrix}$.\n\nAlternating: $\\beta(\\mathbf x,\\mathbf x) = x_1x_2 - x_2x_1 + x_3x_4 - x_4x_3 = 0$ ✓ (equivalently $J^{\\mathsf T} = -J$ with zero diagonal). It is already in normal form with **$n = 2$** blocks, rank $2n = 4$ (non-degenerate).\n\n**Odd size, proof 1 (normal form).** The rank of an alternating form is $2n$, even. For an odd size $m$, rank $\\le m - 1<m$, so the matrix is singular.\n\n**Proof 2 (determinant).** $A^{\\mathsf T} = -A$ gives $\\det A = \\det A^{\\mathsf T} = \\det(-A) = (-1)^m\\det A = -\\det A$ for odd $m$, so $2\\det A = 0$ and $\\det A = 0$. (Over a field of characteristic $2$ this proof fails, but the normal form proof still works for alternating forms.)'
		),
		open(
			C,
			'22.24',
			'Decompose $A = \\begin{bmatrix}1&4\\\\0&1\\end{bmatrix}$ into its symmetric and alternating parts. Which part does the quadratic form $\\mathbf x\\mapsto\\mathbf x^{\\mathsf T}A\\mathbf x$ see, and why does that make the alternating part invisible to the theory of quadratic forms and positive definiteness?',
			[
				'$S = \\tfrac12(A + A^{\\mathsf T})$ and $K = \\tfrac12(A - A^{\\mathsf T})$.',
				'Compute $\\mathbf x^{\\mathsf T}K\\mathbf x$ for a skew-symmetric $K$.'
			],
			'$S = \\tfrac12\\begin{bmatrix}2&4\\\\4&2\\end{bmatrix} = \\begin{bmatrix}1&2\\\\2&1\\end{bmatrix}$, $K = \\tfrac12\\begin{bmatrix}0&4\\\\-4&0\\end{bmatrix} = \\begin{bmatrix}0&2\\\\-2&0\\end{bmatrix}$, and $A = S + K$.\n\n$\\mathbf x^{\\mathsf T}K\\mathbf x = 2x_1x_2 - 2x_2x_1 = 0$ for every $\\mathbf x$, so $q(\\mathbf x) = \\mathbf x^{\\mathsf T}A\\mathbf x = \\mathbf x^{\\mathsf T}S\\mathbf x = x_1^2 + 4x_1x_2 + x_2^2$: **only the symmetric part is seen**.\n\nThat is why quadratic forms and positive definiteness are always stated for symmetric matrices: any $A$ gives the same form as its symmetrisation, so nothing is lost by assuming symmetry, and the alternating part carries information about $\\beta(\\mathbf x,\\mathbf y)$ with $\\mathbf x\\ne\\mathbf y$ that the quadratic form cannot detect.'
		),
		open(
			C,
			'22.25',
			'Give, in your own words, the proof of $\\operatorname{rank}A = \\operatorname{rank}A^{\\mathsf T}$ that follows from the duality theorem (the kernel of the transpose is the annihilator of the image), and say which of the standard proofs works over an arbitrary field and which needs $\\mathbb{R}$ or $\\mathbb{C}$.',
			[
				'For $T:V\\to W$ with $\\dim W = m$, the kernel of $T^*:W^*\\to V^*$ is $(\\operatorname{Im}T)^\\circ$, which has dimension $m - \\operatorname{rank}T$.',
				'Apply rank–nullity to $T^*$.'
			],
			'Let $T:V\\to W$ with $\\dim W = m$. A functional $\\varphi$ satisfies $T^*\\varphi = \\varphi\\circ T = 0$ exactly when $\\varphi$ vanishes on $\\operatorname{Im}T$, so $\\ker T^* = (\\operatorname{Im}T)^\\circ$ and $\\dim\\ker T^* = m - \\operatorname{rank}T$. Rank–nullity for $T^*:W^*\\to V^*$ (domain of dimension $m$) gives $\\operatorname{rank}T^* = m - \\dim\\ker T^* = \\operatorname{rank}T$. Since the matrix of $T^*$ is the transpose of the matrix of $T$, $\\operatorname{rank}A^{\\mathsf T} = \\operatorname{rank}A$.\n\n**Which works where.** The duality argument uses only dimension counting, so it works over **any field**; so does the row-reduction proof (row operations preserve the row space and the number of pivots equals both row and column rank). The proof via $\\ker A = \\ker A^{\\mathsf T}A$ (using $\\mathbf x^{\\mathsf T}\\mathbf x = 0\\Rightarrow\\mathbf x = 0$) needs the positivity available only over $\\mathbb{R}$ (or $\\mathbb{C}$ with conjugate transpose); over $\\mathbb{F}_2$, $(1,1)\\cdot(1,1) = 0$ breaks it.'
		)
	]
};

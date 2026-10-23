import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch06';

export const exercises: QuizBank = {
	'ch06.exercises': [
		open(
			C,
			'7.28',
			'Which of these maps are linear? Justify each answer.\n(a) $T:\\mathbb{R}^2\\to\\mathbb{R}^2,\\ T(x,y) = (2x - y,\\ x)$.\n(b) $T:\\mathbb{R}^2\\to\\mathbb{R}^2,\\ T(x,y) = (x + 1,\\ y)$.\n(c) $T: M_n(\\mathbb{R})\\to M_n(\\mathbb{R}),\\ T(A) = A + A^{\\mathsf T}$.\n(d) $T: M_n(\\mathbb{R})\\to M_n(\\mathbb{R}),\\ T(A) = A^2$.\n(e) $T: C[0,1]\\to\\mathbb{R},\\ T(f) = f(0) - 2f(1)$.',
			[
				'First quick test: a linear map must send $\\mathbf 0$ to $\\mathbf 0$. If $T(\\mathbf 0)\\ne\\mathbf 0$, stop: not linear.',
				'Otherwise check the two rules $T(\\mathbf u + \\mathbf v) = T\\mathbf u + T\\mathbf v$ and $T(c\\mathbf v) = cT\\mathbf v$. For a formula that is a sum of constants times the inputs the rules hold; for squares or products they usually fail (find a concrete counterexample).',
				'For (d) try $A = I$ and $c = 2$: compare $T(2I)$ with $2T(I)$.'
			],
			'(a) **Linear.** Each output is a combination of $x$ and $y$: $T = \\begin{bmatrix}2&-1\\\\1&0\\end{bmatrix}$ applied to $(x,y)$.\n\n(b) **Not linear.** $T(0,0) = (1,0)\\ne(0,0)$. (It is a translation.)\n\n(c) **Linear.** $T(A + cB) = (A + cB) + (A + cB)^{\\mathsf T} = (A + A^{\\mathsf T}) + c(B + B^{\\mathsf T}) = T(A) + cT(B)$, using that transpose is linear.\n\n(d) **Not linear.** $T(2I) = (2I)^2 = 4I$ but $2T(I) = 2I$. (Also $(A + B)^2\\ne A^2 + B^2$ in general.)\n\n(e) **Linear.** $T(f + cg) = (f + cg)(0) - 2(f + cg)(1) = [f(0) - 2f(1)] + c[g(0) - 2g(1)] = T(f) + cT(g)$. Evaluating a function at a point is linear in the function.'
		),
		open(
			C,
			'7.29',
			'For $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ given by $T(x,y,z) = (x + 2y - z,\\ 2x + 4y - 2z)$, find bases for $\\ker T$ and $\\operatorname{Im}T$ and verify the rank–nullity theorem.',
			[
				'Write the matrix of $T$: its rows are $[1\\ 2\\ -1]$ and $[2\\ 4\\ -2]$. Notice anything about the two rows?',
				'The kernel is the set where both outputs are $0$; since the second row is twice the first, there is really only one equation. Solve it and describe the solutions with free parameters.',
				'The image is the span of the columns of the matrix. Which columns are multiples of each other?'
			],
			'The matrix is $\\begin{bmatrix}1&2&-1\\\\2&4&-2\\end{bmatrix}$, and row 2 is twice row 1, so the single equation $x + 2y - z = 0$ describes the kernel.\n\n**Kernel.** $z = x + 2y$, so $(x,y,z) = x(1,0,1) + y(0,1,2)$. **Basis** $\\{(1,0,1),(0,1,2)\\}$, dimension $2$. (Check: $T(1,0,1) = (1 - 1,\\ 2 - 2) = \\mathbf 0$ ✓, $T(0,1,2) = (2 - 2,\\ 4 - 4) = \\mathbf 0$ ✓.)\n\n**Image.** The columns are $(1,2)$, $(2,4)$, $(-1,-2)$, all multiples of $(1,2)$. **Basis** $\\{(1,2)\\}$, dimension $1$: the image is the line $y = 2x$.\n\n**Rank–nullity.** $\\dim\\ker T + \\dim\\operatorname{Im}T = 2 + 1 = 3 = \\dim\\mathbb{R}^3$ ✓.'
		),
		open(
			C,
			'7.30',
			'Let $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ be the unique linear map with $T(1,1) = (2,0)$ and $T(1,-1) = (0,4)$. Find $T(x,y)$ for a general $(x,y)$, and write down $[T]_S$ (the matrix in the standard basis).',
			[
				'$(1,1)$ and $(1,-1)$ are a basis, so a linear map is determined by their images. Write $(x,y) = a(1,1) + b(1,-1)$ and solve for $a, b$ in terms of $x, y$.',
				'Then $T(x,y) = aT(1,1) + bT(1,-1)$. The columns of $[T]_S$ are $T(1,0)$ and $T(0,1)$: read them off from your formula.'
			],
			'Solving $a + b = x$, $a - b = y$ gives $a = \\tfrac{x+y}{2}$ and $b = \\tfrac{x-y}{2}$. Then\n$T(x,y) = \\tfrac{x+y}{2}(2,0) + \\tfrac{x-y}{2}(0,4) = (x + y,\\ 2x - 2y)$.\n\nSo $T(1,0) = (1, 2)$ and $T(0,1) = (1, -2)$, and\n$[T]_S = \\begin{bmatrix}1&1\\\\2&-2\\end{bmatrix}$.\nCheck: $T(1,1) = (2, 0)$ ✓ and $T(1,-1) = (0, 4)$ ✓.'
		),
		open(
			C,
			'7.31',
			'Let $K: P_2\\to P_3$ be $(Kf)(t) = \\int_0^t f(s)\\,ds$. Write down $[K]$ for the bases $B = (1, t, t^2)$ and $C = (1, t, t^2, t^3)$, and compute $[D][K]$ where $D: P_3\\to P_2$ is differentiation. Explain the answer, and explain why $[K][D]$ is not the identity.',
			[
				'Apply $K$ to each basis vector of $P_2$ and write the result in the basis $C$: $K1 = t$, $Kt = t^2/2$, $Kt^2 = t^3/3$. These are the three columns of the $4\\times3$ matrix.',
				'Do the same for $D$ on $P_3$: $D1 = 0$, $Dt = 1$, $Dt^2 = 2t$, $Dt^3 = 3t^2$ gives a $3\\times4$ matrix.',
				'Multiply $[D][K]$ ($3\\times4$ times $4\\times3$). For $[K][D]$ ask what $K(Df)$ does to the constant term of $f$.'
			],
			'$[K] = \\begin{bmatrix}0&0&0\\\\1&0&0\\\\0&\\tfrac12&0\\\\0&0&\\tfrac13\\end{bmatrix}$ (columns: $K1 = t$, $Kt = \\tfrac12t^2$, $Kt^2 = \\tfrac13t^3$) and $[D] = \\begin{bmatrix}0&1&0&0\\\\0&0&2&0\\\\0&0&0&3\\end{bmatrix}$.\n\n$[D][K] = \\begin{bmatrix}1&0&0\\\\0&1&0\\\\0&0&1\\end{bmatrix} = I_3$.\n\n**Why.** $D(Kf) = \\dfrac{d}{dt}\\int_0^t f = f$: differentiating an integral gives back the function (fundamental theorem of calculus). So $D$ undoes $K$, and the matrices multiply to the identity on $P_2$.\n\n**Why not the other way.** $[K][D] = \\operatorname{diag}(0,1,1,1)$, because $K(Df) = f(t) - f(0)$: differentiating throws away the constant term and integrating from $0$ cannot restore it. $K$ is injective (not surjective onto $P_3$), $D$ is surjective (not injective, its kernel is the constants). A one-sided inverse need not be two-sided when the spaces have different dimensions.'
		),
		open(
			C,
			'7.32',
			'Show that similarity is an equivalence relation on $M_n(\\mathbb{R})$. Then show that $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ and $I_2$ are not similar, even though they have the same rank, trace and determinant.',
			[
				'Matrices $A$ and $B$ are similar if $B = P^{-1}AP$ for some invertible $P$. Check the three properties: reflexive (take $P = I$), symmetric (solve for $A$), transitive (compose two changes of basis).',
				'For the second part ask what matrices are similar to the identity: compute $P^{-1}IP$.'
			],
			'**Reflexive:** $A = I^{-1}AI$. **Symmetric:** if $B = P^{-1}AP$ then $A = (P^{-1})^{-1}B(P^{-1}) = PBP^{-1}$, so $A$ is similar to $B$ via $P^{-1}$. **Transitive:** if $B = P^{-1}AP$ and $C = Q^{-1}BQ$ then $C = (PQ)^{-1}A(PQ)$. So similarity is an equivalence relation.\n\n**Not similar.** For any invertible $P$, $P^{-1}IP = P^{-1}P = I$. So the only matrix similar to $I_2$ is $I_2$ itself. Since $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}\\ne I_2$, they are not similar, although both have rank $2$, trace $2$ and determinant $1$. (Another way: $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix} - I$ has rank $1$, but $I - I = 0$ has rank $0$, and rank of $A - I$ is a similarity invariant.) So rank, trace and determinant are necessary but not sufficient to be similar. This is the shear that cannot be diagonalised.'
		),
		open(
			C,
			'7.33',
			'Let $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ be the orthogonal projection onto the line spanned by $(2,1)$. Compute $[T]_S$ and $[T]_B$ for $B = ((2,1), (-1,2))$ (a basis adapted to the line and its perpendicular), and check that $T^2 = T$ in both.',
			[
				'The projection onto the line of $\\mathbf u = (2,1)$ is $T(\\mathbf x) = \\dfrac{\\mathbf u\\cdot\\mathbf x}{\\mathbf u\\cdot\\mathbf u}\\mathbf u$. Apply it to $\\mathbf e_1$ and $\\mathbf e_2$ to get the columns of $[T]_S$.',
				'For $[T]_B$ use geometry: what does $T$ do to $\\mathbf u$ itself, and to the perpendicular vector $\\mathbf w = (-1,2)$?',
				'Check idempotence by squaring each matrix.'
			],
			'Here $\\mathbf u\\cdot\\mathbf u = 5$. $T(\\mathbf e_1) = \\tfrac25(2,1) = (\\tfrac45,\\tfrac25)$ and $T(\\mathbf e_2) = \\tfrac15(2,1) = (\\tfrac25,\\tfrac15)$, so\n$[T]_S = \\tfrac15\\begin{bmatrix}4&2\\\\2&1\\end{bmatrix}$.\n\nIn the basis $B = (\\mathbf u,\\mathbf w)$: $T\\mathbf u = \\mathbf u$ (it is on the line) and $T\\mathbf w = \\mathbf 0$ (it is perpendicular to the line). So\n$[T]_B = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$.\n\n**$T^2 = T$.** $[T]_B^2 = \\operatorname{diag}(1,0)^2 = \\operatorname{diag}(1,0)$ ✓. And $[T]_S^2 = \\tfrac1{25}\\begin{bmatrix}16 + 4&8 + 2\\\\8 + 2&4 + 1\\end{bmatrix} = \\tfrac1{25}\\begin{bmatrix}20&10\\\\10&5\\end{bmatrix} = \\tfrac15\\begin{bmatrix}4&2\\\\2&1\\end{bmatrix}$ ✓. (Projecting twice does nothing new.)'
		),
		open(
			C,
			'7.34',
			'On the space of real sequences let $R(x_1,x_2,x_3,\\dots) = (0, x_1, x_2,\\dots)$ be the right shift and $L(x_1,x_2,x_3,\\dots) = (x_2,x_3,\\dots)$ the left shift. Show that both are linear, that $LR = \\mathrm{id}$ and that $RL\\ne\\mathrm{id}$, and say which hypothesis of the corollary about injective, surjective and invertible maps fails.',
			[
				'Linearity: both maps just move entries around, so apply them to $\\mathbf x + c\\mathbf y$ entry by entry.',
				'Compute $LR(\\mathbf x)$ and $RL(\\mathbf x)$ directly on a sequence. What happens to $x_1$ in $RL$?',
				'The corollary says that for a linear map from a space to itself, injective $\\iff$ surjective $\\iff$ invertible. What property of the space did it assume?'
			],
			'**Linear.** Shifting entries commutes with adding sequences and scaling them: $R(\\mathbf x + c\\mathbf y) = (0, x_1 + cy_1,\\dots) = R\\mathbf x + cR\\mathbf y$, and similarly for $L$.\n\n**$LR = \\mathrm{id}$.** $R\\mathbf x = (0, x_1, x_2,\\dots)$ and then $L$ drops the leading $0$: $LR\\mathbf x = (x_1, x_2,\\dots) = \\mathbf x$.\n\n**$RL\\ne\\mathrm{id}$.** $RL\\mathbf x = R(x_2, x_3,\\dots) = (0, x_2, x_3,\\dots)$: the first entry was lost. For $\\mathbf x = (1,0,0,\\dots)$ we get $\\mathbf 0\\ne\\mathbf x$.\n\n**What fails.** The corollary needs the space to be **finite-dimensional**. $R$ is injective but not surjective (never hits $(1,0,0,\\dots)$), while $L$ is surjective but not injective (it kills $(1,0,0,\\dots)$). In finite dimensions rank–nullity forces injective and surjective to go together; in infinite dimensions it does not.'
		),
		open(
			C,
			'7.35',
			'Verify the statement $\\dim\\operatorname{Hom}(V,W) = \\dim V\\cdot\\dim W$ concretely for $V = \\mathbb{R}^2$ and $W = \\mathbb{R}^3$ by exhibiting a basis of $\\operatorname{Hom}(V,W)$ with $6$ elements.',
			[
				'A linear map $\\mathbb{R}^2\\to\\mathbb{R}^3$ is the same as a $3\\times2$ matrix. How many entries does one have?',
				'Use the matrix units $E_{ij}$: the $3\\times2$ matrix with a $1$ in row $i$, column $j$ and $0$ elsewhere. Show that they span and are independent.'
			],
			'Linear maps $\\mathbb{R}^2\\to\\mathbb{R}^3$ correspond exactly to $3\\times2$ matrices (a map is determined by the images of $\\mathbf e_1,\\mathbf e_2$). The six matrix units $E_{ij}$ ($i = 1,2,3$; $j = 1,2$) form a basis:\n- **Span:** any $A = (a_{ij}) = \\sum a_{ij}E_{ij}$.\n- **Independent:** $\\sum c_{ij}E_{ij} = 0$ means the matrix with entries $c_{ij}$ is zero, so every $c_{ij} = 0$.\nEach $E_{ij}$ is the map sending $\\mathbf e_j\\mapsto\\mathbf e_i$ and the other basis vector to $\\mathbf 0$. So $\\dim\\operatorname{Hom}(\\mathbb{R}^2,\\mathbb{R}^3) = 6 = 2\\cdot3$.'
		),
		open(
			C,
			'7.36',
			'Prove that there is no pair of matrices $A, B\\in M_n(\\mathbb{R})$ with $AB - BA = I_n$. Now let $D$ be differentiation on $\\mathbb{R}[t]$ and $M$ multiplication by $t$, so $(Mf)(t) = tf(t)$. Check that $DM - MD = \\mathrm{id}$, and say which step of your argument has no analogue here.',
			[
				'Take the trace of both sides of $AB - BA = I_n$. Use $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$.',
				'For $D$ and $M$ compute $(DM - MD)f$ for a polynomial $f$ using the product rule.',
				'Which concept did the matrix proof rely on that makes sense for a $n\\times n$ matrix but not for operators on infinite-dimensional $\\mathbb{R}[t]$?'
			],
			'**No matrices.** Taking traces: $\\operatorname{tr}(AB - BA) = \\operatorname{tr}(AB) - \\operatorname{tr}(BA) = 0$ since $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$, but $\\operatorname{tr}(I_n) = n\\ne0$. Contradiction.\n\n**Differentiation and multiplication.** $(DMf)(t) = (tf(t))\' = f(t) + tf\'(t)$ and $(MDf)(t) = tf\'(t)$. So $(DM - MD)f = f$, i.e. $DM - MD = \\mathrm{id}$. It *is* possible here.\n\n**What has no analogue.** The **trace**. $\\mathbb{R}[t]$ is infinite-dimensional, so operators on it are infinite matrices and the sum of the diagonal need not be finite or satisfy $\\operatorname{tr}(DM) = \\operatorname{tr}(MD)$. (This is the canonical commutation relation $[x, p] = i\\hbar$ of quantum mechanics: it can only hold in infinite dimensions.)'
		)
	]
};

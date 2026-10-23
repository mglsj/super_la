import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch04';

export const exercises: QuizBank = {
	'ch04.exercises': [
		open(
			C,
			'5.16',
			'Which of these are subspaces of $\\mathbb{R}^3$? Justify each answer, and when a set fails, say which condition of the subspace test it violates (contains $\\mathbf 0$, closed under addition, closed under scalar multiplication).\n(a) $\\{(x,y,z) : x + y + z = 0\\}$\n(b) $\\{(x,y,z) : x + y + z = 1\\}$\n(c) $\\{(x,y,z) : xyz = 0\\}$\n(d) $\\{(x,y,z) : x = y\\}$\n(e) $\\{(x,y,z) : x \\ge 0\\}$',
			[
				'Always check the zero vector first: substitute $(0,0,0)$ into the defining condition. If it fails, the set is not a subspace.',
				'If $\\mathbf 0$ passes, test closure with a concrete pair: pick two vectors in the set and see whether their sum is in the set, then test a scalar multiple (try the scalar $-1$).',
				'For (c) look for two vectors, each with a zero coordinate, whose sum has none. For (e) the problem is a negative scalar.'
			],
			'(a) **Subspace.** It is a plane through the origin: $0+0+0 = 0$; if $x+y+z = 0$ and $x\'+y\'+z\' = 0$ then the sums add to $0$; and scaling keeps the sum $0$.\n\n(b) **Not a subspace.** $(0,0,0)$ gives $0\\ne1$, so the zero vector is missing (also $2\\cdot(1,0,0)$ has coordinate sum $2$).\n\n(c) **Not a subspace.** It contains $\\mathbf 0$ and is closed under scalars, but not under addition: $(1,1,0)$ and $(0,0,1)$ are in the set but their sum $(1,1,1)$ has $xyz = 1\\ne0$. (It is a union of three coordinate planes.)\n\n(d) **Subspace.** $x = y$ is a plane through the origin: closed under addition and scaling since $x = y$ and $x\' = y\'$ give $x+x\' = y+y\'$.\n\n(e) **Not a subspace.** It contains $\\mathbf 0$ and is closed under addition, but not under scalar multiplication: $(1,0,0)$ is in the set while $(-1)\\cdot(1,0,0) = (-1,0,0)$ is not.'
		),
		open(
			C,
			'5.17',
			'Let $U$ and $W$ be subspaces of $V$. Show that $U\\cup W$ is a subspace if and only if $U\\subseteq W$ or $W\\subseteq U$.',
			[
				'The easy direction: if $U\\subseteq W$ then what is $U\\cup W$?',
				'For the hard direction argue by contradiction. Suppose neither containment holds and pick $\\mathbf u\\in U\\setminus W$ and $\\mathbf w\\in W\\setminus U$.',
				'If $U\\cup W$ were a subspace, then $\\mathbf u + \\mathbf w$ would be in it, so in $U$ or in $W$. Say it is in $U$: subtract $\\mathbf u$. What do you get?'
			],
			'($\\Leftarrow$) If $U\\subseteq W$ then $U\\cup W = W$, a subspace; likewise if $W\\subseteq U$.\n\n($\\Rightarrow$) Suppose $U\\cup W$ is a subspace but neither $U\\subseteq W$ nor $W\\subseteq U$. Choose $\\mathbf u\\in U\\setminus W$ and $\\mathbf w\\in W\\setminus U$. Both lie in $U\\cup W$, so $\\mathbf u + \\mathbf w\\in U\\cup W$.\n- If $\\mathbf u + \\mathbf w\\in U$, then $\\mathbf w = (\\mathbf u + \\mathbf w) - \\mathbf u\\in U$ (subspaces are closed under subtraction), contradicting $\\mathbf w\\notin U$.\n- If $\\mathbf u + \\mathbf w\\in W$, then $\\mathbf u = (\\mathbf u + \\mathbf w) - \\mathbf w\\in W$, contradicting $\\mathbf u\\notin W$.\nEither way we get a contradiction, so one subspace must contain the other.'
		),
		open(
			C,
			'5.18',
			'In $M_2(\\mathbb{R})$ let $S$ be the symmetric matrices and $K$ the antisymmetric ones. Show that both are subspaces, that $S + K = M_2(\\mathbb{R})$ and that $S\\cap K = \\{0\\}$. Compare with Exercise 4.29.',
			[
				'Use the subspace test: $\\mathbf 0\\in S$, and if $A^{\\mathsf T} = A$, $B^{\\mathsf T} = B$ then what is $(A + cB)^{\\mathsf T}$? Do the same for $K$ with $A^{\\mathsf T} = -A$.',
				'For $S + K = M_2$ write any matrix as $A = \\tfrac12(A + A^{\\mathsf T}) + \\tfrac12(A - A^{\\mathsf T})$.',
				'For $S\\cap K$: a matrix $M$ with $M^{\\mathsf T} = M$ and $M^{\\mathsf T} = -M$ satisfies $M = -M$.'
			],
			'**Subspaces.** $0^{\\mathsf T} = 0$ is in both. If $A, B$ are symmetric, $(A + cB)^{\\mathsf T} = A^{\\mathsf T} + cB^{\\mathsf T} = A + cB$, so $S$ is closed under linear combinations. If $A, B$ are antisymmetric, $(A + cB)^{\\mathsf T} = -A - cB = -(A + cB)$, so $K$ is too.\n\n**$S + K = M_2(\\mathbb{R})$.** Any $A = \\tfrac12(A + A^{\\mathsf T}) + \\tfrac12(A - A^{\\mathsf T})$, a symmetric part plus an antisymmetric part.\n\n**$S\\cap K = \\{0\\}$.** If $M^{\\mathsf T} = M$ and $M^{\\mathsf T} = -M$ then $M = -M$, so $M = 0$.\n\nSo $M_2(\\mathbb{R}) = S\\oplus K$ is a direct sum: every matrix splits into a symmetric and an antisymmetric part in exactly one way, which is Exercise 4.29 restated. Dimensions: $3 + 1 = 4$ ($\\dim S = 3$, $\\dim K = 1$, $\\dim M_2 = 4$).'
		),
		open(
			C,
			'5.19',
			'For $A = \\begin{bmatrix}1&3&2\\\\2&6&5\\\\1&3&3\\end{bmatrix}$ find generators (spanning sets) for the column space, the null space and the row space, and verify your null-space generator against the original matrix.',
			[
				'Row-reduce $A$. The pivot columns of the *original* matrix give a basis for the column space; the nonzero rows of the RREF give a basis for the row space.',
				'For the null space solve $A\\mathbf x = \\mathbf 0$ from the RREF: set each free variable to $1$ (the others to $0$) and read off the pivot variables.',
				'To verify, multiply $A$ by your null-space vector. Every row of $A$ must give $0$.'
			],
			'$R_2 - 2R_1 = [0\\ 0\\ 1]$, $R_3 - R_1 = [0\\ 0\\ 1]$, then $R_3 - R_2 = 0$ and $R_1 - 2R_2 = [1\\ 3\\ 0]$:\n$\\text{RREF} = \\begin{bmatrix}1&3&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$ with pivot columns $1$ and $3$, free column $2$.\n\n**Column space:** pivot columns of $A$: $(1,2,1)$ and $(2,5,3)$. Dimension $2$.\n**Row space:** nonzero rows of the RREF: $(1,3,0)$ and $(0,0,1)$. Dimension $2$.\n**Null space:** $x_2 = s$ free; $x_1 = -3s$, $x_3 = 0$, so it is spanned by $(-3, 1, 0)$. Dimension $1$.\n\n**Check:** $A(-3,1,0) = (-3 + 3,\\ -6 + 6,\\ -3 + 3) = (0,0,0)$ ✓. And rank $+$ nullity $= 2 + 1 = 3$, the number of columns.'
		),
		open(
			C,
			'5.20',
			'Show that $\\{A\\in M_n(\\mathbb{R}) : \\operatorname{tr}A = 0\\}$ is a subspace. The notes showed that $\\{A : \\det A = 0\\}$ is not a subspace of $M_2(\\mathbb{R})$; extend that argument to every $n\\ge2$, and say which of the three subspace conditions the set does satisfy.',
			[
				'For the trace: use linearity, $\\operatorname{tr}(A + cB) = \\operatorname{tr}A + c\\operatorname{tr}B$.',
				'For the determinant, find two singular matrices whose sum is invertible. For $n = 2$ try $\\operatorname{diag}(1,0)$ and $\\operatorname{diag}(0,1)$; for general $n$ use the matrix with a single $1$ in position $(1,1)$ together with the identity matrix whose $(1,1)$ entry is changed to $0$.',
				'Then check the three conditions for $\\{\\det = 0\\}$ one at a time: zero matrix, sums, scalar multiples.'
			],
			'**Trace zero.** $\\operatorname{tr}0 = 0$. If $\\operatorname{tr}A = \\operatorname{tr}B = 0$ then $\\operatorname{tr}(A + cB) = 0 + c\\cdot0 = 0$. So it is closed under linear combinations: a subspace (of dimension $n^2 - 1$).\n\n**Determinant zero is not a subspace for $n\\ge2$.** Let $E_{11}$ be the matrix with a single $1$ in position $(1,1)$ and $F = I - E_{11}$ (identity with the $(1,1)$ entry replaced by $0$). Both have a zero row, so $\\det E_{11} = \\det F = 0$, but $E_{11} + F = I_n$ has determinant $1\\ne0$. For $n = 2$ this is $\\operatorname{diag}(1,0) + \\operatorname{diag}(0,1) = I$.\n\n**What it does satisfy.** The set $\\{\\det = 0\\}$ contains the zero matrix ($\\det 0 = 0$), and it is closed under scalar multiplication ($\\det(cA) = c^n\\det A = 0$). It fails only the closure under addition.'
		),
		open(
			C,
			'5.21',
			'Show that the set of twice-differentiable functions satisfying $y\'\' + y = 0$ is a vector space, and verify that $\\sin$ and $\\cos$ belong to it. Is the set of solutions of $y\'\' + y = 1$ also a vector space? Relate your answer to the particular-plus-homogeneous theorem.',
			[
				'Use the subspace test inside the space of twice-differentiable functions: the zero function, sums and scalar multiples. Differentiation is linear, so $(f + cg)\'\' = f\'\' + cg\'\'$.',
				'For $\\sin$: compute $\\sin\'\' = -\\sin$, so $\\sin\'\' + \\sin = 0$. Do the same for $\\cos$.',
				'For $y\'\' + y = 1$ check the zero function (does it solve the equation?). Then find one particular solution and compare with the structure "particular + homogeneous".'
			],
			'**Vector space.** The zero function satisfies $0\'\' + 0 = 0$. If $f\'\' + f = 0$ and $g\'\' + g = 0$ then $(f + cg)\'\' + (f + cg) = (f\'\' + f) + c(g\'\' + g) = 0$. So the solution set is a subspace of the space of twice-differentiable functions, hence a vector space.\n\n**$\\sin$ and $\\cos$.** $\\sin\'\' = -\\sin$ so $\\sin\'\' + \\sin = 0$ ✓, and $\\cos\'\' = -\\cos$ so $\\cos\'\' + \\cos = 0$ ✓.\n\n**$y\'\' + y = 1$ is not a vector space.** The zero function gives $0 + 0 = 0\\ne1$, so $\\mathbf 0$ is not a solution. This is the same phenomenon as $A\\mathbf x = \\mathbf b$ with $\\mathbf b\\ne\\mathbf 0$. The theorem says the full solution is *one particular solution plus the general homogeneous solution*: here $y = 1 + a\\sin x + b\\cos x$ (since $y = 1$ is a particular solution). It is a shifted copy of the solution space of $y\'\' + y = 0$, an affine set, not a subspace.'
		),
		open(
			C,
			'5.22',
			'Give a $2\\times2$ matrix $A$ and a single row operation after which the column space is different. Then explain why no row operation can change the null space or the row space of $A$.',
			[
				'Pick a matrix whose columns are parallel, like $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$, and subtract row 1 from row 2. Compare the column spaces.',
				'For the explanation, row operations are multiplication on the left by an invertible matrix $E$. Show $EA\\mathbf x = \\mathbf 0\\iff A\\mathbf x = \\mathbf 0$ for the null space, and use that each new row is a combination of old rows (and vice versa) for the row space.'
			],
			'**Example.** $A = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ has column space $\\operatorname{span}\\{(1,1)\\}$. After $R_2 - R_1$ we get $\\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ whose column space is $\\operatorname{span}\\{(1,0)\\}$, a different line.\n\n**Null space.** A row operation replaces $A$ by $EA$ with $E$ invertible. Then $EA\\mathbf x = \\mathbf 0\\iff A\\mathbf x = E^{-1}\\mathbf 0 = \\mathbf 0$, so the null space is unchanged.\n\n**Row space.** Each new row is a linear combination of the old rows, so the new row space is inside the old one; since the operation can be undone by another row operation, the old row space is inside the new one. They are equal.\n\n**Column space** is the exception because $EA$ has columns $E\\mathbf a_j$: the columns are *transformed* by $E$, so the span moves (though its dimension does not).'
		),
		open(
			C,
			'5.23',
			'Prove Proposition 5.2(d) again (if $c\\mathbf v = \\mathbf 0$ then $c = 0$ or $\\mathbf v = \\mathbf 0$), writing beside each step the number of the axiom it uses. Then find where your proof would break if the scalars were the integers rather than $\\mathbb{R}$.',
			[
				'Suppose $c\\ne0$. You want to show $\\mathbf v = \\mathbf 0$. Real numbers other than $0$ have inverses, so multiply $c\\mathbf v = \\mathbf 0$ by $c^{-1}$.',
				'The relevant axioms: (V6) $1\\mathbf v = \\mathbf v$, (V5) $(ab)\\mathbf v = a(b\\mathbf v)$, and the consequence $a\\mathbf 0 = \\mathbf 0$ from Proposition 5.2(b).',
				'Where did you use that $c^{-1}$ exists? Which integers have an integer inverse?'
			],
			'**Proof.** Suppose $c\\mathbf v = \\mathbf 0$ and $c\\ne0$. We show $\\mathbf v = \\mathbf 0$.\n- $\\mathbf v = 1\\mathbf v$ by (V6).\n- $1 = c^{-1}c$ because $c\\ne0$ is invertible in $\\mathbb{R}$, so $1\\mathbf v = (c^{-1}c)\\mathbf v$.\n- $(c^{-1}c)\\mathbf v = c^{-1}(c\\mathbf v)$ by (V5).\n- $c^{-1}(c\\mathbf v) = c^{-1}\\mathbf 0$ by the assumption $c\\mathbf v = \\mathbf 0$.\n- $c^{-1}\\mathbf 0 = \\mathbf 0$ by Proposition 5.2(b) (which itself uses (V7)).\nSo $\\mathbf v = \\mathbf 0$. Hence either $c = 0$ or $\\mathbf v = \\mathbf 0$.\n\n**Where it breaks over $\\mathbb{Z}$.** The step "$1 = c^{-1}c$" needs $c^{-1}$ to be a scalar. In $\\mathbb{Z}$ only $\\pm1$ have inverses, so for $c = 2$ the proof fails. And the *statement* fails too: in the integers mod $2$ (a $\\mathbb{Z}$-module), $2\\cdot1 = 0$ with $2\\ne0$ and $1\\ne0$. That is why vector spaces need scalars from a field, where every nonzero scalar is invertible.'
		),
		open(
			C,
			'5.24',
			'Let $U = \\operatorname{span}\\{(1,0,0),(0,1,0)\\}$ and $W = \\operatorname{span}\\{(0,1,0),(0,0,1)\\}$ in $\\mathbb{R}^3$. Describe $U\\cap W$ and $U + W$ explicitly, and check that neither $U\\cup W$ nor the set difference $U\\setminus W$ is a subspace.',
			[
				'$U$ is the $xy$-plane and $W$ is the $yz$-plane. A vector is in both when it has $z = 0$ (from $U$) and $x = 0$ (from $W$).',
				'$U + W$ is the set of all sums $\\mathbf u + \\mathbf w$. Since $U$ contains $\\mathbf e_1$ and $W$ contains $\\mathbf e_3$, what can you reach?',
				'For $U\\cup W$ add a vector from each and test the sum. For $U\\setminus W$, is $\\mathbf 0$ in it?'
			],
			'$U$ is the plane $z = 0$ and $W$ is the plane $x = 0$.\n\n**$U\\cap W = \\{(0, t, 0) : t\\in\\mathbb{R}\\}$**, the $y$-axis (it needs $z = 0$ and $x = 0$).\n\n**$U + W = \\mathbb{R}^3$.** Any $(a,b,c) = (a, b, 0) + (0, 0, c)$, a vector of $U$ plus a vector of $W$. (Check dimensions: $\\dim(U + W) = 2 + 2 - 1 = 3$.)\n\n**$U\\cup W$ is not a subspace.** $(1,0,0)\\in U$ and $(0,0,1)\\in W$, but their sum $(1,0,1)$ is in neither plane (it has $x\\ne0$ and $z\\ne0$). This agrees with Exercise 5.17, since neither plane contains the other.\n\n**$U\\setminus W$ is not a subspace.** $\\mathbf 0$ lies in $W$, so it is *removed*: the set has no zero vector.'
		)
	]
};

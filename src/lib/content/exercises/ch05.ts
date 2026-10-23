import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch05';

export const exercises: QuizBank = {
	'ch05.exercises': [
		open(
			C,
			'6.23',
			'Decide whether each set is independent, and exhibit a relation when it is not.\n(a) $(1,0,1),\\ (0,1,1),\\ (1,1,0)$ in $\\mathbb{R}^3$.\n(b) $(1,2,3),\\ (4,5,6),\\ (7,8,9)$ in $\\mathbb{R}^3$.\n(c) $1 + t,\\ 1 - t,\\ t^2$ in $P_2$.\n(d) $\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix},\\ \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix},\\ \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ in $M_2(\\mathbb{R})$.',
			[
				'Independent means the only solution of $c_1\\mathbf v_1 + c_2\\mathbf v_2 + c_3\\mathbf v_3 = \\mathbf 0$ is $c_1 = c_2 = c_3 = 0$. For vectors in $\\mathbb{R}^3$, put them as columns and compute the determinant (or row-reduce).',
				'For polynomials and matrices, write each object as its list of coefficients (or entries) and treat it as an ordinary vector. Then compare coefficients of $1, t, t^2$ (or of each matrix entry).',
				'For (b) and (d) look for a simple relation: try whether one vector is a combination of the other two (for (d) look at the top-left and off-diagonal entries).'
			],
			'(a) **Independent.** $\\det\\begin{bmatrix}1&0&1\\\\0&1&1\\\\1&1&0\\end{bmatrix} = 1(0-1) - 0 + 1(0-1) = -2\\ne0$.\n\n(b) **Dependent.** $(7,8,9) = 2(4,5,6) - (1,2,3)$, so $\\mathbf v_1 - 2\\mathbf v_2 + \\mathbf v_3 = \\mathbf 0$. (The matrix has rank $2$.)\n\n(c) **Independent.** $a(1+t) + b(1-t) + ct^2 = (a+b) + (a-b)t + ct^2 = 0$ forces $a + b = 0$, $a - b = 0$, $c = 0$, so $a = b = c = 0$.\n\n(d) **Dependent.** Call them $I$, $J$, $K$. Then $K = I + J$, so $I + J - K = 0$ is a nontrivial relation.'
		),
		open(
			C,
			'6.24',
			'Find a basis and the dimension of each subspace.\n(a) $\\{(x,y,z)\\in\\mathbb{R}^3 : x + y + z = 0\\}$.\n(b) The symmetric $2\\times2$ real matrices.\n(c) The polynomials $p\\in P_3$ (degree at most 3) with $p(1) = 0$.\n(d) $\\operatorname{span}\\{(1,1,0,0),(0,1,1,0),(1,2,1,0)\\}$ in $\\mathbb{R}^4$.',
			[
				'Describe the elements with free parameters, then pull out one vector for each parameter. The number of parameters is the dimension.',
				'(a) solve for $z$. (b) write a general symmetric matrix $\\begin{bmatrix}a&b\\\\b&c\\end{bmatrix}$. (c) $p(1) = 0$ means $(t - 1)$ divides $p$. (d) check whether the third vector is a combination of the first two.'
			],
			'(a) $z = -x - y$, so the vectors are $x(1,0,-1) + y(0,1,-1)$. **Basis** $\\{(1,0,-1),(0,1,-1)\\}$, **dimension 2**.\n\n(b) $\\begin{bmatrix}a&b\\\\b&c\\end{bmatrix} = a\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix} + b\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix} + c\\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$. **Basis** these three matrices, **dimension 3**.\n\n(c) $p(1) = 0$ means $p(t) = (t-1)q(t)$ with $q$ of degree at most $2$. **Basis** $\\{t - 1,\\ t(t-1),\\ t^2(t-1)\\}$, **dimension 3** (one less than $\\dim P_3 = 4$, since one linear condition was imposed).\n\n(d) The third vector is the sum of the first two: $(1,1,0,0) + (0,1,1,0) = (1,2,1,0)$. So the span has **basis** $\\{(1,1,0,0),(0,1,1,0)\\}$ and **dimension 2**.'
		),
		open(
			C,
			'6.25',
			'For $A = \\begin{bmatrix}1&2&3&1\\\\2&4&7&4\\\\1&2&4&3\\end{bmatrix}$, find bases for the column space, the null space and the row space, state $\\operatorname{rank}A$, and check the rank–nullity relation numerically.',
			[
				'Row-reduce to RREF. The pivot columns tell you which columns of the original $A$ form a basis of the column space; the nonzero RREF rows form a basis of the row space.',
				'For the null space set each free variable to $1$ in turn and solve for the pivot variables. Verify each null vector by multiplying by $A$.',
				'Rank–nullity says $\\operatorname{rank} + \\operatorname{nullity}$ equals the number of columns.'
			],
			'$R_2 - 2R_1 = [0\\ 0\\ 1\\ 2]$, $R_3 - R_1 = [0\\ 0\\ 1\\ 2]$, $R_3 - R_2 = 0$, $R_1 - 3R_2 = [1\\ 2\\ 0\\ -5]$:\n$\\text{RREF} = \\begin{bmatrix}1&2&0&-5\\\\0&0&1&2\\\\0&0&0&0\\end{bmatrix}$. Pivot columns $1, 3$; free columns $2, 4$.\n\n**Column space** (pivot columns of $A$): $(1,2,1)$ and $(3,7,4)$.\n**Row space:** $(1,2,0,-5)$ and $(0,0,1,2)$.\n**Null space:** $x_2 = s$, $x_4 = t$ free; $x_1 = -2s + 5t$, $x_3 = -2t$. **Basis** $(-2,1,0,0)$ and $(5,0,-2,1)$.\n**Rank** $= 2$.\n\n**Check.** $A(-2,1,0,0) = (-2+2,\\ -4+4,\\ -2+2) = \\mathbf 0$ ✓ and $A(5,0,-2,1) = (5-6+1,\\ 10-14+4,\\ 5-8+3) = \\mathbf 0$ ✓. Rank–nullity: $2 + 2 = 4$ columns ✓. Also row rank $=$ column rank $= 2$.'
		),
		open(
			C,
			'6.26',
			'Let $B = \\{(2,1),(1,3)\\}$. Verify that $B$ is a basis of $\\mathbb{R}^2$ and compute $[\\mathbf v]_B$ for $\\mathbf v = (5,5)$ and for $\\mathbf v = (1,0)$.',
			[
				'Put the basis vectors as the columns of $P = \\begin{bmatrix}2&1\\\\1&3\\end{bmatrix}$. Two vectors in $\\mathbb{R}^2$ form a basis exactly when $\\det P\\ne0$.',
				'The coordinates solve $P\\mathbf c = \\mathbf v$, i.e. $\\mathbf c = P^{-1}\\mathbf v$. For a $2\\times2$ matrix $P^{-1} = \\dfrac{1}{\\det P}\\begin{bmatrix}3&-1\\\\-1&2\\end{bmatrix}$.',
				'Check each answer: $c_1(2,1) + c_2(1,3)$ should give back $\\mathbf v$.'
			],
			'$\\det P = 2\\cdot3 - 1\\cdot1 = 5\\ne0$, so $B$ is a basis. $P^{-1} = \\tfrac15\\begin{bmatrix}3&-1\\\\-1&2\\end{bmatrix}$.\n\n$[(5,5)]_B = P^{-1}(5,5) = \\tfrac15(15 - 5,\\ -5 + 10) = (2, 1)$. Check: $2(2,1) + 1(1,3) = (5,5)$ ✓.\n\n$[(1,0)]_B = P^{-1}(1,0) = \\tfrac15(3, -1) = (\\tfrac35, -\\tfrac15)$. Check: $\\tfrac35(2,1) - \\tfrac15(1,3) = (\\tfrac65 - \\tfrac15,\\ \\tfrac35 - \\tfrac35) = (1,0)$ ✓.'
		),
		open(
			C,
			'6.27',
			'Extend $(1,1,0,0)$ and $(0,1,1,0)$ to a basis of $\\mathbb{R}^4$, following the procedure of the extension theorem. How many different answers are possible?',
			[
				'The procedure: go through the standard basis vectors $\\mathbf e_1,\\dots,\\mathbf e_4$ in order and add each one only if it is **not** already in the span of the vectors you have.',
				'The span of $\\mathbf v_1 = (1,1,0,0)$ and $\\mathbf v_2 = (0,1,1,0)$ is $\\{(a,\\ a+b,\\ b,\\ 0)\\}$. Is $\\mathbf e_1 = (1,0,0,0)$ of that form?',
				'Keep checking $\\mathbf e_2$, $\\mathbf e_3$, $\\mathbf e_4$ against the growing span. You need exactly two additions.'
			],
			'The span of $\\mathbf v_1,\\mathbf v_2$ is $\\{(a, a+b, b, 0)\\}$.\n- $\\mathbf e_1 = (1,0,0,0)$ would need $a = 1$, $a + b = 0$, $b = 0$: impossible. **Add $\\mathbf e_1$.**\n- With $\\mathbf e_1$ the span is $\\{(a + c,\\ a + b,\\ b,\\ 0)\\}$. $\\mathbf e_2 = (0,1,0,0)$: $b = 0$, $a + c = 0$, $a + b = 1$ gives $a = 1$, $c = -1$. It **is** in the span, skip it.\n- $\\mathbf e_3 = (0,0,1,0)$: $b = 1$, $a = -1$, $c = 1$. Also in the span, skip it.\n- $\\mathbf e_4$ has fourth coordinate $1$, impossible in the span. **Add $\\mathbf e_4$.**\n\nResult: the basis $\\{(1,1,0,0),\\ (0,1,1,0),\\ (1,0,0,0),\\ (0,0,0,1)\\}$.\n\n**How many different answers?** Infinitely many. Any two vectors $\\mathbf w_1, \\mathbf w_2$ such that $\\mathbf v_1,\\mathbf v_2,\\mathbf w_1,\\mathbf w_2$ are independent will do (the choice of $\\mathbf w_1$ has a whole 2-dimensional complement of freedom). The procedure just picks one canonical answer.'
		),
		open(
			C,
			'6.28',
			'Let $\\dim V = 4$ and let $S\\subseteq V$ have four elements. Explain why checking that $S$ is independent is enough to conclude that $S$ is a basis. Then show that the count cannot be dropped: give four independent vectors in $\\mathbb{R}^5$ that are not a basis, and five vectors that span $\\mathbb{R}^4$ and are not a basis.',
			[
				'A basis of a 4-dimensional space must have exactly $4$ vectors. If $S$ is independent but did not span, you could extend it by a vector outside its span: what would the size of that independent set be?',
				'Use the fact that an independent set in a $4$-dimensional space has at most $4$ vectors.',
				'For the counterexamples think of $\\mathbf e_1,\\dots,\\mathbf e_4$ in $\\mathbb{R}^5$ (do they span?) and of $\\mathbf e_1,\\dots,\\mathbf e_4$ together with one more vector in $\\mathbb{R}^4$ (are they independent?).'
			],
			'**Why independence suffices.** Suppose $S$ is independent with $4$ elements but does not span $V$. Pick $\\mathbf w\\notin\\operatorname{span}S$. Then $S\\cup\\{\\mathbf w\\}$ is independent with $5$ elements, impossible in a $4$-dimensional space (independent sets have at most $\\dim V$ elements). So $S$ spans, and being independent it is a basis.\n\n**The count cannot be dropped.**\n- *Four independent vectors in $\\mathbb{R}^5$ that are not a basis:* $\\mathbf e_1,\\mathbf e_2,\\mathbf e_3,\\mathbf e_4$. They are independent but do not span $\\mathbb{R}^5$ (they miss $\\mathbf e_5$). Here the number of vectors, $4$, is not $\\dim\\mathbb{R}^5 = 5$.\n- *Five vectors that span $\\mathbb{R}^4$ but are not a basis:* $\\mathbf e_1,\\mathbf e_2,\\mathbf e_3,\\mathbf e_4,\\ \\mathbf e_1 + \\mathbf e_2$. They span, but they are dependent ($\\mathbf e_1 + \\mathbf e_2 - (\\mathbf e_1 + \\mathbf e_2) = 0$ is a nontrivial relation). Here $5\\ne\\dim\\mathbb{R}^4$.'
		),
		open(
			C,
			'6.29',
			'Let $A$ be $m\\times n$. Prove that $\\operatorname{rank}A\\le\\min(m,n)$, and that $\\operatorname{rank}(AB)\\le\\min(\\operatorname{rank}A,\\operatorname{rank}B)$ whenever the product is defined.',
			[
				'The rank is the number of pivots. How many pivots can a matrix with $m$ rows and $n$ columns have at most?',
				'For the product, compare column spaces: every column of $AB$ is $A$ times a column of $B$, so it lies in the column space of $A$. What does that say about $\\dim C(AB)$ versus $\\dim C(A)$?',
				'For the other bound use $\\operatorname{rank}M = \\operatorname{rank}M^{\\mathsf T}$ and $(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T}$, then apply the first bound to $B^{\\mathsf T}A^{\\mathsf T}$.'
			],
			'**$\\operatorname{rank}A\\le\\min(m,n)$.** There is at most one pivot in each row and at most one in each column, so at most $\\min(m,n)$ pivots.\n\n**$\\operatorname{rank}(AB)\\le\\operatorname{rank}A$.** Each column of $AB$ equals $A\\mathbf b_j$, a combination of the columns of $A$. So $C(AB)\\subseteq C(A)$ and $\\dim C(AB)\\le\\dim C(A)$.\n\n**$\\operatorname{rank}(AB)\\le\\operatorname{rank}B$.** $\\operatorname{rank}(AB) = \\operatorname{rank}\\big((AB)^{\\mathsf T}\\big) = \\operatorname{rank}(B^{\\mathsf T}A^{\\mathsf T})\\le\\operatorname{rank}(B^{\\mathsf T}) = \\operatorname{rank}B$, using the previous inequality for the product $B^{\\mathsf T}A^{\\mathsf T}$ (with $B^{\\mathsf T}$ on the left) and that rank is unchanged by transposing.\n\nTogether: $\\operatorname{rank}(AB)\\le\\min(\\operatorname{rank}A,\\operatorname{rank}B)$.'
		),
		open(
			C,
			'6.30',
			'Show that $1,\\ \\cos t,\\ \\cos 2t$ are independent as functions on $\\mathbb{R}$, and that $1,\\ \\cos^2 t,\\ \\cos 2t$ are not.',
			[
				'Independent functions: if $a + b\\cos t + c\\cos 2t = 0$ for **every** $t$, you must get $a = b = c = 0$. Evaluate the identity at three convenient points, e.g. $t = 0, \\pi/2, \\pi$, to get three equations.',
				'For the second set, recall the double-angle identity $\\cos 2t = 2\\cos^2 t - 1$.'
			],
			'**Independent.** Suppose $a + b\\cos t + c\\cos 2t = 0$ for all $t$. At $t = 0$: $a + b + c = 0$. At $t = \\pi/2$: $a + 0 - c = 0$. At $t = \\pi$: $a - b + c = 0$. Adding the first and third gives $2a + 2c = 0$, so $a = -c$; the second says $a = c$. Hence $a = c = 0$, then $b = 0$. Only the trivial relation exists, so they are independent.\n\n**Not independent.** $\\cos 2t = 2\\cos^2 t - 1$, so $1\\cdot1 - 2\\cdot\\cos^2 t + 1\\cdot\\cos 2t$ equals $1 - 2\\cos^2 t + (2\\cos^2 t - 1) = 0$ for every $t$. That is a nontrivial relation with coefficients $(1, -2, 1)$.'
		),
		open(
			C,
			'6.31',
			'Let $M$ and $K$ be subspaces of a finite-dimensional space $V$ with $\\dim M + \\dim K > \\dim V$. Show that $M\\cap K\\ne\\{\\mathbf 0\\}$.',
			[
				'Take a basis $\\mathbf m_1,\\dots,\\mathbf m_p$ of $M$ and a basis $\\mathbf k_1,\\dots,\\mathbf k_q$ of $K$. Together they are $p + q > \\dim V$ vectors in $V$.',
				'More vectors than the dimension means they must be dependent: there is a relation $\\sum a_i\\mathbf m_i + \\sum b_j\\mathbf k_j = \\mathbf 0$ with not all coefficients zero.',
				'Move the $K$-part to the other side: $\\sum a_i\\mathbf m_i = -\\sum b_j\\mathbf k_j$. Which subspaces does this common vector lie in, and why is it nonzero?'
			],
			'The $p + q > \\dim V$ vectors $\\mathbf m_1,\\dots,\\mathbf m_p,\\mathbf k_1,\\dots,\\mathbf k_q$ are dependent, so there are scalars, not all zero, with $\\sum a_i\\mathbf m_i + \\sum b_j\\mathbf k_j = \\mathbf 0$. Let $\\mathbf x = \\sum a_i\\mathbf m_i = -\\sum b_j\\mathbf k_j$. The first expression shows $\\mathbf x\\in M$ and the second shows $\\mathbf x\\in K$, so $\\mathbf x\\in M\\cap K$.\n\nIt is nonzero: if $\\mathbf x = \\mathbf 0$ then $\\sum a_i\\mathbf m_i = \\mathbf 0$ and $\\sum b_j\\mathbf k_j = \\mathbf 0$, which forces every $a_i = 0$ and every $b_j = 0$ (each list is a basis, hence independent), contradicting "not all zero". So $M\\cap K\\ne\\{\\mathbf 0\\}$. (Example: two planes through the origin in $\\mathbb{R}^3$ always share a line.)'
		)
	]
};

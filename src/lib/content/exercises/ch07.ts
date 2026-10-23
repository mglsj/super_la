import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch07';

export const exercises: QuizBank = {
	'ch07.exercises': [
		open(
			C,
			'8.22',
			'Compute each determinant, by elimination where that is quicker.\n(a) $\\begin{vmatrix}4&7\\\\2&6\\end{vmatrix}$  (b) $\\begin{vmatrix}1&2&3\\\\0&4&5\\\\0&0&6\\end{vmatrix}$  (c) $\\begin{vmatrix}2&0&1\\\\1&3&2\\\\1&1&1\\end{vmatrix}$  (d) $\\begin{vmatrix}0&1&2\\\\1&0&3\\\\2&3&0\\end{vmatrix}$',
			[
				'For $2\\times2$: $ad - bc$. For a triangular matrix (b) the determinant is the product of the diagonal.',
				'For (c) and (d) expand along a row with a zero in it, or eliminate. Track every row swap (it flips the sign).',
				'Sanity check (c): the answer is small. Compare the sum of rows 2 and 3 with something.'
			],
			'(a) $4\\cdot6 - 7\\cdot2 = 10$.\n\n(b) Triangular, so $1\\cdot4\\cdot6 = 24$.\n\n(c) Expand along row 1: $2(3\\cdot1 - 2\\cdot1) - 0 + 1(1\\cdot1 - 3\\cdot1) = 2(1) + (-2) = 0$. The determinant is $0$ because row 2 $= -$row 1 $+\\,3\\cdot$row 3, so the rows are dependent and the matrix is singular.\n\n(d) Expand along row 1: $0 - 1(1\\cdot0 - 3\\cdot2) + 2(1\\cdot3 - 0\\cdot2) = 6 + 6 = 12$.'
		),
		open(
			C,
			'8.23',
			'Let $A\\in M_n(\\mathbb{R})$ with $\\det A = 3$. Find $\\det(2A)$, $\\det(A^2)$, $\\det(A^{\\mathsf T}A)$ and $\\det(A^{-1})$, each in terms of $n$ where necessary. Explain why $\\det(2A)\\ne2\\det A$ in general, given that the determinant is multilinear.',
			[
				'Use $\\det(AB) = \\det A\\det B$, $\\det A^{\\mathsf T} = \\det A$ and $\\det A^{-1} = 1/\\det A$.',
				'$2A$ multiplies every one of the $n$ rows by $2$. The determinant is linear in each row separately, so each row contributes a factor $2$.'
			],
			'$\\det(A^2) = 3^2 = 9$. $\\det(A^{\\mathsf T}A) = 3\\cdot3 = 9$. $\\det(A^{-1}) = \\tfrac13$.\n\n$\\det(2A) = 2^n\\cdot3$. Multilinearity gives a factor of $2$ **for each row**: $2A$ has all $n$ rows doubled, so $\\det(2A) = 2^n\\det A$. Only for $n = 1$ does this equal $2\\det A$. (Geometric check: doubling every side of an $n$-dimensional box multiplies volume by $2^n$.)'
		),
		open(
			C,
			'8.24',
			'Show that $\\det\\begin{bmatrix}1&a&a^2\\\\1&b&b^2\\\\1&c&c^2\\end{bmatrix} = (b-a)(c-a)(c-b)$. Deduce that the matrix is invertible exactly when $a, b, c$ are distinct, and say what that means about fitting a quadratic through three points.',
			[
				'Subtract row 1 from rows 2 and 3. The new entries are $b - a$, $b^2 - a^2$ and $c - a$, $c^2 - a^2$.',
				'Factor $(b-a)$ out of row 2 and $(c-a)$ out of row 3, using $b^2 - a^2 = (b-a)(b+a)$. Then expand.',
				'For the last part: the system $p(a) = y_1,\\ p(b) = y_2,\\ p(c) = y_3$ for $p = x_0 + x_1t + x_2t^2$ has this matrix.'
			],
			'After $R_2\\to R_2 - R_1$, $R_3\\to R_3 - R_1$ (determinant unchanged):\n$\\begin{vmatrix}1&a&a^2\\\\0&b-a&b^2-a^2\\\\0&c-a&c^2-a^2\\end{vmatrix}$. Pull out $(b-a)$ from row 2 and $(c-a)$ from row 3: $(b-a)(c-a)\\begin{vmatrix}1&a&a^2\\\\0&1&b+a\\\\0&1&c+a\\end{vmatrix} = (b-a)(c-a)\\big[(c+a) - (b+a)\\big] = (b-a)(c-a)(c-b)$.\n\nThis is nonzero exactly when $a, b, c$ are pairwise distinct, i.e. exactly when the matrix is invertible.\n\n**Meaning.** Finding the quadratic $p(t) = x_0 + x_1t + x_2t^2$ through $(a,y_1),(b,y_2),(c,y_3)$ means solving this matrix system for $(x_0,x_1,x_2)$. So a **unique** quadratic passes through any three points with distinct $t$-coordinates, and if two share a $t$-value there is no solution (or infinitely many).'
		),
		open(
			C,
			'8.25',
			'Let $A$ and $D$ be square. Prove that $\\det\\begin{bmatrix}A&B\\\\0&D\\end{bmatrix} = \\det A\\cdot\\det D$. Then give a $4\\times4$ example with $2\\times2$ blocks showing that $\\det\\begin{bmatrix}A&B\\\\C&D\\end{bmatrix} = \\det A\\det D - \\det B\\det C$ is false in general.',
			[
				'Fix $D$ and look at both sides as functions of the rows of $A$. Show the left side is multilinear and alternating in those rows and equals $\\det D$ when $A = I$. Then use uniqueness of the determinant.',
				'Alternatively eliminate inside the block $A$ (row operations on the top rows only) until it is triangular, then inside $D$.',
				'For the counterexample take two equal rows in the big matrix, so its determinant is $0$, but arrange $\\det B = \\det C = 0$ and $\\det A\\det D\\ne0$.'
			],
			'**Proof.** Row operations that only touch the top $k$ rows (the $A$ part) change $A$ to an upper-triangular $A\'$ (or zero out a row if $A$ is singular) and do not change the zero block below. Similarly operations on the bottom rows turn $D$ into a triangular $D\'$. The big matrix is then upper triangular with diagonal entries those of $A\'$ and $D\'$. The sign changes from swaps are the same in $\\det A\\cdot\\det D$ and in the big determinant, so the product of the diagonals gives $\\det A\\det D$. If $A$ or $D$ is singular, a zero diagonal entry appears and both sides are $0$.\n\n**Counterexample.** Take $A = D = I_2$ and $B = C = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$. Then $\\det B = \\det C = 0$, so the claimed formula gives $1\\cdot1 - 0 = 1$. But the big matrix has rows $(1,0,1,0),\\ (0,1,0,0),\\ (1,0,1,0),\\ (0,0,0,1)$: rows 1 and 3 are equal, so its determinant is $0\\ne1$.'
		),
		open(
			C,
			'8.26',
			'Suppose $Q^{\\mathsf T}Q = I_n$. Show that $\\det Q = \\pm1$, and interpret both cases geometrically using the volume theorem. Which case does the reflection of Example 8.14 fall into?',
			[
				'Take determinants of both sides of $Q^{\\mathsf T}Q = I$ and use $\\det Q^{\\mathsf T} = \\det Q$.',
				'$|\\det Q|$ is the factor by which $Q$ scales volume, and the sign says whether orientation is preserved or flipped.'
			],
			'$1 = \\det I = \\det(Q^{\\mathsf T}Q) = \\det Q^{\\mathsf T}\\det Q = (\\det Q)^2$, so $\\det Q = \\pm1$.\n\n**Geometry.** $|\\det Q| = 1$: $Q$ preserves volume (indeed lengths and angles). $\\det Q = +1$: orientation is preserved (a rotation). $\\det Q = -1$: orientation is reversed (a reflection, or a reflection combined with a rotation).\n\nA reflection flips orientation (it swaps a right hand for a left hand), so it has $\\det = -1$.'
		),
		open(
			C,
			'8.27',
			'Solve $2x + y = 5,\\ x + 3y = 10$ twice: once by Cramer rule and once by elimination. Then count the arithmetic operations each method used, and extrapolate to $n = 10$.',
			[
				'Cramer: $x = \\det A_1/\\det A$ where $A_1$ is $A$ with its first column replaced by the right side; same for $y$.',
				'Elimination: subtract a multiple of one equation from the other. Compare how the work grows with $n$: elimination is about $n^3/3$ operations, whereas computing determinants by Laplace expansion takes about $n!$.'
			],
			'$\\det A = 2\\cdot3 - 1\\cdot1 = 5$. **Cramer:** $x = \\dfrac{\\begin{vmatrix}5&1\\\\10&3\\end{vmatrix}}{5} = \\dfrac{15 - 10}{5} = 1$, $y = \\dfrac{\\begin{vmatrix}2&5\\\\1&10\\end{vmatrix}}{5} = \\dfrac{20 - 5}{5} = 3$. (3 determinants, so 6 products, 3 subtractions and 2 divisions.)\n\n**Elimination:** $R_2\\to R_2 - \\tfrac12R_1$ gives $\\tfrac52y = \\tfrac{15}2$, so $y = 3$, then $x = (5 - 3)/2 = 1$. A handful of operations.\n\n**Extrapolation.** For $n = 10$, elimination needs about $\\tfrac13\\cdot10^3\\approx330$ operations. Cramer needs $11$ determinants of $10\\times10$ matrices; by expansion each costs about $10! \\approx 3.6\\times10^6$ products. Even with elimination for each determinant, Cramer is about $n$ times slower than plain elimination. So Cramer rule is a beautiful formula, not a practical algorithm.'
		),
		open(
			C,
			'8.28',
			'Prove from the axioms alone, without the Leibniz formula, that if $f$ is multilinear and alternating then $f(A) = 0$ whenever $A$ has two proportional rows. Then show that the multilinear alternating functions on $M_n(\\mathbb{R})$ form a vector space of dimension $1$, and name a basis for it.',
			[
				'If row $j = c\\cdot$ row $i$, use linearity in row $j$ to pull out $c$. What is left has two equal rows.',
				'For the dimension: show any multilinear alternating $f$ satisfies $f(A) = f(I)\\det A$ by row-reducing $A$ (the effect of each row operation on $f$ is the same as on $\\det$).',
				'So $f\\mapsto f(I)$ is an isomorphism onto $\\mathbb{R}$.'
			],
			'**Proportional rows.** If row $j = c\\cdot$row $i$, linearity in row $j$ gives $f(A) = c\\,f(A\')$ where $A\'$ has row $j$ equal to row $i$. The alternating axiom gives $f(A\') = 0$, so $f(A) = 0$.\n\n**Dimension 1.** Multilinear alternating functions are closed under sums and scalar multiples, so they form a vector space. By Theorem 8.2 every such $f$ behaves like the determinant under row operations (swap flips sign, adding a multiple of one row to another changes nothing, scaling a row scales $f$), and $f$ vanishes on singular matrices. Reducing $A$ to $I$ (or to a matrix with a zero row) therefore gives $f(A) = f(I)\\det A$. The map $f\\mapsto f(I)$ is thus injective and linear into $\\mathbb{R}$, and surjective since $\\det$ maps to $1$. Hence the space is 1-dimensional with **basis $\\{\\det\\}$**.'
		),
		open(
			C,
			'8.29',
			'Let $T_n$ be the $n\\times n$ matrix with $2$ on the diagonal, $1$ immediately above and below, and $0$ elsewhere, as in Example 8.6. Prove that $\\det T_n = 2\\det T_{n-1} - \\det T_{n-2}$ by Laplace expansion along the first row, and deduce $\\det T_n = n + 1$.',
			[
				'Expand along row 1: it has only two nonzero entries, $2$ in column 1 and $1$ in column 2.',
				'The minor for the entry $2$ is exactly $T_{n-1}$. The minor for the entry $1$ has first column $(1,0,\\dots,0)^{\\mathsf T}$, so expand it again along that column and you get $T_{n-2}$.',
				'Start from $\\det T_1 = 2$ and $\\det T_2 = 3$ and guess the pattern.'
			],
			'Row 1 is $(2,1,0,\\dots)$, so $\\det T_n = 2\\cdot M_{11} - 1\\cdot M_{12}$. $M_{11} = \\det T_{n-1}$. The minor $M_{12}$ (delete row 1, column 2) has first column $(1,0,\\dots,0)^{\\mathsf T}$; expanding along it gives $1\\cdot\\det T_{n-2}$. Hence $\\det T_n = 2\\det T_{n-1} - \\det T_{n-2}$.\n\nWith $\\det T_1 = 2$ and $\\det T_2 = 4 - 1 = 3$, the recurrence gives $4, 5, 6,\\dots$. By induction, if $\\det T_{n-1} = n$ and $\\det T_{n-2} = n - 1$ then $\\det T_n = 2n - (n-1) = n + 1$.'
		),
		open(
			C,
			'8.30',
			'Compute $\\operatorname{sgn}(\\sigma)$ for the permutation of $\\{1,2,3,4,5\\}$ sending $(1,2,3,4,5)$ to $(3,5,1,4,2)$, by counting inversions and again by writing it as a product of transpositions. Then write down the corresponding term of the Leibniz formula.',
			[
				'An inversion is a pair of positions $i<j$ with $\\sigma(i)>\\sigma(j)$. List the pairs in $(3,5,1,4,2)$.',
				'Follow $1\\to3\\to1$, $2\\to5\\to2$ and $4\\to4$ to find the cycles; a 2-cycle is one transposition.',
				'The term is $\\operatorname{sgn}(\\sigma)\\,a_{1\\sigma(1)}a_{2\\sigma(2)}\\cdots a_{5\\sigma(5)}$.'
			],
			'**Inversions.** In $(3,5,1,4,2)$: $(3,1),(3,2),(5,1),(5,4),(5,2),(4,2)$ is $6$ inversions, an even number, so $\\operatorname{sgn} = +1$.\n\n**Transpositions.** $\\sigma = (1\\ 3)(2\\ 5)$ with $4$ fixed: two transpositions, so $\\operatorname{sgn} = (-1)^2 = +1$ ✓.\n\n**Leibniz term:** $+\\,a_{13}\\,a_{25}\\,a_{31}\\,a_{44}\\,a_{52}$.'
		)
	]
};

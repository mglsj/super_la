/** Worked exam problems for chapter 7 lessons (determinants). */
import type { Worked } from './types';

export const detByElimination: Worked = {
	title: 'a 4×4 determinant by elimination',
	problem:
		'Compute by elimination, keeping track of the effect of every row operation on the determinant:\n$$\\det\\begin{bmatrix}0&2&2&0\\\\1&2&-1&1\\\\-1&0&4&2\\\\1&2&1&5\\end{bmatrix}.$$',
	method: [
		'Keep a running factor. The three row operations do three different things:',
		'**Swap two rows**: the determinant changes sign (multiply the factor by $-1$).',
		'**Take a factor $c$ out of one row**: $\\det(\\text{old}) = c\\cdot\\det(\\text{new})$ (multiply the factor by $c$).',
		'**Add a multiple of one row to another**: no change at all. Use this for all the actual elimination.',
		'At the end the matrix is triangular: its determinant is the product of the diagonal. Answer = factor × that product.'
	],
	steps: [
		{
			label: 'Swap to get a nonzero pivot',
			text: 'The $(1,1)$ entry is $0$. Swap $R_1\\leftrightarrow R_2$: factor $= -1$.\n$$\\begin{bmatrix}1&2&-1&1\\\\0&2&2&0\\\\-1&0&4&2\\\\1&2&1&5\\end{bmatrix}$$'
		},
		{
			label: 'Factor out a 2',
			text: 'Row 2 is $2\\cdot(0,1,1,0)$. Take the $2$ out: factor $= (-1)\\cdot2 = -2$. Row 2 becomes $(0,1,1,0)$.'
		},
		{
			label: 'Clear column 1 (no change)',
			text: '$R_3 + R_1 = (0,2,3,3)$ and $R_4 - R_1 = (0,0,2,4)$.'
		},
		{
			label: 'Clear columns 2 and 3 (no change)',
			text: '$R_3 - 2R_2 = (0,0,1,3)$, then $R_4 - 2R_3 = (0,0,0,-2)$:\n$$\\begin{bmatrix}1&2&-1&1\\\\0&1&1&0\\\\0&0&1&3\\\\0&0&0&-2\\end{bmatrix}$$'
		},
		{
			label: 'Multiply out',
			text: 'Triangular determinant $= 1\\cdot1\\cdot1\\cdot(-2) = -2$. So the original determinant $= (\\text{factor})\\times(-2) = (-2)(-2) = \\mathbf{4}$.\nWrite the bookkeeping in your answer: "swap: $\\times(-1)$; factor $2$ from $R_2$: $\\times2$; the rest: no change".'
		}
	],
	credit: 'Determinants by elimination, after Strang, Chapter 5.'
};

export const detRules: Worked = {
	title: 'determinant rules for products, inverses and the adjugate',
	problem:
		'Let $A$ be a $4\\times4$ matrix with $\\det A = -3$. Find $\\det(2A)$, $\\det(A^{\\mathsf T})$, $\\det(A^{-1})$, $\\det(A^2)$ and $\\det(\\operatorname{adj}A)$.',
	method: [
		'$\\det(cA) = c^n\\det A$ for an $n\\times n$ matrix: $cA$ scales **every** row by $c$, and each row contributes one factor $c$.',
		'$\\det(AB) = \\det A\\det B$, $\\det A^{\\mathsf T} = \\det A$, and so $\\det(A^{-1}) = 1/\\det A$ (from $AA^{-1} = I$).',
		'$\\det(\\operatorname{adj}A) = (\\det A)^{n-1}$: take determinants in $A\\,\\operatorname{adj}A = (\\det A)\\,I$.',
		'Always say which rule you used and what $n$ is.'
	],
	steps: [
		{ label: 'Scaling', text: '$\\det(2A) = 2^4\\det A = 16\\cdot(-3) = -48$. (Not $2\\cdot(-3)$: all four rows are doubled.)' },
		{ label: 'Transpose and inverse', text: '$\\det A^{\\mathsf T} = -3$. $\\det(A^{-1}) = \\dfrac1{-3} = -\\dfrac13$.' },
		{ label: 'Square', text: '$\\det(A^2) = (\\det A)^2 = 9$.' },
		{
			label: 'Adjugate',
			text: 'From $A\\,\\operatorname{adj}A = (\\det A)I_4$: $\\det A\\cdot\\det(\\operatorname{adj}A) = \\det((\\det A)I_4) = (\\det A)^4$. Since $\\det A\\ne0$, $\\det(\\operatorname{adj}A) = (\\det A)^3 = (-3)^3 = -27$.'
		}
	],
	credit: 'Properties of the determinant, after Strang and Axler.'
};

export const permutationSign: Worked = {
	title: 'the sign of a permutation and its Leibniz term',
	problem:
		'Find the sign of the permutation $\\sigma$ of $\\{1,2,3,4\\}$ with $\\sigma(1) = 3$, $\\sigma(2) = 4$, $\\sigma(3) = 1$, $\\sigma(4) = 2$, and write the term of the Leibniz formula for $\\det M$ that corresponds to $\\sigma$.',
	method: [
		'Leibniz: $\\det M = \\sum_\\sigma\\operatorname{sgn}(\\sigma)\\,m_{1\\sigma(1)}m_{2\\sigma(2)}\\cdots m_{n\\sigma(n)}$: one entry from each row, in column $\\sigma(i)$.',
		'**Method 1, inversions**: write $(\\sigma(1),\\dots,\\sigma(n))$ and count pairs that are out of order. Even count: $+1$; odd: $-1$.',
		'**Method 2, cycles**: follow $1\\to\\sigma(1)\\to\\cdots$ to split $\\sigma$ into cycles. A cycle of length $k$ is $k - 1$ transpositions, so $\\operatorname{sgn} = (-1)^{\\sum(k_i - 1)}$.',
		'Doing both is a free check.'
	],
	steps: [
		{
			label: 'Inversions',
			text: 'The list is $(3,4,1,2)$. Out-of-order pairs: $(3,1), (3,2), (4,1), (4,2)$: **4** inversions, even, so $\\operatorname{sgn}\\sigma = +1$.'
		},
		{
			label: 'Cycles (check)',
			text: '$1\\to3\\to1$ and $2\\to4\\to2$: $\\sigma = (1\\,3)(2\\,4)$, two transpositions, $\\operatorname{sgn} = (-1)^2 = +1$ ✓.'
		},
		{
			label: 'Leibniz term',
			text: 'Row $i$ contributes the entry in column $\\sigma(i)$: $+\\,m_{13}\\,m_{24}\\,m_{31}\\,m_{42}$.'
		}
	],
	credit: 'Permutation expansion, after Strang, Chapter 5.'
};

export const adjugateCramer: Worked = {
	title: 'cofactors, adjugate, Cramer’s rule and volume',
	problem:
		'Let $A = \\begin{bmatrix}1&2&0\\\\0&1&1\\\\1&0&1\\end{bmatrix}$.\n(a) Compute $\\det A$ by expansion along the first row.\n(b) Find all nine cofactors, $\\operatorname{adj}A$, and $A^{-1}$.\n(c) Solve $A\\mathbf x = (0,0,3)$ by Cramer’s rule.\n(d) Find the volume of the parallelepiped spanned by the columns of $A$, and the volume of the image under $A$ of a solid of volume $5$.',
	method: [
		'Cofactor $C_{ij} = (-1)^{i+j}M_{ij}$, where the minor $M_{ij}$ is the determinant with row $i$ and column $j$ deleted. Signs follow the chessboard $\\begin{smallmatrix}+&-&+\\\\-&+&-\\\\+&-&+\\end{smallmatrix}$.',
		'Expansion along row 1: $\\det A = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}$.',
		'$\\operatorname{adj}A$ is the **transpose** of the cofactor matrix, and $A^{-1} = \\dfrac{1}{\\det A}\\operatorname{adj}A$. Check one or two entries of $A\\,\\operatorname{adj}A = (\\det A)I$.',
		'Cramer: $x_j = \\det A_j/\\det A$, where $A_j$ is $A$ with column $j$ replaced by $\\mathbf b$.',
		'Volume: $|\\det A|$. A linear map multiplies every volume by $|\\det A|$.'
	],
	steps: [
		{
			label: 'Determinant',
			text: '$\\det A = 1\\cdot\\begin{vmatrix}1&1\\\\0&1\\end{vmatrix} - 2\\cdot\\begin{vmatrix}0&1\\\\1&1\\end{vmatrix} + 0 = 1(1) - 2(-1) = 3$.'
		},
		{
			label: 'All nine cofactors',
			text: '$C_{11} = +1$, $C_{12} = -(0 - 1) = 1$, $C_{13} = +(0 - 1) = -1$;\n$C_{21} = -(2 - 0) = -2$, $C_{22} = +(1 - 0) = 1$, $C_{23} = -(0 - 2) = 2$;\n$C_{31} = +(2 - 0) = 2$, $C_{32} = -(1 - 0) = -1$, $C_{33} = +(1 - 0) = 1$.'
		},
		{
			label: 'Adjugate and inverse',
			text: 'Cofactor matrix $C = \\begin{bmatrix}1&1&-1\\\\-2&1&2\\\\2&-1&1\\end{bmatrix}$, so $\\operatorname{adj}A = C^{\\mathsf T} = \\begin{bmatrix}1&-2&2\\\\1&1&-1\\\\-1&2&1\\end{bmatrix}$ and $A^{-1} = \\dfrac13\\operatorname{adj}A$.\nCheck: row 1 of $A$ times column 1 of $\\operatorname{adj}A$: $1 + 2 + 0 = 3$ ✓; row 1 times column 2: $-2 + 2 + 0 = 0$ ✓.'
		},
		{
			label: 'Cramer’s rule',
			text: '$\\det A_1 = \\begin{vmatrix}0&2&0\\\\0&1&1\\\\3&0&1\\end{vmatrix} = 6$, $\\det A_2 = \\begin{vmatrix}1&0&0\\\\0&0&1\\\\1&3&1\\end{vmatrix} = -3$, $\\det A_3 = \\begin{vmatrix}1&2&0\\\\0&1&0\\\\1&0&3\\end{vmatrix} = 3$.\nSo $\\mathbf x = (6/3,\\ -3/3,\\ 3/3) = (2,-1,1)$. Check: $A(2,-1,1) = (2 - 2,\\ -1 + 1,\\ 2 + 1) = (0,0,3)$ ✓.'
		},
		{
			label: 'Volume',
			text: 'Parallelepiped: $|\\det A| = 3$. A solid of volume $5$ maps to a solid of volume $3\\cdot5 = 15$.'
		}
	],
	credit: 'Cofactors, Cramer’s rule and volume, after Strang, Chapter 5.'
};

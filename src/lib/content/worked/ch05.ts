/** Worked exam problems for chapter 5 lessons (independence, basis, coordinates, dimension). */
import type { Worked } from './types';

export const independenceTest: Worked = {
	title: 'testing independence and finding the relation',
	problem:
		'Decide whether $\\mathbf v_1 = (1,0,2,1)$, $\\mathbf v_2 = (2,1,3,1)$, $\\mathbf v_3 = (0,1,-1,-1)$ are linearly independent in $\\mathbb R^4$. If not, write down an explicit dependence relation.',
	method: [
		'Put the vectors in as the **columns** of a matrix $A$. Then $c_1\\mathbf v_1 + c_2\\mathbf v_2 + c_3\\mathbf v_3 = \\mathbf 0$ is exactly $A\\mathbf c = \\mathbf 0$.',
		'Row reduce. A pivot in every column means only $\\mathbf c = \\mathbf 0$ works: **independent**.',
		'A column without a pivot gives a free variable: **dependent**. Set the free variable to $1$ and solve: that null vector $\\mathbf c$ *is* the dependence relation.',
		'Always check the relation by adding up the vectors.'
	],
	steps: [
		{
			label: 'Vectors as columns',
			text: '$A = \\begin{bmatrix}1&2&0\\\\0&1&1\\\\2&3&-1\\\\1&1&-1\\end{bmatrix}$. We want all $\\mathbf c$ with $A\\mathbf c = \\mathbf 0$.'
		},
		{
			label: 'Row reduce',
			text: '$R_3 - 2R_1 = (0,-1,-1)$ and $R_4 - R_1 = (0,-1,-1)$. Then $R_3 + R_2 = \\mathbf 0$ and $R_4 + R_2 = \\mathbf 0$. Finally $R_1 - 2R_2$:\n$$\\begin{bmatrix}1&0&-2\\\\0&1&1\\\\0&0&0\\\\0&0&0\\end{bmatrix}$$\nColumn 3 has no pivot, so $c_3$ is free: **dependent**.'
		},
		{
			label: 'Read off the relation',
			text: 'Set $c_3 = 1$: row 2 gives $c_2 = -1$, row 1 gives $c_1 = 2$. So $2\\mathbf v_1 - \\mathbf v_2 + \\mathbf v_3 = \\mathbf 0$.'
		},
		{
			label: 'Check',
			text: '$2(1,0,2,1) - (2,1,3,1) + (0,1,-1,-1) = (2 - 2 + 0,\\ 0 - 1 + 1,\\ 4 - 3 - 1,\\ 2 - 1 - 1) = (0,0,0,0)$ ✓. Equivalently $\\mathbf v_3 = \\mathbf v_2 - 2\\mathbf v_1$.'
		}
	],
	credit: 'Independence as "only the trivial solution of $A\\mathbf c = \\mathbf 0$", after Strang.'
};

export const basisParameter: Worked = {
	title: 'for which values is it a basis?',
	problem: 'Find all real $a$ for which $(1,0,a)$, $(0,1,1)$, $(a,1,2)$ form a basis of $\\mathbb R^3$.',
	method: [
		'$n$ vectors in $\\mathbb R^n$ form a basis $\\iff$ they are independent $\\iff$ the square matrix with them as columns is invertible $\\iff$ its **determinant is nonzero**.',
		'Compute the determinant as a polynomial in $a$, factor it, and exclude its roots.',
		'At an excluded value, say *why* it fails: exhibit the dependence.'
	],
	steps: [
		{
			label: 'Determinant',
			text: '$\\det\\begin{bmatrix}1&0&a\\\\0&1&1\\\\a&1&2\\end{bmatrix} = 1(1\\cdot2 - 1\\cdot1) - 0 + a(0\\cdot1 - 1\\cdot a) = 1 - a^2 = (1 - a)(1 + a)$.'
		},
		{ label: 'Answer', text: 'A basis exactly when $1 - a^2\\ne0$, i.e. for **every real $a$ except $a = 1$ and $a = -1$**.' },
		{
			label: 'Explain the failures',
			text: 'For $a = 1$: $(1,0,1) + (0,1,1) = (1,1,2)$, the third vector, so they are dependent. For $a = -1$: $-(1,0,-1) + (0,1,1) = (-1,1,2)$, again the third vector.'
		}
	],
	credit: 'Determinant test for a basis of $\\mathbb R^n$, after Strang.'
};

export const polyIndependence: Worked = {
	title: 'independence of polynomials',
	problem: 'Are $1 - t$, $t - t^2$ and $1 - t^2$ linearly independent in $P_2$? Justify.',
	method: [
		'Translate to coordinates in the standard basis $(1, t, t^2)$: each polynomial becomes a vector in $\\mathbb R^3$.',
		'Polynomials are independent exactly when their coordinate vectors are (coordinates are an isomorphism).',
		'Test with a determinant or row reduction; if dependent, give the relation.'
	],
	steps: [
		{
			label: 'Coordinates',
			text: '$1 - t\\mapsto(1,-1,0)$, $t - t^2\\mapsto(0,1,-1)$, $1 - t^2\\mapsto(1,0,-1)$.'
		},
		{
			label: 'Determinant',
			text: '$\\det\\begin{bmatrix}1&0&1\\\\-1&1&0\\\\0&-1&-1\\end{bmatrix} = 1(-1 - 0) - 0 + 1(1 - 0) = 0$. So they are **dependent**.'
		},
		{
			label: 'The relation',
			text: '$(1 - t) + (t - t^2) = 1 - t^2$. So $(1 - t) + (t - t^2) - (1 - t^2) = 0$ is a nontrivial relation.\n(Compare $1 + t,\\ t + t^2,\\ 1 + t^2$: change the signs and the answer can change, so always compute.)'
		}
	],
	credit: 'Coordinates turn questions in $P_n$ into questions in $\\mathbb R^{n+1}$, after Axler.'
};

export const intersectionDim: Worked = {
	title: 'how big must an intersection be?',
	problem:
		'(a) $U$ and $W$ are subspaces of $\\mathbb R^5$ with $\\dim U = 3$ and $\\dim W = 4$. What is the smallest possible $\\dim(U\\cap W)$?\n(b) Can two planes through the origin in $\\mathbb R^3$ meet only at $\\mathbf 0$?',
	method: [
		'Use the formula $\\dim(U + W) = \\dim U + \\dim W - \\dim(U\\cap W)$.',
		'$U + W$ is a subspace of the whole space, so $\\dim(U + W)\\le n$.',
		'Combine: $\\dim(U\\cap W)\\ge\\dim U + \\dim W - n$. If that is positive, the intersection cannot be $\\{\\mathbf 0\\}$.',
		'For "smallest possible", also give an example that attains the bound.'
	],
	steps: [
		{ label: 'Apply the bound', text: '$\\dim(U\\cap W) = 3 + 4 - \\dim(U + W)\\ge3 + 4 - 5 = 2$.' },
		{
			label: 'Show 2 is attained',
			text: 'Take $U = \\operatorname{span}\\{\\mathbf e_1,\\mathbf e_2,\\mathbf e_3\\}$ and $W = \\operatorname{span}\\{\\mathbf e_2,\\mathbf e_3,\\mathbf e_4,\\mathbf e_5\\}$. Then $U\\cap W = \\operatorname{span}\\{\\mathbf e_2,\\mathbf e_3\\}$, dimension $2$. So the minimum is **2**.'
		},
		{
			label: 'Two planes in R³',
			text: '$\\dim(U\\cap W)\\ge2 + 2 - 3 = 1$, so two planes through the origin always share at least a line: **no**, they cannot meet only at $\\mathbf 0$. (If they are the same plane the intersection is 2-dimensional.)'
		}
	],
	credit: 'Dimension of a sum, after Axler, Chapter 2.'
};

export const commutant: Worked = {
	title: 'a subspace of matrices',
	problem:
		'Let $J = \\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$. Find a basis and the dimension of $W = \\{X\\in M_2(\\mathbb R) : XJ = JX\\}$.',
	method: [
		'$W$ is a subspace because $X\\mapsto XJ - JX$ is linear and $W$ is its kernel.',
		'Write a general $X = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$, multiply out **both** products, and set them equal entry by entry.',
		'Solve the resulting linear equations on $a, b, c, d$ with free parameters, and read off one matrix per free parameter.'
	],
	steps: [
		{
			label: 'Multiply out',
			text: '$XJ = \\begin{bmatrix}a&2a + b\\\\c&2c + d\\end{bmatrix}$ and $JX = \\begin{bmatrix}a + 2c&b + 2d\\\\c&d\\end{bmatrix}$.'
		},
		{
			label: 'Compare entries',
			text: '- $(1,1)$: $a = a + 2c$, so $c = 0$.\n- $(1,2)$: $2a + b = b + 2d$, so $a = d$.\n- $(2,1)$: $c = c$, no information.\n- $(2,2)$: $2c + d = d$, so $c = 0$ again.'
		},
		{
			label: 'Basis and dimension',
			text: '$X = \\begin{bmatrix}a&b\\\\0&a\\end{bmatrix} = a\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix} + b\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$, with $a, b$ free. Basis $\\left\\{I,\\ \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}\\right\\}$, $\\dim W = 2$.\nCheck: both commute with $J$ ($I$ commutes with everything; $E_{12}J = E_{12} = JE_{12}$).'
		}
	],
	credit: 'Subspaces of matrix spaces, in the style of Axler.'
};

export const coords3d: Worked = {
	title: 'coordinates in a basis of R³',
	problem:
		'Let $B = \\big((1,2,0),\\ (0,1,1),\\ (1,0,1)\\big)$.\n(a) Show that $B$ is a basis of $\\mathbb R^3$.\n(b) Find $[\\mathbf x]_B$ for $\\mathbf x = (2,3,-1)$.\n(c) Find $\\mathbf v$ with $[\\mathbf v]_B = (1,2,-1)$.',
	method: [
		'Basis: put the vectors as columns of $P$ and check $\\det P\\ne0$ (3 independent vectors in $\\mathbb R^3$ span).',
		'$[\\mathbf x]_B$: solve $P\\mathbf c = \\mathbf x$, i.e. $c_1\\mathbf b_1 + c_2\\mathbf b_2 + c_3\\mathbf b_3 = \\mathbf x$, by elimination. Keep the **order** of the basis.',
		'From coordinates to the vector: just compute $\\mathbf v = c_1\\mathbf b_1 + c_2\\mathbf b_2 + c_3\\mathbf b_3 = P\\mathbf c$. No solving needed.',
		'Check by rebuilding $\\mathbf x$ from your coordinates.'
	],
	steps: [
		{
			label: 'It is a basis',
			text: '$\\det P = \\det\\begin{bmatrix}1&0&1\\\\2&1&0\\\\0&1&1\\end{bmatrix} = 1(1 - 0) - 0 + 1(2 - 0) = 3\\ne0$. So the three columns are independent, hence a basis of $\\mathbb R^3$.'
		},
		{
			label: 'Set up the system',
			text: '$c_1(1,2,0) + c_2(0,1,1) + c_3(1,0,1) = (2,3,-1)$ gives\n$$c_1 + c_3 = 2,\\qquad 2c_1 + c_2 = 3,\\qquad c_2 + c_3 = -1.$$'
		},
		{
			label: 'Solve',
			text: 'From the first, $c_3 = 2 - c_1$; from the second, $c_2 = 3 - 2c_1$. Substituting in the third: $(3 - 2c_1) + (2 - c_1) = -1$, so $c_1 = 2$. Then $c_2 = -1$ and $c_3 = 0$.\n$[\\mathbf x]_B = (2, -1, 0)$. Check: $2(1,2,0) - (0,1,1) = (2,3,-1)$ ✓.'
		},
		{
			label: 'Coordinates back to a vector',
			text: '$\\mathbf v = 1\\cdot(1,2,0) + 2\\cdot(0,1,1) - 1\\cdot(1,0,1) = (0,\\ 4,\\ 1)$.'
		}
	],
	credit: 'Coordinates as the solution of $P\\mathbf c = \\mathbf x$, after Strang.'
};

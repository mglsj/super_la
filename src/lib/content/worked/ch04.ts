/** Worked exam problems for chapter 4 lessons. */
import type { Worked } from './types';

export const fourSubspaces: Worked = {
	title: 'bases for the subspaces of a matrix',
	problem:
		'Let $A = \\begin{bmatrix}1&3&1&2\\\\2&6&3&5\\\\1&3&0&1\\end{bmatrix}$.\n(a) Find the reduced row echelon form $R$ of $A$ and the pivot columns.\n(b) Find bases for $C(A)$, the row space $R(A)$ and $N(A)$.\n(c) State the rank and nullity and check them against the number of columns.\n(d) Find the condition on $\\mathbf b = (b_1,b_2,b_3)$ for $A\\mathbf x = \\mathbf b$ to be solvable.',
	method: [
		'Row reduce all the way to RREF: pivots equal to $1$, zeros above and below each pivot.',
		'$C(A)$: the pivot columns **of the original $A$** (row operations change the column space, so do not take columns of $R$).',
		'$R(A)$: the nonzero rows **of $R$** (row operations do not change the row space).',
		'$N(A)$: solve $R\\mathbf x = \\mathbf 0$; one basis vector per free variable (set that free variable to $1$, the others to $0$).',
		'Solvability: reduce the augmented matrix $[A\\mid\\mathbf b]$ keeping $b_1,b_2,b_3$ as letters. Every zero row of $R$ gives one condition "right-hand side $= 0$".'
	],
	steps: [
		{
			label: 'Eliminate',
			text: '$R_2 - 2R_1 = (0,0,1,1)$ and $R_3 - R_1 = (0,0,-1,-1)$. Then $R_3 + R_2 = \\mathbf 0$. Clear above the second pivot with $R_1 - R_2 = (1,3,0,1)$:\n$$R = \\begin{bmatrix}1&3&0&1\\\\0&0&1&1\\\\0&0&0&0\\end{bmatrix}.$$\nPivots in **columns 1 and 3**; columns 2 and 4 are free.'
		},
		{
			label: 'Column space and row space',
			text: '$C(A)$: columns 1 and 3 of $A$: $\\{(1,2,1),\\ (1,3,0)\\}$.\n$R(A)$: nonzero rows of $R$: $\\{(1,3,0,1),\\ (0,0,1,1)\\}$.'
		},
		{
			label: 'Null space',
			text: '$R\\mathbf x = \\mathbf 0$ says $x_1 = -3x_2 - x_4$ and $x_3 = -x_4$.\n- $x_2 = 1, x_4 = 0$: $(-3,1,0,0)$.\n- $x_2 = 0, x_4 = 1$: $(-1,0,-1,1)$.\nBasis of $N(A)$: $\\{(-3,1,0,0),\\ (-1,0,-1,1)\\}$. Check one: $A(-1,0,-1,1) = (-1 - 1 + 2,\\ -2 - 3 + 5,\\ -1 + 0 + 1) = \\mathbf 0$ ✓.'
		},
		{
			label: 'Rank–nullity',
			text: '$\\operatorname{rank}A = 2$ (two pivots), nullity $= 2$ (two free variables), and $2 + 2 = 4$ = number of columns ✓.'
		},
		{
			label: 'Condition on b',
			text: 'Do the same row operations on $\\mathbf b$: $R_2 - 2R_1$ gives $b_2 - 2b_1$; $R_3 - R_1$ gives $b_3 - b_1$; then $R_3 + R_2$ gives $(b_3 - b_1) + (b_2 - 2b_1)$. The zero row of $R$ forces\n$$-3b_1 + b_2 + b_3 = 0.$$\nCheck with the pivot columns: $(1,2,1)$ gives $-3 + 2 + 1 = 0$ ✓, $(1,3,0)$ gives $-3 + 3 + 0 = 0$ ✓. The vector $(-3,1,1)$ spans the left null space $N(A^{\\mathsf T})$, and $C(A)$ is exactly the plane perpendicular to it.'
		}
	],
	credit: 'The four fundamental subspaces, after Strang.'
};

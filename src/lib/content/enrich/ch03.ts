import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch03.matrix-times-vector.1': {
		hints: [
			'A matrix times a vector is a combination of the columns: $1\\cdot\\text{col}_1 + 1\\cdot\\text{col}_2$.',
			'Columns are $(1,3)$ and $(2,4)$. Add them.'
		]
	},
	'ch03.matrix-times-vector.2': {
		hints: [
			'Combine the columns: $3\\cdot(2,1) + 2\\cdot(-1,1)$.',
			'Or row by row: first entry $2\\cdot3 + (-1)\\cdot2$, second entry $1\\cdot3 + 1\\cdot2$.'
		]
	},
	'ch03.matrix-times-vector.3': {
		hints: [
			'Multiply $A$ by $(1,0)$ and see which column you pick out.',
			'The matrix times $\\hat\\imath$ is exactly the first column.'
		],
		notes: [
			'Right. $A\\hat\\imath = $ column 1, so the first column is where $\\hat\\imath$ lands.',
			'No. $A\\hat\\jmath$ is the second column.',
			'No. The determinant combines both columns; one column alone does not give it.',
			'No. A matrix does not have a length in this sense.'
		]
	},
	'ch03.matrix-times-vector.4': {
		hints: [
			'A $90^\\circ$ counter-clockwise rotation sends $\\hat\\imath = (1,0)$ to $(0,1)$ (up).',
			'It sends $\\hat\\jmath = (0,1)$ to $(-1,0)$ (left). Those two outputs are the columns.'
		]
	},
	'ch03.matrix-times-vector.5': {
		hints: [
			'$A\\mathbf x$ is a combination of the columns of $A$ with weights $x_1, x_2, \\dots$',
			'So which vectors $\\mathbf b$ can be written as such combinations?'
		],
		notes: [
			'Right. $A\\mathbf x = \\mathbf b$ means $\\mathbf b$ is a combination of the columns, i.e. in their span.',
			'No. $\\mathbf b = \\mathbf 0$ is always reachable (take $\\mathbf x = \\mathbf 0$), but other $\\mathbf b$ can be reachable too.',
			'No. The identity reaches everything, but many other matrices reach the right-hand sides they need.',
			'No. The length of $\\mathbf x$ is irrelevant to whether a solution exists.'
		]
	},
	'ch03.composition.1': {
		hints: [
			'Apply $BA$ to a vector $\\mathbf x$: $(BA)\\mathbf x = B(A\\mathbf x)$. Which matrix touches $\\mathbf x$ first?',
			'The matrix next to the vector acts first.'
		],
		notes: [
			'Right. In $B(A\\mathbf x)$, $A$ acts on $\\mathbf x$ first and $B$ acts on the result.',
			'No. That would be $AB$, where $B$ is next to the vector.',
			'No. Composition is sequential: one transformation after the other.',
			'No. Composition is not addition; $A + B$ is a different matrix.'
		]
	},
	'ch03.composition.2': {
		hints: [
			'Top-left entry of $AB$ = (row 1 of $A$) $\\cdot$ (column 1 of $B$).',
			'Row 1 of $A$ is $(1,1)$ and column 1 of $B$ is $(1,1)$.'
		]
	},
	'ch03.composition.3': {
		hints: [
			'The first column of $AB$ is $A$ times the first column of $B$.',
			'First column of $B$ is $(1,1)$. Compute $A\\binom11$.'
		]
	},
	'ch03.composition.4': {
		hints: [
			'Try the two matrices from the previous questions: compute $AB$ and $BA$ and compare their top-left entries.',
			'$A$ is a shear in the $x$-direction and $B$ a shear in the $y$-direction. Does the order of the two shears matter?'
		],
		notes: [
			'Right. For example $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ and $\\begin{bmatrix}1&0\\\\1&1\\end{bmatrix}$ give different products in the two orders.',
			'No. Doing "A then B" is usually different from "B then A": putting on socks and then shoes is not the same as the reverse.',
			'No. Non-commutativity already shows up in $2\\times2$ matrices.',
			'No. The signs of entries do not decide it.'
		]
	},
	'ch03.composition.5': {
		hints: [
			'Matrix multiplication is associative: only the order of the matrices matters, not how you bracket them.',
			'Both $(AB)C$ and $A(BC)$ mean "apply $C$, then $B$, then $A$".'
		],
		notes: [
			'Right. Both sides mean: apply $C$, then $B$, then $A$.',
			'No. That reverses the order, and order matters.',
			'No. $(BA)C$ swaps $A$ and $B$, which changes the product in general.',
			'No. Associativity needs no condition on the matrices.'
		]
	},
	'ch03.inverse.1': {
		hints: [
			'For $\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ the inverse is $\\dfrac1{ad - bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$.',
			'Here $ad - bc = 2\\cdot1 - 1\\cdot1 = 1$. The top-right entry is $-b$.'
		]
	},
	'ch03.inverse.2': {
		hints: [
			'Compute the determinant $ad - bc$.',
			'$1\\cdot4 - 2\\cdot2$. A matrix is invertible exactly when this is nonzero.'
		],
		notes: [
			'Right. $\\det = 1\\cdot4 - 2\\cdot2 = 0$; the second column is twice the first, so the matrix squashes the plane onto a line.',
			'No. The determinant is $ad - bc = 0$, not $4$ (that is just $ad$).',
			'No. The determinant is $0$, not $-1$.',
			'No. A zero determinant means singular over any field of numbers.'
		]
	},
	'ch03.inverse.3': {
		hints: [
			'Use the $2\\times2$ inverse formula $\\dfrac1{ad - bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$.',
			'$\\det = 3\\cdot2 - 1\\cdot5 = 1$. The bottom-right entry of the inverse is $a/\\det$.'
		]
	},
	'ch03.inverse.4': {
		hints: [
			'To undo "$B$ then $A$"... first undo the last step. What is the last step in $AB$?',
			'Check by multiplying: $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$.'
		],
		notes: [
			'Right. To undo $AB$ (apply $B$ then $A$), undo $A$ first, then undo $B$: $B^{-1}A^{-1}$.',
			'No. $A^{-1}B^{-1}$ undoes in the wrong order; like taking off your socks before your shoes.',
			'No. Inverses do not add: $(AB)^{-1}$ is a product.',
			'No. $(BA)^{-1} = A^{-1}B^{-1}$, which differs from $(AB)^{-1}$ in general.'
		]
	},
	'ch03.inverse.5': {
		hints: [
			'An inverse must send each output back to one input.',
			'If two different vectors land on the same point of the line, which one should the inverse send it back to?'
		],
		notes: [
			'Right. Squashing loses information: many inputs share one output, so the map cannot be reversed.',
			'No. Large entries do not stop a matrix from being invertible.',
			'No. Lines have length; the problem is that distinct vectors collapse to one.',
			'No. The number of columns is not the issue; collapse is.'
		]
	},
	'ch03.lu.1': {
		hints: [
			'The multiplier is (the entry to eliminate) divided by (the pivot above it).',
			'$6 / 2$.'
		]
	},
	'ch03.lu.2': {
		hints: [
			'After $R_2 - \\ell R_1$ the bottom-right entry is $5 - \\ell\\cdot1$.',
			'With $\\ell = 3$: $5 - 3$.'
		]
	},
	'ch03.lu.3': {
		hints: [
			'$L$ records the multipliers used in elimination. Where do they sit relative to the diagonal?',
			'Each multiplier $\\ell_{ij}$ is stored below the diagonal; the diagonal itself is $1$s.'
		],
		notes: [
			'Right. $L$ stores the multipliers below a diagonal of ones.',
			'No. $U$ is the upper triangular factor.',
			'No. A diagonal $L$ would mean no elimination steps were needed.',
			'No. $L$ always has this triangular shape.'
		]
	},
	'ch03.lu.4': {
		hints: [
			'Write $A\\mathbf x = LU\\mathbf x = \\mathbf b$ and let $\\mathbf y = U\\mathbf x$.',
			'Two triangular systems are easy: solve $L\\mathbf y = \\mathbf b$ from the top, then $U\\mathbf x = \\mathbf y$ from the bottom.'
		],
		notes: [
			'Right. Two triangular solves cost far less than elimination and reuse the factorisation for many right-hand sides.',
			'Works but wasteful: computing $A^{-1}$ costs much more than two triangular solves.',
			'No, it is a systematic method, not a guess.',
			'No. Multiplying back gives $A$ again, and you still have to solve.'
		]
	},
	'ch03.lu.5': {
		hints: [
			'Each elimination step divides by the pivot.',
			'What happens if the pivot is $0$? Try $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$.'
		],
		notes: [
			'Right. A zero pivot means you cannot divide; a row swap is needed (giving $PA = LU$).',
			'No. Symmetric matrices can still have a zero pivot.',
			'No. Integer entries do not prevent a zero pivot.',
			'No. It does break down, for example for $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$.'
		]
	}
};

import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch10.generalized-eigenvectors.1': {
		hints: [
			'Row 1 of $N$ is $(0,1)$, row 2 is $(0,0)$.',
			'First entry $= 0\\cdot3 + 1\\cdot2$, second entry $= 0$.'
		]
	},
	'ch10.generalized-eigenvectors.2': {
		hints: [
			'Compute $N^2 = N\\cdot N$ by multiplying the matrix by itself.',
			'$N$ shifts $(a,b)\\mapsto(b,0)$; shifting twice sends everything to $\\mathbf 0$.'
		]
	},
	'ch10.generalized-eigenvectors.3': {
		hints: [
			'An ordinary eigenvector has $(A - \\lambda I)\\mathbf v = \\mathbf 0$. A generalised one is allowed to need more applications.',
			'Think of $N = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$: $N\\mathbf e_2\\ne\\mathbf 0$, but $N^2\\mathbf e_2 = \\mathbf 0$.'
		],
		notes: [
			'Right. Some power of $A - \\lambda I$ kills $\\mathbf v$; eigenvectors are the case $k = 1$.',
			'No. That is the ordinary eigenvector, the special case $k = 1$.',
			'No. Orthogonality is unrelated to the definition.',
			'No. $A^k = \\lambda^kI$ would make $A$ scalar, which is much too strong.'
		]
	},
	'ch10.jordan-blocks.1': {
		hints: [
			'Multiply $J\\cdot J$: top-right entry is (row 1 of $J$) $\\cdot$ (column 2 of $J$).',
			'Row 1 is $(3,1)$ and column 2 is $(1,3)$.'
		]
	},
	'ch10.jordan-blocks.2': {
		hints: [
			'A Jordan block of size $>1$ has a $1$ above the diagonal and cannot be diagonalised.',
			'So if the Jordan form is diagonal, all blocks must be $1\\times1$.'
		],
		notes: [
			'Right. A diagonal Jordan form means every block is $1\\times1$; any bigger block contains a shear.',
			'No. One big block is the most defective case; it is diagonalisable only if its size is $1$.',
			'No. A zero eigenvalue does not affect diagonalisability.',
			'No. Blocks can repeat in a diagonalisable matrix, e.g. $2I$.'
		]
	},
	'ch10.jordan-blocks.3': {
		hints: [
			'Each Jordan block contains exactly one true eigenvector (the bottom of its chain).',
			'The number of independent eigenvectors for $\\lambda$ is its geometric multiplicity.'
		],
		notes: [
			'Right. Blocks and independent eigenvectors correspond one-to-one, so the count is $\\dim\\ker(A - \\lambda I)$.',
			'No. That counts the total size of all blocks for $\\lambda$, not the number of blocks.',
			'No. The matrix size is much larger than the number of blocks for a single eigenvalue.',
			'No. The absolute value of the eigenvalue is irrelevant here.'
		]
	}
};

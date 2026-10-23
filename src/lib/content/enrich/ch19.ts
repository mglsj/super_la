import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch19.kronecker-product.1': {
		hints: [
			'$A\\otimes B$ replaces each entry $a_{ij}$ by the block $a_{ij}B$.',
			'$A$ has 2 block rows, each block has 4 rows: $2\\cdot4$.'
		]
	},
	'ch19.kronecker-product.2': {
		hints: [
			'The block in block-row 1, block-column 2 is $a_{12}B = 2B$.',
			'Row 1, column 4 is the top-right entry of that block, which is $2\\cdot B_{12}$.'
		]
	},
	'ch19.kronecker-product.3': {
		hints: [
			'Eigenvalues of $A\\otimes B$ are all products $\\lambda_i\\mu_j$.',
			'The largest product is $3\\cdot7$.'
		]
	},
	'ch19.kronecker-product.4': {
		hints: [
			'Multiply block by block: $(A\\otimes B)(C\\otimes D)$ has blocks $\\sum a_{ik}Cc\\ldots$ Try a $1\\times1$ case first: $(ab)(cd) = (ac)(bd)$.',
			'Products pair up the first factors together and the second factors together.'
		],
		notes: [
			'Right. The factors pair up: the first with the first, the second with the second.',
			'No. That would pair $A$ with $D$, which fails for non-square shapes.',
			'No. $A\\otimes B$ and $B\\otimes A$ differ (they are only permutation-similar).',
			'No. The inverse is $A^{-1}\\otimes B^{-1}$; both factors must be inverted.'
		]
	},
	'ch19.vectorisation.1': {
		hints: [
			'Column-stacking: $\\operatorname{vec}(AXB)$ takes $X\\mapsto AXB$. Test with $B = I$: $\\operatorname{vec}(AX) = (I\\otimes A)\\operatorname{vec}X$.',
			'Test with $A = I$: $\\operatorname{vec}(XB) = (B^{\\mathsf T}\\otimes I)\\operatorname{vec}X$. Combine the two.'
		],
		notes: [
			'Right. $\\operatorname{vec}(AXB) = (B^{\\mathsf T}\\otimes A)\\operatorname{vec}(X)$.',
			'No. The order and the transpose are off: $B$ must appear transposed on the left of the Kronecker symbol.',
			'No. The transpose belongs on $B$, not $A$.',
			'No. $B$ should be transposed and placed first, with $A$ untransposed.'
		]
	},
	'ch19.vectorisation.2': {
		hints: [
			'$B^{\\mathsf T}\\otimes A$ is $(10\\cdot10)\\times(10\\cdot10)$.',
			'$100\\times100$ entries.'
		]
	},
	'ch19.vectorisation.3': {
		hints: [
			'Compare costs: two $n\\times n$ products cost about $2n^3$, the Kronecker matrix has $n^4$ entries.',
			'Doing it with the Kronecker matrix would use a lot of memory and time.'
		],
		notes: [
			'Right. $(AX)B$ costs $2n^3$ with no extra memory.',
			'No. That has $n^4$ entries and costs $n$ times more.',
			'No. Inversion is unnecessary and expensive.',
			'No. Cramer rule would be catastrophically slow.'
		]
	},
	'ch19.vectorisation.4': {
		hints: [
			'Ratio $=\\dfrac{n^4}{2n^3} = \\dfrac n2$.',
			'$n/2$ with $n = 1000$.'
		]
	},
	'ch19.tensors.1': {
		hints: [
			'Order = number of indices. Row, column, channel.',
			'Height, width and colour channel: three indices.'
		]
	},
	'ch19.tensors.2': {
		hints: [
			'A rank-one matrix is an outer product $a_ib_j$. A rank-one 3-way tensor is the analogue with three factors.',
			'Each index gets its own vector, multiplied together.'
		],
		notes: [
			'Right. $T = \\mathbf a\\otimes\\mathbf b\\otimes\\mathbf c$ has entries $a_ib_jc_k$.',
			'No. That adds the vectors instead of multiplying, and does not give a rank-one tensor.',
			'No. That would use one index for all three vectors, only filling the diagonal.',
			'No. A maximum is not multilinear.'
		]
	},
	'ch19.tensors.3': {
		hints: [
			'For matrices rank is easy (Gaussian elimination), and best low-rank approximations always exist (SVD). Which of those survive for tensors?',
			'None of them: tensor rank is much wilder than matrix rank.'
		],
		notes: [
			'Right. Hastad showed deciding the rank of a tensor is NP-hard.',
			'No. Gaussian elimination computes matrix rank, not tensor rank.',
			'No. It can: a real tensor may have rank 3 over the reals and rank 2 over the complex numbers.',
			'No. Best rank-$k$ approximations can fail to exist (the set of low-rank tensors is not closed).'
		]
	},
	'ch19.tensors.4': {
		hints: [
			'The unfolding keeps all the entries, just rearranged in a rectangle.',
			'A $2\\times2\\times2$ tensor has $2\\cdot2\\cdot2$ entries.'
		]
	}
};

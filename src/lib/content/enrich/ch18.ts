import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch18.data-as-matrix.1': {
		hints: [
			'$\\cos\\theta = \\dfrac{\\mathbf a\\cdot\\mathbf b}{\\lVert\\mathbf a\\rVert\\lVert\\mathbf b\\rVert}$.',
			'$\\mathbf a\\cdot\\mathbf b = 1$, $\\lVert\\mathbf a\\rVert = 1$, $\\lVert\\mathbf b\\rVert = \\sqrt2$.'
		]
	},
	'ch18.data-as-matrix.2': {
		hints: ['Multiply matching entries and add.', '$2\\cdot(-1) + 1\\cdot3$.']
	},
	'ch18.data-as-matrix.3': {
		hints: [
			'Entry $(i,j)$ of $EE^{\\mathsf T}$ is (row $i$ of $E$) $\\cdot$ (row $j$ of $E$).',
			'So it holds all pairwise dot products between item vectors.'
		],
		notes: [
			'Right. $(EE^{\\mathsf T})_{ij} = \\mathbf e_i\\cdot\\mathbf e_j$, the similarity of items $i$ and $j$.',
			'No. The singular values are the square roots of the eigenvalues of $EE^{\\mathsf T}$, not its entries.',
			'No. $EE^{\\mathsf T}$ is not an inverse of $E$ in general.',
			'No. The diagonal holds the squared norms; the off-diagonal entries hold the similarities.'
		]
	},
	'ch18.data-as-matrix.4': {
		hints: [
			'Cosine similarity is $\\cos$ of the angle between the vectors.',
			'Scaling a vector changes its length but not its direction. What happens to the cosine?'
		],
		notes: [
			'Right. It depends only on the angle, so multiplying a vector by a positive number changes nothing.',
			'No. Length is divided out by the normalisation.',
			'No. The sum of entries is unrelated.',
			'No. The determinant is not defined for two vectors.'
		]
	},
	'ch18.layers-nonlinearity.1': {
		hints: [
			'Compose: $W_2(W_1\\mathbf x) = (W_2W_1)\\mathbf x$ by associativity.',
			'A product of matrices is a single matrix.'
		],
		notes: [
			'Right. Without a nonlinearity, depth adds no expressive power: the whole stack collapses to one matrix.',
			'No. Compositions of linear maps stay linear.',
			'No. $W_2W_1$ is not the identity in general.',
			'No. The sum of the matrices is a different map.'
		]
	},
	'ch18.layers-nonlinearity.2': {
		hints: [
			'ReLU replaces negative entries by $0$ and keeps positive ones.',
			'$(2, 0, 0.5)$, then add.'
		]
	},
	'ch18.layers-nonlinearity.3': {
		hints: [
			'The weight matrix has one row per output and one column per input.',
			'$50\\times100$ entries.'
		]
	},
	'ch18.layers-nonlinearity.4': {
		hints: [
			'ReLU is linear ($t\\mapsto t$) on the positive side of each coordinate and zero on the negative side.',
			'Where the pieces meet, the map has a crease.'
		],
		notes: [
			'Right. ReLU is piecewise linear; the creases lie on hyperplanes $x_i = 0$.',
			'No. A rotation preserves lengths, but ReLU does not.',
			'No. It does not flatten everything; it only flattens the negative parts.',
			'No. It is not invertible: all negative inputs collapse to $0$.'
		]
	},
	'ch18.attention.1': {
		hints: [
			'Softmax is $e^{s_i}/\\sum_je^{s_j}$.',
			'Exponentials are positive, and dividing by their sum forces the total to be $1$.'
		],
		notes: [
			'Right. They are positive weights summing to $1$, like probabilities.',
			'No. Exponentials are always positive.',
			'No. The outputs are between $0$ and $1$.',
			'No. Softmax changes the scores into weights.'
		]
	},
	'ch18.attention.2': {
		hints: [
			'$e^0 = 1$ for both scores.',
			'Each weight is $1/(1 + 1)$.'
		]
	},
	'ch18.attention.3': {
		hints: [
			'The score matrix has $n^2$ entries.',
			'Replace $n$ by $2n$: $(2n)^2 = ?\\cdot n^2$.'
		]
	},
	'ch18.attention.4': {
		hints: [
			'The softmax weights sum to $1$.',
			'The output multiplies each value vector by its weight and adds them.'
		],
		notes: [
			'Right. The weights are the softmax of the scores, so the output is a convex combination of the values.',
			'No. Attention is soft, not a hard maximum.',
			'No. The query only determines the weights.',
			'No. The output is built from the values, not the sum of queries.'
		]
	},
	'ch18.low-rank-adapters.1': {
		hints: ['$B$ is $d\\times r$ and $A$ is $r\\times d$.', '$2\\cdot1000\\cdot8$.']
	},
	'ch18.low-rank-adapters.2': {
		hints: [
			'Percentage $=\\dfrac{16{,}000}{1{,}000{,}000}\\times100$.',
			'$16{,}000/10^6 = 0.016$.'
		]
	},
	'ch18.low-rank-adapters.3': {
		hints: [
			'$BA$ has columns that are combinations of the $r$ columns of $B$.',
			'So the column space has dimension at most $r$.'
		],
		notes: [
			'Right. $\\operatorname{rank}(BA)\\le\\min(\\operatorname{rank}B,\\operatorname{rank}A)\\le r$.',
			'No. A product that factors through an $r$-dimensional space cannot have rank $d$.',
			'No. It could be smaller than $r$ but not necessarily at least $r$.',
			'No. It is generally up to $r$, not $1$.'
		]
	},
	'ch18.low-rank-adapters.4': {
		hints: [
			'Rank of a product is at most the smaller of the two ranks.',
			'$\\operatorname{rank}B\\le3$ and $\\operatorname{rank}A\\le3$.'
		]
	}
};

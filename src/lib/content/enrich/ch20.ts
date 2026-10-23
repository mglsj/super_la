import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch20.perron-frobenius.1': {
		hints: [
			'Positive matrices push every positive vector to another positive vector.',
			'So the dominant direction that survives repeated pushing is a positive vector with a positive stretch factor.'
		],
		notes: [
			'Right. Perron: the dominant eigenvalue is real, positive and simple, with a strictly positive eigenvector.',
			'No. A real positive matrix has a real dominant eigenvalue (other eigenvalues may be complex, but smaller in modulus).',
			'No. The dominant eigenvalue lies between the smallest and largest row sums, which are positive.',
			'No. It is at least the smallest row sum, which is positive.'
		]
	},
	'ch20.perron-frobenius.2': {
		hints: [
			'The matrix has rank 1. Its eigenvectors are $(1,1)$ and $(1,-1)$.',
			'$A(1,1) = (2,2) = 2(1,1)$.'
		]
	},
	'ch20.perron-frobenius.3': {
		hints: [
			'This is the power method. Write the start vector in the eigenbasis.',
			'The Perron eigenvalue is strictly dominant, so its component wins.'
		],
		notes: [
			'Right. After enough steps the vector points along the Perron eigenvector.',
			'No. We normalise at each step, so the length does not shrink.',
			'No. The limit is determined by the matrix, not random.',
			'No. The vector changes at each step and converges to the Perron direction.'
		]
	},
	'ch20.perron-frobenius.4': {
		hints: [
			'Irreducible means you cannot split the indices into two groups with no way to get from one to the other.',
			'In the graph this says: every vertex can reach every other along directed edges.'
		],
		notes: [
			'Right. Strongly connected digraph $\\iff$ irreducible matrix.',
			'No. Symmetry is a different property.',
			'No. Invertibility is not determined by the graph alone.',
			'No. Orthogonality is unrelated.'
		]
	},
	'ch20.markov-chains.1': {
		hints: [
			'Each column describes where one state goes next: probabilities.',
			'Probabilities are nonnegative and add to $1$.'
		],
		notes: [
			'Right. Each column is a probability distribution over the next state.',
			'No. Probabilities cannot sum to $0$.',
			'No. A state may go to several others.',
			'No. Columns are not required to be orthogonal.'
		]
	},
	'ch20.markov-chains.2': {
		hints: [
			'The eigenvalues add up to the trace.',
			'$1 + \\lambda_2 = 1.3$.'
		]
	},
	'ch20.markov-chains.3': {
		hints: [
			'Normalise $(0.4,0.3)$ so that the entries sum to $1$.',
			'Divide by $0.4 + 0.3 = 0.7$ and read the first entry.'
		]
	},
	'ch20.markov-chains.4': {
		hints: [
			'The error shrinks along the second eigenvector by $\\lambda_2$ each step.',
			'After $k$ steps the error is multiplied by $|\\lambda_2|^k$.'
		],
		notes: [
			'Right. The deviation from the steady state is scaled by $\\lambda_2^k$.',
			'No. That is a much slower rate than geometric convergence.',
			'No. Only special chains with $\\lambda_2 = 0$ converge in one step.',
			'No. A mixing chain does reach its steady state in the limit.'
		]
	},
	'ch20.pagerank.1': {
		hints: [
			'Imagine a surfer clicking random links forever. Which page do they spend most time on?',
			'That long-run fraction of time is the steady-state distribution.'
		],
		notes: [
			'Right. PageRank is the stationary distribution of the random surfer chain.',
			'No. That is the in-degree, which is much easier to manipulate and less meaningful.',
			'No. PageRank is an eigenvector, not a singular value.',
			'No. The determinant is a single number, not a ranking.'
		]
	},
	'ch20.pagerank.2': {
		hints: [
			'Perron–Frobenius needs a positive (or at least irreducible primitive) matrix.',
			'Damping mixes in a uniform jump to any page, making every entry positive.'
		],
		notes: [
			'Right. The teleportation term makes the matrix positive, so Perron guarantees a unique ranking and convergence.',
			'No. Damping is mathematical, not about page loading.',
			'No. It adds teleportation, but does not remove links.',
			'No. Damping does not make the matrix orthogonal.'
		]
	},
	'ch20.pagerank.3': {
		hints: [
			'Solve $0.85^k<0.01$ by taking logs: $k>\\ln0.01/\\ln0.85$.',
			'$\\ln0.01\\approx-4.605$ and $\\ln0.85\\approx-0.1625$.'
		]
	},
	'ch20.pagerank.4': {
		hints: [
			'With $d = 0$ the surfer always teleports to a uniformly random page.',
			'4 pages with equal probability: $1/4$ each.'
		]
	}
};

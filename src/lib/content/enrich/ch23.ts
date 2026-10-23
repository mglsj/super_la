import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch23.random-projections.1': {
		hints: [
			'Each entry of $G\\mathbf x$ is $\\mathbf g_i^{\\mathsf T}\\mathbf x$ with variance $\\lVert\\mathbf x\\rVert^2/k$.',
			'There are $k$ entries, so the total expected squared length is $k\\cdot\\lVert\\mathbf x\\rVert^2/k$.'
		],
		notes: [
			'Right. The $1/k$ in the variance cancels the $k$ output entries, so lengths are preserved on average.',
			'No. That would be the answer if the entries had variance 1 instead of $1/k$.',
			'No. $\\lVert G\\mathbf x\\rVert^2$ is a squared length, which is positive on average.',
			'No. That would be the case if you divided twice.'
		]
	},
	'ch23.random-projections.2': {
		hints: [
			'Substitute $k = 50$ into $\\sqrt{2/k}$.',
			'$\\sqrt{2/50} = \\sqrt{0.04}$.'
		]
	},
	'ch23.random-projections.3': {
		hints: [
			'The squared length is an average of $k$ independent pieces; averages concentrate as $k$ grows.',
			'The spread of an average of $k$ independent terms shrinks like $1/\\sqrt k$.'
		],
		notes: [
			'Right. More dimensions give more averaging, so the relative spread decreases like $1/\\sqrt k$.',
			'No. Larger $k$ means better preservation.',
			'No. It improves with $k$.',
			'No. The distortion is random and shrinks, but never becomes exactly zero for $k$ finite.'
		]
	},
	'ch23.random-projections.4': {
		hints: [
			'Oblivious means independent of something. Of what?',
			'The same random matrix works for any data set; you draw it before looking at the points.'
		],
		notes: [
			'Right. The matrix is drawn from a fixed distribution without seeing the data, yet works with high probability.',
			'No. It uses the data when projecting, it just did not use it to choose the matrix.',
			'No. All coordinates are mixed.',
			'No. Invertibility is not the point.'
		]
	},
	'ch23.johnson-lindenstrauss.1': {
		hints: [
			'The bound is $k\\ge C\\ln(m)/\\varepsilon^2$.',
			'Notice which symbols appear: $m$ and $\\varepsilon$, but not the original dimension $n$.'
		],
		notes: [
			'Right. $k$ depends on $\\ln m$ and $1/\\varepsilon^2$; the ambient dimension never enters.',
			'No. The original dimension is not in the formula.',
			'No. It depends on how many points and how accurately.',
			'No. The specific values do not matter, only how many points there are.'
		]
	},
	'ch23.johnson-lindenstrauss.2': {
		hints: [
			'Number of pairs $=\\binom{m}{2} = \\dfrac{m(m-1)}{2}$.',
			'$20\\cdot19/2$.'
		]
	},
	'ch23.johnson-lindenstrauss.3': {
		hints: [
			'$k\\propto\\varepsilon^{-2}$, so with $\\varepsilon\\to\\varepsilon/2$ we get $(\\varepsilon/2)^{-2}$.',
			'$(\\varepsilon/2)^{-2} = 4\\varepsilon^{-2}$.'
		]
	},
	'ch23.johnson-lindenstrauss.4': {
		hints: [
			'Concentration says each pair fails with small probability $\\delta$. We need all $\\binom m2$ pairs to succeed at the same time.',
			'The probability of at least one failure is at most the sum of the individual failure probabilities.'
		],
		notes: [
			'Right. Union bound: total failure probability $\\le\\binom m2\\delta$, small once $\\delta\\ll1/m^2$.',
			'No. The SVD does not appear in the proof.',
			'No. The proof uses probability, not elimination.',
			'No. Determinants are not involved.'
		]
	},
	'ch23.randomised-svd.1': {
		hints: [
			'The idea: multiply $A$ by a few random vectors; the results span roughly the dominant column space.',
			'A sketch of the column space is $A\\Omega$ for a random matrix $\\Omega$.'
		],
		notes: [
			'Right. $Y = A\\Omega$ captures the dominant directions of the column space; then orthonormalise $Y$ into $Q$.',
			'No. $A$ need not even be square.',
			'No. $\\Omega^{\\mathsf T}\\Omega$ has no information about $A$.',
			'No. The determinant is a single number.'
		]
	},
	'ch23.randomised-svd.2': {
		hints: [
			'The number of columns of $\\Omega$ is the target rank plus the oversampling.',
			'$r + p$.'
		]
	},
	'ch23.randomised-svd.3': {
		hints: [
			'$Q$ has only $r + p$ columns, so $Q^{\\mathsf T}A$ has $r + p$ rows.',
			'Computing the SVD of a short, fat matrix is far cheaper than computing it for the full $A$.'
		],
		notes: [
			'Right. $B$ is $(r+p)\\times n$, much smaller than $A$, so its SVD is cheap.',
			'No. $B$ has fewer rows than $A$.',
			'No. $B = Q^{\\mathsf T}A$ is zero only if $A$ is orthogonal to the range of $Q$.',
			'No. $B$ is not square in general.'
		]
	},
	'ch23.randomised-svd.4': {
		hints: [
			'With exactly $r$ random vectors you might miss part of the top-$r$ subspace.',
			'A few extra vectors make a miss extremely unlikely.'
		],
		notes: [
			'Right. A few extra samples make the error close to the optimal $\\sigma_{r+1}$ with very high probability.',
			'No. Squareness is not the purpose.',
			'No. It reduces the error.',
			'No. It is still random; it only makes it more reliable.'
		]
	}
};

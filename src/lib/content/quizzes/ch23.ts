import type { QuizBank } from '../types';

export const ch23: QuizBank = {
	'ch23.random-projections': [
		{
			id: 'ch23.random-projections.1',
			type: 'mcq',
			prompt: 'For a Gaussian $G$ with $N(0,1/k)$ entries, $\\mathbb{E}\\|G\\mathbf x\\|^2$ equals…',
			choices: ['$\\|\\mathbf x\\|^2$', '$k\\|\\mathbf x\\|^2$', '$0$', '$\\|\\mathbf x\\|^2/k$'],
			answer: 0,
			explain: 'The $1/k$ scaling is chosen exactly so that lengths are preserved on average.'
		},
		{
			id: 'ch23.random-projections.2',
			type: 'numeric',
			prompt: 'The relative spread of $\\|G\\mathbf x\\|^2/\\|\\mathbf x\\|^2$ is about $\\sqrt{2/k}$. What is it for $k = 50$?',
			answer: 0.2,
			explain: '$\\sqrt{2/50} = \\sqrt{0.04} = 0.2$.'
		},
		{
			id: 'ch23.random-projections.3',
			type: 'mcq',
			prompt: 'As the target dimension $k$ grows, the distortion of lengths…',
			choices: ['shrinks like $1/\\sqrt k$', 'grows', 'stays the same', 'becomes exactly 0 for $k\\ge2$'],
			answer: 0,
			explain: 'More random directions give a better average.'
		},
		{
			id: 'ch23.random-projections.4',
			type: 'mcq',
			prompt: 'A random projection is called "oblivious" because it…',
			choices: [
				'is chosen without looking at the data',
				'forgets the data',
				'ignores the first coordinate',
				'cannot be inverted'
			],
			answer: 0,
			explain: 'The same random matrix works for any data, which makes it cheap.'
		}
	],
	'ch23.johnson-lindenstrauss': [
		{
			id: 'ch23.johnson-lindenstrauss.1',
			type: 'mcq',
			prompt: 'In the Johnson–Lindenstrauss lemma, the needed target dimension depends on…',
			choices: [
				'the number of points $m$ and the accuracy $\\varepsilon$, not on the original dimension',
				'the original dimension only',
				'nothing',
				'the entries of the points'
			],
			answer: 0,
			explain: '$k = O(\\varepsilon^{-2}\\log m)$.'
		},
		{
			id: 'ch23.johnson-lindenstrauss.2',
			type: 'numeric',
			prompt: 'How many pairwise distances are there among $m = 20$ points?',
			answer: 190,
			explain: '$\\binom{20}{2} = 20\\cdot19/2 = 190$.'
		},
		{
			id: 'ch23.johnson-lindenstrauss.3',
			type: 'numeric',
			prompt: 'Since $k \\propto \\varepsilon^{-2}$, halving $\\varepsilon$ multiplies the required $k$ by…',
			answer: 4,
			explain: '$(1/2)^{-2} = 4$.'
		},
		{
			id: 'ch23.johnson-lindenstrauss.4',
			type: 'mcq',
			prompt: 'The proof combines concentration for a single vector with…',
			choices: ['a union bound over all pairs', 'the SVD', 'Gaussian elimination', 'a determinant'],
			answer: 0,
			explain: 'Each pair fails with exponentially small probability, so a logarithmic $k$ survives all pairs.'
		}
	],
	'ch23.randomised-svd': [
		{
			id: 'ch23.randomised-svd.1',
			type: 'mcq',
			prompt: 'In the randomised range finder the sketch is…',
			choices: ['$Y = A\\Omega$ with a random $\\Omega$', '$Y = A^{-1}$', '$Y = \\Omega^{\\mathsf T}\\Omega$', '$Y = \\det A$'],
			answer: 0,
			explain: 'The columns of $A\\Omega$ are random combinations of the columns of $A$ and capture its dominant range.'
		},
		{
			id: 'ch23.randomised-svd.2',
			type: 'numeric',
			prompt: 'Target rank $r = 10$ with oversampling $p = 5$. How many columns does $\\Omega$ have?',
			answer: 15,
			explain: '$r + p = 15$.'
		},
		{
			id: 'ch23.randomised-svd.3',
			type: 'mcq',
			prompt: 'After finding $Q$, the matrix $B = Q^{\\mathsf T}A$ is…',
			choices: ['small, so its SVD is cheap', 'larger than $A$', 'always zero', 'the identity'],
			answer: 0,
			explain: 'It has only $r+p$ rows, so a full SVD of $B$ costs little.'
		},
		{
			id: 'ch23.randomised-svd.4',
			type: 'mcq',
			prompt: 'What does oversampling ($p>0$) do?',
			choices: [
				'It makes the approximation closer to optimal with high probability',
				'It makes the matrix square',
				'It increases the error',
				'It removes the randomness'
			],
			answer: 0,
			explain: 'A few extra sketch columns protect against unlucky random directions.'
		}
	]
};

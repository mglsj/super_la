import type { QuizBank } from '../types';

export const ch20: QuizBank = {
	'ch20.perron-frobenius': [
		{
			id: 'ch20.perron-frobenius.1',
			type: 'mcq',
			prompt: 'Perron\'s theorem says a matrix with all positive entries has a dominant eigenvalue that is…',
			choices: ['real and positive, with a positive eigenvector', 'complex', 'negative', 'zero'],
			answer: 0,
			explain: 'It is a simple root, strictly larger in magnitude than every other eigenvalue.'
		},
		{
			id: 'ch20.perron-frobenius.2',
			type: 'numeric',
			prompt: 'Find the dominant eigenvalue of $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$.',
			answer: 2,
			explain: 'The eigenvalues are $2$ (eigenvector $(1,1)$) and $0$.'
		},
		{
			id: 'ch20.perron-frobenius.3',
			type: 'mcq',
			prompt: 'Repeatedly applying a positive matrix to a positive starting vector (and normalising) converges to…',
			choices: ['the Perron eigenvector', 'the zero vector', 'a random direction', 'the starting vector'],
			answer: 0,
			explain: 'This is the power method. The convergence rate is $|\\lambda_2|/\\rho$.'
		},
		{
			id: 'ch20.perron-frobenius.4',
			type: 'mcq',
			prompt: 'The directed graph of a nonnegative matrix must be strongly connected for the matrix to be…',
			choices: ['irreducible', 'symmetric', 'invertible', 'orthogonal'],
			answer: 0,
			explain: 'Irreducibility means every state can eventually reach every other, which is what Frobenius needs.'
		}
	],
	'ch20.markov-chains': [
		{
			id: 'ch20.markov-chains.1',
			type: 'mcq',
			prompt: 'In a column-stochastic transition matrix, each column…',
			choices: ['is nonnegative and sums to 1', 'sums to 0', 'has a single entry', 'is orthogonal to the others'],
			answer: 0,
			explain: 'Column $j$ lists the probabilities of moving from state $j$ to each state, so it is a distribution.'
		},
		{
			id: 'ch20.markov-chains.2',
			type: 'numeric',
			prompt: 'A two-state chain has $P = \\begin{bmatrix}0.7&0.4\\\\0.3&0.6\\end{bmatrix}$. What is its second eigenvalue? (The trace is $1.3$ and one eigenvalue is $1$.)',
			answer: 0.3,
			explain: 'Eigenvalues sum to the trace: $1 + \\lambda_2 = 1.3$, so $\\lambda_2 = 0.3$.'
		},
		{
			id: 'ch20.markov-chains.3',
			type: 'numeric',
			prompt: 'For the same $P$ the steady state is proportional to $(b, a) = (0.4, 0.3)$. What is the steady-state probability of state 1? (Decimal.)',
			answer: 0.571,
			tol: 0.01,
			explain: '$0.4/(0.4 + 0.3) = 4/7 \\approx 0.571$. Check: $P\\boldsymbol\\pi = \\boldsymbol\\pi$.'
		},
		{
			id: 'ch20.markov-chains.4',
			type: 'mcq',
			prompt: 'How fast does a mixing Markov chain approach its steady state?',
			choices: [
				'Like $|\\lambda_2|^k$',
				'Like $1/k$',
				'In exactly one step',
				'It never does'
			],
			answer: 0,
			explain: 'The second eigenvalue sets the geometric rate; a larger spectral gap $1 - |\\lambda_2|$ means faster mixing.'
		}
	],
	'ch20.pagerank': [
		{
			id: 'ch20.pagerank.1',
			type: 'mcq',
			prompt: 'PageRank is…',
			choices: [
				'the steady-state distribution of a random surfer',
				'the number of links to a page',
				'the largest singular value of the web graph',
				'the determinant of the link matrix'
			],
			answer: 0,
			explain: 'It is the Perron eigenvector of the damped link matrix.'
		},
		{
			id: 'ch20.pagerank.2',
			type: 'mcq',
			prompt: 'Why is damping used?',
			choices: [
				'It makes all entries positive, so Perron\'s theorem guarantees a unique answer',
				'It makes pages load faster',
				'It removes all links',
				'It makes the matrix orthogonal'
			],
			answer: 0,
			explain: 'With probability $1-d$ the surfer jumps to a random page, which also fixes dangling pages.'
		},
		{
			id: 'ch20.pagerank.3',
			type: 'numeric',
			prompt: 'With damping $d$, the power method converges like $d^k$. With $d = 0.85$, about how many iterations are needed to cut the error below $0.01$ ($0.85^k < 0.01$)?',
			answer: 29,
			tol: 1,
			explain: '$k > \\ln(0.01)/\\ln(0.85) \\approx 28.3$, so about $29$ iterations.'
		},
		{
			id: 'ch20.pagerank.4',
			type: 'numeric',
			prompt: 'At damping $d = 0$ on a 4-page web, what is the PageRank of each page?',
			answer: 0.25,
			explain: 'The surfer always jumps to a uniformly random page, so all four pages get $1/4$.'
		}
	]
};

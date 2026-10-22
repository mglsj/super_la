import type { QuizBank } from '../types';

export const ch18: QuizBank = {
	'ch18.data-as-matrix': [
		{
			id: 'ch18.data-as-matrix.1',
			type: 'numeric',
			prompt: 'What is the cosine similarity of $(1, 0)$ and $(1, 1)$? (Decimal.)',
			answer: 0.7071,
			tol: 0.01,
			explain: '$\\dfrac{1\\cdot1 + 0\\cdot1}{1\\cdot\\sqrt2} = \\dfrac{1}{\\sqrt2} \\approx 0.7071$, which is $\\cos45^\\circ$.'
		},
		{
			id: 'ch18.data-as-matrix.2',
			type: 'numeric',
			prompt: 'Compute the dot product $(2, 1)\\cdot(-1, 3)$.',
			answer: 1,
			explain: '$2\\cdot(-1) + 1\\cdot3 = 1$.'
		},
		{
			id: 'ch18.data-as-matrix.3',
			type: 'mcq',
			prompt: 'If the rows of $E$ are item vectors, what does $EE^{\\mathsf T}$ contain?',
			choices: [
				'The dot-product similarity between every pair of items',
				'The singular values of $E$',
				'The inverse of $E$',
				'Only the diagonal of $E$'
			],
			answer: 0,
			explain: 'Entry $(i,j)$ of $EE^{\\mathsf T}$ is (row $i$)·(row $j$).'
		},
		{
			id: 'ch18.data-as-matrix.4',
			type: 'mcq',
			prompt: 'Cosine similarity compares two vectors by…',
			choices: ['direction only, ignoring length', 'length only', 'the sum of their entries', 'their determinant'],
			answer: 0,
			explain: 'Dividing by $\\|\\mathbf q\\|\\|\\mathbf v\\|$ removes the effect of scaling either vector.'
		}
	],
	'ch18.layers-nonlinearity': [
		{
			id: 'ch18.layers-nonlinearity.1',
			type: 'mcq',
			prompt: 'Two linear layers with no nonlinearity in between, $W_2(W_1\\mathbf x)$, are equivalent to…',
			choices: ['a single linear layer $W_2W_1$', 'a nonlinear function', 'the identity', 'a layer with $W_1 + W_2$'],
			answer: 0,
			explain: 'Matrix multiplication is associative, so $W_2(W_1\\mathbf x) = (W_2W_1)\\mathbf x$.'
		},
		{
			id: 'ch18.layers-nonlinearity.2',
			type: 'numeric',
			prompt: 'Apply ReLU, $\\max(0, t)$, to each entry of $(2, -3, 0.5)$ and add up the results.',
			answer: 2.5,
			explain: 'ReLU gives $(2, 0, 0.5)$, with sum $2.5$.'
		},
		{
			id: 'ch18.layers-nonlinearity.3',
			type: 'numeric',
			prompt: 'A layer maps 100 inputs to 50 outputs with a weight matrix (no bias). How many parameters?',
			answer: 5000,
			explain: 'The matrix is $50\\times100$, so it has $5000$ entries.'
		},
		{
			id: 'ch18.layers-nonlinearity.4',
			type: 'mcq',
			prompt: 'What does the ReLU do geometrically to the input plane?',
			choices: [
				'It folds it along hyperplanes, producing piecewise-linear pieces',
				'It rotates it',
				'It makes it perfectly flat',
				'It inverts it'
			],
			answer: 0,
			explain: 'Each unit is linear where it is "on" and zero where it is "off", with a bend between.'
		}
	],
	'ch18.attention': [
		{
			id: 'ch18.attention.1',
			type: 'mcq',
			prompt: 'The softmax of a score vector returns numbers that are…',
			choices: ['positive and sum to 1', 'negative', 'between $-1$ and $1$', 'equal to the scores'],
			answer: 0,
			explain: '$e^{s_i}/\\sum_j e^{s_j}$ is positive and the entries sum to 1: a probability distribution.'
		},
		{
			id: 'ch18.attention.2',
			type: 'numeric',
			prompt: 'The scores are $(0, 0)$. What is the first attention weight after softmax?',
			answer: 0.5,
			explain: 'Equal scores give equal weights: $e^0/(e^0 + e^0) = 1/2$.'
		},
		{
			id: 'ch18.attention.3',
			type: 'numeric',
			prompt: 'Doubling the sequence length $n$ multiplies the size of the $n\\times n$ score matrix by…',
			answer: 4,
			explain: '$(2n)^2 = 4n^2$. This quadratic growth is the main cost of attention.'
		},
		{
			id: 'ch18.attention.4',
			type: 'mcq',
			prompt: 'The output of an attention head for one query is…',
			choices: ['a weighted average of the value vectors', 'the largest key', 'the query itself', 'the sum of all queries'],
			answer: 0,
			explain: 'The softmax weights multiply the rows of $V$ and are added together.'
		}
	],
	'ch18.low-rank-adapters': [
		{
			id: 'ch18.low-rank-adapters.1',
			type: 'numeric',
			prompt: 'For $d = 1000$ and rank $r = 8$, how many parameters are in $B$ and $A$ together ($2dr$)?',
			answer: 16000,
			explain: '$2\\cdot1000\\cdot8 = 16000$.'
		},
		{
			id: 'ch18.low-rank-adapters.2',
			type: 'numeric',
			prompt: 'A full update has $d^2 = 1{,}000{,}000$ parameters. What percentage is the 16,000 of the low-rank update?',
			answer: 1.6,
			explain: '$16000/1{,}000{,}000 = 1.6\\%$.'
		},
		{
			id: 'ch18.low-rank-adapters.3',
			type: 'mcq',
			prompt: 'The matrix $BA$ with $B\\in\\mathbb{R}^{d\\times r}$ and $A\\in\\mathbb{R}^{r\\times d}$ has rank…',
			choices: ['at most $r$', 'exactly $d$', 'at least $r$', 'always 1'],
			answer: 0,
			explain: 'Every column of $BA$ is a combination of the $r$ columns of $B$.'
		},
		{
			id: 'ch18.low-rank-adapters.4',
			type: 'numeric',
			prompt: '$B$ is $10\\times3$ and $A$ is $3\\times10$. What is the maximum possible rank of $BA$?',
			answer: 3,
			explain: 'The rank cannot exceed the shared inner dimension $3$.'
		}
	]
};

import type { QuizBank } from '../types';

export const ch24: QuizBank = {
	'ch24.semicircle-law': [
		{
			id: 'ch24.semicircle-law.1',
			type: 'numeric',
			prompt: 'Eigenvalues of a large symmetric random matrix with entry variance $1/n$ fill $[-a, a]$. What is $a$?',
			answer: 2,
			explain: 'Wigner\'s semicircle has density $\\frac{1}{2\\pi}\\sqrt{4 - x^2}$ on $[-2, 2]$.'
		},
		{
			id: 'ch24.semicircle-law.2',
			type: 'numeric',
			prompt: 'For such a matrix, the average of the squared eigenvalues, $\\tfrac1n\\operatorname{tr}(W^2)$, is about…',
			answer: 1,
			explain: '$\\sum_{ij}W_{ij}^2 \\approx n^2\\cdot\\tfrac1n = n$, so dividing by $n$ gives $1$.'
		},
		{
			id: 'ch24.semicircle-law.3',
			type: 'mcq',
			prompt: 'The semicircle law is "universal". This means the limit depends on the entries only through…',
			choices: ['their variance', 'their exact distribution', 'their sign', 'their number of digits'],
			answer: 0,
			explain: 'Gaussian, $\\pm1$ and uniform entries with the same variance give the same limit.'
		},
		{
			id: 'ch24.semicircle-law.4',
			type: 'mcq',
			prompt: 'Why are the eigenvalues of a random symmetric matrix real?',
			choices: ['The spectral theorem for symmetric matrices', 'Because they are random', 'Because $n$ is large', 'They are not always real'],
			answer: 0,
			explain: 'Every real symmetric matrix has real eigenvalues, random or not.'
		}
	],
	'ch24.marchenko-pastur': [
		{
			id: 'ch24.marchenko-pastur.1',
			type: 'numeric',
			prompt: 'For aspect ratio $c = n/m = 0.25$, the lower edge of the Marchenko–Pastur support is $(1 - \\sqrt c)^2$. Compute it.',
			answer: 0.25,
			explain: '$\\sqrt{0.25} = 0.5$, so $(1 - 0.5)^2 = 0.25$.'
		},
		{
			id: 'ch24.marchenko-pastur.2',
			type: 'numeric',
			prompt: 'For $c = 0.25$, what is the upper edge $(1+\\sqrt c)^2$?',
			answer: 2.25,
			explain: '$(1 + 0.5)^2 = 2.25$.'
		},
		{
			id: 'ch24.marchenko-pastur.3',
			type: 'mcq',
			prompt: 'The true covariance of the data is the identity. The sample covariance eigenvalues are…',
			choices: [
				'spread over an interval around 1, wider when $n/m$ is larger',
				'all exactly 1',
				'all zero',
				'all equal to $n/m$'
			],
			answer: 0,
			explain: 'Finite samples blur the true spectrum. Raw sample eigenvalues are biased: the largest are too big, the smallest too small.'
		},
		{
			id: 'ch24.marchenko-pastur.4',
			type: 'numeric',
			prompt: 'For $c = 1$ (as many samples as variables), what is the lower edge $(1 - \\sqrt c)^2$?',
			answer: 0,
			explain: 'The smallest eigenvalues approach $0$: the sample covariance becomes nearly singular.'
		}
	],
	'ch24.initialisation': [
		{
			id: 'ch24.initialisation.1',
			type: 'numeric',
			prompt: 'A linear random network scales the signal by $\\sigma = 1.1$ per layer. By roughly what factor after 20 layers? (Decimal.)',
			answer: 6.73,
			tol: 0.1,
			explain: '$1.1^{20} \\approx 6.73$. Slightly too large a scale compounds exponentially.'
		},
		{
			id: 'ch24.initialisation.2',
			type: 'numeric',
			prompt: 'He initialisation uses weight variance $2/n_{\\text{in}}$. For $n_{\\text{in}} = 50$, what is the variance?',
			answer: 0.04,
			explain: '$2/50 = 0.04$.'
		},
		{
			id: 'ch24.initialisation.3',
			type: 'mcq',
			prompt: 'A ReLU network with weight scale $\\sigma$ has a per-layer signal gain of about…',
			choices: ['$\\sigma/\\sqrt2$', '$\\sigma$', '$2\\sigma$', '$\\sigma^2$'],
			answer: 0,
			explain: 'ReLU zeroes about half of the entries, removing half of the squared length.'
		},
		{
			id: 'ch24.initialisation.4',
			type: 'mcq',
			prompt: 'Why can orthogonal initialisation be better than Gaussian for very deep networks?',
			choices: [
				'All singular values are exactly 1, so products stay well-conditioned',
				'It makes weights larger',
				'It removes the need for training',
				'It makes the network linear'
			],
			answer: 0,
			explain: 'Products of Gaussian matrices develop a wide spread of singular values; products of orthogonal ones do not.'
		}
	]
};

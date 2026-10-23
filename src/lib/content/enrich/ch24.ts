import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch24.semicircle-law.1': {
		hints: [
			'The semicircle on $[-a,a]$ has second moment $a^2/4$ (the density is $\\tfrac{2}{\\pi a^2}\\sqrt{a^2 - x^2}$).',
			'The second moment must equal the variance normalisation $1$, so $a^2/4 = 1$.'
		]
	},
	'ch24.semicircle-law.2': {
		hints: [
			'$\\operatorname{tr}(W^2) = \\sum_{i,j}W_{ij}^2$ has $n^2$ terms, each with expected value $1/n$.',
			'Divide the total $n$ by $n$.'
		]
	},
	'ch24.semicircle-law.3': {
		hints: [
			'Universality means different entry distributions (Gaussian, $\\pm1$, uniform...) give the same limiting eigenvalue density.',
			'What do all of those share? They all have mean $0$ and the same variance.'
		],
		notes: [
			'Right. Only the mean and variance (here $0$ and $1/n$) matter for the limit shape.',
			'No. That would make it non-universal.',
			'No. Signs do not determine the limit.',
			'No. The number of digits is irrelevant.'
		]
	},
	'ch24.semicircle-law.4': {
		hints: [
			'A random symmetric matrix is still a symmetric matrix.',
			'Which theorem guarantees real eigenvalues for symmetric matrices?'
		],
		notes: [
			'Right. Symmetry alone forces real eigenvalues, regardless of how the entries were chosen.',
			'No. Randomness does not create realness; the structure does.',
			'No. Even small symmetric matrices have real eigenvalues.',
			'No. For symmetric matrices they are always real.'
		]
	},
	'ch24.marchenko-pastur.1': {
		hints: [
			'First take the square root of the aspect ratio: $\\sqrt{0.25} = 0.5$.',
			'Then compute $(1 - 0.5)^2$.'
		]
	},
	'ch24.marchenko-pastur.2': {
		hints: [
			'First take the square root of the aspect ratio: $\\sqrt{0.25} = 0.5$.',
			'Then compute $(1 + 0.5)^2$.'
		]
	},
	'ch24.marchenko-pastur.3': {
		hints: [
			'With finitely many samples, sample eigenvalues fluctuate around the true value $1$.',
			'The fewer samples per variable ($m/n$ smaller), the more the eigenvalues spread out.'
		],
		notes: [
			'Right. They fill the Marchenko–Pastur interval $[(1-\\sqrt c)^2,(1+\\sqrt c)^2]$, which is wider for larger $c = n/m$.',
			'No. That would be true only in the limit $m\\to\\infty$ with $n$ fixed.',
			'No. The sample covariance is positive and nonzero.',
			'No. The eigenvalues are not all equal to $c$; they are spread around 1.'
		]
	},
	'ch24.marchenko-pastur.4': {
		hints: ['$(1 - \\sqrt1)^2 = (1 - 1)^2$.', 'The support touches $0$: the sample covariance becomes nearly singular.']
	},
	'ch24.initialisation.1': {
		hints: [
			'Each layer multiplies the signal by $1.1$, so after $20$ layers the factor is $1.1^{20}$.',
			'$1.1^{20} = e^{20\\ln1.1}\\approx e^{1.906}$.'
		]
	},
	'ch24.initialisation.2': {
		hints: ['Substitute $n_{\\text{in}} = 50$.', '$2/50$.']
	},
	'ch24.initialisation.3': {
		hints: [
			'ReLU zeroes out about half of the entries, so only about half of the squared signal survives.',
			'Half of the energy means the length shrinks by $\\sqrt{1/2} = 1/\\sqrt2$ on top of the weight scale.'
		],
		notes: [
			'Right. The weight scale $\\sigma$ is divided by $\\sqrt2$ because ReLU discards half of the signal energy.',
			'Incomplete. That ignores the nonlinearity, which removes about half of the energy.',
			'No. ReLU does not amplify; it zeroes out negative entries.',
			'No. $\\sigma^2$ would be the gain in squared length for a linear layer, not for the length.'
		]
	},
	'ch24.initialisation.4': {
		hints: [
			'A product of many matrices has singular values that are products of the individual ones.',
			'If every layer has all singular values equal to $1$, the product also has all singular values equal to $1$.'
		],
		notes: [
			'Right. For an orthogonal $W$, $\\kappa = 1$, and products of orthogonal matrices stay orthogonal: signals and gradients are neither amplified nor shrunk.',
			'No. Orthogonal matrices do not make weights larger.',
			'No. Training is still needed to learn useful weights.',
			'No. Nonlinearities keep the network nonlinear.'
		]
	}
};

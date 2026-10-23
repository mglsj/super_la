import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch16.floating-point.1': {
		hints: [
			'The spacing doubles every time you cross a power of two.',
			'Spacing in $[1,2)$ is $0.125$. What is it in $[2,4)$?'
		]
	},
	'ch16.floating-point.2': {
		hints: [
			'Double precision has a 52-bit fraction, so the gap just above $1$ is $2^{-52}$.',
			'$2^{-52}\\approx2.2\\times10^{-16}$.'
		],
		notes: [
			'Right. $2^{-52}\\approx2.2\\times10^{-16}$: about 16 decimal digits.',
			'No. $10^{-8}$ is roughly single precision.',
			'No. $10^{-32}$ would need far more bits than a double has.',
			'No. $0.1$ would be extremely coarse.'
		]
	},
	'ch16.floating-point.3': {
		hints: [
			'$0.1$ and $0.2$ are not exactly representable in binary, just as $1/3$ is not exact in decimal.',
			'Each is rounded, and the rounding errors do not cancel exactly in $0.1 + 0.2$.'
		],
		notes: [
			'Right. The sum is $0.30000000000000004$, off by a unit in the last place.',
			'No. The decimal fractions are rounded when stored, so equality is not exact.',
			'No. Sign has nothing to do with it.',
			'No. Floating-point arithmetic does not raise an error; it silently rounds.'
		]
	},
	'ch16.floating-point.4': {
		hints: [
			'Between $2^k$ and $2^{k+1}$ there are the same number of floats; the interval doubles in width each time.',
			'So spacing doubles, but relative to the size of the number it stays about $2^{-52}$.'
		],
		notes: [
			'Right. The absolute gap grows with the magnitude, while the relative gap stays near machine epsilon.',
			'No. The same number of floats must cover a wider interval.',
			'No. The relative error bound is constant, about $2^{-52}$.',
			'No. The spacing grows with the numbers.'
		]
	},
	'ch16.cancellation.1': {
		hints: [
			'Subtract $1.0000001$ and $1.0000000$: the result is $10^{-7}$.',
			'The leading digits are gone, so the rounding errors in the inputs are now a large fraction of the answer.'
		],
		notes: [
			'Right. The leading digits cancel and only the noisy trailing digits remain.',
			'No. Adding large numbers is accurate in relative terms.',
			'No. Multiplying by zero gives exactly $0$.',
			'No. Dividing by two is exact in binary floating point.'
		]
	},
	'ch16.cancellation.2': {
		hints: [
			'Cancellation comes from the subtraction itself, so avoid performing it.',
			'Example: $\\sqrt{x+1} - \\sqrt x = \\dfrac{1}{\\sqrt{x+1} + \\sqrt x}$.'
		],
		notes: [
			'Right. An algebraically equivalent form with no subtraction of nearly equal numbers gives full accuracy.',
			'No. Printing more digits shows the error but does not remove it.',
			'No. The loss happens in the computation, not the inputs.',
			'No. Subtraction order only changes the sign.'
		]
	},
	'ch16.cancellation.3': {
		hints: [
			'$\\cos x\\approx1 - x^2/2$, so $1 - \\cos x\\approx x^2/2$ is about $10^{-8}$.',
			'The numbers being subtracted are near $1$ with 16 digits, so a result of size $10^{-8}$ keeps only about 8.'
		]
	},
	'ch16.cancellation.4': {
		hints: [
			'The singular values of $A^{\\mathsf T}A$ are the squares of those of $A$.',
			'So $\\kappa(A^{\\mathsf T}A) = \\kappa(A)^2$.'
		],
		notes: [
			'Right. A condition number of $10^6$ becomes $10^{12}$, losing twice as many digits.',
			'No. $A^{\\mathsf T}A$ is symmetric.',
			'No. It is singular only if $A$ has dependent columns.',
			'No. The rank is unchanged.'
		]
	},
	'ch16.conditioning.1': {
		hints: [
			'For a diagonal matrix, $\\kappa = \\max|d_i|/\\min|d_i|$.',
			'$100/1$.'
		]
	},
	'ch16.conditioning.2': {
		hints: [
			'Relative error $\\approx\\kappa\\cdot\\varepsilon$.',
			'$\\log_{10}\\kappa = 6$ digits lost.'
		]
	},
	'ch16.conditioning.3': {
		hints: [
			'Backward stable means the computed answer $\\hat y$ is the exact answer to a nearby input $x + \\Delta x$.',
			'The "nearby" is measured by the unit roundoff.'
		],
		notes: [
			'Right. The computed answer is exact for a slightly perturbed input.',
			'No. That is the impossible goal; rounding errors always occur.',
			'No. Zero error is not achievable in finite precision.',
			'No. Different machines round in different ways; stability is about error size, not identical output.'
		]
	},
	'ch16.conditioning.4': {
		hints: [
			'Conditioning measures how much output error comes from a small input error; backward stability says the input error is tiny.',
			'Multiply the two effects.'
		],
		notes: [
			'Right. forward error $\\approx\\kappa\\times$ backward error.',
			'No. The inequality goes the other way round.',
			'No. They are different quantities.',
			'No. $\\kappa$ is a property of the problem, not an error.'
		]
	},
	'ch16.conditioning.5': {
		hints: [
			'If cost $= cn^3$, doubling gives $c(2n)^3$.',
			'Doubling gives $(2n)^3 = 2^3\\,n^3$.'
		]
	}
};

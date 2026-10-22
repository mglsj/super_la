import type { QuizBank } from '../types';

export const ch16: QuizBank = {
	'ch16.floating-point': [
		{
			id: 'ch16.floating-point.1',
			type: 'numeric',
			prompt: 'In a toy format with $p = 3$ mantissa bits, numbers in $[1, 2)$ are spaced $2^{-3} = 0.125$ apart. What is the spacing in $[2, 4)$?',
			answer: 0.25,
			explain: 'The spacing doubles with each power of two: $2^{-3}\\cdot2 = 0.25$. The relative spacing stays the same.'
		},
		{
			id: 'ch16.floating-point.2',
			type: 'mcq',
			prompt: 'Machine epsilon for double precision is about…',
			choices: ['$2.2\\times10^{-16}$', '$10^{-8}$', '$10^{-32}$', '$0.1$'],
			answer: 0,
			explain: 'Doubles have 52 mantissa bits, and $2^{-52}\\approx2.2\\times10^{-16}$.'
		},
		{
			id: 'ch16.floating-point.3',
			type: 'mcq',
			prompt: 'In double precision, is $0.1 + 0.2 = 0.3$ true?',
			choices: ['No, they differ in the last digits', 'Yes, always', 'Only for positive numbers', 'It raises an error'],
			answer: 0,
			explain: '$0.1$, $0.2$ and $0.3$ are not exactly representable in binary, and $0.1 + 0.2$ evaluates to $0.30000000000000004$.'
		},
		{
			id: 'ch16.floating-point.4',
			type: 'mcq',
			prompt: 'How does the spacing between consecutive floating point numbers behave as numbers get larger?',
			choices: [
				'The absolute spacing grows; the relative spacing stays about the same',
				'The absolute spacing stays the same',
				'The relative spacing grows',
				'Both shrink'
			],
			answer: 0,
			explain: 'The gap doubles at each power of two, in proportion to the size of the numbers.'
		}
	],
	'ch16.cancellation': [
		{
			id: 'ch16.cancellation.1',
			type: 'mcq',
			prompt: 'Catastrophic cancellation happens when you…',
			choices: [
				'subtract two nearly equal numbers',
				'add two large numbers',
				'multiply by zero',
				'divide by two'
			],
			answer: 0,
			explain: 'The leading digits cancel and the earlier rounding errors dominate what is left.'
		},
		{
			id: 'ch16.cancellation.2',
			type: 'mcq',
			prompt: 'What is the usual cure for cancellation?',
			choices: [
				'Rewrite the formula algebraically so the subtraction disappears',
				'Use more decimal places when printing',
				'Round the inputs first',
				'Subtract in the opposite order'
			],
			answer: 0,
			explain: 'Examples: $1-\\cos x = 2\\sin^2(x/2)$ and $\\sqrt{x+1}-\\sqrt x = 1/(\\sqrt{x+1}+\\sqrt x)$.'
		},
		{
			id: 'ch16.cancellation.3',
			type: 'numeric',
			prompt: 'Evaluating $1 - \\cos x$ directly at $x = 10^{-4}$ loses about $2\\log_{10}(1/x)$ digits. How many?',
			answer: 8,
			explain: '$2\\log_{10}(10^4) = 8$ digits lost, leaving roughly 8 of the 16.'
		},
		{
			id: 'ch16.cancellation.4',
			type: 'mcq',
			prompt: 'Why is forming $A^{\\mathsf T}A$ often a bad idea numerically?',
			choices: [
				'It squares the condition number',
				'It makes the matrix non-symmetric',
				'It always makes the matrix singular',
				'It changes the rank'
			],
			answer: 0,
			explain: '$\\kappa(A^{\\mathsf T}A) = \\kappa(A)^2$, so digits are lost twice as fast. QR or SVD avoid this.'
		}
	],
	'ch16.conditioning': [
		{
			id: 'ch16.conditioning.1',
			type: 'numeric',
			prompt: 'What is the condition number of $\\operatorname{diag}(100, 1)$?',
			answer: 100,
			explain: '$\\kappa = \\sigma_{\\max}/\\sigma_{\\min} = 100/1$.'
		},
		{
			id: 'ch16.conditioning.2',
			type: 'numeric',
			prompt: 'A problem has $\\kappa = 10^6$. About how many digits of accuracy are lost, regardless of the algorithm?',
			answer: 6,
			explain: 'Rule of thumb: you lose about $\\log_{10}\\kappa = 6$ digits.'
		},
		{
			id: 'ch16.conditioning.3',
			type: 'mcq',
			prompt: 'An algorithm is backward stable if it returns…',
			choices: [
				'the exact solution of a slightly perturbed problem',
				'the exact solution of the original problem',
				'a solution with zero error',
				'the same answer on every computer'
			],
			answer: 0,
			explain: 'That is the best one can ask, since the inputs were already rounded.'
		},
		{
			id: 'ch16.conditioning.4',
			type: 'mcq',
			prompt: 'Which statement combines conditioning and stability?',
			choices: [
				'Forward error ≲ condition number × backward error',
				'Backward error ≲ condition number × forward error',
				'Forward error = backward error',
				'Condition number = forward error'
			],
			answer: 0,
			explain: 'An ill-conditioned problem amplifies even a tiny backward error into a large forward error.'
		},
		{
			id: 'ch16.conditioning.5',
			type: 'numeric',
			prompt: 'LU factorisation costs $O(n^3)$. If you double $n$, by what factor does the cost grow?',
			answer: 8,
			explain: '$(2n)^3 = 8n^3$.'
		}
	]
};

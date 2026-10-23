import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch08.stay-on-the-line.1': {
		hints: [
			'The equation $A\\mathbf v = \\lambda\\mathbf v$ says $A$ only stretches $\\mathbf v$, never turns it.',
			'What do we call a vector that keeps its direction under $A$?'
		],
		notes: [
			'Right. $\\mathbf v$ stays on its line and is stretched by $\\lambda$: eigenvector with eigenvalue $\\lambda$.',
			'No. The kernel consists of vectors with $A\\mathbf v = \\mathbf 0$, which is the special case $\\lambda = 0$.',
			'No. Pivots are positions in a matrix, not vectors.',
			'No. Orthogonality is a different property.'
		]
	},
	'ch08.stay-on-the-line.2': {
		hints: [
			'Multiply: $A\\binom01 = (0\\cdot2 + 0\\cdot... )$. Compute it.',
			'$A\\binom01 = \\binom05 = 5\\binom01$.'
		]
	},
	'ch08.stay-on-the-line.3': {
		hints: [
			'Compute $A(3\\mathbf v) = 3A\\mathbf v = 3\\lambda\\mathbf v = \\lambda(3\\mathbf v)$.',
			'So $3\\mathbf v$ is stretched by the same factor $\\lambda$.'
		],
		notes: [
			'Right. $A(3\\mathbf v) = \\lambda(3\\mathbf v)$: any nonzero multiple lies on the same line with the same eigenvalue.',
			'No. Every nonzero multiple of an eigenvector is again an eigenvector.',
			'No. The eigenvalue is a property of the line, not of the length of the vector.',
			'No. It works for every $\\lambda$.'
		]
	},
	'ch08.stay-on-the-line.4': {
		hints: [
			'Multiply the matrix by the vector and compare the result with the vector itself: $A\\binom10$.',
			'The result is a multiple of $\\binom10$; that multiple is the eigenvalue.'
		]
	},
	'ch08.characteristic-polynomial.1': {
		hints: [
			'Solve $\\det(A - \\lambda I) = 0$: $(2 - \\lambda)^2 - 1 = 0$.',
			'So $2 - \\lambda = \\pm1$.'
		]
	},
	'ch08.characteristic-polynomial.2': {
		hints: [
			'The trace is $7$ and the determinant is $12 - 2 = 10$. Eigenvalues add to the trace and multiply to the determinant.',
			'Two numbers with sum $7$ and product $10$.'
		]
	},
	'ch08.characteristic-polynomial.3': {
		hints: ['The trace equals the sum of the eigenvalues.', '$2 + 5$.']
	},
	'ch08.characteristic-polynomial.4': {
		hints: [
			'Singular means $\\det A = 0$. The determinant is the product of the eigenvalues.',
			'A product is zero exactly when some factor is zero.'
		],
		notes: [
			'Right. $\\det A = \\prod\\lambda_i = 0$ exactly when some $\\lambda_i = 0$.',
			'No. An eigenvalue of $1$ says nothing about invertibility.',
			'No. Complex eigenvalues do not make a matrix singular.',
			'No. Symmetric matrices can be invertible or singular.'
		]
	},
	'ch08.characteristic-polynomial.5': {
		hints: [
			'Solve $(A - 3I)\\mathbf v = \\mathbf 0$: $\\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix}\\mathbf v = \\mathbf 0$.',
			'Both rows say $v_1 = v_2$.'
		]
	},
	'ch08.complex-eigenvalues.1': {
		hints: [
			'A real eigenvector keeps its direction. What does a $90^\\circ$ rotation do to every direction?',
			'It turns every nonzero vector by $90^\\circ$, so none stays on its line.'
		],
		notes: [
			'Right. Every direction is turned, so no real vector stays on its line. The eigenvalues are $\\pm i$.',
			'No. The $x$-axis is rotated onto the $y$-axis.',
			'No. That would make the rotation a scalar multiple of the identity.',
			'No. $\\mathbf 0$ is never an eigenvector by definition.'
		]
	},
	'ch08.complex-eigenvalues.2': {
		hints: [
			'$|e^{i\\varphi}| = 1$, so $|2e^{\\pm i\\varphi}| = 2\\cdot1$.',
			'The scale factor $2$ becomes the modulus.'
		]
	},
	'ch08.complex-eigenvalues.3': {
		hints: [
			'Eigenvector components get multiplied by $\\lambda^k$ after $k$ steps.',
			'If $|\\lambda|<1$, what happens to $|\\lambda|^k$?'
		],
		notes: [
			'Right. $|\\lambda|^k\\to0$ for each component, so everything shrinks to $\\mathbf 0$.',
			'No. Blow-up needs some $|\\lambda|>1$.',
			'No. Staying constant needs $|\\lambda| = 1$.',
			'No. Oscillation without decay needs $|\\lambda| = 1$ with a complex phase.'
		]
	},
	'ch08.complex-eigenvalues.4': {
		hints: [
			'The characteristic polynomial has real coefficients, so non-real roots come in conjugate pairs.',
			'The conjugate of $1 + 2i$ flips the sign of the imaginary part.'
		],
		notes: [
			'Right. Complex roots of a real polynomial come in conjugate pairs: $1 + 2i$ and $1 - 2i$.',
			'No. That is the negative of the conjugate, not the conjugate.',
			'No. That swaps real and imaginary parts, which is not conjugation.',
			'No. A real matrix cannot have just one non-real eigenvalue.'
		]
	}
};

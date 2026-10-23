import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch09.eigenbasis.1': {
		hints: [
			'Multiply $A = PDP^{-1}$ by a column of $P$: $A\\mathbf p_j = PD(P^{-1}\\mathbf p_j) = PD\\mathbf e_j$.',
			'$D\\mathbf e_j = d_j\\mathbf e_j$, so $A\\mathbf p_j = d_j\\mathbf p_j$.'
		],
		notes: [
			'Right. $A\\mathbf p_j = d_j\\mathbf p_j$, so each column of $P$ is an eigenvector.',
			'No. The rows of $A$ have nothing special to do with $P$.',
			'No. The eigenvalues are the diagonal entries of $D$, not the columns of $P$.',
			'No. Pivot columns come from elimination, not from diagonalisation.'
		]
	},
	'ch09.eigenbasis.2': {
		hints: [
			'$\\det A = \\det P\\det D\\det P^{-1}$, and $\\det P\\det P^{-1} = 1$.',
			'So $\\det A = \\det D = 2\\cdot5$.'
		]
	},
	'ch09.eigenbasis.3': {
		hints: [
			'Eigenvectors for distinct eigenvalues are independent.',
			'$n$ independent eigenvectors in $\\mathbb{R}^n$ (or $\\mathbb{C}^n$) form an eigenbasis.'
		],
		notes: [
			'Right. $n$ distinct eigenvalues give $n$ independent eigenvectors, hence an eigenbasis.',
			'No. The $2\\times2$ matrix with eigenvalues $1$ and $2$ is diagonalisable.',
			'No. Singular means a zero eigenvalue, and distinct eigenvalues can all be nonzero.',
			'No. Symmetric is a sufficient condition for real eigenvalues, not implied by distinctness.'
		]
	},
	'ch09.eigenbasis.3b': {
		hints: [
			'The trace is similarity-invariant: $\\operatorname{tr}A = \\operatorname{tr}(PDP^{-1}) = \\operatorname{tr}D$.',
			'$3 + (-1)$.'
		]
	},
	'ch09.powers.1': {
		hints: [
			'$A^k = PD^kP^{-1}$, so eigenvalues of $A^k$ are $\\lambda^k$.',
			'Powers of $2$ and $3$ with exponent $4$; take the smaller.'
		]
	},
	'ch09.powers.2': {
		hints: [
			'Compute successive powers: $A^2 = \\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}$, then $A^3 = A^2A$, and so on.',
			'$A^n = \\begin{bmatrix}F_{n+1}&F_n\\\\F_n&F_{n-1}\\end{bmatrix}$. You need $F_5$.'
		]
	},
	'ch09.powers.3': {
		hints: [
			'The eigenvalues of $A^k$ are $0.5^k$ and $0.9^k$.',
			'What happens to numbers between $0$ and $1$ when raised to higher and higher powers?'
		],
		notes: [
			'Right. Both $0.5^k$ and $0.9^k$ go to $0$, so $A^k\\to0$ (more slowly in the $0.9$ direction).',
			'No. Growth needs an eigenvalue larger than $1$ in modulus.',
			'No. The identity would need eigenvalues of exactly $1$.',
			'No. Oscillation needs complex or negative eigenvalues of modulus about $1$.'
		]
	},
	'ch09.powers.4': {
		hints: [
			'After $k$ steps the component along the dominant eigenvector is multiplied by $1.1^k$.',
			'That component eventually dominates everything else.'
		],
		notes: [
			'Right. The dominant eigen-direction grows like $1.1^k$.',
			'No. Shrinking needs all $|\\lambda|<1$.',
			'No. Staying the same needs $|\\lambda| = 1$.',
			'No. Rotation alone would need $|\\lambda| = 1$.'
		]
	},
	'ch09.when-it-fails.1': {
		hints: [
			'Find the eigenvectors: solve $(A - I)\\mathbf v = \\mathbf 0$, i.e. $\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}\\mathbf v = \\mathbf 0$.',
			'The equation forces $v_2 = 0$. How many independent solutions does that leave?'
		],
		notes: [
			'Right. Only $(1,0)$ works, so there is no eigenbasis of two vectors.',
			'No. Repeated eigenvalues are only a problem when there are too few eigenvectors, and there are.',
			'No. Triangular matrices have the eigenvalues on the diagonal but need not be diagonalisable.',
			'No. Complex numbers do not help; the eigenvalue is real and there is only one eigenvector.'
		]
	},
	'ch09.when-it-fails.2': {
		hints: [
			'Solve $(A - I)\\mathbf v = \\mathbf 0$ for $A = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$.',
			'It forces $v_2 = 0$ and leaves $v_1$ free: one parameter.'
		]
	},
	'ch09.when-it-fails.3': {
		hints: [
			'Geometric multiplicity is the dimension of the eigenspace; algebraic is the number of times $\\lambda$ is a root of the characteristic polynomial.',
			'In $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$, $\\lambda = 1$ has algebraic $2$ and geometric $1$.'
		],
		notes: [
			'Right. The eigenspace never has more dimensions than the root has multiplicity; when strictly less, the matrix is defective.',
			'No. The shear $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ has geometric multiplicity $1<2$.',
			'No. They are equal only for non-defective eigenvalues.',
			'No. There is a definite inequality relating them.'
		]
	},
	'ch09.when-it-fails.4': {
		hints: [
			'$2I$ is already diagonal, so $P = I$ works: $2I = I(2I)I^{-1}$.',
			'A repeated eigenvalue is harmless when the eigenspace is as big as the multiplicity: here every vector is an eigenvector.'
		],
		notes: [
			'Right. Every vector is an eigenvector with eigenvalue 2, so the eigenspace is the whole plane.',
			'No. Repeated eigenvalues only matter if the eigenspace is too small, which is not the case.',
			'No. The matrix is invertible ($\\det = 4$), and singular matrices can be diagonalisable anyway.',
			'No. It is already diagonal; no row swaps are involved.'
		]
	}
};

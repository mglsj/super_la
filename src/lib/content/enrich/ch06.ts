import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch06.linear-maps.1': {
		hints: [
			'A linear map must send $\\mathbf 0$ to $\\mathbf 0$ and respect sums and scalings.',
			'Test the origin: which options give $T(0,0)\\ne(0,0)$? For the rest, ask if squares or products appear.'
		],
		notes: [
			'Right. Each output is a sum of constants times $x$ and $y$, which is linear.',
			'No. $T(0,0) = (1,0)\\ne\\mathbf 0$, so it is not linear (it is a translation).',
			'No. Squaring is not linear: $T(2,0) = (4,0)\\ne2T(1,0) = (2,0)$.',
			'No. $xy$ is a product of the inputs; $T(2,2)$ has $xy = 4$ but $2T(1,1)$ has $2$.'
		]
	},
	'ch06.linear-maps.2': {
		hints: [
			'Use $T(\\mathbf 0) = T(0\\cdot\\mathbf v)$ and linearity.',
			'$T(0\\cdot\\mathbf v) = 0\\cdot T(\\mathbf v) = \\mathbf 0$.'
		],
		notes: [
			'Right. Scaling by $0$ gives $T(\\mathbf 0) = 0\\cdot T(\\mathbf v) = \\mathbf 0$ for every linear $T$.',
			'No. $\\mathbf 1$ is not even the right kind of object here.',
			'No. It does not depend on $T$; linearity forces $\\mathbf 0$.',
			'No. $T$ is defined on all of the domain, including $\\mathbf 0$.'
		]
	},
	'ch06.linear-maps.3': {
		hints: [
			'Write the input as a sum of the basis vectors: $(1,1) = (1,0) + (0,1)$.',
			'By linearity $T(1,1) = T(1,0) + T(0,1)$. Add the two given outputs.'
		]
	},
	'ch06.linear-maps.4': {
		hints: [
			'$(2,3) = 2(1,0) + 3(0,1)$.',
			'$T(2,3) = 2T(1,0) + 3T(0,1) = 2(2,3) + 3(1,-1)$.'
		]
	},
	'ch06.kernel-image.1': {
		hints: [
			'One-to-one means no two inputs share an output. When $T\\mathbf u = T\\mathbf v$, linearity gives $T(\\mathbf u - \\mathbf v) = \\mathbf 0$.',
			'So if the kernel contained a nonzero vector $\\mathbf k$, then $T\\mathbf k = T\\mathbf 0$ with $\\mathbf k\\ne\\mathbf 0$.'
		],
		notes: [
			'Right. A nonzero kernel vector would collide with $\\mathbf 0$, and conversely a trivial kernel prevents all collisions.',
			'No. That says the image is tiny (the map is zero), the opposite of one-to-one.',
			'No. The zero map sends everything to $\\mathbf 0$, so it is far from injective.',
			'No. Square matrices can be singular, and non-square matrices can be injective (tall ones).'
		]
	},
	'ch06.kernel-image.2': {
		hints: [
			'Solve $A\\mathbf x = \\mathbf 0$: the equation is $x_1 + x_2 = 0$.',
			'With $x_1 = 1$, find $x_2$.'
		]
	},
	'ch06.kernel-image.3': {
		hints: [
			'The image is the span of the columns. Compare the two columns.',
			'They are identical, so the image is a line.'
		]
	},
	'ch06.kernel-image.4': {
		hints: [
			'Subtract: $T\\mathbf u - T\\mathbf v = \\mathbf 0$.',
			'By linearity $T\\mathbf u - T\\mathbf v = T(\\mathbf u - \\mathbf v)$.'
		],
		notes: [
			'Right. $T(\\mathbf u - \\mathbf v) = T\\mathbf u - T\\mathbf v = \\mathbf 0$.',
			'No. That holds only if the kernel is trivial (one-to-one).',
			'No. Nothing says $\\mathbf u + \\mathbf v = \\mathbf 0$.',
			'No. $T$ can be any linear map with $T\\mathbf u = T\\mathbf v$, e.g. a projection.'
		]
	},
	'ch06.rank-nullity.1': {
		hints: [
			'Onto $\\mathbb{R}^3$ means the image has dimension $3$.',
			'Rank–nullity: $\\dim\\ker + \\dim\\operatorname{Im} = \\dim(\\text{domain}) = 5$.'
		]
	},
	'ch06.rank-nullity.2': {
		hints: ['Rank–nullity: nullity $=$ columns $-$ rank.', 'The matrix has $6$ columns.']
	},
	'ch06.rank-nullity.3': {
		hints: [
			'The image lies inside $\\mathbb{R}^2$, so its dimension is at most $2$.',
			'Rank–nullity: kernel dimension $\\ge 4 - 2$.'
		],
		notes: [
			'Right. $\\dim\\ker\\ge4 - 2 = 2>0$, so the kernel is nontrivial and the map cannot be one-to-one.',
			'No. You cannot fit $4$ dimensions injectively into $2$.',
			'No. Being onto does not rescue injectivity; in fact it makes the kernel larger.',
			'No. Signs of entries are irrelevant.'
		]
	},
	'ch06.rank-nullity.4': {
		hints: [
			'Which polynomials have derivative $0$?',
			'Constants only. How many dimensions is that?'
		]
	},
	'ch06.matrix-of-a-map.1': {
		hints: [
			'Multiply the matrix by the coordinate vector $(5,3,2)$.',
			'First row: $0\\cdot5 + 1\\cdot3 + 0\\cdot2$. Second row: $0\\cdot5 + 0\\cdot3 + 2\\cdot2$.'
		]
	},
	'ch06.matrix-of-a-map.2': {
		hints: [
			'Write $T(x,y) = x(2,1) + y(1,-1)$. The columns are the images of the basis vectors.',
			'The top-right entry is row 1, column 2: the first coordinate of $T(0,1)$.'
		]
	},
	'ch06.matrix-of-a-map.3': {
		hints: [
			'To build the matrix, feed in the $j$-th basis vector and write down the output.',
			'The output is written in the basis of the target space.'
		],
		notes: [
			'Right. Column $j$ records what $T$ does to $\\mathbf b_j$.',
			'No. That would be the identity map.',
			'No. The inverse has nothing to do with this.',
			'No. Column $j$ depends only on $T(\\mathbf b_j)$, not on a running sum.'
		]
	},
	'ch06.matrix-of-a-map.4': {
		hints: [
			'The first column is $T(1,0)$.',
			'$T(1,0) = (2\\cdot1 + 0,\\ 1 - 0)$.'
		]
	},
	'ch06.change-of-basis.1': {
		hints: [
			'Take a vector in new coordinates, convert to standard with $P$, apply $A$, convert back with $P^{-1}$.',
			'The order of operations (right to left) is $P^{-1}\\,A\\,P$.'
		],
		notes: [
			'Right: first $P$ (new to standard), then $A$, then $P^{-1}$ (back to new).',
			'No. That is the reverse conversion and gives the matrix in the old basis from the new one.',
			'No. $PAP$ never converts back to the new basis.',
			'No. $A^{-1}$ is the inverse map, not the same map in new coordinates.'
		]
	},
	'ch06.change-of-basis.2': {
		hints: [
			'Similar matrices represent the same map in different bases. What does not depend on the basis?',
			'Determinant and eigenvalues describe the map itself, not the coordinates.'
		],
		notes: [
			'Right. $\\det(P^{-1}AP) = \\det A$ and the eigenvalues are unchanged.',
			'No. The entries depend on the basis.',
			'No. The first column also changes with the basis.',
			'No. They share many invariants (trace, rank, determinant, eigenvalues).'
		]
	},
	'ch06.change-of-basis.3': {
		hints: [
			'The determinant is a basis-independent number, so compute it from the matrix you are given.',
			'$\\det\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix} = 0\\cdot0 - 1\\cdot1$.'
		]
	},
	'ch06.change-of-basis.4': {
		hints: [
			'The first column of $[A]_B$ is the coordinates of $A\\mathbf b_1$ in the basis $B$.',
			'Reflecting $\\mathbf b_1 = (1,1)$ across $y = x$ leaves it unchanged. Write it in the basis.'
		]
	}
};

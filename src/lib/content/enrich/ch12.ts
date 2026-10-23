import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch12.projection-subspace.1': {
		hints: [
			'The $xy$-plane is the set of vectors with third entry $0$.',
			'Projecting onto it keeps the $x$ and $y$ entries and drops $z$.'
		]
	},
	'ch12.projection-subspace.2': {
		hints: [
			'$P\\mathbf b$ already lies in the subspace. What does $P$ do to a vector that is already in the subspace?',
			'It leaves it unchanged, so applying $P$ again changes nothing.'
		],
		notes: [
			'Right. Projecting a point already in $W$ leaves it fixed, so $P^2 = P$.',
			'No. Doubling would make the projection overshoot.',
			'No. $P^2 = I$ would mean $P$ is its own inverse, which only the identity projection satisfies.',
			'No. $P^2 = 0$ would send every projected vector to $\\mathbf 0$.'
		]
	},
	'ch12.projection-subspace.3': {
		hints: [
			'The $xz$-plane is the set where $y = 0$.',
			'Keep the first and third entries; set the second to $0$.'
		]
	},
	'ch12.projection-subspace.4': {
		hints: [
			'The projection $\\mathbf p$ is the closest point of $W$ to $\\mathbf b$. The shortest path from $\\mathbf b$ to $W$ meets $W$ at a right angle.',
			'Picture dropping a perpendicular from $\\mathbf b$ to a plane.'
		],
		notes: [
			'Right. The error is perpendicular to the whole subspace, which makes $\\mathbf p$ the closest point.',
			'No. If the error were parallel to $W$ it could be partly removed, so $\\mathbf p$ would not be closest.',
			'No. The error is zero only when $\\mathbf b$ already lies in $W$.',
			'No. The error points out of $W$.'
		]
	},
	'ch12.normal-equations.1': {
		hints: [
			'The error $\\mathbf b - A\\hat{\\mathbf x}$ must be orthogonal to every column of $A$.',
			'In matrix form that is $A^{\\mathsf T}(\\mathbf b - A\\hat{\\mathbf x}) = \\mathbf 0$.'
		],
		notes: [
			'Right. Rearranging $A^{\\mathsf T}(\\mathbf b - A\\hat{\\mathbf x}) = \\mathbf 0$ gives $A^{\\mathsf T}A\\hat{\\mathbf x} = A^{\\mathsf T}\\mathbf b$.',
			'No. The transposes are in the wrong places: $AA^{\\mathsf T}$ has the wrong size for $\\hat{\\mathbf x}$.',
			'No. That is the original system, which has no solution when $\\mathbf b\\notin\\operatorname{col}(A)$.',
			'No. $A^{\\mathsf T}\\hat{\\mathbf x}$ has the wrong dimensions (it lives in the row space).'
		]
	},
	'ch12.normal-equations.2': {
		hints: [
			'$A^{\\mathsf T}A = 3$ and $A^{\\mathsf T}\\mathbf b = 1 + 2 + 6$.',
			'So $\\hat x = 9/3$. This is the average of the data.'
		]
	},
	'ch12.normal-equations.3': {
		hints: [
			'Write $A = \\begin{bmatrix}1&0\\\\1&1\\\\1&2\\end{bmatrix}$, $\\mathbf b = (1,2,2)$ and form $A^{\\mathsf T}A = \\begin{bmatrix}3&3\\\\3&5\\end{bmatrix}$, $A^{\\mathsf T}\\mathbf b = (5,6)$.',
			'Solve $3x_0 + 3x_1 = 5$ and $3x_0 + 5x_1 = 6$: subtract to get $2x_1 = 1$.'
		],
		slips: [{ value: 1, note: 'The points rise by $1$ then by $0$, so the best slope is smaller than $1$. Solve the normal equations.' }]
	},
	'ch12.normal-equations.4': {
		hints: [
			'The normal equations say the error is orthogonal to the columns of $A$.',
			'Write that as a matrix product: $A^{\\mathsf T}\\mathbf e$.'
		],
		notes: [
			'Right. $A^{\\mathsf T}\\mathbf e = \\mathbf 0$ is exactly the statement that $\\mathbf e$ is perpendicular to each column.',
			'No. $\\mathbf b$ is the data; its relation to the error is not zero.',
			'No. $\\hat{\\mathbf x}$ is a different vector, not related to $A^{\\mathsf T}\\mathbf e$ in that way.',
			'No. $A\\hat{\\mathbf x}$ is the projection, which is not zero.'
		]
	},
	'ch12.line-of-best-fit.1': {
		hints: [
			'If the points lie exactly on a line, the best-fit line is that line (the error is zero).',
			'Compute the slope between two points: $(5 - 1)/(2 - 0)$.'
		]
	},
	'ch12.line-of-best-fit.2': {
		hints: [
			'The $t$-values are symmetric about $0$, so the slope is $0$ and the line is horizontal at the average height.',
			'The average of $1, 0, 1$ is the intercept.'
		]
	},
	'ch12.line-of-best-fit.3': {
		hints: [
			'Least squares is named after what it minimises: sum of the *squared* errors.',
			'Which errors are measured? The vertical gaps between the data and the line.'
		],
		notes: [
			'Right. The squared vertical gaps $\\sum(y_i - \\hat y_i)^2$ are minimised.',
			'No. That is a different problem (minimax / Chebyshev fit).',
			'No. Unsquared errors could cancel, and that is a different objective (least absolute deviations uses the absolute values).',
			'No. Counting points off the line is not a smooth optimisation.'
		]
	},
	'ch12.line-of-best-fit.4': {
		hints: [
			'With a column of ones in $A$, the normal equations include $\\sum e_i = 0$.',
			'Zero total error means the line balances the data about its averages.'
		],
		notes: [
			'Right. The residuals sum to zero, which forces the line through $(\\bar t,\\bar y)$.',
			'No. Only if the intercept is forced to be $0$.',
			'No. The line balances all points; it is not tied to the first one.',
			'No. Extreme points influence the line but do not decide where it passes.'
		]
	}
};

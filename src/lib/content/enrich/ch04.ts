import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch04.vector-spaces.1': {
		hints: [
			'A vector space must be closed: adding two members, or scaling one, must stay inside the set.',
			'Add $x^2$ and $-x^2$, two polynomials of degree exactly 2. What is the sum, and what is its degree?'
		],
		notes: [
			'Right, this is NOT a vector space. $x^2 + (-x^2) = 0$ has degree 0, so the sum leaves the set (and the zero polynomial is not in it).',
			'This is a vector space. Sums and multiples of polynomials of degree at most 2 stay that way, and $0$ is included.',
			'This is a vector space. Matrices add and scale entry by entry.',
			'This is a vector space; it is the standard example.'
		]
	},
	'ch04.vector-spaces.2': {
		hints: [
			'The zero vector is the one you can add to anything without changing it.',
			'Which $2\\times2$ matrix $Z$ satisfies $A + Z = A$ for every $A$?'
		],
		notes: [
			'Right. $A + 0 = A$ for every matrix $A$.',
			'No. $A + I\\ne A$ (it changes the diagonal). The identity is the unit for multiplication, not addition.',
			'No. Adding a matrix of ones changes every entry.',
			'No. Every vector space has a zero vector.'
		]
	},
	'ch04.vector-spaces.3': {
		hints: [
			'Check closure under scaling: multiply a positive number by a negative scalar.',
			'$(-1)\\cdot3 = -3$. Is that still in the set?'
		],
		notes: [
			'Right. A scalar like $-1$ throws you out of the positive numbers. (Also $0$ is missing.)',
			'No. Positive numbers are real numbers.',
			'No. Adding two positive numbers gives a positive number, so addition works.',
			'No. Size is not the issue; closure is.'
		]
	},
	'ch04.vector-spaces.4': {
		hints: [
			'For each option test: is the zero element in it, and does adding or scaling stay inside?',
			'Sums of continuous functions are continuous. For "$f(0) = 1$": what is $f(0)$ for $f + f$?'
		],
		notes: [
			'Right. Sums and scalar multiples of continuous functions are continuous, and the zero function is continuous.',
			'No. If $f(0) = 1$ and $g(0) = 1$ then $(f + g)(0) = 2$, so the sum leaves the set.',
			'No. Scaling an integer by $\\tfrac12$ is not an integer.',
			'No. Adding two unit vectors usually does not give a unit vector, and $\\mathbf 0$ is excluded.'
		]
	},
	'ch04.subspaces.1': {
		hints: [
			'A subspace must contain $\\mathbf 0$ and be closed under adding and scaling.',
			'Test whether each shape passes through the origin first. $y = 3x + 1$ at $x = 0$ gives $y = 1$.'
		],
		notes: [
			'Right. A line through the origin is closed under sums and multiples.',
			'No. It misses the origin: $(0,0)$ would need $0 = 1$.',
			'No. Scaling $(1,1)$ by $-1$ leaves the first quadrant.',
			'No. The circle does not contain the origin, and $(1,0) + (0,1)$ is not on it.'
		]
	},
	'ch04.subspaces.2': {
		hints: [
			'Multiply any vector of the subspace by the scalar $0$.',
			'$0\\cdot\\mathbf v = \\mathbf 0$. The subspace is closed under scaling, so $\\mathbf 0$ is inside.'
		],
		notes: [
			'Right. Scaling any member by $0$ gives $\\mathbf 0$, and subspaces are closed under scaling.',
			'No. The subspace $\\{\\mathbf 0\\}$ has no vector of length 1.',
			'No. A line like $y = 2x$ in $\\mathbb{R}^2$ has no reason to contain $(1,1)$.',
			'No. $\\{\\mathbf 0\\}$ is a subspace with the empty list as its only basis.'
		]
	},
	'ch04.subspaces.3': {
		hints: [
			'Check two things: is $\\mathbf 0$ in the set, and does it stay closed under addition and scaling?',
			'For $x + y + z = 1$: $\\mathbf 0$ gives $0\\ne1$. For $x\\ge0$: scale $(1,0,0)$ by $-1$. For $xyz = 0$: add $(1,0,1)$ and $(0,1,0)$.'
		],
		notes: [
			'Right. It is the solution set of $A\\mathbf x = \\mathbf 0$ with $A = [1\\ 1\\ 1]$, a null space, so a subspace (a plane through the origin).',
			'No. It misses the origin, since $0 + 0 + 0\\ne1$.',
			'No. Scaling a vector with $x>0$ by $-1$ makes $x<0$.',
			'No. $(1,0,1)$ and $(0,1,0)$ both have $xyz = 0$, but their sum $(1,1,1)$ has $xyz = 1$.'
		]
	},
	'ch04.subspaces.4': {
		hints: [
			'Subspaces of $\\mathbb{R}^2$ have dimension $0$, $1$ or $2$.',
			'Dimension $0$ is the origin, dimension $1$ is a line through the origin, dimension $2$ is everything.'
		],
		notes: [
			'Right. These correspond to dimensions 0, 1 and 2.',
			'Incomplete. You are missing the origin $\\{\\mathbf 0\\}$ and the whole plane, which are also subspaces.',
			'Incomplete. Lines through the origin and $\\{\\mathbf 0\\}$ are also subspaces.',
			'No. Lines not through the origin and circles fail the zero-vector test.'
		]
	},
	'ch04.column-null-space.1': {
		hints: [
			'Solve $A\\mathbf x = \\mathbf 0$: the first row says $x_1 + 2x_2 = 0$.',
			'With $x_2 = 1$, solve for $x_1$.'
		]
	},
	'ch04.column-null-space.2': {
		hints: [
			'The column space is the span of the columns. Is the second column a multiple of the first?',
			'$(2,4) = 2(1,2)$, so the columns span just a line.'
		]
	},
	'ch04.column-null-space.3': {
		hints: [
			'$A\\mathbf x$ is a combination of the columns of $A$.',
			'So $\\mathbf b$ must be reachable as such a combination: which space is that?'
		],
		notes: [
			'Right. $A\\mathbf x$ ranges over exactly the column space.',
			'No. The null space is the set of $\\mathbf x$ with $A\\mathbf x = \\mathbf 0$; it lives on the input side.',
			'No. Solvability does not depend on squareness.',
			'No. Many nonzero $\\mathbf b$ are reachable, and $\\mathbf 0$ always is.'
		]
	},
	'ch04.column-null-space.4': {
		hints: [
			'The pivot column is the column containing the first pivot after elimination, in the original matrix.',
			'Column 1 is $(1,2)$; column 2 is a multiple of it, so only column 1 is a pivot column.'
		]
	},
	'ch04.four-subspaces.1': {
		hints: [
			'Rank–nullity: rank $+$ nullity $=$ number of columns.',
			'The matrix has $5$ columns and rank $2$.'
		]
	},
	'ch04.four-subspaces.2': {
		hints: [
			'The left null space is the null space of $A^{\\mathsf T}$; $A^{\\mathsf T}$ has $3$ columns and rank $2$.',
			'Dimension $= 3 - 2$ (rows minus rank).'
		]
	},
	'ch04.four-subspaces.3': {
		hints: [
			'$A\\mathbf x = \\mathbf 0$ says every row of $A$ has dot product $0$ with $\\mathbf x$.',
			'So $\\mathbf x$ is perpendicular to each row, hence to everything they span: the row space.'
		],
		notes: [
			'Right. Each row dotted with $\\mathbf x$ is $0$, so $\\mathbf x\\perp$ row space.',
			'No. The column space lives in the output space; the null space is in the input space.',
			'No. The left null space sits in the output space too. The null space is perpendicular to the row space.',
			'No. This is exactly the structure the theorem describes.'
		]
	},
	'ch04.four-subspaces.4': {
		hints: [
			'Row rank equals column rank.',
			'So the row space has the same dimension as the column space.'
		]
	}
};

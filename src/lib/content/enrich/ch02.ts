import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch02.lines-meet.1': {
		hints: [
			'Think of two lines in the plane: they can cross once, never cross, or lie on top of each other.',
			'Which of those cases give a number of solutions other than 1?'
		],
		notes: [
			'Right. Parallel lines give $0$, crossing lines give $1$, coinciding lines give infinitely many. Two different solutions would force a whole line of them.',
			'No. One is common but not the only possibility: parallel lines never meet.',
			'No. If two solutions exist, every point on the line through them is also a solution, so the count jumps from 1 to infinity.',
			'No. The count can only be 0, 1 or infinity; there is no way to get exactly 5, say.'
		]
	},
	'ch02.lines-meet.2': {
		hints: [
			'Divide the second equation by 2: you get $x + y = 4.5$.',
			'Compare with the first equation, $x + y = 4$. Can $x + y$ be both $4$ and $4.5$?'
		],
		notes: [
			'Right. The lines $x + y = 4$ and $x + y = 4.5$ are parallel and distinct, so they never meet.',
			'No. A single solution would need the lines to cross, but their slopes are equal.',
			'No. Infinitely many solutions needs the two equations to describe the same line, which would need the right-hand side to be $8$.',
			'No. Two lines cannot meet in exactly two points.'
		]
	},
	'ch02.lines-meet.3': {
		hints: [
			'Add the two equations to cancel $y$.',
			'$(x + y) + (x - y) = 4 + 2$, so $2x = 6$.'
		],
		slips: [{ value: 1, note: 'That is the value of $y$ (subtract the equations to find it). The question asks for $x$.' }]
	},
	'ch02.lines-meet.4': {
		hints: [
			'If two equations describe the same line, every point on that line satisfies both.',
			'How many points does a line have?'
		],
		notes: [
			'Right. Every point of the shared line solves both equations, and a line has infinitely many points.',
			'No. One solution would need the lines to cross at a single point, but they coincide.',
			'No. The lines overlap, so they certainly share points.',
			'No. If two points are solutions, every point between and beyond them on the line is too.'
		]
	},
	'ch02.lines-meet.5': {
		hints: [
			'Add the equations to cancel $y$, find $x$, then substitute back.',
			'$(x + y) + (x - y) = 5 + 1$, so $2x = 6$ and $x = 3$.',
			'Then $y = 5 - 3$.'
		]
	},
	'ch02.elimination.1': {
		hints: [
			'A legal row operation must be reversible, so that no solution is lost or created.',
			'Can you undo multiplying a row by $0$? What information is destroyed?'
		],
		notes: [
			'This is legal. Swapping two equations does not change the system.',
			'Right, this is NOT legal. Multiplying by $0$ erases the equation and cannot be undone.',
			'This is legal. Adding a multiple of one equation to another is the main elimination step, and can be undone by subtracting it again.',
			'This is legal. Multiplying an equation by a nonzero number can be undone by dividing by it.'
		]
	},
	'ch02.elimination.2': {
		hints: [
			'Add the two equations to eliminate $y$.',
			'$2x = 4$, so $x = 2$. Then use $x + y = 3$ to find $y$.'
		]
	},
	'ch02.elimination.3': {
		hints: [
			'Subtract twice each entry of row 1 from the matching entry of row 2.',
			'Right-hand side: $11 - 2\\cdot5$.'
		],
		slips: [{ value: 7, note: 'That is the new coefficient of $y$ ($7 - 2\\cdot3 = 1$ is the right calculation for it). The right-hand side is $11 - 2\\cdot5$.' }]
	},
	'ch02.elimination.4': {
		hints: [
			'Subtract $2\\times$ (equation 2) from equation 1 to eliminate $x$: $(2x + y) - 2(x + 3y)$.',
			'That gives $-5y = -5$, so $y = 1$. Substitute back into $x + 3y = 5$.'
		]
	},
	'ch02.elimination.5': {
		hints: [
			'Suppose $(x,y)$ solves both equations. Does it still solve "equation 2 plus 3 times equation 1"?',
			'Can you recover equation 2 from the new system? (Subtract 3 times equation 1 again.)'
		],
		notes: [
			'Right. Any solution of the old system satisfies the new equation, and subtracting the multiple restores the old one, so the solution sets are equal.',
			'Not the reason. The numbers might even get bigger; safety is about the solutions, not the size of the numbers.',
			'Not the reason. Squareness has nothing to do with whether a step keeps the solutions.',
			'No. The step does change an entry; what stays the same is the set of solutions.'
		]
	},
	'ch02.pivots-rref.1': {
		hints: [
			'Is row 2 a multiple of row 1?',
			'Row 2 is $2\\times$ row 1, so elimination leaves a row of zeros. How many nonzero rows remain?'
		]
	},
	'ch02.pivots-rref.2': {
		hints: [
			'Read the row as an equation: $0x + 0y = 1$.',
			'Can zero ever equal $1$?'
		],
		notes: [
			'Right. The row says $0 = 1$, which is impossible, so the system has no solution.',
			'No. A single solution would need a pivot in every column and no contradictory row.',
			'No. Infinitely many solutions needs a free variable and no contradiction, but $0 = 1$ is a contradiction.',
			'No. Free variables come from columns without pivots, and this row is a contradiction rather than a free variable.'
		]
	},
	'ch02.pivots-rref.3': {
		hints: [
			'Rank counts independent rows. Is any row a multiple of another?',
			'Row 2 is twice row 1, so it adds nothing. Are the remaining rows, row 1 and row 3, independent?'
		],
		slips: [{ value: 3, note: 'Row 2 is twice row 1, so there are at most two independent rows.' }]
	},
	'ch02.pivots-rref.4': {
		hints: [
			'Unknowns minus pivots equals the number of free variables: $3 - 2 = ?$.',
			'Each free variable can take any value, and the pivot variables follow.'
		],
		notes: [
			'Right. There is $3 - 2 = 1$ free variable, and the system is consistent, so one free parameter gives infinitely many solutions.',
			'No. Exactly one solution would need 3 pivots (one per unknown).',
			'No. The problem says the system is consistent, so there is at least one solution.',
			'No. A consistent system has 1, or infinitely many solutions over the reals, never exactly two.'
		]
	},
	'ch02.pivots-rref.5': {
		hints: [
			'RREF means the pivots are $1$ and are the only nonzero entry in their column.',
			'Picture the identity matrix: its columns are all pivot columns.'
		],
		notes: [
			'Right. A pivot column has a leading $1$ and zeros above and below it.',
			'No. Only the pivot entries need to be $1$; the other entries in the same column must be $0$.',
			'No. A column of zeros has no pivot; it is a free column.',
			'No. In RREF the entries above and below a pivot must be zero.'
		]
	},
	'ch02.solution-sets.1': {
		hints: [
			'Free variables = unknowns $-$ rank.',
			'$4 - 2$.'
		]
	},
	'ch02.solution-sets.2': {
		hints: ['Substitute $y = 0$ and solve for $x$.', '$x + 2\\cdot0 = 4$.']
	},
	'ch02.solution-sets.3': {
		hints: [
			'If $\\mathbf p$ and $\\mathbf q$ both solve $A\\mathbf x = \\mathbf b$, what does $A(\\mathbf q - \\mathbf p)$ equal?',
			'So the difference of any two solutions solves $A\\mathbf x = \\mathbf 0$. Write $\\mathbf q = \\mathbf p + (\\mathbf q - \\mathbf p)$.'
		],
		notes: [
			'Right. $\\mathbf q - \\mathbf p$ solves $A\\mathbf x = \\mathbf 0$, so $\\mathbf q = \\mathbf p + (\\text{a null solution})$.',
			'No. Solutions are not generally multiples of $\\mathbf b$; $\\mathbf b$ lives in the output space and $\\mathbf x$ in the input space.',
			'No. Scaling a particular solution gives $A(c\\mathbf p) = c\\mathbf b$, which is $\\mathbf b$ only for $c = 1$.',
			'No. The zero vector solves $A\\mathbf x = \\mathbf b$ only if $\\mathbf b = \\mathbf 0$.'
		]
	},
	'ch02.solution-sets.4': {
		hints: [
			'Put $y = 1$ into $x + 2y = 0$.',
			'$x + 2 = 0$.'
		]
	},
	'ch02.solution-sets.5': {
		hints: [
			'Each plane is one equation in three unknowns, so two planes give two equations.',
			'Unknowns minus equations = free variables: $3 - 2 = 1$ free variable, which is a line.'
		],
		notes: [
			'Right. Two non-parallel planes intersect in a line (one free variable).',
			'No. A single point would need three independent equations.',
			'No. They would meet in a plane only if they coincide, but then they would be parallel (the same plane).',
			'No. Planes that are not parallel always cross; only parallel planes can miss each other.'
		]
	}
};

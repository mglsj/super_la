import type { QuizBank } from '../types';

export const ch02: QuizBank = {
	'ch02.lines-meet': [
		{
			id: 'ch02.lines-meet.1',
			type: 'mcq',
			prompt: 'How many solutions can a system of linear equations have?',
			choices: ['0, 1, or infinitely many', 'Exactly 1', '0, 1 or 2', 'Any whole number'],
			answer: 0,
			explain: 'Two distinct lines cannot cross twice. A system has no solution, one solution, or infinitely many.'
		},
		{
			id: 'ch02.lines-meet.2',
			type: 'mcq',
			prompt: 'How many solutions does $x + y = 4,\\ 2x + 2y = 9$ have?',
			choices: ['None', 'One', 'Infinitely many', 'Two'],
			answer: 0,
			explain: 'Doubling the first equation gives $2x + 2y = 8$, which contradicts $2x + 2y = 9$. The lines are parallel.'
		},
		{
			id: 'ch02.lines-meet.3',
			type: 'numeric',
			prompt: 'The lines $x + y = 4$ and $x - y = 2$ meet at a point. What is its $x$-coordinate?',
			answer: 3,
			explain: 'Adding the equations gives $2x = 6$, so $x = 3$ (and $y = 1$).'
		},
		{
			id: 'ch02.lines-meet.4',
			type: 'mcq',
			prompt: 'Two equations describe exactly the same line. How many solutions does the system have?',
			choices: ['Infinitely many', 'One', 'None', 'Two'],
			answer: 0,
			explain: 'Every point of the line satisfies both equations.'
		},
		{
			id: 'ch02.lines-meet.5',
			type: 'goal-vector',
			prompt: 'Drag the tip to the point where the lines $x + y = 5$ and $x - y = 1$ meet.',
			target: [3, 2],
			start: [0, 0],
			hideTarget: true,
			tol: 0.3,
			explain: 'Adding the equations: $2x = 6$, so $x = 3$ and then $y = 2$.'
		}
	],
	'ch02.elimination': [
		{
			id: 'ch02.elimination.1',
			type: 'mcq',
			prompt: 'Which of these is NOT a legal row operation?',
			choices: [
				'Swap two rows',
				'Multiply a row by $0$',
				'Add $3\\times$ row 1 to row 2',
				'Multiply a row by $5$'
			],
			answer: 1,
			explain: 'Multiplying by $0$ erases an equation, which can change the solution set. Scaling must be by a nonzero number.'
		},
		{
			id: 'ch02.elimination.2',
			type: 'vector',
			prompt: 'Solve $x + y = 3,\\ x - y = 1$. Give $(x, y)$.',
			answer: [2, 1],
			explain: 'Add the equations: $2x = 4$, so $x = 2$. Then $y = 1$.'
		},
		{
			id: 'ch02.elimination.3',
			type: 'numeric',
			prompt: 'Apply $R_2 \\leftarrow R_2 - 2R_1$ to $\\left[\\begin{array}{cc|c} 1 & 3 & 5 \\\\ 2 & 7 & 11 \\end{array}\\right]$. What is the new right-hand side of row 2?',
			answer: 1,
			explain: 'Row 2 becomes $(2 - 2,\\ 7 - 6,\\ 11 - 10) = (0, 1, 1)$.'
		},
		{
			id: 'ch02.elimination.4',
			type: 'vector',
			prompt: 'Solve $2x + y = 5,\\ x + 3y = 5$. Give $(x, y)$.',
			answer: [2, 1],
			explain: 'Subtract $2\\times$ row 2 from row 1: $-5y = -5$, so $y = 1$ and $x = 2$.'
		},
		{
			id: 'ch02.elimination.5',
			type: 'mcq',
			prompt: 'Why is "add a multiple of one equation to another" safe?',
			choices: [
				'Every old solution still satisfies the new system, and the step can be undone',
				'It makes the numbers smaller',
				'It keeps the matrix square',
				'It never changes any entry'
			],
			answer: 0,
			explain: 'Adding $k\\times$ row 1 to row 2 can be reversed by subtracting it again, so both systems have the same solutions.'
		}
	],
	'ch02.pivots-rref': [
		{
			id: 'ch02.pivots-rref.1',
			type: 'numeric',
			prompt: 'What is the rank of $\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$?',
			answer: 1,
			explain: 'Row 2 is twice row 1, so elimination leaves a single pivot.'
		},
		{
			id: 'ch02.pivots-rref.2',
			type: 'mcq',
			prompt: 'A row of the reduced augmented matrix reads $[\\,0\\ 0 \\mid 1\\,]$. What does that tell you?',
			choices: ['The system has no solution', 'The system has one solution', 'There are infinitely many solutions', 'A free variable'],
			answer: 0,
			explain: 'That row says $0 = 1$, which can never be true.'
		},
		{
			id: 'ch02.pivots-rref.3',
			type: 'numeric',
			prompt: 'What is the rank of $\\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 0 & 1 \\end{bmatrix}$?',
			answer: 2,
			explain: 'Row 2 is twice row 1, so it adds nothing. Row 3 is independent of row 1. Two pivots.'
		},
		{
			id: 'ch02.pivots-rref.4',
			type: 'mcq',
			prompt: 'A consistent system in 3 unknowns reduces to 2 pivots. What can you say?',
			choices: [
				'Infinitely many solutions, with one free variable',
				'Exactly one solution',
				'No solution',
				'Exactly two solutions'
			],
			answer: 0,
			explain: 'Unknowns minus pivots is the number of free variables: $3 - 2 = 1$.'
		},
		{
			id: 'ch02.pivots-rref.5',
			type: 'mcq',
			prompt: 'In RREF, what do the pivot columns look like?',
			choices: [
				'A single $1$ with zeros everywhere else in the column',
				'All ones',
				'All zeros',
				'Any nonzero numbers'
			],
			answer: 0,
			explain: 'Each pivot is $1$ and is the only nonzero entry in its column. That is what makes the form reduced.'
		}
	],
	'ch02.solution-sets': [
		{
			id: 'ch02.solution-sets.1',
			type: 'numeric',
			prompt: 'A consistent system has 4 unknowns and rank 2. How many free variables are there?',
			answer: 2,
			explain: 'Free variables $=$ unknowns $-$ rank $= 4 - 2 = 2$.'
		},
		{
			id: 'ch02.solution-sets.2',
			type: 'vector',
			prompt: 'Find the solution $(x, y)$ of $x + 2y = 4$ with $y = 0$.',
			answer: [4, 0],
			explain: 'With $y = 0$ the equation says $x = 4$.'
		},
		{
			id: 'ch02.solution-sets.3',
			type: 'mcq',
			prompt: 'Every solution of a consistent $A\\mathbf x = \\mathbf b$ has the form…',
			choices: [
				'a particular solution plus a solution of $A\\mathbf x = \\mathbf 0$',
				'a multiple of $\\mathbf b$',
				'a particular solution times a scalar',
				'the zero vector'
			],
			answer: 0,
			explain: 'If $\\mathbf x_p$ and $\\mathbf x$ both solve the system, then $\\mathbf x - \\mathbf x_p$ solves $A\\mathbf x = \\mathbf 0$.'
		},
		{
			id: 'ch02.solution-sets.4',
			type: 'vector',
			prompt: 'Find the solution $(x, y)$ of $x + 2y = 0$ that has $y = 1$.',
			answer: [-2, 1],
			explain: '$x + 2 = 0$ gives $x = -2$. All solutions are multiples of $(-2, 1)$.'
		},
		{
			id: 'ch02.solution-sets.5',
			type: 'mcq',
			prompt: 'Two planes in 3D that are not parallel meet in…',
			choices: ['a line', 'a single point', 'a plane', 'nothing'],
			answer: 0,
			explain: 'Two equations in three unknowns leave one free variable, and the solutions trace out a line.'
		}
	]
};

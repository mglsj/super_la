import type { QuizBank } from '../types';
import { numeric, open, vector } from '../exerciseHelpers';

const C = 'ch02';

export const exercises: QuizBank = {
	'ch02.exercises': [
		vector(
			C,
			'3.18',
			'Solve by elimination: $2x + y - z = 0,\\ x - y + 2z = 9,\\ 3x + 2y + z = 7$. Enter $(x, y, z)$. (Verify it in all three original equations.)',
			[2, -1, 3],
			[
				'Write the augmented matrix $\\left[\\begin{array}{ccc|c} 2&1&-1&0\\\\ 1&-1&2&9\\\\ 3&2&1&7\\end{array}\\right]$ and use the row with a $1$ in the first column ($R_2$) as your pivot row: swap it to the top.',
				'Clear the first column: $R_2 \\leftarrow R_2 - 2R_1$ and $R_3 \\leftarrow R_3 - 3R_1$ (after the swap). You get a $2\\times2$ system in $y$ and $z$.',
				'Eliminate $y$ from the last row to find $z$. Then back-substitute: $z$ gives $y$, and $y, z$ give $x$.'
			],
			'Swap so the pivot is 1: $\\left[\\begin{array}{ccc|c}1&-1&2&9\\\\2&1&-1&0\\\\3&2&1&7\\end{array}\\right]$. Then $R_2 - 2R_1$ gives $[0\\ 3\\ -5\\mid -18]$ and $R_3 - 3R_1$ gives $[0\\ 5\\ -5\\mid -20]$. Divide $R_3$ by $5$: $[0\\ 1\\ -1\\mid -4]$. Now $R_2 - 3R_3$ gives $[0\\ 0\\ -2\\mid -6]$, so $z = 3$. Then $y = z - 4 = -1$ and $x = 9 + y - 2z = 9 - 1 - 6 = 2$.\n\nCheck: $2(2) + (-1) - 3 = 0$ ✓, $2 + 1 + 6 = 9$ ✓, $6 - 2 + 3 = 7$ ✓. The solution is $(2, -1, 3)$.'
		),
		open(
			C,
			'3.19',
			'For each system, decide without fully solving it whether there are no solutions, one, or infinitely many, and say how you know.\n(a) $x + y + z = 1,\\ 2x + 2y + 2z = 3$.\n(b) $x + y = 1,\\ x - y = 3,\\ 2x = 4$.\n(c) $x + y + z = 0,\\ x - z = 0$.',
			[
				'Look for contradictions first: can one equation be turned into another equation whose left side matches but whose right side does not?',
				'A consistent system has a unique solution only if the rank equals the number of unknowns; otherwise there are free variables. Count equations and unknowns, and ask whether a homogeneous system (right side $0$) is ever inconsistent.',
				'For (b), three lines in the plane: do all three pass through one point? Find the point where two of them cross and test it in the third.'
			],
			'(a) **No solution.** Halving the second equation gives $x + y + z = 3/2$, which contradicts $x + y + z = 1$. The planes are parallel and distinct.\n\n(b) **Exactly one solution.** The third equation gives $x = 2$. The first then gives $y = -1$, and the second says $2 - (-1) = 3$ ✓. Three lines in the plane all pass through $(2, -1)$, so there is one solution.\n\n(c) **Infinitely many solutions.** The system is homogeneous, so $\\mathbf 0$ is always a solution (it is consistent), and there are only 2 equations for 3 unknowns, so at least one variable is free. Concretely $x = z$ and $y = -2z$: the line $z(1, -2, 1)$.'
		),
		open(
			C,
			'3.20',
			'Find the complete solution set of $x_1 + 2x_2 + 3x_3 + 4x_4 = 5$, written in the particular-plus-homogeneous form. How many free parameters are there, and why does the rank formula predict that number?',
			[
				'There is only one equation, so only $x_1$ has a pivot; $x_2, x_3, x_4$ are free. Pick any one solution first (set the free variables to $0$).',
				'The homogeneous equation $x_1 + 2x_2 + 3x_3 + 4x_4 = 0$ gives $x_1 = -2x_2 - 3x_3 - 4x_4$. Each free variable, set to $1$ in turn (others $0$), gives one basis vector of the homogeneous solutions.',
				'Number of free parameters $=$ (number of unknowns) $-$ rank.'
			],
			'Set the free variables $x_2 = x_3 = x_4 = 0$ to get the particular solution $\\mathbf x_p = (5, 0, 0, 0)$.\n\nThe homogeneous solutions satisfy $x_1 = -2x_2 - 3x_3 - 4x_4$, so they are spanned by $(-2, 1, 0, 0)$, $(-3, 0, 1, 0)$ and $(-4, 0, 0, 1)$. The complete solution is\n$\\mathbf x = (5,0,0,0) + s(-2,1,0,0) + t(-3,0,1,0) + u(-4,0,0,1)$ with $s,t,u\\in\\mathbb{R}$.\n\nThere are **3 free parameters**. The coefficient matrix $[1\\ 2\\ 3\\ 4]$ has rank $1$ and there are $4$ unknowns, so free parameters $= 4 - 1 = 3$ (the number of non-pivot columns).'
		),
		open(
			C,
			'3.21',
			'For which values of $k$ does the system $x + 2y = 1,\\ 3x + ky = 2$ have a unique solution, and for which does it have no solution? One of the three outcomes (none, one, infinitely many) never occurs here: identify it and explain why. Draw the cases you do find.',
			[
				'Eliminate $x$: subtract $3\\times$ the first equation from the second. The new second equation has the form $(k - 6)y = \\text{something}$.',
				'A unique solution needs a pivot in every column. When does the coefficient $(k - 6)$ vanish, and what does the right-hand side then say?',
				'For the missing outcome: could the second equation ever become a multiple of the first, including the right-hand side?'
			],
			'Subtract $3\\times$(first) from the second: $(k - 6)y = 2 - 3 = -1$.\n\n- If $k \\ne 6$: $y = -1/(k-6)$ and then $x$ follows: **a unique solution**. The two lines cross at one point.\n- If $k = 6$: the equation becomes $0 = -1$: **no solution**. The lines $x + 2y = 1$ and $3x + 6y = 2$ have the same slope but different intercepts, so they are parallel.\n\n**Infinitely many solutions never occurs.** That would need the second equation to be a multiple of the first, but $3x + 6y = 3$ (three times the first) has right side $3$, not $2$, so the lines are never the same line. Picture: for $k\\ne6$ two lines crossing; for $k = 6$ two distinct parallel lines.'
		),
		open(
			C,
			'3.22',
			'Let $A$ be $3\\times5$. Explain why $A\\mathbf x = \\mathbf 0$ must have a nonzero solution, and give the smallest possible number of free parameters. Then construct an $A$ that attains it.',
			[
				'A homogeneous system always has the solution $\\mathbf 0$, so it is consistent. Count: how many unknowns and how many pivots can there be at most?',
				'The rank of a $3\\times5$ matrix is at most $3$. The number of free variables is $5 - \\operatorname{rank}$, so how small can it be?',
				'To attain the minimum you need rank exactly $3$. A simple choice is a matrix with a $3\\times3$ identity block.'
			],
			'There are 5 unknowns but at most 3 pivots (one per row), so there are at least $5 - 3 = 2$ free variables. A free variable can be set to $1$, giving a nonzero solution. So $A\\mathbf x = \\mathbf 0$ always has a nonzero solution, and the **smallest possible number of free parameters is 2**.\n\nIt is attained when the rank is $3$, e.g. $A = \\begin{bmatrix}1&0&0&0&0\\\\0&1&0&0&0\\\\0&0&1&0&0\\end{bmatrix}$. Its solutions are $\\mathbf x = (0,0,0,s,t)$: exactly two free parameters.'
		),
		open(
			C,
			'3.23',
			'Show that if $\\mathbf p$ and $\\mathbf q$ both solve $A\\mathbf x = \\mathbf b$, then $t\\mathbf p + (1-t)\\mathbf q$ solves it for every $t\\in\\mathbb{R}$, but $\\mathbf p + \\mathbf q$ solves it only when $\\mathbf b = \\mathbf 0$. Interpret both statements geometrically.',
			[
				'Just apply $A$: use linearity, $A(t\\mathbf p + (1-t)\\mathbf q) = tA\\mathbf p + (1-t)A\\mathbf q$, and substitute $A\\mathbf p = A\\mathbf q = \\mathbf b$.',
				'For $\\mathbf p + \\mathbf q$ compute $A(\\mathbf p + \\mathbf q)$ the same way. When does the result equal $\\mathbf b$?',
				'Picture the solution set as a line (or plane) that does not pass through the origin. What do the points $t\\mathbf p + (1-t)\\mathbf q$ trace out?'
			],
			'$A(t\\mathbf p + (1-t)\\mathbf q) = tA\\mathbf p + (1-t)A\\mathbf q = t\\mathbf b + (1-t)\\mathbf b = \\mathbf b$. So every point of the form $t\\mathbf p + (1-t)\\mathbf q$ is a solution.\n\n$A(\\mathbf p + \\mathbf q) = \\mathbf b + \\mathbf b = 2\\mathbf b$, which equals $\\mathbf b$ only if $\\mathbf b = \\mathbf 0$.\n\n**Geometry.** The points $t\\mathbf p + (1-t)\\mathbf q$ form the whole straight line through $\\mathbf p$ and $\\mathbf q$: if two points are solutions, the entire line between and beyond them is. The solution set is an affine subspace (a line or plane that need not pass through the origin). The vector $\\mathbf p + \\mathbf q$, by contrast, is the "sum of position vectors", which generally leaves the solution set: it is only guaranteed to stay when the set passes through the origin, i.e. $\\mathbf b = \\mathbf 0$ and the solutions form a subspace.'
		),
		open(
			C,
			'3.24',
			'Bring $\\begin{bmatrix}1&2&1&3\\\\2&4&3&8\\\\1&2&2&5\\end{bmatrix}$ to reduced row echelon form. Identify the pivot columns and the free columns, and state the rank.',
			[
				'Use row 1 as the pivot row. Do $R_2 - 2R_1$ and $R_3 - R_1$. What happens to column 2?',
				'After that, columns 1 and 3 have pivots. Use the new row 2 to clear column 3 above and below it.',
				'Columns without a pivot are the free columns, and the rank is the number of pivots.'
			],
			'$R_2 - 2R_1$ gives $[0\\ 0\\ 1\\ 2]$ and $R_3 - R_1$ gives $[0\\ 0\\ 1\\ 2]$. Then $R_3 - R_2$ gives the zero row, and $R_1 - R_2$ gives $[1\\ 2\\ 0\\ 1]$:\n$\\text{RREF} = \\begin{bmatrix}1&2&0&1\\\\0&0&1&2\\\\0&0&0&0\\end{bmatrix}.$\nThe **pivot columns are 1 and 3**, the **free columns are 2 and 4**, and the **rank is 2**.'
		),
		numeric(
			C,
			'3.25',
			'You must solve $A\\mathbf x = \\mathbf b_j$ for $m$ right-hand sides, with the same $n\\times n$ matrix $A$. Strategy one runs elimination each time: about $\\tfrac23 n^3$ operations per solve. Strategy two computes $A^{-1}$ once ($2n^3$) and then multiplies ($2n^2$ per solve). For large $n$, strategy two overtakes strategy one once $m$ exceeds roughly what number?',
			3,
			[
				'Total cost of strategy one is $m\\cdot\\tfrac23n^3$. Total cost of strategy two is $2n^3 + m\\cdot 2n^2$. Write the inequality "two is cheaper than one".',
				'For large $n$ the $n^2$ terms are negligible next to the $n^3$ terms. Divide both sides by $n^3$ and keep only the dominant terms.',
				'You get $2 < \\tfrac23 m$. Solve for $m$.'
			],
			'Strategy two is cheaper when $2n^3 + 2mn^2 < \\tfrac23 mn^3$. Dividing by $n^3$: $2 + 2m/n < \\tfrac23 m$. For large $n$ the term $2m/n$ vanishes, so the condition is $2 < \\tfrac23 m$, i.e. $m > 3$. (Exactly: $m > 3n/(n-3)$, which tends to $3$.)\n\nLibrary routines do neither. They factor $A = LU$ once at about $\\tfrac23 n^3$ (the same cost as one elimination, a third of the cost of inverting), and then each solve is two triangular solves at about $2n^2$ (the same as one multiplication by $A^{-1}$). Total: $\\tfrac23n^3 + 2mn^2$. That is cheaper than strategy one as soon as $m\\ge2$, and always cheaper than strategy two because the one-off cost is $\\tfrac23n^3$ instead of $2n^3$, with the same cost per solve. (Inverting is also less accurate.)',
			{ tol: 0.01 }
		),
		open(
			C,
			'3.26',
			'Theorem 3.9 asserts uniqueness for the *reduced* form only. For $A = \\begin{bmatrix}1&2&1\\\\2&4&3\\\\1&2&2\\end{bmatrix}$, find two different sequences of elementary row operations reaching two different matrices in row echelon form, and then check that reducing each one further gives the same result. Where in the definition is the freedom that allows this?',
			[
				'Both routes start the same way: $R_2 - 2R_1$ and $R_3 - R_1$ give rows $[0\\ 0\\ 1]$ and $[0\\ 0\\ 1]$. Now choose how to finish: subtract $R_2$ from $R_3$ (route 1), or something different (route 2).',
				'Echelon form (not reduced) allows any nonzero pivot values and any entries above the pivots. For route 2, try scaling a row by 3, or adding a multiple of the pivot row to the row above it.',
				'Finally scale each pivot to $1$ and clear above the pivots. Both routes must land on the same matrix.'
			],
			'After $R_2 - 2R_1$ and $R_3 - R_1$ the matrix is $\\begin{bmatrix}1&2&1\\\\0&0&1\\\\0&0&1\\end{bmatrix}$.\n\n**Route 1:** $R_3 - R_2$ gives $E_1 = \\begin{bmatrix}1&2&1\\\\0&0&1\\\\0&0&0\\end{bmatrix}$, an echelon form.\n\n**Route 2:** also scale $R_2$ by $3$ and then add it to $R_1$: $E_2 = \\begin{bmatrix}1&2&4\\\\0&0&3\\\\0&0&0\\end{bmatrix}$ (again echelon: a staircase of nonzero pivots with zeros below them), and $E_1\\ne E_2$.\n\n**Reducing further:** in each, scale the pivot row to get pivot $1$ and clear above it. $E_1$: $R_1 - R_2$ gives $\\begin{bmatrix}1&2&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$. $E_2$: $R_2/3$ gives $[0\\ 0\\ 1]$, then $R_1 - 4R_2$ gives $[1\\ 2\\ 0]$: the same matrix.\n\n**Where is the freedom?** Definition 3.6 for row echelon form only asks for a staircase of nonzero leading entries with zeros *below* them. It does not require pivots to equal $1$ and does not restrict the entries *above* a pivot. The reduced form pins both down, which is why only it is unique.'
		)
	]
};

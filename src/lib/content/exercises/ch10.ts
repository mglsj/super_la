import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch10';

export const exercises: QuizBank = {
	'ch10.exercises': [
		open(
			C,
			'11.16',
			'Find the Jordan form of each matrix, and a basis of chains realising it.\n(a) $\\begin{bmatrix}2&1\\\\0&2\\end{bmatrix}$  (b) $\\begin{bmatrix}5&0\\\\0&5\\end{bmatrix}$  (c) $\\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$',
			[
				'For each eigenvalue $\\lambda$ the number of Jordan blocks equals $\\dim\\ker(A - \\lambda I)$.',
				'A chain of length $m$ is a vector $\\mathbf v$ with $(A - \\lambda I)^m\\mathbf v = \\mathbf 0$ but $(A - \\lambda I)^{m-1}\\mathbf v\\ne\\mathbf 0$, together with $(A - \\lambda I)\\mathbf v,\\dots$.',
				'(b) is already diagonal. (c) is a single nilpotent block: find a vector that survives two applications of $A$.'
			],
			'(a) Already a single Jordan block $J_2(2)$. $N = A - 2I = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$. Chain: $\\mathbf v = (0,1)$, $N\\mathbf v = (1,0)$, $N^2\\mathbf v = \\mathbf 0$. Basis $\\{(1,0),(0,1)\\}$ in order $N\\mathbf v,\\mathbf v$.\n\n(b) $5I$ is its own Jordan form: two $1\\times1$ blocks $J_1(5)\\oplus J_1(5)$, chains $\\{(1,0)\\}$ and $\\{(0,1)\\}$.\n\n(c) $N = A$, with $N\\mathbf e_3 = \\mathbf e_2$, $N\\mathbf e_2 = \\mathbf e_1$, $N\\mathbf e_1 = \\mathbf 0$. One chain $\\mathbf e_3\\mapsto\\mathbf e_2\\mapsto\\mathbf e_1\\mapsto\\mathbf 0$ of length $3$: Jordan form $J_3(0) = A$ itself.'
		),
		open(
			C,
			'11.17',
			'A $6\\times6$ matrix has the single eigenvalue $2$, and the ranks of $(A - 2I)^k$ for $k = 1,2,3,4$ are $3,1,0,0$. Determine the Jordan form, draw its dot diagram, and state the minimal polynomial.',
			[
				'Nullities $\\dim\\ker(A - 2I)^k = 6 - \\text{rank}$ are $3, 5, 6, 6$.',
				'The number of blocks of size $\\ge k$ equals $\\dim\\ker N^k - \\dim\\ker N^{k-1}$. Compute it for $k = 1,2,3$.',
				'The minimal polynomial exponent is the size of the largest block.'
			],
			'Nullities: $3, 5, 6, 6$. Blocks of size $\\ge1$: $3$. Blocks of size $\\ge2$: $5 - 3 = 2$. Blocks of size $\\ge3$: $6 - 5 = 1$. Size $\\ge4$: $0$.\n\nSo one block of size $3$, one of size $2$, one of size $1$: $J = J_3(2)\\oplus J_2(2)\\oplus J_1(2)$ ($3 + 2 + 1 = 6$ ✓).\n\nDot diagram (columns = blocks): the rows have $3, 2, 1$ dots.\n$$\\begin{matrix}\\bullet&\\bullet&\\bullet\\\\\\bullet&\\bullet&\\\\\\bullet&&\\end{matrix}$$\n\nMinimal polynomial: $(t - 2)^3$ (largest block has size $3$). Characteristic polynomial $(t-2)^6$.'
		),
		open(
			C,
			'11.18',
			'Give two $4\\times4$ matrices with the same characteristic polynomial and the same minimal polynomial that are nevertheless not similar. Hint: five Jordan types are possible for a single eigenvalue of multiplicity four; find two of them that agree on the largest block size.',
			[
				'List the partitions of $4$: $4$; $3+1$; $2+2$; $2+1+1$; $1+1+1+1$.',
				'Which two share the same largest part? Distinguish them by $\\operatorname{rank}N$ or the number of blocks.'
			],
			'Take $A = J_2(0)\\oplus J_2(0)$ and $B = J_2(0)\\oplus J_1(0)\\oplus J_1(0)$. Both have characteristic polynomial $t^4$ and minimal polynomial $t^2$ (largest block $2$). But $\\operatorname{rank}A = 2$ while $\\operatorname{rank}B = 1$ (rank is a similarity invariant), so they are not similar. Characteristic and minimal polynomials do not determine the Jordan form completely when $n\\ge4$.'
		),
		open(
			C,
			'11.19',
			'Verify Cayley–Hamilton directly for $A = \\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$ by computing $p_A$ and then $p_A(A)$. Then use $p_A(A) = 0$ to express $A^{-1}$ as a polynomial in $A$.',
			[
				'$p_A(t) = t^2 - (\\operatorname{tr}A)t + \\det A$.',
				'Compute $A^2$, then $A^2 - 5A - 2I$.',
				'Rearrange $A^2 - 5A = 2I$ into $A(A - 5I) = 2I$.'
			],
			'$p_A(t) = t^2 - 5t - 2$. $A^2 = \\begin{bmatrix}7&10\\\\15&22\\end{bmatrix}$, so $A^2 - 5A - 2I = \\begin{bmatrix}7 - 5 - 2&10 - 10\\\\15 - 15&22 - 20 - 2\\end{bmatrix} = 0$ ✓.\n\nFrom $A^2 - 5A = 2I$: $A\\cdot\\tfrac12(A - 5I) = I$, so $A^{-1} = \\tfrac12(A - 5I) = \\begin{bmatrix}-2&1\\\\\\tfrac32&-\\tfrac12\\end{bmatrix}$ (which matches the $2\\times2$ inverse formula with $\\det A = -2$).'
		),
		open(
			C,
			'11.20',
			'How many similarity classes of nilpotent $5\\times5$ complex matrices are there? Hint: a nilpotent Jordan form is determined by the sizes of its blocks, which are a partition of $5$.',
			[
				'A nilpotent matrix has only eigenvalue $0$, so its Jordan form is a direct sum of blocks $J_m(0)$ with sizes adding to $5$.',
				'Count partitions of $5$ (order does not matter).'
			],
			'Partitions of $5$: $5$; $4+1$; $3+2$; $3+1+1$; $2+2+1$; $2+1+1+1$; $1+1+1+1+1$. That is **7** similarity classes (the last one is the zero matrix).'
		),
		open(
			C,
			'11.21',
			'Let $N$ be nilpotent. Show that $I + N$ is invertible and write its inverse as a finite sum. Deduce that every eigenvalue of $I + N$ equals $1$.',
			[
				'Say $N^k = 0$. Think of the geometric series $1/(1 + x) = 1 - x + x^2 - \\cdots$ and cut it off.',
				'Multiply $(I + N)$ by $I - N + N^2 - \\dots + (-1)^{k-1}N^{k-1}$ and watch the terms telescope.',
				'If $(I + N)\\mathbf v = \\mu\\mathbf v$ then $N\\mathbf v = (\\mu - 1)\\mathbf v$.'
			],
			'$(I + N)\\big(I - N + N^2 - \\dots + (-1)^{k-1}N^{k-1}\\big) = I + (-1)^{k-1}N^k = I$ (all middle terms cancel in pairs and $N^k = 0$). So $(I+N)^{-1} = \\sum_{j=0}^{k-1}(-1)^jN^j$.\n\nIf $(I+N)\\mathbf v = \\mu\\mathbf v$ with $\\mathbf v\\ne\\mathbf 0$ then $N\\mathbf v = (\\mu - 1)\\mathbf v$, so $\\mu - 1$ is an eigenvalue of $N$; the only eigenvalue of a nilpotent matrix is $0$. Hence $\\mu = 1$.'
		),
		open(
			C,
			'11.22',
			'Using the exponential example, compute $e^{tJ_2(\\lambda)}$ explicitly, and use it to solve $\\mathbf y\' = J_2(0)\\mathbf y$ with $\\mathbf y(0) = (0,1)$. Why does a solution grow like $t$ even though the eigenvalue is zero?',
			[
				'Write $J_2(\\lambda) = \\lambda I + N$ with $N = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$, $N^2 = 0$. Since $\\lambda I$ and $N$ commute, $e^{t(\\lambda I+N)} = e^{\\lambda t}e^{tN}$.',
				'$e^{tN} = I + tN$ because the series stops. Then set $\\lambda = 0$ and apply to $(0,1)$.'
			],
			'$e^{tN} = I + tN = \\begin{bmatrix}1&t\\\\0&1\\end{bmatrix}$, so $e^{tJ_2(\\lambda)} = e^{\\lambda t}\\begin{bmatrix}1&t\\\\0&1\\end{bmatrix}$.\n\nFor $\\lambda = 0$: $\\mathbf y(t) = \\begin{bmatrix}1&t\\\\0&1\\end{bmatrix}\\begin{bmatrix}0\\\\1\\end{bmatrix} = (t, 1)$. (Check: $y_1\' = y_2 = 1$ ✓, $y_2\' = 0$ ✓.)\n\nThe solution grows like $t$ because $J_2(0)$ is nilpotent but **not zero**: the off-diagonal $1$ feeds $y_2$ into $y_1$ at a constant rate, so $y_1$ keeps accumulating. Eigenvalues only control exponential behaviour; a defective eigenvalue contributes polynomial factors $t^{m-1}$ for a block of size $m$.'
		),
		open(
			C,
			'11.23',
			'For $A = \\begin{bmatrix}3&1&0\\\\0&3&0\\\\0&0&5\\end{bmatrix}$, compute $\\ker(A - 3I)$, $\\ker(A - 3I)^2$ and $\\ker(A-5I)$, and confirm that $\\mathbb{R}^3$ is the direct sum of the generalised eigenspaces.',
			[
				'Write out $A - 3I = \\begin{bmatrix}0&1&0\\\\0&0&0\\\\0&0&2\\end{bmatrix}$ and square it.',
				'The generalised eigenspace for $3$ is the kernel of $(A - 3I)^k$ for $k$ large enough that it stops growing.'
			],
			'$A - 3I = \\begin{bmatrix}0&1&0\\\\0&0&0\\\\0&0&2\\end{bmatrix}$: kernel $\\{y = z = 0\\} = \\operatorname{span}\\{\\mathbf e_1\\}$.\n$(A - 3I)^2 = \\begin{bmatrix}0&0&0\\\\0&0&0\\\\0&0&4\\end{bmatrix}$: kernel $\\{z = 0\\} = \\operatorname{span}\\{\\mathbf e_1,\\mathbf e_2\\}$, and it does not grow further.\n$A - 5I = \\begin{bmatrix}-2&1&0\\\\0&-2&0\\\\0&0&0\\end{bmatrix}$: kernel $\\operatorname{span}\\{\\mathbf e_3\\}$.\n\nSo $\\mathbb{R}^3 = \\operatorname{span}\\{\\mathbf e_1,\\mathbf e_2\\}\\oplus\\operatorname{span}\\{\\mathbf e_3\\}$, i.e. the generalised eigenspaces for $3$ (dimension $2$ = algebraic multiplicity) and $5$ (dimension $1$). The kernels of powers increase ($1\\to2$) and then stabilise, at the size of the largest block.'
		),
		open(
			C,
			'11.24',
			'A real matrix may have no real Jordan form, because its eigenvalues may be complex. What is the Jordan form over $\\mathbb{C}$ of the rotation $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, and why does no real similarity produce it?',
			[
				'The characteristic polynomial is $\\lambda^2 + 1$. What are its roots?',
				'A real similarity $P^{-1}AP$ with $P$ and $A$ real stays real. Can a real matrix equal $\\operatorname{diag}(i,-i)$?'
			],
			'The eigenvalues are $\\pm i$, distinct, so the Jordan form over $\\mathbb{C}$ is $\\operatorname{diag}(i, -i)$, with eigenvectors $(1,-i)$ and $(1,i)$ (complex).\n\nA similarity with a **real** $P$ applied to a real matrix always gives a real matrix, but $\\operatorname{diag}(i,-i)$ has non-real entries. So no real change of basis produces it; one must allow complex bases. The real substitute is the rotation block $\\begin{bmatrix}a&-b\\\\b&a\\end{bmatrix}$ for the conjugate pair $a\\pm bi$; here the matrix is already in this real Jordan form with $a = 0, b = 1$.'
		)
	]
};

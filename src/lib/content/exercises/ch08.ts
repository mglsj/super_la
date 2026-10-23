import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch08';

export const exercises: QuizBank = {
	'ch08.exercises': [
		open(
			C,
			'9.20',
			'Find the eigenvalues and a basis of each eigenspace.\n(a) $\\begin{bmatrix}5&2\\\\2&5\\end{bmatrix}$  (b) $\\begin{bmatrix}4&1\\\\0&4\\end{bmatrix}$  (c) $\\begin{bmatrix}2&0&0\\\\1&3&0\\\\4&5&-1\\end{bmatrix}$  (d) $\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}$\nIn each case check your answer against the trace and determinant theorem.',
			[
				'Solve $\\det(A - \\lambda I) = 0$. In (b) and (c) the matrix is triangular, so the eigenvalues are the diagonal entries.',
				'For each eigenvalue $\\lambda$ solve $(A - \\lambda I)\\mathbf x = \\mathbf 0$; the free parameters give the basis of the eigenspace.',
				'Check: eigenvalues must add up to the trace and multiply to the determinant.'
			],
			'(a) $\\lambda^2 - 10\\lambda + 21 = 0$, so $\\lambda = 7, 3$. $E_7 = \\operatorname{span}\\{(1,1)\\}$, $E_3 = \\operatorname{span}\\{(1,-1)\\}$. Sum $10$ = trace, product $21$ = det ✓.\n\n(b) $\\lambda = 4$ (twice). $A - 4I = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ gives $y = 0$, so $E_4 = \\operatorname{span}\\{(1,0)\\}$ (only one dimension). Sum $8$, product $16$ ✓.\n\n(c) Triangular: $\\lambda = 2, 3, -1$. $E_2 = \\operatorname{span}\\{(-3,3,1)\\}$, $E_3 = \\operatorname{span}\\{(0,4,5)\\}$, $E_{-1} = \\operatorname{span}\\{(0,0,1)\\}$. Sum $4$ = trace, product $-6$ = det ✓.\n\n(d) $\\lambda^2 + 3\\lambda + 2 = 0$, so $\\lambda = -1, -2$. $E_{-1} = \\operatorname{span}\\{(1,-1)\\}$, $E_{-2} = \\operatorname{span}\\{(1,-2)\\}$. Sum $-3$ = trace, product $2$ = det ✓.'
		),
		open(
			C,
			'9.21',
			'For each matrix in Exercise 9.20, state the algebraic and geometric multiplicity of every eigenvalue, and say where the inequality "geometric $\\le$ algebraic" is an equality and where it is strict.',
			[
				'Algebraic multiplicity = how many times $\\lambda$ is a root of the characteristic polynomial. Geometric = $\\dim E_\\lambda$.',
				'Only one matrix in 9.20 has a repeated eigenvalue. That is the only place the inequality can be strict.'
			],
			'(a) $7$ and $3$: algebraic $1$, geometric $1$ each (equal).\n(b) $4$: algebraic $2$, geometric $1$: **strict**. This matrix is a shear and is not diagonalisable.\n(c) $2, 3, -1$: all algebraic $1$, geometric $1$ (equal).\n(d) $-1, -2$: algebraic $1$, geometric $1$ (equal).\n\nWhenever the algebraic multiplicity is $1$ the geometric one is squeezed between $1$ and $1$, so the inequality can only be strict for repeated eigenvalues.'
		),
		open(
			C,
			'9.22',
			'Prove that $A$ and $A + cI$ have the same eigenvectors, with eigenvalues shifted by $c$. Then use it to find the eigenvalues of the $n\\times n$ matrix with $a$ on the diagonal and $b$ everywhere else.',
			[
				'If $A\\mathbf v = \\lambda\\mathbf v$, compute $(A + cI)\\mathbf v$.',
				'Write the matrix as $(a - b)I + bJ$ where $J$ is the all-ones matrix. $J\\mathbf 1 = n\\mathbf 1$, and any vector with entries summing to $0$ is sent to $\\mathbf 0$ by $J$.'
			],
			'$(A + cI)\\mathbf v = A\\mathbf v + c\\mathbf v = (\\lambda + c)\\mathbf v$. So every eigenvector of $A$ is one of $A + cI$ with eigenvalue $\\lambda + c$; the converse follows by shifting back by $-c$.\n\nThe matrix is $(a-b)I + bJ$. $J$ has rank $1$: $J\\mathbf 1 = n\\mathbf 1$, and $J\\mathbf x = \\mathbf 0$ for the $(n-1)$-dimensional space of vectors with entries summing to $0$. So $J$ has eigenvalues $n$ (once) and $0$ ($n-1$ times). Shifting by $(a - b)$ and scaling by $b$: eigenvalues are\n$a + (n-1)b$ (once, eigenvector $\\mathbf 1$) and $a - b$ ($n-1$ times).'
		),
		open(
			C,
			'9.23',
			'Let $P$ satisfy $P^2 = P$ (a projection). Show that every eigenvalue of $P$ is $0$ or $1$. Then show that $V = \\ker P\\oplus\\operatorname{Im}P$ in the sense that every $v$ splits uniquely as $(v - Pv) + Pv$.',
			[
				'If $P\\mathbf v = \\lambda\\mathbf v$ then apply $P$ again and compare $P^2\\mathbf v$ with $P\\mathbf v$.',
				'Show $v - Pv\\in\\ker P$ (apply $P$ and use $P^2 = P$), and $Pv\\in\\operatorname{Im}P$. For uniqueness, show $\\ker P\\cap\\operatorname{Im}P = \\{\\mathbf 0\\}$: if $w = Pu$ and $Pw = 0$, then $w = Pu = P^2u = Pw$.'
			],
			'**Eigenvalues.** $P\\mathbf v = \\lambda\\mathbf v$ gives $\\lambda\\mathbf v = P\\mathbf v = P^2\\mathbf v = \\lambda^2\\mathbf v$, so $\\lambda(\\lambda - 1) = 0$ for $\\mathbf v\\ne\\mathbf 0$: $\\lambda\\in\\{0, 1\\}$.\n\n**Splitting.** $P(v - Pv) = Pv - P^2v = 0$, so $v - Pv\\in\\ker P$, and $Pv\\in\\operatorname{Im}P$; hence $v = (v - Pv) + Pv$ exists.\n\n**Unique.** If $w\\in\\ker P\\cap\\operatorname{Im}P$ then $w = Pu$ for some $u$, and $w = Pu = P^2u = P(Pu) = Pw = 0$. So the intersection is $\\{\\mathbf 0\\}$ and the decomposition is unique. Geometrically $P$ is the identity on its image and kills its kernel.'
		),
		open(
			C,
			'9.24',
			'Let $N$ satisfy $N^k = 0$ for some $k$. Prove that the only eigenvalue of $N$ is $0$, and deduce that $\\det(N - \\lambda I) = (-1)^n\\lambda^n$ over $\\mathbb{C}$. Give a $3\\times3$ example whose eigenspace for $0$ has dimension exactly $1$.',
			[
				'If $N\\mathbf v = \\lambda\\mathbf v$ with $\\mathbf v\\ne\\mathbf 0$, apply $N$ repeatedly: $N^k\\mathbf v = \\lambda^k\\mathbf v$.',
				'Over $\\mathbb{C}$ the characteristic polynomial of degree $n$ factors completely, and every root is $0$.',
				'Try the matrix with $1$s just above the diagonal.'
			],
			'$\\mathbf 0 = N^k\\mathbf v = \\lambda^k\\mathbf v$ and $\\mathbf v\\ne\\mathbf 0$ force $\\lambda^k = 0$, so $\\lambda = 0$.\n\nOver $\\mathbb{C}$, $\\det(N - \\lambda I)$ is a polynomial of degree $n$ with leading coefficient $(-1)^n$ that splits into linear factors $(\\lambda_i - \\lambda)$ over its roots; all roots are $0$, giving $(-1)^n\\lambda^n$.\n\n**Example.** $N = \\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$ has $N^3 = 0$. $N\\mathbf x = (x_2, x_3, 0) = \\mathbf 0$ forces $x_2 = x_3 = 0$, so $E_0 = \\operatorname{span}\\{(1,0,0)\\}$, dimension exactly $1$ while the algebraic multiplicity is $3$.'
		),
		open(
			C,
			'9.25',
			'Find the complex eigenvalues and eigenvectors of the rotation matrix $R = \\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$, and check that their sum is the trace and their product the determinant. For which $\\theta$ are the eigenvalues real, and what is the map then?',
			[
				'Characteristic polynomial: $\\lambda^2 - (2\\cos\\theta)\\lambda + 1 = 0$. Use the quadratic formula and Euler: $\\cos\\theta\\pm i\\sin\\theta$.',
				'Test the vector $(1, -i)$: compute $R(1,-i)$ and compare with $e^{i\\theta}(1,-i)$.'
			],
			'$\\lambda = \\dfrac{2\\cos\\theta\\pm\\sqrt{4\\cos^2\\theta - 4}}{2} = \\cos\\theta\\pm i\\sin\\theta = e^{\\pm i\\theta}$.\n\nEigenvectors: $R(1,-i)^{\\mathsf T} = (\\cos\\theta + i\\sin\\theta,\\ \\sin\\theta - i\\cos\\theta) = e^{i\\theta}(1,-i)$, so $(1,-i)$ goes with $e^{i\\theta}$ and, by conjugation, $(1, i)$ goes with $e^{-i\\theta}$.\n\nSum $= 2\\cos\\theta = \\operatorname{tr}R$ ✓; product $= e^{i\\theta}e^{-i\\theta} = 1 = \\det R$ ✓.\n\nThe eigenvalues are real only when $\\sin\\theta = 0$, i.e. $\\theta = 0$ (the map is the identity, eigenvalue $1$ twice) or $\\theta = \\pi$ (the map is $-I$, eigenvalue $-1$ twice). For every other angle no real vector keeps its direction under a rotation.'
		),
		open(
			C,
			'9.26',
			'Suppose $AB = BA$ and $\\mathbf v$ is an eigenvector of $A$ for an eigenvalue $\\lambda$ whose eigenspace $E_\\lambda$ is one-dimensional. Show that $\\mathbf v$ is also an eigenvector of $B$. Hint: show first that $B$ maps $E_\\lambda$ into itself.',
			[
				'Take $\\mathbf w\\in E_\\lambda$ and compute $A(B\\mathbf w)$ using $AB = BA$.',
				'So $B\\mathbf w$ is again in $E_\\lambda$. If $E_\\lambda$ is a line, what does that say about $B\\mathbf v$?'
			],
			'For $\\mathbf w\\in E_\\lambda$: $A(B\\mathbf w) = B(A\\mathbf w) = B(\\lambda\\mathbf w) = \\lambda(B\\mathbf w)$, so $B\\mathbf w\\in E_\\lambda$. Since $E_\\lambda$ is one-dimensional and spanned by $\\mathbf v$, $B\\mathbf v$ is a multiple of $\\mathbf v$: $B\\mathbf v = \\mu\\mathbf v$. Since $\\mathbf v\\ne\\mathbf 0$ this says $\\mathbf v$ is an eigenvector of $B$.\n\n(So commuting matrices share eigenvectors, the idea behind simultaneous diagonalisation.)'
		),
		open(
			C,
			'9.27',
			'Let $q(t) = t^n + k_{n-1}t^{n-1} + \\dots + k_0$ and let $C$ be the $n\\times n$ matrix with ones on the subdiagonal, $-k_0,\\dots,-k_{n-1}$ in the last column and zeros elsewhere. Verify for $n = 3$ that $\\det(C - \\lambda I) = (-1)^3q(\\lambda)$. Explain why this makes the claim about the quintic in Section 9.6 correct.',
			[
				'For $n = 3$ write $C = \\begin{bmatrix}0&0&-k_0\\\\1&0&-k_1\\\\0&1&-k_2\\end{bmatrix}$ and expand $\\det(C - \\lambda I)$ along the first row.',
				'The point of the claim: every monic polynomial is the characteristic polynomial of some matrix.'
			],
			'$C - \\lambda I = \\begin{bmatrix}-\\lambda&0&-k_0\\\\1&-\\lambda&-k_1\\\\0&1&-k_2-\\lambda\\end{bmatrix}$. Expanding along row 1:\n$-\\lambda\\big[(-\\lambda)(-k_2-\\lambda) + k_1\\big] - 0 + (-k_0)\\big[1\\cdot1 - 0\\big] = -\\lambda^3 - k_2\\lambda^2 - k_1\\lambda - k_0 = -q(\\lambda)$. ✓\n\n**Consequence.** Every monic polynomial $q$ is the characteristic polynomial of its companion matrix $C$, so the roots of $q$ are exactly the eigenvalues of $C$. If there were a general formula in radicals for eigenvalues of $5\\times5$ matrices, it would solve every quintic. But the quintic has no solution in radicals, so no such formula for eigenvalues exists. Eigenvalues must be computed numerically (iteration), not by a finite formula.'
		),
		open(
			C,
			'9.28',
			'Take $A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ and $\\mathbf x_0 = (1,0)$. Compute $\\mathbf x_{j+1} = A\\mathbf x_j/\\lVert A\\mathbf x_j\\rVert$ for $j = 0,1,2,3$ and watch the sequence approach an eigenvector. Which one, and why that one rather than the other?',
			[
				'First find the eigenpairs of $A$: $\\lambda = 3$ with $(1,1)$ and $\\lambda = 1$ with $(1,-1)$.',
				'Write $\\mathbf x_0$ in the eigenbasis. Each multiplication by $A$ multiplies the $(1,1)$-part by $3$ but the $(1,-1)$-part only by $1$.'
			],
			'$A\\mathbf x_0 = (2,1)$, norm $\\sqrt5$: $\\mathbf x_1\\approx(0.894, 0.447)$.\n$A\\mathbf x_1\\approx(2.236, 1.789)$: $\\mathbf x_2\\approx(0.781, 0.625)$.\n$\\mathbf x_3\\approx(0.733, 0.681)$ and $\\mathbf x_4\\approx(0.716, 0.698)$.\n\nThe sequence tends to $(1,1)/\\sqrt2\\approx(0.707, 0.707)$: the eigenvector for the **dominant** eigenvalue $3$.\n\n**Why.** $\\mathbf x_0 = \\tfrac12(1,1) + \\tfrac12(1,-1)$. After $j$ steps (before normalising) the components are $\\tfrac12 3^j(1,1) + \\tfrac12\\cdot1^j(1,-1)$. The $3^j$ term swamps the other one, and the angle to $(1,1)$ shrinks by a factor of $3$ each step. This is the power method.'
		)
	]
};

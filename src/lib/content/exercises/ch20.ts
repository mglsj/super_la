import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch20';

export const exercises: QuizBank = {
	'ch20.exercises': [
		open(
			C,
			'21.15',
			'Decide, for each of $\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$, $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ and $\\begin{bmatrix}2&-1\\\\-1&2\\end{bmatrix}$, whether it is nonnegative (all entries $\\ge0$) and whether it is positive semidefinite. One of the three is both, one is only the first and one is only the second; identify which is which, and then give a fourth matrix that is neither.',
			[
				'Nonnegative is about entries; positive semidefinite is about eigenvalues. They are unrelated properties.',
				'Eigenvalues: $\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ has $3,1$; $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has $1,-1$; $\\begin{bmatrix}2&-1\\\\-1&2\\end{bmatrix}$ has $3,1$.'
			],
			'- $\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$: all entries $\\ge0$ and eigenvalues $3,1>0$: **both**.\n- $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$: nonnegative, but eigenvalues $1,-1$ (indefinite): **only nonnegative**.\n- $\\begin{bmatrix}2&-1\\\\-1&2\\end{bmatrix}$: has negative entries, but eigenvalues $3,1>0$: **only positive semidefinite**.\n\n**Neither:** $-I_2$, or $\\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$ (negative entries and eigenvalues $\\pm1$).'
		),
		open(
			C,
			'21.16',
			'For $A = \\begin{bmatrix}2&1\\\\1&3\\end{bmatrix}$ compute the Perron root and a Perron vector exactly, and check that the Perron root lies between the smallest and largest row sums. Then evaluate $\\min_i (A\\mathbf x)_i/x_i$ (over $x_i>0$) at $\\mathbf x = (1,0)$, $(1,1)$ and $(1,2)$, and observe that all three are at most $\\rho$.',
			[
				'Characteristic polynomial: $\\lambda^2 - 5\\lambda + 5 = 0$. The Perron root is the larger root.',
				'Eigenvector: from $(2 - \\lambda)v_1 + v_2 = 0$ take $v_1 = 1$.',
				'Row sums are $3$ and $4$.'
			],
			'$\\lambda = \\dfrac{5\\pm\\sqrt5}2$; Perron root $\\rho = \\dfrac{5 + \\sqrt5}2\\approx3.618$. From $(2 - \\rho)v_1 + v_2 = 0$: $v_2 = (\\rho - 2)v_1 = \\dfrac{1 + \\sqrt5}2v_1$, so the Perron vector is $\\mathbf v = \\left(1,\\ \\tfrac{1 + \\sqrt5}2\\right)\\approx(1,1.618)$, strictly positive.\n\n**Row sums:** $3\\le\\rho\\le4$ ✓ (the Perron root lies between the smallest and largest row sums).\n\n**Collatz–Wielandt ratios** $\\min_i(A\\mathbf x)_i/x_i$:\n- $\\mathbf x = (1,0)$: $A\\mathbf x = (2,1)$; only $x_1>0$ counts: ratio $2$.\n- $\\mathbf x = (1,1)$: $A\\mathbf x = (3,4)$; ratios $3,4$; min $3$.\n- $\\mathbf x = (1,2)$: $A\\mathbf x = (4,7)$; ratios $4, 3.5$; min $3.5$.\n\nAll are $\\le\\rho\\approx3.618$, and the best guess $(1,2)$ is closest because it is nearly the Perron direction; the bound is attained exactly at $\\mathbf x = \\mathbf v$.'
		),
		open(
			C,
			'21.17',
			'Draw the digraph of $A = \\begin{bmatrix}0&1&0\\\\0&0&1\\\\1&1&0\\end{bmatrix}$ and decide whether it is irreducible and whether it is primitive. Compute $(I + A)^2$ and check the irreducibility lemma. Find the smallest $k$ with $A^k>0$.',
			[
				'Draw an edge $i\\to j$ whenever $a_{ij}>0$. Here: $1\\to2$, $2\\to3$, $3\\to1$, $3\\to2$.',
				'Irreducible means strongly connected. Primitive means irreducible with cycle lengths having gcd $1$. List the cycle lengths.',
				'Compute successive powers $A^2, A^3,\\dots$ until all entries are positive.'
			],
			'**Digraph:** edges $1\\to2\\to3\\to1$ and $3\\to2$. Every vertex reaches every other: **irreducible**. Cycles: $1\\to2\\to3\\to1$ (length $3$) and $2\\to3\\to2$ (length $2$); $\\gcd(3,2) = 1$, so **primitive**.\n\n$A^2 = \\begin{bmatrix}0&0&1\\\\1&1&0\\\\0&1&1\\end{bmatrix}$, so $(I + A)^2 = I + 2A + A^2 = \\begin{bmatrix}1&2&1\\\\1&2&2\\\\2&3&2\\end{bmatrix}>0$ ✓ (the lemma: irreducible $n\\times n$ implies $(I + A)^{n-1}>0$).\n\nPowers: $A^3 = \\begin{bmatrix}1&1&0\\\\0&1&1\\\\1&1&1\\end{bmatrix}$, $A^4 = \\begin{bmatrix}0&1&1\\\\1&1&1\\\\1&2&1\\end{bmatrix}$ (still has zeros), $A^5 = \\begin{bmatrix}1&1&1\\\\1&2&1\\\\1&1&2\\end{bmatrix}>0$. So the smallest $k$ is **5** $= (n-1)^2 + 1$, the Wielandt bound (this matrix is an extremal case).'
		),
		open(
			C,
			'21.18',
			'Let $A = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$. Verify every conclusion of the Perron–Frobenius theorem for it, then show that $A^k$ does not converge. Which step of the convergence proof for primitive matrices fails, and at which matrix entry?',
			[
				'$A$ is irreducible (the digraph is $1\\leftrightarrow2$). Find its eigenvalues and eigenvectors.',
				'Compute $A^2, A^3$.',
				'The convergence theorem needs $A^k>0$ for some $k$ (primitive), which forces every other eigenvalue to have $|\\lambda|<\\rho$.'
			],
			'Eigenvalues $\\pm1$. Perron root $\\rho = 1$ is simple, with positive eigenvector $(1,1)$, and $\\rho = \\max|\\lambda|$ ✓, $\\min$ and $\\max$ row sums both $1$ ✓. All Perron–Frobenius conclusions for irreducible matrices hold.\n\nBut $A^2 = I$, $A^3 = A$, ... alternates and does not converge (nor does $(A/\\rho)^k$).\n\n**What fails:** the convergence step needs $|\\lambda|<\\rho$ for all other eigenvalues, which relies on some power $A^k$ being strictly positive. Here the second eigenvalue $-1$ has $|{-1}| = \\rho$ because the matrix is irreducible but **periodic** (not primitive): every power has a zero entry, e.g. $(A^k)_{11} = 0$ for odd $k$ and $(A^k)_{12} = 0$ for even $k$, so positivity (the strict inequality) fails at those entries.'
		),
		open(
			C,
			'21.19',
			'Let $A = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$. Show that $A\\ge0$ but is not irreducible, that $\\rho(A) = 1$ has algebraic multiplicity two, and that no positive eigenvector exists. Which hypothesis of the Perron–Frobenius theorem is being used where, and where does the irreducibility lemma break down?',
			[
				'The digraph has edges $1\\to1$, $1\\to2$, $2\\to2$ but no edge from $2$ back to $1$. Is it strongly connected?',
				'Find the eigenspace of the eigenvalue $1$.',
				'Compute $I + A = \\begin{bmatrix}2&1\\\\0&2\\end{bmatrix}$ and its powers.'
			],
			'The entry $a_{21} = 0$ and no path leads from $2$ to $1$, so the digraph is not strongly connected: **not irreducible**.\n\nThe characteristic polynomial is $(\\lambda - 1)^2$, so $\\rho = 1$ has algebraic multiplicity $2$. $A - I = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ has kernel spanned by $(1,0)$ only (geometric multiplicity $1$): the only eigenvector is $(1,0)$, which is nonnegative but **not positive**.\n\nIrreducibility is what gives (i) positivity of the Perron vector and (ii) simplicity of the Perron root. Both conclusions fail here, though the weaker conclusions ($\\rho$ is an eigenvalue with a nonnegative eigenvector) survive for any nonnegative matrix. The lemma says $(I + A)^{n-1}>0$ for irreducible $A$; here $(I + A)^k = \\begin{bmatrix}2^k&k2^{k-1}\\\\0&2^k\\end{bmatrix}$ always has a zero in position $(2,1)$, so it never becomes positive.'
		),
		open(
			C,
			'21.20',
			'For the two-state chain $P = \\begin{bmatrix}1-\\alpha&\\beta\\\\\\alpha&1-\\beta\\end{bmatrix}$ with $\\alpha = 0.2$ and $\\beta = 0.05$, find the stationary vector $\\boldsymbol\\pi$ and the spectral gap, and compute how many steps are needed to bring $\\lVert P^k\\mathbf x_0 - \\boldsymbol\\pi\\rVert_2$ below $10^{-3}$ starting from $\\mathbf x_0 = (1,0)$. Verify your answer by computing $P^k\\mathbf x_0$ directly for that $k$.',
			[
				'Stationary vector $\\boldsymbol\\pi = \\dfrac1{\\alpha + \\beta}(\\beta,\\alpha)$. The eigenvalues are $1$ and $1 - \\alpha - \\beta$.',
				'$\\mathbf x_0 - \\boldsymbol\\pi$ is an eigenvector of $P$ for the eigenvalue $1 - \\alpha - \\beta$ (it lies in the sum-zero subspace), so it is multiplied by $0.75$ each step.'
			],
			'$\\boldsymbol\\pi = \\dfrac1{0.25}(0.05,0.2) = (0.2,\\ 0.8)$. Eigenvalues $1$ and $1 - 0.25 = 0.75$, so the spectral gap is $1 - 0.75 = 0.25$.\n\n$\\mathbf x_0 - \\boldsymbol\\pi = (0.8,-0.8)$, an eigenvector for $0.75$. So $P^k\\mathbf x_0 - \\boldsymbol\\pi = 0.75^k(0.8,-0.8)$, with norm $0.75^k\\cdot0.8\\sqrt2\\approx1.131\\cdot0.75^k$. We need $0.75^k<8.84\\times10^{-4}$, i.e. $k>\\dfrac{\\ln(8.84\\times10^{-4})}{\\ln0.75}\\approx24.4$, so **$k = 25$**.\n\n**Check.** $0.75^{25}\\approx7.53\\times10^{-4}$, so $P^{25}\\mathbf x_0\\approx(0.2006,\\ 0.7994)$ and the distance is $\\approx8.5\\times10^{-4}<10^{-3}$ ✓, while at $k = 24$ the distance is $\\approx1.14\\times10^{-3}>10^{-3}$. (In the 1-norm you would need $26$ steps.)'
		),
		open(
			C,
			'21.21',
			'Let $A\\ge0$ be irreducible with Perron root $\\rho$ and Perron vector $\\mathbf v>0$. Show that $P = \\rho^{-1}\\operatorname{diag}(\\mathbf v)^{-1}A\\operatorname{diag}(\\mathbf v)$ is row-stochastic, and that $A$ and $P$ have the same eigenvalues up to the factor $\\rho$. Explain why this reduces every question about the spectrum of a nonnegative matrix to a question about a stochastic one.',
			[
				'Entries: $P_{ij} = \\rho^{-1}a_{ij}v_j/v_i\\ge0$.',
				'Row sum $i$: $\\sum_jP_{ij} = \\dfrac{1}{\\rho v_i}\\sum_ja_{ij}v_j = \\dfrac{(A\\mathbf v)_i}{\\rho v_i}$.',
				'$P = \\rho^{-1}D^{-1}AD$ is a similarity transform of $A/\\rho$.'
			],
			'$P_{ij} = \\dfrac{a_{ij}v_j}{\\rho v_i}\\ge0$ and $\\sum_jP_{ij} = \\dfrac{(A\\mathbf v)_i}{\\rho v_i} = \\dfrac{\\rho v_i}{\\rho v_i} = 1$ (as $A\\mathbf v = \\rho\\mathbf v$). So $P$ is row-stochastic.\n\n$P = \\rho^{-1}D^{-1}AD$ with $D = \\operatorname{diag}(\\mathbf v)$ is similar to $\\rho^{-1}A$, so the eigenvalues of $P$ are exactly the eigenvalues of $A$ divided by $\\rho$.\n\n**Consequence.** Everything about the spectrum of a nonnegative irreducible matrix (the size of the second eigenvalue, whether other eigenvalues lie on the circle $|\\lambda| = \\rho$, convergence rates of $A^k/\\rho^k$) can be read off from the stochastic matrix $P$, where one knows $1$ is the Perron root with eigenvector $\\mathbf 1$.'
		),
		open(
			C,
			'21.22',
			'Prove the damping proposition again for the eigenvalue $1$: show that the eigenvalue $1$ of $G = \\varepsilon S + (1-\\varepsilon)\\mathbf b\\mathbf 1^{\\mathsf T}$ is simple without invoking Perron–Frobenius, assuming $\\mathbf b>0$ is a probability vector and $S$ is column-stochastic. Then compute the number of power iterations needed for $10^{-6}$ accuracy at $\\varepsilon = 0.5,\\ 0.85$ and $0.95$, and say what is being traded.',
			[
				'If $G\\mathbf x = \\mathbf x$ then $\\mathbf x = \\varepsilon S\\mathbf x + (1-\\varepsilon)(\\mathbf 1^{\\mathsf T}\\mathbf x)\\mathbf b$, so $(I - \\varepsilon S)\\mathbf x = (1-\\varepsilon)(\\mathbf 1^{\\mathsf T}\\mathbf x)\\mathbf b$. Is $I - \\varepsilon S$ invertible?',
				'For a generalised eigenvector $(G - I)\\mathbf y = \\mathbf x$ apply $\\mathbf 1^{\\mathsf T}$ and use $\\mathbf 1^{\\mathsf T}G = \\mathbf 1^{\\mathsf T}$.',
				'Iterations: $\\varepsilon^k\\le10^{-6}$ gives $k\\ge6\\ln10/\\ln(1/\\varepsilon)$.'
			],
			'$\\rho(\\varepsilon S) = \\varepsilon<1$ (column-stochastic $S$ has $\\rho(S) = 1$), so $I - \\varepsilon S$ is invertible. If $G\\mathbf x = \\mathbf x$, then $\\mathbf x = (1-\\varepsilon)(\\mathbf 1^{\\mathsf T}\\mathbf x)(I - \\varepsilon S)^{-1}\\mathbf b$. So every eigenvector for $1$ is a scalar multiple of the single vector $(I - \\varepsilon S)^{-1}\\mathbf b$ (and $\\mathbf 1^{\\mathsf T}\\mathbf x\\ne0$ for a nonzero one): **the eigenspace is one-dimensional**.\n\n*Algebraic multiplicity one.* If $(G - I)\\mathbf y = \\mathbf x$ with $G\\mathbf x = \\mathbf x$, apply $\\mathbf 1^{\\mathsf T}$: $0 = \\mathbf 1^{\\mathsf T}(G - I)\\mathbf y = \\mathbf 1^{\\mathsf T}\\mathbf x$, but a nonzero eigenvector has $\\mathbf 1^{\\mathsf T}\\mathbf x\\ne0$. Contradiction, so there is no Jordan chain and $1$ is a simple eigenvalue.\n\n**Iterations** ($\\varepsilon^k\\le10^{-6}$, $6\\ln10\\approx13.8$): $\\varepsilon = 0.5$: $13.8/0.693\\approx20$. $\\varepsilon = 0.85$: $13.8/0.1625\\approx85$. $\\varepsilon = 0.95$: $13.8/0.0513\\approx270$.\n\n**Trade-off.** A larger $\\varepsilon$ keeps the ranking faithful to the real link structure (less weight on the artificial teleport vector $\\mathbf b$) but the power method converges more slowly; a smaller $\\varepsilon$ converges fast but the answer is dominated by $\\mathbf b$ rather than by the web.'
		),
		open(
			C,
			'21.23',
			'Let $A\\ge0$ with $A^{\\mathsf T}A$ irreducible. Prove that the leading right singular vector may be chosen nonnegative, and that every later one has entries of both signs. Then verify that the matrix $R = \\begin{bmatrix}1&1&0&0\\\\1&0&1&0\\\\0&1&0&1\\\\0&0&1&1\\end{bmatrix}$ has rank $3$, and explain why the expansion $R = \\sum_{i=1}^3\\sigma_i\\mathbf u_i\\mathbf v_i^{\\mathsf T}$ is not a nonnegative factorisation even though it reproduces $R$ exactly.',
			[
				'$A^{\\mathsf T}A\\ge0$ and irreducible, so its Perron vector $\\mathbf v_1>0$ is the leading eigenvector, i.e. the leading right singular vector. Then $\\mathbf u_1 = A\\mathbf v_1/\\sigma_1\\ge0$.',
				'The next right singular vectors are orthogonal to $\\mathbf v_1>0$. Can a nonzero vector with all entries $\\ge0$ be orthogonal to a strictly positive vector?',
				'Rank: show $\\mathbf r_1 - \\mathbf r_2 - \\mathbf r_3 + \\mathbf r_4 = \\mathbf 0$ and that any three rows are independent.'
			],
			'**Leading vector.** $A^{\\mathsf T}A\\ge0$ is irreducible, so by Perron–Frobenius its leading eigenvector $\\mathbf v_1$ can be taken strictly positive; it is the leading right singular vector, with $\\sigma_1^2$ the Perron root, and $\\mathbf u_1 = A\\mathbf v_1/\\sigma_1\\ge0$.\n\n**Later vectors.** $\\mathbf v_k\\perp\\mathbf v_1$ for $k\\ge2$. If $\\mathbf v_k\\ge0$ and nonzero then $\\langle\\mathbf v_k,\\mathbf v_1\\rangle>0$ (strictly positive weights), a contradiction. So $\\mathbf v_k$ has entries of both signs.\n\n**Rank of $R$.** The rows satisfy $\\mathbf r_1 - \\mathbf r_2 - \\mathbf r_3 + \\mathbf r_4 = (1,1,0,0) - (1,0,1,0) - (0,1,0,1) + (0,0,1,1) = \\mathbf 0$, so the rank is at most $3$. Rows $\\mathbf r_1,\\mathbf r_2,\\mathbf r_3$ are independent (e.g. only $\\mathbf r_3$ has a $1$ in column $4$, and $\\mathbf r_1,\\mathbf r_2$ are not parallel), so $\\operatorname{rank}R = 3$.\n\n**Why the SVD is not a nonnegative factorisation.** The SVD of $R$ uses rank $3$, but the terms $i = 2,3$ involve singular vectors with entries of both signs, so $L = [\\sigma_i\\mathbf u_i]$ and the right factor have negative entries; the sum reproduces $R$ only through cancellation. A nonnegative factorisation $R = LH$ with $L,H\\ge0$ needs inner dimension at least $\\operatorname{rank}_+R = 4>3$.'
		)
	]
};

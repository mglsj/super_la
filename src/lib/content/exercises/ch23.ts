import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch23';

export const exercises: QuizBank = {
	'ch23.exercises': [
		open(
			C,
			'24.13',
			'Prove the expected-isometry proposition ($\\mathbb{E}\\lVert S\\mathbf x\\rVert^2 = \\lVert\\mathbf x\\rVert^2$) again for a sketch $S$ whose entries are independent and take the values $\\pm1$ with probability $\\tfrac12$ each, scaled by $1/\\sqrt m$. Which step of the proof changes, and which does not?',
			[
				'The proof only uses that the rows $\\mathbf r_i$ of the unscaled matrix satisfy $\\mathbb{E}[\\mathbf r_i\\mathbf r_i^{\\mathsf T}] = I$. Check this for $\\pm1$ entries: mean, variance, independence.',
				'Then $\\lVert S\\mathbf x\\rVert^2 = \\tfrac1m\\sum_i(\\mathbf r_i^{\\mathsf T}\\mathbf x)^2$.',
				'Think about what the proof does not tell you: how concentrated $\\lVert S\\mathbf x\\rVert$ is around its mean.'
			],
			'Each entry $\\xi$ has $\\mathbb{E}\\xi = 0$ and $\\mathbb{E}\\xi^2 = 1$, and entries are independent, so $\\mathbb{E}[\\mathbf r_i\\mathbf r_i^{\\mathsf T}] = I$ (off-diagonal entries have mean $\\mathbb{E}\\xi_j\\mathbb{E}\\xi_k = 0$, diagonal entries $\\mathbb{E}\\xi_j^2 = 1$). Then $\\mathbb{E}(\\mathbf r_i^{\\mathsf T}\\mathbf x)^2 = \\mathbf x^{\\mathsf T}\\mathbb{E}[\\mathbf r_i\\mathbf r_i^{\\mathsf T}]\\mathbf x = \\lVert\\mathbf x\\rVert^2$, and summing over $m$ rows and dividing by $m$ gives $\\mathbb{E}\\lVert S\\mathbf x\\rVert^2 = \\lVert\\mathbf x\\rVert^2$.\n\n**What does not change:** the whole expectation computation: it uses only mean $0$, variance $1$ and independence (isotropy), not Gaussianity.\n\n**What does change:** the *concentration* step that upgrades "right on average" to "right with high probability". For Gaussian rows $\\mathbf r^{\\mathsf T}\\mathbf x\\sim N(0,\\lVert\\mathbf x\\rVert^2)$ exactly (rotation invariance), whereas for $\\pm1$ entries it is a sum of independent bounded terms: not exactly Gaussian, though still sub-Gaussian, so a similar tail bound holds with different constants (Achlioptas).'
		),
		open(
			C,
			'24.14',
			'Evaluate the bound $m\\ge\\dfrac{16\\ln N}{\\varepsilon^2 - \\varepsilon^3}$ of the Johnson–Lindenstrauss theorem for $N = 10^4$ and $\\varepsilon = 0.1, 0.3, 0.5$. Then hold $\\varepsilon = 0.3$ and tabulate $m$ for $N = 10^2, 10^4, 10^6$. Which of the two parameters is expensive, and why does the shape of the dependence explain the name "dimension reduction"?',
			[
				'$\\ln10^4\\approx9.21$. Compute $\\varepsilon^2 - \\varepsilon^3$ for each $\\varepsilon$: $0.009$, $0.063$, $0.125$.',
				'For the second table use $\\ln10^2\\approx4.61$, $\\ln10^4\\approx9.21$, $\\ln10^6\\approx13.82$ with $\\varepsilon^2 - \\varepsilon^3 = 0.063$.'
			],
			'With $N = 10^4$ ($16\\ln N\\approx147.4$):\n- $\\varepsilon = 0.1$: $147.4/0.009\\approx16{,}400$.\n- $\\varepsilon = 0.3$: $147.4/0.063\\approx2{,}340$.\n- $\\varepsilon = 0.5$: $147.4/0.125\\approx1{,}180$.\n\nWith $\\varepsilon = 0.3$:\n- $N = 10^2$: $73.7/0.063\\approx1{,}170$.\n- $N = 10^4$: $\\approx2{,}340$.\n- $N = 10^6$: $221.1/0.063\\approx3{,}510$.\n\n**Expensive parameter:** the accuracy $\\varepsilon$ (cost $\\sim1/\\varepsilon^2$: going from $0.5$ to $0.1$ multiplies $m$ by about $14$). The number of points $N$ costs only $\\ln N$: a factor $10^4$ more points raises $m$ by only $3\\times$. And $m$ does not depend on the ambient dimension $n$ at all, so $n=10^9$-dimensional data can be mapped down to a few thousand dimensions: that is why it is called dimension reduction.'
		),
		open(
			C,
			'24.15',
			'Show that the union bound is doing real work: exhibit a fixed $S$ with $m = 1$ that preserves the norm of one given vector exactly and destroys the norm of another. Deduce that no bound holding for all pairs can avoid a dependence on $N$.',
			[
				'A $1\\times n$ matrix is a row vector $\\mathbf r^{\\mathsf T}$. Choose $\\mathbf r = \\mathbf x/\\lVert\\mathbf x\\rVert$.',
				'Any $S$ with $m<n$ has a nontrivial kernel.'
			],
			'Take $\\mathbf r = \\mathbf x/\\lVert\\mathbf x\\rVert$ and $S = \\mathbf r^{\\mathsf T}$. Then $S\\mathbf x = \\lVert\\mathbf x\\rVert$, so $\\lVert S\\mathbf x\\rVert = \\lVert\\mathbf x\\rVert$ exactly. For any $\\mathbf y\\perp\\mathbf x$, $S\\mathbf y = 0$: its norm is destroyed completely.\n\nMore generally every fixed $S$ with $m<n$ has a nonzero kernel, so some vector (and any pair differing by a kernel vector) is flattened to $0$. A random $S$ fails on any *particular* vector only with some small probability $\\delta$ (given $m$), but with $N^2$ pairs the expected number of failures is about $N^2\\delta$. To make *all* pairs succeed at once, $\\delta$ has to be pushed below $\\sim1/N^2$, which forces $m$ to grow with $\\ln N$. So the guarantee for all pairs cannot be independent of $N$.'
		),
		open(
			C,
			'24.16',
			'Let $Z$ have orthonormal columns and let $S$ be an $\\varepsilon$-subspace embedding for its column space. Show that $\\lVert(SZ)^{\\mathsf T}(SZ) - I\\rVert_2\\le2\\varepsilon + \\varepsilon^2$, and conversely that this bound with $\\varepsilon<1$ implies the embedding property with a slightly worse constant. Which direction uses the singular-values proposition?',
			[
				'Embedding means $(1-\\varepsilon)\\lVert\\mathbf z\\rVert\\le\\lVert S\\mathbf z\\rVert\\le(1+\\varepsilon)\\lVert\\mathbf z\\rVert$ on the subspace, equivalently all singular values of $SZ$ lie in $[1-\\varepsilon,1+\\varepsilon]$.',
				'The eigenvalues of $(SZ)^{\\mathsf T}(SZ) - I$ are $\\sigma_i^2 - 1$.',
				'Conversely if $|\\sigma_i^2 - 1|\\le\\delta<1$ then $\\sigma_i\\in[\\sqrt{1-\\delta},\\sqrt{1+\\delta}]$.'
			],
			'**Forward.** The singular values $\\sigma_i$ of $SZ$ lie in $[1-\\varepsilon,1+\\varepsilon]$, so the eigenvalues $\\sigma_i^2 - 1$ of $(SZ)^{\\mathsf T}(SZ) - I$ lie in $[-2\\varepsilon + \\varepsilon^2,\\ 2\\varepsilon + \\varepsilon^2]$. Its spectral norm is the largest $|\\sigma_i^2 - 1|\\le2\\varepsilon + \\varepsilon^2$.\n\n**Converse.** If $\\lVert(SZ)^{\\mathsf T}(SZ) - I\\rVert_2\\le\\delta<1$ then every $\\sigma_i^2\\in[1-\\delta,1+\\delta]$, so $\\sigma_i\\in[\\sqrt{1-\\delta},\\sqrt{1+\\delta}]\\subseteq[1-\\delta,1+\\delta]$ (as $\\sqrt{1-\\delta}\\ge1-\\delta$ and $\\sqrt{1+\\delta}\\le1+\\delta/2$). So $S$ is a $\\delta$-embedding; with $\\delta = 2\\varepsilon + \\varepsilon^2$ the constant is worse than the original $\\varepsilon$.\n\nBoth directions pass through the singular values of $SZ$, so both use the proposition that "$\\varepsilon$-embedding $\\iff$ singular values of $SZ$ in $[1-\\varepsilon,1+\\varepsilon]$" (the forward direction uses "only if", the converse uses "if").'
		),
		open(
			C,
			'24.17',
			'Take $A = \\begin{bmatrix}1&1\\\\0&\\eta\\\\0&0\\end{bmatrix}$ with $\\eta$ small and $\\mathbf b = (0,0,1)$. Compute $\\mathbf x^*$, and find an $\\tilde{\\mathbf x}$ whose residual is within $1\\%$ of optimal but whose distance from $\\mathbf x^*$ is large. Relate the size of the discrepancy to $\\kappa(A)$ and to the warning that a near-optimal residual does not imply a near-optimal solution.',
			[
				'The column space of $A$ lies in $\\operatorname{span}\\{\\mathbf e_1,\\mathbf e_2\\}$ and $\\mathbf b = \\mathbf e_3$ is orthogonal to it.',
				'Residual for any $\\mathbf x$: $\\lVert A\\mathbf x - \\mathbf b\\rVert^2 = \\lVert A\\mathbf x\\rVert^2 + 1$. Look for $\\mathbf x$ in the direction where $A$ is nearly zero: $\\mathbf x = (t,-t)$.',
				'$\\sigma_{\\max}\\approx\\sqrt2$, $\\sigma_{\\min}\\approx\\eta/\\sqrt2$.'
			],
			'$A\\mathbf x\\in\\operatorname{span}\\{\\mathbf e_1,\\mathbf e_2\\}\\perp\\mathbf b$, so the projection of $\\mathbf b$ is $\\mathbf 0$ and $\\mathbf x^* = \\mathbf 0$ with optimal residual $\\lVert\\mathbf b\\rVert = 1$.\n\nTake $\\tilde{\\mathbf x} = (t,-t)$: $A\\tilde{\\mathbf x} = (0,-\\eta t,0)$, residual $\\sqrt{1 + \\eta^2t^2}$. This is within $1\\%$ of optimal if $\\eta t\\le0.14$ (since $\\sqrt{1 + 0.14^2}\\approx1.0098$). Choose $t = 0.14/\\eta$: then $\\lVert\\tilde{\\mathbf x} - \\mathbf x^*\\rVert = \\sqrt2\\,t\\approx0.2/\\eta$, huge for small $\\eta$ (e.g. $\\eta = 10^{-3}$ gives distance $200$).\n\n**Relation to conditioning.** $A^{\\mathsf T}A = \\begin{bmatrix}1&1\\\\1&1 + \\eta^2\\end{bmatrix}$ has eigenvalues $\\approx2$ and $\\approx\\eta^2/2$, so $\\kappa(A)\\approx2/\\eta$: the error in $\\mathbf x$ can be as large as (excess residual)$/\\sigma_{\\min}\\sim\\kappa(A)\\times$(excess residual). A sketch-and-solve method guarantees a residual within $(1+\\varepsilon)$ of optimal, but the solution itself can differ from $\\mathbf x^*$ by a factor of order $\\kappa(A)$.'
		),
		open(
			C,
			'24.18',
			'For $n = 10^7$ rows and $d = 500$ columns, count the multiplications in Householder QR on $A$ (about $nd^2$), in forming $SA$ with a dense Gaussian $S$ of $m = 2000$ rows, and in the QR of $SA$. Confirm that a dense Gaussian sketch does not save time, and say what $\\operatorname{nnz}(A)$ would have to be for a count sketch to win.',
			[
				'Householder QR of an $n\\times d$ matrix costs about $nd^2$ multiplications (times a small constant). QR of the $m\\times d$ sketch costs about $md^2$.',
				'A dense $S$ ($m\\times n$) times $A$ ($n\\times d$) costs $m\\cdot n\\cdot d$.',
				'A count sketch has one nonzero per column, so $SA$ costs about $\\operatorname{nnz}(A)$.'
			],
			'- Householder QR on $A$: $nd^2 = 10^7\\cdot2.5\\times10^5 = 2.5\\times10^{12}$.\n- Forming $SA$ densely: $mnd = 2000\\cdot10^7\\cdot500 = 10^{13}$.\n- QR of $SA$: $md^2 = 2000\\cdot2.5\\times10^5 = 5\\times10^8$ (negligible).\n\nThe dense sketch costs $10^{13}$ just to form $SA$, **four times more** than the $2.5\\times10^{12}$ for QR on $A$ directly. So a dense Gaussian sketch is slower than not sketching (the warning is confirmed).\n\n**Count sketch.** Forming $SA$ costs about $\\operatorname{nnz}(A)$ operations (each nonzero is added into one sketch row). It wins if $\\operatorname{nnz}(A) + (\\text{QR of }SA)\\ll nd^2 = 2.5\\times10^{12}$. Since $\\operatorname{nnz}(A)\\le nd = 5\\times10^9$, this holds even for a fully dense $A$ (by a factor of about $d = 500$), and the sparser $A$ is the better. (A count sketch needs more rows, about $d^2/\\varepsilon^2$; with $m\\approx d^2 = 2.5\\times10^5$ the QR of $SA$ costs $md^2\\approx6\\times10^{10}$, still far below $2.5\\times10^{12}$.)'
		),
		open(
			C,
			'24.19',
			'Tabulate the factor $\\left(1 + \\dfrac{k}{p-1}\\right)^{1/2}$ of the randomised range finder bound for $k = 20$ and $p = 2, 5, 10, 20$. At what point does further oversampling stop paying, and how does the cost of $p$ compare with the cost of $k$?',
			[
				'Compute $1 + 20/(p-1)$ for each $p$ and take the square root.',
				'The range finder uses $\\ell = k + p$ random probes, so its cost grows roughly linearly in $\\ell$.'
			],
			'| $p$ | $1 + 20/(p-1)$ | factor |\n|---|---|---|\n| $2$ | $21$ | $4.58$ |\n| $5$ | $6$ | $2.45$ |\n| $10$ | $3.22$ | $1.80$ |\n| $20$ | $2.05$ | $1.43$ |\n\nThe factor falls quickly at first ($4.6\\to2.4$ going from $p=2$ to $5$) and then slowly (going from $p = 10$ to $20$ gains only $1.8\\to1.4$ at the price of doubling the extra work). Beyond $p\\approx5$–$10$ (about $k/4$–$k/2$) further oversampling stops paying. In cost terms the work is proportional to $\\ell = k + p$: $p = 5$ adds $25\\%$ to the cost of $k = 20$ and $p = 10$ adds $50\\%$, whereas the factor is only an upper bound multiplying the best possible error $\\left(\\sum_{j>k}\\sigma_j^2\\right)^{1/2}$.'
		),
		open(
			C,
			'24.20',
			'For $\\sigma_j = j^{-1/2}$ compute $\\sigma_{11}/\\sigma_{10}$, and then the same ratio for the singular values of $(AA^{\\mathsf T})^qA$ with $q = 1$ and $q = 2$. Explain in one sentence why the power-iteration example helps most for exactly this kind of spectrum.',
			[
				'$(AA^{\\mathsf T})^qA$ has singular values $\\sigma_j^{2q+1}$, so the ratio is raised to the power $2q+1$.',
				'$\\sigma_{11}/\\sigma_{10} = \\sqrt{10/11}$.'
			],
			'$\\sigma_{11}/\\sigma_{10} = \\sqrt{10/11}\\approx0.953$.\n\n$q = 1$ (singular values $\\sigma_j^3$): $0.953^3\\approx0.867$.\n$q = 2$ (singular values $\\sigma_j^5$): $0.953^5\\approx0.788$.\n\nA slowly decaying spectrum has a ratio close to $1$, so the top-$k$ subspace is barely separated from the rest and random probes cannot tell them apart; raising the ratio to the power $2q+1$ pushes it geometrically toward $0$ and widens exactly that gap (the effect is small for a ratio near $1$ and strong for smaller ratios, so it helps most when there is a lot to gain).'
		),
		open(
			C,
			'24.21',
			'Given $Q$ with orthonormal columns from the range finder, show that $\\lVert A - QQ^{\\mathsf T}A\\rVert_F^2 = \\lVert A\\rVert_F^2 - \\lVert Q^{\\mathsf T}A\\rVert_F^2$, so the error can be certified with one extra product. Why is the analogous check for the sketch-and-solve least squares guarantee even cheaper?',
			[
				'$A = QQ^{\\mathsf T}A + (I - QQ^{\\mathsf T})A$. Show the two pieces are orthogonal in the Frobenius inner product.',
				'Since $Q$ has orthonormal columns, $\\lVert QQ^{\\mathsf T}A\\rVert_F = \\lVert Q^{\\mathsf T}A\\rVert_F$.',
				'For least squares the quantity to certify is the residual $\\lVert A\\tilde{\\mathbf x} - \\mathbf b\\rVert$. What does it cost to evaluate?'
			],
			'$\\langle QQ^{\\mathsf T}A,(I - QQ^{\\mathsf T})A\\rangle_F = \\operatorname{tr}\\big(A^{\\mathsf T}QQ^{\\mathsf T}(I - QQ^{\\mathsf T})A\\big) = 0$ because $QQ^{\\mathsf T}(I - QQ^{\\mathsf T}) = QQ^{\\mathsf T} - QQ^{\\mathsf T} = 0$ (projection). Pythagoras in the Frobenius norm gives $\\lVert A\\rVert_F^2 = \\lVert QQ^{\\mathsf T}A\\rVert_F^2 + \\lVert(I - QQ^{\\mathsf T})A\\rVert_F^2$, and $\\lVert QQ^{\\mathsf T}A\\rVert_F = \\lVert Q^{\\mathsf T}A\\rVert_F$. Hence $\\lVert A - QQ^{\\mathsf T}A\\rVert_F^2 = \\lVert A\\rVert_F^2 - \\lVert Q^{\\mathsf T}A\\rVert_F^2$. Computing $Q^{\\mathsf T}A$ (one matrix–matrix product, which the algorithm needs anyway for the SVD) certifies the error.\n\n**Cheaper for least squares:** the certificate there is the residual $\\lVert A\\tilde{\\mathbf x} - \\mathbf b\\rVert$, which needs only one matrix–**vector** product $A\\tilde{\\mathbf x}$ (cost $\\operatorname{nnz}(A)$), compared with a matrix–matrix product (cost $\\operatorname{nnz}(A)\\cdot\\ell$) for $Q^{\\mathsf T}A$.'
		)
	]
};

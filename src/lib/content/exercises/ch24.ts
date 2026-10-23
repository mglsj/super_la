import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch24';

export const exercises: QuizBank = {
	'ch24.exercises': [
		open(
			C,
			'25.12',
			'Repeat the scaling proposition ($\\mathbb{E}\\operatorname{tr}(W^2) = n^2$ for a Wigner matrix) for entries of variance $s^2$ rather than $1$, and deduce the correct normalisation and the radius of the resulting semicircle. Check your answer against the case $s = 1$.',
			[
				'$\\operatorname{tr}(W^2) = \\sum_{i,j}W_{ij}^2$ is a sum of $n^2$ terms, each with expectation $s^2$.',
				'The eigenvalues $\\lambda_i$ of $W/c$ satisfy $\\tfrac1n\\sum\\lambda_i^2 = \\operatorname{tr}(W^2)/(nc^2)$. Choose $c$ so that this average is $1$.'
			],
			'$\\mathbb{E}\\operatorname{tr}(W^2) = \\sum_{i,j}\\mathbb{E}W_{ij}^2 = n^2s^2$. For $O = W/c$ the average of the squared eigenvalues is $\\mathbb{E}\\tfrac1n\\sum\\lambda_i^2 = \\dfrac{n^2s^2}{nc^2} = \\dfrac{ns^2}{c^2}$. Setting this equal to $1$ gives $c = s\\sqrt n$: **the correct normalisation is $W/(s\\sqrt n)$**, whose eigenvalues follow the semicircle on $[-2,2]$.\n\nEquivalently the eigenvalues of $W/\\sqrt n$ itself follow the semicircle of **radius $2s$**.\n\n**Check:** for $s = 1$ this is $W/\\sqrt n$ with radius $2$ ✓.'
		),
		open(
			C,
			'25.13',
			'Compute $\\mathbb{E}\\operatorname{tr}(W^4)$ for a Wigner matrix to leading order in $n$ by counting which index patterns in $\\sum_{i,j,k,l}\\mathbb{E}[W_{ij}W_{jk}W_{kl}W_{li}]$ survive, and confirm that the fourth moment of $W/\\sqrt n$ tends to $2$, the Catalan number $C_2$.',
			[
				'Each entry has mean zero, so a term survives only if every entry appears at least twice (a pairing).',
				'Case $i = k$: the product is $W_{ij}W_{ji}W_{il}W_{li} = W_{ij}^2W_{il}^2$, with $j,l$ free. Case $j = l$: $W_{ij}W_{jk}W_{kj}W_{ji} = W_{ij}^2W_{jk}^2$, with $i,k$ free.',
				'Count how many free indices each case has. The crossing pairing needs more coincidences and is lower order.'
			],
			'A term has nonzero expectation only if the entries pair up. The two non-crossing pairings dominate:\n- $i = k$: product $W_{ij}^2W_{il}^2$ with $i,j,l$ free: about $n^3$ terms of expectation $1$.\n- $j = l$: product $W_{ij}^2W_{jk}^2$ with $i,j,k$ free: about $n^3$ terms of expectation $1$.\n\nThe overlap ($i = k$ and $j = l$) has only $n^2$ terms, and the crossing pairing needs further coincidences, so both are $O(n^2)$. Hence $\\mathbb{E}\\operatorname{tr}(W^4) = 2n^3 + O(n^2)$.\n\nFor $O = W/\\sqrt n$: $\\tfrac1n\\mathbb{E}\\operatorname{tr}(O^4) = \\dfrac{2n^3}{n\\cdot n^2} = 2\\to2 = C_2$ ✓ (the Catalan number of non-crossing pairings of $4$ points; the second moment is $1 = C_1$).'
		),
		open(
			C,
			'25.14',
			'Verify directly that $\\displaystyle\\int_{-2}^{2}x^2\\rho(x)\\,dx = 1$ and $\\displaystyle\\int_{-2}^{2}\\rho(x)\\,dx = 1$ for the semicircle density $\\rho(x) = \\dfrac1{2\\pi}\\sqrt{4 - x^2}$. The substitution $x = 2\\sin\\theta$ makes both routine.',
			[
				'With $x = 2\\sin\\theta$: $dx = 2\\cos\\theta\\,d\\theta$ and $\\sqrt{4 - x^2} = 2\\cos\\theta$, $\\theta\\in[-\\pi/2,\\pi/2]$.',
				'Use $\\int_{-\\pi/2}^{\\pi/2}\\cos^2\\theta\\,d\\theta = \\pi/2$ and $\\sin^2\\theta\\cos^2\\theta = \\tfrac14\\sin^22\\theta$.'
			],
			'**Total mass.** $\\displaystyle\\int\\rho\\,dx = \\frac1{2\\pi}\\int_{-\\pi/2}^{\\pi/2}2\\cos\\theta\\cdot2\\cos\\theta\\,d\\theta = \\frac2\\pi\\int_{-\\pi/2}^{\\pi/2}\\cos^2\\theta\\,d\\theta = \\frac2\\pi\\cdot\\frac\\pi2 = 1$ ✓.\n\n**Second moment.** $\\displaystyle\\int x^2\\rho\\,dx = \\frac1{2\\pi}\\int4\\sin^2\\theta\\cdot4\\cos^2\\theta\\,d\\theta = \\frac8\\pi\\int_{-\\pi/2}^{\\pi/2}\\sin^2\\theta\\cos^2\\theta\\,d\\theta = \\frac8\\pi\\cdot\\frac14\\int\\sin^22\\theta\\,d\\theta = \\frac8\\pi\\cdot\\frac14\\cdot\\frac\\pi2 = 1$ ✓.\n\nSo the semicircle is a probability density with variance $1$, consistent with the normalisation $\\tfrac1n\\mathbb{E}\\operatorname{tr}(O^2) = 1$.'
		),
		open(
			C,
			'25.15',
			'For $k = 500$ columns tabulate the Marchenko–Pastur band and the limiting condition number at $m = 1000, 5000, 50000$. How many rows are needed for $\\kappa\\le1.1$, and how does that compare with the $m\\ge k/\\varepsilon^2$ of the sketching corollary at $\\varepsilon = 0.05$?',
			[
				'With $\\gamma = k/m$ the singular values of $G/\\sqrt m$ fill $[1 - \\sqrt\\gamma,\\ 1 + \\sqrt\\gamma]$, so $\\kappa\\to\\dfrac{1 + \\sqrt\\gamma}{1 - \\sqrt\\gamma}$.',
				'For $\\kappa\\le1.1$ solve $\\dfrac{1 + s}{1 - s} = 1.1$ for $s = \\sqrt\\gamma$, then $m = k/s^2$.'
			],
			'| $m$ | $\\gamma = k/m$ | $\\sqrt\\gamma$ | band | $\\kappa$ |\n|---|---|---|---|---|\n| $1000$ | $0.5$ | $0.707$ | $[0.293,\\ 1.707]$ | $5.83$ |\n| $5000$ | $0.1$ | $0.316$ | $[0.684,\\ 1.316]$ | $1.93$ |\n| $50000$ | $0.01$ | $0.1$ | $[0.9,\\ 1.1]$ | $1.22$ |\n\n$\\kappa\\le1.1$: $(1 + s)/(1 - s) = 1.1\\Rightarrow s = 0.1/2.1\\approx0.0476$, so $\\gamma = s^2\\approx0.00227$ and $m = 500/0.00227\\approx2.2\\times10^5$ rows.\n\nThe corollary with $\\varepsilon = 0.05$ gives $m\\ge500/0.0025 = 2\\times10^5$: the same order of magnitude (the band $[0.95,1.05]$ has $\\kappa = 1.105$, just above $1.1$, which is why the numbers are close but not identical). Both say: each factor of $2$ in accuracy costs a factor of $4$ in rows.'
		),
		open(
			C,
			'25.16',
			'Prove the Gaussian-sketch-of-a-subspace proposition in the case $k = 1$ by hand, taking the subspace basis to be a single unit vector $\\mathbf u$, and identify exactly where $\\lVert\\mathbf u\\rVert = 1$ is used. What would go wrong if the columns of the basis matrix were merely independent rather than orthonormal?',
			[
				'$G\\mathbf u$ has $i$-th entry $\\mathbf g_i^{\\mathsf T}\\mathbf u$ where $\\mathbf g_i$ is the $i$-th row of $G$, a vector of independent standard normals.',
				'A linear combination $\\sum u_jg_j$ of independent standard normals is normal with variance $\\sum u_j^2 = \\lVert\\mathbf u\\rVert^2$.',
				'For several columns, the covariance of a row of $GD$ is $D^{\\mathsf T}D$.'
			],
			'Row $i$ of $G$ is $\\mathbf g_i^{\\mathsf T}$ with independent $N(0,1)$ entries, so $(G\\mathbf u)_i = \\sum_ju_jg_{ij}$ is normal with mean $0$ and variance $\\sum_ju_j^2 = \\lVert\\mathbf u\\rVert^2$. Different rows involve disjoint independent variables, so the entries $(G\\mathbf u)_1,\\dots,(G\\mathbf u)_m$ are independent. With $\\lVert\\mathbf u\\rVert = 1$ the variance is $1$: $G\\mathbf u$ is an $m\\times1$ standard Gaussian matrix.\n\n**Where $\\lVert\\mathbf u\\rVert = 1$ is used:** only to make the variance exactly $1$ (otherwise the entries would be $N(0,\\lVert\\mathbf u\\rVert^2)$).\n\n**With merely independent columns** $D$, a row of $GD$ is $D^{\\mathsf T}\\mathbf g_i$ with covariance $D^{\\mathsf T}D\\ne I$: the entries within a row would be correlated and have unequal variances, so $GD$ is not a standard Gaussian matrix and the Marchenko–Pastur band $[1\\mp\\sqrt{k/m}]$ would not describe its singular values (they would be distorted by the singular values of $D$).'
		),
		open(
			C,
			'25.17',
			'Explain why the condition number corollary gives no information at $\\gamma = k/m = 1$, and why that is the correct answer rather than a defect of the bound. Then reconcile it with the fact that a square Gaussian matrix is invertible with probability one.',
			[
				'At $\\gamma = 1$ the band $[1 - \\sqrt\\gamma, 1 + \\sqrt\\gamma]$ is $[0,2]$, and the bound $\\dfrac{1 + \\sqrt\\gamma}{1 - \\sqrt\\gamma}$ has denominator $0$.',
				'Invertible means $\\sigma_{\\min}>0$. Well-conditioned means $\\sigma_{\\min}$ is not tiny compared with $\\sigma_{\\max}$.'
			],
			'At $\\gamma = 1$ the singular-value band reaches $0$, so the lower endpoint gives no lower bound on $\\sigma_{\\min}$ and the bound on $\\kappa$ is $2/0 = \\infty$: vacuous.\n\nThat is the right answer: the limiting distribution does not forbid singular values arbitrarily close to $0$, and in fact for a square $n\\times n$ Gaussian $\\sigma_{\\min}(G/\\sqrt n)$ is typically of size about $1/n$, so $\\kappa$ **grows** like $n$ (Edelman: $\\mathbb{E}\\ln\\kappa = \\ln n + O(1)$). A finite universal bound would be false.\n\n**Reconciliation.** Invertible with probability one only says $\\sigma_{\\min}>0$ (singular matrices form a measure-zero set). It says nothing about how far $\\sigma_{\\min}$ is from $0$. A random square matrix is almost surely invertible and yet badly conditioned, with $\\kappa\\sim n$.'
		),
		open(
			C,
			'25.18',
			'A layer has $n_{\\text{in}} = 1024$ and $n_{\\text{out}} = 256$. Give the variance prescribed by each of the three initialisation rules ($1/n_{\\text{in}}$, $2/(n_{\\text{in}} + n_{\\text{out}})$, and $2/n_{\\text{in}}$), and compute in each case the expected factor by which the forward pass and the backward pass scale a squared norm.',
			[
				'Forward: $\\mathbb{E}\\lVert W\\mathbf x\\rVert^2 = n_{\\text{out}}\\sigma^2\\lVert\\mathbf x\\rVert^2$. Backward: $\\mathbb{E}\\lVert W^{\\mathsf T}\\mathbf e\\rVert^2 = n_{\\text{in}}\\sigma^2\\lVert\\mathbf e\\rVert^2$.',
				'Plug in $\\sigma^2$ for each rule.'
			],
			'| rule | $\\sigma^2$ | forward factor $n_{\\text{out}}\\sigma^2$ | backward factor $n_{\\text{in}}\\sigma^2$ |\n|---|---|---|---|\n| $1/n_{\\text{in}}$ | $1/1024\\approx9.8\\times10^{-4}$ | $256/1024 = 0.25$ | $1$ |\n| $2/(n_{\\text{in}} + n_{\\text{out}})$ | $2/1280 = 1/640\\approx1.6\\times10^{-3}$ | $0.40$ | $1.6$ |\n| $2/n_{\\text{in}}$ | $2/1024\\approx2.0\\times10^{-3}$ | $0.5$ | $2$ |\n\nThe forward pass is norm-preserving only for $\\sigma^2 = 1/n_{\\text{out}} = 1/256$; the backward pass only for $\\sigma^2 = 1/n_{\\text{in}}$. A non-square layer cannot satisfy both, so each rule is a compromise: $1/n_{\\text{in}}$ protects the gradient (backward factor exactly $1$) at the cost of shrinking activations by $4\\times$ in squared norm; the Glorot rule splits the difference; the factor $2$ in the third rule compensates for a rectifier discarding about half the input.'
		),
		open(
			C,
			'25.19',
			'Using the layer-norm proposition, compute the expected squared norm of the output of a stack of $L$ square layers of width $n$ with entry variance $\\sigma^2$. For which $\\sigma$ is it independent of $L$, and why does the singular-value picture of a random square layer show that this is not enough to make the stack well behaved?',
			[
				'Each independent layer multiplies the expected squared norm by $n\\sigma^2$ (width in = width out = $n$).',
				'A random square layer has singular values spread over $[0,2]$ (for $\\sigma^2 = 1/n$), not all equal to $1$.'
			],
			'Conditioning on the earlier layers and applying the proposition layer by layer: $\\mathbb{E}\\lVert W_L\\cdots W_1\\mathbf x\\rVert^2 = (n\\sigma^2)^L\\lVert\\mathbf x\\rVert^2$.\n\nIt is independent of $L$ exactly when $n\\sigma^2 = 1$, i.e. $\\sigma = 1/\\sqrt n$.\n\n**Why that is not enough.** This is only a statement about the *average* squared norm. A random square layer with $\\sigma^2 = 1/n$ has singular values spread across $[0,2]$ (condition number about $n$): it nearly annihilates some directions and doubles others. A stack of $L$ layers compounds this: for a typical direction the norm gets multiplied by a random product of such factors, which tends to explode or vanish exponentially in $L$ even though the mean of the squared norm stays constant (a few directions grow enormously to keep the mean fixed). An orthogonal initialisation instead puts all singular values at $1$.'
		),
		open(
			C,
			'25.20',
			'Take $N$ a random $2\\times2$ matrix with independent standard normal entries, form $R = e^{(N - N^{\\mathsf T})/2}$ as in the orthogonal-parametrisation example, and verify by hand that $R$ is a rotation for every $N$. Which single number of $N$ determines the angle?',
			[
				'Write $N = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ and compute $K = (N - N^{\\mathsf T})/2$.',
				'A $2\\times2$ skew-symmetric matrix has the form $\\begin{bmatrix}0&-\\theta\\\\\\theta&0\\end{bmatrix}$, and its exponential is a rotation by $\\theta$.'
			],
			'$K = \\tfrac12\\left(\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix} - \\begin{bmatrix}a&c\\\\b&d\\end{bmatrix}\\right) = \\tfrac12\\begin{bmatrix}0&b - c\\\\c - b&0\\end{bmatrix} = \\begin{bmatrix}0&-\\theta\\\\\\theta&0\\end{bmatrix}$ with $\\theta = \\tfrac{c - b}2$.\n\nSince $K^2 = -\\theta^2I$, $e^K = \\cos\\theta\\,I + \\sin\\theta\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$, a rotation, for every $N$ (the diagonal entries $a,d$ cancel and play no role).\n\nThe angle is $\\theta = \\tfrac12(N_{21} - N_{12})$, a single number: half the difference of the off-diagonal entries. For standard normal entries it is $N(0,\\tfrac12)$.'
		)
	]
};

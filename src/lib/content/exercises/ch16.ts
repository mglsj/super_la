import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch16';

export const exercises: QuizBank = {
	'ch16.exercises': [
		open(
			C,
			'17.9',
			'In IEEE double precision, what is the largest number $\\delta$ with $\\mathrm{fl}(1 + \\delta) = 1$? What is the gap between $2^{40}$ and the next float above it? Explain why the answer to the second question is not $\\varepsilon_{\\text{mach}}$.',
			[
				'Double precision has a 53-bit significand, so floats just above $1$ are spaced $2^{-52}$ apart. Rounding to nearest sends $1 + \\delta$ back to $1$ when $\\delta$ is at most half a gap (ties go to the even neighbour).',
				'The spacing of floats scales with the size of the number: between $2^k$ and $2^{k+1}$ it is $2^{k-52}$.'
			],
			'Gaps near $1$ are $2^{-52}\\approx2.2\\times10^{-16}$. Anything up to half a gap rounds back to $1$; exactly half rounds to even, which is $1$. So the largest such $\\delta$ is $2^{-53}\\approx1.1\\times10^{-16}$ (the unit roundoff).\n\nBetween $2^{40}$ and $2^{41}$ the gap is $2^{40-52} = 2^{-12}\\approx2.4\\times10^{-4}$.\n\nIt is not $\\varepsilon_{\\text{mach}}$ because floating-point spacing is **relative**: the machine epsilon is the gap at $1$ and the absolute gap grows in proportion to the magnitude of the number, $2^{40}\\cdot2^{-52}$.'
		),
		open(
			C,
			'17.10',
			'The roots of $x^2 - 200x + 1 = 0$ are $199.994999875$ and $0.005000125$ (to the digits shown); note that they sum to $200$ and multiply to $1$. Compute the smaller root by the usual formula $\\left(200 - \\sqrt{200^2 - 4}\\right)/2$, carrying six significant digits throughout, and then by the algebraically equivalent $2/\\left(200 + \\sqrt{200^2 - 4}\\right)$. Explain the difference.',
			[
				'$\\sqrt{39996}\\approx199.98999975$. To six significant digits this is $199.990$.',
				'First method: $(200 - 199.990)/2$. Second method: $2/(200 + 199.990)$.',
				'Look at how many correct digits survive the subtraction $200 - 199.990$.'
			],
			'With six digits, $\\sqrt{39996} = 199.990$.\n\n**Usual formula:** $(200 - 199.990)/2 = 0.0100000/2 = 0.00500000$. True value $0.005000125$: the relative error is $2.5\\times10^{-5}$, only the first $\\sim4$ digits are right (and the six-digit result shows trailing zeros that are meaningless).\n\n**Conjugate form:** $2/(200 + 199.990) = 2/399.990 = 0.00500013$, correct to all six digits.\n\n**Why.** The first method subtracts two nearly equal numbers: the leading digits $199.99$ cancel and what remains is dominated by the rounding error in $\\sqrt{\\cdot}$ (**catastrophic cancellation**). The second method adds two positive numbers, which is harmless. The two formulas are equal in exact arithmetic but not in floating point.'
		),
		open(
			C,
			'17.11',
			'For $A = \\begin{bmatrix}1&1\\\\1&1.0001\\end{bmatrix}$, compute $\\kappa(A)$ from the singular values. Then solve $A\\mathbf x = (2,2.0001)$ and $A\\mathbf x = (2,2.0002)$ exactly and compare the relative change in $\\mathbf x$ with the relative change in $\\mathbf b$. Is the condition number bound tight here?',
			[
				'$A$ is symmetric, so singular values are $|\\lambda|$. $\\operatorname{tr} = 2.0001$, $\\det = 10^{-4}$, so $\\lambda_{\\max}\\approx2.0001$ and $\\lambda_{\\min}\\approx\\det/\\lambda_{\\max}$.',
				'First solution: $\\mathbf x = (1,1)$. For the second subtract the equations to find $x_2$.',
				'The bound is $\\dfrac{\\lVert\\Delta\\mathbf x\\rVert}{\\lVert\\mathbf x\\rVert}\\le\\kappa\\dfrac{\\lVert\\Delta\\mathbf b\\rVert}{\\lVert\\mathbf b\\rVert}$.'
			],
			'$\\lambda_{\\max}\\approx2.0001$, $\\lambda_{\\min}\\approx10^{-4}/2.0001\\approx5.0\\times10^{-5}$, so $\\kappa(A)\\approx4.0\\times10^4$.\n\nFirst system: $\\mathbf x = (1,1)$. Second: $x_1 + x_2 = 2$ and $x_1 + 1.0001x_2 = 2.0002$ give $0.0001x_2 = 0.0002$, so $\\mathbf x = (0,2)$.\n\nRelative change in $\\mathbf b$: $\\dfrac{\\lVert(0,0.0001)\\rVert}{\\lVert(2,2.0001)\\rVert}\\approx3.5\\times10^{-5}$. Relative change in $\\mathbf x$: $\\dfrac{\\lVert(-1,1)\\rVert}{\\lVert(1,1)\\rVert} = 1$. A relative perturbation of $10^{-5}$ became $100\\%$: amplification $\\approx2.8\\times10^4$, versus the bound $\\kappa\\approx4.0\\times10^4$.\n\nThe bound is nearly tight (within a factor of about $1.4$): the perturbation of $\\mathbf b$ points almost exactly along the bad direction (the small singular value).'
		),
		open(
			C,
			'17.12',
			'Verify by hand that the $3\\times3$ Wilkinson matrix $\\begin{bmatrix}1&0&1\\\\-1&1&1\\\\-1&-1&1\\end{bmatrix}$ has growth factor $4$ under partial pivoting, and explain why no row swap occurs.',
			[
				'Partial pivoting picks the entry of largest magnitude in the current column (on or below the diagonal). Look at column 1.',
				'Eliminate: add row 1 to rows 2 and 3, then look at column 2 of the $2\\times2$ block.'
			],
			'Column 1 is $(1,-1,-1)$: all have magnitude $1$, so the pivot on the diagonal is already (tied for) largest and no swap occurs.\n\n$R_2\\to R_2 + R_1 = (0,1,2)$, $R_3\\to R_3 + R_1 = (0,-1,2)$. Column 2 below the diagonal: $(1,-1)$, again equal magnitude, so no swap. $R_3\\to R_3 + R_2 = (0,0,4)$.\n\n$U = \\begin{bmatrix}1&0&1\\\\0&1&2\\\\0&0&4\\end{bmatrix}$. Growth factor $= \\max|U|/\\max|A| = 4/1 = 4 = 2^{n-1}$, the worst case. Every multiplier is $\\pm1$ so partial pivoting never sees a reason to swap, yet the last column doubles at each step.'
		),
		open(
			C,
			'17.13',
			'Give three double precision numbers $a, b, c$ for which $(a + b) + c\\ne a + (b + c)$ in floating point, and say which of the two answers is closer to the true sum. What does this imply about summing a long list, and what does it suggest about the order to sum it in?',
			[
				'Take $a = 1$ and $b = c = 2^{-53}$: each of them alone is lost when added to $1$.',
				'Compare adding $b$ and $c$ first with adding them to $1$ one at a time.'
			],
			'Take $a = 1$, $b = c = 2^{-53}$.\n- $(a + b) + c$: $1 + 2^{-53}$ is a tie and rounds to $1$ (even); then $1 + 2^{-53}$ rounds to $1$ again. Result $1$.\n- $a + (b + c)$: $b + c = 2^{-52}$ exactly, and $1 + 2^{-52}$ is representable. Result $1 + 2^{-52}$.\n\nThe true sum is $1 + 2^{-52}$, so the second is exact and the first lost both small terms.\n\n**Implication.** Floating-point addition is not associative, so the order of summation matters. Adding small numbers to a large running total loses them; summing the small terms first (ascending order of magnitude), pairwise summation, or compensated (Kahan) summation reduces the error.'
		),
		open(
			C,
			'17.14',
			'Consider computing $f(x) = \\sqrt{x + 1} - \\sqrt x$ for large $x$. Show that $\\kappa(f,x)$ stays bounded, so the problem is well conditioned, and that the obvious algorithm is nevertheless inaccurate for $x = 10^{16}$. Find a backward stable alternative. Hint: multiply by a conjugate.',
			[
				'$\\kappa(f,x) = \\left|\\dfrac{xf\'(x)}{f(x)}\\right|$. Use $f\'(x) = \\dfrac1{2\\sqrt{x+1}} - \\dfrac1{2\\sqrt x}$ and note $f(x) = \\sqrt{x+1} - \\sqrt x$.',
				'In double precision, what is $\\mathrm{fl}(10^{16} + 1)$?',
				'Multiply by $\\dfrac{\\sqrt{x+1} + \\sqrt x}{\\sqrt{x+1} + \\sqrt x}$.'
			],
			'Since $\\dfrac1{\\sqrt{x+1}} - \\dfrac1{\\sqrt x} = -\\dfrac{f(x)}{\\sqrt x\\sqrt{x+1}}$, we get $\\dfrac{xf\'}{f} = -\\dfrac12\\sqrt{\\dfrac{x}{x+1}}$, so $\\kappa\\to\\tfrac12$: bounded, a well-conditioned problem.\n\nBut at $x = 10^{16}$ the spacing of doubles is $2$, so $\\mathrm{fl}(x + 1) = x$ and $\\sqrt{x + 1} - \\sqrt x$ evaluates to **$0$**, while the true value is about $5\\times10^{-9}$: the algorithm subtracts two nearly equal numbers (catastrophic cancellation).\n\n**Stable alternative:** $f(x) = \\dfrac{(x+1) - x}{\\sqrt{x+1} + \\sqrt x} = \\dfrac1{\\sqrt{x+1} + \\sqrt x}\\approx5\\times10^{-9}$. It involves only additions of positive numbers, a square root and a division, and is accurate to full precision.'
		),
		open(
			C,
			'17.15',
			'Show that $\\kappa(Q) = 1$ for every orthogonal $Q$, and that $\\kappa(AB)\\le\\kappa(A)\\kappa(B)$ in general. Use these to explain why a factorisation into orthogonal factors cannot make a problem worse conditioned, and why $SDS^{-1}$ can.',
			[
				'All singular values of an orthogonal matrix equal $1$.',
				'$\\kappa(A) = \\lVert A\\rVert\\lVert A^{-1}\\rVert$ and norms are submultiplicative: $\\lVert AB\\rVert\\le\\lVert A\\rVert\\lVert B\\rVert$.',
				'Ask what $\\kappa(S)$ can be for an eigenvector matrix $S$.'
			],
			'$Q^{\\mathsf T}Q = I$ so every singular value is $1$ and $\\kappa(Q) = \\sigma_{\\max}/\\sigma_{\\min} = 1$.\n\nFor products: $\\kappa(AB) = \\lVert AB\\rVert\\lVert B^{-1}A^{-1}\\rVert\\le\\lVert A\\rVert\\lVert B\\rVert\\lVert B^{-1}\\rVert\\lVert A^{-1}\\rVert = \\kappa(A)\\kappa(B)$.\n\n**Consequences.** If a computation passes through orthogonal factors, each contributes a factor $\\kappa(Q) = 1$, so no amplification of errors is introduced (QR, SVD, Householder). A factorisation $A = SDS^{-1}$ uses the eigenvector matrix $S$, which can be nearly singular with a huge $\\kappa(S)$ (e.g. nearly parallel eigenvectors), and the bound then allows errors to be magnified by $\\kappa(S)^2$: the problem solved through the diagonalisation can be much worse conditioned than the original.'
		),
		open(
			C,
			'17.16',
			'A problem has $\\kappa = 10^5$ and is solved by a backward stable algorithm in double precision. Roughly how many correct digits should you expect? What if the computation is done in single precision, where $\\varepsilon\\approx6\\times10^{-8}$?',
			[
				'The rule of thumb: relative error $\\approx\\kappa\\cdot\\varepsilon$, so the number of correct digits is about $-\\log_{10}(\\kappa\\varepsilon)$.',
				'Double precision has $\\varepsilon\\approx1.1\\times10^{-16}$.'
			],
			'**Double:** error $\\approx10^5\\cdot1.1\\times10^{-16}\\approx10^{-11}$: about **11 correct digits** (16 digits minus the 5 lost to conditioning).\n\n**Single:** error $\\approx10^5\\cdot6\\times10^{-8} = 6\\times10^{-3}$: only about **2 correct digits** (7 minus 5).\n\nThe conditioning removes $\\log_{10}\\kappa = 5$ digits from whatever precision you start with, regardless of the algorithm.'
		),
		open(
			C,
			'17.17',
			'A dense $n\\times n$ system is solved by LU. Estimate the time at $n = 10^3, 10^4$ and $10^5$ on a machine sustaining $10^{11}$ operations per second, and the storage each needs in double precision. At which size does storage become the binding constraint rather than time?',
			[
				'LU takes about $\\tfrac23n^3$ floating-point operations. Time $=$ operations $/\\ 10^{11}$.',
				'Storing the matrix takes $n^2$ doubles of $8$ bytes each.',
				'Compare with a typical memory of $16$–$64$ GB.'
			],
			'| $n$ | flops $\\approx\\tfrac23n^3$ | time | storage $8n^2$ bytes |\n|---|---|---|---|\n| $10^3$ | $6.7\\times10^8$ | $\\approx7$ ms | $8$ MB |\n| $10^4$ | $6.7\\times10^{11}$ | $\\approx7$ s | $800$ MB |\n| $10^5$ | $6.7\\times10^{14}$ | $\\approx6.7\\times10^3$ s $\\approx1.9$ h | $80$ GB |\n\nTime grows like $n^3$ but is still tolerable (about two hours) at $n = 10^5$, whereas $80$ GB exceeds the memory of an ordinary machine. So **storage becomes the binding constraint** somewhere between $n = 10^4$ and $10^5$ on a normal computer: you can wait two hours, but you cannot store a matrix that does not fit in memory. (At very large $n$ the $n^3$ time overtakes again, which is why huge problems must exploit sparsity or structure.)'
		)
	]
};

import type { QuizBank } from '../types';
import { open } from '../exerciseHelpers';

const C = 'ch18';

export const exercises: QuizBank = {
	'ch18.exercises': [
		open(
			C,
			'19.12',
			'Let $W_1$ be $4\\times10$, $W_2$ be $2\\times4$ and $W_3$ be $10\\times2$. What is the largest possible rank of $W_3W_2W_1$, and which layer is responsible? Give an example achieving it.',
			[
				'The product is $10\\times10$. Use $\\operatorname{rank}(AB)\\le\\min(\\operatorname{rank}A,\\operatorname{rank}B)$.',
				'Which of the three matrices has the smallest possible rank?'
			],
			'$\\operatorname{rank}(W_3W_2W_1)\\le\\min(\\operatorname{rank}W_1,\\operatorname{rank}W_2,\\operatorname{rank}W_3)\\le\\min(4,2,2) = 2$. The bottleneck is $W_2$ (and $W_3$): the signal is squeezed through a **2-dimensional** space, so the $10\\times10$ product cannot have rank above $2$.\n\n**Example reaching 2.** $W_1 = [\\,I_4\\mid0\\,]$ (first four coordinates), $W_2 = \\begin{bmatrix}1&0&0&0\\\\0&1&0&0\\end{bmatrix}$, $W_3 = \\begin{bmatrix}I_2\\\\0\\end{bmatrix}$. Then $W_3W_2W_1 = \\operatorname{diag}(1,1,0,\\dots,0)$, which has rank $2$.'
		),
		open(
			C,
			'19.13',
			'Two embeddings satisfy $\\lVert\\mathbf u\\rVert = 3$, $\\lVert\\mathbf v\\rVert = 5$ and $\\langle\\mathbf u,\\mathbf v\\rangle = 12$. Find the cosine similarity and the angle. Now replace $\\mathbf v$ by $10\\mathbf v$: which of the two quantities changes, and what does that say about when cosine is the right measure?',
			[
				'$\\cos\\theta = \\dfrac{\\langle\\mathbf u,\\mathbf v\\rangle}{\\lVert\\mathbf u\\rVert\\lVert\\mathbf v\\rVert}$.',
				'Scaling $\\mathbf v$ by $10$ multiplies both $\\langle\\mathbf u,\\mathbf v\\rangle$ and $\\lVert\\mathbf v\\rVert$ by $10$.'
			],
			'$\\cos\\theta = \\dfrac{12}{3\\cdot5} = 0.8$, so $\\theta = \\arccos0.8\\approx36.9^\\circ$.\n\nWith $10\\mathbf v$: the inner product becomes $120$ (it changes), but $\\cos\\theta = \\dfrac{120}{3\\cdot50} = 0.8$ is **unchanged**.\n\nCosine similarity ignores length, so it is the right measure when only the direction carries meaning (e.g. topic of a document, regardless of its length). The raw inner product mixes in magnitudes, which is right only when magnitude is itself meaningful (e.g. confidence or frequency).'
		),
		open(
			C,
			'19.14',
			'Take sequence length $n = 4096$ and $d = d_v = 64$. Count the multiplications in $(QK^{\\mathsf T})V$ and in $Q(K^{\\mathsf T}V)$ for $Q,K\\in\\mathbb{R}^{n\\times d}$, $V\\in\\mathbb{R}^{n\\times d_v}$, ignoring softmax. At what value of $n$ do the two totals cross?',
			[
				'Multiplying an $a\\times b$ matrix by a $b\\times c$ matrix costs $abc$ multiplications.',
				'Left grouping: $QK^{\\mathsf T}$ is $(n\\times d)(d\\times n)$, then times $V$ is $(n\\times n)(n\\times d_v)$. Right grouping: $K^{\\mathsf T}V$ is $(d\\times n)(n\\times d_v)$, then $Q$ times that is $(n\\times d)(d\\times d_v)$.'
			],
			'**Left, $(QK^{\\mathsf T})V$:** $n\\cdot d\\cdot n + n\\cdot n\\cdot d_v = n^2(d + d_v) = 4096^2\\cdot128\\approx2.1\\times10^9$.\n\n**Right, $Q(K^{\\mathsf T}V)$:** $d\\cdot n\\cdot d_v + n\\cdot d\\cdot d_v = 2ndd_v = 2\\cdot4096\\cdot64\\cdot64\\approx3.4\\times10^7$.\n\nThe regrouped product is about $64\\times$ cheaper. They cross when $n^2(d + d_v) = 2ndd_v$, i.e. $n = \\dfrac{2dd_v}{d + d_v} = 64$ (for $d = d_v = 64$): for sequences shorter than the head dimension the left grouping is cheaper, for longer ones the right grouping wins, and the gap grows linearly with $n$.'
		),
		open(
			C,
			'19.15',
			'Show that softmax is not a linear map, by exhibiting vectors $\\mathbf u,\\mathbf v$ with $\\operatorname{softmax}(\\mathbf u + \\mathbf v)\\ne\\operatorname{softmax}(\\mathbf u) + \\operatorname{softmax}(\\mathbf v)$. Deduce that the regrouping in the linear attention insight is not available when softmax is present.',
			[
				'Every output of softmax is a probability vector: its entries sum to $1$. What do the entries of the sum of two such vectors add up to?',
				'Try $\\mathbf u = \\mathbf v = (0,0)$ or $\\mathbf u = \\mathbf v = (1,0)$.'
			],
			'Take $\\mathbf u = \\mathbf v = (0,0)$. Then $\\operatorname{softmax}(\\mathbf u + \\mathbf v) = \\operatorname{softmax}(0,0) = (\\tfrac12,\\tfrac12)$ but $\\operatorname{softmax}(\\mathbf u) + \\operatorname{softmax}(\\mathbf v) = (1,1)$. Not equal.\n\n(In general the outputs of softmax always sum to $1$, so the sum of two softmaxes sums to $2$ while the softmax of a sum sums to $1$. Linearity would need $f(2\\mathbf u) = 2f(\\mathbf u)$, which fails.)\n\n**Consequence.** Attention with softmax is $\\operatorname{softmax}(QK^{\\mathsf T})V$. The softmax is applied entry by entry to the $n\\times n$ matrix $QK^{\\mathsf T}$, which therefore **must be formed** before multiplying by $V$. The associativity trick $(QK^{\\mathsf T})V = Q(K^{\\mathsf T}V)$ only works when nothing nonlinear sits between the two products.'
		),
		open(
			C,
			'19.16',
			'For the layer $f(\\mathbf x) = W\\mathbf x$ compute the Jacobian, and for $f(\\mathbf x) = \\sigma(W\\mathbf x)$ with $\\sigma$ applied entrywise show that the Jacobian is $\\operatorname{diag}(\\sigma\'(W\\mathbf x))\\,W$. Write down the corresponding backward step.',
			[
				'For $f(\\mathbf x) = W\\mathbf x$, $\\partial f_i/\\partial x_j = W_{ij}$.',
				'For the composition use the chain rule: $\\sigma$ acts on each coordinate separately, so its Jacobian is diagonal.',
				'The backward step multiplies the incoming gradient by the **transpose** of the Jacobian.'
			],
			'$J_f = W$.\n\nFor $f = \\sigma\\circ(W\\cdot)$ with $\\mathbf z = W\\mathbf x$: $\\partial f_i/\\partial x_j = \\sigma\'(z_i)W_{ij}$, so $J_f = \\operatorname{diag}(\\sigma\'(\\mathbf z))\\,W$.\n\n**Backward.** If $\\mathbf g = \\nabla_{f}\\mathcal L$ is the gradient arriving from above, then $\\nabla_{\\mathbf x}\\mathcal L = J_f^{\\mathsf T}\\mathbf g = W^{\\mathsf T}\\big(\\sigma\'(\\mathbf z)\\odot\\mathbf g\\big)$ where $\\odot$ is entrywise product (first multiply by $\\sigma\'$ entrywise, then by $W^{\\mathsf T}$). And the weight gradient is $\\nabla_W\\mathcal L = \\big(\\sigma\'(\\mathbf z)\\odot\\mathbf g\\big)\\mathbf x^{\\mathsf T}$.'
		),
		open(
			C,
			'19.17',
			'Verify the outer-product proposition by hand for $W$ of size $2\\times2$, $\\mathbf x = (1,2)$ and $\\nabla_{\\mathbf y}\\mathcal L = (3,-1)$, where $\\mathbf y = W\\mathbf x$. Confirm that the resulting matrix has rank one and identify its column space.',
			[
				'$y_i = \\sum_kW_{ik}x_k$, so $\\partial\\mathcal L/\\partial W_{ik} = (\\partial\\mathcal L/\\partial y_i)\\,x_k$.',
				'Assemble the four entries: this is the outer product $\\nabla_{\\mathbf y}\\mathcal L\\,\\mathbf x^{\\mathsf T}$.'
			],
			'$\\partial\\mathcal L/\\partial W_{ik} = g_ix_k$ with $\\mathbf g = (3,-1)$, $\\mathbf x = (1,2)$:\n$\\nabla_W\\mathcal L = \\mathbf g\\mathbf x^{\\mathsf T} = \\begin{bmatrix}3\\cdot1&3\\cdot2\\\\-1\\cdot1&-1\\cdot2\\end{bmatrix} = \\begin{bmatrix}3&6\\\\-1&-2\\end{bmatrix}$.\n\nThe second column is twice the first and $\\det = -6 + 6 = 0$, so the rank is $1$. The column space is $\\operatorname{span}\\{(3,-1)\\} = \\operatorname{span}\\{\\mathbf g\\}$ (and the row space is $\\operatorname{span}\\{(1,2)\\} = \\operatorname{span}\\{\\mathbf x\\}$). Summed over a batch of $B$ examples the gradient is a sum of $B$ such rank-one pieces, so it has rank at most $B$.'
		),
		open(
			C,
			'19.18',
			'A weight matrix is $2048\\times2048$. Compare the parameter counts of a full update and of a rank-$16$ update. If the singular values of the ideal update are $\\sigma_i = 2^{-i/4}$, what fraction of $\\lVert\\Delta W\\rVert_F^2$ does a rank-$16$ approximation retain?',
			[
				'Full update: $2048^2$ parameters. Rank-$r$ update $BA$ with $B\\in\\mathbb{R}^{2048\\times r}$ and $A\\in\\mathbb{R}^{r\\times2048}$: $r(2048 + 2048)$ parameters.',
				'The squared Frobenius norm is $\\sum\\sigma_i^2$ with $\\sigma_i^2 = 2^{-i/2} = \\rho^i$, $\\rho = 2^{-1/2}$. This is a geometric series; the fraction kept by the first $16$ is $1 - \\rho^{16}$ (the tail of $2048$ terms is negligible).'
			],
			'**Parameters:** full $2048^2 = 4{,}194{,}304$; rank-$16$: $16\\cdot4096 = 65{,}536$, which is $1/64\\approx1.6\\%$ of the full count.\n\n**Energy retained:** $\\sigma_i^2 = \\rho^i$ with $\\rho = 2^{-1/2}$. Sum of the first $16$ over the (essentially infinite) total is $1 - \\rho^{16} = 1 - 2^{-8} = \\tfrac{255}{256}\\approx99.6\\%$.\n\nSo a rank-$16$ update uses $1.6\\%$ of the parameters yet captures about $99.6\\%$ of the squared norm, if the update has rapidly decaying singular values. This is the reasoning behind low-rank adaptation.'
		),
		open(
			C,
			'19.19',
			'Write down the Laplacian of the triangle on three vertices and of the star on four vertices, and find all eigenvalues of each. Check the zero-eigenvalue theorem in both cases, and compare the two values of $\\lambda_2$: which graph is better connected?',
			[
				'$L = D - A$ with $D$ the diagonal matrix of degrees and $A$ the adjacency matrix.',
				'Triangle: $L = 3I - J$... rather $L = \\begin{bmatrix}2&-1&-1\\\\-1&2&-1\\\\-1&-1&2\\end{bmatrix} = 3I - J$ with $J$ all-ones. Star: centre degree $3$, leaves degree $1$.',
				'Check that the eigenvalues sum to the trace.'
			],
			'**Triangle:** $L = 3I - J$. $J$ has eigenvalues $3,0,0$, so $L$ has eigenvalues $0,3,3$. Trace $6 = 0 + 3 + 3$ ✓.\n\n**Star** (centre $c$, leaves $1,2,3$): $L = \\begin{bmatrix}3&-1&-1&-1\\\\-1&1&0&0\\\\-1&0&1&0\\\\-1&0&0&1\\end{bmatrix}$. Eigenvalues: $0$ (all-ones), $1$ (twice, for vectors on the leaves summing to $0$ with centre $0$), and $4$ (vector $(3,-1,-1,-1)$). Trace $6 = 0 + 1 + 1 + 4$ ✓.\n\n**Check.** Each graph is connected, so the multiplicity of the eigenvalue $0$ is exactly $1$ (the number of connected components) ✓.\n\n**Connectivity.** $\\lambda_2 = 3$ for the triangle and $\\lambda_2 = 1$ for the star. A larger algebraic connectivity means harder to cut: the triangle is better connected (cutting the star at a single edge isolates a leaf, and there is no redundancy).'
		),
		open(
			C,
			'19.20',
			'The graph in the spectral clustering figure is two triangles $\\{1,2,3\\}$ and $\\{4,5,6\\}$ joined by the edge $3$–$4$. Verify the claim by setting up the two distinct eigen-equations for a vector of the form $(w,w,u,-u,-w,-w)$, deriving $\\lambda^2 - 5\\lambda + 2 = 0$, and solving. Which root is $\\lambda_2$, and what does the other root correspond to?',
			[
				'Vertex $1$ has degree $2$ (neighbours $2$ and $3$): $(L\\mathbf v)_1 = 2v_1 - v_2 - v_3 = 2w - w - u$.',
				'Vertex $3$ has degree $3$ (neighbours $1,2,4$): $(L\\mathbf v)_3 = 3u - w - w - (-u) = 4u - 2w$.',
				'Set $(L\\mathbf v)_1 = \\lambda w$ and $(L\\mathbf v)_3 = \\lambda u$, eliminate $u$.'
			],
			'Eigen-equations: $w - u = \\lambda w$ and $4u - 2w = \\lambda u$ (vertices $2,4,5,6$ give the same by symmetry).\n\nFrom the first, $u = (1 - \\lambda)w$. Substituting: $4(1 - \\lambda)w - 2w = \\lambda(1 - \\lambda)w$, so $2 - 4\\lambda = \\lambda - \\lambda^2$, i.e. **$\\lambda^2 - 5\\lambda + 2 = 0$**.\n\nRoots: $\\lambda = \\tfrac12(5\\pm\\sqrt{17})$, about $0.438$ and $4.562$.\n\n$\\lambda_2 = \\tfrac12(5 - \\sqrt{17})\\approx0.44$ is the smaller (the nonzero eigenvalue closest to $0$; here $u = (1 - \\lambda)w\\approx0.56w$ has the same sign as $w$ within each triangle, so the signs separate the two triangles: the Fiedler vector). The larger root $\\approx4.56$ gives $u = (1-\\lambda)w\\approx-3.56w$, a rapidly oscillating mode where the bridge vertex is strongly opposed to its triangle: it is the largest eigenvalue of the Laplacian (the "highest frequency"), not a cut.'
		)
	]
};

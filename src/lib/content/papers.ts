import type { Question } from './types';

/** A past exam paper, broken into its parts. Each part is a question the quiz runner can show. */
export interface Paper {
	id: string;
	title: string;
	blurb: string;
	minutes: number;
	marks: number;
	/** lessons whose worked examples teach exactly these methods */
	lessons: { chapter: string; slug: string; label: string }[];
	questions: Question[];
}

type Common = { part: string; marks: number; prompt: string; hints: string[] };
const src = (paper: string, part: string, marks: number) => `${paper}, ${part} [${marks} mark${marks === 1 ? '' : 's'}]`;

function maker(paperId: string, paperName: string) {
	const id = (part: string) => `paper.${paperId}.${part.toLowerCase().replace(/[^a-z0-9]+/g, '')}`;
	return {
		open: (c: Common & { solution: string }): Question => ({
			id: id(c.part),
			type: 'open',
			source: src(paperName, c.part, c.marks),
			prompt: c.prompt,
			hints: c.hints,
			explain: c.solution,
			solution: c.solution
		}),
		vector: (c: Common & { answer: number[]; explain: string; tol?: number }): Question => ({
			id: id(c.part),
			type: 'vector',
			source: src(paperName, c.part, c.marks),
			prompt: c.prompt,
			hints: c.hints,
			explain: c.explain,
			answer: c.answer,
			tol: c.tol
		}),
		numeric: (c: Common & { answer: number; explain: string; tol?: number }): Question => ({
			id: id(c.part),
			type: 'numeric',
			source: src(paperName, c.part, c.marks),
			prompt: c.prompt,
			hints: c.hints,
			explain: c.explain,
			answer: c.answer,
			tol: c.tol
		}),
		mcq: (c: Common & { choices: string[]; answer: number; notes: string[]; explain: string }): Question => ({
			id: id(c.part),
			type: 'mcq',
			source: src(paperName, c.part, c.marks),
			prompt: c.prompt,
			hints: c.hints,
			explain: c.explain,
			choices: c.choices,
			answer: c.answer,
			notes: c.notes
		})
	};
}

const lessons = [
	{ chapter: 'ch01', slug: 'lines-planes', label: 'Q1 · Lines that miss the origin, closest point' },
	{ chapter: 'ch02', slug: 'solution-sets', label: 'Q2 · Systems with a parameter, complete solution' },
	{ chapter: 'ch06', slug: 'rank-nullity', label: 'Q2(c) · Rank–nullity' },
	{ chapter: 'ch03', slug: 'lu', label: 'Q3 · Using a given LU factorisation' },
	{ chapter: 'ch04', slug: 'subspaces', label: 'Q4(a)(d) · Polynomial subspaces, counterexamples' },
	{ chapter: 'ch05', slug: 'coordinates', label: 'Q4(b)(c) · Coordinates, extending a basis' }
];

/* ---------------- the real paper ---------------- */

const Q = maker('quiz-1', 'Quiz 1');
const A_a = 'A_a = \\begin{bmatrix}1&1&0\\\\0&a&1\\\\1&1&1\\end{bmatrix},\\ \\mathbf b_\\beta = \\begin{bmatrix}1\\\\2\\\\\\beta\\end{bmatrix}';

const quiz1: Paper = {
	id: 'quiz-1',
	title: 'Linear Algebra Quiz 1',
	blurb: 'Your actual quiz: 4 questions, 30 marks, 45 minutes. Each part has graded hints and a marking-scheme style model answer: every line a grader looks for is written out.',
	minutes: 45,
	marks: 30,
	lessons,
	questions: [
		Q.open({
			part: 'Q1(a)',
			marks: 3,
			prompt: 'Let $P = (1,0,1)$, $Q = (2,1,1)$, $\\mathbf b = (2,0,0)$; the line $\\ell$ passes through $P$ and $Q$. Let $\\mathbf d = Q - P$. Compute $\\mathbf d$ and write every point of $\\ell$ as $\\mathbf r(t) = P + t\\mathbf d$. Is $\\ell$ a subspace of $\\mathbb R^3$? Justify.',
			hints: [
				'Subtract coordinate by coordinate: $\\mathbf d = (2-1,\\ 1-0,\\ 1-1)$.',
				'Write $\\mathbf r(t)$ out coordinate by coordinate. Which coordinate never changes as $t$ varies?',
				'Every subspace contains $\\mathbf 0$. Can $\\mathbf r(t) = (0,0,0)$ for some $t$?'
			],
			solution:
				'$\\mathbf d = Q - P = (1, 1, 0)$. **[1]**\n$\\mathbf r(t) = (1,0,1) + t(1,1,0) = (1 + t,\\ t,\\ 1)$, $t\\in\\mathbb R$. **[1]**\n**Not a subspace.** Every subspace contains $\\mathbf 0$, but the third coordinate of every point of $\\ell$ is $1$, so $\\mathbf 0\\notin\\ell$. **[1]** (Equivalently: $\\mathbf r(0) + \\mathbf r(0) = (2,0,2)$ has third coordinate $2$, so $\\ell$ is not closed under addition.) $\\ell$ is the affine line $P + \\operatorname{span}\\{\\mathbf d\\}$, a subspace shifted away from the origin.'
		}),
		Q.open({
			part: 'Q1(b)',
			marks: 4,
			prompt: 'Find the point $\\mathbf p$ of $\\ell$ closest to $\\mathbf b = (2,0,0)$ by requiring $(\\mathbf b - \\mathbf p)\\cdot\\mathbf d = 0$. Compute the distance from $\\mathbf b$ to $\\ell$.',
			hints: [
				'Put $\\mathbf p = \\mathbf r(t)$ with an unknown $t$ and compute the vector $\\mathbf b - \\mathbf r(t)$.',
				'$\\mathbf b - \\mathbf r(t) = (1 - t,\\ -t,\\ -1)$. Dot it with $\\mathbf d = (1,1,0)$ and set it to $0$.',
				'Once you have $t$, the distance is the length of $\\mathbf b - \\mathbf p$. Check $(\\mathbf b - \\mathbf p)\\cdot\\mathbf d = 0$ before you finish.'
			],
			solution:
				'$\\mathbf b - \\mathbf r(t) = (2 - 1 - t,\\ 0 - t,\\ 0 - 1) = (1 - t,\\ -t,\\ -1)$. **[1]**\n$(\\mathbf b - \\mathbf r(t))\\cdot\\mathbf d = (1 - t) + (-t) + 0 = 1 - 2t = 0$, so $t = \\tfrac12$. **[1]**\n$\\mathbf p = \\mathbf r(\\tfrac12) = (\\tfrac32,\\ \\tfrac12,\\ 1)$. **[1]**\n$\\mathbf b - \\mathbf p = (\\tfrac12,\\ -\\tfrac12,\\ -1)$; check $\\tfrac12 - \\tfrac12 + 0 = 0$ ✓. Distance $= \\sqrt{\\tfrac14 + \\tfrac14 + 1} = \\sqrt{\\tfrac32} = \\dfrac{\\sqrt6}{2}\\approx1.22$. **[1]**'
		}),
		Q.open({
			part: 'Q2(a)',
			marks: 4,
			prompt: `For real parameters $a,\\beta$ consider $A_a\\mathbf x = \\mathbf b_\\beta$ with $${A_a}$. Use row operations to classify all pairs $(a,\\beta)$: unique solution, no solution, or infinitely many solutions.`,
			hints: [
				'Write the augmented matrix and do $R_3 \\leftarrow R_3 - R_1$. Do not divide by $a$.',
				'You get rows $[1\\ 1\\ 0\\mid1]$, $[0\\ a\\ 1\\mid2]$, $[0\\ 0\\ 1\\mid\\beta - 1]$. The only pivot that can vanish is $a$: split into $a\\ne0$ and $a = 0$.',
				'When $a = 0$, rows 2 and 3 both start $[0\\ 0\\ 1\\mid\\ldots]$. Subtract them and look at the right-hand side.'
			],
			solution:
				'$\\left[\\begin{array}{ccc|c}1&1&0&1\\\\0&a&1&2\\\\1&1&1&\\beta\\end{array}\\right]\\xrightarrow{R_3 - R_1}\\left[\\begin{array}{ccc|c}1&1&0&1\\\\0&a&1&2\\\\0&0&1&\\beta - 1\\end{array}\\right]$ **[1]**\n- **$a\\ne0$**: pivots $1, a, 1$ in all three columns, so a **unique solution for every $\\beta$** (indeed $\\det A_a = a$). **[1]** (It is $x_3 = \\beta - 1$, $x_2 = (3 - \\beta)/a$, $x_1 = 1 - x_2$.)\n- **$a = 0$**: rows 2 and 3 are $[0\\ 0\\ 1\\mid2]$ and $[0\\ 0\\ 1\\mid\\beta - 1]$; $R_3 - R_2$ gives $[0\\ 0\\ 0\\mid\\beta - 3]$. **[1]**\n  - $\\beta\\ne3$: the row says $0 = \\beta - 3\\ne0$: **no solution**.\n  - $\\beta = 3$: consistent, column 2 has no pivot ($x_2$ free): **infinitely many solutions**. **[1]**'
		}),
		Q.open({
			part: 'Q2(b)',
			marks: 3,
			prompt: 'In the case with infinitely many solutions ($a = 0$, $\\beta = 3$), write the complete solution set as a particular solution plus a linear combination of null-space vectors.',
			hints: [
				'The reduced equations are $x_1 + x_2 = 1$ and $x_3 = 2$. Which variable is free?',
				'Set $x_2 = s$ and solve for $x_1, x_3$. Then split the answer into a part without $s$ and $s$ times a vector.',
				'Check: the vector multiplying $s$ must satisfy $A_0\\mathbf n = \\mathbf 0$.'
			],
			solution:
				'With $a = 0$, $\\beta = 3$ the system reduces to $x_1 + x_2 = 1$, $x_3 = 2$; $x_2 = s$ is free. **[1]**\n$x_1 = 1 - s$, $x_3 = 2$:\n$$\\mathbf x = \\begin{bmatrix}1\\\\0\\\\2\\end{bmatrix} + s\\begin{bmatrix}-1\\\\1\\\\0\\end{bmatrix},\\ s\\in\\mathbb R.$$ **[1]**\nCheck: $A_0(1,0,2) = (1,\\ 2,\\ 3) = \\mathbf b_3$ ✓ and $A_0(-1,1,0) = (0,0,0)$ ✓. **[1]**'
		}),
		Q.open({
			part: 'Q2(c)',
			marks: 2,
			prompt: 'For $a = 0$, give a basis of $N(A_0)$ and state $\\operatorname{rank}A_0$. Verify the rank–nullity relation.',
			hints: [
				'Solve $A_0\\mathbf x = \\mathbf 0$ using the same elimination: $x_1 + x_2 = 0$, $x_3 = 0$.',
				'Rank = number of pivots. Rank–nullity: rank + nullity = number of columns.'
			],
			solution:
				'$A_0\\mathbf x = \\mathbf 0$ reduces to $x_1 + x_2 = 0$, $x_3 = 0$, so $\\mathbf x = s(-1,1,0)$: basis of $N(A_0)$ is $\\{(-1,1,0)\\}$, nullity $1$. **[1]**\nPivots in columns 1 and 3, so $\\operatorname{rank}A_0 = 2$. $\\operatorname{rank} + \\operatorname{nullity} = 2 + 1 = 3$ = number of columns ✓. **[1]**'
		}),
		Q.open({
			part: 'Q3(a)',
			marks: 2,
			prompt: 'A matrix is factored as $A = LU$ with $L = \\begin{bmatrix}1&0&0\\\\2&1&0\\\\-1&1&1\\end{bmatrix}$, $U = \\begin{bmatrix}2&1&0\\\\0&1&2\\\\0&0&1\\end{bmatrix}$. A student claims $A^{-1} = L^{-1}U^{-1}$. State the correct formula and justify it by multiplying with $A$.',
			hints: [
				'To undo "first $U$, then $L$" you undo the last step first. Which inverse goes on the left?',
				'Multiply your candidate by $A = LU$ and group the middle two factors so they cancel. Do it on both sides.'
			],
			solution:
				'Correct formula: $A^{-1} = (LU)^{-1} = U^{-1}L^{-1}$. **[1]**\nCheck: $A(U^{-1}L^{-1}) = L(UU^{-1})L^{-1} = LL^{-1} = I$ and $(U^{-1}L^{-1})A = U^{-1}(L^{-1}L)U = U^{-1}U = I$. **[1]**\nThe student\'s product gives $LUL^{-1}U^{-1}$, where $UL^{-1}$ does not cancel because matrix multiplication does not commute.'
		}),
		Q.open({
			part: 'Q3(b)',
			marks: 4,
			prompt: 'With the same $L$ and $U$, solve $A\\mathbf x = (1,5,4)^{\\mathsf T}$ using forward and backward substitution. Display both intermediate systems. Do not form $A$ or either inverse.',
			hints: [
				'Let $\\mathbf y = U\\mathbf x$. First solve $L\\mathbf y = (1,5,4)$ from the top: $y_1 = 1$, then $2y_1 + y_2 = 5$, ...',
				'$\\mathbf y = (1, 3, 2)$. Now solve $U\\mathbf x = \\mathbf y$ from the bottom: $x_3 = 2$ first.',
				'Check by computing $U\\mathbf x$ and comparing with $\\mathbf y$.'
			],
			solution:
				'**Forward**, $L\\mathbf y = \\mathbf b$: **[1]**\n$$\\begin{aligned}y_1 &= 1\\\\ 2y_1 + y_2 &= 5\\\\ -y_1 + y_2 + y_3 &= 4\\end{aligned}$$\n$y_1 = 1$, $y_2 = 5 - 2 = 3$, $y_3 = 4 + 1 - 3 = 2$: $\\mathbf y = (1,3,2)$. **[1]**\n**Backward**, $U\\mathbf x = \\mathbf y$: **[1]**\n$$\\begin{aligned}2x_1 + x_2 &= 1\\\\ x_2 + 2x_3 &= 3\\\\ x_3 &= 2\\end{aligned}$$\n$x_3 = 2$, $x_2 = 3 - 4 = -1$, $x_1 = (1 + 1)/2 = 1$: $\\mathbf x = (1, -1, 2)$. **[1]**\n(Check without forming $A$: $U\\mathbf x = (2 - 1,\\ -1 + 4,\\ 2) = (1,3,2) = \\mathbf y$ ✓.)'
		}),
		Q.open({
			part: 'Q4(a)',
			marks: 3,
			prompt: 'Let $W = \\{p\\in P_2 : p(0) = p(1)\\}$. Show that $W$ is a subspace of $P_2$. Starting with $p(t) = a + bt + ct^2$, find a basis of $W$ and its dimension.',
			hints: [
				'Subspace: check $0\\in W$, and that $p, q\\in W$ implies $p + q\\in W$ and $cp\\in W$. Use $(p + q)(0) = p(0) + q(0)$.',
				'$p(0) = a$ and $p(1) = a + b + c$. What equation does $p(0) = p(1)$ give?',
				'$b + c = 0$, so $c = -b$. Substitute and group the terms by the free letters $a$ and $b$.'
			],
			solution:
				'**Subspace.** $0(0) = 0 = 0(1)$, so $0\\in W$. If $p,q\\in W$, $(p + q)(0) = p(0) + q(0) = p(1) + q(1) = (p + q)(1)$. And $(cp)(0) = c\\,p(0) = c\\,p(1) = (cp)(1)$. **[1]** (Or: $W = \\ker T$ for the linear map $T(p) = p(1) - p(0)$.)\n**Basis.** $p(0) = a$, $p(1) = a + b + c$, so the condition is $b + c = 0$, i.e. $c = -b$. **[1]**\n$p = a + bt - bt^2 = a\\cdot1 + b\\,(t - t^2)$. So $W = \\operatorname{span}\\{1,\\ t - t^2\\}$; the two are independent (different degrees), so $\\{1,\\ t - t^2\\}$ is a basis and $\\dim W = 2$. **[1]**'
		}),
		Q.open({
			part: 'Q4(b)',
			marks: 2,
			prompt: 'Verify that $B = (1,\\ t^2 - t)$ is an ordered basis of $W$. With $[q]_B = (\\alpha,\\beta)^{\\mathsf T}$ meaning $q(t) = \\alpha\\cdot1 + \\beta(t^2 - t)$, find $[q]_B$ for $q(t) = 3 - 2t + 2t^2$.',
			hints: [
				'Check that each of $1$ and $t^2 - t$ satisfies $p(0) = p(1)$, and that they are independent. How many vectors does a basis of the 2-dimensional $W$ need?',
				'Expand $\\alpha + \\beta(t^2 - t) = \\alpha - \\beta t + \\beta t^2$ and match the coefficients of $1$, $t$, $t^2$ with $3 - 2t + 2t^2$.'
			],
			solution:
				'$1$: $1 = 1$ ✓; $t^2 - t$: value $0$ at both $0$ and $1$ ✓. They are independent (not multiples), and $\\dim W = 2$, so $B$ is a basis. **[1]**\n$\\alpha + \\beta(t^2 - t) = \\alpha - \\beta t + \\beta t^2 = 3 - 2t + 2t^2$ gives $\\beta = 2$ (from $t^2$), $-\\beta = -2$ ✓ (from $t$), $\\alpha = 3$. So $[q]_B = (3, 2)^{\\mathsf T}$. **[1]**'
		}),
		Q.open({
			part: 'Q4(c)',
			marks: 1,
			prompt: 'Add one polynomial to $B$ to obtain a basis of $P_2$. Justify your choice.',
			hints: [
				'You need a polynomial that is **not** in $W$, i.e. with $p(0)\\ne p(1)$.',
				'Try $p(t) = t$. Then argue: independent list of $3 = \\dim P_2$ vectors.'
			],
			solution:
				'Add $t$. Since $t(0) = 0\\ne1 = t(1)$, $t\\notin W = \\operatorname{span}B$, so $(1,\\ t^2 - t,\\ t)$ is independent; $3$ independent vectors in the 3-dimensional $P_2$ form a basis. **[1]** (Check: the span contains $1$, $t$ and $t^2 = (t^2 - t) + t$.)'
		}),
		Q.open({
			part: 'Q4(d)',
			marks: 2,
			prompt: 'Let $S = \\{p\\in P_2 : p(0)\\,p(1) = 0\\}$. Decide whether $S$ is a subspace. If not, give two explicit polynomials that demonstrate a failure of a subspace condition.',
			hints: [
				'The condition is a product, so suspect closure under addition. $S$ contains every $p$ with $p(0) = 0$ **or** $p(1) = 0$.',
				'Pick one polynomial vanishing at $0$ and another vanishing at $1$, e.g. $t$ and $1 - t$. What is their sum?'
			],
			solution:
				'**Not a subspace.** $p(t) = t$ has $p(0) = 0$, so $p\\in S$; $q(t) = 1 - t$ has $q(1) = 0$, so $q\\in S$. **[1]**\nBut $p + q = 1$ and $(p + q)(0)\\,(p + q)(1) = 1\\cdot1 = 1\\ne0$, so $p + q\\notin S$: $S$ is not closed under addition. **[1]**\n($S$ is the union of the two subspaces $\\{p(0) = 0\\}$ and $\\{p(1) = 0\\}$; a union of two subspaces is a subspace only if one contains the other.)'
		})
	]
};

/* ---------------- a twin paper with new numbers ---------------- */

const T = maker('quiz-1-twin', 'Twin of Quiz 1');
const B_a = 'A_a = \\begin{bmatrix}1&0&1\\\\0&1&a\\\\1&1&2\\end{bmatrix},\\ \\mathbf b_\\beta = \\begin{bmatrix}2\\\\1\\\\\\beta\\end{bmatrix}';
const L2 = 'L = \\begin{bmatrix}1&0&0\\\\-1&1&0\\\\2&3&1\\end{bmatrix},\\ U = \\begin{bmatrix}1&1&2\\\\0&2&1\\\\0&0&-1\\end{bmatrix}';

const twin: Paper = {
	id: 'quiz-1-twin',
	title: 'Twin paper (new numbers)',
	blurb: 'The same four question types with fresh numbers, so you can check the methods really stuck. Numerical answers are marked automatically; explanations are self-checked against a model answer.',
	minutes: 45,
	marks: 30,
	lessons,
	questions: [
		T.vector({
			part: 'Q1(a)',
			marks: 1,
			prompt: 'The line $\\ell$ passes through $P = (0,1,2)$ and $Q = (1,1,3)$. Give the direction vector $\\mathbf d = Q - P$.',
			hints: ['Subtract coordinate by coordinate.', '$(1 - 0,\\ 1 - 1,\\ 3 - 2)$.'],
			answer: [1, 0, 1],
			explain: '$\\mathbf d = (1,0,1)$, so $\\mathbf r(t) = (t,\\ 1,\\ 2 + t)$.'
		}),
		T.mcq({
			part: 'Q1(a) justify',
			marks: 2,
			prompt: 'Is $\\ell = \\{(t,\\ 1,\\ 2 + t) : t\\in\\mathbb R\\}$ a subspace of $\\mathbb R^3$?',
			hints: ['A subspace must contain $(0,0,0)$.', 'Look at the middle coordinate of every point of $\\ell$.'],
			choices: [
				'No: every point has second coordinate $1$, so $\\mathbf 0\\notin\\ell$',
				'Yes: it is a line, and lines are subspaces',
				'Yes: it is closed under scaling by $t$',
				'No: it is not closed under scaling, because $t$ can be negative'
			],
			answer: 0,
			notes: [
				'Right. A subspace must contain $\\mathbf 0$, and no point of $\\ell$ does.',
				'Only lines **through the origin** are subspaces.',
				'Changing $t$ moves along the line; it is not the same as scaling the vectors of $\\ell$. In fact $2\\,\\mathbf r(0) = (0,2,4)\\notin\\ell$.',
				'Right verdict, wrong reason: negative $t$ is fine. The real reason is that $\\mathbf 0$ is missing (and so closure fails).'
			],
			explain: 'Second coordinate is always $1$, so $\\mathbf 0\\notin\\ell$. $\\ell$ is an affine line, not a subspace.'
		}),
		T.vector({
			part: 'Q1(b) point',
			marks: 2,
			prompt: 'Find the point $\\mathbf p$ of $\\ell$ closest to $\\mathbf b = (3,2,0)$. (Decimals are fine.)',
			hints: [
				'$\\mathbf b - \\mathbf r(t) = (3 - t,\\ 1,\\ -2 - t)$. Dot with $\\mathbf d = (1,0,1)$.',
				'$(3 - t) + (-2 - t) = 1 - 2t = 0$. Substitute $t$ back into $\\mathbf r(t)$.'
			],
			answer: [0.5, 1, 2.5],
			explain: '$1 - 2t = 0$ gives $t = \\tfrac12$ and $\\mathbf p = (\\tfrac12,\\ 1,\\ \\tfrac52)$.'
		}),
		T.numeric({
			part: 'Q1(b) distance',
			marks: 2,
			prompt: 'Give the distance from $\\mathbf b = (3,2,0)$ to $\\ell$, to 2 decimal places.',
			hints: ['Compute $\\mathbf b - \\mathbf p = (\\tfrac52,\\ 1,\\ -\\tfrac52)$.', 'Its length is $\\sqrt{\\tfrac{25}4 + 1 + \\tfrac{25}4}$.'],
			answer: 3.674,
			tol: 0.01,
			explain: '$\\lVert(\\tfrac52, 1, -\\tfrac52)\\rVert = \\sqrt{27/2} = \\tfrac{3\\sqrt6}{2}\\approx3.67$. Check: $(\\tfrac52, 1, -\\tfrac52)\\cdot(1,0,1) = 0$ ✓.'
		}),
		T.numeric({
			part: 'Q2(a) pivot',
			marks: 2,
			prompt: `For $${B_a}$, eliminate. For exactly one value of $a$ the system does **not** have a unique solution. Which value?`,
			hints: [
				'$R_3 - R_1$ gives $[0\\ 1\\ 1\\mid\\beta - 2]$. Then subtract row 2 from it.',
				'The new third row is $[0\\ 0\\ 1 - a\\mid\\beta - 3]$. When does its pivot vanish?'
			],
			answer: 1,
			explain: 'After $R_3 - R_1$ and $R_3 - R_2$: third row $[0\\ 0\\ 1 - a\\mid\\beta - 3]$. The pivot $1 - a$ vanishes at $a = 1$ (and $\\det A_a = 1 - a$).'
		}),
		T.mcq({
			part: 'Q2(a) classify',
			marks: 2,
			prompt: 'With the same system, which classification is correct?',
			hints: [
				'For $a\\ne1$ every column has a pivot.',
				'For $a = 1$ the last row is $[0\\ 0\\ 0\\mid\\beta - 3]$. When is that row a contradiction?'
			],
			choices: [
				'$a\\ne1$: unique; $a = 1,\\beta\\ne3$: none; $a = 1,\\beta = 3$: infinitely many',
				'$a\\ne1$: unique; $a = 1$: none, for every $\\beta$',
				'$a\\ne0$: unique; $a = 0$: infinitely many',
				'$a = 1,\\beta = 3$: unique; otherwise none'
			],
			answer: 0,
			notes: [
				'Right. The pivot $1 - a$ decides uniqueness; at $a = 1$ the right-hand side $\\beta - 3$ decides between none and infinitely many.',
				'At $a = 1$ the last row is $[0\\ 0\\ 0\\mid\\beta - 3]$, which is harmless when $\\beta = 3$: then there are infinitely many solutions.',
				'The pivot that vanishes is $1 - a$, not $a$. Do the elimination rather than guessing from the position of $a$.',
				'When $a = 1, \\beta = 3$ a column has no pivot, so solutions cannot be unique.'
			],
			explain: 'Pivots $1, 1, 1 - a$. Unique iff $a\\ne1$. At $a = 1$: no solution if $\\beta\\ne3$, infinitely many if $\\beta = 3$.'
		}),
		T.open({
			part: 'Q2(b)',
			marks: 3,
			prompt: 'For $a = 1$, $\\beta = 3$ write the complete solution set as a particular solution plus a linear combination of null-space vectors.',
			hints: [
				'Reduced equations: $x_1 + x_3 = 2$ and $x_2 + x_3 = 1$. Which variable has no pivot?',
				'Let $x_3 = s$; write $x_1, x_2$ in terms of $s$ and separate the constant part from the $s$ part.'
			],
			solution:
				'$x_3 = s$ free, $x_1 = 2 - s$, $x_2 = 1 - s$:\n$$\\mathbf x = \\begin{bmatrix}2\\\\1\\\\0\\end{bmatrix} + s\\begin{bmatrix}-1\\\\-1\\\\1\\end{bmatrix},\\ s\\in\\mathbb R.$$\nCheck: $A_1(2,1,0) = (2,\\ 1,\\ 3)$ ✓, $A_1(-1,-1,1) = (0,0,0)$ ✓.'
		}),
		T.vector({
			part: 'Q2(c)',
			marks: 2,
			prompt: 'For $a = 1$, $N(A_1)$ is a line. Give the basis vector whose third entry is $1$. (Then rank $A_1 = 3 - 1 = 2$.)',
			hints: ['Solve $x_1 + x_3 = 0$ and $x_2 + x_3 = 0$.', 'Set $x_3 = 1$.'],
			answer: [-1, -1, 1],
			explain: 'Basis $\\{(-1,-1,1)\\}$, nullity $1$; pivots in columns 1, 2 give rank $2$; $2 + 1 = 3$ ✓.'
		}),
		T.mcq({
			part: 'Q3(a)',
			marks: 2,
			prompt: `Given $A = LU$ with $${L2}$, which is $A^{-1}$?`,
			hints: ['The last thing applied is undone first.', 'Multiply your candidate by $LU$ and see whether the middle cancels.'],
			choices: ['$U^{-1}L^{-1}$', '$L^{-1}U^{-1}$', '$L^{-1} + U^{-1}$', '$UL$'],
			answer: 0,
			notes: [
				'Right: $(LU)(U^{-1}L^{-1}) = L(UU^{-1})L^{-1} = I$.',
				'$LU\\,L^{-1}U^{-1}$: the middle $UL^{-1}$ does not cancel, since matrices do not commute.',
				'Inverses do not add.',
				'That is a different matrix, not an inverse.'
			],
			explain: '$(LU)^{-1} = U^{-1}L^{-1}$; check $(LU)(U^{-1}L^{-1}) = I$ and $(U^{-1}L^{-1})(LU) = I$.'
		}),
		T.vector({
			part: 'Q3(b) forward',
			marks: 2,
			prompt: `With the same $L$, solve $L\\mathbf y = (3,-4,2)^{\\mathsf T}$ by forward substitution.`,
			hints: ['$y_1 = 3$. Row 2: $-y_1 + y_2 = -4$.', 'Row 3: $2y_1 + 3y_2 + y_3 = 2$.'],
			answer: [3, -1, -1],
			explain: '$y_1 = 3$; $y_2 = -4 + 3 = -1$; $y_3 = 2 - 6 + 3 = -1$.'
		}),
		T.vector({
			part: 'Q3(b) backward',
			marks: 2,
			prompt: 'Now solve $U\\mathbf x = \\mathbf y$ by back substitution, giving the solution of $A\\mathbf x = (3,-4,2)^{\\mathsf T}$.',
			hints: ['Back substitution starts from the bottom row: $-x_3 = -1$.', 'Then $2x_2 + x_3 = -1$, then $x_1 + x_2 + 2x_3 = 3$.'],
			answer: [2, -1, 1],
			explain: '$x_3 = 1$; $x_2 = (-1 - 1)/2 = -1$; $x_1 = 3 + 1 - 2 = 2$. Check $U\\mathbf x = (2 - 1 + 2,\\ -2 + 1,\\ -1) = (3,-1,-1)$ ✓.'
		}),
		T.open({
			part: 'Q4(a)',
			marks: 3,
			prompt: "Let $W = \\{p\\in P_2 : p'(1) = 0\\}$. Show that $W$ is a subspace, and with $p = a + bt + ct^2$ find a basis of $W$ and its dimension.",
			hints: [
				"Differentiation is linear: $(p + q)' = p' + q'$ and $(cp)' = cp'$. Use it for the three checks.",
				"$p'(t) = b + 2ct$, so $p'(1) = b + 2c$. Solve $b + 2c = 0$ for $b$ and substitute."
			],
			solution:
				"**Subspace**: $0' = 0$, $(p + q)'(1) = p'(1) + q'(1) = 0$, $(cp)'(1) = c\\,p'(1) = 0$. (It is the kernel of $p\\mapsto p'(1)$.)\n**Basis**: $p'(1) = b + 2c = 0$ gives $b = -2c$, so $p = a + c(t^2 - 2t)$. Basis $\\{1,\\ t^2 - 2t\\}$, $\\dim W = 2$."
		}),
		T.vector({
			part: 'Q4(b)',
			marks: 2,
			prompt: 'In the ordered basis $B = (1,\\ (t - 1)^2)$ of $W$, find $[q]_B = (\\alpha,\\beta)$ for $q(t) = 5 - 4t + 2t^2$.',
			hints: ['Expand $\\alpha + \\beta(t^2 - 2t + 1) = (\\alpha + \\beta) - 2\\beta t + \\beta t^2$.', 'Match $t^2$: $\\beta = 2$. Then match the constant term.'],
			answer: [3, 2],
			explain: '$\\beta = 2$ (from $t^2$), $-2\\beta = -4$ ✓, $\\alpha + \\beta = 5$ so $\\alpha = 3$: $[q]_B = (3,2)$.'
		}),
		T.mcq({
			part: 'Q4(c)',
			marks: 1,
			prompt: 'Which polynomial can be added to $B = (1,\\ (t - 1)^2)$ to get a basis of $P_2$?',
			hints: ["You need a polynomial **outside** $W$, i.e. with $p'(1)\\ne0$.", "Compute $p'(1)$ for each choice."],
			choices: ['$t$', '$3$', '$t^2 - 2t$', '$2(t - 1)^2 + 1$'],
			answer: 0,
			notes: [
				"Right: $t' = 1\\ne0$ at $t = 1$, so $t\\notin W$, and the three are independent: a basis of the 3-dimensional $P_2$.",
				"$3' = 0$, so $3\\in W$: it is already a multiple of $1$, giving a dependent list.",
				"$(t^2 - 2t)'(1) = 0$, so it lies in $W$ ($= (t - 1)^2 - 1$); the list would be dependent.",
				'That is $2b_2 + b_1$, a combination of the basis: dependent.'
			],
			explain: 'Add any polynomial outside $W$; $t$ works since $t\'(1) = 1\\ne0$.'
		}),
		T.mcq({
			part: 'Q4(d)',
			marks: 2,
			prompt: 'Is $S = \\{p\\in P_2 : p(0) = p(1)^2\\}$ a subspace of $P_2$?',
			hints: ['Squares are not linear. Test closure under scaling with a simple member.', 'The constant $p = 1$ is in $S$ ($1 = 1^2$). Is $2p$?'],
			choices: [
				'No: $p = 1\\in S$ but $2p = 2$ has $2\\ne2^2$',
				'Yes: it contains the zero polynomial',
				'Yes: the condition holds for every constant polynomial',
				'No: it does not contain the zero polynomial'
			],
			answer: 0,
			notes: [
				'Right: $1\\in S$, but $(2\\cdot1)(0) = 2$ while $(2\\cdot1)(1)^2 = 4$. Closure under scaling fails.',
				'Containing $0$ is necessary, not sufficient. Check closure too.',
				'False: the constant $2$ has $2\\ne4$.',
				'It does contain $0$ ($0 = 0^2$); the failure is closure.'
			],
			explain: '$S$ contains $0$ but is not closed under scaling: $1\\in S$, $2\\notin S$. Not a subspace.'
		})
	]
};

export const papers: Paper[] = [quiz1, twin];
export const getPaper = (id: string) => papers.find((p) => p.id === id);

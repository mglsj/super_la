<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import { lu } from '#lib/math/gauss.js';
	import { mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import WorkedExample from '#lib/components/lesson/WorkedExample.svelte';

	let m = $state<Mat>([
		[2, 1, 1],
		[4, 3, 3],
		[8, 7, 9]
	]);
	let f = $derived(lu(m));

	const swap = {
		problem:
			'Let $A = \\begin{bmatrix}0&2&1\\\\1&1&0\\\\2&4&3\\end{bmatrix}$ and $\\mathbf b = (3, 2, 9)^{\\mathsf T}$.\n(a) Explain why $A$ has no factorisation $A = LU$ without row exchanges, and find $P$, $L$, $U$ with $PA = LU$.\n(b) Use the factorisation to solve $A\\mathbf x = \\mathbf b$.',
		method: [
			'If the first pivot is $0$, swap it with a lower row that has a nonzero entry there. Record the swap in a permutation matrix $P$ (the identity with the same rows swapped).',
			'Eliminate $PA$ as usual: the multipliers fill $L$, the remaining triangle is $U$.',
			'To solve $A\\mathbf x = \\mathbf b$, multiply both sides by $P$: $LU\\mathbf x = P\\mathbf b$. So **permute $\\mathbf b$ first**, then forward and back substitute.'
		],
		steps: [
			{
				label: 'Why a swap is needed',
				text: 'Elimination divides by the pivot $a_{11} = 0$, which is impossible. (If $A = LU$ with $L$ unit lower triangular then $a_{11} = u_{11}$, and $a_{21} = \\ell_{21}u_{11} = 0$, but $a_{21} = 1$.) Swap rows 1 and 2:\n$P = \\begin{bmatrix}0&1&0\\\\1&0&0\\\\0&0&1\\end{bmatrix}$, $PA = \\begin{bmatrix}1&1&0\\\\0&2&1\\\\2&4&3\\end{bmatrix}$.'
			},
			{
				label: 'Eliminate PA',
				text: '$R_3 - 2R_1$: row 3 becomes $(0, 2, 3)$ (multiplier $\\ell_{31} = 2$; $\\ell_{21} = 0$ since there is nothing to clear). Then $R_3 - 1\\cdot R_2$: row 3 becomes $(0, 0, 2)$ ($\\ell_{32} = 1$).\n$L = \\begin{bmatrix}1&0&0\\\\0&1&0\\\\2&1&1\\end{bmatrix}$, $U = \\begin{bmatrix}1&1&0\\\\0&2&1\\\\0&0&2\\end{bmatrix}$. Check row 3 of $LU$: $2(1,1,0) + (0,2,1) + (0,0,2) = (2,4,3)$ ✓.'
			},
			{
				label: 'Permute b, then forward substitution',
				text: '$P\\mathbf b = (2, 3, 9)$. Solve $L\\mathbf y = P\\mathbf b$: $y_1 = 2$, $y_2 = 3$, $2y_1 + y_2 + y_3 = 9$ gives $y_3 = 2$.'
			},
			{
				label: 'Back substitution and check',
				text: '$U\\mathbf x = (2,3,2)$: $2x_3 = 2\\Rightarrow x_3 = 1$; $2x_2 + x_3 = 3\\Rightarrow x_2 = 1$; $x_1 + x_2 = 2\\Rightarrow x_1 = 1$. So $\\mathbf x = (1,1,1)$.\nCheck in the original $A$: $(0 + 2 + 1,\\ 1 + 1 + 0,\\ 2 + 4 + 3) = (3, 2, 9) = \\mathbf b$ ✓.'
			}
		]
	};

	const solve = {
		problem:
			'A matrix has already been factored as $A = LU$ with $L = \\begin{bmatrix}1&0&0\\\\3&1&0\\\\1&-2&1\\end{bmatrix}$ and $U = \\begin{bmatrix}1&2&1\\\\0&1&-1\\\\0&0&2\\end{bmatrix}$.\n(a) A student writes $A^{-1} = L^{-1}U^{-1}$. Give the correct formula and justify it by multiplying with $A$.\n(b) Solve $A\\mathbf x = (4, 15, -4)^{\\mathsf T}$ by forward and back substitution, showing both triangular systems. Do not form $A$ or any inverse.',
		method: [
			'Inverse of a product reverses the order: $(LU)^{-1} = U^{-1}L^{-1}$. Prove it by multiplying out on **both** sides and grouping the middle factors.',
			'Write $A\\mathbf x = L(U\\mathbf x)$ and name $\\mathbf y = U\\mathbf x$.',
			'Forward substitution: solve $L\\mathbf y = \\mathbf b$ from the **top** row down.',
			'Back substitution: solve $U\\mathbf x = \\mathbf y$ from the **bottom** row up.',
			'Check one row of $LU\\mathbf x$ against $\\mathbf b$ if time allows.'
		],
		steps: [
			{
				label: 'The correct inverse',
				text: '$A^{-1} = (LU)^{-1} = U^{-1}L^{-1}$ (undo the last thing first: "shoes off before socks").\nCheck on both sides: $A\\,(U^{-1}L^{-1}) = L(UU^{-1})L^{-1} = LL^{-1} = I$ and $(U^{-1}L^{-1})\\,A = U^{-1}(L^{-1}L)U = U^{-1}U = I$.\nThe student\'s version gives $A\\,L^{-1}U^{-1} = LUL^{-1}U^{-1}$, and the middle $UL^{-1}$ does not cancel, because matrices do not commute. For instance with $L = \\begin{bmatrix}1&0\\\\1&1\\end{bmatrix}$, $U = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$: $U^{-1}L^{-1} = \\begin{bmatrix}2&-1\\\\-1&1\\end{bmatrix} = A^{-1}$, while $L^{-1}U^{-1} = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}\\ne A^{-1}$.'
			},
			{
				label: 'Forward substitution: L y = b',
				text: '$$\\begin{aligned}y_1 &= 4\\\\ 3y_1 + y_2 &= 15\\\\ y_1 - 2y_2 + y_3 &= -4\\end{aligned}$$\nTop down: $y_1 = 4$; $y_2 = 15 - 12 = 3$; $y_3 = -4 - 4 + 6 = -2$. So $\\mathbf y = (4, 3, -2)$.'
			},
			{
				label: 'Back substitution: U x = y',
				text: '$$\\begin{aligned}x_1 + 2x_2 + x_3 &= 4\\\\ x_2 - x_3 &= 3\\\\ 2x_3 &= -2\\end{aligned}$$\nBottom up: $x_3 = -1$; $x_2 = 3 + x_3 = 2$; $x_1 = 4 - 2x_2 - x_3 = 4 - 4 + 1 = 1$. So $\\mathbf x = (1, 2, -1)$.'
			},
			{
				label: 'Check',
				text: '$U\\mathbf x = (1 + 4 - 1,\\ 2 + 1,\\ -2) = (4, 3, -2) = \\mathbf y$ ✓ and $L\\mathbf y = (4,\\ 12 + 3,\\ 4 - 6 - 2) = (4, 15, -4) = \\mathbf b$ ✓.'
			}
		]
	};
</script>

<p>
	Elimination solves a system by rewriting it. <strong class="text-slate-50">LU factorisation</strong> asks a sharper question: can we <em>remember</em> what
	elimination did, so we never have to repeat it for a new right-hand side?
</p>

<h2>Elimination as a product</h2>
<p>
	Each row operation "subtract <Tex tex="\ell" /> times row <Tex tex="j" /> from row <Tex tex="i" />" is itself a matrix multiplication. Forward elimination stacks several of them
	and turns <Tex tex="A" /> into an upper-triangular matrix <Tex tex="U" />. Undo the operations in reverse and you get the factorisation
</p>
<Tex display tex={'A = LU'} />
<p>
	where <Tex tex="U" /> is upper triangular (zeros below the diagonal), and <Tex tex="L" /> is lower triangular with 1s on the diagonal. The surprise: the entries of <Tex tex="L" /> are exactly the
	<em>multipliers</em> you used during elimination, just sitting where they were used.
</p>

<h2>Try it</h2>
<Figure caption="Edit the matrix. The multipliers of elimination appear in L; the leftover triangle is U. Their product gives A back." max={640}>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#if f}
		<Tex display tex={'L = ' + texMatrix(f.L) + ',\\qquad U = ' + texMatrix(f.U)} />
		<Tex display tex={'LU = ' + texMatrix(mul(f.L, f.U))} />
	{:else}
		<p class="text-center text-sm text-amber-300">
			A zero pivot showed up. This matrix needs a row swap first (that gives <Tex tex={'PA = LU'} />).
		</p>
	{/if}
</Figure>

<h2>A worked example</h2>
<p>
	For the starting matrix above: row 2 minus <strong class="text-slate-50">2</strong>·row 1, row 3 minus <strong class="text-slate-50">4</strong>·row 1, then row 3 minus
	<strong class="text-slate-50">3</strong>·row 2 (after the first step). The multipliers 2, 4, 3 land in <Tex tex="L" /> and the triangle that remains is <Tex tex="U" />.
</p>

<h2>Why bother?</h2>
<Callout kind="theorem" title="Two easy solves instead of one hard one">
	<p>
		To solve <Tex tex={'A\\mathbf x = \\mathbf b'} /> with <Tex tex={'A = LU'} />: first solve <Tex tex={'L\\mathbf y = \\mathbf b'} /> by <em>forward substitution</em> (top to bottom, no elimination),
		then solve <Tex tex={'U\\mathbf x = \\mathbf y'} /> by <em>back substitution</em> (bottom to top). Each step is cheap, and you can reuse <Tex tex="L" /> and <Tex tex="U" /> for any new <Tex tex={'\\mathbf b'} />.
	</p>
</Callout>

<Callout kind="intuition">
	<p>
		Doing the factorisation costs roughly <Tex tex={'n^3/3'} /> operations, but each later solve costs only about <Tex tex={'n^2'} />. That is why real solvers factor once and reuse.
	</p>
</Callout>

<h2>Using a factorisation you are given</h2>
<p>
	Often the factorisation is handed to you, and the point is to <em>use</em> it without ever forming <Tex tex="A" />. Two facts do all the work.
</p>
<Callout kind="theorem" title="Inverse of a product">
	<p>
		If <Tex tex="L" /> and <Tex tex="U" /> are invertible then <Tex tex={'(LU)^{-1} = U^{-1}L^{-1}'} />: the order reverses. To undo "apply <Tex tex="U" />, then apply <Tex tex="L" />" you
		must first undo <Tex tex="L" />, then undo <Tex tex="U" />, just like taking off shoes before socks.
	</p>
</Callout>
<Callout kind="intuition" title="Why forward and back substitution">
	<p>
		<Tex tex={'A\\mathbf x = \\mathbf b'} /> is <Tex tex={'L(U\\mathbf x) = \\mathbf b'} />. Call the unknown middle vector <Tex tex={'\\mathbf y = U\\mathbf x'} />. Because <Tex tex="L" /> is lower
		triangular, its first row involves only <Tex tex={'y_1'} />, its second only <Tex tex={'y_1, y_2'} />, and so on: solve from the top. <Tex tex="U" /> is upper triangular, so its last row
		involves only <Tex tex={'x_n'} />: solve from the bottom.
	</p>
</Callout>

<WorkedExample title="solving with a given LU" problem={solve.problem} method={solve.method} steps={solve.steps} credit="Order-reversal rule and triangular solves after Strang." />

<h2>When a pivot is zero: PA = LU</h2>
<Callout kind="warning" title="Do not forget to permute b">
	<p>
		With a row exchange the factorisation is of <Tex tex="PA" />, not <Tex tex="A" />. So <Tex tex={'A\\mathbf x = \\mathbf b'} /> becomes <Tex tex={'LU\\mathbf x = P\\mathbf b'} />: apply the same
		swaps to <Tex tex={'\\mathbf b'} /> before forward substitution. Forgetting this is the most common error.
	</p>
</Callout>

<WorkedExample title="a row exchange" problem={swap.problem} method={swap.method} steps={swap.steps} credit="PA = LU as in Strang, Chapter 2." />

<Recap
	points={[
		'$(LU)^{-1} = U^{-1}L^{-1}$: inverses of products come in reverse order. Check by multiplying with $A$ on both sides.',
		'Forward elimination turns $A$ into upper-triangular $U$; the multipliers form lower-triangular $L$, giving $A = LU$.',
		'Solve $A\\mathbf x=\\mathbf b$ by forward substitution ($L\\mathbf y=\\mathbf b$) then back substitution ($U\\mathbf x=\\mathbf y$).',
		'A zero pivot needs a row swap: $PA = LU$.'
	]}
/>

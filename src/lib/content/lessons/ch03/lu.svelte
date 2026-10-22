<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import { lu } from '#lib/math/gauss.js';
	import { mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';

	let m = $state<Mat>([
		[2, 1, 1],
		[4, 3, 3],
		[8, 7, 9]
	]);
	let f = $derived(lu(m));
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

<Recap
	points={[
		'Forward elimination turns $A$ into upper-triangular $U$; the multipliers form lower-triangular $L$, giving $A = LU$.',
		'Solve $A\\mathbf x=\\mathbf b$ by forward substitution ($L\\mathbf y=\\mathbf b$) then back substitution ($U\\mathbf x=\\mathbf y$).',
		'A zero pivot needs a row swap: $PA = LU$.'
	]}
/>

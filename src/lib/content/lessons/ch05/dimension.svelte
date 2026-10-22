<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { rank } from '#lib/math/gauss.js';
	import type { Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	// columns are the three vectors
	let m = $state<Mat>([
		[1, 0, 1],
		[0, 1, 1],
		[0, 0, 0]
	]);
	let r = $derived(rank(m));
	const shape = ['just the origin', 'a line', 'a plane', 'all of 3D space'];
	let independent = $derived(r === 3);
</script>

<p>
	You have seen that many different bases exist for the plane. Here is the remarkable fact that makes "dimension" a meaningful word: <strong class="text-slate-50">every basis of a space has the same number of vectors</strong>.
</p>

<Callout kind="theorem" title="Theorem: dimension is well defined">
	<p>
		If a space <Tex tex="V" /> has a basis with <Tex tex="n" /> vectors, then every basis of <Tex tex="V" /> has exactly <Tex tex="n" /> vectors. This number is the
		<strong class="text-slate-50"> dimension</strong> <Tex tex={'\\dim V'} />.
	</p>
</Callout>
<p>
	Why? The key step is the <em>exchange</em> idea: if <Tex tex="n" /> vectors span a space, then any list of more than <Tex tex="n" /> vectors in it must be dependent (not enough pivots). A basis is independent, so it cannot be longer than any spanning list,
	and by symmetry all bases have the same length.
</p>

<h2>Count the dimension of a span</h2>
<p>
	The columns of this matrix are three vectors in 3D. The dimension of their span is the rank. Edit the numbers and watch the span change shape.
</p>
<Figure caption="Each column is a vector. The span of the columns has dimension = rank." max={560}>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">dimension of span = {r}</span>
		<span class="text-sm text-slate-300">The span is {shape[r]}.</span>
		<span class="w-full text-center text-sm {independent ? 'text-emerald-300' : 'text-amber-300'}">
			{independent ? 'The three vectors are independent, so they form a basis of ℝ³.' : `The three vectors are dependent: only ${r} of them are needed.`}
		</span>
	{/snippet}
</Figure>

<h2>What dimension buys you</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><Tex tex={'\\dim \\mathbb{R}^n = n'} />. Polynomials of degree at most 2 have dimension 3 (basis <Tex tex={'1, x, x^2'} />). The <Tex tex={'2\\times3'} /> matrices have dimension 6.</li>
	<li>In an <Tex tex="n" />-dimensional space, any <Tex tex="n" /> independent vectors automatically span, and any <Tex tex="n" /> spanning vectors are automatically independent. You only need to check one.</li>
	<li>A subspace of <Tex tex="V" /> has dimension at most <Tex tex={'\\dim V'} />, with equality only if it is all of <Tex tex="V" />.</li>
</ul>

<Recap
	points={[
		'All bases of a space have the **same number of vectors**; that number is the dimension.',
		'$\\dim\\mathbb{R}^n = n$; polynomials of degree $\\le d$ have dimension $d+1$.',
		'In dimension $n$, $n$ independent vectors are automatically a basis, and so are $n$ spanning vectors.'
	]}
/>

<script lang="ts">
	import Heatmap from '#lib/viz/Heatmap.svelte';
	import { rank } from '#lib/math/gauss.js';
	import type { Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const terms = [
		{ a: [1, 2], b: [1, -1], c: [2, 1] },
		{ a: [1, 0], b: [0, 1], c: [1, 1] }
	];
	let count = $state(1);

	// T[i][j][k] = sum over terms of a_i b_j c_k
	let T = $derived(
		Array.from({ length: 2 }, (_, i) =>
			Array.from({ length: 2 }, (_, j) =>
				Array.from({ length: 2 }, (_, k) => terms.slice(0, count).reduce((s, t) => s + t.a[i] * t.b[j] * t.c[k], 0))
			)
		)
	);
	// slices T[:, :, k] as 2x2 matrices
	let slices = $derived([0, 1].map((k) => [0, 1].map((i) => [0, 1].map((j) => T[i][j][k]))));
	// mode-n unfoldings as 2 x 4 matrices
	let un1 = $derived<Mat>([0, 1].map((i) => [0, 1].flatMap((k) => [0, 1].map((j) => T[i][j][k]))));
	let un2 = $derived<Mat>([0, 1].map((j) => [0, 1].flatMap((k) => [0, 1].map((i) => T[i][j][k]))));
	let un3 = $derived<Mat>([0, 1].map((k) => [0, 1].flatMap((j) => [0, 1].map((i) => T[i][j][k]))));
</script>

<p>
	A vector has one index, a matrix has two. A <strong class="text-slate-50">tensor</strong> (in the data sense) is a multi-way array with any number of indices: a colour image is height × width × 3, a video adds time, a batch of sequences in a neural network is batch × length × features.
</p>

<h2>Building a tensor from rank-one pieces</h2>
<p>
	A matrix of rank one is an outer product <Tex tex={'\\mathbf a\\mathbf b^{\\mathsf T}'} />. The 3-way analogue is <Tex tex={'(\\mathbf a\\circ\\mathbf b\\circ\\mathbf c)_{ijk} = a_ib_jc_k'} />. A <em>tensor rank</em> is the smallest number of such terms that add up to the tensor. Pick one or two terms below and look at the two slices (each <Tex tex={'2\\times2'} />).
</p>

<Figure caption="A 2×2×2 tensor shown as two frontal slices, and its three unfoldings (matricisations) with their matrix ranks." max={700}>
	<div class="grid grid-cols-2 gap-4">
		<div><p class="font-pixel mb-1 text-center text-[9px] text-slate-400">SLICE k = 1</p><Heatmap matrix={slices[0]} numbers cell={46} range={8} /></div>
		<div><p class="font-pixel mb-1 text-center text-[9px] text-slate-400">SLICE k = 2</p><Heatmap matrix={slices[1]} numbers cell={46} range={8} /></div>
	</div>
	{#snippet controls()}
		<Slider label="terms" bind:value={count} min={1} max={2} step={1} display={String(count)} />
		<span class="font-mono text-sm text-slate-100">ranks of the unfoldings: {rank(un1)}, {rank(un2)}, {rank(un3)}</span>
		<span class="w-full text-center text-sm text-slate-300">
			{count === 1 ? 'One term: every unfolding has rank 1. The tensor has rank 1.' : 'Two terms: the unfoldings have rank up to 2.'}
		</span>
	{/snippet}
</Figure>

<Callout kind="definition" title="Unfoldings">
	<p>
		Flattening a tensor along one index gives an ordinary matrix (a <em>matricisation</em> or unfolding): here a <Tex tex={'2\\times4'} /> matrix for each mode. Matrix tools such as the SVD can then be applied. The multilinear rank is the triple of ranks of the unfoldings; it is easy to compute and is the basis for the Tucker and higher-order SVD decompositions.
	</p>
</Callout>

<h2>Why tensor rank is harder than matrix rank</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><strong class="text-slate-50">No easy algorithm.</strong> Computing the rank of a matrix is elimination; computing tensor rank is NP-hard.</li>
	<li><strong class="text-slate-50">Rank depends on the field.</strong> A real tensor can have a smaller rank when complex numbers are allowed.</li>
	<li><strong class="text-slate-50">Best approximations may not exist.</strong> The set of tensors of rank at most <Tex tex="r" /> is not closed: a sequence of rank-2 tensors can converge to a tensor of rank 3. There is no Eckart–Young theorem.</li>
	<li><strong class="text-slate-50">Typical rank is not unique.</strong> Several ranks can each occur on sets of positive volume.</li>
</ul>

<Callout kind="intuition">
	<p>
		In practice people use <em>CP decompositions</em> (a sum of rank-one terms, as above), <em>Tucker</em> (a core tensor times factor matrices) or tensor-train formats, chosen for computability rather than uniqueness of "the" rank. Matrices are the exceptional, well-behaved case.
	</p>
</Callout>

<Recap
	points={[
		'A tensor is a multi-way array; rank-one tensors are outer products $\\mathbf a\\circ\\mathbf b\\circ\\mathbf c$.',
		'**Unfoldings** turn a tensor into matrices, whose ranks give the multilinear rank.',
		'Unlike matrices, tensor rank is NP-hard, field-dependent, and best low-rank approximations may fail to exist.'
	]}
/>

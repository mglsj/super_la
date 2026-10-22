<script lang="ts">
	import Heatmap from '#lib/viz/Heatmap.svelte';
	import { eigSym } from '#lib/math/decomp.js';
	import type { Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const A: Mat = [
		[4, 1, 0, 1],
		[1, 3, 1, 0],
		[0, 1, 2, 1],
		[1, 0, 1, 3]
	];
	const { values, vectors } = eigSym(A);
	let k = $state(1);

	let partial = $derived.by(() => {
		const out: Mat = A.map((r) => r.map(() => 0));
		for (let t = 0; t < k; t++)
			for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) out[i][j] += values[t] * vectors[i][t] * vectors[j][t];
		return out;
	});
	let err = $derived(Math.sqrt(A.reduce((s, r, i) => s + r.reduce((u, x, j) => u + (x - partial[i][j]) ** 2, 0), 0)));
</script>

<p>
	Another way to read <Tex tex={'A = Q\\Lambda Q^{\\mathsf T}'} />: multiply it out column by column and it becomes a <strong class="text-slate-50">sum of rank-one matrices</strong>, one per eigenvector.
</p>

<Callout kind="theorem" title="Spectral decomposition">
	<Tex display tex={'A = \\lambda_1\\mathbf q_1\\mathbf q_1^{\\mathsf T} + \\lambda_2\\mathbf q_2\\mathbf q_2^{\\mathsf T} + \\dots + \\lambda_n\\mathbf q_n\\mathbf q_n^{\\mathsf T}.'} />
	<p>
		Each <Tex tex={'\\mathbf q_i\\mathbf q_i^{\\mathsf T}'} /> is the projection onto the line through <Tex tex={'\\mathbf q_i'} />, so <Tex tex="A" /> does: "project onto each eigen-direction, scale by <Tex tex={'\\lambda_i'} />, add up".
	</p>
</Callout>

<h2>Build a matrix piece by piece</h2>
<p>
	Colours show entries (red positive, blue negative). Add eigen-pieces from the largest eigenvalue down and watch the approximation converge. After all 4 pieces it is exactly <Tex tex="A" />. The eigenvalues here are
	{values.map((x) => x.toFixed(2)).join(', ')}.
</p>

<Figure caption="Left: the original matrix. Right: the sum of the first k eigen-pieces." max={680}>
	<div class="grid grid-cols-2 gap-4">
		<div><p class="font-pixel mb-1 text-center text-[9px] text-slate-400">A</p><Heatmap matrix={A} numbers cell={44} range={4} /></div>
		<div><p class="font-pixel mb-1 text-center text-[9px] text-slate-400">FIRST {k} PIECE{k === 1 ? '' : 'S'}</p><Heatmap matrix={partial} numbers cell={44} range={4} /></div>
	</div>
	{#snippet controls()}
		<Slider label="pieces k" bind:value={k} min={0} max={4} step={1} display={String(k)} />
		<span class="font-mono text-sm text-slate-100">‖A − sum‖ = <span class="text-amber-300">{err.toFixed(3)}</span></span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		The error after <Tex tex="k" /> pieces is controlled by the eigenvalues you left out: <Tex tex={'\\sqrt{\\lambda_{k+1}^2 + \\dots + \\lambda_n^2}'} />. Big eigenvalues carry most of the matrix. This "keep the big pieces" idea returns with full force in the SVD.
	</p>
</Callout>

<h2>Functions of a matrix</h2>
<p>
	Because the <Tex tex={'\\mathbf q_i'} /> are orthonormal, powers act on each piece separately: <Tex tex={'A^k = \\sum \\lambda_i^k\\,\\mathbf q_i\\mathbf q_i^{\\mathsf T}'} />. The same works for any function: <Tex tex={'f(A) = \\sum f(\\lambda_i)\\,\\mathbf q_i\\mathbf q_i^{\\mathsf T}'} />. For example, a square root of a matrix with nonnegative eigenvalues applies <Tex tex={'\\sqrt{\\lambda_i}'} /> to each.
</p>

<Recap
	points={[
		'$A=\\sum_i \\lambda_i\\mathbf q_i\\mathbf q_i^{\\mathsf T}$: a sum of rank-one projections scaled by the eigenvalues.',
		'Truncating the sum keeps the biggest eigenvalues and gives the best approximation of that rank (for PSD matrices).',
		'Functions of $A$ act on the eigenvalues: $f(A)=\\sum f(\\lambda_i)\\mathbf q_i\\mathbf q_i^{\\mathsf T}$.'
	]}
/>

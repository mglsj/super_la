<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { det, type Mat } from '#lib/math/mat.js';
	import { lu } from '#lib/math/gauss.js';
	import { fmtNum } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[2, 1, 3],
		[0, 4, 1],
		[1, 0, 2]
	]);

	const minor = (a: Mat, j: number): Mat => a.slice(1).map((r) => r.filter((_, k) => k !== j));
	let terms = $derived(
		m[0].map((x, j) => ({
			j,
			sign: j % 2 === 0 ? 1 : -1,
			entry: x,
			minor: minor(m, j),
			minorDet: det(minor(m, j))
		}))
	);
	let total = $derived(det(m));
	let f = $derived(lu(m));
	let pivotProduct = $derived(f ? f.U.reduce((p, row, i) => p * row[i], 1) : null);
</script>

<p>
	You know what the determinant <em>means</em>. Now, how do you compute one? There are two practical methods, and they agree.
</p>

<h2>Method 1: cofactor expansion</h2>
<p>
	Expand along the first row. Each entry is multiplied by the determinant of the smaller matrix left after deleting its row and column (the <em>minor</em>), with alternating signs:
</p>
<Tex display tex={'\\det A = a_{11}M_{11} - a_{12}M_{12} + a_{13}M_{13}.'} />

<Figure caption="Edit the matrix. Each term is entry × sign × minor determinant, and they add up to det A." max={640}>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	<ul class="space-y-1 font-mono text-sm text-slate-200">
		{#each terms as t (t.j)}
			<li>
				<span class="text-slate-400">{t.sign > 0 ? '+' : '−'}</span>
				{fmtNum(t.entry)} · det[{t.minor.map((r) => r.map(fmtNum).join(' ')).join(' ; ')}] =
				{fmtNum(t.entry)} · {fmtNum(t.minorDet)} → <span class="text-amber-300">{fmtNum(t.sign * t.entry * t.minorDet)}</span>
			</li>
		{/each}
	</ul>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">det A = <span class="text-amber-300">{fmtNum(total)}</span></span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Cofactor expansion">
	<p>
		Expanding along <em>any</em> row or column, with the checkerboard sign pattern <Tex tex={'\\begin{smallmatrix}+&-&+\\\\-&+&-\\\\+&-&+\\end{smallmatrix}'} />, gives the same result. Choose the row or column with the most zeros to save work.
	</p>
</Callout>

<h2>Method 2: elimination</h2>
<p>
	Cofactor expansion costs about <Tex tex="n!" /> operations, hopeless for big matrices. Elimination is much cheaper. The row operations affect the determinant in simple ways:
</p>
<ul class="list-disc space-y-1.5 pl-6">
	<li>Adding a multiple of one row to another: <strong class="text-slate-50">no change</strong>.</li>
	<li>Swapping two rows: <strong class="text-slate-50">flips the sign</strong>.</li>
	<li>Scaling a row by <Tex tex="c" />: multiplies the determinant by <Tex tex="c" />.</li>
</ul>
<p>
	So reduce to an upper-triangular matrix <Tex tex="U" /> (no scaling, no swaps), and the determinant is the <strong class="text-slate-50">product of the pivots</strong> on the diagonal:
	{#if f}
		for your matrix, <Tex tex={'\\det A = ' + f.U.map((row, i) => fmtNum(row[i])).join(' \\cdot ') + ' = ' + fmtNum(pivotProduct ?? 0)} />.
	{:else}
		(this matrix needs a row swap, which just flips a sign).
	{/if}
</p>

<Recap
	points={[
		'Cofactor expansion along a row: sum of (entry × sign × minor). Pick the row/column with the most zeros.',
		'Elimination: row-add changes nothing, swap flips sign, scaling scales. For triangular $U$, $\\det$ is the product of the diagonal.',
		'Both methods give the same number; elimination is far faster for big matrices.'
	]}
/>

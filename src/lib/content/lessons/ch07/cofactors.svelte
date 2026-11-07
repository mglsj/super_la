<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { det, type Mat } from '#lib/math/mat.js';
	import { lu } from '#lib/math/gauss.js';
	import { fmtNum } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import WorkedExample from '#lib/components/lesson/WorkedExample.svelte';
	import { detByElimination, permutationSign, adjugateCramer } from '#lib/content/worked/ch07.js';

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

<h2>Exam technique: elimination with bookkeeping</h2>
<p>
	For anything larger than <Tex tex={'3\\times3'} />, elimination is far less work than cofactors. The only thing to get right is the running factor: swaps flip the sign, pulling a factor out
	of a row multiplies by it, and adding multiples of rows changes nothing.
</p>

<WorkedExample {...detByElimination} />

<h2>Method 3: the Leibniz (permutation) formula</h2>
<p>
	Expanding cofactors all the way down gives one product for every way of choosing one entry from each row and each column. Such a choice is a permutation <Tex tex={'\\sigma'} /> (row
	<Tex tex="i" /> uses column <Tex tex={'\\sigma(i)'} />), and
</p>
<Tex display tex={'\\det M = \\sum_{\\sigma}\\operatorname{sgn}(\\sigma)\\,m_{1\\sigma(1)}\\,m_{2\\sigma(2)}\\cdots m_{n\\sigma(n)}.'} />
<p>
	The sign is <Tex tex="+1" /> for an even number of swaps and <Tex tex="-1" /> for odd. For <Tex tex={'n = 4'} /> there are <Tex tex="4! = 24" /> terms, which is why nobody computes with it; but
	exams ask for single terms.
</p>

<WorkedExample {...permutationSign} />

<h2>The adjugate, the inverse and Cramer's rule</h2>
<Callout kind="theorem" title="Cofactors build the inverse">
	<p>
		Let <Tex tex="C" /> be the matrix of cofactors <Tex tex={'C_{ij} = (-1)^{i+j}M_{ij}'} /> and <Tex tex={'\\operatorname{adj}A = C^{\\mathsf T}'} />. Then
		<Tex tex={'A\\,\\operatorname{adj}A = (\\det A)I'} />: row <Tex tex="i" /> of <Tex tex="A" /> times its own cofactors is the expansion of <Tex tex={'\\det A'} />, and times another row's cofactors is
		the expansion of a matrix with two equal rows, which is <Tex tex="0" />. So <Tex tex={'A^{-1} = \\operatorname{adj}A/\\det A'} />.
	</p>
	<p>
		<strong class="text-slate-50">Cramer's rule</strong> reads off the solution of <Tex tex={'A\\mathbf x = \\mathbf b'} /> from this: <Tex tex={'x_j = \\det A_j/\\det A'} />, where
		<Tex tex={'A_j'} /> is <Tex tex="A" /> with column <Tex tex="j" /> replaced by <Tex tex={'\\mathbf b'} />.
	</p>
</Callout>

<WorkedExample {...adjugateCramer} />

<Recap
	points={[
		'Cofactor expansion along a row: sum of (entry × sign × minor). Pick the row/column with the most zeros.',
		'Elimination: row-add changes nothing, swap flips sign, scaling scales. For triangular $U$, $\\det$ is the product of the diagonal.',
		'Both methods give the same number; elimination is far faster for big matrices.'
	]}
/>

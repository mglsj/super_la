<script lang="ts">
	import ElimStepper from '#lib/components/lesson/ElimStepper.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import { rank, rref } from '#lib/math/gauss.js';
	import { texMatrix } from '#lib/math/tex.js';
	import type { Mat } from '#lib/math/mat.js';

	let m = $state<Mat>([
		[1, 2, 1],
		[2, 4, 3],
		[1, 2, 2]
	]);
	let reduced = $derived(rref(m));
</script>

<p>
	Keep going with elimination until you cannot simplify further and you reach the cleanest possible form. It has a name,
	and it is unique: every matrix has exactly one <strong class="text-slate-50">reduced row echelon form</strong> (RREF).
</p>

<h2>Pivots and the shape of RREF</h2>
<Callout kind="definition" title="Definition: reduced row echelon form">
	<p>A matrix is in RREF when:</p>
	<ul class="list-disc space-y-1 pl-6">
		<li>each nonzero row starts with a <strong class="text-slate-50">1</strong>, called a <em>pivot</em>;</li>
		<li>each pivot sits to the right of the pivot above it (a staircase);</li>
		<li>each pivot is the only nonzero entry in its column;</li>
		<li>any all-zero rows are at the bottom.</li>
	</ul>
</Callout>
<p>
	The columns that contain pivots are the <em>pivot columns</em>; the others are <em>free columns</em>. The number of pivots is the
	<em>rank</em> of the matrix. Rank tells you how many genuinely independent equations you have.
</p>

<h2>Reduce a 3×3 system yourself</h2>
<p>
	Step through the reduction of this system. Notice that one row ends up as all zeros (it carried no new information) and another
	ends up as <Tex tex={'0\\ 0 \\mid 1'} />.
</p>
<Figure caption="[1 2 | 1], [2 4 | 3], [1 2 | 2] — the first two columns are multiples of each other, so something has to give." max={620}>
	<ElimStepper aug={[[1, 2, 1], [2, 4, 3], [1, 2, 2]]} />
</Figure>
<p>
	That second row reads <Tex tex={'0 = 1'} />, which is impossible, so this system has <strong class="text-slate-50">no solution</strong>. A row that
	becomes <Tex tex={'[\\,0\\ 0\\ \\cdots\\ 0 \\mid \\text{nonzero}\\,]'} /> is the signature of an inconsistent system.
</p>

<h2>Try your own matrix</h2>
<Figure caption="Edit the entries. The RREF and rank update immediately." max={620}>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} label="Matrix" /></div>
	<Tex display tex={'\\xrightarrow{\\ \\text{RREF}\\ }\\; ' + texMatrix(reduced.result)} />
	{#snippet controls()}
		<span class="font-mono text-slate-100">rank = {rank(m)}</span>
		<span class="font-mono text-slate-400">pivot columns: {reduced.pivots.map((p) => p + 1).join(', ') || 'none'}</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Reading the answer off RREF">
	<ul class="list-disc space-y-1 pl-6">
		<li>A pivot in the <em>last</em> column (the right-hand side) means <strong class="text-slate-50">no solution</strong>.</li>
		<li>Otherwise, if every unknown has a pivot, the solution is <strong class="text-slate-50">unique</strong>.</li>
		<li>Otherwise some unknowns are <em>free</em> and there are <strong class="text-slate-50">infinitely many</strong> solutions.</li>
	</ul>
</Callout>

<Recap
	points={[
		'RREF is a staircase of 1s (pivots) with zeros above and below each pivot. It is **unique** for a given matrix.',
		'The **rank** is the number of pivots.',
		'Pivot in the augmented column: no solution. Pivot in every unknown column: one solution. Free columns: infinitely many.'
	]}
/>

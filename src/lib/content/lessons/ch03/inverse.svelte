<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import { det, identity, inverse, mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { animateTo, matrixTween } from '#lib/viz/tween.js';

	let m = $state<Mat>([
		[2, 1],
		[1, 1]
	]);
	const view = matrixTween(identity(2), 800);
	let stage = $state<'start' | 'A' | 'undone'>('start');

	let d = $derived(det(m));
	let inv = $derived(inverse(m));
	let singular = $derived(inv === null);

	function applyA() {
		stage = 'A';
		animateTo(view, m.map((r) => [...r]), 800);
	}
	function undo() {
		if (!inv) return;
		stage = 'undone';
		animateTo(view, mul(inv, m), 800);
	}
	function reset() {
		stage = 'start';
		animateTo(view, identity(2), 0);
	}
	// editing the matrix resets the picture
	$effect(() => {
		void JSON.stringify(m);
		reset();
	});
</script>

<p>
	If a matrix <Tex tex="A" /> transforms space, can we undo it? Often yes: there is another transformation that sends every vector back where it started.
	That is the <strong class="text-slate-50">inverse</strong>, written <Tex tex={'A^{-1}'} />.
</p>

<h2>Undoing a transformation</h2>
<Callout kind="definition" title="Definition: inverse">
	<p>
		A square matrix <Tex tex="A" /> is <em>invertible</em> if there is a matrix <Tex tex={'A^{-1}'} /> with
		<Tex display tex={'A^{-1}A = AA^{-1} = I'} />
		where <Tex tex="I" /> is the identity (the "do nothing" matrix).
	</p>
</Callout>

<Figure caption="Apply A, then undo it with A⁻¹: the grid returns to the standard grid. Now make the matrix singular (try rows [1 2], [2 4]) and see what goes wrong." max={600}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
		<TransformGrid matrix={view.current} extent={14} />
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-2">
			<button class="mbtn mbtn-green" disabled={stage !== 'start'} onclick={applyA}>Apply A</button>
			<button class="mbtn mbtn-blue" disabled={stage !== 'A' || singular} onclick={undo}>Undo with A⁻¹</button>
			<button class="mbtn mbtn-yellow" disabled={stage === 'start'} onclick={reset}>Reset</button>
		</div>
		<span class="w-full text-center text-sm {singular ? 'text-rose-300' : 'text-slate-300'}">
			{singular
				? 'det A = 0: the plane gets squashed onto a line. Many vectors land on the same spot, so no machine can send them all back.'
				: `det A = ${d.toFixed(2)}`}
		</span>
	{/snippet}
</Figure>

{#if inv}
	<Tex display tex={'A = ' + texMatrix(m) + ', \\qquad A^{-1} = ' + texMatrix(inv)} />
{/if}

<h2>When is a matrix invertible?</h2>
<p>
	Exactly when it does not squash space. Squashing loses information: if two different vectors land on the same spot, nothing can know which one to send back.
</p>
<Callout kind="theorem" title="Invertibility test">
	<p>
		For a square matrix, these are equivalent: <Tex tex="A" /> is invertible; <Tex tex="A\mathbf x = \mathbf 0" /> has only the solution <Tex tex={'\\mathbf x = \\mathbf 0'} />; the columns are independent;
		the RREF of <Tex tex="A" /> is <Tex tex="I" /> (every column is a pivot column).
		For 2×2 there is a formula, with <Tex tex={'\\det A = ad - bc \\ne 0'} />:
	</p>
	<Tex display tex={'\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}'} />
</Callout>

<h2>Finding an inverse by elimination</h2>
<p>
	For bigger matrices, row-reduce <Tex tex={'[\\,A \\mid I\\,]'} />. The operations that turn <Tex tex="A" /> into <Tex tex="I" /> are the same ones that turn <Tex tex="I" /> into
	<Tex tex={'A^{-1}'} />.
</p>

<Callout kind="warning" title="Socks and shoes">
	<p>
		<Tex tex={'(AB)^{-1} = B^{-1}A^{-1}'} />. To undo "put on socks, then shoes" you must take off the shoes first.
	</p>
</Callout>

<Recap
	points={[
		'$A^{-1}$ undoes $A$: $A^{-1}A = AA^{-1} = I$.',
		'$A$ is invertible exactly when it does not squash space (for 2×2: $ad-bc\\ne0$).',
		'Compute by row-reducing $[A\\mid I]$ to $[I\\mid A^{-1}]$; and $(AB)^{-1}=B^{-1}A^{-1}$.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let u = $state([2, 1]);
	let v = $state([1, 2]);
	let w = $state([3, 3]);

	let det = $derived(u[0] * v[1] - u[1] * v[0]);
	let dependentUV = $derived(Math.abs(det) < 0.05);
	let coeffs = $derived(
		dependentUV
			? null
			: [(w[0] * v[1] - w[1] * v[0]) / det, (u[0] * w[1] - u[1] * w[0]) / det]
	);
</script>

<p>
	Chapter 1 ended with a warning: sometimes a vector adds nothing new to a span. <strong class="text-slate-50">Linear independence</strong> is the precise name for "nobody is redundant".
</p>

<Callout kind="definition" title="Definition: linear independence">
	<p>
		Vectors <Tex tex={'\\mathbf v_1, \\dots, \\mathbf v_k'} /> are <em>independent</em> if the only way to get
		<Tex tex={'c_1\\mathbf v_1 + \\dots + c_k\\mathbf v_k = \\mathbf 0'} /> is <Tex tex={'c_1 = \\dots = c_k = 0'} />. Otherwise they are <em>dependent</em>: some vector is a combination of the others.
	</p>
</Callout>

<h2>Feel the redundancy</h2>
<p>
	Drag <Tex tex={'\\mathbf u'} /> and <Tex tex={'\\mathbf v'} />. When they point along the same line (or opposite ways), one is a multiple of the other, so they are dependent and span only a line.
	Now bring in <Tex tex={'\\mathbf w'} />: in the plane, <em>three vectors are always dependent</em>.
</p>

<Figure caption="When u and v are independent, w is always some combination a·u + b·v, so w is redundant. Make u and v parallel to see the span collapse." max={620}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5}>
		{#if dependentUV}<Line point={[0, 0]} dir={Math.hypot(u[0], u[1]) > 0.05 ? u : v} color={C.yellow} width={6} opacity={0.35} />{/if}
		{#if coeffs}
			<Arrow to={[coeffs[0] * u[0], coeffs[0] * u[1]]} color={C.blue} dashed width={2} opacity={0.8} />
			<Arrow from={[coeffs[0] * u[0], coeffs[0] * u[1]]} to={w} color={C.jHat} dashed width={2} opacity={0.8} />
		{/if}
		<DragVector bind:value={u} color={C.blue} label="u" snap={0.5} limit={5} />
		<DragVector bind:value={v} color={C.jHat} label="v" snap={0.5} limit={5} />
		<DragVector bind:value={w} color={C.iHat} label="w" snap={0.5} limit={5} />
	</Plane2D>
	{#snippet controls()}
		<span class="w-full text-center text-sm {dependentUV ? 'text-amber-300' : 'text-emerald-300'}">
			{dependentUV ? 'u and v are dependent: one is a multiple of the other.' : 'u and v are independent: they span the whole plane.'}
		</span>
		{#if coeffs}
			<span class="w-full text-center font-mono text-sm text-slate-200">
				w = {coeffs[0].toFixed(2)}·u + {coeffs[1].toFixed(2)}·v, so &#123;u, v, w&#125; is dependent
			</span>
		{/if}
	{/snippet}
</Figure>

<h2>How to test it</h2>
<p>
	Put the vectors as <strong class="text-slate-50">columns</strong> of a matrix <Tex tex="A" />. They are independent exactly when <Tex tex={'A\\mathbf c = \\mathbf 0'} /> has only the zero solution, i.e. when every column is a pivot column (the null space is trivial).
</p>
<Callout kind="theorem" title="Quick facts">
	<ul class="list-disc space-y-1 pl-6">
		<li>Any set containing <Tex tex={'\\mathbf 0'} /> is dependent.</li>
		<li>Two vectors are dependent iff one is a multiple of the other.</li>
		<li>More than <Tex tex="n" /> vectors in <Tex tex={'\\mathbb{R}^n'} /> are always dependent (too many columns, not enough pivots).</li>
	</ul>
</Callout>

<Recap
	points={[
		'Independent: the only combination giving $\\mathbf 0$ is the trivial one. Equivalently, no vector is a combination of the others.',
		'Test: columns of $A$ are independent iff $N(A)=\\{\\mathbf 0\\}$ iff every column has a pivot.',
		'More than $n$ vectors in $\\mathbb{R}^n$ are always dependent.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Line from '#lib/viz/Line.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { nullSpace, rank } from '#lib/math/gauss.js';
	import { C } from '#lib/viz/theme.js';
	import type { Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let A = $state<Mat>([
		[1, 1],
		[1, 1]
	]);
	let t = $state(0);

	// morph from the identity (t = 0) to A (t = 1)
	let M = $derived<Mat>([
		[(1 - t) + t * A[0][0], t * A[0][1]],
		[t * A[1][0], (1 - t) + t * A[1][1]]
	]);
	let r = $derived(rank(A));
	let ker = $derived(nullSpace(A));
	let img = $derived.by(() => {
		const c1 = [A[0][0], A[1][0]];
		return Math.hypot(c1[0], c1[1]) > 1e-9 ? c1 : [A[0][1], A[1][1]];
	});
	const apply = (v: number[]) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];
</script>

<p>
	Two sets describe everything a linear map <Tex tex={'T: V\\to W'} /> does: what it <strong class="text-slate-50">loses</strong> and what it <strong class="text-slate-50">reaches</strong>.
</p>

<Callout kind="definition" title="Definition: kernel and image">
	<p>
		The <em>kernel</em> is <Tex tex={'\\ker T = \\{\\mathbf v \\in V : T\\mathbf v = \\mathbf 0\\}'} />, everything squashed to zero. The <em>image</em> is
		<Tex tex={'\\operatorname{Im} T = \\{T\\mathbf v : \\mathbf v \\in V\\}'} />, everything that gets hit. Both are subspaces. For a matrix they are the null space and the column space.
	</p>
</Callout>

<h2>Watch the collapse</h2>
<p>
	Slide <Tex tex="t" /> from 0 to 1 to morph space from "do nothing" to the matrix <Tex tex="A" />. With the default <Tex tex={'A = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}'} />, the whole plane is squashed onto the yellow line
	<Tex tex="y = x" />, and the red segment (the kernel) shrinks to a single point at the origin.
</p>

<Figure caption="Red: the kernel, crushed to the origin. Yellow: the image, the only place anything lands." max={620}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
		<TransformGrid matrix={M} basis={false} square={false} extent={12} />
		{#if r === 1}
			<Line point={[0, 0]} dir={img} color={C.yellow} width={5} opacity={0.35} />
			{#if ker[0]}
				<Line a={apply(ker[0].map((x) => -3 * x))} b={apply(ker[0].map((x) => 3 * x))} color={C.jHat} width={5} />
			{/if}
		{/if}
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={A} step={1} /></div>
	{#snippet controls()}
		<Slider label="t" bind:value={t} min={0} max={1} step={0.02} display={t.toFixed(2)} />
		<span class="font-mono text-sm text-slate-100">dim ker = {2 - r},  dim Im = {r}</span>
	{/snippet}
</Figure>

<h2>Kernel and injectivity, image and surjectivity</h2>
<Callout kind="theorem" title="Two tests every linear map satisfies">
	<ul class="list-disc space-y-1 pl-6">
		<li><Tex tex="T" /> is <strong class="text-slate-50">one-to-one</strong> (injective) exactly when <Tex tex={'\\ker T = \\{\\mathbf 0\\}'} />. Nothing is lost, so nothing can be confused.</li>
		<li><Tex tex="T" /> is <strong class="text-slate-50">onto</strong> (surjective) exactly when <Tex tex={'\\operatorname{Im}T = W'} />. Everything is reached.</li>
	</ul>
</Callout>
<p>
	Why does the kernel decide injectivity? If <Tex tex={'T\\mathbf u = T\\mathbf v'} /> then by linearity <Tex tex={'T(\\mathbf u - \\mathbf v) = \\mathbf 0'} />, so <Tex tex={'\\mathbf u - \\mathbf v'} /> is in the kernel. If the kernel is just <Tex tex={'\\mathbf 0'} />, then <Tex tex={'\\mathbf u = \\mathbf v'} />.
</p>

<Recap
	points={[
		'$\\ker T$ = vectors sent to $\\mathbf 0$ (null space); $\\operatorname{Im} T$ = all outputs (column space). Both are subspaces.',
		'$T$ is injective iff $\\ker T=\\{\\mathbf 0\\}$; surjective iff $\\operatorname{Im}T=W$.',
		'A map that squashes space has a nonzero kernel, and then it cannot be undone.'
	]}
/>

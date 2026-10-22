<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import { dot } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let deg = $state(30);
	let v = $state([3, 2]);
	let q1 = $derived([Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)]);
	let q2 = $derived([-q1[1], q1[0]]);
	let c1 = $derived(dot(q1, v));
	let c2 = $derived(dot(q2, v));
	let matrix = $derived([
		[q1[0], q2[0]],
		[q1[1], q2[1]]
	]);
</script>

<p>
	Chapter 5 showed that finding coordinates in a general basis means solving a system. With the <strong class="text-slate-50">right</strong> kind of basis, it costs nothing: you just take dot products.
</p>

<Callout kind="definition" title="Definition: orthonormal basis">
	<p>
		A basis <Tex tex={'\\mathbf q_1,\\dots,\\mathbf q_n'} /> is <em>orthonormal</em> if each vector has length 1 and any two different ones are orthogonal: <Tex tex={'\\mathbf q_i\\cdot\\mathbf q_j = 1'} /> if <Tex tex={'i=j'} />, and <Tex tex="0" /> otherwise.
	</p>
</Callout>

<h2>Coordinates by dot product</h2>
<p>
	Rotate the orthonormal pair <Tex tex={'(\\mathbf q_1,\\mathbf q_2)'} /> and drag <Tex tex={'\\mathbf v'} />. The coordinates are simply <Tex tex={'c_i = \\mathbf q_i\\cdot\\mathbf v'} />, the lengths of the shadows of <Tex tex={'\\mathbf v'} /> on the two axes. The dashed rectangle rebuilds <Tex tex={'\\mathbf v'} />.
</p>

<Figure caption="Orthonormal axes (green, red) and the vector v. The coordinates are read off by projecting onto each axis." max={620}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4} grid={false}>
		<TransformGrid {matrix} basis={false} square={false} extent={10} />
		<Arrow to={[c1 * q1[0], c1 * q1[1]]} color={C.iHat} dashed width={2.5} opacity={0.9} />
		<Arrow from={[c1 * q1[0], c1 * q1[1]]} to={v} color={C.jHat} dashed width={2.5} opacity={0.9} />
		<Arrow to={q1} color={C.iHat} label="q₁" />
		<Arrow to={q2} color={C.jHat} label="q₂" />
		<DragVector bind:value={v} color={C.yellow} label="v" snap={0.5} limit={4.5} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="angle" bind:value={deg} min={0} max={180} step={5} display="{deg}°" />
		<span class="font-mono text-sm text-slate-100">
			c₁ = q₁·v = {c1.toFixed(2)}, c₂ = q₂·v = {c2.toFixed(2)}
		</span>
		<span class="w-full text-center font-mono text-xs text-slate-400">
			‖v‖² = {dot(v, v).toFixed(2)} = c₁² + c₂² = {(c1 * c1 + c2 * c2).toFixed(2)}
		</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Why orthonormal bases are wonderful">
	<p>
		If <Tex tex={'\\mathbf q_1,\\dots,\\mathbf q_n'} /> is an orthonormal basis, then for every <Tex tex={'\\mathbf v'} />
		<Tex display tex={'\\mathbf v = (\\mathbf q_1\\cdot\\mathbf v)\\mathbf q_1 + \\dots + (\\mathbf q_n\\cdot\\mathbf v)\\mathbf q_n, \\qquad \\|\\mathbf v\\|^2 = c_1^2 + \\dots + c_n^2.'} />
		The second formula is the Pythagorean theorem in any number of dimensions (Parseval's identity).
	</p>
</Callout>

<h2>Why it works</h2>
<p>
	Dot <Tex tex={'\\mathbf v = c_1\\mathbf q_1 + \\dots + c_n\\mathbf q_n'} /> with <Tex tex={'\\mathbf q_i'} />: every cross term <Tex tex={'\\mathbf q_i\\cdot\\mathbf q_j'} /> with <Tex tex={'j \\ne i'} /> vanishes, leaving <Tex tex={'\\mathbf q_i\\cdot\\mathbf v = c_i'} />. No system to solve.
	More generally, any <em>orthogonal</em> list of nonzero vectors is automatically independent.
</p>

<Recap
	points={[
		'**Orthonormal**: unit length and pairwise perpendicular.',
		'In an orthonormal basis, coordinates are just dot products: $c_i = \\mathbf q_i\\cdot\\mathbf v$.',
		'Lengths are preserved: $\\|\\mathbf v\\|^2=\\sum c_i^2$. Orthogonal nonzero vectors are automatically independent.'
	]}
/>

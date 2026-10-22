<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import { inverse, mulVec } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let b1 = $state([2, 0]);
	let b2 = $state([1, 2]);
	let v = $state([3, 2]);

	let B = $derived([
		[b1[0], b2[0]],
		[b1[1], b2[1]]
	]);
	let Binv = $derived(inverse(B));
	let c = $derived(Binv ? mulVec(Binv, v) : null);
</script>

<p>
	The same arrow can have many different names, depending on which basis you measure it in. Coordinates are just the <em>name</em> of a vector relative to a chosen set of building blocks.
</p>

<h2>Reading a vector in a basis</h2>
<Callout kind="definition" title="Definition: coordinates">
	<p>
		If <Tex tex={'B = (\\mathbf b_1, \\dots, \\mathbf b_n)'} /> is a basis and <Tex tex={'\\mathbf v = c_1\\mathbf b_1 + \\dots + c_n\\mathbf b_n'} />, then <Tex tex={'(c_1,\\dots,c_n)'} /> are the
		<em>coordinates</em> of <Tex tex={'\\mathbf v'} /> in the basis <Tex tex="B" />, written <Tex tex={'[\\mathbf v]_B'} />.
	</p>
</Callout>

<Figure caption="Drag the basis vectors b₁, b₂ and the vector v. The dashed path walks c₁ steps along b₁, then c₂ steps along b₂." max={620}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
		<TransformGrid matrix={B} basis={false} square={false} extent={10} />
		{#if c}
			<Arrow to={[c[0] * b1[0], c[0] * b1[1]]} color={C.iHat} dashed width={2.5} opacity={0.9} />
			<Arrow from={[c[0] * b1[0], c[0] * b1[1]]} to={v} color={C.jHat} dashed width={2.5} opacity={0.9} />
		{/if}
		<DragVector bind:value={b1} color={C.iHat} label="b₁" snap={0.5} limit={4} />
		<DragVector bind:value={b2} color={C.jHat} label="b₂" snap={0.5} limit={4} />
		<DragVector bind:value={v} color={C.yellow} label="v" snap={0.5} limit={5} />
	</Plane2D>
	{#snippet controls()}
		{#if c}
			<span class="font-mono text-sm text-slate-100">
				v = ({v[0].toFixed(1)}, {v[1].toFixed(1)}) in the standard basis, but [v]_B = ({c[0].toFixed(2)}, {c[1].toFixed(2)})
			</span>
		{:else}
			<span class="text-sm text-rose-300">b₁ and b₂ are parallel, so they are not a basis.</span>
		{/if}
	{/snippet}
</Figure>

<h2>Converting between names</h2>
<p>
	Let <Tex tex="P" /> be the matrix whose columns are the basis vectors. "Combine the basis vectors with weights <Tex tex={'\\mathbf c'} />" is just matrix multiplication:
</p>
<Tex display tex={'\\mathbf v = P[\\mathbf v]_B \\qquad\\Longleftrightarrow\\qquad [\\mathbf v]_B = P^{-1}\\mathbf v.'} />
<p>
	For <Tex tex={'\\mathbf b_1 = (2,0),\\ \\mathbf b_2 = (1,2)'} /> and <Tex tex={'\\mathbf v = (3,2)'} />: solving <Tex tex={'2c_1 + c_2 = 3,\\ 2c_2 = 2'} /> gives <Tex tex={'c_2 = 1,\\ c_1 = 1'} />, so <Tex tex={'[\\mathbf v]_B = (1,1)'} />.
	Check: <Tex tex={'(2,0)+(1,2) = (3,2)'} />. ✓
</p>

<Callout kind="intuition">
	<p>
		Coordinates are not a property of the arrow. They depend on your <em>choice of rulers</em>. A good basis can turn an ugly problem into an easy one, and that is the whole motivation behind eigenvectors in chapter 8.
	</p>
</Callout>

<Recap
	points={[
		'$[\\mathbf v]_B$ lists the weights that build $\\mathbf v$ from the basis vectors.',
		'With $P$ = matrix of basis columns: $\\mathbf v = P[\\mathbf v]_B$ and $[\\mathbf v]_B = P^{-1}\\mathbf v$.',
		'The same vector has different coordinates in different bases.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let b1 = $state([2, 1]);
	let b2 = $state([-1, 2]);
	let matrix = $derived([
		[b1[0], b2[0]],
		[b1[1], b2[1]]
	]);
	let det = $derived(b1[0] * b2[1] - b1[1] * b2[0]);
	let ok = $derived(Math.abs(det) > 0.05);
</script>

<p>
	A <strong class="text-slate-50">basis</strong> is the perfect set of building blocks: enough vectors to reach everything, and no extras. The standard basis <Tex tex={'\\hat\\imath, \\hat\\jmath'} />
	is just one choice. Any pair of independent vectors can serve as a coordinate system.
</p>

<Callout kind="definition" title="Definition: basis">
	<p>
		A list <Tex tex={'\\mathbf b_1, \\dots, \\mathbf b_k'} /> is a <em>basis</em> of a space <Tex tex="V" /> if it is <strong class="text-slate-50">independent</strong> and it
		<strong class="text-slate-50"> spans</strong> <Tex tex="V" />. Spanning means "enough"; independent means "no waste".
	</p>
</Callout>

<h2>Drag your own coordinate system</h2>
<p>
	The two arrows below define a skewed grid: lines parallel to <Tex tex={'\\mathbf b_1'} /> and <Tex tex={'\\mathbf b_2'} />. As long as the grid covers the plane, you have a basis. Squash the grid flat by making the arrows parallel and it stops being one.
</p>

<Figure caption="Every point of the plane sits at one intersection of the skewed grid. Collapse the grid and you lose that: two parallel vectors are not a basis." max={620}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
		<TransformGrid {matrix} basis={false} square extent={10} />
		<DragVector bind:value={b1} color={C.iHat} label="b₁" snap={0.5} limit={4} />
		<DragVector bind:value={b2} color={C.jHat} label="b₂" snap={0.5} limit={4} />
	</Plane2D>
	{#snippet controls()}
		<span class="w-full text-center text-sm {ok ? 'text-emerald-300' : 'text-rose-300'}">
			{ok ? `A basis. The unit tile has area |det| = ${Math.abs(det).toFixed(2)}.` : 'Not a basis: the grid collapsed onto a line.'}
		</span>
	{/snippet}
</Figure>

<h2>Why it is the right idea</h2>
<Callout kind="theorem" title="Unique coordinates">
	<p>
		If <Tex tex={'\\mathbf b_1,\\dots,\\mathbf b_n'} /> is a basis, then every vector <Tex tex={'\\mathbf v'} /> can be written as <Tex tex={'c_1\\mathbf b_1+\\dots+c_n\\mathbf b_n'} /> in
		<strong class="text-slate-50"> exactly one way</strong>. Spanning gives existence; independence gives uniqueness.
	</p>
</Callout>
<p>
	Two quick checks for <Tex tex={'\\mathbb{R}^n'} />: a list of <Tex tex="n" /> vectors is a basis iff the matrix with those columns is invertible, which is the same as saying
	its determinant is nonzero, which is the same as the RREF being the identity.
</p>

<Recap
	points={[
		'A **basis** is independent and spanning: no waste, nothing missing.',
		'Every vector has **exactly one** expression in a basis: its coordinates.',
		'$n$ vectors form a basis of $\\mathbb{R}^n$ iff the matrix of columns is invertible.'
	]}
/>

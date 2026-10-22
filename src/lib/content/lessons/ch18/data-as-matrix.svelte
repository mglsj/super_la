<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import Bars from '#lib/viz/Bars.svelte';
	import { dot, norm } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	const items: { name: string; v: number[] }[] = [
		{ name: 'cat', v: [2.2, 1.6] },
		{ name: 'dog', v: [2.5, 1.0] },
		{ name: 'car', v: [-1.0, 2.4] },
		{ name: 'truck', v: [-1.8, 1.6] },
		{ name: 'boat', v: [-2.2, -1.0] }
	];
	let q = $state([2, 1.5]);

	let cos = $derived(items.map((it) => (norm(q) > 0.05 ? dot(q, it.v) / (norm(q) * norm(it.v)) : 0)));
	let rawDot = $derived(items.map((it) => dot(q, it.v)));
	let best = $derived(cos.indexOf(Math.max(...cos)));
</script>

<p>
	Modern machine learning starts by turning everything (words, images, users, songs) into <strong class="text-slate-50">vectors</strong>, and a collection of them into a <strong class="text-slate-50">matrix</strong>. Once you have that, every idea from this course applies.
</p>

<h2>Embeddings and similarity</h2>
<p>
	An <em>embedding</em> assigns each item a vector so that similar items point in similar directions. Real models use hundreds or thousands of dimensions; here are five items in 2D. How similar is a query to each of them? Chapter 1 gave the answer: the <strong class="text-slate-50">dot product</strong>, or better, its normalised version, the
	<em>cosine similarity</em>
</p>
<Tex display tex={'\\cos\\theta = \\frac{\\mathbf q\\cdot\\mathbf v}{\\|\\mathbf q\\|\\,\\|\\mathbf v\\|}.'} />

<Figure caption="Drag the query q. The bars show cosine similarity to each item. Notice that only the direction matters, not the length of q." max={680}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3}>
		{#each items as it, i (it.name)}
			<Dot at={it.v} color={i === best ? C.iHat : C.blue} r={i === best ? 7 : 5} label={it.name} />
		{/each}
		<DragVector bind:value={q} color={C.yellow} label="query" snap={0.25} limit={3.5} />
	</Plane2D>
	<Bars values={cos.map((x) => Math.max(0, x))} labels={items.map((i) => i.name)} max={1} height={150} color="#5cd0b3" label="Cosine similarity of the query to each item" />
	{#snippet controls()}
		<span class="w-full text-center font-mono text-sm text-slate-200">
			closest: <span class="text-emerald-300">{items[best].name}</span> (cos = {cos[best].toFixed(2)}) · raw dot products: {rawDot.map((x) => x.toFixed(1)).join(', ')}
		</span>
	{/snippet}
</Figure>

<h2>A whole dataset as a matrix</h2>
<Callout kind="definition" title="Data matrix">
	<p>
		Stack the item vectors as the rows of a matrix <Tex tex={'E'} /> (<Tex tex="n" /> items, <Tex tex="d" /> features). Then similarity of a query <Tex tex={'\\mathbf q'} /> to <em>all</em> items at once is a single matrix–vector product: <Tex tex={'E\\mathbf q'} />. Similarity between all pairs is <Tex tex={'EE^{\\mathsf T}'} />, a symmetric PSD Gram matrix (chapter 14).
	</p>
</Callout>
<p>
	Everything else in this chapter is built from this: a lookup is a product with a one-hot vector (<Tex tex={'E^{\\mathsf T}\\mathbf e_i'} /> picks row <Tex tex="i" />), a layer is a product with a weight matrix, and finding structure in the data is an SVD of <Tex tex="E" /> (chapter 15); after subtracting the column means, that is exactly PCA.
</p>

<Recap
	points={[
		'Items become **vectors** (embeddings); a dataset becomes a **matrix** with one row per item.',
		'Similarity is a dot product; **cosine similarity** $\\frac{\\mathbf q\\cdot\\mathbf v}{\\|\\mathbf q\\|\\|\\mathbf v\\|}$ ignores length and compares direction.',
		'Similarity to all items is $E\\mathbf q$; all pairs is the Gram matrix $EE^{\\mathsf T}$.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import Bars from '#lib/viz/Bars.svelte';
	import { dot } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const keys = [
		[2, 1],
		[-1, 2],
		[-2, -1.5],
		[1.5, -2]
	];
	let q = $state([1.5, 1]);
	let temp = $state(1);

	let scores = $derived(keys.map((k) => dot(q, k) / Math.sqrt(2)));
	let weights = $derived.by(() => {
		const m = Math.max(...scores.map((s) => s / temp));
		const e = scores.map((s) => Math.exp(s / temp - m));
		const z = e.reduce((a, b) => a + b, 0);
		return e.map((x) => x / z);
	});
	// values are the key positions themselves, so the output is a weighted average of the points
	let out = $derived([weights.reduce((s, w, i) => s + w * keys[i][0], 0), weights.reduce((s, w, i) => s + w * keys[i][1], 0)]);
</script>

<p>
	The attention layer that powers modern language models is made of exactly three kinds of operation you already know: matrix products, a dot-product similarity, and one new function that turns scores into probabilities.
</p>

<h2>Query, keys, values</h2>
<Callout kind="definition" title="Scaled dot-product attention">
	<p>
		Given queries <Tex tex="Q" />, keys <Tex tex="K" /> and values <Tex tex="V" /> (matrices with one row per token),
		<Tex display tex={'\\operatorname{Attn}(Q,K,V) = \\operatorname{softmax}\\!\\left(\\frac{QK^{\\mathsf T}}{\\sqrt d}\\right)V.'} />
		The product <Tex tex={'QK^{\\mathsf T}'} /> holds all query–key dot products (similarity scores). Softmax turns each row into positive weights that sum to 1. Multiplying by <Tex tex="V" /> then takes a <em>weighted average of the value vectors</em>.
	</p>
</Callout>

<h2>One query, four keys</h2>
<p>
	Drag the query. The weights are the softmax of the scaled dot products with each key, and the teal output is the weighted average of the key points (here the values equal the keys). The <em>temperature</em> controls how sharply attention focuses: low means almost all weight on the best match.
</p>

<Figure caption="The output always lies inside the shape formed by the keys. Lower the temperature and it snaps to the key most aligned with the query." max={680}>
	<Plane2D xmin={-4} xmax={4} ymin={-3.5} ymax={3.5}>
		{#each keys as k, i (i)}
			<Dot at={k} color={C.blue} r={4 + 14 * weights[i]} label={'k' + (i + 1)} />
		{/each}
		<Dot at={out} color={C.teal} r={7} label="output" />
		<DragVector bind:value={q} color={C.yellow} label="q" snap={0.25} limit={3} />
	</Plane2D>
	<Bars values={weights} labels={keys.map((_, i) => 'k' + (i + 1))} max={1} height={140} color="#58c4dd" label="Attention weights" />
	{#snippet controls()}
		<Slider label="temp" bind:value={temp} min={0.2} max={5} step={0.1} display={temp.toFixed(1)} />
		<span class="font-mono text-sm text-slate-200">weights sum to {weights.reduce((a, b) => a + b, 0).toFixed(2)}</span>
	{/snippet}
</Figure>

<h2>Where Q, K, V come from</h2>
<p>
	In a transformer, an input matrix <Tex tex="X" /> (one row per token) is turned into <Tex tex={'Q = XW_Q,\\ K = XW_K,\\ V = XW_V'} /> by three learned matrices. So attention is <em>three matrix products to get Q, K, V, one to get scores, a row-wise softmax, and one more to mix the values</em>.
	The <Tex tex={'1/\\sqrt d'} /> keeps the dot products from growing with dimension, which would push softmax into the saturated regime of the figure above (very low temperature).
</p>

<Callout kind="intuition">
	<p>
		The <Tex tex={'n\\times n'} /> score matrix <Tex tex={'QK^{\\mathsf T}'} /> costs <Tex tex={'O(n^2d)'} /> time and memory for a sequence of <Tex tex="n" /> tokens. That quadratic cost is the central bottleneck of long-context models, and many efficiency tricks (low-rank, sparse, sketched attention) are applications of this course's ideas.
	</p>
</Callout>

<Recap
	points={[
		'Attention $=\\operatorname{softmax}(QK^{\\mathsf T}/\\sqrt d)\\,V$: similarity scores, normalise to weights, average the values.',
		'$Q,K,V$ are $X$ times three learned matrices; each output is a convex combination of value vectors.',
		'The $n\\times n$ score matrix makes cost quadratic in sequence length.'
	]}
/>

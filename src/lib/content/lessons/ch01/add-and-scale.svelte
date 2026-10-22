<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let v = $state([2, 1]);
	let w = $state([1, 3]);
	let sum = $derived([v[0] + w[0], v[1] + w[1]]);

	let u = $state([2, 1]);
	let k = $state(1.5);
	let scaled = $derived([k * u[0], k * u[1]]);
</script>

<p>
	Linear algebra allows exactly two moves. You may <strong class="text-slate-50">add</strong> two vectors, and you may
	<strong class="text-slate-50">scale</strong> a vector by a number. Everything later, including matrices, determinants and
	eigenvectors, is an elaboration of these two.
</p>

<h2>Adding: walk one, then the other</h2>
<p>
	To add <Tex tex={'\\mathbf v + \\mathbf w'} />, walk along <Tex tex={'\\mathbf v'} />, then, starting from where you
	ended, walk along <Tex tex={'\\mathbf w'} />. The arrow from the start to the finish is the sum. Drag both tips and
	notice that the order does not matter: you get the same parallelogram either way.
</p>

<Figure caption="The sum is the diagonal of the parallelogram. Walking v then w ends where walking w then v ends.">
	<Plane2D xmin={-6} xmax={6} ymin={-2} ymax={7}>
		<Arrow from={v} to={sum} color={C.jHat} dashed width={2.5} opacity={0.7} />
		<Arrow from={w} to={sum} color={C.blue} dashed width={2.5} opacity={0.7} />
		<Arrow to={sum} color={C.yellow} label="v + w" />
		<DragVector bind:value={v} color={C.blue} label="v" snap={0.5} />
		<DragVector bind:value={w} color={C.jHat} label="w" snap={0.5} />
	</Plane2D>
	{#snippet controls()}
		<span class="font-mono text-slate-100">
			({v[0].toFixed(1)}, {v[1].toFixed(1)}) + ({w[0].toFixed(1)}, {w[1].toFixed(1)}) = ({sum[0].toFixed(1)}, {sum[1].toFixed(1)})
		</span>
	{/snippet}
</Figure>

<p>In coordinates the rule is the obvious one: add component by component.</p>
<Tex display tex={'\\begin{pmatrix} a \\\\ b \\end{pmatrix} + \\begin{pmatrix} c \\\\ d \\end{pmatrix} = \\begin{pmatrix} a + c \\\\ b + d \\end{pmatrix}'} />

<h2>Scaling: stretch, shrink, flip</h2>
<p>
	Multiplying a vector by a number <Tex tex="k" /> (a <em>scalar</em>) stretches it by that factor. Between 0 and 1 it
	shrinks, a negative number flips it through the origin, and 0 collapses it to the zero vector.
</p>

<Figure caption="Slide k from negative to positive. The scaled arrow always stays on the same line through the origin.">
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5}>
		<Arrow to={scaled} color={C.yellow} label="k·u" />
		<DragVector bind:value={u} color={C.blue} label="u" snap={0.5} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="k" bind:value={k} min={-3} max={3} step={0.1} />
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		Add and scale are all you need to describe any "straight" motion. Scaling moves along a line through the origin;
		adding lets you turn corners. Combine them and you can reach points far from either arrow, which is the topic of the next lesson.
	</p>
</Callout>

<Callout kind="theorem" title="The rules (what makes this a vector space, informally)">
	<p>
		Adding is commutative, <Tex tex={'\\mathbf v + \\mathbf w = \\mathbf w + \\mathbf v'} />, and associative. There is a zero vector.
		Every vector has a negative. Scaling distributes over both kinds of addition:
		<Tex tex={'k(\\mathbf v + \\mathbf w) = k\\mathbf v + k\\mathbf w'} /> and <Tex tex={'(k + m)\\mathbf v = k\\mathbf v + m\\mathbf v'} />.
		You will formalise this in chapter 4.
	</p>
</Callout>

<Recap
	points={[
		'**Adding** vectors: place them tip to tail. In coordinates, add entrywise.',
		'**Scaling** by $k$ multiplies every entry; negative $k$ reverses direction.',
		'These two operations are the entire toolkit of linear algebra.'
	]}
/>

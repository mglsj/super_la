<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Rich from '#lib/components/lesson/Rich.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let v = $state([3, 2]);
	let a = $state(1);
	let b = $state(-1);
	let c = $state(0.5);
</script>

<p>
	Ask three people what a vector is and you will get three answers: a physicist says "an arrow with a
	length and a direction", a programmer says "a list of numbers", and a mathematician says "something
	you can add and scale". Linear algebra works because <strong class="text-slate-50">all three are the same idea</strong>.
</p>

<h2>View 1: an arrow</h2>
<p>
	Picture an arrow starting at the origin. Where it ends is all that matters. Drag the tip below and
	watch the numbers: the first says how far you travel along <Tex tex="x" />, the second how far along <Tex tex="y" />.
</p>

<Figure caption="Drag the tip. The arrow and the list of numbers are two descriptions of one thing.">
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5}>
		<Line a={[v[0], 0]} b={v} color={C.jHat} dashed width={2} opacity={0.8} />
		<Line a={[0, 0]} b={[v[0], 0]} color={C.iHat} dashed width={2} opacity={0.8} />
		<DragVector bind:value={v} label="v" snap={0.5} />
	</Plane2D>
	{#snippet controls()}
		<span class="font-mono text-base text-slate-100">
			v = ({v[0].toFixed(1)}, {v[1].toFixed(1)})
		</span>
	{/snippet}
</Figure>

<h2>View 2: a list of numbers</h2>
<p>
	The arrow above is completely described by the pair <Tex tex="(3, 2)" />. In general a vector in <Tex tex={'\\mathbb{R}^n'} /> is
	an ordered list of <Tex tex="n" /> real numbers:
</p>
<Tex display tex={'\\mathbf v = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{pmatrix}'} />
<p>
	A 2D arrow needs two numbers, a 3D arrow three. Nothing stops us from using 100 numbers, even though
	nobody can draw it. The algebra still works, and that is the point.
</p>

<h2>View 3: anything you can add and scale</h2>
<p>
	Now the surprise. Take the polynomials of degree at most 2, like <Tex tex="a + bx + cx^2" />. You can add two of them
	and you can multiply one by a number, and you always land back among such polynomials. Move the sliders:
	the three numbers <Tex tex="(a, b, c)" /> behave exactly like the coordinates of a vector.
</p>

<Figure caption="A polynomial is a point in a 3-number space. Changing a, b, c moves it, just like dragging an arrow.">
	<Plane2D xmin={-4} xmax={4} ymin={-4} ymax={4} ticks={false}>
		<Curve fn={(x) => a + b * x + c * x * x} from={-4} to={4} color={C.teal} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={-3} max={3} step={0.1} />
		<Slider label="b" bind:value={b} min={-3} max={3} step={0.1} />
		<Slider label="c" bind:value={c} min={-1.5} max={1.5} step={0.05} />
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		A vector is not an arrow, a list or a polynomial. It is <strong class="text-slate-50">a member of a collection where adding and scaling make sense</strong>.
		Arrows and lists are just the most convenient pictures of it. Everything in this course is built
		from those two operations.
	</p>
</Callout>

<h2>The formal version</h2>
<Callout kind="definition" title="Definition: vectors in R^n">
	<p>
		For a positive integer <Tex tex="n" />, the set <Tex tex={'\\mathbb{R}^n'} /> consists of all ordered lists
		<Tex tex="\mathbf v = (v_1, \dots, v_n)" /> of real numbers. Two vectors are equal exactly when all their entries are equal.
	</p>
</Callout>
<p>
	The word "space" in "vector space" comes later (chapter 4), when we strip this down to just the rules that adding and scaling must obey.
</p>

<Recap
	points={[
		'A vector can be pictured as an **arrow from the origin**, a **list of numbers**, or an abstract object you can **add and scale**.',
		'In $\\mathbb{R}^n$ a vector is an ordered list of $n$ real numbers.',
		'Polynomials, functions and more are vectors too: what counts is that adding and scaling work.'
	]}
/>

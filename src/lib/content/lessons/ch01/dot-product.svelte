<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { angle, dot, norm } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let a = $state([3, 1]);
	let b = $state([1, 3]);

	let d = $derived(dot(a, b));
	let la = $derived(norm(a));
	let lb = $derived(norm(b));
	let theta = $derived(la > 0.01 && lb > 0.01 ? (angle(a, b) * 180) / Math.PI : 0);
	let verdict = $derived(
		Math.abs(d) < 0.05 ? 'perpendicular' : d > 0 ? 'pointing roughly the same way' : 'pointing roughly opposite ways'
	);
</script>

<p>
	You already know how to add and scale vectors. The dot product is the first way to <em>combine two vectors into a
	number</em>, and that number secretly knows about lengths and angles.
</p>

<h2>The recipe</h2>
<Callout kind="definition" title="Definition: dot product and length">
	<p>
		For <Tex tex={'\\mathbf a, \\mathbf b \\in \\mathbb{R}^n'} />, the dot product is
		<Tex tex={'\\mathbf a \\cdot \\mathbf b = a_1 b_1 + a_2 b_2 + \\dots + a_n b_n'} />, and the length (norm) of a vector is
		<Tex tex={'\\|\\mathbf a\\| = \\sqrt{\\mathbf a \\cdot \\mathbf a}'} />.
	</p>
</Callout>
<p>
	Multiply matching entries and add. The length is just the Pythagorean theorem in disguise:
	<Tex tex="(3,4)" /> has length <Tex tex={'\\sqrt{9+16} = 5'} />.
</p>

<h2>What the number means</h2>
<p>
	Drag the two arrows. The dot product is large and positive when they point the same way, zero when they are at a right angle,
	and negative when they point against each other.
</p>

<Figure caption="Dot product = (length of a) × (length of b) × cos(angle). Make them perpendicular and it hits zero.">
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5}>
		<DragVector bind:value={a} color={C.blue} label="a" snap={0.5} />
		<DragVector bind:value={b} color={C.jHat} label="b" snap={0.5} />
	</Plane2D>
	{#snippet controls()}
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>a · b = <span class="text-amber-300">{d.toFixed(2)}</span></span>
			<span>angle = <span class="text-teal-300">{theta.toFixed(1)}°</span></span>
			<span>‖a‖ = {la.toFixed(2)}</span>
			<span>‖b‖ = {lb.toFixed(2)}</span>
			<span class="text-slate-400 sm:col-span-2 font-sans">These are {verdict}.</span>
		</div>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Theorem: the dot product measures angle">
	<p>
		For nonzero <Tex tex={'\\mathbf a, \\mathbf b'} />, <Tex display tex={'\\mathbf a \\cdot \\mathbf b = \\|\\mathbf a\\|\\,\\|\\mathbf b\\|\\cos\\theta'} />
		where <Tex tex={'\\theta'} /> is the angle between them. In particular <Tex tex={'\\mathbf a \\perp \\mathbf b'} /> exactly when
		<Tex tex={'\\mathbf a \\cdot \\mathbf b = 0'} />.
	</p>
</Callout>

<h2>A worked example</h2>
<p>
	Take <Tex tex="\mathbf a = (3,1)" /> and <Tex tex="\mathbf b = (1,2)" />.
</p>
<Tex display tex={'\\cos\\theta = \\frac{3\\cdot1 + 1\\cdot2}{\\sqrt{10}\\,\\sqrt{5}} = \\frac{5}{\\sqrt{50}} = \\frac{1}{\\sqrt2} \\quad\\Rightarrow\\quad \\theta = 45^\\circ'} />

<Callout kind="intuition">
	<p>
		The dot product asks "how much do these two agree?" It is the engine behind similarity scores in search, recommendation and
		neural networks, which you will meet again in later chapters.
	</p>
</Callout>

<Recap
	points={[
		'$\\mathbf a\\cdot\\mathbf b = \\sum a_i b_i$ and $\\|\\mathbf a\\| = \\sqrt{\\mathbf a\\cdot\\mathbf a}$.',
		'$\\mathbf a\\cdot\\mathbf b = \\|\\mathbf a\\|\\|\\mathbf b\\|\\cos\\theta$: positive for acute angles, zero for right angles, negative for obtuse.',
		'Perpendicular means dot product zero.'
	]}
/>

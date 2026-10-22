<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { dot, norm, projectOnto, sub } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let a = $state([4, 1]);
	let b = $state([2, 4]);

	let ok = $derived(norm(a) > 0.01);
	let p = $derived(ok ? projectOnto(b, a) : [0, 0]);
	let r = $derived(sub(b, p));
</script>

<p>
	Shine a light straight down onto the line through <Tex tex={'\\mathbf a'} />. The shadow that <Tex tex={'\\mathbf b'} /> casts on
	that line is the <strong class="text-slate-50">projection</strong>. It is the point on the line closest to <Tex tex={'\\mathbf b'} />, and
	it is the first appearance of the idea behind least squares in chapter 12.
</p>

<Figure caption="The yellow arrow is the shadow of b on the line through a. The dashed red segment is what is left over, and it always meets the line at a right angle.">
	<Plane2D xmin={-3} xmax={9} ymin={-3} ymax={7}>
		{#if ok}<Line point={[0, 0]} dir={a} color={C.blue} width={1.5} opacity={0.4} />{/if}
		<Arrow from={p} to={b} color={C.jHat} dashed width={2.5} />
		<Arrow to={p} color={C.yellow} label="proj" dx={8} dy={20} />
		<DragVector bind:value={a} color={C.blue} label="a" snap={0.5} limit={8} />
		<DragVector bind:value={b} color={C.jHat} label="b" snap={0.5} limit={8} />
	</Plane2D>
	{#snippet controls()}
		<span class="font-mono text-sm">
			residual · a = <span class="text-amber-300">{dot(r, a).toFixed(2)}</span> (always 0)
		</span>
	{/snippet}
</Figure>

<h2>The formula, derived</h2>
<p>
	The shadow must be a multiple of <Tex tex={'\\mathbf a'} />, say <Tex tex={'c\\mathbf a'} />, with the leftover
	<Tex tex={'\\mathbf b - c\\mathbf a'} /> perpendicular to <Tex tex={'\\mathbf a'} />. Dotting with <Tex tex={'\\mathbf a'} />:
</p>
<Tex display tex={'\\mathbf a\\cdot(\\mathbf b - c\\mathbf a) = 0 \\;\\Longrightarrow\\; c = \\frac{\\mathbf a\\cdot\\mathbf b}{\\mathbf a\\cdot\\mathbf a}'} />

<Callout kind="definition" title="Definition: orthogonal projection onto a line">
	<p>
		For <Tex tex={'\\mathbf a \\neq \\mathbf 0'} />, <Tex display tex={'\\operatorname{proj}_{\\mathbf a}\\mathbf b = \\frac{\\mathbf a\\cdot\\mathbf b}{\\mathbf a\\cdot\\mathbf a}\\,\\mathbf a'} />
	</p>
</Callout>

<h2>A worked example</h2>
<p>
	Project <Tex tex="\mathbf b = (3, 2.5)" /> onto <Tex tex="\mathbf a = (4, 0)" />. Here <Tex tex="\mathbf a\cdot\mathbf b = 12" /> and <Tex tex="\mathbf a\cdot\mathbf a = 16" />, so
	<Tex tex={'c = 3/4'} /> and the projection is <Tex tex="(3, 0)" />. The leftover is <Tex tex="(0, 2.5)" />, which indeed has
	dot product 0 with <Tex tex="(4,0)" />.
</p>

<Callout kind="intuition">
	<p>
		"Closest point on a line" and "shadow at a right angle" are the same thing. Whenever a problem asks for the best approximation
		inside some flat set, the answer will be a projection and the error will be perpendicular to the set.
	</p>
</Callout>

<Recap
	points={[
		'$\\operatorname{proj}_{\\mathbf a}\\mathbf b = \\dfrac{\\mathbf a\\cdot\\mathbf b}{\\mathbf a\\cdot\\mathbf a}\\mathbf a$.',
		'The leftover $\\mathbf b-\\operatorname{proj}$ is perpendicular to $\\mathbf a$.',
		'The projection is the closest point on the line to $\\mathbf b$.'
	]}
/>

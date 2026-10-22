<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import { dot, norm, projectOnto, scale, sub, unit } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let a = $state([4, 1]);
	let b = $state([2, 4]);

	let ok = $derived(norm(a) > 0.01);
	let p = $derived(ok ? projectOnto(b, a) : [0, 0]); // the shadow, c·a
	let r = $derived(sub(b, p)); // from the shadow to b: b − c·a

	// small square marking the right angle where the dashed arrow meets the line
	let corner = $derived.by(() => {
		if (!ok || norm(r) < 0.05) return null;
		const u = scale(unit(a), 0.35);
		const w = scale(unit(r), 0.35);
		return [p, [p[0] + u[0], p[1] + u[1]], [p[0] + u[0] + w[0], p[1] + u[1] + w[1]], [p[0] + w[0], p[1] + w[1]]];
	});
</script>

<p>
	Shine a light straight down onto the line through <Tex tex={'\\mathbf a'} />. The shadow that <Tex tex={'\\mathbf b'} /> casts on
	that line is the <strong class="text-slate-50">projection</strong>. It is the point on the line closest to <Tex tex={'\\mathbf b'} />, and
	it is the first appearance of the idea behind least squares in chapter 12.
</p>

<Figure caption="The yellow arrow is the shadow c·a: some multiple of a. The dashed arrow goes from the shadow to b, so it equals b − c·a. We pick c so that this dashed arrow meets the line at a right angle (the little square).">
	<Plane2D xmin={-3} xmax={9} ymin={-3} ymax={7}>
		{#if ok}<Line point={[0, 0]} dir={a} color={C.blue} width={1.5} opacity={0.4} />{/if}
		<Arrow from={p} to={b} color={C.jHat} dashed width={2.5} label="b − c·a" dx={10} dy={22} />
		{#if corner}<Polygon points={corner} fill="transparent" stroke={C.iHat} width={2.5} />{/if}
		<Arrow to={p} color={C.yellow} label="c·a" dx={-6} dy={22} />
		<DragVector bind:value={a} color={C.blue} label="a" snap={0.5} limit={8} />
		<DragVector bind:value={b} color={C.jHat} label="b" snap={0.5} limit={8} />
	</Plane2D>
	{#snippet controls()}
		<span class="font-mono text-sm">
			(b − c·a) · a = <span class="text-amber-300">{dot(r, a).toFixed(2)}</span> (always 0)
		</span>
	{/snippet}
</Figure>

<h2>The formula, derived</h2>
<p>
	The shadow lies on the line, so it is some multiple of <Tex tex={'\\mathbf a'} />: call it <Tex tex={'c\\mathbf a'} />, with <Tex tex="c" /> a number we still have to find.
	The dashed arrow in the picture runs from the shadow to <Tex tex={'\\mathbf b'} />, so it is <Tex tex={'\\mathbf b - c\\mathbf a'} /> (where it ends, minus where it starts).
</p>
<p>
	We choose <Tex tex="c" /> so that this dashed arrow is perpendicular to <Tex tex={'\\mathbf a'} />. That is what makes the shadow the closest point: any other point on the line would leave a longer
	arrow to <Tex tex={'\\mathbf b'} />, because the straight-down path is the shortest. "Perpendicular" means the dot product is zero, which gives an equation for <Tex tex="c" />:
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
	<Tex tex={'c = 3/4'} /> and the projection is <Tex tex="(3, 0)" />. The dashed arrow is <Tex tex={'\\mathbf b - c\\mathbf a = (0, 2.5)'} />, which indeed has
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

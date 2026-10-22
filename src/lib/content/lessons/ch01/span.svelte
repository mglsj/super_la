<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, makePlane, makeSphere, orientPlane, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import { cross } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let v = $state([3, 1]);
	let w = $state([1, 2]);
	let a = $state(1);
	let b = $state(1);
	let point = $derived([a * v[0] + b * w[0], a * v[1] + b * w[1]]);
	let collapsed = $derived(Math.abs(v[0] * w[1] - v[1] * w[0]) < 0.05);

	// 3D: span of two vectors is a plane
	let s = $state(1);
	let t = $state(1);
	const p = [2, 0, 0.5];
	const q = [0.5, 2, 1];
	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const plane = makePlane(THREE, cross(p, q), 7, HEX.yellow);
		const ap = makeArrow(THREE, [0, 0, 0], p, HEX.iHat);
		const aq = makeArrow(THREE, [0, 0, 0], q, HEX.jHat);
		const ball = makeSphere(THREE, [0, 0, 0], HEX.teal, 0.13);
		const leg1 = makeArrow(THREE, [0, 0, 0], p, HEX.iHat);
		scene.add(plane, ap, aq, ball, leg1);
		return {
			update() {
				orientPlane(THREE, plane, cross(p, q));
				const sp = p.map((x) => x * s);
				const pt = sp.map((x, i) => x + t * q[i]);
				ball.position.set(pt[0], pt[1], pt[2]);
				setArrow(THREE, leg1, [0, 0, 0], sp);
			}
		};
	}
</script>

<p>
	Take some vectors and allow yourself to add them and scale them as much as you like. The set of everything you can
	reach is their <strong class="text-slate-50">span</strong>. Asking about span is asking: <em>what can these vectors build?</em>
</p>

<h2>Linear combinations</h2>
<Callout kind="definition" title="Definition: linear combination and span">
	<p>
		A <em>linear combination</em> of <Tex tex={'\\mathbf v_1, \\dots, \\mathbf v_k'} /> is any vector
		<Tex tex={'c_1\\mathbf v_1 + \\dots + c_k\\mathbf v_k'} /> with real numbers <Tex tex="c_i" />. Their
		<em>span</em> is the set of all linear combinations.
	</p>
</Callout>
<p>
	Below, the yellow dot is <Tex tex={'a\\mathbf v + b\\mathbf w'} />. Change <Tex tex="a" /> and <Tex tex="b" /> and watch
	where it can go. Then drag <Tex tex={'\\mathbf v'} /> and <Tex tex={'\\mathbf w'} /> themselves.
</p>

<Figure caption="Two vectors that point in different directions can reach every point in the plane.">
	<Plane2D xmin={-8} xmax={8} ymin={-6} ymax={6}>
		{#if collapsed}
			<Line point={[0, 0]} dir={v} color={C.yellow} width={5} opacity={0.35} />
		{/if}
		<Arrow to={[a * v[0], a * v[1]]} color={C.blue} dashed width={2.5} opacity={0.8} />
		<Arrow from={[a * v[0], a * v[1]]} to={point} color={C.jHat} dashed width={2.5} opacity={0.8} />
		<Dot at={point} color={C.yellow} r={7} />
		<DragVector bind:value={v} color={C.blue} label="v" snap={0.5} />
		<DragVector bind:value={w} color={C.jHat} label="w" snap={0.5} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={-3} max={3} step={0.1} />
		<Slider label="b" bind:value={b} min={-3} max={3} step={0.1} />
		<span class="w-full text-center text-sm {collapsed ? 'text-amber-300' : 'text-slate-400'}">
			{collapsed
				? 'v and w are parallel: the span collapsed to a single line.'
				: 'v and w point in different directions: the span is the whole plane.'}
		</span>
	{/snippet}
</Figure>

<Callout kind="warning">
	<p>
		Try dragging <Tex tex={'\\mathbf w'} /> onto the line through <Tex tex={'\\mathbf v'} />. The second vector stops
		contributing anything new, and the reachable region <strong class="text-slate-50">collapses from a plane to a line</strong>.
		Spotting this redundancy is exactly what <em>linear independence</em> (chapter 5) is about.
	</p>
</Callout>

<h2>How many vectors do you need?</h2>
<ul class="list-disc space-y-1 pl-6">
	<li>One nonzero vector spans a <strong class="text-slate-50">line</strong> through the origin.</li>
	<li>Two vectors that are not parallel span a <strong class="text-slate-50">plane</strong>.</li>
	<li>In 3D, two independent vectors span a plane inside 3D space, and a third independent one fills all of it.</li>
</ul>

<Figure caption="Orbit the view. Two vectors in 3D only reach a flat sheet. Move s and t to place the teal point anywhere on it.">
	<Scene3D {build} label="Plane spanned by two vectors in 3D" height={340} />
	{#snippet controls()}
		<Slider label="s" bind:value={s} min={-2} max={2} step={0.1} />
		<Slider label="t" bind:value={t} min={-2} max={2} step={0.1} />
	{/snippet}
</Figure>

<Callout kind="theorem" title="Is a vector in the span?">
	<p>
		Asking whether <Tex tex={'\\mathbf b'} /> lies in <Tex tex={'\\text{span}\\{\\mathbf v, \\mathbf w\\}'} /> means asking whether
		<Tex tex={'a\\mathbf v + b\\mathbf w = \\mathbf b'} /> has a solution. For <Tex tex="(7,0)" /> with
		<Tex tex="(3,1)" /> and <Tex tex="(1,2)" /> this is two equations in two unknowns, which you will solve systematically in chapter 2.
	</p>
</Callout>

<Recap
	points={[
		'A **linear combination** is $c_1\\mathbf v_1 + \\dots + c_k\\mathbf v_k$. The **span** is the set of all of them.',
		'In the plane: one vector spans a line, two non-parallel vectors span everything.',
		'If one vector is already a combination of the others it adds nothing and the span does not grow.'
	]}
/>

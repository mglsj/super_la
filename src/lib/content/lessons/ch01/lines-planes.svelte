<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, makePlane, orientPlane, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import { norm } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let n = $state([2, 1]);
	let d = $state(3);
	let nn = $derived(norm(n));
	let foot = $derived(nn > 0.01 ? [(d * n[0]) / (nn * nn), (d * n[1]) / (nn * nn)] : [0, 0]);

	let m = $state([1, 1, 2]);
	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const plane = makePlane(THREE, m, 6, HEX.yellow);
		const arrow = makeArrow(THREE, [0, 0, 0], m, HEX.purple);
		scene.add(plane, arrow);
		return {
			update() {
				orientPlane(THREE, plane, m);
				setArrow(THREE, arrow, [0, 0, 0], m);
			}
		};
	}
</script>

<p>
	An equation like <Tex tex="x + 2y = 3" /> is secretly a picture. The dot product turns it into geometry: it says "the
	vector <Tex tex="(x, y)" /> has a fixed dot product with <Tex tex="(1, 2)" />".
</p>

<h2>Lines in the plane</h2>
<Callout kind="intuition">
	<p>
		The equation <Tex tex={'\\mathbf n \\cdot \\mathbf x = d'} /> describes all points whose shadow along <Tex tex={'\\mathbf n'} /> has the
		same length: a line <em>perpendicular</em> to <Tex tex={'\\mathbf n'} />. The number <Tex tex="d" /> slides the line back and forth. With
		<Tex tex="d = 0" /> it passes through the origin.
	</p>
</Callout>

<Figure caption="Drag the normal n and slide d. The line is always perpendicular to n; the yellow dot is the line's closest point to the origin.">
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5}>
		{#if nn > 0.01}
			<Line point={foot} dir={[-n[1], n[0]]} color={C.yellow} />
			<Arrow from={foot} to={[foot[0] + n[0] * 0.5, foot[1] + n[1] * 0.5]} color={C.purple} width={2} />
		{/if}
		<DragVector bind:value={n} color={C.purple} label="n" snap={0.5} limit={4} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="d" bind:value={d} min={-6} max={6} step={0.5} />
		<span class="font-mono text-sm">{n[0].toFixed(1)}x + {n[1].toFixed(1)}y = {d.toFixed(1)}</span>
	{/snippet}
</Figure>

<p>
	A line can also be described by a point and a direction: all points <Tex tex={'\\mathbf p + t\\mathbf d'} /> as <Tex tex="t" /> varies. These are two views of the same line. In 2D the normal is the direction rotated by 90°.
</p>

<h2>Planes in 3D</h2>
<p>
	In three dimensions the same equation <Tex tex={'\\mathbf n \\cdot \\mathbf x = d'} /> describes a <strong class="text-slate-50">plane</strong> with normal <Tex tex={'\\mathbf n'} />. Change the
	components of the normal and orbit around.
</p>

<Figure caption="The plane n·x = 0 through the origin. The purple arrow is its normal, perpendicular to every direction in the plane.">
	<Scene3D {build} label="A plane with its normal vector" height={340} />
	{#snippet controls()}
		<Slider label="n₁" bind:value={m[0]} min={-3} max={3} step={0.1} />
		<Slider label="n₂" bind:value={m[1]} min={-3} max={3} step={0.1} />
		<Slider label="n₃" bind:value={m[2]} min={-3} max={3} step={0.1} />
	{/snippet}
</Figure>

<h2>A worked example</h2>
<p>
	Find the plane through <Tex tex="(2, 0, 1)" /> with normal <Tex tex="(3, 1, 2)" />. The plane is <Tex tex="3x + y + 2z = d" />. Plug in the point to find
	<Tex tex={'d = 3\\cdot2 + 0 + 2\\cdot1 = 8'} />.
</p>

<Recap
	points={[
		'$\\mathbf n\\cdot\\mathbf x = d$ is a line in 2D and a plane in 3D, perpendicular to $\\mathbf n$.',
		'The constant $d$ shifts it; $d=0$ means it passes through the origin.',
		'Lines can also be written as a point plus multiples of a direction vector.'
	]}
/>

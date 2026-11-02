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
	import WorkedExample from '#lib/components/lesson/WorkedExample.svelte';

	const closest = {
		problem:
			'The line $\\ell$ passes through $P = (1,2,0)$ and $Q = (2,2,1)$, and $\\mathbf b = (3,0,2)$.\n(a) Write every point of $\\ell$ as $\\mathbf r(t) = P + t\\mathbf d$. Is $\\ell$ a subspace of $\\mathbb R^3$?\n(b) Find the point $\\mathbf p$ of $\\ell$ closest to $\\mathbf b$, and the distance from $\\mathbf b$ to $\\ell$.',
		method: [
			'Direction $\\mathbf d = Q - P$; points are $\\mathbf r(t) = P + t\\mathbf d$.',
			'Subspace test: a subspace must contain $\\mathbf 0$. Solve $P + t\\mathbf d = \\mathbf 0$; if no $t$ works, it is not a subspace.',
			'Closest point: the error $\\mathbf b - \\mathbf r(t)$ must be perpendicular to $\\mathbf d$. Solve $(\\mathbf b - P - t\\mathbf d)\\cdot\\mathbf d = 0$, giving $t = \\dfrac{(\\mathbf b - P)\\cdot\\mathbf d}{\\mathbf d\\cdot\\mathbf d}$.',
			'Distance $= \\lVert\\mathbf b - \\mathbf p\\rVert$. Check: $(\\mathbf b - \\mathbf p)\\cdot\\mathbf d$ must be $0$.'
		],
		steps: [
			{ label: 'Direction and parametrisation', text: '$\\mathbf d = Q - P = (2-1,\\ 2-2,\\ 1-0) = (1,0,1)$.\nSo $\\mathbf r(t) = (1,2,0) + t(1,0,1) = (1 + t,\\ 2,\\ t)$, $t\\in\\mathbb R$.' },
			{
				label: 'Is it a subspace?',
				text: 'Every subspace contains $\\mathbf 0$. But the second coordinate of $\\mathbf r(t)$ is always $2$, so no $t$ gives $(0,0,0)$.\n**Not a subspace.** It is an *affine* line: the subspace $\\operatorname{span}\\{\\mathbf d\\}$ shifted by $P$. (Also closure fails: $\\mathbf r(0) + \\mathbf r(0) = (2,4,0)$ has second coordinate $4$, so it is not on $\\ell$.)'
			},
			{ label: 'Set up the perpendicular condition', text: '$\\mathbf b - \\mathbf r(t) = (3 - 1 - t,\\ 0 - 2,\\ 2 - t) = (2 - t,\\ -2,\\ 2 - t)$.\n$(\\mathbf b - \\mathbf r(t))\\cdot\\mathbf d = (2 - t) + 0 + (2 - t) = 4 - 2t = 0$, so $t = 2$.\n(Same as the formula: $(\\mathbf b - P)\\cdot\\mathbf d = (2,-2,2)\\cdot(1,0,1) = 4$, $\\mathbf d\\cdot\\mathbf d = 2$, $t = 4/2 = 2$.)' },
			{ label: 'Closest point and distance', text: '$\\mathbf p = \\mathbf r(2) = (3,2,2)$. $\\mathbf b - \\mathbf p = (0,-2,0)$, and the check $(0,-2,0)\\cdot(1,0,1) = 0$ ✓.\nDistance $= \\lVert(0,-2,0)\\rVert = 2$.' }
		]
	};

	const toPlane = {
		problem:
			'Let $\\Pi$ be the plane $x + 2y + 2z = 6$ and $\\mathbf b = (4,3,4)$.\n(a) Is $\\Pi$ a subspace of $\\mathbb R^3$?\n(b) Find the point $\\mathbf p$ of $\\Pi$ closest to $\\mathbf b$, and the distance from $\\mathbf b$ to $\\Pi$.',
		method: [
			'Read the normal off the coefficients: $\\mathbf n = (1,2,2)$. The plane is a subspace only if the right-hand side is $0$.',
			'The shortest path from $\\mathbf b$ to a plane runs **along the normal**: $\\mathbf p = \\mathbf b - s\\,\\mathbf n$ for some number $s$.',
			'Find $s$ by requiring $\\mathbf p$ to lie on the plane: substitute into the equation.',
			'Distance $= |s|\\,\\lVert\\mathbf n\\rVert$, which is the same as $\\dfrac{|\\mathbf n\\cdot\\mathbf b - d|}{\\lVert\\mathbf n\\rVert}$. Check that $\\mathbf p$ satisfies the equation.'
		],
		steps: [
			{
				label: 'Subspace?',
				text: '$\\mathbf 0$ gives $0 + 0 + 0 = 0\\ne6$, so $\\mathbf 0\\notin\\Pi$: **not a subspace**. It is the subspace $\\{x + 2y + 2z = 0\\}$ shifted off the origin, e.g. to pass through $(6,0,0)$.'
			},
			{
				label: 'Move along the normal',
				text: '$\\mathbf p = \\mathbf b - s\\mathbf n = (4 - s,\\ 3 - 2s,\\ 4 - 2s)$. On the plane: $(4 - s) + 2(3 - 2s) + 2(4 - 2s) = 18 - 9s = 6$, so $s = \\tfrac43$.'
			},
			{
				label: 'Closest point',
				text: '$\\mathbf p = (4 - \\tfrac43,\\ 3 - \\tfrac83,\\ 4 - \\tfrac83) = (\\tfrac83,\\ \\tfrac13,\\ \\tfrac43)$. Check: $\\tfrac83 + \\tfrac23 + \\tfrac83 = 6$ ✓.'
			},
			{
				label: 'Distance',
				text: '$\\lVert\\mathbf b - \\mathbf p\\rVert = s\\lVert\\mathbf n\\rVert = \\tfrac43\\cdot3 = 4$.\nFormula check: $\\dfrac{|\\mathbf n\\cdot\\mathbf b - 6|}{\\lVert\\mathbf n\\rVert} = \\dfrac{|4 + 6 + 8 - 6|}{3} = \\dfrac{12}{3} = 4$ ✓.'
			}
		]
	};

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

<h2>Lines that miss the origin</h2>
<p>
	The line <Tex tex={'\\mathbf r(t) = P + t\\mathbf d'} /> is the subspace <Tex tex={'\\operatorname{span}\\{\\mathbf d\\}'} /> (a line through <Tex tex={'\\mathbf 0'} />) slid over by the
	point <Tex tex="P" />. Axler calls such a set an <strong class="text-slate-50">affine subset</strong>, written <Tex tex={'P + U'} />.
</p>
<Callout kind="theorem" title="When is a shifted line a subspace?">
	<p>
		<Tex tex={'P + \\operatorname{span}\\{\\mathbf d\\}'} /> is a subspace exactly when it contains <Tex tex={'\\mathbf 0'} />, which happens exactly when <Tex tex="P" /> is itself a
		multiple of <Tex tex={'\\mathbf d'} />. Any other line fails because adding two of its points takes you off the line.
	</p>
</Callout>
<p>
	To find the point of the line nearest a point <Tex tex={'\\mathbf b'} />, use Strang's projection idea: the shortest segment from <Tex tex={'\\mathbf b'} /> to the line meets it at a right angle.
	So choose <Tex tex="t" /> to make the error <Tex tex={'\\mathbf b - \\mathbf r(t)'} /> perpendicular to <Tex tex={'\\mathbf d'} />:
</p>
<Tex display tex={'(\\mathbf b - P - t\\mathbf d)\\cdot\\mathbf d = 0 \\quad\\Longrightarrow\\quad t^* = \\frac{(\\mathbf b - P)\\cdot\\mathbf d}{\\mathbf d\\cdot\\mathbf d}.'} />
<p>
	This is the projection formula of the previous lesson, applied to <Tex tex={'\\mathbf b - P'} /> after you move the origin to <Tex tex="P" />. Pythagoras says it really is the closest point:
	for any other <Tex tex="t" />, <Tex tex={'\\lVert\\mathbf b - \\mathbf r(t)\\rVert^2 = \\lVert\\mathbf b - \\mathbf r(t^*)\\rVert^2 + (t - t^*)^2\\lVert\\mathbf d\\rVert^2'} />, which is bigger.
</p>

<WorkedExample title="closest point on a line" problem={closest.problem} method={closest.method} steps={closest.steps} credit="Projection view after Strang; affine subsets after Axler." />

<h2>Distance to a plane</h2>
<p>
	For a plane the roles swap. A line has one direction and you are perpendicular to it; a plane <Tex tex={'\\mathbf n\\cdot\\mathbf x = d'} /> has one direction you are <em>along</em>, the normal
	<Tex tex={'\\mathbf n'} />. The closest point is reached by walking straight along <Tex tex={'\\mathbf n'} />, which gives
</p>
<Tex display tex={'\\operatorname{dist}(\\mathbf b, \\Pi) = \\frac{|\\mathbf n\\cdot\\mathbf b - d|}{\\lVert\\mathbf n\\rVert}.'} />

<WorkedExample title="closest point on a plane" problem={toPlane.problem} method={toPlane.method} steps={toPlane.steps} credit="Projection onto the normal direction, after Strang." />

<Recap
	points={[
		'A line $P + t\\mathbf d$ is a subspace only if it passes through $\\mathbf 0$; otherwise it is an affine line (a shifted subspace).',
		'Closest point on $P + t\\mathbf d$ to $\\mathbf b$: $t^* = (\\mathbf b - P)\\cdot\\mathbf d\\,/\\,\\mathbf d\\cdot\\mathbf d$, because the error must be perpendicular to $\\mathbf d$.',
		'$\\mathbf n\\cdot\\mathbf x = d$ is a line in 2D and a plane in 3D, perpendicular to $\\mathbf n$.',
		'The constant $d$ shifts it; $d=0$ means it passes through the origin.',
		'Lines can also be written as a point plus multiples of a direction vector.'
	]}
/>

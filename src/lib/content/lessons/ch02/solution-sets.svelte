<script lang="ts">
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, makePlane, makeSphere, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import ElimStepper from '#lib/components/lesson/ElimStepper.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	// x + y + z = 3 and x - y = 1  ->  (t, t-1, 4-2t)
	let t = $state(1);
	const p0 = [1, 0, 2];
	const dir = [1, 1, -2];

	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const n1 = [1, 1, 1];
		const n2 = [1, -1, 0];
		const pl1 = makePlane(THREE, n1, 8, HEX.yellow);
		pl1.position.set(1, 1, 1); // n1 . x = 3
		const pl2 = makePlane(THREE, n2, 8, HEX.purple);
		pl2.position.set(0.5, -0.5, 0); // n2 . x = 1
		const ball = makeSphere(THREE, p0, HEX.teal, 0.14);
		const d = makeArrow(THREE, [0, 0, 0], p0, HEX.teal);
		// the whole solution line
		// drawn as a thick tube so it stays visible against the translucent planes
		const [a, b] = [-1, 3].map((s) => new THREE.Vector3(...p0.map((x, i) => x + (s - 1) * dir[i])));
		const axis = b.clone().sub(a);
		const line = new THREE.Mesh(
			new THREE.CylinderGeometry(0.07, 0.07, axis.length(), 16),
			new THREE.MeshBasicMaterial({ color: HEX.jHat, depthTest: false })
		);
		line.renderOrder = 10;
		line.position.copy(a.clone().add(b).multiplyScalar(0.5));
		line.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.normalize());
		(ball.material as import('three').MeshBasicMaterial).depthTest = false;
		ball.renderOrder = 11;
		scene.add(pl1, pl2, ball, d, line);
		return {
			update() {
				const pt = p0.map((x, i) => x + (t - 1) * dir[i]);
				ball.position.set(pt[0], pt[1], pt[2]);
				setArrow(THREE, d, [0, 0, 0], pt);
			}
		};
	}
</script>

<p>
	What do the infinitely many solutions look like? They are not a random cloud. They form a clean geometric object, and the
	reduced form tells you exactly which one.
</p>

<h2>Free variables</h2>
<p>
	Take two equations in three unknowns: <Tex tex={'x + y + z = 3'} /> and <Tex tex={'x - y = 1'} />. Two equations cannot pin down three
	unknowns, so one unknown will be <em>free</em>. Reduce it:
</p>
<Figure caption="Reduce [1 1 1 | 3], [1 -1 0 | 1]. There is no pivot in the z column." max={640}>
	<ElimStepper aug={[[1, 1, 1, 3], [1, -1, 0, 1]]} />
</Figure>
<p>
	The result reads <Tex tex={'x + \\tfrac12 z = 2'} /> and <Tex tex={'y + \\tfrac12 z = 1'} />. Column 3 has no pivot, so
	<Tex tex="z" /> is <strong class="text-slate-50">free</strong>: choose it as you like, then <Tex tex="x" /> and <Tex tex="y" /> are determined.
	Setting <Tex tex={'x = t'} /> instead gives the same family, written below.
</p>

<h2>A point plus a direction</h2>
<Callout kind="theorem" title="Shape of the solution set">
	<p>
		If a consistent system <Tex tex={'A\\mathbf x = \\mathbf b'} /> has free variables, its solutions are
		<Tex display tex={'\\mathbf x = \\mathbf x_p + t_1\\mathbf n_1 + \\dots + t_k\\mathbf n_k'} />
		where <Tex tex={'\\mathbf x_p'} /> is one <em>particular</em> solution, and the <Tex tex={'\\mathbf n_i'} /> solve the
		<em>homogeneous</em> system <Tex tex={'A\\mathbf x = \\mathbf 0'} />, one for each free variable.
	</p>
</Callout>
<p>
	For our system, <Tex tex={'\\mathbf x_p = (1, 0, 2)'} /> works and the free direction is <Tex tex={'(1, 1, -2)'} />, so the solutions are
	<Tex display tex={'(x, y, z) = (1, 0, 2) + t\\,(1, 1, -2)'} />
	a <strong class="text-slate-50">line</strong> in 3D. Geometrically it is where two planes intersect.
</p>

<Figure caption="Two planes meet in the red line. Slide t to walk the teal point along all the solutions." max={640}>
	<Scene3D {build} label="Two planes intersecting in a line of solutions" height={360} />
	{#snippet controls()}
		<Slider label="t" bind:value={t} min={-1} max={3} step={0.1} />
		<span class="font-mono text-sm text-slate-100">
			({(p0[0] + (t - 1) * dir[0]).toFixed(1)}, {(p0[1] + (t - 1) * dir[1]).toFixed(1)}, {(p0[2] + (t - 1) * dir[2]).toFixed(1)})
		</span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		Think of it as <em>one answer plus freedom</em>. The particular solution gets you onto the solution set; the null directions are the ways you can
		slide around without leaving it. Number of free variables = dimension of the set of solutions.
	</p>
</Callout>

<Recap
	points={[
		'A column without a pivot is a **free** column; its unknown can be chosen freely.',
		'Solutions of $A\\mathbf x=\\mathbf b$ are **one particular solution plus** any solution of $A\\mathbf x=\\mathbf 0$.',
		'Number of free variables = (unknowns) − rank; two planes in 3D usually meet in a line.'
	]}
/>

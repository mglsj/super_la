<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, HEX } from '#lib/viz/three-helpers.js';
	import { det, type Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[2, 1],
		[0, 1.5]
	]);
	let d = $derived(det(m));

	let m3 = $state<Mat>([
		[1, 0, 0.5],
		[0, 2, 0],
		[0, 0, 1]
	]);
	let d3 = $derived(det(m3));

	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const geo = new THREE.BoxGeometry(1, 1, 1).translate(0.5, 0.5, 0.5);
		const box = new THREE.Mesh(
			geo,
			new THREE.MeshStandardMaterial({ color: HEX.yellow, transparent: true, opacity: 0.55 })
		);
		const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xffffff }));
		box.matrixAutoUpdate = false;
		edges.matrixAutoUpdate = false;
		scene.add(box, edges);
		return {
			update() {
				const [a, b, c] = m3;
				const mat = new THREE.Matrix4().set(a[0], a[1], a[2], 0, b[0], b[1], b[2], 0, c[0], c[1], c[2], 0, 0, 0, 0, 1);
				box.matrix.copy(mat);
				edges.matrix.copy(mat);
				box.matrixWorldNeedsUpdate = true;
				edges.matrixWorldNeedsUpdate = true;
			}
		};
	}
</script>

<p>
	Every linear map stretches or squashes space, and it does so by the <em>same factor everywhere</em>. That single number is the <strong class="text-slate-50">determinant</strong>. Forget the formula for now; start with the picture.
</p>

<h2>The area of the unit square</h2>
<p>
	The unit square (yellow) has area 1. After the transformation it becomes a parallelogram, and because the map is linear, <em>every</em> region of the plane has its area multiplied by the same factor, the area of that parallelogram.
</p>

<Figure caption="Edit the matrix: the determinant is the factor by which the yellow square's area is multiplied. Make the columns parallel and it hits 0." max={620}>
	<Plane2D xmin={-5} xmax={7} ymin={-4} ymax={5} grid={false}>
		<TransformGrid matrix={m} extent={14} />
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={0.5} /></div>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">det = {m[0][0]}·{m[1][1]} − {m[0][1]}·{m[1][0]} = <span class="text-amber-300">{d.toFixed(2)}</span></span>
		<span class="w-full text-center text-sm text-slate-300">
			{Math.abs(d) < 0.02 ? 'Area 0: the whole plane is flattened onto a line. This map cannot be undone.' : `Every area is multiplied by ${Math.abs(d).toFixed(2)}.`}
		</span>
	{/snippet}
</Figure>

<Callout kind="definition" title="The 2×2 determinant">
	<p>
		For <Tex tex={'A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}'} />, the parallelogram spanned by the columns has signed area
		<Tex display tex={'\\det A = ad - bc.'} />
	</p>
</Callout>

<h2>In three dimensions: volume</h2>
<p>
	The columns of a 3×3 matrix span a slanted box (a parallelepiped). Its volume is <Tex tex={'|\\det A|'} />. Change the entries and watch the unit cube become the yellow box.
</p>
<Figure caption="The unit cube pushed through the matrix. Orbit to look from different sides." max={640}>
	<Scene3D {build} label="A unit cube transformed into a parallelepiped" height={320} />
	<div class="flex justify-center"><MatrixInput bind:value={m3} step={0.5} /></div>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">det = <span class="text-amber-300">{d3.toFixed(2)}</span> (volume {Math.abs(d3).toFixed(2)})</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Why det = 0 means no inverse">
	<p>
		<Tex tex={'\\det A = 0'} /> exactly when the columns are dependent, i.e. when the map flattens space into a lower dimension. Flattened space cannot be restored, so
		<Tex tex="A" /> is invertible if and only if <Tex tex={'\\det A \\neq 0'} />.
	</p>
</Callout>

<Recap
	points={[
		'$|\\det A|$ is the factor by which $A$ scales **area** (2D) or **volume** (3D).',
		'For $2\\times2$: $\\det = ad-bc$, the signed area of the parallelogram spanned by the columns.',
		'$\\det A=0$ iff the map collapses space iff $A$ is not invertible.'
	]}
/>

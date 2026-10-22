<script lang="ts">
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import { cross, dot, norm } from '#lib/math/vec.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const u = [2, 0, 0];
	let angleDeg = $state(60);
	let len = $state(2);
	let w = $derived([len * Math.cos((angleDeg * Math.PI) / 180), len * Math.sin((angleDeg * Math.PI) / 180), 0.0]);
	let c = $derived(cross(u, w));

	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const au = makeArrow(THREE, [0, 0, 0], u, HEX.iHat);
		const aw = makeArrow(THREE, [0, 0, 0], w, HEX.jHat);
		const ac = makeArrow(THREE, [0, 0, 0], c, HEX.purple);
		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(18), 3));
		const para = new THREE.Mesh(
			geo,
			new THREE.MeshBasicMaterial({ color: HEX.yellow, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
		);
		scene.add(au, aw, ac, para);
		return {
			update() {
				const [a, b] = [u, w];
				const s = [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
				const verts = [[0, 0, 0], a, s, [0, 0, 0], s, b].flat();
				(geo.attributes.position as import('three').BufferAttribute).set(verts);
				geo.attributes.position.needsUpdate = true;
				setArrow(THREE, aw, [0, 0, 0], w);
				setArrow(THREE, ac, [0, 0, 0], c);
			}
		};
	}
</script>

<p>
	The dot product turns two vectors into a number. The <strong class="text-slate-50">cross product</strong>, which only exists in 3D, turns two
	vectors into a <em>new vector</em>: one that is perpendicular to both.
</p>

<Callout kind="definition" title="Definition: cross product">
	<p>
		For <Tex tex={'\\mathbf a, \\mathbf b \\in \\mathbb{R}^3'} />,
		<Tex display tex={'\\mathbf a \\times \\mathbf b = (a_2 b_3 - a_3 b_2,\\; a_3 b_1 - a_1 b_3,\\; a_1 b_2 - a_2 b_1)'} />
	</p>
</Callout>

<Figure caption="Green u is fixed along x; red w turns in the xy-plane. The purple cross product points straight up (right-hand rule) and its length equals the yellow parallelogram's area.">
	<Scene3D {build} label="Cross product of two vectors" height={360} />
	{#snippet controls()}
		<Slider label="angle" bind:value={angleDeg} min={-170} max={170} step={5} display="{angleDeg}°" />
		<Slider label="‖w‖" bind:value={len} min={0.5} max={3} step={0.1} />
		<div class="grid w-full gap-x-6 font-mono text-sm sm:grid-cols-2">
			<span>‖u × w‖ = <span class="text-amber-300">{norm(c).toFixed(2)}</span></span>
			<span>(u × w) · u = {dot(c, u).toFixed(2)}, · w = {dot(c, w).toFixed(2)}</span>
		</div>
	{/snippet}
</Figure>

<h2>Three facts to remember</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><strong class="text-slate-50">Direction:</strong> <Tex tex={'\\mathbf a\\times\\mathbf b'} /> is perpendicular to both (the dots above are 0), pointing by the right-hand rule.</li>
	<li><strong class="text-slate-50">Size:</strong> <Tex tex={'\\|\\mathbf a\\times\\mathbf b\\| = \\|\\mathbf a\\|\\|\\mathbf b\\|\\sin\\theta'} /> is the area of the parallelogram they span. Parallel vectors give 0.</li>
	<li><strong class="text-slate-50">Order matters:</strong> <Tex tex={'\\mathbf b\\times\\mathbf a = -\\,\\mathbf a\\times\\mathbf b'} />.</li>
</ul>

<h2>A worked example</h2>
<p>
	For <Tex tex="(1,2,3)" /> and <Tex tex="(4,5,6)" />:
	<Tex display tex={'(2\\cdot6-3\\cdot5,\\; 3\\cdot4-1\\cdot6,\\; 1\\cdot5-2\\cdot4) = (-3,\\, 6,\\, -3)'} />
	Check: its dot product with <Tex tex="(1,2,3)" /> is <Tex tex="-3+12-9 = 0" />. ✓
</p>

<Callout kind="intuition">
	<p>
		The area-of-a-parallelogram idea is the seed of the <em>determinant</em> in chapter 7: the determinant is exactly "signed area or volume scaling".
	</p>
</Callout>

<Recap
	points={[
		'$\\mathbf a\\times\\mathbf b$ is perpendicular to both inputs, by the right-hand rule.',
		'Its length is the parallelogram area $\\|\\mathbf a\\|\\|\\mathbf b\\|\\sin\\theta$.',
		'It is anticommutative: swapping the inputs flips the sign.'
	]}
/>

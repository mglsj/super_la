<script lang="ts">
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, makePlane, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import { mulVec } from '#lib/math/mat.js';
	import { projectionMatrix } from '#lib/math/proj.js';
	import { cross, dot, sub } from '#lib/math/vec.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	// plane spanned by a1, a2 (columns of A)
	const a1 = [1, 0, 1];
	const a2 = [0, 1, 1];
	const A = [
		[1, 0],
		[0, 1],
		[1, 1]
	];
	const P = projectionMatrix(A)!;

	// not in the plane (the plane contains (1,2,3)), so the error is visible from the start
	let b = $state([1, 2, 1]);
	let p = $derived(mulVec(P, b));
	let e = $derived(sub(b, p));

	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		scene.add(makePlane(THREE, cross(a1, a2), 7, HEX.yellow));
		const ab = makeArrow(THREE, [0, 0, 0], b, HEX.kHat);
		const ap = makeArrow(THREE, [0, 0, 0], p, HEX.teal);
		const ae = makeArrow(THREE, p, b, HEX.jHat);
		scene.add(ab, ap, ae);
		return {
			update() {
				const pp = mulVec(P, b);
				setArrow(THREE, ab, [0, 0, 0], b);
				setArrow(THREE, ap, [0, 0, 0], pp);
				setArrow(THREE, ae, pp, b);
			}
		};
	}
</script>

<p>
	In chapter 1 you projected a vector onto a <em>line</em>. Now the target is a bigger flat set: a plane, or any subspace. The picture and the key fact stay the same.
</p>

<Callout kind="definition" title="Definition: orthogonal projection onto a subspace">
	<p>
		Let <Tex tex="W" /> be a subspace. The <em>projection</em> of <Tex tex={'\\mathbf b'} /> onto <Tex tex="W" /> is the unique vector <Tex tex={'\\mathbf p \\in W'} /> such that the error
		<Tex tex={'\\mathbf e = \\mathbf b - \\mathbf p'} /> is orthogonal to every vector in <Tex tex="W" />. It is the <strong class="text-slate-50">closest point of <Tex tex="W" /> to <Tex tex={'\\mathbf b'} /></strong>.
	</p>
</Callout>

<Figure caption="Yellow plane: W = span of (1,0,1) and (0,1,1). Blue: b. Teal: its projection p on the plane. Red: the error, standing perpendicular to the plane." max={660}>
	<Scene3D {build} label="Projection of a vector onto a plane" height={360} />
	{#snippet controls()}
		<Slider label="b₁" bind:value={b[0]} min={-3} max={3} step={0.25} />
		<Slider label="b₂" bind:value={b[1]} min={-3} max={3} step={0.25} />
		<Slider label="b₃" bind:value={b[2]} min={-3} max={3} step={0.25} />
		<span class="w-full text-center font-mono text-xs text-slate-200">
			p = ({p.map((x) => x.toFixed(2)).join(', ')}) · error·a₁ = {dot(e, a1).toFixed(2)}, error·a₂ = {dot(e, a2).toFixed(2)}
		</span>
	{/snippet}
</Figure>

<h2>The projection matrix</h2>
<Callout kind="theorem" title="Formula">
	<p>
		If the columns of <Tex tex="A" /> are a basis of <Tex tex="W" />, then
		<Tex display tex={'P = A(A^{\\mathsf T}A)^{-1}A^{\\mathsf T},\\qquad \\mathbf p = P\\mathbf b.'} />
		It satisfies <Tex tex={'P^2 = P'} /> (projecting twice does nothing new) and <Tex tex={'P^{\\mathsf T} = P'} />. With an orthonormal basis <Tex tex="Q" /> it simplifies to <Tex tex={'P = QQ^{\\mathsf T}'} />.
	</p>
</Callout>
<p>
	The next lesson shows where this formula comes from: the "perpendicular error" requirement turns into a small, solvable system.
</p>

<Recap
	points={[
		'The projection $\\mathbf p$ of $\\mathbf b$ onto $W$ is the point of $W$ with error $\\mathbf b-\\mathbf p\\perp W$.',
		'It is the closest point of $W$ to $\\mathbf b$.',
		'$P=A(A^{\\mathsf T}A)^{-1}A^{\\mathsf T}$, with $P^2=P$ and $P^{\\mathsf T}=P$; it is $QQ^{\\mathsf T}$ for an orthonormal basis.'
	]}
/>

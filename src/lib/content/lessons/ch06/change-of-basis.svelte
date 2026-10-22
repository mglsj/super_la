<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import { inverse, mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	// A: reflection across the line y = x, written in the standard basis
	const A: Mat = [
		[0, 1],
		[1, 0]
	];
	let b1 = $state([1, 1]);
	let b2 = $state([-1, 1]);

	let P = $derived<Mat>([
		[b1[0], b2[0]],
		[b1[1], b2[1]]
	]);
	let Pinv = $derived(inverse(P));
	let AB = $derived(Pinv ? mul(Pinv, mul(A, P)) : null);
	const apply = (v: number[]) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
	let simple = $derived(
		AB !== null && Math.abs(AB[0][1]) < 1e-6 && Math.abs(AB[1][0]) < 1e-6
	);
</script>

<p>
	A map does not care how you describe it, but its <em>matrix</em> does. Change the basis and the same map gets a different matrix. A clever basis can make that matrix beautiful.
</p>

<h2>One map, two descriptions</h2>
<p>
	Take the map <Tex tex="A" /> that reflects the plane across the line <Tex tex="y = x" />. In the standard basis its matrix is <Tex tex={'\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}'} />: it swaps the coordinates. Now use a basis adapted to the mirror:
	<Tex tex={'\\mathbf b_1 = (1,1)'} /> lies <em>on</em> the mirror (reflection leaves it alone) and <Tex tex={'\\mathbf b_2 = (-1,1)'} /> is <em>perpendicular</em> to it (reflection flips it). In that basis:
</p>
<Tex display tex={'[A]_B = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}.'} />

<Figure caption="Drag b₁ and b₂. Dashed arrows are A·b₁ and A·b₂. When b₁ is on the mirror and b₂ across it, the matrix in that basis becomes diagonal." max={620}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3} grid={false}>
		<TransformGrid matrix={P} basis={false} square={false} extent={8} />
		<Arrow to={apply(b1)} color={C.iHat} dashed width={2.5} opacity={0.8} />
		<Arrow to={apply(b2)} color={C.jHat} dashed width={2.5} opacity={0.8} />
		<DragVector bind:value={b1} color={C.iHat} label="b₁" snap={0.5} limit={3.5} />
		<DragVector bind:value={b2} color={C.jHat} label="b₂" snap={0.5} limit={3.5} />
	</Plane2D>
	{#snippet controls()}
		{#if AB}
			<Tex tex={'[A]_B = P^{-1}AP = ' + texMatrix(AB)} />
			<span class="w-full text-center text-sm {simple ? 'text-emerald-300' : 'text-slate-400'}">
				{simple ? 'Diagonal: this basis makes the map as simple as it can be.' : 'Not diagonal in this basis. Try b₁ = (1,1), b₂ = (-1,1).'}
			</span>
		{:else}
			<span class="text-sm text-rose-300">These vectors are parallel, so they are not a basis.</span>
		{/if}
	{/snippet}
</Figure>

<h2>The recipe</h2>
<Callout kind="theorem" title="Change of basis and similarity">
	<p>
		If <Tex tex="P" /> has the new basis vectors as columns, then the matrix of the same operator in the new basis is
		<Tex display tex={'[A]_B = P^{-1} A P.'} />
		Read it right to left: convert new coordinates to standard (<Tex tex="P" />), apply <Tex tex="A" />, convert back (<Tex tex={'P^{-1}'} />). Matrices related like this are called <strong class="text-slate-50">similar</strong>.
	</p>
</Callout>
<p>
	Similar matrices are the <em>same map in different coordinates</em>, so they share everything that does not depend on coordinates: rank, determinant, trace and eigenvalues. Finding a basis that makes the matrix diagonal is the goal of chapters 8 and 9.
</p>

<Recap
	points={[
		'The matrix of an operator depends on the basis; the operator does not.',
		'With basis matrix $P$: $[A]_B = P^{-1}AP$. Such matrices are **similar**.',
		'Similar matrices share rank, determinant, trace and eigenvalues. A good basis can make $A$ diagonal.'
	]}
/>

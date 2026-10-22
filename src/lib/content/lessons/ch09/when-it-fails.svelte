<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { eigen2 } from '#lib/math/eigen.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let delta = $state(0.6);
	let m = $derived([
		[1, 1],
		[0, 1 + delta]
	]);
	let ev = $derived(eigen2(m));
	let merged = $derived(ev.values.length === 1);
</script>

<p>
	Not every matrix can be diagonalised. Here is the classic obstruction, and it is geometric: the matrix simply does not have enough eigen-directions to form a basis.
</p>

<h2>The shear</h2>
<p>
	The shear <Tex tex={'S = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}'} /> has characteristic polynomial <Tex tex={'(\\lambda-1)^2'} />, so <Tex tex={'\\lambda = 1'} /> twice. But solving
	<Tex tex={'(S - I)\\mathbf v = \\mathbf 0'} /> gives <Tex tex={'\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}\\mathbf v = \\mathbf 0'} />, so only the multiples of <Tex tex="(1,0)" />. One eigen-line, but we need two.
</p>

<Figure caption="Matrix [[1,1],[0,1+δ]]. Its two eigen-lines (purple, green) squeeze together as δ → 0 and merge into one at δ = 0: the shear." max={620}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3} grid={false}>
		<TransformGrid matrix={m} basis={false} square={false} extent={10} />
		{#if ev.vectors[0]}<Line point={[0, 0]} dir={ev.vectors[0]} color={C.purple} width={3} />{/if}
		{#if ev.vectors[1]}<Line point={[0, 0]} dir={ev.vectors[1]} color={C.iHat} width={3} />{/if}
	</Plane2D>
	{#snippet controls()}
		<Slider label="δ" bind:value={delta} min={0} max={1.5} step={0.05} display={delta.toFixed(2)} />
		<span class="w-full text-center text-sm {merged ? 'text-rose-300' : 'text-emerald-300'}">
			{merged
				? 'δ = 0: the two eigenvalues coincide and the eigen-lines collapse into one. Not diagonalisable.'
				: `Eigenvalues 1 and ${(1 + delta).toFixed(2)}: two distinct eigen-lines, so diagonalisable.`}
		</span>
	{/snippet}
</Figure>

<h2>Two multiplicities</h2>
<Callout kind="definition" title="Algebraic vs geometric multiplicity">
	<p>
		For an eigenvalue <Tex tex={'\\lambda'} />, its <em>algebraic multiplicity</em> is how many times it is a root of the characteristic polynomial. Its <em>geometric multiplicity</em> is
		<Tex tex={'\\dim E_\\lambda'} />, the number of independent eigenvectors. Always <Tex tex={'1 \\le \\text{geometric} \\le \\text{algebraic}'} />.
	</p>
</Callout>
<Callout kind="theorem" title="The diagonalisability test">
	<p>
		<Tex tex="A" /> is diagonalisable (over <Tex tex={'\\mathbb{C}'} />) exactly when for <em>every</em> eigenvalue the geometric multiplicity equals the algebraic multiplicity. The shear has algebraic multiplicity 2 and geometric multiplicity 1, so it fails.
	</p>
</Callout>

<h2>What to do instead</h2>
<p>
	A defective matrix cannot be made diagonal, but it can still be made <em>almost</em> diagonal: eigenvalues on the diagonal and a few 1s just above it. That is the Jordan form, covered in the next chapter.
	In practice, nearly every matrix you meet from random data is diagonalisable, but near-defective ones (like <Tex tex={'\\delta = 0.05'} /> above) cause numerical trouble because their eigenvectors are almost parallel.
</p>

<Recap
	points={[
		'A matrix fails to diagonalise when it lacks $n$ independent eigenvectors, e.g. the shear.',
		'Diagonalisable ⇔ geometric multiplicity = algebraic multiplicity for every eigenvalue.',
		'Distinct eigenvalues are enough but not necessary; defective matrices lead to the Jordan form.'
	]}
/>

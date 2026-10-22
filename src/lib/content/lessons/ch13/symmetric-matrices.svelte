<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import { eigen2 } from '#lib/math/eigen.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let a = $state(3);
	let b = $state(1);
	let c = $state(2);
	let s = $state(0); // asymmetry: lower-left entry is b + s

	let A = $derived([
		[a, b],
		[b + s, c]
	]);
	let ev = $derived(eigen2(A));
	let ellipse = $derived(
		Array.from({ length: 80 }, (_, i) => {
			const t = (i / 80) * 2 * Math.PI;
			const x = Math.cos(t);
			const y = Math.sin(t);
			return [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y];
		})
	);
	let angle = $derived.by(() => {
		if (ev.vectors.length < 2) return null;
		const [u, v] = ev.vectors;
		return (Math.acos(Math.min(1, Math.abs(u[0] * v[0] + u[1] * v[1]))) * 180) / Math.PI;
	});
</script>

<p>
	In chapter 8 eigenvectors could point in any directions, even become complex. One class of matrices has none of that mess: the <strong class="text-slate-50">symmetric</strong> ones, with
	<Tex tex={'A = A^{\\mathsf T}'} />. They are everywhere (covariances, Hessians, graph Laplacians, <Tex tex={'A^{\\mathsf T}A'} />) and their theory is beautifully clean.
</p>

<Callout kind="theorem" title="The spectral theorem (real case)">
	<p>
		If <Tex tex="A" /> is a real symmetric matrix, then all its eigenvalues are <strong class="text-slate-50">real</strong>, and there is an <strong class="text-slate-50">orthonormal basis of eigenvectors</strong>. Equivalently
		<Tex display tex={'A = Q\\Lambda Q^{\\mathsf T}'} />
		with <Tex tex="Q" /> orthogonal (<Tex tex={'Q^{-1} = Q^{\\mathsf T}'} />) and <Tex tex={'\\Lambda'} /> diagonal.
	</p>
</Callout>

<h2>The picture: an ellipse with perpendicular axes</h2>
<p>
	Send the unit circle through <Tex tex="A" />. For a symmetric matrix, the resulting ellipse has its axes <em>exactly along the eigenvectors</em>, which are perpendicular. Now use the last slider to break the symmetry
	(<Tex tex={'A_{21} \\ne A_{12}'} />): the eigen-directions stop being perpendicular and no longer line up with the ellipse's axes.
</p>

<Figure caption="Purple lines: eigen-directions. At symmetry (asymmetry = 0) they are perpendicular and align with the ellipse's axes." max={620}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4}>
		<Polygon points={ellipse} fill={C.blue} fillOpacity={0.1} stroke={C.blue} width={2.5} />
		{#each ev.vectors as v, i (i)}
			<Line point={[0, 0]} dir={v} color={C.purple} width={3} />
		{/each}
	</Plane2D>
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={-3} max={4} step={0.5} />
		<Slider label="b" bind:value={b} min={-3} max={3} step={0.5} />
		<Slider label="c" bind:value={c} min={-3} max={4} step={0.5} />
		<Slider label="asym" bind:value={s} min={-2} max={2} step={0.5} />
		<span class="w-full text-center font-mono text-sm text-slate-200">
			{#if ev.complex}complex eigenvalues {ev.complex[0].toFixed(2)} ± {ev.complex[1].toFixed(2)}i{:else}λ = {ev.values.map((x) => x.toFixed(2)).join(', ')}{#if angle !== null}, angle between eigenvectors = <span class={Math.abs(angle - 90) < 0.5 ? 'text-emerald-300' : 'text-amber-300'}>{angle.toFixed(1)}°</span>{/if}{/if}
		</span>
	{/snippet}
</Figure>

<h2>Why eigenvectors must be perpendicular</h2>
<p>
	Let <Tex tex={'A\\mathbf u = \\lambda\\mathbf u'} /> and <Tex tex={'A\\mathbf v = \\mu\\mathbf v'} /> with <Tex tex={'\\lambda \\ne \\mu'} />. Using <Tex tex={'A = A^{\\mathsf T}'} />:
	<Tex display tex={'\\lambda\\,\\mathbf u\\cdot\\mathbf v = (A\\mathbf u)\\cdot\\mathbf v = \\mathbf u\\cdot(A\\mathbf v) = \\mu\\,\\mathbf u\\cdot\\mathbf v'} />
	so <Tex tex={'(\\lambda - \\mu)\\,\\mathbf u\\cdot\\mathbf v = 0'} />, hence <Tex tex={'\\mathbf u\\cdot\\mathbf v = 0'} />. Eigenvectors of different eigenvalues are orthogonal. (Repeated eigenvalues still leave room to choose an orthogonal basis inside the eigenspace.)
</p>

<Callout kind="intuition">
	<p>
		A symmetric matrix is the simplest kind of transformation: pure stretching along perpendicular axes, no rotation or shearing mixed in. Diagonalisation by an orthogonal <Tex tex="Q" /> is just "rotate to the right axes, stretch, rotate back".
	</p>
</Callout>

<Recap
	points={[
		'A real symmetric matrix has real eigenvalues and an **orthonormal eigenbasis**: $A=Q\\Lambda Q^{\\mathsf T}$.',
		'Eigenvectors for different eigenvalues are orthogonal: $\\lambda\\,\\mathbf u\\cdot\\mathbf v=\\mu\\,\\mathbf u\\cdot\\mathbf v$.',
		'Geometrically, symmetric matrices stretch along perpendicular axes: the circle becomes an ellipse with those axes.'
	]}
/>

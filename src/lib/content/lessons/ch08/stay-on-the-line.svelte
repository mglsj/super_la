<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { eigen2 } from '#lib/math/eigen.js';
	import { mulVec, type Mat } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Slider from '#lib/components/lesson/Slider.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[3, 1],
		[0, 2]
	]);
	let deg = $state(20);
	let showLines = $state(false);

	let v = $derived([Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)]);
	let av = $derived(mulVec(m, v));
	let cross = $derived(v[0] * av[1] - v[1] * av[0]);
	let aligned = $derived(Math.abs(cross) < 0.06);
	let ev = $derived(eigen2(m));
	const circle = Array.from({ length: 64 }, (_, i) => [Math.cos((i / 64) * 2 * Math.PI), Math.sin((i / 64) * 2 * Math.PI)]);
</script>

<p>
	A matrix turns most vectors: the output points in a different direction from the input. But some special directions survive. A vector along such a direction is only
	<em>stretched or flipped</em>, never turned. These are the <strong class="text-slate-50">eigenvectors</strong>, and they are the secret skeleton of a matrix.
</p>

<Callout kind="definition" title="Definition: eigenvector and eigenvalue">
	<p>
		A nonzero vector <Tex tex={'\\mathbf v'} /> is an <em>eigenvector</em> of <Tex tex="A" /> with <em>eigenvalue</em> <Tex tex={'\\lambda'} /> if
		<Tex display tex={'A\\mathbf v = \\lambda\\mathbf v.'} />
		The map just scales <Tex tex={'\\mathbf v'} /> by <Tex tex={'\\lambda'} />: stretch if <Tex tex={'|\\lambda|>1'} />, shrink if <Tex tex={'|\\lambda|<1'} />, flip if <Tex tex={'\\lambda<0'} />.
	</p>
</Callout>

<h2>Hunt for them</h2>
<p>
	The blue arrow is a unit vector <Tex tex={'\\mathbf v'} /> that you can rotate; the orange arrow is <Tex tex={'A\\mathbf v'} />. Sweep the angle slowly and watch for the moments when
	orange lies <em>along</em> blue. That happens exactly at an eigenvector.
</p>

<Figure caption="The meter is the 2D cross product v × Av: it is zero exactly when Av is parallel to v." max={620}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4}>
		<Polygon points={circle} fill={C.blue} fillOpacity={0.05} stroke={C.blue} width={1} />
		{#if showLines}
			{#each ev.vectors as e, i (i)}
				<Line point={[0, 0]} dir={e} color={C.purple} width={2} dashed opacity={0.9} />
			{/each}
		{/if}
		<Arrow to={av} color={C.orange} label="Av" />
		<Arrow to={v} color={C.blue} width={4} label="v" />
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#snippet controls()}
		<Slider label="angle" bind:value={deg} min={0} max={360} step={1} display="{deg}°" />
		<label class="flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={showLines} /> show eigen-lines</label>
		<span class="w-full text-center font-mono text-sm {aligned ? 'text-emerald-300' : 'text-slate-300'}">
			v × Av = {cross.toFixed(2)}{aligned ? '   ← an eigenvector! Av = ' + (Math.abs(v[0]) > 0.3 ? (av[0] / v[0]).toFixed(2) : (av[1] / v[1]).toFixed(2)) + '·v' : ''}
		</span>
	{/snippet}
</Figure>

<p>
	For <Tex tex={'A = \\begin{bmatrix}3&1\\\\0&2\\end{bmatrix}'} /> you should find the directions <Tex tex="0°" /> (the x-axis, where <Tex tex={'A\\mathbf v = 3\\mathbf v'} />) and about <Tex tex="135°" /> (where <Tex tex={'A\\mathbf v = 2\\mathbf v'} />). The whole circle is mapped to an ellipse, but these two directions stay put.
</p>

<Callout kind="theorem" title="Eigenvectors form lines and subspaces">
	<p>
		If <Tex tex={'\\mathbf v'} /> is an eigenvector, so is every nonzero multiple <Tex tex={'c\\mathbf v'} />. For a given <Tex tex={'\\lambda'} />, all eigenvectors together with <Tex tex={'\\mathbf 0'} /> form a subspace, the
		<em>eigenspace</em> <Tex tex={'E_\\lambda = \\ker(A - \\lambda I)'} />. Eigenvectors for <em>different</em> eigenvalues are always independent.
	</p>
</Callout>

<Callout kind="intuition">
	<p>
		Eigenvectors tell you where a transformation is "simple": along those directions it is just multiplication by a number. If you can describe space using eigenvectors as your basis, the matrix becomes diagonal, and that is chapter 9.
	</p>
</Callout>

<Recap
	points={[
		'$A\\mathbf v=\\lambda\\mathbf v$ with $\\mathbf v\\ne\\mathbf 0$: $\\mathbf v$ is an **eigenvector**, $\\lambda$ its **eigenvalue**.',
		'Eigenvectors keep their direction (up to a flip); $\\lambda$ is the stretch factor.',
		'Eigenvectors of distinct eigenvalues are independent; each eigenspace is $\\ker(A-\\lambda I)$.'
	]}
/>

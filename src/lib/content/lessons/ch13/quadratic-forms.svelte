<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import { eigSym } from '#lib/math/decomp.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let a = $state(3);
	let b = $state(1);
	let c = $state(2);
	let deg = $state(30);

	let A = $derived([
		[a, b],
		[b, c]
	]);
	let ev = $derived(eigSym(A));
	const form = (M: number[][], t: number) => {
		const x = Math.cos(t);
		const y = Math.sin(t);
		return M[0][0] * x * x + 2 * M[0][1] * x * y + M[1][1] * y * y;
	};
	let t = $derived((deg * Math.PI) / 180);
	let R = $derived(form(A, t));
	const circle = Array.from({ length: 64 }, (_, i) => [Math.cos((i / 64) * 2 * Math.PI), Math.sin((i / 64) * 2 * Math.PI)]);
</script>

<p>
	A symmetric matrix defines a function of a vector, its <strong class="text-slate-50">quadratic form</strong>:
</p>
<Tex display tex={'q(\\mathbf x) = \\mathbf x^{\\mathsf T}A\\mathbf x = a x_1^2 + 2b\\,x_1x_2 + c\\,x_2^2.'} />
<p>
	Where does <Tex tex={'q'} /> take its largest and smallest values on the unit circle? The spectral theorem answers it completely.
</p>

<h2>Sweep around the circle</h2>
<Figure caption="Left: the unit vector x. Right: q(x) as the angle varies, with the largest and smallest eigenvalue as horizontal lines. The extremes occur exactly at eigenvectors." max={900}>
	<div class="grid gap-3 sm:grid-cols-2">
		<Plane2D xmin={-1.6} xmax={1.6} ymin={-1.6} ymax={1.6}>
			<Polygon points={circle} fill={C.blue} fillOpacity={0.05} stroke={C.blue} width={1.5} />
			{#each [0, 1] as i (i)}
				<Line point={[0, 0]} dir={[ev.vectors[0][i], ev.vectors[1][i]]} color={C.purple} width={2.5} dashed />
			{/each}
			<Arrow to={[Math.cos(t), Math.sin(t)]} color={C.yellow} label="x" />
		</Plane2D>
		<Plane2D xmin={-0.5} xmax={7} ymin={-3} ymax={5} ticks={false}>
			<Curve fn={(th) => form(A, th)} from={0} to={2 * Math.PI} color={C.teal} width={3} />
			<Line a={[-0.5, ev.values[0]]} b={[7, ev.values[0]]} color={C.jHat} dashed width={1.8} />
			<Line a={[-0.5, ev.values[1]]} b={[7, ev.values[1]]} color={C.iHat} dashed width={1.8} />
			<Dot at={[t, R]} color={C.yellow} r={7} />
		</Plane2D>
	</div>
	{#snippet controls()}
		<Slider label="angle" bind:value={deg} min={0} max={360} step={5} display="{deg}°" />
		<Slider label="a" bind:value={a} min={-2} max={4} step={0.5} />
		<Slider label="b" bind:value={b} min={-2} max={3} step={0.5} />
		<Slider label="c" bind:value={c} min={-2} max={4} step={0.5} />
		<span class="w-full text-center font-mono text-sm text-slate-100">
			q(x) = <span class="text-amber-300">{R.toFixed(2)}</span> · λmax = {ev.values[0].toFixed(2)}, λmin = {ev.values[1].toFixed(2)}
		</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Rayleigh quotient">
	<p>
		For symmetric <Tex tex="A" /> with eigenvalues <Tex tex={'\\lambda_1 \\ge \\dots \\ge \\lambda_n'} />, the <em>Rayleigh quotient</em> <Tex tex={'\\dfrac{\\mathbf x^{\\mathsf T}A\\mathbf x}{\\mathbf x^{\\mathsf T}\\mathbf x}'} /> always lies between
		<Tex tex={'\\lambda_n'} /> and <Tex tex={'\\lambda_1'} />, and the extremes are attained exactly at the corresponding eigenvectors.
	</p>
</Callout>
<p>
	Proof sketch: write <Tex tex={'\\mathbf x = \\sum c_i\\mathbf q_i'} />. Then <Tex tex={'\\mathbf x^{\\mathsf T}A\\mathbf x = \\sum \\lambda_i c_i^2'} /> with <Tex tex={'\\sum c_i^2 = 1'} />: a weighted average of the eigenvalues, so it cannot exceed the biggest or drop below the smallest.
</p>

<Callout kind="intuition">
	<p>
		This is why the top eigenvector of a covariance matrix is the direction of greatest variance (PCA), and why the smallest eigenvalue of a Hessian tells you the flattest direction of a landscape.
	</p>
</Callout>

<Recap
	points={[
		'$q(\\mathbf x)=\\mathbf x^{\\mathsf T}A\\mathbf x$ is the quadratic form of a symmetric matrix.',
		'On the unit circle it ranges between $\\lambda_{\\min}$ and $\\lambda_{\\max}$, reached at eigenvectors.',
		'In the eigenbasis $q=\\sum\\lambda_ic_i^2$: a weighted average of the eigenvalues.'
	]}
/>

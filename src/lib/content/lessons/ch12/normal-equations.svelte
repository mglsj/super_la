<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { leastSquares } from '#lib/math/proj.js';
	import { mul, mulVec, transpose } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	// fit y = x0 + x1 t through t = 0, 1, 2
	const A = [
		[1, 0],
		[1, 1],
		[1, 2]
	];
	let b = $state([1, 2, 2]);
	let xhat = $derived(leastSquares(A, b)!);
	let p = $derived(mulVec(A, xhat));
	let e = $derived(b.map((x, i) => x - p[i]));
	let AtA = $derived(mul(transpose(A), A));
	let Atb = $derived(mulVec(transpose(A), b));
	let Ate = $derived(mulVec(transpose(A), e));
</script>

<p>
	Real data rarely fits perfectly. When <Tex tex={'A\\mathbf x = \\mathbf b'} /> has no solution (more equations than unknowns), we settle for the best compromise: the <Tex tex={'\\hat{\\mathbf x}'} /> that makes
	<Tex tex={'A\\hat{\\mathbf x}'} /> as close to <Tex tex={'\\mathbf b'} /> as possible.
</p>

<h2>Closest means perpendicular</h2>
<p>
	The outputs <Tex tex={'A\\mathbf x'} /> fill the column space <Tex tex={'C(A)'} />. The closest one to <Tex tex={'\\mathbf b'} /> is the projection <Tex tex={'\\mathbf p = A\\hat{\\mathbf x}'} />, and the error <Tex tex={'\\mathbf e = \\mathbf b - A\\hat{\\mathbf x}'} /> must be perpendicular to every column of <Tex tex="A" />.
	That is one equation per column:
</p>
<Tex display tex={'A^{\\mathsf T}(\\mathbf b - A\\hat{\\mathbf x}) = \\mathbf 0 \\quad\\Longrightarrow\\quad A^{\\mathsf T}A\\,\\hat{\\mathbf x} = A^{\\mathsf T}\\mathbf b.'} />

<Callout kind="theorem" title="The normal equations">
	<p>
		The least-squares solutions of <Tex tex={'A\\mathbf x\\approx\\mathbf b'} /> are exactly the solutions of <Tex tex={'A^{\\mathsf T}A\\hat{\\mathbf x} = A^{\\mathsf T}\\mathbf b'} />. If the columns of <Tex tex="A" /> are independent, <Tex tex={'A^{\\mathsf T}A'} /> is invertible and
		<Tex tex={'\\hat{\\mathbf x} = (A^{\\mathsf T}A)^{-1}A^{\\mathsf T}\\mathbf b'} />.
	</p>
</Callout>

<h2>A worked example, live</h2>
<p>
	Fit a line <Tex tex={'y = x_0 + x_1 t'} /> through three measurements at <Tex tex={'t = 0, 1, 2'} />. The unknowns are the intercept and slope; the three equations are in general inconsistent. Move the measurements and watch the line and the numbers.
</p>

<Figure caption="Yellow dots: your data b. The red line is the least-squares fit; the small red segments are the errors." max={620}>
	<Plane2D xmin={-1} xmax={4} ymin={-1} ymax={4}>
		<Line point={[0, xhat[0]]} dir={[1, xhat[1]]} color={C.jHat} width={3} />
		{#each b as y, i (i)}
			<Line a={[i, y]} b={[i, p[i]]} color={C.orange} width={2.5} dashed />
			<Dot at={[i, y]} color={C.yellow} r={6} />
			<Dot at={[i, p[i]]} color={C.teal} r={4} />
		{/each}
	</Plane2D>
	{#snippet controls()}
		<Slider label="b₀" bind:value={b[0]} min={-1} max={4} step={0.25} />
		<Slider label="b₁" bind:value={b[1]} min={-1} max={4} step={0.25} />
		<Slider label="b₂" bind:value={b[2]} min={-1} max={4} step={0.25} />
	{/snippet}
</Figure>

<Tex display tex={'A^{\\mathsf T}A = ' + texMatrix(AtA) + ',\\quad A^{\\mathsf T}\\mathbf b = ' + texMatrix(Atb.map((x) => [x])) + ',\\quad \\hat{\\mathbf x} = ' + texMatrix(xhat.map((x) => [x]))} />
<p class="text-center text-sm text-slate-300">
	Check: <Tex tex={'A^{\\mathsf T}\\mathbf e'} /> = ({Ate.map((x) => x.toFixed(2)).join(', ')}), zero up to rounding, so the error is perpendicular to both columns of <Tex tex="A" />.
</p>

<Callout kind="intuition">
	<p>
		With the default data <Tex tex={'\\mathbf b = (1,2,2)'} /> the normal equations are <Tex tex={'3x_0 + 3x_1 = 5,\\ 3x_0 + 5x_1 = 6'} />, giving <Tex tex={'x_1 = 1/2'} /> and <Tex tex={'x_0 = 7/6'} />. The line has slope one half and starts a little above 1.
		"Least squares" refers to what the method minimises: <Tex tex={'\\|\\mathbf e\\|^2'} />, the sum of squared errors.
	</p>
</Callout>

<Recap
	points={[
		'When $A\\mathbf x=\\mathbf b$ is unsolvable, minimise $\\|\\mathbf b-A\\mathbf x\\|^2$.',
		'The best $\\hat{\\mathbf x}$ makes the error perpendicular to $C(A)$: $A^{\\mathsf T}A\\hat{\\mathbf x}=A^{\\mathsf T}\\mathbf b$.',
		'$A\\hat{\\mathbf x}$ is the projection of $\\mathbf b$ onto the column space.'
	]}
/>

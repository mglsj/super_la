<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragPoint from '#lib/viz/DragPoint.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { fitLine } from '#lib/math/proj.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	const start = (): number[][] => [
		[-3, -1.5],
		[-1, 0],
		[0.5, 1.5],
		[2, 1],
		[3.5, 3]
	];
	let pts = $state<number[][]>(start());

	let fit = $derived(fitLine(pts.map((p) => [p[0], p[1]] as [number, number])));
	let sse = $derived(fit ? pts.reduce((s, [x, y]) => s + (y - (fit.m * x + fit.c)) ** 2, 0) : 0);
	function add() {
		if (pts.length < 12) pts.push([Math.round((Math.random() * 8 - 4) * 2) / 2, Math.round((Math.random() * 6 - 3) * 2) / 2]);
	}
</script>

<p>
	This is the most used idea in applied mathematics, and you already know all the pieces. Given points <Tex tex={'(t_i, y_i)'} />, which line <Tex tex={'y = c + mt'} /> comes closest to them all?
</p>

<h2>Set it up as linear algebra</h2>
<p>
	Each point wants <Tex tex={'c + m t_i = y_i'} />. Stacking them gives
	<Tex display tex={'\\underbrace{\\begin{bmatrix}1 & t_1\\\\ 1 & t_2\\\\ \\vdots & \\vdots\\\\ 1 & t_n\\end{bmatrix}}_{A}\\begin{pmatrix}c\\\\m\\end{pmatrix} = \\underbrace{\\begin{pmatrix}y_1\\\\y_2\\\\\\vdots\\\\y_n\\end{pmatrix}}_{\\mathbf y}'} />
	which has no exact solution if the points are not collinear. The least-squares answer solves <Tex tex={'A^{\\mathsf T}A\\hat{\\mathbf x} = A^{\\mathsf T}\\mathbf y'} /> and minimises the sum of squared vertical errors.
</p>

<h2>Play with it</h2>
<p>
	Drag the dots. The red line is the fit; the dashed orange segments are the residuals. Try moving a single point far away to see how strongly outliers pull on a squared-error fit.
</p>

<Figure caption="The fit line always passes through the average point of the data, and the residuals add up to zero." max={640}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4}>
		{#if fit}
			<Line point={[0, fit.c]} dir={[1, fit.m]} color={C.jHat} width={3.5} />
			{#each pts as p, i (i)}
				<Line a={[p[0], p[1]]} b={[p[0], fit.m * p[0] + fit.c]} color={C.orange} width={2} dashed />
			{/each}
		{/if}
		{#each pts as _, i (i)}
			<DragPoint bind:value={pts[i]} color={C.yellow} snap={0.25} limit={4.5} name="data point {i + 1}" />
		{/each}
	</Plane2D>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-2">
			<button class="mbtn mbtn-green" onclick={add}>+ point</button>
			<button class="mbtn mbtn-blue" disabled={pts.length <= 2} onclick={() => pts.pop()}>− point</button>
			<button class="mbtn mbtn-yellow" onclick={() => (pts = start())}>Reset</button>
		</div>
		{#if fit}
			<span class="w-full text-center font-mono text-sm text-slate-100">
				y = {fit.m.toFixed(3)}·x + {fit.c.toFixed(3)} · sum of squared errors = <span class="text-amber-300">{sse.toFixed(3)}</span>
			</span>
		{:else}
			<span class="w-full text-center text-sm text-amber-300">All points share the same x: no unique non-vertical line.</span>
		{/if}
	{/snippet}
</Figure>

<Callout kind="theorem" title="Closed form">
	<p>
		With <Tex tex={'\\bar t'} /> and <Tex tex={'\\bar y'} /> the averages, the slope and intercept are
		<Tex display tex={'m = \\frac{\\sum (t_i - \\bar t)(y_i - \\bar y)}{\\sum (t_i - \\bar t)^2},\\qquad c = \\bar y - m\\bar t.'} />
		This is what the normal equations simplify to. The fit is unique as long as at least two distinct <Tex tex={'t_i'} /> values appear.
	</p>
</Callout>

<Callout kind="intuition">
	<p>
		You can fit curves too: for a parabola use columns <Tex tex={'1, t, t^2'} />. The model only has to be <em>linear in the unknown coefficients</em>, not in <Tex tex="t" />. The geometry stays identical: project the data vector onto the column space.
	</p>
</Callout>

<Recap
	points={[
		'Fitting $y=c+mt$ is least squares on $A=[\\mathbf 1\\ \\mathbf t]$: solve $A^{\\mathsf T}A\\hat{\\mathbf x}=A^{\\mathsf T}\\mathbf y$.',
		'The line minimises the sum of squared vertical errors; the residuals are perpendicular to the columns of $A$.',
		'Any model linear in its coefficients (polynomials, sines and cosines) works the same way.'
	]}
/>

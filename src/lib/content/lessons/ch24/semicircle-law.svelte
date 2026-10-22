<script lang="ts">
	import Bars from '#lib/viz/Bars.svelte';
	import { eigSym } from '#lib/math/decomp.js';
	import { gaussian, mulberry32 } from '#lib/math/rng.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let n = $state(40);
	let seed = $state(1);

	let values = $derived.by(() => {
		const g = gaussian(mulberry32(1000 + seed));
		const G = Array.from({ length: n }, () => Array.from({ length: n }, () => g()));
		const W = G.map((row, i) => row.map((x, j) => (x + G[j][i]) / Math.sqrt(2 * n)));
		return eigSym(W).values;
	});
	const lo = -3;
	const hi = 3;
	const bins = 30;
	const bw = (hi - lo) / bins;
	let hist = $derived.by(() => {
		const c = new Array(bins).fill(0);
		for (const v of values) {
			const b = Math.floor((v - lo) / bw);
			if (b >= 0 && b < bins) c[b]++;
		}
		return c.map((x) => x / (n * bw));
	});
	const semi = (x: number) => (Math.abs(x) <= 2 ? Math.sqrt(4 - x * x) / (2 * Math.PI) : 0);
	let overlay = $derived(Array.from({ length: bins }, (_, i) => semi(lo + (i + 0.5) * bw)));
	let extremes = $derived([Math.min(...values), Math.max(...values)]);
</script>

<p>
	Take a huge matrix and fill it with random numbers. You might expect the eigenvalues to be a mess. Instead, as the matrix grows, their distribution settles into a <em>perfectly deterministic shape</em>. This is one of the most surprising facts in mathematics, and it shows up in physics, statistics and machine learning.
</p>

<h2>The experiment</h2>
<p>
	Build <Tex tex={'W = (G + G^{\\mathsf T})/\\sqrt{2n}'} /> from an <Tex tex={'n\\times n'} /> Gaussian matrix <Tex tex="G" />. This is a random symmetric matrix (a <em>Gaussian orthogonal ensemble</em>), so by the spectral theorem its eigenvalues are real. Histogram them.
</p>

<Figure caption="Bars: histogram of the eigenvalues of one random symmetric matrix. Yellow curve: the semicircle density. Increase n and the match tightens; re-draw to see that it is not a fluke of one sample." max={700}>
	<Bars values={hist} labels={hist.map((_, i) => (lo + (i + 0.5) * bw).toFixed(1))} overlay={overlay} max={0.4} height={190} color="#58c4dd" label="Eigenvalue histogram versus the semicircle law" />
	{#snippet controls()}
		<Slider label="size n" bind:value={n} min={10} max={80} step={10} display={String(n)} />
		<button class="mbtn mbtn-yellow" onclick={() => (seed += 1)}>New random matrix</button>
		<span class="w-full text-center font-mono text-sm text-slate-200">eigenvalues in [{extremes[0].toFixed(2)}, {extremes[1].toFixed(2)}] (semicircle edge at ±2)</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Wigner's semicircle law">
	<p>
		If <Tex tex="W" /> is <Tex tex={'n\\times n'} /> symmetric with independent entries of mean 0 and variance <Tex tex={'1/n'} /> (off the diagonal), then as <Tex tex="n\\to\\infty" /> the empirical distribution of its eigenvalues converges to the semicircle density
		<Tex display tex={'\\rho(x) = \\frac{1}{2\\pi}\\sqrt{4 - x^2},\\qquad |x|\\le2.'} />
		The result is <em>universal</em>: it does not depend on the entry distribution (Gaussian, ±1, uniform, ...), only on the variance.
	</p>
</Callout>

<h2>Why you can see it coming</h2>
<p>
	The trace gives a free consistency check. The average of the eigenvalues is <Tex tex={'\\tfrac1n\\operatorname{tr}W \\approx 0'} /> (diagonal entries have mean zero) and the average of their squares is <Tex tex={'\\tfrac1n\\operatorname{tr}(W^2) = \\tfrac1n\\sum_{ij}W_{ij}^2 \\approx n\\cdot\\tfrac1n = 1'} />: a variance of 1. The semicircle on <Tex tex={'[-2,2]'} /> has exactly variance 1. Higher moments produce Catalan numbers, which is how the law is proved.
</p>

<Callout kind="intuition">
	<p>
		The scale matters: for a random matrix with entries of size 1 (not <Tex tex={'1/\\sqrt n'} />) the spectral radius is about <Tex tex={'2\\sqrt n'} />, so typical random matrices have a largest singular value that grows like <Tex tex={'\\sqrt n'} />. Eigenvalues also <em>repel</em> each other: unlike independent random points, they almost never cluster, which is visible as a smooth profile with sharp edges.
	</p>
</Callout>

<Recap
	points={[
		'A large random symmetric matrix has real eigenvalues that follow the **semicircle law** on $[-2,2]$ when entries have variance $1/n$.',
		'The law is **universal**: only the entry variance matters, not the distribution.',
		'Checks: mean eigenvalue $\\approx0$ and mean square $\\approx1$ come directly from the trace.'
	]}
/>

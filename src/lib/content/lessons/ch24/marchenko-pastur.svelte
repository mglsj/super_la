<script lang="ts">
	import Bars from '#lib/viz/Bars.svelte';
	import { eigSym } from '#lib/math/decomp.js';
	import { gaussian, mulberry32 } from '#lib/math/rng.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const n = 40; // number of variables
	let ratio = $state(0.25); // c = n / m
	let seed = $state(1);

	let m = $derived(Math.round(n / ratio));
	let values = $derived.by(() => {
		const g = gaussian(mulberry32(5000 + seed));
		// X is m x n with N(0,1) entries; S = X^T X / m is the sample covariance
		const X = Array.from({ length: m }, () => Array.from({ length: n }, () => g()));
		const S = Array.from({ length: n }, (_, i) =>
			Array.from({ length: n }, (_, j) => {
				let s = 0;
				for (let t = 0; t < m; t++) s += X[t][i] * X[t][j];
				return s / m;
			})
		);
		return eigSym(S).values;
	});

	const lo = 0;
	const hi = 4.5;
	const bins = 30;
	const bw = (hi - lo) / bins;
	let a = $derived((1 - Math.sqrt(ratio)) ** 2);
	let b = $derived((1 + Math.sqrt(ratio)) ** 2);
	let hist = $derived.by(() => {
		const c = new Array(bins).fill(0);
		for (const v of values) {
			const k = Math.floor((v - lo) / bw);
			if (k >= 0 && k < bins) c[k]++;
		}
		return c.map((x) => x / (n * bw));
	});
	let overlay = $derived(
		Array.from({ length: bins }, (_, i) => {
			const x = lo + (i + 0.5) * bw;
			return x > a && x < b ? Math.sqrt((b - x) * (x - a)) / (2 * Math.PI * ratio * x) : 0;
		})
	);
</script>

<p>
	The previous lesson was about <em>square symmetric</em> random matrices. In statistics you meet random <em>rectangular</em> data matrices: <Tex tex="m" /> samples of <Tex tex="n" /> variables. The eigenvalues of the sample covariance matrix have their own universal shape.
</p>

<Callout kind="theorem" title="The Marchenko–Pastur law">
	<p>
		Let <Tex tex="X" /> be <Tex tex={'m\\times n'} /> with independent entries of mean 0 and variance 1, and let <Tex tex={'S = \\tfrac1m X^{\\mathsf T}X'} /> be the sample covariance. If <Tex tex={'n/m \\to c \\in (0,1]'} />, the eigenvalues of <Tex tex="S" /> fill the interval
		<Tex display tex={'\\left[(1-\\sqrt c)^2,\\ (1+\\sqrt c)^2\\right]'} />
		with density <Tex tex={'\\dfrac{\\sqrt{(b-x)(x-a)}}{2\\pi c\\,x}'} />. (The true covariance is the identity, with every eigenvalue equal to 1.)
	</p>
</Callout>

<h2>Sample covariance is not the truth</h2>
<p>
	The true covariance here is exactly the identity, so every eigenvalue <em>should</em> be 1. But with a finite sample the estimated eigenvalues spread out over an interval, and the spread is governed by the aspect ratio <Tex tex={'c = n/m'} />. Slide <Tex tex="c" /> and watch.
</p>

<Figure caption="Bars: eigenvalues of the sample covariance of n = 40 variables with m = n/c samples. Yellow: Marchenko–Pastur. When c is near 1 the smallest eigenvalues approach zero." max={700}>
	<Bars values={hist} labels={hist.map((_, i) => (lo + (i + 0.5) * bw).toFixed(1))} overlay={overlay} max={Math.max(1.2, ...hist) * 1.1} height={190} color="#fc6255" label="Sample covariance eigenvalues versus Marchenko–Pastur" />
	{#snippet controls()}
		<Slider label="c = n/m" bind:value={ratio} min={0.1} max={0.9} step={0.05} display={ratio.toFixed(2)} />
		<button class="mbtn mbtn-yellow" onclick={() => (seed += 1)}>New sample</button>
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>samples m = {m}, variables n = {n}</span>
			<span>support [{a.toFixed(2)}, {b.toFixed(2)}]</span>
			<span>observed: [{Math.min(...values).toFixed(2)}, {Math.max(...values).toFixed(2)}]</span>
			<span>condition number of S ≈ {(Math.max(...values) / Math.min(...values)).toFixed(1)}</span>
		</div>
	{/snippet}
</Figure>

<h2>Consequences</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><strong class="text-slate-50">Do not trust raw sample eigenvalues</strong> when <Tex tex="n" /> is comparable to <Tex tex="m" />: the largest are inflated, the smallest deflated. This is why finance and genomics use shrinkage or random-matrix-based cleaning.</li>
	<li><strong class="text-slate-50">Distinguishing signal from noise:</strong> an eigenvalue clearly above <Tex tex={'(1+\\sqrt c)^2'} /> is evidence of genuine structure; those inside the bulk are consistent with pure noise.</li>
	<li><strong class="text-slate-50">Conditioning of random matrices:</strong> a square Gaussian matrix has condition number growing like <Tex tex="n" /> (its smallest singular value is about <Tex tex={'1/\\sqrt n'} />), a fact behind the average-case behaviour of numerical algorithms.</li>
</ul>

<Recap
	points={[
		'The sample covariance of white noise has eigenvalues spread over $[(1-\\sqrt c)^2,(1+\\sqrt c)^2]$, with $c=n/m$.',
		'Marchenko–Pastur gives the exact density; the true value $1$ is smeared out when $n$ is comparable to $m$.',
		'Eigenvalues beyond the upper edge indicate signal; the bulk is noise.'
	]}
/>

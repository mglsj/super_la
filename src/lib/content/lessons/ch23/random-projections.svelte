<script lang="ts">
	import Bars from '#lib/viz/Bars.svelte';
	import { gaussian, mulberry32 } from '#lib/math/rng.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const n = 40;
	// a fixed vector in R^40
	const x = Array.from({ length: n }, (_, i) => Math.sin(i + 1) + 0.5);
	const xx = x.reduce((s, v) => s + v * v, 0);

	let k = $state(8);
	const draws = 400;

	// ratio ||G x||^2 / ||x||^2 with G a k x n matrix of N(0, 1/k) entries
	let ratios = $derived.by(() => {
		const out: number[] = [];
		const g = gaussian(mulberry32(2024));
		for (let d = 0; d < draws; d++) {
			let s = 0;
			for (let i = 0; i < k; i++) {
				let dotp = 0;
				for (let j = 0; j < n; j++) dotp += g() * x[j];
				s += (dotp * dotp) / k;
			}
			out.push(s / xx);
		}
		return out;
	});
	let mean = $derived(ratios.reduce((a, b) => a + b, 0) / ratios.length);
	let sd = $derived(Math.sqrt(ratios.reduce((a, b) => a + (b - mean) ** 2, 0) / ratios.length));
	const bins = 24;
	let hist = $derived.by(() => {
		const counts = new Array(bins).fill(0);
		for (const r of ratios) counts[Math.max(0, Math.min(bins - 1, Math.floor((r / 3) * bins)))]++;
		return counts.map((c) => c / draws);
	});
</script>

<p>
	Suppose a vector lives in 40 dimensions and you multiply it by a <em>random</em> matrix that maps to just <Tex tex="k" /> dimensions. Surprisingly, you barely lose information about its length. This is the seed of an entire field.
</p>

<Callout kind="theorem" title="Lengths are preserved on average">
	<p>
		Let <Tex tex="G" /> be a <Tex tex={'k\\times n'} /> matrix whose entries are independent <Tex tex={'N(0, 1/k)'} />. For any fixed vector <Tex tex={'\\mathbf x'} />,
		<Tex display tex={'\\mathbb{E}\\,\\|G\\mathbf x\\|^2 = \\|\\mathbf x\\|^2,\\qquad \\operatorname{Var}\\!\\left(\\frac{\\|G\\mathbf x\\|^2}{\\|\\mathbf x\\|^2}\\right) = \\frac{2}{k}.'} />
	</p>
</Callout>
<p>
	Why? Each entry of <Tex tex={'G\\mathbf x'} /> is a sum of independent Gaussians, so it is itself Gaussian with variance <Tex tex={'\\|\\mathbf x\\|^2/k'} />. Then <Tex tex={'\\|G\\mathbf x\\|^2'} /> is that variance times a sum of <Tex tex="k" /> squared standard normals (a chi-squared variable): its mean is right and its relative spread shrinks like <Tex tex={'\\sqrt{2/k}'} />.
</p>

<h2>Try it</h2>
<Figure caption="Each histogram bar counts how many of 400 random projections gave a given length ratio. Target: 1." max={680}>
	<Bars values={hist} labels={hist.map((_, i) => (((i + 0.5) * 3) / bins).toFixed(1))} max={0.3} height={170} color="#58c4dd" label="Distribution of the squared-length ratio" />
	{#snippet controls()}
		<Slider label="k" bind:value={k} min={1} max={60} step={1} display={String(k)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>mean ratio = <span class="text-amber-300">{mean.toFixed(3)}</span></span>
			<span>spread (sd) = {sd.toFixed(3)} · theory √(2/k) = {Math.sqrt(2 / k).toFixed(3)}</span>
		</div>
	{/snippet}
</Figure>

<p>
	With <Tex tex="k = 1" /> the ratio is wild (a single random direction can see almost nothing or a lot). By <Tex tex="k = 30" /> most projections lie within about 25% of the truth. And note that the answer does <em>not</em> depend on how large <Tex tex="n" /> is: crushing a million dimensions into 30 distorts a given vector no more than crushing 40.
</p>

<Callout kind="intuition">
	<p>
		In high dimensions "almost every direction is about equally uninformative about <Tex tex={'\\mathbf x'} /> in the same way", so a random sample of directions is representative. The projection is <em>oblivious</em>: it is chosen without ever looking at the data, which is what makes it so cheap and so widely applicable.
	</p>
</Callout>

<Recap
	points={[
		'A random Gaussian $G$ ($k\\times n$, entries $N(0,1/k)$) satisfies $\\mathbb{E}\\|G\\mathbf x\\|^2=\\|\\mathbf x\\|^2$.',
		'The relative spread of $\\|G\\mathbf x\\|^2$ is about $\\sqrt{2/k}$, independent of $n$.',
		'The projection is oblivious to the data, which is why sketching is cheap.'
	]}
/>

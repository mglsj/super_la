<script lang="ts">
	import Bars from '#lib/viz/Bars.svelte';
	import { gaussian, mulberry32 } from '#lib/math/rng.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const m = 20; // points
	const n = 200; // original dimension
	const g0 = gaussian(mulberry32(77));
	const pts: number[][] = Array.from({ length: m }, () => Array.from({ length: n }, () => g0()));

	let k = $state(20);

	let result = $derived.by(() => {
		const g = gaussian(mulberry32(5));
		const G = Array.from({ length: k }, () => Array.from({ length: n }, () => g() / Math.sqrt(k)));
		const Y = pts.map((p) => G.map((row) => row.reduce((s, v, j) => s + v * p[j], 0)));
		const ratios: number[] = [];
		for (let i = 0; i < m; i++) {
			for (let j = i + 1; j < m; j++) {
				let d0 = 0;
				let d1 = 0;
				for (let t = 0; t < n; t++) d0 += (pts[i][t] - pts[j][t]) ** 2;
				for (let t = 0; t < k; t++) d1 += (Y[i][t] - Y[j][t]) ** 2;
				ratios.push(Math.sqrt(d1 / d0));
			}
		}
		return ratios;
	});
	let lo = $derived(Math.min(...result));
	let hi = $derived(Math.max(...result));
	const bins = 24;
	let hist = $derived.by(() => {
		const c = new Array(bins).fill(0);
		for (const r of result) c[Math.max(0, Math.min(bins - 1, Math.floor(((r - 0.2) / 1.6) * bins)))]++;
		return c;
	});
	let eps = $derived(Math.max(hi - 1, 1 - lo));
	// k >= 8 ln(m) / eps^2 sufficient (a typical constant)
	let needed = $derived(Math.ceil((8 * Math.log(m)) / 0.5 ** 2));
</script>

<p>
	One random projection preserves the length of <em>one</em> vector. What about a whole data set at once? The Johnson–Lindenstrauss lemma says you can squeeze many points into surprisingly few dimensions and keep <em>all pairwise distances</em> nearly intact.
</p>

<Callout kind="theorem" title="Johnson–Lindenstrauss lemma">
	<p>
		For any <Tex tex="m" /> points in <Tex tex={'\\mathbb{R}^n'} /> and any <Tex tex={'0 < \\varepsilon < 1'} />, a random projection to <Tex tex={'k = O(\\varepsilon^{-2}\\log m)'} /> dimensions preserves every pairwise distance up to a factor <Tex tex={'1\\pm\\varepsilon'} />, with high probability. The target dimension depends on the <em>number of points</em> and the accuracy, but <strong class="text-slate-50">not on the original dimension</strong> <Tex tex="n" />.
	</p>
</Callout>

<h2>Distort 20 points</h2>
<p>
	The experiment: 20 random points in <Tex tex={'\\mathbb{R}^{200}'} />, projected to <Tex tex="k" /> dimensions. Each of the 190 pairs gives a ratio (new distance)/(old distance). Perfect preservation would put every ratio at 1.
</p>

<Figure caption="Histogram of the 190 pairwise distance ratios. The distribution tightens around 1 as k grows." max={680}>
	<Bars values={hist} labels={hist.map((_, i) => (0.2 + ((i + 0.5) * 1.6) / bins).toFixed(1))} height={170} color="#fbd000" label="Pairwise distance ratios after projection" format={(v) => String(v)} />
	{#snippet controls()}
		<Slider label="k" bind:value={k} min={2} max={150} step={2} display={String(k)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>smallest ratio {lo.toFixed(2)}, largest {hi.toFixed(2)}</span>
			<span>worst distortion ε ≈ <span class="text-amber-300">{eps.toFixed(2)}</span></span>
			<span class="font-sans text-slate-400 sm:col-span-2">Rule of thumb k ≈ 8 ln m / ε²: ε = 0.5 suggests k ≈ {needed} (rigorous constants are a bit larger); here n = 200, so it still saves dimensions.</span>
		</div>
	{/snippet}
</Figure>

<h2>Why it is useful</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><strong class="text-slate-50">Nearest-neighbour search:</strong> compare short projected vectors instead of huge ones.</li>
	<li><strong class="text-slate-50">Compressed learning:</strong> train on projected features with little loss.</li>
	<li><strong class="text-slate-50">Sketching:</strong> a random <Tex tex={'k\\times n'} /> matrix applied to a tall matrix preserves the geometry of its column space, so least squares can be solved on the small sketch (next lesson).</li>
</ul>

<Callout kind="intuition">
	<p>
		The union bound is the quiet hero: each pair fails with tiny probability (exponentially small in <Tex tex={'k\\varepsilon^2'} />), and there are only <Tex tex={'\\binom m2'} /> pairs, so a logarithmic number of dimensions is enough to survive all of them.
	</p>
</Callout>

<Recap
	points={[
		'JL: $k=O(\\varepsilon^{-2}\\log m)$ random dimensions preserve all pairwise distances of $m$ points to within $1\\pm\\varepsilon$.',
		'$k$ does not depend on the ambient dimension $n$.',
		'The proof is concentration for one vector plus a union bound over the pairs.'
	]}
/>

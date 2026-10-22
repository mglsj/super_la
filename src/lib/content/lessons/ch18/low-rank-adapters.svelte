<script lang="ts">
	import Heatmap from '#lib/viz/Heatmap.svelte';
	import { rank } from '#lib/math/gauss.js';
	import { gaussMatrix } from '#lib/math/rng.js';
	import { mul } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let logd = $state(12); // d = 2^logd
	let r = $state(8);
	let d = $derived(2 ** logd);
	let full = $derived(d * d);
	let lora = $derived(2 * d * r);

	let rr = $state(2);
	let Bm = $derived(gaussMatrix(10, rr, 5));
	let Am = $derived(gaussMatrix(rr, 10, 9));
	let BA = $derived(mul(Bm, Am));
	let rk = $derived(rank(BA));
	const fmt = (x: number) => (x >= 1e6 ? (x / 1e6).toFixed(1) + 'M' : x >= 1e3 ? (x / 1e3).toFixed(0) + 'k' : String(x));
</script>

<p>
	Large pretrained models have weight matrices <Tex tex="W" /> with millions of entries. To adapt such a model to a new task you want to change <Tex tex="W" /> a little, without storing or training a second copy of everything. The trick: the <em>change</em> is usually low rank.
</p>

<h2>The idea of LoRA</h2>
<Callout kind="theorem" title="Low-rank update">
	<p>
		Instead of learning a full update <Tex tex={'\\Delta W \\in \\mathbb{R}^{d\\times d}'} />, learn two thin matrices <Tex tex={'B \\in \\mathbb{R}^{d\\times r}'} /> and <Tex tex={'A \\in \\mathbb{R}^{r\\times d}'} /> with <Tex tex="r \ll d" /> and use
		<Tex display tex={'W_{\\text{new}} = W + BA.'} />
		The update <Tex tex="BA" /> has rank at most <Tex tex="r" />. It needs <Tex tex={'2dr'} /> numbers instead of <Tex tex={'d^2'} />.
	</p>
</Callout>

<h2>Count the savings</h2>
<Figure caption="Parameters for one d×d weight matrix: full update vs low-rank update." max={620}>
	{#snippet controls()}
		<Slider label="log₂ d" bind:value={logd} min={6} max={14} step={1} display={'d = ' + d} />
		<Slider label="rank r" bind:value={r} min={1} max={64} step={1} display={String(r)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>full update: {fmt(full)} numbers</span>
			<span class="text-emerald-300">low-rank: {fmt(lora)} numbers</span>
			<span class="font-sans text-slate-300 sm:col-span-2">
				That is <span class="text-amber-300">{((100 * lora) / full).toFixed(2)}%</span> of the parameters. Training needs optimiser state only for these.
			</span>
		</div>
	{/snippet}
	<div class="pbar gold" aria-hidden="true"><i style="width: {Math.min(100, (100 * lora) / full)}%"></i></div>
</Figure>

<h2>Rank is real</h2>
<p>
	Here <Tex tex="B" /> is <Tex tex={'10\\times r'} /> and <Tex tex="A" /> is <Tex tex={'r\\times10'} />, both random. The product is a <Tex tex={'10\\times10'} /> matrix, but however it looks, its rank (the dimension of its column space, chapter 4) is at most <Tex tex="r" />.
</p>
<Figure caption="The matrix BA looks busy but has very few independent columns." max={420}>
	<Heatmap matrix={BA} cell={30} numbers={false} />
	{#snippet controls()}
		<Slider label="r" bind:value={rr} min={1} max={6} step={1} display={String(rr)} />
		<span class="font-mono text-sm text-slate-100">rank(BA) = <span class="text-amber-300">{rk}</span></span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		Why would a useful fine-tuning update be low rank? Because adapting to a task often needs only a few new "directions" in feature space. The SVD view (chapter 15) says the same: most of the energy of the change sits in a handful of singular values. Eckart–Young then tells you that if you trained a full update, the best low-rank summary is its truncated SVD.
	</p>
</Callout>

<Recap
	points={[
		'LoRA learns $W+BA$ with thin $B$ ($d\\times r$) and $A$ ($r\\times d$): $2dr$ parameters instead of $d^2$.',
		'$\\operatorname{rank}(BA)\\le r$, however busy the entries look.',
		'It works because useful updates are approximately low rank (fast-decaying singular values).'
	]}
/>

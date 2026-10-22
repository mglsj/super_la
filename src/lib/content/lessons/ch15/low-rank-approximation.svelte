<script lang="ts">
	import Heatmap from '#lib/viz/Heatmap.svelte';
	import Bars from '#lib/viz/Bars.svelte';
	import { frob, lowRank, svd } from '#lib/math/decomp.js';
	import { mulberry32 } from '#lib/math/rng.js';
	import type { Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	// an 10x10 "image": a few smooth patterns plus a little noise
	const rand = mulberry32(11);
	const N = 10;
	const A: Mat = Array.from({ length: N }, (_, i) =>
		Array.from({ length: N }, (_, j) => {
			const smooth = 3 * Math.sin(((i + 1) * Math.PI) / (N + 1)) * Math.sin(((j + 1) * Math.PI) / (N + 1));
			const stripes = 1.2 * Math.cos(i * 0.9) * Math.cos(j * 0.5);
			const checker = 0.4 * (((i + j) % 2) * 2 - 1);
			return smooth + stripes + checker + 0.15 * (rand() - 0.5);
		})
	);
	const f = svd(A);
	let k = $state(2);
	let Ak = $derived(lowRank(A, k));
	let err = $derived(frob(A.map((r, i) => r.map((x, j) => x - Ak[i][j]))));
	let predicted = $derived(Math.sqrt(f.S.slice(k).reduce((s, x) => s + x * x, 0)));
	let kept = $derived(Math.round((100 * f.S.slice(0, k).reduce((s, x) => s + x * x, 0)) / f.S.reduce((s, x) => s + x * x, 0)));
</script>

<p>
	The SVD can be read as a sum of rank-one layers, ordered from most to least important:
</p>
<Tex display tex={'A = \\sigma_1\\mathbf u_1\\mathbf v_1^{\\mathsf T} + \\sigma_2\\mathbf u_2\\mathbf v_2^{\\mathsf T} + \\dots + \\sigma_r\\mathbf u_r\\mathbf v_r^{\\mathsf T}.'} />
<p>
	Keep only the first <Tex tex="k" /> layers and you get a matrix of rank <Tex tex="k" /> that stores far fewer numbers. How good is it?
</p>

<Callout kind="theorem" title="Eckart–Young">
	<p>
		Among <em>all</em> matrices of rank at most <Tex tex="k" />, the truncated SVD <Tex tex={'A_k = \\sum_{i\\le k}\\sigma_i\\mathbf u_i\\mathbf v_i^{\\mathsf T}'} /> is the closest to <Tex tex="A" />, and the error is
		<Tex display tex={'\\|A - A_k\\|_F = \\sqrt{\\sigma_{k+1}^2 + \\dots + \\sigma_r^2}, \\qquad \\|A - A_k\\|_2 = \\sigma_{k+1}.'} />
	</p>
</Callout>

<h2>Compress a 10×10 image</h2>
<Figure caption="Left: the original. Right: the best rank-k approximation. The bars show the singular values; most of the structure lives in the first few." max={700}>
	<div class="grid grid-cols-2 gap-4">
		<div><p class="font-pixel mb-1 text-center text-[9px] text-slate-400">ORIGINAL</p><Heatmap matrix={A} cell={28} range={4.5} /></div>
		<div><p class="font-pixel mb-1 text-center text-[9px] text-slate-400">RANK {k}</p><Heatmap matrix={Ak} cell={28} range={4.5} /></div>
	</div>
	<Bars values={f.S} labels={f.S.map((_, i) => 'σ' + (i + 1))} height={150} color="#b392d6" />
	{#snippet controls()}
		<Slider label="rank k" bind:value={k} min={0} max={10} step={1} display={String(k)} />
		<span class="font-mono text-sm text-slate-100">error = <span class="text-amber-300">{err.toFixed(3)}</span> (formula: {predicted.toFixed(3)})</span>
		<span class="font-mono text-sm text-slate-300">energy kept {kept}% · numbers stored {k * (2 * N + 1)} vs {N * N}</span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		Real data (images, ratings, text counts) usually has rapidly decaying singular values, so a small <Tex tex="k" /> already captures most of it. That is the principle behind image compression, recommender systems, latent semantic analysis and PCA.
		The "gap" in the bar chart tells you the matrix's effective rank.
	</p>
</Callout>

<Recap
	points={[
		'$A=\\sum\\sigma_i\\mathbf u_i\\mathbf v_i^{\\mathsf T}$; keeping the first $k$ terms gives $A_k$.',
		'**Eckart–Young:** $A_k$ is the best rank-$k$ approximation; the error is $\\sqrt{\\sigma_{k+1}^2+\\cdots}$ (Frobenius) or $\\sigma_{k+1}$ (spectral).',
		'Storage drops from $mn$ to $k(m+n+1)$ numbers. A fast-decaying spectrum means high compressibility.'
	]}
/>

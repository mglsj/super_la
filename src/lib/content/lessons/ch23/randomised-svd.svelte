<script lang="ts">
	import Bars from '#lib/viz/Bars.svelte';
	import { frob, lowRank } from '#lib/math/decomp.js';
	import { gaussMatrix, gaussian, mulberry32 } from '#lib/math/rng.js';
	import { gramSchmidt } from '#lib/math/vec.js';
	import { mul, transpose, type Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const m = 60;
	const n = 40;
	const rank0 = 30;
	// build A with orthonormal factors and singular values 0.6^i
	const U = transpose(gramSchmidt(transpose(gaussMatrix(m, rank0, 3))));
	const V = transpose(gramSchmidt(transpose(gaussMatrix(n, rank0, 4))));
	const sigma = Array.from({ length: rank0 }, (_, i) => 0.6 ** i * 10);
	const A: Mat = Array.from({ length: m }, (_, i) =>
		Array.from({ length: n }, (_, j) => sigma.reduce((s, sv, t) => s + sv * U[i][t] * V[j][t], 0))
	);

	let r = $state(6);
	let p = $state(4);

	let approx = $derived.by(() => {
		const g = gaussian(mulberry32(99));
		const l = Math.min(n, r + p);
		const Omega: Mat = Array.from({ length: n }, () => Array.from({ length: l }, () => g()));
		const Y = mul(A, Omega); // m x l sketch of the range of A
		const Q = transpose(gramSchmidt(transpose(Y))); // m x l' orthonormal
		const B = mul(transpose(Q), A); // small (r + p) x n matrix
		return mul(Q, lowRank(B, r)); // SVD of the small matrix, truncated to rank r
	});
	let errRand = $derived(frob(A.map((row, i) => row.map((x, j) => x - approx[i][j]))));
	let errBest = $derived(Math.sqrt(sigma.slice(r).reduce((s, x) => s + x * x, 0)));
	let errBestSketch = $derived(Math.sqrt(sigma.slice(Math.min(n, r + p)).reduce((s, x) => s + x * x, 0)));
</script>

<p>
	Computing an SVD of a huge matrix is expensive, but often you only want the top few singular triplets. Randomisation gives a shortcut: first <em>sketch</em> where the range of the matrix lives, then do the expensive work on a small matrix.
</p>

<h2>The recipe</h2>
<Callout kind="theorem" title="Randomised range finder and SVD">
	<ol class="list-decimal space-y-1 pl-6">
		<li>Draw a Gaussian test matrix <Tex tex={'\\Omega'} /> (<Tex tex={'n\\times(r+p)'} />, with a few extra columns <Tex tex="p" /> called <em>oversampling</em>).</li>
		<li>Form the sketch <Tex tex={'Y = A\\Omega'} /> and an orthonormal basis <Tex tex="Q" /> for its columns (QR, or Gram–Schmidt).</li>
		<li>Then <Tex tex={'A \\approx QQ^{\\mathsf T}A = QB'} /> with <Tex tex={'B = Q^{\\mathsf T}A'} /> small (<Tex tex={'(r+p)\\times n'} />). Take the SVD of <Tex tex="B" /> and multiply the left factor by <Tex tex="Q" />.</li>
	</ol>
	<p>The expected error is within a small factor of the optimal Eckart–Young error, provided the singular values decay.</p>
</Callout>

<h2>See how good it is</h2>
<p>
	The matrix here is 60×40 with singular values <Tex tex={'10\\cdot0.6^i'} /> (geometric decay). The bars show them. We approximate it with a randomised rank-<Tex tex="r" /> sketch of size <Tex tex="r+p" /> and compare with the best possible rank-<Tex tex="r" /> error.
</p>

<Figure caption="Singular values of A (bars) and the error of the randomised approximation compared with the optimal truncation." max={680}>
	<Bars values={sigma.slice(0, 20)} labels={sigma.slice(0, 20).map((_, i) => 'σ' + (i + 1))} height={150} color="#b392d6" label="Singular values of the test matrix" format={(v) => v.toFixed(1)} />
	{#snippet controls()}
		<Slider label="rank r" bind:value={r} min={1} max={15} step={1} display={String(r)} />
		<Slider label="oversample p" bind:value={p} min={0} max={15} step={1} display={String(p)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>randomised error: <span class="text-amber-300">{errRand.toFixed(4)}</span></span>
			<span>optimal rank-{r}: {errBest.toFixed(4)}</span>
			<span class="font-sans text-slate-400 sm:col-span-2">The randomised error can never beat the optimal one. It gets closer as oversampling grows (try p = 0, then p = 10). The sketch itself has {Math.min(n, r + p)} columns; the best rank-{Math.min(n, r + p)} error would be {errBestSketch.toFixed(4)}.</span>
		</div>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		The random matrix <Tex tex={'\\Omega'} /> mixes the columns of <Tex tex="A" /> so that <Tex tex={'A\\Omega'} /> captures the dominant directions with overwhelming probability, because the top singular directions of <Tex tex="A" /> have a component along any random vector. If the spectrum decays slowly one can use a few <em>power iterations</em>: sketch <Tex tex={'(AA^{\\mathsf T})^qA\\Omega'} /> to sharpen the gap.
	</p>
</Callout>

<h2>Sketch and solve</h2>
<p>
	The same idea speeds up least squares: for a tall <Tex tex={'A\\ (m\\gg n)'} />, apply a random sketch <Tex tex="S" /> with <Tex tex={'k\\approx n/\\varepsilon^2'} /> rows (a subspace embedding) and solve the small problem <Tex tex={'\\min\\|SA\\mathbf x - S\\mathbf b\\|'} />. The answer is within <Tex tex={'1+\\varepsilon'} /> of the optimal residual, at the cost of a sketch rather than a full factorisation.
</p>

<Recap
	points={[
		'**Randomised SVD:** sketch $Y=A\\Omega$, orthonormalise to $Q$, form the small $B=Q^{\\mathsf T}A$, and take its SVD.',
		'Error is near-optimal when singular values decay; a little oversampling and a power iteration or two improve it.',
		'**Sketch and solve** compresses tall least-squares problems with a random subspace embedding.'
	]}
/>

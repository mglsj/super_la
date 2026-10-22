<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { cholesky, eigSym } from '#lib/math/decomp.js';
	import { det, mul, transpose, type Mat } from '#lib/math/mat.js';
	import { lu } from '#lib/math/gauss.js';
	import { fmtNum, texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[4, 2, 0],
		[2, 5, 1],
		[0, 1, 3]
	]);

	let symmetric = $derived(m.every((r, i) => r.every((x, j) => Math.abs(x - m[j][i]) < 1e-9)));
	let minors = $derived([1, 2, 3].map((k) => det(m.slice(0, k).map((r) => r.slice(0, k)))));
	let pivots = $derived(lu(m)?.U.map((r, i) => r[i]) ?? null);
	let L = $derived(symmetric ? cholesky(m) : null);
	let eig = $derived(symmetric ? eigSym(m).values : null);
	let pd = $derived(symmetric && minors.every((x) => x > 1e-9));
</script>

<p>
	Checking <Tex tex={'\\mathbf x^{\\mathsf T}A\\mathbf x > 0'} /> for infinitely many vectors is hopeless. Luckily there are cheap tests.
</p>

<Callout kind="theorem" title="Sylvester's criterion">
	<p>
		A symmetric matrix is positive definite iff all its <em>leading principal minors</em> (the determinants of the top-left <Tex tex={'1\\times1'} />, <Tex tex={'2\\times2'} />, <Tex tex={'3\\times3'} />, … blocks) are positive. Equivalently, elimination gives all positive pivots, and the
		<Tex tex="k" />-th pivot equals the ratio of consecutive minors.
	</p>
</Callout>

<h2>Test your own matrix</h2>
<Figure caption="Edit the matrix (try making it non-symmetric, or the middle entry large). All five tests agree." max={680}>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	<div class="space-y-1.5 text-left font-mono text-xs text-slate-200 sm:text-sm">
		<p><span class="text-slate-400">symmetric:</span> {symmetric ? 'yes' : 'no (the tests below only make sense for symmetric matrices)'}</p>
		<p><span class="text-sky-300">leading minors:</span> {minors.map(fmtNum).join(', ')}</p>
		<p><span class="text-emerald-300">pivots:</span> {pivots ? pivots.map(fmtNum).join(', ') : 'a zero pivot appeared'}</p>
		<p><span class="text-purple-300">eigenvalues:</span> {eig ? eig.map((x) => x.toFixed(3)).join(', ') : '—'}</p>
		<p class={pd ? 'text-emerald-300' : 'text-rose-300'}>{pd ? 'Positive definite' : 'Not positive definite'}</p>
	</div>
	{#if L}
		<Tex display tex={'L = ' + texMatrix(L) + ',\\qquad LL^{\\mathsf T} = ' + texMatrix(mul(L, transpose(L)))} />
	{:else if symmetric}
		<p class="text-center text-sm text-amber-300">No Cholesky factor: a pivot came out zero or negative.</p>
	{/if}
</Figure>

<h2>The Cholesky factorisation</h2>
<Callout kind="definition" title="Definition: Cholesky factor">
	<p>
		A positive definite matrix can be written <Tex tex={'A = LL^{\\mathsf T}'} /> with <Tex tex="L" /> lower triangular with a positive diagonal. It is like <Tex tex={'a = \\sqrt a\\cdot\\sqrt a'} /> for matrices. It is LU factorisation with the symmetry used to halve the work and with no pivoting
		needed.
	</p>
</Callout>
<p>
	The existence of the factor is itself a PD test: the algorithm takes square roots of pivots, so it fails exactly when a pivot is not positive. This is how software checks positive definiteness in practice, and it is how multivariate normal samples are generated:
	if <Tex tex={'\\mathbf z'} /> is standard normal then <Tex tex={'L\\mathbf z'} /> has covariance <Tex tex={'LL^{\\mathsf T} = A'} />.
</p>

<Recap
	points={[
		'Sylvester: symmetric $A$ is PD iff all leading principal minors are positive.',
		'Equivalent: all pivots positive, and the $k$-th pivot is a ratio of minors.',
		'PD matrices factor as $A=LL^{\\mathsf T}$ (Cholesky); the algorithm fails exactly when $A$ is not PD.'
	]}
/>

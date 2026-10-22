<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { kron, vec } from '#lib/math/decomp.js';
	import { mul, mulVec, transpose, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const A: Mat = [
		[1, 2],
		[0, 1]
	];
	const B: Mat = [
		[2, 0],
		[1, 3]
	];
	let X = $state<Mat>([
		[1, 2],
		[3, 4]
	]);
	let lhs = $derived(vec(mul(mul(A, X), B)));
	let rhs = $derived(mulVec(kron(transpose(B), A), vec(X)));
	let same = $derived(lhs.every((x, i) => Math.abs(x - rhs[i]) < 1e-9));

	let n = $state(100);
	// forming and applying the Kronecker matrix vs two small products
	let costKron = $derived(n ** 4);
	let costSmall = $derived(2 * n ** 3);
	const fmt = (x: number) => (x >= 1e9 ? (x / 1e9).toFixed(1) + ' billion' : x >= 1e6 ? (x / 1e6).toFixed(1) + ' million' : String(x));
</script>

<p>
	How do you turn a <em>matrix equation</em> like <Tex tex={'AXB = C'} /> (unknown matrix <Tex tex="X" />) into the familiar <Tex tex={'M\\mathbf x = \\mathbf c'} /> (unknown vector)? Stack the columns of <Tex tex="X" /> into one long vector, <Tex tex={'\\operatorname{vec}(X)'} />. Then:
</p>

<Callout kind="theorem" title="The vec identity">
	<Tex display tex={'\\operatorname{vec}(AXB) = (B^{\\mathsf T}\\otimes A)\\operatorname{vec}(X).'} />
</Callout>

<h2>Check it</h2>
<Figure caption="Edit X. Both sides of the identity are computed independently, one by multiplying matrices and one through the Kronecker product." max={660}>
	<div class="flex justify-center"><MatrixInput bind:value={X} step={1} label="X" /></div>
	<div class="space-y-1 text-center font-mono text-sm text-slate-100">
		<p>vec(AXB) = ({lhs.join(', ')})</p>
		<p>(Bᵀ ⊗ A) vec(X) = ({rhs.map((x) => Math.round(x * 1e9) / 1e9).join(', ')})</p>
		<p class={same ? 'text-emerald-300' : 'text-rose-300'}>{same ? 'Equal ✓' : 'Different'}</p>
	</div>
	<Tex display tex={'A = ' + texMatrix(A) + ',\\quad B = ' + texMatrix(B)} />
</Figure>

<h2>Never form the Kronecker product</h2>
<p>
	The identity is wonderful for <em>thinking</em>, but terrible for <em>computing</em>. If <Tex tex="X" /> is <Tex tex={'n\\times n'} />, then <Tex tex={'B^{\\mathsf T}\\otimes A'} /> is <Tex tex={'n^2\\times n^2'} />: it has <Tex tex={'n^4'} /> entries. Applying it as a matrix–vector product costs <Tex tex={'n^4'} />, while computing <Tex tex={'AXB'} /> directly with two ordinary products costs only about <Tex tex={'2n^3'} />.
</p>

<Figure caption="Operation counts for an n × n unknown matrix." max={560}>
	{#snippet controls()}
		<Slider label="n" bind:value={n} min={10} max={1000} step={10} display={String(n)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span class="text-rose-300">via Kronecker: {fmt(costKron)}</span>
			<span class="text-emerald-300">two small products: {fmt(costSmall)}</span>
			<span class="font-sans text-slate-300 sm:col-span-2">The shortcut is {(costKron / costSmall).toFixed(0)}× cheaper. At n = 1000 the Kronecker matrix would have 10¹² entries.</span>
		</div>
	{/snippet}
	<div class="pbar" aria-hidden="true"><i style="width: {Math.min(100, (100 * costSmall) / costKron)}%"></i></div>
</Figure>

<Callout kind="intuition">
	<p>
		Rule of thumb: use the identity to <em>derive</em> things (for example, that the Sylvester equation <Tex tex={'AX + XB = C'} /> has the matrix <Tex tex={'I\\otimes A + B^{\\mathsf T}\\otimes I'} />, with eigenvalues <Tex tex={'\\lambda_i + \\mu_j'} />), then <em>implement</em> with the cheap matrix products, never the huge Kronecker matrix.
	</p>
</Callout>

<Recap
	points={[
		'$\\operatorname{vec}(AXB)=(B^{\\mathsf T}\\otimes A)\\operatorname{vec}(X)$ turns matrix equations into ordinary linear systems.',
		'The Kronecker matrix is $n^2\\times n^2$; applying it costs $O(n^4)$ versus $O(n^3)$ for the direct products.',
		'Use the identity for analysis (e.g. solvability of $AX+XB=C$), but compute with the small factors.'
	]}
/>

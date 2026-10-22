<script lang="ts">
	import Heatmap from '#lib/viz/Heatmap.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { kron } from '#lib/math/decomp.js';
	import { det, type Mat } from '#lib/math/mat.js';
	import { eigen2 } from '#lib/math/eigen.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let A = $state<Mat>([
		[1, 2],
		[0, 1]
	]);
	let B = $state<Mat>([
		[1, -1],
		[1, 1]
	]);
	let K = $derived(kron(A, B));
	let eA = $derived(eigen2(A));
	let eB = $derived(eigen2(B));
	let products = $derived(
		eA.values.length && eB.values.length ? eA.values.flatMap((a) => eB.values.map((b) => a * b)) : null
	);
</script>

<p>
	Sometimes a matrix has structure that is invisible in its entries: it is secretly a pattern of copies of a smaller matrix. The <strong class="text-slate-50">Kronecker product</strong> is the operation that builds such matrices.
</p>

<Callout kind="definition" title="Definition: Kronecker product">
	<p>
		For <Tex tex="A" /> (<Tex tex={'m\\times n'} />) and <Tex tex="B" /> (<Tex tex={'p\\times q'} />), the product <Tex tex={'A\\otimes B'} /> is the <Tex tex={'mp\\times nq'} /> block matrix whose <Tex tex="(i,j)" /> block is <Tex tex={'a_{ij}B'} />:
		<Tex display tex={'A\\otimes B = \\begin{bmatrix} a_{11}B & a_{12}B \\\\ a_{21}B & a_{22}B \\end{bmatrix}.'} />
	</p>
</Callout>

<h2>See the blocks</h2>
<p>
	Edit <Tex tex="A" /> and <Tex tex="B" />. Each <Tex tex={'2\\times2'} /> block of the result is a copy of <Tex tex="B" /> scaled by the corresponding entry of <Tex tex="A" /> (a zero entry of <Tex tex="A" /> gives a zero block).
</p>

<Figure caption="Left: A and B. Right: A ⊗ B as a 4×4 grid. Look for the copies of B." max={700}>
	<div class="flex flex-wrap items-center justify-center gap-4">
		<div class="text-center"><p class="font-pixel mb-1 text-[9px] text-slate-400">A</p><MatrixInput bind:value={A} step={1} label="A" /></div>
		<span class="text-2xl text-slate-400">⊗</span>
		<div class="text-center"><p class="font-pixel mb-1 text-[9px] text-slate-400">B</p><MatrixInput bind:value={B} step={1} label="B" /></div>
	</div>
	<Heatmap matrix={K} numbers cell={52} label="The Kronecker product as a grid" />
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">det(A⊗B) = {det(K).toFixed(0)} = det(A)²·det(B)² = {(det(A) ** 2 * det(B) ** 2).toFixed(0)}</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Rules worth knowing">
	<ul class="list-disc space-y-1 pl-6">
		<li><Tex tex={'(A\\otimes B)(C\\otimes D) = (AC)\\otimes(BD)'} /> (the mixed-product rule).</li>
		<li><Tex tex={'(A\\otimes B)^{-1} = A^{-1}\\otimes B^{-1}'} /> and <Tex tex={'(A\\otimes B)^{\\mathsf T} = A^{\\mathsf T}\\otimes B^{\\mathsf T}'} />.</li>
		<li>If <Tex tex={'A\\mathbf u = \\lambda\\mathbf u'} /> and <Tex tex={'B\\mathbf v = \\mu\\mathbf v'} />, then <Tex tex={'(A\\otimes B)(\\mathbf u\\otimes\\mathbf v) = \\lambda\\mu\\,(\\mathbf u\\otimes\\mathbf v)'} />: the eigenvalues of <Tex tex={'A\\otimes B'} /> are all products <Tex tex={'\\lambda_i\\mu_j'} />.</li>
	</ul>
</Callout>

{#if products}
	<p class="text-sm text-slate-300">
		For your matrices: eigenvalues of A are {eA.values.map((x) => x.toFixed(2)).join(', ')}, of B are {eB.values.map((x) => x.toFixed(2)).join(', ')}, so A⊗B has eigenvalues {products.map((x) => x.toFixed(2)).join(', ')}.
	</p>
{:else}
	<p class="text-sm text-amber-300">One of your matrices has complex eigenvalues; the products still work over the complex numbers.</p>
{/if}

<Callout kind="intuition">
	<p>
		Where does this arise? Grids in two dimensions: the 2D second-difference operator on an <Tex tex={'n\\times n'} /> grid is <Tex tex={'I\\otimes T + T\\otimes I'} /> with <Tex tex="T" /> the 1D operator. Image filters, quantum systems of several particles, and multi-dimensional transforms (the 2D FFT) all have Kronecker structure.
	</p>
</Callout>

<Recap
	points={[
		'$A\\otimes B$ is the block matrix with blocks $a_{ij}B$; sizes multiply.',
		'Mixed product: $(A\\otimes B)(C\\otimes D)=AC\\otimes BD$; inverses and transposes pass through.',
		'Eigenvalues of $A\\otimes B$ are all products $\\lambda_i\\mu_j$.'
	]}
/>

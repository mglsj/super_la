<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { eigSym } from '#lib/math/decomp.js';
	import { mul, transpose, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let A = $state<Mat>([
		[1, 0],
		[1, 1],
		[0, 2]
	]);
	let G = $derived(mul(transpose(A), A));
	let eg = $derived(eigSym(G));
	let kappa = $derived(eg.values[1] > 1e-12 ? eg.values[0] / eg.values[1] : Infinity);
	// level set x^T G x = 1 is an ellipse with semi-axes 1/sqrt(lambda_i) along eigenvectors
	let curve = $derived(
		eg.values[1] > 1e-12
			? Array.from({ length: 90 }, (_, i) => {
					const t = (i / 90) * 2 * Math.PI;
					const p = Math.cos(t) / Math.sqrt(eg.values[0]);
					const q = Math.sin(t) / Math.sqrt(eg.values[1]);
					return [eg.vectors[0][0] * p + eg.vectors[0][1] * q, eg.vectors[1][0] * p + eg.vectors[1][1] * q];
				})
			: []
	);
</script>

<p>
	Where do positive definite matrices actually come from? Mostly from three places, and all three are products of a matrix with its own transpose.
</p>

<h2>1. The Gram matrix AᵀA</h2>
<Callout kind="theorem" title="AᵀA is always PSD">
	<p>
		<Tex tex={'\\mathbf x^{\\mathsf T}(A^{\\mathsf T}A)\\mathbf x = (A\\mathbf x)\\cdot(A\\mathbf x) = \\|A\\mathbf x\\|^2 \\ge 0'} />. It is positive definite exactly when <Tex tex="A" /> has independent columns (so <Tex tex={'A\\mathbf x = \\mathbf 0'} /> only for <Tex tex={'\\mathbf x = \\mathbf 0'} />). This is the matrix of the normal equations from chapter 12.
	</p>
</Callout>

<Figure caption="Edit the 3×2 matrix A. Its Gram matrix AᵀA is PD unless the columns are dependent (set column 2 = column 1)." max={640}>
	<div class="flex justify-center"><MatrixInput bind:value={A} step={1} /></div>
	<Tex display tex={'A^{\\mathsf T}A = ' + texMatrix(G)} />
	<Plane2D xmin={-2} xmax={2} ymin={-1.6} ymax={1.6} ticks={false}>
		{#if curve.length}<Polygon points={curve} fill={C.yellow} fillOpacity={0.12} stroke={C.yellow} width={2.5} />{/if}
		{#if !curve.length}<Line point={[0, 0]} dir={[eg.vectors[0][1], eg.vectors[1][1]]} color={C.jHat} width={3} opacity={0.4} />{/if}
	</Plane2D>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">eigenvalues {eg.values.map((x) => x.toFixed(3)).join(', ')}</span>
		<span class="font-mono text-sm text-slate-300">condition number {Number.isFinite(kappa) ? kappa.toFixed(2) : '∞'}</span>
		<span class="w-full text-center text-sm {Number.isFinite(kappa) ? 'text-emerald-300' : 'text-amber-300'}">
			{Number.isFinite(kappa)
				? 'Positive definite: the level set xᵀ(AᵀA)x = 1 is a bounded ellipse (yellow).'
				: 'Only semidefinite: a zero eigenvalue means the level set stretches out forever along a line.'}
		</span>
	{/snippet}
</Figure>

<h2>2. Covariance matrices</h2>
<p>
	Centre a data matrix <Tex tex="X" /> (rows are samples) and form <Tex tex={'\\Sigma = \\tfrac{1}{n-1}X^{\\mathsf T}X'} />. The variance of the data along a direction <Tex tex={'\\mathbf u'} /> is <Tex tex={'\\mathbf u^{\\mathsf T}\\Sigma\\mathbf u \\ge 0'} />. So covariance matrices are PSD, and PD when no direction has zero variance.
	The eigenvectors are the principal components.
</p>

<h2>3. Energy and curvature</h2>
<p>
	A twice-differentiable function has a local minimum where the gradient is zero and the Hessian (matrix of second derivatives) is positive definite. Stiffness matrices in physics are PD because stored energy <Tex tex={'\\tfrac12\\mathbf x^{\\mathsf T}K\\mathbf x'} /> must be positive.
</p>

<Callout kind="intuition" title="Conditioning">
	<p>
		The ratio <Tex tex={'\\kappa = \\lambda_{\\max}/\\lambda_{\\min}'} /> measures how elongated the bowl is. A long thin valley (<Tex tex={'\\kappa'} /> large) makes optimisation and solving slow and sensitive to errors, which chapters 16 and 17 return to.
	</p>
</Callout>

<Recap
	points={[
		'$A^{\\mathsf T}A$ is PSD, and PD iff $A$ has independent columns.',
		'Covariance matrices and Hessians at minima are PSD/PD.',
		'$\\kappa=\\lambda_{\\max}/\\lambda_{\\min}$ measures how elongated the bowl is.'
	]}
/>

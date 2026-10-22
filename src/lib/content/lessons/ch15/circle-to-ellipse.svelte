<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { svd } from '#lib/math/decomp.js';
	import { det, type Mat } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let A = $state<Mat>([
		[2, 1],
		[0, 1.5]
	]);
	let f = $derived(svd(A));
	let ellipse = $derived(
		Array.from({ length: 90 }, (_, i) => {
			const t = (i / 90) * 2 * Math.PI;
			return [A[0][0] * Math.cos(t) + A[0][1] * Math.sin(t), A[1][0] * Math.cos(t) + A[1][1] * Math.sin(t)];
		})
	);
	const col = (M: Mat, j: number) => [M[0][j], M[1][j]];
	const scale = (v: number[], k: number) => [v[0] * k, v[1] * k];
</script>

<p>
	Eigenvalues only make sense for square matrices, and even then they can be complex or missing. The <strong class="text-slate-50">singular values</strong> exist for <em>every</em> matrix, of any shape, and they answer a very concrete question: how much can this matrix stretch a vector?
</p>

<h2>The unit circle becomes an ellipse</h2>
<p>
	Whatever 2×2 matrix you choose, the unit circle is mapped to an ellipse. The lengths of its semi-axes are the singular values <Tex tex={'\\sigma_1 \\ge \\sigma_2 \\ge 0'} />, and the directions of the axes are <Tex tex={'\\mathbf u_1, \\mathbf u_2'} />.
	The inputs that land on those axes are the perpendicular unit vectors <Tex tex={'\\mathbf v_1, \\mathbf v_2'} /> on the circle.
</p>

<Figure caption="Green/red on the circle: right singular vectors v₁, v₂. Green/red on the ellipse: σ₁u₁ and σ₂u₂, the semi-axes. A maps v_i exactly to σ_i u_i." max={620}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3}>
		<Polygon points={ellipse} fill={C.blue} fillOpacity={0.1} stroke={C.blue} width={2.5} />
		<Arrow to={col(f.V, 0)} color={C.iHat} dashed width={2.5} />
		<Arrow to={col(f.V, 1)} color={C.jHat} dashed width={2.5} />
		<Arrow to={scale(col(f.U, 0), f.S[0])} color={C.iHat} width={3.5} label="σ₁u₁" />
		<Arrow to={scale(col(f.U, 1), f.S[1])} color={C.jHat} width={3.5} label="σ₂u₂" />
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={A} step={0.5} /></div>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">σ₁ = {f.S[0].toFixed(3)}, σ₂ = {f.S[1].toFixed(3)}</span>
		<span class="font-mono text-sm text-slate-300">σ₁σ₂ = {(f.S[0] * f.S[1]).toFixed(3)} = |det A| = {Math.abs(det(A)).toFixed(3)}</span>
	{/snippet}
</Figure>

<Callout kind="definition" title="Definition: singular values">
	<p>
		The singular values of <Tex tex="A" /> are the square roots of the eigenvalues of <Tex tex={'A^{\\mathsf T}A'} />, written <Tex tex={'\\sigma_1\\ge\\sigma_2\\ge\\dots\\ge0'} />. Here <Tex tex={'A^{\\mathsf T}A'} /> is symmetric PSD (chapter 14), so its eigenvalues are real and nonnegative and its eigenvectors <Tex tex={'\\mathbf v_i'} /> are orthonormal.
	</p>
</Callout>

<h2>What they mean</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><Tex tex={'\\sigma_1 = \\max_{\\|\\mathbf x\\|=1}\\|A\\mathbf x\\|'} />: the largest stretch (the spectral norm), and <Tex tex={'\\sigma_{\\min}'} /> is the smallest.</li>
	<li>The rank of <Tex tex="A" /> is the number of nonzero singular values. Try making the columns parallel: <Tex tex={'\\sigma_2'} /> drops to 0 and the ellipse flattens to a segment.</li>
	<li>For a square matrix, <Tex tex={'|\\det A| = \\sigma_1\\sigma_2\\cdots\\sigma_n'} />, matching the area of the ellipse relative to the circle.</li>
</ul>

<Recap
	points={[
		'$A$ maps the unit circle (sphere) to an ellipse (ellipsoid) whose semi-axes are the **singular values**.',
		'$\\sigma_i=\\sqrt{\\lambda_i(A^{\\mathsf T}A)}$; they exist for any shape of matrix.',
		'$\\sigma_1$ is the maximum stretch, rank = number of nonzero $\\sigma_i$, and $|\\det A|=\\prod\\sigma_i$ for square $A$.'
	]}
/>

<script lang="ts">
	import { mpow, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let lambda = $state(1);
	let k = $state(5);
	let J = $derived<Mat>([
		[lambda, 1],
		[0, lambda]
	]);
	let Jk = $derived(mpow(J, k));
</script>

<p>
	We can now state the best possible form for any matrix, defective or not. Arrange the generalised-eigenvector chains as a basis, and the matrix becomes block diagonal, with one <strong class="text-slate-50">Jordan block</strong> per chain.
</p>

<Callout kind="definition" title="Definition: Jordan block">
	<p>
		The Jordan block <Tex tex={'J_m(\\lambda)'} /> is the <Tex tex={'m\\times m'} /> matrix with <Tex tex={'\\lambda'} /> on the diagonal and <Tex tex="1" /> on the superdiagonal:
		<Tex display tex={'J_3(\\lambda) = \\begin{bmatrix} \\lambda & 1 & 0 \\\\ 0 & \\lambda & 1 \\\\ 0 & 0 & \\lambda \\end{bmatrix}.'} />
	</p>
</Callout>

<Callout kind="theorem" title="Jordan canonical form">
	<p>
		Every square matrix <Tex tex="A" /> over <Tex tex={'\\mathbb{C}'} /> is similar to a block-diagonal matrix <Tex tex={'J = \\operatorname{diag}(J_{m_1}(\\lambda_1), \\dots, J_{m_r}(\\lambda_r))'} />, unique up to reordering the blocks.
		The matrix is diagonalisable exactly when every block has size 1.
	</p>
</Callout>

<h2>What a block does to powers</h2>
<p>
	For a block, <Tex tex={'J_2(\\lambda)^k = \\begin{bmatrix}\\lambda^k & k\\lambda^{k-1} \\\\ 0 & \\lambda^k\\end{bmatrix}'} />. The off-diagonal entry grows like <Tex tex={'k\\lambda^{k-1}'} /> instead of <Tex tex={'\\lambda^k'} />.
	Check it below.
</p>

<Figure caption="The top-right entry is k·λ^(k−1). With λ = 1 it still grows linearly, even though the only eigenvalue is 1." max={600}>
	<Tex display tex={'J^{' + k + '} = ' + texMatrix(Jk)} />
	{#snippet controls()}
		<Slider label="λ" bind:value={lambda} min={0} max={2} step={0.1} />
		<Slider label="k" bind:value={k} min={0} max={15} step={1} display={String(k)} />
		<span class="w-full text-center font-mono text-sm text-slate-300">
			k·λ^(k−1) = {(k * lambda ** Math.max(k - 1, 0)).toFixed(3)} (formula) vs {Jk[0][1].toFixed(3)} (computed)
		</span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		This is why defective matrices are dangerous in long-running systems: a matrix with all eigenvalues equal to 1 can still blow up linearly, because of the Jordan block. And with <Tex tex={'|\\lambda| < 1'} /> it eventually decays, but may grow first.
	</p>
</Callout>

<h2>How it all fits</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li>The number of blocks for <Tex tex={'\\lambda'} /> is the geometric multiplicity <Tex tex={'\\dim\\ker(A-\\lambda I)'} />.</li>
	<li>The sizes of the blocks add up to the algebraic multiplicity.</li>
	<li>The largest block size is the smallest <Tex tex="k" /> with <Tex tex={'(A-\\lambda I)^k = 0'} /> on the generalised eigenspace.</li>
</ul>

<Recap
	points={[
		'A **Jordan block** has $\\lambda$ on the diagonal and 1s just above it.',
		'Every complex matrix is similar to a block-diagonal Jordan matrix, unique up to block order.',
		'Diagonalisable ⇔ all blocks have size 1. Blocks of size $>1$ cause polynomial growth like $k\\lambda^{k-1}$.'
	]}
/>

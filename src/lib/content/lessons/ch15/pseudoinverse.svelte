<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { cond, pinv, svd } from '#lib/math/decomp.js';
	import { mulVec, type Mat } from '#lib/math/mat.js';
	import { norm, sub } from '#lib/math/vec.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let A = $state<Mat>([
		[1, 1],
		[1, 1.05]
	]);
	let deg = $state(40);
	const b = [2, 2.05];
	let P = $derived(pinv(A));
	let kappa = $derived(cond(A));
	let x = $derived(mulVec(P, b));
	// perturb b by a tiny vector of length 0.01 in the chosen direction
	let db = $derived([0.01 * Math.cos((deg * Math.PI) / 180), 0.01 * Math.sin((deg * Math.PI) / 180)]);
	let x2 = $derived(mulVec(P, [b[0] + db[0], b[1] + db[1]]));
	let relIn = $derived(norm(db) / norm(b));
	let relOut = $derived(norm(sub(x2, x)) / norm(x));
	let amp = $derived(relOut / relIn);
	let S = $derived(svd(A).S);
</script>

<p>
	An invertible matrix has an inverse. But most matrices in practice are rectangular, or square and singular. The SVD gives the best possible substitute.
</p>

<Callout kind="definition" title="Definition: pseudoinverse">
	<p>
		If <Tex tex={'A = U\\Sigma V^{\\mathsf T}'} />, then <Tex tex={'A^+ = V\\Sigma^+U^{\\mathsf T}'} /> where <Tex tex={'\\Sigma^+'} /> inverts the nonzero singular values and leaves zeros alone: <Tex tex={'\\sigma_i \\mapsto 1/\\sigma_i'} />, <Tex tex={'0 \\mapsto 0'} />.
	</p>
</Callout>
<Callout kind="theorem" title="What A⁺b gives you">
	<p>
		<Tex tex={'\\hat{\\mathbf x} = A^+\\mathbf b'} /> is the <em>minimum-norm least-squares solution</em>: among all <Tex tex={'\\mathbf x'} /> minimising <Tex tex={'\\|A\\mathbf x - \\mathbf b\\|'} /> (chapter 12), the one with the shortest length. If <Tex tex="A" /> has independent columns it equals <Tex tex={'(A^{\\mathsf T}A)^{-1}A^{\\mathsf T}\\mathbf b'} />; if <Tex tex="A" /> is invertible, <Tex tex={'A^+ = A^{-1}'} />.
	</p>
</Callout>

<h2>Conditioning: how fragile is the answer?</h2>
<p>
	The <strong class="text-slate-50">condition number</strong> <Tex tex={'\\kappa(A) = \\sigma_{\\max}/\\sigma_{\\min}'} /> is the worst-case factor by which relative errors in <Tex tex={'\\mathbf b'} /> are magnified in the solution. Below, <Tex tex={'\\mathbf b'} /> is nudged by 0.01 in a chosen direction and we see how much the solution moves.
	The default matrix has nearly parallel columns, which is a classic ill-conditioned situation.
</p>

<Figure caption="The magnification never exceeds κ, and reaches it only for the unluckiest perturbation direction." max={640}>
	<div class="flex justify-center"><MatrixInput bind:value={A} step={0.05} /></div>
	<Tex display tex={'A^+ = ' + texMatrix(P) + ',\\qquad \\hat{\\mathbf x} = ' + texMatrix(x.map((v) => [v]))} />
	{#snippet controls()}
		<Slider label="Δb dir" bind:value={deg} min={0} max={180} step={5} display="{deg}°" />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>σ = {S.map((v) => v.toFixed(3)).join(', ')}</span>
			<span>κ(A) = <span class="text-amber-300">{Number.isFinite(kappa) ? kappa.toFixed(1) : '∞'}</span></span>
			<span>relative change in b: {(100 * relIn).toFixed(2)}%</span>
			<span>relative change in x: {(100 * relOut).toFixed(2)}%</span>
			<span class="font-sans text-slate-400 sm:col-span-2">magnification = {amp.toFixed(1)} ≤ κ = {Number.isFinite(kappa) ? kappa.toFixed(1) : '∞'}</span>
		</div>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		Small singular values are where trouble hides: inverting them amplifies noise by <Tex tex={'1/\\sigma'} />. Practical methods (truncated SVD, ridge regression) tame this by ignoring or damping the tiny <Tex tex={'\\sigma_i'} />, deliberately trading a little accuracy for stability.
	</p>
</Callout>

<Recap
	points={[
		'$A^+=V\\Sigma^+U^{\\mathsf T}$: invert the nonzero singular values, keep zeros as zeros.',
		'$A^+\\mathbf b$ is the minimum-norm least-squares solution; it equals $A^{-1}\\mathbf b$ when $A$ is invertible.',
		'$\\kappa(A)=\\sigma_{\\max}/\\sigma_{\\min}$ bounds how much input errors are magnified.'
	]}
/>

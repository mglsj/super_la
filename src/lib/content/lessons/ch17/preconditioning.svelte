<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let logk = $state(3); // log10 of the condition number
	let gain = $state(0); // preconditioner reduces kappa by 10^gain

	let kappa = $derived(10 ** logk);
	let kappaP = $derived(10 ** (logk - gain));
	const cgRate = (k: number) => (Math.sqrt(k) - 1) / (Math.sqrt(k) + 1);
	const sdRate = (k: number) => (k - 1) / (k + 1);
	// log10 of the error bound after n iterations
	const logErr = (rate: number) => (n: number) => Math.max(-9, n * Math.log10(Math.max(rate, 1e-12)));
	// iterations to cut the error by 1e-6
	const itsFor = (rate: number) => (rate < 1e-9 ? 1 : Math.ceil(6 / -Math.log10(rate)));
</script>

<p>
	We saw that the speed of CG depends on the condition number <Tex tex={'\\kappa'} />. If you cannot change the matrix, change the <em>question</em>: solve an equivalent system whose matrix has a much smaller condition number.
</p>

<h2>The idea</h2>
<p>
	Find a matrix <Tex tex="M" /> that is a rough approximation of <Tex tex="A" /> and cheap to invert. Then solve <Tex tex={'M^{-1}A\\mathbf x = M^{-1}\\mathbf b'} /> instead. The new matrix <Tex tex={'M^{-1}A'} /> is close to the identity, so its eigenvalues cluster near 1 and <Tex tex={'\\kappa'} /> drops.
	In practice <Tex tex="M" /> is chosen so that applying <Tex tex={'M^{-1}'} /> is cheap.
</p>

<Figure caption="Error bounds (log scale) as iterations go on. Dashed: before preconditioning. Solid: after. The orange line is steepest descent for comparison." max={700}>
	<Plane2D xmin={-2} xmax={80} ymin={-9.5} ymax={0.5} ticks={false}>
		<Line a={[0, -6]} b={[80, -6]} color={C.axis} dashed width={1} opacity={0.6} />
		<Curve fn={logErr(sdRate(kappa))} from={0} to={80} color={C.orange} width={2} samples={80} />
		<Curve fn={logErr(cgRate(kappa))} from={0} to={80} color={C.teal} width={2.5} samples={80} />
		{#if gain > 0}<Curve fn={logErr(cgRate(kappaP))} from={0} to={80} color={C.yellow} width={3.5} samples={80} />{/if}
	</Plane2D>
	{#snippet controls()}
		<Slider label="log₁₀ κ" bind:value={logk} min={1} max={5} step={0.5} />
		<Slider label="precond. gain" bind:value={gain} min={0} max={3} step={0.5} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>κ = {kappa.toExponential(1)}{gain > 0 ? ` → ${kappaP.toExponential(1)}` : ''}</span>
			<span>to reduce error 10⁶×:</span>
			<span class="text-orange-300">steepest descent ≈ {itsFor(sdRate(kappa))} its</span>
			<span class="text-teal-300">CG ≈ {itsFor(cgRate(kappa))} its{gain > 0 ? ` → ${itsFor(cgRate(kappaP))} with preconditioner` : ''}</span>
		</div>
	{/snippet}
</Figure>

<p class="text-sm text-slate-400">The dashed horizontal line marks an error reduction of 10⁻⁶. The curves are theoretical upper bounds; real runs are often faster.</p>

<h2>Common preconditioners</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><strong class="text-slate-50">Jacobi (diagonal):</strong> <Tex tex={'M = \\operatorname{diag}(A)'} />. Trivial to apply; fixes badly scaled rows.</li>
	<li><strong class="text-slate-50">Incomplete Cholesky/LU:</strong> factorise but throw away small fill-in, giving <Tex tex={'M = \\tilde L\\tilde L^{\\mathsf T} \\approx A'} />.</li>
	<li><strong class="text-slate-50">Multigrid, domain decomposition:</strong> problem-specific preconditioners that can make the iteration count independent of the problem size.</li>
</ul>

<Callout kind="theorem" title="What to use when">
	<ul class="list-disc space-y-1 pl-6">
		<li>Small or medium dense systems: direct methods (LU, Cholesky). They are robust and give all digits the conditioning allows.</li>
		<li>Large sparse SPD systems: preconditioned <strong class="text-slate-50">CG</strong>.</li>
		<li>Large sparse nonsymmetric systems: GMRES or BiCGSTAB (CG's cousins, which keep more of the Krylov basis), nearly always preconditioned.</li>
	</ul>
</Callout>

<Recap
	points={[
		'Iteration counts depend on $\\kappa$; a **preconditioner** $M\\approx A$ lowers the effective $\\kappa(M^{-1}A)$.',
		'A good $M$ is a rough copy of $A$ that is cheap to invert (diagonal, incomplete factorisation, multigrid).',
		'Dense and small: factorise. Large, sparse, SPD: preconditioned CG. Nonsymmetric: preconditioned GMRES.'
	]}
/>

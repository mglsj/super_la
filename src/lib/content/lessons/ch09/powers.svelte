<script lang="ts">
	import { eigen2 } from '#lib/math/eigen.js';
	import { mpow, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const presets: { name: string; m: Mat }[] = [
		{ name: 'Fibonacci', m: [[1, 1], [1, 0]] },
		{ name: 'Diagonal-ish', m: [[2, 1], [1, 2]] },
		{ name: 'Markov (settles down)', m: [[0.8, 0.3], [0.2, 0.7]] }
	];
	let which = $state(0);
	let k = $state(6);
	let m = $derived(presets[which].m);
	let ev = $derived(eigen2(m));
	let Ak = $derived(mpow(m, k));
</script>

<p>
	Multiplying a matrix by itself 100 times sounds painful. If you know its eigen-decomposition, it is one line. This is the first big dividend of diagonalising.
</p>

<h2>The trick</h2>
<Tex display tex={'A^k = (PDP^{-1})(PDP^{-1})\\cdots(PDP^{-1}) = P D^k P^{-1},'} />
<p>
	because every inner <Tex tex={'P^{-1}P'} /> cancels. And <Tex tex={'D^k'} /> is just each eigenvalue raised to the <Tex tex="k" />:
</p>
<Tex display tex={'D^k = \\begin{bmatrix} \\lambda_1^k & 0 \\\\ 0 & \\lambda_2^k \\end{bmatrix}.'} />

<h2>Watch the powers</h2>
<Figure caption="Slide k. The matrix power grows or settles according to the biggest eigenvalue." max={640}>
	<div class="flex flex-wrap justify-center gap-1.5">
		{#each presets as p, i (p.name)}
			<button class="mbtn {which === i ? 'mbtn-yellow' : 'mbtn-blue'}" style="padding: 0.45rem 0.6rem; font-size: 9px;" onclick={() => (which = i)}>{p.name}</button>
		{/each}
	</div>
	<Tex display tex={'A^{' + k + '} = ' + texMatrix(Ak)} />
	{#snippet controls()}
		<Slider label="k" bind:value={k} min={0} max={20} step={1} display={String(k)} />
		<span class="w-full text-center font-mono text-sm text-slate-300">
			{#if ev.values.length === 2}
				eigenvalues {ev.values.map((x) => x.toFixed(3)).join(' and ')}; λ₁^k = {(ev.values[0] ** k).toFixed(3)}, λ₂^k = {(ev.values[1] ** k).toFixed(3)}
			{/if}
		</span>
	{/snippet}
</Figure>

<h2>Fibonacci, solved</h2>
<p>
	The Fibonacci numbers satisfy <Tex tex={'F_{k+1} = F_k + F_{k-1}'} />. In matrix form <Tex tex={'\\begin{pmatrix}F_{k+1}\\\\F_k\\end{pmatrix} = \\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}\\begin{pmatrix}F_k\\\\F_{k-1}\\end{pmatrix}'} />,
	so the matrix to the <Tex tex="k" />-th power contains them (select "Fibonacci" above and watch). Its eigenvalues solve <Tex tex={'\\lambda^2 = \\lambda + 1'} />:
	<Tex display tex={'\\lambda_{1,2} = \\frac{1 \\pm \\sqrt5}{2},\\qquad F_k = \\frac{\\lambda_1^k - \\lambda_2^k}{\\sqrt5}.'} />
	The larger eigenvalue <Tex tex={'\\lambda_1 \\approx 1.618'} /> is the golden ratio, which is why Fibonacci numbers grow by about 61.8% each step.
</p>

<Callout kind="intuition">
	<p>
		Long-term behaviour is governed by the <strong class="text-slate-50">largest-magnitude eigenvalue</strong>. If it is bigger than 1, powers blow up. If every eigenvalue is smaller than 1 in magnitude, they decay to zero. For the Markov preset the biggest eigenvalue is exactly 1, so the powers settle to a steady state instead of blowing up or vanishing.
	</p>
</Callout>

<Recap
	points={[
		'$A^k = PD^kP^{-1}$, and $D^k$ just raises each eigenvalue to the $k$.',
		'Long-run behaviour is driven by the largest $|\\lambda|$: $>1$ grows, $<1$ decays, $=1$ settles.',
		'Fibonacci numbers come from the eigenvalues $\\frac{1\\pm\\sqrt5}{2}$ of $\\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}$.'
	]}
/>

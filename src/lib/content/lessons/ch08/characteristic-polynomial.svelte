<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { eigen2, trace } from '#lib/math/eigen.js';
	import { det, type Mat } from '#lib/math/mat.js';
	import { fmtNum } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[2, 1],
		[1, 2]
	]);
	let t = $derived(trace(m));
	let d = $derived(det(m));
	let ev = $derived(eigen2(m));
	const vec = (v: number[]) => '(' + v.map((x) => Math.round(x * 100) / 100).join(', ') + ')';
</script>

<p>
	Guessing eigenvectors by sweeping works for pictures, but we want a calculation. Here is the trick: <Tex tex={'A\\mathbf v = \\lambda\\mathbf v'} /> can be rewritten as
</p>
<Tex display tex={'(A - \\lambda I)\\mathbf v = \\mathbf 0.'} />
<p>
	We want a <em>nonzero</em> solution <Tex tex={'\\mathbf v'} />. That is possible only if <Tex tex={'A - \\lambda I'} /> is not invertible, i.e. its determinant is zero.
</p>

<Callout kind="theorem" title="Characteristic polynomial">
	<p>
		The eigenvalues of <Tex tex="A" /> are exactly the roots of <Tex tex={'\\det(A - \\lambda I) = 0'} />. For a <Tex tex={'2\\times2'} /> matrix this is
		<Tex display tex={'\\lambda^2 - (\\operatorname{tr}A)\\,\\lambda + \\det A = 0.'} />
	</p>
</Callout>

<h2>See the roots</h2>
<p>
	Plot <Tex tex={'p(\\lambda) = \\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A'} />. Where the curve crosses the horizontal axis, you have an eigenvalue. Edit the matrix: the parabola moves, and when it floats above the axis there are no real eigenvalues.
</p>

<Figure caption="The yellow dots are the real eigenvalues. The parabola's low point can float above the axis, which means no real roots." max={600}>
	<Plane2D xmin={-3} xmax={7} ymin={-5} ymax={5}>
		<Curve fn={(x) => x * x - t * x + d} from={-3} to={7} color={C.teal} width={3.5} />
		{#each ev.values as l (l)}<Dot at={[l, 0]} color={C.yellow} r={7} label={fmtNum(l)} />{/each}
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">λ² − {t.toFixed(1)}λ + {d.toFixed(1)} = 0</span>
		{#if ev.complex}
			<span class="w-full text-center text-sm text-amber-300">Complex eigenvalues {ev.complex[0].toFixed(2)} ± {ev.complex[1].toFixed(2)}i: no real eigen-directions.</span>
		{:else}
			<span class="w-full text-center font-mono text-sm text-slate-200">
				{#each ev.values as l, i (i)}λ = {fmtNum(l)} with eigenvector {vec(ev.vectors[i])}{i < ev.values.length - 1 ? '   ' : ''}{/each}
			</span>
		{/if}
	{/snippet}
</Figure>

<h2>A worked example</h2>
<p>
	For <Tex tex={'A = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}'} />: trace 4, determinant 3, so <Tex tex={'\\lambda^2 - 4\\lambda + 3 = (\\lambda-1)(\\lambda-3)'} />, giving <Tex tex={'\\lambda = 1, 3'} />.
	For <Tex tex={'\\lambda = 3'} />: <Tex tex={'(A-3I) = \\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix}'} />, whose null space is spanned by <Tex tex="(1,1)" />. For <Tex tex={'\\lambda = 1'} /> the eigenvector is <Tex tex="(1,-1)" />.
	Check: <Tex tex={'A(1,1) = (3,3) = 3(1,1)'} />. ✓
</p>

<Callout kind="intuition" title="Two free checks">
	<p>
		The eigenvalues always add up to the <strong class="text-slate-50">trace</strong> and multiply to the <strong class="text-slate-50">determinant</strong>. For the example: <Tex tex={'1 + 3 = 4'} /> and <Tex tex={'1\\cdot3 = 3'} />. ✓ And since <Tex tex={'\\det A = 0'} /> exactly when <Tex tex={'\\lambda = 0'} /> is a root, a matrix is singular iff 0 is an eigenvalue.
	</p>
</Callout>

<Recap
	points={[
		'Eigenvalues are the roots of $\\det(A-\\lambda I)=0$; for $2\\times2$: $\\lambda^2-\\operatorname{tr}(A)\\lambda+\\det A$.',
		'For each eigenvalue, solve $(A-\\lambda I)\\mathbf v=\\mathbf 0$ for the eigenvectors.',
		'Sum of eigenvalues = trace; product = determinant; $0$ is an eigenvalue iff $A$ is singular.'
	]}
/>

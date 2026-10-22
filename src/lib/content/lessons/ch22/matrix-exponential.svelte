<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { expm } from '#lib/math/decomp.js';
	import { det, mulVec, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const gens: { name: string; A: Mat; what: string }[] = [
		{ name: 'Skew (rotation)', A: [[0, -1], [1, 0]], what: 'rotations: the generator of SO(2)' },
		{ name: 'Diagonal', A: [[0.5, 0], [0, -0.5]], what: 'stretch one way, squeeze the other (det 1)' },
		{ name: 'Nilpotent', A: [[0, 1], [0, 0]], what: 'shears' },
		{ name: 'Spiral', A: [[0.15, -1], [1, 0.15]], what: 'rotate and grow' }
	];
	let which = $state(0);
	let t = $state(1);

	let A = $derived(gens[which].A);
	let E = $derived(expm(A.map((r) => r.map((x) => x * t))));
	let trail = $derived(
		Array.from({ length: 41 }, (_, i) => mulVec(expm(A.map((r) => r.map((x) => (x * t * i) / 40))), [1.5, 0]))
	);
	let tr = $derived(A[0][0] + A[1][1]);
</script>

<p>
	Real numbers have <Tex tex={'e^x = 1 + x + x^2/2! + \\cdots'} />. The same series makes sense for a square matrix, and it turns out to connect <em>algebra</em> (the generator <Tex tex="A" />) and <em>symmetry</em> (the group element <Tex tex={'e^{A}'} />).
</p>

<Callout kind="definition" title="Definition: matrix exponential">
	<Tex display tex={'e^{A} = I + A + \\frac{A^2}{2!} + \\frac{A^3}{3!} + \\cdots'} />
	<p>
		It always converges. The family <Tex tex={'t\\mapsto e^{tA}'} /> is the solution to <Tex tex={'\\dot{\\mathbf x} = A\\mathbf x'} />: <Tex tex={'\\mathbf x(t) = e^{tA}\\mathbf x(0)'} />. So exponentials of matrices are how linear differential equations are solved.
	</p>
</Callout>

<h2>Generators and the flows they produce</h2>
<p>
	Pick a matrix <Tex tex="A" /> and slide <Tex tex="t" />. The grid shows <Tex tex={'e^{tA}'} /> and the yellow trail follows the point <Tex tex="(1.5, 0)" />. The skew-symmetric generator produces <em>rotations</em>: exactly the rotation matrices of the previous lesson.
</p>

<Figure caption={'The matrix e^(tA) for four generators. Skew-symmetric A gives circles; a nilpotent A gives shears.'} max={620}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4} grid={false}>
		<TransformGrid matrix={E} basis square={false} extent={10} />
		{#each trail as p, i (i)}<Dot at={p} color={C.yellow} r={i === 40 ? 6 : 2.5} />{/each}
	</Plane2D>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-1.5">
			{#each gens as g, i (g.name)}
				<button class="mbtn {which === i ? 'mbtn-yellow' : 'mbtn-blue'}" style="padding: 0.45rem 0.6rem; font-size: 9px;" onclick={() => (which = i)}>{g.name}</button>
			{/each}
		</div>
		<Slider label="t" bind:value={t} min={0} max={6.3} step={0.1} />
		<span class="w-full text-center text-sm text-slate-300">{gens[which].what}</span>
		<span class="w-full text-center font-mono text-sm text-slate-200">det e^(tA) = {det(E).toFixed(3)} = e^(t·tr A) = {Math.exp(t * tr).toFixed(3)}</span>
	{/snippet}
</Figure>
<Tex display tex={'e^{tA} = ' + texMatrix(E)} />

<Callout kind="theorem" title="Facts about e^A">
	<ul class="list-disc space-y-1 pl-6">
		<li><Tex tex={'e^{A}'} /> is always invertible, with inverse <Tex tex={'e^{-A}'} />.</li>
		<li><Tex tex={'\\det e^{A} = e^{\\operatorname{tr}A}'} />. So <Tex tex={'\\operatorname{tr}A = 0'} /> gives <Tex tex={'\\det=1'} /> (the group <Tex tex={'SL_n'} />).</li>
		<li>If <Tex tex={'A^{\\mathsf T} = -A'} /> (skew-symmetric), then <Tex tex={'e^{A}'} /> is orthogonal: the generators of <Tex tex={'SO(n)'} /> are exactly the skew-symmetric matrices.</li>
		<li><Tex tex={'e^{A+B} = e^Ae^B'} /> holds when <Tex tex="A" /> and <Tex tex="B" /> commute; for non-commuting pairs it generally fails (as with 3D rotations).</li>
		<li>If <Tex tex={'A = PDP^{-1}'} /> then <Tex tex={'e^A = Pe^DP^{-1}'} /> with <Tex tex={'e^D'} /> just <Tex tex={'e^{\\lambda_i}'} /> on the diagonal.</li>
	</ul>
</Callout>

<Callout kind="intuition">
	<p>
		For the rotation generator <Tex tex={'J = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}'} /> we have <Tex tex={'J^2 = -I'} />, so the series splits into the series for cosine and sine: <Tex tex={'e^{\\theta J} = \\cos\\theta\\, I + \\sin\\theta\\, J'} />, which is the rotation matrix. This is Euler's formula <Tex tex={'e^{i\\theta} = \\cos\\theta + i\\sin\\theta'} /> in disguise. The set of generators (a vector space, the <em>Lie algebra</em>) is the tangent space of the group at the identity.
	</p>
</Callout>

<Recap
	points={[
		'$e^{A}=\\sum A^k/k!$ solves $\\dot{\\mathbf x}=A\\mathbf x$ via $\\mathbf x(t)=e^{tA}\\mathbf x_0$.',
		'$\\det e^A=e^{\\operatorname{tr}A}$; skew-symmetric $A$ gives orthogonal $e^A$ (rotations).',
		'Generators form a vector space (the Lie algebra) that linearises the group near the identity; $e^{A+B}=e^Ae^B$ needs commuting $A,B$.'
	]}
/>

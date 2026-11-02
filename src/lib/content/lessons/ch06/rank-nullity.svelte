<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { nullSpace, rank } from '#lib/math/gauss.js';
	import type { Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import WorkedExample from '#lib/components/lesson/WorkedExample.svelte';

	const calc = {
		problem:
			"Let $W = \\{p\\in P_2 : p'(0) = 0\\ \\text{and}\\ \\int_0^1 p(t)\\,dt = 0\\}$.\n(a) Show that $W$ is a subspace by writing it as the kernel of a linear map $T: P_2\\to\\mathbb R^2$.\n(b) Use rank–nullity to find $\\dim W$, then find a basis.\n(c) Is $U = \\{p\\in P_2 : p'(0) = 1\\}$ a subspace?",
		method: [
			'Put every condition into one map: $T(p) = (\\text{condition 1},\\ \\text{condition 2})$. Derivatives, integrals and evaluations at a point are all linear, so $T$ is linear and $W = \\ker T$ is a subspace.',
			'Rank: compute $T$ on the basis $1, t, t^2$ and see how many independent outputs you get.',
			'Rank–nullity: $\\dim W = \\dim P_2 - \\operatorname{rank}T = 3 - \\operatorname{rank}T$. Then find that many independent polynomials satisfying the conditions (parametrise $p = a + bt + ct^2$).',
			'A condition with a nonzero right-hand side ("$= 1$") never gives a subspace: $0$ fails it.'
		],
		steps: [
			{
				label: 'Write W as a kernel',
				text: "$T(p) = \\left(p'(0),\\ \\int_0^1 p\\right)$. Both entries are linear in $p$ ($(p + cq)' = p' + cq'$ and $\\int(p + cq) = \\int p + c\\int q$), so $T$ is linear, and $W = \\ker T$ is a subspace."
			},
			{
				label: 'Rank of T',
				text: "$T(1) = (0,\\ 1)$, $T(t) = (1,\\ \\tfrac12)$, $T(t^2) = (0,\\ \\tfrac13)$. The first two outputs are already independent and span $\\mathbb R^2$, so $\\operatorname{rank}T = 2$."
			},
			{
				label: 'Dimension by rank–nullity',
				text: '$\\dim W = \\dim\\ker T = 3 - 2 = 1$.'
			},
			{
				label: 'Find the basis',
				text: "With $p = a + bt + ct^2$: $p'(0) = b = 0$ and $\\int_0^1 p = a + \\tfrac b2 + \\tfrac c3 = 0$, so $b = 0$ and $a = -\\tfrac c3$. Then $p = c\\left(t^2 - \\tfrac13\\right)$: basis $\\{3t^2 - 1\\}$.\nCheck: $(3t^2 - 1)' = 6t$ is $0$ at $t = 0$ ✓, and $\\int_0^1(3t^2 - 1)\\,dt = 1 - 1 = 0$ ✓."
			},
			{
				label: 'Is U a subspace?',
				text: "No. The zero polynomial has $0'(0) = 0\\ne1$, so $0\\notin U$. (Also $p = t\\in U$ but $2p = 2t$ has derivative $2$ at $0$.)"
			}
		]
	};

	let m = $state<Mat>([
		[1, 2, 0, 1],
		[0, 0, 1, 1],
		[1, 2, 1, 2]
	]);
	let r = $derived(rank(m));
	let n = $derived(m[0].length);
	let nullity = $derived(nullSpace(m).length);
</script>

<p>
	A linear map can lose some dimensions (the kernel) and keep the rest (the image). The <strong class="text-slate-50">rank–nullity theorem</strong> says the books always balance: nothing is created or destroyed, only moved between the two.
</p>

<Callout kind="theorem" title="Theorem (rank–nullity)">
	<p>
		If <Tex tex="V" /> is finite-dimensional and <Tex tex={'T: V\\to W'} /> is linear, then
		<Tex display tex={'\\dim V = \\dim \\ker T + \\dim \\operatorname{Im} T = \\text{nullity}(T) + \\operatorname{rank}(T).'} />
	</p>
</Callout>

<h2>Why it is true</h2>
<p>
	Pick a basis of the kernel (say <Tex tex="k" /> vectors) and extend it to a basis of all of <Tex tex="V" /> by adding <Tex tex={'n-k'} /> more vectors. The kernel vectors all go to
	<Tex tex={'\\mathbf 0'} />. The extra <Tex tex={'n-k'} /> vectors go to vectors that turn out to be a <em>basis of the image</em>: they span it, and they are independent since any dependency would put a combination in the kernel. So rank <Tex tex={'= n - k'} />.
</p>

<h2>Check it on any matrix</h2>
<p>
	For a matrix, <Tex tex="n" /> is the number of <em>columns</em> (the input dimension). Free columns count the nullity, pivot columns count the rank. Edit the matrix freely.
</p>
<Figure caption="Pivot columns + free columns = all columns, always." max={640}>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#snippet controls()}
		<div class="font-pixel flex items-center gap-3 text-[11px] text-slate-100">
			<span class="text-sky-300">rank {r}</span>
			<span>+</span>
			<span class="text-rose-300">nullity {nullity}</span>
			<span>=</span>
			<span class="text-[#fbd000]">{r + nullity} = n = {n}</span>
		</div>
	{/snippet}
</Figure>

<h2>What it lets you conclude</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li>A map from a bigger space to a smaller one (<Tex tex={'\\dim V > \\dim W'} />) must have a nonzero kernel: it cannot be one-to-one.</li>
	<li>A map from a smaller space to a bigger one cannot be onto.</li>
	<li>For a map between spaces of the <em>same</em> dimension, injective, surjective and invertible are all equivalent.</li>
</ul>
<p>
	Example: differentiation <Tex tex={'D : P_3 \\to P_3'} /> (cubics to cubics) has kernel the constants (dimension 1), so its image has dimension 3: derivatives of cubics are quadratics, and indeed they form a 3-dimensional space.
</p>

<h2>Dimension of a subspace without solving for it</h2>
<p>
	Rank–nullity is the quickest way to get the dimension of a subspace cut out by conditions. Package the conditions as one linear map <Tex tex="T" />; the subspace is
	<Tex tex={'\\ker T'} />, and <Tex tex={'\\dim\\ker T = \\dim V - \\operatorname{rank}T'} />. Each independent condition lowers the dimension by one (Axler's version of "each pivot uses up an
	unknown").
</p>

<WorkedExample title="a subspace defined by a derivative and an integral" problem={calc.problem} method={calc.method} steps={calc.steps} credit="Kernels of linear functionals on polynomial spaces, after Axler, Chapter 3." />

<Recap
	points={[
		'A subspace cut out by $k$ independent linear conditions in $V$ has dimension $\\dim V - k$ (it is the kernel of a map of rank $k$).',
		'$\\dim V = \\dim\\ker T + \\dim\\operatorname{Im}T$.',
		'For a matrix with $n$ columns: pivots + free columns $= n$.',
		'Same dimensions in and out: injective ⇔ surjective ⇔ invertible.'
	]}
/>

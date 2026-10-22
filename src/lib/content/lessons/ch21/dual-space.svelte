<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { inverse, mulVec } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let b1 = $state([2, 0.5]);
	let b2 = $state([0.5, 1.5]);
	let v = $state([2.5, 2]);

	let P = $derived([
		[b1[0], b2[0]],
		[b1[1], b2[1]]
	]);
	let Pinv = $derived(inverse(P));
	let c = $derived(Pinv ? mulVec(Pinv, v) : null);
</script>

<p>
	We have treated "a column of numbers" and "a row of numbers" as interchangeable, using the transpose to convert. That is fine in <Tex tex={'\\mathbb{R}^n'} /> with the dot product, but they are really <em>different kinds of object</em>, and the difference matters as soon as you change basis.
</p>

<h2>Functionals: measuring sticks</h2>
<Callout kind="definition" title="Definition: linear functional and dual space">
	<p>
		A <em>linear functional</em> on <Tex tex="V" /> is a linear map <Tex tex={'\\varphi: V \\to \\mathbb{R}'} />. All of them together form the <em>dual space</em> <Tex tex={'V^*'} />, which has the same dimension as <Tex tex="V" />. On <Tex tex={'\\mathbb{R}^n'} /> every functional is <Tex tex={'\\varphi(\\mathbf x) = \\mathbf w^{\\mathsf T}\\mathbf x'} /> for a row vector <Tex tex={'\\mathbf w^{\\mathsf T}'} />.
	</p>
</Callout>
<p>
	A vector is a <em>thing</em> (an arrow); a functional is a <em>measurement</em> (a family of parallel level lines that assigns each arrow a number). Examples: "the x-coordinate", "evaluation of a polynomial at 3", "the integral of a function".
</p>

<h2>The dual basis</h2>
<p>
	Given a basis <Tex tex={'\\mathbf b_1, \\mathbf b_2'} />, the <strong class="text-slate-50">dual basis</strong> <Tex tex={'\\varphi_1,\\varphi_2'} /> is defined by <Tex tex={'\\varphi_i(\\mathbf b_j) = 1'} /> if <Tex tex={'i=j'} /> and <Tex tex="0" /> otherwise. Geometrically, the level line <Tex tex={'\\varphi_1 = 1'} /> passes through <Tex tex={'\\mathbf b_1'} /> and runs parallel to <Tex tex={'\\mathbf b_2'} />. And <Tex tex={'\\varphi_i(\\mathbf v)'} /> is exactly the <Tex tex="i" />-th coordinate of <Tex tex={'\\mathbf v'} />.
</p>

<Figure caption="Green lines are φ₁ = 0 and φ₁ = 1; red lines are φ₂ = 0 and φ₂ = 1. Drag the basis vectors and v: the coordinates are read by counting level lines." max={620}>
	<Plane2D xmin={-4} xmax={6} ymin={-3} ymax={4}>
		{#if Pinv}
			<Line point={[0, 0]} dir={b2} color={C.iHat} width={2} opacity={0.7} />
			<Line point={b1} dir={b2} color={C.iHat} width={2} opacity={0.7} dashed />
			<Line point={[0, 0]} dir={b1} color={C.jHat} width={2} opacity={0.7} />
			<Line point={b2} dir={b1} color={C.jHat} width={2} opacity={0.7} dashed />
		{/if}
		<DragVector bind:value={b1} color={C.iHat} label="b₁" snap={0.5} limit={4} />
		<DragVector bind:value={b2} color={C.jHat} label="b₂" snap={0.5} limit={4} />
		<DragVector bind:value={v} color={C.yellow} label="v" snap={0.5} limit={5} />
	</Plane2D>
	{#snippet controls()}
		{#if c && Pinv}
			<div class="space-y-1 text-center font-mono text-sm text-slate-100">
				<p>φ₁ = row 1 of P⁻¹ = ({Pinv[0].map((x) => x.toFixed(2)).join(', ')}), φ₂ = ({Pinv[1].map((x) => x.toFixed(2)).join(', ')})</p>
				<p>φ₁(v) = {c[0].toFixed(2)}, φ₂(v) = {c[1].toFixed(2)} → v = {c[0].toFixed(2)}·b₁ + {c[1].toFixed(2)}·b₂</p>
			</div>
		{:else}
			<span class="text-sm text-rose-300">b₁ and b₂ are parallel: no basis, no dual basis.</span>
		{/if}
	{/snippet}
</Figure>

<Callout kind="theorem" title="Dual basis = rows of P⁻¹">
	<p>
		If the basis vectors are the columns of <Tex tex="P" />, the dual basis functionals are the <strong class="text-slate-50">rows of <Tex tex={'P^{-1}'} /></strong>, because <Tex tex={'P^{-1}P = I'} /> says <Tex tex={'\\varphi_i(\\mathbf b_j) = \\delta_{ij}'} />. So the formula <Tex tex={'[\\mathbf v]_B = P^{-1}\\mathbf v'} /> from chapter 5 literally means: coordinates are the values of the dual basis.
	</p>
</Callout>

<Callout kind="intuition">
	<p>
		Notice how vectors and functionals respond to a stretched basis: stretching a basis vector <Tex tex={'\\mathbf b_1'} /> makes the coordinate of any fixed vector smaller (it needs fewer, longer steps), while the level lines of <Tex tex={'\\varphi_1'} /> move further apart (the line <Tex tex={'\\varphi_1 = 1'} /> passes through the longer <Tex tex={'\\mathbf b_1'} />). That opposite transformation behaviour is why physicists call them contravariant and covariant.
	</p>
</Callout>

<Recap
	points={[
		'A **functional** is a linear map $V\\to\\mathbb{R}$; they form the **dual space** $V^*$, of the same dimension as $V$.',
		'The dual basis satisfies $\\varphi_i(\\mathbf b_j)=\\delta_{ij}$ and is given by the rows of $P^{-1}$.',
		'Coordinates of $\\mathbf v$ are the values $\\varphi_i(\\mathbf v)$; vectors and functionals transform in opposite ways under a change of basis.'
	]}
/>

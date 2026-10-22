<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import { dot, norm, projectOnto, sub, unit } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let a = $state([3, 1]);
	let b = $state([2, 3]);
	let step = $state(0);

	let q1 = $derived(unit(a));
	let p = $derived(projectOnto(b, a));
	let r = $derived(sub(b, p));
	let q2 = $derived(unit(r));
	let ok = $derived(norm(r) > 0.05 && norm(a) > 0.05);
</script>

<p>
	Orthonormal bases are wonderful, but the basis you are handed is usually skewed. <strong class="text-slate-50">Gram–Schmidt</strong> is the procedure that straightens any basis into an orthonormal one,
	spanning exactly the same spaces along the way.
</p>

<h2>The idea in 2D</h2>
<ol class="list-decimal space-y-1.5 pl-6">
	<li>Keep the first vector's direction: <Tex tex={'\\mathbf q_1 = \\mathbf a/\\|\\mathbf a\\|'} />.</li>
	<li>Remove from <Tex tex={'\\mathbf b'} /> its shadow on <Tex tex={'\\mathbf a'} />. What is left is perpendicular to <Tex tex={'\\mathbf a'} />.</li>
	<li>Normalise the leftover: <Tex tex={'\\mathbf q_2 = \\mathbf r/\\|\\mathbf r\\|'} />.</li>
</ol>

<Figure caption="Drag a and b, then step through the procedure. At each stage the new vectors span the same space as before." max={620}>
	<Plane2D xmin={-3} xmax={7} ymin={-2} ymax={6}>
		{#if step >= 1 && ok}
			<Arrow to={q1} color={C.iHat} width={4} label="q₁" />
		{/if}
		{#if step >= 2 && ok}
			<Arrow to={p} color={C.purple} dashed width={2.5} label="proj" dx={8} dy={20} />
			<Arrow from={p} to={b} color={C.orange} dashed width={2.5} label="r" />
			<Arrow to={r} color={C.orange} width={3} opacity={0.7} />
		{/if}
		{#if step >= 3 && ok}
			<Arrow to={q2} color={C.jHat} width={4} label="q₂" />
		{/if}
		<DragVector bind:value={a} color={C.blue} label="a" snap={0.5} limit={6} />
		<DragVector bind:value={b} color={C.yellow} label="b" snap={0.5} limit={6} />
	</Plane2D>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-2">
			<button class="mbtn mbtn-blue" disabled={step === 0} onclick={() => step--}>◀ Back</button>
			<button class="mbtn mbtn-green" disabled={step === 3} onclick={() => step++}>Next ▶</button>
		</div>
		<span class="w-full text-center text-sm text-slate-300">
			{#if !ok}a and b are parallel: Gram–Schmidt drops dependent vectors.
			{:else if step === 0}Start with the two given vectors.
			{:else if step === 1}Step 1: q₁ is a scaled to length 1.
			{:else if step === 2}Step 2: subtract the projection of b on a. The remainder r is perpendicular to a (r·a = {dot(r, a).toFixed(2)}).
			{:else}Step 3: q₂ = r / ‖r‖. Now q₁·q₂ = {dot(q1, q2).toFixed(2)} and both have length 1.{/if}
		</span>
	{/snippet}
</Figure>

<h2>The general recipe</h2>
<Callout kind="theorem" title="Gram–Schmidt">
	<p>
		Given independent <Tex tex={'\\mathbf a_1,\\dots,\\mathbf a_n'} />, define
		<Tex display tex={'\\mathbf r_k = \\mathbf a_k - \\sum_{j<k} (\\mathbf q_j\\cdot\\mathbf a_k)\\,\\mathbf q_j,\\qquad \\mathbf q_k = \\frac{\\mathbf r_k}{\\|\\mathbf r_k\\|}.'} />
		Then <Tex tex={'\\mathbf q_1,\\dots,\\mathbf q_n'} /> is orthonormal and <Tex tex={'\\operatorname{span}(\\mathbf q_1..\\mathbf q_k) = \\operatorname{span}(\\mathbf a_1..\\mathbf a_k)'} /> for each <Tex tex="k" />.
	</p>
</Callout>
<p>
	In matrix language this is the <strong class="text-slate-50">QR factorisation</strong> <Tex tex={'A = QR'} />: <Tex tex="Q" /> has the orthonormal columns and <Tex tex="R" /> is upper triangular, recording how each original vector was built from the new ones. It is the engine behind numerically stable least squares.
</p>

<Recap
	points={[
		'Gram–Schmidt: subtract from each vector its projections onto the earlier ones, then normalise.',
		'The new vectors are orthonormal and span the same nested subspaces.',
		'In matrix form it is $A=QR$ with $Q$ orthonormal columns and $R$ upper triangular.'
	]}
/>

<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { det, mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let A = $state<Mat>([
		[2, 1],
		[0, 1]
	]);
	let B = $state<Mat>([
		[1, 1],
		[1, 3]
	]);
	let AB = $derived(mul(A, B));
	let BA = $derived(mul(B, A));
</script>

<p>
	Chapter 3 said a product of matrices means "do one transformation, then another". If the first multiplies areas by <Tex tex={'\\det B'} /> and the second by <Tex tex={'\\det A'} />, what does the combination do?
	The factors <em>multiply</em>.
</p>

<Callout kind="theorem" title="Theorem (multiplicativity)">
	<Tex display tex={'\\det(AB) = \\det(A)\\,\\det(B).'} />
</Callout>

<h2>Test it yourself</h2>
<Figure caption="Edit A and B. The determinant of the product always equals the product of the determinants, even though AB and BA are different matrices." max={660}>
	<div class="flex flex-wrap items-center justify-center gap-4">
		<div class="text-center"><p class="font-pixel mb-1 text-[9px] text-slate-400">A</p><MatrixInput bind:value={A} step={1} label="A" /></div>
		<div class="text-center"><p class="font-pixel mb-1 text-[9px] text-slate-400">B</p><MatrixInput bind:value={B} step={1} label="B" /></div>
	</div>
	<div class="space-y-1 text-center font-mono text-sm text-slate-100">
		<p>det A = {det(A).toFixed(2)}, det B = {det(B).toFixed(2)}</p>
		<p>det A · det B = <span class="text-amber-300">{(det(A) * det(B)).toFixed(2)}</span></p>
		<p>det(AB) = <span class="text-emerald-300">{det(AB).toFixed(2)}</span>, det(BA) = <span class="text-emerald-300">{det(BA).toFixed(2)}</span></p>
	</div>
	<Tex display tex={'AB = ' + texMatrix(AB) + ',\\qquad BA = ' + texMatrix(BA)} />
</Figure>

<h2>Why it must be true</h2>
<p>
	Think geometrically. <Tex tex="B" /> scales every area by <Tex tex={'|\\det B|'} />, so the unit square becomes a parallelogram of that area. Then <Tex tex="A" /> scales <em>every</em> area, including that parallelogram, by <Tex tex={'|\\det A|'} />. The total factor is the product. Signs multiply too: two flips cancel.
</p>

<h2>Consequences</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><Tex tex={'\\det(A^{-1}) = 1/\\det A'} />, because <Tex tex={'\\det(A)\\det(A^{-1}) = \\det I = 1'} />.</li>
	<li><Tex tex={'\\det(A^k) = (\\det A)^k'} />.</li>
	<li>Similar matrices have the same determinant: <Tex tex={'\\det(P^{-1}AP) = \\det(P)^{-1}\\det(A)\\det(P) = \\det A'} />. The determinant belongs to the <em>map</em>, not to any basis.</li>
	<li>But <Tex tex={'\\det(A+B)'} /> is <em>not</em> <Tex tex={'\\det A + \\det B'} /> in general. Determinants respect products, not sums.</li>
</ul>

<Recap
	points={[
		'$\\det(AB)=\\det A\\cdot\\det B$: scaling factors compound.',
		'So $\\det(A^{-1})=1/\\det A$ and $\\det(P^{-1}AP)=\\det A$.',
		'No such rule holds for sums.'
	]}
/>

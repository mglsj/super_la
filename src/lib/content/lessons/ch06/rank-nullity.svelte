<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { nullSpace, rank } from '#lib/math/gauss.js';
	import type { Mat } from '#lib/math/mat.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

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

<Recap
	points={[
		'$\\dim V = \\dim\\ker T + \\dim\\operatorname{Im}T$.',
		'For a matrix with $n$ columns: pivots + free columns $= n$.',
		'Same dimensions in and out: injective ⇔ surjective ⇔ invertible.'
	]}
/>

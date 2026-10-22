<script lang="ts">
	import { eigSym } from '#lib/math/decomp.js';
	import { eigen2 } from '#lib/math/eigen.js';
	import { inverse, mul, transpose, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let t = $state(1);
	let s = $state(2);
	const M: Mat = [
		[2, 1],
		[1, 3]
	];
	let P = $derived<Mat>([
		[1, t],
		[0, s]
	]);
	let Pinv = $derived(inverse(P)!);
	let cong = $derived(mul(transpose(P), mul(M, P)));
	let sim = $derived(mul(Pinv, mul(M, P)));
	let eM = $derived(eigSym(M).values);
	let eC = $derived(eigSym(cong).values);
	let eS = $derived(eigen2(sim));
	const f = (x: number) => x.toFixed(3);
	let signs = $derived((v: number[]) => v.map((x) => (x > 1e-9 ? '+' : x < -1e-9 ? '−' : '0')).join(' '));
</script>

<p>
	A matrix can play two different roles: it can be the matrix of a <em>linear map</em> (vectors in, vectors out), or the matrix of a <strong class="text-slate-50">bilinear form</strong> (two vectors in, one number out). They look identical on paper but behave differently when you change basis.
</p>

<Callout kind="definition" title="Definition: bilinear form">
	<p>
		A function <Tex tex={'B(\\mathbf x, \\mathbf y)'} /> that is linear in each argument. In coordinates <Tex tex={'B(\\mathbf x,\\mathbf y) = \\mathbf x^{\\mathsf T}M\\mathbf y'} />, with <Tex tex={'M_{ij} = B(\\mathbf e_i, \\mathbf e_j)'} />. Dot products, inner products and the quadratic forms of chapter 13 are examples.
	</p>
</Callout>

<h2>Two different transformation rules</h2>
<p>
	Let <Tex tex="P" /> be a change of basis (new basis vectors are the columns of <Tex tex="P" />).
</p>
<ul class="list-disc space-y-1.5 pl-6">
	<li>A <strong class="text-slate-50">linear map</strong> with matrix <Tex tex="M" /> gets the matrix <Tex tex={'P^{-1}MP'} /> (<em>similarity</em>, chapter 6).</li>
	<li>A <strong class="text-slate-50">bilinear form</strong> with matrix <Tex tex="M" /> gets the matrix <Tex tex={'P^{\\mathsf T}MP'} /> (<em>congruence</em>): evaluate <Tex tex={'B(P\\mathbf x, P\\mathbf y) = \\mathbf x^{\\mathsf T}P^{\\mathsf T}MP\\mathbf y'} />.</li>
</ul>
<p>
	They agree only when <Tex tex={'P^{-1} = P^{\\mathsf T}'} />, i.e. for orthogonal <Tex tex="P" />, which is exactly why it is easy to confuse them in an orthonormal world.
</p>

<Figure caption="Same M, same change of basis P = [[1, t], [0, s]]. Similarity preserves eigenvalues. Congruence changes them, but keeps their signs." max={680}>
	{#snippet controls()}
		<Slider label="t" bind:value={t} min={-2} max={2} step={0.25} />
		<Slider label="s" bind:value={s} min={0.25} max={3} step={0.25} />
	{/snippet}
	<div class="space-y-2 text-center font-mono text-xs text-slate-200 sm:text-sm">
		<Tex display tex={'M = ' + texMatrix(M) + ',\\; P = ' + texMatrix(P)} />
		<p><span class="text-slate-400">eigenvalues of M:</span> {eM.map(f).join(', ')} <span class="text-slate-500">(signs {signs(eM)})</span></p>
		<p><span class="text-sky-300">similarity P⁻¹MP:</span> {eS.values.length ? eS.values.map(f).join(', ') : 'complex'} <span class="text-slate-500">(same eigenvalues)</span></p>
		<p><span class="text-amber-300">congruence PᵀMP:</span> {eC.map(f).join(', ')} <span class="text-slate-500">(signs {signs(eC)}: same as M)</span></p>
	</div>
	<Tex display tex={'P^{-1}MP = ' + texMatrix(sim) + ',\\qquad P^{\\mathsf T}MP = ' + texMatrix(cong)} />
</Figure>

<Callout kind="theorem" title="Sylvester's law of inertia">
	<p>
		Congruence preserves the <em>number of positive, negative and zero eigenvalues</em> of a symmetric matrix (its <em>signature</em>), even though it changes the eigenvalues themselves. So "positive definite" is a basis-independent property of the form: <Tex tex={'P^{\\mathsf T}MP'} /> is positive definite iff <Tex tex="M" /> is (for invertible <Tex tex="P" />).
	</p>
</Callout>

<Callout kind="intuition">
	<p>
		This is the answer to "why do eigenvalues matter for a quadratic form?" in chapter 13: you cannot change the signature by changing the basis, so a bowl is a bowl and a saddle is a saddle in any coordinates. The <em>sizes</em> of the eigenvalues, however, depend on the rulers you use.
	</p>
</Callout>

<Recap
	points={[
		'A **bilinear form** $B(\\mathbf x,\\mathbf y)=\\mathbf x^{\\mathsf T}M\\mathbf y$ takes two vectors and gives a number.',
		'Under a change of basis, maps transform by $P^{-1}MP$ (similarity), forms by $P^{\\mathsf T}MP$ (congruence).',
		'**Sylvester\'s law of inertia:** congruence preserves the signs of the eigenvalues (the signature), not their sizes.'
	]}
/>

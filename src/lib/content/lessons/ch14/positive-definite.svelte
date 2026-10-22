<script lang="ts">
	import Heatmap from '#lib/viz/Heatmap.svelte';
	import { eigSym } from '#lib/math/decomp.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let a = $state(2);
	let b = $state(1);
	let c = $state(2);

	let ev = $derived(eigSym([[a, b], [b, c]]).values);
	let grid = $derived(
		Array.from({ length: 41 }, (_, i) =>
			Array.from({ length: 41 }, (_, j) => {
				const x = (j - 20) / 10;
				const y = (20 - i) / 10;
				return a * x * x + 2 * b * x * y + c * y * y;
			})
		)
	);
	let kind = $derived(
		Math.abs(ev[0]) < 1e-9 && Math.abs(ev[1]) < 1e-9 ? 'the zero matrix' : ev[1] > 1e-9 ? 'positive definite' : ev[0] < -1e-9 && ev[1] < -1e-9 ? 'negative definite' : ev[1] >= -1e-9 && ev[0] > 1e-9 ? 'positive semidefinite' : ev[0] <= 1e-9 && ev[1] < -1e-9 && ev[0] > -1e-9 ? 'negative semidefinite' : 'indefinite'
	);
</script>

<p>
	Positive numbers are nice: <Tex tex="x^2 > 0" /> for every nonzero <Tex tex="x" />. Which matrices behave like that? The answer carves out the most important class in applied linear algebra.
</p>

<Callout kind="definition" title="Definition: positive definite">
	<p>
		A symmetric matrix <Tex tex="A" /> is <strong class="text-slate-50">positive definite</strong> (PD) if <Tex tex={'\\mathbf x^{\\mathsf T}A\\mathbf x > 0'} /> for every <Tex tex={'\\mathbf x \\ne \\mathbf 0'} />. It is <em>positive semidefinite</em> (PSD) if
		<Tex tex={'\\ge 0'} /> for all <Tex tex={'\\mathbf x'} />.
	</p>
</Callout>

<h2>Bowls and saddles</h2>
<p>
	Plot <Tex tex={'q(x, y) = ax^2 + 2bxy + cy^2'} /> over the plane: red where it is positive, blue where negative. A positive definite matrix gives an all-red bowl with a unique minimum at the origin. When one eigenvalue is negative you get a saddle, red in some directions and blue in others.
</p>

<Figure caption="Sign of x^T A x over the square [−2, 2]². All red means positive definite." max={560}>
	<Heatmap matrix={grid} cell={9} range={6} label="Sign of the quadratic form over the plane" />
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={-3} max={4} step={0.5} />
		<Slider label="b" bind:value={b} min={-3} max={3} step={0.5} />
		<Slider label="c" bind:value={c} min={-3} max={4} step={0.5} />
		<span class="w-full text-center font-mono text-sm text-slate-200">
			eigenvalues {ev[0].toFixed(2)}, {ev[1].toFixed(2)} → <span class="text-amber-300">{kind}</span>
		</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Equivalent descriptions">
	<p>For a symmetric <Tex tex="A" />, these are all the same condition:</p>
	<ul class="list-disc space-y-1 pl-6">
		<li><Tex tex={'\\mathbf x^{\\mathsf T}A\\mathbf x > 0'} /> for all nonzero <Tex tex={'\\mathbf x'} />.</li>
		<li>All eigenvalues of <Tex tex="A" /> are positive.</li>
		<li>All pivots (in elimination, no swaps) are positive.</li>
		<li><Tex tex={'A = R^{\\mathsf T}R'} /> for some matrix <Tex tex="R" /> with independent columns.</li>
	</ul>
</Callout>

<h2>Why eigenvalues decide it</h2>
<p>
	In the eigenbasis, <Tex tex={'\\mathbf x^{\\mathsf T}A\\mathbf x = \\lambda_1c_1^2 + \\dots + \\lambda_nc_n^2'} />. That is positive for every nonzero <Tex tex={'\\mathbf x'} /> exactly when every <Tex tex={'\\lambda_i > 0'} />. A single negative eigenvalue gives a direction (its eigenvector) along which the form is negative.
</p>
<p>
	For <Tex tex={'2\\times2'} />: <Tex tex={'\\begin{bmatrix}a&b\\\\b&c\\end{bmatrix}'} /> is PD exactly when <Tex tex={'a > 0'} /> and <Tex tex={'ac - b^2 > 0'} />.
</p>

<Recap
	points={[
		'**Positive definite**: symmetric with $\\mathbf x^{\\mathsf T}A\\mathbf x>0$ for all $\\mathbf x\\neq\\mathbf 0$ (a bowl).',
		'Equivalent: all eigenvalues positive; all pivots positive; $A=R^{\\mathsf T}R$ with independent columns.',
		'For $2\\times2$: $a>0$ and $ac-b^2>0$. One negative eigenvalue makes a saddle.'
	]}
/>

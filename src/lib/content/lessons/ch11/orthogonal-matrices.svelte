<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import { det, mul, transpose, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let deg = $state(35);
	let flip = $state(false);
	let rad = $derived((deg * Math.PI) / 180);
	// rotation, optionally followed by a reflection across the x-axis
	let Q = $derived<Mat>(
		flip
			? [
					[Math.cos(rad), -Math.sin(rad)],
					[-Math.sin(rad), -Math.cos(rad)]
				]
			: [
					[Math.cos(rad), -Math.sin(rad)],
					[Math.sin(rad), Math.cos(rad)]
				]
	);
	let QtQ = $derived(mul(transpose(Q), Q));
	let circle = $derived(
		Array.from({ length: 64 }, (_, i) => {
			const t = (i / 64) * 2 * Math.PI;
			return [Q[0][0] * Math.cos(t) + Q[0][1] * Math.sin(t), Q[1][0] * Math.cos(t) + Q[1][1] * Math.sin(t)];
		})
	);
</script>

<p>
	Some matrices move space without distorting it: no stretching, no shearing, only rotating and flipping. They are called <strong class="text-slate-50">orthogonal matrices</strong>, and they are the symmetries of Euclidean geometry.
</p>

<Callout kind="definition" title="Definition: orthogonal matrix">
	<p>
		A square real matrix <Tex tex="Q" /> is <em>orthogonal</em> if its columns are orthonormal. Equivalently,
		<Tex display tex={'Q^{\\mathsf T}Q = I \\quad\\text{i.e.}\\quad Q^{-1} = Q^{\\mathsf T}.'} />
	</p>
</Callout>

<h2>Rotations and reflections</h2>
<p>
	Turn the angle and toggle the mirror. The grid cells stay perfect unit squares, the yellow unit circle stays a circle, and the matrix <Tex tex={'Q^{\\mathsf T}Q'} /> stays the identity.
</p>

<Figure caption="Orthogonal matrices preserve length: the unit circle maps to itself." max={620}>
	<Plane2D xmin={-3} xmax={3} ymin={-2.5} ymax={2.5} grid={false}>
		<TransformGrid matrix={Q} extent={8} />
		<Polygon points={circle} fill={C.yellow} fillOpacity={0.08} stroke={C.yellow} width={2} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="angle" bind:value={deg} min={0} max={360} step={5} display="{deg}°" />
		<label class="flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={flip} /> add a reflection</label>
		<span class="w-full text-center font-mono text-sm text-slate-100">det Q = <span class="text-amber-300">{det(Q).toFixed(0)}</span></span>
	{/snippet}
</Figure>
<Tex display tex={'Q^{\\mathsf T}Q = ' + texMatrix(QtQ)} />

<Callout kind="theorem" title="What orthogonal matrices preserve">
	<p>
		For orthogonal <Tex tex="Q" /> and all vectors: <Tex tex={'(Q\\mathbf x)\\cdot(Q\\mathbf y) = \\mathbf x\\cdot\\mathbf y'} />. So <strong class="text-slate-50">lengths and angles</strong> are unchanged. The determinant is <Tex tex={'\\pm1'} />: <Tex tex="+1" /> for rotations, <Tex tex="-1" /> for reflections.
		Products and inverses of orthogonal matrices are orthogonal too.
	</p>
</Callout>
<p>
	Proof of the key step: <Tex tex={'(Q\\mathbf x)\\cdot(Q\\mathbf y) = \\mathbf x^{\\mathsf T}Q^{\\mathsf T}Q\\mathbf y = \\mathbf x^{\\mathsf T}\\mathbf y'} />.
</p>

<Callout kind="intuition">
	<p>
		Orthogonal matrices are the gold standard in numerical computing: multiplying by them never magnifies rounding errors, and inverting them is free (just transpose). That is why QR factorisation and the SVD are built from them.
	</p>
</Callout>

<Recap
	points={[
		'$Q$ is orthogonal when its columns are orthonormal: $Q^{\\mathsf T}Q=I$, so $Q^{-1}=Q^{\\mathsf T}$.',
		'Orthogonal matrices preserve dot products, hence lengths and angles; $\\det Q=\\pm1$.',
		'In 2D they are exactly the rotations ($\\det=1$) and reflections ($\\det=-1$).'
	]}
/>

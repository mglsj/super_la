<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let w = $state(3);
	let a = $state([2, 1]);
	let b = $state([-1, 2]);

	const ip = (x: number[], y: number[]) => x[0] * y[0] + w * x[1] * y[1];
	let ab = $derived(ip(a, b));
	let na = $derived(Math.sqrt(ip(a, a)));
	let nb = $derived(Math.sqrt(ip(b, b)));
	let ang = $derived(na > 0.01 && nb > 0.01 ? (Math.acos(Math.max(-1, Math.min(1, ab / (na * nb)))) * 180) / Math.PI : 0);
	let ball = $derived(Array.from({ length: 80 }, (_, i) => [Math.cos((i / 80) * 2 * Math.PI), Math.sin((i / 80) * 2 * Math.PI) / Math.sqrt(w)]));
	let stdDot = $derived(a[0] * b[0] + a[1] * b[1]);
</script>

<p>
	The dot product gave us length, angle and perpendicularity. The remarkable thing is that those three ideas need only a few properties of the dot product, and <em>many other rules</em> have the same properties. Abstracting them gives the
	<strong class="text-slate-50">inner product</strong>.
</p>

<Callout kind="definition" title="Definition: real inner product">
	<p>
		An inner product on a real vector space <Tex tex="V" /> is a function <Tex tex={'\\langle\\cdot,\\cdot\\rangle : V\\times V \\to \\mathbb{R}'} /> that is
	</p>
	<ul class="list-disc space-y-1 pl-6">
		<li><strong class="text-slate-50">symmetric:</strong> <Tex tex={'\\langle \\mathbf u,\\mathbf v\\rangle = \\langle \\mathbf v,\\mathbf u\\rangle'} />,</li>
		<li><strong class="text-slate-50">linear</strong> in each slot, and</li>
		<li><strong class="text-slate-50">positive definite:</strong> <Tex tex={'\\langle \\mathbf v,\\mathbf v\\rangle > 0'} /> for <Tex tex={'\\mathbf v \\ne \\mathbf 0'} />.</li>
	</ul>
	<p>Length is then <Tex tex={'\\|\\mathbf v\\| = \\sqrt{\\langle \\mathbf v,\\mathbf v\\rangle}'} />, and orthogonal means <Tex tex={'\\langle\\mathbf u,\\mathbf v\\rangle = 0'} />.</p>
</Callout>

<h2>A different ruler</h2>
<p>
	Consider <Tex tex={'\\langle \\mathbf x,\\mathbf y\\rangle = x_1y_1 + w\\,x_2y_2'} /> with a weight <Tex tex={'w > 0'} />. It is symmetric, linear and positive definite, so it is a genuine inner product, where the second direction counts <Tex tex="w" /> times as much.
	The "unit circle" <Tex tex={'\\|\\mathbf x\\| = 1'} /> becomes an ellipse. Vectors that look perpendicular under the standard rule may not be perpendicular under this one.
</p>

<Figure caption="Yellow: the set of vectors of length 1 under this inner product. Change w and watch lengths, angles and orthogonality all change." max={620}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3}>
		<Polygon points={ball} fill={C.yellow} fillOpacity={0.1} stroke={C.yellow} width={2} />
		<DragVector bind:value={a} color={C.blue} label="a" snap={0.5} limit={3.5} />
		<DragVector bind:value={b} color={C.jHat} label="b" snap={0.5} limit={3.5} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="w" bind:value={w} min={0.25} max={4} step={0.25} display={w.toFixed(2)} />
		<div class="grid w-full gap-x-6 font-mono text-sm sm:grid-cols-2">
			<span>⟨a,b⟩ = <span class="text-amber-300">{ab.toFixed(2)}</span></span>
			<span>angle = <span class="text-teal-300">{ang.toFixed(1)}°</span></span>
			<span>‖a‖ = {na.toFixed(2)}, ‖b‖ = {nb.toFixed(2)}</span>
			<span class="text-slate-400">ordinary a·b = {stdDot.toFixed(2)}</span>
			<span class="font-sans text-slate-400 sm:col-span-2">|⟨a,b⟩| = {Math.abs(ab).toFixed(2)} ≤ ‖a‖‖b‖ = {(na * nb).toFixed(2)} (Cauchy–Schwarz)</span>
		</div>
	{/snippet}
</Figure>

<h2>Everything survives</h2>
<Callout kind="theorem" title="Cauchy–Schwarz and the triangle inequality">
	<p>
		In every inner product space, <Tex tex={'|\\langle\\mathbf u,\\mathbf v\\rangle| \\le \\|\\mathbf u\\|\\,\\|\\mathbf v\\|'} /> (with equality iff the vectors are parallel), and <Tex tex={'\\|\\mathbf u+\\mathbf v\\| \\le \\|\\mathbf u\\|+\\|\\mathbf v\\|'} />.
		The first is what lets us define an angle via <Tex tex={'\\cos\\theta = \\langle\\mathbf u,\\mathbf v\\rangle/(\\|\\mathbf u\\|\\|\\mathbf v\\|)'} />.
	</p>
</Callout>
<p>
	Inner products also live in spaces of functions. On continuous functions on <Tex tex={'[0,1]'} />, <Tex tex={'\\langle f, g\\rangle = \\int_0^1 f(x)g(x)\\,dx'} /> works, and then "<Tex tex={'f'} /> and <Tex tex={'g'} /> are orthogonal" has a meaning. This is the starting point of Fourier series.
</p>

<Recap
	points={[
		'An **inner product** is symmetric, linear in each slot and positive definite; it gives length, angle and orthogonality.',
		'Different inner products give different geometries (weighted dot product → ellipses).',
		'Cauchy–Schwarz and the triangle inequality hold in every inner product space.'
	]}
/>

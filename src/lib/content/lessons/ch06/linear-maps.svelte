<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import FuncGrid from '#lib/viz/FuncGrid.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	const ang = Math.PI / 6;
	const maps: { name: string; f: (v: number[]) => number[] }[] = [
		{ name: 'Rotate 30°', f: ([x, y]) => [Math.cos(ang) * x - Math.sin(ang) * y, Math.sin(ang) * x + Math.cos(ang) * y] },
		{ name: 'Stretch x by 2', f: ([x, y]) => [2 * x, y] },
		{ name: 'Shear', f: ([x, y]) => [x + 0.5 * y, y] },
		{ name: 'Translate by (1,1)', f: ([x, y]) => [x + 1, y + 1] },
		{ name: 'Bend: y + 0.15x²', f: ([x, y]) => [x, y + 0.15 * x * x] },
		{ name: 'Square x', f: ([x, y]) => [0.5 * x * x * Math.sign(x), y] }
	];
	let which = $state(0);
	let F = $derived(maps[which].f);

	const u = [1, 1];
	const w = [1, -0.5];
	const add = (a: number[], b: number[]) => [a[0] + b[0], a[1] + b[1]];
	const close = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-9;
	let additive = $derived(close(F(add(u, w)), add(F(u), F(w))));
	let homogeneous = $derived(close(F([2 * u[0], 2 * u[1]]), [2 * F(u)[0], 2 * F(u)[1]]));
	let linear = $derived(additive && homogeneous);
</script>

<p>
	A matrix moves vectors around. Chapter 3 told you <em>how to compute</em> that; now we ask <em>what kind of motion</em> is allowed. The answer is the central definition of the whole subject.
</p>

<Callout kind="definition" title="Definition: linear map">
	<p>
		A function <Tex tex={'T : V \\to W'} /> between vector spaces is <strong class="text-slate-50">linear</strong> if
		<Tex display tex={'T(\\mathbf u + \\mathbf v) = T(\\mathbf u) + T(\\mathbf v) \\qquad\\text{and}\\qquad T(c\\mathbf v) = c\\,T(\\mathbf v)'} />
		for all vectors <Tex tex={'\\mathbf u, \\mathbf v'} /> and scalars <Tex tex="c" />.
	</p>
</Callout>

<h2>What it looks like</h2>
<p>
	Geometrically, linear means: <strong class="text-slate-50">grid lines stay lines, they stay parallel and evenly spaced, and the origin stays put.</strong> Cycle through the maps below and see which ones keep that promise.
</p>

<Figure caption="The faint blue lines are the image of the standard grid. Only the linear ones keep every line straight, parallel and evenly spaced, with the origin fixed." max={620}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
		{#key which}<FuncGrid f={F} extent={4} samples={30} />{/key}
	</Plane2D>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-1.5">
			{#each maps as m, i (m.name)}
				<button class="mbtn {which === i ? 'mbtn-yellow' : 'mbtn-blue'}" style="padding: 0.45rem 0.6rem; font-size: 9px;" onclick={() => (which = i)}>{m.name}</button>
			{/each}
		</div>
		<ul class="flex flex-wrap justify-center gap-4 text-sm">
			<li class={additive ? 'text-emerald-300' : 'text-rose-300'}>{additive ? '✓' : '✗'} T(u+v) = T(u)+T(v)</li>
			<li class={homogeneous ? 'text-emerald-300' : 'text-rose-300'}>{homogeneous ? '✓' : '✗'} T(2u) = 2T(u)</li>
		</ul>
		<span class="w-full text-center text-sm {linear ? 'text-emerald-300' : 'text-rose-300'}">
			{linear ? 'Linear.' : 'Not linear.'}
		</span>
	{/snippet}
</Figure>

<Callout kind="warning" title="Translation is not linear">
	<p>
		Shifting everything by <Tex tex="(1,1)" /> keeps lines straight and parallel, but it moves the origin: <Tex tex={'T(\\mathbf 0) \\ne \\mathbf 0'} />. Every linear map sends <Tex tex={'\\mathbf 0'} /> to <Tex tex={'\\mathbf 0'} /> (take <Tex tex="c=0" />).
		Maps like this are called <em>affine</em>.
	</p>
</Callout>

<h2>Linear maps are completely determined by a basis</h2>
<Callout kind="theorem" title="A linear map is a free choice on a basis">
	<p>
		If <Tex tex={'\\mathbf b_1,\\dots,\\mathbf b_n'} /> is a basis of <Tex tex="V" />, then you can choose <Tex tex={'T(\\mathbf b_1), \\dots, T(\\mathbf b_n)'} /> to be <em>any</em> vectors of <Tex tex="W" />, and exactly one linear map has those values. That is why a matrix, whose columns are the images of the basis, describes the whole map.
	</p>
</Callout>

<Recap
	points={[
		'$T$ is **linear** if $T(\\mathbf u+\\mathbf v)=T\\mathbf u+T\\mathbf v$ and $T(c\\mathbf v)=cT\\mathbf v$.',
		'Visually: straight, parallel, evenly spaced grid lines, and the origin fixed.',
		'A linear map is determined by what it does to a basis, which is why matrices describe them.'
	]}
/>

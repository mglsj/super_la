<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import { det, mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let a = $state(40);
	let b = $state(25);
	let flipA = $state(false);
	let flipB = $state(false);

	const rot = (deg: number): Mat => {
		const t = (deg * Math.PI) / 180;
		return [
			[Math.cos(t), -Math.sin(t)],
			[Math.sin(t), Math.cos(t)]
		];
	};
	// a reflection across the line at angle deg/2 is R(deg) composed with diag(1, -1)
	const make = (deg: number, flip: boolean): Mat => {
		const R = rot(deg);
		return flip ? mul(R, [[1, 0], [0, -1]]) : R;
	};
	let MA = $derived(make(a, flipA));
	let MB = $derived(make(b, flipB));
	let prod = $derived(mul(MA, MB));
	let d = $derived(Math.round(det(prod)));
	let ang = $derived((Math.atan2(prod[1][0], prod[0][0]) * 180) / Math.PI);
</script>

<p>
	The group of all matrices that preserve lengths and angles is the <strong class="text-slate-50">orthogonal group</strong> <Tex tex={'O(n)'} />. In the plane its members are completely understood: they are the rotations and the reflections.
</p>

<Callout kind="theorem" title="Structure of O(2)">
	<ul class="list-disc space-y-1 pl-6">
		<li>The matrices with <Tex tex={'\\det = +1'} /> form <Tex tex={'SO(2)'} />: rotations <Tex tex={'R(\\theta)'} />. Composing them adds angles: <Tex tex={'R(\\alpha)R(\\beta) = R(\\alpha+\\beta)'} />, and the group is commutative.</li>
		<li>The matrices with <Tex tex={'\\det = -1'} /> are reflections across a line through the origin.</li>
		<li>A reflection followed by a reflection is a rotation, by twice the angle between the mirrors.</li>
	</ul>
</Callout>

<h2>Compose two orthogonal maps</h2>
<Figure caption="Choose two members of O(2). Their product is again orthogonal; its determinant tells you whether it is a rotation or a reflection." max={620}>
	<Plane2D xmin={-3} xmax={3} ymin={-2.5} ymax={2.5} grid={false}>
		<TransformGrid matrix={prod} extent={8} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="A angle" bind:value={a} min={-180} max={180} step={5} display="{a}°" />
		<label class="flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={flipA} /> A reflects</label>
		<Slider label="B angle" bind:value={b} min={-180} max={180} step={5} display="{b}°" />
		<label class="flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={flipB} /> B reflects</label>
		<span class="w-full text-center font-mono text-sm text-slate-200">
			det(AB) = {d} →
			{#if d === 1}a <span class="text-emerald-300">rotation</span> by {ang.toFixed(0)}°
			{:else}a <span class="text-amber-300">reflection</span>{/if}
		</span>
	{/snippet}
</Figure>
<Tex display tex={'AB = ' + texMatrix(prod)} />

<p>
	Experiment: with neither flipped, the angles add (40° + 25° = 65°). With one flipped the result is a reflection. With both flipped you get a rotation again, because <Tex tex={'(-1)(-1) = +1'} /> in the determinant.
</p>

<h2>Why orthogonal matrices are special</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><Tex tex={'Q^{-1} = Q^{\\mathsf T}'} />: undoing is free.</li>
	<li>Condition number 1: they neither magnify nor shrink errors (chapter 16), which is why QR and SVD are numerically stable.</li>
	<li>In 3D, <Tex tex={'SO(3)'} /> is the group of rotations of space, three-dimensional (axis and angle), and not commutative: rotate about x then y is not the same as y then x.</li>
</ul>

<Callout kind="intuition">
	<p>
		The orthogonal group is a smooth surface of matrices, not just a list: you can rotate by any angle, so <Tex tex={'SO(2)'} /> is a circle's worth of matrices. Such groups are called <em>Lie groups</em>, and their infinitesimal structure is the subject of the next lesson.
	</p>
</Callout>

<Recap
	points={[
		'$O(2)$ = rotations ($\\det=1$) and reflections ($\\det=-1$); $R(\\alpha)R(\\beta)=R(\\alpha+\\beta)$.',
		'Two reflections compose to a rotation by twice the angle between the mirrors.',
		'$Q^{-1}=Q^{\\mathsf T}$ and $\\kappa(Q)=1$; in 3D rotations no longer commute.'
	]}
/>

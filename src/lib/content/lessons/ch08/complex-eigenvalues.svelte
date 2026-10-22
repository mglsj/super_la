<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { eigen2 } from '#lib/math/eigen.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let phi = $state(40);
	let r = $state(0.95);
	let rad = $derived((phi * Math.PI) / 180);
	let m = $derived([
		[r * Math.cos(rad), -r * Math.sin(rad)],
		[r * Math.sin(rad), r * Math.cos(rad)]
	]);
	let ev = $derived(eigen2(m));
	let trail = $derived.by(() => {
		const pts: number[][] = [];
		let p = [4, 0];
		for (let k = 0; k < 40; k++) {
			pts.push(p);
			p = [m[0][0] * p[0] + m[0][1] * p[1], m[1][0] * p[0] + m[1][1] * p[1]];
		}
		return pts;
	});
</script>

<p>
	Does every matrix have eigenvectors? Think about a rotation of the plane by 40°. Every vector turns. No direction stays put. There is no real eigenvector. Yet the algebra still produces eigenvalues, just <strong class="text-slate-50">complex</strong> ones.
</p>

<h2>Rotations have no real eigen-lines</h2>
<p>
	The matrix below rotates by <Tex tex={'\\varphi'} /> and scales by <Tex tex="r" />. Its characteristic polynomial is <Tex tex={'\\lambda^2 - 2r\\cos\\varphi\\,\\lambda + r^2'} />, with discriminant
	<Tex tex={'4r^2(\\cos^2\\varphi - 1) = -4r^2\\sin^2\\varphi < 0'} /> unless <Tex tex={'\\sin\\varphi = 0'} />.
</p>

<Figure caption="Yellow dots: where one point goes under repeated application. With r < 1 it spirals in; with r > 1 it spirals out; r = 1 it circles." max={620}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4} grid={false}>
		<TransformGrid matrix={m} basis={false} square={false} extent={12} />
		{#each trail as p, i (i)}<Dot at={p} color={C.yellow} r={3.5} />{/each}
	</Plane2D>
	{#snippet controls()}
		<Slider label="angle" bind:value={phi} min={0} max={180} step={5} display="{phi}°" />
		<Slider label="scale r" bind:value={r} min={0.5} max={1.1} step={0.01} display={r.toFixed(2)} />
		<span class="w-full text-center font-mono text-sm text-slate-200">
			{#if ev.complex}
				λ = {ev.complex[0].toFixed(2)} ± {ev.complex[1].toFixed(2)}i, |λ| = {r.toFixed(2)}
			{:else}
				λ = {ev.values.map((x) => x.toFixed(2)).join(', ')} (real: angle 0° or 180°)
			{/if}
		</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="What the complex eigenvalues say">
	<p>
		The eigenvalues of <Tex tex={'r\\begin{bmatrix}\\cos\\varphi&-\\sin\\varphi\\\\\\sin\\varphi&\\cos\\varphi\\end{bmatrix}'} /> are <Tex tex={'r(\\cos\\varphi \\pm i\\sin\\varphi) = re^{\\pm i\\varphi}'} />.
		The <strong class="text-slate-50">modulus</strong> <Tex tex="r" /> is the scaling per step, and the <strong class="text-slate-50">argument</strong> <Tex tex={'\\varphi'} /> is the rotation angle. Complex eigenvalues of a real matrix always come in conjugate pairs.
	</p>
</Callout>

<h2>Why bother?</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li>If every eigenvalue has <Tex tex={'|\\lambda| < 1'} />, repeated application shrinks everything to zero (the spiral in). That is stability.</li>
	<li>Oscillation in physical systems (springs, circuits, populations) shows up as complex eigenvalues.</li>
	<li>Over the <em>complex</em> numbers, every square matrix has at least one eigenvalue (fundamental theorem of algebra), which is why the theory is cleanest there.</li>
</ul>

<Recap
	points={[
		'A real matrix can have **complex** eigenvalues, always in conjugate pairs; a rotation has none that are real.',
		'For $r\\,R(\\varphi)$ the eigenvalues are $re^{\\pm i\\varphi}$: modulus = scaling, argument = rotation.',
		'$|\\lambda|<1$ for all eigenvalues means repeated application spirals to zero.'
	]}
/>

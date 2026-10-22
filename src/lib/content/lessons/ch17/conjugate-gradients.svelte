<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { eigSym } from '#lib/math/decomp.js';
	import { inverse, mulVec } from '#lib/math/mat.js';
	import { dot, scale, add, sub } from '#lib/math/vec.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let stretch = $state(20); // condition number of A (eigenvalues 1 and stretch)
	let steps = $state(8);
	const x0 = [-3, -1.5];

	// A = Q diag(1, stretch) Q^T with a 30 degree tilt
	let A = $derived.by(() => {
		const c = Math.cos(Math.PI / 6);
		const s = Math.sin(Math.PI / 6);
		return [
			[c * c + stretch * s * s, c * s * (1 - stretch)],
			[c * s * (1 - stretch), s * s + stretch * c * c]
		];
	});
	const b = [1, 2];
	let xstar = $derived(mulVec(inverse(A)!, b));

	let sd = $derived.by(() => {
		const pts = [x0];
		let x = x0;
		for (let k = 0; k < steps; k++) {
			const r = sub(b, mulVec(A, x));
			const ar = mulVec(A, r);
			const denom = dot(r, ar);
			if (denom < 1e-18) break;
			x = add(x, scale(r, dot(r, r) / denom));
			pts.push(x);
		}
		return pts;
	});
	let cg = $derived.by(() => {
		const pts = [x0];
		let x = x0;
		let r = sub(b, mulVec(A, x));
		let p = r;
		for (let k = 0; k < 2; k++) {
			const ap = mulVec(A, p);
			const alpha = dot(r, r) / dot(p, ap);
			x = add(x, scale(p, alpha));
			const rn = sub(r, scale(ap, alpha));
			pts.push(x);
			if (dot(rn, rn) < 1e-20) break;
			const beta = dot(rn, rn) / dot(r, r);
			p = add(rn, scale(p, beta));
			r = rn;
		}
		return pts;
	});
	// level sets of f(x) - f(x*) = 1/2 (x - x*)^T A (x - x*)
	let rings = $derived.by(() => {
		const { values, vectors } = eigSym(A);
		return [0.6, 2.5, 6].map((c) =>
			Array.from({ length: 80 }, (_, i) => {
				const t = (i / 80) * 2 * Math.PI;
				const p = Math.cos(t) * Math.sqrt((2 * c) / values[0]);
				const q = Math.sin(t) * Math.sqrt((2 * c) / values[1]);
				return [xstar[0] + vectors[0][0] * p + vectors[0][1] * q, xstar[1] + vectors[1][0] * p + vectors[1][1] * q];
			})
		);
	});
	let sdErr = $derived(Math.hypot(sd[sd.length - 1][0] - xstar[0], sd[sd.length - 1][1] - xstar[1]));
	let cgErr = $derived(Math.hypot(cg[cg.length - 1][0] - xstar[0], cg[cg.length - 1][1] - xstar[1]));
</script>

<p>
	For a symmetric positive definite <Tex tex="A" />, solving <Tex tex={'A\\mathbf x = \\mathbf b'} /> is the same as <em>minimising</em> the bowl-shaped function <Tex tex={'f(\\mathbf x) = \\tfrac12\\mathbf x^{\\mathsf T}A\\mathbf x - \\mathbf b^{\\mathsf T}\\mathbf x'} />, whose gradient is <Tex tex={'A\\mathbf x - \\mathbf b'} />. So we can use optimisation.
</p>

<h2>Steepest descent zigzags</h2>
<p>
	Rolling downhill along the negative gradient (the residual <Tex tex={'\\mathbf r = \\mathbf b - A\\mathbf x'} />) with the best step size works, but in a long narrow valley each step is almost perpendicular to the previous one, so the path zigzags. <strong class="text-slate-50">Conjugate gradients</strong> (CG) chooses search directions that never undo earlier progress.
</p>

<Figure caption="Rings: level sets of f. Orange: steepest descent. Teal: conjugate gradients, which lands exactly on the solution (green) after n = 2 steps. Stretch the valley to see steepest descent suffer." max={620}>
	<Plane2D xmin={-4.5} xmax={4.5} ymin={-3} ymax={3} grid={false}>
		{#each rings as r, i (i)}<Polygon points={r} fill={C.blue} fillOpacity={0.04} stroke={C.blue} width={1.5} />{/each}
		{#each sd as p, i (i)}
			{#if i > 0}<Line a={sd[i - 1]} b={p} color={C.orange} width={2} />{/if}
		{/each}
		{#each cg as p, i (i)}
			{#if i > 0}<Line a={cg[i - 1]} b={p} color={C.teal} width={3.5} />{/if}
			<Dot at={p} color={C.teal} r={5} />
		{/each}
		<Dot at={x0} color={C.yellow} r={6} label="start" />
		<Dot at={xstar} color={C.iHat} r={7} hollow label="solution" />
	</Plane2D>
	{#snippet controls()}
		<Slider label="κ" bind:value={stretch} min={1} max={30} step={1} display={String(stretch)} />
		<Slider label="SD steps" bind:value={steps} min={1} max={20} step={1} display={String(steps)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>steepest descent error: <span class="text-orange-300">{sdErr.toFixed(4)}</span></span>
			<span>CG error after 2 steps: <span class="text-teal-300">{cgErr.toFixed(6)}</span></span>
		</div>
	{/snippet}
</Figure>

<Callout kind="definition" title="Conjugate directions">
	<p>
		Two directions <Tex tex={'\\mathbf p_i, \\mathbf p_j'} /> are <em>A-conjugate</em> if <Tex tex={'\\mathbf p_i^{\\mathsf T}A\\mathbf p_j = 0'} />: orthogonal in the inner product defined by <Tex tex="A" /> (chapter 11). CG builds such directions cheaply, with a short recurrence, and minimises <Tex tex="f" /> over the growing <em>Krylov subspace</em>
		<Tex tex={'\\operatorname{span}\\{\\mathbf r_0, A\\mathbf r_0, A^2\\mathbf r_0, \\dots\\}'} />.
	</p>
</Callout>

<Callout kind="theorem" title="What CG guarantees">
	<ul class="list-disc space-y-1 pl-6">
		<li>In exact arithmetic CG finds the exact solution in at most <Tex tex="n" /> steps (and in as many steps as there are distinct eigenvalues).</li>
		<li>The error (measured in the A-norm <Tex tex={'\\sqrt{\\mathbf e^{\\mathsf T}A\\mathbf e}'} />) shrinks at least like <Tex tex={'\\left(\\dfrac{\\sqrt\\kappa - 1}{\\sqrt\\kappa + 1}\\right)^k'} />, versus <Tex tex={'\\left(\\dfrac{\\kappa - 1}{\\kappa + 1}\\right)^k'} /> for steepest descent: a square root of the condition number.</li>
		<li>Each step costs one matrix–vector product and a few dot products. No factorisation, minimal memory.</li>
	</ul>
</Callout>

<Recap
	points={[
		'For SPD $A$, solving $A\\mathbf x=\\mathbf b$ means minimising $\\tfrac12\\mathbf x^{\\mathsf T}A\\mathbf x-\\mathbf b^{\\mathsf T}\\mathbf x$.',
		'Steepest descent zigzags in narrow valleys; **conjugate gradients** use $A$-conjugate directions and do not.',
		'CG converges in at most $n$ steps and at a rate governed by $\\sqrt{\\kappa}$, using one mat-vec per step.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import { eigen2 } from '#lib/math/eigen.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let a = $state(1);
	let b = $state(2);
	let c = $state(3);
	let d = $state(1);
	let deg = $state(80);
	let steps = $state(4);

	let A = $derived([
		[a, b],
		[c, d]
	]);
	let ev = $derived(eigen2(A));
	let perron = $derived(ev.values.length ? ev.vectors[0].map((x) => Math.abs(x)) : null);
	let orbit = $derived.by(() => {
		const pts: number[][] = [];
		let v = [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
		for (let k = 0; k <= steps; k++) {
			pts.push(v);
			const w = [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
			const n = Math.hypot(w[0], w[1]);
			v = [w[0] / n, w[1] / n];
		}
		return pts;
	});
	const quadrant = Array.from({ length: 30 }, (_, i) => [Math.cos((i / 29) * (Math.PI / 2)), Math.sin((i / 29) * (Math.PI / 2))]);
</script>

<p>
	Chapter 8 warned that eigenvectors can be complex and eigenvalues can tie. A matrix with <em>all entries positive</em> escapes all of that, and the reason is a theorem from 1907.
</p>

<Callout kind="theorem" title="Perron's theorem">
	<p>
		If every entry of the square matrix <Tex tex="A" /> is positive, then:
	</p>
	<ul class="list-disc space-y-1 pl-6">
		<li>It has a <strong class="text-slate-50">real positive eigenvalue</strong> <Tex tex={'\\rho = \\rho(A)'} /> larger in absolute value than every other eigenvalue (the spectral radius, a simple root).</li>
		<li>Its eigenvector can be chosen with <strong class="text-slate-50">all entries positive</strong>, and no other eigenvector is positive.</li>
	</ul>
	<p>Frobenius extended this to nonnegative matrices, provided they are <em>irreducible</em> (the directed graph of nonzero entries is strongly connected).</p>
</Callout>

<h2>Why a dominant direction appears</h2>
<p>
	Positive matrices map the positive quadrant into itself, squeezing it. Apply <Tex tex="A" /> repeatedly to any positive starting direction (the <em>power method</em>) and the direction converges to the Perron vector. Change the start angle and the number of steps: all starts end up at the same direction.
</p>

<Figure caption="The yellow arc is the positive part of the unit circle. Orange dots are the iterates (normalised). The purple line is the Perron eigenvector." max={620}>
	<Plane2D xmin={-0.2} xmax={1.4} ymin={-0.2} ymax={1.4}>
		<Polygon points={quadrant} fill="transparent" stroke={C.yellow} width={2} />
		{#if perron}<Line point={[0, 0]} dir={perron} color={C.purple} width={3} dashed />{/if}
		{#each orbit as p, i (i)}<Dot at={p} color={i === 0 ? C.teal : C.orange} r={i === 0 ? 7 : 4.5} />{/each}
	</Plane2D>
	{#snippet controls()}
		<Slider label="start" bind:value={deg} min={5} max={85} step={5} display="{deg}°" />
		<Slider label="steps" bind:value={steps} min={0} max={12} step={1} display={String(steps)} />
		<Slider label="a" bind:value={a} min={0.2} max={4} step={0.2} />
		<Slider label="b" bind:value={b} min={0.2} max={4} step={0.2} />
		<Slider label="c" bind:value={c} min={0.2} max={4} step={0.2} />
		<Slider label="d" bind:value={d} min={0.2} max={4} step={0.2} />
		<span class="w-full text-center font-mono text-sm text-slate-200">
			{#if perron}ρ = {ev.values[0].toFixed(3)}, second eigenvalue {ev.values[1].toFixed(3)}, Perron vector ∝ ({perron.map((x) => x.toFixed(3)).join(', ')}){/if}
		</span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		The rate of convergence is the ratio <Tex tex={'|\\lambda_2|/\\rho'} />: the closer the second eigenvalue is to the first in size, the slower the matrix "forgets" its starting point. Many problems are about exactly that gap.
	</p>
</Callout>

<h2>Where it matters</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><strong class="text-slate-50">Population models:</strong> the growth rate of an age-structured population is the Perron eigenvalue of its Leslie matrix; the eigenvector is the stable age distribution.</li>
	<li><strong class="text-slate-50">Markov chains:</strong> the steady-state distribution is a Perron vector (next lesson).</li>
	<li><strong class="text-slate-50">Ranking:</strong> PageRank is the Perron vector of a modified web matrix.</li>
	<li><strong class="text-slate-50">Economics:</strong> input–output models; viability of a production system hinges on <Tex tex={'\\rho(A) < 1'} />.</li>
</ul>

<Recap
	points={[
		'A positive (or irreducible nonnegative) matrix has a **dominant real eigenvalue** $\\rho$ with a **positive eigenvector**.',
		'The power method converges to that eigenvector from any positive start, at rate $|\\lambda_2|/\\rho$.',
		'It explains long-run behaviour in populations, Markov chains, ranking and economics.'
	]}
/>

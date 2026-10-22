<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { cond } from '#lib/math/decomp.js';
	import { inverse, mulVec } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let theta = $state(20); // angle between the two lines' normals
	let delta = $state(0.1); // nudge to the second right-hand side

	let th = $derived((theta * Math.PI) / 180);
	let A = $derived([
		[1, 0],
		[Math.cos(th), Math.sin(th)]
	]);
	let sol = $derived(mulVec(inverse(A)!, [1, 1]));
	let sol2 = $derived(mulVec(inverse(A)!, [1, 1 + delta]));
	let kappa = $derived(cond(A));
	let move = $derived(Math.hypot(sol2[0] - sol[0], sol2[1] - sol[1]));
	const lineOf = (n: number[], c: number) => ({ point: [c * n[0], c * n[1]], dir: [-n[1], n[0]] });
	let l1 = $derived(lineOf([1, 0], 1));
	let l2 = $derived(lineOf([Math.cos(th), Math.sin(th)], 1));
	let l2b = $derived(lineOf([Math.cos(th), Math.sin(th)], 1 + delta));
</script>

<p>
	When a computed answer is wrong, there are two possible culprits: the <em>problem</em> was inherently sensitive, or the <em>algorithm</em> was careless. Separating the two is the central idea of numerical analysis.
</p>

<h2>Conditioning belongs to the problem</h2>
<p>
	Solving <Tex tex={'A\\mathbf x = \\mathbf b'} /> geometrically means intersecting lines. If the lines cross at a good angle, nudging one of them barely moves the intersection. If they are nearly parallel, a tiny nudge shifts the intersection far away.
</p>

<Figure caption="Blue: line 1. Red: line 2 (solid) and its nudged version (dashed). The yellow dots are the two intersections. Make the lines nearly parallel and watch them fly apart." max={620}>
	<Plane2D xmin={-4} xmax={8} ymin={-5} ymax={5}>
		<Line point={l1.point} dir={l1.dir} color={C.blue} />
		<Line point={l2.point} dir={l2.dir} color={C.jHat} />
		<Line point={l2b.point} dir={l2b.dir} color={C.jHat} dashed width={2} />
		<Dot at={sol} color={C.yellow} r={6} />
		<Dot at={sol2} color={C.teal} r={6} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="angle" bind:value={theta} min={2} max={90} step={1} display="{theta}°" />
		<Slider label="nudge" bind:value={delta} min={-0.3} max={0.3} step={0.05} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>κ(A) = <span class="text-amber-300">{kappa.toFixed(1)}</span></span>
			<span>solution moved by {move.toFixed(2)} for a nudge of {Math.abs(delta).toFixed(2)}</span>
		</div>
	{/snippet}
</Figure>

<Callout kind="definition" title="Condition number">
	<p>
		For solving <Tex tex={'A\\mathbf x = \\mathbf b'} />, the relative change in <Tex tex={'\\mathbf x'} /> is at most <Tex tex={'\\kappa(A)'} /> times the relative change in <Tex tex={'\\mathbf b'} />, where <Tex tex={'\\kappa(A) = \\|A\\|\\,\\|A^{-1}\\| = \\sigma_{\\max}/\\sigma_{\\min}'} />.
		Rule of thumb: you lose about <Tex tex={'\\log_{10}\\kappa'} /> digits of accuracy, no matter how good the algorithm is.
	</p>
</Callout>

<h2>Stability belongs to the algorithm</h2>
<Callout kind="definition" title="Backward stability">
	<p>
		An algorithm is <em>backward stable</em> if the answer it returns is the <em>exact</em> answer to a slightly perturbed problem: <Tex tex={'(A + E)\\hat{\\mathbf x} = \\mathbf b'} /> with <Tex tex={'\\|E\\| \\approx \\varepsilon\\|A\\|'} />. You cannot ask for more, since the input itself was already rounded.
	</p>
</Callout>
<p>
	Combine the two ideas: <strong class="text-slate-50">forward error ≲ condition number × backward error</strong>. Gaussian elimination with partial pivoting and Householder QR are backward stable in practice. Cramer's rule, computing <Tex tex={'A^{-1}'} /> explicitly and the normal equations are not (or lose digits needlessly).
</p>

<Callout kind="intuition">
	<p>
		Blame assignment: if the problem is ill-conditioned, no algorithm can save you; the data itself does not determine the answer to the accuracy you want. If it is well-conditioned but you got garbage, the algorithm was unstable, so change the algorithm.
	</p>
</Callout>

<h2>What things cost</h2>
<p>
	Counting operations matters too: LU or Cholesky of an <Tex tex={'n\\times n'} /> matrix costs about <Tex tex={'\\tfrac23n^3'} /> or <Tex tex={'\\tfrac13n^3'} /> flops; each triangular solve <Tex tex={'n^2'} />; SVD roughly <Tex tex={'10n^3'} />. Doubling <Tex tex="n" /> multiplies direct-solve time by about 8, which motivates the iterative methods of the next chapter.
</p>

<Recap
	points={[
		'**Conditioning** is a property of the problem: $\\kappa(A)=\\sigma_{\\max}/\\sigma_{\\min}$, about $\\log_{10}\\kappa$ digits lost.',
		'**Backward stability** is a property of the algorithm: it solves a nearby problem exactly.',
		'Forward error ≲ condition number × backward error. Direct solves cost $O(n^3)$.'
	]}
/>

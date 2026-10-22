<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Polygon from '#lib/viz/Polygon.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { svd } from '#lib/math/decomp.js';
	import { identity, mul, transpose, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { animateTo, matrixTween } from '#lib/viz/tween.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let A = $state<Mat>([
		[1.5, 1],
		[0.5, 1.2]
	]);
	let f = $derived(svd(A));
	let Sigma = $derived<Mat>([[f.S[0], 0], [0, f.S[1]]]);
	let steps = $derived<Mat[]>([
		identity(2),
		transpose(f.V),
		mul(Sigma, transpose(f.V)),
		mul(f.U, mul(Sigma, transpose(f.V)))
	]);
	const names = ['Start', 'Vᵀ: rotate (or reflect)', 'Σ: stretch along the axes', 'U: rotate (or reflect) again'];
	let stage = $state(0);
	const view = matrixTween(identity(2), 800);

	function go(s: number) {
		stage = s;
		animateTo(view, steps[s].map((r) => [...r]), 800);
	}
	$effect(() => {
		void JSON.stringify(A);
		stage = 0;
		animateTo(view, identity(2), 0);
	});
	let circle = $derived(
		Array.from({ length: 80 }, (_, i) => {
			const t = (i / 80) * 2 * Math.PI;
			const p = [Math.cos(t), Math.sin(t)];
			const M = view.current;
			return [M[0][0] * p[0] + M[0][1] * p[1], M[1][0] * p[0] + M[1][1] * p[1]];
		})
	);
</script>

<p>
	The punchline of the previous lesson is a factorisation. Every matrix, however messy, is a composition of three simple moves:
</p>

<Callout kind="theorem" title="The singular value decomposition">
	<p>
		Every real <Tex tex={'m\\times n'} /> matrix factors as
		<Tex display tex={'A = U\\Sigma V^{\\mathsf T}'} />
		where <Tex tex="U" /> (<Tex tex={'m\\times m'} />) and <Tex tex="V" /> (<Tex tex={'n\\times n'} />) are orthogonal, and <Tex tex={'\\Sigma'} /> is diagonal with the singular values <Tex tex={'\\sigma_1\\ge\\sigma_2\\ge\\dots\\ge0'} /> on its diagonal.
	</p>
</Callout>

<h2>Watch the three steps</h2>
<p>
	Read <Tex tex={'U\\Sigma V^{\\mathsf T}'} /> from the right: first <Tex tex={'V^{\\mathsf T}'} /> turns the circle into itself (an orthogonal map does not change lengths), then <Tex tex={'\\Sigma'} /> stretches it into an axis-aligned ellipse, then <Tex tex="U" /> rotates that ellipse into its final position.
	The grid at the end is exactly the effect of <Tex tex="A" />.
</p>

<Figure caption="Step through the factorisation. The yellow curve is the unit circle." max={620}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3} grid={false}>
		<TransformGrid matrix={view.current} basis={false} square={false} extent={10} />
		<Polygon points={circle} fill={C.yellow} fillOpacity={0.12} stroke={C.yellow} width={2.5} />
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={A} step={0.5} /></div>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-2">
			{#each [0, 1, 2, 3] as s (s)}
				<button class="mbtn {stage === s ? 'mbtn-yellow' : 'mbtn-blue'}" style="padding: 0.45rem 0.6rem; font-size: 9px;" onclick={() => go(s)}>{s === 0 ? 'Start' : 'Step ' + s}</button>
			{/each}
		</div>
		<span class="w-full text-center text-sm text-slate-300">{names[stage]}</span>
	{/snippet}
</Figure>

<Tex display tex={'A = ' + texMatrix(A) + ' = ' + texMatrix(f.U.map((r) => r.slice(0, 2))) + texMatrix(Sigma) + texMatrix(transpose(f.V))} />

<h2>Where U, Σ and V come from</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li>The columns of <Tex tex="V" /> are the orthonormal eigenvectors of <Tex tex={'A^{\\mathsf T}A'} />; the columns of <Tex tex="U" /> are those of <Tex tex={'AA^{\\mathsf T}'} />.</li>
	<li><Tex tex={'A\\mathbf v_i = \\sigma_i\\mathbf u_i'} />: each right singular vector is sent to a scaled left singular vector.</li>
	<li>The first <Tex tex="r" /> columns of <Tex tex="V" /> (<Tex tex="r" /> = rank) span the row space, the rest span the null space. The first <Tex tex="r" /> columns of <Tex tex="U" /> span the column space. The SVD displays all four subspaces of chapter 4 at once.</li>
</ul>

<Recap
	points={[
		'$A=U\\Sigma V^{\\mathsf T}$: rotate/reflect ($V^{\\mathsf T}$), stretch ($\\Sigma$), rotate/reflect ($U$).',
		'$V$ diagonalises $A^{\\mathsf T}A$, $U$ diagonalises $AA^{\\mathsf T}$, and $A\\mathbf v_i=\\sigma_i\\mathbf u_i$.',
		'The SVD exists for every matrix and exposes all four fundamental subspaces.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Line from '#lib/viz/Line.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { eigen2 } from '#lib/math/eigen.js';
	import { inverse, mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[2, 1],
		[1, 2]
	]);
	let ev = $derived(eigen2(m));
	let ok = $derived(ev.values.length === 2);
	let P = $derived<Mat | null>(ok ? [[ev.vectors[0][0], ev.vectors[1][0]], [ev.vectors[0][1], ev.vectors[1][1]]] : null);
	let D = $derived<Mat | null>(ok ? [[ev.values[0], 0], [0, ev.values[1]]] : null);
	let Pinv = $derived(P ? inverse(P) : null);
	let back = $derived(P && D && Pinv ? mul(P, mul(D, Pinv)) : null);
</script>

<p>
	Last chapter's payoff: if you describe space using <em>eigenvectors as your ruler</em>, the matrix does something very simple: it just stretches each axis. A matrix that can be put in that form is called
	<strong class="text-slate-50">diagonalisable</strong>.
</p>

<Callout kind="theorem" title="Diagonalisation">
	<p>
		If <Tex tex="A" /> (<Tex tex={'n\\times n'} />) has <Tex tex="n" /> independent eigenvectors, put them as the columns of <Tex tex="P" /> and the eigenvalues on the diagonal of <Tex tex="D" />. Then
		<Tex display tex={'A = PDP^{-1}.'} />
		This is exactly the change-of-basis formula of chapter 6: <Tex tex="D" /> is the matrix of the <em>same map</em> in the eigenbasis.
	</p>
</Callout>

<h2>Two views of one map</h2>
<p>
	On the left, <Tex tex="A" /> acting on the standard grid, with the purple eigen-lines. On the right, the same map seen in eigen-coordinates, where it is just a diagonal stretch <Tex tex="D" />.
</p>

<Figure caption="Left: A deforms the grid, but its eigen-lines (purple) only stretch. Right: in the eigenbasis, A is simply D." max={900}>
	<div class="grid gap-3 sm:grid-cols-2">
		<div>
			<p class="font-pixel mb-1 text-center text-[9px] text-slate-400">STANDARD BASIS: A</p>
			<Plane2D xmin={-5} xmax={5} ymin={-5} ymax={5} grid={false}>
				<TransformGrid matrix={m} basis={false} square={false} extent={12} />
				{#each ev.vectors as e, i (i)}<Line point={[0, 0]} dir={e} color={C.purple} width={3} />{/each}
			</Plane2D>
		</div>
		<div>
			<p class="font-pixel mb-1 text-center text-[9px] text-slate-400">EIGENBASIS: D</p>
			<Plane2D xmin={-5} xmax={5} ymin={-5} ymax={5} grid={false}>
				{#if D}<TransformGrid matrix={D} extent={12} />{/if}
			</Plane2D>
		</div>
	</div>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#if P && D && Pinv && back}
		<Tex display tex={'A = PDP^{-1} = ' + texMatrix(P) + texMatrix(D) + texMatrix(Pinv)} />
		<p class="text-center text-sm text-slate-400">Multiplying back gives <Tex tex={texMatrix(back)} />, the original A. ✓</p>
	{:else}
		<p class="text-center text-sm text-amber-300">
			{ev.complex ? 'Complex eigenvalues: no real eigenbasis for this matrix.' : 'Only one eigen-direction: this matrix is not diagonalisable. (See the last lesson.)'}
		</p>
	{/if}
</Figure>

<h2>When does it work?</h2>
<Callout kind="intuition">
	<p>
		It works exactly when there are <em>enough</em> eigenvectors. A sufficient condition that is easy to check: if <Tex tex="A" /> has <Tex tex="n" /> <em>distinct</em> eigenvalues, then the eigenvectors are automatically independent, so <Tex tex="A" /> is diagonalisable.
		Also, every <strong class="text-slate-50">symmetric</strong> real matrix is diagonalisable, even with an orthogonal <Tex tex="P" /> (the spectral theorem, coming later).
	</p>
</Callout>

<Recap
	points={[
		'$A=PDP^{-1}$: columns of $P$ are eigenvectors, $D$ holds the eigenvalues.',
		'It is a change of basis: in the eigenbasis, $A$ is just independent stretching along each axis.',
		'Distinct eigenvalues (or a symmetric matrix) guarantee diagonalisability.'
	]}
/>

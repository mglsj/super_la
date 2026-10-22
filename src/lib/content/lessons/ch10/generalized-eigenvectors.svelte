<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	// J = [[2,1],[0,2]],  N = J - 2I = [[0,1],[0,0]]
	let v = $state([1, 2]);
	let nv = $derived([v[1], 0]);
</script>

<p>
	When a matrix has too few eigenvectors, we do not give up. We look for vectors that are <em>almost</em> eigenvectors: after being hit by <Tex tex={'A - \\lambda I'} /> a few times they finally land in the kernel.
</p>

<Callout kind="definition" title="Definition: generalised eigenvector">
	<p>
		A nonzero <Tex tex={'\\mathbf v'} /> is a <em>generalised eigenvector</em> of <Tex tex="A" /> for <Tex tex={'\\lambda'} /> if <Tex tex={'(A - \\lambda I)^k\\mathbf v = \\mathbf 0'} /> for some <Tex tex="k \ge 1" />. Ordinary eigenvectors are the case <Tex tex="k = 1" />.
	</p>
</Callout>

<h2>A chain of two</h2>
<p>
	Take <Tex tex={'J = \\begin{bmatrix}2&1\\\\0&2\\end{bmatrix}'} />, a defective matrix with eigenvalue 2 and only the eigen-line along <Tex tex="(1,0)" />. Let <Tex tex={'N = J - 2I = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}'} />.
	Applying <Tex tex="N" /> to <Tex tex="(x, y)" /> gives <Tex tex="(y, 0)" />, which lies in the kernel. Applying it twice gives <Tex tex={'\\mathbf 0'} />. Drag the vector and watch.
</p>

<Figure caption="Blue: v. Orange: Nv = (y, 0), always on the x-axis (the eigen-line, in red). Apply N again and it is gone: N²v = 0." max={600}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3}>
		<Line point={[0, 0]} dir={[1, 0]} color={C.jHat} width={5} opacity={0.35} />
		<Arrow to={nv} color={C.orange} label="Nv" />
		<DragVector bind:value={v} color={C.blue} label="v" snap={0.5} limit={3.5} />
	</Plane2D>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">v = ({v[0]}, {v[1]})  →  Nv = ({nv[0]}, 0)  →  N²v = (0, 0)</span>
	{/snippet}
</Figure>

<p>
	So <Tex tex="(0,1)" /> is a generalised eigenvector: <Tex tex={'N(0,1) = (1,0)'} /> is the ordinary eigenvector, and <Tex tex={'N(1,0) = \\mathbf 0'} />. This <strong class="text-slate-50">chain</strong>
	<Tex tex={'(0,1) \\to (1,0) \\to \\mathbf 0'} /> provides the second basis vector that diagonalisation was missing.
</p>

<Callout kind="theorem" title="Enough generalised eigenvectors (over C)">
	<p>
		Every square complex matrix has a basis of generalised eigenvectors. The space splits into the <em>generalised eigenspaces</em> <Tex tex={'\\ker(A-\\lambda I)^n'} />, one per eigenvalue, whose dimensions are the algebraic multiplicities.
	</p>
</Callout>

<Callout kind="intuition">
	<p>
		The operator <Tex tex={'N = A - \\lambda I'} /> is <em>nilpotent</em> on a generalised eigenspace: repeated application eventually kills everything. The longest chain is the number of steps it takes.
		Those chains are exactly the building blocks of the Jordan form.
	</p>
</Callout>

<Recap
	points={[
		'A **generalised eigenvector** satisfies $(A-\\lambda I)^k\\mathbf v=\\mathbf 0$ for some $k$.',
		'They arrange into **chains** ending in an ordinary eigenvector, e.g. $(0,1)\\to(1,0)\\to\\mathbf 0$.',
		'Over $\\mathbb{C}$, every matrix has a basis made of generalised eigenvectors.'
	]}
/>

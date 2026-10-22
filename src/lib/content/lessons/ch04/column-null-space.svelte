<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Line from '#lib/viz/Line.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { mulVec, type Mat } from '#lib/math/mat.js';
	import { nullSpace, rank } from '#lib/math/gauss.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[1, 2],
		[2, 4]
	]);
	let x = $state([2, 1]);
	let ax = $derived(mulVec(m, x));
	let r = $derived(rank(m));
	let nul = $derived(nullSpace(m));
	let colDir = $derived.by(() => {
		const c1 = [m[0][0], m[1][0]];
		const c2 = [m[0][1], m[1][1]];
		return Math.hypot(c1[0], c1[1]) > 1e-9 ? c1 : c2;
	});
</script>

<p>
	Every matrix <Tex tex="A" /> comes with two subspaces that tell you almost everything about it: what it can <em>reach</em>, and what it <em>destroys</em>.
</p>

<Callout kind="definition" title="Definition: column space and null space">
	<p>
		The <strong class="text-slate-50">column space</strong> <Tex tex={'C(A)'} /> is the span of the columns of <Tex tex="A" />: every possible output <Tex tex={'A\\mathbf x'} />.
		The <strong class="text-slate-50">null space</strong> <Tex tex={'N(A)'} /> is the set of inputs that get sent to zero: <Tex tex={'\\{\\mathbf x : A\\mathbf x = \\mathbf 0\\}'} />.
	</p>
</Callout>

<h2>See both at once</h2>
<p>
	Left: the input plane, with the null space in red. Right: the output plane, with the column space in yellow. Drag <Tex tex={'\\mathbf x'} /> along the red line and watch the output sit on the origin.
	The starting matrix has parallel columns, so it squashes the plane onto a line.
</p>

<Figure caption="Inputs (left) and outputs (right). Edit the matrix: when its columns are independent the null space shrinks to the origin and the column space fills the plane." max={880}>
	<div class="grid gap-3 sm:grid-cols-2">
		<div>
			<p class="font-pixel mb-1 text-center text-[9px] text-slate-400">INPUT x</p>
			<Plane2D xmin={-4} xmax={4} ymin={-4} ymax={4}>
				{#if r === 1 && nul[0]}<Line point={[0, 0]} dir={nul[0]} color={C.jHat} width={4} opacity={0.55} />{/if}
				<DragVector bind:value={x} color={C.blue} label="x" snap={0.5} limit={3.5} />
			</Plane2D>
		</div>
		<div>
			<p class="font-pixel mb-1 text-center text-[9px] text-slate-400">OUTPUT Ax</p>
			<Plane2D xmin={-8} xmax={8} ymin={-8} ymax={8}>
				{#if r === 1}<Line point={[0, 0]} dir={colDir} color={C.yellow} width={4} opacity={0.55} />{/if}
				<Arrow to={ax} color={C.teal} label="Ax" />
			</Plane2D>
		</div>
	</div>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">rank = {r}</span>
		<span class="font-mono text-sm text-slate-300">dim N(A) = {2 - r}</span>
		<span class="font-mono text-sm text-slate-300">Ax = ({ax[0].toFixed(1)}, {ax[1].toFixed(1)})</span>
	{/snippet}
</Figure>

<h2>What is each one made of?</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><strong class="text-slate-50">Column space:</strong> take the <em>pivot columns of the original</em> matrix. They form a basis.</li>
	<li><strong class="text-slate-50">Null space:</strong> solve <Tex tex={'A\\mathbf x = \\mathbf 0'} /> from the RREF. Each free variable gives one basis vector.</li>
</ul>
<p>
	For <Tex tex={'A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}'} />: the pivot column is <Tex tex="(1,2)" />, so the column space is that line. The second column is free, giving
	<Tex tex={'x_1 = -2x_2'} />, so the null space is spanned by <Tex tex="(-2, 1)" />. Notice <Tex tex={'1 + 1 = 2'} /> dimensions: one for the output line, one that is crushed.
</p>

<Callout kind="intuition">
	<p>
		Solving <Tex tex={'A\\mathbf x = \\mathbf b'} /> asks whether <Tex tex={'\\mathbf b \\in C(A)'} />. And if it is solvable, the solution is unique exactly when <Tex tex={'N(A) = \\{\\mathbf 0\\}'} />.
		The null space is the freedom in the answer.
	</p>
</Callout>

<Recap
	points={[
		'$C(A)$ = all outputs = span of the columns; basis: the pivot columns.',
		'$N(A)$ = all inputs sent to $\\mathbf 0$; basis: one vector per free variable.',
		'$A\\mathbf x=\\mathbf b$ is solvable iff $\\mathbf b\\in C(A)$, and the solution is unique iff $N(A)=\\{\\mathbf 0\\}$.'
	]}
/>

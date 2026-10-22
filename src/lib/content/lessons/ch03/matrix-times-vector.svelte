<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { mulVec, type Mat } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[2, -1],
		[1, 1]
	]);
	let x = $state([2, 1]);
	let ax = $derived(mulVec(m, x));
	let c1 = $derived([m[0][0], m[1][0]]);
	let c2 = $derived([m[0][1], m[1][1]]);
</script>

<p>
	Until now a matrix was just a table of numbers. Here is the picture that will carry you through the rest of the course:
	<strong class="text-slate-50">a matrix is a machine that moves every vector in space</strong>, and its columns say where the basis arrows land.
</p>

<h2>Where do î and ĵ go?</h2>
<p>
	The standard basis vectors are <Tex tex={'\\hat\\imath = (1, 0)'} /> and <Tex tex={'\\hat\\jmath = (0, 1)'} />. Multiplying a matrix by them just picks out columns:
</p>
<Tex display tex={'\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{pmatrix}1\\\\0\\end{pmatrix} = \\begin{pmatrix}a\\\\c\\end{pmatrix}, \\qquad \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{pmatrix}0\\\\1\\end{pmatrix} = \\begin{pmatrix}b\\\\d\\end{pmatrix}'} />
<p>
	So the first column is where <Tex tex={'\\hat\\imath'} /> lands and the second column is where <Tex tex={'\\hat\\jmath'} /> lands. The whole grid follows them.
</p>

<Figure caption="Edit the matrix. The grid is carried along with the green arrow (column 1) and the red arrow (column 2)." max={600}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
		<TransformGrid matrix={m} extent={14} />
	</Plane2D>
	<div class="flex justify-center"><MatrixInput bind:value={m} /></div>
</Figure>

<h2>Any vector: mix the columns</h2>
<p>
	A vector <Tex tex={'(x_1, x_2)'} /> means "<Tex tex="x_1" /> copies of î plus <Tex tex="x_2" /> copies of ĵ". After the transformation î and ĵ have
	moved to the columns, and the vector rides along:
</p>
<Callout kind="theorem" title="Matrix times vector = combination of columns">
	<Tex display tex={'A\\mathbf x = x_1\\,\\mathbf a_1 + x_2\\,\\mathbf a_2'} />
	<p>where <Tex tex={'\\mathbf a_1, \\mathbf a_2'} /> are the columns of <Tex tex="A" />.</p>
</Callout>

<Figure caption="Drag x (blue). The result Ax is built by walking x₁ along column 1 (green) and then x₂ along column 2 (red)." max={600}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5}>
		<Arrow to={[x[0] * c1[0], x[0] * c1[1]]} color={C.iHat} dashed width={2.5} opacity={0.9} />
		<Arrow from={[x[0] * c1[0], x[0] * c1[1]]} to={ax} color={C.jHat} dashed width={2.5} opacity={0.9} />
		<Arrow to={ax} color={C.yellow} label="Ax" />
		<DragVector bind:value={x} color={C.blue} label="x" snap={0.5} limit={3} />
	</Plane2D>
	{#snippet controls()}
		<span class="font-mono text-sm text-slate-100">
			A x = {x[0].toFixed(1)}·({c1[0]}, {c1[1]}) + {x[1].toFixed(1)}·({c2[0]}, {c2[1]}) = ({ax[0].toFixed(1)}, {ax[1].toFixed(1)})
		</span>
	{/snippet}
</Figure>

<h2>A worked example</h2>
<Tex display tex={'\\begin{bmatrix} 2 & -1 \\\\ 1 & 1 \\end{bmatrix}\\begin{pmatrix}2\\\\1\\end{pmatrix} = 2\\begin{pmatrix}2\\\\1\\end{pmatrix} + 1\\begin{pmatrix}-1\\\\1\\end{pmatrix} = \\begin{pmatrix}3\\\\3\\end{pmatrix}'} />
<p>
	Row by row you would compute the same: <Tex tex={'2\\cdot2 + (-1)\\cdot1 = 3'} /> and <Tex tex={'1\\cdot2 + 1\\cdot1 = 3'} />. Same answer, but the column view shows
	<em>why</em>.
</p>

<Callout kind="intuition">
	<p>
		This also reframes linear systems. Solving <Tex tex={'A\\mathbf x = \\mathbf b'} /> asks: <em>which input vector does the machine send to <Tex tex={'\\mathbf b'} />?</em>
		It is solvable exactly when <Tex tex={'\\mathbf b'} /> lies in the span of the columns.
	</p>
</Callout>

<Recap
	points={[
		'The columns of $A$ are where $\\hat\\imath, \\hat\\jmath$ land; the whole grid is carried along.',
		'$A\\mathbf x = x_1\\mathbf a_1 + x_2\\mathbf a_2$: a **combination of the columns**.',
		'$A\\mathbf x = \\mathbf b$ is solvable exactly when $\\mathbf b$ is in the span of the columns.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import FuncGrid from '#lib/viz/FuncGrid.svelte';
	import { mul, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const W1: Mat = [
		[1, 1],
		[-1, 1]
	];
	let bias = $state(0.5);
	let relu = $state(true);
	let W2 = $derived<Mat>([
		[1, 0],
		[0.5, 1]
	]);

	const layer = (x: number[]) => {
		const h = [W1[0][0] * x[0] + W1[0][1] * x[1] - bias, W1[1][0] * x[0] + W1[1][1] * x[1] - bias];
		const a = relu ? h.map((v) => Math.max(0, v)) : h;
		return [W2[0][0] * a[0] + W2[0][1] * a[1], W2[1][0] * a[0] + W2[1][1] * a[1]];
	};
	let collapsed = $derived(mul(W2, W1));
</script>

<p>
	A neural network layer is a matrix multiplication followed by a simple nonlinear function. The matrix part is pure linear algebra; the nonlinearity is what makes deep networks more than a fancy matrix.
</p>

<h2>Why stacking linear layers is pointless</h2>
<Callout kind="theorem" title="Two linear layers are one linear layer">
	<p>
		If <Tex tex={'\\mathbf y = W_2(W_1\\mathbf x)'} /> then <Tex tex={'\\mathbf y = (W_2W_1)\\mathbf x'} /> by associativity (chapter 3). A hundred linear layers collapse into a single matrix, with no extra expressive power. For these matrices:
		<Tex display tex={'W_2W_1 = ' + texMatrix(collapsed)} />
	</p>
</Callout>

<h2>The nonlinearity</h2>
<p>
	Insert a <em>ReLU</em>, <Tex tex={'\\max(0, h)'} />, applied to each coordinate between the layers. The picture below shows what <Tex tex={'W_2\\,\\mathrm{ReLU}(W_1\\mathbf x - \\mathbf b)'} /> does to the plane. With ReLU off it is an ordinary linear map: straight, evenly spaced grid lines. With ReLU on, the plane is <em>folded</em> along the lines where a hidden unit switches on or off.
</p>

<Figure caption="Toggle the ReLU. Linear: the grid stays straight. With ReLU: it is bent into a piecewise-linear shape." max={620}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4} grid={false}>
		{#key `${relu}-${bias}`}<FuncGrid f={layer} extent={4} samples={40} />{/key}
	</Plane2D>
	{#snippet controls()}
		<label class="flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={relu} /> ReLU</label>
		<Slider label="bias" bind:value={bias} min={-1} max={2} step={0.25} />
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		Each ReLU unit divides space by a hyperplane into "off" (output 0) and "on" (linear). Many units cut space into many linear pieces, and the network can approximate very complicated functions by gluing flat pieces together. That is the geometry behind the universal approximation theorem.
	</p>
</Callout>

<h2>Shapes are everything</h2>
<p>
	A layer maps <Tex tex={'\\mathbb{R}^{d_\\text{in}} \\to \\mathbb{R}^{d_\\text{out}}'} /> with a <Tex tex={'d_\\text{out}\\times d_\\text{in}'} /> matrix, so it has <Tex tex={'d_\\text{out}d_\\text{in}'} /> parameters. Processing a batch of <Tex tex="B" /> examples at once is a single matrix–matrix product <Tex tex={'XW^{\\mathsf T}'} />, which is why GPUs (built for matrix multiplication) trained these models so well.
</p>

<Recap
	points={[
		'A layer is $\\mathbf y=\\sigma(W\\mathbf x+\\mathbf b)$: a matrix, a shift, and an elementwise nonlinearity.',
		'Without $\\sigma$, any stack of layers collapses to one matrix $W_k\\cdots W_1$.',
		'ReLU folds the plane along hyperplanes, giving piecewise-linear functions; batches turn layers into matrix–matrix products.'
	]}
/>

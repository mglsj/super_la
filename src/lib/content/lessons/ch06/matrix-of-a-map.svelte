<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	// p(x) = a + b x + c x^2, p'(x) = b + 2c x
	let a = $state(1);
	let b = $state(-1);
	let c = $state(0.5);
	let dp = $derived([b, 2 * c]);
</script>

<p>
	Here is something that should surprise you: matrices are not only for lists of numbers. <strong class="text-slate-50">Any</strong> linear map between finite-dimensional spaces can be written as a matrix, once you pick a basis on each side.
	The matrix is the map's name in that basis.
</p>

<Callout kind="definition" title="Definition: matrix of a map">
	<p>
		Let <Tex tex={'T: V \\to W'} /> be linear, with ordered bases <Tex tex={'B = (\\mathbf b_1,\\dots,\\mathbf b_n)'} /> of <Tex tex="V" /> and <Tex tex={'C'} /> of <Tex tex="W" />. The matrix <Tex tex={'[T]_{C\\leftarrow B}'} /> has as its
		<Tex tex="j" />-th column the coordinates of <Tex tex={'T(\\mathbf b_j)'} /> in <Tex tex="C" />.
	</p>
</Callout>
<p>
	It does exactly what you would hope: <Tex tex={'[T\\mathbf v]_C = [T]_{C\\leftarrow B}\\,[\\mathbf v]_B'} />. And composition becomes multiplication, because "do one map then another" corresponds to multiplying their matrices.
</p>

<h2>Example: differentiation as a matrix</h2>
<p>
	Let <Tex tex={'D: P_2 \\to P_1'} /> send a polynomial to its derivative, where <Tex tex={'P_k'} /> is polynomials of degree at most <Tex tex="k" />. Use the bases <Tex tex={'(1, x, x^2)'} /> for <Tex tex="P_2" /> and <Tex tex={'(1, x)'} /> for <Tex tex="P_1" />.
	Differentiating the basis:
</p>
<Tex display tex={'D(1) = 0 = (0,0),\\quad D(x) = 1 = (1,0),\\quad D(x^2) = 2x = (0,2).'} />
<p>These are the columns:</p>
<Tex display tex={'[D] = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}.'} />

<Figure caption="Blue: p(x) = a + bx + cx². Orange: its derivative. The matrix D takes the coefficient list (a, b, c) to (b, 2c)." max={600}>
	<Plane2D xmin={-4} xmax={4} ymin={-4} ymax={4} ticks={false}>
		<Curve fn={(x) => a + b * x + c * x * x} from={-4} to={4} color={C.blue} width={3.5} />
		<Curve fn={(x) => dp[0] + dp[1] * x} from={-4} to={4} color={C.orange} width={3.5} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={-3} max={3} step={0.1} />
		<Slider label="b" bind:value={b} min={-3} max={3} step={0.1} />
		<Slider label="c" bind:value={c} min={-1.5} max={1.5} step={0.05} />
		<span class="w-full text-center font-mono text-sm text-slate-100">
			D·({a.toFixed(1)}, {b.toFixed(1)}, {c.toFixed(2)}) = ({b.toFixed(1)}, {(2 * c).toFixed(2)})
		</span>
	{/snippet}
</Figure>

<p>
	Notice: the first column of <Tex tex="[D]" /> is all zeros because the constant polynomial 1 is in the kernel (its derivative is 0), and the rank is 2. Rank–nullity: <Tex tex={'3 = 1 + 2'} />. ✓
</p>

<Callout kind="intuition">
	<p>
		The recipe never changes: <em>apply the map to each basis vector, and write the results as columns in the output basis</em>. It is the same idea as "where do î and ĵ land?", now for any space.
	</p>
</Callout>

<Recap
	points={[
		'The matrix of $T$ has columns $[T\\mathbf b_j]_C$, the images of the input basis written in the output basis.',
		'$[T\\mathbf v]_C = [T]\\,[\\mathbf v]_B$, and composition of maps is multiplication of matrices.',
		'Even differentiation of polynomials is a matrix once you choose bases.'
	]}
/>

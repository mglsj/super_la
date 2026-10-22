<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let a = $state(1);
	let b = $state(1);
	// p(x) = 1 + x,  q(x) = x - x^2
	const p = (x: number) => 1 + x;
	const q = (x: number) => x - x * x;
</script>

<p>
	In chapter 1 you saw that arrows, lists and polynomials can all be added and scaled. A <strong class="text-slate-50">vector space</strong> is any collection where those two
	operations behave sensibly. The point of the abstraction is that everything you prove once applies to <em>all</em> of them.
</p>

<h2>The rules in plain words</h2>
<Callout kind="definition" title="Definition: real vector space">
	<p>
		A set <Tex tex="V" /> with an <em>addition</em> and a <em>scalar multiplication</em> by real numbers, such that:
	</p>
	<ul class="list-disc space-y-1 pl-6">
		<li>Adding or scaling never leaves <Tex tex="V" /> (<strong class="text-slate-50">closure</strong>).</li>
		<li>Addition is commutative and associative, there is a <strong class="text-slate-50">zero vector</strong>, and every <Tex tex={'\\mathbf v'} /> has a negative <Tex tex={'-\\mathbf v'} />.</li>
		<li>Scaling is compatible: <Tex tex={'a(b\\mathbf v) = (ab)\\mathbf v'} />, <Tex tex={'1\\mathbf v = \\mathbf v'} />, and it distributes over both kinds of addition.</li>
	</ul>
</Callout>

<h2>Familiar examples, and some surprising ones</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li><Tex tex={'\\mathbb{R}^n'} />: lists of <Tex tex="n" /> numbers.</li>
	<li>All polynomials of degree at most 2: add two, or scale one, and you stay in the family.</li>
	<li>All <Tex tex={'2\\times2'} /> matrices, added entry by entry.</li>
	<li>All continuous functions on <Tex tex={'[0,1]'} />, added pointwise.</li>
</ul>
<p>
	Below, the red curve is <Tex tex={'a\\,p + b\\,q'} /> where <Tex tex={'p = 1 + x'} /> and <Tex tex={'q = x - x^2'} />. Whatever scalars you pick, the result is again a polynomial of
	degree at most 2, so closure holds.
</p>

<Figure caption="Blue: p. Green: q. Teal: a·p + b·q. You never leave the family of polynomials of degree ≤ 2.">
	<Plane2D xmin={-4} xmax={4} ymin={-4} ymax={4} ticks={false}>
		<Curve fn={p} from={-4} to={4} color={C.blue} width={2} />
		<Curve fn={q} from={-4} to={4} color={C.iHat} width={2} />
		<Curve fn={(x) => a * p(x) + b * q(x)} from={-4} to={4} color={C.teal} width={4} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={-3} max={3} step={0.1} />
		<Slider label="b" bind:value={b} min={-3} max={3} step={0.1} />
	{/snippet}
</Figure>

<Callout kind="warning" title="Not everything is a vector space">
	<p>
		The set of polynomials of degree <em>exactly</em> 2 is not: <Tex tex={'x^2 + (-x^2) = 0'} /> has degree 0, so adding two members escapes the set. The positive reals are not
		either, since scaling by <Tex tex="-1" /> leaves the set.
	</p>
</Callout>

<Recap
	points={[
		'A **vector space** is a set where adding and scaling stay inside it and obey the usual algebra rules.',
		'$\\mathbb{R}^n$, polynomials of bounded degree, matrices and functions are all vector spaces.',
		'Sets that fail closure (degree exactly 2, positive numbers) are not.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import { mul, identity, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { animateTo, matrixTween } from '#lib/viz/tween.js';

	// R: rotate 90 degrees; S: shear
	const R: Mat = [
		[0, -1],
		[1, 0]
	];
	const S: Mat = [
		[1, 1],
		[0, 1]
	];

	let first = $state<'R' | 'S'>('R');
	let stage = $state(0); // 0 = start, 1 = after first, 2 = after both
	const view = matrixTween(identity(2), 800);

	let A = $derived(first === 'R' ? R : S); // applied first
	let B = $derived(first === 'R' ? S : R); // applied second
	let product = $derived(mul(B, A));

	function go(s: number) {
		stage = s;
		animateTo(view, s === 0 ? identity(2) : s === 1 ? A : product, 800);
	}
	function pick(f: 'R' | 'S') {
		first = f;
		stage = 0;
		animateTo(view, identity(2), 0);
	}
</script>

<p>
	What happens if you transform space with one matrix and then with another? You get a single new transformation, and its matrix is the
	<strong class="text-slate-50">product</strong>. Matrix multiplication is not an arbitrary rule about rows and columns; it is
	"do this, then that".
</p>

<h2>Do one, then the other</h2>
<p>
	Take a 90° rotation <Tex tex="R" /> and a horizontal shear <Tex tex="S" />. Choose which goes first, then step through. Watch where the green and red arrows end up.
</p>

<Figure caption="Pick the order, then step: start → first matrix → second matrix. The final grid is the product." max={600}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3} grid={false}>
		<TransformGrid matrix={view.current} extent={12} />
	</Plane2D>
	{#snippet controls()}
		<div class="flex flex-wrap items-center justify-center gap-2">
			<button class="mbtn {first === 'R' ? 'mbtn-yellow' : 'mbtn-blue'}" onclick={() => pick('R')}>Rotate, then shear</button>
			<button class="mbtn {first === 'S' ? 'mbtn-yellow' : 'mbtn-blue'}" onclick={() => pick('S')}>Shear, then rotate</button>
		</div>
		<div class="flex flex-wrap items-center justify-center gap-2">
			<button class="mbtn mbtn-blue" disabled={stage === 0} onclick={() => go(0)}>Start</button>
			<button class="mbtn mbtn-green" disabled={stage === 1} onclick={() => go(1)}>Apply 1st</button>
			<button class="mbtn mbtn-green" disabled={stage === 2} onclick={() => go(2)}>Apply 2nd</button>
		</div>
	{/snippet}
</Figure>

<p>
	Compare the two final pictures. The orders give <strong class="text-slate-50">different</strong> results. Rotating first then shearing is a different map than shearing first then rotating.
</p>

<h2>The matrix of a composite</h2>
<Callout kind="theorem" title="Product = composition">
	<p>
		If <Tex tex="A" /> is applied first and then <Tex tex="B" />, the combined transformation has matrix <Tex tex="BA" />. The order is written <em>right to left</em>, like function composition
		<Tex tex={'B(A(\\mathbf x))'} />.
	</p>
</Callout>
<p>
	The columns of <Tex tex="BA" /> are just <Tex tex="B" /> applied to the columns of <Tex tex="A" />: take where <Tex tex="A" /> sent î and ĵ, and see where <Tex tex="B" /> sends those.
	That is the whole recipe, and it explains the row-times-column rule.
</p>
<Tex display tex={'SR = ' + texMatrix(mul(S, R)) + ', \\qquad RS = ' + texMatrix(mul(R, S))} />

<Callout kind="warning" title="Matrix multiplication is not commutative">
	<p>
		In general <Tex tex={'AB \\ne BA'} />, exactly because "do A then B" and "do B then A" are different journeys. (Some pairs do commute, such as two rotations about the same point.)
		What <em>is</em> true: <Tex tex={'(AB)C = A(BC)'} />, because both mean "do C, then B, then A".
	</p>
</Callout>

<Recap
	points={[
		'The product $BA$ means "apply $A$ first, then $B$". Read it right to left.',
		'The columns of $BA$ are $B$ applied to the columns of $A$.',
		'$AB \\ne BA$ in general, but multiplication is associative.'
	]}
/>

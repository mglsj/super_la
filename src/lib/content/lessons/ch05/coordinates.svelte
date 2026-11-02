<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import { inverse, mulVec } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import WorkedExample from '#lib/components/lesson/WorkedExample.svelte';

	const polyCoords = {
		problem:
			'Let $W = \\{p\\in P_2 : p(1) = 2p(0)\\}$, which has dimension $2$.\n(a) Verify that $B = (1 + t,\\ t^2 - t)$ is an ordered basis of $W$, and find $[q]_B = (\\alpha,\\beta)^{\\mathsf T}$, where $q = \\alpha(1 + t) + \\beta(t^2 - t)$, for $q(t) = 4 + t + 3t^2$.\n(b) Add one polynomial to $B$ to get a basis of $P_2$. Justify your choice.',
		method: [
			'To show a list is a basis of a space whose dimension $n$ you know: check each vector **lies in** the space, and that the list has $n$ **independent** vectors. (Axler: in an $n$-dimensional space, $n$ independent vectors automatically span.)',
			'Coordinates: write $q = \\alpha\\,b_1 + \\beta\\,b_2$, expand, and **match coefficients** of $1, t, t^2$. Keep the order of the basis.',
			'Check your coordinates by rebuilding $q$ (and, if you like, that $q$ is in $W$ at all).',
			'To extend to a basis of a bigger space: add a vector **outside** the span. Then the list stays independent, and with the right count it is a basis.'
		],
		steps: [
			{
				label: 'B lies in W and is independent',
				text: '$1 + t$: $p(1) = 2$, $2p(0) = 2$ ✓. $t^2 - t$: $p(1) = 0$, $2p(0) = 0$ ✓. So both lie in $W$.\nThey are not multiples of each other (only one has a $t^2$ term), so they are independent. Two independent vectors in the 2-dimensional $W$ form a **basis**.'
			},
			{
				label: 'Match coefficients',
				text: '$\\alpha(1 + t) + \\beta(t^2 - t) = \\alpha + (\\alpha - \\beta)t + \\beta t^2$. Compare with $4 + t + 3t^2$:\n- constant: $\\alpha = 4$\n- $t^2$: $\\beta = 3$\n- $t$: $\\alpha - \\beta = 1$ ✓ (consistent, as it must be since $q(1) = 8 = 2q(0)$, so $q\\in W$).\nSo $[q]_B = (4, 3)^{\\mathsf T}$.'
			},
			{
				label: 'Extend to a basis of P₂',
				text: 'Add a polynomial that is **not** in $W$, for example the constant $1$: $1(1) = 1\\ne2 = 2\\cdot1(0)$.\nSince $1\\notin W = \\operatorname{span}B$, the list $(1 + t,\\ t^2 - t,\\ 1)$ is still independent (a new vector outside the span cannot create a dependence). It has $3 = \\dim P_2$ independent vectors, so it is a **basis of $P_2$**.\n(Directly: $1$ and $1 + t$ give $t$; then $t^2 - t$ gives $t^2$; so the span contains $1, t, t^2$.)'
			}
		]
	};

	let b1 = $state([2, 0]);
	let b2 = $state([1, 2]);
	let v = $state([3, 2]);

	let B = $derived([
		[b1[0], b2[0]],
		[b1[1], b2[1]]
	]);
	let Binv = $derived(inverse(B));
	let c = $derived(Binv ? mulVec(Binv, v) : null);
</script>

<p>
	The same arrow can have many different names, depending on which basis you measure it in. Coordinates are just the <em>name</em> of a vector relative to a chosen set of building blocks.
</p>

<h2>Reading a vector in a basis</h2>
<Callout kind="definition" title="Definition: coordinates">
	<p>
		If <Tex tex={'B = (\\mathbf b_1, \\dots, \\mathbf b_n)'} /> is a basis and <Tex tex={'\\mathbf v = c_1\\mathbf b_1 + \\dots + c_n\\mathbf b_n'} />, then <Tex tex={'(c_1,\\dots,c_n)'} /> are the
		<em>coordinates</em> of <Tex tex={'\\mathbf v'} /> in the basis <Tex tex="B" />, written <Tex tex={'[\\mathbf v]_B'} />.
	</p>
</Callout>

<Figure caption="Drag the basis vectors b₁, b₂ and the vector v. The dashed path walks c₁ steps along b₁, then c₂ steps along b₂." max={620}>
	<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
		<TransformGrid matrix={B} basis={false} square={false} extent={10} />
		{#if c}
			<Arrow to={[c[0] * b1[0], c[0] * b1[1]]} color={C.iHat} dashed width={2.5} opacity={0.9} />
			<Arrow from={[c[0] * b1[0], c[0] * b1[1]]} to={v} color={C.jHat} dashed width={2.5} opacity={0.9} />
		{/if}
		<DragVector bind:value={b1} color={C.iHat} label="b₁" snap={0.5} limit={4} />
		<DragVector bind:value={b2} color={C.jHat} label="b₂" snap={0.5} limit={4} />
		<DragVector bind:value={v} color={C.yellow} label="v" snap={0.5} limit={5} />
	</Plane2D>
	{#snippet controls()}
		{#if c}
			<span class="font-mono text-sm text-slate-100">
				v = ({v[0].toFixed(1)}, {v[1].toFixed(1)}) in the standard basis, but [v]_B = ({c[0].toFixed(2)}, {c[1].toFixed(2)})
			</span>
		{:else}
			<span class="text-sm text-rose-300">b₁ and b₂ are parallel, so they are not a basis.</span>
		{/if}
	{/snippet}
</Figure>

<h2>Converting between names</h2>
<p>
	Let <Tex tex="P" /> be the matrix whose columns are the basis vectors. "Combine the basis vectors with weights <Tex tex={'\\mathbf c'} />" is just matrix multiplication:
</p>
<Tex display tex={'\\mathbf v = P[\\mathbf v]_B \\qquad\\Longleftrightarrow\\qquad [\\mathbf v]_B = P^{-1}\\mathbf v.'} />
<p>
	For <Tex tex={'\\mathbf b_1 = (2,0),\\ \\mathbf b_2 = (1,2)'} /> and <Tex tex={'\\mathbf v = (3,2)'} />: solving <Tex tex={'2c_1 + c_2 = 3,\\ 2c_2 = 2'} /> gives <Tex tex={'c_2 = 1,\\ c_1 = 1'} />, so <Tex tex={'[\\mathbf v]_B = (1,1)'} />.
	Check: <Tex tex={'(2,0)+(1,2) = (3,2)'} />. ✓
</p>

<Callout kind="intuition">
	<p>
		Coordinates are not a property of the arrow. They depend on your <em>choice of rulers</em>. A good basis can turn an ugly problem into an easy one, and that is the whole motivation behind eigenvectors in chapter 8.
	</p>
</Callout>

<h2>Coordinates for polynomials</h2>
<p>
	Nothing about coordinates needs arrows. In Axler's language, once you fix an <strong class="text-slate-50">ordered basis</strong> <Tex tex={'B = (b_1, \\dots, b_n)'} /> of any vector space,
	each vector <Tex tex="q" /> has exactly one list of weights with <Tex tex={'q = \\alpha_1b_1 + \\dots + \\alpha_nb_n'} />, and <Tex tex={'[q]_B = (\\alpha_1, \\dots, \\alpha_n)^{\\mathsf T}'} />.
	For polynomials you find the weights by expanding and <em>matching coefficients</em> of <Tex tex={'1, t, t^2, \\dots'} />.
</p>
<Callout kind="theorem" title="Extending a basis">
	<p>
		If <Tex tex={'(b_1,\\dots,b_k)'} /> is independent and <Tex tex="v" /> is not in their span, then <Tex tex={'(b_1,\\dots,b_k,v)'} /> is still independent. Repeat until you have
		<Tex tex={'\\dim V'} /> vectors: that list is a basis of <Tex tex="V" />.
	</p>
</Callout>

<WorkedExample title="polynomial coordinates and extending a basis" problem={polyCoords.problem} method={polyCoords.method} steps={polyCoords.steps} credit="Ordered bases and extension after Axler, Chapter 2; matching coefficients as in Strang." />

<Recap
	points={[
		'Coordinates in a polynomial basis: expand $\\alpha b_1 + \\beta b_2 + \\dots$ and match the coefficients of $1, t, t^2$.',
		'Extend a basis by adding a vector outside the current span, until you have $\\dim V$ vectors.',
		'$[\\mathbf v]_B$ lists the weights that build $\\mathbf v$ from the basis vectors.',
		'With $P$ = matrix of basis columns: $\\mathbf v = P[\\mathbf v]_B$ and $[\\mathbf v]_B = P^{-1}\\mathbf v$.',
		'The same vector has different coordinates in different bases.'
	]}
/>

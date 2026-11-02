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
	import Slider from '#lib/components/lesson/Slider.svelte';
	import WorkedExample from '#lib/components/lesson/WorkedExample.svelte';

	const poly = {
		problem:
			'Let $P_2$ be the polynomials of degree at most $2$.\n(a) Show that $W = \\{p\\in P_2 : p(1) = 2p(0)\\}$ is a subspace. Writing $p(t) = a + bt + ct^2$, find a basis of $W$ and its dimension.\n(b) Is $S = \\{p\\in P_2 : p(0)\\,p(2) = 0\\}$ a subspace? If not, give two explicit polynomials showing a condition fails.',
		method: [
			'**Linear condition** (each term is a single value $p(\\cdot)$, $p\'(\\cdot)$, ... to the first power, $= 0$ after moving everything to one side): check the three subspace conditions directly, or note the set is the kernel of a linear map.',
			'**Basis**: substitute $p = a + bt + ct^2$, turn the condition into equations on $a,b,c$, solve with free parameters, and read off one polynomial per free parameter.',
			'**Dimension** = number of free parameters (equivalently $3$ minus the number of independent conditions).',
			'**Nonlinear condition** (a product, a square, an "or", a "$= 1$"): suspect it is not a subspace. Find two members whose **sum** leaves the set, or a member whose **multiple** leaves it, or show $0$ is missing.'
		],
		steps: [
			{
				label: 'W is a subspace',
				text: '- **Zero**: the zero polynomial has $0(1) = 0 = 2\\cdot0(0)$, so $0\\in W$.\n- **Sums**: if $p, q\\in W$ then $(p + q)(1) = p(1) + q(1) = 2p(0) + 2q(0) = 2(p + q)(0)$.\n- **Multiples**: $(cp)(1) = c\\,p(1) = c\\cdot2p(0) = 2(cp)(0)$.\nShortcut: $W = \\ker T$ for the linear map $T(p) = p(1) - 2p(0)$, and kernels are always subspaces.'
			},
			{
				label: 'Turn the condition into equations',
				text: 'With $p = a + bt + ct^2$: $p(0) = a$ and $p(1) = a + b + c$. The condition $a + b + c = 2a$ becomes $a = b + c$.'
			},
			{
				label: 'Parametrise and read off a basis',
				text: '$b$ and $c$ are free, $a = b + c$:\n$p = (b + c) + bt + ct^2 = b(1 + t) + c(1 + t^2)$.\nSo $W = \\operatorname{span}\\{1 + t,\\ 1 + t^2\\}$. These two are independent (only the second has a $t^2$ term, only the first has a $t$ term), so they form a **basis** and $\\dim W = 2$.\nSanity check: one linear condition cut $\\dim P_2 = 3$ down to $2$.'
			},
			{
				label: 'Is S a subspace?',
				text: 'The condition is a **product**, so test closure under addition. $p(t) = t$ has $p(0) = 0$, so $p\\in S$. $q(t) = 2 - t$ has $q(2) = 0$, so $q\\in S$.\nBut $(p + q)(t) = 2$, and $(p + q)(0)\\,(p + q)(2) = 2\\cdot2 = 4\\ne0$. So $p + q\\notin S$: **not closed under addition, not a subspace**.\n(Note $S$ does contain $0$ and is closed under scaling, so those checks alone would not catch it: $S$ is the union of two subspaces, $\\{p(0) = 0\\}\\cup\\{p(2) = 0\\}$.)'
			}
		]
	};

	type SetDef = { name: string; has: (v: number[]) => boolean; line?: { point: number[]; dir: number[] } };
	const near = (x: number) => Math.abs(x) < 1e-6;
	const sets: SetDef[] = [
		{ name: 'Line y = x', has: (v) => near(v[1] - v[0]), line: { point: [0, 0], dir: [1, 1] } },
		{ name: 'Line y = x + 1', has: (v) => near(v[1] - v[0] - 1), line: { point: [0, 1], dir: [1, 1] } },
		{ name: 'First quadrant', has: (v) => v[0] >= -1e-6 && v[1] >= -1e-6 },
		{ name: 'The two axes', has: (v) => near(v[0]) || near(v[1]) },
		{ name: 'Whole plane', has: () => true }
	];

	let which = $state(0);
	let u = $state([1, 1]);
	let v = $state([2, 2]);
	let c = $state(-1);

	let S = $derived(sets[which]);
	let sum = $derived([u[0] + v[0], u[1] + v[1]]);
	let scaled = $derived([c * u[0], c * u[1]]);
	let checks = $derived([
		{ label: 'u in S', ok: S.has(u) },
		{ label: 'v in S', ok: S.has(v) },
		{ label: 'u + v in S', ok: S.has(sum) },
		{ label: 'c·u in S', ok: S.has(scaled) }
	]);
	let bothIn = $derived(S.has(u) && S.has(v));
	let violation = $derived((bothIn && !S.has(sum)) || (S.has(u) && !S.has(scaled)));
	let zeroIn = $derived(S.has([0, 0]));
</script>

<p>
	Sometimes a vector space sits <em>inside</em> a bigger one, like a plane through the origin inside 3D. These smaller spaces are called
	<strong class="text-slate-50">subspaces</strong>, and they are the objects every later chapter talks about.
</p>

<Callout kind="definition" title="Definition: subspace">
	<p>
		A subset <Tex tex="S" /> of a vector space <Tex tex="V" /> is a <em>subspace</em> if it contains <Tex tex={'\\mathbf 0'} /> and is closed under addition and scalar multiplication:
		<Tex display tex={'\\mathbf u, \\mathbf v \\in S \\;\\Rightarrow\\; \\mathbf u + \\mathbf v \\in S, \\qquad \\mathbf u \\in S,\\ c \\in \\mathbb{R} \\;\\Rightarrow\\; c\\mathbf u \\in S.'} />
	</p>
</Callout>

<h2>Be the tester</h2>
<p>
	Pick a set, then drag <Tex tex={'\\mathbf u'} /> and <Tex tex={'\\mathbf v'} /> inside it. If adding or scaling ever throws you out of the set, it is not a subspace.
	Try putting <Tex tex={'\\mathbf u, \\mathbf v'} /> on the line <Tex tex="y = x + 1" />, or in the first quadrant with a negative <Tex tex="c" />.
</p>

<Figure caption="Green checks mean 'still inside'. A red cross after two green inputs is a violation." max={620}>
	<Plane2D xmin={-5} xmax={5} ymin={-4} ymax={4}>
		{#if S.line}<Line point={S.line.point} dir={S.line.dir} color={C.yellow} width={3} opacity={0.5} />{/if}
		{#if which === 2}
			<polygon points="{(320 + 0).toString()},0 640,0 640,{(4 / 8) * 512} 320,{(4 / 8) * 512}" fill={C.yellow} opacity="0.12" />
		{/if}
		{#if which === 3}
			<Line point={[0, 0]} dir={[1, 0]} color={C.yellow} width={3} opacity={0.5} />
			<Line point={[0, 0]} dir={[0, 1]} color={C.yellow} width={3} opacity={0.5} />
		{/if}
		<Arrow to={sum} color={C.teal} dashed width={2.5} label="u+v" />
		<Arrow to={scaled} color={C.purple} dashed width={2.5} label="c·u" />
		<DragVector bind:value={u} color={C.blue} label="u" snap={0.5} limit={4} />
		<DragVector bind:value={v} color={C.jHat} label="v" snap={0.5} limit={4} />
	</Plane2D>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-1.5">
			{#each sets as s, i (s.name)}
				<button class="mbtn {which === i ? 'mbtn-yellow' : 'mbtn-blue'}" style="padding: 0.45rem 0.6rem; font-size: 9px;" onclick={() => (which = i)}>{s.name}</button>
			{/each}
		</div>
		<Slider label="c" bind:value={c} min={-3} max={3} step={0.5} />
		<ul class="flex flex-wrap justify-center gap-3 text-sm">
			{#each checks as k (k.label)}
				<li class={k.ok ? 'text-emerald-300' : 'text-rose-300'}>{k.ok ? '✓' : '✗'} {k.label}</li>
			{/each}
			<li class={zeroIn ? 'text-emerald-300' : 'text-rose-300'}>{zeroIn ? '✓' : '✗'} contains 0</li>
		</ul>
		<span class="w-full text-center text-sm {violation ? 'text-rose-300' : 'text-slate-400'}">
			{violation ? 'Closure failed: this set is not a subspace.' : 'No violation with these inputs. Try other ones!'}
		</span>
	{/snippet}
</Figure>

<h2>The shortcut</h2>
<Callout kind="theorem" title="Subspace test">
	<p>
		<Tex tex="S" /> is a subspace exactly when it is nonempty and <Tex tex={'c\\mathbf u + \\mathbf v \\in S'} /> for all <Tex tex={'\\mathbf u, \\mathbf v \\in S'} /> and all scalars <Tex tex="c" />.
		In particular every subspace contains the zero vector: scale any member by 0.
	</p>
</Callout>

<h2>All the subspaces of the plane</h2>
<p>
	In <Tex tex={'\\mathbb{R}^2'} /> there are exactly three kinds: the origin alone, any <em>line through the origin</em>, and the whole plane. In <Tex tex={'\\mathbb{R}^3'} /> add planes through the origin.
	The span of any collection of vectors is always a subspace, and every subspace is the span of something.
</p>

<h2>Subspaces of functions, cut out by conditions</h2>
<p>
	Everything above works in any vector space, not just <Tex tex={'\\mathbb R^n'} />. Axler's favourite examples are spaces of polynomials described by a condition, such as
	<Tex tex={'\\{p\\in P_2 : p(3) = 0\\}'} />. The rule of thumb:
</p>
<Callout kind="theorem" title="Linear conditions give subspaces">
	<p>
		If the condition says some <strong class="text-slate-50">linear</strong> expression in <Tex tex="p" /> equals zero (for example <Tex tex={'p(0) - p(1) = 0'} />,
		<Tex tex={'p\'(2) = 0'} />, <Tex tex={'\\int_0^1 p = 0'} />), the set is the kernel of a linear map, so it is a subspace. Products, squares, "or", or a nonzero right-hand side
		(<Tex tex={'p(0) = 1'} />) usually break it.
	</p>
</Callout>
<Callout kind="warning" title="Showing something is not a subspace">
	<p>
		Write down <strong class="text-slate-50">specific</strong> members and a specific failure: "<Tex tex="p = t" /> and <Tex tex="q = 2 - t" /> are in <Tex tex="S" />, but
		<Tex tex="p + q = 2" /> is not". A general argument ("products are not linear") earns no marks without an explicit counterexample.
	</p>
</Callout>

<WorkedExample title="a polynomial subspace and a non-subspace" problem={poly.problem} method={poly.method} steps={poly.steps} credit="Polynomial subspaces in the style of Axler, Chapter 1; parametrising to get a basis as in Strang's null-space recipe." />

<Recap
	points={[
		'A set cut out by a **linear** condition (e.g. $p(0) = p(1)$) is a subspace: it is a kernel. Find a basis by parametrising $p = a + bt + ct^2$.',
		'To show a set is not a subspace, give explicit members whose sum (or a multiple) leaves the set.',
		'A **subspace** contains $\\mathbf 0$ and is closed under adding and scaling.',
		'Lines and planes through the origin are subspaces; shifted lines, quadrants and unions of lines are not.',
		'The span of any set of vectors is a subspace.'
	]}
/>

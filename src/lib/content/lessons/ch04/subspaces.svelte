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

<Recap
	points={[
		'A **subspace** contains $\\mathbf 0$ and is closed under adding and scaling.',
		'Lines and planes through the origin are subspaces; shifted lines, quadrants and unions of lines are not.',
		'The span of any set of vectors is a subspace.'
	]}
/>

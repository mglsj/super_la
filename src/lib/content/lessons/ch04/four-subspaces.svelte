<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, makePlane, orientPlane, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import { nullSpace, rank, rref } from '#lib/math/gauss.js';
	import { transpose, type Mat } from '#lib/math/mat.js';
	import { cross } from '#lib/math/vec.js';
	import { fmtNum } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let m = $state<Mat>([
		[1, 2, 3],
		[2, 4, 6],
		[1, 0, 1]
	]);
	let r = $derived(rank(m));
	let nul = $derived(nullSpace(m));
	let leftNul = $derived(nullSpace(transpose(m)));
	let rowBasis = $derived(rref(m).result.filter((row) => row.some((x) => Math.abs(x) > 1e-9)));
	let colBasis = $derived(
		rref(m).pivots.map((c) => m.map((row) => row[c]))
	);
	const vec = (v: number[]) => '(' + v.map((x) => Math.round(x * 100) / 100).join(', ') + ')';

	// 3D: in R^3, for rank 2 the row space is a plane and the null space is its normal line
	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const plane = makePlane(THREE, [0, 0, 1], 6, HEX.yellow);
		const arrow = makeArrow(THREE, [0, 0, 0], [0, 0, 1], HEX.jHat);
		scene.add(plane, arrow);
		return {
			update() {
				const ns = nullSpace(m);
				const rk = rank(m);
				if (rk === 2 && ns[0]) {
					orientPlane(THREE, plane, ns[0]);
					setArrow(THREE, arrow, [-ns[0][0] * 1.5, -ns[0][1] * 1.5, -ns[0][2] * 1.5], ns[0].map((x) => x * 1.5));
				} else if (rk === 1 && ns.length === 2) {
					const n = cross(ns[0], ns[1]);
					orientPlane(THREE, plane, n);
					setArrow(THREE, arrow, [0, 0, 0], n.map((x) => x * 1.5));
				} else {
					plane.visible = false;
					arrow.visible = false;
				}
			}
		};
	}
</script>

<p>
	A matrix <Tex tex="A" /> with <Tex tex="m" /> rows and <Tex tex="n" /> columns hides <strong class="text-slate-50">four</strong> subspaces, and together they paint the complete picture of
	what <Tex tex="A" /> does. Here is the whole cast, with <Tex tex="r" /> the rank:
</p>

<div class="my-4 overflow-x-auto">
	<table class="mx-auto w-full max-w-xl border-collapse text-left text-sm">
		<thead>
			<tr class="font-pixel border-b-2 border-slate-600 text-[9px] text-[#fbd000]">
				<th class="py-2 pr-3">Subspace</th>
				<th class="pr-3">Lives in</th>
				<th>Dimension</th>
			</tr>
		</thead>
		<tbody class="text-slate-300">
			<tr class="border-b border-slate-700"><td class="py-2 pr-3">Column space <Tex tex={'C(A)'} /></td><td class="pr-3"><Tex tex={'\\mathbb{R}^m'} /></td><td><Tex tex="r" /></td></tr>
			<tr class="border-b border-slate-700"><td class="py-2 pr-3">Null space <Tex tex={'N(A)'} /></td><td class="pr-3"><Tex tex={'\\mathbb{R}^n'} /></td><td><Tex tex="n - r" /></td></tr>
			<tr class="border-b border-slate-700"><td class="py-2 pr-3">Row space <Tex tex={'C(A^{\\mathsf T})'} /></td><td class="pr-3"><Tex tex={'\\mathbb{R}^n'} /></td><td><Tex tex="r" /></td></tr>
			<tr><td class="py-2 pr-3">Left null space <Tex tex={'N(A^{\\mathsf T})'} /></td><td class="pr-3"><Tex tex={'\\mathbb{R}^m'} /></td><td><Tex tex="m - r" /></td></tr>
		</tbody>
	</table>
</div>

<h2>Compute all four</h2>
<Figure caption="Edit the 3×3 matrix. Bases update live. Try making all rows independent, or all rows multiples of one." max={700}>
	<div class="flex justify-center"><MatrixInput bind:value={m} step={1} /></div>
	<div class="space-y-1.5 text-left font-mono text-xs text-slate-200 sm:text-sm">
		<p><span class="text-[#fbd000]">rank</span> = {r}</p>
		<p><span class="text-sky-300">C(A)</span> basis: {colBasis.map(vec).join('  ') || '—'}</p>
		<p><span class="text-rose-300">N(A)</span> basis: {nul.map(vec).join('  ') || '— (only 0)'}</p>
		<p><span class="text-emerald-300">row space</span> basis: {rowBasis.map(vec).join('  ') || '—'}</p>
		<p><span class="text-purple-300">N(Aᵀ)</span> basis: {leftNul.map(vec).join('  ') || '— (only 0)'}</p>
	</div>
</Figure>

<h2>The orthogonality that ties them together</h2>
<p>
	Look at what <Tex tex={'A\\mathbf x = \\mathbf 0'} /> says row by row: every row of <Tex tex="A" /> has dot product zero with <Tex tex={'\\mathbf x'} />. So the null space is perpendicular to the row space.
	In <Tex tex={'\\mathbb{R}^3'} /> with rank 2, the row space is a plane and the null space is the line sticking straight out of it.
</p>

<Figure caption="Yellow: row space (a plane). Red: the null space, perpendicular to it. Drag to orbit." max={640}>
	<Scene3D {build} label="Row space plane and its perpendicular null space line" height={320} />
</Figure>

<Callout kind="theorem" title="The big picture">
	<p>
		<Tex tex={'N(A) \\perp C(A^{\\mathsf T})'} /> inside <Tex tex={'\\mathbb{R}^n'} />, with dimensions adding to <Tex tex="n" />: together they fill the whole space.
		Likewise <Tex tex={'N(A^{\\mathsf T}) \\perp C(A)'} /> inside <Tex tex={'\\mathbb{R}^m'} />. And the two dimensions called <Tex tex="r" /> are the same number:
		<em> row rank = column rank</em>.
	</p>
</Callout>

<Recap
	points={[
		'The four subspaces: column space, null space, row space, left null space, with dimensions $r$, $n-r$, $r$, $m-r$.',
		'Null space ⟂ row space in $\\mathbb{R}^n$; left null space ⟂ column space in $\\mathbb{R}^m$.',
		'Row rank equals column rank.'
	]}
/>

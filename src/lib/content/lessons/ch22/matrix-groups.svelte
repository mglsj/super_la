<script lang="ts">
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { det, inverse, mul, transpose, identity, type Mat } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let A = $state<Mat>([
		[0, -1],
		[1, 0]
	]);
	let B = $state<Mat>([
		[1, 1],
		[0, 1]
	]);

	const near = (a: Mat, b: Mat) => a.every((r, i) => r.every((x, j) => Math.abs(x - b[i][j]) < 1e-6));
	const sets: { name: string; short: string; has: (M: Mat) => boolean }[] = [
		{ name: 'GL(2): invertible matrices (det ≠ 0)', short: 'GL', has: (M) => Math.abs(det(M)) > 1e-9 },
		{ name: 'SL(2): determinant exactly 1', short: 'SL', has: (M) => Math.abs(det(M) - 1) < 1e-6 },
		{ name: 'O(2): orthogonal (QᵀQ = I)', short: 'O', has: (M) => near(mul(transpose(M), M), identity(2)) },
		{ name: 'Symmetric matrices (Mᵀ = M)', short: 'Sym', has: (M) => near(M, transpose(M)) }
	];
	let AB = $derived(mul(A, B));
	let rows = $derived(
		sets.map((s) => {
			const inA = s.has(A);
			const inB = s.has(B);
			const inAB = s.has(AB);
			const invA = inverse(A);
			return { ...s, inA, inB, inAB, invOk: invA ? s.has(invA) : false, closedHere: !(inA && inB) || inAB };
		})
	);
	const mark = (ok: boolean) => (ok ? '✓' : '✗');
</script>

<p>
	Transformations can be composed and undone. A collection of invertible matrices that is <em>closed</em> under those two operations is called a <strong class="text-slate-50">matrix group</strong>, and groups are the mathematical language of symmetry.
</p>

<Callout kind="definition" title="Definition: matrix group">
	<p>
		A set <Tex tex="G" /> of invertible <Tex tex={'n\\times n'} /> matrices is a <em>group</em> if it contains <Tex tex="I" />, and for all <Tex tex="A, B \\in G" /> both <Tex tex="AB" /> and <Tex tex={'A^{-1}'} /> are in <Tex tex="G" />. (Associativity comes free from matrix multiplication.)
	</p>
</Callout>

<h2>Test candidates</h2>
<p>
	Four natural families of 2×2 matrices are listed below. Edit <Tex tex="A" /> and <Tex tex="B" />: a family fails to be a group the moment you find <Tex tex="A, B" /> in it with <Tex tex="AB" /> outside. Try the symmetric one with <Tex tex={'A = \\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}'} /> and <Tex tex={'B = \\begin{bmatrix}1&0\\\\0&2\\end{bmatrix}'} />.
</p>

<Figure caption="✓ means the matrix is in the family. 'Closed here' checks the product rule for the current pair." max={720}>
	<div class="flex flex-wrap items-center justify-center gap-4">
		<div class="text-center"><p class="font-pixel mb-1 text-[9px] text-slate-400">A</p><MatrixInput bind:value={A} step={1} label="A" /></div>
		<div class="text-center"><p class="font-pixel mb-1 text-[9px] text-slate-400">B</p><MatrixInput bind:value={B} step={1} label="B" /></div>
	</div>
	<Tex display tex={'AB = ' + texMatrix(AB)} />
	<div class="overflow-x-auto">
		<table class="mx-auto w-full max-w-xl text-left text-xs sm:text-sm">
			<thead>
				<tr class="font-pixel border-b-2 border-slate-600 text-[8px] text-[#fbd000]">
					<th class="py-2 pr-2">Family</th><th class="px-1">A</th><th class="px-1">B</th><th class="px-1">AB</th><th class="px-1">A⁻¹</th><th class="px-1">closed here</th>
				</tr>
			</thead>
			<tbody class="text-slate-300">
				{#each rows as r (r.short)}
					<tr class="border-b border-slate-700">
						<td class="py-1.5 pr-2">{r.name}</td>
						<td class="px-1 {r.inA ? 'text-emerald-300' : 'text-rose-300'}">{mark(r.inA)}</td>
						<td class="px-1 {r.inB ? 'text-emerald-300' : 'text-rose-300'}">{mark(r.inB)}</td>
						<td class="px-1 {r.inAB ? 'text-emerald-300' : 'text-rose-300'}">{mark(r.inAB)}</td>
						<td class="px-1 {r.invOk ? 'text-emerald-300' : 'text-rose-300'}">{mark(r.invOk)}</td>
						<td class="px-1 {r.closedHere ? 'text-slate-400' : 'text-rose-300'}">{r.closedHere ? 'yes' : 'FAILS'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Figure>

<Callout kind="theorem" title="The classical groups">
	<ul class="list-disc space-y-1 pl-6">
		<li><Tex tex={'GL_n'} />: all invertible matrices (the group of all symmetries of linear structure).</li>
		<li><Tex tex={'SL_n'} />: determinant 1, the volume-preserving maps. A product of determinant-1 matrices has determinant 1 by multiplicativity.</li>
		<li><Tex tex={'O_n'} />: orthogonal matrices, preserving lengths and angles. <Tex tex={'SO_n'} /> = those with determinant 1 (rotations).</li>
		<li>Invertible upper-triangular, and permutation matrices, are groups too. <em>Symmetric</em> matrices are not.</li>
	</ul>
</Callout>

<Callout kind="intuition">
	<p>
		Klein's Erlangen idea: a geometry is a group together with the properties that group leaves alone. Euclidean geometry is <Tex tex={'O_n'} /> (plus translations): lengths and angles. Equiareal geometry is <Tex tex={'SL_2'} />: areas. Choose a bigger group and fewer quantities stay fixed.
	</p>
</Callout>

<Recap
	points={[
		'A **matrix group** contains $I$ and is closed under products and inverses.',
		'$GL_n$, $SL_n$, $O_n$, $SO_n$ are groups; symmetric matrices are not (product of symmetric matrices need not be symmetric).',
		'Each group is a set of symmetries: the quantities it preserves define a geometry.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import { mulVec, transpose, type Mat } from '#lib/math/mat.js';
	import { dot } from '#lib/math/vec.js';
	import { rank } from '#lib/math/gauss.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	let A = $state<Mat>([
		[1, 1],
		[0, 2]
	]);
	let x = $state([1.5, 1]);
	let w = $state([1, 0.5]);

	let Ax = $derived(mulVec(A, x));
	let Atw = $derived(mulVec(transpose(A), w));
	let left = $derived(dot(w, Ax));
	let right = $derived(dot(Atw, x));
</script>

<p>
	Given a linear map <Tex tex={'T: V\\to W'} />, any functional <Tex tex={'\\varphi'} /> on the output space can be <em>pulled back</em> to a functional on the input space: first apply <Tex tex="T" />, then measure. That is a perfectly natural construction, and it has a name.
</p>

<Callout kind="definition" title="Definition: dual map">
	<p>
		The <em>dual map</em> (or transpose) <Tex tex={'T^*: W^* \\to V^*'} /> is <Tex tex={'T^*(\\varphi) = \\varphi\\circ T'} />, i.e. <Tex tex={'(T^*\\varphi)(\\mathbf v) = \\varphi(T\\mathbf v)'} />. It reverses the direction of the arrows.
	</p>
</Callout>

<h2>The transpose, revealed</h2>
<p>
	In coordinates, <Tex tex={'\\varphi(\\mathbf y) = \\mathbf w^{\\mathsf T}\\mathbf y'} /> and <Tex tex={'T\\mathbf x = A\\mathbf x'} />, so <Tex tex={'\\varphi(T\\mathbf x) = \\mathbf w^{\\mathsf T}A\\mathbf x = (A^{\\mathsf T}\\mathbf w)^{\\mathsf T}\\mathbf x'} />. The matrix of the dual map is <strong class="text-slate-50"><Tex tex={'A^{\\mathsf T}'} /></strong>. That is what the transpose <em>is</em>: not "flip the entries", but "pull measurements back through the map".
</p>

<Figure caption="Left: input space with x and the pulled-back functional Aᵀw. Right: output space with Ax and the functional w. The two ways of measuring always agree." max={900}>
	<div class="grid gap-3 sm:grid-cols-2">
		<div>
			<p class="font-pixel mb-1 text-center text-[9px] text-slate-400">INPUT SPACE</p>
			<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3}>
				<Arrow to={Atw} color={C.purple} label="Aᵀw" />
				<DragVector bind:value={x} color={C.blue} label="x" snap={0.5} limit={3.5} />
			</Plane2D>
		</div>
		<div>
			<p class="font-pixel mb-1 text-center text-[9px] text-slate-400">OUTPUT SPACE</p>
			<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5}>
				<Arrow to={Ax} color={C.teal} label="Ax" />
				<DragVector bind:value={w} color={C.orange} label="w" snap={0.5} limit={3.5} />
			</Plane2D>
		</div>
	</div>
	<div class="flex justify-center"><MatrixInput bind:value={A} step={1} /></div>
	{#snippet controls()}
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>w · (A x) = <span class="text-amber-300">{left.toFixed(3)}</span></span>
			<span>(Aᵀ w) · x = <span class="text-amber-300">{right.toFixed(3)}</span></span>
		</div>
	{/snippet}
</Figure>

<h2>Annihilators and the four subspaces</h2>
<Callout kind="theorem" title="Why rank(A) = rank(Aᵀ)">
	<p>
		The <em>annihilator</em> of a subspace <Tex tex="U \subseteq V" /> is the set of functionals that vanish on all of <Tex tex="U" />; it has dimension <Tex tex={'\\dim V - \\dim U'} />. For a map <Tex tex="T" />:
		<Tex display tex={'\\ker T^* = (\\operatorname{Im}T)^{\\circ}, \\qquad \\operatorname{Im}T^* = (\\ker T)^{\\circ}.'} />
		Counting dimensions gives <Tex tex={'\\operatorname{rank}T^* = \\dim V - \\dim\\ker T = \\operatorname{rank}T'} />: row rank equals column rank, now with an explanation rather than a computation. It is also the origin of the orthogonality of the four subspaces from chapter 4.
	</p>
</Callout>
<p class="text-sm text-slate-400">For your matrix: rank(A) = {rank(A)} and rank(Aᵀ) = {rank(transpose(A))}.</p>

<Callout kind="intuition">
	<p>
		With an inner product, you can identify each functional with a vector (the vector <Tex tex={'\\mathbf w'} /> representing <Tex tex={'\\mathbf w^{\\mathsf T}\\cdot'} />), and then the dual map becomes the <em>adjoint</em>. That identification is what hides the distinction in <Tex tex={'\\mathbb{R}^n'} /> with the dot product, and why it stays hidden until you change basis non-orthogonally or leave inner product spaces.
	</p>
</Callout>

<Recap
	points={[
		'The dual map $T^*\\varphi=\\varphi\\circ T$ pulls measurements back; its matrix is $A^{\\mathsf T}$.',
		'$\\varphi(T\\mathbf x)=(A^{\\mathsf T}\\mathbf w)\\cdot\\mathbf x$: the defining identity of the transpose.',
		'$\\ker T^*=(\\operatorname{Im}T)^\\circ$ and $\\operatorname{Im}T^*=(\\ker T)^\\circ$, which explains row rank = column rank.'
	]}
/>

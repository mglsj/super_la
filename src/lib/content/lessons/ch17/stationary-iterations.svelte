<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { inverse, mulVec } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let d = $state(3); // diagonal strength of the first equation
	let method = $state<'jacobi' | 'gs'>('jacobi');
	let steps = $state(6);

	// d x + 1.5 y = 5 ;  1.5 x + 2 y = 5
	let A = $derived([
		[d, 1.5],
		[1.5, 2]
	]);
	const b = [5, 5];
	let exact = $derived(mulVec(inverse(A)!, b));
	let path = $derived.by(() => {
		const pts: number[][] = [[0, 0]];
		let [x, y] = [0, 0];
		for (let k = 0; k < steps; k++) {
			const nx = (b[0] - 1.5 * y) / d;
			const ny = method === 'jacobi' ? (b[1] - 1.5 * x) / 2 : (b[1] - 1.5 * nx) / 2;
			[x, y] = [nx, ny];
			pts.push([x, y]);
		}
		return pts;
	});
	let err = $derived(Math.hypot(path[path.length - 1][0] - exact[0], path[path.length - 1][1] - exact[1]));
	// spectral radius of the Jacobi iteration matrix: sqrt(1.5^2 / (2 d))
	let rho = $derived(method === 'jacobi' ? Math.sqrt(2.25 / (2 * d)) : 2.25 / (2 * d));
	const lineOf = (a: number, bb: number, c: number) => {
		const n2 = a * a + bb * bb;
		return { point: [(c * a) / n2, (c * bb) / n2], dir: [-bb, a] };
	};
	let l1 = $derived(lineOf(d, 1.5, 5));
	let l2 = $derived(lineOf(1.5, 2, 5));
</script>

<p>
	For a huge sparse system (millions of unknowns) even storing the factors of <Tex tex="A" /> can be impossible. The alternative: start with a guess and <em>repeatedly improve it</em>, using only matrix–vector products.
</p>

<h2>Jacobi and Gauss–Seidel</h2>
<p>
	Split <Tex tex={'A = D + R'} /> with <Tex tex="D" /> the diagonal. The equation <Tex tex={'A\\mathbf x = \\mathbf b'} /> becomes <Tex tex={'D\\mathbf x = \\mathbf b - R\\mathbf x'} />, which suggests the update
	<Tex display tex={'\\mathbf x_{k+1} = D^{-1}(\\mathbf b - R\\mathbf x_k).'} />
	That is <strong class="text-slate-50">Jacobi</strong>: solve each equation for its own unknown using the old values of the others. <strong class="text-slate-50">Gauss–Seidel</strong> does the same but uses each new value immediately.
</p>

<Figure caption="The two lines are the equations; the path is the sequence of iterates starting from the origin, bouncing between the lines. Make the first diagonal entry small and it diverges." max={620}>
	<Plane2D xmin={-2} xmax={8} ymin={-3} ymax={5}>
		<Line point={l1.point} dir={l1.dir} color={C.blue} />
		<Line point={l2.point} dir={l2.dir} color={C.jHat} />
		{#each path as p, i (i)}
			{#if i > 0}<Line a={path[i - 1]} b={p} color={C.yellow} width={1.8} opacity={0.8} />{/if}
			<Dot at={p} color={i === path.length - 1 ? C.teal : C.yellow} r={i === path.length - 1 ? 6 : 3.5} />
		{/each}
		<Dot at={exact} color={C.iHat} r={7} hollow label="solution" />
	</Plane2D>
	{#snippet controls()}
		<div class="flex flex-wrap justify-center gap-2">
			<button class="mbtn {method === 'jacobi' ? 'mbtn-yellow' : 'mbtn-blue'}" onclick={() => (method = 'jacobi')}>Jacobi</button>
			<button class="mbtn {method === 'gs' ? 'mbtn-yellow' : 'mbtn-blue'}" onclick={() => (method = 'gs')}>Gauss–Seidel</button>
		</div>
		<Slider label="d" bind:value={d} min={0.25} max={4} step={0.25} />
		<Slider label="steps" bind:value={steps} min={1} max={15} step={1} display={String(steps)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>error after {steps} steps: <span class="text-amber-300">{err.toFixed(4)}</span></span>
			<span>convergence factor ρ = {rho.toFixed(2)} {rho < 1 ? '(converges)' : '(diverges)'}</span>
		</div>
	{/snippet}
</Figure>

<Callout kind="theorem" title="When does it converge?">
	<p>
		A stationary iteration <Tex tex={'\\mathbf x_{k+1} = G\\mathbf x_k + \\mathbf c'} /> converges for every start iff the <strong class="text-slate-50">spectral radius</strong> <Tex tex={'\\rho(G) = \\max|\\lambda_i(G)| < 1'} />, and the error shrinks like <Tex tex={'\\rho^k'} />. A sufficient condition for Jacobi and Gauss–Seidel is that <Tex tex="A" /> is
		<em>strictly diagonally dominant</em> (each diagonal entry exceeds the sum of the other entries in its row), or that <Tex tex="A" /> is symmetric positive definite (Gauss–Seidel).
	</p>
</Callout>

<Callout kind="intuition">
	<p>
		Gauss–Seidel usually converges about twice as fast as Jacobi (ρ is squared for many matrices, as in the readout above). Both are simple but slow when the matrix is poorly conditioned, which leads to the smarter methods in the next lesson.
	</p>
</Callout>

<Recap
	points={[
		'Jacobi: $\\mathbf x_{k+1}=D^{-1}(\\mathbf b-R\\mathbf x_k)$. Gauss–Seidel uses fresh values immediately.',
		'Convergence iff the spectral radius of the iteration matrix is $<1$; error shrinks like $\\rho^k$.',
		'Diagonal dominance guarantees convergence; each step needs only a matrix–vector product.'
	]}
/>

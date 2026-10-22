<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Bars from '#lib/viz/Bars.svelte';
	import { mulVec, mpow } from '#lib/math/mat.js';
	import { texMatrix } from '#lib/math/tex.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let a = $state(0.2); // P(sunny -> rainy)
	let b = $state(0.4); // P(rainy -> sunny)
	let k = $state(3);

	// column-stochastic: column j holds the probabilities of moving from state j
	let P = $derived([
		[1 - a, b],
		[a, 1 - b]
	]);
	const start = [1, 0];
	let pk = $derived(mulVec(mpow(P, k), start));
	let pi = $derived([b / (a + b), a / (a + b)]);
	let lam2 = $derived(1 - a - b);
	// probability of being "sunny" after n steps: pi0 + (1 - pi0) * lam2^n
	const sunny = (n: number) => pi[0] + (start[0] - pi[0]) * lam2 ** Math.round(n);
</script>

<p>
	A <strong class="text-slate-50">Markov chain</strong> describes a system that hops between states at random, where the next state depends only on the current one. Its transition matrix is nonnegative, so the Perron–Frobenius story applies.
</p>

<Callout kind="definition" title="Transition matrix">
	<p>
		Entry <Tex tex={'P_{ij}'} /> is the probability of going from state <Tex tex="j" /> to state <Tex tex="i" />. Each <em>column</em> is a probability distribution (nonnegative, sums to 1), so <Tex tex="P" /> is <em>column-stochastic</em>. If <Tex tex={'\\mathbf p_k'} /> is the distribution after <Tex tex="k" /> steps then
		<Tex display tex={'\\mathbf p_{k+1} = P\\mathbf p_k,\\qquad \\mathbf p_k = P^k\\mathbf p_0.'} />
	</p>
</Callout>

<h2>A two-state weather model</h2>
<p>
	State 1 is sunny, state 2 rainy. Each day a sunny day turns rainy with probability <Tex tex="a" />, and a rainy day turns sunny with probability <Tex tex="b" />. Start with certainly sunny and watch the probability settle.
</p>

<Figure caption="Bars: the distribution after k days. Curve: probability of sun over time, approaching the steady state (dashed)." max={680}>
	<Bars values={pk} labels={['sunny', 'rainy']} max={1} height={130} color="#fbd000" label="Distribution after k steps" />
	<Plane2D xmin={-1} xmax={21} ymin={-0.1} ymax={1.1} ticks={false}>
		<Line a={[-1, pi[0]]} b={[21, pi[0]]} color={C.iHat} dashed width={1.8} />
		<Curve fn={sunny} from={0} to={20} color={C.yellow} width={3} samples={21} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={0.05} max={0.95} step={0.05} />
		<Slider label="b" bind:value={b} min={0.05} max={0.95} step={0.05} />
		<Slider label="days k" bind:value={k} min={0} max={20} step={1} display={String(k)} />
		<span class="w-full text-center font-mono text-sm text-slate-200">
			steady state ({pi[0].toFixed(3)}, {pi[1].toFixed(3)}) · second eigenvalue 1 − a − b = {lam2.toFixed(2)}
		</span>
	{/snippet}
</Figure>

<Tex display tex={'P = ' + texMatrix(P) + ',\\qquad \\boldsymbol\\pi = \\frac{1}{a+b}\\begin{pmatrix} b \\\\ a \\end{pmatrix}'} />

<h2>Why it settles</h2>
<Callout kind="theorem" title="Steady state and mixing">
	<p>
		A column-stochastic matrix always has eigenvalue 1 (the all-ones row vector is a left eigenvector), and no eigenvalue larger in magnitude. If the chain is irreducible and aperiodic, the eigenvalue 1 is simple, its eigenvector <Tex tex={'\\boldsymbol\\pi'} /> (scaled to sum to 1) is the <strong class="text-slate-50">unique steady state</strong>, and <Tex tex={'P^k\\mathbf p_0 \\to \\boldsymbol\\pi'} /> from <em>any</em> start.
		The error shrinks like <Tex tex={'|\\lambda_2|^k'} />, so the <em>spectral gap</em> <Tex tex={'1 - |\\lambda_2|'} /> sets the mixing time.
	</p>
</Callout>
<p>
	Try <Tex tex="a = b = 0.95" />: <Tex tex={'\\lambda_2 = -0.9'} /> and the distribution flips back and forth for a long time. With <Tex tex={'a = b = 0.5'} /> we get <Tex tex={'\\lambda_2 = 0'} />: the chain forgets its start after a single step.
</p>

<Recap
	points={[
		'$P$ is column-stochastic; $\\mathbf p_k=P^k\\mathbf p_0$ gives the distribution after $k$ steps.',
		'Eigenvalue 1 always exists; its eigenvector $\\boldsymbol\\pi$ is the steady state when the chain is irreducible and aperiodic.',
		'Convergence is geometric at rate $|\\lambda_2|$: a larger spectral gap means faster mixing.'
	]}
/>

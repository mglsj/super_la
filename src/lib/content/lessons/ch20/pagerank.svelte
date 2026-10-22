<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Arrow from '#lib/viz/Arrow.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import Bars from '#lib/viz/Bars.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const names = ['A', 'B', 'C', 'D'];
	const pos = [
		[-2.5, 1.5],
		[2.5, 1.5],
		[2.5, -1.5],
		[-2.5, -1.5]
	];
	// links[i] = pages that page i links to
	const links: number[][] = [[1, 2], [2], [0], [0, 2]];

	let damping = $state(0.85);

	let rank = $derived.by(() => {
		const n = 4;
		let r = new Array(n).fill(1 / n);
		for (let it = 0; it < 200; it++) {
			const next = new Array(n).fill((1 - damping) / n);
			for (let j = 0; j < n; j++) for (const i of links[j]) next[i] += (damping * r[j]) / links[j].length;
			r = next;
		}
		return r;
	});
	const shorten = (from: number[], to: number[], by: number) => {
		const dx = to[0] - from[0];
		const dy = to[1] - from[1];
		const L = Math.hypot(dx, dy);
		return [
			[from[0] + (dx / L) * by, from[1] + (dy / L) * by],
			[to[0] - (dx / L) * by, to[1] - (dy / L) * by]
		];
	};
	let edges = $derived(links.flatMap((outs, j) => outs.map((i) => ({ from: j, to: i, seg: shorten(pos[j], pos[i], 0.45) }))));
</script>

<p>
	How should a search engine decide which web pages matter? Larry Page and Sergey Brin's answer: <em>a page is important if important pages link to it</em>. That sounds circular, but it is an eigenvector equation.
</p>

<h2>The random surfer</h2>
<p>
	Imagine a surfer who follows a random link from the current page. Their long-run fraction of time on each page is the steady state of the Markov chain whose transition matrix <Tex tex="S" /> splits each page's vote equally among its outgoing links. Pages with many links from popular pages accumulate probability.
</p>
<p>
	Two problems: pages with no outgoing links trap the surfer, and the web is not strongly connected. The fix is <strong class="text-slate-50">damping</strong>: with probability <Tex tex={'1-d'} /> the surfer jumps to a uniformly random page.
</p>
<Callout kind="definition" title="The Google matrix">
	<Tex display tex={'G = d\\,S + \\frac{1-d}{n}\\,\\mathbf 1\\mathbf 1^{\\mathsf T}.'} />
	<p>
		All entries of <Tex tex="G" /> are positive, so Perron's theorem applies: <Tex tex={'G\\mathbf r = \\mathbf r'} /> has a unique positive solution with <Tex tex={'\\sum r_i = 1'} />, the PageRank vector. It is found by the <strong class="text-slate-50">power method</strong>, which needs only sparse matrix–vector products. The second eigenvalue of <Tex tex="G" /> is at most <Tex tex="d" /> in magnitude, so the method converges like <Tex tex={'d^k'} />.
	</p>
</Callout>

<h2>Rank a tiny web</h2>
<Figure caption="Four pages, arrows are links. Node size and the bars show PageRank. Page C collects votes from three pages; at d = 0 every page is equal." max={680}>
	<Plane2D xmin={-4.5} xmax={4.5} ymin={-3} ymax={3} grid={false} ticks={false}>
		{#each edges as e, i (i)}
			<Arrow from={e.seg[0]} to={e.seg[1]} color={C.axis} width={2} opacity={0.8} />
		{/each}
		{#each pos as p, i (i)}
			<Dot at={p} color={C.yellow} r={8 + 60 * rank[i]} label={names[i] + ' ' + rank[i].toFixed(2)} dx={-8} dy={-26} />
		{/each}
	</Plane2D>
	<Bars values={rank} labels={names} max={0.6} height={130} color="#fbd000" label="PageRank of each page" />
	{#snippet controls()}
		<Slider label="damping d" bind:value={damping} min={0} max={0.99} step={0.01} display={damping.toFixed(2)} />
		<span class="w-full text-center font-mono text-sm text-slate-200">sum of ranks = {rank.reduce((a, b) => a + b, 0).toFixed(3)}</span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		The smaller <Tex tex="d" /> is, the more the ranking is flattened towards uniform; the larger, the more the link structure dominates (but the slower the power method converges). The value 0.85 became the classic compromise.
	</p>
</Callout>

<h2>Nonnegative matrix factorisation (a pointer)</h2>
<p>
	A relative of low-rank approximation for data that is naturally nonnegative (word counts, pixel intensities): write <Tex tex={'V \\approx WH'} /> with <Tex tex="W" /> and <Tex tex="H" /> nonnegative. Unlike the SVD the factors are purely additive "parts" (topics, facial features), at the cost of a harder, nonconvex optimisation.
</p>

<Recap
	points={[
		'PageRank is the steady state of a random surfer: the Perron vector of the Google matrix $G=dS+\\frac{1-d}{n}\\mathbf 1\\mathbf 1^{\\mathsf T}$.',
		'Damping makes $G$ positive, guaranteeing a unique solution and convergence like $d^k$ for the power method.',
		'Nonnegative factorisation $V\\approx WH$ keeps parts-based structure that the SVD loses.'
	]}
/>

<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { classify, rref } from '#lib/math/gauss.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	// line 1 fixed: x + y = 4 ; line 2: a x + b y = c
	let a = $state(1);
	let b = $state(-1);
	let c = $state(2);

	let aug = $derived([
		[1, 1, 4],
		[a, b, c]
	]);
	let kind = $derived(classify(aug));
	let sol = $derived(kind === 'unique' ? [rref(aug).result[0][2], rref(aug).result[1][2]] : null);

	const lineOf = (p: number, q: number, r: number) => {
		const n2 = p * p + q * q;
		return n2 < 1e-9 ? null : { point: [(r * p) / n2, (r * q) / n2], dir: [-q, p] };
	};
	let l1 = $derived(lineOf(1, 1, 4));
	let l2 = $derived(lineOf(a, b, c));

	const verdict = {
		unique: 'Exactly one solution: the lines cross at a single point.',
		none: 'No solution: the lines are parallel and never meet.',
		infinite: 'Infinitely many solutions: both equations describe the same line.'
	};
</script>

<p>
	A <strong class="text-slate-50">linear system</strong> is several equations that must all hold at the same time. The first
	surprise of this chapter is that the question "what <Tex tex="(x, y)" /> satisfies both equations?" is a geometry question
	in disguise.
</p>

<h2>Each equation is a line</h2>
<p>
	From chapter 1 you know that <Tex tex={'ax + by = c'} /> is a line in the plane. A solution of the system is a point that lies on
	<em>every</em> line at once. So solving two equations means asking where two lines meet.
</p>

<Figure caption="The blue line x + y = 4 is fixed. Change the red line's coefficients and watch which of the three possible situations you land in.">
	<Plane2D xmin={-2} xmax={8} ymin={-3} ymax={5}>
		{#if l1}<Line point={l1.point} dir={l1.dir} color={C.blue} />{/if}
		{#if l2}<Line point={l2.point} dir={l2.dir} color={C.jHat} />{/if}
		{#if sol}<Dot at={sol} color={C.yellow} r={7} label="solution" />{/if}
	</Plane2D>
	{#snippet controls()}
		<Slider label="a" bind:value={a} min={-3} max={3} step={0.5} />
		<Slider label="b" bind:value={b} min={-3} max={3} step={0.5} />
		<Slider label="c" bind:value={c} min={-6} max={8} step={0.5} />
		<span class="w-full text-center text-sm {kind === 'unique' ? 'text-emerald-300' : kind === 'none' ? 'text-rose-300' : 'text-amber-300'}">
			{verdict[kind]}
		</span>
	{/snippet}
</Figure>

<p>
	Try to reach each case. Set <Tex tex="a = 1,\ b = 1" /> and change <Tex tex="c" />: the lines are parallel, and they only coincide
	when <Tex tex="c = 4" />.
</p>

<h2>Three possible outcomes</h2>
<Callout kind="theorem" title="Every linear system is exactly one of these">
	<p>
		It has <strong class="text-slate-50">no solution</strong>, <strong class="text-slate-50">exactly one</strong> solution, or
		<strong class="text-slate-50">infinitely many</strong>. Never two, never seven. Lines cannot cross twice.
	</p>
</Callout>

<h2>Writing the system as a matrix</h2>
<p>
	To avoid copying <Tex tex="x" /> and <Tex tex="y" /> over and over, we keep only the numbers. The system
	<Tex display tex={'\\begin{aligned} x + y &= 4 \\\\ x - y &= 2 \\end{aligned}'} />
	becomes the <em>augmented matrix</em>, with the right-hand sides after the bar:
	<Tex display tex={'\\left[\\begin{array}{cc|c} 1 & 1 & 4 \\\\ 1 & -1 & 2 \\end{array}\\right]'} />
	Each <em>row</em> is one equation, each <em>column</em> belongs to one unknown. The next lesson shows how to solve it by manipulating rows.
</p>

<Callout kind="intuition">
	<p>
		Another view that will matter later: the system asks whether the right-hand side <Tex tex={'(4, 2)'} /> can be built as a
		combination <Tex tex={'x\\cdot(1,1) + y\\cdot(1,-1)'} /> of the columns. That is exactly the span question from chapter 1.
	</p>
</Callout>

<Recap
	points={[
		'Each equation in two unknowns is a **line**; a solution is a point on all the lines.',
		'A system has **no**, **one** or **infinitely many** solutions.',
		'The augmented matrix $[A \\mid b]$ stores just the numbers: rows are equations, columns are unknowns.'
	]}
/>

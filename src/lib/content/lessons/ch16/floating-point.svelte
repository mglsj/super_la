<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	let p = $state(3); // mantissa bits in the toy format

	// positive numbers (1 + m / 2^p) * 2^e for e = -3..2, up to 8
	let values = $derived.by(() => {
		const out: { x: number; e: number }[] = [];
		for (let e = -3; e <= 2; e++)
			for (let m = 0; m < 2 ** p; m++) out.push({ x: (1 + m / 2 ** p) * 2 ** e, e });
		return out;
	});
	let spacing = $derived((e: number) => 2 ** (e - p));

	const facts = [
		{ expr: '0.1 + 0.2', value: String(0.1 + 0.2) },
		{ expr: '0.1 + 0.2 === 0.3', value: String(0.1 + 0.2 === 0.3) },
		{ expr: 'machine epsilon (spacing just above 1)', value: String(Number.EPSILON) },
		{ expr: '1 + 1e-16 === 1', value: String(1 + 1e-16 === 1) },
		{ expr: '(1e16 + 1) - 1e16', value: String(1e16 + 1 - 1e16) },
		{ expr: '2**53 + 1 === 2**53', value: String(2 ** 53 + 1 === 2 ** 53) }
	];
</script>

<p>
	Everything so far assumed real numbers. A computer has only finitely many bits, so it stores a finite subset of the reals. Understanding that subset is the first step to understanding why numerical linear algebra is a separate subject.
</p>

<h2>Numbers as (1 + fraction) × 2^e</h2>
<Callout kind="definition" title="Definition: floating point number system">
	<p>
		A <em>floating point number</em> has the form <Tex tex={'\\pm(1 + m/2^p)\\times 2^e'} />: a sign, a mantissa with <Tex tex="p" /> bits, and an integer exponent <Tex tex="e" />. Standard double precision uses <Tex tex={'p = 52'} />. The relative gap between neighbours is about
		<Tex tex={'2^{-p}'} />, called the <em>machine epsilon</em> <Tex tex={'\\varepsilon'} /> (about <Tex tex={'2.2\\times10^{-16}'} /> for doubles).
	</p>
</Callout>

<p>
	Here is a toy version with just <Tex tex="p" /> mantissa bits. Every dot is a representable number. Notice that the numbers get <em>sparser</em> as they get bigger: the spacing doubles with each power of two, but the <em>relative</em> spacing stays the same.
</p>

<Figure caption="All positive numbers of the toy format between 1/8 and 8. Slide p up to see the grid fill in." max={680}>
	<Plane2D xmin={0} xmax={8.2} ymin={-0.5} ymax={0.5} grid={false} ticks>
		{#each values as v, i (i)}
			<Dot at={[v.x, 0]} color={v.e % 2 === 0 ? C.blue : C.orange} r={4} />
		{/each}
	</Plane2D>
	{#snippet controls()}
		<Slider label="p bits" bind:value={p} min={1} max={5} step={1} display={String(p)} />
		<span class="w-full text-center font-mono text-sm text-slate-200">
			{values.length} numbers · spacing in [1,2): {spacing(0)} · in [4,8): {spacing(2)} · relative gap {(2 ** -p).toFixed(4)}
		</span>
	{/snippet}
</Figure>

<h2>Consequences, live</h2>
<p>These were just computed by your browser, using real double-precision arithmetic:</p>
<div class="overflow-x-auto">
	<table class="mx-auto w-full max-w-xl text-left font-mono text-xs sm:text-sm">
		<tbody>
			{#each facts as f (f.expr)}
				<tr class="border-b border-slate-700">
					<td class="py-2 pr-3 text-slate-300">{f.expr}</td>
					<td class="text-amber-300">{f.value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<Callout kind="theorem" title="The standard model of rounding">
	<p>
		Every basic operation is computed as the exact result rounded to the nearest floating point number. So <Tex tex={'\\mathrm{fl}(x \\circ y) = (x \\circ y)(1 + \\delta)'} /> with <Tex tex={'|\\delta| \\le \\varepsilon/2'} /> for <Tex tex={'\\circ \\in \\{+,-,\\times,/\\}'} />. Each operation introduces a tiny <em>relative</em> error, and the whole subject is about how those tiny errors combine.
	</p>
</Callout>

<Callout kind="warning">
	<p>
		Never test floating point numbers for exact equality. Compare with a tolerance. Also, arithmetic is not associative: <Tex tex={'(a + b) + c'} /> and <Tex tex={'a + (b + c)'} /> can differ in the last digits, which is why parallel sums can give slightly different answers from run to run.
	</p>
</Callout>

<Recap
	points={[
		'Floats are $\\pm(1+m/2^p)2^e$: finitely many, denser near zero, with constant **relative** spacing $\\varepsilon\\approx2.2\\times10^{-16}$ for doubles.',
		'Each operation is exact-then-rounded: $\\mathrm{fl}(x\\circ y)=(x\\circ y)(1+\\delta)$ with $|\\delta|\\le\\varepsilon/2$.',
		'Equality tests and associativity do not behave as in real arithmetic.'
	]}
/>

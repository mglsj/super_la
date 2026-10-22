<script lang="ts">
	import Bars from '#lib/viz/Bars.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	// f(x) = (1 - cos x) / x^2  ->  1/2 as x -> 0
	const naive = (x: number) => (1 - Math.cos(x)) / (x * x);
	const stable = (x: number) => {
		const s = Math.sin(x / 2);
		return (2 * s * s) / (x * x);
	};
	const digits = (approx: number, exact: number) => {
		const rel = Math.abs(approx - exact) / Math.abs(exact);
		return rel === 0 ? 16 : Math.max(0, Math.min(16, -Math.log10(rel)));
	};

	let k = $state(8);
	let x = $derived(10 ** -k);
	let rows = $derived(Array.from({ length: 12 }, (_, i) => i + 1));
	let correct = $derived(rows.map((j) => digits(naive(10 ** -j), stable(10 ** -j))));
</script>

<p>
	Individual operations are accurate to about 16 digits. Yet sometimes a result of a handful of operations has <em>no</em> correct digits. The usual culprit is <strong class="text-slate-50">catastrophic cancellation</strong>: subtracting two numbers that are nearly equal.
</p>

<h2>Why subtraction is dangerous</h2>
<p>
	Suppose <Tex tex={'a = 1.23456789'} /> and <Tex tex={'b = 1.23456780'} /> were each stored with 9 correct digits. Their difference is <Tex tex={'9\\times10^{-8}'} />, but the leading 7 digits cancelled, so at best <em>one</em> digit of the result means anything (each input is uncertain by about <Tex tex={'10^{-8}'} />, which is more than 10% of the difference). The rounding errors in <Tex tex="a" /> and <Tex tex="b" /> were tiny compared with them,
	but huge compared with their difference.
</p>

<Callout kind="theorem" title="Cancellation in one line">
	<p>
		Subtraction itself is exact for nearby floats. The damage was done earlier: the inputs already carried relative errors of size <Tex tex={'\\varepsilon'} />, and subtracting makes those errors large <em>relative to the answer</em>: roughly <Tex tex={'\\varepsilon\\,\\dfrac{|a| + |b|}{|a - b|}'} />.
	</p>
</Callout>

<h2>A classic: (1 − cos x) / x²</h2>
<p>
	As <Tex tex="x \to 0" />, <Tex tex={'(1 - \\cos x)/x^2 \\to 1/2'} />. The direct formula subtracts <Tex tex={'\\cos x \\approx 1 - x^2/2'} /> from 1, losing about <Tex tex={'2\\log_{10}(1/x)'} /> digits. The identity <Tex tex={'1 - \\cos x = 2\\sin^2(x/2)'} /> avoids the subtraction entirely.
</p>

<Figure caption="Digits of accuracy of the naive formula for x = 10⁻ʲ. At j = 8 there are none left. The rewritten formula stays accurate." max={680}>
	<Bars values={correct} labels={rows.map((j) => '10⁻' + j)} max={16} height={170} color="#fc6255" format={(v) => v.toFixed(0)} label="Correct digits of the naive formula" />
	{#snippet controls()}
		<Slider label="x = 10⁻ᵏ, k" bind:value={k} min={1} max={12} step={1} display={String(k)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span>naive: <span class="text-rose-300">{naive(x).toPrecision(8)}</span></span>
			<span>rewritten: <span class="text-emerald-300">{stable(x).toPrecision(8)}</span></span>
			<span class="font-sans text-slate-400 sm:col-span-2">The true value is 0.5 minus about x²/24.</span>
		</div>
	{/snippet}
</Figure>

<h2>The cure: algebra before arithmetic</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li>Rewrite the formula so that nearly equal numbers are never subtracted: <Tex tex={'\\sqrt{x+1} - \\sqrt{x} = \\dfrac{1}{\\sqrt{x+1} + \\sqrt{x}}'} />.</li>
	<li>In the quadratic formula, compute the larger root first (no cancellation) and get the other from <Tex tex={'x_1x_2 = c/a'} />.</li>
	<li>In linear algebra, prefer orthogonal transformations (QR, SVD) over forming <Tex tex={'A^{\\mathsf T}A'} />, which squares the condition number and cancels badly.</li>
</ul>

<Recap
	points={[
		'**Cancellation**: subtracting nearly equal numbers magnifies their earlier rounding errors relative to the answer.',
		'The fix is usually algebraic: rewrite so the subtraction disappears.',
		'Forming $A^{\\mathsf T}A$ is a classic hidden cancellation; use QR or SVD instead.'
	]}
/>

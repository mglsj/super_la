<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Curve from '#lib/viz/Curve.svelte';
	import Line from '#lib/viz/Line.svelte';
	import { gaussian, mulberry32 } from '#lib/math/rng.js';
	import { C } from '#lib/viz/theme.js';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';

	const width = 60;
	const depth = 24;
	let sigma = $state(1);

	// log10 of the signal norm after each layer, for linear and ReLU networks
	function run(relu: boolean): number[] {
		const g = gaussian(mulberry32(31));
		let x = Array.from({ length: width }, () => g());
		const norm0 = Math.hypot(...x);
		x = x.map((v) => v / norm0);
		const out = [0];
		for (let l = 0; l < depth; l++) {
			const next = new Array(width).fill(0);
			for (let i = 0; i < width; i++) {
				let s = 0;
				for (let j = 0; j < width; j++) s += ((sigma * g()) / Math.sqrt(width)) * x[j];
				next[i] = relu ? Math.max(0, s) : s;
			}
			x = next;
			out.push(Math.log10(Math.max(Math.hypot(...x), 1e-12)));
		}
		return out;
	}
	let lin = $derived(run(false));
	let rel = $derived(run(true));
	const at = (a: number[]) => (t: number) => a[Math.max(0, Math.min(a.length - 1, Math.round(t)))];
	let gainLin = $derived(sigma);
	let gainRelu = $derived(sigma / Math.SQRT2);
</script>

<p>
	A neural network is a product of many weight matrices. Before training, those matrices are random, and random matrix theory tells you whether the signal will survive the trip through the layers.
</p>

<h2>Signals through a random deep network</h2>
<p>
	Take weights with independent entries of variance <Tex tex={'\\sigma^2/n'} /> (so each row has squared length about <Tex tex={'\\sigma^2'} />). A random <Tex tex={'n\\times n'} /> matrix of this kind multiplies the length of a typical vector by about <Tex tex={'\\sigma'} /> (the norm computation from the random projection lesson). After <Tex tex="L" /> layers, the signal has length about <Tex tex={'\\sigma^L'} />:
</p>
<Callout kind="theorem" title="Exponential growth or decay">
	<p>
		If <Tex tex={'\\sigma > 1'} /> the signal explodes; if <Tex tex={'\\sigma < 1'} /> it vanishes, <em>exponentially fast in depth</em>. Gradients, which flow backward through the same matrices (transposed), explode or vanish in the same way. The only stable choice is <Tex tex={'\\sigma = 1'} />, and "stable" is a knife edge.
	</p>
</Callout>

<Figure caption="Orange: a ReLU network. Teal: a purely linear one. The vertical axis is log₁₀ of the signal length after each layer (0 = unchanged). The dashed line marks no change." max={700}>
	<Plane2D xmin={-1} xmax={25} ymin={-6} ymax={6} ticks={false}>
		<Line a={[0, 0]} b={[24, 0]} color={C.axis} dashed width={1.2} opacity={0.7} />
		<Curve fn={at(lin)} from={0} to={24} samples={48} color={C.teal} width={3} />
		<Curve fn={at(rel)} from={0} to={24} samples={48} color={C.orange} width={3} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="weight scale σ" bind:value={sigma} min={0.5} max={2} step={0.05} display={sigma.toFixed(2)} />
		<div class="grid w-full gap-x-6 gap-y-1 font-mono text-sm sm:grid-cols-2">
			<span class="text-teal-300">linear: gain per layer ≈ {gainLin.toFixed(2)}, after {depth} layers 10^{lin[depth].toFixed(1)}</span>
			<span class="text-orange-300">ReLU: gain per layer ≈ {gainRelu.toFixed(2)}, after {depth} layers 10^{rel[depth].toFixed(1)}</span>
		</div>
	{/snippet}
</Figure>

<h2>ReLU changes the answer</h2>
<p>
	A ReLU zeroes about half of the entries, so it removes about half of the squared length: the gain per layer is <Tex tex={'\\sigma/\\sqrt2'} />, not <Tex tex={'\\sigma'} />. To keep the signal steady you need <Tex tex={'\\sigma = \\sqrt2'} />, which is exactly <strong class="text-slate-50">He initialisation</strong>: weight variance <Tex tex={'2/n_{\\text{in}}'} />. For symmetric activations such as tanh near zero, <Tex tex={'\\sigma = 1'} /> (Xavier/Glorot). Slide <Tex tex="\sigma" /> to <Tex tex={'\\sqrt2 \\approx 1.41'} /> and the orange curve flattens.
</p>

<Callout kind="intuition">
	<p>
		Beyond the average length, the <em>spread</em> of singular values of the product of many random matrices matters too: products become very ill-conditioned (chapter 16) as depth grows, with a few huge and many tiny singular values. Orthogonal initialisation, which has all singular values exactly 1, avoids this and keeps the layer-to-layer map well-conditioned at any depth. Residual connections and normalisation layers are other ways to stay near the knife edge.
	</p>
</Callout>

<Recap
	points={[
		'A random layer with weight variance $\\sigma^2/n$ scales a typical signal by $\\sigma$; depth $L$ gives $\\sigma^L$: explode or vanish.',
		'ReLU halves the squared length, so stability needs $\\sigma=\\sqrt2$ (**He initialisation**); tanh-like activations use $\\sigma=1$.',
		'Orthogonal initialisation keeps all singular values at 1, avoiding the ill-conditioning of long random products.'
	]}
/>

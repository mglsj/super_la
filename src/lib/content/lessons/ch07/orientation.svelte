<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';

	// î stays at (1,0); ĵ is swept around the circle by phi
	let phi = $state(90);
	let rad = $derived((phi * Math.PI) / 180);
	let matrix = $derived([
		[1, Math.cos(rad)],
		[0, Math.sin(rad)]
	]);
	let d = $derived(Math.sin(rad));
	let mode = $derived(Math.abs(d) < 0.03 ? 'flat' : d > 0 ? 'ccw' : 'flipped');
</script>

<p>
	So far the determinant has been "how much bigger". It can also be <em>negative</em>, and the sign has a perfectly good meaning: it records whether space got flipped over like a pancake.
</p>

<h2>Sweep ĵ around</h2>
<p>
	Keep î fixed at <Tex tex="(1,0)" /> and swing ĵ from above the x-axis, through it, to below. Normally î comes first and ĵ lies counter-clockwise from it. When ĵ passes through the line of î the square flattens (determinant 0), and after that the
	orientation is reversed: the square's picture is mirrored.
</p>

<Figure caption="Angle of ĵ's image. Positive determinant: same handedness as before. Negative: a mirror image. Zero: flat." max={620}>
	<Plane2D xmin={-4} xmax={4} ymin={-3} ymax={3} grid={false}>
		<TransformGrid {matrix} extent={8} />
	</Plane2D>
	{#snippet controls()}
		<Slider label="angle" bind:value={phi} min={-170} max={170} step={5} display="{phi}°" />
		<span class="font-mono text-sm text-slate-100">det = sin({phi}°) = <span class="text-amber-300">{d.toFixed(2)}</span></span>
		<span class="w-full text-center text-sm {mode === 'flipped' ? 'text-rose-300' : mode === 'flat' ? 'text-amber-300' : 'text-emerald-300'}">
			{mode === 'ccw' ? 'Orientation preserved (ĵ is counter-clockwise from î).' : mode === 'flipped' ? 'Orientation reversed: space has been flipped.' : 'Flattened onto a line.'}
		</span>
	{/snippet}
</Figure>

<Callout kind="theorem" title="Sign and size">
	<p>
		<Tex tex={'|\\det A|'} /> is the scaling factor of area or volume. The <strong class="text-slate-50">sign</strong> of <Tex tex={'\\det A'} /> says whether <Tex tex="A" /> preserves orientation (<Tex tex={'+'} />) or reverses it (<Tex tex={'-'} />),
		like a reflection. In 3D, positive means the right-hand rule still holds for the image of <Tex tex={'\\hat\\imath,\\hat\\jmath,\\hat k'} />.
	</p>
</Callout>

<h2>Examples to remember</h2>
<ul class="list-disc space-y-1.5 pl-6">
	<li>Rotation: <Tex tex={'\\det = +1'} /> (no stretching, no flipping).</li>
	<li>Reflection across a line: <Tex tex={'\\det = -1'} />.</li>
	<li>Shear <Tex tex={'\\begin{bmatrix}1&k\\\\0&1\\end{bmatrix}'} />: <Tex tex={'\\det = +1'} />. It slides the square into a slanted parallelogram of the same area.</li>
	<li>Scaling by 2 in both directions: <Tex tex={'\\det = 4'} /> (area times 4).</li>
</ul>

<Recap
	points={[
		'The **sign** of $\\det A$ tells whether orientation is preserved or flipped.',
		'Rotations have $\\det=1$, reflections $\\det=-1$, shears $\\det=1$.',
		'$\\det=0$ is the boundary between positive and negative: the moment space flattens.'
	]}
/>

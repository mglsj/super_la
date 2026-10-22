<script lang="ts">
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import MatrixInput from '#lib/viz/MatrixInput.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, makePlane, orientPlane, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import Slider from '#lib/components/lesson/Slider.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import { animateTo, matrixTween } from '#lib/viz/tween.js';
	import { det, rotation, type Mat } from '#lib/math/mat.js';
	import { eigen2, trace } from '#lib/math/eigen.js';
	import { C } from '#lib/viz/theme.js';
	import { Button } from '#lib/components/ui/button/index.js';

	let m = $state<Mat>([
		[2, 1],
		[0, 1.5]
	]);
	const shown = matrixTween([
		[2, 1],
		[0, 1.5]
	]);
	$effect(() => {
		animateTo(shown, m.map((r) => [...r]), 500);
	});

	let d = $derived(det(m));
	let ev = $derived(eigen2(m));

	const presets: { name: string; m: Mat }[] = [
		{ name: 'Identity', m: [[1, 0], [0, 1]] },
		{ name: 'Rotate 45°', m: rotation(Math.PI / 4).map((r) => r.map((x) => Math.round(x * 100) / 100)) },
		{ name: 'Shear', m: [[1, 1], [0, 1]] },
		{ name: 'Stretch', m: [[2, 0], [0, 0.5]] },
		{ name: 'Flip', m: [[-1, 0], [0, 1]] },
		{ name: 'Squash (singular)', m: [[1, 1], [1, 1]] }
	];

	let n = $state([1, 1, 1]);
	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const plane = makePlane(THREE, n, 6, HEX.yellow);
		const arrow = makeArrow(THREE, [0, 0, 0], n, HEX.purple);
		scene.add(plane, arrow);
		return {
			update() {
				orientPlane(THREE, plane, n);
				setArrow(THREE, arrow, [0, 0, 0], n);
			}
		};
	}
</script>

<svelte:head><title>Playground · Linear Algebra Lab</title></svelte:head>

<div class="mx-auto max-w-3xl space-y-10">
	<h1 class="text-3xl font-bold text-slate-50">Playground</h1>

	<section class="space-y-3">
		<h2 class="text-xl font-semibold text-slate-50">Transformation lab</h2>
		<p class="text-slate-300">Edit the matrix and watch the grid, the basis arrows and the unit square follow.</p>
		<Plane2D xmin={-6} xmax={6} ymin={-4.5} ymax={4.5} grid={false}>
			<TransformGrid matrix={shown.current} extent={14}>
				{#snippet extra()}
					{#each ev.vectors as v, i (i)}
						<Line point={[0, 0]} dir={v} color={C.purple} width={2} dashed opacity={0.9} />
					{/each}
				{/snippet}
			</TransformGrid>
		</Plane2D>
		<div class="flex flex-wrap items-center gap-6">
			<MatrixInput bind:value={m} />
			<div class="space-y-1 font-mono text-sm text-slate-300">
				<div>det = <span class="text-amber-300">{d.toFixed(2)}</span></div>
				<div>trace = {trace(m).toFixed(2)}</div>
				<div>
					{#if ev.complex}eigenvalues: {ev.complex[0].toFixed(2)} ± {ev.complex[1].toFixed(2)}i (no real eigen-lines)
					{:else}eigenvalues: {ev.values.map((x) => x.toFixed(2)).join(', ')} (dashed purple lines){/if}
				</div>
			</div>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each presets as p (p.name)}
				<Button variant="secondary" size="sm" onclick={() => (m = p.m.map((r) => [...r]))}>{p.name}</Button>
			{/each}
		</div>
	</section>

	<section class="space-y-3">
		<h2 class="text-xl font-semibold text-slate-50">3D plane from a normal vector</h2>
		<p class="text-slate-300">
			Set the normal <Tex tex="\mathbf n" />; the plane <Tex tex="\mathbf n\cdot\mathbf x = 0" /> follows. Drag the view to orbit.
		</p>
		<Scene3D {build} label="A plane and its normal vector" />
		<div class="flex flex-wrap gap-5">
			<Slider label="n₁" bind:value={n[0]} min={-3} max={3} step={0.1} />
			<Slider label="n₂" bind:value={n[1]} min={-3} max={3} step={0.1} />
			<Slider label="n₃" bind:value={n[2]} min={-3} max={3} step={0.1} />
		</div>
	</section>
</div>

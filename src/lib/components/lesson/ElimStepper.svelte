<script lang="ts">
	import Tex from './Tex.svelte';
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import Line from '#lib/viz/Line.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import { rref } from '#lib/math/gauss.js';
	import { texMatrix } from '#lib/math/tex.js';
	import type { Mat } from '#lib/math/mat.js';
	import { C } from '#lib/viz/theme.js';

	interface Props {
		/** augmented matrix [A | b] */
		aug: Mat;
		/** draw each row as a line (needs 2 unknowns) */
		geometry?: boolean;
	}

	let { aug, geometry = false }: Props = $props();

	let solved = $derived(rref(aug));
	let steps = $derived(solved.steps);
	let i = $state(0);
	let step = $derived(steps[Math.min(i, steps.length - 1)]);
	let done = $derived(i >= steps.length - 1);

	const colours = [C.blue, C.jHat, C.teal];
	const rowLine = (r: number[]) => {
		const [a, b, c] = r;
		const n2 = a * a + b * b;
		if (n2 < 1e-9) return null;
		return { point: [(c * a) / n2, (c * b) / n2], dir: [-b, a] };
	};

	let unique = $derived(
		geometry && solved.pivots.length === 2 && !solved.pivots.includes(2)
			? [solved.result[0][2], solved.result[1][2]]
			: null
	);
</script>

<div class="space-y-3">
	{#if geometry}
		<Plane2D xmin={-2} xmax={8} ymin={-3} ymax={5}>
			{#each step.matrix as row, r (r)}
				{@const l = rowLine(row)}
				{#if l}<Line point={l.point} dir={l.dir} color={colours[r % 3]} width={3} />{/if}
			{/each}
			{#if unique}<Dot at={unique} color={C.yellow} r={7} label="solution" />{/if}
		</Plane2D>
	{/if}

	<Tex display tex={texMatrix(step.matrix, 1)} />

	<p class="text-center text-sm text-slate-300" aria-live="polite">
		<span class="font-pixel mr-2 text-[10px] text-[#fbd000]">STEP {i} / {steps.length - 1}</span>
		{step.description}{#if done}. Reduced form reached.{/if}
	</p>

	<div class="flex flex-wrap justify-center gap-2">
		<button class="mbtn mbtn-blue" disabled={i === 0} onclick={() => i--}>◀ Back</button>
		<button class="mbtn mbtn-green" disabled={done} onclick={() => i++}>Next row op ▶</button>
		<button class="mbtn mbtn-yellow" disabled={i === 0} onclick={() => (i = 0)}>Reset</button>
	</div>
</div>

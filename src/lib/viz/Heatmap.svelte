<script lang="ts">
	import type { Mat } from '#lib/math/mat.js';

	interface Props {
		matrix: Mat;
		/** colour scale half-range; default: largest |entry| */
		range?: number;
		cell?: number;
		/** print values inside cells */
		numbers?: boolean;
		label?: string;
	}

	let { matrix, range, cell = 28, numbers = false, label = 'Matrix as a grid of colours' }: Props = $props();

	let m = $derived(matrix.length);
	let n = $derived(matrix[0]?.length ?? 0);
	let scale = $derived(range ?? Math.max(1e-9, ...matrix.flat().map((x) => Math.abs(x))));

	/** blue for negative, red for positive, dark for zero */
	function colour(x: number): string {
		const t = Math.max(-1, Math.min(1, x / scale));
		const a = Math.abs(t);
		const base = [15, 23, 42];
		const hi = t >= 0 ? [252, 98, 85] : [88, 196, 221];
		return `rgb(${base.map((b, i) => Math.round(b + (hi[i] - b) * a)).join(',')})`;
	}
</script>

<svg viewBox="0 0 {n * cell} {m * cell}" role="img" aria-label={label} class="mx-auto block w-full" style="max-width: {n * cell * 1.6}px" shape-rendering="crispEdges">
	{#each matrix as row, i (i)}
		{#each row as x, j (j)}
			<rect x={j * cell} y={i * cell} width={cell} height={cell} fill={colour(x)} stroke="#0d1424" stroke-width="1" />
			{#if numbers}
				<text x={j * cell + cell / 2} y={i * cell + cell / 2 + 4} text-anchor="middle" font-size={cell * 0.36} fill="#e6edf7" font-family="Inter Variable, sans-serif">
					{Math.abs(x) < 1e-9 ? '0' : Math.round(x * 100) / 100}
				</text>
			{/if}
		{/each}
	{/each}
</svg>

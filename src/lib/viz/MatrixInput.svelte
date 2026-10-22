<script lang="ts">
	import type { Mat } from '#lib/math/mat.js';

	interface Props {
		value: Mat;
		step?: number;
		label?: string;
		onchange?: (m: Mat) => void;
	}

	let { value = $bindable(), step = 0.5, label = 'Matrix', onchange }: Props = $props();

	function setCell(i: number, j: number, raw: string) {
		const n = parseFloat(raw);
		if (Number.isNaN(n)) return;
		const next = value.map((r) => [...r]);
		next[i][j] = n;
		value = next;
		onchange?.(next);
	}
</script>

<div
	role="group"
	aria-label={label}
	class="inline-grid items-center gap-1 rounded-md border-x-4 border-slate-400 px-2 py-1"
	style="grid-template-columns: repeat({value[0].length}, minmax(0, 4.2rem));"
>
	{#each value as row, i (i)}
		{#each row as cell, j (j)}
			<input
				type="number"
				{step}
				value={Math.round(cell * 100) / 100}
				aria-label="{label} row {i + 1} column {j + 1}"
				oninput={(e) => setCell(i, j, e.currentTarget.value)}
				class="w-full rounded bg-slate-800/70 px-1.5 py-1 text-center font-mono text-sm text-slate-100 tabular-nums outline-none focus:ring-2 focus:ring-sky-400"
			/>
		{/each}
	{/each}
</div>

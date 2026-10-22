<script lang="ts">
	interface Props {
		values: number[];
		labels?: string[];
		/** optional curve drawn over the bars, one value per bar (same units as `values`) */
		overlay?: number[];
		height?: number;
		color?: string;
		max?: number;
		label?: string;
		format?: (x: number) => string;
	}

	let {
		values,
		labels,
		overlay,
		height = 180,
		color = '#58c4dd',
		max,
		label = 'Bar chart',
		format = (x) => x.toFixed(2)
	}: Props = $props();

	const W = 640;
	const pad = 24;
	let top = $derived(max ?? Math.max(1e-9, ...values, ...(overlay ?? [])));
	let bw = $derived((W - 2 * pad) / Math.max(1, values.length));
	const y = (v: number) => height - pad - (Math.max(0, v) / top) * (height - 2 * pad);
	let path = $derived(overlay ? overlay.map((v, i) => `${i === 0 ? 'M' : 'L'}${(pad + bw * (i + 0.5)).toFixed(1)},${y(v).toFixed(1)}`).join('') : '');
</script>

<svg viewBox="0 0 {W} {height}" role="img" aria-label={label} class="block w-full rounded-lg bg-[#0d1424]">
	<line x1={pad} x2={W - pad} y1={height - pad} y2={height - pad} stroke="#b8c4d6" stroke-opacity="0.6" />
	{#each values as v, i (i)}
		<rect x={pad + bw * i + 1.5} y={y(v)} width={Math.max(1, bw - 3)} height={height - pad - y(v)} fill={color} fill-opacity="0.85" />
		{#if values.length <= 12}
			<text x={pad + bw * (i + 0.5)} y={y(v) - 4} text-anchor="middle" font-size="11" fill="#e6edf7">{format(v)}</text>
		{/if}
		{#if labels && (values.length <= 16 || i % Math.ceil(values.length / 10) === 0)}
			<text x={pad + bw * (i + 0.5)} y={height - 8} text-anchor="middle" font-size="10" fill="#8896ad">{labels[i]}</text>
		{/if}
	{/each}
	{#if overlay}<path d={path} fill="none" stroke="#ffd866" stroke-width="2.5" />{/if}
</svg>

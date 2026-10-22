<script lang="ts">
	import { getContext } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		at: number[];
		color?: string;
		r?: number;
		label?: string;
		dx?: number;
		dy?: number;
		hollow?: boolean;
	}

	let { at, color = C.yellow, r = 5, label, dx = 9, dy = -9, hollow = false }: Props = $props();
	const p = getContext<PlaneCtx>(PLANE_KEY);
</script>

<circle
	cx={p.x(at[0])}
	cy={p.y(at[1])}
	{r}
	fill={hollow ? 'none' : color}
	stroke={color}
	stroke-width="2"
/>
{#if label}
	<text
		x={p.x(at[0]) + dx}
		y={p.y(at[1]) + dy}
		fill={color}
		font-size="15"
		font-style="italic"
		font-family="Georgia, serif"
		stroke="#0d1424"
		stroke-width="4"
		paint-order="stroke">{label}</text
	>
{/if}

<script lang="ts">
	import { getContext } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		from?: number[];
		to: number[];
		color?: string;
		width?: number;
		dashed?: boolean;
		label?: string;
		/** label offset in px */
		dx?: number;
		dy?: number;
		opacity?: number;
	}

	let {
		from = [0, 0],
		to,
		color = C.blue,
		width = 3.5,
		dashed = false,
		label,
		dx = 10,
		dy = -10,
		opacity = 1
	}: Props = $props();

	const p = getContext<PlaneCtx>(PLANE_KEY);

	let x1 = $derived(p.x(from[0]));
	let y1 = $derived(p.y(from[1]));
	let x2 = $derived(p.x(to[0]));
	let y2 = $derived(p.y(to[1]));
	let len = $derived(Math.hypot(x2 - x1, y2 - y1));
	let head = $derived(Math.min(13, len * 0.6));
	let ang = $derived(Math.atan2(y2 - y1, x2 - x1));
	let hx = $derived(x2 - head * Math.cos(ang));
	let hy = $derived(y2 - head * Math.sin(ang));
	let wing = $derived(head * 0.5);
	let points = $derived(
		`${x2},${y2} ${hx + wing * Math.sin(ang)},${hy - wing * Math.cos(ang)} ${hx - wing * Math.sin(ang)},${hy + wing * Math.cos(ang)}`
	);
</script>

{#if len > 1}
	<g {opacity}>
		<line
			{x1}
			{y1}
			x2={hx}
			y2={hy}
			stroke={color}
			stroke-width={width}
			stroke-linecap="round"
			stroke-dasharray={dashed ? '6 6' : undefined}
		/>
		<polygon {points} fill={color} />
		{#if label}
			<text
				x={x2 + dx}
				y={y2 + dy}
				fill={color}
				font-size="16"
				font-style="italic"
				font-family="Georgia, serif"
				stroke="#0d1424"
				stroke-width="4"
				paint-order="stroke">{label}</text
			>
		{/if}
	</g>
{/if}

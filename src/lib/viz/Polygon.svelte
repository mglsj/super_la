<script lang="ts">
	import { getContext } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		points: number[][];
		fill?: string;
		fillOpacity?: number;
		stroke?: string;
		width?: number;
	}

	let { points, fill = C.yellow, fillOpacity = 0.25, stroke = C.yellow, width = 2 }: Props = $props();
	const p = getContext<PlaneCtx>(PLANE_KEY);
	let pts = $derived(points.map(([x, y]) => `${p.x(x)},${p.y(y)}`).join(' '));
</script>

<polygon points={pts} {fill} fill-opacity={fillOpacity} {stroke} stroke-width={width} stroke-linejoin="round" />

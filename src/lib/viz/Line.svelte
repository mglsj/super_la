<script lang="ts">
	import { getContext } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		/** a segment between two points ... */
		a?: number[];
		b?: number[];
		/** ... or an infinite line through `point` with direction `dir` */
		point?: number[];
		dir?: number[];
		color?: string;
		width?: number;
		dashed?: boolean;
		opacity?: number;
	}

	let {
		a,
		b,
		point = [0, 0],
		dir,
		color = C.yellow,
		width = 3,
		dashed = false,
		opacity = 1
	}: Props = $props();

	const p = getContext<PlaneCtx>(PLANE_KEY);
	const FAR = 60;

	let ends = $derived.by(() => {
		if (dir) {
			const n = Math.hypot(dir[0], dir[1]) || 1;
			const u = [dir[0] / n, dir[1] / n];
			return [
				[point[0] - FAR * u[0], point[1] - FAR * u[1]],
				[point[0] + FAR * u[0], point[1] + FAR * u[1]]
			];
		}
		return [a ?? [0, 0], b ?? [0, 0]];
	});
</script>

<line
	x1={p.x(ends[0][0])}
	y1={p.y(ends[0][1])}
	x2={p.x(ends[1][0])}
	y2={p.y(ends[1][1])}
	stroke={color}
	stroke-width={width}
	stroke-linecap="round"
	stroke-dasharray={dashed ? '6 6' : undefined}
	{opacity}
/>

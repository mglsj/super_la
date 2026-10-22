<script lang="ts">
	import { getContext } from 'svelte';
	import Arrow from './Arrow.svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		value: number[];
		origin?: number[];
		color?: string;
		label?: string;
		/** snap to multiples of this (0 = free) */
		snap?: number;
		/** clamp magnitude of each component */
		limit?: number;
		name?: string;
		onchange?: (v: number[]) => void;
	}

	let {
		value = $bindable(),
		origin = [0, 0],
		color = C.blue,
		label,
		snap = 0,
		limit = 6,
		name = 'vector',
		onchange
	}: Props = $props();

	const p = getContext<PlaneCtx>(PLANE_KEY);
	let dragging = $state(false);
	let focused = $state(false);

	function set(x: number, y: number) {
		const q = (v: number) => {
			const s = snap > 0 ? Math.round(v / snap) * snap : v;
			return Math.max(-limit, Math.min(limit, s));
		};
		value = [q(x - origin[0]) + origin[0], q(y - origin[1]) + origin[1]];
		onchange?.(value);
	}

	function move(e: PointerEvent) {
		if (!dragging) return;
		const [x, y] = p.toWorld(e.clientX, e.clientY);
		set(x, y);
	}

	function key(e: KeyboardEvent) {
		const step = snap > 0 ? snap : 0.25;
		const d: Record<string, [number, number]> = {
			ArrowLeft: [-step, 0],
			ArrowRight: [step, 0],
			ArrowUp: [0, step],
			ArrowDown: [0, -step]
		};
		const m = d[e.key];
		if (!m) return;
		e.preventDefault();
		set(value[0] + m[0], value[1] + m[1]);
	}
</script>

<Arrow from={origin} to={value} {color} {label} />
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<g
	role="slider"
	tabindex="0"
	aria-label="{name} tip, drag or use arrow keys"
	aria-valuetext="({value[0].toFixed(2)}, {value[1].toFixed(2)})"
	aria-valuenow={value[0]}
	style="cursor: {dragging ? 'grabbing' : 'grab'}; outline: none;"
	onpointerdown={(e) => {
		dragging = true;
		(e.currentTarget as Element).setPointerCapture(e.pointerId);
		move(e);
	}}
	onpointermove={move}
	onpointerup={() => (dragging = false)}
	onpointercancel={() => (dragging = false)}
	onkeydown={key}
	onfocus={() => (focused = true)}
	onblur={() => (focused = false)}
>
	<circle cx={p.x(value[0])} cy={p.y(value[1])} r="44" fill="transparent" />
	<circle
		cx={p.x(value[0])}
		cy={p.y(value[1])}
		r={dragging || focused ? 11 : 8}
		fill={color}
		fill-opacity="0.25"
		stroke={color}
		stroke-width="2"
	/>
</g>

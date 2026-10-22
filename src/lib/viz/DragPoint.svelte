<script lang="ts">
	import { getContext } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		value: number[];
		color?: string;
		label?: string;
		snap?: number;
		limit?: number;
		name?: string;
		onchange?: (v: number[]) => void;
	}

	let { value = $bindable(), color = C.yellow, label, snap = 0, limit = 8, name = 'point', onchange }: Props = $props();

	const p = getContext<PlaneCtx>(PLANE_KEY);
	let dragging = $state(false);

	function set(x: number, y: number) {
		const q = (v: number) => Math.max(-limit, Math.min(limit, snap > 0 ? Math.round(v / snap) * snap : v));
		value = [q(x), q(y)];
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

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<g
	role="slider"
	tabindex="0"
	aria-label="{name}, drag or use arrow keys"
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
>
	<circle cx={p.x(value[0])} cy={p.y(value[1])} r="44" fill="transparent" />
	<circle cx={p.x(value[0])} cy={p.y(value[1])} r={dragging ? 10 : 8} fill={color} stroke="#1a1a1a" stroke-width="2" />
</g>
{#if label}
	<text
		x={p.x(value[0]) + 12}
		y={p.y(value[1]) - 10}
		fill={color}
		font-size="15"
		font-style="italic"
		font-family="Georgia, serif"
		stroke="#0d1424"
		stroke-width="4"
		paint-order="stroke">{label}</text
	>
{/if}

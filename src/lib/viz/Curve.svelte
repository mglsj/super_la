<script lang="ts">
	import { getContext } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		fn: (x: number) => number;
		from?: number;
		to?: number;
		color?: string;
		width?: number;
		samples?: number;
	}

	let { fn, from = -6, to = 6, color = C.teal, width = 3, samples = 160 }: Props = $props();
	const p = getContext<PlaneCtx>(PLANE_KEY);

	let d = $derived.by(() => {
		let out = '';
		for (let i = 0; i <= samples; i++) {
			const x = from + ((to - from) * i) / samples;
			const y = Math.max(-50, Math.min(50, fn(x)));
			out += `${i === 0 ? 'M' : 'L'}${p.x(x).toFixed(1)},${p.y(y).toFixed(1)}`;
		}
		return out;
	});
</script>

<path {d} fill="none" stroke={color} stroke-width={width} stroke-linejoin="round" stroke-linecap="round" />

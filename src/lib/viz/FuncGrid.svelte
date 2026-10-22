<script lang="ts">
	import { getContext } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		/** any map of the plane to itself, linear or not */
		f: (v: number[]) => number[];
		extent?: number;
		color?: string;
		samples?: number;
	}

	let { f, extent = 4, color = C.blue, samples = 40 }: Props = $props();
	const p = getContext<PlaneCtx>(PLANE_KEY);

	let paths = $derived.by(() => {
		const out: { d: string; axis: boolean }[] = [];
		for (let k = -extent; k <= extent; k++) {
			for (const horizontal of [false, true]) {
				let d = '';
				for (let i = 0; i <= samples; i++) {
					const s = -extent + (2 * extent * i) / samples;
					const [x, y] = f(horizontal ? [s, k] : [k, s]);
					d += `${i === 0 ? 'M' : 'L'}${p.x(x).toFixed(1)},${p.y(y).toFixed(1)}`;
				}
				out.push({ d, axis: k === 0 });
			}
		}
		return out;
	});
</script>

<g fill="none" stroke-linejoin="round">
	{#each paths as pth, i (i)}
		<path d={pth.d} stroke={pth.axis ? C.axis : color} stroke-opacity={pth.axis ? 0.9 : 0.5} stroke-width={pth.axis ? 1.8 : 1.1} />
	{/each}
</g>

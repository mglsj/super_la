<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import Arrow from './Arrow.svelte';
	import Polygon from './Polygon.svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';
	import type { Mat } from '#lib/math/mat.js';

	interface Props {
		matrix: Mat;
		/** faint untransformed grid underneath */
		ghost?: boolean;
		basis?: boolean;
		square?: boolean;
		/** half-extent of the drawn grid in grid units */
		extent?: number;
		extra?: Snippet;
	}

	let { matrix, ghost = true, basis = true, square = true, extent = 12, extra }: Props = $props();
	const p = getContext<PlaneCtx>(PLANE_KEY);

	const t = (v: number[]): number[] => [
		matrix[0][0] * v[0] + matrix[0][1] * v[1],
		matrix[1][0] * v[0] + matrix[1][1] * v[1]
	];
	const ks = $derived(Array.from({ length: 2 * extent + 1 }, (_, i) => i - extent));
</script>

{#if ghost}
	<g stroke={C.grid} stroke-opacity="0.18" stroke-width="1">
		{#each ks as k (k)}
			<line x1={p.x(k)} x2={p.x(k)} y1={p.y(-extent)} y2={p.y(extent)} />
			<line x1={p.x(-extent)} x2={p.x(extent)} y1={p.y(k)} y2={p.y(k)} />
		{/each}
	</g>
{/if}

<g stroke-linecap="round">
	{#each ks as k (k)}
		{@const a = t([k, -extent])}
		{@const b = t([k, extent])}
		{@const c = t([-extent, k])}
		{@const d = t([extent, k])}
		<line
			x1={p.x(a[0])}
			y1={p.y(a[1])}
			x2={p.x(b[0])}
			y2={p.y(b[1])}
			stroke={k === 0 ? C.axis : C.blue}
			stroke-opacity={k === 0 ? 0.9 : 0.45}
			stroke-width={k === 0 ? 1.8 : 1.1}
		/>
		<line
			x1={p.x(c[0])}
			y1={p.y(c[1])}
			x2={p.x(d[0])}
			y2={p.y(d[1])}
			stroke={k === 0 ? C.axis : C.blue}
			stroke-opacity={k === 0 ? 0.9 : 0.45}
			stroke-width={k === 0 ? 1.8 : 1.1}
		/>
	{/each}
</g>

{#if square}
	<Polygon points={[[0, 0], t([1, 0]), t([1, 1]), t([0, 1])]} />
{/if}
{#if basis}
	<Arrow to={t([1, 0])} color={C.iHat} label="î" />
	<Arrow to={t([0, 1])} color={C.jHat} label="ĵ" />
{/if}
{@render extra?.()}

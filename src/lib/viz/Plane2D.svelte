<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import { PLANE_KEY, type PlaneCtx } from './plane';
	import { C } from './theme';

	interface Props {
		xmin?: number;
		xmax?: number;
		ymin?: number;
		ymax?: number;
		/** draw the faint background grid */
		grid?: boolean;
		axes?: boolean;
		/** label integer ticks */
		ticks?: boolean;
		label?: string;
		children?: Snippet;
		class?: string;
	}

	let {
		xmin = -5,
		xmax = 5,
		ymin = -5,
		ymax = 5,
		grid = true,
		axes = true,
		ticks = true,
		label = 'Coordinate plane',
		children,
		class: className = ''
	}: Props = $props();

	const W = 640;
	let H = $derived((W * (ymax - ymin)) / (xmax - xmin));
	let unit = $derived(W / (xmax - xmin));
	let svg: SVGSVGElement | undefined = $state();

	const ctx: PlaneCtx = {
		x: (v) => ((v - xmin) / (xmax - xmin)) * W,
		y: (v) => ((ymax - v) / (ymax - ymin)) * H,
		unit: () => unit,
		toWorld: (cx, cy) => {
			if (!svg) return [0, 0];
			const m = svg.getScreenCTM();
			if (!m) return [0, 0];
			const p = new DOMPoint(cx, cy).matrixTransform(m.inverse());
			return [xmin + (p.x / W) * (xmax - xmin), ymax - (p.y / H) * (ymax - ymin)];
		}
	};
	setContext(PLANE_KEY, ctx);

	const range = (a: number, b: number) => {
		const out: number[] = [];
		for (let i = Math.ceil(a); i <= Math.floor(b); i++) out.push(i);
		return out;
	};
	let step = $derived(Math.max(1, Math.round((xmax - xmin) / 12)));
	let xs = $derived(range(xmin, xmax));
	let ys = $derived(range(ymin, ymax));
</script>

<svg
	bind:this={svg}
	viewBox="0 0 {W} {H}"
	role="img"
	aria-label={label}
	class="block w-full touch-none select-none rounded-lg bg-[#0d1424] {className}"
>
	{#if grid}
		<g stroke={C.grid} stroke-opacity="0.35" stroke-width="1">
			{#each xs as v (v)}
				{#if v !== 0}<line x1={ctx.x(v)} x2={ctx.x(v)} y1="0" y2={H} />{/if}
			{/each}
			{#each ys as v (v)}
				{#if v !== 0}<line x1="0" x2={W} y1={ctx.y(v)} y2={ctx.y(v)} />{/if}
			{/each}
		</g>
	{/if}
	{#if axes}
		<g stroke={C.axis} stroke-opacity="0.8" stroke-width="1.5">
			<line x1="0" x2={W} y1={ctx.y(0)} y2={ctx.y(0)} />
			<line x1={ctx.x(0)} x2={ctx.x(0)} y1="0" y2={H} />
		</g>
	{/if}
	{#if ticks}
		<g fill={C.muted} font-size="11" font-family="Inter Variable, sans-serif">
			{#each xs as v (v)}
				{#if v !== 0 && v % step === 0}
					<text x={ctx.x(v)} y={ctx.y(0) + 15} text-anchor="middle">{v}</text>
				{/if}
			{/each}
			{#each ys as v (v)}
				{#if v !== 0 && v % step === 0}
					<text x={ctx.x(0) - 7} y={ctx.y(v) + 4} text-anchor="end">{v}</text>
				{/if}
			{/each}
		</g>
	{/if}
	{@render children?.()}
</svg>

<script lang="ts">
	import { PALETTE, SPRITES, type SpriteName } from './sprites.js';

	interface Props {
		name: SpriteName;
		size?: number;
		/** greyed out, for things you have not earned yet */
		dim?: boolean;
		class?: string;
	}

	let { name, size = 24, dim = false, class: className = '' }: Props = $props();

	let rects = $derived(
		SPRITES[name].flatMap((row, y) =>
			[...row].flatMap((ch, x) => (ch === '.' ? [] : [{ x, y, fill: PALETTE[ch] }]))
		)
	);
</script>

<svg
	viewBox="0 0 10 10"
	width={size}
	height={size}
	shape-rendering="crispEdges"
	aria-hidden="true"
	class="inline-block shrink-0 {className}"
	style={dim ? 'filter: grayscale(1) brightness(0.7); opacity: 0.55;' : undefined}
>
	{#each rects as r (`${r.x}-${r.y}`)}
		<rect x={r.x} y={r.y} width="1.02" height="1.02" fill={r.fill} />
	{/each}
</svg>

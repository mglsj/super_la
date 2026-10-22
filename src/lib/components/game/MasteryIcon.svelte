<script lang="ts">
	import PixelIcon from './PixelIcon.svelte';
	import { MASTERY_NAMES, type Mastery } from '#lib/game/engine.js';
	import type { SpriteName } from './sprites.js';

	interface Props {
		level: Mastery;
		size?: number;
		label?: boolean;
	}

	let { level, size = 28, label = false }: Props = $props();

	/** brick -> ?-block -> mushroom -> flower -> star */
	const sprites: SpriteName[] = ['brick', 'qblock', 'mushroom', 'flower', 'star'];
</script>

<span class="inline-flex items-center gap-1.5" title={MASTERY_NAMES[level]}>
	<PixelIcon name={sprites[level]} {size} dim={level === 0} />
	{#if label}<span class="font-pixel text-[10px] uppercase">{MASTERY_NAMES[level]}</span>{/if}
</span>

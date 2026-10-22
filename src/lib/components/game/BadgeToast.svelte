<script lang="ts">
	import { progress } from '#lib/game/progress.svelte.js';
	import PixelIcon from './PixelIcon.svelte';

	// show one new badge at a time, auto-dismiss
	let current = $derived(progress.fresh[0]);

	$effect(() => {
		if (!current) return;
		const t = setTimeout(() => progress.fresh.shift(), 4500);
		return () => clearTimeout(t);
	});
</script>

{#if current}
	<div
		role="status"
		aria-live="polite"
		class="panel fixed right-4 bottom-12 z-50 flex max-w-xs items-center gap-3 p-4"
	>
		<span class="pop"><PixelIcon name={current.icon} size={40} /></span>
		<div>
			<div class="font-pixel text-[9px] text-[#fbd000] uppercase">Badge unlocked!</div>
			<div class="mt-1 font-semibold text-slate-50">{current.title}</div>
			<div class="text-sm text-slate-400">{current.description}</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import QuizRunner from '#lib/components/quiz/QuizRunner.svelte';
	import PixelIcon from '#lib/components/game/PixelIcon.svelte';
	import { buildTest } from '#lib/content/registry.js';
	import { progress } from '#lib/game/progress.svelte.js';
	import type { Question } from '#lib/content/types.js';

	let questions = $state<Question[] | null>(null);

	function start() {
		// favour skills you have not mastered yet
		const ids = progress.readyIds.filter((id) => progress.mastery(id) < 4);
		const pool = ids.length ? ids : progress.readyIds;
		questions = buildTest(pool, 1, 12);
	}
</script>

<svelte:head><title>Course challenge · Linear Algebra Lab</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<div class="font-pixel text-[10px] text-[#e52521]">FINAL CASTLE</div>
	<h1 class="font-pixel mt-2 text-lg leading-relaxed text-white">Course challenge</h1>
	<p class="mt-3 text-slate-300">
		A quick mixed test across the whole course, leaning on skills you have not mastered yet. Answer without hints;
		skills you know will level up, and shaky ones will show up on the map.
	</p>
	{#if !progress.ready}
		<p class="mt-6 text-slate-400">Loading…</p>
	{:else if !questions}
		<div class="mt-6 flex flex-wrap gap-3">
			<button class="mbtn" onclick={start}><PixelIcon name="flag" size={18} /> Start challenge</button>
		</div>
	{:else}
		<QuizRunner {questions} mode="test" title="Course challenge" />
	{/if}
</div>

<script lang="ts">
	import { resolve } from '$app/paths';
	import QuizRunner from '#lib/components/quiz/QuizRunner.svelte';
	import PixelIcon from '#lib/components/game/PixelIcon.svelte';
	import { buildTest } from '#lib/content/registry.js';
	import type { Question } from '#lib/content/types.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let questions = $state<Question[] | null>(null);
	function start() {
		questions = buildTest(data.lessonIds, 2, 20);
	}
</script>

<svelte:head><title>Unit test · {data.chapter.title}</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<div class="font-pixel text-[10px] text-[#e52521]">WORLD {data.chapter.n} · UNIT TEST</div>
	<h1 class="font-pixel mt-2 text-lg leading-relaxed text-white">{data.chapter.title}</h1>
	<p class="mt-3 text-slate-300">
		A mix of questions from every skill in this unit. There are no hints and no feedback until the end. Each skill
		can <strong class="text-emerald-300">level up</strong> (up to Mastered) or
		<strong class="text-rose-300">drop</strong> depending on how you do.
	</p>

	{#if !questions}
		<div class="mt-6 flex flex-wrap gap-3">
			<button class="mbtn" onclick={start}><PixelIcon name="flag" size={18} /> Start test</button>
			<a href={resolve('/')} class="mbtn mbtn-blue">Back to map</a>
		</div>
	{:else}
		<QuizRunner {questions} mode="test" title="Unit test" />
	{/if}
</div>

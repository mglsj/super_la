<script lang="ts">
	import QuizRunner from '#lib/components/quiz/QuizRunner.svelte';
	import { questionIndex } from '#lib/content/registry.js';
	import { progress } from '#lib/game/progress.svelte.js';

	// snapshot once so answering doesn't reshuffle the queue mid-session
	let queue = $state<string[] | null>(null);
	let started = $state(false);

	$effect(() => {
		if (progress.ready && queue === null) queue = progress.dueReviewIds.slice(0, 10);
	});

	let questions = $derived((queue ?? []).map((id) => questionIndex[id]).filter(Boolean));
</script>

<svelte:head><title>Review · Linear Algebra Lab</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<h1 class="font-pixel mb-3 text-lg text-white">REVIEW</h1>
	<p class="mb-6 text-slate-300">
		Questions return on a spaced schedule. Get a Proficient skill right here and it becomes
		<strong class="text-slate-50">Mastered</strong>; miss it and it slips back to Familiar.
	</p>

	{#if !progress.ready || queue === null}
		<p class="text-slate-400">Loading…</p>
	{:else if questions.length === 0}
		<div class="rounded-md border-[3px] border-slate-600 p-8 text-center text-slate-300">
			Nothing due right now. Finish a practice set and its questions will show up here when they are due.
		</div>
	{:else if !started}
		<button class="mbtn" onclick={() => (started = true)}>Start review ({questions.length})</button>
	{:else}
		<QuizRunner {questions} mode="review" title="Review" />
	{/if}
</div>

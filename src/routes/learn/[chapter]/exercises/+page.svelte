<script lang="ts">
	import { resolve } from '$app/paths';
	import QuizRunner from '#lib/components/quiz/QuizRunner.svelte';
	import PixelIcon from '#lib/components/game/PixelIcon.svelte';
	import { progress } from '#lib/game/progress.svelte.js';
	import type { Question } from '#lib/content/types.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let started = $state(false);
	let todo = $derived(data.questions.filter((q) => !progress.data.exercises[q.id]));
	let queue = $state<Question[]>([]);
	let done = $derived(progress.exercisesDone(data.questions.map((q) => q.id)));

	function start(onlyUnsolved: boolean) {
		queue = onlyUnsolved ? todo : data.questions;
		started = true;
	}
</script>

<svelte:head><title>Exercises · {data.chapter.title}</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<div class="font-pixel text-[10px] text-[#fbd000]">WORLD {data.chapter.n} · EXERCISES FROM THE NOTES</div>
	<h1 class="font-pixel mt-2 text-lg leading-relaxed text-white">{data.chapter.title}</h1>
	<p class="mt-3 text-slate-300">
		These are the {data.questions.length} exercises printed at the end of this chapter of your notes, in the same order. Questions with a definite answer are checked
		for you. Proofs and explanations are <strong class="text-slate-50">self-checked</strong>: work it out, reveal the model solution, then mark yourself honestly.
		Every exercise has step-by-step hints.
	</p>

	<ul class="mt-4 flex flex-wrap gap-2" aria-label="Exercises in this chapter">
		{#each data.questions as q (q.id)}
			<li class="rounded border-2 px-2 py-1 font-mono text-xs {progress.data.exercises[q.id] ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200' : 'border-slate-600 text-slate-300'}">
				{progress.data.exercises[q.id] ? '✓ ' : ''}{q.source?.replace('Notes, Exercise ', '') ?? q.id}
			</li>
		{/each}
	</ul>
	<p class="mt-2 text-sm text-slate-400">{done} of {data.questions.length} solved</p>

	{#if !started}
		<div class="mt-6 flex flex-wrap gap-3">
			<button class="mbtn" onclick={() => start(false)}><PixelIcon name="qblock" size={18} /> {done === 0 ? 'Start' : 'Do all again'}</button>
			{#if done > 0 && todo.length > 0}<button class="mbtn mbtn-green" onclick={() => start(true)}>Only the {todo.length} unsolved</button>{/if}
			<a href={resolve('/')} class="mbtn mbtn-blue">Back to map</a>
		</div>
	{:else}
		{#key queue.length}
			<QuizRunner questions={queue} mode="exercises" title="Exercises" />
		{/key}
	{/if}
</div>

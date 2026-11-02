<script lang="ts">
	import { resolve } from '$app/paths';
	import QuizRunner from '#lib/components/quiz/QuizRunner.svelte';
	import PixelIcon from '#lib/components/game/PixelIcon.svelte';
	import { progress } from '#lib/game/progress.svelte.js';
	import type { Question } from '#lib/content/types.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let started = $state(false);
	let queue = $state<Question[]>([]);
	let todo = $derived(data.paper.questions.filter((q) => !progress.data.exercises[q.id]));
	let done = $derived(progress.exercisesDone(data.paper.questions.map((q) => q.id)));

	function start(onlyUnsolved: boolean) {
		queue = onlyUnsolved ? todo : data.paper.questions;
		started = true;
	}
</script>

<svelte:head><title>{data.paper.title} · Past papers</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<div class="font-pixel text-[10px] text-[#fbd000]">PAST PAPER · {data.paper.marks} MARKS · {data.paper.minutes} MIN</div>
	<h1 class="font-pixel mt-2 text-lg leading-relaxed text-white">{data.paper.title}</h1>
	<p class="mt-3 text-slate-300">{data.paper.blurb}</p>

	<div class="mt-4 rounded-xl border border-slate-700 bg-slate-900/40 p-4">
		<h2 class="text-sm font-semibold text-slate-100">Learn the method first</h2>
		<p class="mt-1 text-sm text-slate-400">Each lesson below ends with a worked exam problem of exactly this type, revealed one step at a time.</p>
		<ul class="mt-2 space-y-1 text-sm">
			{#each data.paper.lessons as l (l.slug + l.label)}
				<li>
					<a class="text-sky-300 underline-offset-2 hover:underline" href={resolve('/learn/[chapter]/[lesson]', { chapter: l.chapter, lesson: l.slug })}>{l.label}</a>
				</li>
			{/each}
		</ul>
	</div>

	<ul class="mt-4 flex flex-wrap gap-2" aria-label="Parts of this paper">
		{#each data.paper.questions as q (q.id)}
			<li class="rounded border-2 px-2 py-1 font-mono text-xs {progress.data.exercises[q.id] ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200' : 'border-slate-600 text-slate-300'}">
				{progress.data.exercises[q.id] ? '✓ ' : ''}{q.source?.split(', ')[1] ?? q.id}
			</li>
		{/each}
	</ul>
	<p class="mt-2 text-sm text-slate-400">{done} of {data.paper.questions.length} parts done</p>

	{#if !started}
		<div class="mt-6 flex flex-wrap gap-3">
			<button class="mbtn" onclick={() => start(false)}><PixelIcon name="qblock" size={18} /> {done === 0 ? 'Start the paper' : 'Do it all again'}</button>
			{#if done > 0 && todo.length > 0}<button class="mbtn mbtn-green" onclick={() => start(true)}>Only the {todo.length} unsolved</button>{/if}
			<a href={resolve('/papers')} class="mbtn mbtn-blue">All papers</a>
		</div>
	{:else}
		{#key queue.length}
			<QuizRunner questions={queue} mode="exercises" title={data.paper.title} />
		{/key}
	{/if}
</div>

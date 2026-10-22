<script lang="ts">
	import { resolve } from '$app/paths';
	import QuizRunner from '#lib/components/quiz/QuizRunner.svelte';
	import MasteryIcon from '#lib/components/game/MasteryIcon.svelte';
	import { isReady } from '#lib/content/registry.js';
	import { progress } from '#lib/game/progress.svelte.js';
	import { MASTERY_NAMES } from '#lib/game/engine.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let { meta, next, prev } = $derived(data);
	let level = $derived(progress.mastery(meta.id));
	let nextReady = $derived(!!next && isReady(next.id));
	let lessonNo = $derived(meta.chapter.lessons.findIndex((l) => l.slug === meta.lesson.slug) + 1);
</script>

<svelte:head><title>{meta.lesson.title} · Linear Algebra Lab</title></svelte:head>

<nav class="font-pixel mb-4 text-[9px] text-slate-400 uppercase" aria-label="Breadcrumb">
	<a href={resolve('/')} class="inline-block py-2 hover:text-[#fbd000]">Map</a>
	<span class="mx-1.5">▶</span>
	<span>World {meta.chapter.n}: {meta.chapter.title}</span>
</nav>

<article class="mx-auto max-w-3xl">
	<header class="mb-6">
		<div class="font-pixel text-[10px] text-[#fbd000]">LEVEL {meta.chapter.n}-{lessonNo}</div>
		<h1 class="font-pixel mt-2 text-lg leading-relaxed text-white sm:text-xl">{meta.lesson.title}</h1>
		<p class="mt-2 text-slate-300">{meta.lesson.blurb}</p>
		<div class="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
			<span class="flex items-center gap-2 rounded border-2 border-slate-600 px-2.5 py-1 text-slate-200">
				<MasteryIcon level={level} size={20} />
				{MASTERY_NAMES[level]}
			</span>
			<span class="rounded border-2 border-slate-700 px-2.5 py-1">Notes: {meta.lesson.notesRef}</span>
			<span class="rounded border-2 border-slate-700 px-2.5 py-1">{meta.lesson.minutes} min</span>
			{#if meta.lesson.advanced}
				<span class="rounded border-2 border-amber-400/60 px-2.5 py-1 text-amber-300">Advanced</span>
			{/if}
		</div>
	</header>

	<div class="lesson space-y-4 text-[1.02rem] leading-relaxed text-slate-300">
		<data.Content />
	</div>

	{#if data.questions.length}
		{#key meta.id}
			<QuizRunner
				questions={data.questions}
				lessonId={meta.id}
				title="Practice"
				nextHref={nextReady && next ? resolve('/learn/[chapter]/[lesson]', { chapter: next.chapter.id, lesson: next.lesson.slug }) : resolve('/learn/[chapter]/test', { chapter: meta.chapter.id })}
				nextLabel={nextReady && next ? `Next: ${next.lesson.title}` : 'Take the unit test'}
			/>
		{/key}
	{/if}

	<footer class="mt-8 flex flex-wrap justify-between gap-3">
		{#if prev && isReady(prev.id)}
			<a href={resolve('/learn/[chapter]/[lesson]', { chapter: prev.chapter.id, lesson: prev.lesson.slug })} class="mbtn mbtn-blue">◀ {prev.lesson.title}</a>
		{:else}<span></span>{/if}
		{#if next && nextReady}
			<a href={resolve('/learn/[chapter]/[lesson]', { chapter: next.chapter.id, lesson: next.lesson.slug })} class="mbtn mbtn-blue">{next.lesson.title} ▶</a>
		{/if}
	</footer>
</article>

<style>
	.lesson :global(h2) {
		margin-top: 2.5rem;
		font-family: var(--font-pixel);
		font-size: 0.95rem;
		line-height: 1.7;
		color: #fbd000;
	}
	.lesson :global(h3) {
		margin-top: 1.5rem;
		font-size: 1.15rem;
		font-weight: 600;
		color: #e2e8f0;
	}
</style>

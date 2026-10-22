<script lang="ts">
	import { resolve } from '$app/paths';
	import { chapters, lessonId } from '#lib/content/chapters.js';
	import { isReady } from '#lib/content/registry.js';
	import { progress } from '#lib/game/progress.svelte.js';
	import { MASTERY_NAMES } from '#lib/game/engine.js';
	import MasteryIcon from '#lib/components/game/MasteryIcon.svelte';
	import PixelIcon from '#lib/components/game/PixelIcon.svelte';

	let next = $derived(progress.next);
	let ready = $derived(progress.readyIds);
	let courseScore = $derived(Math.round(progress.masteryOf(ready) * 100));
	let counts = $derived(progress.counts(ready));
</script>

<h1 class="sky-title mb-6 text-center text-xl leading-relaxed sm:text-3xl">
	SUPER<br />LINEAR ALGEBRA
</h1>

<!-- Khan-style course mastery -->
<section class="panel mb-8 p-5 sm:p-6" aria-labelledby="course-mastery">
	<div class="flex flex-wrap items-end justify-between gap-3">
		<div>
			<h2 id="course-mastery" class="font-pixel text-[11px] text-[#fbd000] uppercase">Course mastery</h2>
			<p class="font-pixel mt-2 text-2xl text-white">{courseScore}%</p>
		</div>
		{#if next}
			<a href={resolve('/learn/[chapter]/[lesson]', { chapter: next.chapter.id, lesson: next.lesson.slug })} class="mbtn mbtn-green">
				{progress.data.xp === 0 && courseScore === 0 ? 'Start' : 'Up next'}: {next.lesson.title} ▶
			</a>
		{/if}
	</div>
	<div class="pbar mt-4" role="progressbar" aria-label="Course mastery" aria-valuenow={courseScore} aria-valuemin="0" aria-valuemax="100">
		<i style="width: {courseScore}%"></i>
	</div>
	<ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
		{#each [4, 3, 2, 1, 0] as lvl (lvl)}
			<li class="flex items-center gap-2">
				<MasteryIcon level={lvl as 0 | 1 | 2 | 3 | 4} size={22} />
				<span class="font-pixel text-[10px]">{counts[lvl]}</span>
				<span class="text-slate-400">{MASTERY_NAMES[lvl]}</span>
			</li>
		{/each}
	</ul>
	<p class="mt-3 text-sm text-slate-400">
		Practise a skill to get it to <strong class="text-slate-200">Proficient</strong>; pass a unit test or review it later to
		reach <strong class="text-slate-200">Mastered</strong>. Anything unlocked, any order.
	</p>
</section>

<div class="space-y-8">
	{#each chapters as ch (ch.id)}
		{@const ids = ch.lessons.map((l) => lessonId(ch, l.slug))}
		{@const readyIds = ids.filter(isReady)}
		{@const score = Math.round(progress.masteryOf(readyIds) * 100)}
		<section class="panel p-5 sm:p-6" aria-labelledby="unit-{ch.id}">
			<header class="mb-4">
				<div class="font-pixel text-[10px] text-[#fbd000] uppercase">World {ch.n}</div>
				<h2 id="unit-{ch.id}" class="mt-1 text-xl font-semibold text-slate-50">{ch.title}</h2>
				<p class="mt-1 text-sm text-slate-400">{ch.blurb}</p>
				{#if readyIds.length}
					<div class="mt-3 flex items-center gap-3">
						<div class="pbar gold max-w-xs flex-1" role="progressbar" aria-label="Unit mastery" aria-valuenow={score} aria-valuemax="100">
							<i style="width: {score}%"></i>
						</div>
						<span class="font-pixel text-[10px] text-slate-300">{score}%</span>
					</div>
				{/if}
			</header>

			<ol class="space-y-2">
				{#each ch.lessons as l, i (l.slug)}
					{@const id = lessonId(ch, l.slug)}
					{@const lvl = progress.mastery(id)}
					{#if isReady(id)}
						<li>
							<a
								href={resolve('/learn/[chapter]/[lesson]', { chapter: ch.id, lesson: l.slug })}
								class="group flex items-center gap-3 rounded-md border-[3px] border-slate-600 bg-slate-800/60 p-3 transition hover:border-[#fbd000] hover:bg-slate-800"
							>
								<span class="font-pixel w-9 shrink-0 text-center text-[10px] text-slate-400">{ch.n}-{i + 1}</span>
								<span class="shrink-0 {lvl === 4 ? 'bob' : ''}"><MasteryIcon level={lvl} size={32} /></span>
								<span class="min-w-0 flex-1">
									<span class="block font-medium text-slate-100">
										{l.title}{#if l.advanced}<span class="font-pixel ml-2 text-[8px] text-amber-300">ADV</span>{/if}
									</span>
									<span class="block text-xs text-slate-400">{l.blurb}</span>
								</span>
								<span class="font-pixel hidden text-[9px] text-slate-300 uppercase sm:block">{MASTERY_NAMES[lvl]}</span>
								<span class="font-pixel text-[10px] text-[#fbd000] group-hover:translate-x-0.5">▶</span>
							</a>
						</li>
					{:else}
						<li class="flex items-center gap-3 rounded-md border-[3px] border-dashed border-slate-700 p-3 opacity-55">
							<span class="font-pixel w-9 shrink-0 text-center text-[10px] text-slate-500">{ch.n}-{i + 1}</span>
							<PixelIcon name="brick" size={32} dim />
							<span class="min-w-0 flex-1">
								<span class="block font-medium text-slate-300">{l.title}</span>
								<span class="block text-xs text-slate-500">Coming soon</span>
							</span>
						</li>
					{/if}
				{/each}

				{#if readyIds.length}
					<li>
						<a
							href={resolve('/learn/[chapter]/test', { chapter: ch.id })}
							class="flex items-center gap-3 rounded-md border-[3px] border-[#e52521] bg-[#e52521]/10 p-3 hover:bg-[#e52521]/20"
						>
							<span class="font-pixel w-9 shrink-0 text-center text-[10px] text-[#e52521]">TEST</span>
							<PixelIcon name="flag" size={32} />
							<span class="min-w-0 flex-1">
								<span class="block font-medium text-slate-100">Unit test</span>
								<span class="block text-xs text-slate-400">Mixed questions from every skill. Skills can level up or drop.</span>
							</span>
							<span class="font-pixel text-[10px] text-[#fbd000]">▶</span>
						</a>
					</li>
				{/if}
			</ol>
		</section>
	{/each}
</div>

<script lang="ts">
	import { untrack } from 'svelte';
	import { resolve } from '$app/paths';
	import QuestionView from './QuestionView.svelte';
	import Rich from '#lib/components/lesson/Rich.svelte';
	import MasteryIcon from '#lib/components/game/MasteryIcon.svelte';
	import PixelIcon from '#lib/components/game/PixelIcon.svelte';
	import { Button } from '#lib/components/ui/button/index.js';
	import { progress, skillOf, type LevelChange } from '#lib/game/progress.svelte.js';
	import { MASTERY_NAMES } from '#lib/game/engine.js';
	import { allLessons } from '#lib/content/chapters.js';
	import type { Question } from '#lib/content/types.js';

	interface Props {
		questions: Question[];
		/**
		 * practice: one lesson's skill, hints and instant feedback.
		 * test: unit test or course challenge, no feedback until the end.
		 * review: spaced repetition with instant feedback.
		 * exercises: the end-of-chapter exercises from the notes; hints and feedback, no skill levels.
		 */
		mode?: 'practice' | 'test' | 'review' | 'exercises';
		/** practice mode: the skill being practised */
		lessonId?: string;
		/** practice mode: where "next" should go */
		nextHref?: string;
		nextLabel?: string;
		title?: string;
	}

	let { questions, mode = 'practice', lessonId, nextHref, nextLabel, title }: Props = $props();

	const lessonTitle = (id: string) => allLessons.find((l) => l.id === id)?.lesson.title ?? id;

	let run = $state(0);
	let index = $state(0);
	let attempt = $state(0);
	let attempts = $state(0);
	let status = $state<'idle' | 'right' | 'wrong'>('idle');
	let revealed = $state(false);
	let hintLevel = $state(0);
	let hintUsed = $state(false);
	let finished = $state(false);
	let startXp = $state(0);

	let cleanCount = $state(0);
	let dots = $state<('todo' | 'clean' | 'done')[]>([]);
	let results = $state<{ q: Question; correct: boolean }[]>([]);
	let changes = $state<LevelChange[]>([]);
	let earned = $state(0);

	let q = $derived(questions[index]);
	$effect.pre(() => {
		// (re)initialise when the question list or run changes
		void run;
		dots = questions.map(() => 'todo');
		startXp = untrack(() => progress.data.xp);
	});

	function submit(correct: boolean) {
		if (mode === 'test') {
			results.push({ q, correct });
			progress.answer(q.id, correct, { clean: true, mode: 'test' });
			advance();
			return;
		}
		const clean = attempts === 0 && !hintUsed;
		attempts++;
		const { change } = progress.answer(q.id, correct, { clean, mode: mode === 'exercises' ? 'practice' : mode });
		if (correct && mode === 'exercises') progress.markExercise(q.id);
		if (change) changes.push(change);
		if (correct) {
			if (clean) cleanCount++;
			dots[index] = clean ? 'clean' : 'done';
			revealed = true;
		}
		status = correct ? 'right' : 'wrong';
	}

	function retry() {
		status = 'idle';
		attempt++;
	}

	function advance() {
		if (index + 1 < questions.length) {
			index++;
			attempt = 0;
			attempts = 0;
			status = 'idle';
			revealed = false;
			hintLevel = 0;
			hintUsed = false;
			return;
		}
		finish();
	}

	function finish() {
		finished = true;
		if (mode === 'practice' && lessonId) {
			changes = [progress.finishPractice(lessonId, cleanCount, questions.length)];
		} else if (mode === 'test') {
			changes = progress.finishTest(results.map((r) => ({ lessonId: skillOf(r.q.id), correct: r.correct })));
		}
		earned = progress.data.xp - startXp;
	}

	function restart() {
		run++;
		index = 0;
		attempt = 0;
		attempts = 0;
		status = 'idle';
		revealed = false;
		hintLevel = 0;
		hintUsed = false;
		finished = false;
		cleanCount = 0;
		results = [];
		changes = [];
	}

	let hintList = $derived(q?.hints ?? []);
	let isOpen = $derived(q?.type === 'open');
	let skillId = $derived(q ? skillOf(q.id) : '');
	let scored = $derived(results.filter((r) => r.correct).length);
	let missed = $derived(results.filter((r) => !r.correct));
	const levelUps = $derived(changes.filter((c) => c.to > c.from));
</script>

<section aria-label={title ?? 'Practice'} class="my-8 rounded-md border-[3px] border-[#fbd000] bg-slate-900/80 p-4 sm:p-5">
	{#if !finished}
		<header class="mb-4 flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-3">
				{#if mode === 'practice' && lessonId}
					<MasteryIcon level={progress.mastery(lessonId)} size={30} />
				{:else}
					<PixelIcon name="qblock" size={30} class="bob" />
				{/if}
				<div>
					<div class="font-pixel text-[10px] text-[#fbd000] uppercase">
						{title ?? (mode === 'practice' ? 'Practice' : mode === 'test' ? 'Test' : mode === 'exercises' ? 'Exercises' : 'Review')}
					</div>
					{#if mode === 'practice' && lessonId}
						<div class="text-xs text-slate-400">{MASTERY_NAMES[progress.mastery(lessonId)]}. Get most right first try to level up.</div>
					{:else if mode === 'test'}
						<div class="text-xs text-slate-400">No hints and no feedback until the end.</div>
					{/if}
				</div>
			</div>
			<ol class="flex gap-1.5" aria-label="Question {index + 1} of {questions.length}">
				{#each dots as d, i (i)}
					<li
						class="size-4 rounded-sm border-2 border-[#1a1a1a] {i === index
							? 'bg-[#fbd000]'
							: d === 'clean'
								? 'bg-[#43b047]'
								: d === 'done'
									? 'bg-[#049cd8]'
									: mode === 'test' && i < index
										? 'bg-slate-400'
										: 'bg-slate-700'}"
					></li>
				{/each}
			</ol>
		</header>

		{#key `${run}-${q.id}-${attempt}`}
			<QuestionView {q} {status} reveal={status === 'right' || revealed} onsubmit={submit} />
		{/key}

		{#if mode !== 'test' && status !== 'right'}
			<div class="mt-4 space-y-2">
				{#each hintList.slice(0, hintLevel) as h, i (i)}
					<div class="rounded-md border-[3px] border-sky-400/60 bg-sky-400/10 p-3 text-sm leading-relaxed text-slate-200" role="note">
						<span class="font-pixel mr-2 text-[10px] text-sky-300">HINT {i + 1}{hintList.length > 1 ? ' / ' + hintList.length : ''}</span>
						<Rich text={h} />
					</div>
				{/each}
				{#if hintList.length > 0 && hintLevel < hintList.length}
					<button
						type="button"
						class="font-pixel py-2.5 text-[10px] text-sky-300 underline underline-offset-4 hover:text-sky-200"
						onclick={() => {
							hintLevel++;
							hintUsed = true;
						}}>{hintLevel === 0 ? 'Need a hint?' : 'Another hint'}</button
					>
					{#if hintLevel === 0}<span class="ml-2 text-xs text-slate-500">(a hint means this no longer counts as first try)</span>{/if}
				{:else if hintList.length === 0}
					<p class="text-xs text-slate-500">
						Stuck? Re-read <a href={resolve('/learn/[chapter]/[lesson]', { chapter: skillId.split('.')[0], lesson: skillId.split('.')[1] })} target="_blank" class="text-sky-300 underline">{lessonTitle(skillId)}</a> in a new tab.
					</p>
				{/if}
			</div>
		{/if}

		{#if status === 'wrong' && isOpen}
			<div role="status" class="mt-4 rounded-md border-[3px] border-amber-400/60 bg-amber-400/10 p-4">
				<div class="font-pixel text-[11px] text-amber-300">NO WORRIES</div>
				<p class="mt-1 text-slate-300">Read the model solution again, step by step, and try the same exercise later. It stays on your list.</p>
				<div class="mt-3"><Button variant="secondary" onclick={advance}>{index + 1 < questions.length ? 'Next question' : 'Finish'}</Button></div>
			</div>
		{:else if status === 'wrong'}
			<div role="status" class="mt-4 rounded-md border-[3px] border-rose-400/60 bg-rose-400/10 p-4">
				<div class="font-pixel text-[11px] text-rose-300">NOT QUITE</div>
				<p class="mt-1 text-slate-300">Give it another go. Use the hints for a nudge, or reveal the full solution.</p>
				<div class="mt-3 flex flex-wrap gap-2">
					<Button onclick={retry}>Try again</Button>
					{#if !revealed}<Button variant="secondary" onclick={() => (revealed = true)}>Show solution</Button>{/if}
				</div>
				{#if revealed}
					<div class="mt-3 text-sm leading-relaxed whitespace-pre-line text-slate-200"><span class="font-pixel mb-1 block text-[10px] text-rose-300">SOLUTION</span><Rich text={q.explain} /></div>
					<div class="mt-3"><Button variant="secondary" onclick={advance}>{index + 1 < questions.length ? 'Next question' : 'Finish'}</Button></div>
				{/if}
			</div>
		{:else if status === 'right'}
			<div role="status" class="mt-4 rounded-md border-[3px] border-emerald-400/60 bg-emerald-400/10 p-4">
				<div class="font-pixel flex items-center gap-2 text-[11px] text-emerald-300">
					<PixelIcon name="coin" size={18} class="pop" /> {isOpen ? 'NICE WORK!' : 'CORRECT!'}
				</div>
				{#if !isOpen}<div class="mt-1 text-sm leading-relaxed whitespace-pre-line text-slate-200"><Rich text={q.explain} /></div>{/if}
				<div class="mt-3">
					<Button onclick={advance}>{index + 1 < questions.length ? 'Next question' : 'Finish'}</Button>
				</div>
			</div>
		{/if}
	{:else}
		<div class="py-3" aria-live="polite">
			{#if mode === 'practice' || mode === 'review' || mode === 'exercises'}
				{@const c = changes[0]}
				<div class="text-center">
					{#if mode === 'practice' && c}
						<div class="mb-2 flex items-center justify-center gap-3">
							<MasteryIcon level={c.from} size={40} />
							{#if c.to > c.from}
								<span class="font-pixel text-lg text-[#fbd000]">▶</span>
								<span class="pop"><MasteryIcon level={c.to} size={56} /></span>
							{/if}
						</div>
						<h3 class="font-pixel text-sm text-white">
							{c.to > c.from ? 'LEVEL UP!' : `STILL ${MASTERY_NAMES[c.to].toUpperCase()}`}
						</h3>
						<p class="mt-2 text-slate-300">
							{#if c.to > c.from}{MASTERY_NAMES[c.from]} → <strong class="text-slate-50">{MASTERY_NAMES[c.to]}</strong>.{/if}
							{cleanCount} of {questions.length} right first try, no hints.
							{#if c.to < 3}Get {Math.ceil(questions.length * 0.7)} first-try for Proficient.{/if}
						</p>
					{:else}
						<PixelIcon name="star" size={48} class="pop" />
						<h3 class="font-pixel mt-2 text-sm text-white">{mode === 'exercises' ? 'EXERCISES DONE' : 'REVIEW DONE'}</h3>
						<p class="mt-2 text-slate-300">
							{#if mode === 'exercises'}{cleanCount} of {questions.length} solved first try, no hints. Anything you skipped or missed stays on your list.{:else}{levelUps.length} skill{levelUps.length === 1 ? '' : 's'} moved up.{/if}
						</p>
					{/if}
					<p class="font-pixel mt-3 flex items-center justify-center gap-2 text-[11px] text-[#fbd000]">
						<PixelIcon name="coin" size={18} />+{earned} COINS
					</p>
				</div>
				<div class="mt-5 flex flex-wrap justify-center gap-3">
					{#if mode === 'practice'}<Button variant="secondary" onclick={restart}>Practice again</Button>{/if}
					{#if nextHref}<a href={nextHref} class="mbtn mbtn-green">{nextLabel ?? 'Next'} ▶</a>{/if}
					<a href={resolve('/')} class="mbtn mbtn-blue">Back to map</a>
				</div>
			{:else}
				<div class="text-center">
					<PixelIcon name="flag" size={48} class="pop" />
					<h3 class="font-pixel mt-2 text-sm text-white">{title?.toUpperCase() ?? 'TEST'} COMPLETE</h3>
					<p class="mt-2 text-slate-300">{scored} of {results.length} correct · <span class="text-[#fbd000]">+{earned} coins</span></p>
				</div>

				<h4 class="font-pixel mt-6 mb-2 text-[10px] text-slate-400 uppercase">Skills</h4>
				<ul class="space-y-1.5">
					{#each changes as c (c.lessonId)}
						<li class="flex items-center gap-3 rounded-md bg-slate-800/70 px-3 py-2">
							<MasteryIcon level={c.to} size={26} />
							<span class="flex-1 text-slate-200">{lessonTitle(c.lessonId)}</span>
							<span class="text-xs {c.to > c.from ? 'text-emerald-300' : c.to < c.from ? 'text-rose-300' : 'text-slate-400'}">
								{#if c.to > c.from}▲ {MASTERY_NAMES[c.to]}{:else if c.to < c.from}▼ {MASTERY_NAMES[c.to]}{:else}{MASTERY_NAMES[c.to]}{/if}
							</span>
						</li>
					{/each}
				</ul>

				{#if missed.length}
					<h4 class="font-pixel mt-6 mb-2 text-[10px] text-slate-400 uppercase">Missed</h4>
					<ul class="space-y-3">
						{#each missed as m (m.q.id)}
							<li class="rounded-md border-2 border-rose-400/40 bg-rose-400/5 p-3 text-sm">
								<p class="text-slate-100"><Rich text={m.q.prompt} /></p>
								<p class="mt-1 text-slate-300"><Rich text={m.q.explain} /></p>
							</li>
						{/each}
					</ul>
				{/if}

				<div class="mt-5 flex flex-wrap justify-center gap-3">
					<Button variant="secondary" onclick={restart}>Retake</Button>
					<a href={resolve('/')} class="mbtn mbtn-blue">Back to map</a>
				</div>
			{/if}
		</div>
	{/if}
</section>

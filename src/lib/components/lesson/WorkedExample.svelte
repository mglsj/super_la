<script lang="ts">
	import { PencilLine } from '@lucide/svelte';
	import Rich from './Rich.svelte';

	interface Step {
		/** what this step does, e.g. "Eliminate" */
		label: string;
		/** the working, Rich text (may be multi-line) */
		text: string;
	}

	interface Props {
		title: string;
		/** the exam-style question, Rich text */
		problem: string;
		steps: Step[];
		/** the reusable recipe this example teaches, one short line per step */
		method?: string[];
		/** where the idea comes from, e.g. "after Strang, Example 2.3" */
		credit?: string;
	}

	let { title, problem, steps, method, credit }: Props = $props();

	let shown = $state(0);
</script>

<section class="my-6 rounded-xl border border-emerald-400/40 bg-emerald-400/5 p-4" aria-label={title}>
	<div class="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
		<PencilLine class="size-4" />
		Worked exam problem · {title}
	</div>
	<div class="text-[0.97rem] leading-relaxed text-slate-100"><Rich text={problem} /></div>

	{#if method?.length}
		<div class="mt-3 rounded-lg border border-slate-600/60 bg-slate-900/40 p-3 text-sm text-slate-300">
			<div class="mb-1 font-semibold text-slate-100">Method</div>
			<ol class="list-decimal space-y-0.5 pl-5">
				{#each method as m, i (i)}<li><Rich text={m} /></li>{/each}
			</ol>
		</div>
	{/if}

	<ol class="mt-3 space-y-3">
		{#each steps.slice(0, shown) as s, i (i)}
			<li class="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
				<div class="mb-1 text-xs font-semibold tracking-wide text-amber-300 uppercase">Step {i + 1}: {s.label}</div>
				<div class="text-[0.95rem] leading-relaxed text-slate-200"><Rich text={s.text} /></div>
			</li>
		{/each}
	</ol>

	<div class="mt-3 flex flex-wrap items-center gap-2">
		{#if shown < steps.length}
			<button type="button" class="mbtn mbtn-green" onclick={() => (shown += 1)}>
				{shown === 0 ? 'Try it first, then show step 1' : `Show step ${shown + 1}`}
			</button>
			<button type="button" class="mbtn mbtn-blue" onclick={() => (shown = steps.length)}>Show full solution</button>
		{:else}
			<button type="button" class="mbtn mbtn-blue" onclick={() => (shown = 0)}>Hide working</button>
		{/if}
		<span class="text-xs text-slate-400">{shown} / {steps.length} steps</span>
	</div>
	{#if credit}<p class="mt-2 text-xs text-slate-500">{credit}</p>{/if}
</section>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { progress } from '#lib/game/progress.svelte.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head><title>Past papers · Linear Algebra Lab</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<div class="font-pixel text-[10px] text-[#fbd000]">PAST PAPERS</div>
	<h1 class="font-pixel mt-2 text-lg leading-relaxed text-white">Exam practice</h1>
	<p class="mt-3 text-slate-300">
		Real papers, split into their parts, with hints that go one step at a time and model answers written the way a grader wants to see them. Do the twin paper afterwards to check the
		methods stuck.
	</p>
	<ul class="mt-6 space-y-3">
		{#each data.papers as p (p.id)}
			{@const done = progress.exercisesDone(p.questions.map((q) => q.id))}
			<li>
				<a href={resolve('/papers/[paper]', { paper: p.id })} class="block rounded-xl border-2 border-slate-600 bg-slate-900/40 p-4 hover:border-[#fbd000]">
					<div class="font-semibold text-slate-50">{p.title}</div>
					<div class="mt-1 text-sm text-slate-400">{p.marks} marks · {p.minutes} minutes · {done} of {p.questions.length} parts done</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

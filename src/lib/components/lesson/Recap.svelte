<script lang="ts">
	import Rich from './Rich.svelte';
	import { ListChecks } from '@lucide/svelte';

	let { points }: { points: string[] } = $props();
</script>

<section class="my-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-5">
	<h3 class="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider text-emerald-300 uppercase">
		<ListChecks class="size-4" /> Recap
	</h3>
	<ul class="list-disc space-y-1.5 pl-5 text-slate-200 marker:text-emerald-400">
		{#each points as p (p)}
			<li><Rich text={p} /></li>
		{/each}
	</ul>
</section>

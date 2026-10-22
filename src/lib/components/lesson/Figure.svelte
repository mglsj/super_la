<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		controls?: Snippet;
		caption?: string;
		/** max width in px, to keep square plots from getting huge */
		max?: number;
	}

	let { children, controls, caption, max = 560 }: Props = $props();
</script>

<figure class="my-6">
	<div
		class="mx-auto space-y-3 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-3"
		style="max-width: {max}px;"
	>
		{@render children()}
		{#if controls}
			<div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-1 pb-1 text-sm text-slate-300">
				{@render controls()}
			</div>
		{/if}
	</div>
	{#if caption}
		<figcaption class="mx-auto mt-2 text-center text-sm text-slate-400" style="max-width: {max}px;">
			{caption}
		</figcaption>
	{/if}
</figure>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Lightbulb, BookOpen, TriangleAlert, FlaskConical, Sigma } from '@lucide/svelte';

	interface Props {
		kind?: 'intuition' | 'definition' | 'theorem' | 'warning' | 'try';
		title?: string;
		children: Snippet;
	}

	let { kind = 'intuition', title, children }: Props = $props();

	const styles = {
		intuition: { Icon: Lightbulb, label: 'Intuition', cls: 'border-sky-400/40 bg-sky-400/5 text-sky-300' },
		definition: { Icon: BookOpen, label: 'Definition', cls: 'border-violet-400/40 bg-violet-400/5 text-violet-300' },
		theorem: { Icon: Sigma, label: 'Theorem', cls: 'border-amber-300/40 bg-amber-300/5 text-amber-200' },
		warning: { Icon: TriangleAlert, label: 'Watch out', cls: 'border-rose-400/40 bg-rose-400/5 text-rose-300' },
		try: { Icon: FlaskConical, label: 'Try it', cls: 'border-emerald-400/40 bg-emerald-400/5 text-emerald-300' }
	} as const;

	let s = $derived(styles[kind]);
</script>

<aside class="my-5 rounded-xl border p-4 {s.cls}">
	<div class="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
		<s.Icon class="size-4" />
		{title ?? s.label}
	</div>
	<div class="space-y-2 text-[0.97rem] leading-relaxed text-slate-200">
		{@render children()}
	</div>
</aside>

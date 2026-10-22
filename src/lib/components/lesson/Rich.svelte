<script lang="ts">
	import Tex from './Tex.svelte';

	interface Props {
		/** text with inline $math$ and **bold** */
		text: string;
	}

	let { text }: Props = $props();

	type Part = { kind: 'text' | 'math' | 'bold'; value: string };
	let parts = $derived.by(() => {
		const out: Part[] = [];
		const re = /\$([^$]+)\$|\*\*([^*]+)\*\*/g;
		let last = 0;
		for (const m of text.matchAll(re)) {
			if (m.index > last) out.push({ kind: 'text', value: text.slice(last, m.index) });
			out.push(m[1] !== undefined ? { kind: 'math', value: m[1] } : { kind: 'bold', value: m[2] });
			last = m.index + m[0].length;
		}
		if (last < text.length) out.push({ kind: 'text', value: text.slice(last) });
		return out;
	});
</script>

{#each parts as p, i (i)}{#if p.kind === 'math'}<Tex tex={p.value} />{:else if p.kind === 'bold'}<strong
			class="font-semibold text-slate-50">{p.value}</strong
		>{:else}{p.value}{/if}{/each}

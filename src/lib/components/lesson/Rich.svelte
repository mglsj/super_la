<script lang="ts">
	import Tex from './Tex.svelte';

	interface Props {
		/**
		 * text with inline $math$, $$display math$$ and **bold**. Multi-line text is laid out in blocks:
		 * blank lines separate paragraphs, lines starting "- " are bullets, lines starting "|" form a table.
		 */
		text: string;
	}

	let { text }: Props = $props();

	type Part = { kind: 'text' | 'math' | 'display' | 'bold'; value: string };
	type Block =
		| { kind: 'para'; lines: Part[][] }
		| { kind: 'list'; items: Part[][] }
		| { kind: 'table'; head: Part[][]; rows: Part[][][] };

	function inline(s: string): Part[] {
		const out: Part[] = [];
		const re = /\$\$([^$]+)\$\$|\$([^$]+)\$|\*\*([^*]+)\*\*/g;
		let last = 0;
		for (const m of s.matchAll(re)) {
			if (m.index > last) out.push({ kind: 'text', value: s.slice(last, m.index) });
			if (m[1] !== undefined) out.push({ kind: 'display', value: m[1] });
			else if (m[2] !== undefined) out.push({ kind: 'math', value: m[2] });
			else out.push({ kind: 'bold', value: m[3] });
			last = m.index + m[0].length;
		}
		if (last < s.length) out.push({ kind: 'text', value: s.slice(last) });
		return out;
	}

	const cells = (line: string) =>
		line
			.trim()
			.replace(/^\||\|$/g, '')
			.split('|')
			.map((c) => inline(c.trim()));

	function blocks(s: string): Block[] {
		const out: Block[] = [];
		for (const chunk of s.split(/\n\s*\n/)) {
			const lines = chunk.split('\n').filter((l) => l.trim() !== '');
			if (!lines.length) continue;
			if (lines.every((l) => l.trim().startsWith('|'))) {
				const body = lines.filter((l) => !/^\s*\|[\s|:-]+\|\s*$/.test(l));
				out.push({ kind: 'table', head: cells(body[0]), rows: body.slice(1).map(cells) });
			} else if (lines.every((l) => l.trim().startsWith('- '))) {
				out.push({ kind: 'list', items: lines.map((l) => inline(l.trim().slice(2))) });
			} else {
				// a paragraph may open with text and then switch to bullets
				const para: Part[][] = [];
				const items: Part[][] = [];
				for (const l of lines) (l.trim().startsWith('- ') ? items : para).push(inline(l.trim().replace(/^- /, '')));
				if (para.length) out.push({ kind: 'para', lines: para });
				if (items.length) out.push({ kind: 'list', items });
			}
		}
		return out;
	}

	let multiline = $derived(text.includes('\n'));
	let parts = $derived(multiline ? [] : inline(text));
	let laid = $derived(multiline ? blocks(text) : []);
</script>

{#snippet run(ps: Part[])}{#each ps as p, i (i)}{#if p.kind === 'math'}<Tex tex={p.value} />{:else if p.kind === 'display'}<span
				class="block overflow-x-auto py-1"><Tex display tex={p.value} /></span
			>{:else if p.kind === 'bold'}<strong class="font-semibold text-slate-50">{p.value}</strong>{:else}{p.value}{/if}{/each}{/snippet}

{#if multiline}
	{#each laid as b, i (i)}
		{#if b.kind === 'para'}
			<span class="mb-2 block last:mb-0"
				>{#each b.lines as l, j (j)}{#if j > 0}<br />{/if}{@render run(l)}{/each}</span
			>
		{:else if b.kind === 'list'}
			<span class="mb-2 block space-y-1 last:mb-0">
				{#each b.items as it, j (j)}
					<span class="flex gap-2"><span aria-hidden="true" class="text-amber-300">•</span><span>{@render run(it)}</span></span>
				{/each}
			</span>
		{:else}
			<span class="mb-2 block overflow-x-auto last:mb-0">
				<table class="text-sm">
					<thead>
						<tr>{#each b.head as c, j (j)}<th class="border-b border-slate-600 px-2 py-1 text-left">{@render run(c)}</th>{/each}</tr>
					</thead>
					<tbody>
						{#each b.rows as r, j (j)}
							<tr>{#each r as c, k (k)}<td class="border-b border-slate-700/60 px-2 py-1">{@render run(c)}</td>{/each}</tr>
						{/each}
					</tbody>
				</table>
			</span>
		{/if}
	{/each}
{:else}
	{@render run(parts)}
{/if}

<script lang="ts">
	import katex from 'katex';
	import 'katex/dist/katex.min.css';

	interface Props {
		tex: string;
		display?: boolean;
	}

	let { tex, display = false }: Props = $props();
	let html = $derived(katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore' }));
</script>

{#if display}
	<span class="my-3 block overflow-x-auto overflow-y-hidden text-center">{@html html}</span>
{:else}
	<span>{@html html}</span>
{/if}

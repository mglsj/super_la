<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { progress } from '#lib/game/progress.svelte.js';
	import TopBar from '#lib/components/game/TopBar.svelte';
	import BadgeToast from '#lib/components/game/BadgeToast.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => progress.init());

	// the map draws its own panels over the sky; every other page sits in one
	let framed = $derived(page.route.id !== '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Linear Algebra Lab</title>
</svelte:head>

<TopBar />
<main class="relative z-10 mx-auto w-full max-w-5xl px-3 pt-6 pb-24 sm:px-4">
	{#if framed}
		<div class="panel p-4 sm:p-8">
			{@render children()}
		</div>
	{:else}
		{@render children()}
	{/if}
</main>
<BadgeToast />

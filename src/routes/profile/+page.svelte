<script lang="ts">
	import { BADGES } from '#lib/game/badges.js';
	import { progress } from '#lib/game/progress.svelte.js';
	import PixelIcon from '#lib/components/game/PixelIcon.svelte';
	import { Button } from '#lib/components/ui/button/index.js';

	let message = $state('');
	let fileInput: HTMLInputElement | undefined = $state();

	function download() {
		const blob = new Blob([progress.export()], { type: 'application/json' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'linear-algebra-progress.json';
		a.click();
		URL.revokeObjectURL(a.href);
	}

	async function upload(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0];
		if (!file) return;
		message = progress.import(await file.text()) ? 'Progress imported.' : 'That file is not a valid progress export.';
	}

	function reset() {
		if (confirm('Erase all progress on this device? This cannot be undone.')) {
			progress.reset();
			message = 'Progress erased.';
		}
	}

	let counts = $derived(progress.counts(progress.readyIds));
	let lv = $derived(progress.level);
	const stats = $derived([
		{ label: 'Level', value: lv.level },
		{ label: 'Coins', value: progress.data.xp },
		{ label: 'Proficient+', value: counts[3] + counts[4] },
		{ label: 'Mastered', value: counts[4] },
		{ label: 'Streak', value: progress.streak },
		{ label: 'Best streak', value: progress.data.streak.best }
	]);
</script>

<svelte:head><title>Profile · Linear Algebra Lab</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<h1 class="font-pixel mb-6 text-lg text-white">PLAYER</h1>

	<dl class="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each stats as s (s.label)}
			<div class="rounded-md border-[3px] border-slate-600 bg-slate-800/60 p-4">
				<dt class="font-pixel text-[9px] text-slate-400 uppercase">{s.label}</dt>
				<dd class="font-pixel mt-2 text-xl text-[#fbd000] tabular-nums">{s.value}</dd>
			</div>
		{/each}
	</dl>

	<h2 class="font-pixel mb-3 text-sm text-[#fbd000]">BADGES</h2>
	<ul class="mb-10 grid gap-3 sm:grid-cols-2">
		{#each BADGES as b (b.id)}
			{@const got = progress.data.badges[b.id]}
			<li class="flex items-center gap-3 rounded-md border-[3px] p-3 {got ? 'border-[#fbd000] bg-[#fbd000]/5' : 'border-slate-700'}">
				<PixelIcon name={b.icon} size={36} dim={!got} />
				<div>
					<div class="font-semibold text-slate-100">{b.title}</div>
					<div class="text-sm text-slate-400">{b.description}</div>
				</div>
			</li>
		{/each}
	</ul>

	<h2 class="font-pixel mb-3 text-sm text-[#fbd000]">YOUR DATA</h2>
	<p class="mb-3 text-sm text-slate-400">
		Progress is stored only in this browser. Export it to back it up or move it to another device.
	</p>
	<div class="flex flex-wrap gap-3">
		<Button variant="secondary" onclick={download}>Export</Button>
		<Button variant="secondary" onclick={() => fileInput?.click()}>Import</Button>
		<input bind:this={fileInput} type="file" accept="application/json" class="hidden" onchange={upload} />
		<Button onclick={reset}>Reset</Button>
	</div>
	{#if message}<p role="status" class="mt-3 text-sm text-sky-300">{message}</p>{/if}
</div>

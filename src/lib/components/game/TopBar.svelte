<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { progress } from '#lib/game/progress.svelte.js';
	import PixelIcon from './PixelIcon.svelte';

	const links = [
		{ id: '/', href: resolve('/'), label: 'Map' },
		{ id: '/review', href: resolve('/review'), label: 'Review' },
		{ id: '/challenge', href: resolve('/challenge'), label: 'Challenge' },
		{ id: '/playground', href: resolve('/playground'), label: 'Lab' },
		{ id: '/profile', href: resolve('/profile'), label: 'Me' }
	];

	let lv = $derived(progress.level);
	let due = $derived(progress.dueReviewIds.length);
	const isActive = (id: string) =>
		id === '/' ? page.route.id === '/' || !!page.route.id?.startsWith('/learn') : !!page.route.id?.startsWith(id);
</script>

<header class="sticky top-0 z-40 border-b-4 border-[#1a1a1a] bg-[#e52521] text-white shadow-[0_4px_0_rgba(0,0,0,0.25)]">
	<div class="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
		<a href={resolve('/')} class="flex items-center gap-2" aria-label="Linear Algebra Lab home">
			<PixelIcon name="mushroom" size={28} />
			<span class="font-pixel hidden text-[11px] leading-tight sm:block">
				LINEAR<br />ALGEBRA
			</span>
		</a>

		<nav class="font-pixel ml-2 hidden items-center gap-1 text-[10px] md:flex" aria-label="Main">
			{#each links as l (l.href)}
				<a
					href={l.href}
					aria-current={isActive(l.id) ? 'page' : undefined}
					class="relative rounded px-2.5 py-2 uppercase {isActive(l.id)
						? 'bg-[#1a1a1a] text-[#fbd000]'
						: 'text-white/90 hover:bg-white/15'}"
				>
					{l.label}
					{#if l.id === '/review' && due > 0}
						<span class="ml-1 rounded bg-[#fbd000] px-1 text-[#1a1a1a]">{due}</span>
					{/if}
				</a>
			{/each}
		</nav>

		<div class="font-pixel ml-auto flex items-center gap-4 text-[11px]" aria-label="Your stats">
			<span class="flex items-center gap-1.5" title="Coins">
				<PixelIcon name="coin" size={20} />×{String(progress.data.xp).padStart(3, '0')}
			</span>
			<span class="flex items-center gap-1.5" title="{lv.into} / {lv.span} coins to next level">
				LV {lv.level}
				<span class="pbar gold hidden w-16 sm:block" style="height: 12px;" role="progressbar" aria-label="Progress to next level" aria-valuenow={lv.into} aria-valuemax={lv.span}>
					<i style="width: {(lv.into / lv.span) * 100}%"></i>
				</span>
			</span>
			<span class="flex items-center gap-1.5" title="Day streak">
				<PixelIcon name="star" size={20} dim={progress.streak === 0} />×{progress.streak}
			</span>
		</div>
	</div>
	<nav class="font-pixel flex justify-around border-t-4 border-[#1a1a1a] bg-[#b81d1a] text-[9px] md:hidden" aria-label="Main (mobile)">
		{#each links as l (l.href)}
			<a href={l.href} class="flex-1 py-2.5 text-center uppercase {isActive(l.id) ? 'text-[#fbd000]' : 'text-white/90'}">
				{l.label}{#if l.id === '/review' && due > 0}<span class="text-[#fbd000]"> {due}</span>{/if}
			</a>
		{/each}
	</nav>
</header>

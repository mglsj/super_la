<script lang="ts" module>
	// Choices are shuffled so the right answer is not always in the same place.
	// The order is remembered per question so a retry shows the same layout.
	const orders = new Map<string, number[]>();
	function orderFor(id: string, n: number): number[] {
		let o = orders.get(id);
		if (!o || o.length !== n) {
			o = Array.from({ length: n }, (_, i) => i);
			for (let i = n - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[o[i], o[j]] = [o[j], o[i]];
			}
			orders.set(id, o);
		}
		return o;
	}
</script>

<script lang="ts">
	import Rich from '#lib/components/lesson/Rich.svelte';
	import Plane2D from '#lib/viz/Plane2D.svelte';
	import DragVector from '#lib/viz/DragVector.svelte';
	import Dot from '#lib/viz/Dot.svelte';
	import TransformGrid from '#lib/viz/TransformGrid.svelte';
	import { C } from '#lib/viz/theme.js';
	import type { Question } from '#lib/content/types.js';
	import { Button } from '#lib/components/ui/button/index.js';

	interface Props {
		q: Question;
		/** 'idle' while answering; parent flips to right/wrong after onsubmit */
		status: 'idle' | 'right' | 'wrong';
		onsubmit: (correct: boolean) => void;
	}

	let { q, status, onsubmit }: Props = $props();

	let locked = $derived(status === 'right');
	let order = $derived(q.type === 'mcq' ? orderFor(q.id, q.choices.length) : []);

	// local answer state (parent remounts with {#key} to reset)
	let choice = $state<number | null>(null);
	let text = $state('');
	let comps = $state<string[]>(['', '', '']);
	let tip = $state<number[]>(untrackStart());
	let iHat = $state<number[]>([1, 0]);
	let jHat = $state<number[]>([0, 1]);

	function untrackStart(): number[] {
		return q.type === 'goal-vector' ? [...(q.start ?? [1, 1])] : [0, 0];
	}

	function num(s: string): number {
		const t = s.trim();
		const frac = t.match(/^(-?[\d.]+)\s*\/\s*(-?[\d.]+)$/);
		return frac ? parseFloat(frac[1]) / parseFloat(frac[2]) : parseFloat(t);
	}

	let ready = $derived.by(() => {
		if (q.type === 'mcq') return choice !== null;
		if (q.type === 'numeric') return text.trim() !== '' && !Number.isNaN(num(text));
		if (q.type === 'vector') return comps.slice(0, q.answer.length).every((c) => !Number.isNaN(num(c)));
		return true;
	});

	function check() {
		let ok = false;
		if (q.type === 'mcq') ok = choice === q.answer;
		else if (q.type === 'numeric') ok = Math.abs(num(text) - q.answer) <= (q.tol ?? 0.01);
		else if (q.type === 'vector')
			ok = q.answer.every((a, i) => Math.abs(num(comps[i]) - a) <= (q.tol ?? 0.01));
		else if (q.type === 'goal-vector')
			ok = Math.hypot(tip[0] - q.target[0], tip[1] - q.target[1]) <= (q.tol ?? 0.3);
		else if (q.type === 'goal-basis') {
			const tol = q.tol ?? 0.3;
			ok =
				Math.hypot(iHat[0] - q.target[0][0], iHat[1] - q.target[1][0]) <= tol &&
				Math.hypot(jHat[0] - q.target[0][1], jHat[1] - q.target[1][1]) <= tol;
		}
		onsubmit(ok);
	}

	let goalMatrix = $derived([
		[iHat[0], jHat[0]],
		[iHat[1], jHat[1]]
	]);
</script>

<div class="space-y-4">
	<p class="text-lg leading-relaxed text-slate-100"><Rich text={q.prompt} /></p>

	{#if q.type === 'mcq'}
		<div class="grid gap-2" role="radiogroup" aria-label="Answer choices">
			{#each order as i (i)}
				{@const c = q.choices[i]}
				<button
					type="button"
					role="radio"
					aria-checked={choice === i}
					disabled={locked}
					onclick={() => (choice = i)}
					class="rounded-xl border px-4 py-3 text-left transition focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none
						{choice === i ? 'border-sky-400 bg-sky-400/10 text-white' : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500'}
						{status === 'right' && i === q.answer ? 'border-emerald-400 bg-emerald-400/10' : ''}"
				>
					<Rich text={c} />
				</button>
			{/each}
		</div>
	{:else if q.type === 'numeric'}
		<input
			type="text"
			inputmode="decimal"
			bind:value={text}
			disabled={locked}
			placeholder="Your answer (e.g. 2.5 or 5/2)"
			aria-label="Numeric answer"
			onkeydown={(e) => e.key === 'Enter' && ready && status !== 'right' && check()}
			class="w-full max-w-xs rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 font-mono text-slate-100 outline-none focus:ring-2 focus:ring-sky-400"
		/>
	{:else if q.type === 'vector'}
		<div class="flex items-center gap-2">
			<span class="text-2xl text-slate-500">(</span>
			{#each q.answer as _, i (i)}
				<input
					type="text"
					inputmode="decimal"
					bind:value={comps[i]}
					disabled={locked}
					aria-label="Component {i + 1}"
					class="w-20 rounded-lg border border-slate-600 bg-slate-900 px-2 py-2 text-center font-mono text-slate-100 outline-none focus:ring-2 focus:ring-sky-400"
				/>
				{#if i < q.answer.length - 1}<span class="text-slate-500">,</span>{/if}
			{/each}
			<span class="text-2xl text-slate-500">)</span>
		</div>
	{:else if q.type === 'goal-vector'}
		<div class="mx-auto max-w-md">
			<Plane2D xmin={-6} xmax={6} ymin={-6} ymax={6} label="Drag the arrow tip onto the target">
				{#if !q.hideTarget}<Dot at={q.target} color={C.yellow} hollow r={9} label="target" />{/if}
				<DragVector bind:value={tip} color={C.blue} label="v" snap={0.5} name="v" />
			</Plane2D>
			<p class="mt-1 text-center font-mono text-sm text-slate-400">
				v = ({tip[0].toFixed(1)}, {tip[1].toFixed(1)})
			</p>
		</div>
	{:else if q.type === 'goal-basis'}
		<div class="mx-auto max-w-md">
			<Plane2D xmin={-6} xmax={6} ymin={-6} ymax={6} grid={false} label="Drag the basis arrows to build the matrix">
				<TransformGrid matrix={goalMatrix} basis={false} square />
				<DragVector bind:value={iHat} color={C.iHat} label="î" snap={0.5} name="i-hat" />
				<DragVector bind:value={jHat} color={C.jHat} label="ĵ" snap={0.5} name="j-hat" />
			</Plane2D>
			<p class="mt-1 text-center font-mono text-sm text-slate-400">
				A = [{iHat[0].toFixed(1)} {jHat[0].toFixed(1)}; {iHat[1].toFixed(1)} {jHat[1].toFixed(1)}]
			</p>
		</div>
	{/if}

	{#if status === 'idle'}
		<Button onclick={check} disabled={!ready}>Check</Button>
	{/if}
</div>

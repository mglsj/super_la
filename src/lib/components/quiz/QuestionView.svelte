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
	import { diagnose } from '#lib/game/diagnose.js';
	import type { Question } from '#lib/content/types.js';
	import { Button } from '#lib/components/ui/button/index.js';

	interface Props {
		q: Question;
		/** 'idle' while answering; parent flips to right/wrong after onsubmit */
		status: 'idle' | 'right' | 'wrong';
		/** true once the answer is solved or revealed: show every explanation */
		reveal?: boolean;
		onsubmit: (correct: boolean) => void;
	}

	let { q, status, reveal = false, onsubmit }: Props = $props();

	let locked = $derived(status === 'right');
	let order = $derived(q.type === 'mcq' ? orderFor(q.id, q.choices.length) : []);

	// local answer state (parent remounts with {#key} to reset)
	let choice = $state<number | null>(null);
	let text = $state('');
	let comps = $state<string[]>(['', '', '']);
	let tip = $state<number[]>(untrackStart());
	let iHat = $state<number[]>([1, 0]);
	let jHat = $state<number[]>([0, 1]);
	let work = $state('');
	let shown = $state(false);

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

	/** why the answer just given is wrong, when we can tell */
	let diag = $derived(
		status === 'wrong' && !reveal && q.type !== 'mcq' // mcq already shows the note under the chosen choice
			? diagnose(q, {
					choice,
					value: q.type === 'numeric' ? num(text) : null,
					parts: q.type === 'vector' ? comps.slice(0, q.answer.length).map(num) : null
				})
			: null
	);
</script>

<div class="space-y-4">
	<p class="text-lg leading-relaxed text-slate-100"><Rich text={q.prompt} /></p>

	{#if q.type === 'mcq'}
		<div class="grid gap-2" role="radiogroup" aria-label="Answer choices">
			{#each order as i (i)}
				{@const c = q.choices[i]}
				{@const note = q.notes?.[i]}
				<div>
					<button
						type="button"
						role="radio"
						aria-checked={choice === i}
						disabled={locked}
						onclick={() => (choice = i)}
						class="w-full rounded-xl border px-4 py-3 text-left transition focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none
							{reveal && i === q.answer
							? 'border-emerald-400 bg-emerald-400/10 text-white'
							: status === 'wrong' && choice === i
								? 'border-rose-400 bg-rose-400/10 text-white'
								: choice === i
									? 'border-sky-400 bg-sky-400/10 text-white'
									: 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500'}"
					>
						<span class="mr-1 font-semibold">{reveal && i === q.answer ? '✓' : reveal || (status === 'wrong' && choice === i) ? '✗' : ''}</span><Rich text={c} />
					</button>
					{#if note && (reveal || (status === 'wrong' && choice === i))}
						<p class="mt-1 rounded-md px-3 py-2 text-sm leading-relaxed {i === q.answer ? 'bg-emerald-400/10 text-emerald-100' : 'bg-rose-400/10 text-rose-100'}">
							<span class="font-semibold">{i === q.answer ? 'Why this is right: ' : 'Why not: '}</span><Rich text={note} />
						</p>
					{/if}
				</div>
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
	{:else if q.type === 'open'}
		<div class="space-y-3">
			<label class="block text-sm text-slate-400" for="work-{q.id}">Work it out here first (this is just for you, it is not saved or graded):</label>
			<textarea
				id="work-{q.id}"
				bind:value={work}
				rows="4"
				disabled={status !== 'idle'}
				class="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:ring-2 focus:ring-sky-400"
			></textarea>
			{#if !shown && status === 'idle'}
				<Button variant="secondary" onclick={() => (shown = true)}>Show the model solution</Button>
			{/if}
			{#if shown || status !== 'idle'}
				<div class="rounded-md border-[3px] border-violet-400/50 bg-violet-400/10 p-3 text-sm leading-relaxed whitespace-pre-line text-slate-100">
					<span class="font-pixel mb-2 block text-[10px] text-violet-300">MODEL SOLUTION</span>
					<Rich text={q.solution} />
				</div>
			{/if}
			{#if shown && status === 'idle'}
				<p class="text-sm text-slate-300">Compare it with your work. Be honest: did you reach the same result for the same reasons?</p>
				<div class="flex flex-wrap gap-2">
					<Button onclick={() => onsubmit(true)}>I solved it</Button>
					<Button variant="secondary" onclick={() => onsubmit(false)}>Not yet, I'll come back</Button>
				</div>
			{/if}
		</div>
	{/if}

	{#if diag}
		<p class="rounded-md bg-amber-400/10 px-3 py-2 text-sm leading-relaxed text-amber-100">
			<span class="font-semibold">Look closer: </span><Rich text={diag} />
		</p>
	{/if}

	{#if status === 'idle' && q.type !== 'open'}
		<Button onclick={check} disabled={!ready}>Check</Button>
	{/if}
</div>

<script lang="ts">
	interface Props {
		value: number;
		min?: number;
		max?: number;
		step?: number;
		label: string;
		/** shown after the label, e.g. current value */
		display?: string;
	}

	let { value = $bindable(), min = -3, max = 3, step = 0.1, label, display }: Props = $props();
</script>

<label class="flex items-center gap-2">
	<span class="min-w-[3.5rem] font-medium text-slate-300">{label}</span>
	<input type="range" bind:value {min} {max} {step} class="w-36 accent-sky-400" />
	<span class="w-12 font-mono text-xs text-slate-400 tabular-nums">{display ?? value.toFixed(1)}</span>
</label>

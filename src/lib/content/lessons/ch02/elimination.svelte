<script lang="ts">
	import ElimStepper from '#lib/components/lesson/ElimStepper.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
</script>

<p>
	You could solve a system by guessing, but elimination is a procedure that always works. The idea: <strong class="text-slate-50">change
	the equations without changing the solution</strong>, until the answer is obvious.
</p>

<h2>Three safe moves</h2>
<Callout kind="theorem" title="Elementary row operations">
	<p>These never change the set of solutions:</p>
	<ul class="list-disc space-y-1 pl-6">
		<li><strong class="text-slate-50">Swap</strong> two rows.</li>
		<li><strong class="text-slate-50">Scale</strong> a row by a nonzero number.</li>
		<li><strong class="text-slate-50">Add</strong> a multiple of one row to another.</li>
	</ul>
</Callout>
<p>
	Why are they safe? Swapping only reorders equations. Scaling an equation by <Tex tex={'k \\ne 0'} /> keeps the same line. Adding a multiple of one
	equation to another produces a new equation that every solution of the old pair still satisfies, and you can undo it by subtracting.
</p>

<h2>Watch it happen</h2>
<p>
	Step through the system <Tex tex={'x + y = 4,\\ x - y = 2'} />. Each row operation rewrites the lines, but the yellow solution point never moves. The goal is to
	reach horizontal and vertical lines, which read off <Tex tex="x" /> and <Tex tex="y" /> directly.
</p>

<Figure caption="Rows are lines. Row operations tilt and shift them, but all of them keep passing through the same solution point." max={620}>
	<ElimStepper aug={[[1, 1, 4], [1, -1, 2]]} geometry />
</Figure>

<h2>A worked example</h2>
<p>
	Solve <Tex tex={'2x + y = 5,\\ x + 3y = 5'} />. Try it yourself, then check with the stepper.
</p>
<Figure caption="Step through the solution of 2x + y = 5 and x + 3y = 5." max={620}>
	<ElimStepper aug={[[2, 1, 5], [1, 3, 5]]} geometry />
</Figure>

<Callout kind="intuition">
	<p>
		Elimination goes column by column: use the first row to clear the first unknown from all the rows below, then move to the next column.
		The leading nonzero entry you use at each stage is called a <em>pivot</em>, and it is the star of the next lesson.
	</p>
</Callout>

<Recap
	points={[
		'Swap, scale and add-a-multiple are the three **row operations**; they preserve the solution set.',
		'Eliminate column by column, using a nonzero **pivot** each time.',
		'Geometrically the lines move but keep crossing at the same point.'
	]}
/>

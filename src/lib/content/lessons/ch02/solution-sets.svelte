<script lang="ts">
	import Scene3D, { type SceneApi } from '#lib/viz/Scene3D.svelte';
	import { addAxes, makeArrow, makePlane, makeSphere, setArrow, HEX } from '#lib/viz/three-helpers.js';
	import ElimStepper from '#lib/components/lesson/ElimStepper.svelte';
	import Tex from '#lib/components/lesson/Tex.svelte';
	import Callout from '#lib/components/lesson/Callout.svelte';
	import Figure from '#lib/components/lesson/Figure.svelte';
	import Recap from '#lib/components/lesson/Recap.svelte';
	import Slider from '#lib/components/lesson/Slider.svelte';
	import WorkedExample from '#lib/components/lesson/WorkedExample.svelte';

	const tall = {
		problem:
			'For real $k$ and $c$ consider the system of three equations in two unknowns\n$$x + y = 2,\\qquad x - y = 0,\\qquad 2x + ky = c.$$\nClassify all pairs $(k, c)$ according to whether the system has a unique solution, no solution, or infinitely many solutions.',
		method: [
			'Count first. With $n$ unknowns there are at most $n$ pivots. Here $n = 2$, so as soon as there are $2$ pivots no variable is free: **infinitely many is impossible**.',
			'With more unknowns than equations (a wide system) the opposite holds: a free variable always exists, so **unique is impossible**.',
			'Eliminate as usual, keeping the parameters. Extra equations end up as rows $[0\\ 0\\mid\\text{something}]$, and that something decides consistent versus none.'
		],
		steps: [
			{
				label: 'Eliminate',
				text: '$\\left[\\begin{array}{cc|c}1&1&2\\\\1&-1&0\\\\2&k&c\\end{array}\\right]\\xrightarrow[R_3 - 2R_1]{R_2 - R_1}\\left[\\begin{array}{cc|c}1&1&2\\\\0&-2&-2\\\\0&k - 2&c - 4\\end{array}\\right]$'
			},
			{
				label: 'Clear the last row',
				text: '$R_3 + \\tfrac{k - 2}{2}R_2$ (no division by a parameter, only by the pivot $-2$): the right-hand side becomes $(c - 4) - (k - 2) = c - k - 2$, so the last row is $[0\\ 0\\mid c - k - 2]$.'
			},
			{
				label: 'Classify',
				text: 'The two pivots $1, -2$ never vanish, so rank $= 2 =$ number of unknowns: there is never a free variable.\n- $c = k + 2$: consistent, **unique solution** $x = y = 1$.\n- $c\\ne k + 2$: the last row says $0 = c - k - 2\\ne0$: **no solution**.\n- Infinitely many: **never**.'
			},
			{
				label: 'Sanity check',
				text: 'The first two equations alone force $x = y = 1$. The third then says $2 + k = c$. So it holds exactly when $c = k + 2$ ✓. Geometrically: three lines in the plane, and the third passes through the meeting point $(1,1)$ of the first two only when $c = k + 2$.'
			}
		]
	};

	const param = {
		problem:
			'For real parameters $k$ and $\\gamma$ consider $A_k\\mathbf x = \\mathbf b_\\gamma$ with $A_k = \\begin{bmatrix}1&2&1\\\\0&k&1\\\\1&2&2\\end{bmatrix}$, $\\mathbf b_\\gamma = \\begin{bmatrix}1\\\\3\\\\\\gamma\\end{bmatrix}$.\n(a) Classify all pairs $(k,\\gamma)$: unique solution, no solution, or infinitely many.\n(b) In the infinite case write the complete solution as a particular solution plus null-space vectors.\n(c) For $k = 0$ give a basis of $N(A_0)$, the rank of $A_0$, and check rank–nullity.',
		method: [
			'Write the augmented matrix $[A\\mid\\mathbf b]$ and eliminate, keeping the parameters as letters. **Never divide by an expression that could be $0$.**',
			'Look for a pivot that depends on a parameter. Split into cases: that pivot $\\ne0$ and $=0$.',
			'Pivot in every column (square case) gives a **unique** solution, for every right-hand side.',
			'If a row becomes $[0\\ 0\\ 0\\mid c]$: $c\\ne0$ means **no solution**; $c = 0$ means the row is harmless, and a column without a pivot gives a free variable, hence **infinitely many**.',
			'Infinite case: set the free variable to $s$, back-substitute: $\\mathbf x = \\mathbf x_p + s\\,\\mathbf n$. Check both $A\\mathbf x_p = \\mathbf b$ and $A\\mathbf n = \\mathbf 0$.'
		],
		steps: [
			{
				label: 'Eliminate',
				text: '$\\left[\\begin{array}{ccc|c}1&2&1&1\\\\0&k&1&3\\\\1&2&2&\\gamma\\end{array}\\right]\\xrightarrow{R_3 - R_1}\\left[\\begin{array}{ccc|c}1&2&1&1\\\\0&k&1&3\\\\0&0&1&\\gamma - 1\\end{array}\\right]$.\nThe second pivot is $k$, which can vanish. (Check: $\\det A_k = k$.)'
			},
			{
				label: 'Case k ≠ 0',
				text: 'Pivots $1, k, 1$ in all three columns, so a **unique solution for every $\\gamma$**. Back-substituting: $x_3 = \\gamma - 1$, $x_2 = \\dfrac{3 - x_3}{k} = \\dfrac{4 - \\gamma}{k}$, $x_1 = 1 - 2x_2 - x_3$.'
			},
			{
				label: 'Case k = 0',
				text: 'Row 2 is now $[0\\ 0\\ 1\\mid 3]$ and row 3 is $[0\\ 0\\ 1\\mid\\gamma - 1]$. $R_3 - R_2$ gives $[0\\ 0\\ 0\\mid\\gamma - 4]$.\n- $\\gamma\\ne4$: the row says $0 = \\gamma - 4\\ne0$: **no solution**.\n- $\\gamma = 4$: the row is $0 = 0$; column 2 has no pivot, so $x_2$ is free: **infinitely many**.'
			},
			{
				label: 'Complete solution (k = 0, γ = 4)',
				text: 'Equations left: $x_1 + 2x_2 + x_3 = 1$ and $x_3 = 3$. Set $x_2 = s$: $x_1 = 1 - 2s - 3 = -2 - 2s$.\n$$\\mathbf x = \\begin{bmatrix}-2\\\\0\\\\3\\end{bmatrix} + s\\begin{bmatrix}-2\\\\1\\\\0\\end{bmatrix},\\quad s\\in\\mathbb R.$$\nCheck: $A_0(-2,0,3) = (-2 + 3,\\ 3,\\ -2 + 6) = (1,3,4)$ ✓ and $A_0(-2,1,0) = (0,0,0)$ ✓.'
			},
			{
				label: 'Null space and rank–nullity (k = 0)',
				text: '$A_0\\mathbf x = \\mathbf 0$ reduces to $x_1 + 2x_2 + x_3 = 0$, $x_3 = 0$, so $x_1 = -2x_2$: basis of $N(A_0)$ is $\\{(-2,1,0)\\}$, nullity $1$.\nPivots in columns 1 and 3, so $\\operatorname{rank}A_0 = 2$. Rank–nullity: $2 + 1 = 3$ = number of columns ✓.'
			}
		]
	};

	// x + y + z = 3 and x - y = 1  ->  (t, t-1, 4-2t)
	let t = $state(1);
	const p0 = [1, 0, 2];
	const dir = [1, 1, -2];

	function build({ THREE, scene }: SceneApi) {
		addAxes(THREE, scene, 3);
		const n1 = [1, 1, 1];
		const n2 = [1, -1, 0];
		const pl1 = makePlane(THREE, n1, 8, HEX.yellow);
		pl1.position.set(1, 1, 1); // n1 . x = 3
		const pl2 = makePlane(THREE, n2, 8, HEX.purple);
		pl2.position.set(0.5, -0.5, 0); // n2 . x = 1
		const ball = makeSphere(THREE, p0, HEX.teal, 0.14);
		const d = makeArrow(THREE, [0, 0, 0], p0, HEX.teal);
		// the whole solution line
		// drawn as a thick tube so it stays visible against the translucent planes
		const [a, b] = [-1, 3].map((s) => new THREE.Vector3(...p0.map((x, i) => x + (s - 1) * dir[i])));
		const axis = b.clone().sub(a);
		const line = new THREE.Mesh(
			new THREE.CylinderGeometry(0.07, 0.07, axis.length(), 16),
			new THREE.MeshBasicMaterial({ color: HEX.jHat, depthTest: false })
		);
		line.renderOrder = 10;
		line.position.copy(a.clone().add(b).multiplyScalar(0.5));
		line.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.normalize());
		(ball.material as import('three').MeshBasicMaterial).depthTest = false;
		ball.renderOrder = 11;
		scene.add(pl1, pl2, ball, d, line);
		return {
			update() {
				const pt = p0.map((x, i) => x + (t - 1) * dir[i]);
				ball.position.set(pt[0], pt[1], pt[2]);
				setArrow(THREE, d, [0, 0, 0], pt);
			}
		};
	}
</script>

<p>
	What do the infinitely many solutions look like? They are not a random cloud. They form a clean geometric object, and the
	reduced form tells you exactly which one.
</p>

<h2>Free variables</h2>
<p>
	Take two equations in three unknowns: <Tex tex={'x + y + z = 3'} /> and <Tex tex={'x - y = 1'} />. Two equations cannot pin down three
	unknowns, so one unknown will be <em>free</em>. Reduce it:
</p>
<Figure caption="Reduce [1 1 1 | 3], [1 -1 0 | 1]. There is no pivot in the z column." max={640}>
	<ElimStepper aug={[[1, 1, 1, 3], [1, -1, 0, 1]]} />
</Figure>
<p>
	The result reads <Tex tex={'x + \\tfrac12 z = 2'} /> and <Tex tex={'y + \\tfrac12 z = 1'} />. Column 3 has no pivot, so
	<Tex tex="z" /> is <strong class="text-slate-50">free</strong>: choose it as you like, then <Tex tex="x" /> and <Tex tex="y" /> are determined.
	Setting <Tex tex={'x = t'} /> instead gives the same family, written below.
</p>

<h2>A point plus a direction</h2>
<Callout kind="theorem" title="Shape of the solution set">
	<p>
		If a consistent system <Tex tex={'A\\mathbf x = \\mathbf b'} /> has free variables, its solutions are
		<Tex display tex={'\\mathbf x = \\mathbf x_p + t_1\\mathbf n_1 + \\dots + t_k\\mathbf n_k'} />
		where <Tex tex={'\\mathbf x_p'} /> is one <em>particular</em> solution, and the <Tex tex={'\\mathbf n_i'} /> solve the
		<em>homogeneous</em> system <Tex tex={'A\\mathbf x = \\mathbf 0'} />, one for each free variable.
	</p>
</Callout>
<p>
	For our system, <Tex tex={'\\mathbf x_p = (1, 0, 2)'} /> works and the free direction is <Tex tex={'(1, 1, -2)'} />, so the solutions are
	<Tex display tex={'(x, y, z) = (1, 0, 2) + t\\,(1, 1, -2)'} />
	a <strong class="text-slate-50">line</strong> in 3D. Geometrically it is where two planes intersect.
</p>

<Figure caption="Two planes meet in the red line. Slide t to walk the teal point along all the solutions." max={640}>
	<Scene3D {build} label="Two planes intersecting in a line of solutions" height={360} />
	{#snippet controls()}
		<Slider label="t" bind:value={t} min={-1} max={3} step={0.1} />
		<span class="font-mono text-sm text-slate-100">
			({(p0[0] + (t - 1) * dir[0]).toFixed(1)}, {(p0[1] + (t - 1) * dir[1]).toFixed(1)}, {(p0[2] + (t - 1) * dir[2]).toFixed(1)})
		</span>
	{/snippet}
</Figure>

<Callout kind="intuition">
	<p>
		Think of it as <em>one answer plus freedom</em>. The particular solution gets you onto the solution set; the null directions are the ways you can
		slide around without leaving it. Number of free variables = dimension of the set of solutions.
	</p>
</Callout>

<h2>Systems with a parameter</h2>
<p>
	Exams love a matrix with a letter in it: "for which values of <Tex tex="a" /> is there a unique solution?". Nothing new is needed. Run elimination exactly as usual, keeping the letter.
	The answer is decided by the same two questions as always (Strang's "pivot test"):
</p>
<Callout kind="theorem" title="The three outcomes, read off the echelon form">
	<p>
		<strong class="text-slate-50">Unique solution</strong>: a pivot in every column. <strong class="text-slate-50">No solution</strong>: some row reads
		<Tex tex={'[\\,0\\ \\cdots\\ 0\\mid c\\,]'} /> with <Tex tex={'c\\ne0'} />. <strong class="text-slate-50">Infinitely many</strong>: consistent, and at least one column has no pivot.
	</p>
</Callout>
<Callout kind="warning">
	<p>
		The classic mistake is to divide by a parameter (say by <Tex tex="a" />) without saying "assuming <Tex tex={'a\\ne0'} />". The case <Tex tex="a = 0" /> is precisely where the pivot
		disappears, and it is the interesting case. Always split it off.
	</p>
</Callout>

<WorkedExample title="a system with two parameters" problem={param.problem} method={param.method} steps={param.steps} credit="Pivot-test approach after Strang; solution set as particular solution plus null space after Strang and Axler." />

<Callout kind="theorem" title="Shape decides what is possible">
	<p>
		For an <Tex tex={'m\\times n'} /> matrix of rank <Tex tex="r" /> (so <Tex tex={'r\\le\\min(m,n)'} />): if <Tex tex={'r = n'} /> there are no free variables, so the answer is unique or none.
		If <Tex tex={'r = m'} /> every row has a pivot, so the system is always consistent. A wide system (<Tex tex={'n>m'} />) can never have a unique solution; a tall one
		(<Tex tex={'m>n'} />) can be inconsistent for some right-hand sides.
	</p>
</Callout>

<WorkedExample title="a tall system with parameters" problem={tall.problem} method={tall.method} steps={tall.steps} credit="Rank and the shape of the solution set, after Strang's four-subspaces picture." />

<Recap
	points={[
		'With a parameter: eliminate keeping the letter, split cases where a pivot can be $0$, then read off unique / none / infinitely many.',
		'A column without a pivot is a **free** column; its unknown can be chosen freely.',
		'Solutions of $A\\mathbf x=\\mathbf b$ are **one particular solution plus** any solution of $A\\mathbf x=\\mathbf 0$.',
		'Number of free variables = (unknowns) − rank; two planes in 3D usually meet in a line.'
	]}
/>

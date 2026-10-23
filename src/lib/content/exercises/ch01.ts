import type { QuizBank } from '../types';
import { mcq, numeric, open, vector } from '../exerciseHelpers';

const C = 'ch01';

export const exercises: QuizBank = {
	'ch01.exercises': [
		open(
			C,
			'2.19',
			'Let $\\mathbf u = (2, -1, 3)$ and $\\mathbf v = (0, 4, -2)$. Compute $\\mathbf u + \\mathbf v$, $\\mathbf u - \\mathbf v$, $3\\mathbf u$ and $\\|\\mathbf u\\|$.',
			[
				'Add or subtract matching entries (first with first, second with second, third with third). Scaling multiplies every entry by the number.',
				'For the length use $\\|\\mathbf u\\| = \\sqrt{\\mathbf u\\cdot\\mathbf u}$: square each entry of $\\mathbf u$, add the squares, then take the square root.'
			],
			'$\\mathbf u + \\mathbf v = (2+0,\\ -1+4,\\ 3-2) = (2, 3, 1)$.\n$\\mathbf u - \\mathbf v = (2-0,\\ -1-4,\\ 3-(-2)) = (2, -5, 5)$.\n$3\\mathbf u = (6, -3, 9)$.\n$\\|\\mathbf u\\| = \\sqrt{2^2 + (-1)^2 + 3^2} = \\sqrt{4 + 1 + 9} = \\sqrt{14} \\approx 3.742$.'
		),
		vector(
			C,
			'2.20',
			'Decide whether $\\mathbf b = (5, 5)$ lies in $\\operatorname{span}\\{(1,2), (3,1)\\}$. If it does, find $(a, b)$ with $\\mathbf b = a(1,2) + b(3,1)$ and enter it.',
			[2, 1],
			[
				'Write $\\mathbf b = a(1,2) + b(3,1)$ one entry at a time. The first entries give $a + 3b = 5$ and the second entries give $2a + b = 5$.',
				'Solve the pair of equations: multiply the first by $2$ to get $2a + 6b = 10$, then subtract the second equation.'
			],
			'Entry by entry: $a + 3b = 5$ and $2a + b = 5$. Doubling the first and subtracting the second gives $5b = 5$, so $b = 1$ and then $a = 5 - 3 = 2$. Check: $2(1,2) + 1(3,1) = (2+3,\\ 4+1) = (5,5)$. So $\\mathbf b$ is in the span, with coefficients $(2, 1)$. (The two vectors are not parallel, so they span the whole plane, and every vector is in the span.)'
		),
		numeric(
			C,
			'2.21',
			'For which value of $s$ does $\\operatorname{span}\\{(1,3), (2, s)\\}$ fail to be all of $\\mathbb{R}^2$?',
			6,
			[
				'Two vectors in the plane fail to span it exactly when one is a scalar multiple of the other, i.e. they point along the same line.',
				'Suppose $(2, s) = k(1, 3)$. The first entries force $k = 2$. What does that make $s$?'
			],
			'Geometrically, two non-parallel vectors in the plane span everything, while parallel ones span only a line. Algebraically, $(2, s) = k(1,3)$ forces $k = 2$ from the first entry and then $s = 3k = 6$. Equivalently, $\\det\\begin{bmatrix}1&2\\\\3&s\\end{bmatrix} = s - 6 = 0$. For $s = 6$ the span is the line through $(1,3)$; for every other $s$ it is the whole plane.'
		),
		numeric(
			C,
			'2.22',
			'Find the angle, in degrees, between $(1, 0, 1)$ and $(0, 1, 1)$.',
			60,
			[
				'Use $\\cos\\theta = \\dfrac{\\mathbf a\\cdot\\mathbf b}{\\|\\mathbf a\\|\\,\\|\\mathbf b\\|}$. Compute the dot product first.',
				'Both vectors have length $\\sqrt{1 + 0 + 1} = \\sqrt2$, so the denominator is $\\sqrt2\\cdot\\sqrt2 = 2$. Which angle has that cosine?'
			],
			'$\\mathbf a\\cdot\\mathbf b = 1\\cdot0 + 0\\cdot1 + 1\\cdot1 = 1$ and $\\|\\mathbf a\\| = \\|\\mathbf b\\| = \\sqrt2$, so $\\cos\\theta = 1/2$ and $\\theta = 60^\\circ$.',
			{ tol: 0.5 }
		),
		vector(
			C,
			'2.23',
			'Project $\\mathbf v = (2, 3)$ onto the line spanned by $\\mathbf r = (1, -1)$. Enter the projection. (Then check that the error is perpendicular to $\\mathbf r$.)',
			[-0.5, 0.5],
			[
				'Use $\\operatorname{proj}_{\\mathbf r}\\mathbf v = \\dfrac{\\mathbf r\\cdot\\mathbf v}{\\mathbf r\\cdot\\mathbf r}\\,\\mathbf r$. Compute the two dot products first.',
				'$\\mathbf r\\cdot\\mathbf v = 2 - 3 = -1$ and $\\mathbf r\\cdot\\mathbf r = 2$. So the scalar in front of $\\mathbf r$ is $-\\tfrac12$.'
			],
			'The scalar is $\\dfrac{-1}{2}$, so the projection is $-\\tfrac12(1,-1) = (-0.5, 0.5)$. The error is $\\mathbf v - \\text{proj} = (2.5, 2.5)$, and $(2.5, 2.5)\\cdot(1,-1) = 2.5 - 2.5 = 0$, so the error is perpendicular to $\\mathbf r$, as it must be.'
		),
		open(
			C,
			'2.24',
			'Show that equality holds in the Cauchy–Schwarz inequality, $|\\langle\\mathbf u, \\mathbf v\\rangle| = \\|\\mathbf u\\|\\,\\|\\mathbf v\\|$, precisely when $\\mathbf u$ and $\\mathbf v$ are parallel (one is a scalar multiple of the other).',
			[
				'There are two directions to prove. First the easy one: if $\\mathbf v = c\\mathbf u$, compute both sides and compare.',
				'For the converse take $\\mathbf u\\neq\\mathbf 0$ and form the leftover $\\mathbf w = \\mathbf v - \\dfrac{\\langle\\mathbf u,\\mathbf v\\rangle}{\\langle\\mathbf u,\\mathbf u\\rangle}\\mathbf u$. Compute $\\|\\mathbf w\\|^2$ using the equality assumption.',
				'You should find $\\|\\mathbf w\\|^2 = 0$. What does that say about $\\mathbf w$?'
			],
			'($\\Leftarrow$) If $\\mathbf v = c\\mathbf u$, then $|\\langle\\mathbf u, c\\mathbf u\\rangle| = |c|\\,\\|\\mathbf u\\|^2$ and $\\|\\mathbf u\\|\\|c\\mathbf u\\| = |c|\\,\\|\\mathbf u\\|^2$. They are equal.\n\n($\\Rightarrow$) Suppose $|\\langle\\mathbf u,\\mathbf v\\rangle| = \\|\\mathbf u\\|\\|\\mathbf v\\|$ and $\\mathbf u\\ne\\mathbf 0$ (if $\\mathbf u = \\mathbf 0$ the vectors are trivially parallel). Let $c = \\langle\\mathbf u,\\mathbf v\\rangle/\\|\\mathbf u\\|^2$ and $\\mathbf w = \\mathbf v - c\\mathbf u$. Then $\\mathbf w\\perp\\mathbf u$ and\n$\\|\\mathbf w\\|^2 = \\|\\mathbf v\\|^2 - \\dfrac{\\langle\\mathbf u,\\mathbf v\\rangle^2}{\\|\\mathbf u\\|^2} = \\|\\mathbf v\\|^2 - \\|\\mathbf v\\|^2 = 0.$\nSo $\\mathbf w = \\mathbf 0$, i.e. $\\mathbf v = c\\mathbf u$.'
		),
		numeric(
			C,
			'2.25',
			'The plane through $(2, 0, 1)$ with normal $(3, -1, 2)$ has equation $3x - y + 2z = d$. Find $d$, then give the distance from the origin to the plane. (Enter the distance, as a decimal.)',
			2.138,
			[
				'The equation of a plane with normal $\\mathbf n$ through a point $\\mathbf p$ is $\\mathbf n\\cdot\\mathbf x = \\mathbf n\\cdot\\mathbf p$. Substitute the given point to get $d$.',
				'The distance from the origin to $\\mathbf n\\cdot\\mathbf x = d$ is $|d|/\\|\\mathbf n\\|$: the foot of the perpendicular is the projection of the point on the normal direction.'
			],
			'Substituting $(2,0,1)$: $d = 3\\cdot2 - 0 + 2\\cdot1 = 8$, so the plane is $3x - y + 2z = 8$. The closest point to the origin lies along the normal, $t\\mathbf n$ with $\\mathbf n\\cdot(t\\mathbf n) = 8$, so $t = 8/\\|\\mathbf n\\|^2 = 8/14$ and the distance is $t\\|\\mathbf n\\| = 8/\\sqrt{14} \\approx 2.138$.',
			{ tol: 0.01 }
		),
		open(
			C,
			'2.26',
			'Take the polynomials of degree at most two, with addition and scaling done coefficient by coefficient. Compute $2(1 + t) - 3(t - t^2)$, and decide whether $1 + t^2$ lies in $\\operatorname{span}\\{1 + t,\\ t + t^2\\}$.',
			[
				'Treat each polynomial as the list of its coefficients of $1, t, t^2$: $1 + t \\leftrightarrow (1,1,0)$ and $t - t^2 \\leftrightarrow (0,1,-1)$. Then it is ordinary vector arithmetic.',
				'For the span question, ask whether $a(1 + t) + b(t + t^2) = 1 + t^2$ has a solution. Expand the left side and match the coefficients of $1$, $t$ and $t^2$.'
			],
			'First part: $2(1+t) - 3(t - t^2) = 2 + 2t - 3t + 3t^2 = 2 - t + 3t^2$.\n\nSecond part: $a(1+t) + b(t+t^2) = a + (a+b)t + bt^2$. To equal $1 + 0\\cdot t + 1\\cdot t^2$ we would need $a = 1$, $a + b = 0$ and $b = 1$. But $a = 1$ and $b = 1$ give $a + b = 2 \\ne 0$. There is no solution, so $1 + t^2$ is **not** in the span.'
		),
		open(
			C,
			'2.27',
			'Prove that the projection of Definition 2.13 deserves its name: if $\\mathbf p$ is the projection of $\\mathbf v$ onto the line spanned by $\\mathbf r$, show that $\\|\\mathbf v - \\mathbf p\\| \\le \\|\\mathbf v - s\\mathbf r\\|$ for every scalar $s$, with equality only when $s\\mathbf r = \\mathbf p$.',
			[
				'Expand $\\|\\mathbf v - s\\mathbf r\\|^2$ using $\\|\\mathbf a - \\mathbf b\\|^2 = \\|\\mathbf a\\|^2 - 2\\langle\\mathbf a,\\mathbf b\\rangle + \\|\\mathbf b\\|^2$. It becomes a quadratic polynomial in $s$.',
				'The quadratic has the form $\\|\\mathbf r\\|^2 s^2 - 2\\langle\\mathbf v,\\mathbf r\\rangle s + \\|\\mathbf v\\|^2$ with positive leading coefficient, so it has a unique minimum at its vertex. Where is the vertex, and which point of the line is it?'
			],
			'$\\|\\mathbf v - s\\mathbf r\\|^2 = \\|\\mathbf v\\|^2 - 2s\\langle\\mathbf v,\\mathbf r\\rangle + s^2\\|\\mathbf r\\|^2$. This is a quadratic in $s$ with positive leading coefficient $\\|\\mathbf r\\|^2$, so it is smallest exactly at its vertex $s^* = \\langle\\mathbf v,\\mathbf r\\rangle/\\|\\mathbf r\\|^2$, and it is strictly larger for every other $s$.\n\nThe point $s^*\\mathbf r = \\dfrac{\\langle\\mathbf v,\\mathbf r\\rangle}{\\langle\\mathbf r,\\mathbf r\\rangle}\\mathbf r$ is exactly the projection $\\mathbf p$ of Definition 2.13. Hence $\\|\\mathbf v - \\mathbf p\\| \\le \\|\\mathbf v - s\\mathbf r\\|$ for all $s$, with equality only at $s\\mathbf r = \\mathbf p$.'
		)
	]
};

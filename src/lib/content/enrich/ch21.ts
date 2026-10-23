import type { Enrich } from '../types';

export const enrich: Record<string, Enrich> = {
	'ch21.dual-space.1': {
		hints: [
			'A functional eats a vector and returns a single number.',
			'The word "linear" means it respects sums and scalings.'
		],
		notes: [
			'Right. For example $\\varphi(x,y) = 2x - y$ is a linear functional on $\\mathbb{R}^2$.',
			'No. A functional is a map that acts on vectors; it is not itself a vector of $V$ (it lives in $V^*$).',
			'No. The determinant condition is unrelated.',
			'No. A basis is a list of vectors.'
		]
	},
	'ch21.dual-space.2': {
		hints: [
			'A functional on $\\mathbb{R}^5$ is a row vector $(a_1,\\dots,a_5)$.',
			'That is $5$ free numbers.'
		]
	},
	'ch21.dual-space.3': {
		hints: [
			'The dual basis must satisfy $\\varphi_i(\\mathbf b_j) = \\delta_{ij}$. In matrix terms row $i$ times column $j$ gives $\\delta_{ij}$.',
			'The matrix whose rows times $P$ give $I$ is $P^{-1}$.'
		],
		notes: [
			'Right. $P^{-1}P = I$ says (row $i$ of $P^{-1}$)$\\cdot$(column $j$ of $P$) $=\\delta_{ij}$.',
			'No. The rows of $P$ do not give $\\delta_{ij}$ with its columns in general.',
			'No. The columns of $P^{\\mathsf T}$ are the rows of $P$, same as before.',
			'No. Functionals are rows (they eat column vectors), not columns.'
		]
	},
	'ch21.dual-space.4': {
		hints: [
			'$\\varphi_2(\\mathbf v)$ is the coefficient of $\\mathbf b_2$ in $\\mathbf v = a\\mathbf b_1 + b\\mathbf b_2$.',
			'Solve $a(1,0) + b(1,1) = (3,2)$: second entry gives $b = 2$.'
		]
	},
	'ch21.dual-map.1': {
		hints: [
			'$T^*$ takes a functional on the output space and returns a functional on the input space.',
			'The natural way: first apply $T$, then apply $\\varphi$.'
		],
		notes: [
			'Right. $T^*\\varphi = \\varphi\\circ T$ pulls a functional back along $T$.',
			'No. $T$ cannot be applied to a functional; the types do not match.',
			'No. $T^*$ is not an inverse; it exists even when $T$ is not invertible.',
			'No. Adding a map to a functional does not make sense.'
		]
	},
	'ch21.dual-map.2': {
		hints: [
			'First compute $A\\mathbf x = (1\\cdot1.5 + 1\\cdot1,\\ 0 + 2\\cdot1) = (2.5, 2)$.',
			'Then dot with $\\mathbf w = (1,0.5)$.'
		]
	},
	'ch21.dual-map.3': {
		hints: [
			'$\\mathbf w\\cdot A\\mathbf x = (A^{\\mathsf T}\\mathbf w)\\cdot\\mathbf x$. The functional $\\mathbf w^{\\mathsf T}A$ has coordinates $A^{\\mathsf T}\\mathbf w$.',
			'So the dual map acts on coordinate vectors by $A^{\\mathsf T}$.'
		],
		notes: [
			'Right. The matrix of $T^*$ is the transpose of the matrix of $T$.',
			'No. The inverse undoes $T$; the dual map is a different, always-defined operation.',
			'No. $T^*$ acts on a different space (the dual) and is generally a different matrix.',
			'No. Nothing squares $A$ here.'
		]
	},
	'ch21.dual-map.4': {
		hints: [
			'Compare $\\operatorname{rank}A = \\dim\\operatorname{Im}T$ and $\\operatorname{rank}A^{\\mathsf T} = \\dim\\operatorname{Im}T^*$.',
			'A functional $\\varphi\\circ T = 0$ exactly when $\\varphi$ vanishes on $\\operatorname{Im}T$; count the dimension of that set.'
		],
		notes: [
			'Right. $\\operatorname{Im}T^* = (\\ker T)^\\circ$ has dimension $\\dim V - \\dim\\ker T = \\operatorname{rank}T$.',
			'No. $A$ and $A^{\\mathsf T}$ have different shapes and entries in different positions.',
			'No. The statement holds for every matrix.',
			'No. There is a clean proof, not a coincidence.'
		]
	},
	'ch21.bilinear-forms.1': {
		hints: [
			'A bilinear form eats two vectors: $\\beta(\\mathbf x,\\mathbf y) = \\mathbf x^{\\mathsf T}M\\mathbf y$. Substitute $\\mathbf x = P\\mathbf x\'$ and $\\mathbf y = P\\mathbf y\'$.',
			'You get $\\mathbf x\'^{\\mathsf T}(P^{\\mathsf T}MP)\\mathbf y\'$.'
		],
		notes: [
			'Right. The transpose appears because the first slot also transforms: $P^{\\mathsf T}MP$ (congruence).',
			'No. That is similarity, the rule for a linear operator rather than a bilinear form.',
			'No. That is the inverse change of basis for an operator.',
			'No. Changing the basis cannot be undone by adding $P$.'
		]
	},
	'ch21.bilinear-forms.2': {
		hints: [
			'The two expressions coincide when $P^{\\mathsf T} = P^{-1}$.',
			'Which matrices have transpose equal to their inverse?'
		],
		notes: [
			'Right. If $P$ is orthogonal then $P^{\\mathsf T} = P^{-1}$, so congruence and similarity agree.',
			'No. They coincide for orthogonal $P$.',
			'No. For $M = I$, $P^{\\mathsf T}P$ and $I$ differ unless $P$ is orthogonal.',
			'No. A symmetric $P$ need not satisfy $P^{\\mathsf T} = P^{-1}$.'
		]
	},
	'ch21.bilinear-forms.3': {
		hints: [
			'Congruence by an invertible $P$ rescales and recombines directions, but cannot flip the sign of the form on a direction.',
			'The signs (counts of positive, negative, zero) are the invariants.'
		],
		notes: [
			'Right. The inertia $(p,n,z)$ is a congruence invariant.',
			'No. The eigenvalues themselves change (e.g. $\\operatorname{diag}(1,4)\\to\\operatorname{diag}(1,1)$).',
			'No. The determinant is scaled by $(\\det P)^2$.',
			'No. The trace is not preserved by congruence.'
		]
	},
	'ch21.bilinear-forms.4': {
		hints: [
			'$P^{\\mathsf T}MP$ for diagonal matrices multiplies the $i$-th diagonal entry by $p_i^2$.',
			'Bottom-right: $(-1)\\cdot3^2$.'
		]
	}
};

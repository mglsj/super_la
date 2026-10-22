import type { Chapter, LessonMeta } from './types';

const L = (
	slug: string,
	title: string,
	blurb: string,
	notesRef: string,
	minutes = 10,
	advanced = false
): LessonMeta => ({ slug, title, blurb, notesRef, minutes, advanced });

export const chapters: Chapter[] = [
	{
		id: 'ch01',
		n: 1,
		title: 'Vectors & the Geometry of Space',
		blurb: 'Arrows, lists and functions: what a vector really is, and the first things you can do with one.',
		hue: 200,
		lessons: [
			L('what-is-a-vector', 'What is a vector?', 'Three views that turn out to be one idea.', 'ch-01 §2.1', 8),
			L('add-and-scale', 'Adding and scaling', 'The only two moves linear algebra allows.', 'ch-01 §2.2', 8),
			L('span', 'Linear combinations & span', 'Everything you can reach by adding and scaling.', 'ch-01 §2.3', 12),
			L('dot-product', 'The dot product', 'One number that measures length and angle.', 'ch-01 §2.4', 12),
			L('projection', 'Projection', 'The shadow of one vector on another.', 'ch-01 §2.5', 10),
			L('lines-planes', 'Lines & planes', 'Equations as geometry, and back.', 'ch-01 §2.6', 10),
			L('cross-product', 'The cross product', 'A vector perpendicular to two others.', 'ch-01 §2.7', 8)
		]
	},
	{
		id: 'ch02',
		n: 2,
		title: 'Linear Systems & Elimination',
		blurb: 'Solving many equations at once, and seeing why it sometimes fails.',
		hue: 160,
		lessons: [
			L('lines-meet', 'Equations are lines', 'Where lines meet: none, one or infinitely many points.', 'ch-02'),
			L('elimination', 'Elimination', 'Row operations as a systematic way to solve.', 'ch-02'),
			L('pivots-rref', 'Pivots & RREF', 'The cleanest form a system can take.', 'ch-02'),
			L('solution-sets', 'Solution sets', 'Particular solution plus free directions.', 'ch-02')
		]
	},
	{
		id: 'ch03',
		n: 3,
		title: 'Matrices, Inverses & Factorisation',
		blurb: 'A matrix is a machine that moves space. Multiply, undo, and factor it.',
		hue: 120,
		lessons: [
			L('matrix-times-vector', 'Matrix × vector', 'Mixing columns: where the basis vectors land.', 'ch-03'),
			L('composition', 'Products are compositions', 'Why AB ≠ BA.', 'ch-03'),
			L('inverse', 'Inverses', 'Undoing a transformation, and when you cannot.', 'ch-03'),
			L('lu', 'LU factorisation', 'Elimination remembered as a product.', 'ch-03')
		]
	},
	{
		id: 'ch04',
		n: 4,
		title: 'Vector Spaces & Subspaces',
		blurb: 'Strip vectors down to the rules that matter and find the spaces hiding inside matrices.',
		hue: 80,
		lessons: [
			L('vector-spaces', 'Vector spaces', 'The rules, in plain words.', 'ch-04'),
			L('subspaces', 'Subspaces', 'Flat things through the origin.', 'ch-04'),
			L('column-null-space', 'Column space & null space', 'What a matrix reaches and what it kills.', 'ch-04'),
			L('four-subspaces', 'The four subspaces', 'The full picture of one matrix.', 'ch-04')
		]
	},
	{
		id: 'ch05',
		n: 5,
		title: 'Independence, Basis & Dimension',
		blurb: 'The smallest set of directions that still reaches everything.',
		hue: 45,
		lessons: [
			L('independence', 'Independence', 'When a vector adds nothing new.', 'ch-05'),
			L('basis', 'Basis', 'A minimal, complete set of directions.', 'ch-05'),
			L('coordinates', 'Coordinates', 'The same vector described in different bases.', 'ch-05'),
			L('dimension', 'Dimension', 'Why the count never changes.', 'ch-05')
		]
	},
	{
		id: 'ch06',
		n: 6,
		title: 'Linear Maps',
		blurb: 'Maps first, matrices second: what linearity means and what a map can lose.',
		hue: 20,
		lessons: [
			L('linear-maps', 'Linear maps', 'Grid lines stay parallel and evenly spaced.', 'ch-06 §7.1'),
			L('kernel-image', 'Kernel & image', 'What gets squashed, what gets hit.', 'ch-06 §7.2'),
			L('rank-nullity', 'Rank–nullity', 'Dimensions must add up.', 'ch-06 §7.3'),
			L('matrix-of-a-map', 'The matrix of a map', 'Writing a map down in a basis.', 'ch-06 §7.5'),
			L('change-of-basis', 'Change of basis', 'Same map, different eyes.', 'ch-06 §7.6')
		]
	},
	{
		id: 'ch07',
		n: 7,
		title: 'Determinants',
		blurb: 'The factor by which a transformation scales area and volume.',
		hue: 340,
		lessons: [
			L('area-scaling', 'Area scaling', 'The determinant as a stretch factor.', 'ch-07'),
			L('orientation', 'Sign & orientation', 'Negative determinants flip space.', 'ch-07'),
			L('multiplicativity', 'det(AB) = det A · det B', 'Scaling compounds.', 'ch-07'),
			L('cofactors', 'Computing determinants', 'Cofactor expansion and elimination.', 'ch-07')
		]
	},
	{
		id: 'ch08',
		n: 8,
		title: 'Eigenvalues & Eigenvectors',
		blurb: 'The directions a transformation merely stretches.',
		hue: 300,
		lessons: [
			L('stay-on-the-line', 'Vectors that stay put', 'Directions that survive a transformation.', 'ch-08'),
			L('characteristic-polynomial', 'The characteristic polynomial', 'Finding eigenvalues by algebra.', 'ch-08'),
			L('complex-eigenvalues', 'Rotations & complex eigenvalues', 'When no real direction survives.', 'ch-08')
		]
	},
	{
		id: 'ch09',
		n: 9,
		title: 'Diagonalisation',
		blurb: 'Choose the eigenbasis and a matrix becomes trivial.',
		hue: 260,
		lessons: [
			L('eigenbasis', 'Changing to the eigenbasis', 'A = PDP⁻¹, geometrically.', 'ch-09'),
			L('powers', 'Powers of a matrix', 'Why A^k becomes easy.', 'ch-09'),
			L('when-it-fails', 'When it fails', 'Defective matrices and shears.', 'ch-09')
		]
	},
	{
		id: 'ch10',
		n: 10,
		title: 'The Jordan Canonical Form',
		blurb: 'What to do when there are not enough eigenvectors.',
		hue: 230,
		lessons: [
			L('generalized-eigenvectors', 'Generalised eigenvectors', 'Chains instead of single vectors.', 'ch-10', 12, true),
			L('jordan-blocks', 'Jordan blocks', 'The best form that always exists.', 'ch-10', 12, true)
		]
	},
	{
		id: 'ch11',
		n: 11,
		title: 'Inner Products & Orthogonality',
		blurb: 'Length, angle and perpendicularity, and the bases that respect them.',
		hue: 185,
		lessons: [
			L('inner-products', 'Inner products', 'What makes a dot product a dot product.', 'ch-11'),
			L('orthogonal-bases', 'Orthogonal bases', 'Coordinates you can read off.', 'ch-11'),
			L('gram-schmidt', 'Gram–Schmidt', 'Straightening any basis.', 'ch-11'),
			L('orthogonal-matrices', 'Orthogonal matrices', 'Rotations and reflections.', 'ch-11')
		]
	},
	{
		id: 'ch12',
		n: 12,
		title: 'Projection & Least Squares',
		blurb: 'The closest answer when there is no exact one.',
		hue: 100,
		lessons: [
			L('projection-subspace', 'Projection onto a subspace', 'The closest point in a plane.', 'ch-12'),
			L('normal-equations', 'Normal equations', 'Making the error perpendicular.', 'ch-12'),
			L('line-of-best-fit', 'Line of best fit', 'Regression as geometry.', 'ch-12')
		]
	},
	{
		id: 'ch13',
		n: 13,
		title: 'The Spectral Theorem',
		blurb: 'Symmetric matrices are the best-behaved of all: real eigenvalues and perpendicular eigenvectors.',
		hue: 160,
		lessons: [
			L('symmetric-matrices', 'Symmetric matrices', 'Perpendicular eigen-directions, always.', 'ch-13 §14.3'),
			L('rank-one-pieces', 'A sum of rank-one pieces', 'A = Σ λ q qᵀ, built one piece at a time.', 'ch-13 §14.3'),
			L('quadratic-forms', 'Quadratic forms & Rayleigh', 'xᵀAx and the extremes it takes on the unit circle.', 'ch-13 §14.5–14.6')
		]
	},
	{
		id: 'ch14',
		n: 14,
		title: 'Positive Definite Matrices',
		blurb: 'Matrices that behave like positive numbers: bowls, not saddles.',
		hue: 130,
		lessons: [
			L('positive-definite', 'Positive definite', 'xᵀAx > 0 for every nonzero x.', 'ch-14 §15.1–15.2'),
			L('tests-and-cholesky', 'Tests & Cholesky', 'Pivots, Sylvester and the square root of a matrix.', 'ch-14 §15.3'),
			L('where-they-come-from', 'Where they come from', 'AᵀA, covariance and conditioning.', 'ch-14 §15.4–15.6')
		]
	},
	{
		id: 'ch15',
		n: 15,
		title: 'The Singular Value Decomposition',
		blurb: 'Every matrix is rotate, stretch, rotate. The most useful factorisation there is.',
		hue: 100,
		lessons: [
			L('circle-to-ellipse', 'Circle to ellipse', 'Singular values are the ellipse semi-axes.', 'ch-15 §16.1'),
			L('rotate-stretch-rotate', 'A = UΣVᵀ', 'Three simple steps that make any matrix.', 'ch-15 §16.2'),
			L('low-rank-approximation', 'Best low-rank approximation', 'Eckart–Young: keep the biggest pieces.', 'ch-15 §16.3, 16.5'),
			L('pseudoinverse', 'Pseudoinverse & conditioning', 'Inverting what can be inverted.', 'ch-15 §16.4, 16.6')
		]
	},
	{
		id: 'ch16',
		n: 16,
		title: 'Floating Point & Stability',
		blurb: 'Computers do not do real arithmetic. What goes wrong, and who is to blame.',
		hue: 60,
		lessons: [
			L('floating-point', 'Floating point numbers', 'Why 0.1 + 0.2 is not 0.3.', 'ch-16 §17.1'),
			L('cancellation', 'Cancellation', 'Subtracting nearly equal numbers destroys digits.', 'ch-16 §17.2'),
			L('conditioning', 'Conditioning vs stability', 'Bad problem or bad algorithm?', 'ch-16 §17.3–17.4')
		]
	},
	{
		id: 'ch17',
		n: 17,
		title: 'Iterative Methods',
		blurb: 'When factorising is too expensive, walk towards the answer instead.',
		hue: 30,
		lessons: [
			L('stationary-iterations', 'Stationary iterations', 'Jacobi and Gauss–Seidel zigzag in.', 'ch-17 §18.2'),
			L('conjugate-gradients', 'Conjugate gradients', 'Steepest descent, but without the zigzag.', 'ch-17 §18.3–18.4'),
			L('preconditioning', 'Preconditioning', 'Change the problem so the walk is short.', 'ch-17 §18.6–18.7')
		]
	},
	{
		id: 'ch18',
		n: 18,
		title: 'Linear Algebra for AI',
		blurb: 'Embeddings, layers, attention and low-rank adapters are all things you already know.',
		hue: 350,
		lessons: [
			L('data-as-matrix', 'Data as a matrix', 'Embeddings and similarity by dot product.', 'ch-18 §19.1'),
			L('layers-nonlinearity', 'Layers & nonlinearity', 'Why a stack of linear layers is one layer.', 'ch-18 §19.2'),
			L('attention', 'Attention', 'Three matrix products and a softmax.', 'ch-18 §19.3'),
			L('low-rank-adapters', 'Low-rank adapters', 'Fine-tuning with far fewer numbers.', 'ch-18 §19.5')
		]
	},
	{
		id: 'ch19',
		n: 19,
		title: 'Tensors & Kronecker Products',
		blurb: 'Matrices with more structure, and the identities that let you avoid building them.',
		hue: 320,
		lessons: [
			L('kronecker-product', 'The Kronecker product', 'A matrix made of scaled copies of a matrix.', 'ch-19 §20.1'),
			L('vectorisation', 'Vectorisation', 'vec(AXB) = (Bᵀ ⊗ A) vec(X).', 'ch-19 §20.2–20.3'),
			L('tensors', 'Tensors as multi-way arrays', 'Unfoldings, and why tensor rank is hard.', 'ch-19 §20.4–20.5')
		]
	},
	{
		id: 'ch20',
		n: 20,
		title: 'Nonnegative Matrices',
		blurb: 'Positive entries force a dominant eigenvector: Perron–Frobenius, Markov chains, PageRank.',
		hue: 280,
		lessons: [
			L('perron-frobenius', 'Perron–Frobenius', 'A positive matrix has one dominant positive direction.', 'ch-20 §21.3'),
			L('markov-chains', 'Markov chains', 'Probabilities settle to a steady state.', 'ch-20 §21.4'),
			L('pagerank', 'PageRank', 'Ranking a web with an eigenvector.', 'ch-20 §21.5')
		]
	},
	{
		id: 'ch21',
		n: 21,
		title: 'Duality & Bilinear Forms',
		blurb: 'Row vectors are not column vectors. What a transpose really is.',
		hue: 250,
		lessons: [
			L('dual-space', 'The dual space', 'Linear functionals as measuring sticks.', 'ch-21 §22.1'),
			L('dual-map', 'The dual map', 'The transpose, understood.', 'ch-21 §22.2–22.3'),
			L('bilinear-forms', 'Bilinear forms', 'They change basis differently from maps.', 'ch-21 §22.4–22.5')
		]
	},
	{
		id: 'ch22',
		n: 22,
		title: 'Matrix Groups',
		blurb: 'Sets of matrices closed under multiplication: the symmetries of geometry.',
		hue: 220,
		lessons: [
			L('matrix-groups', 'Groups of matrices', 'Closure, identity, inverses.', 'ch-22 §23.1'),
			L('orthogonal-group', 'The orthogonal group', 'Rotations and reflections.', 'ch-22 §23.2'),
			L('matrix-exponential', 'The matrix exponential', 'Generators: rotating by exponentiating.', 'ch-22 §23.3')
		]
	},
	{
		id: 'ch23',
		n: 23,
		title: 'Randomised Linear Algebra',
		blurb: 'Random projections preserve geometry, and make big problems small.',
		hue: 190,
		lessons: [
			L('random-projections', 'Random projections', 'Length is preserved on average.', 'ch-23 §24.1'),
			L('johnson-lindenstrauss', 'Johnson–Lindenstrauss', 'Many points, few dimensions, little distortion.', 'ch-23 §24.2'),
			L('randomised-svd', 'Randomised SVD', 'Sketch the range, then decompose the small part.', 'ch-23 §24.4–24.5')
		]
	},
	{
		id: 'ch24',
		n: 24,
		title: 'Random Matrices',
		blurb: 'Big random matrices have strikingly predictable spectra.',
		hue: 140,
		lessons: [
			L('semicircle-law', 'The semicircle law', 'Eigenvalues of a big symmetric random matrix.', 'ch-24 §25.2'),
			L('marchenko-pastur', 'Marchenko–Pastur', 'Singular values of a random rectangular matrix.', 'ch-24 §25.3'),
			L('initialisation', 'Initialisation', 'Why weight scale decides whether signals survive.', 'ch-24 §25.5')
		]
	}
];

export const lessonId = (chapter: Chapter | string, slug: string): string =>
	`${typeof chapter === 'string' ? chapter : chapter.id}.${slug}`;

export const getChapter = (id: string): Chapter | undefined => chapters.find((c) => c.id === id);

export interface FlatLesson {
	chapter: Chapter;
	lesson: LessonMeta;
	id: string;
	index: number;
}

export const allLessons: FlatLesson[] = chapters
	.flatMap((chapter) =>
		chapter.lessons.map((lesson) => ({ chapter, lesson, id: lessonId(chapter, lesson.slug) }))
	)
	.map((l, index) => ({ ...l, index }));

export const getLesson = (chapterId: string, slug: string): FlatLesson | undefined =>
	allLessons.find((l) => l.id === lessonId(chapterId, slug));

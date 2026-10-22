export interface PlaneCtx {
	/** world x -> svg x */
	x: (v: number) => number;
	/** world y -> svg y (flipped) */
	y: (v: number) => number;
	/** svg pixels per world unit */
	unit: () => number;
	/** pointer position -> world coordinates */
	toWorld: (clientX: number, clientY: number) => [number, number];
}

export const PLANE_KEY = Symbol('plane2d');

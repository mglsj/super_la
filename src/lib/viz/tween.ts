import { Tween, prefersReducedMotion } from 'svelte/motion';
import { cubicInOut } from 'svelte/easing';
import type { Mat } from '#lib/math/mat.js';

/** A tweened matrix: read `.current`, call `.set(target)` to animate. */
export function matrixTween(initial: Mat, duration = 900) {
	return new Tween<Mat>(initial, { duration, easing: cubicInOut });
}

/** Animate to `target`, jumping instantly when the user prefers reduced motion. */
export function animateTo(t: Tween<Mat>, target: Mat, duration = 900) {
	return t.set(target, { duration: prefersReducedMotion.current ? 0 : duration });
}

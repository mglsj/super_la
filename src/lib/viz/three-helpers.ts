import type { Three } from './Scene3D.svelte';
import type { Group, Material, Mesh, Object3D, ArrowHelper } from 'three';

export const HEX = {
	iHat: 0x83c167,
	jHat: 0xfc6255,
	kHat: 0x58c4dd,
	yellow: 0xffd866,
	teal: 0x5cd0b3,
	purple: 0xb392d6,
	axis: 0x6b7a90,
	axisLine: 0x9aa7bb,
	orange: 0xff9f5a,
	grid: 0x3b6e8f
} as const;

/** A small text label that always faces the camera. */
export function addLabel(THREE: Three, scene: Object3D, text: string, at: number[], color = '#e6edf7', size = 0.42) {
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = 64;
	const g = canvas.getContext('2d')!;
	g.font = 'italic 600 44px Georgia, serif';
	g.textAlign = 'center';
	g.textBaseline = 'middle';
	g.lineWidth = 6;
	g.strokeStyle = '#0d1424';
	g.strokeText(text, 32, 34);
	g.fillStyle = color;
	g.fillText(text, 32, 34);
	const sprite = new THREE.Sprite(
		new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false })
	);
	sprite.position.set(at[0], at[1], at[2]);
	sprite.scale.set(size, size, 1);
	sprite.renderOrder = 20;
	scene.add(sprite);
	return sprite;
}

/**
 * Faint grid on the xy plane plus three labelled axes. The axes are a neutral grey on purpose,
 * so that coloured vectors in a figure are never confused with them.
 */
export function addAxes(THREE: Three, scene: Object3D, size = 4) {
	const grid = new THREE.GridHelper(size * 2, size * 2, HEX.axis, HEX.grid);
	grid.rotation.x = Math.PI / 2;
	(grid.material as Material).opacity = 0.3;
	(grid.material as Material).transparent = true;
	scene.add(grid);
	for (const [dir, name] of [
		[[1, 0, 0], 'x'],
		[[0, 1, 0], 'y'],
		[[0, 0, 1], 'z']
	] as const) {
		scene.add(
			new THREE.ArrowHelper(new THREE.Vector3(...dir), new THREE.Vector3(0, 0, 0), size, HEX.axisLine, 0.2, 0.1)
		);
		addLabel(THREE, scene, name, dir.map((c) => c * (size + 0.35)), '#aab4c6', 0.4);
	}
}

/** An arrow from `from` to `to`; returns it so callers can retarget it with `setArrow`. */
export function makeArrow(THREE: Three, from: number[], to: number[], color: number): ArrowHelper {
	const a = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 1, color, 0.22, 0.11);
	setArrow(THREE, a, from, to);
	return a;
}

export function setArrow(THREE: Three, a: ArrowHelper, from: number[], to: number[]) {
	const d = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
	const len = d.length();
	a.visible = len > 1e-6;
	if (!a.visible) return;
	a.position.set(from[0], from[1], from[2]);
	a.setDirection(d.normalize());
	a.setLength(len, Math.min(0.25, len * 0.4), Math.min(0.12, len * 0.2));
}

/** A translucent square plane through the origin with the given normal. */
export function makePlane(THREE: Three, normal: number[], size = 6, color: number = HEX.yellow): Mesh {
	const mesh = new THREE.Mesh(
		new THREE.PlaneGeometry(size, size),
		new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false })
	);
	orientPlane(THREE, mesh, normal);
	return mesh;
}

export function orientPlane(THREE: Three, mesh: Object3D, normal: number[]) {
	const n = new THREE.Vector3(...normal);
	if (n.lengthSq() < 1e-12) {
		mesh.visible = false;
		return;
	}
	mesh.visible = true;
	mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n.normalize());
}

export function makeSphere(THREE: Three, at: number[], color: number, r = 0.09): Mesh {
	const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), new THREE.MeshBasicMaterial({ color }));
	m.position.set(at[0], at[1], at[2]);
	return m;
}

export type { Group };

<script lang="ts" module>
	import type * as ThreeNS from 'three';

	export type Three = typeof ThreeNS;
	export interface SceneApi {
		THREE: Three;
		scene: ThreeNS.Scene;
		camera: ThreeNS.PerspectiveCamera;
		renderer: ThreeNS.WebGLRenderer;
	}
	export interface SceneHandle {
		/** called every frame; read reactive state here to keep the scene in sync */
		update?: (time: number) => void;
		dispose?: () => void;
	}
</script>

<script lang="ts">
	import { untrack } from 'svelte';

	interface Props {
		build: (api: SceneApi) => SceneHandle | void;
		height?: number;
		label?: string;
	}

	let { build, height = 360, label = '3D scene' }: Props = $props();

	let host: HTMLDivElement | undefined = $state();
	let failed = $state(false);

	$effect(() => {
		const el = host;
		if (!el) return;
		let cancelled = false;
		let cleanup: (() => void) | undefined;

		(async () => {
			try {
				const THREE = await import('three');
				const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
				if (cancelled) return;

				const scene = new THREE.Scene();
				const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
				camera.up.set(0, 0, 1);
				camera.position.set(5.5, -6.5, 4.5);
				const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
				el.appendChild(renderer.domElement);
				renderer.domElement.style.display = 'block';
				const controls = new OrbitControls(camera, renderer.domElement);
				controls.enableDamping = true;
				controls.enablePan = false;

				scene.add(new THREE.AmbientLight(0xffffff, 1.6));
				const sun = new THREE.DirectionalLight(0xffffff, 1.2);
				sun.position.set(4, -3, 6);
				scene.add(sun);

				const handle = untrack(() => build({ THREE, scene, camera, renderer })) ?? {};

				const resize = () => {
					const w = el.clientWidth;
					renderer.setSize(w, height);
					camera.aspect = w / height;
					camera.updateProjectionMatrix();
				};
				resize();
				const ro = new ResizeObserver(resize);
				ro.observe(el);

				let raf = 0;
				const loop = (t: number) => {
					raf = requestAnimationFrame(loop);
					handle.update?.(t / 1000);
					controls.update();
					renderer.render(scene, camera);
				};
				raf = requestAnimationFrame(loop);

				cleanup = () => {
					cancelAnimationFrame(raf);
					ro.disconnect();
					handle.dispose?.();
					controls.dispose();
					scene.traverse((o) => {
						const m = o as ThreeNS.Mesh;
						(o as ThreeNS.Sprite).material?.map?.dispose?.();
						m.geometry?.dispose?.();
						const mat = m.material as ThreeNS.Material | ThreeNS.Material[] | undefined;
						if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
						else mat?.dispose?.();
					});
					renderer.dispose();
					renderer.domElement.remove();
				};
			} catch {
				failed = true;
			}
		})();

		return () => {
			cancelled = true;
			cleanup?.();
		};
	});
</script>

<div
	bind:this={host}
	role="img"
	aria-label={label}
	class="relative w-full overflow-hidden rounded-lg bg-[#0d1424]"
	style="height: {height}px;"
>
	{#if failed}
		<p class="p-4 text-sm text-slate-400">3D view needs WebGL, which isn't available here.</p>
	{/if}
</div>

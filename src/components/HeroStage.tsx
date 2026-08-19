"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeBrushedMaps(size: number) {
  const rough = document.createElement("canvas");
  const normal = document.createElement("canvas");
  rough.width = rough.height = size;
  normal.width = normal.height = size;
  const r = rough.getContext("2d")!;
  const n = normal.getContext("2d")!;
  r.fillStyle = "#7a7a7a";
  r.fillRect(0, 0, size, size);
  n.fillStyle = "#8080ff";
  n.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    const shade = 96 + ((Math.sin(y * 0.37) + 1) * 28 + Math.random() * 22);
    r.fillStyle = `rgb(${shade},${shade},${shade})`;
    r.fillRect(0, y, size, 1);
    const nx = 128 + (Math.random() - 0.5) * 18;
    n.fillStyle = `rgb(${nx | 0},128,255)`;
    n.fillRect(0, y, size, 1);
  }
  const roughnessMap = new THREE.CanvasTexture(rough);
  const normalMap = new THREE.CanvasTexture(normal);
  for (const tex of [roughnessMap, normalMap]) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1.5, 10);
    tex.anisotropy = 4;
    tex.colorSpace = THREE.NoColorSpace;
  }
  return { roughnessMap, normalMap };
}

function composeStage(
  camera: THREE.PerspectiveCamera,
  sculpture: THREE.Group,
  w: number,
  h: number
) {
  const short = Math.min(w, h);
  const aspect = w / Math.max(h, 1);
  const compact = short < 420;
  camera.fov = compact ? 32 : 32;
  const z = compact ? 3.75 : 4.65;
  camera.position.set(0, 0.02, z + Math.max(0, 1.05 - aspect) * 0.35);
  camera.lookAt(0, 0, 0);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  sculpture.position.set(0, 0, 0);
  return short < 280 ? 1.22 : short < 360 ? 1.32 : short < 440 ? 1.42 : 1.18;
}

function buildStudioEnv(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  env.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(16, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0x07080c, side: THREE.BackSide })
    )
  );
  const softbox = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 7),
    new THREE.MeshBasicMaterial({ color: 0xe7edf6 })
  );
  softbox.position.set(3.8, 7.4, 5.6);
  softbox.lookAt(0, 0, 0);
  env.add(softbox);
  const rim = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 9),
    new THREE.MeshBasicMaterial({ color: 0xc8ccd2 })
  );
  rim.position.set(-8.2, 1.6, 1.4);
  rim.lookAt(0, 0, 0);
  env.add(rim);
  const map = pmrem.fromScene(env, 0.02).texture;
  env.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose();
    (mesh.material as THREE.Material | undefined)?.dispose();
  });
  pmrem.dispose();
  return map;
}

function scheduleIdle(fn: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    return window.requestIdleCallback(fn, { timeout: 600 });
  }
  return window.setTimeout(fn, 1);
}

function cancelIdle(id: number) {
  if (typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(id);
  } else {
    window.clearTimeout(id);
  }
}

export default function HeroStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stage = canvas.parentElement;
    if (!stage) return;

    let cancelled = false;
    let frame = 0;
    let ro: ResizeObserver | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let envMap: THREE.Texture | null = null;
    let roughnessMap: THREE.CanvasTexture | null = null;
    let normalMap: THREE.CanvasTexture | null = null;
    let sphereGeo: THREE.BufferGeometry | null = null;
    const ringGeos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];
    const onPointer = { current: null as ((e: PointerEvent) => void) | null };
    const syncClock = { current: null as (() => void) | null };

    const idleId = scheduleIdle(() => {
      if (cancelled || !canvas.isConnected) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !coarse,
        alpha: true,
        powerPreference: coarse ? "low-power" : "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.25 : 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;

      if (!coarse) {
        envMap = buildStudioEnv(renderer);
        scene.environment = envMap;
      }

      const maps = makeBrushedMaps(coarse ? 128 : 256);
      roughnessMap = maps.roughnessMap;
      normalMap = maps.normalMap;

      const sculpture = new THREE.Group();
      scene.add(sculpture);

      const metal = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d4d6d9"),
        metalness: 1,
        roughness: 0.18,
        roughnessMap,
        normalMap,
        normalScale: new THREE.Vector2(0.18, 0.18),
        envMapIntensity: coarse ? 0.6 : 1.65,
        clearcoat: 0.62,
        clearcoatRoughness: 0.12,
      });
      mats.push(metal);
      const ringMetal = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c2c5c9"),
        metalness: 1,
        roughness: 0.22,
        roughnessMap,
        envMapIntensity: coarse ? 0.5 : 1.45,
        clearcoat: 0.4,
        clearcoatRoughness: 0.22,
      });
      mats.push(ringMetal);

      const sphereSeg = coarse ? 24 : 48;
      sphereGeo = new THREE.SphereGeometry(0.48, sphereSeg, sphereSeg);
      sculpture.add(new THREE.Mesh(sphereGeo, metal));

      const ringTube = coarse ? 8 : 14;
      const ringCirc = coarse ? 48 : 96;
      const rings = [
        { r: 0.78, rx: Math.PI / 2, ry: 0, rz: 0, spin: [0, 0.22, 0] as const },
        { r: 0.94, rx: 0, ry: 0, rz: 0, spin: [0.18, 0, 0] as const },
        { r: 1.1, rx: 0, ry: Math.PI / 2, rz: 0, spin: [0, 0, 0.2] as const },
        { r: 1.26, rx: Math.PI / 3.2, ry: Math.PI / 5, rz: 0.35, spin: [0.12, 0.16, 0] as const },
      ].map((spec) => {
        const geo = new THREE.TorusGeometry(spec.r, 0.032, ringTube, ringCirc);
        ringGeos.push(geo);
        const mesh = new THREE.Mesh(geo, ringMetal);
        mesh.rotation.set(spec.rx, spec.ry, spec.rz);
        mesh.userData.spin = spec.spin;
        sculpture.add(mesh);
        return mesh;
      });

      sculpture.rotation.set(0.18, 0.35, -0.08);

      const key = new THREE.DirectionalLight(0xf4f5f6, 2.4);
      key.position.set(3.4, 5.2, 5.0);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xc8cacd, 0.85);
      fill.position.set(-5.0, 1.2, 2.2);
      scene.add(fill);
      const back = new THREE.DirectionalLight(0xe6e7e9, 0.9);
      back.position.set(0.2, 2.4, -5.6);
      scene.add(back);
      scene.add(new THREE.HemisphereLight(0xdedfe1, 0x09090b, 0.32));

      let baseScale = 1;
      const resize = () => {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w < 1 || h < 1 || !renderer) return;
        baseScale = composeStage(camera, sculpture, w, h);
        sculpture.scale.setScalar(baseScale);
        renderer.setSize(w, h, false);
        stage.dataset.size = Math.min(w, h) < 320 ? "xs" : Math.min(w, h) < 420 ? "sm" : Math.min(w, h) < 520 ? "md" : "lg";
      };

      const pointer = { x: 0, y: 0 };
      const targetRot = { x: 0.06, y: -0.2 };
      const handlePointer = (e: PointerEvent) => {
        const rect = stage.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      };
      onPointer.current = handlePointer;
      if (!coarse) stage.addEventListener("pointermove", handlePointer);

      const cardNodes = Array.from(stage.querySelectorAll<HTMLElement>(".hero-glass-card"));
      resize();
      ro = new ResizeObserver(resize);
      ro.observe(stage);

      let last = performance.now();
      let phase = 0;
      let tabHidden = document.hidden;
      const floatPhase = cardNodes.map((_, i) => i * 1.35);
      const onVis = () => {
        tabHidden = document.hidden;
        last = performance.now();
      };
      syncClock.current = onVis;
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("pageshow", onVis);
      window.addEventListener("focus", onVis);

      const tick = (now: number) => {
        if (cancelled || !renderer) return;
        frame = requestAnimationFrame(tick);
        let dt = (now - last) * 0.001;
        last = now;
        if (tabHidden || document.hidden || dt < 0) {
          last = now;
          return;
        }
        if (dt > 1 / 30) dt = 1 / 30;
        phase += dt;

        if (!reduceMotion) {
          const short = Math.min(stage.clientWidth, stage.clientHeight);
          const amp = short < 360 ? 3 : short < 480 ? 4.5 : 6;
          targetRot.x = 0.06 + pointer.y * (coarse ? 0 : 0.07);
          sculpture.rotation.y += 0.14 * dt;
          sculpture.rotation.x += (targetRot.x - sculpture.rotation.x) * Math.min(1, 2.2 * dt);
          sculpture.position.y = Math.sin(phase * 0.55) * 0.05;
          rings.forEach((mesh) => {
            const [sx, sy, sz] = mesh.userData.spin as [number, number, number];
            mesh.rotation.x += sx * dt;
            mesh.rotation.y += sy * dt;
            mesh.rotation.z += sz * dt;
          });
          cardNodes.forEach((node, i) => {
            node.style.setProperty("--float-y", Math.sin(phase * 0.85 + floatPhase[i]) * amp + "px");
            node.style.setProperty("--float-x", Math.cos(phase * 0.5 + floatPhase[i]) * amp * 0.55 + "px");
          });
        }
        renderer.render(scene, camera);
      };
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelIdle(idleId as number);
      cancelAnimationFrame(frame);
      ro?.disconnect();
      if (syncClock.current) {
        document.removeEventListener("visibilitychange", syncClock.current);
        window.removeEventListener("pageshow", syncClock.current);
        window.removeEventListener("focus", syncClock.current);
      }
      if (onPointer.current) stage.removeEventListener("pointermove", onPointer.current);
      renderer?.dispose();
      sphereGeo?.dispose();
      ringGeos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      roughnessMap?.dispose();
      normalMap?.dispose();
      envMap?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-stage-canvas" aria-hidden="true" />;
}

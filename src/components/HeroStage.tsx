"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Check, Clock, Code2, Shield } from "lucide-react";

type CardIcon = "clock" | "code" | "shield" | "check";

const CARD_DATA: {
  id: string;
  className: string;
  title: string;
  body: string;
  meta: string;
  icon: CardIcon | null;
}[] = [
  { id: "price", className: "hero-glass-card--price", title: "Zero to MVP", body: "\u20B929,999", meta: "one-time", icon: null },
  { id: "time", className: "hero-glass-card--time", title: "Timeline", body: "10\u201314 days", meta: "live and showcase-ready", icon: "clock" },
  { id: "own", className: "hero-glass-card--own", title: "Ownership", body: "Full source", meta: "code + docs transferred", icon: "shield" },
  { id: "core", className: "hero-glass-card--core", title: "Core MVP", body: "Essential features", meta: "responsive web app", icon: "code" },
];

function Icon({ name }: { name: CardIcon }) {
  const props = { size: 14 as number, "aria-hidden": true as const, className: "hero-glass-card__svg" };
  if (name === "clock") return <Clock {...props} />;
  if (name === "code") return <Code2 {...props} />;
  if (name === "shield") return <Shield {...props} />;
  return <Check {...props} />;
}

/** Brushed-steel grain. Grain runs along the tube (U) so the knot reads like the studio still. */
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
  camera.fov = compact ? 32 : 26;
  const z = compact ? 3.75 : 3.55;
  camera.position.set(0, 0.02, z + Math.max(0, 1.05 - aspect) * 0.35);
  camera.lookAt(0, 0, 0);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  sculpture.position.set(0, 0, 0);
  const s = short < 280 ? 1.22 : short < 360 ? 1.32 : short < 440 ? 1.42 : 1.52;
  return s;
}

function buildStudioEnv(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();

  env.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(16, 20, 16),
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

  const kick = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 3),
    new THREE.MeshBasicMaterial({ color: 0xd8dbe0 })
  );
  kick.position.set(0.4, 1.2, -7);
  kick.lookAt(0, 0, 0);
  env.add(kick);

  const bounce = new THREE.Mesh(
    new THREE.CircleGeometry(5, 24),
    new THREE.MeshBasicMaterial({ color: 0x1a1b1e })
  );
  bounce.rotation.x = -Math.PI / 2;
  bounce.position.y = -3.2;
  env.add(bounce);

  const map = pmrem.fromScene(env, 0.02).texture;
  env.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose();
    const mat = mesh.material as THREE.Material | undefined;
    mat?.dispose();
  });
  pmrem.dispose();
  return map;
}

export default function HeroStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const cardsEl = cardsRef.current;
    if (!canvas || !stage || !cardsEl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !coarse,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.35 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const envMap = buildStudioEnv(renderer);
    scene.environment = envMap;

    const { roughnessMap, normalMap } = makeBrushedMaps(coarse ? 256 : 512);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    const metal = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#d4d6d9"),
      metalness: 1,
      roughness: 0.18,
      roughnessMap,
      normalMap,
      normalScale: new THREE.Vector2(0.18, 0.18),
      envMapIntensity: 1.65,
      clearcoat: 0.62,
      clearcoatRoughness: 0.12,
    });
    if ("anisotropy" in metal) {
      (metal as THREE.MeshPhysicalMaterial & { anisotropy: number }).anisotropy = 0.7;
    }
    const ringMetal = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c2c5c9"),
      metalness: 1,
      roughness: 0.22,
      roughnessMap,
      envMapIntensity: 1.45,
      clearcoat: 0.4,
      clearcoatRoughness: 0.22,
    });

    const sphereSeg = coarse ? 32 : 56;
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.48, sphereSeg, sphereSeg), metal);
    sculpture.add(sphere);

    const ringTube = coarse ? 10 : 16;
    const ringCirc = coarse ? 80 : 140;
    const rings = [
      { r: 0.78, rx: Math.PI / 2, ry: 0, rz: 0, spin: [0, 0.22, 0] as const },
      { r: 0.94, rx: 0, ry: 0, rz: 0, spin: [0.18, 0, 0] as const },
      { r: 1.1, rx: 0, ry: Math.PI / 2, rz: 0, spin: [0, 0, 0.2] as const },
      { r: 1.26, rx: Math.PI / 3.2, ry: Math.PI / 5, rz: 0.35, spin: [0.12, 0.16, 0] as const },
    ].map((spec) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(spec.r, 0.032, ringTube, ringCirc),
        ringMetal
      );
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
    sculpture.scale.setScalar(0.001);
    sculpture.rotation.y = -0.55;

    const resize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (w < 1 || h < 1) return;
      baseScale = composeStage(camera, sculpture, w, h);
      renderer.setSize(w, h, false);
      stage.style.setProperty("--stage-w", w + "px");
      stage.style.setProperty("--stage-h", h + "px");
      const short = Math.min(w, h);
      stage.dataset.size = short < 320 ? "xs" : short < 420 ? "sm" : short < 520 ? "md" : "lg";
    };

    const pointer = { x: 0, y: 0 };
    const targetRot = { x: 0.06, y: -0.2 };
    const onPointer = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    if (!coarse) stage.addEventListener("pointermove", onPointer);

    const cardNodes = Array.from(cardsEl.querySelectorAll<HTMLElement>(".hero-glass-card"));
    cardNodes.forEach((n) => {
      n.style.opacity = "1";
      n.style.visibility = "visible";
    });

    gsap.ticker.lagSmoothing(0);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    if (!reduceMotion) {
      tl.to(sculpture.scale, { x: baseScale, y: baseScale, z: baseScale, duration: 1.15, ease: "power3.out" }, 0.04);
      tl.fromTo(sculpture.rotation, { y: -1.2 }, { y: -0.2, duration: 1.4, ease: "power3.out" }, 0);
      tl.from(cardNodes, { y: 14, duration: 0.65, stagger: 0.09, ease: "power3.out", clearProps: "transform", immediateRender: false }, 0.35);
    } else {
      sculpture.scale.setScalar(baseScale);
    }

    let frame = 0;
    let last = performance.now();
    let phase = 0;
    let tabHidden = document.hidden;
    const floatPhase = cardNodes.map((_, i) => i * 1.35);

    const syncClock = () => {
      tabHidden = document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", syncClock);
    window.addEventListener("pageshow", syncClock);
    window.addEventListener("focus", syncClock);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      let dt = (now - last) * 0.001;
      last = now;
      if (tabHidden || document.hidden || dt < 0) {
        last = now;
        return;
      }
      // Drop catch-up from a backgrounded tab — never step more than ~2 frames
      if (dt > 1 / 30) dt = 1 / 30;
      phase += dt;

      if (!reduceMotion) {
        const short = Math.min(stage.clientWidth, stage.clientHeight);
        const amp = short < 360 ? 3 : short < 480 ? 4.5 : 6;
        targetRot.y = -0.2 + pointer.x * (coarse ? 0 : 0.14);
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
      if (!tl.isActive() && Math.abs(sculpture.scale.x - baseScale) > 0.01) {
        sculpture.scale.setScalar(baseScale);
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.removeEventListener("visibilitychange", syncClock);
      window.removeEventListener("pageshow", syncClock);
      window.removeEventListener("focus", syncClock);
      stage.removeEventListener("pointermove", onPointer);
      tl.kill();
      renderer.dispose();
      sphere.geometry.dispose();
      rings.forEach((mesh) => mesh.geometry.dispose());
      metal.dispose();
      ringMetal.dispose();
      roughnessMap.dispose();
      normalMap.dispose();
      envMap.dispose();
    };
  }, []);

  return (
    <div className="hero-stage" ref={stageRef} data-size="lg">
      <canvas ref={canvasRef} className="hero-stage-canvas" aria-hidden="true" />
      <div className="hero-stage-glow" aria-hidden="true" />
      <div className="hero-glass-layer" ref={cardsRef}>
        {CARD_DATA.map((card) => (
          <div
            key={card.id}
            className={`hero-glass-card ${card.className}`}
            data-card={card.id}
          >
            <div className="hero-glass-card__top">
              {card.icon ? (
                <span className="hero-glass-card__icon">
                  <Icon name={card.icon} />
                </span>
              ) : null}
              <span className="hero-glass-card__label">{card.title}</span>
            </div>
            <p className="hero-glass-card__value">{card.body}</p>
            <p className="hero-glass-card__meta">{card.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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

function fitScene(camera: THREE.PerspectiveCamera, group: THREE.Group, w: number, h: number) {
  const short = Math.min(w, h);
  const aspect = w / Math.max(h, 1);
  camera.fov = short < 360 ? 46 : short < 480 ? 42 : 38;
  const zBase = short < 320 ? 6.4 : short < 420 ? 5.8 : short < 520 ? 5.4 : 5.15;
  camera.position.set(0, short < 380 ? 0.08 : 0.12, zBase + Math.max(0, 1.15 - aspect) * 0.85);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  const s = short < 280 ? 0.72 : short < 360 ? 0.82 : short < 440 ? 0.9 : short < 520 ? 0.96 : 1;
  group.scale.setScalar(s);
  return s;
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
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !coarse,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const envGeo = new THREE.SphereGeometry(12, 24, 24);
    const envMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: "varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "varying vec3 vPos;void main(){vec3 n=normalize(vPos);float h=n.y*0.5+0.5;vec3 top=vec3(0.55,0.62,0.78);vec3 mid=vec3(0.12,0.14,0.2);vec3 bot=vec3(0.04,0.05,0.08);vec3 col=mix(bot,mid,smoothstep(0.0,0.55,h));col=mix(col,top,smoothstep(0.45,1.0,h));col+=vec3(0.25,0.4,0.7)*pow(1.0-abs(n.y),3.0)*0.35;gl_FragColor=vec4(col,1.0);}",
    });
    envScene.add(new THREE.Mesh(envGeo, envMat));
    const envMap = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;
    envGeo.dispose();
    envMat.dispose();
    pmrem.dispose();

    const group = new THREE.Group();
    scene.add(group);

    const metal = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("#c5cddb"), metalness: 1, roughness: 0.18, envMapIntensity: 1.35, clearcoat: 0.55, clearcoatRoughness: 0.2 });
    const darkMetal = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("#6b7385"), metalness: 1, roughness: 0.28, envMapIntensity: 1.1, clearcoat: 0.3, clearcoatRoughness: 0.35 });

    const knotSeg = coarse ? 140 : 200;
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.95, 0.28, knotSeg, coarse ? 24 : 32, 2, 3), metal);
    knot.rotation.x = 0.45;
    knot.rotation.z = -0.25;
    group.add(knot);

    const ribbon = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.045, 16, coarse ? 96 : 140), darkMetal);
    ribbon.rotation.x = Math.PI / 2.4;
    ribbon.rotation.y = 0.4;
    group.add(ribbon);

    const latticeMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("#9aa6bc"), metalness: 0.95, roughness: 0.22, wireframe: true, transparent: true, opacity: 0.55, envMapIntensity: 1.2 });
    const lattice = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), latticeMat);
    lattice.position.set(0.15, -0.1, 0.2);
    group.add(lattice);

    const key = new THREE.DirectionalLight(0xe8eef8, 2.2);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x6a8cff, 0.55);
    fill.position.set(-5, -1, 2);
    scene.add(fill);
    const rimL = new THREE.DirectionalLight(0xffffff, 0.8);
    rimL.position.set(0, 2, -6);
    scene.add(rimL);
    scene.add(new THREE.AmbientLight(0x8899bb, 0.35));

    let baseScale = 1;
    group.scale.setScalar(0.001);
    group.rotation.y = -0.6;

    const resize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (w < 1 || h < 1) return;
      baseScale = fitScene(camera, group, w, h);
      renderer.setSize(w, h, false);
      stage.style.setProperty("--stage-w", w + "px");
      stage.style.setProperty("--stage-h", h + "px");
      const short = Math.min(w, h);
      stage.dataset.size = short < 320 ? "xs" : short < 420 ? "sm" : short < 520 ? "md" : "lg";
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const pointer = { x: 0, y: 0 };
    const targetRot = { x: 0.1, y: -0.25 };
    const onPointer = (e: PointerEvent) => {
      if (coarse) return;
      const rect = stage.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    stage.addEventListener("pointermove", onPointer);

    const cardNodes = Array.from(cardsEl.querySelectorAll<HTMLElement>(".hero-glass-card"));
    cardNodes.forEach((n) => { n.style.opacity = "1"; n.style.visibility = "visible"; });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (!reduceMotion) {
      tl.to(group.scale, { x: baseScale, y: baseScale, z: baseScale, duration: 1.1, ease: "power3.out" }, 0.05);
      tl.fromTo(group.rotation, { y: -1.15 }, { y: -0.25, duration: 1.35, ease: "power3.out" }, 0);
      tl.from(cardNodes, { y: 14, duration: 0.65, stagger: 0.09, ease: "power3.out", clearProps: "transform", immediateRender: false }, 0.35);
    } else {
      group.scale.setScalar(baseScale);
    }

    let frame = 0;
    const t0 = performance.now();
    const floatPhase = cardNodes.map((_, i) => i * 1.35);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const t = (now - t0) * 0.001;
      if (!reduceMotion) {
        const short = Math.min(stage.clientWidth, stage.clientHeight);
        const amp = short < 360 ? 3 : short < 480 ? 4.5 : 6;
        targetRot.y = -0.25 + pointer.x * (coarse ? 0 : 0.16);
        targetRot.x = 0.1 + pointer.y * (coarse ? 0 : 0.09);
        group.rotation.y += (targetRot.y + t * 0.2 - group.rotation.y) * 0.035;
        group.rotation.x += (targetRot.x - group.rotation.x) * 0.035;
        knot.rotation.y = t * 0.16;
        ribbon.rotation.z = t * 0.11;
        lattice.rotation.x = t * 0.22;
        lattice.rotation.y = -t * 0.18;
        const isGrid = short < 420;
        cardNodes.forEach((node, i) => {
          if (isGrid) {
            node.style.setProperty("--float-y", "0px");
            node.style.setProperty("--float-x", "0px");
            return;
          }
          node.style.setProperty("--float-y", Math.sin(t * 0.85 + floatPhase[i]) * amp + "px");
          node.style.setProperty("--float-x", Math.cos(t * 0.5 + floatPhase[i]) * amp * 0.65 + "px");
        });
      }
      if (!tl.isActive() && Math.abs(group.scale.x - baseScale) > 0.01) {
        group.scale.setScalar(baseScale);
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      stage.removeEventListener("pointermove", onPointer);
      tl.kill();
      renderer.dispose();
      knot.geometry.dispose();
      ribbon.geometry.dispose();
      lattice.geometry.dispose();
      metal.dispose();
      darkMetal.dispose();
      latticeMat.dispose();
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

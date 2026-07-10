"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const colors = {
  silver1: 0xE0E0E0,
  silver2: 0xC0C0C0,
  silver3: 0xD0D0D0,
  silver4: 0xA8A8A8,
  silver5: 0xB8B8B8
};

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // Configuration
    const particleCount = 80;
    const connectionDistance = 2.5;
    const boxWidth = 20;
    const boxHeight = 12;
    const boxDepth = 12;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle positions & velocities array
    const particles: { position: THREE.Vector3, velocity: THREE.Vector3, size: number, color: THREE.Color }[] = [];
    const positions = new Float32Array(particleCount * 3);

    // Generate random particles
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * boxWidth;
      const y = (Math.random() - 0.5) * boxHeight;
      const z = (Math.random() - 0.5) * boxDepth;

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006
        ),
        size: Math.random() * 0.1 + 0.05,
        color: i % 2 === 0 ? new THREE.Color(colors.silver1) : new THREE.Color(colors.silver5)
      });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const colorsArray = new Float32Array(particleCount * 3);
    particles.forEach((p, idx) => {
      colorsArray[idx * 3] = p.color.r;
      colorsArray[idx * 3 + 1] = p.color.g;
      colorsArray[idx * 3 + 2] = p.color.b;
    });
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsMesh);

    const lineGeometry = new THREE.BufferGeometry();
    const maxLineConnections = particleCount * 6;
    const linePositions = new Float32Array(maxLineConnections * 2 * 3);
    const lineColors = new Float32Array(maxLineConnections * 2 * 3);

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    const mouse = new THREE.Vector2(-999, -999);
    const mouseWorld = new THREE.Vector3(-999, -999, 0);

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseWorld.set(mouse.x * 5, mouse.y * 3.5, 0);
    };
    window.addEventListener("mousemove", onMouseMove);

    let scrollProgress = 0;
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = window.scrollY / maxScroll;
      }
    };
    window.addEventListener("scroll", onScroll);

    let animationFrameId: number;

    function animateBackground() {
      animationFrameId = requestAnimationFrame(animateBackground);

      pointsMesh.rotation.y = scrollProgress * 0.5 + Date.now() * 0.0001;
      lineMesh.rotation.y = scrollProgress * 0.5 + Date.now() * 0.0001;

      if (mouse.x !== -999) {
        gsap.to(scene.rotation, {
          y: mouse.x * 0.2,
          x: -mouse.y * 0.15,
          duration: 1.5,
          ease: "power2.out"
        });
      }

      const posAttr = pointsGeometry.attributes.position.array as Float32Array;
      const linePosAttr = lineGeometry.attributes.position.array as Float32Array;
      const lineColAttr = lineGeometry.attributes.color.array as Float32Array;

      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        p.position.add(p.velocity);

        if (Math.abs(p.position.x) > boxWidth / 2) p.velocity.x *= -1;
        if (Math.abs(p.position.y) > boxHeight / 2) p.velocity.y *= -1;
        if (Math.abs(p.position.z) > boxDepth / 2) p.velocity.z *= -1;

        if (mouse.x !== -999) {
          const distanceToMouse = p.position.distanceTo(mouseWorld);
          if (distanceToMouse < 3.5) {
            const force = (3.5 - distanceToMouse) * 0.0015;
            const attraction = new THREE.Vector3().subVectors(mouseWorld, p.position).normalize().multiplyScalar(force);
            p.position.add(attraction);
          }
        }

        posAttr[i * 3] = p.position.x;
        posAttr[i * 3 + 1] = p.position.y;
        posAttr[i * 3 + 2] = p.position.z;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dist = p1.position.distanceTo(p2.position);

          if (dist < connectionDistance) {
            linePosAttr[lineIndex * 3] = p1.position.x;
            linePosAttr[lineIndex * 3 + 1] = p1.position.y;
            linePosAttr[lineIndex * 3 + 2] = p1.position.z;

            linePosAttr[(lineIndex + 1) * 3] = p2.position.x;
            linePosAttr[(lineIndex + 1) * 3 + 1] = p2.position.y;
            linePosAttr[(lineIndex + 1) * 3 + 2] = p2.position.z;

            lineColAttr[lineIndex * 3] = p1.color.r;
            lineColAttr[lineIndex * 3 + 1] = p1.color.g;
            lineColAttr[lineIndex * 3 + 2] = p1.color.b;

            lineColAttr[(lineIndex + 1) * 3] = p2.color.r;
            lineColAttr[(lineIndex + 1) * 3 + 1] = p2.color.g;
            lineColAttr[(lineIndex + 1) * 3 + 2] = p2.color.b;

            lineIndex += 2;
          }

          if (lineIndex >= maxLineConnections * 2) break;
        }
        if (lineIndex >= maxLineConnections * 2) break;
      }

      for (let k = lineIndex * 3; k < maxLineConnections * 2 * 3; k++) {
        linePosAttr[k] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animateBackground();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} id="bg-canvas"></canvas>
    </div>
  );
}

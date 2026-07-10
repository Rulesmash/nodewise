"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const colors = {
  silver1: 0xE0E0E0,
  silver2: 0xC0C0C0,
  silver3: 0xD0D0D0,
  silver4: 0xA8A8A8,
  silver5: 0xB8B8B8
};

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined" && sessionStorage.getItem("nodewise_preloaded") === "true") {
      setIsVisible(false);
      onComplete();
      return;
    }

    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    // We assume the window innerWidth/Height for initial preloader 
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 3.0, 50);
    pointLight1.position.set(-6, 6, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe0e0e0, 3.0, 50);
    pointLight2.position.set(6, -6, 6);
    scene.add(pointLight2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(0, 0, 8);
    scene.add(dirLight);

    const targetNodes = [
      { pos: new THREE.Vector3(-1.3, 1.6, 0), color: colors.silver1 },
      { pos: new THREE.Vector3(-1.3, -1.6, 0), color: colors.silver2 },
      { pos: new THREE.Vector3(0, 0, 0), color: colors.silver3 },
      { pos: new THREE.Vector3(1.3, -1.6, 0), color: colors.silver4 },
      { pos: new THREE.Vector3(1.3, 1.6, 0), color: colors.silver5 }
    ];

    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const torusGeom = new THREE.TorusGeometry(0.28, 0.07, 16, 100);
    const nodeMeshes: THREE.Mesh[] = [];

    targetNodes.forEach((nodeData) => {
      const material = new THREE.MeshPhongMaterial({
        color: nodeData.color,
        emissive: nodeData.color,
        emissiveIntensity: 0.6,
        shininess: 100,
        specular: 0xffffff
      });
      const mesh = new THREE.Mesh(torusGeom, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      );
      
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    function createConnection(p1: THREE.Vector3, p2: THREE.Vector3, colorVal1: number, colorVal2: number) {
      const group = new THREE.Group();
      const material = new THREE.MeshPhongMaterial({
        vertexColors: true,
        emissive: new THREE.Color(0x111111),
        shininess: 90,
        specular: 0xffffff
      });

      const direction = new THREE.Vector3().subVectors(p2, p1);
      const length = direction.length();
      
      const cylinderGeom = new THREE.CylinderGeometry(0.08, 0.08, length, 16);
      
      const numVertices = cylinderGeom.attributes.position.count;
      const colorsAttr = new Float32Array(numVertices * 3);
      const c1 = new THREE.Color(colorVal1);
      const c2 = new THREE.Color(colorVal2);
      
      for (let i = 0; i < numVertices; i++) {
        const y = cylinderGeom.attributes.position.getY(i);
        const t = (y / length) + 0.5;
        const c = new THREE.Color().lerpColors(c1, c2, t);
        colorsAttr[i * 3] = c.r;
        colorsAttr[i * 3 + 1] = c.g;
        colorsAttr[i * 3 + 2] = c.b;
      }
      cylinderGeom.setAttribute('color', new THREE.BufferAttribute(colorsAttr, 3));
      
      cylinderGeom.translate(0, length / 2, 0);
      cylinderGeom.rotateX(Math.PI / 2);
      
      const mesh = new THREE.Mesh(cylinderGeom, material);
      mesh.scale.set(1, 1, 0);
      
      group.add(mesh);
      
      group.position.copy(p1);
      group.lookAt(p2);
      
      return { group, mesh, length };
    }

    const solidConnectionsData = [
      { from: 0, to: 1, color1: colors.silver1, color2: colors.silver2 },
      { from: 0, to: 2, color1: colors.silver1, color2: colors.silver3 },
      { from: 2, to: 3, color1: colors.silver3, color2: colors.silver4 },
      { from: 3, to: 4, color1: colors.silver4, color2: colors.silver5 }
    ];

    const connections: {from: number, to: number, meshGroup: THREE.Group, mesh: THREE.Mesh, originalLength: number, growProgress: number}[] = [];
    const connectionGroup = new THREE.Group();
    scene.add(connectionGroup);

    solidConnectionsData.forEach((data) => {
      const p1 = nodeMeshes[data.from].position;
      const p2 = nodeMeshes[data.to].position;
      const conn = createConnection(p1, p2, data.color1, data.color2);
      connectionGroup.add(conn.group);
      
      connections.push({
        from: data.from,
        to: data.to,
        meshGroup: conn.group,
        mesh: conn.mesh,
        originalLength: conn.length,
        growProgress: 0
      });
    });

    const tl = gsap.timeline({
      onUpdate: () => {
        nodeGroup.rotation.y = tl.progress() * 0.3;
        connectionGroup.rotation.y = tl.progress() * 0.3;
        
        connections.forEach((conn) => {
          const p1 = nodeMeshes[conn.from].position;
          const p2 = nodeMeshes[conn.to].position;
          
          conn.meshGroup.position.copy(p1);
          conn.meshGroup.lookAt(p2);
          
          const currentLength = new THREE.Vector3().subVectors(p2, p1).length();
          conn.mesh.scale.set(1, 1, conn.growProgress);
          
          const scaleFactor = currentLength / conn.originalLength;
          conn.mesh.scale.z *= scaleFactor;
        });
      }
    });

    tl.to(nodeMeshes.map(m => m.position), {
      x: (i) => targetNodes[i].pos.x,
      y: (i) => targetNodes[i].pos.y,
      z: (i) => targetNodes[i].pos.z,
      duration: 1.8,
      ease: "power3.inOut"
    });

    tl.to(connections, {
      growProgress: 1,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.1
    }, 0.9);

    const letters = document.querySelectorAll(".loader-brand-text .letter");
    if(letters.length) {
      tl.to(letters, {
        translateY: "0%",
        duration: 0.8,
        ease: "back.out(1.5)",
        stagger: 0.05
      }, 1.0);
    }

    tl.to("#loader-progress-bar", {
      width: "100%",
      duration: tl.duration(),
      ease: "none"
    }, 0);

    tl.add(() => {
      const status = document.querySelector(".loader-status");
      if(status) status.textContent = "Core operational.";
    });

    tl.to([nodeGroup.rotation, connectionGroup.rotation], {
      y: Math.PI * 2 + 0.3,
      duration: 1.4,
      ease: "power2.inOut"
    }, "+=0.3");

    tl.to([nodeGroup.position, connectionGroup.position], {
      z: -4,
      opacity: 0,
      duration: 1.0,
      ease: "power2.in"
    }, "-=1.1");

    tl.to(container, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        cancelAnimationFrame(reqId);
        sessionStorage.setItem("nodewise_preloaded", "true");
        setIsVisible(false);
        onComplete();
      }
    });

    let reqId: number;
    function animate() {
      reqId = requestAnimationFrame(animate);
      
      if (tl.progress() > 0.9) {
        nodeGroup.rotation.y += 0.003;
        connectionGroup.rotation.y += 0.003;
        
        nodeGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
        connectionGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
      }
      
      renderer.render(scene, camera);
    }
    
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", onResize);
      tl.kill();
      renderer.dispose();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div id="preloader" className="preloader" ref={containerRef}>
      <div className="preloader-canvas-container">
        <canvas id="preloader-canvas" ref={canvasRef}></canvas>
      </div>
      <div className="preloader-ui">
        <div id="loader-text-popup" className="loader-brand-text">
          <span className="letter">n</span><span className="letter">o</span><span className="letter">d</span>
          <span className="letter">e</span><span className="letter">w</span><span className="letter">i</span>
          <span className="letter">s</span><span className="letter">e</span><span className="letter">.</span>
          <span className="letter">c</span><span className="letter">c</span>
        </div>
        <div className="loader-bar-container">
          <div id="loader-progress-bar" className="loader-progress-bar"></div>
        </div>
        <p className="loader-status">Assembling architectural nodes...</p>
      </div>
    </div>
  );
}

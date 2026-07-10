/**
 * Nodewise 3D Scenes
 * Handles the 3D preloader assembly and the ambient background particle network.
 */

// Initialize scenes when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const appContainer = document.getElementById("app-container");
  
  if (sessionStorage.getItem("nodewise_preloaded") === "true") {
    // Skip preloader on subsequent visits
    if (preloader) preloader.style.display = "none";
    document.body.classList.remove("loading");
    if (appContainer) {
      appContainer.classList.remove("app-hidden");
      appContainer.classList.add("app-visible");
    }
    
    // Still need to init icons if skipped
    if (window.lucide) {
      window.lucide.createIcons();
    }
  } else {
    // First visit in this session
    initPreloader();
    sessionStorage.setItem("nodewise_preloaded", "true");
  }
  
  initBackgroundNetwork();
});

// Brand colors converted to HEX colors for Three.js (matching user specifications)
const colors = {
  silver1: 0xE0E0E0,      // Node 1
  silver2: 0xC0C0C0,      // Node 2
  silver3: 0xD0D0D0,      // Node 3
  silver4: 0xA8A8A8,      // Node 4
  silver5: 0xB8B8B8       // Node 5
};

/* ==========================================================================
   PRELOADER INTERACTIVE 3D ANIMATION
   ========================================================================== */
function initPreloader() {
  const canvas = document.getElementById("preloader-canvas");
  if (!canvas) return;

  const container = canvas.parentElement;
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene Setup
  const scene = new THREE.Scene();
  
  // Camera Setup
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 8;

  // Renderer Setup
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Light Setup
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

  // Define Target Coordinates for the "N" Logo Centered at (0, 0, 0)
  // Perfectly matching the geometry proportions of the real logo-full.png
  const targetNodes = [
    { pos: new THREE.Vector3(-1.3, 1.6, 0), color: colors.silver1 },
    { pos: new THREE.Vector3(-1.3, -1.6, 0), color: colors.silver2 },
    { pos: new THREE.Vector3(0, 0, 0), color: colors.silver3 },
    { pos: new THREE.Vector3(1.3, -1.6, 0), color: colors.silver4 },
    { pos: new THREE.Vector3(1.3, 1.6, 0), color: colors.silver5 }
  ];

  // Create Torus Meshes for Nodes (Hollow Rings!)
  const nodeGroup = new THREE.Group();
  scene.add(nodeGroup);

  // Torus Geometry matching the N logo rings
  const torusGeom = new THREE.TorusGeometry(0.28, 0.07, 16, 100);
  const nodeMeshes = [];

  targetNodes.forEach((nodeData) => {
    const material = new THREE.MeshPhongMaterial({
      color: nodeData.color,
      emissive: nodeData.color,
      emissiveIntensity: 0.6,
      shininess: 100,
      specular: 0xffffff
    });
    const mesh = new THREE.Mesh(torusGeom, material);
    
    // Position scattered initially in 3D space
    mesh.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4
    );
    
    nodeGroup.add(mesh);
    nodeMeshes.push(mesh);
  });

  // Solid Cylinder Connection Helper with linear vertex color gradients
  function createConnection(p1, p2, colorVal1, colorVal2) {
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
    
    // Apply vertex color gradient along length of cylinder (before translate/rotate)
    const numVertices = cylinderGeom.attributes.position.count;
    const colorsAttr = new Float32Array(numVertices * 3);
    const c1 = new THREE.Color(colorVal1);
    const c2 = new THREE.Color(colorVal2);
    
    for (let i = 0; i < numVertices; i++) {
      const y = cylinderGeom.attributes.position.getY(i);
      // y is from -length/2 to length/2. Normalize to 0 to 1.
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
    mesh.scale.set(1, 1, 0); // Scale grows along Z axis
    
    group.add(mesh);
    
    // Position parent group at p1 and point it toward p2
    group.position.copy(p1);
    group.lookAt(p2);
    
    return { group, mesh, length };
  }

  // Core Solid Connections matching gradient flow:
  // Node 1 (0) -> Node 2 (1) (Vertical Left)
  // Node 1 (0) -> Node 3 (2) (Diagonal Upper-Left)
  // Node 3 (2) -> Node 4 (3) (Diagonal Lower-Right)
  // Node 4 (3) -> Node 5 (4) (Vertical Right)
  const solidConnectionsData = [
    { from: 0, to: 1, color1: colors.silver1, color2: colors.silver2 },
    { from: 0, to: 2, color1: colors.silver1, color2: colors.silver3 },
    { from: 2, to: 3, color1: colors.silver3, color2: colors.silver4 },
    { from: 3, to: 4, color1: colors.silver4, color2: colors.silver5 }
  ];

  const connections = [];
  const connectionGroup = new THREE.Group();
  scene.add(connectionGroup);

  // Initialize solid connections synchronously so GSAP resolves targets correctly
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

  // Preloader Timeline Setup using GSAP
  const tl = gsap.timeline({
    onUpdate: () => {
      // Slowly rotate the logo during assembly
      nodeGroup.rotation.y = tl.progress() * 0.3;
      connectionGroup.rotation.y = tl.progress() * 0.3;
      
      // Update dynamic connections as nodes fly in
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

  // Step 1: Animate Nodes (Toruses) to target positions
  tl.to(nodeMeshes.map(m => m.position), {
    x: (i) => targetNodes[i].pos.x,
    y: (i) => targetNodes[i].pos.y,
    z: (i) => targetNodes[i].pos.z,
    duration: 1.8,
    ease: "power3.inOut"
  });

  // Step 2: Animate connections growing (starting at 0.9s)
  tl.to(connections, {
    growProgress: 1,
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.1
  }, 0.9);

  // HTML letter popup trigger
  const letters = document.querySelectorAll(".loader-brand-text .letter");
  tl.to(letters, {
    translateY: "0%",
    duration: 0.8,
    ease: "back.out(1.5)",
    stagger: 0.05
  }, 1.0);

  // Bind loading bar
  tl.to("#loader-progress-bar", {
    width: "100%",
    duration: tl.duration(),
    ease: "none"
  }, 0);

  tl.add(() => {
    document.querySelector(".loader-status").textContent = "Core operational.";
  });

  // Spin logo out
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

  tl.to("#preloader", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      cancelAnimationFrame(reqId);
      document.getElementById("preloader").style.display = "none";
      document.body.classList.remove("loading");
      
      const app = document.getElementById("app-container");
      app.classList.remove("app-hidden");
      app.classList.add("app-visible");
      
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  });

  // Render Loop
  let reqId;
  function animate() {
    reqId = requestAnimationFrame(animate);
    
    // Ambient floating rotation after assembly
    if (tl.progress() > 0.9) {
      nodeGroup.rotation.y += 0.003;
      connectionGroup.rotation.y += 0.003;
      
      nodeGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
      connectionGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
    }
    
    renderer.render(scene, camera);
  }
  
  animate();

  // Resize Handler
  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ==========================================================================
   AMBIENT BACKGROUND PARTICLE NETWORK
   ========================================================================== */
function initBackgroundNetwork() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

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
  const particles = [];
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
      // Assign gradient colors from colors list
      color: i % 2 === 0 ? new THREE.Color(colors.silver1) : new THREE.Color(colors.silver5)
    });

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  // Create THREE.Points for Node Dots
  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Build custom colored points using vertex colors or simple texture
  const colorsArray = new Float32Array(particleCount * 3);
  particles.forEach((p, idx) => {
    colorsArray[idx * 3] = p.color.r;
    colorsArray[idx * 3 + 1] = p.color.g;
    colorsArray[idx * 3 + 2] = p.color.b;
  });
  pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

  // Texture-less glowing circular particles
  const pointsMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true
  });

  const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(pointsMesh);

  // Create Line Segment Geometry for Connections
  const lineGeometry = new THREE.BufferGeometry();
  const maxLineConnections = particleCount * 6; // Cap lines for performance
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

  // Mouse Interaction Vector
  const mouse = new THREE.Vector2(-999, -999);
  const mouseWorld = new THREE.Vector3(-999, -999, 0);

  // Mouse move handler
  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Convert mouse to 3D coords
    mouseWorld.set(mouse.x * 5, mouse.y * 3.5, 0);
  });

  // Window scroll handler: rotates background network and shifts position
  let scrollProgress = 0;
  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      scrollProgress = window.scrollY / maxScroll;
    }
  });

  // Render loop
  function animateBackground() {
    requestAnimationFrame(animateBackground);

    // Dynamic scroll rotation
    pointsMesh.rotation.y = scrollProgress * 0.5 + Date.now() * 0.0001;
    lineMesh.rotation.y = scrollProgress * 0.5 + Date.now() * 0.0001;
    
    // Slow tilt based on mouse position
    if (mouse.x !== -999) {
      gsap.to(scene.rotation, {
        y: mouse.x * 0.2,
        x: -mouse.y * 0.15,
        duration: 1.5,
        ease: "power2.out"
      });
    }

    const posAttr = pointsGeometry.attributes.position.array;
    const linePosAttr = lineGeometry.attributes.position.array;
    const lineColAttr = lineGeometry.attributes.color.array;

    let lineIndex = 0;

    // 1. Update Particle positions and draw nodes
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];

      // Ambient movement
      p.position.add(p.velocity);

      // Boundary collision checks (bounce back)
      if (Math.abs(p.position.x) > boxWidth / 2) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > boxHeight / 2) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > boxDepth / 2) p.velocity.z *= -1;

      // Mouse attraction logic
      if (mouse.x !== -999) {
        const distanceToMouse = p.position.distanceTo(mouseWorld);
        if (distanceToMouse < 3.5) {
          // Attract towards mouse
          const force = (3.5 - distanceToMouse) * 0.0015;
          const attraction = new THREE.Vector3().subVectors(mouseWorld, p.position).normalize().multiplyScalar(force);
          p.position.add(attraction);
        }
      }

      // Write updated coordinates
      posAttr[i * 3] = p.position.x;
      posAttr[i * 3 + 1] = p.position.y;
      posAttr[i * 3 + 2] = p.position.z;
    }
    pointsGeometry.attributes.position.needsUpdate = true;

    // 2. Connect near nodes
    for (let i = 0; i < particleCount; i++) {
      const p1 = particles[i];

      for (let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j];
        const dist = p1.position.distanceTo(p2.position);

        if (dist < connectionDistance) {
          // Draw connecting line segment
          linePosAttr[lineIndex * 3] = p1.position.x;
          linePosAttr[lineIndex * 3 + 1] = p1.position.y;
          linePosAttr[lineIndex * 3 + 2] = p1.position.z;

          linePosAttr[(lineIndex + 1) * 3] = p2.position.x;
          linePosAttr[(lineIndex + 1) * 3 + 1] = p2.position.y;
          linePosAttr[(lineIndex + 1) * 3 + 2] = p2.position.z;

          // Color interpolation (match colors of the nodes connected)
          lineColAttr[lineIndex * 3] = p1.color.r;
          lineColAttr[lineIndex * 3 + 1] = p1.color.g;
          lineColAttr[lineIndex * 3 + 2] = p1.color.b;

          lineColAttr[(lineIndex + 1) * 3] = p2.color.r;
          lineColAttr[(lineIndex + 1) * 3 + 1] = p2.color.g;
          lineColAttr[(lineIndex + 1) * 3 + 2] = p2.color.b;

          lineIndex += 2;
        }

        // Break if we exceed line allocation
        if (lineIndex >= maxLineConnections * 2) break;
      }
      if (lineIndex >= maxLineConnections * 2) break;
    }

    // Set points beyond active lineIndex to 0 to avoid drawing stray lines
    for (let k = lineIndex * 3; k < maxLineConnections * 2 * 3; k++) {
      linePosAttr[k] = 0;
    }

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animateBackground();

  // Resize Handler
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

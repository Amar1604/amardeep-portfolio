import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas = ({ theme = 'dark' }) => {
  const mountRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 450;
    const height = currentMount.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    currentMount.appendChild(renderer.domElement);

    // --- Vibrant Cyber-Luminescence Color Palette ---
    const isDark = theme === 'dark';
    const cyanLight = 0x00f0ff;       // Electric Cyan
    const sapphireLight = 0x3b82f6;   // Royal Sapphire
    const violetLight = 0x8b5cf6;     // Electric Violet
    const obsidianCore = isDark ? 0x090e17 : 0xf8fafc;
    const wireHighlight = isDark ? 0x38bdf8 : 0x0284c7;
    const ringCyan = isDark ? 0x22d3ee : 0x0284c7;
    const ringViolet = isDark ? 0x818cf8 : 0x4f46e5;

    // --- Three-Point Chromatic Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.0 : 1.4);
    scene.add(ambientLight);

    // 1. Key Light: Electric Cyan (Top Right)
    const keyLight = new THREE.PointLight(cyanLight, isDark ? 4.5 : 3.0, 25);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // 2. Fill Light: Royal Sapphire (Bottom Left)
    const fillLight = new THREE.PointLight(sapphireLight, isDark ? 3.5 : 2.5, 25);
    fillLight.position.set(-5, -4, 4);
    scene.add(fillLight);

    // 3. Rim / Back Light: Electric Violet (Back Silhouette)
    const rimLight = new THREE.PointLight(violetLight, isDark ? 4.0 : 2.5, 25);
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    // --- Central Composite 3D Tech Core ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 0. Inner Radiant Energy Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.9 : 0.8
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // Nucleus Point Light (glow radiates from inside)
    const nucleusLight = new THREE.PointLight(cyanLight, isDark ? 2.5 : 1.5, 6);
    coreGroup.add(nucleusLight);

    // 1. Faceted Obsidian Shell with High Metallic Specular Gloss
    const innerGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: obsidianCore,
      roughness: 0.15,
      metalness: 0.88,
      emissive: isDark ? 0x041830 : 0xdbeafe,
      emissiveIntensity: isDark ? 0.45 : 0.25,
      transparent: true,
      opacity: isDark ? 0.92 : 0.88
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Outer Luminous Wireframe Cage (Electric Cyan)
    const wireGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: wireHighlight,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.65 : 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 3. Crisp Diamond Node Vertices
    const posAttribute = wireGeo.getAttribute('position');
    const vertexGeo = new THREE.BufferGeometry();
    vertexGeo.setAttribute('position', posAttribute);

    const vertexMat = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x0f172a,
      size: 0.09,
      transparent: true,
      opacity: 0.95
    });
    const vertexPoints = new THREE.Points(vertexGeo, vertexMat);
    coreGroup.add(vertexPoints);

    // 4. Orbiting Metallic PBR Rings
    const createRing = (radius, tube, rotX, rotY, ringColor, roughness, metalness) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColor,
        roughness,
        metalness,
        transparent: true,
        opacity: isDark ? 0.8 : 0.65
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createRing(2.35, 0.022, Math.PI / 3, Math.PI / 6, ringCyan, 0.12, 0.9);
    const ring2 = createRing(2.7, 0.016, -Math.PI / 4, Math.PI / 3, ringViolet, 0.18, 0.85);
    coreGroup.add(ring1);
    coreGroup.add(ring2);

    // 5. Dual-Color Orbiting Satellites (Tracer Nodes)
    const satellites = [];
    const satCount = 4;
    const satGeo = new THREE.SphereGeometry(0.08, 16, 16);

    for (let i = 0; i < satCount; i++) {
      const isCyanNode = i % 2 === 0;
      const satColor = isCyanNode
        ? (isDark ? 0x22d3ee : 0x0284c7)
        : (isDark ? 0xa78bfa : 0x6366f1);
      const satMat = new THREE.MeshBasicMaterial({ color: satColor });
      const sat = new THREE.Mesh(satGeo, satMat);

      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.45 + (i % 2) * 0.35;
      sat.userData = {
        angle,
        speed: 0.016 + (i % 3) * 0.005,
        radius,
        inclination: (i % 2 === 0 ? 1 : -1) * 0.65
      };
      coreGroup.add(sat);
      satellites.push(sat);
    }

    // 6. Ambient Stardust Sparkles
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x7dd3fc : 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: isDark ? 0.65 : 0.45
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    coreGroup.add(particleField);

    // --- Interactive Mouse & Drag Physics ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = 0.3;
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = width / 2;
    let windowHalfY = height / 2;

    const handlePointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - windowHalfX) * 0.002;
      mouseY = (e.clientY - rect.top - windowHalfY) * 0.002;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous autonomous idle spin + mouse inertia lerping
      if (!isDragging) {
        targetRotationY += 0.005;
        targetRotationX = Math.sin(elapsedTime * 0.4) * 0.2 + mouseY * 1.5;
      }

      coreGroup.rotation.y += (targetRotationY + mouseX * 2 - coreGroup.rotation.y) * 0.08;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.08;

      // Radiant Nucleus & Obsidian Breathing
      const breath = 1 + Math.sin(elapsedTime * 2.4) * 0.04;
      innerCore.scale.set(breath, breath, breath);
      const nucleusPulse = 1 + Math.sin(elapsedTime * 3.2) * 0.08;
      nucleusMesh.scale.set(nucleusPulse, nucleusPulse, nucleusPulse);
      nucleusLight.intensity = (isDark ? 2.5 : 1.5) + Math.sin(elapsedTime * 3.2) * 0.6;

      // Rings differential spin
      ring1.rotation.z += 0.007;
      ring2.rotation.z -= 0.009;
      wireMesh.rotation.y -= 0.003;

      // Orbit satellites
      satellites.forEach((sat) => {
        sat.userData.angle += sat.userData.speed;
        const a = sat.userData.angle;
        const r = sat.userData.radius;
        const inc = sat.userData.inclination;
        sat.position.x = Math.cos(a) * r;
        sat.position.y = Math.sin(a) * r * Math.cos(inc);
        sat.position.z = Math.sin(a) * r * Math.sin(inc);
      });

      // Subtle particle float
      particleField.rotation.y = elapsedTime * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    // --- Handle Resize ---
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      windowHalfX = newWidth / 2;
      windowHalfY = newHeight / 2;
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (currentMount.contains(domElement)) {
        currentMount.removeChild(domElement);
      }

      // Dispose Three.js resources
      nucleusGeo.dispose();
      nucleusMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      vertexGeo.dispose();
      vertexMat.dispose();
      satGeo.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="hero-3d-wrapper">
      <div
        ref={mountRef}
        className={`hero-3d-canvas-container ${isInteracting ? 'grabbing' : 'grab'}`}
        aria-label="Interactive 3D Cyber Core"
      />
      <div className="hero-3d-hint">
        <span className="pulse-indicator"></span> Drag to rotate &bull; Interactive 3D Quantum Core
      </div>
    </div>
  );
};

export default Hero3DCanvas;

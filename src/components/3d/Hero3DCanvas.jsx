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
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // --- Color Palettes (Midnight Slate & Royal Blue Palette) ---
    const isDark = theme === 'dark';
    const primaryColor = isDark ? 0x3b82f6 : 0x2563eb; // Royal Blue #3B82F6
    const coreColor = isDark ? 0x172033 : 0xf1f5f9; // Card Navy Slate #172033
    const wireColor = isDark ? 0x263449 : 0xcbd5e1; // Border Slate #263449
    const ringColor = isDark ? 0x1e293b : 0xe2e8f0;

    // --- Lighting (Clean Studio Diffuse) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.2 : 1.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColor, isDark ? 3.0 : 2.0, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, isDark ? 1.8 : 1.2, 20);
    pointLight2.position.set(-5, -5, -3);
    scene.add(pointLight2);

    // --- Central 3D Tech Core (Composite Object) ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Faceted Geodesic Sphere (Matte Ceramic / Obsidian)
    const innerGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: coreColor,
      roughness: 0.35,
      metalness: 0.6,
      wireframe: false,
      transparent: true,
      opacity: isDark ? 0.9 : 0.85
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Outer Wireframe Cage (Crisp 1px Geometry)
    const wireGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 3. Crisp Node Vertices on Outer Cage
    const posAttribute = wireGeo.getAttribute('position');
    const vertexPointsCount = posAttribute.count;
    const vertexGeo = new THREE.BufferGeometry();
    vertexGeo.setAttribute('position', posAttribute);

    const vertexMat = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x09090b,
      size: 0.08,
      transparent: true,
      opacity: 0.9
    });
    const vertexPoints = new THREE.Points(vertexGeo, vertexMat);
    coreGroup.add(vertexPoints);

    // 4. Orbiting Minimalist Rings
    const createRing = (radius, tube, rotX, rotY, color) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.7,
        transparent: true,
        opacity: isDark ? 0.6 : 0.45
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createRing(2.3, 0.02, Math.PI / 3, Math.PI / 6, ringColor);
    const ring2 = createRing(2.6, 0.015, -Math.PI / 4, Math.PI / 3, primaryColor);
    coreGroup.add(ring1);
    coreGroup.add(ring2);

    // 5. Orbiting Satellites (Data Nodes)
    const satellites = [];
    const satCount = 4;
    const satGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: isDark ? 0x60a5fa : 0x2563eb });

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.4 + (i % 2) * 0.3;
      sat.userData = {
        angle,
        speed: 0.015 + (i % 3) * 0.005,
        radius,
        inclination: (i % 2 === 0 ? 1 : -1) * 0.6
      };
      coreGroup.add(sat);
      satellites.push(sat);
    }

    // 6. Ambient Floating Particle Dust
    const particleCount = 80;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0xa1a1aa : 0x71717a,
      size: 0.03,
      transparent: true,
      opacity: 0.5
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
        targetRotationY += 0.004;
        targetRotationX = Math.sin(elapsedTime * 0.4) * 0.2 + mouseY * 1.5;
      }

      coreGroup.rotation.y += (targetRotationY + mouseX * 2 - coreGroup.rotation.y) * 0.08;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.08;

      // Internal pulse & breathing
      const breath = 1 + Math.sin(elapsedTime * 2.2) * 0.03;
      innerCore.scale.set(breath, breath, breath);

      // Rings differential spin
      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.008;
      wireMesh.rotation.y -= 0.002;

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
      particleField.rotation.y = elapsedTime * 0.02;

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
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      vertexGeo.dispose();
      vertexMat.dispose();
      satGeo.dispose();
      satMat.dispose();
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
        <span className="pulse-indicator"></span> Drag to rotate &bull; Interactive 3D Core
      </div>
    </div>
  );
};

export default Hero3DCanvas;

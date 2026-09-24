import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLBackground = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isDark = theme === 'dark';

    // Scene & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Colors (Midnight Slate & Royal Blue Palette)
    const particleColor = isDark ? 0x94a3b8 : 0x64748b;
    const gridColor = isDark ? 0x263449 : 0xe2e8f0;

    // --- 1. Starfield / Spatial Particle Nebula ---
    const starCount = 280;
    const starPositions = new Float32Array(starCount * 3);
    const starOriginalZ = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 350;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 250;
      const z = (Math.random() - 0.5) * 200;
      starPositions[i3 + 2] = z;
      starOriginalZ[i] = z;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: particleColor,
      size: isDark ? 1.0 : 1.2,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- 2. Perspective Wave Cyber Plane ---
    const gridSegmentsX = 35;
    const gridSegmentsY = 35;
    const planeGeo = new THREE.PlaneGeometry(280, 280, gridSegmentsX, gridSegmentsY);
    planeGeo.rotateX(-Math.PI / 2.3);
    planeGeo.translate(0, -60, -30);

    const planeMat = new THREE.MeshBasicMaterial({
      color: gridColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.15
    });

    const wavePlane = new THREE.Mesh(planeGeo, planeMat);
    scene.add(wavePlane);

    // Store original plane vertex positions for wave computation
    const originalPositions = planeGeo.attributes.position.array.slice();

    // Mouse & Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY || 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY = (e.clientY / window.innerHeight - 0.5) * -20;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera Parallax
      targetCameraX = mouseX * 0.4;
      targetCameraY = mouseY * 0.4 - (scrollY * 0.04);
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;

      // Subtle slow rotation of starfield
      starField.rotation.y = elapsed * 0.015;
      starField.rotation.x = elapsed * 0.008;

      // Undulate Cyber Grid Wave
      const positions = planeGeo.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i];
        const oz = originalPositions[i + 2];
        positions[i + 1] =
          originalPositions[i + 1] +
          Math.sin(ox * 0.06 + elapsed * 1.5) * 3.5 +
          Math.cos(oz * 0.06 + elapsed * 1.2) * 3.0;
      }
      planeGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      starGeo.dispose();
      starMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="bg-webgl-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default WebGLBackground;

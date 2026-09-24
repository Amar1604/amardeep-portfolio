import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLBackground = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isDark = theme === 'dark';

    // Scene, Fog & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x0b1120 : 0xf8fafc, 0.0035);

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

    // Vibrant Cyber Aesthetic Colors
    const gridColor = isDark ? 0x2563eb : 0x93c5fd; // Vivid Royal Blue grid
    const cyanStarColor = isDark ? 0x38bdf8 : 0x0284c7; // Electric Cyan
    const whiteStarColor = isDark ? 0xffffff : 0x475569; // Crisp Diamond

    // --- 1. Dual-Layer Spatial Particle Nebula ---
    const starCount = 320;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cyanC = new THREE.Color(cyanStarColor);
    const whiteC = new THREE.Color(whiteStarColor);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 380;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 280;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 220;

      const chosenColor = Math.random() > 0.4 ? cyanC : whiteC;
      starColors[i3] = chosenColor.r;
      starColors[i3 + 1] = chosenColor.g;
      starColors[i3 + 2] = chosenColor.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: isDark ? 1.25 : 1.4,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.55 : 0.35,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- 2. Perspective Cyber Wave Terrain Grid ---
    const gridSegmentsX = 40;
    const gridSegmentsY = 40;
    const planeGeo = new THREE.PlaneGeometry(300, 300, gridSegmentsX, gridSegmentsY);
    planeGeo.rotateX(-Math.PI / 2.3);
    planeGeo.translate(0, -65, -30);

    const planeMat = new THREE.MeshBasicMaterial({
      color: gridColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.28 : 0.18
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
      mouseX = (e.clientX / window.innerWidth - 0.5) * 22;
      mouseY = (e.clientY / window.innerHeight - 0.5) * -22;
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
      targetCameraX = mouseX * 0.45;
      targetCameraY = mouseY * 0.45 - scrollY * 0.035;
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;

      // Subtle slow rotation of starfield
      starField.rotation.y = elapsed * 0.018;
      starField.rotation.x = elapsed * 0.009;

      // Undulate Cyber Grid Wave with fluid harmonic motion
      const positions = planeGeo.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i];
        const oz = originalPositions[i + 2];
        positions[i + 1] =
          originalPositions[i + 1] +
          Math.sin(ox * 0.055 + elapsed * 1.6) * 3.8 +
          Math.cos(oz * 0.055 + elapsed * 1.3) * 3.2;
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

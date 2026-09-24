import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Floating3DElements = ({ theme = 'dark' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isDark = theme === 'dark';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // Color (Clean Minimalist Slate/Zinc)
    const shapeColor = isDark ? 0x52525b : 0xa1a1aa;
    const shapeMat = new THREE.MeshBasicMaterial({
      color: shapeColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.15
    });

    // Create 4 floating geometric nodes at peripheral coordinates
    const shapes = [];

    const geo1 = new THREE.OctahedronGeometry(2.5, 0);
    const mesh1 = new THREE.Mesh(geo1, shapeMat);
    mesh1.position.set(-22, 12, -5);
    scene.add(mesh1);
    shapes.push({ mesh: mesh1, speedX: 0.008, speedY: 0.012, speedZ: 0.005 });

    const geo2 = new THREE.TorusGeometry(2.2, 0.5, 8, 24);
    const mesh2 = new THREE.Mesh(geo2, shapeMat);
    mesh2.position.set(24, -10, -8);
    scene.add(mesh2);
    shapes.push({ mesh: mesh2, speedX: -0.01, speedY: 0.008, speedZ: 0.006 });

    const geo3 = new THREE.IcosahedronGeometry(2.0, 0);
    const mesh3 = new THREE.Mesh(geo3, shapeMat);
    mesh3.position.set(-20, -18, -10);
    scene.add(mesh3);
    shapes.push({ mesh: mesh3, speedX: 0.006, speedY: -0.009, speedZ: 0.007 });

    const geo4 = new THREE.TorusGeometry(1.8, 0.4, 8, 20);
    const mesh4 = new THREE.Mesh(geo4, shapeMat);
    mesh4.position.set(22, 16, -12);
    scene.add(mesh4);
    shapes.push({ mesh: mesh4, speedX: 0.009, speedY: 0.007, speedZ: -0.005 });

    let scrollY = window.scrollY || 0;
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      shapes.forEach((item, idx) => {
        item.mesh.rotation.x += item.speedX;
        item.mesh.rotation.y += item.speedY;
        item.mesh.rotation.z += item.speedZ;

        // Gentle scroll-based translation offset
        const scrollFactor = (scrollY * 0.02) * (idx % 2 === 0 ? 1 : -1);
        item.mesh.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.02;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geo1.dispose();
      geo2.dispose();
      geo3.dispose();
      geo4.dispose();
      shapeMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default Floating3DElements;

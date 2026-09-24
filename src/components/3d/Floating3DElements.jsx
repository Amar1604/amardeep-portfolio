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

    // Dynamic Holographic Color Palette
    const cyanColor = isDark ? 0x00f0ff : 0x0284c7;
    const sapphireColor = isDark ? 0x3b82f6 : 0x2563eb;
    const indigoColor = isDark ? 0x6366f1 : 0x4f46e5;
    const violetColor = isDark ? 0x8b5cf6 : 0x7c3aed;

    // Create 4 floating geometric nodes at peripheral coordinates
    const shapes = [];

    const createPrimitive = (geo, color, opacity, pos, speeds) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: isDark ? opacity : opacity * 0.7
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);
      return { mesh, geo, mat, ...speeds };
    };

    // 1. Top-Left: Electric Cyan Octahedron
    shapes.push(
      createPrimitive(
        new THREE.OctahedronGeometry(2.6, 0),
        cyanColor,
        0.45,
        { x: -22, y: 12, z: -5 },
        { speedX: 0.008, speedY: 0.012, speedZ: 0.005 }
      )
    );

    // 2. Bottom-Right: Royal Sapphire Torus
    shapes.push(
      createPrimitive(
        new THREE.TorusGeometry(2.3, 0.5, 10, 28),
        sapphireColor,
        0.4,
        { x: 24, y: -10, z: -8 },
        { speedX: -0.01, speedY: 0.008, speedZ: 0.006 }
      )
    );

    // 3. Bottom-Left: Cyber Indigo Icosahedron
    shapes.push(
      createPrimitive(
        new THREE.IcosahedronGeometry(2.2, 0),
        indigoColor,
        0.42,
        { x: -20, y: -18, z: -10 },
        { speedX: 0.006, speedY: -0.009, speedZ: 0.007 }
      )
    );

    // 4. Top-Right: Electric Violet Torus
    shapes.push(
      createPrimitive(
        new THREE.TorusGeometry(1.9, 0.4, 10, 24),
        violetColor,
        0.38,
        { x: 22, y: 16, z: -12 },
        { speedX: 0.009, speedY: 0.007, speedZ: -0.005 }
      )
    );

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
        item.mesh.position.y += Math.sin(Date.now() * 0.0012 + idx) * 0.022;
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
      shapes.forEach((s) => {
        s.geo.dispose();
        s.mat.dispose();
      });
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

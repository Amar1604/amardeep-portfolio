import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { skillsData } from '../../data/portfolioData';
import { soundFX } from '../../utils/soundFX';

export const SkillGalaxy3D = ({ theme = 'dark' }) => {
  const mountRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);

  // Flatten skills with categories
  const allSkills = skillsData.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.category }))
  );

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 450;
    const isDark = theme === 'dark';

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group for all rotating galaxy elements
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // Central wireframe core (Clean Slate / Graphite)
    const coreGeo = new THREE.IcosahedronGeometry(4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x52525b : 0xa1a1aa,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    galaxyGroup.add(coreMesh);

    // Orbital rings (Monochrome Minimalist)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x3f3f46 : 0xd4d4d8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(8.5, 0.03, 8, 48), ringMat1);
    ring1.rotation.x = Math.PI / 3;
    galaxyGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(10.5, 0.025, 8, 48), ringMat1);
    ring2.rotation.y = Math.PI / 4;
    galaxyGroup.add(ring2);

    // Skill Nodes on Fibonacci Sphere
    const nodeCount = allSkills.length;
    const nodes = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    allSkills.forEach((skill, i) => {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const sphereRadius = 8.5;
      const x = Math.cos(theta) * radius * sphereRadius;
      const z = Math.sin(theta) * radius * sphereRadius;
      const py = y * sphereRadius;

      // Node Mesh (Clean Blue / Slate Nodes)
      const nodeGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const nodeColor = i % 3 === 0 ? (isDark ? 0x60a5fa : 0x2563eb) : (isDark ? 0xa1a1aa : 0x71717a);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: nodeColor
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, py, z);
      nodeMesh.userData = { skill, index: i };
      galaxyGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    });

    // Mouse Drag & Hover Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotVelX = 0;
    let rotVelY = 0.003;

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        galaxyGroup.rotation.y += dx * 0.008;
        galaxyGroup.rotation.x += dy * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        galaxyGroup.rotation.y += 0.0025;
        galaxyGroup.rotation.x += 0.0008;
      }

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;
      coreMesh.rotation.y -= 0.002;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(dom)) mount.removeChild(dom);

      coreGeo.dispose();
      coreMat.dispose();
      ringMat1.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="skill-galaxy-container">
      <div ref={mountRef} className="skill-galaxy-canvas" />
      <div className="skill-galaxy-hud">
        <span className="pulse-indicator"></span> 3D Orbital Tech Cloud &bull; Drag to rotate
      </div>
    </div>
  );
};

export default SkillGalaxy3D;

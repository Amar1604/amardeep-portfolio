import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { skillsData } from '../../data/portfolioData';
import { soundFX } from '../../utils/soundFX';

const categoryColorMap = {
  'Frontend & Web': { color: 0x06b6d4, hex: '#06b6d4', glow: 0x22d3ee },
  'Mobile Development': { color: 0x10b981, hex: '#10b981', glow: 0x34d399 },
  'Backend & APIs': { color: 0x6366f1, hex: '#6366f1', glow: 0x818cf8 },
  'Databases & Cloud': { color: 0xf59e0b, hex: '#f59e0b', glow: 0xfbbf24 },
  'AI, Vision & Automated QA': { color: 0xec4899, hex: '#ec4899', glow: 0xf472b6 }
};

export const SkillGalaxy3D = ({ theme = 'dark' }) => {
  const mountRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambient = new THREE.AmbientLight(0xffffff, isDark ? 1.0 : 1.4);
    scene.add(ambient);

    const lightCyan = new THREE.PointLight(0x06b6d4, isDark ? 3.0 : 2.0, 30);
    lightCyan.position.set(10, 10, 10);
    scene.add(lightCyan);

    const lightViolet = new THREE.PointLight(0x8b5cf6, isDark ? 2.5 : 1.8, 30);
    lightViolet.position.set(-10, -10, 8);
    scene.add(lightViolet);

    // Group for all rotating galaxy elements
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // 1. Central Radiant Nucleus Sphere
    const nucleusGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    galaxyGroup.add(nucleusMesh);

    // 2. Central Wireframe Icosahedron Lattice
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    galaxyGroup.add(coreMesh);

    // 3. Dual Chromatic Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x22d3ee : 0x0284c7,
      transparent: true,
      opacity: 0.55
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(8.6, 0.035, 12, 64), ringMat1);
    ring1.rotation.x = Math.PI / 3;
    galaxyGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x818cf8 : 0x4f46e5,
      transparent: true,
      opacity: 0.5
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(10.8, 0.03, 12, 64), ringMat2);
    ring2.rotation.y = Math.PI / 4;
    galaxyGroup.add(ring2);

    // 4. Skill Nodes on Fibonacci Sphere with Domain Category Colors
    const nodeCount = allSkills.length;
    const nodes = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const categoryPositions = {};

    allSkills.forEach((skill, i) => {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const sphereRadius = 8.5;
      const x = Math.cos(theta) * radius * sphereRadius;
      const z = Math.sin(theta) * radius * sphereRadius;
      const py = y * sphereRadius;

      const catInfo = categoryColorMap[skill.category] || categoryColorMap['Frontend & Web'];

      // Solid Node Sphere
      const nodeGeo = new THREE.SphereGeometry(0.38, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: catInfo.color,
        roughness: 0.2,
        metalness: 0.7,
        emissive: catInfo.glow,
        emissiveIntensity: isDark ? 0.6 : 0.35
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, py, z);
      nodeMesh.userData = { skill, index: i, baseColor: catInfo.color, glowColor: catInfo.glow };
      galaxyGroup.add(nodeMesh);
      nodes.push(nodeMesh);

      // Track positions for constellation lines
      if (!categoryPositions[skill.category]) {
        categoryPositions[skill.category] = [];
      }
      categoryPositions[skill.category].push(new THREE.Vector3(x, py, z));
    });

    // 5. Neural Constellation Lines Connecting Sibling Skills in Each Category
    Object.entries(categoryPositions).forEach(([catName, points]) => {
      const catInfo = categoryColorMap[catName] || categoryColorMap['Frontend & Web'];
      const linePositions = [];

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = points[i].distanceTo(points[j]);
          // Connect nearby nodes within the same domain
          if (dist < 10) {
            linePositions.push(points[i].x, points[i].y, points[i].z);
            linePositions.push(points[j].x, points[j].y, points[j].z);
          }
        }
      }

      if (linePositions.length > 0) {
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const lineMat = new THREE.LineBasicMaterial({
          color: catInfo.color,
          transparent: true,
          opacity: isDark ? 0.3 : 0.2
        });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        galaxyGroup.add(lines);
      }
    });

    // Raycaster for Hover Detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse Drag Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

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
    dom.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        galaxyGroup.rotation.y += 0.003;
        galaxyGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
      }

      // Dynamic Nucleus Breathing
      const nucleusPulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      nucleusMesh.scale.set(nucleusPulse, nucleusPulse, nucleusPulse);

      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;
      coreMesh.rotation.y -= 0.002;

      // Raycasting for Skill Hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.skill) {
          setHoveredSkill(hit.userData.skill);
          hit.scale.set(1.4, 1.4, 1.4);
        }
      } else {
        nodes.forEach((n) => n.scale.set(1, 1, 1));
      }

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
      dom.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(dom)) mount.removeChild(dom);

      nucleusGeo.dispose();
      nucleusMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="skill-galaxy-container">
      {/* Category Color Legend Bar */}
      <div className="galaxy-legend-bar">
        {Object.entries(categoryColorMap).map(([catName, info]) => (
          <div key={catName} className="galaxy-legend-item">
            <span
              className="galaxy-legend-dot"
              style={{ background: info.hex, boxShadow: `0 0 8px ${info.hex}` }}
            />
            <span className="galaxy-legend-text">{catName}</span>
          </div>
        ))}
      </div>

      <div ref={mountRef} className="skill-galaxy-canvas" />

      {/* Active Skill Telemetry HUD on Hover */}
      {hoveredSkill ? (
        <div className="skill-galaxy-active-hud">
          <span className="active-hud-label">// INSPECTING NODE:</span>
          <span className="active-hud-name">{hoveredSkill.name}</span>
          <span className="active-hud-level">[{hoveredSkill.level}]</span>
          {hoveredSkill.projectProof && (
            <span className="active-hud-proof">&bull; Proven: {hoveredSkill.projectProof}</span>
          )}
        </div>
      ) : (
        <div className="skill-galaxy-hud">
          <span className="pulse-indicator"></span> 3D Orbital Tech Constellation &bull; Drag to rotate &bull; Hover nodes to inspect
        </div>
      )}
    </div>
  );
};

export default SkillGalaxy3D;

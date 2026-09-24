import React, { useEffect, useRef } from 'react';
import { soundFX } from '../../utils/soundFX';

export const QuantumShockwave = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let rings = [];

    class ShockwaveRing {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.maxRadius = 175;
        this.opacity = 0.85;
        this.lineWidth = 3.6;
        this.particles = [];

        // Spawn 24 glowing sparks
        for (let i = 0; i < 24; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4.5 + 2.5;
          const isCyan = Math.random() > 0.4;
          this.particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            size: Math.random() * 2.8 + 1.2,
            color: isCyan ? '6, 182, 212' : '99, 102, 241'
          });
        }
      }

      update() {
        this.radius += (this.maxRadius - this.radius) * 0.13;
        this.opacity -= 0.032;
        this.lineWidth = Math.max(0.5, this.lineWidth - 0.075);

        this.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.alpha -= 0.038;
        });
      }

      draw() {
        if (this.opacity <= 0) return;

        ctx.save();

        // 1. Primary Leading Ring: Electric Cyan
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, this.opacity * 0.85)})`;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();

        // 2. Secondary Trailing Ring: Royal Sapphire
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${Math.max(0, this.opacity * 0.55)})`;
        ctx.lineWidth = this.lineWidth * 0.7;
        ctx.stroke();

        // 3. Inner White Core Glow Ring
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.radius * 0.88), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, this.opacity * 0.6)})`;
        ctx.lineWidth = this.lineWidth * 0.4;
        ctx.stroke();

        // 4. Glowing Radiant Particles
        this.particles.forEach((p) => {
          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.85})`;
            ctx.shadowColor = `rgba(${p.color}, 0.8)`;
            ctx.shadowBlur = 6;
            ctx.fill();
          }
        });

        ctx.restore();
      }
    }

    const handleClick = (e) => {
      const target = e.target.closest('.btn, .project-card, .term-chip, .logo, .switcher-btn, .matcher-pill-btn');
      if (target) {
        soundFX.playClick();
        rings.push(new ShockwaveRing(e.clientX, e.clientY));
      }
    };

    window.addEventListener('click', handleClick);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      rings = rings.filter((r) => r.opacity > 0);
      rings.forEach((r) => {
        r.update();
        r.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="quantum-shockwave-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

export default QuantumShockwave;

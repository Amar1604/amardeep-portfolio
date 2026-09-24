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
        this.radius = 5;
        this.maxRadius = 160;
        this.opacity = 0.8;
        this.lineWidth = 3.5;
        this.particles = [];

        // Spawn 20 particle sparks
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 2;
          this.particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            size: Math.random() * 2.5 + 1.5
          });
        }
      }

      update() {
        this.radius += (this.maxRadius - this.radius) * 0.12;
        this.opacity -= 0.035;
        this.lineWidth = Math.max(0.5, this.lineWidth - 0.08);

        this.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.alpha -= 0.04;
        });
      }

      draw() {
        if (this.opacity <= 0) return;

        // Draw clean minimalist ripple
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${Math.max(0, this.opacity * 0.7)})`;
        ctx.lineWidth = this.lineWidth * 0.8;
        ctx.stroke();

        // Draw inner white highlight ring
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, this.opacity * 0.5)})`;
        ctx.lineWidth = this.lineWidth * 0.4;
        ctx.stroke();

        // Draw subtle particles
        this.particles.forEach((p) => {
          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha * 0.6})`;
            ctx.fill();
          }
        });

        ctx.restore();
      }
    }

    const handleClick = (e) => {
      // Trigger shockwave on CTA buttons or primary elements
      const target = e.target.closest('.btn, .project-card, .term-chip, .logo');
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

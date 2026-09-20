import React, { useEffect, useRef } from 'react';

export const CanvasBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId;
    let particles = [];

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    const getColors = () => {
      if (theme === 'light') {
        return {
          particle: 'rgba(124, 58, 237, 0.22)',
          line: 'rgba(124, 58, 237, 0.1)',
          hoverParticle: 'rgba(14, 165, 233, 0.5)'
        };
      } else {
        return {
          particle: 'rgba(0, 242, 254, 0.25)',
          line: 'rgba(157, 78, 221, 0.12)',
          hoverParticle: 'rgba(255, 0, 127, 0.5)'
        };
      }
    };

    let colors = getColors();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseRadius = Math.random() * 2 + 1.5;
        this.radius = this.baseRadius;
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
            this.radius = this.baseRadius + force * 2.5;
          } else {
            if (this.radius > this.baseRadius) {
              this.radius -= 0.1;
            }
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const isHovered =
          mouse.x !== null &&
          Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2) < mouse.radius;
        ctx.fillStyle = isHovered ? colors.hoverParticle : colors.particle;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(90, Math.floor((width * height) / 13000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.85;
            ctx.strokeStyle = colors.line.replace(/0\.\d+/, alpha.toFixed(2));
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" />;
};
export default CanvasBackground;

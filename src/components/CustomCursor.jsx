import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMouseDown, setIsMouseDown] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setEnabled(true);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if target or parent has interactive attributes
      const target = e.target.closest('a, button, .project-card, .switcher-btn, .topic-pill-btn, .human-tab-btn, .kudos-btn, [data-cursor]');
      if (target) {
        setHovered(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (target.tagName.toLowerCase() === 'button' || target.getAttribute('role') === 'button') {
          setCursorText('SELECT');
        } else if (target.tagName.toLowerCase() === 'a') {
          setCursorText('LINK');
        } else {
          setCursorText('');
        }
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth lerp loop for the trailing ring
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Precision inner center dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isMouseDown ? 'cursor-down' : ''}`}
      />

      {/* Trailing interactive ring with contextual text badge */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${hovered ? 'cursor-hover' : ''} ${isMouseDown ? 'cursor-down' : ''} ${cursorText ? 'has-text' : ''}`}
      >
        {cursorText && <span className="cursor-label-badge">{cursorText}</span>}
      </div>
    </div>
  );
};

export default CustomCursor;

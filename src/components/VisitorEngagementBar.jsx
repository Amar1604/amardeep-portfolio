import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundFX';

export const VisitorEngagementBar = () => {
  const [counts, setCounts] = useState(() => {
    try {
      const saved = localStorage.getItem('visitor_engagement_counts');
      return saved
        ? JSON.parse(saved)
        : { highfive: 184, cleancode: 142, design: 129, hire: 165 };
    } catch {
      return { highfive: 184, cleancode: 142, design: 129, hire: 165 };
    }
  });

  const [floatingParticles, setFloatingParticles] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('visitor_engagement_counts', JSON.stringify(counts));
    } catch {
      // Ignore
    }
  }, [counts]);

  const actions = [
    { id: 'highfive', label: '+1 HIGH FIVE', praise: 'HIGH FIVE!' },
    { id: 'cleancode', label: '+1 CLEAN CODE', praise: 'CLEAN ARCHITECTURE!' },
    { id: 'design', label: '+1 SLEEK UI', praise: 'PREMIUM UX!' },
    { id: 'hire', label: '+1 HIRE AMARDEEP', praise: 'READY TO BUILD!' }
  ];

  const handleClick = (action, e) => {
    soundFX.playClick();
    soundFX.playKeypress();

    setCounts((prev) => ({
      ...prev,
      [action.id]: prev[action.id] + 1
    }));

    // Spawn floating particle at button coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const particleId = Date.now() + Math.random();
    const newParticle = {
      id: particleId,
      text: action.praise,
      x: rect.left + rect.width / 2 + (Math.random() * 40 - 20),
      y: rect.top - 10
    };

    setFloatingParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== particleId));
    }, 1200);
  };

  return (
    <section className="visitor-engagement-section">
      <div className="container">
        <div className="glass-card visitor-engagement-card">
          <div className="engagement-info">
            <span className="telemetry-live-dot"></span>
            <span className="engagement-title">COMMUNITY PULSE // VISITOR REACTIONS</span>
            <span className="engagement-subtitle">Engage with Amardeep's engineering portfolio in real-time</span>
          </div>

          <div className="engagement-buttons-row">
            {actions.map((act) => (
              <button
                key={act.id}
                className="kudos-btn btn-3d-hover"
                onClick={(e) => handleClick(act, e)}
                onMouseEnter={() => soundFX.playHover()}
                data-cursor="PULSE"
              >
                <span className="kudos-label">{act.label}</span>
                <span className="kudos-badge">{counts[act.id]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating typographic particles container */}
      <div className="floating-particles-layer" aria-hidden="true">
        {floatingParticles.map((p) => (
          <div
            key={p.id}
            className="floating-praise-particle"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`
            }}
          >
            {p.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisitorEngagementBar;

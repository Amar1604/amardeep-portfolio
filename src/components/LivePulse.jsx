import React, { useState, useEffect } from 'react';

export const LivePulse = () => {
  const [timeStr, setTimeStr] = useState('');
  const [greeting, setGreeting] = useState('ONLINE');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Indian Standard Time (IST)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      setTimeStr(formatted);

      // Time of day greeting calculation
      const hour = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        hour12: false
      }).format(now);

      const h = parseInt(hour, 10);
      if (h >= 5 && h < 12) setGreeting('SYSTEM ACTIVE // MORNING');
      else if (h >= 12 && h < 17) setGreeting('SYSTEM ACTIVE // AFTERNOON');
      else if (h >= 17 && h < 22) setGreeting('SYSTEM ACTIVE // EVENING');
      else setGreeting('SYSTEM ACTIVE // NIGHT OWL');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-pulse-card glass-card">
      <div className="pulse-card-header">
        <div className="pulse-live-indicator">
          <span className="live-ring"></span>
          <span className="live-core"></span>
          <span className="pulse-live-text">REAL-TIME TELEMETRY</span>
        </div>
        <span className="pulse-greeting-badge">{greeting}</span>
      </div>

      <div className="pulse-grid">
        {/* Location & Local Clock */}
        <div className="pulse-item">
          <div className="pulse-tag-label">[LOC] CURRENT BASE</div>
          <div className="pulse-item-val">Meerut, Uttar Pradesh, India</div>
        </div>

        <div className="pulse-item">
          <div className="pulse-tag-label">[IST] LOCAL TIME (CLOCK)</div>
          <div className="pulse-item-val pulse-time-glow">{timeStr || 'SYNCHRONIZING...'}</div>
        </div>

        {/* Status */}
        <div className="pulse-item">
          <div className="pulse-tag-label">[AVAILABILITY] STATUS</div>
          <div className="pulse-item-val text-green-accent">Open for Full-Time Roles &amp; Internships</div>
        </div>

        {/* Current Learning / Exploring */}
        <div className="pulse-item">
          <div className="pulse-tag-label">[FOCUS] CURRENTLY BUILDING</div>
          <div className="pulse-item-val">Local LLMs (Ollama) &bull; Flutter 3 &bull; Three.js</div>
        </div>
      </div>
    </div>
  );
};

export default LivePulse;

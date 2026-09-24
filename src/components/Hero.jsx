import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Hero3DCanvas } from './3d/Hero3DCanvas';
import { soundFX } from '../utils/soundFX';

export const Hero = ({ theme = 'dark' }) => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [timeGreeting, setTimeGreeting] = useState('HELLO');

  const roles = personalInfo.roles;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeGreeting('GOOD MORNING');
    else if (hour >= 12 && hour < 17) setTimeGreeting('GOOD AFTERNOON');
    else if (hour >= 17 && hour < 22) setTimeGreeting('GOOD EVENING');
    else setTimeGreeting('NIGHT OWL MODE');
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const handleRoleClick = (idx) => {
    soundFX.playClick();
    setRoleIndex(idx);
    setCharIndex(0);
    setDisplayText('');
    setIsDeleting(false);
  };

  return (
    <section id="hero" className="hero-section-3d">
      <div className="container hero-grid-3d">
        {/* Left Column: Information & Actions */}
        <div className="hero-content-left">
          <div className="hero-badge-container">
            <span className="hero-subtitle">
              <span className="telemetry-live-dot" style={{ display: 'inline-block', marginRight: '6px' }}></span>
              STATUS: AVAILABLE // {timeGreeting} &bull; FULL-TIME &amp; INTERNSHIPS
            </span>
          </div>

          <h1 className="hero-title">
            Engineering Secure &amp;<br />
            <span className="text-gradient-3d">Scalable Solutions</span>
          </h1>

          <p className="hero-desc">
            Hi, I am <strong>{personalInfo.name}</strong>, a{' '}
            <span className="typing-cursor hero-typed-role">
              {displayText}
            </span>
            <br />
            I build decoupled full-stack architectures, high-performance Flutter mobile applications, and local AI pipelines focused on user experience and system efficiency.
          </p>

          {/* Interactive Role Switcher Pills */}
          <div className="hero-role-selector">
            <span className="role-selector-label">// QUICK FOCUS:</span>
            <div className="role-selector-chips">
              {roles.slice(0, 4).map((role, rIdx) => (
                <button
                  key={rIdx}
                  className={`role-chip-btn ${roleIndex === rIdx ? 'active' : ''}`}
                  onClick={() => handleRoleClick(rIdx)}
                  onMouseEnter={() => soundFX.playHover()}
                  data-cursor="SWITCH"
                  title="Click to switch active role focus"
                >
                  {role.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-stats-pill">
            <div className="stat-pill-item">
              <span className="stat-pill-num">01</span>
              <span className="stat-pill-label">Hacknovate 7.0 (1st Place)</span>
            </div>
            <div className="stat-pill-divider"></div>
            <div className="stat-pill-item">
              <span className="stat-pill-num">TOP 22</span>
              <span className="stat-pill-label">HACK IITK Grand Finals</span>
            </div>
            <div className="stat-pill-divider"></div>
            <div className="stat-pill-item">
              <span className="stat-pill-num">-70%</span>
              <span className="stat-pill-label">Query Overhead Reduced</span>
            </div>
          </div>

          <div className="hero-ctas">
            <a
              href="#projects"
              className="btn btn-primary shine-effect btn-3d-hover"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              data-cursor="PROJECTS"
            >
              <span>Explore Projects</span>
              <span className="btn-arrow-glyph">-&gt;</span>
            </a>
            <a
              href={personalInfo.resumePath}
              className="btn btn-secondary pulse-glow-anim btn-3d-hover"
              download="Amardeep_Resume.pdf"
              onClick={() => soundFX.playWarp()}
              onMouseEnter={() => soundFX.playHover()}
              data-cursor="RESUME"
            >
              <span>Download ATS Resume</span>
              <span className="btn-file-tag">[.PDF]</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Centerpiece */}
        <div className="hero-canvas-column">
          <Hero3DCanvas theme={theme} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

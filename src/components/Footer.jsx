import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFX } from '../utils/soundFX';

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-human">
      <div className="container footer-content">
        <div className="footer-left-sign">
          <div className="footer-signature">AMARDEEP<span>.DEV</span></div>
          <p className="footer-tagline">
            Engineered with curiosity, clean code, and decoupled architectures &bull; Meerut, India
          </p>
        </div>

        <div className="footer-right-info">
          <div>
            &copy; {new Date().getFullYear()} <strong>{personalInfo.name}</strong>. All rights reserved.
          </div>
          <div className="footer-passion-text">
            SYSTEM TELEMETRY: ALL SERVICES OPERATIONAL // 60 FPS
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top of page"
        title="Scroll to Top"
        onMouseEnter={() => soundFX.playHover()}
        data-cursor="TOP"
      >
        <span>[TOP ^]</span>
      </button>
    </footer>
  );
};

export default Footer;

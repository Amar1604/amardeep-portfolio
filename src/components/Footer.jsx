import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="container footer-content">
        <div>
          © {new Date().getFullYear()} <strong>{personalInfo.name}</strong>. Built with React 19 &amp; Vite.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
          Crafted with passion <Heart size={16} color="var(--accent-pink)" fill="var(--accent-pink)" /> for clean code.
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top of page"
        title="Scroll to Top"
      >
        <ArrowUp size={22} />
      </button>
    </footer>
  );
};
export default Footer;

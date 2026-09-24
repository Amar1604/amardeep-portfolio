import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundFX';

export const Navbar = ({ theme, toggleTheme, onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [soundEnabled, setSoundEnabled] = useState(soundFX.enabled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 140;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = soundFX.toggle();
    setSoundEnabled(nextState);
  };

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Recruiter', href: '#recruiter-dashboard', id: 'recruiter-dashboard' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Awards', href: '#achievements', id: 'achievements' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleLinkClick = () => {
    soundFX.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <a href="#hero" className="logo" onMouseEnter={() => soundFX.playHover()} data-cursor="HOME">
          AMARDEEP<span>.DEV</span>
          <span className="telemetry-live-dot" title="Live Telemetry: Systems Operational">
            <span className="dot-pulse"></span>
          </span>
        </a>

        <nav className={mobileMenuOpen ? 'active' : ''}>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={handleLinkClick}
                  onMouseEnter={() => soundFX.playHover()}
                  data-cursor="GO"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Cyber Terminal Shortcut Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenTerminal();
            }}
            className="nav-hud-btn"
            title="Open Developer HUD Terminal (Ctrl + K or `)"
            aria-label="Open Cyber Terminal HUD"
            onMouseEnter={() => soundFX.playHover()}
            data-cursor="CLI"
          >
            <span className="hud-glyph">&gt;_</span>
            <span className="hud-btn-text">CLI</span>
            <span className="hud-key-badge">^K</span>
          </button>

          {/* Procedural Audio Equalizer Bar Toggle */}
          <button
            onClick={toggleSound}
            className={`nav-audio-toggle ${soundEnabled ? 'audio-active' : ''}`}
            aria-label={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
            title={soundEnabled ? 'Audio FX: ON (Click to Mute)' : 'Audio FX: OFF (Click to Enable)'}
            onMouseEnter={() => soundFX.playHover()}
            data-cursor="AUDIO"
          >
            <div className="nav-audio-equalizer">
              <span className={`audio-bar bar-1 ${soundEnabled ? 'bouncing' : ''}`}></span>
              <span className={`audio-bar bar-2 ${soundEnabled ? 'bouncing' : ''}`}></span>
              <span className={`audio-bar bar-3 ${soundEnabled ? 'bouncing' : ''}`}></span>
              <span className={`audio-bar bar-4 ${soundEnabled ? 'bouncing' : ''}`}></span>
            </div>
            <span className="nav-audio-label">FX</span>
          </button>

          {/* Sleek Theme Toggle Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              toggleTheme();
            }}
            className="nav-theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onMouseEnter={() => soundFX.playHover()}
            data-cursor="THEME"
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="theme-toggle-label">{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="mobile-nav-toggle-text"
            aria-label="Toggle navigation menu"
            data-cursor="MENU"
          >
            <span>{mobileMenuOpen ? '[CLOSE]' : '[MENU]'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

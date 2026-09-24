import React, { useState, useEffect } from 'react';
import { WebGLBackground } from './components/3d/WebGLBackground';
import { Floating3DElements } from './components/3d/Floating3DElements';
import { QuantumShockwave } from './components/3d/QuantumShockwave';
import { CustomCursor } from './components/CustomCursor';
import { CyberTerminal } from './components/CyberTerminal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { soundFX } from './utils/soundFX';

export const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global Keyboard Shortcuts (Ctrl + K or `~`)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === '`' || e.key === '~') {
        const tag = document.activeElement?.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setTerminalOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-root">
      {/* Interactive Magnetic Lerped Custom Cursor */}
      <CustomCursor />

      {/* 3D WebGL Background Scene */}
      <WebGLBackground theme={theme} />
      <Floating3DElements theme={theme} />

      {/* Quantum Particle Shockwave Click Layer */}
      <QuantumShockwave />

      {/* Futuristic Cyber Terminal HUD */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <main>
        <Hero theme={theme} />
        <RecruiterDashboard />
        <About />
        <Experience />
        <Skills theme={theme} />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Floating HUD Terminal Quick Pill on Bottom Left */}
      <button
        className="floating-terminal-trigger"
        onClick={() => {
          soundFX.playClick();
          setTerminalOpen(true);
        }}
        title="Open Developer CLI HUD (Ctrl + K)"
        aria-label="Open CLI HUD"
        onMouseEnter={() => soundFX.playHover()}
        data-cursor="CLI"
      >
        <span className="terminal-pill-pulse"></span>
        <span>&gt;_ HUD</span>
        <span className="terminal-pill-key">^K</span>
      </button>

      <Footer />
    </div>
  );
};

export default App;

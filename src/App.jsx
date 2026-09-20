import React, { useState, useEffect } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
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

export const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-root">
      <CanvasBackground theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <RecruiterDashboard />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
export default App;

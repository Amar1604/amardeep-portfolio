import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowRight, FileDown } from 'lucide-react';

export const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = personalInfo.roles;

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 90);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  return (
    <section id="hero">
      <div className="container hero-content">
        <span className="hero-subtitle">Open for Full-Time &amp; Internship Roles</span>
        <h1 className="hero-title">
          Engineering Secure &amp;<br />
          <span>Scalable Solutions</span>
        </h1>
        <p className="hero-desc">
          Hi, I am <strong>{personalInfo.name}</strong>, a{' '}
          <span className="typing-cursor" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
            {displayText}
          </span>
          <br />
          specializing in modern React ecosystems, high-performance backends, and AI integrations.
        </p>

        <div className="hero-ctas">
          <a href="#projects" className="btn btn-primary shine-effect">
            Explore Projects <ArrowRight size={18} />
          </a>
          <a
            href={personalInfo.resumePath}
            className="btn btn-secondary pulse-glow-anim"
            download="Amardeep_Resume.pdf"
          >
            <FileDown size={18} /> Download ATS Resume
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;

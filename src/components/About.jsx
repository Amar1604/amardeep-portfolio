import React from 'react';
import { personalInfo, educationData } from '../data/portfolioData';
import { Award, GraduationCap, Code2, Smartphone, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <section id="about">
      <div className="container about-wrapper">
        {/* Profile Picture with Neon Gradient Glow Border */}
        <div className="about-img-container">
          <div className="about-img-glow-wrapper">
            <div className="about-img-box">
              <img
                src="assets/images/Profile.jpeg"
                alt="Amardeep Profile"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';
                }}
              />
            </div>
          </div>
        </div>

        {/* Biography & Education */}
        <div className="about-text">
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            About <span>Me</span>
          </h2>
          <h3>Bridging Modern Web Engineering, Mobile Apps &amp; AI</h3>
          
          {personalInfo.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {/* Education Summary */}
          <div style={{ marginTop: '1.8rem', marginBottom: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              <GraduationCap size={20} color="var(--accent-cyan)" /> Education
            </h4>
            <div style={{ background: 'var(--glass-bg)', padding: '1rem 1.4rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {educationData[0].degree}
              </div>
              <div style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>
                {educationData[0].institution} • <span style={{ color: 'var(--text-secondary)' }}>{educationData[0].score} ({educationData[0].year})</span>
              </div>
            </div>
          </div>

          <div className="about-highlights">
            <div className="highlight-badge">
              <CheckCircle2 size={18} />
              Infosys Springboard Intern
            </div>
            <div className="highlight-badge">
              <Smartphone size={18} />
              Flutter &amp; Dart Mobile
            </div>
            <div className="highlight-badge">
              <Award size={18} />
              Hacknovate 7.0 Winner
            </div>
            <div className="highlight-badge">
              <Code2 size={18} />
              React &amp; Django REST Stack
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;

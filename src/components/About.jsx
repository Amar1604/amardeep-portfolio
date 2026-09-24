import React from 'react';
import { educationData } from '../data/portfolioData';
import { LivePulse } from './LivePulse';
import { HumanStory } from './HumanStory';

export const About = () => {
  return (
    <section id="about" className="about-section-human">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center" style={{ marginBottom: '2.5rem' }}>
          <div className="hero-badge-container">
            <span className="hero-subtitle">
              01 // ORIGIN &amp; ENGINEERING PHILOSOPHY
            </span>
          </div>
          <h2 className="section-title">
            About <span>Amardeep</span>
          </h2>
          <p className="section-subtitle-desc">
            Full-stack developer, mobile architect, and continuous learner building resilient software systems.
          </p>
        </div>

        {/* Top Split: Profile Photo + Live Pulse + Quick Education */}
        <div className="about-top-grid">
          {/* Left: Glowing Profile Image */}
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

          {/* Right: Real-Time Live Pulse & Education */}
          <div className="about-right-meta">
            <LivePulse />

            <div className="about-edu-card glass-card">
              <div className="about-edu-header">
                <span className="edu-tag">// ACADEMIC FOUNDATION</span>
                <span className="edu-status-badge">CURRENT</span>
              </div>
              <div className="edu-item-box">
                <div className="edu-degree">{educationData[0].degree}</div>
                <div className="edu-institution">
                  {educationData[0].institution} &bull; <span className="edu-score">{educationData[0].score} ({educationData[0].year})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Human Story, Journey & Engineering Values */}
        <div style={{ marginTop: '2.5rem' }}>
          <HumanStory />
        </div>
      </div>
    </section>
  );
};

export default About;

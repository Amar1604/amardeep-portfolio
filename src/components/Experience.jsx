import React from 'react';
import { experienceData } from '../data/portfolioData';

export const Experience = () => {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-header-center">
          <div className="hero-badge-container">
            <span className="hero-subtitle">
              // PRODUCTION TRACK RECORD &bull; INTERNSHIPS
            </span>
          </div>
          <h2 className="section-title">
            Work <span>Experience</span>
          </h2>
          <p className="section-subtitle-desc">
            Hands-on software engineering, decoupled platform development, and performance optimization.
          </p>
        </div>

        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
          {experienceData.map((exp, idx) => (
            <div key={idx} className="glass-card experience-card" data-cursor="EXP">
              <div className="exp-header">
                <div className="exp-title">
                  <span className="exp-index-tag">[EXP // {String(idx + 1).padStart(2, '0')}]</span>
                  <h3>{exp.role}</h3>
                  <div className="company">{exp.company}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <span className="exp-badge">{exp.type}</span>
                  <span className="exp-duration-tag">
                    [{exp.duration}]
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {exp.description}
              </p>

              <ul className="exp-list">
                {exp.bulletPoints.map((point, pIdx) => (
                  <li key={pIdx}>
                    <span className="exp-bullet-glyph">&gt;&gt;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

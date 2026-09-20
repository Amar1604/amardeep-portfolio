import React from 'react';
import { experienceData } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

export const Experience = () => {
  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-title">
          Work <span>Experience</span>
        </h2>

        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
          {experienceData.map((exp, idx) => (
            <div key={idx} className="glass-card experience-card">
              <div className="exp-header">
                <div className="exp-title">
                  <h3>{exp.role}</h3>
                  <div className="company">{exp.company}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span className="exp-badge">{exp.type}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={16} /> {exp.duration}
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
                {exp.description}
              </p>

              <ul className="exp-list">
                {exp.bulletPoints.map((point, pIdx) => (
                  <li key={pIdx}>{point}</li>
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

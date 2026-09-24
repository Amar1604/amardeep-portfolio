import React from 'react';
import { achievementsData } from '../data/portfolioData';

export const Achievements = () => {
  return (
    <section id="achievements">
      <div className="container">
        <div className="section-header-center">
          <div className="hero-badge-container">
            <span className="hero-subtitle">
              // NATIONAL HACKATHONS &bull; ACCREDITATIONS
            </span>
          </div>
          <h2 className="section-title">
            Achievements &amp; <span>Certifications</span>
          </h2>
          <p className="section-subtitle-desc">
            Competitive national hackathons, institutional shortlists, and accredited AI/ML specializations.
          </p>
        </div>

        <div className="achievements-grid">
          {achievementsData.map((item, idx) => (
            <div key={idx} className="glass-card achievement-card" data-cursor="AWARD">
              <div className="achievement-index-badge">
                [0{idx + 1}]
              </div>
              <div className="achievement-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4>{item.title}</h4>
                  <span className="exp-badge" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                    {item.badge}
                  </span>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

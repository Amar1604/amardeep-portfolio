import React from 'react';
import { achievementsData } from '../data/portfolioData';
import { Trophy, Award, Target, FileCheck } from 'lucide-react';

const icons = [Trophy, Target, Award, FileCheck, FileCheck];

export const Achievements = () => {
  return (
    <section id="achievements">
      <div className="container">
        <h2 className="section-title">
          Achievements &amp; <span>Certifications</span>
        </h2>

        <div className="achievements-grid">
          {achievementsData.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="glass-card achievement-card">
                <div className="achievement-icon">
                  <Icon size={24} />
                </div>
                <div className="achievement-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h4>{item.title}</h4>
                    <span className="exp-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {item.badge}
                    </span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Achievements;

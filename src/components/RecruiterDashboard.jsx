import React from 'react';
import { recruiterStats, personalInfo } from '../data/portfolioData';
import { Download, Sparkles } from 'lucide-react';

export const RecruiterDashboard = () => {
  return (
    <section id="recruiter-dashboard">
      <div className="container">
        <h2 className="section-title">
          Recruiter <span>Quick Scan</span>
        </h2>

        {/* Statistics Dashboard Grid */}
        <div className="dashboard-grid">
          {recruiterStats.map((stat, idx) => (
            <div key={idx} className="glass-card stat-card">
              <div className="stat-num">{stat.num}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA to Recruiters */}
        <div className="recruiter-cta-container">
          <div className="recruiter-cta-text">
            <h3>Need to review my credentials?</h3>
            <p>
              Download my updated, ATS-optimized technical resume featuring Infosys Springboard experience and verified projects.
            </p>
          </div>
          <a
            href={personalInfo.resumePath}
            className="btn btn-primary pulse-glow-anim"
            download="Amardeep_Resume.pdf"
          >
            <Download size={20} />
            Download PDF Resume
          </a>
        </div>
      </div>
    </section>
  );
};
export default RecruiterDashboard;

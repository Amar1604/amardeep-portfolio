import React from 'react';
import { recruiterStats, personalInfo } from '../data/portfolioData';
import { OptimizationBenchmark } from './OptimizationBenchmark';
import { soundFX } from '../utils/soundFX';

export const RecruiterDashboard = () => {
  return (
    <section id="recruiter-dashboard">
      <div className="container">
        <div className="section-header-center">
          <div className="hero-badge-container">
            <span className="hero-subtitle">
              // TELEMETRY SNAPSHOT &bull; VERIFIED CREDENTIALS
            </span>
          </div>
          <h2 className="section-title">
            Recruiter <span>Quick Scan</span>
          </h2>
          <p className="section-subtitle-desc">
            Directly verifiable metrics, performance benchmarks, and production-tested engineering outcomes.
          </p>
        </div>

        {/* Statistics Dashboard Grid */}
        <div className="dashboard-grid">
          {recruiterStats.map((stat, idx) => (
            <div key={idx} className="glass-card stat-card" data-cursor="METRIC">
              <div className="stat-card-badge">METRIC_{idx + 1}</div>
              <div className="stat-num">{stat.num}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Query Optimization Benchmark Simulator */}
        <div style={{ marginTop: '2.5rem' }}>
          <OptimizationBenchmark />
        </div>

        {/* CTA to Recruiters */}
        <div className="recruiter-cta-container">
          <div className="recruiter-cta-text">
            <h3>Need to review verified credentials?</h3>
            <p>
              Download my updated, ATS-optimized technical resume featuring Infosys Springboard experience, capstone metrics, and full-stack systems.
            </p>
          </div>
          <a
            href={personalInfo.resumePath}
            className="btn btn-primary pulse-glow-anim"
            download="Amardeep_Resume.pdf"
            onClick={() => soundFX.playWarp()}
            onMouseEnter={() => soundFX.playHover()}
            data-cursor="DOWNLOAD"
          >
            <span>[DOWNLOAD ATS RESUME .PDF]</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecruiterDashboard;

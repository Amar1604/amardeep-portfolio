import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Award, Zap } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-animate"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <img
          src={project.image}
          alt={project.title}
          className="modal-hero-img"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop';
          }}
        />

        <div className="modal-body">
          <div className="modal-header-info">
            <h2>{project.title}</h2>
            <div className="modal-role">{project.role}</div>
            <div className="project-tags">
              {project.tags.map((t, idx) => (
                <span key={idx} className="project-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            {project.fullDesc}
          </p>

          <div className="modal-grid">
            <div>
              <h4 className="modal-section-title">
                <CheckCircle2 size={20} /> Key Engineering Highlights
              </h4>
              <ul className="modal-features-list">
                {project.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>

              <h4 className="modal-section-title">
                <Zap size={20} /> Architecture &amp; Challenge Solved
              </h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {project.challenges}
              </p>
            </div>

            <div>
              <div className="modal-sidebar-card">
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={18} color="var(--accent-cyan)" /> Performance Metric
                </h4>
                <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {project.metrics}
                </p>
              </div>

              <div className="modal-sidebar-card">
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cpu size={18} color="var(--accent-cyan)" /> Technologies
                </h4>
                <div className="sidebar-tech-stack">
                  {project.tags.map((tech, idx) => (
                    <span key={idx} className="sidebar-tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Github size={18} /> View GitHub Repository
              </a>
            )}
            {project.live && project.live !== project.github && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <ExternalLink size={18} /> Live Demonstration
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectModal;

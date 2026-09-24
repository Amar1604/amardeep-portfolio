import React, { useEffect } from 'react';
import { soundFX } from '../utils/soundFX';

export const ProjectModal = ({ project, onClose, onPrev, onNext }) => {
  useEffect(() => {
    soundFX.playModalOpen();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundFX.playClick();
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (!project) return null;

  const githubUrl = project.github || project.links?.github;
  const liveUrl = project.live || project.links?.live;
  const hasLiveDemo = liveUrl && liveUrl !== githubUrl;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-animate modal-holo-hud"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Holographic Header Bar with Project Navigation */}
        <div className="modal-holo-header">
          <div className="holo-status">
            <span className="telemetry-live-dot"></span>
            <span>SYSTEM_TELEMETRY // SPEC_ID: {project.id ? project.id.toUpperCase() : 'CORE_01'}</span>
          </div>

          <div className="modal-header-controls">
            {onPrev && onNext && (
              <div className="modal-nav-arrows">
                <button
                  type="button"
                  className="modal-nav-btn"
                  onClick={onPrev}
                  title="Previous Project (Arrow Left)"
                  data-cursor="PREV"
                >
                  &larr; PREV
                </button>
                <button
                  type="button"
                  className="modal-nav-btn"
                  onClick={onNext}
                  title="Next Project (Arrow Right)"
                  data-cursor="NEXT"
                >
                  NEXT &rarr;
                </button>
              </div>
            )}

            <button
              className="modal-close-holo"
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              aria-label="Close modal"
              data-cursor="CLOSE"
            >
              <span>[ESC // CLOSE]</span>
            </button>
          </div>
        </div>

        <div className="modal-img-wrapper-holo">
          <img
            src={project.image}
            alt={project.title}
            className="modal-hero-img"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop';
            }}
          />
          <div className="img-scanline-overlay" />
        </div>

        <div className="modal-body">
          <div className="modal-header-info">
            <div className="modal-category-badge">[{project.category.toUpperCase()}]</div>
            <h2>{project.title}</h2>
            <div className="modal-role">{project.role}</div>
            <div className="project-tags">
              {project.tags.map((t, idx) => (
                <span key={idx} className="project-tag">
                  {t}
                </span>
              ))}
            </div>

            {/* Direct Clickable Repository Callout */}
            {githubUrl && (
              <div className="modal-repo-callout">
                <span className="repo-callout-label">// REPO &amp; MORE INFO:</span>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-callout-link"
                  onClick={() => soundFX.playClick()}
                  data-cursor="GITHUB"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>{githubUrl}</span>
                  <span className="repo-callout-arrow">&rarr;</span>
                </a>
              </div>
            )}
          </div>

          <p className="modal-full-desc">
            {project.fullDesc}
          </p>

          <div className="modal-grid">
            <div>
              <h4 className="modal-section-title">
                <span className="modal-title-glyph">[CORE]</span> Engineering Capabilities
              </h4>
              <ul className="modal-features-list">
                {project.features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="feature-bullet-glyph">&gt;&gt;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <h4 className="modal-section-title">
                <span className="modal-title-glyph">[CHALLENGE]</span> Technical Obstacle &amp; Resolution
              </h4>
              <p className="modal-challenge-text">
                {project.challenges}
              </p>
            </div>

            <div>
              <div className="modal-sidebar-card holo-metric-card">
                <h4 className="sidebar-card-title">
                  <span className="sidebar-tag">[METRIC]</span> Verified Benchmark
                </h4>
                <p className="holo-metric-val">
                  {project.metrics}
                </p>
              </div>

              <div className="modal-sidebar-card">
                <h4 className="sidebar-card-title">
                  <span className="sidebar-tag">[STACK]</span> Architecture Components
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
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-3d-hover"
                onClick={() => soundFX.playClick()}
                data-cursor="GITHUB"
              >
                <span>[OPEN GITHUB REPO // MORE INFO]</span>
              </a>
            )}
            {hasLiveDemo && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-3d-hover"
                onClick={() => soundFX.playClick()}
                data-cursor="LAUNCH"
              >
                <span>[LAUNCH LIVE APPLICATION -&gt;]</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

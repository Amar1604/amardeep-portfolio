import React, { useState, useRef } from 'react';
import { soundFX } from '../utils/soundFX';

export const ProjectCard = ({ project, onSelect }) => {
  const cardRef = useRef(null);
  const [glareStyle, setGlareStyle] = useState({});
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Calculate rotation (-8deg to +8deg)
    const rotX = ((height / 2 - y) / (height / 2)) * 8;
    const rotY = ((x - width / 2) / (width / 2)) * 8;

    // Calculate glare position
    const glareX = (x / width) * 100;
    const glareY = (y / height) * 100;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });

    setGlareStyle({
      opacity: 0.22,
      background: `radial-gradient(circle 280px at ${glareX}% ${glareY}%, rgba(59, 130, 246, 0.35), rgba(99, 102, 241, 0.15) 50%, transparent 80%)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease-out'
    });
  };

  const hasLiveDemo = project.live && project.live !== project.github;
  const githubUrl = project.github || project.links?.github;

  return (
    <div
      ref={cardRef}
      className="glass-card project-card project-card-3d"
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      data-cursor="INSPECT"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(project);
      }}
    >
      {/* Dynamic Specular Glare Layer */}
      <div className="card-glare-overlay" style={glareStyle} aria-hidden="true" />

      <div className="project-img-box card-layer-depth-1">
        <img
          src={project.image}
          alt={project.title}
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
          }}
        />
        {project.featured && (
          <div className="project-featured-badge card-layer-depth-2">
            [FLAGSHIP // PRODUCTION]
          </div>
        )}
      </div>

      <div className="project-info card-layer-depth-2">
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.shortDesc}</p>

        {/* Dedicated Quick Action Links with e.stopPropagation() */}
        <div
          className="project-card-actions card-layer-depth-3"
          onClick={(e) => e.stopPropagation()}
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn project-action-github"
              onClick={() => soundFX.playClick()}
              title={`View ${project.title} GitHub Repository`}
              data-cursor="GITHUB"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub Code</span>
            </a>
          )}

          {hasLiveDemo && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn project-action-live"
              onClick={() => soundFX.playClick()}
              title={`Open Live Demo of ${project.title}`}
              data-cursor="LIVE"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Live App</span>
            </a>
          )}

          <button
            type="button"
            className="project-action-btn project-action-details"
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              onSelect(project);
            }}
            title="Inspect Architecture & Metrics"
            data-cursor="SPECS"
          >
            <span>Specs &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

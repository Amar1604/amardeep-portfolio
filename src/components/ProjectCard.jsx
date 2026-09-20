import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';

export const ProjectCard = ({ project, onSelect }) => {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const rotX = ((height / 2 - y) / (height / 2)) * 7;
    const rotY = ((x - width / 2) / (width / 2)) * 7;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
  };

  return (
    <div
      className="glass-card project-card"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(project);
      }}
    >
      <div className="project-img-box">
        <img
          src={project.image}
          alt={project.title}
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
          }}
        />
        {project.featured && (
          <div className="project-featured-badge">
            <Star size={12} style={{ display: 'inline', marginRight: '4px' }} fill="currentColor" />
            Flagship
          </div>
        )}
      </div>

      <div className="project-info">
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.shortDesc}</p>

        <span className="project-link">
          Explore Architecture &amp; Metrics <ArrowRight size={16} />
        </span>
      </div>
    </div>
  );
};
export default ProjectCard;

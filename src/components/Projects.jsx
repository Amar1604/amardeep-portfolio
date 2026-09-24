import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { soundFX } from '../utils/soundFX';

export const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { label: '[ALL PROJECTS]', value: 'all' },
    { label: '[FULL STACK & WEB]', value: 'fullstack' },
    { label: '[MOBILE APPS]', value: 'mobile' },
    { label: '[AI & CYBERSECURITY]', value: 'ai' }
  ];

  const popularTags = ['ALL', 'React 19', 'Flutter', 'Python', 'Django REST', 'FastAPI', 'Blockchain', 'Vite'];

  const handleFilterChange = (val) => {
    soundFX.playClick();
    setFilter(val);
  };

  const handleTagChange = (t) => {
    soundFX.playClick();
    setSelectedTag(t);
  };

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory =
      filter === 'all'
        ? true
        : p.category === filter || (filter === 'ai' && (p.category === 'ai' || p.tags.includes('Local AI')));

    const matchesTag = selectedTag === 'ALL' || p.tags.includes(selectedTag);

    return matchesCategory && matchesTag;
  });

  return (
    <section id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <div className="hero-badge-container">
              <span className="hero-subtitle">
                // SYSTEM REPOSITORIES &bull; PRODUCTION PROTOTYPES
              </span>
            </div>
            <h2 className="section-title">
              Featured <span>Projects</span>
            </h2>
          </div>

          <div className="filter-btn-group">
            {filters.map((f) => (
              <button
                key={f.value}
                className={`filter-btn ${filter === f.value ? 'active' : ''}`}
                onClick={() => handleFilterChange(f.value)}
                onMouseEnter={() => soundFX.playHover()}
                data-cursor="FILTER"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Technology Quick-Pill Filter */}
        <div className="projects-tech-filter-row">
          <span className="tech-filter-label">// TECH FILTER:</span>
          <div className="tech-filter-pills">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className={`tech-pill-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => handleTagChange(tag)}
                onMouseEnter={() => soundFX.playHover()}
                data-cursor="TAG"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(proj) => {
                soundFX.playClick();
                setSelectedProject(proj);
              }}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;

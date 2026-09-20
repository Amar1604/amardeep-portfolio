import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Full Stack & Web', value: 'fullstack' },
    { label: 'AI & Security', value: 'ai' }
  ];

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter || (filter === 'ai' && (p.category === 'ai' || p.tags.includes('NIST Cybersecurity Framework'))));

  return (
    <section id="projects">
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>

          <div className="filter-btn-group">
            {filters.map((f) => (
              <button
                key={f.value}
                className={`filter-btn ${filter === f.value ? 'active' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(proj) => setSelectedProject(proj)}
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

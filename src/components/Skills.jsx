import React, { useEffect, useRef, useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { SkillGalaxy3D } from './3d/SkillGalaxy3D';
import { soundFX } from '../utils/soundFX';

const roleProfiles = [
  {
    id: 'all',
    label: '[ALL TECHNOLOGIES]',
    fit: '100% VERSATILE',
    matchingSkills: []
  },
  {
    id: 'fullstack',
    label: '[FULL-STACK ENGINEER]',
    fit: '98% RELEVANT',
    matchingSkills: ['React.js / React 19', 'JavaScript (ES6+) & TypeScript', 'Tailwind CSS & CSS3 / HTML5', 'Vite & Next.js', 'Django REST Framework', 'Node.js & RESTful APIs', 'PostgreSQL & MySQL', 'JWT & OAuth2 Authentication']
  },
  {
    id: 'mobile',
    label: '[MOBILE APP BUILDER]',
    fit: '96% RELEVANT',
    matchingSkills: ['Flutter Framework', 'Dart Programming', 'Cross-Platform (iOS & Android)', 'Mobile UI/UX & State Management', 'Firebase (Auth / Firestore)', 'Node.js & RESTful APIs']
  },
  {
    id: 'backend',
    label: '[BACKEND & CLOUD ARCHITECT]',
    fit: '94% RELEVANT',
    matchingSkills: ['Django REST Framework', 'FastAPI & Python', 'Node.js & RESTful APIs', 'PostgreSQL & MySQL', 'SQLite & MongoDB', 'JWT & OAuth2 Authentication', 'Docker & Linux Environments']
  },
  {
    id: 'ai',
    label: '[AI & SYSTEM INTEGRATOR]',
    fit: '92% RELEVANT',
    matchingSkills: ['Ollama (Gemma3) & Local LLMs', 'OpenCV & Computer Vision', 'FastAPI & Python', 'Git, GitHub & CI/CD', 'Postman, Pytest & Playwright']
  }
];

export const Skills = ({ theme = 'dark' }) => {
  const [animateBars, setAnimateBars] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | '3d'
  const [selectedRole, setSelectedRole] = useState('all');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggleView = (mode) => {
    soundFX.playClick();
    setViewMode(mode);
  };

  const handleRoleSelect = (roleId) => {
    soundFX.playClick();
    setSelectedRole(roleId);
  };

  const activeProfile = roleProfiles.find((r) => r.id === selectedRole) || roleProfiles[0];

  return (
    <section id="skills" ref={sectionRef} className="skills-section-3d">
      <div className="container">
        <div className="section-header-center">
          <div className="hero-badge-container">
            <span className="hero-subtitle">
              // PRODUCTION TOOLKIT &bull; VERIFIED PROFICIENCY
            </span>
          </div>
          <h2 className="section-title">
            Engineered <span>Tech Stack</span>
          </h2>
          <p className="section-subtitle-desc">
            Production-tested architectures, frameworks, APIs, and cloud services.
          </p>

          {/* Interactive Mode Switcher */}
          <div className="skill-view-switcher">
            <button
              className={`switcher-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleToggleView('grid')}
              onMouseEnter={() => soundFX.playHover()}
              data-cursor="GRID"
            >
              <span>[STRUCTURED MATRIX]</span>
            </button>
            <button
              className={`switcher-btn ${viewMode === '3d' ? 'active' : ''}`}
              onClick={() => handleToggleView('3d')}
              onMouseEnter={() => soundFX.playHover()}
              data-cursor="3D"
            >
              <span>[3D ORBITAL GALAXY]</span>
            </button>
          </div>

          {/* Interactive Role Matcher Toolbar */}
          <div className="skill-role-matcher-bar">
            <div className="matcher-header-row">
              <span className="matcher-label">// RECRUITER ROLE MATCHER:</span>
              <span className="matcher-fit-badge">{activeProfile.fit}</span>
            </div>
            <div className="matcher-buttons-row">
              {roleProfiles.map((role) => (
                <button
                  key={role.id}
                  className={`matcher-pill-btn ${selectedRole === role.id ? 'active' : ''}`}
                  onClick={() => handleRoleSelect(role.id)}
                  onMouseEnter={() => soundFX.playHover()}
                  data-cursor="FILTER"
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {viewMode === '3d' ? (
          <SkillGalaxy3D theme={theme} />
        ) : (
          <div className="skills-container">
            {skillsData.map((cat, idx) => (
              <div
                key={idx}
                className="skills-category glass-card skills-card-3d"
              >
                <div className="skills-cat-header">
                  <span className="skills-cat-index">[CAT_0{idx + 1}]</span>
                  <h3>{cat.category}</h3>
                </div>

                <div className="skill-list">
                  {cat.skills.map((skill, sIdx) => {
                    const isHovered = hoveredSkill === `${idx}-${sIdx}`;
                    const isRoleMatch =
                      selectedRole === 'all' ||
                      activeProfile.matchingSkills.includes(skill.name);

                    return (
                      <div
                        key={sIdx}
                        className={`skill-item ${isHovered ? 'skill-item-active' : ''} ${!isRoleMatch ? 'skill-item-dimmed' : 'skill-item-matched'}`}
                        onMouseEnter={() => {
                          soundFX.playHover();
                          setHoveredSkill(`${idx}-${sIdx}`);
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-info">
                          <span className="skill-name">
                            {skill.name}
                            {isRoleMatch && selectedRole !== 'all' && (
                              <span className="skill-matched-dot" title="Core requirement for selected role">&bull; MATCH</span>
                            )}
                          </span>
                          <span className="skill-level">{skill.level}</span>
                        </div>
                        <div className="skill-bar-bg">
                          <div
                            className="skill-bar-fill"
                            style={{
                              width: animateBars ? skill.level : '0%'
                            }}
                          />
                        </div>
                        {skill.projectProof && (
                          <div className="skill-proof-row">
                            <span className="skill-proof-tag">// PROVEN IN:</span>
                            <span className="skill-proof-name">{skill.projectProof}</span>
                            {skill.tier && <span className="skill-tier-badge">[{skill.tier}]</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;

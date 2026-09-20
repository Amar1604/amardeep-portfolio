import React, { useEffect, useRef, useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Layout, Smartphone, Server, Database, Cpu } from 'lucide-react';

const categoryIcons = {
  'Frontend & Web': Layout,
  'Mobile Development': Smartphone,
  'Backend & APIs': Server,
  'Databases & Cloud': Database,
  'AI, Vision & Tools': Cpu
};

export const Skills = () => {
  const [animateBars, setAnimateBars] = useState(false);
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

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          My <span>Tech Toolkit</span>
        </h2>

        <div className="skills-container">
          {skillsData.map((cat, idx) => {
            const Icon = categoryIcons[cat.category] || Layout;
            return (
              <div key={idx} className="skills-category">
                <h3>
                  <Icon size={22} />
                  {cat.category}
                </h3>
                <div className="skill-list">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
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
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Skills;

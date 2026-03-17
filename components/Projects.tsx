import React from 'react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  return (
    <>
      <div className="section-head">
        <div className="section-title-group">
          <span className="section-number">04</span>
          <div>
            <p className="section-kicker">Selected Builds</p>
            <h2 className="section-title">Projects</h2>
          </div>
        </div>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-card reveal"
            style={{ '--delay': `${0.1 + index * 0.05}s` } as React.CSSProperties}
          >
            <div>
              <p className="section-kicker">Project {String(index + 1).padStart(2, '0')}</p>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              {project.github && (
                <a className="pub-link" href={project.github}>
                  GitHub
                </a>
              )}
              {project.link && (
                <a className="pub-link" href={project.link}>
                  Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default Projects;

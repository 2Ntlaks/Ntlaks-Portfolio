import React from "react";
import { FEATURED, INDEX } from "../constants/site";
import SectionHeading from "./SectionHeading";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 11 11 3M5 3h6v6" />
  </svg>
);

const Module = ({ project, featured = false }) => {
  const pins = featured ? 8 : 6;
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`mod${featured ? " mod--feat" : ""}`}
      style={{ "--pcb-c": project.color }}
    >
      <span className="mod-pins" aria-hidden="true">
        {Array.from({ length: pins }, (_, i) => (
          <i key={i} />
        ))}
      </span>
      <span className="mod-hole tl" aria-hidden="true" />
      <span className="mod-hole tr" aria-hidden="true" />
      <span className="mod-hole bl" aria-hidden="true" />
      <span className="mod-hole br" aria-hidden="true" />

      <span className="mod-top mono">
        <span>{project.ref}</span>
        <span className="mod-led">
          <i aria-hidden="true" />
          {featured ? "Featured" : "Module"}
        </span>
      </span>

      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <span className="mod-foot">
        <span className="mod-tags mono">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
        <span className="mod-go mono">
          {project.linkLabel}
          <Arrow />
        </span>
      </span>
    </a>
  );
};

const Projects = () => (
  <section id="projects" className="work" aria-labelledby="projects-title">
    <div className="wrap">
      <SectionHeading
        id="projects-title"
        designator="J3"
        label="Projects · modules"
        title="Modules I've shipped."
        intro="Each one plugs into something real: a business, a classroom or a codebase you can read."
      />

      <div className="mods">
        <div className="mods-featured">
          {FEATURED.map((project) => (
            <Module key={project.ref} project={project} featured />
          ))}
        </div>
        <div className="mods-index">
          {INDEX.map((project) => (
            <Module key={project.ref} project={project} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Projects;

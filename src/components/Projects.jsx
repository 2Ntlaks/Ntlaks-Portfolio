import React from "react";
import { FEATURED, INDEX, IN_PROGRESS, KINDS, LINKS } from "../constants/site";
import SectionHeading from "./SectionHeading";

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M3 11 11 3M5 3h6v6" />
  </svg>
);

const ProjectLink = ({ link }) => (
  <a
    href={link.href}
    className={`mod-link${link.primary ? " is-primary" : ""}`}
    {...(link.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
  >
    {link.label}
    <Arrow />
  </a>
);

/*
  A project is a PCB module: the board colour says what kind of thing it
  is, the "screen" holds a real screenshot, the links sit on the edge.
*/
const Module = ({ project, featured = false }) => {
  const kind = KINDS[project.kind];
  return (
    <article className={`mod${featured ? " mod--feat" : ""}`} style={{ "--pcb-c": kind.color }}>
      <span className="mod-hole tl" aria-hidden="true" />
      <span className="mod-hole tr" aria-hidden="true" />

      <div className="mod-screen">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </div>

      <div className="mod-body">
        <span className="mod-top mono">
          <span>{kind.label}</span>
          {project.status && (
            <span className="mod-led">
              <i aria-hidden="true" />
              {project.status}
            </span>
          )}
        </span>

        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.outcome && <p className="mod-outcome">{project.outcome}</p>}

        <div className="mod-foot">
          <span className="mod-tags mono">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
          <span className="mod-links">
            {project.links.map((link) => (
              <ProjectLink key={link.label} link={link} />
            ))}
          </span>
        </div>
      </div>
    </article>
  );
};

const InProgress = ({ project }) => {
  const kind = KINDS[project.kind];
  return (
    <article className="mod mod--wide" style={{ "--pcb-c": kind.color }}>
      <span className="mod-hole tl" aria-hidden="true" />
      <span className="mod-hole bl" aria-hidden="true" />
      <div className="mod-screen">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </div>
      <div className="mod-body">
        <span className="mod-top mono">
          <span>{kind.label}</span>
          <span className="mod-led is-blink">
            <i aria-hidden="true" />
            {project.status}
          </span>
        </span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
};

const Projects = () => (
  <section id="work" className="work" aria-labelledby="work-title">
    {/* Old links pointed at #projects. */}
    <span id="projects" aria-hidden="true" />
    <div className="wrap">
      <SectionHeading
        id="work-title"
        label="Work"
        title="Things I've built."
        intro="Products people use, tools I teach with, and what's on the bench right now. Board colour tells you which."
      />

      <div className="mods">
        <div className="mods-featured">
          {FEATURED.map((project) => (
            <Module key={project.title} project={project} featured />
          ))}
        </div>
        <InProgress project={IN_PROGRESS} />
        <div className="mods-index">
          {INDEX.map((project) => (
            <Module key={project.title} project={project} />
          ))}
        </div>
      </div>

      <p className="work-more">
        Older work, including a Java banking system and a 2D car in raw WebGL, is{" "}
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
          on my GitHub
        </a>
        .
      </p>
    </div>
  </section>
);

export default Projects;

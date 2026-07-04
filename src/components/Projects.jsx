import React from "react";
import { PUBLIC_STATS } from "../constants/publicStats";
import SectionHeading from "./SectionHeading";

const ExternalIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const Projects = () => {
  const { udemyLectures, udemyLearners, udemyCountries, udemyPublicReviews } =
    PUBLIC_STATS;

  const featured = [
    {
      plate: "A",
      title: "Mgaguli Tutoring",
      description:
        "My tutoring practice, productized. A dedicated home for one-on-one sessions in C, Java, and engineering fundamentals — where students book time, follow structured tracks, and get unstuck with someone who has sat in their seat.",
      tags: ["Education", "Live platform"],
      link: "https://mgagulitutoring.dev",
      linkLabel: "mgagulitutoring.dev",
    },
    {
      plate: "B",
      title: "Java Bank Application",
      description:
        "A full-stack banking system built in Java with MySQL: account management, transaction history, and complete CRUD, with a custom security implementation for authentication and safe data handling.",
      tags: ["Java", "MySQL", "Security"],
      link: "https://github.com/2Ntlaks/Bank-Management-System",
      linkLabel: "View source",
    },
  ];

  const index = [
    {
      title: "WebGL for Beginners",
      description: `Udemy course making 3D graphics accessible — ${udemyLectures} lectures, ${udemyLearners}+ students in ${udemyCountries}+ countries, ${udemyPublicReviews} public reviews.`,
      tags: ["Course", "WebGL"],
      link: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
    },
    {
      title: "WebGL NDC Visualizer",
      description:
        "Interactive teaching tool for Normalized Device Coordinates: click-to-place vertices, live preview of all 7 primitive types, copyable shader code.",
      tags: ["React", "WebGL"],
      link: "https://github.com/2Ntlaks/WebGL-NDC-Visualizer",
    },
    {
      title: "Car in WebGL",
      description:
        "A 2D car in raw WebGL, no libraries — two progressive versions covering triangulation, shaders, and matrix-driven animation.",
      tags: ["GLSL", "WebGL"],
      link: "https://github.com/2Ntlaks/Car-in-WebGL",
    },
  ];

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading fig="03" title="Projects" note="Selected plates" />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featured.map((project) => (
            <a
              key={project.plate}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="corners group relative border border-line bg-panel p-8 md:p-10 flex flex-col hover:border-amber/50 transition-colors duration-300"
            >
              <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-amber mb-6">
                Plate {project.plate} — Featured
              </p>

              <h3 className="font-display font-semibold text-2xl md:text-3xl text-paper mb-4 group-hover:text-amber transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-draft leading-relaxed mb-8 flex-1">
                {project.description}
              </p>

              <div className="flex items-center justify-between gap-4 pt-5 border-t border-dashed border-line">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-faint uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-draft group-hover:text-amber transition-colors whitespace-nowrap">
                  {project.linkLabel}
                  <ExternalIcon />
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-faint mb-4">
          Index of further work
        </p>
        <ul className="border-t border-line">
          {index.map((project) => (
            <li key={project.title}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid sm:grid-cols-[14rem_1fr_auto] gap-2 sm:gap-8 items-baseline py-5 border-b border-line/50 hover:bg-panel/60 transition-colors duration-200 px-2 -mx-2"
              >
                <span className="font-display font-medium text-lg text-paper group-hover:text-amber transition-colors">
                  {project.title}
                </span>
                <span className="text-draft text-sm leading-relaxed">
                  {project.description}
                </span>
                <span className="hidden sm:flex items-center gap-3 font-mono text-xs text-faint">
                  {project.tags.join(" · ")}
                  <ExternalIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;

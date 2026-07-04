import React from "react";
import { FaJava } from "react-icons/fa6";
import {
  SiC,
  SiJavascript,
  SiPython,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiHtml5,
  SiWebgl,
  SiGit,
  SiGithub,
  SiMysql,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";

/* Rendered as a spec-sheet "bill of materials" rather than an icon grid. */
const skills = [
  { name: "Java", category: "Language", note: "Backend & desktop apps", Icon: FaJava },
  { name: "C", category: "Language", note: "Systems & embedded", Icon: SiC },
  { name: "JavaScript", category: "Language", note: "Web & graphics", Icon: SiJavascript },
  { name: "Python", category: "Language", note: "Scripting & tooling", Icon: SiPython },
  { name: "WebGL", category: "Graphics", note: "Shaders, raw GL — I teach this", Icon: SiWebgl },
  { name: "React", category: "Web", note: "This site, teaching tools", Icon: SiReact },
  { name: "Vite", category: "Web", note: "Build tooling", Icon: SiVite },
  { name: "Tailwind", category: "Web", note: "Styling systems", Icon: SiTailwindcss },
  { name: "HTML5", category: "Web", note: "Semantic markup", Icon: SiHtml5 },
  { name: "MySQL", category: "Data", note: "Relational modelling", Icon: SiMysql },
  { name: "Git", category: "Tooling", note: "Version control", Icon: SiGit },
  { name: "GitHub", category: "Tooling", note: "Collaboration & CI", Icon: SiGithub },
];

const Skills = () => (
  <section id="skills" className="relative py-28 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionHeading fig="02" title="Skills" note="Bill of materials" />

      <div className="corners border border-line bg-panel/50">
        <div className="hidden sm:grid grid-cols-[3rem_2.5rem_1fr_8rem_1fr] gap-4 items-center px-6 py-3 border-b border-line font-mono text-[0.6rem] tracking-[0.25em] uppercase text-faint">
          <span>No.</span>
          <span aria-hidden="true" />
          <span>Item</span>
          <span>Class</span>
          <span className="text-right">Notes</span>
        </div>

        <ul>
          {skills.map(({ name, category, note, Icon }, index) => (
            <li
              key={name}
              className="group grid grid-cols-[2.5rem_2rem_1fr] sm:grid-cols-[3rem_2.5rem_1fr_8rem_1fr] gap-4 items-center px-6 py-4 border-b border-line/50 last:border-b-0 hover:bg-panel transition-colors duration-200"
            >
              <span className="font-mono text-xs text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon
                className="w-5 h-5 text-draft group-hover:text-amber transition-colors duration-200"
                aria-hidden="true"
              />
              <span className="font-display font-medium text-lg text-paper">
                {name}
              </span>
              <span className="hidden sm:block font-mono text-xs text-faint uppercase tracking-wider">
                {category}
              </span>
              <span className="hidden sm:block text-draft text-sm text-right">
                {note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Skills;

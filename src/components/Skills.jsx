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

const skillGroups = [
  {
    category: "Languages",
    items: [
      { name: "Java", Icon: FaJava, color: "#E76F00" },
      { name: "C", Icon: SiC, color: "#A8B9CC" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    category: "Web & Graphics",
    items: [
      { name: "WebGL", Icon: SiWebgl, color: "#990000" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Vite", Icon: SiVite, color: "#646CFF" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#F8FAFC" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
    ],
  },
];

const Skills = () => (
  <section
    id="skills"
    className="scroll-mt-24 py-24 px-6 max-w-6xl mx-auto"
  >
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-white">
        <span className="text-primary">02.</span> Skills
      </h2>
      <p className="text-slate-500 font-mono text-sm uppercase tracking-widest mt-3">
        Technical Arsenal
      </p>
    </div>

    <div className="space-y-10">
      {skillGroups.map((group) => (
        <div key={group.category}>
          <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4 text-center md:text-left">
            {group.category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {group.items.map(({ name, Icon, color }) => (
              <div
                key={name}
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface/60 border border-white/5 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icon
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                  style={{ color }}
                  aria-hidden="true"
                />
                <span className="text-slate-300 font-mono text-sm">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;

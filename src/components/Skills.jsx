import React from "react";
import { SKILL_GROUPS } from "../constants/site";
import SectionHeading from "./SectionHeading";

const Skills = () => (
  <section id="skills" className="pcb-band" aria-labelledby="skills-title">
    <svg className="traces" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="#c9973f" strokeWidth="3">
        <path d="M1200 300 H980 L940 340 V470 L900 510 H760" />
        <path d="M1200 320 H990 L960 350 V480" />
        <path d="M0 720 H170 L220 770 H520 L550 800" />
        <path d="M900 0 V40 L940 80 H1200" />
      </g>
      <g fill="#c9973f">
        <circle cx="760" cy="510" r="7" />
        <circle cx="960" cy="480" r="7" />
      </g>
    </svg>

    <div className="wrap" style={{ position: "relative" }}>
      <SectionHeading id="skills-title" label="Skills" title="What I work with." dark />

      <div className="skill-grid">
        {SKILL_GROUPS.map((group) => (
          <div className="skill-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{group.proof}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;

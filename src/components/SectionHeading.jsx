import React from "react";

const SectionHeading = ({ label, title, intro, id, dark = false }) => (
  <header className={`sh${dark ? " sh--dark" : ""}`}>
    <span className="sh-tag mono">
      <span className="sh-dot" aria-hidden="true" />
      {label}
    </span>
    <h2 id={id} className="display">
      {title}
    </h2>
    {intro && <p>{intro}</p>}
  </header>
);

export default SectionHeading;

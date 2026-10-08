import React from "react";

/*
  Every section is a header on the board (J1–J5). The designator, the
  label and the pin count are real structure: J-number = section order.
*/
const SectionHeading = ({ designator, label, title, intro, id, dark = false }) => (
  <header className={`sh${dark ? " sh--dark" : ""}`}>
    <span className="sh-tag mono">
      <span className="sh-header" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <b>{designator}</b>
      </span>
      {label}
    </span>
    <h2 id={id} className="display">
      {title}
    </h2>
    {intro && <p>{intro}</p>}
  </header>
);

export default SectionHeading;

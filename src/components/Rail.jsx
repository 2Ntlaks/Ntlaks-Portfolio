import React from "react";

/* Breadboard power rail used as a section divider: + rail red, − rail blue. */
const Rail = () => (
  <div className="wrap" aria-hidden="true">
    <div className="rail">
      <span className="rail-mark">
        <span className="p">+</span>
        <span className="n">−</span>
      </span>
      <span className="rail-strip" />
      <span className="rail-mark">
        <span className="p">+</span>
        <span className="n">−</span>
      </span>
    </div>
  </div>
);

export default Rail;

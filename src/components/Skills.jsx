import React, { useState } from "react";
import { PINS } from "../constants/site";
import SectionHeading from "./SectionHeading";

/* DIP numbering: 1–7 run down the left side, 8–14 run back up the right. */
const LEFT = PINS.slice(0, 7);
const RIGHT = PINS.slice(7).reverse();

const Pin = ({ pin, side, active, onSelect }) => (
  <button
    type="button"
    className={`pin pin-${side}${pin.power ? " is-power" : ""}`}
    aria-pressed={active}
    onClick={() => onSelect(pin.n)}
    onMouseEnter={() => onSelect(pin.n)}
    onFocus={() => onSelect(pin.n)}
    aria-label={`Pin ${pin.n}: ${pin.name}`}
  >
    <span className="pin-leg" aria-hidden="true" />
    <span className="pin-num" aria-hidden="true">
      {pin.n}
    </span>
    <span className="pin-name">{pin.short ?? pin.name}</span>
  </button>
);

const Skills = () => {
  const [activePin, setActivePin] = useState(5);
  const pin = PINS.find((p) => p.n === activePin);

  return (
    <section id="skills" className="pcb-band" aria-labelledby="skills-title">
      <svg className="traces" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="#c9973f" strokeWidth="3">
          <path d="M0 140 H260 L300 180 H520" />
          <path d="M0 160 H250 L290 200 H470 L510 240 V330" />
          <path d="M1200 300 H980 L940 340 V470 L900 510 H760" />
          <path d="M1200 320 H990 L960 350 V480" />
          <path d="M0 680 H170 L220 730 H520 L550 760 H1200" />
          <path d="M760 0 V70 L800 110 H1080" />
        </g>
        <g fill="#c9973f">
          <circle cx="520" cy="180" r="7" />
          <circle cx="510" cy="330" r="7" />
          <circle cx="760" cy="510" r="7" />
          <circle cx="960" cy="480" r="7" />
          <circle cx="1080" cy="110" r="7" />
        </g>
      </svg>

      <div className="wrap" style={{ position: "relative" }}>
        <SectionHeading
          id="skills-title"
          designator="J2"
          label="Skills · pinout"
          title="One chip, fourteen pins."
          intro="Everything I work with, laid out like a 14-pin DIP. Hover or tap a pin to read it on the meter."
          dark
        />

        <div className="pinout">
          <div className="chip-diagram" role="group" aria-label="Skill pins">
            <div className="chip-pins">
              {LEFT.map((p) => (
                <Pin key={p.n} pin={p} side="left" active={p.n === activePin} onSelect={setActivePin} />
              ))}
            </div>
            <div className="chip-body">
              <span className="chip-mark">
                <b>NM-26</b>
                CPUT · ZA · 2026
              </span>
            </div>
            <div className="chip-pins">
              {RIGHT.map((p) => (
                <Pin key={p.n} pin={p} side="right" active={p.n === activePin} onSelect={setActivePin} />
              ))}
            </div>
          </div>

          <div className="meter" aria-live="polite">
            <div className="meter-top">
              <span>NM-26 · continuity</span>
              <span>Auto</span>
            </div>
            <div className="meter-lcd">
              <div className="row">
                <span>Pin {String(pin.n).padStart(2, "0")}</span>
                <span>{pin.power ? "Supply" : "Signal"}</span>
              </div>
              <div className="val">{pin.name}</div>
            </div>
            <p className="meter-note">{pin.note}</p>
            <div className="meter-dial" aria-hidden="true">
              <span>V⎓</span>
              <span>V~</span>
              <span>Ω</span>
              <span>·))</span>
              <span>A</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

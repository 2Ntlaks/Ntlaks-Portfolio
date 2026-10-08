import React from "react";

/* Segment rectangles in a 40×70 cell: a (top) clockwise to f, g in the middle. */
const SEGMENTS = {
  a: [8, 2, 24, 6],
  b: [32, 8, 6, 24],
  c: [32, 38, 6, 24],
  d: [8, 62, 24, 6],
  e: [2, 38, 6, 24],
  f: [2, 8, 6, 24],
  g: [8, 32, 24, 6],
};

const DIGITS = ["abcdef", "bc", "abdeg", "abcdg", "bcfg", "acdfg", "acdefg", "abc", "abcdefg", "abcdfg"];

const Digit = ({ char, dot }) => {
  const lit = DIGITS[Number(char)] ?? "";
  return (
    <svg viewBox={`0 0 ${dot ? 50 : 40} 70`} aria-hidden="true">
      <g transform="skewX(-6) translate(6 0)">
        {Object.entries(SEGMENTS).map(([key, [x, y, w, h]]) => (
          <rect key={key} x={x} y={y} width={w} height={h} rx="2" className={lit.includes(key) ? "on" : undefined} />
        ))}
      </g>
      {dot && <rect x="40" y="61" width="7" height="7" rx="3.5" className="on" />}
    </svg>
  );
};

/* A small seven-segment display module. `value` may contain one decimal point. */
const SevenSeg = ({ value, plus = false, label }) => {
  const chars = String(value).split("");
  const cells = [];
  chars.forEach((char, i) => {
    if (char === ".") return;
    cells.push({ char, dot: chars[i + 1] === "." });
  });

  return (
    <div className="seg-mod">
      <div className="seg-digits" role="img" aria-label={`${value}${plus ? "+" : ""}${label ? ` ${label}` : ""}`}>
        {cells.map((cell, i) => (
          <Digit key={i} char={cell.char} dot={cell.dot} />
        ))}
        {plus && (
          <span className="seg-plus" aria-hidden="true">
            +
          </span>
        )}
      </div>
      {label && <small aria-hidden="true">{label}</small>}
    </div>
  );
};

export default SevenSeg;

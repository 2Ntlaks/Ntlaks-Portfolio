import React, { useEffect, useRef, useState } from "react";

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

const Digit = ({ char }) => {
  const lit = DIGITS[Number(char)] ?? "";
  return (
    <svg viewBox="0 0 40 70" aria-hidden="true">
      <g transform="skewX(-6) translate(6 0)">
        {Object.entries(SEGMENTS).map(([key, [x, y, w, h]]) => (
          <rect key={key} x={x} y={y} width={w} height={h} rx="2" className={lit.includes(key) ? "on" : undefined} />
        ))}
      </g>
    </svg>
  );
};

/*
  Counts up from zero the first time it scrolls into view. It renders the
  final value first, so without JS-driven animation the number is still right.
*/
const SevenSeg = ({ value, plus = false, label, animate = true }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);
  const width = String(value).length;

  useEffect(() => {
    const node = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduce || !node || !("IntersectionObserver" in window)) return undefined;

    let frame = 0;
    let fallback = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / 1200);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        setShown(0);
        frame = requestAnimationFrame(step);
        // Never leave the display stuck mid-count if rAF is throttled.
        fallback = window.setTimeout(() => setShown(value), 1600);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [value, animate]);

  const text = String(shown).padStart(width, "0");

  return (
    <div className="seg-mod" ref={ref}>
      <div className="seg-digits" role="img" aria-label={`${value}${plus ? "+" : ""}${label ? ` ${label}` : ""}`}>
        {text.split("").map((char, i) => (
          <Digit key={i} char={char} />
        ))}
        {plus && <span className="seg-plus" aria-hidden="true">+</span>}
      </div>
      {label && <small aria-hidden="true">{label}</small>}
    </div>
  );
};

export default SevenSeg;

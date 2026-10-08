import React, { useCallback, useEffect, useRef, useState } from "react";
import { OledRenderer, SHAPES } from "../webgl/oled";

/* Spoken names for the screen-reader announcement and switch label. */
const SHAPE_NAMES = ["torus", "cube", "octahedron", "blob"];
import { PUBLIC_STATS } from "../constants/publicStats";
import { EMAIL } from "../constants/site";
import SevenSeg from "./SevenSeg";

/* Wire geometry lives in the rig's 560×520 coordinate space. */
const WIRES = [
  { color: "#1f2023", d: "M244 97 C244 24 14 24 14 180 C14 360 96 380 96 452", end: [96, 452] },
  { color: "#e0412f", d: "M268 97 C268 40 38 40 38 186 C38 350 130 380 130 452", end: [130, 452] },
  { color: "#f2c230", d: "M292 97 C292 40 470 26 600 36" },
  { color: "#2e9e5b", d: "M316 97 C316 54 476 46 600 58" },
];

const PIN_X = [244, 268, 292, 316];
const PIN_LABELS = ["GND", "VCC", "SCL", "SDA"];

const Rig = () => {
  const glRef = useRef(null);
  const textRef = useRef(null);
  const screenRef = useRef(null);
  const rendererRef = useRef(null);
  const [ledOn, setLedOn] = useState(false);
  const [switchDown, setSwitchDown] = useState(false);
  const [shapeIndex, setShapeIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer;
    try {
      renderer = new OledRenderer(glRef.current, textRef.current, { reducedMotion: reduce });
    } catch (error) {
      console.error("OLED hero failed to start:", error);
      setFailed(true);
      return undefined;
    }
    if (!renderer.isReady) {
      setFailed(true);
      return undefined;
    }
    rendererRef.current = renderer;

    let frame = null;
    let visible = true;
    const loop = (now) => {
      renderer.render(now);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame === null && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(screenRef.current);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.destroy();
      rendererRef.current = null;
    };
  }, []);

  // Drag to rotate the shape on the screen.
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return undefined;
    let last = null;
    const down = (e) => {
      if (e.pointerType === "touch") return; // keep vertical page scroll on phones
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
      rendererRef.current?.setDragging(true);
    };
    const move = (e) => {
      if (!last) return;
      rendererRef.current?.drag(e.clientX - last.x, e.clientY - last.y);
      last = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      last = null;
      rendererRef.current?.setDragging(false);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  const press = useCallback(() => {
    rendererRef.current?.cycle(performance.now());
    setShapeIndex((i) => (i + 1) % SHAPES.length);
    setLedOn(true);
    setSwitchDown(true);
    window.setTimeout(() => setSwitchDown(false), 140);
    window.setTimeout(() => setLedOn(false), 260);
  }, []);

  const nextName = SHAPE_NAMES[(shapeIndex + 1) % SHAPES.length];

  return (
    <div className="rig">
      <svg viewBox="0 0 560 520" aria-hidden="true">
        {/* OLED module PCB */}
        <rect x="40" y="84" width="480" height="290" rx="10" fill="#1d4fb8" />
        <rect x="40" y="84" width="480" height="290" rx="10" fill="url(#pcbSheen)" />
        <defs>
          <linearGradient id="pcbSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          [62, 106],
          [498, 106],
          [62, 352],
          [498, 352],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="11" fill="#d8b25d" />
            <circle cx={cx} cy={cy} r="7" fill="#f6f6f3" />
          </g>
        ))}
        {/* Header pads + silkscreen */}
        {PIN_X.map((x, i) => (
          <g key={x}>
            <rect x={x - 7} y="96" width="14" height="14" rx="2" fill="#d8b25d" />
            <rect x={x - 2.5} y="100.5" width="5" height="5" fill="#1a1a1a" />
            <text x={x} y="126" textAnchor="middle" fill="#e9eefb" fontFamily="Martian Mono, monospace" fontSize="8.5" letterSpacing="0.5">
              {PIN_LABELS[i]}
            </text>
          </g>
        ))}
        {/* Glass */}
        <rect x="72" y="138" width="416" height="216" rx="4" fill="#0b0d10" />
        <text x="280" y="369" textAnchor="middle" fill="#c9d6f5" fontFamily="Martian Mono, monospace" fontSize="8.5" letterSpacing="1">
          SSD1306 · 128×64 · I²C
        </text>

        {/* Component strip */}
        <g>
          <line x1="150" y1="452" x2="250" y2="452" stroke="#a3a6aa" strokeWidth="2.5" />
          <rect x="175" y="444" width="50" height="16" rx="7" fill="#e5d2a6" />
          <rect x="184" y="444" width="4" height="16" fill="#c62828" />
          <rect x="193" y="444" width="4" height="16" fill="#c62828" />
          <rect x="202" y="444" width="4" height="16" fill="#6d3b1f" />
          <rect x="214" y="444" width="4" height="16" fill="#c9a54a" />
          <circle cx="150" cy="452" r="3" fill="#7d7f84" />
          <circle cx="250" cy="452" r="3" fill="#7d7f84" />
        </g>
        <g className={`rig-led${ledOn ? " is-on" : ""}`}>
          <circle cx="292" cy="448" r="18" fill="#5e1712" />
          <circle className="rig-led-dome" cx="292" cy="448" r="14" />
          <ellipse cx="286" cy="442" rx="5" ry="3.5" fill="#fff" opacity="0.35" />
        </g>
        <g fontFamily="Martian Mono, monospace" fontSize="9" fill="#6e7076" textAnchor="middle" letterSpacing="0.5">
          <text x="96" y="504">GND</text>
          <text x="130" y="504">3V3</text>
          <text x="200" y="504">R1 220Ω</text>
          <text x="292" y="504">D1</text>
          <text x="368" y="504">SW1 · NEXT</text>
          <text x="552" y="76" textAnchor="end">TO ESP32 · SDA 21 · SCL 22</text>
        </g>

        {/* Jumper wires */}
        {WIRES.map((wire) => (
          <g className="rig-wire" key={wire.d}>
            <path className="w-shadow" d={wire.d} pathLength="1" />
            <path className="w-body" d={wire.d} pathLength="1" stroke={wire.color} />
            <path className="w-gloss" d={wire.d} pathLength="1" />
          </g>
        ))}
        {/* Dupont housings over the header pins and at the board ends */}
        {PIN_X.map((x) => (
          <rect key={`h-${x}`} x={x - 8} y="68" width="16" height="32" rx="2" fill="#18191b" />
        ))}
        {WIRES.filter((w) => w.end).map(({ end: [x, y] }) => (
          <g key={`e-${x}`}>
            <rect x={x - 8} y={y - 30} width="16" height="28" rx="2" fill="#18191b" />
            <rect x={x - 1.5} y={y - 3} width="3" height="6" fill="#b9bcc0" />
          </g>
        ))}
      </svg>

      <div className="rig-screen" ref={screenRef} title="Drag to rotate">
        <canvas ref={glRef} className="glow" aria-hidden="true" hidden={failed} />
        <canvas ref={textRef} aria-hidden="true" />
        {failed && (
          <p className="mono" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#80dbff", margin: 0 }}>
            WebGL is off in this browser
          </p>
        )}
      </div>

      <button
        type="button"
        className={`rig-switch${switchDown ? " is-down" : ""}`}
        onClick={press}
        aria-label={`SW1: morph the shape on the screen. Next: ${nextName}`}
        disabled={failed}
      />
      <span className="sr-only" aria-live="polite">
        Screen shows: {SHAPE_NAMES[shapeIndex]}
      </span>
    </div>
  );
};

const Hero = () => {
  const { udemyLearners, udemyCountries, udemyLectures } = PUBLIC_STATS;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-status mono">
            <span className="led-dot" aria-hidden="true" />
            Open to internships &amp; tutoring
          </p>

          <h1 id="hero-title" className="display">
            Ntlakanipho
            <span className="l2">Mgaguli</span>
          </h1>

          <p className="hero-say">
            I build interactive 3D, then I <em>teach how it works.</em>
          </p>

          <p className="hero-lede">
            Final-year Computer Engineering student at CPUT in Cape Town. I
            teach WebGL on Udemy, run{" "}
            <a href="https://mgagulitutoring.dev" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal-ink">
              Mgaguli Tutoring
            </a>
            , and spend the time in between on a breadboard. The little screen
            here is a WebGL shader pretending to be the OLED on mine.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-solid">
              See the work
              <span aria-hidden="true">↓</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-line">
              Email me
            </a>
          </div>

          <div className="hero-stats">
            <SevenSeg value={udemyLearners} plus label="Students" />
            <SevenSeg value={udemyCountries} plus label="Countries" />
            <SevenSeg value={udemyLectures} label="Lectures" />
          </div>
        </div>

        <Rig />
      </div>
    </section>
  );
};

export default Hero;

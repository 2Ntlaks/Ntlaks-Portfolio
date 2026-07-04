import React, { useEffect, useRef, useState } from "react";
import { WebGLRenderer } from "../webgl/renderer";
import { PUBLIC_STATS } from "../constants/publicStats";

const Hero = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const [webglReady, setWebglReady] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { udemyLearners, udemyCountries, udemyLectures } = PUBLIC_STATS;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => setReducedMotion(mediaQuery.matches);

    applyPreference();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", applyPreference);
    } else {
      mediaQuery.addListener(applyPreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", applyPreference);
      } else {
        mediaQuery.removeListener(applyPreference);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let renderer;
    try {
      renderer = new WebGLRenderer(canvas, {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        isMobile: window.matchMedia("(max-width: 768px)").matches,
      });
    } catch (error) {
      console.error("Failed to initialize WebGL hero scene:", error);
      setWebglReady(false);
      return;
    }

    if (!renderer.isReady) {
      setWebglReady(false);
      return;
    }

    rendererRef.current = renderer;
    setWebglReady(true);

    let animationFrameId = null;
    const renderLoop = (now) => {
      renderer.render(now);
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    const startRenderLoop = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(renderLoop);
      }
    };

    const stopRenderLoop = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handlePointerMove = (event) => {
      renderer.setPointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        renderer.setPointer(touch.clientX, touch.clientY);
      }
    };

    const handlePointerLeave = () => {
      renderer.clearPointer();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRenderLoop();
      } else {
        startRenderLoop();
      }
    };

    startRenderLoop();
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopRenderLoop();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      renderer.destroy();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setReducedMotion(reducedMotion);
    }
  }, [reducedMotion]);

  const stats = [
    { value: `${udemyLearners}+`, label: "Students" },
    { value: `${udemyCountries}+`, label: "Countries" },
    { value: udemyLectures, label: "Lectures" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {webglReady ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-95"
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-panel to-ink" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,27,42,0.7)_70%)] pointer-events-none" />

      {/* Drafting annotations pinned to the plate corners */}
      <p className="absolute top-24 left-6 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-faint pointer-events-none hidden sm:block">
        Fig. 00 — Interactive shader
      </p>
      <p className="absolute top-24 right-6 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-faint pointer-events-none hidden sm:block">
        Cape Town · 33.92°S 18.42°E
      </p>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 pb-28">
        <p className="font-mono text-xs text-amber mb-8 tracking-[0.35em] uppercase">
          Ntlakanipho Mgaguli
        </p>

        <h1 className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl text-paper mb-8 tracking-tight leading-[1.02]">
          I build interactive 3D<span className="text-amber">.</span>
          <br />
          <span className="text-draft">Then I teach how it works.</span>
        </h1>

        <p className="text-draft text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Computer Engineering student in Cape Town. WebGL instructor on
          Udemy, and founder of{" "}
          <a
            href="https://mgagulitutoring.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper underline decoration-amber/60 decoration-1 underline-offset-4 hover:text-amber transition-colors"
          >
            Mgaguli Tutoring
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
          <a
            href="#projects"
            className="px-8 py-3.5 bg-amber text-ink font-mono text-sm font-semibold tracking-wide uppercase hover:bg-paper transition-colors duration-300 w-full sm:w-auto"
          >
            View the work
          </a>
          <a
            href="mailto:ntlakaniphomgaguli210@gmail.com"
            className="px-4 py-3 font-mono text-sm text-draft hover:text-amber transition-colors duration-300 w-full sm:w-auto"
          >
            Email me &rarr;
          </a>
        </div>

        <div className="grid grid-cols-3 sm:inline-flex sm:items-stretch divide-x divide-line border border-line bg-ink/60 backdrop-blur-sm max-w-md mx-auto sm:max-w-none">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 sm:px-8 py-4 text-center">
              <p className="font-display font-semibold text-2xl text-paper">
                {stat.value}
              </p>
              <p className="font-mono text-[0.6rem] tracking-[0.15em] sm:tracking-[0.25em] uppercase text-faint mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="hidden [@media(pointer:fine)]:block font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint mt-10">
          Move your pointer to distort the scene
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-faint">
        <div className="w-5 h-8 border border-line flex justify-center pt-2">
          <div className="w-1 h-2 bg-amber animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

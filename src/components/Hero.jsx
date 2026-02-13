import React, { useEffect, useRef, useState } from "react";
import { WebGLRenderer } from "../webgl/renderer";

const Hero = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const [webglReady, setWebglReady] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

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
        reducedMotion: false,
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

    let animationFrameId;
    const renderLoop = (now) => {
      renderer.render(now);
      animationFrameId = window.requestAnimationFrame(renderLoop);
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

    animationFrameId = window.requestAnimationFrame(renderLoop);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      renderer.destroy();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setReducedMotion(reducedMotion);
    }
  }, [reducedMotion]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
      {webglReady ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-95"
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-surface to-dark" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-dark/45 via-transparent to-dark pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary font-mono text-xs sm:text-sm mb-5 tracking-wide uppercase">
          Interactive WebGL Scene
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          Ntlakanipho
          <span className="text-primary">.</span>
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl md:text-2xl mb-10 font-light">
          Computer Engineering Student{" "}
          <span aria-hidden="true" className="text-slate-500">
            &bull;
          </span>{" "}
          WebGL Instructor{" "}
          <span aria-hidden="true" className="text-slate-500">
            &bull;
          </span>{" "}
          Tutor
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-white text-dark font-semibold rounded-lg hover:bg-slate-100 transition-all duration-300 w-full sm:w-auto"
          >
            View Projects
          </a>
          <a
            href="/NTLAKS RESUME 2025.pdf"
            download
            className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download CV
          </a>
        </div>

        <p className="text-slate-500 font-mono text-xs mt-6">
          Move your pointer to distort the scene
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-slate-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

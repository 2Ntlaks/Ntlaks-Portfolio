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

      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.65)_70%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-primary font-mono text-[0.7rem] sm:text-xs mb-6 tracking-[0.3em] uppercase">
          Ntlakanipho Mgaguli
        </p>

        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight leading-[1.1]">
          I build interactive 3D
          <span className="text-primary">.</span>{" "}
          <span className="text-slate-400">And teach how it works.</span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Computer Engineering student in Cape Town. WebGL instructor on Udemy.
          Tutor in C, Java, and graphics fundamentals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-7 py-3 bg-primary text-dark font-semibold rounded-md hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-primary/20"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-4 py-3 text-slate-300 font-mono text-sm hover:text-primary transition-colors duration-300 w-full sm:w-auto"
          >
            Get in touch &rarr;
          </a>
        </div>

        <p className="hidden [@media(pointer:fine)]:block text-slate-600 font-mono text-xs mt-12">
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

import React, { useEffect, useRef } from "react";
import { WebGLRenderer } from "../webgl/renderer";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new WebGLRenderer(canvas);

    let animationFrameId;

    const renderLoop = (now) => {
      renderer.render(now);
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    animationFrameId = window.requestAnimationFrame(renderLoop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* WebGL Canvas - Full Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark pointer-events-none" />

      {/* Content - Centered */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Greeting */}
        <p className="text-primary font-mono text-sm sm:text-base mb-6 tracking-wide">
          &gt; Hello World
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          Ntlakanipho
          <span className="text-primary">.</span>
        </h1>

        {/* Role */}
        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl mb-12 font-light">
          Computer Engineering Student <span className="text-slate-600">•</span>{" "}
          WebGL Instructor <span className="text-slate-600">•</span> Tutor
        </p>

        {/* CTA Buttons */}
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
            className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
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
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-slate-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

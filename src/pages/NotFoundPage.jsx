import React, { useEffect } from "react";
import { applySeo } from "../utils/seo";

const NotFoundPage = () => {
  useEffect(() => {
    applySeo({
      title: "Page Not Found | Ntlaks.dev",
      description: "The page you requested could not be found on Ntlaks.dev.",
      path: window.location.pathname,
    });
  }, []);

  return (
    <section className="relative pt-40 pb-32 px-6 max-w-2xl mx-auto text-center">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-amber mb-6">
        Fig. 404 — Plate missing
      </p>
      <h1 className="font-display font-semibold text-5xl md:text-6xl text-paper mb-6">
        Page not found
      </h1>
      <p className="text-draft leading-relaxed mb-10">
        This drawing doesn&apos;t exist in the set, or it has been filed
        somewhere else.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-8 py-3.5 bg-amber text-ink font-mono text-sm font-semibold tracking-wide uppercase hover:bg-paper transition-colors"
      >
        Back to the board
      </a>
    </section>
  );
};

export default NotFoundPage;

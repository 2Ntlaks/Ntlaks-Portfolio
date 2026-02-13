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
    <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center">
      <p className="text-primary font-mono text-sm uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="text-4xl md:text-5xl text-white mb-4">Page Not Found</h1>
      <p className="text-slate-400 mb-8">
        The page you requested does not exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-dark font-semibold hover:bg-slate-100 transition-colors"
      >
        Go Home
      </a>
    </section>
  );
};

export default NotFoundPage;

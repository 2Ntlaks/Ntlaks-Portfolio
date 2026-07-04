import React from "react";

/**
 * Drafting-style section header: "FIG. NN" annotation, a ruled line
 * with a tick, an optional margin note, and the display title beneath.
 */
const SectionHeading = ({ fig, title, note }) => (
  <header className="mb-14">
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs font-medium tracking-[0.3em] uppercase text-amber whitespace-nowrap">
        Fig. {fig}
      </span>
      <span className="relative h-px flex-1 bg-line" aria-hidden="true">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-px bg-line" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-px bg-line" />
      </span>
      {note && (
        <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint whitespace-nowrap hidden sm:block">
          {note}
        </span>
      )}
    </div>
    <h2 className="font-display font-semibold text-4xl md:text-5xl text-paper mt-5">
      {title}
    </h2>
  </header>
);

export default SectionHeading;

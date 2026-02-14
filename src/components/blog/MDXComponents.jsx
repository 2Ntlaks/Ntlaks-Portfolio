import React from "react";

export const Callout = ({ type = "info", children }) => {
  const isWarning = type === "warning";

  return (
    <aside
      className={`my-6 rounded-xl border px-4 py-3 ${
        isWarning
          ? "border-amber-400/50 bg-amber-400/10 text-amber-100"
          : "border-primary/50 bg-primary/10 text-slate-100"
      }`}
      role="note"
    >
      {children}
    </aside>
  );
};

const isExternalLink = (href) => /^https?:\/\//i.test(href || "");

export const mdxComponents = {
  a: ({ href, children, ...props }) => {
    const external = isExternalLink(href);

    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-primary hover:text-white underline underline-offset-4"
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ alt = "", ...props }) => (
    <img
      alt={alt}
      className="my-6 w-full rounded-xl border border-white/10"
      loading="lazy"
      {...props}
    />
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="relative my-6 overflow-x-auto rounded-xl border border-white/10 bg-surface/80 p-4"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-primary"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  Callout,
};


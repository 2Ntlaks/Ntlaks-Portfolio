import React from "react";

const calloutStyles = {
  info: "border-primary/50 bg-primary/10 text-slate-100",
  tip: "border-emerald-400/50 bg-emerald-400/10 text-emerald-50",
  warning: "border-amber-400/50 bg-amber-400/10 text-amber-100",
  danger: "border-rose-400/50 bg-rose-400/10 text-rose-50",
};

const calloutLabels = {
  info: "Note",
  tip: "Tip",
  warning: "Warning",
  danger: "Heads up",
};

export const Callout = ({ type = "info", title, children }) => {
  const style = calloutStyles[type] || calloutStyles.info;
  const label = title || calloutLabels[type] || calloutLabels.info;

  return (
    <aside
      className={`my-6 rounded-xl border px-4 py-3 ${style}`}
      role="note"
    >
      <p className="font-mono text-xs uppercase tracking-widest opacity-80 mb-1">
        {label}
      </p>
      <div className="leading-relaxed">{children}</div>
    </aside>
  );
};

export const Figure = ({ src, alt = "", caption }) => (
  <figure className="my-8">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full rounded-xl border border-white/10"
    />
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
        {caption}
      </figcaption>
    )}
  </figure>
);

export const Video = ({ src, poster, caption }) => (
  <figure className="my-8">
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      className="w-full rounded-xl border border-white/10"
    />
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
        {caption}
      </figcaption>
    )}
  </figure>
);

export const YouTube = ({ id, title = "YouTube video" }) => (
  <div className="my-8 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="h-full w-full"
    />
  </div>
);

export const Kbd = ({ children }) => (
  <kbd className="inline-flex items-center rounded border border-white/20 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-slate-100 shadow-sm">
    {children}
  </kbd>
);

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
  Figure,
  Video,
  YouTube,
  Kbd,
};

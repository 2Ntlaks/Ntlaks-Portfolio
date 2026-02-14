import React from "react";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const BlogLayout = ({ frontmatter, children }) => {
  const title = typeof frontmatter?.title === "string" ? frontmatter.title : "";
  const excerpt =
    typeof frontmatter?.excerpt === "string" ? frontmatter.excerpt : "";
  const date = typeof frontmatter?.date === "string" ? frontmatter.date : "";
  const tags = Array.isArray(frontmatter?.tags) ? frontmatter.tags : [];

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto mb-10">
        <p className="text-primary font-mono text-sm uppercase tracking-widest mb-4">
          Blog Post
        </p>
        <h1 className="text-4xl md:text-5xl text-white mb-4">{title}</h1>
        {excerpt && <p className="text-slate-400 text-lg leading-relaxed">{excerpt}</p>}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-slate-500">
          {date && <span>{formatDate(date)}</span>}
        </div>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <article className="prose prose-invert prose-lg max-w-3xl mx-auto">
        {children}
      </article>
    </section>
  );
};

export default BlogLayout;


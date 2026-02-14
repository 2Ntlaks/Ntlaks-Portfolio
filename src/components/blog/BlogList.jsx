import React from "react";
import { Link } from "react-router-dom";

const postFrontmatters = import.meta.glob("../../content/blog/*.mdx", {
  eager: true,
  import: "frontmatter",
});

const getSlugFromPath = (path) => {
  const filename = path.split("/").pop() || "";
  return filename.replace(/\.mdx$/, "");
};

const normalizeFrontmatter = (frontmatter) => {
  const data = frontmatter || {};

  return {
    title: typeof data.title === "string" ? data.title : "Untitled Post",
    date: typeof data.date === "string" ? data.date : "1970-01-01",
    excerpt:
      typeof data.excerpt === "string" ? data.excerpt : "No excerpt provided.",
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
};

const posts = Object.entries(postFrontmatters)
  .map(([path, frontmatter]) => {
    const normalized = normalizeFrontmatter(frontmatter);
    return {
      slug: getSlugFromPath(path),
      ...normalized,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const BlogList = () => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="rounded-xl border border-white/10 bg-surface/50 p-6 md:p-8 hover:border-primary/30 transition-colors"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-3">
            <span>{formatDate(post.date)}</span>
          </div>
          <h2 className="text-2xl text-white mb-3">{post.title}</h2>
          <p className="text-slate-400 mb-5 leading-relaxed">{post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary font-mono text-sm hover:text-white transition-colors"
          >
            Read Post
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogList;

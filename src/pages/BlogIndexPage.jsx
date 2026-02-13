import React, { useEffect } from "react";
import { sortedBlogPosts } from "../content/blogPosts";
import { applySeo } from "../utils/seo";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const BlogIndexPage = () => {
  useEffect(() => {
    applySeo({
      title: "Blog | Ntlaks.dev",
      description:
        "Engineering and programming notes by Ntlakanipho Mgaguli, covering WebGL, software development, and tutoring insights.",
      path: "/blog",
    });
  }, []);

  return (
    <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <header className="mb-12">
        <p className="text-primary font-mono text-sm uppercase tracking-widest mb-4">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl text-white mb-4">
          Notes on Building, Teaching, and Learning
        </h1>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          These posts stay inside Ntlaks.dev so readers can learn without
          leaving the platform.
        </p>
      </header>

      <div className="space-y-6">
        {sortedBlogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-white/10 bg-surface/50 p-6 md:p-8 hover:border-primary/30 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-3">
              <span>{formatDate(post.publishedAt)}</span>
              <span>|</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-2xl text-white mb-3">{post.title}</h2>
            <p className="text-slate-400 mb-5 leading-relaxed">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-primary font-mono text-sm hover:text-white transition-colors"
            >
              Read Post
              <span aria-hidden="true">-&gt;</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogIndexPage;

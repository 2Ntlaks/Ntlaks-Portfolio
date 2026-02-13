import React, { useEffect } from "react";
import { getBlogPostBySlug } from "../content/blogPosts";
import { applySeo } from "../utils/seo";
import NotFoundPage from "./NotFoundPage";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const BlogPostPage = ({ slug }) => {
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (!post) {
      applySeo({
        title: "Post Not Found | Ntlaks.dev",
        description: "The blog post you requested could not be found.",
        path: `/blog/${slug}`,
      });
      return;
    }

    applySeo({
      title: `${post.title} | Ntlaks.dev`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
    });
  }, [post, slug]);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <a
        href="/blog"
        className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-8 hover:text-white transition-colors"
      >
        <span aria-hidden="true">&lt;-</span>
        Back to Blog
      </a>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-4">
          <span>{formatDate(post.publishedAt)}</span>
          <span>|</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl text-white mb-4">{post.title}</h1>
        <p className="text-slate-400 text-lg leading-relaxed">{post.excerpt}</p>
      </header>

      <div className="space-y-10">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl text-white mb-4">{section.heading}</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-4 space-y-2 text-slate-300">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
};

export default BlogPostPage;

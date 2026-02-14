import React, { useEffect, useMemo, useRef, useState } from "react";
import { getBlogPostBySlug } from "../content/blogPosts";
import { applySeo } from "../utils/seo";
import NotFoundPage from "./NotFoundPage";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const createSectionId = (heading, index) => {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${slug || "section"}-${index + 1}`;
};

const BlogPostPage = ({ slug }) => {
  const post = getBlogPostBySlug(slug);
  const articleRef = useRef(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionsWithIds = useMemo(() => {
    if (!post) {
      return [];
    }

    return post.sections.map((section, index) => ({
      ...section,
      id: createSectionId(section.heading, index),
    }));
  }, [post]);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => setReducedMotion(mediaQuery.matches);

    applyPreference();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", applyPreference);
    } else {
      mediaQuery.addListener(applyPreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", applyPreference);
      } else {
        mediaQuery.removeListener(applyPreference);
      }
    };
  }, []);

  useEffect(() => {
    if (!post) {
      return undefined;
    }

    const article = articleRef.current;
    if (!article) {
      return undefined;
    }

    let animationFrameId = null;

    const updateProgress = () => {
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const maxScroll = articleHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setReadingProgress(window.scrollY >= articleTop ? 100 : 0);
        return;
      }

      const rawProgress = ((window.scrollY - articleTop) / maxScroll) * 100;
      const clamped = Math.min(Math.max(rawProgress, 0), 100);
      setReadingProgress(clamped);
    };

    const scheduleUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        updateProgress();
        animationFrameId = null;
      });
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [post]);

  useEffect(() => {
    if (!post || sectionsWithIds.length === 0) {
      return undefined;
    }

    const headings = sectionsWithIds
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (headings.length === 0) {
      return undefined;
    }

    setActiveSectionId(sectionsWithIds[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 1],
      }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [post, sectionsWithIds]);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <>
      {!reducedMotion && (
        <div className="fixed top-20 left-0 w-full h-1 z-40 bg-white/5">
          <div
            className="h-full bg-primary transition-[width] duration-100"
            style={{ width: `${readingProgress}%` }}
            aria-hidden="true"
          />
        </div>
      )}

      <article ref={articleRef} className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-8 hover:text-white transition-colors"
        >
          <span aria-hidden="true">&lt;-</span>
          Back to Blog
        </a>

        <header className="mb-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-4">
            <span>{formatDate(post.publishedAt)}</span>
            <span>|</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-white mb-4">{post.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed">{post.excerpt}</p>
        </header>

        <details className="lg:hidden rounded-xl border border-white/10 bg-surface/50 p-4 mb-8">
          <summary className="text-sm font-mono text-primary cursor-pointer">
            Table of Contents
          </summary>
          <nav aria-label="Table of contents" className="mt-4">
            <ul className="space-y-2">
              {sectionsWithIds.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-slate-300 hover:text-primary transition-colors"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>

        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-xl border border-white/10 bg-surface/50 p-4">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                On this page
              </p>
              <nav aria-label="Table of contents">
                <ul className="space-y-2">
                  {sectionsWithIds.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`text-sm transition-colors ${
                          activeSectionId === section.id
                            ? "text-primary"
                            : "text-slate-400 hover:text-white"
                        }`}
                        aria-current={activeSectionId === section.id ? "location" : undefined}
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="space-y-10 min-w-0">
            {sectionsWithIds.map((section) => (
              <section key={section.id} id={section.id}>
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
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;

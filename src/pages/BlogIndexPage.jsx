import React, { useEffect, useMemo, useState } from "react";
import { sortedBlogPosts } from "../content/blogPosts";
import { applySeo } from "../utils/seo";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const readFiltersFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get("q") || "",
    tag: params.get("tag") || "",
  };
};

const BlogIndexPage = () => {
  const initialFilters = readFiltersFromUrl();
  const [query, setQuery] = useState(initialFilters.query);
  const [activeTag, setActiveTag] = useState(initialFilters.tag);

  useEffect(() => {
    applySeo({
      title: "Blog | Ntlaks.dev",
      description:
        "Engineering and programming notes by Ntlakanipho Mgaguli, covering WebGL, software development, and tutoring insights.",
      path: "/blog",
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const filters = readFiltersFromUrl();
      setQuery(filters.query);
      setActiveTag(filters.tag);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    if (activeTag) {
      params.set("tag", activeTag);
    } else {
      params.delete("tag");
    }

    const nextSearch = params.toString();
    const nextUrl = nextSearch ? `/blog?${nextSearch}` : "/blog";
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [query, activeTag]);

  const tags = useMemo(() => {
    const allTags = sortedBlogPosts.flatMap((post) => post.tags);
    return Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return sortedBlogPosts.filter((post) => {
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      if (!matchesTag) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = [post.title, post.excerpt, ...post.tags]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [activeTag, query]);

  const clearFilters = () => {
    setQuery("");
    setActiveTag("");
  };

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

      <div className="mb-10 rounded-xl border border-white/10 bg-surface/50 p-5 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <label className="flex-1">
            <span className="sr-only">Search posts</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, topic, or tag..."
              className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            />
          </label>
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-3 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-primary/40 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag("")}
            aria-pressed={activeTag === ""}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              activeTag === ""
                ? "bg-primary/15 border-primary/60 text-primary"
                : "bg-white/5 border-white/10 text-slate-300 hover:border-primary/30"
            }`}
          >
            All Topics
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                activeTag === tag
                  ? "bg-primary/15 border-primary/60 text-primary"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-primary/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="text-slate-500 text-sm mt-4">
          {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
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
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-primary/30 transition-colors"
                >
                  {tag}
                </button>
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

        {filteredPosts.length === 0 && (
          <div
            className="rounded-xl border border-white/10 bg-surface/40 p-8 text-center"
            role="status"
          >
            <p className="text-white text-lg mb-2">No posts match these filters.</p>
            <p className="text-slate-400 mb-5">
              Try a different keyword or switch to another topic.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-primary/40 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogIndexPage;

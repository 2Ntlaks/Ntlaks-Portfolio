import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import BlogLayout from "./BlogLayout";
import { mdxComponents } from "./MDXComponents";
import { applySeo } from "../../utils/seo";

const postImporters = import.meta.glob("../../content/blog/*.mdx");

const getSlugFromPath = (path) => {
  const filename = path.split("/").pop() || "";
  return filename.replace(/\.mdx$/, "");
};

const postsBySlug = Object.entries(postImporters).reduce((acc, [path, load]) => {
  const slug = getSlugFromPath(path);
  acc[slug] = { load };

  return acc;
}, {});

const BlogPost = ({ slug }) => {
  const postEntry = useMemo(() => postsBySlug[slug], [slug]);
  const [status, setStatus] = useState("loading");
  const [PostComponent, setPostComponent] = useState(null);
  const [frontmatter, setFrontmatter] = useState({});

  useEffect(() => {
    let cancelled = false;

    if (!postEntry) {
      setStatus("not-found");
      setPostComponent(null);
      setFrontmatter({});
      return () => {
        cancelled = true;
      };
    }

    setStatus("loading");
    setPostComponent(null);
    setFrontmatter({});

    postEntry
      .load()
      .then((module) => {
        if (cancelled) {
          return;
        }

        setPostComponent(() => module.default);
        setFrontmatter(module.frontmatter || {});
        setStatus("ready");
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Failed to load blog post:", error);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [postEntry]);

  useEffect(() => {
    if (status === "ready") {
      const title =
        typeof frontmatter.title === "string" ? frontmatter.title : "Blog Post";
      const description =
        typeof frontmatter.excerpt === "string"
          ? frontmatter.excerpt
          : "Technical article on Ntlaks.dev";

      applySeo({
        title: `${title} | Ntlaks.dev`,
        description,
        path: `/blog/${slug}`,
      });
      return;
    }

    if (status === "not-found" || status === "error") {
      applySeo({
        title: "Post Not Found | Ntlaks.dev",
        description: "The requested blog post could not be found.",
        path: `/blog/${slug}`,
      });
    }
  }, [frontmatter, slug, status]);

  if (status === "loading") {
    return (
      <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <p className="text-slate-400">Loading post...</p>
      </section>
    );
  }

  if (status !== "ready" || !PostComponent) {
    return (
      <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <p className="text-primary font-mono text-sm uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="text-4xl text-white mb-4">Post not found</h1>
        <p className="text-slate-400 mb-8">
          The post you requested does not exist or has not been published yet.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-dark font-semibold hover:bg-slate-100 transition-colors"
        >
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <MDXProvider components={mdxComponents}>
      <BlogLayout frontmatter={frontmatter}>
        <PostComponent />
      </BlogLayout>
    </MDXProvider>
  );
};

export default BlogPost;

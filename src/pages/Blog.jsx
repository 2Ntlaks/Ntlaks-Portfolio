import React, { useEffect } from "react";
import BlogList from "../components/blog/BlogList";
import { applySeo } from "../utils/seo";

const Blog = () => {
  useEffect(() => {
    applySeo({
      title: "Blog | Ntlaks.dev",
      description:
        "MDX-powered engineering and programming notes by Ntlakanipho Mgaguli.",
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
          Technical writing published directly on Ntlaks.dev with MDX.
        </p>
      </header>
      <BlogList />
    </section>
  );
};

export default Blog;


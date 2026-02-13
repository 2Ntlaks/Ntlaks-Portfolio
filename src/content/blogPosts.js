export const blogPosts = [
  {
    slug: "how-i-teach-webgl-to-beginners",
    title: "How I Teach WebGL to Beginners Without Overwhelming Them",
    excerpt:
      "A practical teaching framework I use to help students move from zero to building interactive 3D scenes.",
    publishedAt: "2026-02-12",
    readTime: "6 min read",
    tags: ["WebGL", "Teaching", "JavaScript"],
    sections: [
      {
        heading: "Start with visible wins in the first lesson",
        paragraphs: [
          "Most beginners lose momentum when they spend too long on theory before seeing anything on screen.",
          "I start with a tiny project where students render one shape and control it. Once they can move or color something, confidence goes up immediately.",
        ],
      },
      {
        heading: "Teach the pipeline in small layers",
        paragraphs: [
          "Instead of explaining the entire graphics pipeline at once, I split it into chunks: vertices, shaders, uniforms, then camera and lighting.",
          "Each lesson introduces one concept and one applied exercise so students connect ideas to code right away.",
        ],
      },
      {
        heading: "Use debugging habits early",
        paragraphs: [
          "WebGL errors can be frustrating for beginners, so I teach a repeatable debugging flow from day one.",
        ],
        bullets: [
          "Validate shader compile and link logs first.",
          "Confirm attribute and uniform names match exactly.",
          "Test with known-good geometry before optimizing.",
        ],
      },
      {
        heading: "Build projects, not just demos",
        paragraphs: [
          "Students retain concepts when they build complete mini-projects with interaction, not isolated snippets.",
          "I keep a project-first structure across my lessons because it produces better long-term understanding and confidence.",
        ],
      },
    ],
  },
  {
    slug: "engineering-student-to-educator-lessons",
    title: "From Engineering Student to Educator: Lessons That Changed My Approach",
    excerpt:
      "What I learned while teaching programming and engineering concepts to real students one-on-one.",
    publishedAt: "2026-02-10",
    readTime: "5 min read",
    tags: ["Education", "Engineering", "Mentorship"],
    sections: [
      {
        heading: "Clarity beats complexity",
        paragraphs: [
          "At the start, I tried to prove depth by adding too much detail. That usually confused students.",
          "Now I focus on clear explanations, then add depth only after a student has a stable base.",
        ],
      },
      {
        heading: "Assess understanding continuously",
        paragraphs: [
          "I do quick comprehension checks during lessons instead of waiting for the end.",
          "Small checkpoints help me adapt pace and examples before confusion compounds.",
        ],
      },
      {
        heading: "Context makes concepts stick",
        paragraphs: [
          "Students understand faster when concepts are tied to practical engineering scenarios.",
        ],
        bullets: [
          "Link C programming to embedded-style constraints.",
          "Use Java examples that mirror real systems structure.",
          "Tie math and physics topics to circuit and software behavior.",
        ],
      },
      {
        heading: "Teaching sharpened my own engineering",
        paragraphs: [
          "Explaining fundamentals repeatedly forced me to remove gaps in my own understanding.",
          "Teaching is now part of how I learn and how I build stronger technical systems.",
        ],
      },
    ],
  },
];

export const sortedBlogPosts = [...blogPosts].sort((a, b) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
});

export const getBlogPostBySlug = (slug) =>
  sortedBlogPosts.find((post) => post.slug === slug);

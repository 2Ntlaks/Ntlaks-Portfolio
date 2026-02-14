const postFrontmatters = import.meta.glob("../../content/blog/*.mdx", {
  eager: true,
  import: "frontmatter",
});

const postRawContents = import.meta.glob("../../content/blog/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
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
    draft: Boolean(data.draft),
  };
};

const estimateReadingTime = (rawContent) => {
  if (typeof rawContent !== "string" || rawContent.trim().length === 0) {
    return "1 min read";
  }

  const withoutFrontmatter = rawContent.replace(/^---[\s\S]*?---/, " ");
  const withoutCodeFences = withoutFrontmatter.replace(/```[\s\S]*?```/g, " ");
  const withoutInlineCode = withoutCodeFences.replace(/`[^`]*`/g, " ");
  const withoutTags = withoutInlineCode.replace(/<[^>]*>/g, " ");
  const plainText = withoutTags
    .replace(/[#>*_\-\[\]\(\)!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText.length > 0 ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};

const allPosts = Object.keys(postFrontmatters)
  .map((path) => {
    const frontmatter = normalizeFrontmatter(postFrontmatters[path]);
    const raw = postRawContents[path];

    return {
      slug: getSlugFromPath(path),
      path,
      ...frontmatter,
      readingTime: estimateReadingTime(raw),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const postsBySlug = allPosts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {});

export const publishedPosts = allPosts.filter((post) => !post.draft);

export const getPostMetaBySlug = (slug) => postsBySlug[slug];

export const getRelatedPosts = (slug, maxItems = 3) => {
  const current = postsBySlug[slug];
  if (!current || current.draft) {
    return [];
  }

  const currentTags = new Set(current.tags);
  const currentTimestamp = new Date(current.date).getTime();

  return publishedPosts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentTags.has(tag)).length;
      const timestamp = new Date(post.date).getTime();
      const recencyScore = Math.max(
        0,
        365 - Math.abs(currentTimestamp - timestamp) / (1000 * 60 * 60 * 24)
      );

      return {
        ...post,
        _score: sharedTags * 100 + recencyScore,
      };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, maxItems)
    .map(({ _score, ...post }) => post);
};


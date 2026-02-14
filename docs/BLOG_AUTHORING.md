# Blog Authoring Guide

This project uses MDX for blog posts.

## Where to write posts
Create files in:

`src/content/blog/`

Each file becomes a route:
- `src/content/blog/hello-world.mdx` -> `/blog/hello-world`
- `src/content/blog/webgl-tips.mdx` -> `/blog/webgl-tips`

## Required frontmatter
Each post must include:

```mdx
---
title: "Post Title"
date: "2026-02-14"
excerpt: "One sentence summary used on the blog list."
tags:
  - WebGL
  - React
draft: false
---
```

Rules:
- `title`: required string
- `date`: required string in `YYYY-MM-DD`
- `excerpt`: required string
- `tags`: optional string array
- `draft`: optional boolean (`true` hides post from listing and direct route)
- Reading time is calculated automatically from MDX content.

## Post template
````mdx
---
title: "My New Post"
date: "2026-02-14"
excerpt: "Short summary for /blog."
tags:
  - JavaScript
  - Teaching
draft: false
---

# My New Post

Write your content in Markdown.

<Callout type="info">
  Important note for readers.
</Callout>

```js
console.log("code blocks are syntax highlighted");
```
````

## Available MDX components
Provided in `src/components/blog/MDXComponents.jsx`:
- `Callout` with `type="info"` or `type="warning"`
- Styled links (`a`)
- Styled images (`img`)
- Styled code and pre blocks

## Images
Place images in `public/` and reference with absolute paths:

```mdx
![Hero render](/images/blog/webgl-hero.png)
```

## Publishing flow
1. Add or edit an `.mdx` file in `src/content/blog/`.
2. Run `npm run dev` and check:
   - `/blog`
   - `/blog/<your-slug>`
3. Commit and push to `main`.
4. Netlify deploys automatically.

## Troubleshooting
- Post not showing on `/blog`:
  - Check frontmatter keys (`title`, `date`, `excerpt`).
  - Check filename ends with `.mdx`.
- 404 on post route:
  - Ensure URL slug exactly matches filename.
- Build issues:
  - Run `npm install` again.
  - Run `npm run build` to verify before push.

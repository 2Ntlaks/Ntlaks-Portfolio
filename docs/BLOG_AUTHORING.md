# Blog Authoring Guide

This project uses MDX for blog posts. You can mix Markdown with React
components in a single file.

## Where to write posts

Create files in:

`src/content/blog/`

Each file becomes a route:
- `src/content/blog/hello-world.mdx` -> `/blog/hello-world`
- `src/content/blog/webgl-tips.mdx` -> `/blog/webgl-tips`

## Frontmatter

Each post must start with a YAML frontmatter block:

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
- `draft`: optional boolean. `true` hides the post from the listing and
  from the direct route. Use this for work-in-progress posts.
- Reading time is calculated automatically from the MDX body.

## What you can write

### Text

Plain Markdown works: **bold**, *italic*, ~~strikethrough~~, `inline code`,
[links](https://ntlaks.dev), > blockquotes, headings from `#` to `######`,
unordered and ordered lists, and tables.

External links automatically open in a new tab with `rel="noopener"`.

### Code blocks

Fenced code blocks are syntax highlighted via Shiki (github-dark theme).
Specify the language after the backticks:

````md
```js
function sumOfSquares(n) {
  let total = 0;
  for (let i = 1; i <= n; i += 1) {
    total += i * i;
  }
  return total;
}
```
````

Languages available include `js`, `ts`, `jsx`, `tsx`, `glsl`, `c`, `java`,
`python`, `sql`, `html`, `css`, `bash`, and many more.

### Images

Put image files in `public/images/blog/` and reference them with an absolute
path:

```md
![Alt text](/images/blog/example.png)
```

For images with a caption, use the `Figure` component:

```mdx
<Figure
  src="/images/blog/diagram.png"
  alt="Description of the image for screen readers"
  caption="Figure 1. Short caption shown below the image."
/>
```

### Video

Self-hosted short demos (place file in `public/videos/`):

```mdx
<Video
  src="/videos/demo.mp4"
  poster="/images/blog/demo-poster.jpg"
  caption="Optional caption below the video."
/>
```

YouTube embed (grab the ID from the URL, e.g. the part after `v=`):

```mdx
<YouTube id="dQw4w9WgXcQ" title="Optional accessible title" />
```

### Callouts

Four types exist: `info` (default), `tip`, `warning`, `danger`.

```mdx
<Callout type="tip">
  Helpful advice or a shortcut the reader might miss.
</Callout>

<Callout type="warning" title="Custom label">
  Override the heading label with the `title` prop.
</Callout>
```

### Keyboard keys

Use `<Kbd>` for key presses: `<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>` renders a
styled keycap inline.

## Available MDX components

Exported from `src/components/blog/MDXComponents.jsx`:

| Component  | Purpose                                      |
| ---------- | -------------------------------------------- |
| `Callout`  | Styled note with `info / tip / warning / danger` variants |
| `Figure`   | Image with optional caption                  |
| `Video`    | Self-hosted `<video>` with controls          |
| `YouTube`  | Responsive YouTube iframe embed              |
| `Kbd`      | Styled keyboard key inline                   |

Standard HTML elements (`a`, `img`, `pre`, `code`) are also styled
automatically.

## Live reference

See `src/content/blog/cheatsheet.mdx` for a working example of every
feature. It's marked `draft: true`, so it won't show on the public listing,
but you can flip it to `false` temporarily to see it rendered.

## Publishing flow

1. Create or edit a `.mdx` file in `src/content/blog/`.
2. Run `npm run dev`.
3. Check `/blog` for the listing and `/blog/<your-slug>` for the post.
4. Commit and push to `main`. Netlify deploys automatically.

## Troubleshooting

- **Post missing from `/blog`**: check that `draft` is `false` (or
  removed), frontmatter keys are spelled correctly, and the filename ends
  in `.mdx`.
- **404 on the post route**: the URL slug must match the filename exactly
  (without `.mdx`).
- **Build issues**: run `npm install`, then `npm run build` to repro.

const upsertMetaByName = (name, content) => {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const upsertMetaByProperty = (property, content) => {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const upsertCanonical = (href) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

export const applySeo = ({ title, description, path }) => {
  const canonicalUrl = `https://ntlaks.dev${path}`;

  document.title = title;
  upsertMetaByName("description", description);
  upsertMetaByName("title", title);
  upsertMetaByProperty("og:title", title);
  upsertMetaByProperty("og:description", description);
  upsertMetaByProperty("og:url", canonicalUrl);
  upsertMetaByProperty("twitter:title", title);
  upsertMetaByProperty("twitter:description", description);
  upsertMetaByProperty("twitter:url", canonicalUrl);
  upsertCanonical(canonicalUrl);
};

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";

const normalizePath = (path) => {
  if (path !== "/" && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
};

function App() {
  const pathname = normalizePath(window.location.pathname);
  const blogPrefix = "/blog/";

  let page = <NotFoundPage />;

  if (pathname === "/") {
    page = <HomePage />;
  } else if (pathname === "/blog") {
    page = <BlogIndexPage />;
  } else if (pathname.startsWith(blogPrefix)) {
    const slug = decodeURIComponent(pathname.slice(blogPrefix.length));
    page = <BlogPostPage slug={slug} />;
  }

  return (
    <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-dark">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {page}
      </main>
      <Footer />
    </div>
  );
}

export default App;

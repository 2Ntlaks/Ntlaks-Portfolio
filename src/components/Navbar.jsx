import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "About", sectionId: "about" },
    { label: "Skills", sectionId: "skills" },
    { label: "Projects", sectionId: "projects" },
    { label: "Contact", sectionId: "contact" },
  ];

  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHomePath = currentPath === "/";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const menu = menuRef.current;
    const focusableElements = menu?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusableElements || focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSectionLinkClick = (sectionId, event) => {
    handleLinkClick();
    if (!isHomePath) {
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    section.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `/#${sectionId}`);
  };

  const menuLinkBaseClass =
    "text-sm font-mono text-slate-400 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded";

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="/"
          className="text-2xl font-mono font-bold text-white tracking-tighter focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded"
        >
          NTLAKS<span className="text-primary">.DEV</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`/#${link.sectionId}`}
              onClick={(event) => handleSectionLinkClick(link.sectionId, event)}
              className={menuLinkBaseClass}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/blog"
            className={menuLinkBaseClass}
          >
            Blog
          </a>
          <a
            href="https://www.udemy.com/user/ntlakanipho-mgaguli/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm font-mono text-white hover:bg-primary/10 hover:border-primary/50 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            My Course
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={handleLinkClick}
        aria-label="Close menu"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        className={`md:hidden fixed inset-0 top-20 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!isOpen}
        className={`md:hidden fixed top-20 left-0 w-full bg-dark/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`/#${link.sectionId}`}
              onClick={(event) => handleSectionLinkClick(link.sectionId, event)}
              className="text-lg font-mono text-slate-300 hover:text-primary transition-colors py-2 border-b border-white/5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/blog"
            onClick={handleLinkClick}
            className="text-lg font-mono text-slate-300 hover:text-primary transition-colors py-2 border-b border-white/5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Blog
          </a>
          <a
            href="https://www.udemy.com/user/ntlakanipho-mgaguli/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="mt-2 px-4 py-3 bg-primary/10 border border-primary/50 rounded text-center font-mono text-primary hover:bg-primary/20 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            My Course
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

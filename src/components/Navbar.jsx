import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "About", sectionId: "about" },
    { label: "Skills", sectionId: "skills" },
    { label: "Projects", sectionId: "projects" },
    { label: "Contact", sectionId: "contact" },
  ];

  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
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
    "font-mono text-xs tracking-[0.18em] uppercase text-draft hover:text-amber transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2";

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 w-full z-50 bg-ink/85 backdrop-blur-md border-b border-line"
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="/"
          className="font-display font-bold text-2xl text-paper tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
        >
          ntlaks<span className="text-amber">.dev</span>
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
          {/* Served by the Netlify /writing proxy, not this SPA: must stay a
              plain full-page link, never a router Link. */}
          <a href="/writing" className={menuLinkBaseClass}>
            Blogs
          </a>
          <a
            href="https://www.udemy.com/user/ntlakanipho-mgaguli/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-amber/60 text-amber font-mono text-xs tracking-[0.18em] uppercase hover:bg-amber hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
          >
            My Course
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-0.5 bg-paper transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-paper transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-paper transition-all duration-300 ${
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
        className={`md:hidden fixed inset-0 top-20 bg-ink/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!isOpen}
        className={`md:hidden fixed top-20 left-0 w-full bg-ink/95 backdrop-blur-md border-b border-line transition-all duration-300 ${
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
              className="font-mono text-sm tracking-[0.18em] uppercase text-draft hover:text-amber transition-colors py-2 border-b border-line/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/writing"
            onClick={handleLinkClick}
            className="font-mono text-sm tracking-[0.18em] uppercase text-draft hover:text-amber transition-colors py-2 border-b border-line/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
          >
            Blogs
          </a>
          <a
            href="https://www.udemy.com/user/ntlakanipho-mgaguli/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="mt-2 px-4 py-3 border border-amber/60 text-center font-mono text-sm tracking-[0.18em] uppercase text-amber hover:bg-amber hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2"
          >
            My Course
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

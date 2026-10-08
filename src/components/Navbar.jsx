import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { EMAIL, LINKS, SECTIONS } from "../constants/site";

const Navbar = () => {
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
      if (window.innerWidth >= 900) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Focus trap + Escape while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const focusable = menuRef.current?.querySelectorAll('a[href], button:not([disabled])');
    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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

  const handleSectionLinkClick = (sectionId, event) => {
    setIsOpen(false);
    if (!isHomePath) return;
    const section = document.getElementById(sectionId);
    if (!section) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${sectionId}`);
  };

  const sectionLinks = SECTIONS.map((s) => (
    <a key={s.id} href={`/#${s.id}`} onClick={(e) => handleSectionLinkClick(s.id, e)} className="nav-link">
      {s.label}
    </a>
  ));

  return (
    <nav aria-label="Primary" className="nav">
      <div className="wrap nav-inner">
        <a href="/" className="nav-logo">
          <span className="led-dot" aria-hidden="true" />
          <span>
            ntlaks<em>.dev</em>
          </span>
        </a>

        <div className="nav-links">
          {sectionLinks}
          {/* Served by the Netlify /writing proxy, not this SPA: must stay a
              plain full-page link, never a router Link. */}
          <a href={LINKS.writing} className="nav-link">
            Blogs
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-solid nav-cta">
            Email me
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="nav-burger"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        className={`nav-scrim${isOpen ? "" : " is-closed"}`}
      />

      <div id="mobile-menu" ref={menuRef} aria-hidden={!isOpen} className={`nav-menu${isOpen ? "" : " is-closed"}`}>
        <div className="wrap nav-menu-list">
          {sectionLinks}
          <a href={LINKS.writing} onClick={() => setIsOpen(false)} className="nav-link">
            Blogs
          </a>
          <a href={`mailto:${EMAIL}`} onClick={() => setIsOpen(false)} className="btn btn-solid">
            Email me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

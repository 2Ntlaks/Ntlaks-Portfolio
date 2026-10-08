import React from "react";
import { LINKS } from "../constants/site";

const footerLinks = [
  { label: "Mgaguli Tutoring", href: LINKS.tutoring, external: true },
  { label: "Udemy", href: LINKS.udemy, external: true },
  { label: "GitHub", href: LINKS.github, external: true },
  { label: "LinkedIn", href: LINKS.linkedin, external: true },
  /* /writing is served by a Netlify proxy — keep as a plain link. */
  { label: "Blogs", href: LINKS.writing, external: false },
  /* Same-origin PDF, but open in a new tab so visitors keep the site. */
  { label: "CV", href: LINKS.cv, external: true },
];

const Footer = () => (
  <footer className="foot">
    <div className="wrap">
      <div className="foot-grid">
        <div>
          <p className="foot-name">Ntlakanipho Mgaguli</p>
          <p className="mono" style={{ margin: "8px 0 0" }}>
            Computer Engineering · WebGL instructor · Tutor
          </p>
        </div>
        <nav aria-label="Footer" className="foot-links mono">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="foot-base mono">
        <span>&copy; {new Date().getFullYear()} ntlaks.dev</span>
        <span>Designed &amp; wired in Cape Town</span>
      </div>
    </div>
  </footer>
);

export default Footer;

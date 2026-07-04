import React from "react";

const footerLinks = [
  {
    label: "Mgaguli Tutoring",
    href: "https://mgagulitutoring.dev",
    external: true,
  },
  {
    label: "Udemy",
    href: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
    external: true,
  },
  { label: "GitHub", href: "https://github.com/2Ntlaks", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ntlakanipho-mgaguli-36a1ab319/",
    external: true,
  },
  /* /writing is served by a Netlify proxy — keep as a plain link. */
  { label: "Blogs", href: "/writing", external: false },
  { label: "CV", href: "/ntlaks-resume-2025.pdf", external: false },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-line bg-panel/40">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="font-display font-semibold text-lg text-paper">
              Ntlakanipho Mgaguli
            </p>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint mt-2">
              Computer Engineering · WebGL Instructor
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-xs uppercase tracking-wider text-draft hover:text-amber transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint">
            &copy; {new Date().getFullYear()} ntlaks.dev
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["About", "Skills", "Projects", "Contact"];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-mono font-bold text-white tracking-tighter"
        >
          NTLAKS<span className="text-primary">.DEV</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="text-sm font-mono text-slate-400 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="/blog"
            className="text-sm font-mono text-slate-400 hover:text-primary transition-colors"
          >
            Blog
          </a>
          <a
            href="https://www.udemy.com/user/ntlakanipho-mgaguli/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm font-mono text-white hover:bg-primary/10 hover:border-primary/50 transition-all"
          >
            My Course
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
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

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-dark/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              onClick={handleLinkClick}
              className="text-lg font-mono text-slate-300 hover:text-primary transition-colors py-2 border-b border-white/5"
            >
              {item}
            </a>
          ))}
          <a
            href="/blog"
            onClick={handleLinkClick}
            className="text-lg font-mono text-slate-300 hover:text-primary transition-colors py-2 border-b border-white/5"
          >
            Blog
          </a>
          <a
            href="https://www.udemy.com/user/ntlakanipho-mgaguli/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="mt-2 px-4 py-3 bg-primary/10 border border-primary/50 rounded text-center font-mono text-primary hover:bg-primary/20 transition-all"
          >
            My Course
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

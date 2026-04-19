import React from "react";

const Footer = () => {
  return (
    <footer className="bg-surface py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-mono font-bold text-white">
            Ntlakanipho Mgaguli
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Computer Engineering Student & WebGL Instructor
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href="https://www.udemy.com/user/ntlakanipho-mgaguli/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Udemy
          </a>
          <a
            href="https://github.com/2Ntlaks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ntlakanipho-mgaguli-36a1ab319/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ntlakaniphomgaguli210@gmail.com"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href="/ntlaks-resume-2025.pdf"
            download
            className="text-slate-400 hover:text-white transition-colors"
          >
            CV
          </a>
        </div>

        <div className="text-slate-600 text-xs font-mono">
          &copy; {new Date().getFullYear()} Ntlaks.dev
        </div>
      </div>
    </footer>
  );
};

export default Footer;

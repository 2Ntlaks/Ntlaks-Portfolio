import React, { useState } from "react";
import SectionHeading from "./SectionHeading";

const EMAIL = "ntlakaniphomgaguli210@gmail.com";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/2Ntlaks",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ntlakanipho-mgaguli-36a1ab319/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Udemy",
    url: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ntlakaniphomgaguli",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.5 7.2a3 3 0 00-2.1-2.1C19.5 4.6 12 4.6 12 4.6s-7.5 0-9.4.5A3 3 0 00.5 7.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 4.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-4.8zM9.6 15.3V8.7l5.8 3.3-5.8 3.3z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@ntlakanipho_mgaguli",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.2 3c.3 1.9 1.8 3.4 3.8 3.7v2.2c-1.3 0-2.6-.4-3.7-1.1V14c0 3.4-2.8 6.2-6.2 6.2S3 17.4 3 14s2.8-6.2 6.2-6.2c.3 0 .6 0 .9.1V10c-.3-.1-.6-.1-.9-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V3h2z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading fig="04" title="Contact" note="One channel, no forms" />

        <p className="text-draft text-lg leading-relaxed max-w-2xl mb-14">
          Hiring, learning, or collaborating on educational content? Skip the
          forms — just write to me. Whether it&apos;s an internship, a
          tutoring request, or a course idea, email reaches me directly and I
          reply personally.
        </p>

        <div className="corners border border-line bg-panel p-8 md:p-12 mb-14 text-center">
          <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-faint mb-6">
            Direct line
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-paper hover:text-amber transition-colors break-all"
          >
            {EMAIL}
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href={`mailto:${EMAIL}?subject=Hello%20Ntlaks`}
              className="px-8 py-3.5 bg-amber text-ink font-mono text-sm font-semibold tracking-wide uppercase hover:bg-paper transition-colors duration-300 w-full sm:w-auto"
            >
              Write to me
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-8 py-3.5 border border-line text-draft font-mono text-sm tracking-wide uppercase hover:border-amber/60 hover:text-amber transition-colors duration-300 w-full sm:w-auto"
            >
              {copied ? "Copied ✓" : "Copy address"}
            </button>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-line" />
          <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-faint">
            or find me on
          </span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-line text-draft hover:text-amber hover:border-amber/50 transition-colors duration-300"
            >
              {social.icon}
              <span className="font-mono text-xs uppercase tracking-wider">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-faint flex items-center justify-center gap-2 tracking-wider">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Cape Town, South Africa · 33.92°S 18.42°E
        </p>
      </div>
    </section>
  );
};

export default Contact;

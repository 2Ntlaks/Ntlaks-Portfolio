import React, { useState } from "react";

const Contact = () => {
  const initialFormState = {
    name: "",
    email: "",
    topic: "Internship / Job Opportunity",
    message: "",
    "bot-field": "",
  };

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const email = "ntlakaniphomgaguli210@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const encodeFormData = (data) =>
    Object.keys(data)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(data[key] || "")}`
      )
      .join("&");

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (formStatus !== "idle") {
      setFormStatus("idle");
      setFormError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("idle");
    setFormError("");

    if (formData["bot-field"]) {
      setFormStatus("success");
      return;
    }

    try {
      setFormStatus("submitting");
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": "contact",
          ...formData,
        }),
      });

      setFormStatus("success");
      setFormData(initialFormState);
    } catch (error) {
      console.error("Form submission failed:", error);
      setFormStatus("error");
      setFormError("Failed to send your message. Please try again.");
    }
  };

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
      name: "TikTok",
      url: "https://www.tiktok.com/@ntlakanipho_mgaguli",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.2 3c.3 1.9 1.8 3.4 3.8 3.7v2.2c-1.3 0-2.6-.4-3.7-1.1V14c0 3.4-2.8 6.2-6.2 6.2S3 17.4 3 14s2.8-6.2 6.2-6.2c.3 0 .6 0 .9.1V10c-.3-.1-.6-.1-.9-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V3h2z" />
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
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">
            03. Work With Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Let&apos;s Build Something Useful
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            If you are hiring, learning, or collaborating on educational
            content, here are the fastest ways to connect.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 md:p-8 mb-12">
          <div className="mb-6">
            <h3 className="text-white text-2xl mb-2">Send a Message</h3>
            <p className="text-slate-400 text-sm">
              This form is powered by Netlify Forms.
            </p>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleFormSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out if you&apos;re human:
                <input
                  name="bot-field"
                  value={formData["bot-field"]}
                  onChange={handleFormChange}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </label>
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-slate-300 text-sm">Name</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-2">
                <span className="text-slate-300 text-sm">Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="text-slate-300 text-sm">Topic</span>
              <select
                name="topic"
                autoComplete="off"
                value={formData.topic}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <option>Internship / Job Opportunity</option>
                <option>Tutoring Request</option>
                <option>Course Collaboration</option>
                <option>General Inquiry</option>
              </select>
            </label>

            <label className="space-y-2 block">
              <span className="text-slate-300 text-sm">Message</span>
              <textarea
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={5}
                className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary resize-y"
                placeholder="Tell me about your project, role, or learning goals."
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="px-6 py-3 rounded-lg bg-primary/15 border border-primary/60 text-primary hover:bg-primary/25 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {formStatus === "success" && (
                <p className="text-green-400 text-sm" role="status" aria-live="polite">
                  Thanks. Your message has been sent.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-rose-400 text-sm" role="alert">
                  {formError}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="mb-12 text-center">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group relative inline-flex items-center gap-3 px-4 sm:px-6 py-4 bg-surface/50 border border-white/10 rounded-xl hover:border-primary/50 transition-all duration-300 max-w-full"
          >
            <svg
              className="w-5 h-5 text-primary shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white font-mono text-xs sm:text-sm md:text-base break-all">
              {email}
            </span>
            <span className="text-slate-500 group-hover:text-primary transition-colors">
              {copied ? (
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </span>
          </button>
          <p aria-live="polite" className="text-slate-600 text-xs mt-2 font-mono">
            {copied ? "Copied!" : "Click to copy"}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-slate-600 text-sm">or find me on</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-surface/30 border border-white/5 rounded-lg text-slate-400 hover:text-white hover:border-primary/30 transition-all duration-300"
            >
              {social.icon}
              <span className="font-medium text-sm">{social.name}</span>
            </a>
          ))}
        </div>

        <p className="text-slate-600 text-sm font-mono flex items-center justify-center gap-2">
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
          Cape Town, South Africa
        </p>
      </div>
    </section>
  );
};

export default Contact;

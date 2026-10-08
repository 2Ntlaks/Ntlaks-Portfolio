import React, { useState } from "react";
import { EMAIL, LINKS } from "../constants/site";
import { SOCIAL_ICON_PATHS } from "../constants/socialIcons";
import SectionHeading from "./SectionHeading";

/* Each social link is a jumper-wire plug; the stripe is the wire colour. */
const plugs = [
  { name: "GitHub", url: LINKS.github, wire: "#f6f6f3" },
  { name: "LinkedIn", url: LINKS.linkedin, wire: "#2456c8" },
  { name: "Udemy", url: LINKS.udemy, wire: "#a56cf0" },
  { name: "YouTube", url: LINKS.youtube, wire: "#e0412f" },
  { name: "TikTok", url: LINKS.tiktok, wire: "#2e9e5b" },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap contact-inner">
        <SectionHeading
          id="contact-title"
          designator="J5"
          label="Contact · one wire, no forms"
          title="Close the circuit."
          intro="Hiring, learning or building something? Email reaches me directly and I reply personally: internships, tutoring requests or course ideas."
        />

        <a className="contact-mail" href={`mailto:${EMAIL}`}>
          {EMAIL.split("@")[0]}@<wbr />
          {EMAIL.split("@")[1]}
        </a>

        <div className="contact-actions">
          <a href={`mailto:${EMAIL}?subject=Hello%20Ntlaks`} className="btn btn-solid">
            Write to me
          </a>
          <button type="button" onClick={copyEmail} className="btn btn-line">
            {copied ? "Copied ✓" : "Copy address"}
          </button>
          <a href={LINKS.cv} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            CV (PDF)
          </a>
          <p aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </p>
        </div>

        <div className="plugs">
          {plugs.map((plug) => (
            <a
              key={plug.name}
              href={plug.url}
              target="_blank"
              rel="noopener noreferrer"
              className="plug"
              style={{ "--wire": plug.wire }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={SOCIAL_ICON_PATHS[plug.name]} />
              </svg>
              {plug.name}
            </a>
          ))}
        </div>

        <p className="contact-loc mono">
          <span className="led-dot" aria-hidden="true" />
          Cape Town, South Africa · 33.92°S 18.42°E · SAST
        </p>
      </div>
    </section>
  );
};

export default Contact;

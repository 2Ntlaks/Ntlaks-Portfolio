import React, { useEffect } from "react";
import { applySeo } from "../utils/seo";
import SevenSeg from "../components/SevenSeg";

const NotFoundPage = () => {
  useEffect(() => {
    applySeo({
      title: "Page Not Found | Ntlaks.dev",
      description: "The page you requested could not be found on Ntlaks.dev.",
      path: window.location.pathname,
    });
  }, []);

  return (
    <section className="lost holes">
      <div className="wrap lost-inner">
        <SevenSeg value={404} label="Open circuit" />
        <h1 className="display">Nothing is wired here.</h1>
        <p>
          This address isn&apos;t connected to anything on the board. It may
          have moved, or the link has a typo.
        </p>
        <a href="/" className="btn btn-solid">
          Back to the board
        </a>
      </div>
    </section>
  );
};

export default NotFoundPage;

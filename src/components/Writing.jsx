import React from "react";
import { LINKS, POSTS } from "../constants/site";
import SectionHeading from "./SectionHeading";

/* Blog posts are served by the Netlify /writing proxy: plain <a> only. */
const Writing = () => {
  const { feature, series } = POSTS;

  return (
    <section id="writing" className="notes" aria-labelledby="writing-title">
      <div className="wrap">
        <SectionHeading
          id="writing-title"
          label="Blogs"
          title="I write up what I build."
          intro="So someone else can build it too."
        />

        <div className="notes-grid">
          <a className="page" href={feature.href}>
            <span className="page-meta mono">
              <span className="kick">{feature.kicker}</span>
              <time dateTime={feature.iso}>{feature.date}</time>
            </span>
            <h3>
              {feature.title} <em>{feature.titleTail}</em>
            </h3>
            <p>{feature.blurb}</p>
            <span className="page-go mono">
              Read the case study <span aria-hidden="true">→</span>
            </span>
          </a>

          <a className="page" href={series.href}>
            <span className="page-meta mono">
              <span className="kick">{series.kicker}</span>
              <time dateTime={series.iso}>{series.date}</time>
            </span>
            <h3>{series.title}</h3>
            <p>{series.blurb}</p>
            <span className="series" aria-hidden="true">
              {Array.from({ length: series.lessons }, (_, i) => (
                <i key={i}>{String(i + 1).padStart(2, "0")}</i>
              ))}
            </span>
            <span className="page-go mono">
              Open the series <span aria-hidden="true">→</span>
            </span>
          </a>
        </div>

        <div className="notes-all">
          <a href={LINKS.writing} className="btn btn-line">
            All blog posts <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Writing;

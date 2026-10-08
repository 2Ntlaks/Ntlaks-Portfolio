import React from "react";
import profilePhoto from "../assets/profile.jpg";
import { PUBLIC_STATS } from "../constants/publicStats";
import { EMAIL, LINKS, TIMELINE } from "../constants/site";
import SectionHeading from "./SectionHeading";

const About = () => {
  const { udemyLearners, udemyRating, tutoringStudents, tutoringSince } = PUBLIC_STATS;

  const facts = [
    ["Studying", "Computer Engineering, CPUT (final year)"],
    ["Based in", "Cape Town, South Africa (SAST, UTC+2)"],
    ["Teaching", `WebGL for Beginners on Udemy: ${udemyLearners}+ students, ${udemyRating}★`],
    ["Tutoring", `${tutoringStudents}+ students since ${tutoringSince}`],
  ];

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading id="about-title" label="About" title="I learn it properly, build it, then teach it." />

        <article className="sheet">
          <div className="about-grid">
            <figure className="about-photo">
              <img
                src={profilePhoto}
                alt="Ntlakanipho Mgaguli smiling outside a CPUT building"
                width="534"
                height="862"
                loading="lazy"
              />
            </figure>

            <div className="about-main">
              <p className="about-lead">
                I&apos;m a final-year Computer Engineering student at Cape
                Peninsula University of Technology. I like understanding things
                from the fundamentals up, then building something real with
                them: a payments backend, a tutoring platform, a WebGL course,
                an ESP32 project on the bench. Then I turn what I learned into
                lessons.
              </p>

              <div className="about-ask">
                <h3>What I&apos;m looking for</h3>
                <p>
                  An internship or a graduate role in software engineering:
                  backend, graphics or embedded. I&apos;m based in Cape Town.{" "}
                  <a href={`mailto:${EMAIL}`}>Email me</a> and I&apos;ll reply
                  personally.
                </p>
              </div>

              <div className="about-ai">
                <h3>How I work with AI</h3>
                <p>
                  I use Claude Code and Codex every day, with written task
                  briefs, clear limits on how much the agent decides alone, and
                  a review of every diff before it lands. I published the method
                  as the{" "}
                  <a href={LINKS.workflowKit} target="_blank" rel="noopener noreferrer">
                    AI-Native Workflow Kit
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="about-lower">
            <dl className="facts">
              {facts.map(([term, value]) => (
                <div key={term}>
                  <dt className="mono">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className="about-h3">Recently</h3>
              <ol className="timeline">
                {TIMELINE.map((item) => (
                  <li key={item.what}>
                    <span className="mono">{item.when}</span>
                    <span>
                      {item.what}
                      {item.note && <em> · {item.note}</em>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;

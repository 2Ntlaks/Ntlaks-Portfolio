import React from "react";
import whiteboardPhoto from "../assets/work/teaching-whiteboard.jpg";
import { PUBLIC_STATS } from "../constants/publicStats";
import { EMAIL, LINKS } from "../constants/site";
import SectionHeading from "./SectionHeading";

/* For audience #2: students who want help, not a résumé. */
const Tutoring = () => {
  const { tutoringPricePerMonth, tutoringSince, tutoringStudents, udemyRating } = PUBLIC_STATS;

  return (
    <section id="tutoring" className="tutor" aria-labelledby="tutoring-title">
      <div className="wrap tutor-grid">
        <figure className="tutor-photo">
          <img
            src={whiteboardPhoto}
            alt="Ntlakanipho teaching conditional statements and loops at a whiteboard"
            loading="lazy"
          />
          <figcaption>Tracing if/else and loops on the whiteboard.</figcaption>
        </figure>

        <div className="tutor-copy">
          <SectionHeading
            id="tutoring-title"
            label="For students"
            title="Studying C, Java or WebGL?"
            intro="One-on-one tutoring for university students, from a tutor who traces every loop with you until it makes sense. Your lessons, notes and code stay in your own portal, so you can come back to them any time."
          />

          <dl className="tutor-facts">
            <div>
              <dt className="mono">Price</dt>
              <dd>R{tutoringPricePerMonth} a month, per course</dd>
            </div>
            <div>
              <dt className="mono">Tutoring since</dt>
              <dd>
                {tutoringSince}, {tutoringStudents}+ students
              </dd>
            </div>
            <div>
              <dt className="mono">Try first</dt>
              <dd>Free preview lessons, no account needed</dd>
            </div>
          </dl>

          <div className="hero-ctas">
            <a href={LINKS.tutoringFreeLessons} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Watch a free lesson
            </a>
            <a href={`mailto:${EMAIL}?subject=Tutoring%20enquiry`} className="btn btn-line">
              Email to enrol
            </a>
          </div>

          <p className="tutor-course">
            Prefer to learn on your own? My{" "}
            <a href={LINKS.udemy} target="_blank" rel="noopener noreferrer">
              WebGL for Beginners
            </a>{" "}
            course on Udemy is rated {udemyRating}★.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tutoring;

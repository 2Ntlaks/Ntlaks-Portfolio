import React from "react";
import profilePhoto from "../assets/profile.jpg";
import esp32Photo from "../assets/bench/esp32-breadboard.jpg";
import piPhoto from "../assets/bench/pi-multimeter.jpg";
import lessonPhoto from "../assets/bench/arrays-lesson.jpg";
import { PUBLIC_STATS } from "../constants/publicStats";
import { EMAIL, LINKS } from "../constants/site";
import SectionHeading from "./SectionHeading";

const benchPhotos = [
  {
    src: esp32Photo,
    alt: "An ESP32 on a breadboard wired to a small OLED screen, a relay, a buzzer and an 18650 battery, with a laptop of code behind it",
    caption: "ESP32 bring-up: OLED, relay, buzzer and an 18650 cell.",
  },
  {
    src: piPhoto,
    alt: "A Raspberry Pi, a yellow multimeter with red probes and a laptop showing a board diagram on a desk",
    caption: "Raspberry Pi, multimeter and the datasheet open.",
  },
  {
    src: lessonPhoto,
    alt: "A laptop showing a lesson titled Arrays in Java by Ntlakanipho Mgaguli, with a drawing tablet in front",
    caption: "Writing up “Arrays in Java” for my students.",
  },
];

const About = () => {
  const { udemyLearners, udemyCountries, udemyLectures } = PUBLIC_STATS;

  const learn = [
    { name: "Mgaguli Tutoring", url: LINKS.tutoring },
    { name: "Udemy course", url: LINKS.udemy },
    { name: "YouTube", url: LINKS.youtube },
    { name: "TikTok", url: LINKS.tiktok },
  ];

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading
          id="about-title"
          designator="J1"
          label="About · datasheet NM-26"
          title="Student. Builder. Teacher."
          intro="Every part on a bench comes with a datasheet. Here's mine."
        />

        <article className="sheet">
          <div className="sheet-head">
            <span className="pn">NM-26</span>
            <span className="mid mono">Computer engineer &amp; educator</span>
            <span className="mono" style={{ color: "var(--color-ink-3)" }}>
              Rev. Oct 2026
            </span>
          </div>

          <div className="sheet-body">
            <div className="ds-col">
              <div>
                <h3 className="ds-title">Ntlakanipho Mgaguli</h3>
                <p className="ds-sub mono">Final year · Computer Engineering · CPUT</p>
              </div>

              <div className="ds-sec">
                <h3>
                  <span>1</span>Features
                </h3>
                <ul className="ds-list">
                  <li>
                    <strong>Teaches WebGL on Udemy:</strong> {udemyLearners}+
                    students in {udemyCountries}+ countries across {udemyLectures} lectures.
                  </li>
                  <li>
                    <strong>Runs Mgaguli Tutoring:</strong> one-on-one help in C,
                    Java and engineering fundamentals.
                  </li>
                  <li>
                    <strong>Works across hardware and software:</strong> ESP32 and
                    Raspberry Pi on the bench, Java, React and raw WebGL on screen.
                  </li>
                  <li>
                    <strong>AI-native:</strong> uses AI as an amplifier for strong
                    fundamentals, not a replacement for them.
                  </li>
                  <li>
                    <strong>Currently adding:</strong> AWS cloud services, and
                    project-driven courses on Mgaguli Tutoring.
                  </li>
                </ul>
              </div>

              <div className="ds-sec">
                <h3>
                  <span>2</span>Description
                </h3>
                <p>
                  I&apos;m a final-year Computer Engineering student at Cape
                  Peninsula University of Technology, building across hardware
                  and software with a project-first approach. I learn something
                  properly, build something real with it, then turn it into a
                  lesson someone else can follow.
                </p>
              </div>

              <div className="ds-sec">
                <h3>
                  <span>3</span>Typical application
                </h3>
                <p className="ds-quote">Learn deeply. Build practically. Teach clearly.</p>
              </div>
            </div>

            <div className="ds-col">
              <figure className="ds-fig">
                <img
                  src={profilePhoto}
                  alt="Ntlakanipho Mgaguli smiling outside a CPUT building"
                  width="534"
                  height="862"
                  style={{ aspectRatio: "4 / 4.4", objectPosition: "50% 22%" }}
                  loading="lazy"
                />
                <figcaption>
                  <b>Figure 1.</b> Device photo, CPUT campus.
                </figcaption>
              </figure>

              <table className="ds-table">
                <caption>
                  <b>Table 1.</b> Recommended operating conditions
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Parameter</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Location</th>
                    <td>Cape Town, South Africa</td>
                  </tr>
                  <tr>
                    <th scope="row">Time zone</th>
                    <td>SAST (UTC+2)</td>
                  </tr>
                  <tr>
                    <th scope="row">Status</th>
                    <td>Open to internships and tutoring</td>
                  </tr>
                  <tr>
                    <th scope="row">Interface</th>
                    <td>
                      <a href={`mailto:${EMAIL}`} className="underline decoration-signal underline-offset-2 hover:text-signal-ink" style={{ overflowWrap: "anywhere" }}>
                        Email
                      </a>
                      , answered personally
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="ds-sec">
                <h3>
                  <span>4</span>Learn with me
                </h3>
                <div className="ds-learn">
                  {learn.map((link) => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ds-photos">
            {benchPhotos.map((photo, i) => (
              <figure className="ds-fig" key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>
                  <b>Figure {i + 2}.</b> {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="ds-foot mono">
            <span>NM-26 datasheet</span>
            <span>ntlaks.dev</span>
            <span>Page 1 of 1</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;

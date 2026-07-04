import React from "react";
import profilePhoto from "../assets/profile.jpg";
import { PUBLIC_STATS } from "../constants/publicStats";
import SectionHeading from "./SectionHeading";

const About = () => {
  const { udemyLearners, udemyCountries, udemyLectures } = PUBLIC_STATS;

  const stats = [
    { value: `${udemyLearners}+`, label: "Students taught" },
    { value: `${udemyCountries}+`, label: "Countries reached" },
    { value: udemyLectures, label: "Course lectures" },
  ];

  const practice = [
    {
      index: "a",
      title: "Build",
      detail:
        "Practical software and engineering tools that solve real student and developer problems — from banking systems in Java to raw-WebGL teaching demos.",
    },
    {
      index: "b",
      title: "Teach",
      detail:
        "Complex topics like WebGL and systems concepts, broken into step-by-step lessons that students across 40+ countries apply immediately.",
    },
    {
      index: "c",
      title: "Tutor",
      detail:
        "One-on-one mentoring in C, Java, and engineering fundamentals through Mgaguli Tutoring, focused on clear understanding and results.",
    },
  ];

  const learnLinks = [
    { name: "Mgaguli Tutoring", url: "https://mgagulitutoring.dev" },
    { name: "Udemy", url: "https://www.udemy.com/user/ntlakanipho-mgaguli/" },
    { name: "YouTube", url: "https://www.youtube.com/@ntlakaniphomgaguli" },
    { name: "TikTok", url: "https://www.tiktok.com/@ntlakanipho_mgaguli" },
  ];

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading fig="01" title="About" note="Subject profile" />

        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start mb-20">
          <figure className="mx-auto lg:mx-0">
            <div className="corners border border-line bg-panel p-3">
              <img
                src={profilePhoto}
                alt="Ntlakanipho Mgaguli"
                className="w-56 h-56 lg:w-64 lg:h-64 object-cover"
              />
            </div>
            <figcaption className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint mt-3 text-center lg:text-left">
              Subject — N. Mgaguli, CPUT
            </figcaption>
          </figure>

          <div className="space-y-8 text-center lg:text-left">
            <h3 className="font-display font-semibold text-2xl md:text-3xl text-paper">
              Student. Builder. Educator.
            </h3>

            <p className="text-draft leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I&apos;m a final-year Computer Engineering student at{" "}
              <strong className="text-paper font-medium">
                Cape Peninsula University of Technology
              </strong>
              , building across hardware and software with a project-first
              approach. On Udemy I teach WebGL to {udemyLearners}+ students
              from over {udemyCountries} countries, and through Mgaguli
              Tutoring I mentor students directly in C, Java, and core
              engineering fundamentals.
            </p>

            <div className="grid grid-cols-3 sm:inline-flex sm:items-stretch divide-x divide-line border border-line bg-panel/60 w-full sm:w-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="px-2 sm:px-7 py-4 text-center sm:text-left">
                  <p className="font-display font-semibold text-2xl md:text-3xl text-amber">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[0.6rem] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-faint mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-2 border-amber pl-5 py-1 max-w-2xl mx-auto lg:mx-0 text-left">
              <p className="font-display text-xl text-paper italic">
                &ldquo;Learn deeply. Build practically. Teach clearly.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-line border border-line mb-20">
          {practice.map((item) => (
            <div key={item.title} className="bg-panel p-7">
              <p className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-faint mb-3">
                01.{item.index}
              </p>
              <h4 className="font-display font-semibold text-xl text-paper mb-3">
                {item.title}
              </h4>
              <p className="text-draft text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="corners border border-line bg-panel/70 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-10">
            <div className="flex-1 space-y-4">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-amber">
                Current focus
              </p>
              <h3 className="font-display font-semibold text-xl md:text-2xl text-paper">
                AI, cloud, and better learning systems
              </h3>
              <p className="text-draft leading-relaxed">
                I see <strong className="text-paper font-medium">AI as an amplifier</strong>{" "}
                — not a replacement, but a way to multiply strong fundamentals.
                I&apos;m currently expanding into AWS cloud services while
                growing Mgaguli Tutoring into a home for practical,
                project-driven technical courses.
              </p>
            </div>

            <div className="md:max-w-xs w-full">
              <p className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-faint mb-4">
                Learn with me
              </p>
              <div className="grid grid-cols-2 gap-2">
                {learnLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 border border-line text-draft font-mono text-xs text-center hover:border-amber/60 hover:text-amber transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <a
                href="mailto:ntlakaniphomgaguli210@gmail.com"
                className="mt-4 inline-flex items-center justify-center w-full px-4 py-3 border border-amber/60 text-amber font-mono text-xs tracking-[0.15em] uppercase hover:bg-amber hover:text-ink transition-colors"
              >
                Open to internships &amp; tutoring
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

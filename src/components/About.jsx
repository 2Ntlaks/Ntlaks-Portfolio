import React from "react";
import profilePhoto from "../assets/profile.jpg";
import { PUBLIC_STATS } from "../constants/publicStats";

const About = () => {
  const { udemyLearners, udemyPublicReviews, udemyLectures } = PUBLIC_STATS;

  const stats = [
    { value: `${udemyLearners}+`, label: "Learners taught" },
    { value: udemyLectures, label: "Course lectures" },
    { value: udemyPublicReviews, label: "Public reviews" },
  ];

  const whatIDo = [
    {
      title: "Build",
      detail:
        "I build practical software and engineering tools that solve real student and developer problems.",
    },
    {
      title: "Teach",
      detail:
        "I simplify complex topics like WebGL and systems concepts into step-by-step lessons that people can apply immediately.",
    },
    {
      title: "Tutor",
      detail:
        "I mentor students one-on-one in programming and engineering with a focus on clear understanding and results.",
    },
  ];

  const creatorLinks = [
    { name: "TikTok", url: "https://www.tiktok.com/@ntlakanipho_mgaguli" },
    { name: "YouTube", url: "https://www.youtube.com/@ntlakaniphomgaguli" },
    { name: "GitHub", url: "https://github.com/2Ntlaks" },
    {
      name: "MySQL Cheat Sheet",
      url: "https://www.scribd.com/document/706758050/MySQL-Cheat-Sheet",
    },
  ];

  const aiLabs = [
    { name: "Anthropic", url: "https://anthropic.com" },
    { name: "OpenAI", url: "https://openai.com" },
    { name: "xAI", url: "https://x.ai" },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-16 text-center">
        <span className="text-primary">01.</span> About Me
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start mb-16">
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <img
              src={profilePhoto}
              alt="Ntlakanipho Mgaguli"
              className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl object-cover border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        <div className="space-y-6 text-center lg:text-left">
          <div>
            <span className="text-primary font-mono text-sm uppercase tracking-widest">
              The Journey
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
              Student, Builder, Educator
            </h3>
          </div>

          <div className="space-y-4 text-slate-400 leading-relaxed max-w-2xl">
            <p>
              Final-year Computer Engineering student at{" "}
              <strong className="text-white">
                Cape Peninsula University of Technology
              </strong>
              , building across hardware and software with a project-first
              approach. I teach WebGL on Udemy and tutor students directly in
              C, Java, and core engineering fundamentals.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl pt-2">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-mono font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-primary pl-4 py-2 mt-2">
            <p className="text-lg font-mono text-white italic">
              "Learn deeply. Build practically. Teach clearly."
            </p>
          </blockquote>
        </div>
      </div>

      <div className="mb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {whatIDo.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-surface/60 p-5 text-left"
            >
              <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">
                {item.title}
              </p>
              <p className="text-slate-300 leading-relaxed text-sm">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="bg-gradient-to-br from-surface/80 to-surface/40 rounded-2xl border border-white/5 p-8 md:p-10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1 space-y-4">
              <div>
                <span className="text-secondary font-mono text-sm uppercase tracking-widest">
                  Current Focus
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                  AI, Cloud, and Better Learning Systems
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                I see <strong className="text-white">AI as an amplifier</strong>
                : not a replacement, but a way to multiply strong fundamentals.
                I am currently expanding into AWS cloud services while designing
                the foundation for a future tutoring platform that will host
                practical, project-driven technical courses.
              </p>
              <p className="text-slate-500 text-sm">
                Following research and updates from:
              </p>
              <div className="flex flex-wrap gap-3">
                {aiLabs.map((lab) => (
                  <a
                    key={lab.name}
                    href={lab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-sm hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    {lab.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 md:max-w-xs w-full">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-mono">
                Learn With Me
              </p>
              <div className="grid grid-cols-2 gap-3">
                {creatorLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs text-center hover:border-primary/40 hover:text-primary transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <a
                href="/#contact"
                className="mt-5 inline-flex items-center justify-center w-full px-4 py-3 rounded-lg border border-primary/40 text-primary text-sm font-mono hover:bg-primary/10 transition-colors"
              >
                Open to internships and tutoring
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;

import React from "react";
import profilePhoto from "../assets/profile.jpg";
import { PUBLIC_STATS } from "../constants/publicStats";

const About = () => {
  const { udemyLearners, udemyPublicReviews } = PUBLIC_STATS;

  const skills = [
    { category: "Languages", items: ["Java", "C", "JavaScript", "SQL"] },
    { category: "Graphics", items: ["WebGL", "3D Graphics", "Shaders"] },
    { category: "Web", items: ["React", "Vite", "HTML/CSS"] },
    { category: "Tools", items: ["Git", "GitHub", "MySQL", "VS Code"] },
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
              I'm a final-year Computer Engineering student at{" "}
              <strong className="text-white">
                Cape Peninsula University of Technology
              </strong>{" "}
              in Cape Town, building across both hardware and software with a
              practical, project-first approach.
            </p>
            <p>
              I teach WebGL on Udemy, where I have supported{" "}
              <strong className="text-white">{udemyLearners}+ learners</strong>{" "}
              and earned{" "}
              <strong className="text-white">
                {udemyPublicReviews} public reviews
              </strong>
              . I also tutor students directly in C, Java, and core engineering
              fundamentals.
            </p>
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

      <div className="mb-20">
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

      <div id="skills">
        <div className="text-center mb-10">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">
            Technical Arsenal
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
            Tools & Technologies
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="p-5 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/20 transition-colors duration-300"
            >
              <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                {skillGroup.category}
              </h4>
              <ul className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <li
                    key={skill}
                    className="text-slate-300 font-mono text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

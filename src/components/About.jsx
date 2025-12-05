import React from "react";
import profilePhoto from "../assets/profile.jpg";

const About = () => {
  const skills = [
    { category: "Languages", items: ["Java", "C", "JavaScript", "SQL"] },
    { category: "Graphics", items: ["WebGL", "3D Graphics", "Shaders"] },
    { category: "Web", items: ["React", "Vite", "HTML/CSS"] },
    { category: "Tools", items: ["Git", "GitHub", "MySQL", "VS Code"] },
  ];

  const aiLabs = [
    { name: "Anthropic", url: "https://anthropic.com" },
    { name: "OpenAI", url: "https://openai.com" },
    { name: "xAI", url: "https://x.ai" },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-16 text-center">
        <span className="text-primary">01.</span> About Me
      </h2>

      {/* Main Content - Photo + Story */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start mb-20">
        {/* Profile Photo */}
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

        {/* The Journey - Narrative */}
        <div className="space-y-6 text-center lg:text-left">
          <div>
            <span className="text-primary font-mono text-sm uppercase tracking-widest">
              The Journey
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
              From Student to Educator
            </h3>
          </div>

          <div className="space-y-4 text-slate-400 leading-relaxed max-w-2xl">
            <p>
              I'm a Computer Engineering student at{" "}
              <strong className="text-white">
                Cape Peninsula University of Technology
              </strong>
              , where I'm building a foundation that spans both hardware and
              software. For me, engineering isn't just about passing exams. It's
              about solving real problems and sharing what I learn along the
              way.
            </p>
            <p>
              That mindset led me to become a{" "}
              <strong className="text-white">WebGL instructor on Udemy</strong>,
              where I've helped 105+ students from around the world understand
              3D graphics programming. With a 4.5-star rating, I've proven that
              complex topics like shaders and rendering pipelines can be taught
              in a way that actually makes sense. I also work as a{" "}
              <strong className="text-white">tutor</strong>, guiding students
              through programming and engineering concepts one-on-one.
            </p>
            <p>
              I believe in{" "}
              <strong className="text-white">learning by building</strong>.
              Theory matters, but it only clicks when you apply it to something
              real. Every course I create and every concept I teach is designed
              around practical, hands-on projects, not just slides and
              definitions.
            </p>
          </div>

          {/* Philosophy Quote */}
          <blockquote className="border-l-2 border-primary pl-4 py-2 mt-6">
            <p className="text-lg font-mono text-white italic">
              "Learn deeply. Build practically. Teach clearly."
            </p>
          </blockquote>
        </div>
      </div>

      {/* AI & Innovation Section */}
      <div className="mb-20">
        <div className="bg-gradient-to-br from-surface/80 to-surface/40 rounded-2xl border border-white/5 p-8 md:p-10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Left - Text */}
            <div className="flex-1 space-y-4">
              <div>
                <span className="text-secondary font-mono text-sm uppercase tracking-widest">
                  Philosophy
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                  Staying Ahead of the Curve
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                I see <strong className="text-white">AI as an amplifier</strong>
                . Not a replacement, but a tool that multiplies what you already
                know. The engineers who thrive in the next decade won't just use
                AI; they'll understand how it works and where it's heading.
                That's why I follow the research coming out of labs like
                Anthropic, OpenAI, and xAI, learning directly from the founders,
                researchers, and developers who are shaping this technology.
              </p>
            </div>

            {/* Right - AI Labs */}
            <div className="flex-shrink-0">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-mono">
                Following
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
          </div>
        </div>
      </div>

      {/* Skills Section */}
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

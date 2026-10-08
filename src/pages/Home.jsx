import React, { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Writing from "../components/Writing";
import Contact from "../components/Contact";
import Rail from "../components/Rail";
import { applySeo } from "../utils/seo";

const Home = () => {
  useEffect(() => {
    applySeo({
      title: "Ntlakanipho Mgaguli | WebGL Instructor & Developer",
      description:
        "Developer and WebGL instructor in Cape Town, teaching students across 40+ countries. Specializing in 3D graphics, Java, and web development.",
      path: "/",
    });
  }, []);

  return (
    <>
      <Hero />
      <Rail />
      <About />
      <Skills />
      <Projects />
      <Rail />
      <Writing />
      <Rail />
      <Contact />
    </>
  );
};

export default Home;


import React, { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Tutoring from "../components/Tutoring";
import Writing from "../components/Writing";
import Contact from "../components/Contact";
import Rail from "../components/Rail";
import { applySeo } from "../utils/seo";

const Home = () => {
  useEffect(() => {
    applySeo({
      title: "Ntlakanipho Mgaguli | WebGL Instructor & Developer",
      description:
        "Final-year Computer Engineering student in Cape Town, open to internships and graduate roles. I build a tutoring platform, a Java payments API and WebGL tools, and teach WebGL to 160+ students on Udemy.",
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
      <Tutoring />
      <Rail />
      <Writing />
      <Rail />
      <Contact />
    </>
  );
};

export default Home;


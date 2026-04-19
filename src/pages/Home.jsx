import React, { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { applySeo } from "../utils/seo";

const Home = () => {
  useEffect(() => {
    applySeo({
      title: "Ntlakanipho Mgaguli | Developer & WebGL Instructor",
      description:
        "Full-stack developer and WebGL instructor based in Cape Town. Specializing in 3D graphics, Java, and web development.",
      path: "/",
    });
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;


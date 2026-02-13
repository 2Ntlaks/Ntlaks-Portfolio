import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProofBar from "./components/ProofBar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-dark">
      <Navbar />
      <main>
        <Hero />
        <ProofBar />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

"use client";

import { useCallback, useEffect, useState } from "react";

import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Always start at the top when the page is refreshed
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Lock scrolling while the intro plays
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.history.scrollRestoration = "auto";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Intro finished: unlock scroll and land on the Hero
  const handleIntroDone = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.getElementById("hero")?.scrollIntoView({ behavior: "auto" });
    setIntroDone(true);
  }, []);

  return (
    <>
      {!introDone && <Intro onDone={handleIntroDone} />}

      <main>
        <Navbar />
        <Hero />
        <Profile />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
"use client";

import { useEffect } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Always start at the top when the page is refreshed
    window.history.scrollRestoration = "manual";
    window.scrollTo({
      top: 60,
      behavior: "smooth",
    });

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  return (
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
  );
}
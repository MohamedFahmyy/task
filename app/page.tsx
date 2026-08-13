"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { ChatBot } from "./components/ChatBot";
import { Footer } from "./components/Footer";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Read theme from localStorage on client-side mount to prevent SSR hydration errors
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | null;
    const finalTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    
    document.documentElement.setAttribute("data-theme", finalTheme);

    const timer = setTimeout(() => {
      setTheme(finalTheme);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.3s ease" }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ChatBot />
      </main>
      <Footer />
    </div>
  );
}

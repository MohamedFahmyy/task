"use client";

import React, { useState, useEffect } from "react";

export const Hero: React.FC = () => {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting = "Hello";
    if (hour < 12) {
      newGreeting = "Good Morning";
    } else if (hour < 18) {
      newGreeting = "Good Afternoon";
    } else {
      newGreeting = "Good Evening";
    }
    const timer = setTimeout(() => {
      setGreeting(newGreeting);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Text Content */}
        <div className="hero-text-content">
          <div className="hero-greeting-badge">
            <span className="pulse-dot"></span>
            {greeting}, welcome to my world
          </div>
          
          <h1 className="hero-title">
            I&apos;m <span className="highlight">Mazin Ibrahim</span>
          </h1>
          
          <h2 className="hero-subtitle">
            AI / Cloud / Full-Stack Developer
          </h2>
          
          <p className="hero-description">
            I build intelligent, scalable, and responsive web applications. Specialized in React, Next.js, Cloud Architectures, DevOps automation, and Gemini integrations.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="cta-btn primary">
              View My Work
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#contact" className="cta-btn secondary">
              Let&apos;s Talk
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Visual Graphic Area */}
        <div className="hero-visual-area">
          <div className="hero-blob-bg"></div>
          <svg viewBox="0 0 500 500" className="hero-svg">
            <defs>
              <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glow effect */}
            <circle cx="250" cy="250" r="200" fill="url(#glow)" />

            {/* Constellation connections */}
            <path d="M150 150 L250 100 L350 150 L320 300 L180 300 Z" stroke="url(#grid-grad)" strokeWidth="1.5" fill="none" strokeDasharray="6,4" />
            <path d="M250 100 L250 380" stroke="var(--border-color)" strokeWidth="1" fill="none" />
            <path d="M150 150 L320 300" stroke="var(--border-color)" strokeWidth="1.2" fill="none" />
            <path d="M350 150 L180 300" stroke="var(--border-color)" strokeWidth="1.2" fill="none" />

            {/* Visual Nodes */}
            <circle cx="250" cy="100" r="10" fill="var(--primary)" />
            <circle cx="150" cy="150" r="7" fill="var(--accent)" />
            <circle cx="350" cy="150" r="7" fill="var(--accent)" />
            <circle cx="320" cy="300" r="12" fill="var(--primary)" />
            <circle cx="180" cy="300" r="8" fill="var(--accent)" />
            <circle cx="250" cy="380" r="14" fill="var(--primary)" />

            {/* Labels */}
            <text x="270" y="105" fill="var(--text-primary)" fontSize="12" fontFamily="monospace" fontWeight="bold">&lt;AI&gt;</text>
            <text x="90" y="155" fill="var(--text-secondary)" fontSize="12" fontFamily="monospace">React</text>
            <text x="370" y="155" fill="var(--text-secondary)" fontSize="12" fontFamily="monospace">Next.js</text>
            <text x="340" y="305" fill="var(--text-primary)" fontSize="12" fontFamily="monospace" fontWeight="bold">Cloud</text>
            <text x="130" y="305" fill="var(--text-secondary)" fontSize="12" fontFamily="monospace">Docker</text>
            <text x="275" y="385" fill="var(--text-primary)" fontSize="12" fontFamily="monospace" fontWeight="bold">DevOps</text>
          </svg>
        </div>
      </div>
    </section>
  );
};

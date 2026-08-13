import React from "react";

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="section-header">
          <span className="section-tag">Overview</span>
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a software engineer dedicated to building intelligent, end-to-end applications. I focus on crafting polished user experiences with <strong>React</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong>, while ensuring robust performance and stability on the server side.
            </p>
            <p>
              My backend experience includes building RESTful APIs using <strong>Laravel (PHP)</strong> and <strong>Node.js</strong>. I am also enthusiastic about automating deployments and managing infrastructure with cloud technologies like <strong>AWS</strong>, container tools like <strong>Docker</strong>, and container orchestration platforms like <strong>Kubernetes</strong>.
            </p>
            <p>
              Recently, I have focused on integration of generative AI pipelines (utilizing the <strong>Gemini API</strong>) into business logic and workflows, designing conversational interfaces and systems that solve real-world productivity challenges.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">4+</span>
              <span className="stat-label">Core Focus Areas</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects Deployed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Commitment to Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

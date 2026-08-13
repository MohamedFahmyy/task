"use client";

import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { projectsData, ProjectCategory } from "../data/projects";

type FilterType = "All" | ProjectCategory;

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterType>("All");

  const categories: FilterType[] = ["All", "AI", "Web", "Cloud", "DevOps"];

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Selected Projects</h2>
        </div>

        {/* Filter Buttons */}
        <div className="projects-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              category={project.category}
              featured={project.featured}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              visualGradient={project.visualGradient}
              iconName={project.iconName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

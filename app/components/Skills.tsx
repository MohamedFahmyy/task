import React from "react";
import { SkillCard } from "./SkillCard";
import { skillsData } from "../data/skills";

export const Skills: React.FC = () => {
  const categories = ["Frontend", "Backend", "Cloud/DevOps", "AI/ML"] as const;

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="section-header">
          <span className="section-tag">Competence</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-grid-wrapper">
          {categories.map((category) => {
            const filteredSkills = skillsData.filter((s) => s.category === category);
            return (
              <div key={category} className="skills-category-group">
                <h3 className="category-group-title">{category}</h3>
                <div className="skills-grid">
                  {filteredSkills.map((skill) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      category={skill.category}
                      level={skill.level}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

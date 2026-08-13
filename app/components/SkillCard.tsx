import React from "react";

export interface SkillCardProps {
  name: string;
  category: string;
  level: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ name, category, level }) => {
  const getPercentage = (lvl: string): string => {
    switch (lvl) {
      case "Beginner": return "30%";
      case "Intermediate": return "60%";
      case "Advanced": return "85%";
      case "Expert": return "100%";
      default: return "50%";
    }
  };

  return (
    <div className="skill-card">
      <div className="skill-header">
        <h4 className="skill-name">{name}</h4>
        <span className="skill-badge-level">{level}</span>
      </div>
      <span className="skill-category">{category}</span>
      <div className="skill-progress-container">
        <div 
          className="skill-progress-fill" 
          style={{ width: getPercentage(level) }}
        />
      </div>
    </div>
  );
};

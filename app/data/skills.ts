export type SkillCategory = "Frontend" | "Backend" | "Cloud/DevOps" | "AI/ML";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export const skillsData: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", level: "Expert" },
  { name: "Next.js", category: "Frontend", level: "Expert" },
  { name: "TypeScript", category: "Frontend", level: "Advanced" },
  { name: "CSS3 / HTML5", category: "Frontend", level: "Advanced" },
  
  // Backend
  { name: "Node.js / Express", category: "Backend", level: "Advanced" },
  { name: "Laravel (PHP)", category: "Backend", level: "Advanced" },
  { name: "PostgreSQL / MySQL", category: "Backend", level: "Advanced" },
  
  // Cloud/DevOps
  { name: "AWS", category: "Cloud/DevOps", level: "Advanced" },
  { name: "Docker", category: "Cloud/DevOps", level: "Advanced" },
  { name: "Kubernetes", category: "Cloud/DevOps", level: "Intermediate" },
  { name: "CI/CD (GitHub Actions)", category: "Cloud/DevOps", level: "Advanced" },
  
  // AI/ML
  { name: "LLM Integration (Gemini)", category: "AI/ML", level: "Advanced" },
  { name: "LangChain & Agents", category: "AI/ML", level: "Intermediate" },
  { name: "Vector DBs (Pinecone / Pgvector)", category: "AI/ML", level: "Intermediate" },
];

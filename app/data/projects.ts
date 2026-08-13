export type ProjectCategory = "AI" | "Web" | "Cloud" | "DevOps";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  visualGradient: string;
  iconName: string;
}

export const projectsData: Project[] = [
  {
    title: "AI Learning Platform",
    description: "An adaptive learning system powered by Gemini that customizes curriculum pacing, generates interactive exercises, and provides real-time explanations for coding students.",
    technologies: ["Next.js", "TypeScript", "Gemini API", "PostgreSQL"],
    category: "AI",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/mohamedfahmy/ai-learning-platform",
    visualGradient: "linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)",
    iconName: "brain"
  },
  {
    title: "E-Commerce Platform",
    description: "A high-performance storefront featuring static rendering, dynamic cart operations, checkout API routing, and integrations with Laravel backend services.",
    technologies: ["React", "Laravel", "MySQL", "Docker", "Stripe"],
    category: "Web",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/mohamedfahmy/laravel-react-store",
    visualGradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    iconName: "shopping-bag"
  },
  {
    title: "Cloud Infrastructure Dashboard",
    description: "Real-time orchestration console for AWS resources, visualizing CPU loads, autoscaling events, and billing alarms with secure IAM credentials.",
    technologies: ["Next.js", "TypeScript", "AWS SDK", "Docker", "Kubernetes"],
    category: "Cloud",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/mohamedfahmy/cloud-dashboard",
    visualGradient: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
    iconName: "cloud"
  },
  {
    title: "Developer Productivity Assistant",
    description: "A lightweight desktop productivity assistant with local-first storage, system command shortcuts, and automated background Docker control utilities.",
    technologies: ["TypeScript", "Electron", "Docker", "Node.js"],
    category: "DevOps",
    featured: false,
    demoUrl: "#",
    githubUrl: "https://github.com/mohamedfahmy/productivity-assistant",
    visualGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    iconName: "terminal"
  }
];

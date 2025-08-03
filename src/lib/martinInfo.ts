// src/lib/martinInfo.ts
import type { MartinInfo, Project } from "@/types/index";

export const martinInfo: MartinInfo = {
  bio: "Martin Nolan is a software engineer and designer with experience in web development, AI, and cloud technologies. Passionate about building impactful products and sharing knowledge.",
  contact: {
    email: "martin@example.com",
    website: "https://martinnolan.dev"
  },
  skills: [
    "TypeScript", "React", "Node.js", "Azure", "AI/ML", "UI/UX Design", "TailwindCSS", "Vite", "Supabase"
  ],
  experience: [
    {
      role: "Lead Software Engineer",
      company: "Tech Innovations Ltd.",
      years: "2022-2025",
      description: "Led development of scalable web applications and AI-powered tools."
    },
    {
      role: "Frontend Developer",
      company: "Creative Web Studio",
      years: "2020-2022",
      description: "Built modern UIs and contributed to open-source projects."
    }
  ],
  projects: [
    {
      name: "Fit360",
      description: "A health and fitness platform with AI insights and progress tracking.",
      url: "https://fit360.app"
    } as Project,
    {
      name: "martinnolan-dev",
      description: "Personal portfolio and AI chat assistant.",
      url: "https://martinnolan.dev"
    } as Project
  ],
  education: [
    {
      degree: "BSc Computer Science",
      institution: "University College Dublin",
      years: "2016-2020"
    }
  ],
  cv_pdf: "/public/martin-nolan-cv.pdf"
};

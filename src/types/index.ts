// types/index.ts

export interface MartinInfo {
  bio: string;
  contact: {
    email: string;
    website: string;
  };
  skills: string[];
  experience: Array<{
    role: string;
    company: string;
    years: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    url: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    years: string;
  }>;
  cv_pdf: string;
}

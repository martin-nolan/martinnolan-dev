// Consolidated types from src/types/index.ts
// AboutSection Highlight Type
export interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}
// ResumeModal Props
export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// AI Chat Widget Types
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}
export interface ErrorResponse {
  error?: { message?: string };
}
export interface ChatChoice {
  message: { content: string };
}
export interface ChatOK {
  choices: ChatChoice[];
}

// ProjectsSection Types
export interface FeaturedProject {
  title: string;
  role: string;
  year: string;
  company: string;
  description: string;
  stack: string[];
  highlights: string[];
  images: Array<{ src: string; description: string }>;
  category: string;
}
export interface PersonalProject {
  title: string;
  description: string;
  stack: string[];
  github: string;
  category: string;
}

// WorkSection Types
export interface Experience {
  role: string;
  company: string;
  period: string;
  icon: React.ElementType;
  description: string;
  achievements: string[];
}

// ContactSection Types
export interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  href: string;
  primary: boolean;
}

// Navigation Props
export interface NavigationProps {
  setIsResumeOpen: (open: boolean) => void;
}

// User Info
export interface UserInfo {
  name: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  skills?: string[];
}

// Project Info
export interface Project {
  id?: string;
  name: string;
  description: string;
  url?: string;
  tags?: string[];
  imageUrl?: string;
}

// Toast Message
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// Page Props
export interface PageProps {
  children?: React.ReactNode;
}

// Example: AboutSection Props
export interface AboutSectionProps {
  user: UserInfo;
}

// MartinInfo (existing, extended for compatibility)
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
  projects: Array<Project>;
  education: Array<{
    degree: string;
    institution: string;
    years: string;
  }>;
  cv_pdf: string;
}

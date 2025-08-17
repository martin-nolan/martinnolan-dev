/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvPdfUrl?: string | null;
}

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

export interface Experience {
  role: string;
  company: string;
  period: string;
  icon: React.ElementType;
  description: string;
  achievements: string[];
}

export interface ContactMethod {
  icon: string; // Icon name as string, not React component
  title: string;
  description: string;
  value: string;
  href: string;
  primary: boolean;
}

export interface NavigationProps {
  setIsResumeOpen: (open: boolean) => void;
}

export interface UserInfo {
  name: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  skills?: string[];
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  url?: string;
  tags?: string[];
  imageUrl?: string;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface PageProps {
  children?: React.ReactNode;
}

export interface AboutSectionProps {
  profile?: {
    fullName?: string;
    bio?: string;
    skills?: string[];
    [key: string]: any;
  } | null;
}

// CMS Data Types
export interface CMSProfile {
  name: string;
  bio: string;
  email: string;
  website?: string;
  linkedin?: string;
  github?: string;
  jobTitle?: string;
  company?: string;
  skills: string[];
  cvPdf?: string | null;
}

export interface CMSExperience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface CMSFeaturedProject {
  title: string;
  role: string;
  year: string;
  company: string;
  description: string;
  stack: string[];
  highlights: string[];
  category: string;
}

export interface CMSPersonalProject {
  title: string;
  description: string;
  stack: string[];
  category: string;
}

export interface CMSMediaFile {
  id: number;
  name: string;
  url: string | null;
  alternativeText?: string;
  caption?: string;
  mime: string;
  size: number;
  width?: number;
  height?: number;
}

export interface CMSContentForAI {
  profile: CMSProfile;
  experiences: CMSExperience[];
  featuredProjects: CMSFeaturedProject[];
  personalProjects: CMSPersonalProject[];
}

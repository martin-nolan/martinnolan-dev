// All type definitions in one place
import React from 'react';

// Re-export Strapi types from dedicated file
export * from './strapi';

// Import processed types for backward compatibility
import type {
  ProcessedProfile,
  ProcessedExperience,
  ProcessedFeaturedProject,
  ProcessedPersonalProject,
} from './strapi';

// CMS-related types (aliases for backward compatibility)
export type CMSProfile = ProcessedProfile;
export type CMSExperience = ProcessedExperience;
export type CMSFeaturedProject = ProcessedFeaturedProject;
export type CMSPersonalProject = ProcessedPersonalProject;

// UI component types
export interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvPdfUrl?: string | null;
  cvText?: string | null;
}

export interface NavigationProps {
  setIsResumeOpen: (open: boolean) => void;
}

export interface AboutSectionProps {
  profile?: {
    fullName?: string;
    bio?: string;
    skills?: string[];
  } | null;
}

export interface AdditionalProject {
  title: string;
  description: string;
  stack: string[];
  type: 'work' | 'personal';
  year?: string;
  company?: string;
  role?: string;
  category: string;
  highlights?: string[];
  images?: Array<{ src: string; description: string }>;
  github?: string | null;
  liveUrl?: string | null;
}

// API types
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

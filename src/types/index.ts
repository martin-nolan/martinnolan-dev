// All type definitions in one place
import React from 'react';

// Strapi API response types
export interface StrapiMediaAttributes {
  name: string;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  mime: string;
  size: number;
  width?: number | null;
  height?: number | null;
}

export interface StrapiMedia {
  id: number;
  attributes: StrapiMediaAttributes;
}

export interface StrapiResponse<T> {
  id: number;
  attributes: T;
}

// Strapi can return either array directly or wrapped in data
export type StrapiCollectionResponse<T> = StrapiResponse<T>[] | { data: StrapiResponse<T>[] };
export type StrapiSingleResponse<T> = StrapiResponse<T> | { data: StrapiResponse<T> };

// Shorthand aliases for cleaner code
export type StrapiCollection<T> = StrapiCollectionResponse<T>;
export type StrapiSingle<T> = StrapiSingleResponse<T>;

// Strapi content type attributes
export interface StrapiProfileAttributes {
  fullName: string;
  title: string;
  company: string;
  bio: unknown; // blocks type
  heroTitle: string;
  heroSubtitle: string;
  tagline?: string | null;
  email: string;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  skills: string[]; // json type
  cvPdf?: { data: StrapiMedia | null };
}

export interface StrapiExperienceAttributes {
  role: string;
  company: string;
  period: string;
  description: unknown; // blocks type
  achievements?: unknown; // component type
  order: number;
}

export interface StrapiProjectAttributes {
  title: string;
  description: string;
  image?: { data: StrapiMedia[] | null };
  imageCaption?: string | null;
  projectType: 'work' | 'personal';
  featured: boolean;
  order: number;
  github?: string | null;
  liveUrl?: string | null;
  technologies: string[]; // json type
  highlights: string[]; // json type
  hasImages: boolean;
}

export interface StrapiContactMethodAttributes {
  title: string;
  description: string;
  value: string;
  href: string;
  icon?: string | null;
  primary: boolean;
  order: number;
}

// CMS-related types
export interface CMSProfile {
  name: string;
  title: string;
  company: string;
  bio: string;
  heroTitle: string;
  heroSubtitle: string;
  tagline?: string | null;
  email: string;
  website?: string | null;
  linkedin?: string;
  github?: string;
  seoTitle: string;
  seoDescription: string;
  skills: string[];
  cvPdf?: string | null;
}

export interface CMSExperience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  order: number;
}

export interface CMSFeaturedProject {
  id: number;
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  images: Array<{ src: string; description: string }>;
  github?: string | null;
  liveUrl?: string | null;
  order: number;
}

export interface CMSPersonalProject {
  id: number;
  title: string;
  description: string;
  stack: string[];
  github?: string | null;
  liveUrl?: string | null;
  order: number;
}

export interface CMSContactMethod {
  id: number;
  title: string;
  description: string;
  value: string;
  href: string;
  icon?: string | null;
  primary?: boolean | null;
  order: number;
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
  github?: string;
  liveUrl?: string;
}

export interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  value: string;
  href: string;
  primary: boolean;
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

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
export interface BioBlock {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

export interface CvPdf {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: object | null; // This can be further defined if needed
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: object | null; // This can be further defined if needed
  createdAt: string;
  updatedAt: string;
}

export interface StrapiProfileAttributes {
  fullName: string;
  title: string;
  company: string;
  bio: BioBlock[];
  heroTitle: string;
  heroSubtitle: string;
  tagline: string | null;
  email: string;
  website: string | null;
  linkedin: string;
  github: string;
  seoTitle: string;
  seoDescription: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cvPdf: { data: { id: number, attributes: CvPdf } };
}

export interface ProfileData {
  id: number;
  attributes: StrapiProfileAttributes;
}

export interface ProfileResponse {
  data: ProfileData;
  meta: object;
}

export interface StrapiExperienceAttributes {
  role: string;
  company: string;
  period: string;
  description: BioBlock[];
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ExperienceResponse {
  data: {
    id: number;
    attributes: StrapiExperienceAttributes;
  }[];
  meta: object;
}

export interface StrapiProjectAttributes {
  title: string;
  description: string;
  imageCaption: string | null;
  projectType: 'work' | 'personal';
  featured: boolean;
  order: number;
  github: string | null;
  liveUrl: string | null;
  technologies: string[];
  highlights: string[];
  hasImages: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: { data: StrapiMedia[] | null };
}

export interface ProjectResponse {
  data: {
    id: number;
    attributes: StrapiProjectAttributes;
  }[];
  meta: object;
}

export interface StrapiContactMethodAttributes {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: string | null;
  primary: boolean | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ContactMethodResponse {
  data: {
    id: number;
    attributes: StrapiContactMethodAttributes;
  }[];
  meta: object;
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
  github: string | null;
  title: string;
  role: string;
  year: string;
  company: string;
  description: string;
  stack: string[];
  highlights: string[];
  images: Array<{ src: string; description: string }>;
  category: string;
  liveUrl?: string;
}

export interface PersonalProject {
  title: string;
  description: string;
  stack: string[];
  github: string;
  category: string;
  liveUrl?: string;
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

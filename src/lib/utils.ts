import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type {
  ProcessedFeaturedProject,
  ProcessedPersonalProject,
  AdditionalProject,
} from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Project utilities (consolidated from project-utils.ts)

/**
 * Converts legacy project types to unified AdditionalProject format
 */
export function convertToUnifiedProjects(
  featuredProjects?: ProcessedFeaturedProject[] | null,
  personalProjects?: ProcessedPersonalProject[] | null
): AdditionalProject[] {
  const workProjects: AdditionalProject[] = (featuredProjects || []).map((project) => ({
    title: project.title,
    description: project.description,
    stack: project.stack,
    type: 'work' as const,
    year: '2024', // Default year for work projects
    company: 'Sky UK', // Default company for work projects
    role: 'Gen AI Engineer', // Default role
    category: 'AI/ML', // Default category
    highlights: project.highlights,
    images: project.images,
    github: project.github,
    liveUrl: project.liveUrl,
  }));

  const personalProjectsConverted: AdditionalProject[] = (personalProjects || []).map(
    (project) => ({
      title: project.title,
      description: project.description,
      stack: project.stack,
      type: 'personal' as const,
      category: 'Personal', // Default category for personal projects
      github: project.github,
      liveUrl: project.liveUrl,
    })
  );

  return [...workProjects, ...personalProjectsConverted];
}

/**
 * Separates projects based on whether they have images
 */
export function separateProjectsByImages(projects: AdditionalProject[]) {
  const projectsWithImages = projects.filter(
    (project) => project.images && project.images.length > 0
  );
  const projectsWithoutImages = projects.filter(
    (project) => !project.images || project.images.length === 0
  );

  return { projectsWithImages, projectsWithoutImages };
}

/**
 * Gets the appropriate badge styling for project type
 */
export function getProjectTypeBadgeStyle(type: 'work' | 'personal') {
  return type === 'work'
    ? 'bg-blue-600 text-white hover:bg-blue-600'
    : 'bg-purple-600 text-white hover:bg-purple-600';
}

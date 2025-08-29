import { clientEnv, serverEnv } from './env';

import type {
  ProcessedProfile,
  ProcessedExperience,
  ProcessedFeaturedProject,
  ProcessedPersonalProject,
  ProcessedContactMethod,
  ProcessedContentForAI,
  StrapiProfileResponse,
  StrapiExperiencesResponse,
  StrapiProjectsResponse,
  StrapiContactMethodsResponse,
  ProcessedProjectImage,
} from '@/types';
import { blocksToText, parseImageCaptions } from '@/types';

/**
 * Simple CMS Client with proper TypeScript types
 * Handles both authenticated (server) and public (client) requests
 */
class SimpleCMSClient {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`CMS request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async getProfile(): Promise<ProcessedProfile> {
    const response = await this.fetch<StrapiProfileResponse>('/profile?populate=*');
    const profile = response.data;

    const bioText = blocksToText(profile.bio);

    return {
      name: profile.fullName || 'Martin Nolan',
      title: profile.title || '',
      company: profile.company || '',
      bio: bioText,
      heroTitle: profile.heroTitle || profile.fullName || 'Martin Nolan',
      heroSubtitle: profile.heroSubtitle || profile.title || '',
      tagline: profile.tagline,
      email: profile.email || '',
      website: profile.website,
      linkedin: profile.linkedin || '',
      github: profile.github || '',
      seoTitle: profile.seoTitle || profile.fullName || 'Martin Nolan',
      seoDescription: profile.seoDescription || bioText,
      skills: profile.skills || [],
      cvPdf: profile.cvPdf?.url
        ? profile.cvPdf.url.startsWith('http')
          ? profile.cvPdf.url
          : `${this.baseUrl}${profile.cvPdf.url}`
        : null,
    };
  }

  async getExperiences(): Promise<ProcessedExperience[]> {
    const response = await this.fetch<StrapiExperiencesResponse>('/experiences?sort=order:asc');

    return response.data.map((experience) => {
      const descriptionText = blocksToText(experience.description);

      return {
        id: experience.id,
        role: experience.role || '',
        company: experience.company || '',
        period: experience.period || '',
        description: descriptionText,
        order: experience.order || 0,
      };
    });
  }

  async getFeaturedProjects(): Promise<ProcessedFeaturedProject[]> {
    const response = await this.fetch<StrapiProjectsResponse>(
      '/all-projects?populate=*&sort=order:asc&filters[featured][$eq]=true'
    );

    return response.data.map((project) => {
      // Parse imageCaption string into a map: filename -> caption
      const captionMap = parseImageCaptions(project.imageCaption);

      const images: ProcessedProjectImage[] =
        project.image?.map((img) => {
          // Prefer img.name if available, fallback to filename from url
          const filename = (img.name ? img.name : img.url?.split('/').pop() || '').trim();
          // Try to match with captionMap, fallback to alternativeText
          let description = captionMap[filename] || img.alternativeText || '';
          // If no caption found in development, show debugging info
          if (
            !description &&
            process.env.NODE_ENV === 'development' &&
            Object.keys(captionMap).length > 0
          ) {
            description = `No caption for ${filename} (captionMap keys: ${Object.keys(captionMap).join(', ')})`;
          }
          return {
            src: img.url.startsWith('http') ? img.url : `${this.baseUrl}${img.url}`,
            description,
          };
        }) || [];

      return {
        id: project.id,
        title: project.title || '',
        description: project.description || '',
        stack: project.technologies || [],
        highlights: project.highlights || [],
        github: project.github || null,
        liveUrl: project.liveUrl || null,
        order: project.order || 0,
        images,
      };
    });
  }

  async getPersonalProjects(): Promise<ProcessedPersonalProject[]> {
    const response = await this.fetch<StrapiProjectsResponse>(
      '/all-projects?populate=*&sort=order:asc&filters[projectType][$eq]=personal&filters[featured][$eq]=false'
    );

    return response.data.map((project) => ({
      id: project.id,
      title: project.title || '',
      description: project.description || '',
      stack: project.technologies || [],
      github: project.github || null,
      liveUrl: project.liveUrl || null,
      order: project.order || 0,
    }));
  }

  async getContactMethods(): Promise<ProcessedContactMethod[]> {
    const response = await this.fetch<StrapiContactMethodsResponse>(
      '/contact-methods?sort=order:asc'
    );

    return response.data.map((method) => ({
      id: method.id,
      title: method.title || '',
      description: method.description || '',
      value: method.value || '',
      href: method.href || method.value || '',
      icon: method.icon || null,
      primary: method.primary || null,
      order: method.order || 0,
    }));
  }

  async getAllContentForAI(): Promise<ProcessedContentForAI> {
    const [profile, experiences, featuredProjects, personalProjects] = await Promise.all([
      this.getProfile(),
      this.getExperiences(),
      this.getFeaturedProjects(),
      this.getPersonalProjects(),
    ]);

    return { profile, experiences, featuredProjects, personalProjects };
  }
}

/**
 * Client-side CMS instance (public access only)
 */
export const cmsClient = clientEnv.strapi?.apiUrl
  ? new SimpleCMSClient(clientEnv.strapi.apiUrl)
  : null;

/**
 * Server-side CMS instance (authenticated access)
 * ⚠️ Only use in server-side code!
 */
export const serverCmsClient = serverEnv.strapi?.apiUrl
  ? new SimpleCMSClient(serverEnv.strapi.apiUrl, serverEnv.strapi.apiToken)
  : null;

/**
 * Simple server-side CMS functions
 */
export const serverCms = {
  getProfile: () => serverCmsClient?.getProfile() || Promise.resolve(null),
  getExperiences: () => serverCmsClient?.getExperiences() || Promise.resolve([]),
  getFeaturedProjects: () => serverCmsClient?.getFeaturedProjects() || Promise.resolve([]),
  getPersonalProjects: () => serverCmsClient?.getPersonalProjects() || Promise.resolve([]),
  getContactMethods: () => serverCmsClient?.getContactMethods() || Promise.resolve([]),
  getAllContentForAI: () => serverCmsClient?.getAllContentForAI() || Promise.resolve(null),
};

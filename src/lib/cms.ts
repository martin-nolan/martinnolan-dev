import { clientEnv, serverEnv } from './env';

import type {
  CMSProfile,
  CMSExperience,
  CMSFeaturedProject,
  CMSPersonalProject,
  CMSContactMethod,
  CMSContentForAI,
  StrapiSingle,
  StrapiCollection,
  StrapiSingleResponse,
  StrapiCollectionResponse,
  StrapiProfileAttributes,
  StrapiExperienceAttributes,
  StrapiProjectAttributes,
  StrapiContactMethodAttributes,
  StrapiResponse,
  StrapiMedia,
} from '@/types';

/**
 * Simple CMS Client
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

  private extractSingleData<T>(response: StrapiSingleResponse<T>): StrapiResponse<T> {
    return 'data' in response ? response.data : response;
  }

  private extractCollectionData<T>(response: StrapiCollectionResponse<T>): StrapiResponse<T>[] {
    return Array.isArray(response) ? response : response.data;
  }

  async getProfile(): Promise<CMSProfile> {
    const response = await this.fetch<StrapiSingle<StrapiProfileAttributes>>('/profile?populate=*');
    const data = this.extractSingleData(response);
    const attrs = data.attributes as StrapiProfileAttributes;

    return {
      name: attrs.fullName || 'Martin Nolan',
      title: attrs.title || '',
      company: attrs.company || '',
      bio: typeof attrs.bio === 'string' ? attrs.bio : '',
      heroTitle: attrs.heroTitle || attrs.fullName || 'Martin Nolan',
      heroSubtitle: attrs.heroSubtitle || attrs.title || '',
      tagline: attrs.tagline || null,
      email: attrs.email || '',
      website: attrs.website || null,
      linkedin: attrs.linkedin || '',
      github: attrs.github || '',
      seoTitle: attrs.seoTitle || attrs.fullName || 'Martin Nolan',
      seoDescription: attrs.seoDescription || (typeof attrs.bio === 'string' ? attrs.bio : ''),
      skills: attrs.skills || [],
      cvPdf: attrs.cvPdf?.data?.attributes?.url || null,
    };
  }

  async getExperiences(): Promise<CMSExperience[]> {
    const response = await this.fetch<StrapiCollection<StrapiExperienceAttributes>>(
      '/experiences?sort=order:asc'
    );
    const data = this.extractCollectionData(response);
    return data.map((item) => {
      const attrs = item.attributes as StrapiExperienceAttributes;
      return {
        id: item.id,
        role: attrs.role || '',
        company: attrs.company || '',
        period: attrs.period || '',
        description: typeof attrs.description === 'string' ? attrs.description : '',
        order: attrs.order || 0,
      };
    });
  }

  async getFeaturedProjects(): Promise<CMSFeaturedProject[]> {
    const response = await this.fetch<StrapiCollection<StrapiProjectAttributes>>(
      '/all-projects?populate=*&sort=order:asc&filters[featured][$eq]=true'
    );
    const data = this.extractCollectionData(response);
    return data.map((item) => {
      const attrs = item.attributes as StrapiProjectAttributes;
      return {
        id: item.id,
        title: attrs.title || '',
        description: attrs.description || '',
        stack: attrs.technologies || [],
        highlights: attrs.highlights || [],
        githubUrl: attrs.github || '',
        liveUrl: attrs.liveUrl || '',
        order: attrs.order || 0,
        images:
          attrs.image?.data?.map((img: StrapiMedia) => ({
            src: img.attributes.url,
            description: img.attributes.alternativeText || attrs.title,
          })) || [],
      };
    });
  }

  async getPersonalProjects(): Promise<CMSPersonalProject[]> {
    const response = await this.fetch<StrapiCollection<StrapiProjectAttributes>>(
      '/all-projects?populate=*&sort=order:asc&filters[projectType][$eq]=personal&filters[featured][$eq]=false'
    );
    const data = this.extractCollectionData(response);
    return data.map((item) => {
      const attrs = item.attributes as StrapiProjectAttributes;
      return {
        id: item.id,
        title: attrs.title || '',
        description: attrs.description || '',
        stack: attrs.technologies || [],
        githubUrl: attrs.github || '',
        liveUrl: attrs.liveUrl || '',
        order: attrs.order || 0,
      };
    });
  }

  async getContactMethods(): Promise<CMSContactMethod[]> {
    const response = await this.fetch<StrapiCollection<StrapiContactMethodAttributes>>(
      '/contact-methods?sort=order:asc'
    );
    const data = this.extractCollectionData(response);
    return data.map((item) => {
      const attrs = item.attributes as StrapiContactMethodAttributes;
      return {
        id: item.id,
        title: attrs.title || '',
        description: attrs.description || '',
        value: attrs.value || '',
        href: attrs.href || attrs.value || '',
        icon: attrs.icon || null,
        primary: attrs.primary || null,
        order: attrs.order || 0,
      };
    });
  }

  async getAllContentForAI(): Promise<CMSContentForAI> {
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
export const cmsClient = new SimpleCMSClient(clientEnv.strapi.apiUrl);

/**
 * Server-side CMS instance (authenticated access)
 * ⚠️ Only use in server-side code!
 */
export const serverCmsClient = new SimpleCMSClient(
  serverEnv.strapi.apiUrl,
  serverEnv.strapi.apiToken
);

/**
 * Simple server-side CMS functions
 */
export const serverCms = {
  getProfile: () => serverCmsClient.getProfile(),
  getExperiences: () => serverCmsClient.getExperiences(),
  getFeaturedProjects: () => serverCmsClient.getFeaturedProjects(),
  getPersonalProjects: () => serverCmsClient.getPersonalProjects(),
  getContactMethods: () => serverCmsClient.getContactMethods(),
  getAllContentForAI: () => serverCmsClient.getAllContentForAI(),
};

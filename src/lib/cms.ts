import { clientEnv, serverEnv } from './env';

import type {
  CMSProfile,
  CMSExperience,
  CMSFeaturedProject,
  CMSPersonalProject,
  CMSContactMethod,
  CMSContentForAI,
  StrapiSingleResponse,
  StrapiCollectionResponse,
  StrapiResponse,
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

  /**
   * Convert Strapi blocks format to plain text
   */
  private blocksToText(blocks: any): string {
    if (typeof blocks === 'string') return blocks;
    if (!Array.isArray(blocks)) return '';

    return blocks
      .map((block: any) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
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
    const response = await this.fetch<any>('/profile?populate=*');
    const data = this.extractSingleData(response);

    // Handle both old (v4) and new (v5) Strapi formats
    const attrs = data.attributes || (data as any);
    const bioText = this.blocksToText(attrs.bio);

    return {
      name: attrs.fullName || 'Martin Nolan',
      title: attrs.title || '',
      company: attrs.company || '',
      bio: bioText,
      heroTitle: attrs.heroTitle || attrs.fullName || 'Martin Nolan',
      heroSubtitle: attrs.heroSubtitle || attrs.title || '',
      tagline: attrs.tagline || null,
      email: attrs.email || '',
      website: attrs.website || null,
      linkedin: attrs.linkedin || '',
      github: attrs.github || '',
      seoTitle: attrs.seoTitle || attrs.fullName || 'Martin Nolan',
      seoDescription: attrs.seoDescription || bioText,
      skills: attrs.skills || [],
      cvPdf: attrs.cvPdf?.url ? (attrs.cvPdf.url.startsWith('http') ? attrs.cvPdf.url : `${this.baseUrl}${attrs.cvPdf.url}`) : null,
    };
  }

  async getExperiences(): Promise<CMSExperience[]> {
    const response = await this.fetch<any>('/experiences?sort=order:asc');
    const data = this.extractCollectionData(response);
    return data.map((item: any) => {
      // Handle both old (v4) and new (v5) Strapi formats
      const attrs = item.attributes || (item as any);
      const descriptionText = this.blocksToText(attrs.description);

      return {
        id: item.id,
        role: attrs.role || '',
        company: attrs.company || '',
        period: attrs.period || '',
        description: descriptionText,
        order: attrs.order || 0,
      };
    });
  }

  async getFeaturedProjects(): Promise<CMSFeaturedProject[]> {
    const response = await this.fetch<any>(
      '/all-projects?populate=*&sort=order:asc&filters[featured][$eq]=true'
    );
    const data = this.extractCollectionData(response);
    return data.map((item: any) => {
      // Handle both old (v4) and new (v5) Strapi formats
      const attrs = item.attributes || (item as any);

      // Parse imageCaption string into a map: filename -> caption
      const captionMap: Record<string, string> = {};
      if (attrs.imageCaption && typeof attrs.imageCaption === 'string') {
        attrs.imageCaption.split('\n').forEach((line: string) => {
          const sepIdx = line.indexOf(':');
          if (sepIdx > 0) {
            const filename = line.slice(0, sepIdx).trim();
            const caption = line.slice(sepIdx + 1).trim();
            if (filename && caption) captionMap[filename] = caption;
          }
        });
      }

      return {
        id: item.id,
        title: attrs.title || '',
        description: attrs.description || '',
        stack: attrs.technologies || [],
        highlights: attrs.highlights || [],
        github: attrs.github || '',
        liveUrl: attrs.liveUrl || '',
        order: attrs.order || 0,
        images:
          attrs.image?.map((img: any) => {
            // Prefer img.name if available, fallback to filename from url
            const filename = (img.name ? img.name : img.url?.split('/').pop() || '').trim();
            // Try to match with captionMap, fallback to alternativeText
            let description = captionMap[filename] || img.alternativeText || '';
            // If no caption found, fallback to debugging info
            if (!description && Object.keys(captionMap).length > 0) {
              description = `No caption for ${filename} (captionMap keys: ${Object.keys(captionMap).join(', ')})`;
            }
            return {
              src: img.url.startsWith('http') ? img.url : `${this.baseUrl}${img.url}`,
              description,
            };
          }) || [],
      };
    });
  }

  async getPersonalProjects(): Promise<CMSPersonalProject[]> {
    const response = await this.fetch<any>(
      '/all-projects?populate=*&sort=order:asc&filters[projectType][$eq]=personal&filters[featured][$eq]=false'
    );
    const data = this.extractCollectionData(response);
    return data.map((item: any) => {
      // Handle both old (v4) and new (v5) Strapi formats
      const attrs = item.attributes || (item as any);
      return {
        id: item.id,
        title: attrs.title || '',
        description: attrs.description || '',
        stack: attrs.technologies || [],
        github: attrs.github || '',
        liveUrl: attrs.liveUrl || '',
        order: attrs.order || 0,
      };
    });
  }

  async getContactMethods(): Promise<CMSContactMethod[]> {
    const response = await this.fetch<any>('/contact-methods?sort=order:asc');
    const data = this.extractCollectionData(response);
    return data.map((item: any) => {
      // Handle both old (v4) and new (v5) Strapi formats
      const attrs = item.attributes || (item as unknown);
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

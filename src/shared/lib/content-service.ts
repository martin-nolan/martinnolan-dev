/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CMSContentForAI } from "../types";

interface StrapiExperience {
  id: number;
  attributes: {
    role: string;
    company: string;
    period: string;
    description: string;
    achievements?: Array<{ achievement: string }>;
    order: number;
  };
}

interface StrapiProject {
  id: number;
  attributes: {
    title: string;
    description: string;
    category?: string;
    role?: string;
    year?: string;
    company?: string;
    github?: string;
    stack?: Array<{ technology: string }>;
    highlights?: Array<{ highlight: string }>;
    images?: any; // More flexible typing for images
    order: number;
  };
}

interface StrapiContactMethod {
  id: number;
  attributes: {
    title: string;
    description: string;
    value: string;
    href: string;
    icon: string;
    primary: boolean;
    order: number;
  };
}

interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width?: number;
  height?: number;
  sizeInBytes?: number;
  provider_metadata?: any;
}

interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
      large?: StrapiMediaFormat;
      medium?: StrapiMediaFormat;
      small?: StrapiMediaFormat;
      thumbnail?: StrapiMediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.STRAPI_API_URL ||
  "http://localhost:1337/api";
const STRAPI_BASE_URL = STRAPI_API_URL.replace("/api", "");
const STRAPI_API_TOKEN =
  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

class ContentService {
  // Helper function to get full media URL from Strapi media object
  private getMediaUrl(
    media: StrapiMedia | string | null | undefined
  ): string | null {
    if (!media) return null;

    if (typeof media === "string") {
      // If it's already a string, check if it's a relative URL
      if (media.startsWith("/")) {
        return `${STRAPI_BASE_URL}${media}`;
      }
      return media; // Assume it's already a full URL
    }

    if (typeof media === "object") {
      // Try both nested (media.attributes.url) and direct (media.url) formats
      const url = media.attributes?.url || (media as any).url;
      if (url && url.startsWith("/")) {
        return `${STRAPI_BASE_URL}${url}`;
      }
      return url || null;
    }

    return null;
  }

  // Helper function to process media array (for project images)
  private processMediaArray(
    mediaArray: any[]
  ): Array<{ src: string; description: string }> {
    if (!Array.isArray(mediaArray)) return [];

    return mediaArray
      .map((item) => {
        if (typeof item === "object") {
          // Handle both nested attributes format and direct format
          const url = this.getMediaUrl(item);
          const altText =
            item.attributes?.alternativeText || item.alternativeText || "";
          const caption = item.attributes?.caption || item.caption || "";

          return url
            ? {
                src: url,
                description: altText || caption,
              }
            : null;
        } else if (typeof item === "string") {
          // String URL
          return {
            src: item.startsWith("/") ? `${STRAPI_BASE_URL}${item}` : item,
            description: "",
          };
        }
        return null;
      })
      .filter(Boolean) as Array<{ src: string; description: string }>;
  }
  // Helper function to convert Strapi rich text to plain text
  private convertRichTextToPlain(richText: any): string {
    if (typeof richText === "string") return richText;
    if (!Array.isArray(richText)) return "";

    return richText
      .map((block: any) => {
        if (block.type === "paragraph" && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      })
      .join("\n\n")
      .trim();
  }

  private async fetchFromStrapi(endpoint: string) {
    if (!STRAPI_API_URL || !STRAPI_API_TOKEN) {
      throw new Error(
        "Strapi configuration missing. Please check your environment variables."
      );
    }

    const url = `${STRAPI_API_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Strapi: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async getProfile() {
    try {
      const data = await this.fetchFromStrapi("/profile?populate=*");
      const profile = data.data;

      if (!profile) {
        throw new Error("No profile data found in CMS");
      }

      // Handle skills - check if profile has attributes or is flat
      let skills: string[] = [];
      const attrs = profile.attributes || profile; // Support both structures

      if (Array.isArray(attrs.skill)) {
        // Strapi repeatable component: array of objects with 'skill' property
        skills = attrs.skill
          .map((s: any) => s.skill || s.name || s)
          .filter(Boolean);
      } else if (attrs.skills) {
        // Fallback for plural or string
        if (Array.isArray(attrs.skills)) {
          skills = attrs.skills
            .map((s: any) => s.skill || s.name || s)
            .filter(Boolean);
        } else if (typeof attrs.skills === "string") {
          skills = attrs.skills
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
      } else if (typeof attrs.skill === "string") {
        // Single string
        skills = attrs.skill
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }

      // Handle CV PDF
      const cvPdf = this.getMediaUrl(attrs.cvPdf?.data || attrs.cvPdf);

      return {
        ...attrs,
        skills,
        bio: this.convertRichTextToPlain(attrs.bio),
        cvPdf,
      };
    } catch (error) {
      console.error("Profile fetch error details:", error);
      throw new Error(
        `Failed to load profile: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getExperiences() {
    try {
      const data = await this.fetchFromStrapi(
        "/experiences?populate=*&sort=order:asc"
      );
      const experiences = data.data || [];

      return experiences.map((exp: StrapiExperience) => {
        const attrs = exp.attributes || exp;
        return {
          ...attrs,
          description: this.convertRichTextToPlain(attrs.description),
          achievements:
            attrs.achievements?.map((a: any) => a.achievement || a) || [],
        };
      });
    } catch (error) {
      console.error("Experiences fetch error:", error);
      // Return empty array instead of throwing - experiences are optional
      return [];
    }
  }

  async getFeaturedProjects() {
    try {
      const data = await this.fetchFromStrapi(
        "/featured-projects?populate=*&sort=order:asc"
      );
      const projects = data.data || [];

      return projects.map((project: StrapiProject) => {
        const attrs = project.attributes || project;

        // Handle images - support both Strapi media and legacy string arrays
        let images: Array<{ src: string; description: string }> = [];

        if (attrs.images) {
          if (Array.isArray(attrs.images)) {
            // Direct array of Strapi media objects
            images = this.processMediaArray(attrs.images);
          } else if (
            typeof attrs.images === "object" &&
            "data" in attrs.images &&
            Array.isArray(attrs.images.data)
          ) {
            // Handle possible { data: [...] } wrapper
            images = this.processMediaArray(attrs.images.data);
          }
        }

        return {
          ...attrs,
          description: this.convertRichTextToPlain(attrs.description),
          stack: attrs.stack?.map((s: any) => s.technology || s) || [],
          highlights: attrs.highlights?.map((h: any) => h.highlight || h) || [],
          images,
        };
      });
    } catch (error) {
      console.error("Featured projects fetch error:", error);
      return [];
    }
  }

  async getPersonalProjects() {
    try {
      const data = await this.fetchFromStrapi(
        "/personal-projects?populate=*&sort=order:asc"
      );
      const projects = data.data || [];

      return projects.map((project: StrapiProject) => {
        const attrs = project.attributes || project;
        return {
          ...attrs,
          description: this.convertRichTextToPlain(attrs.description),
          stack: attrs.stack?.map((s: any) => s.technology || s) || [],
        };
      });
    } catch (error) {
      console.error("Personal projects fetch error:", error);
      return [];
    }
  }

  async getContactMethods() {
    try {
      const data = await this.fetchFromStrapi(
        "/contact-methods?sort=order:asc"
      );
      const methods = data.data || [];

      return methods.map((method: StrapiContactMethod) => {
        const attrs = method.attributes || method;
        return {
          ...attrs,
          // Keep icon as string for JSON serialization, convert to component in React
          icon: attrs.icon || "mail", // Default to 'mail' if null/undefined
        };
      });
    } catch (error) {
      console.error("Contact methods fetch error:", error);
      return [];
    }
  }

  // New method to get media files by folder or category
  async getMediaFiles(folder?: string): Promise<
    Array<{
      id: number;
      name: string;
      url: string | null;
      alternativeText?: string;
      caption?: string;
      mime: string;
      size: number;
      width?: number;
      height?: number;
    }>
  > {
    try {
      let endpoint = "/upload/files";
      if (folder) {
        endpoint += `?filters[folder][name][$eq]=${folder}`;
      }

      const data = await this.fetchFromStrapi(endpoint);
      const files = data || [];

      const mappedFiles = files.map((file: StrapiMedia) => ({
        id: file.id,
        name: file.attributes.name,
        url: this.getMediaUrl(file),
        alternativeText: file.attributes.alternativeText,
        caption: file.attributes.caption,
        mime: file.attributes.mime,
        size: file.attributes.size,
        width: file.attributes.width,
        height: file.attributes.height,
      }));

      return mappedFiles.filter((f: any) => f.url !== null); // Only return files with valid URLs
    } catch (error) {
      console.error("Media files fetch error:", error);
      return [];
    }
  }

  // Helper method to get specific project images by project category
  async getProjectImages(category: string) {
    return this.getMediaFiles(category);
  }

  async getAllContentForAI(): Promise<CMSContentForAI> {
    try {
      const [profile, experiences, featuredProjects, personalProjects] =
        await Promise.all([
          this.getProfile(),
          this.getExperiences(),
          this.getFeaturedProjects(),
          this.getPersonalProjects(),
        ]);

      return {
        profile,
        experiences,
        featuredProjects,
        personalProjects,
      };
    } catch (error) {
      console.error("Error fetching content for AI:", error);
      // Return empty data structure for AI chat to work with
      return {
        profile: {
          name: "Portfolio Owner",
          bio: "Professional portfolio",
          email: "contact@example.com",
          skills: [],
          cvPdf: null,
        },
        experiences: [],
        featuredProjects: [],
        personalProjects: [],
      };
    }
  }
}

export const contentService = new ContentService();

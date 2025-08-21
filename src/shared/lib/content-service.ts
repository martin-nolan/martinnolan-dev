/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CMSContentForAI } from "../types";

interface StrapiExperience {
  id: number;
  documentId: string;
  role: string;
  company: string;
  period: string;
  description: any[]; // Rich text blocks
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  description: string;
  projectType: "work" | "personal";
  featured: boolean;
  order: number;
  github: string | null;
  liveUrl: string | null;
  technologies: string[]; // JSON array
  highlights: string[]; // JSON array
  image: StrapiMedia[] | null;
  imageCaption: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiContactMethod {
  id: number;
  documentId: string;
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

interface StrapiProfile {
  id: number;
  documentId: string;
  fullName: string;
  title: string;
  company: string;
  bio: any[]; // Rich text blocks
  heroTitle: string;
  heroSubtitle: string;
  tagline: string | null;
  email: string;
  website: string | null;
  linkedin: string;
  github: string;
  seoTitle: string;
  seoDescription: string;
  skills: string[]; // JSON array
  cvPdf: StrapiMedia | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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

// Strapi Configuration - All endpoints must come from environment variables
const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_API_URL;
const STRAPI_BASE_URL = STRAPI_API_URL
  ? STRAPI_API_URL.replace("/api", "")
  : "";
// API token is optional - content can be public or require authentication
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
    mediaArray: any[],
    imageCaption?: string | null
  ): Array<{ src: string; description: string }> {
    if (!Array.isArray(mediaArray)) return [];


    // Parse imageCaption string to create a filename -> description mapping
    const captionMap = new Map<string, string>();
    if (imageCaption) {
      const lines = imageCaption.split("\n");
      for (const line of lines) {
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
          const filename = line.substring(0, colonIndex).trim();
          const description = line.substring(colonIndex + 1).trim();
          if (filename && description) {
            // Add the original caption filename
            captionMap.set(filename, description);

            // Also add variations to handle different naming conventions
            const underscoreVersion = filename.replace(/-/g, "_");
            const hyphenVersion = filename.replace(/_/g, "-");

            if (underscoreVersion !== filename) {
              captionMap.set(underscoreVersion, description);
            }
            if (hyphenVersion !== filename) {
              captionMap.set(hyphenVersion, description);
            }
          }
        }
      }
    }

    return mediaArray
      .map((item) => {
        if (typeof item === "object") {
          // Handle both nested attributes format and direct format
          const url = this.getMediaUrl(item);
          const altText =
            item.attributes?.alternativeText || item.alternativeText || "";
          const caption = item.attributes?.caption || item.caption || "";

          // Extract filename from URL for caption mapping
          let description = altText || caption;
          if (url && captionMap.size > 0) {
            const filename = url.split("/").pop()?.split("?")[0]; // Get filename without query params

            // Try exact match first
            if (filename && captionMap.has(filename)) {
              description = captionMap.get(filename) || description;
            } else if (filename) {
              // Try matching without hash suffix (e.g., "notes_a0f91bfad4.png" -> "notes.png")
              const baseFilename = filename.replace(
                /_[a-f0-9]+(\.[^.]+)$/,
                "$1"
              );
              if (captionMap.has(baseFilename)) {
                description = captionMap.get(baseFilename) || description;
              }
            }
          }

          return url
            ? {
                src: url,
                description,
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
    if (!STRAPI_API_URL) {
      throw new Error(
        "Strapi API URL not configured. Please set NEXT_PUBLIC_STRAPI_API_URL or STRAPI_API_URL environment variable."
      );
    }

    const url = `${STRAPI_API_URL}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add authorization if token is available (for private content)
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Strapi: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  }

  async getProfile() {
    try {
      const data = await this.fetchFromStrapi("/profile?populate=*");
      const profile: StrapiProfile = data.data;

      // For single types in Strapi, if no content is created yet, data will be null
      if (!profile) {
        throw new Error("No profile content has been created in Strapi yet");
      }

      // Handle CV PDF
      const cvPdf = this.getMediaUrl(profile.cvPdf);

      return {
        name: profile.fullName,
        title: profile.title,
        company: profile.company,
        bio: this.convertRichTextToPlain(profile.bio),
        heroTitle: profile.heroTitle,
        heroSubtitle: profile.heroSubtitle,
        tagline: profile.tagline || null,
        email: profile.email,
        website: profile.website || null,
        linkedin: profile.linkedin,
        github: profile.github,
        seoTitle: profile.seoTitle,
        seoDescription: profile.seoDescription,
        skills: Array.isArray(profile.skills) ? profile.skills : [],
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
      const data = await this.fetchFromStrapi("/experiences?sort=order:asc");
      const experiences: StrapiExperience[] = data.data || [];

      return experiences.map((experience) => ({
        id: experience.id,
        role: experience.role,
        company: experience.company,
        period: experience.period,
        description: this.convertRichTextToPlain(experience.description),
        order: experience.order,
      }));
    } catch (error) {
      console.error("Experiences fetch error:", error);
      return [];
    }
  }

  async getFeaturedProjects() {
    try {
      // Use the unified all-projects endpoint and filter for featured projects
      const data = await this.fetchFromStrapi(
        "/all-projects?populate=*&filters[featured][$eq]=true&sort=order:asc"
      );
      const projects: StrapiProject[] = data.data || [];

      return projects.map((project) => {
        // Handle images
        let images: Array<{ src: string; description: string }> = [];
        if (project.image && Array.isArray(project.image)) {
          images = this.processMediaArray(project.image, project.imageCaption);
        }

        return {
          id: project.id,
          title: project.title,
          description: project.description,
          stack: Array.isArray(project.technologies)
            ? project.technologies
            : [],
          highlights: Array.isArray(project.highlights)
            ? project.highlights
            : [],
          images,
          github: project.github,
          liveUrl: project.liveUrl,
          order: project.order,
        };
      });
    } catch (error) {
      console.error("Featured projects fetch error:", error);
      return [];
    }
  }

  async getPersonalProjects() {
    try {
      // Use the unified all-projects endpoint and filter for personal projects that are not featured
      const data = await this.fetchFromStrapi(
        "/all-projects?populate=*&filters[projectType][$eq]=personal&filters[featured][$eq]=false&sort=order:asc"
      );
      const projects: StrapiProject[] = data.data || [];

      return projects.map((project) => {
        return {
          id: project.id,
          title: project.title,
          description: project.description,
          stack: Array.isArray(project.technologies)
            ? project.technologies
            : [],
          github: project.github,
          liveUrl: project.liveUrl,
          order: project.order,
        };
      });
    } catch (error) {
      console.error("Personal projects fetch error:", error);
      return [];
    }
  }

  // New unified projects method
  async getProjects() {
    try {
      const data = await this.fetchFromStrapi(
        "/all-projects?populate=*&sort=order:asc"
      );
      const projects: StrapiProject[] = data.data || [];

      return projects.map((project) => {
        // Handle images
        let images: Array<{ src: string; description: string }> = [];
        if (project.image && Array.isArray(project.image)) {
          images = this.processMediaArray(project.image, project.imageCaption);
        }

        return {
          id: project.id,
          title: project.title,
          description: project.description,
          stack: Array.isArray(project.technologies)
            ? project.technologies
            : [],
          highlights: Array.isArray(project.highlights)
            ? project.highlights
            : [],
          images,
          type: project.projectType,
          featured: Boolean(project.featured),
          order: project.order,
          github: project.github || null,
          liveUrl: project.liveUrl || null,
        };
      });
    } catch (error) {
      console.error("All Projects fetch error:", error);
      // Fallback to old methods if unified endpoint doesn't exist yet
      try {
        const [featuredProjects, personalProjects] = await Promise.all([
          this.getFeaturedProjects(),
          this.getPersonalProjects(),
        ]);

        // Convert to unified format
        const workProjects = featuredProjects.map((project: any) => ({
          ...project,
          type: "work",
          featured: true,
        }));

        const personalProjectsConverted = personalProjects.map(
          (project: any) => ({
            ...project,
            type: "personal",
            featured: false,
            highlights: [],
          })
        );

        return [...workProjects, ...personalProjectsConverted];
      } catch (fallbackError) {
        console.error("Fallback projects fetch also failed:", fallbackError);
        return [];
      }
    }
  }

  async getContactMethods() {
    try {
      const data = await this.fetchFromStrapi(
        "/contact-methods?sort=order:asc"
      );
      const methods: StrapiContactMethod[] = data.data || [];

      return methods.map((method) => {
        return {
          id: method.id,
          title: method.title,
          description: method.description,
          value: method.value,
          href: method.href,
          icon: method.icon || "mail", // Default to 'mail' if null/undefined
          primary: method.primary || false,
          order: method.order,
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
          title: "Developer",
          company: "Not Available",
          bio: "Professional portfolio",
          heroTitle: "Professional Developer",
          heroSubtitle: "Building great software",
          email: "contact@example.com",
          seoTitle: "Portfolio",
          seoDescription: "Professional portfolio",
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

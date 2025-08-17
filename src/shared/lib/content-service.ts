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
    images?: Array<{ src: string; description?: string }>;
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

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.STRAPI_API_URL ||
  "http://localhost:1337/api";
const STRAPI_API_TOKEN =
  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

class ContentService {
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

      return {
        ...attrs,
        skills,
        bio: this.convertRichTextToPlain(attrs.bio),
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
        return {
          ...attrs,
          description: this.convertRichTextToPlain(attrs.description),
          stack: attrs.stack?.map((s: any) => s.technology || s) || [],
          highlights: attrs.highlights?.map((h: any) => h.highlight || h) || [],
          images:
            attrs.images?.map((i: any) => ({
              src: i.src || i,
              description: i.description || "",
            })) || [],
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
        };
      });
    } catch (error) {
      console.error("Contact methods fetch error:", error);
      return [];
    }
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
        },
        experiences: [],
        featuredProjects: [],
        personalProjects: [],
      };
    }
  }
}

export const contentService = new ContentService();

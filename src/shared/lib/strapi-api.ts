import {
  STRAPI_CONFIG,
  ProfileSchema,
  ExperienceSchema,
  FeaturedProjectSchema,
  PersonalProjectSchema,
  ContactMethodSchema,
  SEOSettingsSchema,
  StrapiResponse,
  StrapiCollectionResponse,
  type Profile,
  type Experience,
  type FeaturedProject,
  type PersonalProject,
  type ContactMethod,
  type SEOSettings,
} from "./strapi-schemas";

class StrapiAPI {
  private baseURL: string;
  private token?: string;

  constructor() {
    this.baseURL = STRAPI_CONFIG.baseURL;
    this.token = STRAPI_CONFIG.token;
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  // Profile (Single Type)
  async getProfile(): Promise<Profile> {
    const response = await this.fetch<{ data: Profile }>("/profile?populate=*");
    return StrapiResponse(ProfileSchema).parse(response).data;
  }

  // Work Experience (Collection)
  async getExperiences(): Promise<Experience[]> {
    const response = await this.fetch<{ data: Experience[] }>(
      "/experiences?populate=*&sort=order:asc"
    );
    return StrapiCollectionResponse(ExperienceSchema).parse(response).data;
  }

  // Featured Projects (Collection) - Limited to 3 items
  async getFeaturedProjects(): Promise<FeaturedProject[]> {
    const response = await this.fetch<{ data: FeaturedProject[] }>(
      "/featured-projects?populate=*&sort=order:asc&pagination[limit]=3"
    );
    return StrapiCollectionResponse(FeaturedProjectSchema).parse(response).data;
  }

  // Personal Projects (Collection) - Limited to 2 items
  async getPersonalProjects(): Promise<PersonalProject[]> {
    const response = await this.fetch<{ data: PersonalProject[] }>(
      "/personal-projects?populate=*&sort=order:asc&pagination[limit]=2"
    );
    return StrapiCollectionResponse(PersonalProjectSchema).parse(response).data;
  }

  // Contact Methods (Collection)
  async getContactMethods(): Promise<ContactMethod[]> {
    const response = await this.fetch<{ data: ContactMethod[] }>(
      "/contact-methods?populate=*&sort=order:asc"
    );
    return StrapiCollectionResponse(ContactMethodSchema).parse(response).data;
  }

  // SEO Settings (Single Type)
  async getSEOSettings(): Promise<SEOSettings> {
    const response = await this.fetch<{ data: SEOSettings }>(
      "/seo-setting?populate=*"
    );
    return StrapiResponse(SEOSettingsSchema).parse(response).data;
  }

  // Get all content for AI context generation
  async getAllContent() {
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
  }
}

export const strapiAPI = new StrapiAPI();

// Helper functions to transform Strapi data to existing component formats
export const transformProfile = (profile: Profile) => ({
  name: profile.attributes.name,
  bio: profile.attributes.bio,
  email: profile.attributes.email,
  website: profile.attributes.website,
  linkedin: profile.attributes.linkedin,
  github: profile.attributes.github,
  jobTitle: profile.attributes.jobTitle,
  company: profile.attributes.company,
  heroTitle: profile.attributes.heroTitle,
  heroSubtitle: profile.attributes.heroSubtitle,
  skills: profile.attributes.skills?.map((s) => s.skill) || [],
  highlights: profile.attributes.highlights || [],
  cvPdf: profile.attributes.cv_pdf?.data.attributes.url,
});

export const transformExperience = (experience: Experience) => ({
  role: experience.attributes.role,
  company: experience.attributes.company,
  period: experience.attributes.period,
  description: experience.attributes.description,
  icon: experience.attributes.icon,
  achievements:
    experience.attributes.achievements?.map((a) => a.achievement) || [],
});

export const transformFeaturedProject = (project: FeaturedProject) => ({
  title: project.attributes.title,
  role: project.attributes.role,
  year: project.attributes.year,
  company: project.attributes.company,
  description: project.attributes.description,
  category: project.attributes.category,
  stack: project.attributes.stack?.map((s) => s.technology) || [],
  highlights: project.attributes.highlights?.map((h) => h.highlight) || [],
  images:
    project.attributes.images?.data.map((img) => ({
      src: img.attributes.url,
      description: img.attributes.alternativeText || "",
    })) || [],
});

export const transformPersonalProject = (project: PersonalProject) => ({
  title: project.attributes.title,
  description: project.attributes.description,
  category: project.attributes.category,
  github: project.attributes.github,
  stack: project.attributes.stack?.map((s) => s.technology) || [],
});

export const transformContactMethod = (method: ContactMethod) => ({
  title: method.attributes.title,
  description: method.attributes.description,
  value: method.attributes.value,
  href: method.attributes.href,
  icon: method.attributes.icon,
  primary: method.attributes.primary || false,
});

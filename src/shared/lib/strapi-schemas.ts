import { z } from "zod";

// Strapi API Configuration
export const STRAPI_CONFIG = {
  baseURL: process.env.STRAPI_API_URL || "http://localhost:1337/api",
  token: process.env.STRAPI_API_TOKEN,
};

// Zod schemas for type safety
export const ProfileSchema = z.object({
  id: z.number(),
  attributes: z.object({
    name: z.string(),
    jobTitle: z.string(),
    company: z.string(),
    bio: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    email: z.string().email(),
    website: z.string().url(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    skills: z
      .array(
        z.object({
          skill: z.string(),
        })
      )
      .optional(),
    highlights: z
      .array(
        z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
    cv_pdf: z
      .object({
        data: z.object({
          attributes: z.object({
            url: z.string(),
          }),
        }),
      })
      .optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const ExperienceSchema = z.object({
  id: z.number(),
  attributes: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    description: z.string(),
    icon: z.string(),
    achievements: z
      .array(
        z.object({
          achievement: z.string(),
        })
      )
      .optional(),
    order: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const FeaturedProjectSchema = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    role: z.string(),
    year: z.string(),
    company: z.string(),
    description: z.string(),
    category: z.string(),
    stack: z
      .array(
        z.object({
          technology: z.string(),
        })
      )
      .optional(),
    highlights: z
      .array(
        z.object({
          highlight: z.string(),
        })
      )
      .optional(),
    images: z
      .object({
        data: z.array(
          z.object({
            attributes: z.object({
              url: z.string(),
              alternativeText: z.string().optional(),
            }),
          })
        ),
      })
      .optional(),
    order: z.number().optional(),
    featured: z.boolean().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const PersonalProjectSchema = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    github: z.string().url(),
    stack: z
      .array(
        z.object({
          technology: z.string(),
        })
      )
      .optional(),
    order: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const ContactMethodSchema = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    description: z.string(),
    value: z.string(),
    href: z.string(),
    icon: z.string(),
    primary: z.boolean().optional(),
    order: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const SEOSettingsSchema = z.object({
  id: z.number(),
  attributes: z.object({
    siteTitle: z.string(),
    siteDescription: z.string(),
    ogImage: z
      .object({
        data: z.object({
          attributes: z.object({
            url: z.string(),
          }),
        }),
      })
      .optional(),
    twitterHandle: z.string().optional(),
    canonicalUrl: z.string().url(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

// Response schemas
export const StrapiResponse = <T>(schema: z.ZodSchema<T>) =>
  z.object({
    data: schema,
    meta: z.object({}).optional(),
  });

export const StrapiCollectionResponse = <T>(schema: z.ZodSchema<T>) =>
  z.object({
    data: z.array(schema),
    meta: z
      .object({
        pagination: z
          .object({
            page: z.number(),
            pageSize: z.number(),
            pageCount: z.number(),
            total: z.number(),
          })
          .optional(),
      })
      .optional(),
  });

// Type exports
export type Profile = z.infer<typeof ProfileSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type FeaturedProject = z.infer<typeof FeaturedProjectSchema>;
export type PersonalProject = z.infer<typeof PersonalProjectSchema>;
export type ContactMethod = z.infer<typeof ContactMethodSchema>;
export type SEOSettings = z.infer<typeof SEOSettingsSchema>;

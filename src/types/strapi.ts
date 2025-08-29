/**
 * Comprehensive Strapi v5 TypeScript Definitions
 * Generated from actual CMS API analysis
 */

// =============================================================================
// CORE STRAPI TYPES
// =============================================================================

/**
 * Base Strapi entity with v5 structure
 */
export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Strapi media/file structure
 */
export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiMedia extends StrapiEntity {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
}

/**
 * Strapi blocks content type (rich text)
 */
export interface StrapiBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code';
  children: Array<{
    text: string;
    type: 'text';
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }>;
  level?: number; // for headings
  format?: 'ordered' | 'unordered'; // for lists
}

/**
 * Strapi API response wrappers
 */
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// =============================================================================
// CONTENT TYPE DEFINITIONS
// =============================================================================

/**
 * Profile content type (single type)
 */
export interface StrapiProfile extends StrapiEntity {
  fullName: string;
  title: string;
  company: string;
  bio: StrapiBlock[];
  heroTitle: string;
  heroSubtitle: string;
  tagline: string | null;
  email: string;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  seoTitle: string;
  seoDescription: string;
  skills: string[];
  cvPdf: StrapiMedia | null;
}

/**
 * Experience content type (collection)
 */
export interface StrapiExperience extends StrapiEntity {
  role: string;
  company: string;
  period: string;
  description: StrapiBlock[];
  order: number;
}

/**
 * All Projects content type (collection)
 * Handles both featured and personal projects
 */
export interface StrapiProject extends StrapiEntity {
  title: string;
  description: string;
  imageCaption: string | null;
  projectType: 'work' | 'personal';
  featured: boolean;
  order: number;
  github: string;
  liveUrl: string;
  technologies: string[];
  highlights: string[];
  hasImages: boolean | null;
  image: StrapiMedia[] | null;
}

/**
 * Contact Methods content type (collection)
 */
export interface StrapiContactMethod extends StrapiEntity {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: string;
  primary: boolean | null;
  order: number;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export type StrapiProfileResponse = StrapiSingleResponse<StrapiProfile>;
export type StrapiExperiencesResponse = StrapiCollectionResponse<StrapiExperience>;
export type StrapiProjectsResponse = StrapiCollectionResponse<StrapiProject>;
export type StrapiContactMethodsResponse = StrapiCollectionResponse<StrapiContactMethod>;

// =============================================================================
// PROCESSED/TRANSFORMED TYPES (for application use)
// =============================================================================

/**
 * Processed profile data for application use
 */
export interface ProcessedProfile {
  name: string;
  title: string;
  company: string;
  bio: string; // converted from blocks to plain text
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
  cvPdf: string | null; // processed URL
}

/**
 * Processed experience data for application use
 */
export interface ProcessedExperience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string; // converted from blocks to plain text
  order: number;
}

/**
 * Processed project image with caption mapping
 */
export interface ProcessedProjectImage {
  src: string;
  description: string;
}

/**
 * Processed featured project data for application use
 */
export interface ProcessedFeaturedProject {
  id: number;
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  images: ProcessedProjectImage[];
  github: string | null;
  liveUrl: string | null;
  order: number;
}

/**
 * Processed personal project data for application use
 */
export interface ProcessedPersonalProject {
  id: number;
  title: string;
  description: string;
  stack: string[];
  github: string | null;
  liveUrl: string | null;
  order: number;
}

/**
 * Processed contact method data for application use
 */
export interface ProcessedContactMethod {
  id: number;
  title: string;
  description: string;
  value: string;
  href: string;
  icon: string | null;
  primary: boolean | null;
  order: number;
}

/**
 * Complete content bundle for AI context
 */
export interface ProcessedContentForAI {
  profile: ProcessedProfile;
  experiences: ProcessedExperience[];
  featuredProjects: ProcessedFeaturedProject[];
  personalProjects: ProcessedPersonalProject[];
}

// =============================================================================
// TYPE GUARDS AND UTILITIES
// =============================================================================

/**
 * Type guard to check if response is a collection
 */
export function isStrapiCollection<T>(
  response: StrapiSingleResponse<T> | StrapiCollectionResponse<T>
): response is StrapiCollectionResponse<T> {
  return Array.isArray((response as StrapiCollectionResponse<T>).data);
}

/**
 * Type guard to check if response is a single item
 */
export function isStrapiSingle<T>(
  response: StrapiSingleResponse<T> | StrapiCollectionResponse<T>
): response is StrapiSingleResponse<T> {
  return !Array.isArray((response as StrapiCollectionResponse<T>).data);
}

/**
 * Extract data from Strapi response (handles both single and collection)
 */
export function extractStrapiData<T>(
  response: StrapiSingleResponse<T> | StrapiCollectionResponse<T>
): T | T[] {
  return response.data;
}

/**
 * Convert Strapi blocks to plain text
 */
export function blocksToText(blocks: StrapiBlock[] | string): string {
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        return block.children.map((child) => child.text || '').join('');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Process image caption string into filename -> caption mapping
 */
export function parseImageCaptions(captionString: string | null): Record<string, string> {
  const captionMap: Record<string, string> = {};

  if (!captionString) return captionMap;

  captionString.split('\n').forEach((line) => {
    const sepIdx = line.indexOf(':');
    if (sepIdx > 0) {
      const filename = line.slice(0, sepIdx).trim();
      const caption = line.slice(sepIdx + 1).trim();
      if (filename && caption) {
        captionMap[filename] = caption;
      }
    }
  });

  return captionMap;
}

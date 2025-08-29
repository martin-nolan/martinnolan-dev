import { serverCms } from './cms';
import { logError } from './logger';

import type { CMSProfile, CMSExperience, CMSFeaturedProject, CMSPersonalProject } from '@/types';

/**
 * Simple AI Context Builder
 * Handles both client and server-side AI prompt building
 */

const safeJoin = (arr?: string[] | null, sep = ', ') =>
  Array.isArray(arr) ? arr.filter(Boolean).join(sep) : '';

/**
 * Server-side AI context builder (direct CMS access)
 * Note: PDF extraction is handled separately in server-side code
 */
export async function buildSystemPromptServer(cvText?: string): Promise<string> {
  try {
    const content = await serverCms.getAllContentForAI();
    const { profile, experiences, featuredProjects, personalProjects } = content;

    // Use provided CV text if available
    const cvDetails =
      cvText && !cvText.startsWith('[Failed')
        ? `\n=== CV DETAILS ===\n${cvText}\n`
        : profile.cvPdf
          ? `\nFull CV (PDF): ${profile.cvPdf}\n`
          : '';

    return buildPromptFromData(profile, experiences, featuredProjects, personalProjects, cvDetails);
  } catch (error) {
    logError('Failed to build server AI prompt', {
      error: error instanceof Error ? error.message : String(error),
    });
    return getFallbackPrompt();
  }
}

/**
 * Build prompt from CMS data
 */
function buildPromptFromData(
  profile: CMSProfile,
  experiences: CMSExperience[],
  featuredProjects: CMSFeaturedProject[],
  personalProjects: CMSPersonalProject[],
  cvDetails = ''
): string {
  const contact = [
    profile.email ? `email ${profile.email}` : '',
    profile.website ? `website ${profile.website}` : '',
    profile.linkedin ? `LinkedIn: ${profile.linkedin}` : '',
    profile.github ? `GitHub: ${profile.github}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  const experiencesBlock =
    experiences.length > 0
      ? experiences
          .map((e) =>
            `- ${e.role} at ${e.company}${e.period ? ` (${e.period})` : ''}: ${e.description}`.trim()
          )
          .join('\n')
      : '[Not available]';

  const featuredBlock =
    featuredProjects.length > 0
      ? featuredProjects
          .map((p) =>
            [
              `- ${p.title}: ${p.description}`.trim(),
              `  Technologies: ${safeJoin(p.stack) || '[Not available]'}`,
              `  Key highlights: ${safeJoin(p.highlights) || '[Not available]'}`,
            ].join('\n')
          )
          .join('\n')
      : '[Not available]';

  const personalBlock =
    personalProjects.length > 0
      ? personalProjects
          .map((p) =>
            [
              `- ${p.title}: ${p.description}`.trim(),
              `  Technologies: ${safeJoin(p.stack) || '[Not available]'}`,
            ].join('\n')
          )
          .join('\n')
      : '[Not available]';

  return `
You are the personal AI assistant for **${profile.name}**.  
Only use the facts provided below.  
If you do not see the answer in these facts, reply politely that you don't have that information.

Bio:
${profile.bio}

Contact: ${contact || '[Not available]'}

${
  profile.title || profile.company
    ? `Current Role: ${profile.title}${profile.company ? ` at ${profile.company}` : ''}`
    : 'Current Role: [Not available]'
}

Key skills: ${safeJoin(profile.skills) || '[Not available]'}

Work Experience:
${experiencesBlock}

Featured Projects:
${featuredBlock}

Personal Projects:
${personalBlock}
${cvDetails}
Write in clear, concise UK English.
  `.trim();
}

/**
 * Fallback prompt when CMS data is unavailable
 */
function getFallbackPrompt(): string {
  return `
You are the personal AI assistant for **Martin Nolan**.  
I'm an Associate Gen AI Software Engineer at Sky UK, specialising in building human-centred AI tools.

If you don't have specific information, please let the user know politely and suggest they can reach out via email at martinnolan_1@hotmail.co.uk.

Write in clear, concise UK English.
  `.trim();
}

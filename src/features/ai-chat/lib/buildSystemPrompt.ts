import { contentService } from "@/shared/lib/content-service";
import type {
  CMSExperience,
  CMSFeaturedProject,
  CMSPersonalProject,
} from "@/shared/types";

export async function buildSystemPrompt(): Promise<string> {
  try {
    const content = await contentService.getAllContentForAI();
    const { profile, experiences, featuredProjects, personalProjects } =
      content;

    return `
You are the personal AI assistant for **${profile.name}**.  
Only use the facts provided below.  
If you do not see the answer in these facts, reply politely that you don't have that information.

Bio:
${profile.bio}

Contact: email ${profile.email} | website ${profile.website}
${profile.linkedin ? `LinkedIn: ${profile.linkedin}` : ""}
${profile.github ? `GitHub: ${profile.github}` : ""}

Current Role: ${profile.jobTitle} at ${profile.company}

Key skills: ${profile.skills.join(", ")}

Work Experience:
${experiences
  .map(
    (e: CMSExperience) => `- ${e.role} at ${e.company} (${e.period}): ${
      e.description
    }
  Key achievements: ${e.achievements.join(", ")}`
  )
  .join("\n")}

Featured Projects:
${featuredProjects
  .map(
    (p: CMSFeaturedProject) => `- ${p.title} (${p.year}, ${p.company}): ${
      p.description
    }
  Role: ${p.role}
  Technologies: ${p.stack.join(", ")}
  Key highlights: ${p.highlights.join(", ")}`
  )
  .join("\n")}

Personal Projects:
${personalProjects
  .map(
    (p: CMSPersonalProject) => `- ${p.title}: ${p.description}
  Technologies: ${p.stack.join(", ")}
  Category: ${p.category}`
  )
  .join("\n")}

${profile.cvPdf ? `Full CV (PDF): ${profile.cvPdf}` : ""}

Write in clear, concise UK English.
    `.trim();
  } catch (error) {
    console.error("Failed to build system prompt from CMS:", error);

    // Fallback to minimal prompt
    return `
You are the personal AI assistant for **Martin Nolan**.  
I'm an Associate Gen AI Software Engineer at Sky UK, specializing in building human-centred AI tools.

I work with technologies like TypeScript, Python, React, Next.js, OpenAI APIs, and Google Cloud Platform.

If you don't have specific information, please let the user know politely and suggest they can reach out via email at martinnolan_1@hotmail.co.uk.

Write in clear, concise UK English.
    `.trim();
  }
}

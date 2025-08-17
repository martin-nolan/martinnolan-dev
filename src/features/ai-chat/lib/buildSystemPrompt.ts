import { contentService } from "@/shared/lib/content-service";

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
    (e) => `- ${e.role} at ${e.company} (${e.period}): ${e.description}
  Key achievements: ${e.achievements.join(", ")}`
  )
  .join("\n")}

Featured Projects:
${featuredProjects
  .map(
    (p) => `- ${p.title} (${p.year}, ${p.company}): ${p.description}
  Role: ${p.role}
  Technologies: ${p.stack.join(", ")}
  Key highlights: ${p.highlights.join(", ")}`
  )
  .join("\n")}

Personal Projects:
${personalProjects
  .map(
    (p) => `- ${p.title}: ${p.description}
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

// Legacy function for backward compatibility
export function buildSystemPromptLegacy(info: any): string {
  return `
You are the personal AI assistant for **Martin Nolan**.  
Only use the facts provided below.  
If you do not see the answer in these facts, reply politely that you don't have that information.

Bio:
${info.bio}

Contact: email ${info.contact.email} | website ${info.contact.website}

Key skills: ${info.skills.join(", ")}

Experience:
${info.experience
  .map((e: any) => `- ${e.role} at ${e.company} (${e.years}): ${e.description}`)
  .join("\n")}

Projects:
${info.projects
  .map((p: any) => `- ${p.name}: ${p.description} (${p.url})`)
  .join("\n")}

Education:
${info.education
  .map((ed: any) => `- ${ed.degree}, ${ed.institution} (${ed.years})`)
  .join("\n")}

Full CV (PDF): ${info.cv_pdf}

Write in clear, concise UK English.
  `.trim();
}

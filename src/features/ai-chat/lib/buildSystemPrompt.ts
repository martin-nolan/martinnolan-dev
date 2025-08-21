import { contentService } from "@/shared/lib/content-service";
import type {
  CMSContentForAI,
  CMSProfile,
  CMSExperience,
  CMSFeaturedProject,
  CMSPersonalProject,
} from "@/shared/types";

const safeJoin = (a?: string[] | null, sep = ", ") =>
  Array.isArray(a) ? a.filter(Boolean).join(sep) : "";

export async function buildSystemPrompt(): Promise<string> {
  try {
    const content =
      (await contentService.getAllContentForAI()) as CMSContentForAI;
    const profile: CMSProfile = content.profile;
    const experiences: CMSExperience[] = Array.isArray(content.experiences)
      ? content.experiences
      : [];
    const featuredProjects: CMSFeaturedProject[] = Array.isArray(
      content.featuredProjects
    )
      ? content.featuredProjects
      : [];
    const personalProjects: CMSPersonalProject[] = Array.isArray(
      content.personalProjects
    )
      ? content.personalProjects
      : [];

    // Try to extract CV text via API route (client-safe)
    let cvDetails = "";
    if (
      profile.cvPdf &&
      typeof profile.cvPdf === "string" &&
      profile.cvPdf.trim()
    ) {
      try {
        const res = await fetch("/api/extract-pdf-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdfUrl: profile.cvPdf }),
        });
        const data = await res.json();
        if (res.ok && data.text && !data.text.startsWith("[Failed")) {
          cvDetails = `\n=== CV DETAILS ===\n${data.text}\n`;
        } else {
          cvDetails = `\nFull CV (PDF): ${profile.cvPdf}\n`;
        }
      } catch {
        cvDetails = `\nFull CV (PDF): ${profile.cvPdf}\n`;
      }
    }

    const contact = [
      profile.email ? `email ${profile.email}` : "",
      profile.website ? `website ${profile.website}` : "",
      profile.linkedin ? `LinkedIn: ${profile.linkedin}` : "",
      profile.github ? `GitHub: ${profile.github}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const experiencesBlock =
      experiences.length > 0
        ? experiences
            .map((e) =>
              `- ${e.role} at ${e.company}${
                e.period ? ` (${e.period})` : ""
              }: ${e.description}`.trim()
            )
            .join("\n")
        : "[Not available]";

    const featuredBlock =
      featuredProjects.length > 0
        ? featuredProjects
            .map((p) => {
              const lines = [
                `- ${p.title}: ${p.description}`.trim(),
                safeJoin(p.stack)
                  ? `  Technologies: ${safeJoin(p.stack)}`
                  : "  Technologies: [Not available]",
                safeJoin(p.highlights)
                  ? `  Key highlights: ${safeJoin(p.highlights)}`
                  : "  Key highlights: [Not available]",
              ];
              return lines.join("\n");
            })
            .join("\n")
        : "[Not available]";

    const personalBlock =
      personalProjects.length > 0
        ? personalProjects
            .map((p) => {
              const lines = [
                `- ${p.title}: ${p.description}`.trim(),
                safeJoin(p.stack)
                  ? `  Technologies: ${safeJoin(p.stack)}`
                  : "  Technologies: [Not available]",
              ];
              return lines.join("\n");
            })
            .join("\n")
        : "[Not available]";

    return `
You are the personal AI assistant for **${profile.name}**.  
Only use the facts provided below.  
If you do not see the answer in these facts, reply politely that you don't have that information.

Bio:
${profile.bio}

Contact: ${contact || "[Not available]"}

${
  profile.title || profile.company
    ? `Current Role: ${profile.title}${
        profile.company ? ` at ${profile.company}` : ""
      }`
    : "Current Role: [Not available]"
}

Key skills: ${safeJoin(profile.skills) || "[Not available]"}

Work Experience:
${experiencesBlock}

Featured Projects:
${featuredBlock}

Personal Projects:
${personalBlock}
${cvDetails}
Write in clear, concise UK English.
    `.trim();
  } catch (error) {
    console.error("Failed to build system prompt from CMS:", error);
    return `
You are the personal AI assistant for **Martin Nolan**.  
I'm an Associate Gen AI Software Engineer at Sky UK, specialising in building human-centred AI tools.

If you don't have specific information, please let the user know politely and suggest they can reach out via email at martinnolan_1@hotmail.co.uk.

Write in clear, concise UK English.
    `.trim();
  }
}

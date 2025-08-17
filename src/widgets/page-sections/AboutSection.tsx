import { Code, Brain, Rocket, Users } from "lucide-react";
import { CardContent, GlassCard } from "@/shared/ui";
import type { AboutSectionProps, Highlight } from "@/shared/types";

const defaultSkills = [
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "TailwindCSS",
  "Google Cloud",
  "OpenAI",
  "LLMs",
  "Full-Stack Development",
  "Stakeholder Management",
  "Agile Product Ownership",
  "Cloud Deployment",
  "Observability",
  "Django",
];

const defaultHighlights: Highlight[] = [
  {
    icon: <Brain className="size-8 text-primary" />,
    title: "Gen AI Development",
    description:
      "Building internal AI-driven platforms with rapid prototyping and user feedback loops.",
  },
  {
    icon: <Code className="size-8 text-accent" />,
    title: "Full-Stack Development",
    description:
      "End-to-end development with Next.js, TypeScript, and TailwindCSS deployed on Google Cloud.",
  },
  {
    icon: <Users className="size-8 text-primary" />,
    title: "Stakeholder Engagement",
    description:
      "Leading ideation sessions and managing product ownership with agile methodologies.",
  },
  {
    icon: <Rocket className="size-8 text-accent" />,
    title: "Cloud Deployment",
    description:
      "Deploying and observing AI solutions on Google Cloud Platform with reliability focus.",
  },
];

const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const skills = profile?.skills ?? defaultSkills;
  const highlights = defaultHighlights;

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            About{" "}
            <span className="gradient-text">
              {profile?.fullName ?? "Martin"}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            {profile?.bio ??
              "Associate Gen AI Software Engineer at Sky UK, building human-centred AI tools that make work more efficient and accessible through rapid demos and feedback loops."}
          </p>
        </div>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="prose prose-lg text-foreground">
              <p className="mb-6 text-lg leading-relaxed">
                {profile?.bio ??
                  "I'm Martin Nolan, an Associate Gen AI Software Engineer at Sky UK. I build human-centred AI tools—covering ideation, stakeholder engagement, full-stack development and Google Cloud deployment—then refine through rapid demos and feedback loops."}
              </p>
            </div>
          </div>

          <GlassCard className="rounded-2xl p-8">
            <h3 className="mb-6 text-center text-2xl font-semibold">
              Technical Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="hover:glow-primary rounded-full border border-surface-border bg-surface px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-surface-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <GlassCard
              key={highlight.title}
              className="group border-surface-border transition-all duration-300 hover:bg-surface-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center transition-transform duration-200 group-hover:scale-110">
                  {highlight.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold">
                  {highlight.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {highlight.description}
                </p>
              </CardContent>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

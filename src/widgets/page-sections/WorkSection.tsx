import { Building2, Users, Code } from "lucide-react";
import { GlassCard, GradientText } from "@/shared/ui";
import type { Experience } from "@/shared/types";
const WorkSection = () => {
  const experiences: Experience[] = [
    {
      role: "Associate Gen AI Software Engineer",
      company: "Sky UK",
      period: "Jul 2025 – Present",
      icon: Code,
      description:
        "Building human-centred AI tools from ideation to deployment on Google Cloud, focusing on internal AI-driven platforms that make work more efficient and accessible.",
      achievements: [
        "Developed Cricket Command Centre with AI live commentary",
        "Built Tough Mutter HR conversation simulator",
        "Created Knowledge Search semantic platform",
        "Delivered News Content Assistant for journalists",
      ],
    },
    {
      role: "Associate Product Owner",
      company: "Sky Go / Comcast",
      period: "Mar 2024 – Sep 2024",
      icon: Users,
      description:
        "Led product strategy and stakeholder management for Sky Go streaming platform, driving user experience improvements and feature development.",
      achievements: [
        "Managed cross-functional teams across multiple time zones",
        "Defined product roadmaps and user stories",
        "Coordinated with Comcast engineering teams",
        "Delivered key streaming platform enhancements",
      ],
    },
    {
      role: "Associate Front-End Developer",
      company: "Sky UK - TV & Content Team",
      period: "Sep 2023 – Mar 2024",
      icon: Building2,
      description:
        "Developed front-end solutions for Sky's TV and content platforms using modern web technologies, focusing on user interface optimization and performance.",
      achievements: [
        "Built responsive TV content interfaces",
        "Optimized platform performance and user experience",
        "Collaborated with design and backend teams",
        "Implemented modern front-end best practices",
      ],
    },
  ];

  return (
    <section id="work" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Professional <GradientText>Experience</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            My journey through Sky UK, from front-end development to AI
            engineering
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <GlassCard
              key={index}
              className="group rounded-2xl p-8 transition-all duration-300 hover:bg-surface-hover"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="shrink-0">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <exp.icon className="size-8 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="mb-1 text-2xl font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-semibold text-primary">
                        {exp.company}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="mt-2 size-2 shrink-0 rounded-full bg-accent"></div>
                        <span className="text-sm text-muted-foreground">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;

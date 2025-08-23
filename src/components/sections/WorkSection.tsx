import { Code, Users } from 'lucide-react';

import type { CMSExperience } from '@/types';
import { GlassCard, GradientText } from '@/ui';

interface WorkSectionProps {
  experiences?: CMSExperience[] | null;
}

const WorkSection = ({ experiences: externalExperiences }: WorkSectionProps) => {
  // Map CMS experiences with appropriate icons (keeping icon system)
  function getIconForRole(role: string) {
    if (/product owner/i.test(role)) return Users;
    if (/software|developer|engineer/i.test(role)) return Code;
    return Code;
  }

  const experiences =
    externalExperiences?.map((exp) => {
      return {
        ...exp,
        icon: getIconForRole(exp.role),
      };
    }) || [];

  return (
    <section id="work" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Professional <GradientText>Experience</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Professional experience and career journey
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
                      <h3 className="mb-1 text-2xl font-bold text-foreground">{exp.role}</h3>
                      <p className="text-lg font-semibold text-primary">{exp.company}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="ml-6 list-disc space-y-2 leading-relaxed text-muted-foreground">
                    {exp.description
                      ?.split('\n')
                      .filter((line) => line.trim())
                      .map((line, lineIndex) => (
                        <li key={lineIndex} className="mb-1">
                          {line.trim()}
                        </li>
                      ))}
                  </ul>
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

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
    <section id="work" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Professional <GradientText>Experience</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl">
            Professional experience and career journey
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <GlassCard
              key={index}
              className="group rounded-xl p-4 transition-all duration-300 hover:bg-surface-hover sm:rounded-2xl sm:p-6 lg:p-8"
            >
              <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start">
                <div className="shrink-0">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20 sm:size-14 lg:size-16">
                    <exp.icon className="size-6 text-primary sm:size-7 lg:size-8" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                        {exp.role}
                      </h3>
                      <p className="text-base font-semibold text-primary sm:text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-block rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent sm:px-4 sm:py-2 sm:text-sm">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="ml-4 list-disc space-y-1.5 text-sm leading-relaxed text-muted-foreground sm:ml-6 sm:space-y-2 sm:text-base">
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

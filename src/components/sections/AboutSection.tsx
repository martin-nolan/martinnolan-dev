import { Code, Brain, Rocket, Users } from 'lucide-react';

import type { AboutSectionProps, Highlight } from '@/types';
import { CardContent, GlassCard } from '@/ui';

// Keep default highlights as they provide good structure when no CMS data
const defaultHighlights: Highlight[] = [
  {
    icon: <Brain className="size-8 text-primary" />,
    title: 'AI Development',
    description: 'Building AI-powered solutions and platforms',
  },
  {
    icon: <Code className="size-8 text-accent" />,
    title: 'Full-Stack Development',
    description: 'End-to-end web development and deployment',
  },
  {
    icon: <Users className="size-8 text-primary" />,
    title: 'Product Management',
    description: 'Stakeholder engagement and agile methodologies',
  },
  {
    icon: <Rocket className="size-8 text-accent" />,
    title: 'Cloud Solutions',
    description: 'Deployment and scaling on cloud platforms',
  },
];

const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const skills = profile?.skills || [];
  const highlights = defaultHighlights;

  return (
    <section id="about" className="px-4 py-12 max-sm:px-6 max-sm:py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center max-sm:mb-10">
          <h2 className="mb-6 text-4xl font-bold max-sm:mb-4 max-sm:text-2xl max-sm:leading-tight sm:text-5xl">
            About <span className="gradient-text">{profile?.fullName ?? 'Martin'}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground max-sm:px-4 max-sm:text-base max-sm:leading-relaxed">
            Professional experience and technical background
          </p>
        </div>

        <div className="mb-16 grid items-center gap-12 max-sm:mb-10 max-sm:gap-8 lg:grid-cols-2">
          <div className="space-y-6 max-sm:space-y-4">
            <div className="prose prose-lg max-sm:prose-base text-foreground">
              {profile?.bio ? (
                profile.bio.split('\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-6 text-lg leading-relaxed max-sm:mb-4 max-sm:text-base max-sm:leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="mb-6 text-lg leading-relaxed max-sm:mb-4 max-sm:text-base max-sm:leading-relaxed">
                  Professional experience and technical background
                </p>
              )}
            </div>
          </div>

          <GlassCard className="rounded-2xl p-8 max-sm:p-6">
            <h3 className="mb-6 text-center text-2xl font-semibold max-sm:mb-4 max-sm:text-xl">
              Technical Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-sm:gap-2">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="hover:glow-primary rounded-full border border-surface-border bg-surface px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-surface-hover max-sm:min-h-[36px] max-sm:px-3 max-sm:py-2 max-sm:text-xs"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-6 max-sm:grid-cols-1 max-sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <GlassCard
              key={highlight.title}
              className="group border-surface-border transition-all duration-300 hover:bg-surface-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center max-sm:p-4">
                <div className="mb-4 flex justify-center transition-transform duration-200 group-hover:scale-110 max-sm:mb-3">
                  <div className="max-sm:scale-90">{highlight.icon}</div>
                </div>
                <h3 className="mb-3 text-lg font-semibold max-sm:mb-2 max-sm:text-base">
                  {highlight.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-sm:text-xs max-sm:leading-relaxed">
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

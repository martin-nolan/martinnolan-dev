import { Github, Calendar, Globe2 } from 'lucide-react';

import { getProjectTypeBadgeStyle } from '@/lib/utils';
import type { AdditionalProject } from '@/types';
import { Badge, ImageCarousel, GlassCard } from '@/ui';

interface ProjectCardProps {
  project: AdditionalProject;
  variant?: 'default' | 'featured';
}

export const ProjectCard = ({ project, variant = 'default' }: ProjectCardProps) => {
  const showImages = variant === 'featured' && project.images && project.images.length > 0;

  return (
    <GlassCard className="group flex h-full flex-col border-surface-border transition-all duration-300 hover:bg-surface-hover">
      {/* Project header with image - only for featured variant */}
      {showImages && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <ImageCarousel
            images={project.images!}
            alt={project.title}
            projectTitle={project.title}
            className="size-full object-cover object-center"
          />
          <div className="absolute left-4 top-4 z-10 flex gap-2">
            <Badge variant="secondary" className={getProjectTypeBadgeStyle(project.type)}>
              {project.type === 'work' ? 'Work' : 'Personal'}
            </Badge>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Header info - only show badge for default variant (featured shows it on image) */}
        <div className="mb-4">
          {!showImages && (
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className={getProjectTypeBadgeStyle(project.type)}>
                {project.type === 'work' ? 'Work' : 'Personal'}
              </Badge>
            </div>
          )}

          <h3 className="mb-2 text-xl font-bold">{project.title}</h3>

          {/* Work project additional info */}
          {project.type === 'work' && (
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {project.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  <span>{project.year}</span>
                </div>
              )}
              {project.company && (
                <span className="font-medium text-primary">{project.company}</span>
              )}
              {project.role && <span className="text-accent">• {project.role}</span>}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 flex-1 leading-relaxed text-muted-foreground">{project.description}</p>

        {/* Highlights for work projects */}
        {project.type === 'work' && project.highlights && project.highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-primary">Key Achievements</h4>
            <ul className="space-y-1">
              {project.highlights.map((highlight, highlightIndex) => (
                <li key={highlightIndex} className="flex items-start text-sm">
                  <div className="mr-2 mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"></div>
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technology stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline" className="border-surface-border text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links for personal projects only */}
        {project.type === 'personal' && project.github && (
          <div className="mt-auto flex gap-4 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="size-4" />
              View Source
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Globe2 className="size-4" aria-label="Live Site" />
                <span>Live Site</span>
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

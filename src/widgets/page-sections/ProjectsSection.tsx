import { Github, Calendar } from "lucide-react";
import { Badge, ImageCarousel, GlassCard, GradientText } from "@/shared/ui";
import type {
  FeaturedProject,
  PersonalProject,
  AdditionalProject,
} from "@/shared/types";

interface ProjectsSectionProps {
  featuredProjects?: FeaturedProject[] | null;
  personalProjects?: PersonalProject[] | null;
  projects?: AdditionalProject[] | null; // New unified projects prop
}

const ProjectsSection = ({
  featuredProjects: externalFeaturedProjects,
  personalProjects: externalPersonalProjects,
  projects: unifiedProjects,
}: ProjectsSectionProps) => {
  let allProjects: AdditionalProject[] = [];

  // Use unified projects if available, otherwise convert from separate types
  if (unifiedProjects && unifiedProjects.length > 0) {
    allProjects = unifiedProjects;
  } else {
    // Fallback: Convert and combine projects into unified format (backward compatibility)
    const workProjects: AdditionalProject[] = (
      externalFeaturedProjects || []
    ).map((project) => ({
      title: project.title,
      description: project.description,
      stack: project.stack,
      type: "work" as const,
      year: project.year,
      company: project.company,
      role: project.role,
      category: project.category,
      highlights: project.highlights,
      images: project.images,
    }));

    const personalProjectsConverted: AdditionalProject[] = (
      externalPersonalProjects || []
    ).map((project) => ({
      title: project.title,
      description: project.description,
      stack: project.stack,
      type: "personal" as const,
      category: project.category,
      github: project.github,
    }));

    allProjects = [...workProjects, ...personalProjectsConverted];
  }

  // Separate projects with and without images for better layout
  const projectsWithImages = allProjects.filter(
    (project) => project.images && project.images.length > 0
  );
  const projectsWithoutImages = allProjects.filter(
    (project) => !project.images || project.images.length === 0
  );

  return (
    <section id="projects" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            <GradientText>Projects</GradientText>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            A mix of professional work and personal projects showcasing
            different technologies and approaches
          </p>
        </div>

        {/* Projects with Images */}
        {projectsWithImages.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-8 text-2xl font-semibold text-center">
              Featured Work
            </h3>
            <div className="grid gap-8 lg:grid-cols-2">
              {projectsWithImages.map((project) => (
                <GlassCard
                  key={`${project.type}-${project.title}`}
                  className="group flex h-full flex-col border-surface-border transition-all duration-300 hover:bg-surface-hover"
                >
                  {/* Project header with image */}
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <ImageCarousel
                      images={project.images!}
                      alt={project.title}
                      projectTitle={project.title}
                      className="size-full object-cover object-center"
                    />
                    <div className="absolute left-4 top-4 z-10 flex gap-2">
                      <Badge
                        variant="secondary"
                        className={
                          project.type === "work"
                            ? "bg-blue-600 text-white hover:bg-blue-600"
                            : "bg-purple-600 text-white hover:bg-purple-600"
                        }
                      >
                        {project.type === "work" ? "Work" : "Personal"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                      <h3 className="mb-2 text-xl font-bold">
                        {project.title}
                      </h3>

                      {/* Work project additional info */}
                      {project.type === "work" && (
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          {project.year && (
                            <div className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              <span>{project.year}</span>
                            </div>
                          )}
                          {project.company && (
                            <span className="font-medium text-primary">
                              {project.company}
                            </span>
                          )}
                          {project.role && (
                            <span className="text-accent">
                              • {project.role}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mb-4 flex-1 leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Highlights for work projects */}
                    {project.type === "work" &&
                      project.highlights &&
                      project.highlights.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-2 text-sm font-semibold text-primary">
                            Key Achievements
                          </h4>
                          <ul className="space-y-1">
                            {project.highlights.map(
                              (highlight, highlightIndex) => (
                                <li
                                  key={highlightIndex}
                                  className="flex items-start text-sm"
                                >
                                  <div className="mr-2 mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"></div>
                                  <span className="text-muted-foreground">
                                    {highlight}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Technology stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-surface-border text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* GitHub link for personal projects only */}
                    {project.type === "personal" && project.github && (
                      <div className="mt-auto pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Github className="size-4" />
                          View Source
                        </a>
                      </div>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Projects without Images */}
        {projectsWithoutImages.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-8 text-2xl font-semibold text-center">
              Additional Projects
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectsWithoutImages.map((project) => (
                <GlassCard
                  key={`${project.type}-${project.title}`}
                  className="group flex h-full flex-col border-surface-border transition-all duration-300 hover:bg-surface-hover"
                >
                  <div className="flex flex-1 flex-col p-6">
                    {/* Header info */}
                    <div className="mb-4">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className={
                            project.type === "work"
                              ? "bg-blue-600 text-white hover:bg-blue-600"
                              : "bg-purple-600 text-white hover:bg-purple-600"
                          }
                        >
                          {project.type === "work" ? "Work" : "Personal"}
                        </Badge>
                      </div>

                      <h3 className="mb-2 text-xl font-bold">
                        {project.title}
                      </h3>

                      {/* Work project additional info */}
                      {project.type === "work" && (
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          {project.year && (
                            <div className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              <span>{project.year}</span>
                            </div>
                          )}
                          {project.company && (
                            <span className="font-medium text-primary">
                              {project.company}
                            </span>
                          )}
                          {project.role && (
                            <span className="text-accent">
                              • {project.role}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mb-4 flex-1 leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Highlights for work projects */}
                    {project.type === "work" &&
                      project.highlights &&
                      project.highlights.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-2 text-sm font-semibold text-primary">
                            Key Achievements
                          </h4>
                          <ul className="space-y-1">
                            {project.highlights.map(
                              (highlight, highlightIndex) => (
                                <li
                                  key={highlightIndex}
                                  className="flex items-start text-sm"
                                >
                                  <div className="mr-2 mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"></div>
                                  <span className="text-muted-foreground">
                                    {highlight}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Technology stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-surface-border text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* GitHub link for personal projects only */}
                    {project.type === "personal" && project.github && (
                      <div className="mt-auto pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Github className="size-4" />
                          View Source
                        </a>
                      </div>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {allProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No projects available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

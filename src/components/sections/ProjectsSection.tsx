import { convertToUnifiedProjects, separateProjectsByImages } from '@/lib/utils';
import type {
  ProcessedFeaturedProject,
  ProcessedPersonalProject,
  AdditionalProject,
} from '@/types';
import { GradientText, ProjectCard } from '@/ui';

interface ProjectsSectionProps {
  featuredProjects?: ProcessedFeaturedProject[] | null;
  personalProjects?: ProcessedPersonalProject[] | null;
  projects?: AdditionalProject[] | null; // New unified projects prop
}

const ProjectsSection = ({
  featuredProjects: externalFeaturedProjects,
  personalProjects: externalPersonalProjects,
  projects: unifiedProjects,
}: ProjectsSectionProps) => {
  // Use unified projects if available, otherwise convert from separate types
  const allProjects =
    unifiedProjects && unifiedProjects.length > 0
      ? unifiedProjects
      : convertToUnifiedProjects(externalFeaturedProjects, externalPersonalProjects);

  // Separate projects with and without images for better layout
  const { projectsWithImages, projectsWithoutImages } = separateProjectsByImages(allProjects);

  return (
    <section id="projects" className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
            <GradientText>Projects</GradientText>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg lg:text-xl">
            A mix of professional work and personal projects showcasing different technologies and
            approaches
          </p>
        </div>

        {/* Projects with Images */}
        {projectsWithImages.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h3 className="mb-6 text-center text-lg font-semibold sm:mb-8 sm:text-xl lg:text-2xl">
              Featured Work
            </h3>
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {projectsWithImages.map((project) => (
                <ProjectCard
                  key={`${project.type}-${project.title}`}
                  project={project}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        )}

        {/* Projects without Images */}
        {projectsWithoutImages.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h3 className="mb-6 text-center text-lg font-semibold sm:mb-8 sm:text-xl lg:text-2xl">
              Additional Projects
            </h3>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectsWithoutImages.map((project) => (
                <ProjectCard key={`${project.type}-${project.title}`} project={project} />
              ))}
            </div>
          </div>
        )}

        {allProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

import { Github, Calendar } from "lucide-react";
import {
  CardContent,
  CardHeader,
  Button,
  Badge,
  ImageCarousel,
  GlassCard,
  GradientText,
} from "@/shared/ui";
import type { FeaturedProject, PersonalProject } from "@/shared/types";

interface ProjectsSectionProps {
  featuredProjects?: FeaturedProject[] | null;
  personalProjects?: PersonalProject[] | null;
}

const ProjectsSection = ({
  featuredProjects: externalFeaturedProjects,
  personalProjects: externalPersonalProjects,
}: ProjectsSectionProps) => {
  const defaultFeaturedProjects: FeaturedProject[] = [
    {
      title: "Cricket Command Centre",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description:
        "AI-powered live commentary generation from real-time cricket feeds, providing engaging automated coverage for viewers.",
      stack: ["Python", "OpenAI", "Real-time APIs", "Google Cloud"],
      highlights: [
        "Real-time AI commentary generation",
        "Seamless integration with live feeds",
        "Enhanced viewer engagement",
      ],
      images: [
        {
          src: "/cricket/matches.png",
          description: "Main dashboard UI for live cricket commentary.",
        },
        {
          src: "/cricket/commentary.png",
          description: "AI-generated commentary for live cricket matches.",
        },
        {
          src: "/cricket/bbb-table.png",
          description: "Main dashboard UI for live cricket commentary.",
        },
        {
          src: "/cricket/teams-table.png",
          description: "Main dashboard UI for live cricket commentary.",
        },
        {
          src: "/cricket/notes.png",
          description: "Main dashboard UI for live cricket commentary.",
        },
      ],
      category: "AI/ML",
    },
    {
      title: "Knowledge Search Platform",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description:
        "Semantic search platform for contact-centre policies, enabling support agents to quickly find relevant information.",
      stack: ["TypeScript", "Next.js", "Vector Search", "Google Cloud"],
      highlights: [
        "Semantic search capabilities",
        "Improved agent efficiency",
        "Centralized policy access",
      ],
      images: [
        {
          src: "/kosmo/ask-kosmo.png",
          description: "Draft email UI with AI suggestions.",
        },
        {
          src: "/kosmo/landing.png",
          description: "Landing page UI for customer support.",
        },
        {
          src: "/kosmo/q-and-a.png",
          description: "Draft email UI with AI suggestions.",
        },
      ],
      category: "Search",
    },
    {
      title: "Customer Response Assistant",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description:
        "Generative email-drafting tool for support workflows, helping agents craft personalized responses efficiently.",
      stack: ["React", "TypeScript", "OpenAI", "Google Cloud"],
      highlights: [
        "Automated email drafting",
        "Personalized customer responses",
        "Streamlined support workflows",
      ],
      images: [
        {
          src: "/mail/email.png",
          description: "Draft email UI with AI suggestions.",
        },
        {
          src: "/mail/refinement.png",
          description: "Landing page UI for customer support.",
        },
      ],
      category: "AI Tools",
    },
    {
      title: "Tough Mutter",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description: "UPDATE.",
      stack: ["UPDATE", "OpenAI", "UPDATE", "UPDATE"],
      highlights: ["UPDATE", "UPDATE", "UPDATE"],
      images: [
        {
          src: "/mutter/landing-page.png",
          description: "UPDATE.",
        },
        {
          src: "/mutter/conversation.png",
          description: "UPDATE.",
        },
      ],
      category: "UPDATE",
    },
    {
      title: "Sky News Search",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description: "UPDATE.",
      stack: ["UPDATE", "OpenAI", "UPDATE", "UPDATE"],
      highlights: ["UPDATE", "UPDATE", "UPDATE"],
      images: [
        {
          src: "/news/article.png",
          description: "UPDATE.",
        },
        {
          src: "/news/agent.png",
          description: "UPDATE.",
        },
      ],
      category: "UPDATE",
    },
  ];

  const personalProjects: PersonalProject[] = [
    {
      title: "inTENt-Fitness",
      description:
        "Alexa skill delivering quick 10-minute workouts or guided meditations for busy lifestyles.",
      stack: ["Python", "Alexa Skills Kit", "AWS Lambda"],
      github: "https://github.com/martin-nolan",
      category: "Voice UI",
    },
    {
      title: "Blockchain Marketplace",
      description:
        "Web3 marketplace demo on Polygon Testnet using Moralis & MetaMask integration.",
      stack: ["React", "Web3", "Moralis", "MetaMask"],
      github: "https://github.com/martin-nolan",
      category: "Web3",
    },
    {
      title: "SGame",
      description:
        "Distributed, horizontally-scalable proof-of-concept game server architecture.",
      stack: ["Python", "Distributed Systems", "Microservices"],
      github: "https://github.com/martin-nolan",
      category: "Gaming",
    },
    {
      title: "Glasgo AR",
      description:
        "AR app concept for exploring the University of Glasgow campus with interactive features.",
      stack: ["Unity", "ARKit", "C#"],
      github: "https://github.com/martin-nolan",
      category: "AR",
    },
  ];

  // Use external data if provided, otherwise use defaults
  const featuredProjects =
    externalFeaturedProjects && externalFeaturedProjects.length > 0
      ? externalFeaturedProjects
      : defaultFeaturedProjects;

  const personalProjectsToRender =
    externalPersonalProjects && externalPersonalProjects.length > 0
      ? externalPersonalProjects
      : personalProjects;

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
              Featured <GradientText>Work</GradientText>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Transforming Sky's digital ecosystem with AI-powered solutions
              that delight millions of users.
            </p>
          </div>

          <div className="space-y-12">
            {featuredProjects.map((project, index) => (
              <GlassCard
                key={project.title}
                className="group overflow-hidden border-surface-border transition-all duration-500 hover:bg-surface-hover"
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative flex aspect-video size-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <ImageCarousel
                        images={project.images}
                        alt={project.title}
                        projectTitle={project.title}
                        className="size-full object-cover object-center"
                      />
                      <div className="absolute left-4 top-4 z-10 flex">
                        <Badge
                          variant="secondary"
                          className="bg-primary text-white"
                        >
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? "p-8 lg:order-1" : "p-8"}>
                    <div className="mb-3 flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {project.year}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {project.company}
                      </span>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
                    <p className="mb-4 font-medium text-accent">
                      {project.role}
                    </p>

                    <p className="mb-6 leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="mb-3 text-sm font-semibold text-primary">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center text-sm"
                          >
                            <div className="mr-3 size-1.5 rounded-full bg-accent"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-surface-border"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-bold">
              Personal <GradientText>Projects</GradientText>
            </h3>
            <p className="text-lg text-muted-foreground">
              Exploring new technologies and building solutions for the
              community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {personalProjectsToRender.map((project) => (
              <GlassCard
                key={project.title}
                className="group border-surface-border transition-all duration-300 hover:bg-surface-hover"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="mb-2 text-xl font-semibold">
                        {project.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className="border-surface-border"
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="p-2">
                        <Github className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {project.description}
                  </p>

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
                </CardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

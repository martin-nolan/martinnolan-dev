import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientText } from "@/components/ui/gradient-text";

import type { FeaturedProject, PersonalProject } from "@/types";

const ProjectsSection = () => {
  const featuredProjects: FeaturedProject[] = [
    {
      title: "Cricket Command Centre",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description: "AI-powered live commentary generation from real-time cricket feeds, providing engaging automated coverage for viewers.",
      stack: ["Python", "OpenAI", "Real-time APIs", "Google Cloud"],
      highlights: [
        "Real-time AI commentary generation",
        "Seamless integration with live feeds",
        "Enhanced viewer engagement"
      ],
      images: [
        { src: "/placeholder.svg", description: "Main dashboard UI for live cricket commentary." },
        { src: "/placeholder2.svg", description: "AI-generated insights panel for match events." }
      ],
      category: "AI/ML"
    },
    {
      title: "Knowledge Search Platform",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description: "Semantic search platform for contact-centre policies, enabling support agents to quickly find relevant information.",
      stack: ["TypeScript", "Next.js", "Vector Search", "Google Cloud"],
      highlights: [
        "Semantic search capabilities",
        "Improved agent efficiency",
        "Centralized policy access"
      ],
      images: [
        { src: "/placeholder.svg", description: "Search interface for policy documents." },
        { src: "/placeholder2.svg", description: "Results page showing semantic matches." }
      ],
      category: "Search"
    },
    {
      title: "Customer Response Assistant",
      role: "Associate Gen AI Software Engineer",
      year: "2024",
      company: "Sky",
      description: "Generative email-drafting tool for support workflows, helping agents craft personalized responses efficiently.",
      stack: ["React", "TypeScript", "OpenAI", "Google Cloud"],
      highlights: [
        "Automated email drafting",
        "Personalized customer responses",
        "Streamlined support workflows"
      ],
      images: [
        { src: "/placeholder.svg", description: "Draft email UI with AI suggestions." },
        { src: "/placeholder2.svg", description: "Personalization options for customer responses." }
      ],
      category: "AI Tools"
    }
  ];

  const personalProjects: PersonalProject[] = [
    {
      title: "inTENt-Fitness",
      description: "Alexa skill delivering quick 10-minute workouts or guided meditations for busy lifestyles.",
      stack: ["Python", "Alexa Skills Kit", "AWS Lambda"],
      github: "https://github.com/martin-nolan",
      category: "Voice UI"
    },
    {
      title: "Blockchain Marketplace",
      description: "Web3 marketplace demo on Polygon Testnet using Moralis & MetaMask integration.",
      stack: ["React", "Web3", "Moralis", "MetaMask"],
      github: "https://github.com/martin-nolan",
      category: "Web3"
    },
    {
      title: "SGame",
      description: "Distributed, horizontally-scalable proof-of-concept game server architecture.",
      stack: ["Python", "Distributed Systems", "Microservices"],
      github: "https://github.com/martin-nolan",
      category: "Gaming"
    },
    {
      title: "Glasgo AR",
      description: "AR app concept for exploring the University of Glasgow campus with interactive features.",
      stack: ["Unity", "ARKit", "C#"],
      github: "https://github.com/martin-nolan",
      category: "AR"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Featured Work at Sky */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transforming Sky's digital ecosystem with AI-powered solutions that delight millions of users.
            </p>
          </div>

          <div className="space-y-12">
            {featuredProjects.map((project, index) => (
              <GlassCard key={project.title} className="border-surface-border overflow-hidden group hover:bg-surface-hover transition-all duration-500">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Project Image */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}> 
                    <div className="w-full h-full aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                      <ImageCarousel
                        images={project.images}
                        alt={project.title}
                        projectTitle={project.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-4 left-4 z-10 flex">
                        <Badge variant="secondary" className="bg-primary text-white">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={index % 2 === 1 ? "lg:order-1 p-8" : "p-8"}>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                      <span className="text-sm text-primary font-medium">{project.company}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-accent font-medium mb-4">{project.role}</p>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3 text-primary">Key Achievements</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center text-sm">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-surface-border">
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

        {/* Personal Projects */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Personal <span className="gradient-text">Projects</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Exploring new technologies and building solutions for the community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {personalProjects.map((project, index) => (
              <GlassCard key={project.title} className="border-surface-border hover:bg-surface-hover transition-all duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                      <Badge variant="outline" className="border-surface-border">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="p-2">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-surface-border text-xs">
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
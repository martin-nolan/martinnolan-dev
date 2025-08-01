import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProjectsSection = () => {
  const featuredProjects = [
    {
      title: "AI Content Personalization Engine",
      role: "Lead AI Engineer",
      year: "2024",
      company: "Sky",
      description: "Revolutionary recommendation system serving 20M+ users across Sky's platforms. Implemented transformer-based models with real-time inference, achieving 35% improvement in user engagement.",
      stack: ["Python", "TensorFlow", "Apache Kafka", "Kubernetes", "GraphQL"],
      highlights: [
        "35% increase in user engagement",
        "Sub-100ms recommendation latency", 
        "Serving 20M+ daily active users"
      ],
      image: "/api/placeholder/600/400",
      category: "AI/ML"
    },
    {
      title: "Intelligent Customer Support Platform",
      role: "Senior Full-Stack Engineer",
      year: "2023",
      company: "Sky",
      description: "Next-generation support platform combining LLM-powered chatbots with human agent workflows. Reduced resolution time by 60% while maintaining high customer satisfaction scores.",
      stack: ["React", "Node.js", "OpenAI", "PostgreSQL", "Redis", "Docker"],
      highlights: [
        "60% reduction in average resolution time",
        "90%+ customer satisfaction maintained",
        "Handling 100K+ monthly interactions"
      ],
      image: "/api/placeholder/600/400",
      category: "Full-Stack"
    },
    {
      title: "Real-time Analytics Dashboard",
      role: "Technical Lead",
      year: "2023",
      company: "Sky",
      description: "Comprehensive analytics platform providing real-time insights across Sky's ecosystem. Built with modern web technologies and optimized for performance at scale.",
      stack: ["React", "TypeScript", "D3.js", "WebSocket", "Apache Flink"],
      highlights: [
        "Processing 1B+ events daily",
        "Real-time data visualization",
        "Used by 500+ internal stakeholders"
      ],
      image: "/api/placeholder/600/400",
      category: "Data"
    }
  ];

  const personalProjects = [
    {
      title: "AI Code Review Assistant",
      description: "VSCode extension that provides intelligent code reviews using GPT-4, helping developers write better code.",
      stack: ["TypeScript", "OpenAI", "VSCode API"],
      github: "https://github.com/martinnolan",
      demo: "https://marketplace.visualstudio.com",
      category: "Open Source"
    },
    {
      title: "Smart Home Automation",
      description: "IoT platform with ML-powered automation that learns from user behavior patterns.",
      stack: ["Python", "Raspberry Pi", "MQTT", "TensorFlow"],
      github: "https://github.com/martinnolan",
      category: "IoT"
    }
  ];

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8">
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
              <Card 
                key={project.title}
                className="glass-card border-surface-border overflow-hidden group hover:bg-surface-hover transition-all duration-500"
              >
                <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Project Image */}
                  <div className={`relative overflow-hidden rounded-lg ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-6xl opacity-50">🚀</div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary text-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
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
              </Card>
            ))}
          </div>
        </div>

        {/* Personal Projects */}
        <div id="projects">
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
              <Card 
                key={project.title}
                className="glass-card border-surface-border hover:bg-surface-hover transition-all duration-300 group"
              >
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
                      {project.demo && (
                        <Button size="sm" variant="ghost" className="p-2">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
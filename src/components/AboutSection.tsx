import { Code, Brain, Rocket, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const skills = [
    "TypeScript", "Python", "React", "Next.js", "TailwindCSS", "Google Cloud",
    "OpenAI", "LLMs", "Full-Stack Development", "Stakeholder Management",
    "Agile Product Ownership", "Cloud Deployment", "Observability", "Django"
  ];

  const highlights = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Gen AI Development",
      description: "Building internal AI-driven platforms with rapid prototyping and user feedback loops."
    },
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: "Full-Stack Development", 
      description: "End-to-end development with Next.js, TypeScript, and TailwindCSS deployed on Google Cloud."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Stakeholder Engagement",
      description: "Leading ideation sessions and managing product ownership with agile methodologies."
    },
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: "Cloud Deployment",
      description: "Deploying and observing AI solutions on Google Cloud Platform with reliability focus."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">Martin</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Associate Gen AI Software Engineer at Sky UK, building human-centred AI tools that make work 
            more efficient and accessible through rapid demos and feedback loops.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio Content */}
          <div className="space-y-6">
            <div className="prose prose-lg text-foreground">
              <p className="text-lg leading-relaxed">
                I'm Martin Nolan, an Associate Gen AI Software Engineer at Sky UK. I build human-centred 
                AI tools—covering ideation, stakeholder engagement, full-stack development and Google Cloud 
                deployment—then refine through rapid demos and feedback loops.
              </p>
              
              <p className="text-lg leading-relaxed">
                My recent focus is on internal AI-driven platforms that make work more efficient and 
                accessible. I have an MSc in Mobile Web Development (Distinction) from University of 
                the West of Scotland and a BSc in Computer Science (First-Class) from University of Glasgow.
              </p>
              
              <p className="text-lg leading-relaxed">
                I'm passionate about the intersection of cutting-edge technology and human-centered 
                design, always asking: "How can we make this genuinely useful for people?"
              </p>
            </div>
          </div>

          {/* Skills Cloud */}
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6 text-center">Technical Expertise</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-surface hover:bg-surface-hover rounded-full text-sm font-medium border border-surface-border transition-all duration-200 hover:scale-105 hover:glow-primary"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card 
              key={highlight.title}
              className="glass-card border-surface-border hover:bg-surface-hover transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-200">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
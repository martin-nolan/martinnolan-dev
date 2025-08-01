import { Code, Brain, Rocket, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const skills = [
    "TypeScript", "Python", "React", "Next.js", "Node.js", "FastAPI",
    "TensorFlow", "PyTorch", "OpenAI", "Azure", "Docker", "Kubernetes",
    "GraphQL", "PostgreSQL", "Redis", "Elasticsearch"
  ];

  const highlights = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI Engineering",
      description: "Building production-ready AI systems that scale, from LLM integrations to custom ML models."
    },
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: "Full-Stack Development", 
      description: "End-to-end product development with modern web technologies and cloud-native architectures."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Human-Centered Design",
      description: "Creating intuitive experiences that make complex AI capabilities accessible to everyone."
    },
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: "Innovation at Scale",
      description: "Delivering impactful solutions at Sky, serving millions of customers across the UK and Europe."
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
            A passionate AI engineer who believes technology should amplify human potential, 
            not replace it. Currently architecting the future of entertainment and connectivity at Sky.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio Content */}
          <div className="space-y-6">
            <div className="prose prose-lg text-foreground">
              <p className="text-lg leading-relaxed">
                With over 5 years of experience in AI and software engineering, I specialize in 
                building production-grade systems that make artificial intelligence accessible 
                and valuable for real users.
              </p>
              
              <p className="text-lg leading-relaxed">
                At Sky, I lead the development of AI-powered features that enhance customer 
                experiences across our platforms, from personalized content recommendations 
                to intelligent customer support systems.
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
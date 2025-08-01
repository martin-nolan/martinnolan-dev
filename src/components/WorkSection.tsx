import { Building2, Users, Code } from "lucide-react";

const WorkSection = () => {
  const experiences = [
    {
      role: "Associate Gen AI Software Engineer",
      company: "Sky UK",
      period: "Jul 2025 – Present",
      icon: Code,
      description: "Building human-centred AI tools from ideation to deployment on Google Cloud, focusing on internal AI-driven platforms that make work more efficient and accessible.",
      achievements: [
        "Developed Cricket Command Centre with AI live commentary",
        "Built Tough Mutter HR conversation simulator",
        "Created Knowledge Search semantic platform",
        "Delivered News Content Assistant for journalists"
      ]
    },
    {
      role: "Associate Product Owner",
      company: "Sky Go / Comcast",
      period: "Mar 2024 – Sep 2024",
      icon: Users,
      description: "Led product strategy and stakeholder management for Sky Go streaming platform, driving user experience improvements and feature development.",
      achievements: [
        "Managed cross-functional teams across multiple time zones",
        "Defined product roadmaps and user stories",
        "Coordinated with Comcast engineering teams",
        "Delivered key streaming platform enhancements"
      ]
    },
    {
      role: "Associate Front-End Developer",
      company: "Sky UK - TV & Content Team",
      period: "Sep 2023 – Mar 2024",
      icon: Building2,
      description: "Developed front-end solutions for Sky's TV and content platforms using modern web technologies, focusing on user interface optimization and performance.",
      achievements: [
        "Built responsive TV content interfaces",
        "Optimized platform performance and user experience",
        "Collaborated with design and backend teams",
        "Implemented modern front-end best practices"
      ]
    }
  ];

  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey through Sky UK, from front-end development to AI engineering
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl group hover:bg-surface-hover transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Icon & Timeline */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <exp.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                      <p className="text-lg text-primary font-semibold">{exp.company}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
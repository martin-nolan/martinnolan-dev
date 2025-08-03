import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/shared/ui";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h1
            className="
    text-5xl sm:text-6xl lg:text-7xl 
    font-bold mb-6 leading-tight 
    text-white 
    drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] 
    drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]
  "
          >
            Engineering{" "}
            <span
              className="
      inline-block whitespace-nowrap 
      bg-gradient-to-r from-primary to-accent 
      bg-[length:200%_200%] animate-gradient-shift 
      bg-clip-text text-transparent 
      drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]
    "
            >
              Generative&nbsp;AI
            </span>
            <br />
            for Real-World Impact
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Associate Gen AI Software Engineer at Sky UK, building human-centred
            AI tools from ideation to deployment on Google Cloud.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white glow-primary group"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-white"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Let's Connect
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/martin-nolan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-surface border border-surface-border hover:bg-surface-hover transition-all duration-200 rounded-full group"
            >
              <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/martinnolan0110"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-surface border border-surface-border hover:bg-surface-hover transition-all duration-200 rounded-full group"
            >
              <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
            </a>
            <a
              href="mailto:martinnolan_1@live.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-surface border border-surface-border hover:bg-surface-hover transition-all duration-200 rounded-full group"
            >
              <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown
          className="h-8 w-8 text-primary cursor-pointer"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>
    </section>
  );
};

export default HeroSection;
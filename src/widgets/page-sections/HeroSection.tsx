/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/shared/ui";

interface HeroSectionProps {
  profile?: any;
}

const HeroSection = ({ profile }: HeroSectionProps) => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="hero-gradient absolute inset-0">
        <div className="absolute left-1/4 top-1/4 size-96 animate-float rounded-full bg-primary/10 blur-3xl"></div>
        <div
          className="absolute bottom-1/4 right-1/4 size-96 animate-float rounded-full bg-accent/10 blur-3xl"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h1
            className="
    mb-6 text-5xl font-bold 
    leading-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] 
    sm:text-6xl 
    lg:text-7xl
  "
          >
            {profile?.heroTitle || "Welcome to My Portfolio"}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
            {profile?.heroSubtitle || "Professional portfolio and AI assistant"}
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="glow-primary group bg-primary text-white hover:bg-primary/90"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
              <ArrowDown className="ml-2 size-4 transition-transform group-hover:translate-y-1" />
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

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/martin-nolan"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full border border-surface-border bg-surface p-3 transition-all duration-200 hover:bg-surface-hover"
            >
              <Github className="size-6 text-muted-foreground group-hover:text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/martinnolan0110"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full border border-surface-border bg-surface p-3 transition-all duration-200 hover:bg-surface-hover"
            >
              <Linkedin className="size-6 text-muted-foreground group-hover:text-primary" />
            </a>
            <a
              href="mailto:martinnolan_1@hotmail.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full border border-surface-border bg-surface p-3 transition-all duration-200 hover:bg-surface-hover"
            >
              <Mail className="size-6 text-muted-foreground group-hover:text-primary" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown
          className="size-8 cursor-pointer text-primary"
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

import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

import { useScrollToSection } from '@/hooks/useScrollToSection';
import type { ProcessedProfile } from '@/types';
import { Button } from '@/ui';

interface HeroSectionProps {
  profile?: ProcessedProfile;
}

const HeroSection = ({ profile }: HeroSectionProps) => {
  const { scrollToSection } = useScrollToSection();
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden max-sm:min-h-dvh">
      <div className="hero-gradient absolute inset-0">
        <div className="absolute left-1/4 top-1/4 size-96 animate-float rounded-full bg-primary/10 blur-3xl"></div>
        <div
          className="absolute bottom-1/4 right-1/4 size-96 animate-float rounded-full bg-accent/10 blur-3xl"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center max-sm:px-6 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] max-sm:mb-4 max-sm:text-2xl max-sm:leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {profile?.heroTitle || 'Welcome to My Portfolio'}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground max-sm:mb-6 max-sm:px-4 max-sm:text-sm max-sm:leading-relaxed sm:text-xl md:text-2xl">
            {profile?.heroSubtitle || 'Professional portfolio and AI assistant'}
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 max-sm:mb-8 max-sm:gap-3 sm:flex-row">
            <Button
              size="lg"
              className="glow-primary group bg-primary text-white hover:bg-primary/90 max-sm:min-h-[52px] max-sm:w-full max-sm:max-w-xs max-sm:text-base"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
              <ArrowDown className="ml-2 size-4 transition-transform group-hover:translate-y-1 max-sm:size-3" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-white max-sm:min-h-[52px] max-sm:w-full max-sm:max-w-xs max-sm:text-base"
              onClick={() => scrollToSection('contact')}
            >
              Let's Connect
            </Button>
          </div>

          <div className="flex justify-center space-x-6 max-sm:space-x-4">
            <a
              href="https://github.com/martin-nolan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[52px] min-w-[52px] items-center justify-center rounded-full border border-surface-border bg-surface p-3 transition-all duration-200 hover:bg-surface-hover"
            >
              <Github className="size-6 text-muted-foreground group-hover:text-primary max-sm:size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/martinnolan0110"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[52px] min-w-[52px] items-center justify-center rounded-full border border-surface-border bg-surface p-3 transition-all duration-200 hover:bg-surface-hover"
            >
              <Linkedin className="size-6 text-muted-foreground group-hover:text-primary max-sm:size-5" />
            </a>
            <button
              type="button"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group flex min-h-[52px] min-w-[52px] items-center justify-center rounded-full border border-surface-border bg-surface p-3 transition-all duration-200 hover:bg-surface-hover"
            >
              <Mail className="size-6 text-muted-foreground group-hover:text-primary max-sm:size-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 justify-center max-sm:bottom-6">
        <button
          type="button"
          className="animate-slow-bounce flex size-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm transition-all duration-200 hover:bg-primary/20 max-sm:size-10"
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to about section"
        >
          <ArrowDown className="size-6 text-primary max-sm:size-5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

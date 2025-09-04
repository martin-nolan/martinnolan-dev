import { Github, Linkedin, Mail } from 'lucide-react';

import ResumeModal from '@/components/ResumeModal';
import { useModal, useScrollToSection } from '@/hooks';
import type { ProcessedProfile } from '@/types';
import { GradientText } from '@/ui';

interface FooterProps {
  profile?: ProcessedProfile | null;
}

const Footer = ({ profile }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { isOpen: showResumeModal, openModal, closeModal } = useModal();
  const { scrollToSection } = useScrollToSection();

  return (
    <>
      <footer className="border-t border-surface-border bg-surface/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid justify-items-center gap-6 sm:gap-8 md:grid-cols-3 md:justify-items-start">
            <div className="space-y-3 text-center sm:space-y-4 md:text-left">
              <h3 className="text-lg font-bold sm:text-xl">
                <GradientText>Martin Nolan</GradientText>
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Professional portfolio and AI assistant
              </p>
              <div className="flex justify-center space-x-3 sm:space-x-4 md:justify-start">
                <a
                  href="https://github.com/martin-nolan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-surface-border bg-surface p-2 transition-all duration-200 hover:bg-surface-hover sm:p-3"
                >
                  <Github className="size-4 text-muted-foreground group-hover:text-primary sm:size-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/martinnolan0110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-surface-border bg-surface p-2 transition-all duration-200 hover:bg-surface-hover sm:p-3"
                >
                  <Linkedin className="size-4 text-muted-foreground group-hover:text-primary sm:size-5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-surface-border bg-surface p-2 transition-all duration-200 hover:bg-surface-hover sm:p-3"
                >
                  <Mail className="size-4 text-muted-foreground group-hover:text-primary sm:size-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-center sm:space-y-4 md:text-left">
              <h4 className="text-sm font-semibold sm:text-base">Quick Links</h4>
              <nav className="flex flex-col space-y-1 sm:space-y-2">
                <button
                  type="button"
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                  onClick={() => scrollToSection('about')}
                >
                  About
                </button>
                <button
                  type="button"
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                  onClick={() => scrollToSection('work')}
                >
                  Work
                </button>
                <button
                  type="button"
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                  onClick={() => scrollToSection('projects')}
                >
                  Projects
                </button>
                <button
                  type="button"
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </button>
              </nav>
            </div>

            <div className="space-y-3 text-center sm:space-y-4 md:text-left">
              <h4 className="text-sm font-semibold sm:text-base">Professional</h4>
              <nav className="flex flex-col space-y-1 sm:space-y-2">
                <button
                  type="button"
                  onClick={openModal}
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                >
                  Resume (PDF)
                </button>
                <a
                  href="https://www.linkedin.com/in/martinnolan0110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                >
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/martin-nolan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                >
                  GitHub Repositories
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="min-h-[44px] py-2 text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-base md:text-left"
                >
                  Get in Touch
                </button>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex justify-center border-t border-surface-border py-6 sm:py-8">
          <p className="px-4 text-center text-xs text-muted-foreground sm:text-sm">
            © {currentYear} Martin Nolan. All rights reserved.
          </p>
        </div>
      </footer>

      {showResumeModal && (
        <ResumeModal
          isOpen={showResumeModal}
          onClose={closeModal}
          cvPdfUrl={profile?.cvPdf ?? undefined}
        />
      )}
    </>
  );
};

export default Footer;

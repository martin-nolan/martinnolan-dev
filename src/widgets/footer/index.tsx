import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { GradientText } from "@/shared/ui";
import ResumeModal from "@/features/resume-modal";

interface FooterProps {
  profile?: {
    cvPdf?: string | null;
    [key: string]: unknown;
  } | null;
}

const Footer = ({ profile }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <>
      <footer className="border-t border-surface-border bg-surface/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid justify-items-center gap-8 md:grid-cols-3">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-xl font-bold">
                <GradientText>Martin Nolan</GradientText>
              </h3>
              <p className="text-muted-foreground">
                Professional portfolio and AI assistant
              </p>
              <div className="flex justify-center space-x-4 md:justify-start">
                <a
                  href="https://github.com/martin-nolan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-surface-border bg-surface p-2 transition-all duration-200 hover:bg-surface-hover"
                >
                  <Github className="size-5 text-muted-foreground group-hover:text-primary" />
                </a>
                <a
                  href="https://www.linkedin.com/in/martinnolan0110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-surface-border bg-surface p-2 transition-all duration-200 hover:bg-surface-hover"
                >
                  <Linkedin className="size-5 text-muted-foreground group-hover:text-primary" />
                </a>
                <a
                  href="mailto:martinnolan_1@hotmail.co.uk"
                  className="group rounded-lg border border-surface-border bg-surface p-2 transition-all duration-200 hover:bg-surface-hover"
                >
                  <Mail className="size-5 text-muted-foreground group-hover:text-primary" />
                </a>
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <h4 className="font-semibold">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <a
                  href="#about"
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  About
                </a>
                <a
                  href="#work"
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  Work
                </a>
                <a
                  href="#projects"
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  Contact
                </a>
              </nav>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <h4 className="font-semibold">Professional</h4>
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="text-left text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  Resume (PDF)
                </button>
                <a
                  href="https://www.linkedin.com/in/martinnolan0110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/martin-nolan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  GitHub Repositories
                </a>
                <a
                  href="mailto:martinnolan_1@hotmail.co.uk?subject=Collaboration Inquiry"
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  Collaborate
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex justify-center border-t border-surface-border py-8">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Martin Nolan. All rights reserved.
          </p>
        </div>
      </footer>

      {showResumeModal && (
        <ResumeModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
          cvPdfUrl={profile?.cvPdf}
        />
      )}
    </>
  );
};

export default Footer;

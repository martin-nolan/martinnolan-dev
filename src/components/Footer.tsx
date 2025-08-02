import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import ResumeModal from "./ResumeModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <>
      <footer className="border-t border-surface-border glass-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 3-column grid, items centred in each cell */}
          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            {/* Brand */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-xl font-bold gradient-text">Martin Nolan</h3>
              <p className="text-muted-foreground">
                AI Engineer building the future of human-computer interaction at
                Sky.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://github.com/martin-nolan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card hover:bg-surface-hover transition-all duration-200 rounded-lg group"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </a>
                <a
                  href="https://www.linkedin.com/in/martinnolan0110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card hover:bg-surface-hover transition-all duration-200 rounded-lg group"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </a>
                <a
                  href="mailto:martinnolan_1@live.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card hover:bg-surface-hover transition-all duration-200 rounded-lg group"
                >
                  <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 text-center md:text-left">
              <h4 className="font-semibold">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  About
                </a>
                <a
                  href="#work"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Work
                </a>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Professional */}
            <div className="space-y-4 text-center md:text-left">
              <h4 className="font-semibold">Professional</h4>
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                >
                  Resume (PDF)
                </button>
                <a
                  href="https://www.linkedin.com/in/martinnolan0110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/martin-nolan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  GitHub Repositories
                </a>
                <a
                  href="mailto:martinnolan_1@live.co.uk?subject=Collaboration Inquiry"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Collaborate
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom copyright, centred */}
        <div className="border-t border-surface-border pt-8 pb-8 flex justify-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Martin Nolan. All rights reserved.
          </p>
        </div>
      </footer>

      {showResumeModal && (
        <ResumeModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
        />
      )}
    </>
  );
};

export default Footer;

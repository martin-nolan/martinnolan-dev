import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Martin Nolan</h3>
            <p className="text-muted-foreground">
              AI Engineer building the future of human-computer interaction at Sky.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 glass-card hover:bg-surface-hover transition-all duration-200 rounded-lg group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a 
                href="#" 
                className="p-2 glass-card hover:bg-surface-hover transition-all duration-200 rounded-lg group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a 
                href="mailto:martinnolan_1@live.co.uk" 
                className="p-2 glass-card hover:bg-surface-hover transition-all duration-200 rounded-lg group"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                About
              </a>
              <a href="#work" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Work
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Projects
              </a>
              <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Blog
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Contact
              </a>
            </nav>
          </div>

          {/* Professional */}
          <div className="space-y-4">
            <h4 className="font-semibold">Professional</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Resume (PDF)
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                LinkedIn Profile
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                GitHub Repositories
              </a>
              <a href="mailto:martinnolan_1@live.co.uk?subject=Collaboration Inquiry" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Collaborate
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Martin Nolan. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
            Built with{" "}
            <Heart className="h-4 w-4 mx-1 text-accent" fill="currentColor" />
            using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
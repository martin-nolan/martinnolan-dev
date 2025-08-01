import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeModal from "./ResumeModal";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const navItems = [
    { href: "about", label: "About" },
    { href: "work", label: "Work" },
    { href: "projects", label: "Projects" },
    { href: "blog", label: "Blog" },
    { href: "contact", label: "Contact" }
  ];

  const handleScroll = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold gradient-text">
              Martin Nolan
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleScroll(item.href)}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => setIsResumeOpen(true)}
            >
              Resume
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 glass-card border-t border-surface-border">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  handleScroll(item.href);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2">
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  setIsResumeOpen(true);
                  setIsOpen(false);
                }}
              >
                Resume
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </nav>
  );
};

export default Navigation;
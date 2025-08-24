import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { useModal, useScrollToSection } from '@/hooks';
import type { NavigationProps } from '@/types';
import { Button, ThemeToggle } from '@/ui';

const Navigation = ({ setIsResumeOpen }: NavigationProps) => {
  const { isOpen, toggleModal, closeModal } = useModal();
  const { scrollToSection } = useScrollToSection();

  const navItems = [
    { href: 'about', label: 'About' },
    { href: 'work', label: 'Work' },
    { href: 'projects', label: 'Projects' },
    { href: 'contact', label: 'Contact' },
  ];

  return (
    <header>
      <nav
        id="site-header"
        className="fixed inset-x-0 top-0 z-50 border-b border-surface-border bg-surface/5 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="shrink-0">
              <Link href="/" className="gradient-text text-xl font-bold">
                Martin Nolan
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="group relative px-3 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100"></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <ThemeToggle />
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => setIsResumeOpen(true)}
              >
                Resume
              </Button>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={toggleModal} className="text-foreground">
                {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-surface-border bg-surface/5 px-2 pb-3 pt-2 backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    scrollToSection(item.href);
                    closeModal();
                  }}
                  className="block w-full px-3 py-2 text-left text-base font-medium text-foreground transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
              <div className="pb-2 pt-4">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => {
                    setIsResumeOpen(true);
                    closeModal();
                  }}
                >
                  Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;

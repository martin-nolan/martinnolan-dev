import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections with header offset calculation
 * Centralizes the scroll logic used across Navigation, Footer, and HeroSection components
 */
export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      // Calculate header height for offset
      const header = document.querySelector('header');
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;

      // Calculate target position with header offset
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      // Smooth scroll to target position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return { scrollToSection };
};

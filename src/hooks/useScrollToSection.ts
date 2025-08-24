import { useCallback } from 'react';

/**
 * Smooth scroll to a section accounting for a fixed header.
 * - Uses #site-header (the fixed <nav>) height for offset
 * - Optional extraOffset for things like admin bars, banners, etc.
 */
export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string, extraOffset = 0) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    // Measure the fixed nav, not the <header> wrapper
    const headerEl = document.getElementById('site-header') as HTMLElement | null;
    const headerHeight = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0;

    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: y,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, []);

  return { scrollToSection };
};

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-08-17

### 🎉 Major Release - Complete Architecture Overhaul

### Added

- **CMS-First Architecture** - Full Strapi CMS integration for dynamic content
- **AI Chat Assistant** - GitHub Models powered chat with dynamic context
- **Modern UI Components** - Complete shadcn/ui component library
- **Theme System** - Dark/light mode with system preference detection
- **Performance Optimizations** - Static generation with ISR
- **Security Headers** - Comprehensive CSP and security best practices
- **Error Boundaries** - Graceful error handling throughout the application
- **Type Safety** - Full TypeScript coverage with strict mode
- **Accessibility** - WCAG 2.1 AA compliant design
- **Documentation** - Comprehensive README, Security, and Contributing guides

### Changed

- **Project Structure** - Migrated to feature-sliced architecture
- **Build System** - Next.js 15.4 with modern bundling
- **Styling System** - Tailwind CSS 3.4 with custom design tokens
- **Data Fetching** - TanStack Query for optimized API calls
- **Component Library** - Radix UI primitives with custom styling
- **Content Management** - Dynamic content loading with fallbacks

### Removed

- **Hardcoded Content** - Eliminated all static content
- **Legacy Components** - Removed unused and deprecated components
- **Unused Dependencies** - Cleaned up package.json
- **Dead Code** - Removed unused files and imports

### Security

- **API Rate Limiting** - Implemented rate limiting for AI chat
- **Input Validation** - All user inputs properly sanitized
- **Environment Variables** - Secure handling of sensitive data
- **Content Security Policy** - Strict CSP headers implemented
- **Dependency Audit** - All dependencies security audited

### Performance

- **Bundle Size** - Reduced to ~172kB total JavaScript
- **Core Web Vitals** - Lighthouse score 95+ across all metrics
- **Image Optimization** - Next.js Image with modern formats
- **Code Splitting** - Optimized chunk loading
- **Static Generation** - Pre-rendered pages with ISR

## [1.0.0] - 2025-08-03

### Added

- Initial release of the Next.js version of the portfolio
- Feature-sliced architecture implementation
- Basic AI chat functionality
- Responsive design system

### Changed

- Major refactor of the entire codebase from Vite to Next.js
- Restructured the project to a feature-sliced architecture
- Improved type safety, performance, accessibility, and SEO
- Updated all dependencies to their latest versions

---

## Migration Guide

### From v1.x to v2.0

1. **Update Dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**

   - Copy `.env.example` to `.env.local`
   - Add required GitHub Models token
   - Configure EmailJS (optional)

3. **Content Migration**
   - All content is now CMS-driven
   - Update content through Strapi or content service
   - Personal information automatically populated

### Breaking Changes

- **Component API Changes** - Some component props updated
- **File Structure** - Reorganized to feature-sliced architecture
- **Environment Variables** - New required variables for AI functionality
- **Content Management** - Static content replaced with dynamic CMS

For detailed information about any release, check the [GitHub Releases](https://github.com/martin-nolan/martinnolan-dev/releases) page.

### Removed

- Removed all Vite-related files and dependencies.
- Removed `react-router-dom` in favor of Next.js routing.

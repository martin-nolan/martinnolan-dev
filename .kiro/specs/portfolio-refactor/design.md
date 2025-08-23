# Design Document

## Overview

This design document outlines the comprehensive refactoring approach for the Martin Nolan Portfolio codebase. The refactoring will be executed in phases to minimize risk while maximizing code quality improvements. The design focuses on maintaining the existing Next.js architecture while modernizing code organization, eliminating technical debt, and improving developer experience.

## Architecture

### Current Architecture Analysis

- **Framework**: Next.js 15 with TypeScript and App Router patterns
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state, React hooks for local state
- **CMS Integration**: Strapi Cloud with robust error handling
- **AI Integration**: GitHub Models API for chat functionality
- **Build System**: Modern ESM with strict TypeScript configuration

### Target Architecture

The refactored architecture will maintain the same structure but with improved organization:

```
src/
├── features/           # Feature-based modules (ai-chat, resume-modal)
├── widgets/           # Page-level components (navigation, footer, sections)
├── shared/            # Shared utilities and components
│   ├── lib/          # Utilities and services
│   ├── hooks/        # Reusable React hooks
│   ├── types/        # TypeScript definitions
│   └── ui/           # Design system components
└── pages/            # Next.js pages and API routes
```

## Components and Interfaces

### 1. Environment Management System

**New Centralized Environment Utility**

```typescript
// src/shared/lib/env.ts
interface EnvironmentConfig {
  github: {
    token: string;
    modelsEndpoint: string;
    modelId: string;
  };
  strapi: {
    apiUrl: string;
    apiToken?: string;
  };
  emailjs?: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
}
```

**Design Decisions:**

- Single source of truth for all environment variables
- Runtime validation with clear error messages
- Type-safe access to environment variables
- Graceful degradation for optional services

### 2. Shared Hooks System

**Modal and Scroll Management**

```typescript
// src/shared/hooks/useScrollLock.ts
// src/shared/hooks/useModal.ts
// src/shared/hooks/useLocalStorage.ts
```

**Design Rationale:**

- Extract common patterns from components
- Provide consistent behavior across features
- Enable easier testing and maintenance

### 3. Type System Consolidation

**Centralized Type Definitions**

```typescript
// src/shared/types/cms.ts - CMS-related types
// src/shared/types/api.ts - API response types
// src/shared/types/ui.ts - UI component types
// src/shared/types/index.ts - Re-exports
```

### 4. CMS Service Refactoring

**Current Issues Identified:**

- 500+ line content-service.ts with mixed responsibilities
- Complex media URL handling logic scattered throughout
- Inconsistent error handling patterns
- Mixed server/client concerns
- Duplicate type definitions

**New Modular CMS Architecture:**

```typescript
// src/shared/lib/cms/
├── client.ts          # Base Strapi client with auth
├── types.ts           # CMS-specific types
├── transformers.ts    # Data transformation utilities
├── media.ts           # Media URL handling
├── services/
│   ├── profile.ts     # Profile-specific operations
│   ├── projects.ts    # Project-specific operations
│   ├── experiences.ts # Experience-specific operations
│   └── index.ts       # Service aggregator
└── index.ts           # Public API
```

**Design Benefits:**

- Single responsibility principle
- Easier testing and maintenance
- Reusable transformation logic
- Clear separation of concerns
- Type-safe operations

### 5. Server/Client Separation

**Current Issues:**

- PDF extraction mixed between server and client
- Environment variables accessed directly throughout codebase
- AI context building has server dependencies in client code
- Inconsistent server-only imports

**New Separation Strategy:**

```typescript
// src/shared/lib/server/     # Server-only utilities
├── pdf-extractor.ts         # PDF processing
├── cms-server.ts           # Server-side CMS operations
├── ai-context-builder.ts   # Server-side AI context
└── env-server.ts           # Server environment validation

// src/shared/lib/client/     # Client-safe utilities
├── cms-client.ts           # Client-side CMS operations
├── env-client.ts           # Client environment access
└── api-client.ts           # API route helpers
```

### 6. AI Context System Refactoring

**Current Issues:**

- buildSystemPrompt.ts mixes server/client concerns
- Complex fallback logic scattered throughout
- PDF extraction called from client context
- Inconsistent error handling

**New AI Context Architecture:**

```typescript
// src/shared/lib/ai/
├── context-builder.server.ts  # Server-side context building
├── context-builder.client.ts  # Client-side context building
├── prompt-templates.ts        # Reusable prompt templates
├── content-formatters.ts      # Content formatting utilities
└── types.ts                   # AI-specific types
```

### 7. Scroll Logic Consolidation

**Current Issues:**

- Duplicate scroll logic in Navigation, Footer, and HeroSection components
- Hardcoded header height calculations repeated throughout
- Inconsistent smooth scrolling implementations

**New Scroll Management System:**

```typescript
// src/shared/hooks/useScrollToSection.ts
interface ScrollToSectionOptions {
  behavior?: 'smooth' | 'instant';
  offset?: number;
}

export const useScrollToSection = () => {
  const scrollToSection = (sectionId: string, options?: ScrollToSectionOptions) => {
    // Centralized scroll logic with header offset calculation
  };
  return { scrollToSection };
};
```

### 8. Environment Variable Complexity

**Current Issues:**

- Direct process.env access scattered across 15+ files
- Inconsistent fallback patterns
- Mixed client/server environment variable usage
- Duplicate validation logic in env.mjs and security-check.js

**Identified Files with Direct process.env Access:**

- ContactSection.tsx (EmailJS config)
- pdf-proxy.ts (Strapi config)
- chat.ts (GitHub Models config)
- resume-modal/index.tsx (Strapi config)
- content-service.ts (Strapi config)
- next.config.mjs (multiple configs)
- And 8+ more files

### 9. API Route Complexity

**Current Issues:**

- pdf-proxy.ts is 150+ lines with complex CORS, security, and error handling
- Duplicate origin validation logic
- Mixed security patterns across API routes
- pdf-test.ts appears to be unused debug endpoint

**API Route Refactoring:**

```typescript
// src/shared/lib/api/
├── middleware/
│   ├── cors.ts           # Centralized CORS handling
│   ├── security.ts       # Security validation utilities
│   └── error-handler.ts  # Consistent error responses
├── validators/
│   ├── url-validator.ts  # URL validation logic
│   └── auth-validator.ts # Authentication helpers
└── types.ts              # API response types
```

### 10. Component Complexity Issues

**Navigation & Footer Duplication:**

- Both components have identical scroll logic (40+ lines duplicated)
- Hardcoded social links repeated in multiple places
- Similar responsive menu patterns

**Page Sections Complexity:**

- ProjectsSection.tsx is 300+ lines with complex project type handling
- ContactSection.tsx mixes form handling, CMS data, and hardcoded fallbacks
- WorkSection.tsx has icon mapping logic that could be centralized

**Resume Modal Complexity:**

- 200+ lines with mixed PDF handling, error states, and configuration logic
- Complex URL construction and validation
- Duplicate error handling patterns

### 11. Type System Issues

**Current Problems:**

- 200+ line types/index.ts with mixed concerns
- Duplicate interfaces (ResumeModalProps declared twice)
- CMS types mixed with UI component types
- Inconsistent naming patterns (CMSProfile vs Profile)

**Type Organization Strategy:**

```typescript
// src/shared/types/
├── cms/
│   ├── profile.ts
│   ├── projects.ts
│   └── index.ts
├── ui/
│   ├── components.ts
│   ├── forms.ts
│   └── index.ts
├── api/
│   ├── responses.ts
│   └── requests.ts
└── index.ts  # Re-exports
```

### 12. Static Analysis Integration

**Dead Code Detection Pipeline**

- **ts-prune**: Identify unused exports
- **ESLint**: Detect unused variables and imports
- **Custom scripts**: Analyze component usage patterns
- **API route analysis**: Identify unused endpoints (pdf-test.ts)
- **Environment variable audit**: Find unused env vars

## Data Models

### Environment Configuration Model

```typescript
interface EnvironmentSchema {
  required: {
    GITHUB_TOKEN: string;
    NEXT_PUBLIC_STRAPI_API_URL: string;
  };
  optional: {
    STRAPI_API_TOKEN?: string;
    NEXT_PUBLIC_EMAILJS_SERVICE_ID?: string;
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?: string;
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string;
  };
}
```

### Refactoring Progress Model

```typescript
interface RefactoringTask {
  id: string;
  category: 'cleanup' | 'consolidation' | 'optimization' | 'testing';
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  files: string[];
  dependencies: string[];
}
```

## Error Handling

### Graceful Degradation Strategy

1. **Environment Variables**: Provide clear error messages for missing required variables
2. **CMS Connectivity**: Maintain existing error boundaries and fallback content
3. **Feature Availability**: Disable optional features when dependencies are missing
4. **Build Process**: Fail fast with descriptive error messages

### Validation Pipeline

```typescript
// Pre-refactoring validation
- Backup current working state
- Run full test suite
- Verify build process

// During refactoring validation
- Incremental testing after each change
- Type checking at each step
- Lint validation

// Post-refactoring validation
- Full regression testing
- Performance benchmarking
- Accessibility audit
```

## Testing Strategy

### Static Analysis Testing

1. **TypeScript Compilation**: Ensure no type errors introduced
2. **ESLint Validation**: Maintain code quality standards
3. **Dead Code Detection**: Verify removal of unused code
4. **Import Analysis**: Validate import/export consistency

### Functional Testing

1. **Build Verification**: Ensure successful production builds
2. **Feature Testing**: Verify all existing functionality works
3. **Performance Testing**: Ensure no performance regressions
4. **Accessibility Testing**: Maintain WCAG compliance

### Integration Testing

1. **CMS Integration**: Verify Strapi connectivity and data fetching
2. **AI Chat**: Ensure GitHub Models integration works
3. **Contact Form**: Validate EmailJS integration
4. **PDF Handling**: Test resume modal and PDF proxy

## Implementation Phases

### Phase 1: Preparation and Analysis

- Create comprehensive file inventory
- Run static analysis tools
- Identify unused dependencies
- Backup current state

### Phase 2: File System Cleanup

- Remove unnecessary documentation files
- Consolidate environment files
- Clean up configuration files
- Remove build artifacts

### Phase 3: CMS and Service Layer Refactoring

- Break down monolithic content-service.ts into focused modules
- Separate server-only and client-safe CMS operations
- Create reusable media URL handling utilities
- Implement consistent error handling patterns

### Phase 4: Server/Client Separation

- Move server-only code to dedicated server directory
- Create client-safe API wrappers
- Separate AI context building for server vs client
- Implement proper environment variable separation

### Phase 5: Code Consolidation

- Create centralized environment utility
- Extract shared hooks
- Consolidate type definitions
- Remove dead code

### Phase 6: Import Optimization

- Clean up unused imports
- Optimize dynamic imports
- Remove unused API routes
- Validate hardcoded values

### Phase 7: Component Refactoring

- Extract duplicate scroll logic into shared hooks
- Consolidate social links and navigation patterns
- Simplify complex components (ProjectsSection, ContactSection)
- Create reusable form and error handling patterns

### Phase 8: API and Configuration Cleanup

- Refactor pdf-proxy.ts with middleware pattern
- Remove unused pdf-test.ts endpoint
- Consolidate CORS and security logic
- Simplify next.config.mjs complexity

### Phase 9: Quality Assurance

- Run comprehensive test suite
- Perform accessibility audit
- Validate design system consistency
- Update documentation

## Security Considerations

### Environment Variable Security

- Ensure no secrets in client bundles
- Validate environment variable access patterns
- Maintain separation between public and private variables

### Dependency Security

- Audit removed dependencies for security implications
- Ensure no unused packages remain in package.json
- Validate that security-critical packages are retained

## Performance Implications

### Bundle Size Optimization

- Remove unused code to reduce bundle size
- Optimize dynamic imports
- Ensure tree-shaking effectiveness

### Build Performance

- Streamline build process by removing unused files
- Optimize TypeScript compilation
- Reduce linting overhead

## Accessibility Compliance

### Component Audit

- Verify ARIA attributes in shared components
- Ensure keyboard navigation patterns
- Validate semantic HTML structure
- Test screen reader compatibility

### Design System Consistency

- Audit Tailwind usage patterns
- Ensure consistent component APIs
- Validate responsive design implementation
- Check color contrast compliance

# Contributing to Martin Nolan Portfolio

Thank you for your interest in this project! While this is primarily a personal portfolio, I welcome contributions in the following areas.

## 📋 Ways to Contribute

### 🐛 Bug Reports

- Report bugs via [GitHub Issues](https://github.com/martin-nolan/martinnolan-dev/issues)
- Include steps to reproduce, expected vs actual behavior
- Add screenshots or screen recordings if helpful

### 💡 Feature Suggestions

- Suggest improvements or new features
- Discuss architectural enhancements
- Propose accessibility improvements

### 📖 Documentation

- Fix typos or unclear instructions
- Improve setup guides
- Add helpful code comments

### 🔧 Code Contributions

- Bug fixes
- Performance optimizations
- Accessibility improvements
- TypeScript type safety enhancements

## 🚀 Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm run test:build
   npm run build
   ```
5. **Submit a Pull Request**

## 📝 Guidelines

### Code Style

- Follow existing TypeScript and React patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the established project structure

### Commit Messages

```
feat: add new feature
fix: resolve bug in component
docs: update README
style: fix formatting
refactor: improve code structure
test: add missing tests
```

### Pull Requests

- Provide clear description of changes
- Include screenshots for UI changes
- Link to relevant issues
- Ensure CI passes

## 🏗️ Project Structure

```
src/
├── features/     # Feature-specific components (ai-chat, resume-modal)
├── pages/        # Next.js pages and API routes
├── shared/       # Reusable components and utilities
└── widgets/      # Compositional page sections
```

### Key Principles

- **Feature-Sliced Architecture** - Organized by business logic
- **Component Composition** - Reusable, testable components
- **Type Safety** - Comprehensive TypeScript coverage
- **Performance First** - Optimized for Core Web Vitals

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build verification
npm run build

# Full test suite
npm run test:build
```

## 📱 Responsive Design

Ensure changes work across:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## ♿ Accessibility

- Follow WCAG 2.1 AA guidelines
- Test with screen readers
- Ensure keyboard navigation
- Maintain color contrast ratios
- Add appropriate ARIA labels

## 🎨 Design System

- Use existing Tailwind CSS utilities
- Follow the established color palette
- Maintain consistent spacing and typography
- Use shadcn/ui components where possible

## 🔒 Security Considerations

- Never commit API keys or secrets
- Validate all user inputs
- Follow CSP guidelines for external resources
- Test for XSS vulnerabilities

## ❓ Questions

Have questions? Feel free to:

- Open a [Discussion](https://github.com/martin-nolan/martinnolan-dev/discussions)
- Email: [martinnolan_1@hotmail.co.uk](mailto:martinnolan_1@hotmail.co.uk)
- Connect on [LinkedIn](https://linkedin.com/in/martinnolan0110)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

_Thank you for helping make this project better! 🙏_

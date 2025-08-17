# CI/CD Documentation

Simple and practical GitHub Actions CI/CD setup for this Next.js TypeScript project.

## 🚀 Workflows

### 1. CI (`ci.yml`)

**Triggers:** Push to main, PRs to main

**What it does:**

- ✅ **Lint** - ESLint code quality checks
- ✅ **Type Check** - TypeScript validation
- ✅ **Build** - Ensures app builds successfully
- ✅ **Security Audit** - Checks for high-severity vulnerabilities

### 2. PR Quality (`pr-quality.yml`)

**Triggers:** PR events

**What it does:**

- ✅ **PR Title Check** - Enforces conventional commit format in PR titles (feat:, fix:, etc.)

## � Branch Protection Setup

To enable these as required checks:

1. **GitHub** → **Settings** → **Branches**
2. **Add rule** for `main` branch
3. **Required status checks:**

   - `Test & Build`
   - `PR Title Check` (for PRs)

4. **Recommended settings:**
   - ✅ Require status checks to pass before merging
   - ✅ Require pull request reviews before merging

## 📝 NPM Scripts Used

```json
{
  "lint:check": "next lint",
  "typecheck": "tsc --noEmit",
  "build": "next build",
  "ci:check": "npm run typecheck && npm run lint:check"
}
```

## 🚨 Local Development

```bash
# Run all CI checks locally before pushing
npm run ci:check

# Or run individually
npm run lint:check
npm run typecheck
npm run build
```

That's it! Simple, focused, and practical. 🎯

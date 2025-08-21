#!/usr/bin/env node

/**
 * Security and Production Readiness Check
 * Validates environment configuration and security settings
 */

// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

let hasErrors = false;
let hasWarnings = false;

function error(message) {
  console.log(`${RED}✗ ${message}${RESET}`);
  hasErrors = true;
}

function warning(message) {
  console.log(`${YELLOW}⚠ ${message}${RESET}`);
  hasWarnings = true;
}

function success(message) {
  console.log(`${GREEN}✓ ${message}${RESET}`);
}

function info(message) {
  console.log(`${BOLD}${message}${RESET}`);
}

console.log(`${BOLD}🔒 Security & Production Readiness Check${RESET}\n`);

// Check for required environment variables
info('1. Environment Configuration');

const requiredEnvVars = ['GITHUB_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL'];

// Check that required environment variables are set
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    error(`Required environment variable ${envVar} is not set`);
  } else {
    success(`Required environment variable ${envVar} is set`);
  }
});

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  warning('.env.local not found. Create it from .env.example');
} else {
  success('.env.local exists');
}

// Check for hardcoded URLs in source code
info('\n2. Hardcoded URL Check');

const sourceFiles = [
  'src/shared/lib/content-service.ts',
  'src/features/resume-modal/index.tsx',
  'src/pages/api/pdf-proxy.ts',
  'next.config.mjs',
];

const dangerousPatterns = [
  /https:\/\/ethical-sharing-51be20efdb/gi,
  /localhost:\d+/gi,
  /127\.0\.0\.1/gi,
  /0\.0\.0\.0/gi,
];

sourceFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    let foundIssues = false;

    dangerousPatterns.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        // Ignore localhost:3000 and localhost:1337 as safe for local development
        const safeLocalhosts = ['localhost:3000', 'localhost:1337'];
        const unsafeMatches = matches.filter((m) => !safeLocalhosts.includes(m));
        if (unsafeMatches.length > 0) {
          error(`Hardcoded URL found in ${file}: ${unsafeMatches[0]}`);
          foundIssues = true;
        }
        const safeMatches = matches.filter((m) => safeLocalhosts.includes(m));
        if (safeMatches.length > 0) {
          success(`Safe hardcoded localhost URL in ${file}: ${safeMatches.join(', ')}`);
        }
      }
    });

    if (!foundIssues) {
      success(`${file} - No hardcoded URLs found (except safe localhost)`);
    }
  }
});

// Check for duplicate package-lock files
info('\n3. Package Dependencies');

const packageLockFiles = fs
  .readdirSync('.')
  .filter((file) => file.startsWith('package-lock') && file.endsWith('.json'));

if (packageLockFiles.length > 1) {
  error(`Multiple package-lock files found: ${packageLockFiles.join(', ')}`);
  error('Remove duplicate package-lock files to avoid dependency conflicts');
} else if (packageLockFiles.length === 1) {
  success('Single package-lock.json file found');
} else {
  warning('No package-lock.json file found');
}

// Check .gitignore
info('\n4. Git Security');

if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');

  const requiredIgnores = ['.env', '.env.local', '.env.production', 'node_modules'];
  requiredIgnores.forEach((pattern) => {
    if (gitignore.includes(pattern)) {
      success(`${pattern} is ignored`);
    } else {
      error(`${pattern} is not in .gitignore`);
    }
  });
} else {
  error('.gitignore file not found');
}

// Check for sensitive files
info('\n5. Sensitive Files Check');

let foundSensitiveFiles = [];

fs.readdirSync('.').forEach((file) => {
  if (
    file.startsWith('.env.') &&
    !file.endsWith('.example') &&
    !file.endsWith('.local') &&
    !file.endsWith('.template')
  ) {
    foundSensitiveFiles.push(file);
  }
});

if (foundSensitiveFiles.length > 0) {
  error(`Sensitive environment files found: ${foundSensitiveFiles.join(', ')}`);
  error('Ensure these are in .gitignore and not committed to version control');
} else {
  success('No sensitive environment files found in root directory');
}

// Final summary
console.log(`\n${BOLD}Summary:${RESET}`);

if (hasErrors) {
  console.log(
    `${RED}❌ Security issues found! Please fix the errors above before deploying.${RESET}`
  );
  process.exit(1);
} else if (hasWarnings) {
  console.log(`${YELLOW}⚠️  Some warnings found. Review the issues above.${RESET}`);
  console.log(`${GREEN}✅ No critical security issues detected.${RESET}`);
} else {
  console.log(`${GREEN}✅ All security checks passed! Ready for production.${RESET}`);
}

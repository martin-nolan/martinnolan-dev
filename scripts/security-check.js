#!/usr/bin/env node

/**
 * Security and Production Readiness Check
 * Validates environment configuration and security settings
 */

import fs from "fs";
import path from "path";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

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
info("1. Environment Configuration");

const requiredEnvVars = ["GITHUB_TOKEN", "NEXT_PUBLIC_STRAPI_API_URL"];

const optionalEnvVars = [
  "STRAPI_API_TOKEN",
  "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
  "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
  "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
];

// Check if .env.local exists
if (!fs.existsSync(".env.local")) {
  warning(".env.local not found. Create it from .env.example");
} else {
  success(".env.local exists");
}

// Check for hardcoded URLs in source code
info("\n2. Hardcoded URL Check");

const sourceFiles = [
  "src/shared/lib/content-service.ts",
  "src/features/resume-modal/index.tsx",
  "src/pages/api/pdf-proxy.ts",

// Only check source code files, not documentation like README.md
const sourceFiles = [
  "src/shared/lib/content-service.ts",
  "src/features/resume-modal/index.tsx",
  "src/pages/api/pdf-proxy.ts",
  "next.config.mjs",
  // "README.md", // <-- Do NOT include documentation files here
];

const dangerousPatterns = [
  /https:\/\/ethical-sharing-51be20efdb/gi,
  /localhost:\d+/gi,
  /127\.0\.0\.1/gi,
  /0\.0\.0\.0/gi,
];

sourceFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, "utf8");
    let foundIssues = false;

    dangerousPatterns.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        error(`Hardcoded URL found in ${file}: ${matches[0]}`);
        foundIssues = true;
      }
    });

    if (!foundIssues) {
      success(`${file} - No hardcoded URLs found`);
    }
  }
});

// Check for duplicate package-lock files
info("\n3. Package Dependencies");

const packageLockFiles = fs
  .readdirSync(".")
  .filter((file) => file.startsWith("package-lock") && file.endsWith(".json"));

if (packageLockFiles.length > 1) {
  error(`Multiple package-lock files found: ${packageLockFiles.join(", ")}`);
  error("Remove duplicate package-lock files to avoid dependency conflicts");
} else if (packageLockFiles.length === 1) {
  success("Single package-lock.json file found");
} else {
  warning("No package-lock.json file found");
}

// Check .gitignore
info("\n4. Git Security");

if (fs.existsSync(".gitignore")) {
  const gitignore = fs.readFileSync(".gitignore", "utf8");

  const requiredIgnores = [
    ".env",
    ".env.local",
    ".env.production",
    "node_modules",
  ];
  requiredIgnores.forEach((pattern) => {
    if (gitignore.includes(pattern)) {
      success(`${pattern} is ignored`);
    } else {
      error(`${pattern} is not in .gitignore`);
    }
  });
} else {
  error(".gitignore file not found");
}

// Check for sensitive files
info("\n5. Sensitive Files Check");

const sensitiveFiles = [".env.production", ".env.staging", "*.key", "*.pem"];
let foundSensitiveFiles = [];

fs.readdirSync(".").forEach((file) => {
  if (
    file.startsWith(".env.") &&
    !file.endsWith(".example") &&
    !file.endsWith(".local") &&
    !file.endsWith(".template")
  ) {
    foundSensitiveFiles.push(file);
  }
});

if (foundSensitiveFiles.length > 0) {
  error(`Sensitive environment files found: ${foundSensitiveFiles.join(", ")}`);
  error("Ensure these are in .gitignore and not committed to version control");
} else {
  success("No sensitive environment files found in root directory");
}

// Final summary
console.log(`\n${BOLD}Summary:${RESET}`);

if (hasErrors) {
  console.log(
    `${RED}❌ Security issues found! Please fix the errors above before deploying.${RESET}`
  );
  process.exit(1);
} else if (hasWarnings) {
  console.log(
    `${YELLOW}⚠️  Some warnings found. Review the issues above.${RESET}`
  );
  console.log(`${GREEN}✅ No critical security issues detected.${RESET}`);
} else {
  console.log(
    `${GREEN}✅ All security checks passed! Ready for production.${RESET}`
  );
}

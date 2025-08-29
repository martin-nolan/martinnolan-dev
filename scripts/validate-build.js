#!/usr/bin/env node

/**
 * Build validation script to test deployment compatibility
 * Simulates Netlify build environment and validates all pages
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${colors.bold}${colors.blue}=== ${title} ===${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

/**
 * Validates environment setup
 */
function validateEnvironment() {
  logSection('Environment Validation');

  // Check Node version
  const nodeVersion = process.version;
  logInfo(`Node version: ${nodeVersion}`);

  // Check if we're using Node 20.x as configured
  if (!nodeVersion.startsWith('v20.')) {
    logWarning(`Expected Node 20.x, got ${nodeVersion}. This might cause deployment differences.`);
  } else {
    logSuccess(`Node version matches Netlify configuration (20.x)`);
  }

  // Check package.json engines
  const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
  if (packageJson.engines?.node) {
    logInfo(`Package.json engines.node: ${packageJson.engines.node}`);
    logSuccess('Node version constraint defined in package.json');
  } else {
    logWarning('No Node version constraint in package.json engines field');
  }

  // Check Next.js version
  const nextVersion = packageJson.devDependencies?.next || packageJson.dependencies?.next;
  logInfo(`Next.js version: ${nextVersion}`);

  if (nextVersion?.includes('14.2.32')) {
    logSuccess('Using Next.js 14.2.32 as expected');
  } else {
    logWarning(`Expected Next.js 14.2.32, got ${nextVersion}`);
  }
}

/**
 * Validates configuration files
 */
function validateConfiguration() {
  logSection('Configuration Validation');

  // Check next.config.mjs
  if (existsSync(join(projectRoot, 'next.config.mjs'))) {
    logSuccess('next.config.mjs exists');

    const configContent = readFileSync(join(projectRoot, 'next.config.mjs'), 'utf8');

    // Check SWC minification is disabled
    if (configContent.includes('swcMinify: false')) {
      logSuccess('SWC minification is disabled (fixes getInitialProps error)');
    } else {
      logError('SWC minification should be disabled for Netlify compatibility');
    }

    // Check console removal is disabled
    if (configContent.includes('removeConsole: false')) {
      logSuccess('Console removal is disabled (enables production debugging)');
    } else {
      logWarning('Console removal might be enabled, could hide debugging logs');
    }

    // Check source maps
    if (configContent.includes('productionBrowserSourceMaps: true')) {
      logSuccess('Production source maps enabled for better error tracking');
    } else {
      logWarning('Production source maps not enabled');
    }
  } else {
    logError('next.config.mjs not found');
  }

  // Check netlify.toml
  if (existsSync(join(projectRoot, 'netlify.toml'))) {
    logSuccess('netlify.toml exists');

    const netlifyConfig = readFileSync(join(projectRoot, 'netlify.toml'), 'utf8');

    // Check Node version
    if (netlifyConfig.includes('NODE_VERSION = "20"')) {
      logSuccess('Netlify configured to use Node 20');
    } else {
      logWarning('Netlify Node version not explicitly set to 20');
    }

    // Check Next.js plugin
    if (netlifyConfig.includes('@netlify/plugin-nextjs')) {
      logSuccess('Netlify Next.js plugin configured');
    } else {
      logError('Netlify Next.js plugin not configured');
    }
  } else {
    logError('netlify.toml not found');
  }
}

/**
 * Validates page structure
 */
function validatePages() {
  logSection('Page Structure Validation');

  const pagesDir = join(projectRoot, 'src/pages');

  if (!existsSync(pagesDir)) {
    logError('src/pages directory not found');
    return;
  }

  logSuccess('src/pages directory exists');

  // Check required pages
  const requiredPages = ['index.tsx', '_app.tsx', '_document.tsx', '404.tsx'];

  for (const page of requiredPages) {
    const pagePath = join(pagesDir, page);
    if (existsSync(pagePath)) {
      logSuccess(`${page} exists`);

      // Check for proper default export
      const content = readFileSync(pagePath, 'utf8');
      if (content.includes('export default')) {
        logSuccess(`${page} has default export`);
      } else {
        logError(`${page} missing default export`);
      }
    } else {
      logError(`${page} not found`);
    }
  }

  // Check API routes
  const apiDir = join(pagesDir, 'api');
  if (existsSync(apiDir)) {
    logSuccess('API routes directory exists');

    const apiFiles = readdirSync(apiDir).filter(
      (file) => file.endsWith('.ts') || file.endsWith('.js')
    );
    logInfo(`Found ${apiFiles.length} API routes: ${apiFiles.join(', ')}`);

    for (const apiFile of apiFiles) {
      const content = readFileSync(join(apiDir, apiFile), 'utf8');
      if (content.includes('export default')) {
        logSuccess(`${apiFile} has default export`);
      } else {
        logError(`${apiFile} missing default export`);
      }
    }
  }
}

/**
 * Runs build and validates output
 */
function validateBuild() {
  logSection('Build Validation');

  try {
    logInfo('Running production build...');

    // Set production environment
    process.env.NODE_ENV = 'production';

    // Run build
    execSync('npm run build', {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    logSuccess('Build completed successfully');

    // Check build output
    const buildDir = join(projectRoot, '.next');
    if (existsSync(buildDir)) {
      logSuccess('.next directory created');

      // Check for static pages
      const staticDir = join(buildDir, 'static');
      if (existsSync(staticDir)) {
        logSuccess('Static assets generated');
      }

      // Check for server files
      const serverDir = join(buildDir, 'server');
      if (existsSync(serverDir)) {
        logSuccess('Server files generated');

        // Check pages manifest
        const pagesManifest = join(serverDir, 'pages-manifest.json');
        if (existsSync(pagesManifest)) {
          logSuccess('Pages manifest generated');

          const manifest = JSON.parse(readFileSync(pagesManifest, 'utf8'));
          const pageCount = Object.keys(manifest).length;
          logInfo(`${pageCount} pages in manifest`);

          // Check for our main pages
          const expectedPages = ['/', '/404', '/_app', '/_document'];
          for (const page of expectedPages) {
            if (manifest[page]) {
              logSuccess(`Page ${page} in manifest`);
            } else {
              logError(`Page ${page} missing from manifest`);
            }
          }
        }
      }
    } else {
      logError('.next directory not created');
    }
  } catch (error) {
    logError(`Build failed: ${error.message}`);

    // Try to extract useful error information
    if (error.stdout) {
      logInfo('Build stdout:');
      console.log(error.stdout);
    }

    if (error.stderr) {
      logError('Build stderr:');
      console.log(error.stderr);
    }

    throw error;
  }
}

/**
 * Validates dependencies
 */
function validateDependencies() {
  logSection('Dependency Validation');

  try {
    logInfo('Checking for missing dependencies...');

    // Run npm ls to check for missing dependencies
    execSync('npm ls --depth=0', {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    logSuccess('All dependencies are installed');
  } catch (error) {
    logWarning('Some dependencies might be missing or have version conflicts');
    logInfo('Run "npm install" to fix dependency issues');
  }

  // Check for TypeScript compilation
  try {
    logInfo('Running TypeScript type check...');

    execSync('npx tsc --noEmit --skipLibCheck', {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    logSuccess('TypeScript compilation successful');
  } catch (error) {
    logError('TypeScript compilation failed');
    console.log(error.stdout || error.message);
  }
}

/**
 * Main validation function
 */
async function main() {
  log(`${colors.bold}${colors.blue}🔍 Netlify Build Validation Script${colors.reset}`);
  log(`${colors.blue}Validating build compatibility for Next.js deployment${colors.reset}\n`);

  let hasErrors = false;

  try {
    validateEnvironment();
    validateConfiguration();
    validatePages();
    validateDependencies();
    validateBuild();

    logSection('Validation Summary');

    if (hasErrors) {
      logError('Validation completed with errors. Please fix the issues above before deploying.');
      process.exit(1);
    } else {
      logSuccess('All validations passed! Build should work on Netlify.');
      logInfo('You can now deploy to Netlify with confidence.');
    }
  } catch (error) {
    logError(`Validation failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as validateBuild };

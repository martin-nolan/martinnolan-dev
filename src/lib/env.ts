import { z } from 'zod';

/**
 * Simple Environment Configuration
 * Handles both client and server environment variables in one place
 */

// Client-side environment variables (NEXT_PUBLIC_*)
const clientEnvSchema = z.object({
  NEXT_PUBLIC_STRAPI_API_URL: z.string().url().min(1),
});

// Server-side environment variables
const serverEnvSchema = z.object({
  GITHUB_TOKEN: z.string().min(1),
  GITHUB_MODELS_ENDPOINT: z.string().url().default('https://models.github.ai/inference'),
  GITHUB_MODEL_ID: z.string().default('openai/gpt-4.1'),
  STRAPI_API_URL: z.string().url().min(1),
  STRAPI_API_TOKEN: z.string().optional(),
  EMAILJS_SERVICE_ID: z.string().optional(),
  EMAILJS_TEMPLATE_ID: z.string().optional(),
  EMAILJS_PUBLIC_KEY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Parse environment with simple validation
 */
function parseEnv() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Validate in production
    try {
      const client = clientEnvSchema.parse(process.env);
      const server = serverEnvSchema.parse(process.env);
      return { ...client, ...server };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join('\n');
        throw new Error(`Environment validation failed:\n${errors}`);
      }
      throw error;
    }
  }

  // In development, use defaults
  return process.env as Record<string, string | undefined>;
}

const rawEnv = parseEnv();

/**
 * Client-safe environment (only NEXT_PUBLIC_* variables)
 */
export const clientEnv = {
  strapi: {
    apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL || '',
  },
  isDev: process.env.NODE_ENV === 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
};

/**
 * Server-only environment (includes sensitive variables)
 * ⚠️ Only use in server-side code!
 */
export const serverEnv = {
  github: {
    token: rawEnv.GITHUB_TOKEN || '',
    modelsEndpoint: rawEnv.GITHUB_MODELS_ENDPOINT || 'https://models.github.ai/inference',
    modelId: rawEnv.GITHUB_MODEL_ID || 'openai/gpt-4.1',
  },
  strapi: {
    apiUrl: rawEnv.STRAPI_API_URL || '',
    apiToken: rawEnv.STRAPI_API_TOKEN,
  },
  emailjs: {
    serviceId: rawEnv.EMAILJS_SERVICE_ID,
    templateId: rawEnv.EMAILJS_TEMPLATE_ID,
    publicKey: rawEnv.EMAILJS_PUBLIC_KEY,
  },
  isDev: rawEnv.NODE_ENV === 'development',
};

/**
 * Simple utility functions
 */
// Legacy export for compatibility
export const env = {
  isDevelopment: rawEnv.NODE_ENV === 'development',
  isProduction: rawEnv.NODE_ENV === 'production',
};

export const envUtils = {
  isEmailJSConfigured: () => !!clientEnv.emailjs?.serviceId,
  hasGithubToken: () => !!serverEnv.github.token,
  hasStrapiToken: () => !!serverEnv.strapi.apiToken,
};

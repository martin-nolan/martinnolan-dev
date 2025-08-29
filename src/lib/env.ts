import { z } from 'zod';

/**
 * Simple Environment Configuration
 * Handles both client and server environment variables in one place
 */

// Client-side environment variables (NEXT_PUBLIC_*)
const clientEnvSchema = z.object({
  NEXT_PUBLIC_STRAPI_API_URL: z.string().url().optional(), // Make optional to handle deployments without Strapi
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().optional(),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string().optional(),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string().optional(),
});

// Server-side environment variables
const serverEnvSchema = z.object({
  GITHUB_TOKEN: z.string().optional(), // Make optional to allow deployment without AI features
  GITHUB_MODELS_ENDPOINT: z.string().url().default('https://models.github.ai/inference'),
  GITHUB_MODEL_ID: z.string().default('openai/gpt-4.1'),
  STRAPI_API_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Parse environment with simple validation
 */
function parseEnv() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isServer = typeof window === 'undefined';

  if (isProduction) {
    // Validate in production
    try {
      const client = clientEnvSchema.parse(process.env);

      // Only validate server environment on server-side
      if (isServer) {
        const server = serverEnvSchema.parse(process.env);
        return { ...client, ...server };
      }

      return client;
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
  strapi: process.env.NEXT_PUBLIC_STRAPI_API_URL
    ? {
        apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL,
      }
    : undefined, // Make strapi config optional when URL is not provided
  emailjs: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    ? {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
      }
    : undefined,
  isDev: process.env.NODE_ENV === 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
};

/**
 * Server-only environment (includes sensitive variables)
 * ⚠️ Only use in server-side code!
 */
export const serverEnv = {
  github: {
    token: (rawEnv as any).GITHUB_TOKEN || process.env.GITHUB_TOKEN || '',
    modelsEndpoint:
      (rawEnv as any).GITHUB_MODELS_ENDPOINT ||
      process.env.GITHUB_MODELS_ENDPOINT ||
      'https://models.github.ai/inference',
    modelId: (rawEnv as any).GITHUB_MODEL_ID || process.env.GITHUB_MODEL_ID || 'openai/gpt-4.1',
  },
  strapi: process.env.NEXT_PUBLIC_STRAPI_API_URL
    ? {
        apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL,
        apiToken: (rawEnv as any).STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN,
      }
    : undefined, // Make strapi config optional when URL is not provided
  isDev: (rawEnv as any).NODE_ENV === 'development' || process.env.NODE_ENV === 'development',
};

/**
 * Simple utility functions
 */
// Legacy export for compatibility
export const env = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export const envUtils = {
  isEmailJSConfigured: () => !!clientEnv.emailjs?.serviceId,
  hasGithubToken: () => !!serverEnv.github.token,
  hasStrapiToken: () => !!serverEnv.strapi?.apiToken,
  isStrapiConfigured: () => !!clientEnv.strapi?.apiUrl,
};

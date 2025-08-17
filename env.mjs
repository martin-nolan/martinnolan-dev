import { z } from "zod";

const schema = z.object({
  GITHUB_TOKEN: z.string().min(1, "Missing GITHUB_TOKEN"),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().optional(),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string().optional(),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string().optional(),
  // Future CMS variables
  STRAPI_API_URL: z.string().url().optional(),
  STRAPI_API_TOKEN: z.string().optional(),
});

// Only validate in production or when explicitly requested
const shouldValidate =
  process.env.NODE_ENV === "production" || process.env.VALIDATE_ENV === "true";

export const env = shouldValidate ? schema.parse(process.env) : process.env;

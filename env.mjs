// env.mjs
import { z } from "zod"; // npm i zod

/**
 * Describe exactly which env vars your code needs.
 * Optional ones can be marked with .optional().
 */
const schema = z.object({
  GITHUB_TOKEN: z.string().min(1, "Missing GITHUB_TOKEN"),
});

export const env = schema.parse(process.env);

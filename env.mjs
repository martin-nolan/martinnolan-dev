import { z } from "zod";

const schema = z.object({
  GITHUB_TOKEN: z.string().min(1, "Missing GITHUB_TOKEN"),
});

export const env = schema.parse(process.env);

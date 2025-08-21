import { AzureKeyCredential } from "@azure/core-auth";
import createClient from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import type { NextApiRequest, NextApiResponse } from "next";

const ENDPOINT =
  process.env.GITHUB_MODELS_ENDPOINT || "https://models.github.ai/inference";
const MODEL_ID = process.env.GITHUB_MODEL_ID || "openai/gpt-4.1";
const apiKey = process.env.GITHUB_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: { message: "Missing GITHUB_TOKEN on server" } });
  }

  try {
    const { messages, max_tokens = 256 } = req.body;
    const client = createClient(ENDPOINT, new AzureKeyCredential(apiKey));
    const azureRes = await client.path("/chat/completions").post({
      body: { model: MODEL_ID, messages, max_tokens },
    });
    const statusCode = Number(azureRes.status);

    if (isUnexpected(azureRes) || statusCode >= 400) {
      type AzureErrorBody = { error?: { message?: string } };
      const errorBody = azureRes.body as AzureErrorBody;
      const errorMessage = errorBody.error?.message ?? "Upstream error";
      return res.status(statusCode).json({ error: { message: errorMessage } });
    }

    return res.status(statusCode).json(azureRes.body);
  } catch (err) {
    console.error("Azure inference error:", err);
    return res.status(500).json({
      error: {
        message: (err as Error)?.message ?? "Unknown error",
      },
    });
  }
}

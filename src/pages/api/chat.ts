import { AzureKeyCredential } from '@azure/core-auth';
import createClient from '@azure-rest/ai-inference';
import { isUnexpected } from '@azure-rest/ai-inference';
import type { NextApiRequest, NextApiResponse } from 'next';

import { validateMethod, handleApiError } from '@/lib/api-utils';
import { serverEnv } from '@/lib/env';

// GitHub Models configuration from centralized env utilities
const apiKey = serverEnv.github.token;
const ENDPOINT = serverEnv.github.modelsEndpoint;
const MODEL_ID = serverEnv.github.modelId;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) {
    return;
  }

  // Server-side execution check
  if (typeof window !== 'undefined') {
    return res.status(500).json({ error: { message: 'Server-side only' } });
  }

  if (!apiKey) {
    return res.status(500).json({ error: { message: 'Missing GITHUB_TOKEN on server' } });
  }

  try {
    const { messages, max_tokens = 256 } = req.body;
    const client = createClient(ENDPOINT, new AzureKeyCredential(apiKey));
    const azureRes = await client.path('/chat/completions').post({
      body: { model: MODEL_ID, messages, max_tokens },
    });
    const statusCode = Number(azureRes.status);

    if (isUnexpected(azureRes) || statusCode >= 400) {
      type AzureErrorBody = { error?: { message?: string } };
      const errorBody = azureRes.body as AzureErrorBody;
      const errorMessage = errorBody.error?.message ?? 'Upstream error';
      return res.status(statusCode).json({ error: { message: errorMessage } });
    }

    return res.status(statusCode).json(azureRes.body);
  } catch (error) {
    console.error('Azure inference error:', error);
    handleApiError(res, error);
  }
}

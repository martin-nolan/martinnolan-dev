import type { NextApiRequest, NextApiResponse } from 'next';

import { validateMethod, handleApiError } from '@/lib/api-utils';
import { extractPdfTextServer } from '@/lib/pdf-server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) {
    return;
  }

  const { pdfUrl } = req.body;
  if (!pdfUrl || typeof pdfUrl !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid pdfUrl' });
  }

  try {
    const text = await extractPdfTextServer(pdfUrl);
    return res.status(200).json({ text });
  } catch (error) {
    handleApiError(res, error);
  }
}

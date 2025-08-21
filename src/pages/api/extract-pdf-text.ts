import type { NextApiRequest, NextApiResponse } from "next";
import { extractPdfTextServer } from "@/shared/lib/pdfTextExtractor.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { pdfUrl } = req.body;
  if (!pdfUrl || typeof pdfUrl !== "string") {
    return res.status(400).json({ error: "Missing or invalid pdfUrl" });
  }
  try {
    const text = await extractPdfTextServer(pdfUrl);
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: "Failed to extract PDF text" });
  }
}

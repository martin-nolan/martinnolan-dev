import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "PDF URL is required" });
  }

  try {
    // Validate that the URL is from your Strapi instance (security measure)
    const strapiApiUrl =
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
    const strapiBaseUrl = strapiApiUrl.replace("/api", "");

    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      return res.status(400).json({ message: "Invalid PDF URL" });
    }
    const baseParsedUrl = new URL(strapiBaseUrl);

    // Check protocol and hostname match
    if (
      parsedUrl.protocol !== baseParsedUrl.protocol ||
      parsedUrl.hostname !== baseParsedUrl.hostname
    ) {
      return res.status(403).json({
        message: "Unauthorized PDF source",
      });
    }

    // Prevent path traversal using robust normalization
    const decodedPath = decodeURIComponent(parsedUrl.pathname);
    const normalizedPath = path.posix.normalize(decodedPath);
    if (normalizedPath.startsWith("..") || normalizedPath.includes("/..")) {
      return res.status(403).json({
        message: "Path traversal detected",
      });
    }

    let response;
    try {
      // Fetch the PDF from Strapi
      response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "NextJS-PDF-Proxy",
          Accept: "application/pdf,*/*",
          "Cache-Control": "no-cache",
        },
      });
    } catch (fetchError) {
      throw new Error(
        `Network error fetching PDF: ${
          fetchError instanceof Error ? fetchError.message : "Unknown error"
        }`
      );
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch PDF: ${response.status} - ${response.statusText}`
      );
    }

    const contentType =
      response.headers.get("content-type") || "application/pdf";
    const buffer = await response.arrayBuffer();

    // Set appropriate headers for PDF display
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    // Set X-Frame-Options to SAMEORIGIN to prevent clickjacking
    res.setHeader("X-Frame-Options", "SAMEORIGIN");

    // Send the PDF buffer
    res.status(200).end(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({
      message: "Failed to load PDF",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

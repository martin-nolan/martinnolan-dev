// Server-only PDF text extraction with guards.
// Dynamically imports `pdf-parse` so Node's `fs` never touches client bundles.

const TIMEOUT_MS = 15000;
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const MAX_CHARS = 25000;

export async function extractPdfTextServer(pdfUrl: string): Promise<string> {
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(pdfUrl, { signal: controller.signal });
    if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status} ${res.statusText}`);

    // Guard against large files
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.byteLength > MAX_BYTES) throw new Error("PDF too large");

    // Dynamic import here keeps `fs` out of client bundles.
    const { default: pdfParse } = await import("pdf-parse");
    const data = await pdfParse(buffer);

    let text = (data.text || "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!text) return "[No extractable text in CV PDF]";
    if (text.length > MAX_CHARS) text = text.slice(0, MAX_CHARS) + "\n...[truncated]";
    return text;
  } catch (err) {
    console.error("PDF extraction (server) error:", err);
    return "[Failed to extract CV text]";
  } finally {
    clearTimeout(to);
  }
}

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { Button, GlassCard } from "@/shared/ui";
import { useTheme } from "@/shared/ui/theme-context";
import type { ResumeModalProps } from "@/shared/types";

const ResumeModal = ({ isOpen, onClose, cvPdfUrl }: ResumeModalProps) => {
  const { isDark } = useTheme();
  const [pdfError, setPdfError] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Use CMS PDF URL or fallback to static file
  let pdfUrl = "./martin-nolan-cv.pdf"; // Default fallback

  if (cvPdfUrl) {
    // For localhost development, use direct Strapi URL
    if (cvPdfUrl.includes("localhost:1337")) {
      pdfUrl = cvPdfUrl;
    } else {
      pdfUrl = `/api/pdf-proxy?url=${encodeURIComponent(cvPdfUrl)}`;
    }
  }

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onClose();
    }
  };

  // 404-style gradient background and GlassCard background
  const containerClass =
    "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br " +
    (isDark
      ? "from-background via-background/80 to-primary/10"
      : "from-white via-gray-100 to-primary/10");
  const cardClass =
    "relative mx-4 h-[90vh] w-full max-w-4xl animate-scale-in overflow-hidden rounded-2xl bg-white/80 dark:bg-background/80";

  return (
    <div
      className={containerClass}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      tabIndex={0}
      onKeyDown={handleOverlayKeyDown}
      aria-label="Close resume modal"
    >
      <GlassCard className={cardClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-surface-border p-6">
          <h2 className="gradient-text text-2xl font-bold">Resume</h2>
          <div className="flex items-center gap-4">
            <a
              href={cvPdfUrl || "./martin-nolan-cv.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <Download className="mr-2 size-4" />
              Download PDF
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-6" />
            </Button>
          </div>
        </div>

        <div className="h-[calc(100%-88px)] p-6">
          <div className="flex size-full items-center justify-center rounded-lg border border-surface-border bg-surface/20">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="size-full rounded-lg"
                title="Martin Nolan Resume"
                onError={(e) => {
                  // If CMS PDF fails, try fallback static file
                  if (
                    cvPdfUrl &&
                    e.currentTarget?.src.includes("/api/pdf-proxy")
                  ) {
                    e.currentTarget.src = "./martin-nolan-cv.pdf";
                  } else {
                    setPdfError(true);
                  }
                }}
                onLoad={() => {
                  setPdfError(false);
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <p className="mb-4 text-lg">PDF not available</p>
                <Button
                  variant="outline"
                  onClick={() => window.open("./martin-nolan-cv.pdf", "_blank")}
                >
                  <Download className="mr-2 size-4" />
                  Download Resume
                </Button>
              </div>
            )}

            {pdfError && (
              <div className="absolute inset-4 flex flex-col items-center justify-center rounded-lg bg-surface/90 text-muted-foreground">
                <p className="mb-4 text-lg">Failed to load PDF</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPdfError(false)}
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(cvPdfUrl || "./martin-nolan-cv.pdf", "_blank")
                    }
                  >
                    <Download className="mr-2 size-4" />
                    Download
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ResumeModal;

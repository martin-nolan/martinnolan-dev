import { X, Download } from "lucide-react";
import { Button, GlassCard } from "@/shared/ui";
import type { ResumeModalProps } from "@/shared/types";

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "./martin-nolan-cv.pdf";
    link.download = "Martin_Nolan_CV_Aug_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={handleOverlayKeyDown}
        aria-label="Close resume modal"
      />
      <GlassCard
        className="relative mx-4 h-[90vh] w-full max-w-4xl animate-scale-in overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-border p-6">
          <h2 className="gradient-text text-2xl font-bold">Resume</h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Download className="mr-2 size-4" />
              Download PDF
            </Button>
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
            <iframe
              src="./martin-nolan-cv.pdf"
              className="size-full rounded-lg"
              title="Martin Nolan Resume"
            />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ResumeModal;
